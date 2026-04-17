// ============================================================
// ANAMNESIS ENGINE — Clinical Pathway Recommender
// Alur: Berbasis sindrom klinis (bukan sekadar keyword match)
// Scoring: Weighted syndrome-pattern matching dengan penalti false positive
// ============================================================

export interface AnamnesisData {
  // Step 1: Keluhan utama
  chiefComplaint: string;        // bebas tulis keluhan utama

  // Step 2: Onset & waktu
  onset: {
    when: string;               // kapan mulai
    suddenGradual: 'sudden' | 'gradual' | '';  // mendadak / bertahap
    duration: string;           // durasi (< 1 jam, 1-24 jam, > 1 hari, > 1 minggu, > 1 bulan)
    pattern: 'constant' | 'intermittent' | 'progressive' | '';  // pola waktu
  };

  // Step 3: Karakteristik keluhan (Quality)
  quality: {
    descriptors: string[];      // tajam, tumpul, terbakar, berdenyut, dll
    freeText: string;           // deskripsi bebas dari pasien
  };

  // Step 4: Lokasi & penyebaran
  location: {
    primary: string;            // lokasi utama
    radiation: string[];        // menjalar ke mana
  };

  // Step 5: Skala keparahan
  severity: number;             // 0-10

  // Step 6: Faktor pemberat/peringan
  modifiers: {
    worsenedBy: string[];       // diperberat oleh
    relievedBy: string[];       // diperingan oleh
  };

  // Step 7: Gejala penyerta (associated symptoms)
  associatedSymptoms: string[]; // multi-select dari daftar gejala umum

  // Step 8: Riwayat
  history: {
    similar: boolean | null;    // pernah seperti ini sebelumnya?
    comorbidities: string[];    // DM, HT, Asma, dll
    medications: string;        // obat yang sedang diminum
    allergies: string;
  };
}

export interface PathwaySuggestion {
  diseaseId: string;
  diseaseName: string;
  probability: number;           // 0-100, presentasi klinis likelihood
  matchedCriteria: string[];
  additionalQuestions: string[];
  urgency: 'emergency' | 'urgent' | 'routine';
  reasoning: string;             // penjelasan singkat klinisi
}

export function calculateCompletion(data: AnamnesisData): number {
  let score = 0;
  const weights = [
    { val: data.chiefComplaint?.trim(), w: 20 },
    { val: data.onset.suddenGradual, w: 10 },
    { val: data.onset.duration, w: 10 },
    { val: data.quality.descriptors.length > 0 || data.quality.freeText?.trim(), w: 15 },
    { val: data.location.primary?.trim(), w: 15 },
    { val: data.severity > 0, w: 10 },
    { val: data.associatedSymptoms.length > 0, w: 10 },
    { val: data.history.comorbidities.length > 0 || data.history.similar !== null, w: 10 },
  ];
  weights.forEach(({ val, w }) => { if (val) score += w; });
  return score;
}

// ============================================================
// CORE SCORING ENGINE — Syndrome-based pattern matching
// ============================================================
export function generateSuggestions(data: AnamnesisData): PathwaySuggestion[] {
  // Build a rich search corpus from all anamnesis data
  const corpus = [
    data.chiefComplaint,
    data.onset.when,
    data.quality.freeText,
    data.location.primary,
    ...data.location.radiation,
    ...data.quality.descriptors,
    ...data.modifiers.worsenedBy,
    ...data.modifiers.relievedBy,
    ...data.associatedSymptoms,
    ...data.history.comorbidities,
    data.history.medications,
  ].join(' ').toLowerCase();

  const isSudden = data.onset.suddenGradual === 'sudden';
  const isGradual = data.onset.suddenGradual === 'gradual';
  const isAcute = ['<1 jam', '1-24 jam', '< 1 jam', '< 24 jam'].some(d => data.onset.duration.includes(d));
  const isChronic = ['minggu', 'bulan', 'lama', 'week', 'month', 'kronis'].some(d => corpus.includes(d));
  const isHighSeverity = data.severity >= 7;

  // Helper: check if corpus contains ANY of the strings
  const has = (...terms: string[]) => terms.some(t => corpus.includes(t.toLowerCase()));

  const results: PathwaySuggestion[] = [];

  // ============================================================
  // DEFINISI POLA SINDROM KLINIS SETIAP PENYAKIT
  // ============================================================

  interface DiseaseRule {
    id: string;
    name: string;
    urgency: 'emergency' | 'urgent' | 'routine';
    reasoning: string;
    score: () => number;
    additionalQuestions: string[];
  }

  const rules: DiseaseRule[] = [

    // ──────────────────────────────────────────
    // KARDIOVASKULAR
    // ──────────────────────────────────────────
    {
      id: 'acs',
      name: 'Acute Coronary Syndrome (ACS)',
      urgency: 'emergency',
      reasoning: 'Nyeri dada khas iskemik dengan onset akut. Perlu EKG segera.',
      additionalQuestions: [
        'Apakah ada keringat dingin atau rasa akan pingsan?',
        'Apakah nyeri seperti ditekan benda berat?',
        'Apakah Anda memiliki riwayat penyakit jantung atau DM?',
      ],
      score: () => {
        let s = 0;
        if (has('nyeri dada', 'chest pain', 'dada')) s += 20;
        if (has('ditekan', 'tertimpa', 'crushing', 'pressure', 'menekan')) s += 20;
        if (has('lengan kiri', 'left arm', 'rahang', 'jaw', 'tembus punggung')) s += 25;
        if (has('keringat dingin', 'cold sweat', 'mual', 'nausea') && has('nyeri dada', 'dada')) s += 15;
        if (isSudden && isAcute) s += 10;
        if (isHighSeverity) s += 10;
        if (has('aktivitas', 'exertion', 'olah raga', 'naik tangga')) s += 10;
        if (has('diabetes', 'dm', 'hipertensi', 'merokok', 'kolesterol')) s += 8;
        // Penalti: jika keluhan di perut tanpa ada nyeri dada
        if (!has('dada', 'chest') && has('perut', 'ulu hati')) s -= 20;
        return s;
      },
    },

    {
      id: 'heart-failure',
      name: 'Gagal Jantung (Heart Failure)',
      urgency: 'urgent',
      reasoning: 'Sesak napas progresif dengan edema tungkai, sulit tidur telentang.',
      additionalQuestions: [
        'Berapa bantal yang dipakai tidur agar tidak sesak?',
        'Apakah kedua kaki bengkak?',
        'Apakah ada riwayat sakit jantung sebelumnya?',
      ],
      score: () => {
        let s = 0;
        if (has('sesak', 'napas', 'dyspnea')) s += 20;
        if (has('telentang', 'tidur', 'orthopnea', 'berbaring')) s += 25;
        if (has('bengkak', 'edema', 'kaki bengkak', 'leg swelling')) s += 25;
        if (isGradual) s += 10;
        if (has('cepat lelah', 'fatigue', 'malam sesak', 'pnd')) s += 15;
        if (has('riwayat jantung', 'hipertensi', 'gagal jantung sebelumnya')) s += 10;
        if (has('kencing sedikit', 'oliguria')) s += 10;
        if (has('batuk', 'cough') && has('sesak')) s += 8;
        return s;
      },
    },

    {
      id: 'hipertensi-dewasa',
      name: 'Hipertensi Dewasa',
      urgency: 'urgent',
      reasoning: 'Tekanan darah tinggi dengan gejala target organ atau tanpa gejala.',
      additionalQuestions: [
        'Berapa tekanan darah yang terukur saat ini?',
        'Apakah ada pandangan kabur atau nyeri kepala hebat?',
        'Apakah ada obat tekanan darah yang sedang rutin diminum?',
      ],
      score: () => {
        let s = 0;
        if (has('tekanan darah', 'tensi', 'blood pressure', 'hipertensi', 'darah tinggi')) s += 30;
        if (has('sakit kepala', 'pusing', 'kepala berat', 'headache')) s += 15;
        if (has('tengkuk', 'kuduk', 'leher belakang')) s += 15;
        if (has('pandangan kabur', 'penglihatan buram', 'blur')) s += 20;
        if (has('mual', 'muntah') && has('kepala', 'pusing')) s += 10;
        if (has('diabetes', 'dm', 'ginjal', 'jantung')) s += 8; // komorbid
        return s;
      },
    },

    // ──────────────────────────────────────────
    // RESPIRASI
    // ──────────────────────────────────────────
    {
      id: 'pneumonia-komunitas',
      name: 'Pneumonia Komunitas (CAP)',
      urgency: 'urgent',
      reasoning: 'Demam + batuk produktif + sesak: khas pneumonia komunitas.',
      additionalQuestions: [
        'Apakah sudahadu dilakukan foto Rontgen dada?',
        'Apakah dahak berwarna kuning/hijau atau berdarah?',
        'Apakah saturasi oksigen sudah dicek?',
      ],
      score: () => {
        let s = 0;
        if (has('batuk', 'cough')) s += 15;
        if (has('demam', 'fever', 'panas')) s += 15;
        if (has('sesak', 'napas')) s += 15;
        if (has('dahak', 'dahak kuning', 'dahak hijau', 'sputum', 'lendir')) s += 20;
        if (has('dada nyeri', 'nyeri dada saat napas', 'pleuritik')) s += 15;
        if (isSudden || isAcute) s += 10;
        if (has('menggigil', 'chills', 'keringat')) s += 10;
        // Penalti: batuk kronik tanpa demam lebih ke TB
        if (isChronic && !has('demam', 'fever')) s -= 15;
        return s;
      },
    },

    {
      id: 'tuberkulosis-paru',
      name: 'Tuberkulosis Paru (TB)',
      urgency: 'urgent',
      reasoning: 'Batuk >2 minggu + demam subfebris + keringat malam khas TB.',
      additionalQuestions: [
        'Sudah berapa minggu batuk ini berlangsung?',
        'Apakah ada keringat malam yang membasahi baju?',
        'Apakah ada kontak dengan penderita TB sebelumnya?',
        'Apakah berat badan menurun dalam 1-2 bulan terakhir?',
      ],
      score: () => {
        let s = 0;
        if (has('batuk', 'cough') && isChronic) s += 35;
        if (has('keringat malam', 'night sweat', 'berkeringat malam')) s += 25;
        if (has('berat badan turun', 'weight loss', 'kurus', 'bb turun')) s += 20;
        if (has('darah', 'batuk darah', 'hemoptysis')) s += 20;
        if (has('demam', 'fever') && isChronic) s += 15;
        if (has('kontak tb', 'tinggal serumah penderita tb')) s += 20;
        if (has('lelah', 'lemas', 'fatigue')) s += 8;
        // Penalti: batuk kurang 2 minggu sangat kecil kemungkinannya TB
        if (isAcute && !isChronic) s -= 20;
        return s;
      },
    },

    {
      id: 'asthma-exacerbation',
      name: 'Asma Eksaserbasi Akut',
      urgency: 'urgent',
      reasoning: 'Sesak episodik dengan mengi, riwayat asma, dipicu alergen/infeksi.',
      additionalQuestions: [
        'Apakah ada riwayat asma sebelumnya?',
        'Apakah sesak disertai bunyi ngik/mengi?',
        'Apakah ada pemicu seperti debu, asap, atau udara dingin?',
      ],
      score: () => {
        let s = 0;
        if (has('mengi', 'ngik', 'wheezing', 'bunyi napas')) s += 30;
        if (has('sesak', 'napas pendek')) s += 15;
        if (has('asma', 'riwayat asma', 'inhaler', 'salbutamol')) s += 30;
        if (has('debu', 'alergi', 'asap', 'dingin')) s += 15;
        if (isSudden || isAcute) s += 10;
        if (has('batuk malam', 'batuk dini hari')) s += 10;
        return s;
      },
    },

    {
      id: 'ispa',
      name: 'ISPA (Infeksi Saluran Napas Atas)',
      urgency: 'routine',
      reasoning: 'Batuk, pilek, nyeri tenggorok ringan — typical viral upper respiratory.',
      additionalQuestions: [
        'Apakah ada demam tinggi atau sesak napas?',
        'Berapa hari sudah berlangsung?',
        'Apakah ada kontak dengan orang yang flu di sekitarnya?',
      ],
      score: () => {
        let s = 0;
        if (has('pilek', 'hidung meler', 'rhinorrhea', 'bersin')) s += 25;
        if (has('batuk')) s += 15;
        if (has('nyeri tenggorok', 'sakit tenggorok', 'sore throat')) s += 20;
        if (has('demam ringan', 'subfebris', 'agak panas')) s += 10;
        if (isAcute) s += 10;
        // Penalti: bila ada sesak berat atau infiltrat dada → bukan ISPA biasa
        if (has('sesak berat', 'nyeri dada')) s -= 15;
        if (isChronic) s -= 20;
        return s;
      },
    },

    // ──────────────────────────────────────────
    // NEUROLOGI
    // ──────────────────────────────────────────
    {
      id: 'vertigo',
      name: 'Vertigo (BPPV)',
      urgency: 'routine',
      reasoning: 'Pusing berputar episodik dipicu perubahan posisi kepala khas BPPV.',
      additionalQuestions: [
        'Apakah pusing berputar timbul saat berguling di kasur atau bangun dari tidur?',
        'Berapa lama setiap serangan berlangsung (detik? menit?)?',
        'Apakah ada gangguan pendengaran atau telinga berdenging?',
      ],
      score: () => {
        let s = 0;
        if (has('berputar', 'spinning', 'vertigo', 'pusing berputar')) s += 30;
        if (has('posisi', 'miring', 'bangun tidur', 'toleh', 'positional')) s += 30;
        if (has('mual', 'nausea') && has('pusing')) s += 10;
        // Penalti: jika ada defisit neurologis → bukan BPPV
        if (has('pelo', 'kelemahan', 'hemiparesis', 'diplopia', 'wajah miring')) s -= 30;
        if (has('kepala terasa berat') && !has('berputar')) s -= 10;
        return s;
      },
    },

    {
      id: 'tension-type-headache',
      name: 'Nyeri Kepala Tipe Tegang (TTH)',
      urgency: 'routine',
      reasoning: 'Sakit kepala bilateral seperti diikat, berkaitan dengan stres/postur.',
      additionalQuestions: [
        'Apakah nyeri kepala seperti ditekan atau diikat seperti helm?',
        'Apakah ada hubungan dengan stres atau kelelahan?',
        'Apakah ada mual atau muntah saat nyeri kepala?',
      ],
      score: () => {
        let s = 0;
        if (has('sakit kepala', 'kepala sakit', 'nyeri kepala', 'headache')) s += 20;
        if (has('kedua sisi', 'bilateral', 'seluruh kepala', 'menekan', 'mengikat', 'helm')) s += 25;
        if (has('stres', 'capek', 'lelah', 'kelelahan', 'fatigue')) s += 15;
        if (!has('berputar', 'mual berat', 'muntah', 'photophobia', 'phonophobia')) s += 10;
        if (isChronic || has('berulang', 'sering')) s += 10;
        // Penalti: sakit kepala mendadak sangat berat → perlu menyingkirkan SAH
        if (isSudden && isHighSeverity && has('kepala')) s -= 20;
        return s;
      },
    },

    {
      id: 'meningitis',
      name: 'Meningitis',
      urgency: 'emergency',
      reasoning: 'Triad demam + sakit kepala hebat + kaku kuduk — emergency neurologis.',
      additionalQuestions: [
        'Apakah ada kaku leher yang tidak bisa digerakkan?',
        'Apakah silau atau nyeri saat melihat cahaya (photophobia)?',
        'Apakah ada penurunan kesadaran?',
      ],
      score: () => {
        let s = 0;
        if (has('demam', 'fever') && has('sakit kepala', 'kepala') && has('kaku kuduk', 'kaku leher', 'leher kaku', 'stiff neck')) s += 50;
        if (has('meningismus', 'kernig', 'brudzinski')) s += 30;
        if (has('penurunan kesadaran', 'mengigau', 'tidak sadar')) s += 20;
        if (has('silau', 'photophobia', 'cahaya')) s += 15;
        if (isSudden && isHighSeverity) s += 10;
        return s;
      },
    },

    // ──────────────────────────────────────────
    // GASTROINTESTINAL
    // ──────────────────────────────────────────
    {
      id: 'dispepsia',
      name: 'Dispepsia / Maag',
      urgency: 'routine',
      reasoning: 'Nyeri ulu hati, kembung, mual — khas sindrom dispepsia fungsional.',
      additionalQuestions: [
        'Apakah gejala muncul atau memburuk setelah makan?',
        'Apakah ada rasa asam naik ke tenggorokan (heartburn)?',
        'Apakah pernah mengonsumsi NSAID/aspirin secara rutin?',
      ],
      score: () => {
        let s = 0;
        if (has('ulu hati', 'epigastrik', 'perut atas', 'epigastric', 'maag')) s += 25;
        if (has('kembung', 'begah', 'penuh')) s += 20;
        if (has('mual', 'nausea')) s += 15;
        if (has('makan', 'setelah makan', 'sebelum makan')) s += 15;
        if (has('terbakar', 'panas', 'perih', 'burning')) s += 15;
        if (isChronic || has('sering', 'berulang')) s += 10;
        // Penalti: demam + nyeri RLQ → bukan dispepsia
        if (has('demam', 'fever') && has('kanan bawah')) s -= 15;
        // Penalti: muntah darah → ke GI bleeding
        if (has('muntah darah', 'hematemesis', 'melena')) s -= 30;
        return s;
      },
    },

    {
      id: 'acute-gastroenteritis',
      name: 'Acute Gastroenteritis (AGE)',
      urgency: 'urgent',
      reasoning: 'Diare akut + mual/muntah, sering disertai demam dan riwayat makan.',
      additionalQuestions: [
        'Berapa kali BAB dalam 24 jam terakhir?',
        'Apakah ada lendir atau darah pada tinja?',
        'Apakah ada riwayat makan di luar/makanan yang mencurigakan?',
      ],
      score: () => {
        let s = 0;
        if (has('diare', 'mencret', 'bab cair', 'diarrhea')) s += 35;
        if (has('mual', 'muntah', 'nausea', 'vomiting')) s += 20;
        if (has('demam', 'fever')) s += 10;
        if (has('makan', 'makan luar', 'makanan kotor') && isAcute) s += 15;
        if (has('kram perut', 'kram', 'nyeri perut')) s += 10;
        if (isSudden || isAcute) s += 10;
        return s;
      },
    },

    {
      id: 'acute-appendicitis',
      name: 'Appendisitis Akut',
      urgency: 'emergency',
      reasoning: 'Nyeri berpindah ke RLQ + demam + mual, mcburney sign khas apendisitis.',
      additionalQuestions: [
        'Apakah nyeri dimulai dari sekitar pusar lalu berpindah ke perut kanan bawah?',
        'Apakah nyeri memberat saat berjalan atau berbalik badan?',
        'Apakah ada demam > 38°C?',
      ],
      score: () => {
        let s = 0;
        if (has('kanan bawah', 'right lower', 'rlq', 'mcburney')) s += 40;
        if (has('nyeri berpindah', 'mulai pusar', 'pindah ke kanan')) s += 20;
        if (has('demam', 'fever')) s += 15;
        if (has('mual', 'muntah')) s += 10;
        if (has('mual', 'anoreksia', 'tidak nafsu makan')) s += 10;
        if (isSudden || isAcute) s += 10;
        // Penalti: lokasi bukan perut kanan bawah
        if (!has('kanan bawah', 'rlq') && has('perut kiri', 'ulu hati')) s -= 20;
        return s;
      },
    },

    {
      id: 'acute-pancreatitis',
      name: 'Pankreatitis Akut',
      urgency: 'emergency',
      reasoning: 'Nyeri ulu hati tembus punggung + mual muntah berat, riwayat batu empedu/alkohol.',
      additionalQuestions: [
        'Apakah nyeri terasa tembus ke punggung belakang?',
        'Apakah ada riwayat batu empedu atau konsumsi alkohol?',
        'Apakah nyeri sangat berat dan tidak membaik dengan posisi apapun?',
      ],
      score: () => {
        let s = 0;
        if (has('ulu hati', 'epigastrik') && has('punggung', 'tembus punggung', 'back')) s += 40;
        if (has('mual', 'muntah berat')) s += 15;
        if (has('batu empedu', 'cholelithiasis', 'alkohol', 'alcohol')) s += 20;
        if (isHighSeverity) s += 15;
        if (isSudden) s += 10;
        return s;
      },
    },

    {
      id: 'upper-gi-bleeding',
      name: 'Perdarahan GI Atas',
      urgency: 'emergency',
      reasoning: 'Hematemesis/melena adalah alarm sign perdarahan GI atas.',
      additionalQuestions: [
        'Berapa banyak kira-kira darah yang dimuntahkan?',
        'Apakah BAB berwarna hitam seperti aspal (melena)?',
        'Apakah ada riwayat menggunakan aspirin atau NSAID secara rutin?',
      ],
      score: () => {
        let s = 0;
        if (has('muntah darah', 'hematemesis')) s += 50;
        if (has('melena', 'bab hitam', 'black stool', 'tinja hitam')) s += 40;
        if (has('asam lambung', 'maag', 'gastritis', 'nsaid', 'aspirin')) s += 15;
        if (has('pusing', 'lemas', 'pingsan') && has('darah', 'muntah')) s += 15;
        return s;
      },
    },

    {
      id: 'typhoid-fever',
      name: 'Demam Tifoid',
      urgency: 'urgent',
      reasoning: 'Demam tangga > 1 minggu + nyeri perut + bradikardi relatif.',
      additionalQuestions: [
        'Sudah berapa hari demam berlangsung?',
        'Apakah demam makin tinggi tiap hari dan lebih tinggi sore/malam?',
        'Apakah ada sembelit atau diare ringan?',
      ],
      score: () => {
        let s = 0;
        if (has('demam', 'fever') && isChronic) s += 20;
        if (has('demam naik', 'step ladder', 'demam bertahap', 'demam sore')) s += 20;
        if (has('nyeri perut', 'perut') && has('demam')) s += 15;
        if (has('sembelit', 'konstipasi', 'bab keras')) s += 15;
        if (has('bradikardi', 'denyut pelan', 'nadi pelan')) s += 15;
        if (has('lemas', 'malaise')) s += 10;
        // Penalti: menggigil periodik → malaria lebih dari tifoid
        if (has('menggigil periodik', 'periodic fever')) s -= 15;
        return s;
      },
    },

    // ──────────────────────────────────────────
    // INFEKSI TROPIS
    // ──────────────────────────────────────────
    {
      id: 'dbd',
      name: 'Demam Berdarah Dengue (DBD)',
      urgency: 'urgent',
      reasoning: 'Demam tinggi mendadak + nyeri retro-orbital + trombositopenia khas dengue.',
      additionalQuestions: [
        'Apakah demam tiba-tiba tinggi dan sudah berapa hari?',
        'Apakah ada nyeri di belakang bola mata saat menggerakkan mata?',
        'Apakah ada bintik merah di kulit (petechiae) atau perdarahan gusi?',
      ],
      score: () => {
        let s = 0;
        if (has('demam tinggi', 'high fever') && isSudden) s += 20;
        if (has('nyeri otot', 'myalgia', 'pegal seluruh badan', 'badan pegel')) s += 20;
        if (has('nyeri belakang mata', 'retro-orbital', 'nyeri saat melirik')) s += 30;
        if (has('bintik merah', 'petechiae', 'rash', 'ruam')) s += 20;
        if (has('mimisan', 'epistaxis', 'gusi berdarah', 'perdarahan')) s += 15;
        if (has('mual', 'nausea') && has('demam')) s += 5;
        // Penalti kuat: kalau ada batuk kronik / kaku kuduk itu bukan DBD
        if (has('kaku kuduk', 'batuk kronik')) s -= 15;
        return s;
      },
    },

    {
      id: 'malaria',
      name: 'Malaria',
      urgency: 'urgent',
      reasoning: 'Demam periodik + menggigil + berkeringat trias khas malaria.',
      additionalQuestions: [
        'Apakah ada riwayat bepergian ke daerah endemis malaria?',
        'Apakah demam datang secara periodik, setiap 2-3 hari?',
        'Apakah setelah demam pasien berkeringat sangat banyak lalu merasa membaik?',
      ],
      score: () => {
        let s = 0;
        if (has('menggigil periodik', 'menggigil', 'chills', 'berulang', 'intermiten')) s += 25;
        if (has('demam periodik', 'periodic fever', 'demam tiap', 'demam berulang')) s += 30;
        if (has('keringat banyak', 'drenching sweat', 'berkeringat habis demam')) s += 20;
        if (has('papua', 'kalimantan', 'ntt', 'maluku', 'daerah endemis', 'hutan')) s += 20;
        if (has('anemia', 'pucat', 'lemas berat')) s += 10;
        return s;
      },
    },

    // ──────────────────────────────────────────
    // METABOLIK / ENDOKRIN
    // ──────────────────────────────────────────
    {
      id: 'diabetes-melitus',
      name: 'Diabetes Melitus Tipe 2',
      urgency: 'routine',
      reasoning: 'Trias poliuria, polidipsia, polifagia + berat badan turun khas DM.',
      additionalQuestions: [
        'Apakah sering kencing berlebihan, termasuk malam hari?',
        'Apakah ada luka di kaki yang sulit sembuh?',
        'Apakah sudah ada hasil pemeriksaan gula darah?',
      ],
      score: () => {
        let s = 0;
        if (has('sering kencing', 'bak banyak', 'poliuria', 'kencing malam')) s += 25;
        if (has('sering haus', 'haus terus', 'polydipsia', 'minum banyak')) s += 25;
        if (has('sering lapar', 'nafsu makan naik', 'poliphagia')) s += 15;
        if (has('berat badan turun', 'weight loss', 'kurus')) s += 15;
        if (has('luka', 'sulit sembuh', 'ulkus kaki')) s += 20;
        if (has('kebas', 'kesemutan', 'neuropati', 'geli')) s += 15;
        if (has('gula darah', 'gds', 'hiperglikemia')) s += 20;
        return s;
      },
    },

    // ──────────────────────────────────────────
    // GINJAL
    // ──────────────────────────────────────────
    {
      id: 'acute-kidney-injury',
      name: 'Gangguan Ginjal Akut (AKI)',
      urgency: 'emergency',
      reasoning: 'Penurunan output urine akut ± nyeri pinggang — perlu penanganan segera.',
      additionalQuestions: [
        'Apakah jumlah kencing berkurang drastis (< 400 ml/hari)?',
        'Apakah ada riwayat diare berat, perdarahan, atau muntah sebelumnya?',
        'Apakah ada konsumsi obat NSAID (asam mefenamat, ibuprofen) dalam waktu lama?',
      ],
      score: () => {
        let s = 0;
        if (has('kencing sedikit', 'bak sedikit', 'oliguria', 'tidak kencing', 'anuria')) s += 45;
        if (has('bengkak', 'edema') && !has('kaki saja')) s += 15;
        if (has('mual', 'muntah') && has('kencing sedikit', 'oliguria')) s += 15;
        if (has('lemas berat', 'tidak bisa bergerak')) s += 10;
        if (has('nsaid', 'ibuprofen', 'asam mefenamat', 'obat anti nyeri')) s += 15;
        if (has('diare', 'perdarahan', 'dehidrasi') && has('kencing sedikit')) s += 20;
        return s;
      },
    },

    // ──────────────────────────────────────────
    // TOKSIKOLOGI
    // ──────────────────────────────────────────
    {
      id: 'intoksikasi-kimia',
      name: 'Intoksikasi / Keracunan',
      urgency: 'emergency',
      reasoning: 'Riwayat paparan zat beracun adalah kedaruratan; perlu identifikasi zat segera.',
      additionalQuestions: [
        'Zat apa yang dikonsumsi/terpapar?',
        'Kapan tepatnya paparan terjadi?',
        'Apakah ada gejala khusus: banyak air liur, pupil kecil, pandangan buram?',
      ],
      score: () => {
        let s = 0;
        if (has('keracunan', 'menelan', 'tertelan', 'minum zat', 'intoksikasi', 'overdosis')) s += 50;
        if (has('oplosan', 'miras', 'alkohol palsu')) s += 30;
        if (has('pandangan buram', 'mata kabur', 'buta mendadak') && has('miras', 'alkohol', 'oplosan')) s += 30; // methanol
        if (has('pupil kecil', 'saliva', 'air liur banyak', 'keringat banyak', 'bradikardia') && has('pestisida', 'organofosfor', 'obat serangga')) s += 40; // OP
        if (has('parasetamol', 'panadol', 'overdosis obat')) s += 35;
        if (has('menelan bahan kimia', 'pemutih', 'asam', 'basa', 'caustic')) s += 35;
        return s;
      },
    },

    // ──────────────────────────────────────────
    // LAIN-LAIN
    // ──────────────────────────────────────────
    {
      id: 'insect-bite-reaction',
      name: 'Reaksi Gigitan Serangga / Anafilaksis',
      urgency: 'emergency',
      reasoning: 'Riwayat gigitan/sengatan + reaksi sistemik: anafilaksis sampai terbukti sebaliknya.',
      additionalQuestions: [
        'Apakah ada sesak napas atau suara serak sejak gigitan/sengatan?',
        'Apakah ada bengkak pada bibir, lidah, atau wajah?',
        'Kapan terakhir tergigit/tersengat — berapa menit/jam yang lalu?',
      ],
      score: () => {
        let s = 0;
        if (has('gigitan', 'sengatan', 'bite', 'lebah', 'tawon', 'serangga')) s += 40;
        if (has('sesak', 'bengkak bibir', 'bengkak lidah', 'sesak napas', 'suara serak')) s += 30;
        if (has('gatal seluruh badan', 'biduran', 'urtikaria', 'kemerahan')) s += 20;
        if (isSudden && isAcute) s += 10;
        return s;
      },
    },

    {
      id: 'dvt',
      name: 'Deep Vein Thrombosis (DVT)',
      urgency: 'urgent',
      reasoning: 'Nyeri + bengkak asimetris pada betis/tungkai, faktor risiko imobilisasi.',
      additionalQuestions: [
        'Apakah kaki yang sakit teraba hangat dan kemerahan?',
        'Apakah ada riwayat perjalanan jauh/imobilisasi lama?',
        'Apakah ada operasi besar dalam 3 bulan terakhir?',
      ],
      score: () => {
        let s = 0;
        if (has('nyeri betis', 'kaki bengkak satu', 'betis nyeri', 'calf pain')) s += 35;
        if (has('imobilisasi', 'bedrest', 'tidak bergerak', 'perjalanan jauh', 'penerbangan')) s += 20;
        if (has('bengkak asimetris', 'satu kaki bengkak')) s += 25;
        if (has('operasi', 'kehamilan', 'kontrasepsi', 'pil kb')) s += 15;
        if (has('merah', 'hangat', 'erythema', 'panas') && has('kaki', 'betis')) s += 15;
        return s;
      },
    },
  ];

  // ── Run all rules ──
  for (const rule of rules) {
    const rawScore = rule.score();
    if (rawScore < 25) continue; // threshold minimum

    const normalized = Math.min(Math.round(rawScore), 95);
    const matchedCriteria: string[] = [];

    // Build human-readable matched criteria list
    if (rawScore >= 60) matchedCriteria.push('Pola klinis sangat mendukung diagnosis ini');
    if (rawScore >= 40) matchedCriteria.push('Beberapa kriteria kunci terpenuhi');
    if (has('demam', 'fever')) matchedCriteria.push('Ada demam');
    if (has('nyeri dada', 'chest')) matchedCriteria.push('Gejala area dada');
    if (has('sesak', 'napas')) matchedCriteria.push('Sesak napas');
    if (has('diare', 'mencret')) matchedCriteria.push('Diare');
    if (has('mual', 'muntah')) matchedCriteria.push('Mual/muntah');
    if (isSudden) matchedCriteria.push('Onset mendadak');
    if (isChronic) matchedCriteria.push('Gejala sudah berlangsung lama (kronik)');

    results.push({
      diseaseId: rule.id,
      diseaseName: rule.name,
      probability: normalized,
      matchedCriteria: [...new Set(matchedCriteria)].slice(0, 4),
      additionalQuestions: rule.additionalQuestions,
      urgency: rule.urgency,
      reasoning: rule.reasoning,
    });
  }

  // Sort by score descending, return top 5
  return results.sort((a, b) => b.probability - a.probability).slice(0, 5);
}
