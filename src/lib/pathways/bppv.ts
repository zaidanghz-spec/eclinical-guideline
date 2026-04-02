// ========================================================================
// BENIGN PAROXYSMAL POSITIONAL VERTIGO (BPPV) - PPK Neurologi PERDOSSI 2023
// ========================================================================
// Evidence: Panduan Praktik Klinis Neurologi PERDOSSI 2023, Barany Society 2015/2017,
//           AAO-HNS Clinical Practice Guideline 2017, Cochrane Reviews
// ICD-10: H81.1
//
// SETTING: Klinik Pratama / Faskes Tingkat Pertama
// ALAT TERSEDIA: Tensimeter, Termometer, Pulse Oximeter, EKG 12-lead, Suction, Nebulizer
// ALAT TIDAK TERSEDIA: MRI, CT Scan, Audiometri, VNG/ENG, VEMP, Lab lengkap
//
// Prinsip: Diagnosis BPPV adalah KLINIS (anamnesis + manuver diagnostik).
// Tidak membutuhkan imaging atau lab. CRT dapat dilakukan di klinik manapun.
// Imaging hanya untuk kecurigaan sentral → RUJUK.
//
// Flow: Initial Assessment → Vital Signs (alat tersedia) → Bedside Neuro Exam →
//       Canal Identification via Maneuvers → CRT → Post-CRT Eval →
//       Discharge / Residual / Refractory (Rujuk)
// Total Nodes: 15 nodes (10 checklist + 5 decision)
// ========================================================================

import { DynamicPathway } from '../dynamicPathways';

export const bppvPathway: DynamicPathway = {
  diseaseId: 'vertigo',
  diseaseName: 'Benign Paroxysmal Positional Vertigo (BPPV)',
  startNodeId: 'bppv-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT & ANAMNESIS
    // ============================================================
    'bppv-initial-assessment': {
      id: 'bppv-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Anamnesis & Skrining Awal BPPV',
      description: 'Sesuai PPK Neurologi PERDOSSI 2023 -- Evaluasi keluhan vestibular dan red flags. Diagnosis BPPV sepenuhnya klinis, tidak memerlukan imaging.',
      items: [
        {
          id: 'bppv-vestibular-description',
          title: 'Deskripsi Gejala Vestibular',
          description: 'Identifikasi tipe: vertigo (sensasi berputar), dizziness, unsteadiness, atau vestibulo-visual symptoms. Vertigo posisional = gejala diprovokasi perubahan posisi kepala.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-episode-character',
          title: 'Karakter Episode -- Hilang Timbul & Posisional',
          description: 'Episode berulang vertigo/dizziness yang dicetuskan perubahan posisi: berbaring, miring kanan/kiri, menoleh, menengadah, membungkuk. Tanyakan posisi spesifik pencetus.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-duration-assessment',
          title: 'Durasi Episode -- Umumnya < 1 Menit',
          description: 'Durasi tipikal BPPV: <1 menit per episode. Jika >1 menit: pikirkan diagnosis atipikal atau tambahan. Pasien sering melebih-lebihkan durasi. Residual imbalance/dizziness juga memperpanjang kesan durasi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-associated-symptoms',
          title: 'Gejala Penyerta -- Eksklusi Gejala Non-BPPV',
          description: 'Mual/muntah umum pada BPPV. TIDAK BOLEH ADA: gangguan pendengaran, tinnitus persisten, defisit neurologis fokal. Jika ada tinnitus + hearing loss -> pikirkan Meniere. Jika ada defisit neurologis -> pikirkan sentral.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-risk-factors',
          title: 'Faktor Risiko & Riwayat',
          description: 'Riwayat trauma kepala, bedrest lama, BPPV sebelumnya, osteoporosis (wanita >50 tahun), defisiensi vitamin D, otitis media. Riwayat migren (meningkatkan risiko BPPV). [EBM] Jeong et al. Neurology 2020: defisiensi vitamin D secara signifikan meningkatkan rekurensi BPPV.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-red-flags-screening',
          title: 'RED FLAGS Screening -- Eksklusi Vertigo Sentral',
          description: 'PERIKSA: diplopia, disartria, disfagia, hemiparesis, ataksia, penurunan kesadaran, sakit kepala hebat mendadak ("thunderclap"), nistagmus vertikal murni, nistagmus direction-changing tanpa latensi. JIKA ADA RED FLAG -> BUKAN BPPV, pertimbangkan stroke vertebrobasilar -> RUJUK RS SEGERA.',
          required: true,
          category: 'safety'
        },
        {
          id: 'bppv-medication-history',
          title: 'Riwayat Obat -- Drug-Induced Vertigo/Dizziness',
          description: 'Obat ototoksik (aminoglikosida, furosemide dosis tinggi, cisplatin), antihipertensi (penyebab hipotensi ortostatik), sedatif, antikonvulsan. [EBM] Pertimbangan terbaru: polifarmasi pada lansia sering menyebabkan dizziness non-vestibular, perlu dibedakan dari BPPV.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'bppv-vital-signs-exam'
    },

    // ============================================================
    // NODE 2: VITAL SIGNS & PEMERIKSAAN FISIK (SESUAI ALAT)
    // ============================================================
    'bppv-vital-signs-exam': {
      id: 'bppv-vital-signs-exam',
      type: 'checklist',
      title: 'Node 2: Vital Signs & Pemeriksaan Fisik (Alat Tersedia)',
      description: 'Menggunakan alat yang tersedia: Tensimeter, Termometer, Pulse Oximeter, EKG. Tujuan utama: eksklusi penyebab kardiovaskular & memastikan stabilitas hemodinamik.',
      items: [
        {
          id: 'bppv-bp-lying-sitting',
          title: '[TENSIMETER] Tekanan Darah Baring & Duduk -- Tes Ortostatik',
          description: 'Ukur TD posisi terlentang (5 menit), lalu duduk/berdiri (1 dan 3 menit). POSITIF hipotensi ortostatik jika: drop SBP >=20mmHg ATAU DBP >=10mmHg dalam 3 menit. Jika positif: pusing mungkin karena ortostatik, BUKAN BPPV.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-hr-rhythm',
          title: '[TENSIMETER/PALPASI] Nadi -- Frekuensi & Irama',
          description: 'Hitung nadi manual 60 detik. Irama reguler/ireguler? Bradikardia (<60) atau takikardia (>100) saat istirahat? Aritmia bisa menyebabkan presyncope yang menyerupai vertigo.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-temperature',
          title: '[TERMOMETER] Suhu Tubuh',
          description: 'Demam (>37.5C) pada pasien vertigo: pikirkan infeksi SSP (meningitis, ensefalitis), labyrinthitis, mastoiditis. BPPV TIDAK menyebabkan demam. Jika demam + vertigo: pertimbangkan rujuk.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-spo2',
          title: '[PULSE OXIMETER] Saturasi Oksigen',
          description: 'SpO2 normal >=95%. Hipoksia bisa menyebabkan pusing non-vestibular. Jika SpO2 <94%: evaluasi penyebab respiratori/kardiak terlebih dahulu, bukan BPPV.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-ecg-screening',
          title: '[EKG 12-LEAD] Skrining Aritmia & Iskemia',
          description: 'TUJUAN: eksklusi penyebab kardiak dari pusing/presyncope. Perhatikan: (1) Aritmia -- AF, SVT, bradikardia, heart block, (2) Iskemia -- ST changes, T inversion, (3) Long QT. JIKA ditemukan aritmia/iskemia: pusing kemungkinan kardiak, BUKAN BPPV -> tatalaksana sesuai patologi kardiak. [EBM] ACC/AHA 2017: EKG direkomendasikan pada semua pasien dizziness untuk eksklusi penyebab kardiak (Class I, LOE B).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-ecg-ebm-consideration',
          title: '[PERTIMBANGAN EBM] EKG pada Vertigo Posisional Tipikal',
          description: 'PPK Neurologi 2023: EKG bukan pemeriksaan wajib untuk BPPV tipikal. NAMUN, dengan keterbatasan alat diagnostik lain, EKG menjadi valuable untuk safety-net. Pada pasien >60 tahun atau dengan faktor risiko kardiovaskular: EKG SANGAT direkomendasikan. Centang jika EKG dilakukan dan hasilnya normal.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'bppv-neurological-exam-bedside',
          title: 'Pemeriksaan Neurologis Bedside (Tanpa Alat Khusus)',
          description: 'Kesadaran (GCS 15 wajib pada BPPV). Nervus kranialis: pupil (III), gerakan bola mata (III/IV/VI), sensorik wajah (V), motorik wajah (VII), pendengaran kasar (VIII -- garpu tala/bisikan), menelan (IX/X). Motorik: kekuatan ekstremitas bilateral. Sensorik: raba halus bilateral. Koordinasi: finger-nose-finger, heel-shin.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-hearing-bedside',
          title: 'Tes Pendengaran Bedside (Tanpa Audiometri)',
          description: 'Tes bisik: bisikkan angka/kata pada jarak 30 cm, masing-masing telinga. Tes Weber (garpu tala 512 Hz di vertex): lateralisasi? Tes Rinne (garpu tala depan telinga vs mastoid): AC > BC = normal. JIKA hearing loss unilateral + vertigo: pikirkan Meniere, bukan BPPV. [CATATAN] Audiometri formal tidak tersedia -- tes bedside cukup untuk skrining.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'bppv-vestibular-exam-decision'
    },

    // ============================================================
    // NODE 3: DECISION -- CENTRAL vs PERIPHERAL
    // ============================================================
    'bppv-vestibular-exam-decision': {
      id: 'bppv-vestibular-exam-decision',
      type: 'decision',
      title: 'Decision: Tipe Vertigo -- Perifer vs Sentral vs Kardiak',
      description: 'Berdasarkan anamnesis, vital signs, EKG, dan pemeriksaan neurologis bedside, tentukan profil vertigo pasien dan jalur tatalaksana.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'bppv-peripheral-profile',
          title: 'Profil Vestibular Perifer (Suspect BPPV)',
          description: 'Vertigo posisional, episode singkat (<1 menit), tidak ada defisit neurologis, kesadaran baik, vital signs stabil, EKG normal. Lanjut ke pemeriksaan manuver diagnostik.',
          color: 'green',
          nextNodeId: 'bppv-diagnostic-maneuvers',
          riskLevel: 'low'
        },
        {
          id: 'bppv-central-profile',
          title: 'Suspect Vertigo Sentral (RED FLAGS +) -- RUJUK RS',
          description: 'Ditemukan defisit neurologis, nistagmus atipikal, penurunan kesadaran, atau tanda serebelar. TIDAK DAPAT ditangani di klinik ini. Rujuk RS dengan CT/MRI segera.',
          color: 'red',
          nextNodeId: 'bppv-central-workup',
          riskLevel: 'high'
        },
        {
          id: 'bppv-cardiac-cause',
          title: 'Suspect Penyebab Kardiak -- EKG Abnormal',
          description: 'EKG menunjukkan aritmia, iskemia, atau kelainan konduksi. Pusing kemungkinan presyncope kardiak, bukan vertigo vestibular. Tatalaksana sesuai patologi kardiak.',
          color: 'red',
          nextNodeId: 'bppv-cardiac-referral',
          riskLevel: 'high'
        },
        {
          id: 'bppv-orthostatic-cause',
          title: 'Hipotensi Ortostatik Positif',
          description: 'Drop TD signifikan saat berdiri. Pusing kemungkinan hemodinamik, bukan vestibular. Evaluasi penyebab: dehidrasi, obat antihipertensi, neuropati otonom.',
          color: 'orange',
          nextNodeId: 'bppv-orthostatic-management',
          riskLevel: 'medium'
        },
        {
          id: 'bppv-other-peripheral',
          title: 'Suspect Vestibular Perifer Lain (Non-BPPV)',
          description: 'Vertigo non-posisional, disertai tinnitus/hearing loss (Meniere), atau vertigo kontinu (vestibular neuritis). Evaluasi lebih lanjut.',
          color: 'orange',
          nextNodeId: 'bppv-differential-workup',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 4: DIAGNOSTIC MANEUVERS (PPK Neurologi 2023)
    // Semua manuver ini hanya butuh tempat tidur -- TIDAK perlu alat khusus
    // ============================================================
    'bppv-diagnostic-maneuvers': {
      id: 'bppv-diagnostic-maneuvers',
      type: 'checklist',
      title: 'Node 4: Pemeriksaan Manuver Diagnostik (Bedside, Tanpa Alat Khusus)',
      description: 'Sesuai PPK Neurologi PERDOSSI 2023. Semua manuver hanya membutuhkan tempat tidur periksa. Tidak diperlukan alat vestibular khusus. Siapkan suction di samping tempat tidur untuk antisipasi pasien muntah.',
      items: [
        {
          id: 'bppv-prepare-suction',
          title: '[SUCTION STANDBY] Siapkan Suction di Samping Bed',
          description: 'Manuver diagnostik sering memrovokasi vertigo dan mual hebat. Siapkan suction untuk antisipasi pasien muntah, terutama pada pasien lansia atau dengan risiko aspirasi. Siapkan juga kantong muntah.',
          required: true,
          category: 'safety'
        },
        {
          id: 'bppv-dix-hallpike-right',
          title: 'Manuver Dix-Hallpike -- Sisi Kanan',
          description: 'Pasien duduk, kepala rotasi 45 derajat ke kanan, baring cepat dengan kepala menggantung 20-30 derajat di bawah horizontal. OBSERVASI 30-60 detik: (1) Latensi nistagmus (1-5 detik = khas BPPV), (2) Arah nistagmus (torsional ke telinga bawah + upbeat = kanal posterior kanan), (3) Durasi (<1 menit), (4) Fatigabilitas (berkurang dengan pengulangan). [EBM] Barany Society 2015: Dix-Hallpike adalah gold standard diagnostik BPPV kanal posterior.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-dix-hallpike-left',
          title: 'Manuver Dix-Hallpike -- Sisi Kiri',
          description: 'Kepala rotasi 45 derajat ke kiri, baring cepat. Catat sisi yang lebih provokatif (vertigo + nistagmus lebih kuat = sisi lesi). Jika kedua sisi positif: pertimbangkan bilateral BPPV (~12% kasus).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-dix-hallpike-ebm',
          title: '[PERTIMBANGAN EBM] Side-Lying Test Sebagai Alternatif Dix-Hallpike',
          description: 'EVIDENCE TERBARU -- Cohen et al. 2019: Side-Lying Test memiliki sensitivitas sebanding dengan Dix-Hallpike (95% vs 92%) dan lebih nyaman untuk pasien obese, nyeri leher, atau limited neck extension. TEKNIK: duduk di tepi bed, rebah cepat ke sisi test dengan kepala menghadap ke atas 45 derajat. Centang jika menggunakan metode ini sebagai alternatif.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'bppv-supine-roll-test',
          title: 'Supine Roll Test (untuk Kanal Horizontal)',
          description: 'Pasien terlentang, kepala diangkat 20-30 derajat (bantal tipis), putar kepala 90 derajat ke kanan -> observasi 30 detik -> kembali ke tengah -> putar ke kiri. GEOTROPIC nystagmus (ke arah telinga bawah) = kanalolitiasis, sisi nistagmus lebih kuat = sisi lesi. APOGEOTROPIC (ke arah atas) = kupulolitiasis, sisi nistagmus lebih LEMAH = sisi lesi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-nystagmus-documentation',
          title: 'Dokumentasi Nistagmus (Detail)',
          description: 'CATAT: (1) Manuver yang positif, (2) Sisi positif, (3) Latensi (detik), (4) Arah komponen cepat, (5) Komponen torsional ada/tidak, (6) Durasi (detik), (7) Fatigabilitas. PERIFER: ada latensi, fatigable, torsional, <1 menit. SENTRAL: tidak ada latensi, tidak fatigable, direction-changing, bisa >1 menit.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'bppv-romberg-test',
          title: 'Tes Romberg & Sharpened Romberg',
          description: 'Mata terbuka jatuh = kelainan serebelum (RED FLAG -> rujuk!). Mata tertutup cenderung jatuh ke satu sisi = kelainan vestibular/proprioseptif. Sharpened Romberg (tandem stance): lebih sensitif.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-fukuda-test',
          title: 'Tes Fukuda (Unterberger)',
          description: 'Jalan di tempat 50 langkah dengan mata tertutup. Abnormal jika deviasi >30 derajat ke satu sisi atau maju/mundur >1 meter. Deviasi menunjukkan sisi lesi vestibular. Tidak memerlukan alat.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'bppv-past-pointing',
          title: 'Tes Past Pointing',
          description: 'Kelainan vestibular: mata tertutup, jari deviasi ke arah lesi. Kelainan serebelar: hipermetri atau hipometri.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'bppv-hints-bedside',
          title: '[PERTIMBANGAN EBM] HINTS Exam (Jika Vertigo Akut Kontinu)',
          description: 'EVIDENCE: Kattah et al. Stroke 2009 -- HINTS exam (Head Impulse, Nystagmus type, Test of Skew) memiliki sensitivitas 100% dan spesifisitas 96% untuk stroke pada acute vestibular syndrome, LEBIH BAIK dari MRI dalam 48 jam pertama. HANYA berlaku untuk vertigo akut kontinu, BUKAN untuk BPPV episodik. Centang jika dilakukan dan hasilnya sentral (semua 3 komponen: HI normal, nystagmus direction-changing, skew deviation +) -> RUJUK SEGERA.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'bppv-canal-identification'
    },

    // ============================================================
    // NODE 5: DECISION -- CANAL IDENTIFICATION
    // ============================================================
    'bppv-canal-identification': {
      id: 'bppv-canal-identification',
      type: 'decision',
      title: 'Decision: Identifikasi Kanal Semisirkularis',
      description: 'Berdasarkan hasil manuver diagnostik, tentukan kanal yang terlibat untuk memilih terapi repositioning yang tepat.',
      branches: [
        {
          id: 'bppv-posterior-canal',
          title: 'BPPV Kanal Posterior (Paling Sering ~80%)',
          description: 'Dix-Hallpike (+): nistagmus torsional ke telinga bawah + upbeat, latensi 1-5 detik, durasi <1 menit, fatigable. Terapi: Manuver Epley atau Semont.',
          color: 'blue',
          nextNodeId: 'bppv-posterior-treatment',
          riskLevel: 'low'
        },
        {
          id: 'bppv-horizontal-canal',
          title: 'BPPV Kanal Horizontal (~15%)',
          description: 'Supine Roll Test (+): nistagmus horizontal geotropic (kanalolitiasis) atau apogeotropic (kupulolitiasis). Terapi: Manuver Gufoni atau Lempert.',
          color: 'teal',
          nextNodeId: 'bppv-horizontal-treatment',
          riskLevel: 'low'
        },
        {
          id: 'bppv-anterior-canal',
          title: 'BPPV Kanal Anterior (Jarang ~2%)',
          description: 'Dix-Hallpike: nistagmus downbeat +/- torsional. PERHATIAN: downbeat nystagmus juga bisa sentral. Pertimbangkan rujuk jika ragu.',
          color: 'purple',
          nextNodeId: 'bppv-anterior-treatment',
          riskLevel: 'medium'
        },
        {
          id: 'bppv-no-nystagmus',
          title: 'Probable BPPV (Spontaneously Resolved)',
          description: 'Anamnesis khas BPPV, durasi serangan <1 menit, tapi manuver posisional tidak menimbulkan nistagmus/vertigo saat pemeriksaan. Otokonia kemungkinan sudah kembali ke utrikulus.',
          color: 'green',
          nextNodeId: 'bppv-resolved-management',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 6: POSTERIOR CANAL TREATMENT (Epley / Semont)
    // Hanya butuh tempat tidur -- TIDAK perlu alat khusus
    // ============================================================
    'bppv-posterior-treatment': {
      id: 'bppv-posterior-treatment',
      type: 'checklist',
      title: 'Node 6: Terapi BPPV Kanal Posterior (Epley/Semont)',
      description: 'Canalith Repositioning Therapy (CRT) -- PPK Neurologi 2023, Evidence Level A. Hanya membutuhkan tempat tidur periksa. Efektivitas Epley: 80-95% resolusi dalam 1-3 sesi (Cochrane Review, Hilton & Pinder 2014).',
      items: [
        {
          id: 'bppv-prepare-antiemetic',
          title: 'Persiapan: Antiemetik & Suction Standby',
          description: 'Jika mual berat: Dimenhydrinate 50mg PO (onset 15-30 menit) ATAU Ondansetron 4mg sublingual. Suction standby untuk antisipasi muntah. Jelaskan prosedur kepada pasien: akan terjadi vertigo sementara selama manuver.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-epley-step1',
          title: 'Epley Step 1: Posisi Dix-Hallpike (Sisi Terkena)',
          description: 'Kepala rotasi 45 derajat ke sisi terkena, baring cepat dengan kepala menggantung 20-30 derajat. Tunggu nistagmus hilang + 30 detik tambahan (~1-2 menit total). Pasien akan merasa vertigo -- reassure.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-epley-step2',
          title: 'Epley Step 2: Rotasi Kepala 90 Derajat ke Sisi Sehat',
          description: 'Pertahankan kepala menggantung, rotasi perlahan 90 derajat ke sisi kontralateral. Tunggu 30-60 detik. Nistagmus dapat muncul kembali singkat (normal).',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-epley-step3',
          title: 'Epley Step 3: Rotasi Badan & Kepala ke Posisi Lateral',
          description: 'Pasien miring ke sisi sehat, kepala rotasi lebih lanjut sehingga hidung menghadap lantai (45 derajat dari horizontal). Tunggu 30-60 detik.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-epley-step4',
          title: 'Epley Step 4: Duduk Perlahan',
          description: 'Bantu pasien duduk perlahan dengan kepala tetap sedikit menunduk. Pertahankan posisi duduk 1-2 menit. Observasi gejala. Jika masih vertigo berat: boleh ulangi (maks 3x per sesi).',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-semont-alternative',
          title: 'Alternatif: Prosedur Semont (Liberatory Maneuver)',
          description: 'INDIKASI: pasien obesitas, nyeri leher, kesulitan ekstensi leher, atau kyphosis berat. TEKNIK: duduk -> baring cepat ke sisi terkena (1 menit, kepala 45 derajat dari bed) -> swing cepat 180 derajat ke sisi sehat (1 menit) -> duduk perlahan. [EBM] Chen et al. 2019: Epley dan Semont memiliki efektivitas sebanding (89% vs 85%, p=NS). Pilih sesuai kondisi pasien.',
          required: false,
          category: 'action'
        },
        {
          id: 'bppv-ebm-post-maneuver-restriction',
          title: '[PERTIMBANGAN EBM] Restriksi Posisi Pasca-Epley: Perlu atau Tidak?',
          description: 'PPK LAMA: restriksi posisi 48 jam (tidur semi-duduk, jangan miring ke sisi sakit). EVIDENCE TERBARU -- Cochrane Review (Hilton & Pinder 2014) + AAO-HNS Guideline 2017: restriksi posisi pasca-CRT TIDAK meningkatkan keberhasilan terapi (Level A). NAMUN, beberapa klinisi tetap merekomendasikan sebagai pengaman. Centang preferensi klinis Anda: restriksi diberikan / tidak diberikan.',
          required: false,
          category: 'documentation'
        },
        {
          id: 'bppv-ebm-mastoid-vibration',
          title: '[PERTIMBANGAN EBM] Vibrator Mastoid Saat Epley',
          description: 'EVIDENCE: AAO-HNS 2017 -- penambahan vibrasi mastoid saat manuver Epley TIDAK terbukti meningkatkan efektivitas dibandingkan Epley saja (Level A, Strong Recommendation Against). Tidak perlu alat vibrator khusus. Centang jika dipertimbangkan tapi tidak dilakukan.',
          required: false,
          category: 'documentation'
        },
        {
          id: 'bppv-post-crt-observation',
          title: 'Post-CRT: Observasi 15-30 Menit dengan Monitoring',
          description: 'Pasien duduk tegak. Monitor SpO2 dan nadi (pulse oximeter). Observasi: pusing ringan residual = normal. Vertigo berat rekuren = perlu ulangi manuver. Mual/muntah persisten = pertimbangkan antiemetik tambahan + suction standby.',
          required: true,
          category: 'safety'
        },
        {
          id: 'bppv-symptomatic-medication',
          title: 'Vestibular Suppressant (Simptomatik Sementara SAJA)',
          description: 'Dimenhydrinate 50mg PO 3x/hari (maks 3-5 hari) ATAU Betahistine mesilat 6-24mg 3x/hari. JANGAN diberikan jangka panjang: menghambat kompensasi vestibular sentral. [EBM] AAO-HNS 2017 (Strong Recommendation): vestibular suppressant TIDAK boleh menjadi terapi utama BPPV. CRT adalah terapi utama.',
          required: false,
          category: 'medication'
        }
      ],
      nextNodeId: 'bppv-post-treatment-evaluation'
    },

    // ============================================================
    // NODE 7: HORIZONTAL CANAL TREATMENT (Gufoni / Lempert)
    // ============================================================
    'bppv-horizontal-treatment': {
      id: 'bppv-horizontal-treatment',
      type: 'checklist',
      title: 'Node 7: Terapi BPPV Kanal Horizontal (Gufoni/Lempert)',
      description: 'Canalith Repositioning untuk varian horizontal canal -- PPK Neurologi 2023. Hanya membutuhkan tempat tidur periksa.',
      items: [
        {
          id: 'bppv-horizontal-subtype',
          title: 'Konfirmasi Subtipe: Geotropic vs Apogeotropic',
          description: 'GEOTROPIC (kanalolitiasis): nistagmus ke arah telinga bawah, sisi dengan nistagmus LEBIH KUAT = sisi lesi. Lebih umum, respons terapi lebih baik. APOGEOTROPIC (kupulolitiasis): nistagmus ke arah telinga atas, sisi dengan nistagmus LEBIH LEMAH = sisi lesi. Lebih sulit diterapi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-gufoni-geotropic',
          title: 'Manuver Gufoni (untuk Geotropic/Kanalolitiasis)',
          description: 'Duduk -> baring cepat ke sisi SEHAT -> tunggu 1 menit -> rotasi kepala 45 derajat ke bawah (hidung menghadap lantai) -> tahan 2 menit -> duduk perlahan. [EBM] Mandala et al. 2013: Gufoni efektivitas 74-80% per sesi untuk geotropic HC-BPPV.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-lempert-bbq-roll',
          title: 'Manuver Lempert (BBQ Roll/360-degree Roll)',
          description: 'Terlentang -> rotasi 90 derajat ke sisi SEHAT -> tahan 30-60 detik -> rotasi 90 derajat lagi (telungkup) -> tahan -> rotasi 90 derajat lagi -> tahan -> duduk. Total rotasi 270-360 derajat ke sisi sehat. [EBM] Alternatif jika Gufoni gagal.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-gufoni-apogeotropic',
          title: 'Manuver Gufoni untuk Apogeotropic (Kupulolitiasis)',
          description: 'Duduk -> baring cepat ke sisi TERKENA -> tunggu 1 menit -> rotasi kepala 45 derajat ke ATAS -> tahan 2 menit -> duduk. TUJUAN: mengubah kupulolitiasis menjadi kanalolitiasis, lalu lakukan Gufoni geotropic atau Lempert. [EBM] Kim et al. 2012: konversi rate ~60%.',
          required: false,
          category: 'action'
        },
        {
          id: 'bppv-horizontal-ebm-forced-prolonged',
          title: '[PERTIMBANGAN EBM] Forced Prolonged Position (FPP)',
          description: 'EVIDENCE TERBARU -- Vannucchi et al. 1997/2012: Tidur miring ke sisi SEHAT selama 12 jam (posisi paksa). Efektivitas ~75-90% untuk geotropic HC-BPPV. Dapat digunakan sebagai alternatif/tambahan jika manuver di klinik gagal. Pasien bisa melakukan di rumah. Centang jika diinstruksikan ke pasien.',
          required: false,
          category: 'action'
        },
        {
          id: 'bppv-horizontal-medication',
          title: 'Vestibular Suppressant (Simptomatik Sementara)',
          description: 'Dimenhydrinate 50mg PO 3x/hari ATAU Betahistine 6-24mg 3x/hari ATAU Cinnarizine 15-30mg 3x/hari (kalsium antagonis, PPK Neurologi 2023). Hanya untuk gejala akut berat, maks 3-5 hari.',
          required: false,
          category: 'medication'
        }
      ],
      nextNodeId: 'bppv-post-treatment-evaluation'
    },

    // ============================================================
    // NODE 8: ANTERIOR CANAL TREATMENT
    // ============================================================
    'bppv-anterior-treatment': {
      id: 'bppv-anterior-treatment',
      type: 'checklist',
      title: 'Node 8: Terapi BPPV Kanal Anterior (Jarang)',
      description: 'Varian sangat jarang (~2%). PENTING: downbeat nystagmus juga tanda lesi sentral (serebelum). Jika ragu antara anterior canal BPPV vs sentral, RUJUK ke RS untuk imaging.',
      items: [
        {
          id: 'bppv-anterior-central-exclusion',
          title: 'WAJIB: Pertimbangan Eksklusi Sentral Sebelum Terapi',
          description: 'Downbeat nystagmus juga ditemukan pada: Arnold-Chiari malformation, tumor fossa posterior, stroke serebelar, MS plaque. Di klinik TANPA CT/MRI: andalkan pemeriksaan neurologis bedside. Jika ada tanda serebelar (ataksia, dismetria, dysarthria) -> JANGAN lakukan manuver, RUJUK RS SEGERA. Jika neurologis bersih dan nistagmus khas BPPV anterior (short duration, fatigable): boleh coba Yacovino.',
          required: true,
          category: 'safety'
        },
        {
          id: 'bppv-yacovino-maneuver',
          title: 'Manuver Yacovino (Deep Head-Hanging)',
          description: 'Duduk -> baring cepat dengan kepala head-hanging (ekstensi 30 derajat di bawah horizontal) -> tunggu nistagmus habis + 30 detik -> fleksi kepala cepat (chin-to-chest) -> tahan 30-60 detik -> duduk perlahan. Ulangi 2-3x jika perlu.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-anterior-rujuk-decision',
          title: 'Keputusan: Rujuk atau Follow-Up?',
          description: 'JIKA Yacovino berhasil (nistagmus hilang) DAN tidak ada tanda neurologis: follow-up 1 minggu di klinik. JIKA Yacovino gagal ATAU ada keraguan diagnosis: RUJUK ke RS dengan neurologi/neuro-otologi untuk imaging (MRI fossa posterior). [EBM] AAO-HNS 2017: anterior canal BPPV yang tidak merespons CRT memerlukan imaging untuk eksklusi patologi sentral.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'bppv-post-treatment-evaluation'
    },

    // ============================================================
    // NODE 9: DECISION -- POST-TREATMENT EVALUATION
    // ============================================================
    'bppv-post-treatment-evaluation': {
      id: 'bppv-post-treatment-evaluation',
      type: 'decision',
      title: 'Decision: Evaluasi Post-CRT',
      description: 'Evaluasi respons terapi setelah Canalith Repositioning Therapy. Lakukan ulang manuver diagnostik (Dix-Hallpike atau Supine Roll) untuk konfirmasi resolusi.',
      branches: [
        {
          id: 'bppv-crt-success',
          title: 'CRT Berhasil -- Resolusi Nistagmus & Vertigo',
          description: 'Manuver Dix-Hallpike/Supine Roll negatif. Tidak ada vertigo posisional. Pasien merasa perbaikan signifikan. Lanjut ke discharge & edukasi.',
          color: 'green',
          nextNodeId: 'bppv-discharge-education',
          riskLevel: 'low'
        },
        {
          id: 'bppv-partial-response',
          title: 'Respons Parsial -- Pusing Residual (Bukan Vertigo)',
          description: 'Nistagmus posisional sudah negatif, tapi masih ada pusing non-spesifik (unsteadiness, lightheadedness). Ini normal, terjadi pada 40-60% pasien pasca-CRT.',
          color: 'orange',
          nextNodeId: 'bppv-residual-management',
          riskLevel: 'low'
        },
        {
          id: 'bppv-crt-failure',
          title: 'CRT Gagal -- Vertigo & Nistagmus Persisten',
          description: 'Masih ada nistagmus kuat dan vertigo setelah 3x manuver dalam 1 sesi. Pertimbangkan: identifikasi kanal salah, multi-canal BPPV, kupulolitiasis, atau diagnosis non-BPPV.',
          color: 'red',
          nextNodeId: 'bppv-refractory-management',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 10: DISCHARGE & EDUCATION
    // ============================================================
    'bppv-discharge-education': {
      id: 'bppv-discharge-education',
      type: 'checklist',
      title: 'Node 10: Discharge & Edukasi Pasien',
      description: 'PPK Neurologi 2023: Edukasi penyakit, perjalanan penyakit, pilihan terapi, latihan vestibular, dan luaran. Prognosis: Ad vitam bonam, Ad fungsionam dubia, Ad sanationam dubia.',
      items: [
        {
          id: 'bppv-edu-prognosis',
          title: 'Edukasi Prognosis: Baik, Bukan Penyakit Berbahaya',
          description: 'BPPV adalah gangguan jinak telinga dalam, bukan stroke, bukan tumor. Prognosis baik. Dapat hilang spontan. Ad vitam: bonam. Ad fungsionam: dubia (mungkin kambuh). Gunakan bahasa sederhana yang pasien pahami.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'bppv-edu-recurrence',
          title: 'Edukasi Risiko Kekambuhan & Kapan Harus Kembali',
          description: 'Rekurensi BPPV: ~15% dalam 1 tahun, ~50% lifetime (Brandt et al. 2006). Faktor risiko: usia lanjut, defisiensi vitamin D, osteoporosis, trauma. KEMBALI SEGERA jika: vertigo berulang yang tidak membaik, muncul gejala baru (kelemahan, bicara pelo, gangguan pendengaran).',
          required: true,
          category: 'documentation'
        },
        {
          id: 'bppv-brandt-daroff-instruction',
          title: 'Instruksi Latihan Brandt-Daroff (Rehabilitasi Vestibular di Rumah)',
          description: 'Duduk tegak -> baring miring ke kanan (30 detik atau sampai pusing hilang) -> duduk tegak (30 detik) -> baring miring ke kiri (30 detik) -> duduk. Ulangi 10-20x, 3x sehari, 2 minggu. TUJUAN: habituasi vestibular dan kompensasi sentral. [EBM] PPK Neurologi 2023 merekomendasikan rehabilitasi vestibular. AAO-HNS 2017: VRT efektif untuk residual dizziness (Level B).',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-vitamin-d-calcium',
          title: 'Resep: Suplementasi Vitamin D + Kalsium',
          description: 'PPK Neurologi 2023: suplementasi kalsium direkomendasikan. [EBM TERBARU] Jeong et al. Neurology 2020 (RCT, n=957): vitamin D 400 IU 2x/hari + kalsium karbonat 500mg 2x/hari pada pasien dengan 25-OH vitamin D <20ng/mL -> menurunkan rekurensi BPPV sebesar 24% (ARR 3.8%, NNT=26). PERTIMBANGAN: di klinik tanpa lab, berikan empiris terutama pada wanita postmenopause dan lansia. Centang jika diresepkan.',
          required: false,
          category: 'medication'
        },
        {
          id: 'bppv-ebm-post-restriction-modern',
          title: '[PERTIMBANGAN EBM] Aktivitas Pasca-CRT: Restriksi vs Bebas',
          description: 'GUIDELINE LAMA: tidur semi-duduk, jangan miring ke sisi sakit 48 jam. EVIDENCE TERBARU (AAO-HNS 2017, Level A): restriksi posisi pasca-CRT TIDAK meningkatkan outcome. Boleh beraktivitas normal. NAMUN: hindari olahraga berat/head position change yang ekstrem selama 48 jam masih bisa dipertimbangkan. Centang pilihan klinis Anda.',
          required: false,
          category: 'documentation'
        },
        {
          id: 'bppv-driving-restriction',
          title: 'Restriksi Mengemudi',
          description: 'Jangan mengemudi segera setelah CRT (minimal 30-60 menit). Jika masih ada residual dizziness: hindari mengemudi hingga gejala hilang. Jelaskan risiko vertigo mendadak saat mengemudi.',
          required: true,
          category: 'safety'
        },
        {
          id: 'bppv-medication-discharge',
          title: 'Resep Pulang (Simptomatik Jika Diperlukan)',
          description: 'Dimenhydrinate 50mg tab, 3x1 (maks 3 hari, HANYA jika masih pusing) ATAU Betahistine mesilat 6mg tab, 3x1 (boleh 2 minggu). JANGAN resepkan vestibular suppressant jangka panjang. [EBM] AAO-HNS 2017: Strong Recommendation Against routine vestibular suppressant untuk BPPV.',
          required: true,
          category: 'medication'
        },
        {
          id: 'bppv-follow-up-plan',
          title: 'Rencana Follow-Up',
          description: 'Kontrol 1-2 minggu. Jika gejala menetap saat kontrol: ulangi manuver diagnostik & CRT. Jika rekurensi >3x dalam 1 tahun: rujuk spesialis neurologi/neuro-otologi. Indikasi rawat inap/rujuk RS: vertigo intractable + dehidrasi, kecurigaan sentral.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 11: RESIDUAL DIZZINESS MANAGEMENT
    // ============================================================
    'bppv-residual-management': {
      id: 'bppv-residual-management',
      type: 'checklist',
      title: 'Node 11: Tatalaksana Residual Dizziness Post-CRT',
      description: 'Pusing non-spesifik (bukan vertigo berputar) setelah CRT berhasil. Terjadi pada 40-60% pasien. Rata-rata bertahan 1-4 minggu. BUKAN indikasi CRT ulang jika Dix-Hallpike sudah negatif.',
      items: [
        {
          id: 'bppv-residual-reassurance',
          title: 'Reassurance: Residual Dizziness Adalah Hal Normal',
          description: 'Jelaskan bahwa otokonia sudah berhasil direposisi (BPPV sudah "sembuh"), tapi otak masih perlu waktu untuk rekalibrasi (kompensasi vestibular sentral). Durasi rata-rata 1-4 minggu, bisa sampai 3 bulan pada lansia.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'bppv-vestibular-rehab-home',
          title: 'Rehabilitasi Vestibular di Rumah',
          description: 'Latihan Brandt-Daroff 3x/hari. Latihan gaze stabilization: fiksasi pandangan pada target sambil gerakkan kepala horizontal/vertikal 20x. Latihan keseimbangan: berdiri satu kaki, jalan tandem. [EBM] Cochrane Review (McDonnell & Hillier 2015): VRT efektif mempercepat resolusi residual dizziness post-BPPV (moderate quality evidence).',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-residual-betahistine',
          title: 'Betahistine (Opsional, untuk Kenyamanan Pasien)',
          description: 'Betahistine mesilat 6-24mg 3x/hari atau Betahistine HCl 8-16mg 3x/hari (maks 48mg/hari). Durasi: 2-4 minggu. [EBM] EVIDENCE KONTROVERSIAL: BEMED trial (Cochrane 2016) menunjukkan betahistine tidak superior dibanding plasebo untuk vertigo. NAMUN PPK Neurologi 2023 dan banyak klinisi Asia masih merekomendasikan. Centang jika Anda memilih meresepkan.',
          required: false,
          category: 'medication'
        },
        {
          id: 'bppv-residual-cinnarizine',
          title: '[PERTIMBANGAN EBM] Cinnarizine sebagai Alternatif',
          description: 'PPK Neurologi 2023: Cinnarizine 15-30mg 3x/hari atau 1x75mg/hari (kalsium antagonis vestibular). Dapat mengurangi respons terhadap akselerasi. [EBM] Beberapa RCT kecil menunjukkan efektivitas untuk vertigo perifer. Pilihan jika betahistine tidak tersedia atau tidak efektif. Centang jika dipilih.',
          required: false,
          category: 'medication'
        },
        {
          id: 'bppv-residual-anxiety-screening',
          title: 'Skrining Anxiety & PPPD (Jika Dizziness > 4 Minggu)',
          description: 'Persistent Postural-Perceptual Dizziness (PPPD): dizziness >3 bulan tanpa BPPV aktif, diperberat di lingkungan visual ramai atau berdiri. Faktor risiko: anxietas, neurotisisme. JIKA dicurigai PPPD: RUJUK neurologi/psikiatri. Terapi: SSRI + CBT + VRT.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'bppv-discharge-education'
    },

    // ============================================================
    // NODE 12: REFRACTORY BPPV
    // ============================================================
    'bppv-refractory-management': {
      id: 'bppv-refractory-management',
      type: 'checklist',
      title: 'Node 12: BPPV Refrakter -- Evaluasi & Rujuk',
      description: 'CRT gagal setelah 3x manuver dalam 1 sesi. Di klinik tanpa imaging: fokus pada re-evaluasi kanal dan rujuk jika perlu.',
      items: [
        {
          id: 'bppv-recheck-canal',
          title: 'Re-evaluasi: Apakah Identifikasi Kanal Benar?',
          description: 'Lakukan kembali SEMUA manuver diagnostik (Dix-Hallpike bilateral + Supine Roll). Apakah mungkin: (1) Kanal salah (posterior vs horizontal), (2) Sisi salah, (3) Multi-canal BPPV (6-20% kasus). TIPS: pada multi-canal, tangani kanal posterior terlebih dahulu, lalu horizontal.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-cupulolithiasis-consideration',
          title: 'Pertimbangkan Kupulolitiasis (Otokonia Menempel di Kupula)',
          description: 'Kupulolitiasis lebih refrakter terhadap CRT standar. Tanda: nistagmus yang TIDAK fatigable, durasi lebih lama, apogeotropic pattern pada horizontal. Terapi: manuver liberatory (Semont) lebih efektif dari Epley untuk kupulolitiasis kanal posterior.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'bppv-refractory-home-epley',
          title: '[PERTIMBANGAN EBM] Self-Epley di Rumah',
          description: 'EVIDENCE: Radtke et al. Neurology 2004 (RCT): Self-Epley maneuver efektif sebanding dengan klinik-Epley setelah edukasi. AAO-HNS 2017: Self-administered CRT dapat direkomendasikan (Level B). Ajarkan pasien melakukan Epley sendiri di rumah 3x/hari x 1 minggu, lalu re-evaluasi di klinik.',
          required: false,
          category: 'action'
        },
        {
          id: 'bppv-refractory-imaging-rujuk',
          title: 'Indikasi Rujuk RS untuk Imaging (CT/MRI)',
          description: 'PPK Neurologi 2023: pencitraan TIDAK direkomendasikan jika memenuhi kriteria BPPV tanpa gejala tambahan inkonsisten. INDIKASI RUJUK: (1) Nistagmus atipikal (tidak sesuai pola BPPV manapun), (2) Gejala sentral muncul, (3) Refrakter >3 bulan, (4) Usia muda tanpa faktor risiko (curiga patologi struktural). ALAT IMAGING TIDAK TERSEDIA DI KLINIK INI -> RUJUK RS.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-refractory-specialist-rujuk',
          title: 'Rujuk Spesialis Neurologi / Neuro-Otologi',
          description: 'Surat rujukan harus mencantumkan: (1) Hasil manuver diagnostik (sisi, nistagmus), (2) Terapi CRT yang sudah dilakukan dan hasilnya, (3) Jumlah sesi CRT, (4) Vital signs termasuk tes ortostatik, (5) Hasil EKG. Spesialis dapat melakukan: VNG/ENG, VEMP, audiometri formal, MRI. Kasus refrakter ekstrem: pertimbangan canal plugging surgery (success >95%).',
          required: true,
          category: 'action'
        }
      ]
    },

    // ============================================================
    // NODE 13: CENTRAL VERTIGO -- STABILIZE & RUJUK
    // ============================================================
    'bppv-central-workup': {
      id: 'bppv-central-workup',
      type: 'checklist',
      title: 'Node 13: Suspect Vertigo Sentral -- Stabilisasi & Rujuk RS',
      description: 'RED FLAGS terdeteksi. Di klinik tanpa CT/MRI: fokus pada STABILISASI dan RUJUK SEGERA. Jangan tunda untuk pemeriksaan tambahan. Diagnosis banding: stroke vertebrobasilar, demielinisasi, tumor fossa posterior.',
      items: [
        {
          id: 'bppv-central-stabilize-vitals',
          title: '[PRIORITAS] Stabilisasi Vital Signs',
          description: 'Monitor TD, nadi, SpO2 kontinu dengan alat yang tersedia. JIKA hipertensi berat (SBP >180): pertimbangkan antihipertensi oral sebelum rujuk. JIKA SpO2 <94%: berikan O2 nasal kanul/masker. JIKA bradikardia/takikardia signifikan: monitor EKG kontinu.',
          required: true,
          category: 'safety'
        },
        {
          id: 'bppv-central-hints-bedside',
          title: 'HINTS Exam Bedside (Jika Vertigo Akut Kontinu)',
          description: 'Head Impulse Test: NORMAL (tidak ada catch-up saccade) = SENTRAL. Nystagmus: direction-changing atau vertikal = SENTRAL. Test of Skew: skew deviation (+) = SENTRAL. JIKA >=1 komponen sentral: probabilitas stroke SANGAT TINGGI -> rujuk IGD segera. [EBM] Kattah et al. 2009: HINTS sensitifitas 100% untuk stroke, > MRI dalam 48 jam pertama.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-central-ecg-check',
          title: '[EKG] Periksa EKG Sebelum Rujuk',
          description: 'Stroke posterior circulation bisa disertai aritmia. AF meningkatkan risiko stroke kardioembolik. Dokumen EKG penting untuk RS penerima rujukan. Lampirkan printout EKG dalam surat rujukan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-central-iv-access',
          title: 'Pasang IV Line (Jika Memungkinkan)',
          description: 'IV line NaCl 0.9% untuk akses jika kondisi memburuk dalam perjalanan rujuk. Jika tidak ada fasilitas IV: pastikan pasien bisa minum oral.',
          required: false,
          category: 'action'
        },
        {
          id: 'bppv-central-antiemetic',
          title: 'Antiemetik untuk Kenyamanan Selama Transportasi',
          description: 'Ondansetron 4mg sublingual/PO ATAU Dimenhydrinate 50mg PO/IM. Pasien dengan vertigo sentral akut sering muntah hebat -> suction standby selama transportasi.',
          required: true,
          category: 'medication'
        },
        {
          id: 'bppv-central-rujukan-content',
          title: 'Surat Rujukan ke IGD RS (Wajib Lengkap)',
          description: 'CANTUMKAN: (1) Keluhan utama + onset, (2) Pemeriksaan neurologis bedside lengkap, (3) Hasil HINTS exam, (4) Vital signs serial, (5) Hasil EKG, (6) Red flags yang ditemukan, (7) Obat yang sudah diberikan, (8) Kecurigaan: stroke vertebrobasilar / lesi sentral. MINTA: CT/MRI kepala urgent.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'bppv-central-transport-mode',
          title: 'Transportasi: Ambulans atau Pendamping',
          description: 'JIKA penurunan kesadaran / hemiparesis / suspect stroke akut: AMBULANS wajib. JIKA kesadaran baik, defisit minimal: boleh kendaraan pribadi DENGAN pendamping. Jangan biarkan pasien mengemudi sendiri.',
          required: true,
          category: 'safety'
        }
      ]
    },

    // ============================================================
    // NODE 14: CARDIAC CAUSE -- MANAGEMENT & RUJUK
    // ============================================================
    'bppv-cardiac-referral': {
      id: 'bppv-cardiac-referral',
      type: 'checklist',
      title: 'Node 14: Pusing Penyebab Kardiak -- EKG Abnormal',
      description: 'EKG menunjukkan kelainan. Pusing pasien kemungkinan presyncope kardiak, bukan vertigo vestibular. Tatalaksana sesuai temuan EKG.',
      items: [
        {
          id: 'bppv-cardiac-ecg-interpret',
          title: 'Interpretasi EKG & Klasifikasi Urgensi',
          description: 'URGENT (rujuk IGD segera): STEMI, complete heart block, VT, AF rapid ventricular response, Brugada pattern. SEMI-URGENT (rujuk poli kardiologi): new-onset AF, LBBB, significant ST depression, prolonged QT. NON-URGENT (evaluasi poliklinik): sinus bradycardia, PAC/PVC isolated.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-cardiac-stabilize',
          title: 'Stabilisasi Sesuai Temuan EKG',
          description: 'AF rapid: rate control jika tersedia (tidak ada beta-blocker IV -> rujuk). Bradikardia simptomatik: Atropine 0.5mg IV jika tersedia, jika tidak -> rujuk segera. STEMI: Aspirin 160mg kunyah + rujuk IGD. Monitor SpO2 + nadi kontinu selama menunggu transportasi.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-cardiac-rujuk',
          title: 'Rujuk Kardiologi / IGD RS',
          description: 'Lampirkan printout EKG. Cantumkan vital signs, keluhan awal (pasien datang dengan keluhan "pusing"), temuan EKG abnormal, dan tindakan yang sudah dilakukan.',
          required: true,
          category: 'action'
        }
      ]
    },

    // ============================================================
    // NODE 15: ORTHOSTATIC HYPOTENSION MANAGEMENT
    // ============================================================
    'bppv-orthostatic-management': {
      id: 'bppv-orthostatic-management',
      type: 'checklist',
      title: 'Node 15: Hipotensi Ortostatik -- Evaluasi & Tatalaksana',
      description: 'Tes ortostatik positif (drop SBP >=20 atau DBP >=10). Pusing pasien kemungkinan hemodinamik, bukan vestibular. Perlu evaluasi penyebab.',
      items: [
        {
          id: 'bppv-orthostatic-cause',
          title: 'Identifikasi Penyebab Hipotensi Ortostatik',
          description: 'Penyebab tersering: (1) Dehidrasi -- asupan kurang, diare, muntah, (2) Obat antihipertensi -- terutama diuretik, alpha-blocker, (3) Neuropati otonom (DM lama), (4) Anemia, (5) Insuffisiensi adrenal. Tanyakan obat-obatan dan intake cairan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-orthostatic-hydration',
          title: 'Rehidrasi & Non-Farmakologis',
          description: 'Rehidrasi oral (jika bisa minum) atau IV NaCl 0.9% 500mL. Edukasi: minum cukup (2-3L/hari), bangkit perlahan (duduk dulu 30 detik sebelum berdiri), stoking kompresi, tinggikan kepala tempat tidur 10-15 derajat saat tidur.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-orthostatic-medication-review',
          title: 'Review Obat Penyebab Ortostatik',
          description: 'Jika pasien minum antihipertensi: pertimbangkan penurunan dosis atau ganti golongan (koordinasi dengan dokter yang meresepkan). Jika obat baru ditambahkan baru-baru ini: sangat mungkin penyebabnya.',
          required: true,
          category: 'medication'
        },
        {
          id: 'bppv-orthostatic-bppv-coexist',
          title: '[PERTIMBANGAN] Apakah BPPV Juga Ada Bersamaan?',
          description: 'Hipotensi ortostatik dan BPPV bisa ko-eksistensi, terutama pada lansia. Jika setelah rehidrasi TD sudah stabil TAPI masih ada vertigo posisional khas: lanjutkan evaluasi BPPV (kembali ke manuver diagnostik). Centang jika akan melanjutkan evaluasi BPPV.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'bppv-orthostatic-rujuk',
          title: 'Rujuk Jika: Ortostatik Berat atau Penyebab Tidak Jelas',
          description: 'RUJUK jika: (1) Sinkop berulang, (2) Ortostatik berat tidak merespons rehidrasi, (3) Suspek neuropati otonom, (4) Suspek anemia (pucat, takikardi) -- perlu lab darah (tidak tersedia di klinik).',
          required: false,
          category: 'action'
        }
      ]
    },

    // ============================================================
    // NODE 16: DIFFERENTIAL DIAGNOSIS WORKUP
    // ============================================================
    'bppv-differential-workup': {
      id: 'bppv-differential-workup',
      type: 'checklist',
      title: 'Node 16: Evaluasi Diagnosis Banding Vestibular Perifer Non-BPPV',
      description: 'Vertigo perifer yang tidak sesuai profil BPPV. Di klinik tanpa audiometri/VNG: diagnosis banding berdasarkan klinis. Rujuk jika diperlukan pemeriksaan lanjutan.',
      items: [
        {
          id: 'bppv-ddx-meniere',
          title: 'Penyakit Meniere',
          description: 'Triad: vertigo episodik (20 menit - 12 jam, BUKAN detik), tinnitus, hearing loss fluktuatif (sensorineural low-frequency). Aural fullness. TES BEDSIDE: Weber lateralisasi ke telinga sehat, Rinne AC>BC bilateral (SNHL). Diagnosis pasti butuh audiometri -> RUJUK THT. Terapi awal: diet rendah garam, betahistine 48mg/hari.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-ddx-vestibular-neuritis',
          title: 'Vestibular Neuritis',
          description: 'Vertigo akut KONTINU (bukan episodik!), berdurasi hari-minggu. TANPA tinnitus dan hearing loss. Head impulse test POSITIF (catch-up saccade ke sisi lesi). Post-infeksi viral. TES BEDSIDE: HINTS exam menunjukkan profil perifer (HI positif, nistagmus unidirectional, no skew). Terapi di klinik: (1) Metilprednisolon 100mg/hari taper 3 minggu [EBM: Strupp et al. NEJM 2004], (2) Vestibular suppressant short-term, (3) VRT early. JIKA tidak membaik 3-7 hari -> rujuk.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-ddx-vestibular-migraine',
          title: 'Vestibular Migraine',
          description: 'Vertigo episodik (5 menit - 72 jam) + riwayat migren (current atau past). 50% TANPA headache saat episode vertigo. Foto/phonophobia, aura visual. DIAGNOSIS: Barany Society/ICHD-3 criteria (min 5 episodes). Di klinik tanpa alat: diagnosis klinis. Terapi: sama dengan prophylaxis migren (propranolol, amitriptyline, topiramate). RUJUK neurologi untuk konfirmasi dan manajemen jangka panjang.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-ddx-labyrinthitis',
          title: 'Labyrinthitis',
          description: 'Seperti vestibular neuritis TAPI disertai hearing loss (karena melibatkan cochlea + vestibular). Sering post-viral atau post-otitis media. TES BEDSIDE: Weber lateralisasi ke telinga sehat, hearing loss unilateral. RUJUK THT untuk audiometri dan tatalaksana.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'bppv-ddx-decision',
          title: 'Keputusan: Tatalaksana di Klinik atau Rujuk?',
          description: 'DAPAT DI KLINIK: vestibular neuritis ringan (terapi steroid + VRT), probable vestibular migraine (profilaksis). HARUS RUJUK: Meniere (butuh audiometri), labyrinthitis (butuh audiometri), vestibular neuritis berat (tidak bisa makan/minum), diagnosis tidak jelas setelah evaluasi lengkap.',
          required: true,
          category: 'action'
        }
      ]
    },

    // ============================================================
    // NODE 17: RESOLVED BPPV MANAGEMENT
    // ============================================================
    'bppv-resolved-management': {
      id: 'bppv-resolved-management',
      type: 'checklist',
      title: 'Node 17: Probable BPPV -- Spontaneously Resolved',
      description: 'Anamnesis khas BPPV tapi manuver diagnostik negatif saat pemeriksaan. Otokonia kemungkinan sudah kembali ke utrikulus secara spontan.',
      items: [
        {
          id: 'bppv-resolved-confirm-negative',
          title: 'Konfirmasi: Manuver Dix-Hallpike & Supine Roll Negatif',
          description: 'Tidak ada nistagmus posisional dan vertigo saat manuver diagnostik. Vital signs stabil. EKG normal. Anamnesis sesuai kriteria probable BPPV (Barany Society 2015).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bppv-resolved-brandt-daroff',
          title: 'Instruksi Latihan Brandt-Daroff (Preventif)',
          description: 'Tetap ajarkan latihan sebagai rehabilitasi vestibular dan pencegahan rekurensi. 10-20 repetisi, 3x/hari, 2 minggu. Juga berfungsi sebagai self-diagnostic: jika vertigo muncul saat latihan, kemungkinan BPPV rekuren.',
          required: true,
          category: 'action'
        },
        {
          id: 'bppv-resolved-vitamin-d',
          title: 'Suplementasi Vitamin D + Kalsium (Preventif)',
          description: 'Vitamin D 400-800 IU/hari + Kalsium 500mg 2x/hari. [EBM] Jeong et al. Neurology 2020: menurunkan rekurensi BPPV 24% pada pasien defisiensi vitamin D. Di klinik tanpa lab: berikan empiris pada pasien risiko tinggi (wanita postmenopause, lansia, kurang paparan matahari).',
          required: false,
          category: 'medication'
        },
        {
          id: 'bppv-resolved-return-precaution',
          title: 'Return Precaution: Kapan Harus Kembali',
          description: 'KEMBALI SEGERA jika: (1) Vertigo berulang yang dicetuskan perubahan posisi, (2) Vertigo semakin berat atau durasi semakin lama, (3) Muncul gejala BARU: kelemahan, bicara pelo, gangguan pendengaran, sakit kepala hebat. Jelaskan bahwa rekurensi BPPV umum terjadi (~50% lifetime) dan bisa ditangani ulang di klinik.',
          required: true,
          category: 'documentation'
        }
      ]
    }
  }
};
