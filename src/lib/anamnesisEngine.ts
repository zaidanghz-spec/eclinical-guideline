import { diseases } from './diseases';

export interface AnamnesisData {
  onset: {
    when: string;
    suddenGradual: string;
    activity: string;
  };
  provocation: {
    worsenedBy: string[];
    relievedBy: string[];
  };
  quality: {
    description: string;
    type: string[];
  };
  region: {
    location: string;
    radiation: string[];
  };
  severity: {
    scale: number;
    impact: string;
  };
  time: {
    duration: string;
    pattern: string;
    frequency: string;
  };
}

export interface PathwaySuggestion {
  diseaseId: string;
  diseaseName: string;
  probability: number;
  matchedCriteria: string[];
  additionalQuestions: string[];
}

export function calculateCompletion(data: AnamnesisData): number {
  const fields = [
    data.onset.when,
    data.onset.suddenGradual,
    data.provocation.worsenedBy.length > 0,
    data.provocation.relievedBy.length > 0,
    data.quality.description,
    data.quality.type.length > 0,
    data.region.location,
    data.severity.scale > 0,
    data.severity.impact,
    data.time.duration,
    data.time.pattern,
  ];

  const filledFields = fields.filter(Boolean).length;
  return (filledFields / fields.length) * 100;
}

export function generateSuggestions(data: AnamnesisData): PathwaySuggestion[] {
  const suggestions: PathwaySuggestion[] = [];

  // Combine all user input into searchable text
  const searchText = [
    data.onset.when,
    data.onset.suddenGradual,
    data.onset.activity,
    ...data.provocation.worsenedBy,
    ...data.provocation.relievedBy,
    data.quality.description,
    ...data.quality.type,
    data.region.location,
    ...data.region.radiation,
    data.severity.impact,
    data.time.duration,
    data.time.pattern,
    data.time.frequency,
  ].join(' ').toLowerCase();

  diseases.forEach(disease => {
    let score = 0;
    const matched: string[] = [];
    const questions: string[] = [];

    // ========================================
    // KEYWORD MATCHING - Match disease keywords with user input
    // ========================================
    const keywordMatches = disease.keywords.filter(keyword => 
      searchText.includes(keyword.toLowerCase())
    );
    
    if (keywordMatches.length > 0) {
      const keywordScore = keywordMatches.length * 15;
      score += keywordScore;
      matched.push(`Keyword match: ${keywordMatches.join(', ')}`);
    }

    // ========================================
    // ONSET ANALYSIS
    // ========================================
    if (data.onset.suddenGradual === 'sudden') {
      if (['acs', 'stroke-iskemik', 'pulmonary-embolism', 'seizures', 'acute-appendicitis', 'dka', 'hypoglycemia', 'thyroid-storm', 'adrenal-crisis', 'asthma-exacerbation', 'insect-bite-reaction', 'acute-kidney-injury', 'intoksikasi-kimia'].includes(disease.id)) {
        score += 15;
        matched.push('Onset mendadak (mendukung diagnosis gawat darurat)');
      }
    }

    if (data.onset.suddenGradual === 'gradual') {
      if (['heart-failure', 'pneumonia-komunitas', 'tuberkulosis-paru', 'copd-exacerbation', 'diabetes-melitus', 'rheumatoid-arthritis', 'dispepsia', 'hipertensi-dewasa'].includes(disease.id)) {
        score += 10;
        matched.push('Onset bertahap/gradual (mendukung diagnosis kronis/subakut)');
      }
    }

    // ========================================
    // SEVERITY ANALYSIS
    // ========================================
    if (data.severity.scale >= 7) {
      if (disease.isEmergency) {
        score += 10;
        matched.push('Severity tinggi → kemungkinan kondisi emergency');
      }
    }

    if (data.severity.scale >= 1 && data.severity.scale <= 4) {
      if (!disease.isEmergency) {
        score += 5;
        matched.push('Severity ringan-sedang');
      }
    }

    // ========================================
    // QUALITY ANALYSIS - Pain Character
    // ========================================
    
    // Crushing/Pressure pain → Cardiac
    if (data.quality.type.includes('crushing') || data.quality.type.includes('pressure') || 
        searchText.includes('tertekan') || searchText.includes('ditekan')) {
      if (['acs', 'pulmonary-embolism'].includes(disease.id)) {
        score += 20;
        matched.push('Nyeri tipe crushing/pressure → suspect cardiac');
      }
    }

    // Sharp pain → Pleuritic, Appendicitis
    if (data.quality.type.includes('sharp') || searchText.includes('tajam') || searchText.includes('menusuk')) {
      if (['acute-appendicitis', 'pneumonia-komunitas', 'pulmonary-embolism'].includes(disease.id)) {
        score += 12;
        matched.push('Nyeri tajam/sharp');
      }
    }

    // Burning pain → GI issues
    if (data.quality.type.includes('burning') || searchText.includes('terbakar') || searchText.includes('panas')) {
      if (['upper-gi-bleeding', 'acute-pancreatitis', 'dispepsia'].includes(disease.id)) {
        score += 15;
        matched.push('Nyeri terbakar → suspect GI origin');
      }
    }

    // Throbbing/Pulsating → Headache, Migraine, Meningitis, Hypertension
    if (searchText.includes('berdenyut') || searchText.includes('throbbing') || searchText.includes('pulsating')) {
      if (['meningitis', 'hipertensi-dewasa', 'hypertensive-crisis', 'tension-type-headache'].includes(disease.id)) {
        score += 12;
        matched.push('Nyeri berdenyut');
      }
    }

    // ========================================
    // REGION ANALYSIS - Location
    // ========================================
    
    // Chest pain
    const hasChestPain = data.region.location.toLowerCase().includes('chest') || 
        data.region.location.toLowerCase().includes('dada');
    
    if (hasChestPain) {
      if (['acs', 'heart-failure', 'pulmonary-embolism', 'pneumonia-komunitas', 'asthma-exacerbation'].includes(disease.id)) {
        score += 15;
        matched.push('Lokasi nyeri dada');
      }
    }

    // Radiation to arm/jaw → ACS
    if (data.region.radiation.some(r => 
        r.toLowerCase().includes('arm') || 
        r.toLowerCase().includes('lengan') ||
        r.toLowerCase().includes('jaw') ||
        r.toLowerCase().includes('rahang'))) {
      if (disease.id === 'acs') {
        score += 20;
        matched.push('Radiasi ke lengan/rahang → highly suspicious for ACS');
      }
    }

    // Abdominal pain
    if (searchText.includes('abdomen') || searchText.includes('perut') || searchText.includes('abdominal')) {
      if (['acute-gastroenteritis', 'acute-appendicitis', 'upper-gi-bleeding', 'acute-pancreatitis', 'typhoid-fever', 'dispepsia'].includes(disease.id)) {
        score += 15;
        matched.push('Nyeri abdomen/perut');
      }
    }

    // Right lower quadrant → Appendicitis
    if (searchText.includes('right lower') || searchText.includes('kanan bawah') || searchText.includes('mcburney')) {
      if (disease.id === 'acute-appendicitis') {
        score += 30;
        matched.push(' RLQ pain (McBurney) → HIGHLY SUSPECT APPENDICITIS!');
      }
    }

    // Epigastric pain → Pancreatitis, GI bleeding, Dyspepsia
    if (searchText.includes('epigastric') || searchText.includes('ulu hati') || searchText.includes('upper abdomen')) {
      if (['acute-pancreatitis', 'upper-gi-bleeding', 'dispepsia'].includes(disease.id)) {
        score += 20;
        matched.push('Epigastric pain');
      }

      // Radiating to back → Pancreatitis
      if (searchText.includes('back') || searchText.includes('punggung')) {
        if (disease.id === 'acute-pancreatitis') {
          score += 25;
          matched.push('Epigastric → back radiation → suspect Pancreatitis');
        }
      }
    }

    // Headache
    if (searchText.includes('head') || searchText.includes('kepala') || searchText.includes('sakit kepala')) {
      if (['meningitis', 'hipertensi-dewasa', 'hypertensive-crisis', 'stroke-iskemik', 'tension-type-headache'].includes(disease.id)) {
        score += 12;
        matched.push('Gejala sakit kepala');
      }
      
      // Tengkuk kaku → Hypertension / Meningitis
      if (searchText.includes('tengkuk kaku') || searchText.includes('leher kaku') || searchText.includes('stiff neck')) {
        if (['hipertensi-dewasa', 'meningitis'].includes(disease.id)) {
          score += 25;
          matched.push('Tengkuk kaku (Nuchal rigidity / Tension)');
        }
      }
    }

    // Leg pain/swelling → DVT
    if (searchText.includes('leg') || searchText.includes('kaki') || searchText.includes('betis') || searchText.includes('calf')) {
      if (disease.id === 'dvt') {
        score += 20;
        matched.push('Nyeri/bengkak kaki → suspect DVT');
      }
    }

    // Joint pain → Arthritis
    if (searchText.includes('joint') || searchText.includes('sendi') || searchText.includes('arthritis')) {
      if (['rheumatoid-arthritis', 'polymyalgia-rheumatica', 'fraktur'].includes(disease.id)) {
        score += 18;
        matched.push('Nyeri sendi/tulang');
      }

      // Morning stiffness → RA, PMR
      if (searchText.includes('morning stiffness') || searchText.includes('kaku pagi')) {
        if (['rheumatoid-arthritis', 'polymyalgia-rheumatica'].includes(disease.id)) {
          score += 22;
          matched.push('Morning stiffness → suspect RA/PMR');
        }
      }
    }

    // ========================================
    // PROVOCATION ANALYSIS
    // ========================================
    
    // Worsened by exertion → Cardiac
    if (data.provocation.worsenedBy.some(p => 
        p.toLowerCase().includes('exertion') || 
        p.toLowerCase().includes('aktivitas') ||
        p.toLowerCase().includes('exercise'))) {
      if (['acs', 'heart-failure', 'asthma-exacerbation'].includes(disease.id)) {
        score += 15;
        matched.push('Diperberat aktivitas → cardiac/respiratory origin');
      }
    }

    // Worsened by eating → GI / Dyspepsia
    if (searchText.includes('eating') || searchText.includes('makan') || searchText.includes('food')) {
      if (['upper-gi-bleeding', 'acute-pancreatitis', 'acute-gastroenteritis', 'dispepsia'].includes(disease.id)) {
        score += 12;
        matched.push('Diperberat makan → GI origin');
      }
    }

    // Worsened by position change → BPPV
    if (data.provocation.worsenedBy.some(p => 
        p.toLowerCase().includes('posisi') || 
        p.toLowerCase().includes('position') ||
        p.toLowerCase().includes('miring') ||
        p.toLowerCase().includes('bangun') ||
        p.toLowerCase().includes('lying'))) {
      if (disease.id === 'vertigo') {
        score += 30;
        matched.push('[HIGH] Diperberat perubahan posisi -- khas BPPV (PPK Neurologi 2023)');
      }
    }

    // ========================================
    // TIME PATTERN ANALYSIS
    // ========================================
    
    // Chronic (>weeks) → Chronic diseases
    if (searchText.includes('weeks') || searchText.includes('months') || searchText.includes('kronik') || searchText.includes('chronic')) {
      if (['tuberkulosis-paru', 'copd-exacerbation', 'diabetes-melitus', 'heart-failure', 'rheumatoid-arthritis', 'hipertensi-dewasa'].includes(disease.id)) {
        score += 12;
        matched.push('Gejala kronik');
      }
    }

    // ========================================
    // FEVER & INFECTIOUS DISEASES
    // ========================================
    
    const hasFever = searchText.includes('fever') || searchText.includes('demam');
    
    if (hasFever) {
      if (['pneumonia-komunitas', 'tuberkulosis-paru', 'meningitis', 'sepsis', 'dbd', 'malaria', 'typhoid-fever', 'ispa', 'acute-gastroenteritis'].includes(disease.id)) {
        score += 15;
        matched.push('Demam');
      }

      // High fever → DBD, Malaria, Typhoid, Sepsis
      if (searchText.includes('tinggi') || searchText.includes('high') || searchText.includes('39') || searchText.includes('40')) {
        if (['dbd', 'malaria', 'typhoid-fever', 'sepsis', 'meningitis'].includes(disease.id)) {
          score += 18;
          matched.push('Demam tinggi');
        }
      }

      // Prolonged fever → TB, Typhoid
      if (searchText.includes('prolonged') || searchText.includes('berkepanjangan') || searchText.includes('>1 week') || searchText.includes('minggu')) {
        if (['tuberkulosis-paru', 'typhoid-fever'].includes(disease.id)) {
          score += 20;
          matched.push('Demam berkepanjangan → suspect TB/Typhoid');
        }
      }

      // Periodic fever + chills → Malaria
      if (searchText.includes('periodic') || searchText.includes('chills') || searchText.includes('menggigil')) {
        if (disease.id === 'malaria') {
          score += 30;
          matched.push(' Periodic fever + chills → HIGHLY SUSPECT MALARIA!');
        }
      }
    }

    // ========================================
    // RESPIRATORY SYMPTOMS
    // ========================================

    // Dyspnea/Sesak napas
    if (searchText.includes('dyspnea') || searchText.includes('sesak') || searchText.includes('napas')) {
      if (['asthma-exacerbation', 'copd-exacerbation', 'heart-failure', 'pneumonia-komunitas', 'pulmonary-embolism'].includes(disease.id)) {
        score += 15;
        matched.push('Sesak napas/dyspnea');
      }

      // Orthopnea → Heart Failure
      if (searchText.includes('orthopnea') || searchText.includes('worse lying') || searchText.includes('sulit tidur telentang')) {
        if (disease.id === 'heart-failure') {
          score += 30;
          matched.push(' Orthopnea → HIGHLY SPECIFIC FOR HEART FAILURE!');
        }
      }
    }

    // Wheezing → Asthma, COPD
    if (searchText.includes('wheezing') || searchText.includes('mengi') || searchText.includes('ngik')) {
      if (['asthma-exacerbation', 'copd-exacerbation'].includes(disease.id)) {
        score += 22;
        matched.push('Wheezing');
      }
    }

    // Batuk Kronik → TB
    if ((searchText.includes('batuk') || searchText.includes('cough')) && (searchText.includes('kronik') || searchText.includes('>2 minggu') || searchText.includes('lama'))) {
      if (disease.id === 'tuberkulosis-paru') {
        score += 25;
        matched.push('Batuk kronik (>2 minggu) → suspect TB Paru');
      }
    }

    // ========================================
    // NEUROLOGICAL SYMPTOMS
    // ========================================

    // Stroke FAST
    if (searchText.includes('hemiparesis') || searchText.includes('kelemahan satu sisi') || searchText.includes('bicara pelo') || searchText.includes('wajah miring')) {
      if (disease.id === 'stroke-iskemik') {
        score += 40;
        matched.push(' FAST symptoms present → STROKE EMERGENCY!');
      }
    }

    // Vertigo / Pusing Berputar
    if (searchText.includes('berputar') || searchText.includes('spinning') || searchText.includes('vertigo')) {
      if (disease.id === 'vertigo') {
        score += 30;
        matched.push('[HIGH] Sensasi vertigo/berputar -- khas BPPV');
      }
    }

    // ========================================
    // GASTROINTESTINAL & RENAL
    // ========================================

    // Diare / BAB Cair
    if (searchText.includes('diarrhea') || searchText.includes('diare') || searchText.includes('mencret') || searchText.includes('bab cair')) {
      if (['acute-gastroenteritis', 'typhoid-fever', 'sepsis'].includes(disease.id)) {
        score += 25;
        matched.push('Diare / BAB cair');
      }
    }

    // Mual/muntah
    if (searchText.includes('nausea') || searchText.includes('mual') || searchText.includes('muntah')) {
      if (['acute-gastroenteritis', 'upper-gi-bleeding', 'acute-pancreatitis', 'dka', 'dispepsia', 'dbd', 'intoksikasi-kimia'].includes(disease.id)) {
        score += 15;
        matched.push('Gejala Mual / Muntah');
      }
    }

    // AKI: Urine output reduction
    if (searchText.includes('urine') || searchText.includes('bak sedikit') || searchText.includes('kencing sedikit') || searchText.includes('oliguria')) {
      if (disease.id === 'acute-kidney-injury') {
        score += 40;
        matched.push('[HIGH] Penurunan output urine (Oliguria) -- khas AKI (PERNEFRI 2023)');
      }
    }

    // ========================================
    // METABOLIC / DM
    // ========================================
    if (searchText.includes('haus terus') || searchText.includes('sering kencing') || searchText.includes('polyuria') || searchText.includes('polydipsia')) {
      if (disease.id === 'diabetes-melitus' || disease.id === 'dka') {
        score += 25;
        matched.push('Symptom polidipsia/poliuria (Dicurigai Diabetes)');
      }
    }

    if (searchText.includes('berat badan turun') || searchText.includes('weight loss')) {
      if (['diabetes-melitus', 'tuberkulosis-paru'].includes(disease.id)) {
        score += 20;
        matched.push('Penurunan berat badan signifikan');
      }
    }

    // ========================================
    // ALERGI / INSECT BITE
    // ========================================
    if (searchText.includes('gigitan') || searchText.includes('bite') || searchText.includes('sengatan') || searchText.includes('serangga')) {
      if (disease.id === 'insect-bite-reaction') {
        score += 40;
        matched.push('[HIGH] Riwayat gigitan atau sengatan serangga');
      }
    }

    // ========================================
    // SCORE NORMALIZATION & FINAL QUESTIONS
    // ========================================
    // ========================================
    // TOXICOLOGY / INTOXICATION ANALYSIS (IS 1.19 & 1.20)
    // ========================================
    if (searchText.includes('keracunan') || searchText.includes('intoksikasi') || searchText.includes('poison') || searchText.includes('minum zat')) {
      if (disease.id === 'intoksikasi-kimia') {
        score += 40;
        matched.push('[HIGH] Riwayat paparan zat beracun');
      }
    }

    // Methanol / Oplosan
    if ((searchText.includes('miras') || searchText.includes('oplosan') || searchText.includes('alkohol')) && 
        (searchText.includes('mata kabur') || searchText.includes('pandangan gelap') || searchText.includes('snowfield'))) {
      if (disease.id === 'intoksikasi-kimia') {
        score += 50;
        matched.push('[SPECIFIC] Suspek Keracunan Metanol (Oplosan)');
      }
    }

    // Pufferfish / Ikan Buntal
    if (searchText.includes('makan ikan') && (searchText.includes('kebas mulut') || searchText.includes('parestesia') || searchText.includes('lemah otot'))) {
      if (disease.id === 'intoksikasi-kimia') {
        score += 50;
        matched.push('[SPECIFIC] Suspek Keracunan Ikan Buntal (Tetrodotoxin)');
      }
    }

    // Paracetamol
    if (searchText.includes('parasetamol') || searchText.includes('paracetamol') || searchText.includes('panadol')) {
      if (disease.id === 'intoksikasi-kimia') {
        score += 45;
        matched.push('[SPECIFIC] Overdosis Parasetamol');
      }
    }

    if (searchText.includes('minum') && (searchText.includes('pembersih') || searchText.includes('deterjen') || searchText.includes('asam') || searchText.includes('basa'))) {
      if (disease.id === 'intoksikasi-kimia') {
        score += 40;
        matched.push('[HIGH] Riwayat ingesti zat korosif');
      }
    }

    if (score >= 40) {
      if (disease.isEmergency) score += 10;
      
      if (disease.id === 'intoksikasi-kimia') {
        questions.push('Kapan tepatnya waktu paparan/kejadian?');
        questions.push('Apakah ada kelainan penglihatan atau mulut terasa terbakar?');
        questions.push('Apakah pasien sempat muntah atau dipaksa muntah?');
        questions.push('Ada riwayat masalah kejiwaan atau keinginan menyakiti diri?');
      } else if (disease.id === 'acute-kidney-injury') {
        questions.push('Apakah ada riwayat perdarahan hebat atau diare sebelum urine berkurang?');
        questions.push('Apakah pasien menggunakan obat anti-nyeri (NSAID) dalam jangka panjang?');
      } else if (disease.id === 'diabetes-melitus') {
        questions.push('Apakah ada luka di kaki yang sulit sembuh?');
        questions.push('Berapa hasil pemeriksaan gula darah sewaktunya?');
      } else if (disease.id === 'hipertensi-dewasa') {
        questions.push('Apakah ada pandangan kabur atau nyeri dada saat ini?');
        questions.push('Berapa tekanan darah tertinggi yang pernah tercatat?');
      } else if (disease.id === 'dispepsia') {
        questions.push('Apakah nyeri berkurang atau justru memberat setelah makan?');
      } else if (disease.id === 'acute-gastroenteritis') {
        questions.push('Berapa kali BAB dalam 24 jam terakhir? Apakah ada lendir atau darah?');
      } else if (disease.id === 'acs') {
        questions.push('Apakah nyeri terasa seperti tertindih beban berat?');
      } else if (disease.id === 'stroke-iskemik') {
        questions.push('Kapan tepatnya waktu terakhir pasien terlihat normal?');
      } else if (disease.id === 'insect-bite-reaction') {
        questions.push('Apakah ada sesak napas atau bengkak pada bibir/suara serak?');
      }
    }

    // Only add to suggestions if score is meaningful
    if (score > 20) {
      suggestions.push({
        diseaseId: disease.id,
        diseaseName: disease.name,
        probability: Math.min(score, 98),
        matchedCriteria: matched,
        additionalQuestions: questions,
      });
    }
  });

  // Sort by probability and return top 5
  return suggestions.sort((a, b) => b.probability - a.probability).slice(0, 5);
}
