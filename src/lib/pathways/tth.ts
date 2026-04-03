// ========================================================================
// NYERI KEPALA TIPE TEGANG (TENSION-TYPE HEADACHE) - G44.2
// Referensi: PPK Neurologi PERDOSSI 2023, ICHD-3, Konsensus Nasional V
//            Pokdi Nyeri Kepala Perdossi 2016, SIGN, Permenkes RI
// Flow: Anamnesis → Red Flag → Pemfis + TTV → Klasifikasi Frekuensi →
//       Terapi Akut (Episodik) atau Profilaksis (Kronik) → Non-Farmako →
//       Edukasi → Kriteria Rujukan
// ========================================================================

import { DynamicPathway } from '../dynamicPathways';

export const tthPathway: DynamicPathway = {
  diseaseId: 'tension-type-headache',
  diseaseName: 'Nyeri Kepala Tipe Tegang (TTH) G44.2',
  startNodeId: 'tth-anamnesis',
  nodes: {

    // ============================================================
    // NODE 1: ANAMNESIS & RED FLAG SCREENING
    // ============================================================
    'tth-anamnesis': {
      id: 'tth-anamnesis',
      type: 'checklist',
      title: 'Node 1: Anamnesis & Skrining Red Flag',
      description: '📋 PPK Neurologi PERDOSSI 2023 — Karakteristik nyeri kepala tipe tegang dan identifikasi tanda bahaya',
      items: [
        {
          id: 'tth-chief-complaint',
          title: '🗣️ Keluhan Utama & Karakteristik Nyeri',
          description: 'Nyeri kepala bilateral, terasa menekan/mengikat seperti diikat di sekeliling kepala. Intensitas ringan–sedang. Tidak berdenyut. Lokasi: temporal bilateral, oksipital, atau seluruh kepala. Dapat menjalar ke leher dan bahu.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-duration',
          title: '⏱️ Durasi Serangan',
          description: 'Berlangsung 30 menit hingga 7 hari penuh (per ICHD-3). Tanyakan: kapan mulai? berapa lama tiap serangan? apakah terus-menerus atau hilang timbul?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-frequency-history',
          title: '📅 Frekuensi Serangan (Kunci Klasifikasi)',
          description: 'Hitung berapa hari/bulan terjadi nyeri kepala selama minimal 3 bulan terakhir:\n• <1 hari/bulan (<12 hari/tahun) → Infrequent Episodic\n• 1–14 hari/bulan selama ≥3 bulan (12–180 hari/tahun) → Frequent Episodic\n• ≥15 hari/bulan selama >3 bulan (>180 hari/tahun) → Chronic TTH',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-associated-symptoms',
          title: '🚫 Tidak Ada Mual/Muntah (Kriteria ICHD-3)',
          description: 'TTH TIDAK disertai mual atau muntah (boleh anoreksia). Konfirmasi: apakah ada mual/muntah? Jika ada → pertimbangkan Migren! Fotofobia ATAU fonofobia boleh ada, tapi tidak keduanya sekaligus.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-physical-activity',
          title: '🏃 Nyeri Tidak Memburuk dengan Aktivitas Fisik',
          description: 'TTH: nyeri TIDAK bertambah berat saat berjalan, naik tangga, atau aktivitas fisik rutin. Jika memburuk dengan aktivitas → curiga Migren.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-stress-trigger',
          title: '🧠 Faktor Pencetus & Psikologis',
          description: 'Tanyakan: stres pekerjaan/keluarga, kurang tidur, postur kerja buruk, dehidrasi, lapar, perubahan cuaca. Pada TTH kronik: evaluasi kecemasan (GAD) dan depresi (PHQ-9) sebagai manifestasi konflik psikologis yang mendasari.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-medication-history',
          title: '💊 Riwayat Penggunaan Obat Nyeri',
          description: 'PENTING: Berapa hari/minggu menggunakan analgetik? Jika >2 hari/minggu → risiko Medication Overuse Headache (MOH). Obat apa? Dosis? Sudah berapa lama? Riwayat ergotamin?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-redflag-sudden-severe',
          title: '🚨 RED FLAG: Nyeri "Thunderclap" / Mendadak Sangat Berat',
          description: 'Nyeri kepala terberat dalam hidup, onset mendadak dalam hitungan detik → WASPADAI SAH (Subarachnoid Hemorrhage)! Jika ada → RUJUK SEGERA ke IGD/Spesialis Saraf.',
          required: true,
          category: 'safety'
        },
        {
          id: 'tth-redflag-progressive',
          title: '🚨 RED FLAG: Nyeri Progresif & Gejala Neurologis',
          description: 'Waspadai jika: pertama kali di usia >50 tahun, memburuk progresif, disertai demam/kaku kuduk, penurunan kesadaran, defisit neurologis fokal, papilledema, riwayat kanker/HIV → RUJUK ke Spesialis Saraf.',
          required: true,
          category: 'safety'
        },
        {
          id: 'tth-ddx-screen',
          title: '🔍 Skrining Diagnosis Banding',
          description: 'Singkirkan:\n• Migren (unilateral, berdenyut, mual/muntah, foto+fonofobia)\n• Nyeri Kepala Klaster (unilateral periorbital, lakrimasi, rhinore)\n• Nyeri kepala sekunder: hipertensi, infeksi, gangguan metabolik, THT, gigi, mata\n• Nyeri kepala servikogenik\n• Psikosomatis',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'tth-redflag-decision'
    },

    // ============================================================
    // NODE 2: DECISION — RED FLAG PRESENT?
    // ============================================================
    'tth-redflag-decision': {
      id: 'tth-redflag-decision',
      type: 'decision',
      title: 'Node 2: Apakah Terdapat Red Flag?',
      description: '⚠️ Evaluasi tanda bahaya sebelum melanjutkan tatalaksana TTH',
      warningLevel: 'warning',
      branches: [
        {
          id: 'redflag-yes',
          title: '🚨 RED FLAG (+) — Rujuk Segera',
          description: 'Thunderclap onset, defisit neurologis, demam+kaku kuduk, progresif, usia >50 baru onset, kanker/HIV → STOP tatalaksana primer, rujuk ke Spesialis Saraf / IGD.',
          icon: '🚨',
          color: 'red',
          nextNodeId: 'tth-referral-urgent',
          riskLevel: 'high'
        },
        {
          id: 'redflag-no',
          title: '✅ RED FLAG (-) — Lanjut Pemeriksaan Fisik',
          description: 'Tidak ada tanda bahaya → lanjutkan pemeriksaan fisik dan TTV.',
          icon: '✅',
          color: 'green',
          nextNodeId: 'tth-physical-exam',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: URGENT REFERRAL
    // ============================================================
    'tth-referral-urgent': {
      id: 'tth-referral-urgent',
      type: 'checklist',
      title: 'Node 3: Tatalaksana Pra-Rujukan — Red Flag (+)',
      description: '🚨 Stabilisasi pasien sebelum dirujuk ke Spesialis Saraf / IGD',
      items: [
        {
          id: 'ref-ttv-monitor',
          title: '📊 Monitoring TTV Segera',
          description: 'Ukur TD (tensi), HR, RR, SpO2 (oxymeter), Suhu (termometer). Catat: TD ≥180/120 dengan nyeri kepala → Hypertensive Emergency! SpO2 <94% → suplementasi O2.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ref-ecg',
          title: '📈 EKG 12 Lead (jika tersedia)',
          description: 'Lakukan EKG untuk menyingkirkan penyebab kardiovaskular (aritmia, iskemia). Khususnya jika ada nyeri dada atau palpitasi bersamaan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ref-iv-access',
          title: '💉 Pasang Akses IV & Posisikan Pasien',
          description: 'Pasang IV line, posisikan pasien nyaman (berbaring dengan kepala sedikit elevasi 30°). Siapkan suction jika ada risiko aspirasi/muntah.',
          required: true,
          category: 'action'
        },
        {
          id: 'ref-documentation',
          title: '📋 Dokumentasi Rujukan Lengkap',
          description: 'Buat surat rujukan: onset, karakteristik nyeri, TTV, temuan pemeriksaan fisik, obat yang sudah diberikan. Komunikasikan ke fasilitas tujuan.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'ref-criteria-note',
          title: '📌 Kriteria Rujukan ke Spesialis Saraf (PPK 2023)',
          description: 'a) Jika nyeri kepala tidak membaik → rujuk ke faskes sekunder dengan dokter Spesialis Saraf.\nb) Jika depresi berat dengan kemungkinan bunuh diri → rujuk ke Spesialis Jiwa untuk rawat bersama neurolog.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 4: PEMERIKSAAN FISIK + TTV
    // ============================================================
    'tth-physical-exam': {
      id: 'tth-physical-exam',
      type: 'checklist',
      title: 'Node 4: Pemeriksaan Fisik & TTV',
      description: '🩺 PPK Neurologi 2023: Pemeriksaan fisik umum dan neurologis dalam batas normal pada TTH',
      items: [
        {
          id: 'tth-ttv-bp',
          title: '🔴 Tensi (TD) — Tensi Meter',
          description: 'Ukur tekanan darah kedua lengan. TD Normal <140/90 mmHg. Jika TD ≥180/120 → pertimbangkan nyeri kepala hipertensi sekunder, bukan TTH murni. Dokumentasikan: ___ / ___ mmHg.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-ttv-temp',
          title: '🌡️ Suhu — Termometer',
          description: 'Ukur suhu tubuh. Normal 36.5–37.5°C. Suhu ≥38°C + nyeri kepala → WASPADAI meningitis/ensefalitis (RED FLAG). Dokumentasikan: ___°C.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-ttv-spo2',
          title: '💜 Saturasi O2 — Oxymeter',
          description: 'Ukur SpO2. Normal ≥95%. SpO2 <94% dapat menyebabkan nyeri kepala hipoksik (sekunder). Dokumentasikan: ___%. [EBM: Hipoksia adalah penyebab nyeri kepala sekunder yang harus disingkirkan - ICHD-3 G44.821]',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-ttv-hr-rr',
          title: '❤️ Nadi & Frekuensi Napas',
          description: 'HR normal 60–100x/menit. RR normal 16–20x/menit. Takikardia + nyeri kepala dapat menandakan infeksi sistemik atau anemia.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-ecg-if-indicated',
          title: '📈 EKG 12 Lead — Sesuai Indikasi',
          description: 'Lakukan EKG jika: usia >40 tahun, ada keluhan dada, palpitasi, atau riwayat penyakit jantung. Pada TTH murni tanpa komorbid kardiovaskular → EKG tidak rutin diperlukan.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'tth-neuro-exam',
          title: '🧠 Pemeriksaan Neurologis',
          description: 'Pada TTH: pemeriksaan neurologi DALAM BATAS NORMAL (PPK 2023). Periksa: GCS, orientasi, pupil, kekuatan motorik, refleks fisiologis & patologis, tanda meningeal (Kernig, Brudzinski), nervus kranialis. Jika ABNORMAL → RED FLAG, pertimbangkan diagnosis lain.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-pericranial-tenderness',
          title: '👆 Palpasi Otot Perikranial',
          description: '[EBM] Palpasi manual otot temporalis, masseter, sternokleidomastoideus, trapezius, dan suboksipital. TTH sering disertai peningkatan tenderness otot perikranial. Positif jika nyeri tekan meningkat (Baldry, 2005; Jensen, 2018).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-cervical-exam',
          title: '🦒 Pemeriksaan Leher & Postur',
          description: 'Periksa ROM leher, nyeri tekan vertebra servikal, dan postur kepala-leher. Nyeri kepala servikogenik sebagai diagnosis banding. Postur forward head → faktor risiko TTH.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-suction-standby',
          title: '🔧 Suction — Standby (Sesuai Kondisi)',
          description: 'Siapkan suction jika pasien tampak mual berat atau ada risiko muntah dan aspirasi. Pada TTH murni biasanya tidak diperlukan karena tidak ada mual/muntah.',
          required: false,
          category: 'safety'
        },
        {
          id: 'tth-nebulizer-note',
          title: '💨 Nebulizer — Sesuai Indikasi',
          description: 'Nebulizer tidak diindikasikan untuk TTH. Dapat digunakan jika ada komorbid respirasi (asma, PPOK) yang memerlukan bronkodilator. Catat status respirasi pasien.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'tth-classification-decision'
    },

    // ============================================================
    // NODE 5: DECISION — KLASIFIKASI FREKUENSI TTH
    // ============================================================
    'tth-classification-decision': {
      id: 'tth-classification-decision',
      type: 'decision',
      title: 'Node 5: Klasifikasi TTH Berdasarkan Frekuensi (ICHD-3)',
      description: '📊 Tentukan tipe TTH sesuai frekuensi serangan untuk memilih strategi terapi yang tepat',
      warningLevel: 'info',
      branches: [
        {
          id: 'tth-infrequent',
          title: '🟢 TTH EPISODIK INFREQUENT — <1 hari/bulan (<12 hari/tahun)',
          description: 'Serangan jarang. Terapi: analgetik akut sesuai kebutuhan saja. Tidak perlu profilaksis. Edukasi pencetus.',
          icon: '🟢',
          color: 'green',
          nextNodeId: 'tth-infrequent-treatment',
          riskLevel: 'low'
        },
        {
          id: 'tth-frequent',
          title: '🟡 TTH EPISODIK FREQUENT — 1–14 hari/bulan, ≥3 bulan (12–180 hari/tahun)',
          description: 'Serangan sedang-sering. Terapi: analgetik akut + pertimbangkan profilaksis jika frekuensi tinggi. Non-farmakologi penting.',
          icon: '🟡',
          color: 'yellow',
          nextNodeId: 'tth-frequent-treatment',
          riskLevel: 'low'
        },
        {
          id: 'tth-chronic',
          title: '🔴 TTH KRONIK — ≥15 hari/bulan, >3 bulan (>180 hari/tahun)',
          description: 'Serangan sangat sering/harian. Terapi profilaksis WAJIB (amitriptyline). Evaluasi psikologis. Hati-hati MOH.',
          icon: '🔴',
          color: 'red',
          nextNodeId: 'tth-chronic-treatment',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 6A: TERAPI — TTH EPISODIK INFREQUENT
    // ============================================================
    'tth-infrequent-treatment': {
      id: 'tth-infrequent-treatment',
      type: 'checklist',
      title: 'Node 6A: Tatalaksana TTH Episodik Infrequent',
      description: '🟢 PPK Neurologi 2023 — Terapi Akut Analgetik Sesuai Kebutuhan (PRN)',
      items: [
        {
          id: 'inf-diagnosis-confirm',
          title: '✅ Konfirmasi Diagnosis TTH Episodik Infrequent',
          description: 'Memenuhi kriteria ICHD-3: episodik <1 hari/bulan, bilateral, menekan/mengikat, intensitas ringan–sedang, tidak bertambah dengan aktivitas, tidak ada mual/muntah, maks 1 dari: fotofobia atau fonofobia.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'inf-first-line-analgesic',
          title: '💊 Analgetik Lini Pertama (Pilih Salah Satu)',
          description: 'Sesuai PPK Neurologi 2023:\n• Aspirin 1000 mg/hari\n• Asetaminofen (Paracetamol) 1000 mg/hari\n[EBM: Cochrane review 2016 — keduanya efektif pada TTH episodik, NNT aspirin ~5, NNT paracetamol ~12 untuk respons penuh dalam 2 jam]',
          required: true,
          category: 'medication'
        },
        {
          id: 'inf-nsaid-option',
          title: '💊 Alternatif: NSAID (jika Aspirin/Paracetamol Tidak Cukup)',
          description: 'Pilihan NSAID sesuai PPK 2023:\n• Naproxen 500 mg/hari\n• Ketoprofen 25 mg/hari\n• Asam mefenamat\n• Ibuprofen 400 mg/hari\n• Diklofenak 50 mg/hari\n[EBM: Ibuprofen 400 mg — NNT 8.3 untuk headache relief 2 jam - Cochrane 2019]\n⚠️ Hati-hati: riwayat ulkus peptikum, gangguan ginjal/hati.',
          required: true,
          category: 'medication'
        },
        {
          id: 'inf-caffeine-combination',
          title: '☕ Kombinasi Kafein Analgetik (Opsional)',
          description: 'Sesuai PPK 2023:\n• Kafein analgetik kurang lebih 65 mg\n• Kombinasi aspirin + asetaminofen + kafein\n[EBM: Kafein meningkatkan efektivitas analgetik 40% pada nyeri kepala - JAMA 1991]\n⚠️ Batasi penggunaan kafein harian untuk mencegah dependency headache.',
          required: false,
          category: 'medication'
        },
        {
          id: 'inf-limit-days',
          title: '⚠️ PENTING: Batasi Penggunaan Analgetik ≤2 Hari/Minggu',
          description: 'PPK 2023: Pada serangan akut, TIDAK BOLEH menggunakan analgetik lebih dari 2 hari/minggu untuk mencegah Medication Overuse Headache (MOH). Jika sudah melebihi → evaluasi ulang ke TTH kronik.',
          required: true,
          category: 'safety'
        },
        {
          id: 'inf-nonpharm',
          title: '🧘 Tatalaksana Non-Farmakologis (Wajib Disertakan)',
          description: 'Kompres panas/dingin di daerah kepala-leher, istirahat di ruangan tenang, identifikasi dan hindari pencetus (stres, kurang tidur, dehidrasi), relaksasi.',
          required: true,
          category: 'action'
        },
        {
          id: 'inf-education',
          title: '📚 Edukasi Pasien & Keluarga',
          description: 'Sampaikan:\n• TTH adalah kondisi jinak (prognosis bonam)\n• Tidak ada kelainan struktural otak\n• Hilangkan kekhawatiran tumor otak/stroke\n• Keluarga bantu kurangi stres pasien\n• Kembali jika serangan >4x/bulan',
          required: true,
          category: 'documentation'
        },
        {
          id: 'inf-followup',
          title: '📅 Jadwal Kontrol & Monitoring',
          description: 'Prognosis: Ad vitam bonam, Ad fungsionam bonam, Ad sanationam bonam.\nKontrol jika: frekuensi meningkat >1 hari/bulan, analgetik tidak efektif, atau gejala berubah.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'tth-nonpharm-node'
    },

    // ============================================================
    // NODE 6B: TERAPI — TTH EPISODIK FREQUENT
    // ============================================================
    'tth-frequent-treatment': {
      id: 'tth-frequent-treatment',
      type: 'checklist',
      title: 'Node 6B: Tatalaksana TTH Episodik Frequent',
      description: '🟡 PPK Neurologi 2023 — Terapi Akut + Pertimbangkan Profilaksis',
      items: [
        {
          id: 'freq-diagnosis-confirm',
          title: '✅ Konfirmasi Diagnosis TTH Episodik Frequent',
          description: 'Kriteria ICHD-3: ≥10 episode serangan, 1–14 hari/bulan selama ≥3 bulan (12–180 hari/tahun). Memenuhi kriteria B, C, D dan E TTH.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'freq-acute-analgesic',
          title: '💊 Analgetik Akut — Sama dengan Infrequent',
          description: 'Untuk serangan akut:\n• Aspirin 1000 mg/hari\n• Asetaminofen 1000 mg/hari\n• NSAID (Ibuprofen 400 mg, Naproxen 500 mg, Diklofenak 50 mg)\n• ± Kombinasi kafein\n⚠️ WAJIB batasi <2 hari/minggu untuk cegah MOH.',
          required: true,
          category: 'medication'
        },
        {
          id: 'freq-prophylaxis-consider',
          title: '💊 Pertimbangkan Profilaksis Amitriptyline',
          description: '[EBM + PPK 2023] Pertimbangkan profilaksis amitriptyline jika:\n• Frekuensi ≥8 hari/bulan\n• Analgetik akut tidak memadai\n• Kualitas hidup terganggu\nDosis: mulai 10–25 mg/malam, dapat ditingkatkan bertahap hingga 75 mg/malam.\n[EBM: Amitriptyline adalah terapi profilaksis TTH dengan evidence terkuat — Level A (Holroyd, 2001; EFNS 2010)]',
          required: true,
          category: 'medication'
        },
        {
          id: 'freq-moh-assessment',
          title: '⚠️ Evaluasi Risiko Medication Overuse Headache (MOH)',
          description: 'Hitung hari penggunaan analgetik per bulan:\n• >15 hari/bulan paracetamol/aspirin/NSAID → MOH sederhana\n• >10 hari/bulan triptan/opioid/ergotamin → MOH\nJika MOH: hentikan obat overused (withdrawal), terapi perilaku.',
          required: true,
          category: 'safety'
        },
        {
          id: 'freq-psychological-screen',
          title: '🧠 Skrining Psikologis (GAD-7 & PHQ-9)',
          description: 'Frekuensi sedang-tinggi sering berhubungan dengan kecemasan dan depresi. Lakukan skrining:\n• GAD-7 untuk kecemasan\n• PHQ-9 untuk depresi\n[EBM: Komorbid psikiatri ditemukan pada 60-70% TTH episodik frequent - Headache 2014]',
          required: true,
          category: 'assessment'
        },
        {
          id: 'freq-lifestyle-modification',
          title: '🏃 Modifikasi Gaya Hidup',
          description: 'Identifikasi dan modifikasi faktor pencetus:\n• Regulasi pola tidur (7–8 jam/malam)\n• Manajemen stres (latihan relaksasi, meditasi)\n• Olahraga aerobik rutin 30 menit/hari\n• Asupan cairan adekuat (8 gelas/hari)\n• Hindari melewatkan makan\n• Koreksi postur kerja (ergonomi)',
          required: true,
          category: 'action'
        },
        {
          id: 'freq-followup-4weeks',
          title: '📅 Jadwal Kontrol 4 Minggu',
          description: 'Evaluasi setelah 4 minggu:\n• Apakah profilaksis dimulai? Respon?\n• Frekuensi serangan berkurang?\n• Penggunaan analgetik <2 hari/minggu?\n• Mood & psikologis?\nJika tidak membaik → rujuk ke Spesialis Saraf.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'tth-nonpharm-node'
    },

    // ============================================================
    // NODE 6C: TERAPI — TTH KRONIK
    // ============================================================
    'tth-chronic-treatment': {
      id: 'tth-chronic-treatment',
      type: 'checklist',
      title: 'Node 6C: Tatalaksana TTH Kronik',
      description: '🔴 PPK Neurologi 2023 — Profilaksis Wajib + Evaluasi Psikologis Mendalam',
      items: [
        {
          id: 'chr-diagnosis-confirm',
          title: '✅ Konfirmasi Diagnosis TTH Kronik',
          description: 'Kriteria ICHD-3: ≥15 hari/bulan, berlangsung >3 bulan (>180 hari/tahun). PPK 2023: TTH kronik biasanya merupakan manifestasi konflik psikologis yang mendasari seperti kecemasan dan depresi.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'chr-amitriptyline-prophylaxis',
          title: '💊 WAJIB: Profilaksis Amitriptyline (Antidepresan Trisiklik)',
          description: 'PPK 2023: Amitriptyline sebagai obat terapeutik maupun pencegahan TTH kronik.\nDosing:\n• Mulai: 10 mg/malam (untuk tolerabilitas)\n• Titrasi: +10 mg setiap 2 minggu\n• Target: 25–75 mg/malam\n• Durasi minimal: 6 bulan\n[EBM: GRADE A recommendation — Holroyd et al. 2001, EFNS 2010. NNT ~3.5 untuk respons ≥50% pengurangan serangan]\n⚠️ Efek samping: sedasi, mulut kering, konstipasi, retensi urin, berat badan naik.',
          required: true,
          category: 'medication'
        },
        {
          id: 'chr-anxiolytic-note',
          title: '💊 Ansiolitik — Hati-hati Penggunaan',
          description: 'PPK 2023: Golongan benzodiazepin dan butalbital sering dipakai, NAMUN:\n⚠️ Bersifat adiktif, sulit dikontrol, dan dapat memperburuk nyeri kepala dalam jangka panjang.\n→ Gunakan SANGAT HATI-HATI, hanya untuk jangka pendek jika ada komponen kecemasan akut.\n→ Lebih utamakan amitriptyline atau SSRI/SNRI untuk komorbid kecemasan.',
          required: true,
          category: 'medication'
        },
        {
          id: 'chr-acute-limit',
          title: '💊 Terapi Akut: SANGAT BATASI Penggunaan',
          description: 'Analgetik akut (paracetamol, aspirin, NSAID) boleh diberikan saat serangan, NAMUN:\n⚠️ MAKSIMAL 2 hari/minggu (PPK 2023)\n⚠️ Hindari penggunaan harian analgetik, sedatif, dan ergotamin (PPK 2023) → risiko MOH sangat tinggi\nJika sudah terjadi MOH → withdrawal supervised + edukasi intensif.',
          required: true,
          category: 'medication'
        },
        {
          id: 'chr-psychological-evaluation',
          title: '🧠 Evaluasi Psikologis Mendalam',
          description: 'TTH kronik berhubungan erat dengan:\n• Gangguan Kecemasan Umum (GAD) → terapi CBT, SSRI\n• Depresi → amitriptyline atau SSRI/SNRI (Sertraline 50 mg, Fluoxetine 20 mg)\n• Stres kronik → manajemen stres terstruktur\n• Gangguan tidur → higiene tidur\n[EBM: CBT setara farmakologi untuk TTH kronik - Holroyd 2001 NEJM]\nJika depresi berat dengan ide bunuh diri → RUJUK SEGERA ke Spesialis Jiwa.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'chr-moh-withdrawal',
          title: '⚠️ Manajemen MOH jika Ditemukan',
          description: 'Jika pasien sudah overuse analgetik:\n1. Edukasi: jelaskan konsep MOH dengan jelas\n2. Withdrawal bertahap atau abrupt (tergantung obat)\n• Paracetamol/NSAID/aspirin: stop abrupt\n• Opioid/benzodiazepin: taper bertahap\n3. Pantau gejala withdrawal (nyeri kepala rebound) 2–10 hari\n4. Mulai profilaksis amitriptyline bersamaan',
          required: true,
          category: 'safety'
        },
        {
          id: 'chr-specialist-referral',
          title: '🏥 Kriteria Rujukan ke Spesialis Saraf',
          description: 'PPK 2023: Rujuk ke Spesialis Saraf jika nyeri kepala tidak membaik dengan tatalaksana di FKTP.\nRujuk ke Spesialis Jiwa jika: depresi berat dengan kemungkinan bunuh diri (rawat bersama neurolog dan sp. jiwa).',
          required: true,
          category: 'documentation'
        },
        {
          id: 'chr-followup-monthly',
          title: '📅 Kontrol Bulanan Selama 6 Bulan',
          description: 'Monitor:\n• Frekuensi hari nyeri kepala/bulan (headache diary)\n• Penggunaan analgetik (hitung hari/bulan)\n• Respons amitriptyline\n• Mood, tidur, kualitas hidup\n• Efek samping obat\nTarget: reduksi ≥50% frekuensi dalam 3 bulan.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'tth-nonpharm-node'
    },

    // ============================================================
    // NODE 7: TERAPI NON-FARMAKOLOGIS (SEMUA TIPE)
    // ============================================================
    'tth-nonpharm-node': {
      id: 'tth-nonpharm-node',
      type: 'checklist',
      title: 'Node 7: Tatalaksana Non-Farmakologis (Semua Tipe TTH)',
      description: '🧘 PPK Neurologi 2023 — Terapi non-farmakologi adalah komponen WAJIB pada semua tipe TTH',
      items: [
        {
          id: 'np-diet-control',
          title: '🥗 Kontrol Diet & Hidrasi',
          description: 'PPK 2023: Kontrol diet sebagai terapi non-farmakologis.\n• Makan teratur (hindari melewatkan makan)\n• Hidrasi adekuat: 2–2.5 L/hari\n• Batasi kafein (tidak lebih dari 200 mg/hari ~2 cangkir kopi)\n• Hindari makanan pemicu: MSG, tyramine (keju tua, wine)\n• Diet seimbang untuk menjaga kadar gula darah stabil',
          required: true,
          category: 'action'
        },
        {
          id: 'np-physical-therapy',
          title: '💆 Terapi Fisik',
          description: 'PPK 2023: Fisioterapi sebagai pilihan non-farmako.\n• Kompres panas/dingin di area temporal/oksipital/leher\n• Massage otot perikranial (temporalis, trapezius, suboksipital)\n• Ultrasound terapi untuk otot leher tegang\n• Manual terapi (mobilisasi/manipulasi servikal)\n[EBM: Manual therapy + exercise terbukti mengurangi frekuensi TTH - Cochrane 2004]',
          required: true,
          category: 'action'
        },
        {
          id: 'np-posture-training',
          title: '🏋️ Latihan Postur & Posisi (PPK 2023)',
          description: 'Latihan postur dan posisi sebagai terapi non-farmako:\n• Koreksi forward head posture\n• Stretching leher dan bahu 2x/hari (10 menit)\n• Ergonomi tempat kerja: monitor sejajar mata, kursi lumbar support\n• Hindari mempertahankan satu posisi >1 jam tanpa istirahat',
          required: true,
          category: 'action'
        },
        {
          id: 'np-relaxation',
          title: '🧘 Behaviour Treatment & Relaksasi (PPK 2023)',
          description: 'PPK 2023: Behaviour treatment sebagai pilihan terapi.\n[EBM: Cognitive Behavioral Therapy (CBT) + relaksasi → efektivitas setara amitriptyline - Holroyd 2001]\n• Latihan relaksasi progresif otot\n• Biofeedback EMG (jika tersedia)\n• Mindfulness-based stress reduction\n• CBT untuk modifikasi pola pikir/perilaku\n• Identifikasi dan manajemen stressor spesifik',
          required: true,
          category: 'action'
        },
        {
          id: 'np-avoid-overuse',
          title: '🚫 Hindari Penggunaan Harian Analgetik (PPK 2023)',
          description: 'PPK 2023 menekankan: hindari pemakaian harian obat analgetik, sedatif, dan ergotamin.\nEdukasi: gunakan analgetik HANYA saat serangan, maksimal 2 hari/minggu. Lebih dari itu → risiko MOH (nyeri kepala semakin sering dan sulit diobati).',
          required: true,
          category: 'safety'
        },
        {
          id: 'np-acupuncture-tens',
          title: '🔌 Akupunktur & TENS (PPK 2023)',
          description: 'PPK 2023: Akupunktur, TENS (Transcutaneous Electrical Nerve Stimulation) sebagai pilihan non-farmako.\n[EBM: Akupunktur memiliki evidence Level B untuk profilaksis TTH - EFNS 2010. Sebanding efisiensinya dengan amitriptyline]\nRujuk ke dokter yang kompeten jika tersedia fasilitas.',
          required: false,
          category: 'action'
        },
        {
          id: 'np-sleep-hygiene',
          title: '😴 Higiene Tidur',
          description: 'Tidur 7–8 jam per malam dengan jadwal konsisten.\n• Hindari gadget 1 jam sebelum tidur\n• Ruangan gelap dan sejuk\n• Hindari kafein setelah pukul 14.00\n• Atasi insomnia jika ada (evaluasi apakah terkait kecemasan/depresi)',
          required: true,
          category: 'action'
        },
        {
          id: 'np-headache-diary',
          title: '📔 Headache Diary — Monitor Mandiri',
          description: 'Ajarkan pasien mencatat:\n• Tanggal dan waktu serangan\n• Durasi (jam)\n• Intensitas (skala VAS 0–10)\n• Obat yang digunakan (jenis & dosis)\n• Faktor pencetus yang dicurigai\nReview diary di setiap kunjungan untuk evaluasi respons terapi.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'tth-education-node'
    },

    // ============================================================
    // NODE 8: EDUKASI PASIEN & KELUARGA
    // ============================================================
    'tth-education-node': {
      id: 'tth-education-node',
      type: 'checklist',
      title: 'Node 8: Edukasi Pasien & Keluarga',
      description: '📚 PPK Neurologi 2023 — Edukasi adalah komponen terapi yang tidak terpisahkan',
      items: [
        {
          id: 'edu-benign-condition',
          title: '💚 Reassurance: TTH adalah Kondisi Jinak',
          description: 'PPK 2023: Keluarga ikut meyakinkan pasien bahwa TIDAK ditemukan kelainan fisik dalam rongga kepala atau otaknya → menghilangkan rasa takut akan adanya tumor otak atau penyakit intrakranial.\nPrognosis: Ad vitam bonam, Ad fungsionam bonam, Ad sanationam bonam.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-family-role',
          title: '👨‍👩‍👧 Peran Keluarga (PPK 2023)',
          description: 'PPK 2023 secara eksplisit menyebutkan:\n• Keluarga ikut membantu mengurangi kecemasan atau depresi pasien\n• Keluarga menilai adanya kecemasan atau depresi pada pasien\n• Menciptakan lingkungan rumah yang supportif dan rendah stres',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-trigger-avoidance',
          title: '🎯 Identifikasi & Hindari Pencetus',
          description: 'Diskusikan pencetus spesifik pasien:\n• Stres psikologis (pekerjaan, keluarga, keuangan)\n• Kurang/kelebihan tidur\n• Melewatkan makan\n• Dehidrasi\n• Postur buruk saat bekerja\n• Cahaya/kebisingan berlebihan\n• Perubahan cuaca',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-when-to-return',
          title: '🏥 Kapan Harus Kembali ke Fasilitas Kesehatan',
          description: 'Segera kembali jika:\n• Nyeri kepala terberat dalam hidup (onset mendadak)\n• Disertai demam, kaku kuduk\n• Defisit neurologis (kelemahan, gangguan penglihatan, bicara pelo)\n• Frekuensi bertambah >4x/bulan\n• Tidak respons dengan analgetik biasa\n• Perubahan karakter nyeri kepala',
          required: true,
          category: 'safety'
        },
        {
          id: 'edu-referral-criteria',
          title: '📋 Kriteria Rujukan (PPK 2023)',
          description: 'FKTP → Faskes Sekunder (Sp. Saraf) jika:\na) Nyeri kepala tidak membaik dengan tatalaksana di FKTP\nb) Depresi berat dengan kemungkinan bunuh diri → Spesialis Jiwa (rawat bersama neurolog)\n\nFaskes Sekunder → tertiary/sp. saraf jika sudah dirujuk dari PPK.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-prognosis',
          title: '📊 Prognosis & Harapan Pasien',
          description: 'PPK Neurologi 2023:\n• Ad vitam: bonam (tidak mengancam jiwa)\n• Ad fungsionam: bonam (fungsi dapat pulih)\n• Ad sanationam: bonam (dapat sembuh)\nDengan penanganan tepat dan perubahan gaya hidup, frekuensi TTH dapat dikurangi signifikan bahkan menghilang.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-reference-note',
          title: '📖 Referensi Panduan (PPK Neurologi 2023)',
          description: 'Tatalaksana berdasarkan:\n1. PPK Neurologi PERDOSSI 2023 (Panduan Praktik Klinis Neurologi)\n2. ICHD-3: International Classification of Headache Disorders 3rd Edition\n3. Konsensus Nasional V Pokdi Nyeri Kepala PERDOSSI 2016\n4. Standar Kompetensi Dokter Spesialis Neurologi Indonesia, KNI PP PERDOSSI 2015\n5. Permenkes RI tentang Panduan Praktik Klinis bagi Dokter di FKTP\n6. EFNS Guidelines on Treatment of Tension-Type Headache 2010\n7. SIGN: Diagnosis and Management of Headache in Adults',
          required: true,
          category: 'documentation'
        }
      ]
    }
  }
};
