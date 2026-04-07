import { DynamicPathway } from '../dynamicPathways';

export const intoksikasiKimiaPathway: DynamicPathway = {
  diseaseId: 'intoksikasi-kimia',
  diseaseName: 'Intoksikasi & Keracunan Akut (IS 1.19 & 1.20)',
  startNodeId: 'initial-stabilization',
  nodes: {
    'initial-stabilization': {
      id: 'initial-stabilization',
      type: 'checklist',
      title: 'Initial Stabilization (ABCDE) - Sardjito 2025 Protocol',
      description: 'Prioritas pada resusitasi dan pencegahan penyerapan toksin lebih lanjut.',
      items: [
        { id: 'airway-patency', title: 'Airway & Aspirasi', description: 'Cek patensi jalan napas. Waspadai aspirasi pada penurunan kesadaran.', required: true, category: 'assessment' },
        { id: 'breathing-ventilation', title: 'Breathing & Oksigenasi', description: 'Berikan Oksigen. Monitor SpO2. Ventilasi mekanik jika depresi napas (misal: opioid/organofosfat).', required: true, category: 'assessment' },
        { id: 'circulation-fluid', title: 'Circulation & Resusitasi', description: 'Cek TD dan Nadi. Bolus kristaloid 10-20 ml/kg jika hipotensi. Pertimbangkan inotropik/vasopressor.', required: true, category: 'action' },
        { id: 'disability-glucose', title: 'Disability (GCS & Glukosa)', description: 'Cek GCS. Cek GDS: Beri D40 1-2 ampul jika hipoglikemia sebelum intubasi.', required: true, category: 'assessment' },
        { id: 'exposure-decon', title: 'Exposure & Dekontaminasi Kulit', description: 'Lepas pakaian yang terkontaminasi. Cuci kulit dengan air mengalir/sabun (15-20 menit).', required: true, category: 'action' }
      ],
      nextNodeId: 'toxidrome-identification'
    },
    'toxidrome-identification': {
      id: 'toxidrome-identification',
      type: 'decision',
      title: 'Identifikasi Toksidrom & Jenis Racun',
      description: 'Tentukan jenis zat berdasarkan tanda klinis spesifik bagi pemilihan antidotum.',
      branches: [
        { id: 'branch-corrosive', title: 'Zat Korosif / Chemical Injury', description: 'Luka bakar mulut, nyeri menelan, NPO target.', color: 'red', nextNodeId: 'corrosive-management' },
        { id: 'branch-op-cholinergic', title: 'Insektisida (Organofosfat)', description: 'Salivasi (SLUDGE), miosis, fasikulasi, bradikardia.', color: 'blue', nextNodeId: 'pesticide-management' },
        { id: 'branch-methanol', title: 'Metanol / Alkohol Oplosan', description: 'Mata kabur (snowfield vision), asidosis metabolik hebat.', color: 'purple', nextNodeId: 'methanol-management' },
        { id: 'branch-paracetamol', title: 'Parasetamol (Acetaminophen)', description: 'Ingesti >7g (dewasa) atau >200mg/kg (anak).', color: 'orange', nextNodeId: 'paracetamol-management' },
        { id: 'branch-pufferfish', title: 'Ikan Buntal (Tetrodotoxin)', description: 'Parestesia mulut, kelemahan otot, paralisis napas.', color: 'green', nextNodeId: 'pufferfish-management' }
      ]
    },
    'corrosive-management': {
      id: 'corrosive-management',
      type: 'checklist',
      title: 'Manajemen Cedera Korosif (Caustic)',
      description: 'Berdasarkan IS 1.19. Fokus pada pencegahan komplikasi saluran cerna.',
      items: [
        { id: 'strict-npo', title: 'Strict NPO (Puasa)', description: 'Dilarang memberikan apapun per-oral. Pasang NGT jika aman untuk drainase.', required: true, category: 'safety' },
        { id: 'no-lavage-rule', title: 'DILARANG Bilas Lambung / Arang Aktif', description: 'PHAILS: Asam/Basa adalah kontraindikasi arang aktif dan bilas lambung.', required: true, category: 'safety' },
        { id: 'egd-12h', title: 'EGD (Endoskopi) 12-24 Jam', description: 'Evaluasi grading luka bakar (Zargar) untuk menentukan prognosis.', required: false, category: 'action' }
      ],
      nextNodeId: 'general-monitoring'
    },
    'pesticide-management': {
      id: 'pesticide-management',
      type: 'checklist',
      title: 'Manajemen Keracunan Organofosfat',
      description: 'Target: "Atropinization" (Drying of secretions).',
      items: [
        { id: 'op-atropine', title: 'Atropinisasi (Titrated)', description: 'Dosis awal 2-5 mg IV (dewasa) / 0.05 mg/kg (anak). Double dosis tiap 3-5 menit.', required: true, category: 'medication' },
        { id: 'atropin-target', title: 'Target: Paru Kering', description: 'Lanjutkan hingga sekresi paru menghilang, HR >80, BP stabil, Midriasis.', required: true, category: 'action' },
        { id: 'pralidoxime-2pam', title: 'Pralidoxime (2-PAM)', description: 'Berikan sebelum terjadi "Aging". Dosis 30 mg/kg bolus lalu infus berkelanjutan.', required: false, category: 'medication' },
        { id: 'no-morphine-op', title: 'Hindari Morfin & Fenotiazin', description: 'Dapat memicu depresi pernapasan lebih lanjut.', required: true, category: 'safety' }
      ],
      nextNodeId: 'general-monitoring'
    },
    'methanol-management': {
      id: 'methanol-management',
      type: 'checklist',
      title: 'Manajemen Keracunan Metanol',
      description: 'Berdasarkan IS 1.20. Target: Mencegah pembentukan asam format.',
      items: [
        { id: 'antidote-ethanol', title: 'Antidotum: Ethanol / Fomepizole', description: 'Ethanol target serum 100-150 mg/dL untuk blokade ADH.', required: true, category: 'medication' },
        { id: 'folate-therapy', title: 'Suplemen Folat (Leucovorin)', description: 'Mempercepat metabolisme Formate menjadi CO2 + H2O.', required: false, category: 'medication' },
        { id: 'hemodialysis-ind', title: 'Indikasi Hemodialysis (HD)', description: 'pH <7.3, gangguan visus, atau kadar metanol >50 mg/dL.', required: false, category: 'action' },
        { id: 'bicarb-acidosis', title: 'Koreksi Bikarbonat', description: 'Berikan jika asidosis metabolik berat (pH <7.2).', required: false, category: 'medication' }
      ],
      nextNodeId: 'general-monitoring'
    },
    'paracetamol-management': {
      id: 'paracetamol-management',
      type: 'checklist',
      title: 'Manajemen Overdosis Parasetamol',
      description: 'Antisipasi hepatotoksisitas akibat NAPQI.',
      items: [
        { id: 'nac-antidote', title: 'Antidotum: N-acetylcysteine (NAC)', description: 'Sangat efektif jika dimulai <8-10 jam. Plot pada Rumack-Matthew nomogram.', required: true, category: 'medication' },
        { id: 'lab-liver', title: 'Cek Fungsi Hati (ALT/AST)', description: 'Pantau kenaikan enzim hati secara serial (baseline, 24h, 48h).', required: true, category: 'assessment' },
        { id: 'aa-recent', title: 'Arang Aktif (Jika Ingesti <1 Jam)', description: 'Dose: 50-100g (Adult) / 1g/kg (Child) untuk kurangi absorpsi.', required: false, category: 'action' }
      ],
      nextNodeId: 'general-monitoring'
    },
    'pufferfish-management': {
      id: 'pufferfish-management',
      type: 'checklist',
      title: 'Manajemen Keracunan Ikan Buntal (TTX)',
      description: 'Dikutip dari IS 1.20. Tidak ada antidotum spesifik.',
      items: [
        { id: 'resp-support-ttx', title: 'Support Pernapasan Agresif', description: 'Risiko utama kematian adalah kelumpuhan otot napas. Siapkan Ventilator.', required: true, category: 'action' },
        { id: 'gastric-bicarb', title: 'Bilas Lambung dengan Bikarbonat 2%', description: 'Zat TTX kurang stabil dalam suasana alkali. Lakukan jika ingesti <60 min.', required: false, category: 'action' },
        { id: 'observe-neuro', title: 'Observasi Neurologis 24 Jam', description: 'Hati-hati terhadap progresi cepat kegagalan napas.', required: true, category: 'assessment' }
      ],
      nextNodeId: 'general-monitoring'
    },
    'general-monitoring': {
      id: 'general-monitoring',
      type: 'checklist',
      title: 'Monitoring Lanjutan & Kriteria ICU',
      description: 'Stabilisasi pasca resusitasi dan rencana level of care.',
      items: [
        { id: 'icu-admission', title: 'Kriteria ICU/HCU', description: 'Butuh intubasi, kejang, GCS <12, asidosis berat, atau diritmia jantung.', required: true, category: 'action' },
        { id: 'psych-assess', title: 'Konsultasi Psikiatri', description: 'Wajib pada kasus percobaan bunuh diri (Self-harm intent).', required: true, category: 'documentation' },
        { id: 'lab-monitoring', title: 'Evaluasi Lab Serial', description: 'Ambil sampel produk lambung (50ml), darah, dan urin untuk identifikasi laboratorium.', required: false, category: 'assessment' }
      ]
    }
  }
};
