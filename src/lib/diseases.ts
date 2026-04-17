export interface Disease {
  id: string;
  name: string;
  nameEn: string;
  organSystem: string;
  isEmergency: boolean;
  timeToIntervention?: string;
  prevalenceIndonesia: string;
  keywords: string[];
}

export const diseases: Disease[] = [
  // KARDIOVASKULAR (5 penyakit)
  {
    id: 'sindrom-koroner-akut',
    name: 'Sindrom Koroner Akut (SKA / STEMI / NSTEMI / UAP)',
    nameEn: 'Acute Coronary Syndrome',
    organSystem: 'kardiovaskular',
    isEmergency: true,
    timeToIntervention: '90 menit (door-to-balloon)',
    prevalenceIndonesia: 'Penyebab kematian #1 di Indonesia',
    keywords: ['chest pain', 'nyeri dada', 'stemi', 'nstemi', 'unstable angina', 'heart attack']
  },
  {
    id: 'heart-failure',
    name: 'Gagal Jantung',
    nameEn: 'Heart Failure',
    organSystem: 'kardiovaskular',
    isEmergency: false,
    prevalenceIndonesia: 'Prevalensi 0.13% populasi Indonesia',
    keywords: ['sesak napas', 'edema', 'orthopnea', 'dyspnea', 'fatigue']
  },
  {
    id: 'hipertensi-dewasa',
    name: 'Hipertensi Dewasa (PNPK 2021)',
    nameEn: 'Hypertension',
    organSystem: 'kardiovaskular',
    isEmergency: false,
    prevalenceIndonesia: '34.1% penduduk dewasa (Riskesdas 2018)',
    keywords: ['blood pressure', 'tekanan darah tinggi', 'headache', 'sakit kepala', 'dizziness', 'pusing', 'high blood pressure', 'darah tinggi', 'krisis hipertensi', 'emergency', 'tengkuk kaku', 'leher kaku']
  },
  {
    id: 'arrhythmias',
    name: 'Aritmia Komprehensif (PERKI/InaHRS)',
    nameEn: 'Comprehensive Cardiac Arrhythmias',
    organSystem: 'kardiovaskular',
    isEmergency: true,
    timeToIntervention: 'Cardiac arrest: CPR segera. Instabil dengan nadi: cardioversi < 30 menit. Rate control AF: < 24 jam',
    prevalenceIndonesia: 'AF 0.5-1% Indonesia, risiko stroke 5x. VT/VF penyebab SCD terbanyak. SVT 2.25/1000 prevalensi',
    keywords: ['aritmia', 'AF', 'atrial fibrillation', 'fibrilasi atrium', 'SVT', 'tachycardia', 'VT', 'bradikardi', 'cardiac arrest', 'henti jantung', 'EKG', 'palpitasi', 'sinkop', 'jantung berdebar', 'rate control', 'adenosin', 'amiodarone', 'atropin', 'defibrilasi', 'cardioversi', 'blok AV']
  },

  {
    id: 'dvt',
    name: 'Deep Vein Thrombosis (DVT)',
    nameEn: 'Deep Vein Thrombosis',
    organSystem: 'kardiovaskular',
    isEmergency: false,
    prevalenceIndonesia: 'Meningkat dengan mobilitas rendah',
    keywords: ['leg swelling', 'kaki bengkak', 'nyeri betis', 'calf pain']
  },
  {
    id: 'pulmonary-embolism',
    name: 'Emboli Paru',
    nameEn: 'Pulmonary Embolism',
    organSystem: 'kardiovaskular',
    isEmergency: true,
    timeToIntervention: '3 jam',
    prevalenceIndonesia: 'Komplikasi DVT, mortalitas tinggi',
    keywords: ['sudden dyspnea', 'sesak mendadak', 'chest pain', 'hemoptisis']
  },

  // RESPIRASI (5 penyakit)
  {
    id: 'pneumonia-komunitas',
    name: 'Pneumonia Komunitas (CAP)',
    nameEn: 'Community-Acquired Pneumonia',
    organSystem: 'respirasi',
    isEmergency: false,
    prevalenceIndonesia: 'Leading cause infectious death worldwide. Mortalitas 1-3% (outpatient), 9% (inpatient), 15-40% (ICU). Strep pneumoniae most common (30-50%)',
    keywords: ['pneumonia', 'CAP', 'cough', 'batuk', 'demam', 'fever', 'sesak', 'dyspnea', 'sputum', 'infiltrate', 'CURB-65', 'amoxicillin', 'ceftriaxone']
  },
  {
    id: 'tuberkulosis-paru',
    name: 'Tuberkulosis Paru',
    nameEn: 'Pulmonary Tuberculosis',
    organSystem: 'respirasi',
    isEmergency: false,
    prevalenceIndonesia: 'Indonesia RANK #2 TB burden worldwide (845k cases/year). Cure rate 85% DS-TB, 50-70% DR-TB. Early diagnosis & DOTS critical (End TB Strategy 2035)',
    keywords: ['TB', 'tuberculosis', 'chronic cough', 'batuk kronik', 'night sweats', 'keringat malam', 'weight loss', 'hemoptysis', 'GeneXpert', 'RHZE', 'DOTS', 'MDR-TB']
  },
  {
    id: 'asthma-exacerbation',
    name: 'Eksaserbasi Asma Akut',
    nameEn: 'Acute Asthma Exacerbation',
    organSystem: 'respirasi',
    isEmergency: true,
    timeToIntervention: '20 menit (nebulisasi)',
    prevalenceIndonesia: 'Prevalensi 4.5% populasi Indonesia',
    keywords: ['wheezing', 'mengi', 'sesak napas', 'breathlessness', 'chest tightness']
  },
  {
    id: 'copd-exacerbation',
    name: 'Eksaserbasi PPOK',
    nameEn: 'COPD Exacerbation',
    organSystem: 'respirasi',
    isEmergency: false,
    prevalenceIndonesia: 'Prevalensi 3.7% dewasa >30 tahun',
    keywords: ['chronic dyspnea', 'sesak kronik', 'productive cough', 'batuk berdahak', 'barrel chest']
  },
  {
    id: 'covid-19',
    name: 'COVID-19',
    nameEn: 'COVD-19',
    organSystem: 'respirasi',
    isEmergency: false,
    prevalenceIndonesia: 'Endemic di Indonesia sejak 2020',
    keywords: ['covid', 'corona', 'fever', 'demam', 'anosmia', 'fatigue']
  },
  {
    id: 'ispa',
    name: 'ISPA (Infeksi Saluran Pernapasan Akut)',
    nameEn: 'Acute Respiratory Infection (ISPA)',
    organSystem: 'respirasi',
    isEmergency: false,
    prevalenceIndonesia: 'Kasus tersering di Puskesmas, klinik, & RS - mencakup common cold, pharyngitis, bronchitis hingga pneumonia',
    keywords: ['ispa', 'batuk', 'pilek', 'faringitis', 'rhinitis', 'sinusitis', 'bronkitis', 'sore throat', 'common cold', 'pneumonia', 'cap', 'respiratory infection']
  },

  // NEUROLOGI (5 penyakit)
  {
    id: 'tia',
    name: 'Transient Ischemic Attack (TIA)',
    nameEn: 'Transient Ischemic Attack',
    organSystem: 'neurologi',
    isEmergency: true,
    timeToIntervention: '24 jam',
    prevalenceIndonesia: '30% berkembang jadi stroke dalam 5 tahun',
    keywords: ['temporary weakness', 'kelemahan sementara', 'transient numbness']
  },
  {
    id: 'meningitis',
    name: 'Meningitis Bakterial',
    nameEn: 'Bacterial Meningitis',
    organSystem: 'neurologi',
    isEmergency: true,
    timeToIntervention: '1 jam (antibiotik)',
    prevalenceIndonesia: 'Mortalitas 15-20% dengan pengobatan',
    keywords: ['headache', 'sakit kepala', 'stiff neck', 'kaku kuduk', 'fever', 'photophobia']
  },
  {
    id: 'seizures',
    name: 'Status Epileptikus',
    nameEn: 'Status Epilepticus',
    organSystem: 'neurologi',
    isEmergency: true,
    timeToIntervention: '5 menit (benzodiazepin)',
    prevalenceIndonesia: 'Epilepsi prevalensi 0.5-1%',
    keywords: ['seizure', 'kejang', 'convulsion', 'loss of consciousness']
  },
  {
    id: 'vertigo',
    name: 'Vertigo (BPPV)',
    nameEn: 'Benign Paroxysmal Positional Vertigo',
    organSystem: 'neurologi',
    isEmergency: false,
    prevalenceIndonesia: 'Penyebab vertigo perifer tersering (~80% kasus vertigo posisional). ICD-10: H81.1. PPK Neurologi PERDOSSI 2023',
    keywords: ['dizziness', 'pusing berputar', 'spinning', 'nausea', 'imbalance', 'vertigo', 'bppv', 'posisional', 'positional', 'dix hallpike', 'epley', 'nistagmus', 'nystagmus', 'miring', 'telentang', 'berputar', 'pusing', 'mual', 'kepala', 'posisi']
  },
  {
    id: 'tension-type-headache',
    name: 'Nyeri Kepala Tipe Tegang (TTH)',
    nameEn: 'Tension-Type Headache',
    organSystem: 'neurologi',
    isEmergency: false,
    prevalenceIndonesia: 'Nyeri kepala tersering di Indonesia dan dunia. Prevalensi lifetime 80-90% populasi umum. ICD-10: G44.2. PPK Neurologi PERDOSSI 2023',
    keywords: ['sakit kepala', 'headache', 'tension headache', 'nyeri kepala', 'tth', 'kepala tegang', 'kepala berat', 'stress headache', 'headache bilateral', 'nyeri kepala bilateral', 'menekan', 'mengikat', 'tension type', 'g44.2', 'amitriptyline', 'nyeri kepala tipe tegang']
  },

  // GASTROINTESTINAL
  {
    id: 'dispepsia',
    name: 'Dispepsia & H. Pylori (PGI 2021)',
    nameEn: 'Dyspepsia & H. Pylori',
    organSystem: 'gastrointestinal',
    isEmergency: false,
    prevalenceIndonesia: 'Keluhan tersering #1 di poli penyakit dalam',
    keywords: ['maag', 'nyeri ulu hati', 'dispepsia', 'dyspepsia', 'gerd', 'asam lambung', 'h. pylori', 'perut perih', 'kembung', 'perut sebah', 'mual', 'cepat kenyang', 'rasa penuh']
  },
  {
    id: 'acute-gastroenteritis',
    name: 'Diare Akut dan Kronik (PGI 2024)',
    nameEn: 'Acute and Chronic Diarrhea',
    organSystem: 'gastrointestinal',
    isEmergency: true,
    timeToIntervention: 'Segera bila curiga syok dehidrasi (<2 jam)',
    prevalenceIndonesia: 'Prevalensi 4.3% populasi',
    keywords: ['diarrhea', 'diare', 'mencret', 'muntah', 'disentri', 'dehydration', 'bab cair']
  },
  {
    id: 'typhoid-fever',
    name: 'Demam Tifoid',
    nameEn: 'Typhoid Fever',
    organSystem: 'gastrointestinal',
    isEmergency: false,
    prevalenceIndonesia: 'Endemic di Indonesia, insidensi tinggi',
    keywords: ['prolonged fever', 'demam berkepanjangan', 'stepladder fever', 'rose spots', 'malaise']
  },
  {
    id: 'acute-appendicitis',
    name: 'Apendisitis Akut',
    nameEn: 'Acute Appendicitis',
    organSystem: 'gastrointestinal',
    isEmergency: true,
    timeToIntervention: '24 jam (pembedahan)',
    prevalenceIndonesia: 'Emergency bedah tersering',
    keywords: ['right lower quadrant pain', 'nyeri perut kanan bawah', 'mcburney point', 'fever']
  },
  {
    id: 'upper-gi-bleeding',
    name: 'Perdarahan Saluran Cerna Atas',
    nameEn: 'Upper GI Bleeding',
    organSystem: 'gastrointestinal',
    isEmergency: true,
    timeToIntervention: '6-24 jam (endoskopi)',
    prevalenceIndonesia: 'Mortalitas 5-10%',
    keywords: ['hematemesis', 'muntah darah', 'melena', 'black stool', 'dizziness']
  },
  {
    id: 'acute-pancreatitis',
    name: 'Pankreatitis Akut',
    nameEn: 'Acute Pancreatitis',
    organSystem: 'gastrointestinal',
    isEmergency: true,
    timeToIntervention: '24 jam (resusitasi cairan)',
    prevalenceIndonesia: 'Mortalitas 2-10% (mild-severe)',
    keywords: ['severe abdominal pain', 'nyeri perut hebat', 'nausea', 'lipase elevation']
  },

  // PENYAKIT INFEKSI TROPIS (5 penyakit)
  {
    id: 'dbd',
    name: 'Demam Berdarah Dengue (DBD)',
    nameEn: 'Dengue Hemorrhagic Fever',
    organSystem: 'infeksi-tropis',
    isEmergency: true,
    timeToIntervention: '2-4 jam (cairan resusitasi)',
    prevalenceIndonesia: 'Endemic sepanjang tahun di Indonesia',
    keywords: ['high fever', 'demam tinggi', 'demam', 'fever', 'thrombocytopenia', 'trombosit rendah', 'plasma leakage', 'epistaxis', 'mimisan', 'perdarahan', 'bleeding', 'petechiae', 'dengue', 'gusi berdarah', 'gum bleeding', 'nose bleeding', 'hidung berdarah']
  },
  {
    id: 'malaria',
    name: 'Malaria',
    nameEn: 'Malaria',
    organSystem: 'infeksi-tropis',
    isEmergency: false,
    prevalenceIndonesia: 'Endemic di Indonesia Timur (Papua, NTT)',
    keywords: ['periodic fever', 'demam periodik', 'chills', 'menggigil', 'sweating', 'splenomegaly']
  },
  {
    id: 'leptospirosis',
    name: 'Leptospirosis',
    nameEn: 'Leptospirosis',
    organSystem: 'infeksi-tropis',
    isEmergency: false,
    prevalenceIndonesia: 'Meningkat saat banjir',
    keywords: ['fever', 'demam', 'conjunctival suffusion', 'myalgia', 'jaundice']
  },
  {
    id: 'sepsis',
    name: 'Sepsis / Syok Septik',
    nameEn: 'Sepsis / Septic Shock',
    organSystem: 'infeksi-tropis',
    isEmergency: true,
    timeToIntervention: '1 jam (antibiotik + cairan)',
    prevalenceIndonesia: 'Mortalitas 30-50%',
    keywords: ['fever', 'hypotension', 'tachycardia', 'altered mental status', 'organ dysfunction']
  },
  {
    id: 'hiv-opportunistic',
    name: 'Infeksi Oportunistik HIV',
    nameEn: 'HIV-Related Opportunistic Infections',
    organSystem: 'infeksi-tropis',
    isEmergency: false,
    prevalenceIndonesia: 'Prevalensi HIV 0.4% populasi dewasa',
    keywords: ['weight loss', 'chronic diarrhea', 'tb', 'candidiasis', 'cd4 low']
  },

  // ENDOKRIN & METABOLIK (5 penyakit)
  {
    id: 'diabetes-melitus',
    name: 'Diabetes Melitus Tipe 2',
    nameEn: 'Diabetes Mellitus Type 2',
    organSystem: 'endokrin',
    isEmergency: false,
    prevalenceIndonesia: 'Prevalensi 10.7% populasi dewasa Indonesia (Riskesdas 2018)',
    keywords: ['diabetes', 'dm', 'gula darah tinggi', 'polyuria', 'polydipsia', 'polyphagia', 'hba1c', 'kencing manis', 'metabolic syndrome', 'sering kencing', 'sering haus', 'haus terus', 'lapar terus', 'berat badan turun', 'luka sulit sembuh']
  },
  {
    id: 'dka',
    name: 'Ketoasidosis Diabetik (DKA)',
    nameEn: 'Diabetic Ketoacidosis',
    organSystem: 'endokrin',
    isEmergency: true,
    timeToIntervention: '1 jam (insulin + cairan)',
    prevalenceIndonesia: 'Komplikasi DM tipe 1, mortalitas <5% dengan terapi tepat',
    keywords: ['hyperglycemia', 'gula darah tinggi', 'kussmaul breathing', 'fruity breath', 'nausea']
  },
  {
    id: 'hypoglycemia',
    name: 'Hipoglikemia Berat',
    nameEn: 'Severe Hypoglycemia',
    organSystem: 'endokrin',
    isEmergency: true,
    timeToIntervention: '15 menit (dekstrosa IV)',
    prevalenceIndonesia: 'Komplikasi terapi diabetes tersering',
    keywords: ['low blood sugar', 'gula darah rendah', 'confusion', 'sweating', 'tremor', 'seizure']
  },
  {
    id: 'thyroid-storm',
    name: 'Krisis Tiroid',
    nameEn: 'Thyroid Storm',
    organSystem: 'endokrin',
    isEmergency: true,
    timeToIntervention: '2 jam',
    prevalenceIndonesia: 'Mortalitas 10-30%',
    keywords: ['hyperthyroid', 'tachycardia', 'fever', 'agitation', 'tremor']
  },
  {
    id: 'adrenal-crisis',
    name: 'Krisis Adrenal',
    nameEn: 'Adrenal Crisis',
    organSystem: 'endokrin',
    isEmergency: true,
    timeToIntervention: '30 menit (hidrokortison)',
    prevalenceIndonesia: 'Rare, mortalitas tinggi tanpa terapi',
    keywords: ['hypotension', 'shock', 'hyponatremia', 'hyperkalemia', 'abdominal pain']
  },

  // ALERGI & DERMATOLOGI
  {
    id: 'intoksikasi-kimia',
    name: 'Intoksikasi & Keracunan Akut',
    nameEn: 'Acute Poisoning & Chemical Injury',
    organSystem: 'toksikologi',
    isEmergency: true,
    timeToIntervention: 'Segera (<15 menit resusitasi & dekontaminasi)',
    prevalenceIndonesia: 'Penyebab 5-10% admisi IGD di RS rujukan (terutama Oplosan, Pestisida, Parasetamol)',
    keywords: ['keracunan', 'intoksikasi', 'poisoning', 'oplosan', 'metanol', 'methanol', 'parasetamol', 'paracetamol', 'panadol', 'pufferfish', 'ikan buntal', 'baygon', 'pestisida', 'organofosfat', 'zat korosif', 'asam', 'basa', 'minyak tanah', 'bensin', 'chemical injury', 'suicide', 'bunuh diri']
  },
  {
    id: 'reaksi-alergi',
    name: 'Reaksi Alergi Akut & Urtikaria',
    nameEn: 'Acute Allergic Reaction & Urticaria',
    organSystem: 'kulit-alergi',
    isEmergency: true,
    timeToIntervention: 'Anafilaksis: Epinefrin dalam <5 menit. Angioedema laring: <10 menit',
    prevalenceIndonesia: 'Urtikaria akut: 15-25% populasi seumur hidup. Anafilaksis: meningkat 1-3% di Indonesia. Penyebab tersering: obat, makanan, sengatan serangga.',
    keywords: ['alergi', 'gatal', 'ruam', 'urtikaria', 'biduran', 'bentol', 'angioedema', 'bengkak bibir', 'bengkak wajah', 'anafilaksis', 'anaphylaxis', 'epinefrin', 'syok alergi', 'reaksi obat', 'alergi makanan', 'hives', 'allergy']
  },
  {
    id: 'insect-bite-reaction',
    name: 'Reaksi Gigitan Serangga / Arthropoda',
    nameEn: 'Insect Bite / Sting Reaction',
    organSystem: 'kulit-alergi',
    isEmergency: true,
    timeToIntervention: 'Segera (<20 menit) pantau syok anafilaktif',
    prevalenceIndonesia: 'Tinggi insidensinya untuk gigitan tawon (Vespa affinis), ubur-ubur, dan serangga lain',
    keywords: ['gigitan serangga', 'insect bite', 'sengatan lebah', 'bengkak', 'anafilaksis', 'tawon', 'ubur-ubur', 'kelabang', 'T63.4', 'ant', 'semut', 'nyamuk', 'serangga', 'bentol']
  },
  {
    id: 'otitis-eksterna',
    name: 'Otitis Eksterna (KMK 1186/2022)',
    nameEn: 'Otitis Externa',
    organSystem: 'kulit-alergi',
    isEmergency: false,
    prevalenceIndonesia: 'Kasus THT tersering di fasilitas primer. Insiden 1% populasi per tahun. OE Maligna: komplikasi fatal pada DM/imunokompromais',
    keywords: ['otitis eksterna', 'telinga gatal', 'telinga nyeri', 'ear pain', 'otalgia', 'swimmers ear', 'furunkel telinga', 'liang telinga', 'mae', 'discharge telinga', 'otomikosis', 'oe maligna', 'otitis externa']
  },
  {
    id: 'konjungtivitis',
    name: 'Konjungtivitis Akut (KMK 1186/2022)',
    nameEn: 'Conjunctivitis',
    organSystem: 'kulit-alergi',
    isEmergency: false,
    prevalenceIndonesia: 'Kasus mata tersering di FKTP Indonesia. Chemical injury = darurat kebutaan. Adenovirus (EKC) bisa wabah di sekolah/kantor',
    keywords: ['mata merah', 'red eye', 'konjungtivitis', 'conjunctivitis', 'gatal mata', 'mata berair', 'mata belekan', 'discharge mata', 'mata gatal', 'mata meradang', 'mata sakit', 'iritasi mata', 'chemical eye', 'paparan kimia mata']
  },

  // MUSKULOSKELETAL & TRAUMA
  {
    id: 'myalgia',
    name: 'Myalgia / Nyeri Otot Non-Spesifik',
    nameEn: 'Myalgia / Non-Specific Muscle Pain',
    organSystem: 'muskuloskeletal',
    isEmergency: false,
    prevalenceIndonesia: 'Termasuk dalam 10 penyakit terbanyak di Puskesmas dan Poli Umum klinik primer.',
    keywords: ['myalgia', 'nyeri otot', 'kaku otot', 'pegal', 'otot tegang', 'rhabdomyolysis', 'sams', 'statin', 'm79.1', 'pegal linu', 'kram']
  },
  {
    id: 'fraktur',
    name: 'Fraktur (Terbuka & Tertutup)',
    nameEn: 'Fracture (Open & Closed)',
    organSystem: 'muskuloskeletal',
    isEmergency: true,
    timeToIntervention: 'Open fracture: antibiotics <3h, surgery <24h. Vascular injury: <6h',
    prevalenceIndonesia: 'Trauma muskuloskeletal 30-40% kasus trauma. Open fracture infection risk 0-50% tergantung Gustilo grade',
    keywords: ['fraktur', 'patah tulang', 'trauma', 'fracture', 'open fracture', 'closed fracture', 'gustilo', 'compartment syndrome', 'bone', 'ortopedi']
  },
  {
    id: 'sprain-strain',
    name: 'Sprain dan Strain (Keseleo/Terkilir)',
    nameEn: 'Sprain and Strain (Soft Tissue Injury)',
    organSystem: 'muskuloskeletal',
    isEmergency: false,
    prevalenceIndonesia: 'Kasus cedera tersering di FKTP / IGD (Olahraga, aktivitas harian, KLL ringan)',
    keywords: ['keseleo', 'terkilir', 'sprain', 'strain', 'otot robek', 'ligamen robek', 'ankle sprain', 'bengkak sendi', 'cedera', 'trauma', 'PRICE', 'POLICE', 'ottawa', 'nyeri sendi']
  },
    {
    id: 'acute-kidney-injury',
    name: 'Gangguan Ginjal Akut (GGA)',
    nameEn: 'Acute Kidney Injury (AKI)',
    organSystem: 'endokrin',
    isEmergency: true,
    timeToIntervention: 'Segera',
    prevalenceIndonesia: 'Insidensi meningkat pada pasien ICU dan pasca pembedahan',
    keywords: ['aki', 'gga', 'gagal ginjal akut', 'kreatinin', 'oliguria', 'cuci darah', 'dialisis', 'kidney injury', 'urine sedikit']
  }
];

export const organSystems = [
  {
    id: 'kardiovaskular',
    name: 'Kardiovaskular',
    nameEn: 'Cardiovascular',
    icon: '',
    color: 'red',
    count: diseases.filter(d => d.organSystem === 'kardiovaskular').length
  },
  {
    id: 'respirasi',
    name: 'Respirasi',
    nameEn: 'Respiratory',
    icon: '',
    color: 'blue',
    count: diseases.filter(d => d.organSystem === 'respirasi').length
  },
  {
    id: 'neurologi',
    name: 'Neurologi',
    nameEn: 'Neurology',
    icon: '',
    color: 'purple',
    count: diseases.filter(d => d.organSystem === 'neurologi').length
  },
  {
    id: 'gastrointestinal',
    name: 'Gastrointestinal',
    nameEn: 'Gastrointestinal',
    icon: '',
    color: 'orange',
    count: diseases.filter(d => d.organSystem === 'gastrointestinal').length
  },
  {
    id: 'infeksi-tropis',
    name: 'Penyakit Infeksi Tropis',
    nameEn: 'Tropical Infectious Diseases',
    icon: '',
    color: 'green',
    count: diseases.filter(d => d.organSystem === 'infeksi-tropis').length
  },
  {
    id: 'endokrin',
    name: 'Endokrin & Metabolik',
    nameEn: 'Endocrine & Metabolic',
    icon: '',
    color: 'yellow',
    count: diseases.filter(d => d.organSystem === 'endokrin').length
  },
  {
    id: 'kulit-alergi',
    name: 'Kulit & Alergi',
    nameEn: 'Dermatology & Allergy',
    icon: '',
    color: 'pink',
    count: diseases.filter(d => d.organSystem === 'kulit-alergi').length
  },
  {
    id: 'muskuloskeletal',
    name: 'Muskuloskeletal & Trauma',
    nameEn: 'Musculoskeletal & Trauma',
    icon: '',
    color: 'orange',
    count: diseases.filter(d => d.organSystem === 'muskuloskeletal').length
  },
  {
    id: 'emergency-toxicology',
    name: 'Gawat Darurat & Toksikologi',
    nameEn: 'Emergency & Toxicology',
    icon: '',
    color: 'red',
    count: diseases.filter(d => d.organSystem === 'emergency-toxicology').length
  },
];

export const emergencyDiseases = diseases.filter(d => d.isEmergency);