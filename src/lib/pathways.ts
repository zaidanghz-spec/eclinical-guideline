export interface PathwayStep {
  type: 'assessment' | 'decision' | 'action' | 'info';
  title: string;
  description: string;
  details?: string;
  criteria?: string[];
  redFlags?: string[];
  medications?: {
    name: string;
    dose: string;
    route?: string;
    duration?: string;
  }[];
  branches?: {
    yes: string;
    no: string;
  };
}

export interface ClinicalPathway {
  diseaseId: string;
  steps: PathwayStep[];
}

export const pathways: Record<string, ClinicalPathway> = {
  // ACUTE CORONARY SYNDROME (STEMI)
  'sindrom-koroner-akut': {
    diseaseId: 'sindrom-koroner-akut',
    steps: [
      {
        type: 'assessment',
        title: 'Initial Assessment - ABC Stabilisasi',
        description: 'Pastikan Airway paten, Breathing adequate, Circulation stabil',
        criteria: [
          'Airway paten - pasien dapat berbicara',
          'SpO2 > 94% (oksigenasi adequate)',
          'Tekanan darah terukur, nadi teraba',
          'Akses IV terpasang (minimal 1 line)',
        ],
        redFlags: [
          'Airway compromise → intubasi',
          'Hemodinamik tidak stabil → call for help, ACLS protocol',
        ],
      },
      {
        type: 'decision',
        title: 'Apakah ada nyeri dada tipikal?',
        description: 'Nyeri dada substernal, crushing/pressure, radiasi ke lengan kiri/rahang, >20 menit?',
        details: 'Angina tipikal: substernal, seperti tertindih, menjalar ke lengan kiri/leher/rahang, tidak hilang istirahat',
        branches: {
          yes: 'Curiga ACS tinggi → EKG STAT (<10 menit)',
          no: 'Pertimbangkan DD lain (PE, dissection). Tetap lakukan EKG',
        },
      },
      {
        type: 'action',
        title: 'EKG 12-Lead dalam <10 Menit',
        description: 'Lakukan EKG 12-lead SECEPATNYA dari kedatangan',
        details: 'Cari: ST elevasi ≥1mm di 2 lead bersebelahan (STEMI), ST depresi/T inversi (NSTEMI)',
        redFlags: [
          'ST elevasi ≥1mm di 2 lead → STEMI!',
          'New LBBB → ekuivalen STEMI',
          'ST depresi V1-V3 + gejala → posterior STEMI',
        ],
      },
      {
        type: 'decision',
        title: 'Apakah ada ST Elevasi (STEMI)?',
        description: 'ST elevasi ≥1mm di 2 lead bersebelahan atau new LBBB?',
        branches: {
          yes: 'STEMI → Aktivasi reperfusi strategy! Target door-to-balloon <90 menit',
          no: 'NSTEMI/UAP → Cek troponin serial, stratifikasi risiko',
        },
      },
      {
        type: 'action',
        title: 'MONA + Antiplatelet (STEMI)',
        description: 'Berikan terapi awal STEMI:',
        medications: [
          { name: 'Morfin', dose: '2-4 mg IV', route: 'IV bolus', duration: 'PRN untuk nyeri' },
          { name: 'Oksigen', dose: 'Target SpO2 94-98%', route: 'Nasal cannula' },
          { name: 'Aspirin', dose: '160-320 mg (kunyah)', route: 'PO chewed' },
          { name: 'Clopidogrel', dose: '600 mg loading', route: 'PO' },
          { name: 'Nitrogliserin', dose: '0.4 mg SL q5min (max 3x)', route: 'Sublingual' },
          { name: 'Heparin UFH', dose: '60 U/kg bolus max 4000U', route: 'IV bolus + infus' },
        ],
        redFlags: [
          'JANGAN nitrat jika TD sistolik <90 mmHg',
          'JANGAN nitrat jika curiga RV infarction (inferior MI)',
        ],
      },
      {
        type: 'decision',
        title: 'PCI tersedia dalam <90 menit?',
        description: 'Apakah Primary PCI dapat dilakukan <90 menit dari first medical contact?',
        details: 'PCI primer adalah gold standard jika available <90 menit. Jika tidak → fibrinolisis <30 menit',
        branches: {
          yes: 'Aktivasi Cath Lab → Primary PCI',
          no: 'Fibrinolisis jika <12 jam onset dan tidak ada kontraindikasi',
        },
      },
      {
        type: 'action',
        title: 'Post-Reperfusi Therapy',
        description: 'Setelah reperfusi (PCI/fibrinolisis), berikan terapi sekunder:',
        medications: [
          { name: 'Beta-blocker (Bisoprolol)', dose: '2.5-5 mg PO daily' },
          { name: 'ACE-I (Ramipril)', dose: '2.5 mg PO daily, titrasi s/d 10mg' },
          { name: 'Statin (Atorvastatin)', dose: '80 mg PO daily (high-intensity)' },
        ],
        criteria: [
          'Monitor di CCU/ICCU',
          'Troponin serial 0, 3, 6 jam',
          'Echo untuk assess EF',
          'Watch for komplikasi: aritmia, HF, mechanical complications',
        ],
      },
    ],
  },

  // STROKE ISKEMIK
  'stroke-iskemik': {
    diseaseId: 'stroke-iskemik',
    steps: [
      {
        type: 'assessment',
        title: 'Time is Brain - Catat Waktu Onset!',
        description: 'CRITICAL: Catat waktu onset gejala atau "last known well time"',
        details: 'Window trombolisis IV rtPA <4.5 jam. Jika onset tidak jelas, gunakan last known well time',
        criteria: [
          'Waktu onset / last known well PASTI dicatat',
          'ABC stabil (GCS <8 consider intubasi)',
          'Akses IV terpasang',
        ],
      },
      {
        type: 'decision',
        title: 'Onset <4.5 jam?',
        description: 'Apakah dari onset hingga sekarang <4.5 jam (270 menit)?',
        details: 'Jika >4.5 jam tetapi <24 jam, masih mungkin kandidat mechanical thrombectomy',
        branches: {
          yes: 'Kandidat trombolisis! Rapid workup CT + checklist',
          no: 'Tidak eligible rtPA. Fokus antiplatelet + supportive',
        },
      },
      {
        type: 'action',
        title: 'CT Scan Non-Kontras STAT',
        description: 'Target <25 menit dari kedatangan',
        details: 'Tujuan: (1) Singkirkan perdarahan, (2) Exclude stroke mimic, (3) Early ischemic changes',
        redFlags: [
          'Perdarahan intrakranial → STOP workup trombolisis',
          'Hipodensitas luas >1/3 MCA territory → risiko hemorrhagic transformation',
        ],
      },
      {
        type: 'decision',
        title: 'CT menunjukkan perdarahan?',
        description: 'Ada tanda perdarahan intrakranial?',
        branches: {
          yes: 'Hemorrhagic stroke → pathway berbeda (TIDAK rtPA)',
          no: 'Ischemic stroke → Lanjut checklist rtPA',
        },
      },
      {
        type: 'assessment',
        title: 'Checklist Kriteria rtPA',
        description: 'Periksa inklusi & kontraindikasi:',
        criteria: [
          'Onset <4.5 jam ✓',
          'Usia ≥18 tahun',
          'CT tidak ada perdarahan ✓',
          'TD <185/110 mmHg (atau bisa diturunkan)',
          'Glukosa 50-400 mg/dL',
          'Trombosit >100,000',
          'INR <1.7, aPTT normal',
        ],
        redFlags: [
          'KONTRAINDIKASI: Perdarahan ICH, stroke/head trauma <3 bulan, riwayat ICH',
          'KONTRAINDIKASI: TD tidak terkontrol, pregnant',
        ],
      },
      {
        type: 'decision',
        title: 'Eligible untuk rtPA?',
        description: 'Memenuhi kriteria dan tidak ada kontraindikasi?',
        branches: {
          yes: 'BERIKAN rtPA (alteplase) SECEPATNYA!',
          no: 'Tidak eligible → Aspirin 160-325 mg + supportive',
        },
      },
      {
        type: 'action',
        title: 'Pemberian rtPA',
        description: 'Alteplase 0.9 mg/kg (max 90 mg)',
        medications: [
          { 
            name: 'Alteplase (rtPA)', 
            dose: '0.9 mg/kg (max 90mg): 10% bolus, 90% infus 60 menit',
            route: 'IV',
          },
        ],
        details: 'Contoh 70kg: 63mg total → 6.3mg bolus, 56.7mg infus 60 menit',
        redFlags: [
          'TIDAK antiplatelet/antikoagulan 24 jam post rtPA',
          'Monitor neuro q15min during infus, q30min for 6h',
          'TD goal <180/105 mmHg',
        ],
      },
      {
        type: 'info',
        title: 'Post-rtPA Monitoring',
        description: 'CT scan ulang 24 jam post rtPA sebelum start antiplatelet',
        criteria: [
          'Neuro check ketat (q15min → q30min → q1h)',
          'TD control <180/105',
          'Watch for ICH: sudden headache, worsening neuro → STAT CT',
          'Setelah 24 jam: start antiplatelet, rehab, secondary prevention',
        ],
      },
    ],
  },

  // PNEUMONIA
  'pneumonia-komunitas': {
    diseaseId: 'pneumonia-komunitas',
    steps: [
      {
        type: 'assessment',
        title: 'Diagnosis Pneumonia',
        description: 'Gejala respirasi akut + infiltrat foto thorax',
        criteria: [
          'Batuk (produktif/non-produktif)',
          'Demam, menggigil',
          'Sesak napas, chest pain pleuritik',
          'Auskultasi: ronki basah/wheezing',
        ],
      },
      {
        type: 'action',
        title: 'Foto Thorax PA',
        description: 'Confirm infiltrat baru',
        details: 'Cari: consolidation, patchy opacity, efusi pleura, cavitation',
      },
      {
        type: 'assessment',
        title: 'CURB-65 Score (Severity)',
        description: 'Stratifikasi risiko untuk tentukan rawat inap:',
        criteria: [
          'C - Confusion (1 poin)',
          'U - Ureum >7 mmol/L (1 poin)',
          'R - RR ≥30/min (1 poin)',
          'B - BP sistolik <90 atau diastolik ≤60 (1 poin)',
          '65 - Age ≥65 tahun (1 poin)',
        ],
        details: 'Score 0-1: rawat jalan. Score 2: consider rawat inap. Score ≥3: rawat inap (ICU jika ≥4)',
      },
      {
        type: 'decision',
        title: 'CURB-65 ≥2?',
        description: 'Total score 2 atau lebih?',
        branches: {
          yes: 'Rawat inap. Score ≥3 → ICU',
          no: 'Rawat jalan dengan antibiotik oral',
        },
      },
      {
        type: 'action',
        title: 'Antibiotik Empiris - Rawat Inap',
        description: 'CAP rawat inap:',
        medications: [
          { name: 'Ceftriaxone', dose: '1-2 gram IV q24h' },
          { name: 'Azithromycin', dose: '500 mg IV/PO q24h (cover atypical)' },
        ],
        details: 'Kombinasi beta-laktam + makrolid untuk typical & atypical coverage',
        redFlags: [
          'Curiga aspirasi → tambah Metronidazole atau Ampicillin-Sulbactam',
          'Risk MRSA → tambah Vancomycin',
          'Risk Pseudomonas → Piperacillin-Tazobactam/Cefepime',
        ],
      },
      {
        type: 'action',
        title: 'Antibiotik - Rawat Jalan',
        description: 'CURB-65 0-1:',
        medications: [
          { name: 'Amoxicillin', dose: '1 gram PO q8h x 5-7 hari' },
        ],
        details: 'Alt: Amoxicillin-Clavulanate atau Azithromycin jika curiga atypical',
      },
      {
        type: 'info',
        title: 'Supportive & Follow-Up',
        description: 'Monitor clinical improvement 48-72 jam',
        criteria: [
          'O2 target SpO2 >92%',
          'Hidrasi adequate',
          'Antipiretik (paracetamol)',
          'Jika tidak improve → re-assess, foto ulang, culture',
          'Discharge: afebrile >24h, stable vitals, toleransi oral',
        ],
      },
    ],
  },

  // VERTIGO (BPPV)
  'vertigo': {
    diseaseId: 'vertigo',
    steps: [
      {
        type: 'assessment',
        title: 'Bedakan Vertigo Perifer vs Sentral',
        description: 'Karakteristik pusing:',
        criteria: [
          'Berputar (vertigo) atau melayang (dizziness)?',
          'Onset: mendadak atau bertahap?',
          'Durasi: detik-menit (BPPV) vs jam (Meniere) vs hari (vestibular neuronitis)?',
          'Trigger: perubahan posisi kepala?',
          'Penyerta: tinnitus, hearing loss (Meniere)?',
        ],
        details: 'BPPV: vertigo singkat <1 menit, triggered posisi kepala, tanpa hearing loss/neuro signs',
      },
      {
        type: 'assessment',
        title: 'Red Flags - Singkirkan Sentral',
        description: 'Cari tanda stroke/lesi sentral:',
        redFlags: [
          'Sudden severe headache → cerebellar stroke',
          'Focal neuro signs: diplopia, ataxia, weakness, numbness',
          'Dysarthria, dysphagia, altered mental status',
          'Risk factors stroke: hipertensi, DM, AF, age >50',
        ],
        details: 'Jika red flags → URGENT CT/MRI brain. BPPV = diagnosis klinis tanpa red flags',
      },
      {
        type: 'action',
        title: 'Dix-Hallpike Maneuver',
        description: 'Test diagnostik BPPV:',
        details: 'Cara: Duduk → putar kepala 45° → terlentang cepat dengan kepala menggantung 30°. Observe nystagmus + vertigo',
        criteria: [
          'POSITIF: Nystagmus rotatori + vertigo',
          'Latency 1-5 detik',
          'Nystagmus fatigue (berkurang 30-60 detik)',
          'Repeat → fatigable (berkurang)',
        ],
      },
      {
        type: 'decision',
        title: 'Dix-Hallpike positif?',
        description: 'Nystagmus + vertigo timbul?',
        branches: {
          yes: 'BPPV confirmed! Lakukan Epley maneuver',
          no: 'Negatif → consider Meniere, vestibular neuronitis, migraine',
        },
      },
      {
        type: 'action',
        title: 'Epley Maneuver (Canalith Repositioning)',
        description: 'Reposisi otolith:',
        details: 'Epley: (1) Dix-Hallpike position (2) Tahan 1-2 menit (3) Putar kepala 90° (4) Roll pasien ke sisi (5) Dudukkan perlahan. SUCCESS 80-90%!',
        criteria: [
          'Lakukan perlahan',
          'Tunggu nystagmus mereda tiap posisi',
          'Counsel: mungkin mual/pusing saat manuver (normal)',
        ],
      },
      {
        type: 'action',
        title: 'Medikasi Simptomatik (Optional)',
        description: 'SHORT-TERM jika sangat mual/pusing:',
        medications: [
          { name: 'Betahistine', dose: '16-24 mg PO q8h', duration: 'Max 7 hari' },
          { name: 'Meclizine', dose: '25 mg PO q8h PRN', duration: 'Max 7 hari' },
        ],
        redFlags: [
          'JANGAN vestibular suppressants jangka panjang (delay compensation)',
          'Betahistine kontraindikasi: pheochromocytoma, peptic ulcer',
        ],
      },
      {
        type: 'info',
        title: 'Edukasi & Follow-Up',
        description: 'BPPV adalah BENIGN:',
        criteria: [
          'Epley sangat efektif (>80% resolved 1-3 sesi)',
          'Jika rekuren: Brandt-Daroff exercises di rumah',
          'Hindari gerakan kepala mendadak 24-48 jam post-Epley',
          'Follow-up 1 minggu: jika masih vertigo → repeat Epley',
        ],
        details: 'Recurrence 30-50% dalam 3-5 tahun. Jika rekuren, Epley bisa diulang',
      },
    ],
  },
};
