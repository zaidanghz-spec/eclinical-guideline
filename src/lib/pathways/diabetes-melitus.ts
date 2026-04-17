// ============================================================
// DIABETES MELITUS TIPE 2 (DM T2)
// ICD-10: E11
// Referensi:
// - PNPK Tata Laksana Diabetes Melitus Tipe 2 Dewasa — KMK No. HK.01.07/MENKES/603/2020
// - Pedoman Pengelolaan dan Pencegahan DM Tipe 2 Dewasa di Indonesia — PERKENI 2021
// - KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
// - ADA Standards of Medical Care in Diabetes 2024
// - Konsensus Tatalaksana Hipoglikemia — PERKENI 2021
// Setting: Klinik / FKTP
// Alat: TTV (Tensi, Termometer, Oksimetri), EKG, GDS Stik
// TIDAK ADA: HbA1c on-site (rujuk lab), USG (Rujuk RS), funduskopi
// Prinsip: SKRINING KEGAWATAN dulu → Diagnosis & Klasifikasi →
//          Terapi berbasis HbA1c → Kontrol Komorbid → Monitoring komplikasi
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const diabetesMelitusPathway: DynamicPathway = {
  diseaseId: 'diabetes-melitus',
  diseaseName: 'Diabetes Melitus Tipe 2 (PERKENI 2021 & PNPK 2020)',
  startNodeId: 'dm-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT — Anamnesis + TTV + Pemfis
    // ============================================================
    'dm-initial-assessment': {
      id: 'dm-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis, TTV & Pemeriksaan Fisik',
      description: 'DM adalah penyakit kronik yang umumnya datang ke klinik dalam 3 kondisi: (1) Pasien baru / belum terdiagnosis, (2) DM lama untuk kontrol rutin, atau (3) Komplikasi akut (hipoglikemia/krisis hiperglikemia). SKRINING KEGAWATAN DULU sebelum apapun!',
      items: [
        {
          id: 'dm-cek-kesadaran-gds',
          title: '⚡ CEK KESADARAN + GDS (< 5 Menit Pertama!)',
          description: 'Jika pasien datang lemas, pucat, berkeringat, atau tidak sadar:\n→ CEK GDS STIK SEGERA!\n• GDS < 70 mg/dL → HIPOGLIKEMIA → Tangani SEGERA (→ node kegawatan)\n• GDS > 600 mg/dL + kesadaran menurun → curiga SHH (Hiperosmolar Hyperglycemic State)\n• GDS > 300 + mual/muntah/napas cepat → curiga KAD\n\nJangan tunda lebih dari 5 menit untuk cek GDS pada pasien DM dengan keluhan akut!',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'dm-anamnesis-keluhan',
          title: 'Anamnesis — Keluhan Utama & Riwayat DM',
          description: 'Keluhan klasik baru: poliuria (banyak BAK), polidipsia (banyak minum), polifagia (banyak makan), penurunan berat badan tanpa sebab jelas.\n\nPasien DM lama — tanyakan:\n• Sudah berapa lama DM? Obat apa yang diminum?\n• Kontrol terakhir kapan? HbA1c terakhir berapa?\n• Ada keluhan baru: penglihatan kabur, kesemutan kaki, luka sulit sembuh, sesak, nyeri dada?\n• Kepatuhan minum obat? Pola makan dan aktivitas?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dm-anamnesis-faktor-risiko',
          title: 'Anamnesis — Faktor Risiko & Komorbid',
          description: 'Riwayat keluarga DM (orang tua/saudara kandung)?\nRiwayat penyakit kardiovaskular: PJK, stroke, PAD (penyakit arteri perifer)?\nRiwayat gagal jantung atau penyakit ginjal kronik?\nRiwayat hipertensi atau dislipidemia?\nObat-obatan yang diminum saat ini (kortikosteroid menyebabkan hiperglikemia)?\nMerokok?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dm-ttv',
          title: 'TTV — TD, Nadi, Suhu, SpO₂, BB, TB, IMT',
          description: 'Tekanan Darah: Target DM < 130/80 mmHg. Ukur kedua lengan pada kunjungan pertama. Ukur posisi berdiri (hipotensi ortostatik = neuropati otonom?).\nNadi: takikardia tanpa sebab = neuropati otonom atau hipoglikemia?\nSuhu: demam pada luka kaki = infeksi ulkus diabetik!\nBB & TB → hitung IMT. Overweight/obesitas → perlu target penurunan BB.\nLingkar pinggang: ≥ 90 cm (pria) / ≥ 80 cm (wanita) = obesitas sentral.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dm-pemfis-komprehensif',
          title: 'Pemeriksaan Fisik Komprehensif',
          description: 'KARDIOVASKULAR: auskultasi jantung, nadi perifer (dorsalis pedis, tibialis posterior).\nMATa: penglihatan dasar (tajam penglihatan — funduskopi rujuk lab).\nKULIT: acanthosis nigricans (resistensi insulin), luka/ulkus, infeksi.\nKAKI (wajib setiap kunjungan):\n• Inspeksi: kulit kering, fisura, kalus, deformitas, luka\n• Palpasi: nadi dorsalis pedis + tibialis posterior\n• Sensasi: tes monofilamen 10g atau tusuk jarum sederhana\n• Refleks Achilles\nTIROID: pembesaran tiroid?\nABDOMEN: hepatomegali (perlemakan hati = NAFLD pada DM)?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dm-ekg',
          title: 'EKG 12-Lead — Skrining Kardiovaskular (Kunjungan Pertama atau Tahunan)',
          description: 'DM meningkatkan risiko PJK 2–4× lipat. "Silent MI" (infark tanpa nyeri) lebih sering pada DM karena neuropati.\nLakukan EKG pada:\n• Kunjungan pertama DM baru\n• Setiap tahun pada DM lama\n• Kapanpun ada keluhan nyeri dada, sesak, atau palpitasi\n• Sebelum mulai program latihan fisik pada DM ≥ 45 tahun',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'dm-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE — ADA KEGAWATAN?
    // ============================================================
    'dm-triage-decision': {
      id: 'dm-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Ada Kegawatan Glikemik?',
      description: 'Nilai GDS dan status klinis untuk menentukan jalur tatalaksana.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'dm-hipoglikemia',
          title: '🔴 HIPOGLIKEMIA — GDS < 70 mg/dL',
          description: 'GDS < 70 mg/dL ± gejala: keringat dingin, gemetar, pusing, bingung, atau tidak sadar. TANGANI SEGERA sebelum apapun.',
          color: 'red',
          nextNodeId: 'dm-hipoglikemia-management',
          riskLevel: 'high'
        },
        {
          id: 'dm-kad-shh',
          title: '🔴 KRISIS HIPERGLIKEMIA — GDS > 300 + Gejala Klinis Akut',
          description: 'GDS > 300 + mual/muntah/napas kussmaul → curiga KAD. GDS > 600 + penurunan kesadaran + tanpa ketosis → curiga SHH. Butuh insulin IV + rehidrasi agresif → Rujuk IGD RS.',
          color: 'red',
          nextNodeId: 'dm-krisis-hiperglikemia',
          riskLevel: 'high'
        },
        {
          id: 'dm-stabil-baru',
          title: '🟢 STABIL — Pasien Baru atau Evaluasi Rutin',
          description: 'Tidak ada kegawatan. GDS terkontrol atau pasien baru belum terdiagnosis. Lanjut ke diagnosis formal dan rencana terapi.',
          color: 'green',
          nextNodeId: 'dm-diagnosis-klasifikasi',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: HIPOGLIKEMIA
    // ============================================================
    'dm-hipoglikemia-management': {
      id: 'dm-hipoglikemia-management',
      type: 'checklist',
      title: 'Node 3A: Hipoglikemia — Tatalaksana Cepat (Aturan "15-15")',
      description: 'PERKENI 2021: Hipoglikemia = GDS < 70 mg/dL ± gejala adrenergik. Target: normalisasi GDS ≥ 100 mg/dL dan mencegah episode berulang.',
      items: [
        {
          id: 'hipo-klasifikasi',
          title: '1. Klasifikasi Keparahan Hipoglikemia',
          description: 'DERAJAT 1 (Alert Hypoglycemia): GDS 54–70 mg/dL, pasien SADAR, masih bisa menelan.\nDERAJAT 2 (Clinically Significant): GDS < 54 mg/dL, pasien SADAR, gejala lebih berat.\nDERAJAT 3 (Severe): Penurunan KESADARAN dan/atau kejang — tidak bisa menelan sendiri.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'hipo-derajat-1-2',
          title: '2. Hipoglikemia Derajat 1–2 (Pasien SADAR): Aturan 15-15',
          description: 'PERKENI 2021 "Aturan 15-15":\n→ Berikan 15 gram karbohidrat cepat serap:\n• 3 sendok makan (15 g) gula pasir dilarutkan air, ATAU\n• 150–200 mL jus buah/minuman manis (non-diet), ATAU\n• 4–5 permen (mengandung gula)\n\n→ Tunggu 15 menit, cek GDS ulang.\n• Jika GDS masih < 70 → ulangi 15 gram karbohidrat lagi (maks 3 siklus)\n• Jika GDS ≥ 100 → berikan camilan berprotein (roti + keju), catat waktu dan penyebab.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'hipo-derajat-3',
          title: '3. Hipoglikemia Derajat 3 (TIDAK SADAR / Kejang)',
          description: 'JANGAN beri makanan/minuman oral → risiko aspirasi!\n\nTindakan:\n→ Pasang IV line\n→ Dextrose 40% 50 mL IV bolus cepat (= 20 gram glukosa)\n→ Lanjutkan infus Dextrose 5% atau 10% untuk maintenance\n→ Cek GDS setiap 15 menit\n→ Target GDS > 100 mg/dL\n→ Jika tidak tersedia D40: Glukagon 1 mg IM/SC (jika ada)\n→ Jika tidak ada kedua-duanya → RUJUK IGD RS SEGERA sambil pertahankan IV line.',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'hipo-cari-penyebab',
          title: '4. Cari & Atasi Penyebab Hipoglikemia',
          description: 'Penyebab umum hipoglikemia pada DM:\n• Melewatkan makan atau makan terlambat\n• Dosis OHO/insulin terlalu tinggi\n• Aktivitas fisik lebih berat dari biasa\n• Konsumsi alkohol\n• Fungsi ginjal memburuk (OHO terakumulasi)\n• Interaksi obat (kuinolon, sulfonamide meningkatkan efek sulfonilurea)\n\nJika penyebabnya dosis OHO → sesuaikan rejimen obat!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'hipo-edukasi',
          title: '5. Edukasi Pencegahan Hipoglikemia Berulang',
          description: 'Ajarkan pasien dan keluarga:\n• Selalu bawa makanan manis/permen ke mana-mana\n• Jangan melewatkan makan setelah minum OHO atau injeksi insulin\n• Kenali tanda awal hipoglikemia: keringat dingin, gemetar, pusing\n• Gunakan gelang/kartu identifikasi DM\n• Pantau GDS mandiri lebih ketat jika menggunakan insulin\n\nJika hipoglikemia berulang > 2x/minggu → REVISI DOSIS TERAPI!',
          required: true,
          category: 'documentation',
          role: 'nurse',
        }
      ]
    },

    // ============================================================
    // NODE 3B: KRISIS HIPERGLIKEMIA (KAD/SHH)
    // ============================================================
    'dm-krisis-hiperglikemia': {
      id: 'dm-krisis-hiperglikemia',
      type: 'checklist',
      title: 'Node 3B: Krisis Hiperglikemia (KAD / SHH) — Stabilisasi & Rujuk IGD',
      description: 'KAD (Ketoasidosis Diabetik) dan SHH (State Hiperosmolar Hiperglikemik) adalah kegawatan yang memerlukan perawatan ICU/rawat inap dengan insulin drip IV dan rehidrasi masif.',
      items: [
        {
          id: 'kad-identifikasi',
          title: '1. Identifikasi KAD vs SHH',
          description: 'KAD (kurang insulin absolut — sering DM Tipe 1 atau DM Tipe 2 stres berat):\n• GDS > 250 mg/dL\n• Napas cepat dan dalam (Kussmaul)\n• Bau napas seperti buah/aseton\n• Mual, muntah, nyeri perut\n• Bicarbonat < 15 mEq/L (jika lab tersedia)\n\nSHH (dehidrasi masif tanpa ketosis — DM Tipe 2 berat):\n• GDS sangat tinggi (> 600 mg/dL)\n• Penurunan kesadaran berat\n• Tanda dehidrasi masif (nadi cepat, mata cekung, turgor buruk)\n• TANPA mual/muntah/napas Kussmaul/bau aseton',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'kad-airway-o2',
          title: '2. Amankan Airway + O₂ + Posisi',
          description: 'Jika penurunan kesadaran: posisi miring ke kiri (cegah aspirasi). Siapkan suction.\nO₂ via masker 4–8 L/menit jika SpO₂ < 94%.\nPantau TTV setiap 15 menit.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'kad-iv-rehidrasi',
          title: '3. IV Line + Resusitasi Cairan (Sambil Persiapan Rujuk)',
          description: 'Pasang IV line 2 jalur.\nNaCl 0.9% 500–1000 mL dalam 1 jam pertama.\n\nKAD/SHH membutuhkan > 3–5 L cairan dalam 24 jam pertama — tidak bisa diselesaikan di klinik.\nINSULIN IV drip hanya bisa dikelola dengan baik di ICU/rawat inap RS.\n\nJANGAN beri insulin IV di klinik tanpa monitor ketat — risiko hipoglikemia berat!',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'kad-rujuk',
          title: '4. RUJUK IGD RS — CITO dengan Pendamping',
          description: 'Hubungi IGD RS tujuan terlebih dahulu. Transportasi dengan ambulans + dokter/tenaga kesehatan pendamping.\nIV drip NaCl tetap jalan selama perjalanan.\n\nSurat rujukan cantumkan: GDS awal, status kesadaran (GCS), TTV serial, volume cairan yang sudah diberikan, obat DM yang biasa diminum, dan waktu onset gejala.',
          required: true,
          category: 'documentation',
          role: 'nurse',
        }
      ]
    },

    // ============================================================
    // NODE 4: DIAGNOSIS & KLASIFIKASI
    // ============================================================
    'dm-diagnosis-klasifikasi': {
      id: 'dm-diagnosis-klasifikasi',
      type: 'checklist',
      title: 'Node 4: Diagnosis DM & Pemeriksaan Penunjang',
      description: 'Tegakkan atau konfirmasi diagnosis DM berdasarkan kriteria PERKENI 2021.',
      items: [
        {
          id: 'dm-kriteria-diagnosis',
          title: '1. Kriteria Diagnosis DM (Salah Satu Memenuhi)',
          description: 'PERKENI 2021 — Diagnosis DM ditegakkan jika:\n• GDP ≥ 126 mg/dL (puasa ≥ 8 jam), ATAU\n• GDS ≥ 200 mg/dL + gejala klasik (poliuria, polidipsia, polifagia, penurunan BB), ATAU\n• GD 2 jam pasca TTGO 75g ≥ 200 mg/dL, ATAU\n• HbA1c ≥ 6.5%\n\nJika tanpa gejala klasik → konfirmasi dengan pemeriksaan ke-2 pada hari berbeda.\n\nPRADIABETES: GDP 100–125 mg/dL (IFG) atau GD 2 jam TTGO 140–199 mg/dL (IGT) atau HbA1c 5.7–6.4%.',
          required: true,
          category: 'assessment',
          role: 'doctor',
        },
        {
          id: 'dm-lab-rujuk',
          title: '2. Pemeriksaan Lab (Rujuk Lab / RS)',
          description: 'Kunjungan pertama & tiap 3–6 bulan:\n• HbA1c (target < 7% untuk kebanyakan pasien)\n• GDP dan GD 2 jam pp\n\nKunjungan pertama & tiap tahun:\n• Profil lipid puasa: Kolesterol total, LDL, HDL, Trigliserida\n• Fungsi ginjal: Ureum, Kreatinin, eGFR\n• Urin rutin + rasio albumin-kreatinin (ACR) — deteksi nefropati dini\n• SGOT/SGPT — terutama jika konsumsi statin atau metformin\n\nRujukan spesialis:\n• Funduskopi (mata) — kunjungan pertama, lalu tiap tahun\n• ABI (Ankle-Brachial Index) — jika ada gejala PAD',
          required: true,
          category: 'assessment',
          role: 'doctor',
        },
        {
          id: 'dm-hba1c-nilai',
          title: '3. Catat Nilai HbA1c — Kunci Pemilihan Terapi',
          description: 'HbA1c adalah panduan utama intensitas terapi:\n• HbA1c < 7.5% → Monoterapi atau pasien sudah terkontrol\n• HbA1c 7.5–9.0% → Dual therapy\n• HbA1c > 9.0% tanpa gejala berat → Triple therapy\n• HbA1c > 9.0% + gejala/dekompensasi → Insulin\n\nJika HbA1c tidak tersedia → gunakan rata-rata GDS harian sebagai proxy.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'dm-oha-decision'
    },

    // ============================================================
    // NODE 5: KEPUTUSAN TERAPI BERBASIS HbA1c
    // ============================================================
    'dm-oha-decision': {
      id: 'dm-oha-decision',
      type: 'decision',
      title: 'Node 5: Pilihan Terapi Farmakoterapi Berdasarkan HbA1c (PERKENI 2021)',
      description: 'Semua pasien DM mendapatkan modifikasi gaya hidup bersamaan. Terapi farmakologi dipilih berdasarkan nilai HbA1c dan ada/tidaknya komorbid kardiovaskular.',
      warningLevel: 'info',
      branches: [
        {
          id: 'hba1c-75',
          title: '🟢 HbA1c < 7.5% — Monoterapi',
          description: 'HbA1c dekat target. Mulai dengan 1 obat (biasanya Metformin). Evaluasi 3 bulan.',
          color: 'green',
          nextNodeId: 'dm-monoterapi',
          riskLevel: 'low'
        },
        {
          id: 'hba1c-9',
          title: '🟡 HbA1c 7.5–9.0% — Dual Therapy (2 Obat)',
          description: 'HbA1c belum terkontrol dengan monoterapi. Kombinasi 2 obat dengan mekanisme berbeda.',
          color: 'orange',
          nextNodeId: 'dm-dual-therapy',
          riskLevel: 'medium'
        },
        {
          id: 'hba1c-9-tanpa-dekompensasi',
          title: '🟠 HbA1c > 9.0%, Stabil — Triple Therapy (3 Obat)',
          description: 'HbA1c jauh dari target tapi tanpa gejala berat. Kombinasi 3 obat atau insulin basal.',
          color: 'orange',
          nextNodeId: 'dm-triple-therapy',
          riskLevel: 'medium'
        },
        {
          id: 'hba1c-9-dekompensasi',
          title: '🔴 HbA1c > 9.0% + Dekompensasi / Gejala Berat',
          description: 'Penurunan BB drastis, kelemahan ekstrem, atau gejala urgensi metabolik. Mulai insulin segera.',
          color: 'red',
          nextNodeId: 'dm-insulin-therapy',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 6A: MONOTERAPI
    // ============================================================
    'dm-monoterapi': {
      id: 'dm-monoterapi',
      type: 'checklist',
      title: 'Node 6A: Monoterapi — Metformin atau Alternatif',
      description: 'PERKENI 2021: Metformin adalah OHO lini pertama kecuali ada kontraindikasi. Diberikan bersamaan dengan modifikasi gaya hidup.',
      items: [
        {
          id: 'mono-mls',
          title: '1. Modifikasi Gaya Hidup (Wajib Bersamaan dengan Farmakologi)',
          description: 'Diet:\n• Karbohidrat 45–65% total kalori — pilih rendah GI (beras merah, oat, sayur)\n• Protein 15–20% total kalori\n• Lemak < 30% — hindari lemak jenuh dan trans\n• Serat 25–35 g/hari\n\nAktivitas fisik:\n• Aerobik 150 menit/minggu intensitas sedang (jalan cepat, berenang, bersepeda)\n• ATAU 75 menit/minggu intensitas tinggi\n• Maksimal jeda 2 hari berturut-turut tanpa latihan\n• Tambahan latihan resistensi 2–3×/minggu',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'mono-metformin',
          title: '2. Metformin — Lini Pertama Utama',
          description: 'Metformin HCl:\n• Mulai: 500 mg 2× sehari atau 850 mg 1× sehari bersama makan\n• Titrasi: naikan 500 mg tiap 1–2 minggu sesuai toleransi GI\n• Target: 1500–2000 mg/hari (dosis efektif)\n• Maks: 2550 mg/hari\n\nKONTRAINDIKASI: eGFR < 30 mL/min/1.73m² (stop), eGFR 30–45 (dosis 50%, monitor ketat), gagal hati berat, riwayat asidosis laktat, penggunaan kontras IV (tahan 48 jam).\n\nEfek samping: mual, diare (biasanya membaik dalam 2–4 minggu).',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'mono-ascvd-check',
          title: '3. Prioritas SGLT2i atau GLP-1 Agonis Jika Ada Komorbid Kardiovaskular/Ginjal',
          description: 'Jika ada SALAH SATU kondisi berikut → pertimbangkan SGLT2 inhibitor atau GLP-1 RA sebagai obat kedua SEGERA (bukan tunggu monoterapi gagal):\n• Penyakit kardiovaskular aterosklerotik (PKVAS): PJK, stroke, PAD\n• Gagal jantung (HFrEF maupun HFpEF)\n• Penyakit ginjal kronik (CKD — eGFR 25–60)\n\nSGLT2i: Empagliflozin, Dapagliflozin, Canagliflozin\nGLP-1 RA: Dulaglutide, Semaglutide, Liraglutide',
          required: true,
          category: 'assessment',
          role: 'doctor',
        },
        {
          id: 'mono-evaluasi-3-bulan',
          title: '4. Evaluasi 3 Bulan — Cek HbA1c',
          description: 'Jika HbA1c BELUM MENCAPAI TARGET (< 7%) dalam 3 bulan monoterapi → eskalasi ke Dual Therapy.\nJika SUDAH TERCAPAI → lanjutkan monoterapi dengan monitoring 3–6 bulanan.\n\nTarget HbA1c dapat DIINDIVIDUALISASI:\n• Muda, baru DM, tanpa komorbid: < 6.5%\n• Kebanyakan pasien dewasa: < 7%\n• Lansia, hipoglikemia sering, harapan hidup terbatas: < 8%',
          required: true,
          category: 'documentation',
          role: 'doctor',
        }
      ],
      nextNodeId: 'dm-monitoring-komorbid'
    },

    // ============================================================
    // NODE 6B: DUAL THERAPY
    // ============================================================
    'dm-dual-therapy': {
      id: 'dm-dual-therapy',
      type: 'checklist',
      title: 'Node 6B: Dual Therapy — Kombinasi 2 Obat',
      description: 'Kombinasikan Metformin + 1 obat lain dengan mekanisme berbeda. Pilihan obat kedua diprioritaskan berdasarkan komorbid.',
      items: [
        {
          id: 'dual-mls',
          title: '1. Lanjutkan Modifikasi Gaya Hidup (Wajib)',
          description: 'Modifikasi gaya hidup tetap WAJIB bersamaan dengan semua terapi farmakologi. Evaluasi kepatuhan diet dan aktivitas fisik di setiap kunjungan.',
          required: true,
          category: 'action',
          role: 'doctor',
        },
        {
          id: 'dual-algoritma',
          title: '2. Pilih Obat Kedua Berdasarkan Kondisi Pasien',
          description: 'PERKENI 2021 — Panduan pemilihan obat kedua:\n\n🏥 ADA PKVAS, CKD, atau Gagal Jantung:\n→ Tambahkan SGLT2 inhibitor (Empagliflozin 10 mg, Dapagliflozin 10 mg)\n→ ATAU GLP-1 RA jika PKVAS dominan (Dulaglutide, Semaglutide)\n\n💊 TANPA komorbid spesifik — pilih berdasarkan profil pasien:\n→ Sulfonilurea (SU): Glimepiride 1–4 mg, Gliclazide 30–120 mg — murah, efektif, tapi risiko hipoglikemia & BB naik\n→ DPP-4 inhibitor: Sitagliptin 100 mg, Vildagliptin 50 mg BD — aman, netral BB, lebih mahal\n→ SGLT2i: cardio/reno-protektif, turunkan BB\n→ GLP-1 RA: turunkan BB, cardioprotektif\n→ Acarbose: jika GD postprandial dominan, tapi sering perut kembung\n→ Pioglitazone: efektif tapi BB naik, kontraindikasi gagal jantung',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'dual-evaluasi',
          title: '3. Evaluasi 3 Bulan — Eskalasi ke Triple Jika Perlu',
          description: 'Jika HbA1c BELUM TARGET (< 7%) setelah 3 bulan dual therapy → naik ke Triple Therapy atau Insulin Basal.\nJika TARGET TERCAPAI → lanjutkan dengan monitoring 3–6 bulan.',
          required: true,
          category: 'documentation',
          role: 'both',
        }
      ],
      nextNodeId: 'dm-monitoring-komorbid'
    },

    // ============================================================
    // NODE 6C: TRIPLE THERAPY
    // ============================================================
    'dm-triple-therapy': {
      id: 'dm-triple-therapy',
      type: 'checklist',
      title: 'Node 6C: Triple Therapy — Kombinasi 3 Obat atau Insulin Basal',
      description: 'HbA1c > 9% tanpa dekompensasi. PERKENI 2021: tambah obat ketiga atau mulai insulin basal.',
      items: [
        {
          id: 'triple-obat',
          title: '1. Tambah Obat Ketiga ke Regimen',
          description: 'Jika belum ada SGLT2i/GLP-1 RA → tambahkan sekarang.\nKombinasi rasional: Metformin + SGLT2i + DPP-4i, atau Metformin + GLP-1 RA + SGLT2i.\n\nPerhatikan interaksi obat dan kontraindikasi.\nJika 3 OHO tetap tidak mencapai target 3 bulan → beralih ke insulin basal.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'triple-mulai-insulin-basal',
          title: '2. Mulai Insulin Basal (Alternatif Triple OHO)',
          description: 'Insulin basal (long-acting) dapat dimulai bersamaan dengan OHO:\n• Insulin Glargine atau Detemir:\n  - Dosis awal: 10 unit atau 0.1–0.2 unit/kgBB, sekali sehari malam hari\n  - Titrasi: naikkan 2–4 unit tiap 3–5 hari sampai GDP 80–130 mg/dL\n• Lanjutkan Metformin + SGLT2i/GLP-1 RA bersamaan\n\nEdukasi injeksi: teknik, rotasi situs, penyimpanan insulin.',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'triple-evaluasi',
          title: '3. Evaluasi 3 Bulan — Intensifikasi Insulin Jika Perlu',
          description: 'Jika target HbA1c belum tercapai dengan insulin basal + OHO → intensifikasi ke insulin prandial (basal-bolus) → RUJUK/konsultasi dokter spesialis penyakit dalam.',
          required: true,
          category: 'documentation',
          role: 'nurse',
        }
      ],
      nextNodeId: 'dm-monitoring-komorbid'
    },

    // ============================================================
    // NODE 6D: INSULIN THERAPY
    // ============================================================
    'dm-insulin-therapy': {
      id: 'dm-insulin-therapy',
      type: 'checklist',
      title: 'Node 6D: Terapi Insulin — HbA1c > 9% + Dekompensasi Metabolik',
      description: 'Indikasi insulin segera: penurunan BB drastis, gejala hiperglikemia berat, gagal OHO kombinasi dosis optimal, gagal ginjal/hati berat, stres berat (infeksi, post-operasi).',
      items: [
        {
          id: 'ins-indikasi',
          title: '1. Konfirmasi Indikasi Insulin',
          description: 'Insulin SEGERA jika:\n• KAD atau SHH (→ rujuk IGD, insulin IV drip)\n• Penurunan BB > 10% dalam 1–3 bulan\n• Gejala hiperglikemia berat (poliuria masif, polidipsia, kelemahan ekstrem)\n• Hamil dengan DM (diabetes gestasional atau DM pra-eksisting)\n• Gagal ginjal (eGFR < 30) — banyak OHO terkontraindikasi\n• Infeksi berat/perioperatif',
          required: true,
          category: 'assessment',
          role: 'doctor',
        },
        {
          id: 'ins-basal',
          title: '2. Mulai Insulin Basal (Long-Acting)',
          description: 'Insulin Glargine 100 unit/mL atau Detemir:\n• Dosis awal: 10 unit atau 0.1–0.2 unit/kgBB, malam hari sebelum tidur\n• Titrasi setiap 3–5 hari: tambah 2 unit jika GDP > 130 mg/dL, kurangi 2 unit jika GDP < 80 mg/dL\n• OHO (terutama Metformin) dapat dilanjutkan bersamaan insulin basal\n• HENTIKAN Sulfonilurea jika mulai insulin basal (risiko hipoglikemia kumulatif)',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'ins-prandial',
          title: '3. Insulin Prandial (Jika GDP Terkontrol tapi GD Post-Prandial Masih Tinggi)',
          description: 'Tambahkan insulin rapid-acting (Aspart, Lispro, Glulisine) sebelum makan utama:\n• Dosis awal: 4 unit atau 10% dosis basal, sebelum makan\n• Titrasi 1–2 unit tiap 3 hari berdasarkan GD 2 jam pp\n\nJika butuh penyesuaian kompleks → KONSULKAN/RUJUK ke SpPD.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ins-edukasi-suntik',
          title: '4. Edukasi Teknik Injeksi Insulin (Wajib!)',
          description: 'Ajarkan:\n• Teknik injeksi SC (sudut 45° atau 90° tergantung jaringan lemak)\n• Situs rotasi: abdomen (onset tercepat), paha, lengan atas, bokong\n• Penyimpanan: di kulkas (2–8°C) atau suhu ruang < 30°C (maks 28 hari)\n• Buang jarum suntik sekali pakai dengan aman\n• Jangan kocok insulin — putar perlahan!\n\nBerikan PGDM (Pemantauan Glukosa Darah Mandiri): pasien monitor GD sebelum makan dan 2 jam setelah makan.',
          required: true,
          category: 'action',
          role: 'nurse',
        }
      ],
      nextNodeId: 'dm-monitoring-komorbid'
    },

    // ============================================================
    // NODE 7: MONITORING KOMORBID & KOMPLIKASI
    // ============================================================
    'dm-monitoring-komorbid': {
      id: 'dm-monitoring-komorbid',
      type: 'checklist',
      title: 'Node 7: Monitoring Komorbid & Skrining Komplikasi Kronik',
      description: 'DM bukan hanya soal gula darah. Pengendalian komprehensif tekanan darah, lipid, dan skrining komplikasi mikrovaskuler adalah kunci mencegah kecacatan jangka panjang.',
      items: [
        {
          id: 'mon-target-glikemik',
          title: '1. Target Kendali Glikemik',
          description: 'Pantau dan dokumentasikan setiap kunjungan:\n• HbA1c: target < 7% (atau target individual — lebih ketat < 6.5% jika muda & baru DM, lebih longgar < 8% jika lansia/sering hipoglikemia)\n• GDP: 80–130 mg/dL\n• GD 2 jam pp: < 180 mg/dL\n\nEvaluasi HbA1c setiap 3 bulan jika belum tercapai, tiap 6 bulan jika sudah stabil.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'mon-hipertensi',
          title: '2. Kontrol Tekanan Darah — Target < 130/80 mmHg',
          description: 'TD target < 130/80 mmHg pada DM (ADA 2024). Jika > 140/90 → mulai antihipertensi:\n• Lini pertama: ACE inhibitor (misal: Ramipril 5 mg, Lisinopril 10 mg) atau ARB (misal: Valsartan 80 mg, Losartan 50 mg)\n• ACEi/ARB diutamakan karena renoprotektif (melindungi ginjal dari nefropati diabetik)\n• JANGAN kombinasi ACEi + ARB\n\nJika TD masih tinggi dengan 1 obat → tambah CCB (Amlodipine 5 mg) atau HCT.',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'mon-dislipidemia',
          title: '3. Kontrol Lipid — Statin Wajib pada Semua DM ≥ 40 Tahun',
          description: 'Target LDL:\n• DM tanpa PKVAS: LDL < 100 mg/dL\n• DM + PKVAS (very high risk): LDL < 70 mg/dL\n\nTerapi:\n• Statin intensitas sedang: Atorvastatin 10–20 mg ATAU Rosuvastatin 5–10 mg\n• Statin intensitas tinggi: Atorvastatin 40–80 mg atau Rosuvastatin 20–40 mg (jika PKVAS)\n\nPantau SGOT/SGPT 3 bulan setelah mulai statin. Waspada miopati (nyeri otot).',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'mon-antiplatelet',
          title: '4. Antiplatelet (Aspirin) — Prevensi Sekunder PKVAS',
          description: 'Aspirin 75–100 mg/hari diberikan pada:\n• DM + PKVAS (prevensi sekunder): wajib\n• DM tanpa PKVAS (prevensi primer): HANYA jika risiko kardiovaskular sangat tinggi (usia > 50 + ≥ 1 faktor risiko mayor) DAN risiko perdarahan rendah\n\nJangan berikan rutin tanpa penilaian risiko individual.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'mon-skrining-nefropati',
          title: '5. Skrining Nefropati Diabetik (Setiap Tahun)',
          description: 'Periksa:\n• Albumin-Kreatinin Rasio (ACR) urin sewaktu:\n  - Normal: < 30 mg/g\n  - Mikroalbuminuria: 30–300 mg/g → mulai ACEi/ARB\n  - Makroalbuminuria: > 300 mg/g → konsul nefrologi\n• Kreatinin serum + hitung eGFR\n\nJika eGFR < 60 → monitor 2–4x setahun. eGFR < 30 → rujuk nefrologi.',
          required: true,
          category: 'assessment',
          role: 'doctor',
        },
        {
          id: 'mon-skrining-retinopati',
          title: '6. Skrining Retinopati (Funduskopi — Rujuk Dokter Mata)',
          description: 'Kunjungan pertama DM → funduskopi segera.\nJika tidak ada retinopati: ulangi tiap 2 tahun.\nJika ada retinopati ringan: ulangi tiap tahun.\nJika ada retinopati berat: rujuk dokter mata untuk laser fotokoagulasi.\n\nDi klinik tanpa funduskopi → RUJUK ke dokter mata/RS minimal setahun sekali.',
          required: true,
          category: 'assessment',
          role: 'doctor',
        },
        {
          id: 'mon-kaki-diabetik',
          title: '7. Perawatan Kaki & Skrining Neuropati (Setiap Kunjungan)',
          description: 'Nilai risiko kaki setiap kunjungan:\n• Inspeksi: kulit kering/fisura, kalus, deformitas, luka/ulkus\n• Sensasi: monofilamen 10g di 10 titik (atau tes tusuk jarum/kapas)\n• Nadi: dorsalis pedis + tibialis posterior\n\nEdukasi perawatan kaki:\n• Cuci kaki setiap hari, keringkan di sela jari\n• Hindari berjalan tanpa alas kaki\n• Potong kuku lurus (bukan melengkung)\n• Pakai alas kaki yang pas dan tidak menjepit\n\nUlkus/infeksi kaki → rujuk ke dokter bedah/FKRTL.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'mon-jadwal-kontrol',
          title: '8. Jadwal Monitoring & Edukasi Lanjutan',
          description: 'Setiap 3 bulan: HbA1c, TTV, BB, cek kaki, kepatuhan obat.\nSetiap 6 bulan: profil lipid, fungsi ginjal (jika stabil).\nSetiap tahun: ECG, funduskopi (rujuk), ACR urin, foto thoraks.\n\nEdukasi diabetes berkelanjutan:\n• SMKB (Self-Monitoring of Blood Glucose) jika pakai insulin\n• Kenali tanda hipoglikemia dan cara mengatasinya\n• Manajemen DM saat sakit (sick day rules)\n• Vaksinasi: Influenza (tahunan), Pneumokokus, Hepatitis B',
          required: true,
          category: 'documentation',
          role: 'nurse',
        }
      ]
    }

  },
  references: [
    'PNPK Tata Laksana Diabetes Melitus Tipe 2 Dewasa. KMK No. HK.01.07/MENKES/603/2020. Kemenkes RI.',
    'PERKENI. Pedoman Pengelolaan dan Pencegahan Diabetes Melitus Tipe 2 Dewasa di Indonesia. 2021.',
    'KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP. Kemenkes RI. Bab: Diabetes Melitus.',
    'ElSayed NA, et al. Standards of Medical Care in Diabetes 2024. Diabetes Care. 2024;47(Suppl 1):S1–S321.',
    'Cosentino F, et al. 2019 ESC Guidelines on Diabetes, Pre-Diabetes, and Cardiovascular Diseases developed in collaboration with the EASD. Eur Heart J. 2020;41(2):255–323.',
    'Buse JB, et al. 2019 Update to: Management of Hyperglycemia in Type 2 Diabetes, 2018. A Consensus Report by the ADA and EASD. Diabetes Care. 2020;43(2):487–493.',
    'PERKENI. Petunjuk Praktis Terapi Insulin pada Pasien Diabetes Melitus. 2021.',
    'Konsensus Tatalaksana Hipoglikemia pada Pasien Diabetes Melitus — PERKENI 2021.'
  ]
};
