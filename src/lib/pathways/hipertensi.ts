// ============================================================
// HIPERTENSI DEWASA
// Referensi:
// - PNPK Tata Laksana Hipertensi Dewasa — KMK RI No. HK.01.07/MENKES/4634/2021
// - Konsensus Penatalaksanaan Hipertensi PERHI 2021
// - ISH Global Hypertension Guidelines 2020
// - ESC/ESH Guidelines 2018
// Setting: Klinik / FKTP
// Alat: TTV (Tensi, Termometer, Oksimetri), EKG, Suction, Nebulizer
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const hipertensiPathway: DynamicPathway = {
  diseaseId: 'hipertensi-dewasa',
  diseaseName: 'Hipertensi Dewasa (PNPK 2021 & Konsensus PERHI 2021)',
  startNodeId: 'ht-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT (Anamnesis → TTV → Pemfis)
    // ============================================================
    'ht-initial-assessment': {
      id: 'ht-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis, TTV & Pemeriksaan Fisik',
      description: 'Lakukan berurutan dari atas ke bawah dalam satu kunjungan. Mulai dari anamnesis, ukur TD dengan benar, tanda vital lengkap, lalu pemeriksaan fisik terarah.',
      items: [
        {
          id: 'ht-anamnesis-keluhan',
          title: 'Anamnesis — Keluhan Utama & Riwayat Hipertensi',
          description: 'Tanyakan: Apa keluhan saat ini (sakit kepala, pusing, berdebar, pandangan kabur, sesak, bengkak kaki)? Sudah berapa lama hipertensi? Minum obat apa? Patuh? Ada efek samping? Riwayat keluarga hipertensi atau penyakit jantung dini?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-anamnesis-faktor-risiko',
          title: 'Anamnesis — Faktor Risiko Kardiovaskular',
          description: 'Tanyakan: Merokok (berapa bungkus/hari, berapa tahun)? Pola makan asin/berlemak? Jarang olahraga? Riwayat DM, kolesterol tinggi, asam urat? Riwayat stroke atau serangan jantung?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-anamnesis-gejala-organ',
          title: 'Anamnesis — Gejala Kerusakan Organ Target (HMOD)',
          description: 'Otak: pernah TIA/stroke, daya ingat turun?\nJantung: sesak saat aktivitas, bengkak kaki, nyeri dada, jantung berdebar?\nGinjal: kencing berbuih, sering BAK malam, ada darah di urin?\nPembuluh darah: kaki dingin, nyeri betis saat jalan?\nMata: pandangan kabur mendadak?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-anamnesis-obat',
          title: 'Anamnesis — Obat yang Bisa Menaikkan TD',
          description: 'Tanyakan konsumsi rutin: Kortikosteroid, NSAID (ibuprofen/diklofenak), dekongestan/obat flu (pseudoefedrin), kontrasepsi oral, suplemen herbal. Obat-obat ini bisa menyebabkan atau memperburuk hipertensi.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'ht-red-flags-screen',
          title: '⚠️ Skrining RED FLAGS — Tanda Krisis Hipertensi (Tanyakan Sekarang!)',
          description: 'Ada salah satu dari ini?\n• Sakit kepala mendadak sangat berat\n• Pandangan kabur atau buta tiba-tiba\n• Nyeri dada atau punggung tembus\n• Sesak napas mendadak berat\n• Kelemahan/baal separuh badan\n• Bicara pelo atau tidak bisa bicara\nJika YA → kemungkinan HIPERTENSI EMERGENSI — lanjut segera ke pemeriksaan TTV!',
          required: true,
          category: 'safety'
        },
        {
          id: 'ht-persiapan-td',
          title: 'Persiapkan Pasien Sebelum Ukur TD',
          description: 'Pasien duduk tenang 5 menit di kursi. Tidak merokok/kafein/olahraga dalam 30 menit terakhir. Lengan setinggi jantung, ruangan tenang. Tidak berbicara saat diukur.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ukur-td',
          title: 'Ukur TD — Kedua Lengan, 3x Pengukuran',
          description: 'Kunjungan pertama: ukur di kedua lengan. Jika selisih sistolik > 15 mmHg → curiga penyakit vaskular.\nUkur 3x jeda 1-2 menit each. Catat rata-rata 2 pengukuran terakhir sebagai TD pasien.\nGunakan lengan dengan angka tertinggi sebagai acuan kunjungan berikutnya.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ttv-lengkap',
          title: 'TTV Lengkap — Nadi, Suhu, SpO₂',
          description: 'Nadi: hitung 60 detik penuh. Iregular? → rekam EKG (curiga Fibrilasi Atrial). Nadi > 80 x/menit istirahat = faktor risiko tambahan.\nSuhu: normal atau demam?\nSpO₂: jika < 94% → beri oksigen, pertimbangkan gagal jantung atau pneumonia.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ortostatik',
          title: 'Cek Hipotensi Ortostatik (Kunjungan Pertama / Lansia / DM)',
          description: 'Ukur TD saat baring, kemudian 1 dan 3 menit berdiri. Positif jika: sistolik turun ≥ 20 mmHg ATAU diastolik turun ≥ 10 mmHg. Positif → risiko jatuh dan iskemia organ, hati-hati pilih obat.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-pemfis-bmi',
          title: 'Pemeriksaan Fisik — Anthropometri (BB, TB, Lingkar Pinggang)',
          description: 'Hitung IMT: BB (kg) / TB (m)². Target IMT 18.5–22.9 kg/m².\nUkur lingkar pinggang: Pria < 90 cm, Wanita < 80 cm.\nObesitas sentral = faktor risiko kardiovaskular dan metabolik mandiri.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-pemfis-jantung-paru',
          title: 'Pemeriksaan Fisik — Jantung & Paru',
          description: 'Auskultasi jantung: murmur (penyakit katup?), gallop S3 (gagal jantung?), irama ireguler?\nAuskultasi paru: ronki basah (edema paru?), wheezing?\nJVP meningkat? (tanda gagal jantung kanan).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-pemfis-nadi-perifer',
          title: 'Pemeriksaan Fisik — Nadi Perifer & Tanda Vaskular',
          description: 'Raba nadi radialis, dorsalis pedis, tibialis posterior — simetris kiri-kanan?\nAsimetri nadi = curiga penyakit arteri perifer.\nAuskultasi bruit karotis atau epigastrium (bruit renal = stenosis arteri renalis).',
          required: false,
          category: 'assessment'
        },
        {
          id: 'ht-ekg',
          title: 'EKG 12-Lead — Deteksi LVH & Aritmia',
          description: 'Rekam EKG. Perhatikan:\n• LVH: Sokolow-Lyon SV1+RV5 > 35 mm ATAU R di aVL ≥ 11 mm\n• Fibrilasi Atrial: R-R ireguler, tidak ada gelombang P\n• Iskemia: Depresi ST, T inversi\nLVH di EKG = tanda kerusakan organ jantung (HMOD).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-lab',
          title: 'Penunjang Lab — Nilai HMOD & Faktor Risiko (Rujuk Jika Tidak Ada)',
          description: 'Wajib (jika tersedia): Kreatinin + eGFR, Elektrolit (K⁺/Na⁺), Gula Darah Puasa, Profil Lipid, Urinalisa (protein/albumin).\nOpsional: TSH (curiga tiroid), asam urat, hemoglobin.\nMikroalbuminuria (ACR 30–300 mg/g) = tanda kerusakan ginjal dini.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ht-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION
    // ============================================================
    'ht-triage-decision': {
      id: 'ht-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Tentukan Status Hipertensi',
      description: 'Nilai hasil TD + ada tidaknya red flags kerusakan organ akut.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ht-branch-emergensi',
          title: '🔴 EMERGENSI — TD ≥ 180/110 + Tanda Kerusakan Organ Akut',
          description: 'Ada SATU dari: nyeri dada iskemik, sesak edema paru, defisit neurologis/stroke, pandangan kabur mendadak, nyeri punggung tembus (diseksi aorta), atau kondisi kehamilan + TD > 160/110.',
          color: 'red',
          nextNodeId: 'ht-emergensi',
          riskLevel: 'high'
        },
        {
          id: 'ht-branch-urgensi',
          title: '🟠 URGENSI — TD ≥ 180/110 Tanpa Kerusakan Organ',
          description: 'TD sangat tinggi TAPI tidak ada gejala organ akut. Sakit kepala ringan/kaku tengkuk saja tidak cukup untuk disebut emergensi.',
          color: 'orange',
          nextNodeId: 'ht-urgensi',
          riskLevel: 'medium'
        },
        {
          id: 'ht-branch-stabil',
          title: '🟢 STABIL — TD < 180/110, Tidak Ada Red Flags',
          description: 'Tidak ada tanda kerusakan organ akut. Lanjut ke klasifikasi dan strategi tatalaksana.',
          color: 'green',
          nextNodeId: 'ht-klasifikasi-decision',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: HIPERTENSI EMERGENSI
    // ============================================================
    'ht-emergensi': {
      id: 'ht-emergensi',
      type: 'checklist',
      title: 'Node 3A: Hipertensi Emergensi — Stabilisasi & Rujuk IGD RS',
      description: 'PNPK 2021: Hipertensi emergensi harus ditangani di ICU dengan obat IV titrasi. Di klinik: stabilisasi segera, JANGAN turunkan TD terlalu cepat, lalu RUJUK IGD RS.',
      items: [
        {
          id: 'em-monitor-pasang',
          title: '1. Pasang Monitor: Oksimetri, EKG, TD Tiap 15 Menit',
          description: 'SpO₂ < 94% → pasang O₂ nasal kanul 2-4 L/menit. Rekam EKG (deteksi SKA, aritmia). Ukur TD tiap 15 menit. Pasang IV line untuk akses obat darurat.',
          required: true,
          category: 'action'
        },
        {
          id: 'em-identifikasi-organ',
          title: '2. Identifikasi Organ yang Terkena',
          description: '• Otak: Defisit neurologis/stroke → CT di RS\n• Jantung: SKA / Edema Paru → EKG + rujuk\n• Aorta: Nyeri punggung tembus → rujuk cito\n• Mata: Pandangan kabur mendadak → rujuk\n• Kehamilan + TD > 160/110 → Eklampsia → SpOG',
          required: true,
          category: 'assessment'
        },
        {
          id: 'em-target-td',
          title: '3. ⚠️ JANGAN Turunkan TD Terlalu Cepat!',
          description: 'Target 1 jam pertama: turunkan MAKSIMAL 20–25% dari MAP saja.\nPengecualian:\n• Diseksi Aorta: sistolik < 120 dalam 20 menit\n• Eklampsia: sistolik < 160 / diastolik < 105\n• SKA: sistolik < 140\nPenurunan mendadak dapat memicu iskemia otak dan jantung!',
          required: true,
          category: 'safety'
        },
        {
          id: 'em-obat-oral',
          title: '4. Obat Oral Sambil Siapkan Rujukan',
          description: 'Jika belum bisa segera dirujuk dan pasien hemodinamik masih aman:\n• Captopril 25 mg oral (onset 15–30 menit)\n• ATAU Nifedipin SR/XL 10–20 mg oral\nHINDARI: Nifedipin sublingual (penurunan mendadak = berbahaya — PNPK 2021 melarang!).',
          required: true,
          category: 'medication'
        },
        {
          id: 'em-kondisi-khusus',
          title: '5. Penanganan Kondisi Spesifik Sebelum Rujuk',
          description: '• Edema Paru Akut: dudukkan pasien, O₂ masker, furosemid 40 mg IV jika tersedia\n• SKA: aspirin 300 mg kunyah + nitrogliserin sublingual\n• Kejang/Eklampsia: MgSO₄ 4 g IV dalam 20 menit + konsultasi SpOG',
          required: false,
          category: 'action'
        },
        {
          id: 'em-rujuk',
          title: '6. RUJUK IGD RS — Surat Rujukan Lengkap',
          description: 'Cantumkan: TD serial di klinik, gejala/tanda organ yang terkena, obat yang sudah diberikan + waktu pemberian, hasil EKG, SpO₂, GCS.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3B: HIPERTENSI URGENSI
    // ============================================================
    'ht-urgensi': {
      id: 'ht-urgensi',
      type: 'checklist',
      title: 'Node 3B: Hipertensi Urgensi — Oral Bertahap & Observasi',
      description: 'TD sangat tinggi TANPA kerusakan organ akut. Turunkan bertahap dalam 24–48 jam dengan obat oral. Tidak boleh terburu-buru.',
      items: [
        {
          id: 'urg-cari-penyebab',
          title: '1. Cari Penyebab Lonjakan TD Mendadak',
          description: 'Tanyakan: Lupa minum obat rutin? Nyeri berat tidak terkontrol? Stres akut? Minum obat simpatomimetik (pseudoefedrin/dekongestan)? Berhenti klonidin tiba-tiba (rebound)? Atasi penyebab dasar jika ditemukan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'urg-obat-oral',
          title: '2. Antihipertensi Oral — Target Turun Bertahap dalam 24–48 Jam',
          description: 'Pilihan:\n• Captopril 25 mg oral (onset cepat, aman)\n• Amlodipin 5–10 mg oral\n• Nifedipin SR 10–20 mg oral\nJANGAN gunakan nifedipin sublingual. Target: turunkan TD secara bertahap — BUKAN dalam hitungan menit.',
          required: true,
          category: 'medication'
        },
        {
          id: 'urg-observasi',
          title: '3. Observasi 1–2 Jam di Klinik',
          description: 'Ukur ulang TD tiap 30 menit. Jika TD mulai turun dan pasien asimtomatis → boleh rawat jalan. Jika dalam 1–2 jam muncul gejala organ baru → pindah ke jalur emergensi.',
          required: true,
          category: 'action'
        },
        {
          id: 'urg-kontrol-followup',
          title: '4. Kontrol 24–48 Jam & Edukasi Red Flags',
          description: 'Jadwalkan kontrol besok atau lusa. Edukasi: segera ke IGD jika muncul sakit kepala mendadak berat, pandangan kabur, nyeri dada, lemas separuh badan, sesak mendadak.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'ht-klasifikasi-decision'
    },

    // ============================================================
    // NODE 4: KLASIFIKASI TD & STRATIFIKASI RISIKO
    // ============================================================
    'ht-klasifikasi-decision': {
      id: 'ht-klasifikasi-decision',
      type: 'decision',
      title: 'Node 4: Klasifikasi Tekanan Darah — Tentukan Derajat',
      description: 'Pilih derajat hipertensi berdasarkan rata-rata TD yang diukur. Ini menentukan kapan mulai obat dan seberapa agresif target.',
      warningLevel: 'info',
      branches: [
        {
          id: 'ht-normal-tinggi',
          title: '🔵 Normal Tinggi (Sistolik 130–139 / Diastolik 85–89)',
          description: 'Intervensi gaya hidup intensif saja. Obat hanya jika risiko CV sangat tinggi atau ada PJK. Kontrol ulang 1 tahun.',
          color: 'blue',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'low'
        },
        {
          id: 'ht-derajat-1',
          title: '🟠 Derajat 1 (Sistolik 140–159 / Diastolik 90–99)',
          description: 'Gaya hidup 4–6 minggu. Mulai obat bersamaan jika ada HMOD, DM, PGK, atau risiko tinggi. Jika tidak ada faktor risiko khusus → tunggu respons gaya hidup dulu.',
          color: 'orange',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'medium'
        },
        {
          id: 'ht-derajat-2',
          title: '🔴 Derajat 2 (Sistolik 160–179 / Diastolik 100–109)',
          description: 'Mulai obat SEGERA bersamaan dengan gaya hidup.',
          color: 'red',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'high'
        },
        {
          id: 'ht-derajat-3',
          title: '🔴 Derajat 3 (Sistolik ≥ 180 / Diastolik ≥ 110)',
          description: 'Mulai obat SEGERA + nilai ulang apakah ada gejala organ baru → jika ada, kembali ke jalur Emergensi.',
          color: 'purple',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 5: MODIFIKASI GAYA HIDUP (SEMUA PASIEN)
    // ============================================================
    'ht-gaya-hidup': {
      id: 'ht-gaya-hidup',
      type: 'checklist',
      title: 'Node 5: Modifikasi Gaya Hidup — Fondasi Wajib Semua Pasien',
      description: 'Gaya hidup adalah lini pertama terapi dan harus dilanjutkan bahkan setelah mulai obat. Edukasikan satu per satu kepada pasien.',
      items: [
        {
          id: 'gl-garam',
          title: '1. Batasi Garam < 5 g/hari (1 Sendok Teh)',
          description: 'Setara dengan natrium < 2 g/hari = 3 sdm kecap/MSG. Kurangi: makanan olahan, ikan asin, mie instan, kerupuk. Dapat menurunkan sistolik 5–11 mmHg.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-diet',
          title: '2. Pola Makan Sehat (Diet DASH)',
          description: 'Perbanyak: sayuran segar, buah, kacang-kacangan, ikan, susu rendah lemak. Kurangi: daging merah, lemak jenuh, makanan manis. Diet DASH dapat menurunkan sistolik 8–11 mmHg.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-olahraga',
          title: '3. Olahraga Aerobik 30–60 Menit, 5–7x/Minggu',
          description: 'Intensitas sedang (bisa berbicara tapi agak terengah). Jenis: jalan cepat, jogging, bersepeda, berenang. Awali pemanasan 5–10 menit. Dapat menurunkan sistolik 5–8 mmHg.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-berat-badan',
          title: '4. Target IMT 18.5–22.9 kg/m²',
          description: 'Setiap penurunan 5 kg berat badan → sistolik turun ± 5 mmHg. Target lingkar pinggang: pria < 90 cm, wanita < 80 cm. Penurunan 0.5–1 kg/minggu lebih sustainable.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-rokok',
          title: '5. Berhenti Merokok (Tanyakan Setiap Kunjungan)',
          description: 'Merokok memperberat risiko kardiovaskular secara independen. Tanyakan status merokok tiap kunjungan. Berikan konseling. Nikotin patch/gum dapat membantu.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-hbpm',
          title: '6. Anjurkan Pantau TD Mandiri di Rumah (HBPM)',
          description: 'Anjurkan beli tensimeter digital tervalidasi. Cara: ukur 2x pagi (setelah BAK, sebelum sarapan dan minum obat) dan 2x malam, selama 7 hari. Rata-rata ≥ 135/85 = hipertensi. Bawa catatan ke kontrol berikutnya.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'ht-farmakoterapi-decision'
    },

    // ============================================================
    // NODE 6: TENTUKAN JALUR FARMAKOTERAPI
    // ============================================================
    'ht-farmakoterapi-decision': {
      id: 'ht-farmakoterapi-decision',
      type: 'decision',
      title: 'Node 6: Tentukan Jalur Farmakoterapi',
      description: 'Pilih jalur berdasarkan kondisi klinis spesifik pasien.',
      warningLevel: 'info',
      branches: [
        {
          id: 'ht-jalur-umum',
          title: '🔵 Hipertensi Umum (Tanpa Komorbid Khusus)',
          description: 'HT derajat 2–3 → mulai obat segera. HT derajat 1 → tunggu gaya hidup 4–6 minggu jika risiko rendah, atau mulai langsung jika ada HMOD/risiko tinggi.',
          color: 'blue',
          nextNodeId: 'ht-terapi-umum',
          riskLevel: 'medium'
        },
        {
          id: 'ht-jalur-dm-ckd',
          title: '🔴 Dengan Diabetes Melitus dan/atau Penyakit Ginjal Kronik',
          description: 'Target TD lebih ketat: < 130/80 mmHg. Wajib RAS Blocker (ACEi atau ARB).',
          color: 'red',
          nextNodeId: 'ht-terapi-dm-ckd',
          riskLevel: 'high'
        },
        {
          id: 'ht-jalur-geriatri',
          title: '🟠 Pasien Geriatri (≥ 60 Tahun)',
          description: 'Pendekatan "go low, go slow". Nilai frailty sebelum terapi agresif.',
          color: 'orange',
          nextNodeId: 'ht-terapi-geriatri',
          riskLevel: 'medium'
        },
        {
          id: 'ht-jalur-khusus',
          title: '🟣 Kondisi Klinis Khusus',
          description: 'Gagal jantung, kehamilan, fibrilasi atrial, hipertensi resisten.',
          color: 'purple',
          nextNodeId: 'ht-terapi-khusus',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 7A: TERAPI UMUM
    // ============================================================
    'ht-terapi-umum': {
      id: 'ht-terapi-umum',
      type: 'checklist',
      title: 'Node 7A: Farmakoterapi Umum — Kombinasi 2 Obat (PNPK 2021)',
      description: 'Strategi utama: mulai dengan KOMBINASI 2 obat pada sebagian besar pasien. Single pill combination (SPC) meningkatkan kepatuhan.',
      items: [
        {
          id: 'tu-kombinasi',
          title: '1. Inisiasi Kombinasi 2 Obat (Rekomendasi Utama)',
          description: 'Kombinasi terbaik:\n• RAS Blocker (ACEi ATAU ARB) + CCB\n• RAS Blocker + Diuretik Tiazid\nContoh: Amlodipin 5 mg + Candesartan 8 mg. Mulai dosis rendah, titrasi naik tiap 4 minggu.',
          required: true,
          category: 'medication'
        },
        {
          id: 'tu-larangan-dual-ras',
          title: '⚠️ 2. DILARANG: ACEi + ARB Bersamaan!',
          description: 'JANGAN kombinasikan ACEi (Captopril/Ramipril) + ARB (Candesartan/Losartan) secara bersamaan. Terbukti meningkatkan risiko gagal ginjal akut dan hiperkalemia. Pilih SALAH SATU.',
          required: true,
          category: 'safety'
        },
        {
          id: 'tu-beta-bloker',
          title: '3. Beta Bloker Hanya Jika Ada Indikasi Spesifik',
          description: 'Bisoprolol/Metoprolol/Atenolol dianjurkan jika ada: Angina/PJK, pasca IMA, gagal jantung (HFrEF), kontrol denyut FA, atau kehamilan. BUKAN pilihan pertama tanpa indikasi.',
          required: false,
          category: 'medication'
        },
        {
          id: 'tu-target',
          title: '4. Target TD yang Harus Dicapai',
          description: 'Usia < 60 tahun: sistolik 120–129 mmHg (jika ditoleransi).\nUsia ≥ 60 tahun: sistolik 130–139 mmHg.\nSemua: diastolik < 80 mmHg.\nTarget minimal: < 140/90 mmHg.\nEvaluasi tiap 1–3 bulan hingga target tercapai.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tu-eskalasi',
          title: '5. Eskalasi ke 3 Obat Jika Belum Terkontrol',
          description: 'Jika 2 obat belum mencapai target dalam 4–6 minggu: tambahkan obat ke-3 = RAS Blocker + CCB + Diuretik Tiazid. Masih belum terkontrol → cek kepatuhan → pertimbangkan hipertensi resisten.',
          required: true,
          category: 'medication'
        },
        {
          id: 'tu-efek-samping',
          title: '6. Pantau Efek Samping Obat (Tiap Kunjungan)',
          description: 'ACEi: batuk kering → ganti ARB.\nCCB: edema tungkai, sakit kepala.\nDiuretik Tiazid: hipokalemia, hiperurisemia, hiperglikemia.\nBeta Bloker: bradikardia, bronkospasme.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ht-monitoring'
    },

    // ============================================================
    // NODE 7B: DM + CKD
    // ============================================================
    'ht-terapi-dm-ckd': {
      id: 'ht-terapi-dm-ckd',
      type: 'checklist',
      title: 'Node 7B: Hipertensi + DM / PGK — Target Ketat & RAS Blocker Wajib',
      description: 'Risiko kardiovaskular sangat tinggi. Pemilihan obat berbasis bukti renoprotektif.',
      items: [
        {
          id: 'dm-target',
          title: '1. Target TD: < 130/80 mmHg',
          description: 'Pada DM + albuminuria: lebih ketat (sistolik 120–130 mmHg jika ditoleransi). Jangan sampai terlalu rendah — risiko hipoperfusi ginjal.',
          required: true,
          category: 'action'
        },
        {
          id: 'dm-ras-wajib',
          title: '2. RAS Blocker (ACEi atau ARB) — WAJIB!',
          description: 'ACEi/ARB memberikan efek renoprotektif dan kardioprotektif. Pilih ACEi ATAU ARB — jangan keduanya. Monitor kreatinin 2–4 minggu setelah inisiasi. Kenaikan < 30% dari baseline masih dapat diterima.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dm-diuretik',
          title: '3. Pilih Diuretik Sesuai eGFR',
          description: 'eGFR ≥ 30 mL/mnt → Tiazid/Indapamide.\neGFR < 30 mL/mnt → ganti Loop Diuretik (Furosemid). Tiazid tidak efektif pada eGFR rendah.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dm-monitor-lab',
          title: '4. Monitor K⁺ & Kreatinin Berkala',
          description: 'Cek K⁺ dan kreatinin 2–4 minggu setelah inisiasi RAS Blocker, kemudian tiap 3–6 bulan. K⁺ > 5.5 mEq/L → pertimbangkan kurangi dosis atau ganti obat.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-kontrol-gula',
          title: '5. Pastikan Kontrol Gula Darah Juga Optimal',
          description: 'Kontrol glikemik dan TD bersama memberikan outcome terbaik. Hindari Beta Bloker pada DM tidak stabil (menutupi gejala hipoglikemia).',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ht-monitoring'
    },

    // ============================================================
    // NODE 7C: GERIATRI
    // ============================================================
    'ht-terapi-geriatri': {
      id: 'ht-terapi-geriatri',
      type: 'checklist',
      title: 'Node 7C: Hipertensi Geriatri (≥ 60 Tahun) — "Go Low, Go Slow"',
      description: 'Pendekatan individual untuk lansia. Nilai frailty sebelum terapi agresif. Efek samping lebih sering dan lebih berbahaya.',
      items: [
        {
          id: 'ger-frailty',
          title: '1. Nilai Status Frailty (Clinical Frailty Scale 1–9)',
          description: 'Skor 1–3 (Fit): terapi standar.\nSkor 4–5 (Pre-frail): hati-hati, pantau ketat.\nSkor 6–9 (Frail): monoterapi dosis kecil, target lebih longgar.\nMultimorbid/demensia berat → konsultasi tim geriatri.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ger-target',
          title: '2. Target TD Sesuai Kondisi',
          description: 'Usia 60–79 tahun (fit): sistolik 130–139 mmHg.\nUsia ≥ 80 tahun: sistolik 130–150 mmHg.\nFrail: jangan turunkan sampai < 130 mmHg.\nDiastolik jangan terlalu rendah (risiko hipoperfusi koroner).',
          required: true,
          category: 'action'
        },
        {
          id: 'ger-pilih-obat',
          title: '3. Pilihan Obat: CCB atau Tiazid sebagai Awal',
          description: 'Amlodipin atau Nifedipin SR (CCB) = pilihan aman.\nIndapamide (Tiazid-like) efektif dengan efek metabolik minimal.\nHindari: Alfa-bloker (risiko jatuh). Hati-hati Loop Diuretik (hiponatremia, inkontinensia).',
          required: true,
          category: 'medication'
        },
        {
          id: 'ger-mulai-dosis-pelan',
          title: '4. Mulai Dosis Rendah, Naik Tiap 4 Minggu',
          description: 'Mulai setengah dosis standar. Naik perlahan tiap 4 minggu. Pantau TD baring vs berdiri tiap kunjungan. Monitor fungsi ginjal, elektrolit, dan status kognitif.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ger-jatuh',
          title: '5. Evaluasi & Cegah Risiko Jatuh',
          description: 'Tanyakan riwayat jatuh tiap kunjungan. Pertimbangkan latihan keseimbangan. Hindari polifarmasi. Edukasi keluarga/caregiver untuk mendampingi.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ht-monitoring'
    },

    // ============================================================
    // NODE 7D: KONDISI KHUSUS
    // ============================================================
    'ht-terapi-khusus': {
      id: 'ht-terapi-khusus',
      type: 'checklist',
      title: 'Node 7D: Kondisi Klinis Khusus — Pilihan Obat Berbeda',
      description: 'Beberapa kondisi memerlukan pendekatan berbeda dari hipertensi umum.',
      items: [
        {
          id: 'kh-gagal-jantung',
          title: '1. HT + Gagal Jantung (HFrEF)',
          description: 'Pilih: ACEi/ARB (atau ARNI) + Beta Bloker + MRA (Spironolakton) + Diuretik Loop (jika ada retensi cairan). HINDARI: CCB non-dihidropiridin (Verapamil/Diltiazem). Target sistolik 120–130 mmHg.',
          required: true,
          category: 'medication'
        },
        {
          id: 'kh-kehamilan',
          title: '2. HT dalam Kehamilan / Pre-eklampsia',
          description: 'Obat aman: Metildopa, Nifedipin (CCB), Labetalol.\nKONTRAINDIKASI dalam kehamilan: ACEi dan ARB (fetotoksik — JANGAN!)\nTD ≥ 170/110 pada kehamilan → darurat obstetrik → rawat inap + MgSO₄ + rujuk SpOG.',
          required: true,
          category: 'safety'
        },
        {
          id: 'kh-af',
          title: '3. HT + Fibrilasi Atrial',
          description: 'Kontrol denyut: Beta Bloker ATAU CCB non-dihidropiridin (Diltiazem/Verapamil). Antihipertensi: ACEi/ARB. Hitung skor CHA₂DS₂-VASc untuk pertimbangkan antikoagulan.',
          required: false,
          category: 'medication'
        },
        {
          id: 'kh-resisten',
          title: '4. Hipertensi Resisten (TD ≥ 140/90 meski 3 Obat Maksimal)',
          description: '3 obat berbeda golongan (RAS + CCB + Diuretik) dosis maksimal, TD masih tidak terkontrol. Langkah:\n1. Konfirmasi kepatuhan minum obat\n2. Singkirkan white coat & penyebab sekunder\n3. Tambahkan Spironolakton 25–50 mg (jika eGFR > 45, K⁺ < 4.5)\n→ Rujuk SpJantung / SpPenyakit Dalam.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ht-monitoring'
    },

    // ============================================================
    // NODE 8: MONITORING & EDUKASI FOLLOW-UP
    // ============================================================
    'ht-monitoring': {
      id: 'ht-monitoring',
      type: 'checklist',
      title: 'Node 8: Monitoring, Edukasi & Follow-Up Jangka Panjang',
      description: 'Hipertensi adalah kondisi seumur hidup. Pemantauan berkala + kepatuhan + edukasi sama pentingnya dengan obat.',
      items: [
        {
          id: 'mon-jadwal',
          title: '1. Jadwal Kontrol',
          description: 'Tiap 1–2 bulan saat titrasi atau penyesuaian obat.\nTiap 3–6 bulan jika TD sudah stabil di target.\nEvaluasi HMOD lengkap (EKG + lab) tiap 12 bulan.',
          required: true,
          category: 'action'
        },
        {
          id: 'mon-cek-target',
          title: '2. Nilai Pencapaian Target TD',
          description: 'TD sudah di target? Jika belum: cek kepatuhan TERLEBIH DAHULU sebelum menaikkan dosis. Tanyakan hasil HBPM di rumah. Bandingkan TD klinik vs HBPM (deteksi white coat effect).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'mon-kepatuhan',
          title: '3. Evaluasi Kepatuhan & Hambatan Terapi',
          description: 'Identifikasi hambatan: biaya obat mahal? Efek samping? Lupa minum? Merasa tidak perlu obat karena tidak pusing?\nSolusi: sederhanakan regimen (SPC/single pill combination), libatkan keluarga, edukasi ulang.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'mon-lab-berkala',
          title: '4. Lab Berkala',
          description: 'K⁺ dan kreatinin: tiap 3–6 bulan (pasien ACEi/ARB/diuretik).\nProfil lipid: tiap tahun.\nGula darah: tiap 6–12 bulan (pasien diuretik tiazid).\nEKG: minimal tiap tahun.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'mon-rujuk',
          title: '5. Indikasi Rujuk ke Fasilitas Tingkat Lanjut',
          description: 'Rujuk jika:\n• Curiga hipertensi sekunder (usia muda, refrakter)\n• Hipertensi resisten (3 obat sudah maksimal)\n• Perlu ekokardiografi atau USG karotis\n• HMOD berat yang butuh evaluasi spesialis',
          required: true,
          category: 'action'
        },
        {
          id: 'mon-edukasi-pasien',
          title: '6. Edukasi — Kembali Segera Jika Ada Ini',
          description: 'Instruksikan pasien kembali segera jika:\n• Sakit kepala mendadak sangat berat\n• Penglihatan tiba-tiba kabur atau buram\n• Nyeri dada atau sesak napas mendadak\n• Lemas atau kebas separuh badan\n• TD rumah > 180 mmHg meski sudah minum obat',
          required: true,
          category: 'safety'
        }
      ]
    }

  },
  references: [
    'KMK RI No. HK.01.07/MENKES/4634/2021 — PNPK Tata Laksana Hipertensi Dewasa.',
    'Konsensus Penatalaksanaan Hipertensi 2021 — Perhimpunan Dokter Hipertensi Indonesia (PERHI).',
    'Unger T, et al. 2020 International Society of Hypertension (ISH) Global Hypertension Practice Guidelines. Hypertension. 2020;75(6):1334–1357.',
    'Williams B, et al. 2018 ESC/ESH Guidelines for the Management of Arterial Hypertension. Eur Heart J. 2018;39:3021–3104.',
    'Whelton PK, et al. 2017 ACC/AHA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults. Hypertension. 2018;71:e13–e115.'
  ]
};
