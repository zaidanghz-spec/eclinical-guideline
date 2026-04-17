// ============================================================
// TENSION-TYPE HEADACHE (TTH) — Nyeri Kepala Tipe Tegang
// ICD-10: G44.2
// Referensi:
// - PPK Neurologi PERDOSSI 2023 (Panduan Praktik Klinis Neurologi)
// - ICHD-3: International Classification of Headache Disorders, 3rd Edition
// - Konsensus Nasional V Pokdi Nyeri Kepala PERDOSSI 2016
// - EFNS Guidelines on Treatment of Tension-Type Headache, 2010
// - SIGN Guideline 107: Diagnosis and Management of Headache in Adults, 2023
// - KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
// Setting: Klinik / FKTP
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const tthPathway: DynamicPathway = {
  diseaseId: 'tension-type-headache',
  diseaseName: 'Nyeri Kepala Tipe Tegang / Tension-Type Headache (PERDOSSI 2023)',
  startNodeId: 'tth-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT — Anamnesis + TTV + Pemfis
    // ============================================================
    'tth-initial-assessment': {
      id: 'tth-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis, TTV & Pemeriksaan Fisik',
      description: 'Lakukan berurutan dari atas ke bawah. TTH adalah diagnosis klinis — tidak memerlukan lab atau imaging. Fokus pada karakteristik nyeri dan menyingkirkan red flags.',
      items: [
        {
          id: 'tth-anamnesis-nyeri',
          title: 'Anamnesis — Karakteristik Nyeri Kepala (ACHD-3)',
          description: 'Tanyakan:\n• Lokasi: bilateral, temporal, oksipital, atau seluruh kepala?\n• Kualitas: terasa menekan/mengikat/seperti diikat? (BUKAN berdenyut)\n• Intensitas: ringan–sedang (bisa beraktivitas meski tidak nyaman)\n• Durasi: 30 menit hingga 7 hari per serangan\n• Tidak bertambah berat saat aktivitas fisik rutin → jika ya, curiga migren!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-anamnesis-penyerta',
          title: 'Anamnesis — Gejala Penyerta (Untuk Bedakan TTH vs Migren)',
          description: 'TTH TIDAK boleh ada:\n• Mual atau muntah (boleh anoreksia)\n• Fotofobia DAN fonofobia bersamaan (hanya boleh salah satu)\n\nJika ada mual/muntah + berdenyut + satu sisi + diperburuk aktivitas → curiga MIGREN bukan TTH.\nJika ada lakrimasi + hidung berair + nyeri periorbital satu sisi → curiga CLUSTER HEADACHE.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-anamnesis-frekuensi',
          title: 'Anamnesis — Frekuensi Serangan (Kunci Klasifikasi Terapi)',
          description: 'Hitung berapa hari nyeri kepala per bulan selama ≥ 3 bulan terakhir:\n• < 1 hari/bulan (< 12 hari/tahun) → TTH Episodik INFREQUENT\n• 1–14 hari/bulan, ≥ 3 bulan → TTH Episodik FREQUENT\n• ≥ 15 hari/bulan, > 3 bulan → TTH KRONIK\n\nKlasifikasi ini menentukan apakah perlu profilaksis atau tidak.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-anamnesis-pencetus',
          title: 'Anamnesis — Faktor Pencetus & Riwayat Obat',
          description: 'Pencetus TTH: stres psikologis, kurang tidur, postur buruk saat kerja, dehidrasi, melewatkan makan, perubahan cuaca.\n\nRiwayat obat nyeri kepala: berapa hari per minggu konsumsi analgetik? Jenis obat apa?\n⚠️ Jika > 2 hari/minggu → risiko Medication Overuse Headache (MOH)!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-red-flags',
          title: '⚠️ Skrining RED FLAGS — Nyeri Kepala Sekunder Serius',
          description: 'RUJUK SEGERA jika ada SATU dari:\n• "Thunderclap" — nyeri kepala terberat seumur hidup, mendadak dalam detik → curiga SAH!\n• Demam + kaku kuduk + fotofobia → curiga Meningitis!\n• Defisit neurologis fokal (kelemahan, bicara pelo, gangguan penglihatan)\n• Penurunan kesadaran\n• Onset baru usia > 50 tahun\n• Progresif memberat dari hari ke hari\n• Riwayat kanker, HIV, atau immunocompromised\n• Papilledema (mata kabur + sakit kepala + mual hebat)',
          required: true,
          category: 'safety'
        },
        {
          id: 'tth-ttv',
          title: 'TTV — TD, Nadi, Suhu, SpO₂',
          description: 'TD: jika ≥ 180/120 + nyeri kepala → curiga nyeri kepala hipertensi sekunder!\nSuhu: ≥ 38°C + nyeri kepala → RED FLAG, curiga meningitis/ensefalitis!\nSpO₂: < 94% dapat menyebabkan nyeri kepala hipoksik (sekunder)\nNadi: takikardia + nyeri kepala → curiga infeksi sistemik atau anemia.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-pemfis-neurologis',
          title: 'Pemeriksaan Fisik — Neurologis (Wajib Normal pada TTH)',
          description: 'Pada TTH: pemeriksaan neurologis DALAM BATAS NORMAL (PERDOSSI 2023).\nPeriksa: GCS, orientasi, pupil isokor dan reaktif, kekuatan motorik simetris, refleks fisiologis normal, tidak ada tanda meningeal (Kernig, Brudzinski), tidak ada defisit nervus kranialis.\n\nJika ABNORMAL → BUKAN TTH biasa → red flag → pertimbangkan rujuk.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-pemfis-perikranial',
          title: 'Pemeriksaan Fisik — Palpasi Otot Perikranial & Leher',
          description: 'Palpasi nyeri tekan otot perikranial: temporalis, masseter, sternokleidomastoideus, trapezius, dan suboksipital.\nTTH sering disertai peningkatan tenderness otot perikranial.\nPeriksa range of motion (ROM) leher — nyeri servikogenik sebagai diagnosis banding.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tth-ekg',
          title: 'EKG 12-Lead — Jika Ada Indikasi (Usia ≥ 40 atau Keluhan Dada)',
          description: 'EKG tidak rutin untuk TTH murni. Lakukan jika:\n• Usia ≥ 40 tahun\n• Ada keluhan nyeri dada atau palpitasi bersamaan\n• Hipertensi tidak terkontrol\n• Red flag terkait kardiovaskular\nPada TTH murni muda tanpa komorbid → EKG tidak wajib.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'tth-red-flag-decision'
    },

    // ============================================================
    // NODE 2: DECISION — RED FLAG?
    // ============================================================
    'tth-red-flag-decision': {
      id: 'tth-red-flag-decision',
      type: 'decision',
      title: 'Node 2: Ada Red Flag?',
      description: 'Berdasarkan anamnesis dan pemeriksaan fisik, tentukan apakah ada tanda bahaya.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'rf-ya',
          title: '🔴 RED FLAG (+) — Rujuk Segera',
          description: 'Ada tanda bahaya: thunderclap, demam + kaku kuduk, defisit neurologis, progresif, usia > 50 onset baru, riwayat kanker/HIV, papilledema. JANGAN tatalaksana sebagai TTH — RUJUK ke Spesialis Saraf / IGD.',
          color: 'red',
          nextNodeId: 'tth-rujuk-darurat',
          riskLevel: 'high'
        },
        {
          id: 'rf-tidak',
          title: '🟢 RED FLAG (-) — Lanjut ke Klasifikasi & Tatalaksana TTH',
          description: 'Tidak ada tanda bahaya. Karakteristik sesuai TTH. Lanjut ke klasifikasi berdasarkan frekuensi.',
          color: 'green',
          nextNodeId: 'tth-klasifikasi-decision',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: RUJUK DARURAT (Red Flag)
    // ============================================================
    'tth-rujuk-darurat': {
      id: 'tth-rujuk-darurat',
      type: 'checklist',
      title: 'Node 3: Pra-Rujukan — Red Flag (+)',
      description: 'Stabilisasi dan persiapan rujukan ke Spesialis Saraf / IGD RS.',
      items: [
        {
          id: 'ref-monitor',
          title: '1. Monitor TTV Kontinu',
          description: 'TD, nadi, SpO₂ (oksimetri), suhu. Jika TD ≥ 180/120 dengan nyeri kepala → pertimbangkan antihipertensi oral sambil menunggu rujuk. SpO₂ < 94% → beri O₂ nasal kanul.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ref-iv-akses',
          title: '2. Pasang IV Line & Posisikan Pasien',
          description: 'Pasang IV line untuk akses obat. Posisikan pasien berbaring dengan kepala elevasi 30°. Siapkan suction jika ada risiko muntah dan aspirasi.',
          required: true,
          category: 'action'
        },
        {
          id: 'ref-ekg',
          title: '3. EKG 12-Lead (Singkirkan Penyebab Kardiovaskular)',
          description: 'Rekam EKG untuk menyingkirkan penyebab kardiak (aritmia, iskemia). Lampirkan hasil EKG dalam surat rujukan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ref-surat-rujukan',
          title: '4. Surat Rujukan Lengkap ke Spesialis Saraf / IGD',
          description: 'Cantumkan: onset nyeri, karakter (thunderclap/progresif/dll), red flags yang ditemukan, TTV serial, pemeriksaan neurologis, obat yang sudah diberikan.\nPPK 2023: rujuk ke Spesialis Saraf jika nyeri kepala tidak membaik. Rujuk ke Spesialis Jiwa jika ada depresi berat dengan ide bunuh diri.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 4: KLASIFIKASI FREKUENSI TTH
    // ============================================================
    'tth-klasifikasi-decision': {
      id: 'tth-klasifikasi-decision',
      type: 'decision',
      title: 'Node 4: Klasifikasi TTH Berdasarkan Frekuensi (ICHD-3)',
      description: 'Tentukan frekuensi serangan untuk memilih strategi terapi yang tepat.',
      warningLevel: 'info',
      branches: [
        {
          id: 'tth-infrequent',
          title: '🟢 INFREQUENT — < 1 hari/bulan (< 12 hari/tahun)',
          description: 'Jarang terjadi. Cukup analgetik saat serangan. Tidak perlu profilaksis.',
          color: 'green',
          nextNodeId: 'tth-terapi-infrequent',
          riskLevel: 'low'
        },
        {
          id: 'tth-frequent',
          title: '🟡 FREQUENT — 1–14 hari/bulan, ≥ 3 bulan',
          description: 'Sedang–sering. Analgetik akut + pertimbangkan profilaksis jika frekuensi makin tinggi.',
          color: 'orange',
          nextNodeId: 'tth-terapi-frequent',
          riskLevel: 'medium'
        },
        {
          id: 'tth-chronic',
          title: '🔴 KRONIK — ≥ 15 hari/bulan, > 3 bulan',
          description: 'Sangat sering/hampir harian. Profilaksis WAJIB. Evaluasi psikologis mendalam. Waspada MOH.',
          color: 'red',
          nextNodeId: 'tth-terapi-kronik',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 5A: TERAPI INFREQUENT
    // ============================================================
    'tth-terapi-infrequent': {
      id: 'tth-terapi-infrequent',
      type: 'checklist',
      title: 'Node 5A: TTH Episodik Infrequent — Analgetik PRN',
      description: 'Serangan jarang → analgetik saat serangan saja. Tidak perlu profilaksis.',
      items: [
        {
          id: 'inf-analgesik',
          title: '1. Analgetik Lini Pertama (Pilih Salah Satu)',
          description: 'Sesuai PPK PERDOSSI 2023:\n• Paracetamol 1000 mg (NNT ~12 untuk kejernihan nyeri 2 jam)\n• Aspirin 1000 mg\n• Ibuprofen 400 mg (NNT ~8 — Cochrane 2019)\n• Naproxen 500 mg / Diklofenak 50 mg\n\n⚠️ BATASI maksimal 2 hari/minggu untuk mencegah MOH!',
          required: true,
          category: 'medication'
        },
        {
          id: 'inf-kafein',
          title: '2. Kombinasi Kafein (Opsional — Efektifitas +40%)',
          description: 'Kafein 65 mg + analgetik dapat meningkatkan efektivitas hingga 40%. Tersedia dalam kombinasi aspirin + paracetamol + kafein. Batasi total asupan kafein harian ≤ 200 mg untuk mencegah rebound headache.',
          required: false,
          category: 'medication'
        },
        {
          id: 'inf-nonfarma',
          title: '3. Non-Farmakologi (Wajib Disertakan)',
          description: 'Kompres panas atau dingin di area kepala/leher. Istirahat di ruangan tenang. Hindari pencetus: stres, kurang tidur, dehidrasi, melewatkan makan. Latihan relaksasi ringan.',
          required: true,
          category: 'action'
        },
        {
          id: 'inf-edukasi',
          title: '4. Edukasi Pasien & Keluarga',
          description: 'TTH adalah kondisi JINAK — tidak ada tumor otak atau stroke. Prognosis: bonam (vitam, fungsionam, sanationam).\nKeluarga bantu kurangi tekanan dan stres pasien.\nKembali ke klinik jika frekuensi meningkat > 4x/bulan.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'tth-nonfarmakologi'
    },

    // ============================================================
    // NODE 5B: TERAPI FREQUENT
    // ============================================================
    'tth-terapi-frequent': {
      id: 'tth-terapi-frequent',
      type: 'checklist',
      title: 'Node 5B: TTH Episodik Frequent — Analgetik + Pertimbangkan Profilaksis',
      description: 'Frekuensi sedang → analgetik + pertimbangkan profilaksis jika ≥ 8 hari/bulan atau kualitas hidup terganggu.',
      items: [
        {
          id: 'freq-analgesik',
          title: '1. Analgetik Akut — Sama dengan Infrequent',
          description: 'Paracetamol 1000 mg / Aspirin 1000 mg / Ibuprofen 400 mg / Naproxen 500 mg.\n⚠️ WAJIB batasi < 2 hari/minggu untuk cegah MOH! Jika sudah > 10–15 hari/bulan menggunakan analgetik → MOH sudah terjadi.',
          required: true,
          category: 'medication'
        },
        {
          id: 'freq-amitriptilin',
          title: '2. Profilaksis Amitriptylin (Jika ≥ 8 hari/bulan)',
          description: 'PERDOSSI 2023 / EFNS 2010 (Level A — Evidence terkuat):\nAmitriptyline mulai 10–25 mg/malam → titrasi +10 mg tiap 2 minggu → target 25–75 mg/malam. Durasi minimal 6 bulan.\nEfek samping: sedasi, mulut kering, konstipasi, retensi urin.',
          required: true,
          category: 'medication'
        },
        {
          id: 'freq-moh-skrining',
          title: '3. Skrining MOH (Medication Overuse Headache)',
          description: 'Hitung hari penggunaan analgetik per bulan:\n• > 15 hari/bulan paracetamol/aspirin/NSAID → MOH\n• > 10 hari/bulan triptan/opioid/ergotamin → MOH\n\nJika MOH: hentikan obat overused (withdrawal), dimulai amitriptylin profilaksis bersamaan.',
          required: true,
          category: 'safety'
        },
        {
          id: 'freq-skrining-psikologis',
          title: '4. Skrining Kecemasan & Depresi (GAD-7 + PHQ-9)',
          description: 'Frekuensi sedang-tinggi berhubungan erat dengan kecemasan dan depresi (60–70% kasus — Headache 2014).\nGAD-7 untuk kecemasan, PHQ-9 untuk depresi. Jika depresi berat dengan ide bunuh diri → RUJUK Spesialis Jiwa.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'freq-kontrol',
          title: '5. Kontrol 4 Minggu — Evaluasi Respons Terapi',
          description: 'Evaluasi setelah 4 minggu: frekuensi serangan berkurang? Penggunaan analgetik masih < 2 hari/minggu? Efek samping profilaksis? Jika tidak membaik → rujuk Spesialis Saraf.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'tth-nonfarmakologi'
    },

    // ============================================================
    // NODE 5C: TERAPI KRONIK
    // ============================================================
    'tth-terapi-kronik': {
      id: 'tth-terapi-kronik',
      type: 'checklist',
      title: 'Node 5C: TTH Kronik — Profilaksis Wajib + Evaluasi Psikologis',
      description: 'TTH ≥ 15 hari/bulan > 3 bulan. Profilaksis amitriptylin wajib. PERDOSSI 2023: TTH kronik biasanya merupakan manifestasi konflik psikologis yang mendasari.',
      items: [
        {
          id: 'kro-amitriptilin',
          title: '1. Profilaksis Amitriptylin — WAJIB!',
          description: 'Amitriptyline 10–75 mg/malam (mulai 10 mg, titrasi bertahap tiap 2 minggu). Durasi minimal 6 bulan. NNT ~3.5 untuk reduksi ≥ 50% frekuensi (Holroyd 2001, EFNS 2010 Grade A).',
          required: true,
          category: 'medication'
        },
        {
          id: 'kro-analgesik-batasi',
          title: '2. Analgetik Akut — SANGAT DIBATASI',
          description: 'Analgetik boleh saat serangan, MAKSIMAL 2 hari/minggu.\n⚠️ HINDARI: penggunaan harian analgetik, sedatif, dan ergotamin (PERDOSSI 2023) → risiko MOH sangat tinggi!\nJika sudah terjadi MOH → withdrawal supervised + profilaksis amitriptylin dimulai bersamaan.',
          required: true,
          category: 'medication'
        },
        {
          id: 'kro-psikologis',
          title: '3. Evaluasi Psikologis Mendalam (Wajib)',
          description: 'TTH kronik erat dengan kecemasan (GAD) dan depresi. Lakukan PHQ-9 dan GAD-7.\n• Depresi → amitriptylin atau SSRI (Sertraline 50 mg, Fluoxetine 20 mg)\n• Kecemasan → CBT + amitriptylin\n• Jika depresi berat dengan ide bunuh diri → RUJUK Spesialis Jiwa\n\nCBT setara farmakologi untuk TTH kronik (Holroyd 2001, NEJM).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'kro-hindari-benzo',
          title: '4. HINDARI Benzodiazepin Jangka Panjang',
          description: 'Golongan benzodiazepin dan butalbital bersifat adiktif dan dapat memperburuk nyeri kepala jangka panjang (PERDOSSI 2023). Gunakan sangat hati-hati, hanya jangka sangat pendek untuk kecemasan akut. Lebih utamakan amitriptylin atau SSRI/SNRI.',
          required: true,
          category: 'safety'
        },
        {
          id: 'kro-kontrol-bulanan',
          title: '5. Kontrol Bulanan dengan Headache Diary',
          description: 'Monitor setiap bulan selama 6 bulan: frekuensi hari nyeri kepala (headache diary), penggunaan analgetik per bulan, respons amitriptylin, mood dan kualitas tidur.\nTarget: reduksi ≥ 50% frekuensi dalam 3 bulan. Jika tidak membaik → rujuk Spesialis Saraf.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'tth-nonfarmakologi'
    },

    // ============================================================
    // NODE 6: NON-FARMAKOLOGI (SEMUA TIPE)
    // ============================================================
    'tth-nonfarmakologi': {
      id: 'tth-nonfarmakologi',
      type: 'checklist',
      title: 'Node 6: Non-Farmakologi — Komponen Wajib Semua Tipe TTH',
      description: 'Terapi non-farmakologis adalah WAJIB pada semua tipe TTH dan harus dikombinasikan dengan farmakoterapi (PERDOSSI 2023).',
      items: [
        {
          id: 'nf-diet-hidrasi',
          title: '1. Pola Makan Teratur & Hidrasi Adekuat',
          description: 'Makan teratur — hindari melewatkan makan. Minum 2–2.5 L air/hari. Batasi kafein ≤ 200 mg/hari (± 2 cangkir kopi). Hindari pemicu: MSG, tyramine (keju tua, wine).',
          required: true,
          category: 'action'
        },
        {
          id: 'nf-terapi-fisik',
          title: '2. Terapi Fisik & Massage',
          description: 'Kompres panas atau dingin di area temporal/oksipital/leher.\nMassage otot perikranial (temporalis, trapezius, suboksipital).\nManual terapi/mobilisasi servikal terbukti mengurangi frekuensi TTH (Cochrane 2004).',
          required: true,
          category: 'action'
        },
        {
          id: 'nf-postur-ergonomi',
          title: '3. Koreksi Postur & Ergonomi Kerja',
          description: 'Koreksi forward head posture. Stretching leher dan bahu 2x/hari (10 menit). Monitor setinggi mata, kursi dengan lumbar support. Istirahat 5 menit tiap 1 jam duduk.',
          required: true,
          category: 'action'
        },
        {
          id: 'nf-relaksasi-cbt',
          title: '4. Relaksasi & Behaviour Treatment',
          description: 'Latihan relaksasi progresif otot. Mindfulness-based stress reduction. CBT untuk modifikasi pola pikir terkait nyeri kepala.\nCBT + relaksasi efektivitasnya setara amitriptylin untuk TTH kronik (Holroyd 2001).',
          required: true,
          category: 'action'
        },
        {
          id: 'nf-tidur',
          title: '5. Higiene Tidur',
          description: 'Tidur 7–8 jam per malam dengan jadwal konsisten. Hindari gadget 1 jam sebelum tidur. Hindari kafein setelah pukul 14.00. Atasi insomnia (evaluasi hubungan dengan kecemasan/depresi).',
          required: true,
          category: 'action'
        },
        {
          id: 'nf-headache-diary',
          title: '6. Ajarkan Headache Diary',
          description: 'Pasien catat: tanggal serangan, durasi (jam), intensitas (VAS 0–10), obat yang digunakan (jenis + dosis), faktor pencetus yang dicurigai.\nReview diary tiap kunjungan untuk evaluasi respons terapi dan deteksi MOH.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'tth-edukasi-followup'
    },

    // ============================================================
    // NODE 7: EDUKASI, PROGNOSIS & FOLLOW-UP
    // ============================================================
    'tth-edukasi-followup': {
      id: 'tth-edukasi-followup',
      type: 'checklist',
      title: 'Node 7: Edukasi Pasien & Keluarga & Kriteria Rujuk',
      description: 'Edukasi adalah komponen terapi yang tidak terpisahkan. PERDOSSI 2023 secara eksplisit menekankan peran keluarga dalam manajemen TTH.',
      items: [
        {
          id: 'edu-reassurance',
          title: '1. Reassurance — TTH adalah Kondisi Jinak',
          description: 'Jelaskan bahwa TIDAK ditemukan kelainan struktural di otak. Tidak ada tumor, tidak ada stroke. Prognosis: Ad vitam bonam, Ad fungsionam bonam, Ad sanationam bonam.\nHilangkan kecemasan berlebihan karena rasa takut "ada yang tidak beres di kepala".',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-keluarga',
          title: '2. Peran Keluarga (PERDOSSI 2023)',
          description: 'PERDOSSI 2023 menyebutkan secara eksplisit:\n• Keluarga ikut meyakinkan pasien bahwa tidak ada kelainan fisik\n• Keluarga membantu menilai adanya kecemasan/depresi\n• Menciptakan lingkungan rumah yang supportif dan rendah stres',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-pencetus',
          title: '3. Identifikasi & Hindari Pencetus Spesifik',
          description: 'Diskusikan pencetus yang spesifik pada pasien ini:\n• Stres psikologis (kerja, keluarga, keuangan)\n• Kurang atau kelebihan tidur\n• Melewatkan makan / dehidrasi\n• Postur buruk saat bekerja\n• Cahaya terik atau kebisingan\n• Perubahan cuaca',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-red-flag-kembali',
          title: '4. Kembali Segera Jika Ada Ini',
          description: 'Instruksikan pasien/keluarga untuk segera ke fasilitas kesehatan jika:\n• Nyeri kepala TERBERAT seumur hidup yang datang mendadak\n• Demam + kaku leher\n• Kelemahan anggota gerak atau bicara pelo\n• Frekuensi bertambah > 4x/bulan\n• Karakter nyeri berubah\n• Tidak merespons analgetik biasa',
          required: true,
          category: 'safety'
        },
        {
          id: 'edu-kriteria-rujuk',
          title: '5. Kriteria Rujuk ke Spesialis Saraf',
          description: 'PERDOSSI 2023:\na) Nyeri kepala tidak membaik dengan tatalaksana di FKTP → rujuk Spesialis Saraf\nb) Depresi berat dengan kemungkinan bunuh diri → rujuk Spesialis Jiwa (rawat bersama neurolog)\n\nIndikasi lain: TTH kronik refrakter profilaksis 6 bulan, curiga patologi intrakranial.',
          required: true,
          category: 'documentation'
        }
      ]
    }

  },
  references: [
    'PERDOSSI. Panduan Praktik Klinis Neurologi (PPK Neurologi). Perhimpunan Dokter Spesialis Neurologi Indonesia. 2023.',
    'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1–211.',
    'Pokdi Nyeri Kepala PERDOSSI. Konsensus Nasional V Penatalaksanaan Nyeri Kepala. 2016.',
    'Mitsikostas DD, et al. European Headache Federation (EHF) consensus on technical investigation for primary headache disorders. J Headache Pain. 2016.',
    'Bendtsen L, et al. EFNS guideline on the treatment of tension-type headache. Eur J Neurol. 2010;17(11):1318–1325.',
    'SIGN. Diagnosis and Management of Headache in Adults. Scottish Intercollegiate Guidelines Network. Guideline 107. Updated 2023.',
    'KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP. Kemenkes RI. Bab: Nyeri Kepala.',
    'Holroyd KA, et al. Effect of preventive therapy on headache: a meta-analysis of randomized controlled trials. JAMA. 2001;285:2847–2854.',
    'Jackson JL, et al. Tricyclics in tension-type headache: a meta-analysis. Cephalalgia. 2010;30:481–490.'
  ]
};
