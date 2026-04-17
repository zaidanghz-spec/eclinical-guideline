// ============================================================
// HIPERTENSI DEWASA
// Referensi:
// - PNPK Tata Laksana Hipertensi Dewasa — KMK RI No. HK.01.07/MENKES/4634/2021
// - Konsensus Penatalaksanaan Hipertensi PERHI 2021
// - ISH Global Hypertension Guidelines 2020
// - ESC/ESH Guidelines 2018
// Setting: Klinik / FKTP
// Alat: TTV (Tensi, Termometer, Oksimetri), EKG, Suction, Nebulizer
// Flow: Ukur TD → Triage Krisis → Anamnesis → Pemfis & Lab →
//       Klasifikasi → Gaya Hidup → Farmakoterapi → Monitoring
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const hipertensiPathway: DynamicPathway = {
  diseaseId: 'hipertensi-dewasa',
  diseaseName: 'Hipertensi Dewasa (PNPK 2021 & Konsensus PERHI 2021)',
  startNodeId: 'ht-pengukuran-td',
  nodes: {

    // ============================================================
    // NODE 1: PENGUKURAN TD & SKRINING RED FLAGS
    // ============================================================
    'ht-pengukuran-td': {
      id: 'ht-pengukuran-td',
      type: 'checklist',
      title: 'Node 1: Ukur Tekanan Darah dengan Benar & Skrining Krisis',
      description: 'Pengukuran TD yang salah adalah penyebab utama diagnosis dan terapi yang keliru. Lakukan standar PNPK 2021. Sambil mengukur, skrining tanda kegawatan.',
      items: [
        {
          id: 'ht-persiapan',
          title: 'Persiapan Pasien Sebelum Ukur TD',
          description: 'Pasien duduk tenang 5 menit di kursi. Tidak merokok/kafein/olahraga dalam 30 menit terakhir. Lengan setinggi jantung, ruangan tenang. Tidak berbicara saat pengukuran.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ukur-2-lengan',
          title: 'Ukur TD di Kedua Lengan (Kunjungan Pertama)',
          description: 'Jika perbedaan sistolik > 15 mmHg antara kedua lengan → curiga penyakit vaskular aterosklerotik. Gunakan lengan dengan TD tertinggi sebagai acuan untuk kunjungan selanjutnya.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ukur-3x',
          title: 'Ukur TD 3x, Jeda 1-2 Menit Each',
          description: 'Ambil rata-rata 2 pengukuran terakhir sebagai TD pasien. Pengukuran pertama sering lebih tinggi karena kecemasan pasien — jangan jadikan acuan tunggal.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-nadi',
          title: 'Hitung Nadi Istirahat & Nilai Irama (Palpasi / EKG)',
          description: 'Raba nadi 60 detik penuh. Iregular? → curiga Fibrilasi Atrial → rekam EKG. Nadi > 80 x/menit saat istirahat = faktor risiko kardiovaskular tambahan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ortostatik',
          title: 'Cek Hipotensi Ortostatik (Kunjungan Pertama / Lansia / DM)',
          description: 'Ukur TD saat baring, kemudian 1 dan 3 menit berdiri. Positif jika: sistolik turun ≥ 20 mmHg ATAU diastolik turun ≥ 10 mmHg. Risiko jatuh dan iskemia organ pada lansia.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-red-flags',
          title: '⚠️ Skrining RED FLAGS — Tanda Krisis Hipertensi',
          description: 'Tanyakan SEKARANG: \n• Sakit kepala mendadak sangat berat?\n• Penglihatan kabur/buta tiba-tiba?\n• Nyeri dada atau punggung tembus?\n• Sesak napas mendadak?\n• Kelemahan/rasa baal separuh badan?\n• Bicara pelo atau kesulitan bicara?\nJika ada → KEMUNGKINAN HIPERTENSI EMERGENSI!',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ht-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE — KRISIS, URGENSI, ATAU RAWAT JALAN
    // ============================================================
    'ht-triage-decision': {
      id: 'ht-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Krisis Hipertensi atau Rawat Jalan?',
      description: 'Nilai: TD ≥ 180/110 mmHg + gejala organ = EMERGENSI. TD ≥ 180/110 tanpa gejala = URGENSI. TD < 180/110 = lanjut evaluasi rawat jalan.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ht-emergensi',
          title: '🔴 HIPERTENSI EMERGENSI (TD ≥ 180/110 + Tanda Kerusakan Organ)',
          description: 'Ada salah satu: nyeri dada iskemik, sesak edema paru akut, defisit neurologis/stroke, gangguan penglihatan akut, nyeri punggung tembus (diseksi aorta), atau eklampsia.',
          color: 'red',
          nextNodeId: 'ht-emergensi-management',
          riskLevel: 'high'
        },
        {
          id: 'ht-urgensi',
          title: '🟠 HIPERTENSI URGENSI (TD ≥ 180/110, Tanpa Kerusakan Organ)',
          description: 'TD sangat tinggi TAPI tidak ada tanda kerusakan organ akut. Sakit kepala ringan/kaku tengkuk saja tidak cukup untuk disebut emergensi.',
          color: 'orange',
          nextNodeId: 'ht-urgensi-management',
          riskLevel: 'medium'
        },
        {
          id: 'ht-rawat-jalan',
          title: '🟢 HIPERTENSI STABIL (TD < 180/110, Rawat Jalan)',
          description: 'Tidak ada tanda kerusakan organ akut. Lanjut ke evaluasi komprehensif.',
          color: 'green',
          nextNodeId: 'ht-anamnesis',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: EMERGENSI — STABILISASI & RUJUK
    // ============================================================
    'ht-emergensi-management': {
      id: 'ht-emergensi-management',
      type: 'checklist',
      title: 'Node 3A: Hipertensi Emergensi — Stabilisasi Cepat & Rujuk IGD',
      description: 'PNPK 2021: Hipertensi emergensi HARUS ditangani di ICU dengan obat IV titrasi. Di klinik primer: stabilisasi segera, JANGAN turunkan TD terlalu cepat, lalu RUJUK IGD RS.',
      items: [
        {
          id: 'em-monitor',
          title: '1. Pasang Monitor: Oksimetri, EKG, TD Setiap 15 Menit',
          description: 'Nilai SpO2 (pasang O2 jika < 94%), rekam EKG (deteksi SKA, aritmia), ukur TD serial tiap 15 menit. Siapkan IV line untuk akses obat darurat.',
          required: true,
          category: 'action'
        },
        {
          id: 'em-identifikasi-organ',
          title: '2. Identifikasi Organ Target yang Terkena',
          description: 'Tentukan mana yang terjadi:\n• Otak: Stroke/Ensefalopati → CT Scan di RS\n• Jantung: SKA / Edema Paru Akut → EKG + Rujuk\n• Aorta: Nyeri punggung tembus → segera rujuk\n• Mata: Papil edema / perdarahan retina → rujuk\n• Obstetri: Kehamilan + TD > 160/110 → Eklampsia',
          required: true,
          category: 'assessment'
        },
        {
          id: 'em-target-penurunan-td',
          title: '3. ⚠️ JANGAN Turunkan TD Terlalu Cepat!',
          description: 'Target 1 jam pertama: turunkan MAKSIMAL 20-25% dari MAP awal saja.\nPengecualian:\n• Diseksi Aorta: Sistolik < 120 dalam 20 menit\n• Eklampsia: Sistolik < 160 / Diastolik < 105\n• SKA: Sistolik < 140\nPenurunan mendadak dapat memicu iskemia otak dan jantung!',
          required: true,
          category: 'safety'
        },
        {
          id: 'em-obat-klinik',
          title: '4. Obat Oral Sementara (Sambil Siapkan Rujukan)',
          description: 'Jika belum bisa dirujuk segera dan hemodinamik stabil:\n• Captopril 25 mg oral (efek onset 15-30 menit)\n• ATAU Nifedipin SR/XL 10-20 mg oral\nHINDARI: Nifedipin sublingual (penurunan mendadak = berbahaya, PNPK 2021 melarang).',
          required: true,
          category: 'medication'
        },
        {
          id: 'em-kondisi-khusus',
          title: '5. Penanganan Kondisi Spesifik (Sebelum Rujuk)',
          description: 'Edema Paru Akut: posisikan duduk, O2 masker, furosemide 40 mg IV jika tersedia.\nSKA: 300 mg aspirin kunyah, nitrogliserin sublingual.\nKejang/Eklampsia: MgSO4 4 g IV dalam 20 menit + konsultasi SpOG.',
          required: false,
          category: 'action'
        },
        {
          id: 'em-rujuk',
          title: '6. RUJUK IGD RS — Sertakan Surat Lengkap',
          description: 'Surat rujukan wajib mencantumkan: TD serial saat di klinik, gejala/tanda organ yang terkena, obat yang sudah diberikan + waktu pemberian, hasil EKG, SpO2, GCS.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3B: URGENSI — ORAL & OBSERVASI
    // ============================================================
    'ht-urgensi-management': {
      id: 'ht-urgensi-management',
      type: 'checklist',
      title: 'Node 3B: Hipertensi Urgensi — Turunkan TD Bertahap Oral',
      description: 'TD sangat tinggi TANPA kerusakan organ. Tidak perlu rawat inap rutin. Turunkan secara bertahap dalam 24-48 jam dengan obat oral. Tidak boleh terburu-buru.',
      items: [
        {
          id: 'urg-cari-penyebab',
          title: '1. Cari Penyebab Lonjakan TD Mendadak',
          description: 'Tanyakan: Lupa minum obat rutin? Nyeri berat yang tidak terkontrol? Stress psikologis akut? Minum obat simpatomimetik (pseudoefedrin, dekongestan)? Berhenti klonidin tiba-tiba (rebound)? Atasi penyebab dasar jika ditemukan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'urg-obat-oral',
          title: '2. Berikan Antihipertensi Oral, Target Turun Bertahap 24-48 Jam',
          description: 'Pilihan:\n• Captopril 25 mg oral (onset cepat, aman)\n• Amlodipin 5-10 mg oral\n• Nifedipin SR 10-20 mg oral\nTarget: turunkan TD secara bertahap dalam 24-48 jam — BUKAN dalam hitungan menit. Jangan gunakan nifedipin sublingual.',
          required: true,
          category: 'medication'
        },
        {
          id: 'urg-observasi',
          title: '3. Observasi 1-2 Jam di Klinik',
          description: 'Ukur ulang TD setiap 30 menit. Jika TD mulai turun dan pasien asimtomatis → boleh rawat jalan. Jika dalam 1-2 jam muncul gejala organ baru → pindah ke jalur emergensi.',
          required: true,
          category: 'action'
        },
        {
          id: 'urg-kontrol-24-48',
          title: '4. Jadwalkan Kontrol 24-48 Jam & Edukasi Red Flags',
          description: 'Minta pasien kontrol besok atau lusa untuk evaluasi TD ulang. Edukasi: segera ke IGD jika muncul sakit kepala mendadak berat, pandangan kabur, nyeri dada, lemas separuh badan, atau sesak mendadak.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'ht-anamnesis'
    },

    // ============================================================
    // NODE 4: ANAMNESIS KOMPREHENSIF
    // ============================================================
    'ht-anamnesis': {
      id: 'ht-anamnesis',
      type: 'checklist',
      title: 'Node 4: Anamnesis Komprehensif — Riwayat, Faktor Risiko & Gejala HMOD',
      description: 'Gali informasi lengkap untuk menentukan profil risiko, ada tidaknya kerusakan organ (HMOD), dan kemungkinan hipertensi sekunder.',
      items: [
        {
          id: 'an-riwayat-ht',
          title: '1. Riwayat Hipertensi & Terapi Sebelumnya',
          description: 'Sudah berapa lama? Obat apa yang diminum? Ada efek samping? Seberapa patuh? Ada riwayat keluarga hipertensi atau penyakit jantung dini (< 55 tahun)?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'an-faktor-risiko',
          title: '2. Faktor Risiko Kardiovaskular',
          description: 'Tanyakan:\n• Merokok (berapa bungkus/hari, berapa tahun)?\n• Pola makan: sering makan asin, berlemak, atau fast food?\n• Aktivitas fisik: berapa kali seminggu?\n• Riwayat DM, kolesterol tinggi, asam urat?\n• Riwayat stroke atau serangan jantung pada diri sendiri?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'an-gejala-hmod',
          title: '3. Gejala Kerusakan Organ Target (HMOD)',
          description: 'Otak: pernah TIA/stroke, pusing berputar, penglihatan mendadak kabur, daya ingat menurun?\nJantung: sesak saat aktifitas, bengkak kaki, nyeri dada, palpitasi?\nGinjal: sering BAK malam, kencing berbuih, ada darah?\nPembuluh darah: kaki terasa dingin, nyeri betis saat berjalan jauh?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'an-hipertensi-sekunder',
          title: '4. Skrining Hipertensi Sekunder',
          description: 'Curiga hipertensi sekunder jika:\n• Usia < 40 tahun dengan HT derajat 2-3\n• TD tiba-tiba naik drastis pada riwayat normal\n• Tidak respons meski sudah 3 obat\n• Gejala: mendengkur keras (OSA), kelemahan otot + kram (aldosteronisme), berkeringat + palpitasi episodik (feokromositoma), riwayat penyakit ginjal',
          required: true,
          category: 'assessment'
        },
        {
          id: 'an-obat-pengganggu',
          title: '5. Obat-obatan yang Bisa Meningkatkan TD',
          description: 'Tanyakan konsumsi: Kortikosteroid, NSAID (ibuprofen, diklofenak), obat flu/dekongestan (pseudoefedrin), kontrasepsi oral, yohimbine. Obat-obat ini bisa menyebabkan atau memperburuk hipertensi.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ht-pemfis-penunjang'
    },

    // ============================================================
    // NODE 5: PEMERIKSAAN FISIK & PENUNJANG
    // ============================================================
    'ht-pemfis-penunjang': {
      id: 'ht-pemfis-penunjang',
      type: 'checklist',
      title: 'Node 5: Pemeriksaan Fisik & Penunjang — Nilai HMOD & Faktor Risiko',
      description: 'Pemeriksaan untuk menilai apakah organ target sudah terdampak (HMOD = Hypertension-Mediated Organ Damage).',
      items: [
        {
          id: 'pf-antropometri',
          title: '1. Anthropometri: BB, TB, IMT, Lingkar Pinggang',
          description: 'Hitung IMT: BB (kg) / TB (m)². Target IMT 18.5-22.9 kg/m².\nLingkar pinggang: Pria < 90 cm, Wanita < 80 cm.\nObesitas sentral = risiko metabolik independen.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'pf-jantung-paru',
          title: '2. Auskultasi Jantung & Paru',
          description: 'Jantung: murmur (ada penyakit katup?), gallop S3 (gagal jantung?), bunyi jantung ireguler?\nParu: ronki basah (edema paru?), wheezing?\nCek JVP (meningkat pada gagal jantung).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'pf-nadi-perifer',
          title: '3. Nadi Perifer & Tanda Pembuluh Darah',
          description: 'Raba nadi radialis, dorsalis pedis, tibialis posterior bilateral. Asimetri nadi ekstremitas = curiga penyakit arteri perifer. Auskultasi bruit pada karotis dan daerah epigastrium (bruit renal = stenosis arteri renalis).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'pf-ekg',
          title: '4. EKG 12-Lead — Deteksi LVH & Aritmia',
          description: 'Rekam EKG. Perhatikan:\n• LVH (Left Ventricular Hypertrophy): Sokolow-Lyon: SV1+RV5 > 35 mm; atau R di aVL ≥ 11 mm\n• Fibrilasi Atrial: interval R-R ireguler, tidak ada gelombang P\n• Tanda iskemia: ST depresi, T inversi',
          required: true,
          category: 'assessment'
        },
        {
          id: 'pf-lab-dasar',
          title: '5. Pemeriksaan Lab Dasar (Rujuk Jika Tidak Tersedia)',
          description: 'Wajib (jika tersedia): Kreatinin + eGFR, Elektrolit (K+/Na+), Gula Darah Puasa, Profil Lipid (total, LDL, HDL, Trigliserida), Urinalisa (protein/albumin).\nOpsional: Asam urat, TSH (curiga tiroid), hemoglobin.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'pf-urin-albumin',
          title: '6. Rasio Albumin-Kreatinin Urin (ACR)',
          description: 'Mikroalbuminuria (30-300 mg/g) = tanda kerusakan ginjal dini, faktor risiko kardiovaskular independen. Makroalbuminuria (> 300 mg/g) = nefropati manifes. Minta urinalisa atau rujuk untuk ACR.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'pf-hbpm',
          title: '7. Anjurkan HBPM (Pantau TD Mandiri di Rumah)',
          description: 'Minta pasien beli tensimeter digital tervalidasi. Cara: ukur 2x pagi (setelah BAK, sebelum sarapan dan minum obat) dan 2x malam, selama 7 hari. Nilai rata-rata ≥ 135/85 = hipertensi. Berguna untuk deteksi white coat hypertension.',
          required: false,
          category: 'documentation'
        }
      ],
      nextNodeId: 'ht-klasifikasi-decision'
    },

    // ============================================================
    // NODE 6: KLASIFIKASI TD & STRATIFIKASI RISIKO
    // ============================================================
    'ht-klasifikasi-decision': {
      id: 'ht-klasifikasi-decision',
      type: 'decision',
      title: 'Node 6: Klasifikasi TD — Tentukan Derajat Hipertensi',
      description: 'Klasifikasi berdasarkan PNPK 2021 / ESC/ESH 2018 / ISH 2020. Pilih kategori TD pasien saat ini.',
      warningLevel: 'info',
      branches: [
        {
          id: 'ht-normal-tinggi',
          title: '🔵 Normal Tinggi (Sistolik 130-139 / Diastolik 85-89)',
          description: 'Intervensi gaya hidup intensif. Obat hanya jika risiko CV sangat tinggi atau ada penyakit jantung koroner. Kontrol ulang 1 tahun.',
          color: 'blue',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'low'
        },
        {
          id: 'ht-derajat-1',
          title: '🟠 Derajat 1 (Sistolik 140-159 / Diastolik 90-99)',
          description: 'Gaya hidup 4-6 minggu. Mulai obat bersamaan jika ada HMOD, DM, PGK, atau risiko tinggi. Jika tidak ada faktor risiko khusus: tunggu respons gaya hidup.',
          color: 'orange',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'medium'
        },
        {
          id: 'ht-derajat-2',
          title: '🔴 Derajat 2 (Sistolik 160-179 / Diastolik 100-109)',
          description: 'Mulai obat SEGERA bersamaan dengan gaya hidup.',
          color: 'red',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'high'
        },
        {
          id: 'ht-derajat-3',
          title: '🔴 Derajat 3 (Sistolik ≥ 180 / Diastolik ≥ 110)',
          description: 'Mulai obat SEGERA + nilai apakah ada gejala organ → jika ada, kembali ke jalur Emergensi.',
          color: 'purple',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 7: MODIFIKASI GAYA HIDUP (SEMUA PASIEN)
    // ============================================================
    'ht-gaya-hidup': {
      id: 'ht-gaya-hidup',
      type: 'checklist',
      title: 'Node 7: Modifikasi Gaya Hidup — Fondasi Wajib Semua Pasien',
      description: 'Gaya hidup adalah lini pertama terapi hipertensi dan harus dilanjutkan bahkan setelah mulai obat. Dapat menurunkan sistolik 5-15 mmHg jika diterapkan konsisten.',
      items: [
        {
          id: 'gl-garam',
          title: '1. Restriksi Garam: < 5 g/hari (1 Sendok Teh)',
          description: 'Batasi natrium < 2 g/hari = 5 g NaCl = 1 sendok teh garam = 3 sdm kecap/MSG. Kurangi makanan olahan, asin, ikan asin, kerupuk, mie instan. Dapat menurunkan sistolik 5-11 mmHg.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-diet-dash',
          title: '2. Pola Makan Sehat (Diet DASH)',
          description: 'Perbanyak: sayuran segar, buah, kacang-kacangan, ikan, susu rendah lemak. Kurangi: daging merah, lemak jenuh, makanan manis, alkohol. Diet DASH dapat menurunkan sistolik 8-11 mmHg.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-olahraga',
          title: '3. Olahraga Aerobik 30-60 Menit, 5-7 Kali/Minggu',
          description: 'Intensitas sedang (bisa berbicara tapi agak terengah). Jenis: jalan cepat, jogging, bersepeda, berenang, senam aerobik. Awali dengan pemanasan 5-10 menit. Dapat menurunkan sistolik 5-8 mmHg.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-berat-badan',
          title: '4. Target Berat Badan Ideal (IMT 18.5-22.9)',
          description: 'Setiap penurunan 5 kg berat badan dapat menurunkan sistolik ± 5 mmHg. Target lingkar pinggang: pria < 90 cm, wanita < 80 cm. Penurunan bertahap 0.5-1 kg/minggu lebih sustainable.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-rokok',
          title: '5. Berhenti Merokok (Tanyakan Setiap Kunjungan)',
          description: 'Merokok memperberat risiko kardiovaskular secara independen. Tanyakan status merokok setiap kunjungan. Berikan konseling, rujuk ke klinik berhenti merokok jika ada. Nikotin patch/gum dapat membantu.',
          required: true,
          category: 'action'
        },
        {
          id: 'gl-hbpm-edukasi',
          title: '6. Edukasi Ukur TD Mandiri di Rumah (HBPM)',
          description: 'Anjurkan memiliki tensimeter digital tervalidasi. Ukur pagi dan malam, catat hasilnya, bawa ke kontrol berikutnya. HBPM meningkatkan kepatuhan dan memudahkan evaluasi efektivitas terapi.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'ht-farmakoterapi-decision'
    },

    // ============================================================
    // NODE 8: KAPAN MULAI OBAT?
    // ============================================================
    'ht-farmakoterapi-decision': {
      id: 'ht-farmakoterapi-decision',
      type: 'decision',
      title: 'Node 8: Tentukan Jalur Farmakoterapi',
      description: 'Pilih jalur berdasarkan kondisi klinis pasien.',
      warningLevel: 'info',
      branches: [
        {
          id: 'ht-umum',
          title: '🔵 Hipertensi Umum (Tanpa Komorbid Khusus)',
          description: 'HT derajat 2-3: mulai obat segera. HT derajat 1: tunggu gaya hidup 4-6 minggu jika risiko rendah, atau mulai langsung jika ada HMOD/risiko tinggi.',
          color: 'blue',
          nextNodeId: 'ht-terapi-umum',
          riskLevel: 'medium'
        },
        {
          id: 'ht-dm-ckd',
          title: '🔴 Dengan Diabetes Melitus dan/atau Penyakit Ginjal Kronik',
          description: 'Target TD lebih ketat: < 130/80 mmHg. Wajib RAS blocker (ACEi atau ARB) sebagai pilihan utama.',
          color: 'red',
          nextNodeId: 'ht-terapi-dm-ckd',
          riskLevel: 'high'
        },
        {
          id: 'ht-geriatri',
          title: '🟠 Pasien Geriatri (≥ 60 Tahun)',
          description: 'Target lebih longgar dan pendekatan "go low, go slow". Nilai frailty sebelum terapi agresif.',
          color: 'orange',
          nextNodeId: 'ht-terapi-geriatri',
          riskLevel: 'medium'
        },
        {
          id: 'ht-khusus',
          title: '🟣 Kondisi Klinis Khusus',
          description: 'Gagal jantung, kehamilan, fibrilasi atrial, hipertensi resisten.',
          color: 'purple',
          nextNodeId: 'ht-terapi-khusus',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 9A: TERAPI UMUM
    // ============================================================
    'ht-terapi-umum': {
      id: 'ht-terapi-umum',
      type: 'checklist',
      title: 'Node 9A: Farmakoterapi Hipertensi Umum (PNPK 2021)',
      description: 'Strategi utama: mulai dengan KOMBINASI 2 obat pada sebagian besar pasien. Single pill combination (SPC) meningkatkan kepatuhan.',
      items: [
        {
          id: 'tu-kombinasi-2-obat',
          title: '1. Inisiasi Kombinasi 2 Obat (Rekomendasi Utama)',
          description: 'Kombinasi dianjurkan:\n• RAS Blocker (ACEi ATAU ARB) + CCB\n• RAS Blocker + Diuretik Tiazid\nContoh praktis: Amlodipin 5 mg + Candesartan 8 mg. Mulai dosis rendah, titrasi naik setiap 4 minggu.',
          required: true,
          category: 'medication'
        },
        {
          id: 'tu-larangan-dual-ras',
          title: '⚠️ 2. DILARANG: Kombinasi ACEi + ARB Bersamaan',
          description: 'JANGAN berikan ACEi (Captopril/Ramipril/Enalapril) + ARB (Candesartan/Losartan/Valsartan) secara bersamaan. Terbukti meningkatkan risiko gagal ginjal akut dan hiperkalemia tanpa manfaat tambahan. Pilih SALAH SATU.',
          required: true,
          category: 'safety'
        },
        {
          id: 'tu-beta-bloker-indikasi',
          title: '3. Beta Bloker: Hanya Jika Ada Indikasi Spesifik',
          description: 'Beta Bloker (Bisoprolol, Metoprolol, Atenolol) dianjurkan jika ada: Angina/PJK, Pasca IMA, Gagal Jantung (HFrEF), Kontrol denyut Fibrilasi Atrial, atau Kehamilan. Jangan sebagai pilihan utama tanpa indikasi.',
          required: false,
          category: 'medication'
        },
        {
          id: 'tu-target-td',
          title: '4. Target TD yang Harus Dicapai',
          description: 'Usia < 60 tahun: sistolik 120-129 mmHg (jika ditoleransi).\nUsia ≥ 60 tahun: sistolik 130-139 mmHg.\nSemua pasien: diastolik < 80 mmHg.\nTarget minimal untuk semua: < 140/90 mmHg.\nEvaluasi setiap 1-3 bulan hingga target tercapai.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tu-eskalasi-3-obat',
          title: '5. Eskalasi ke 3 Obat Jika TD Belum Terkontrol',
          description: 'Jika 2 obat belum mencapai target dalam 4-6 minggu: tambahkan obat ke-3 = RAS Blocker + CCB + Diuretik Tiazid. Jika masih tidak terkontrol → evaluasi kepatuhan → pertimbangkan hipertensi resisten.',
          required: true,
          category: 'medication'
        },
        {
          id: 'tu-efek-samping',
          title: '6. Pantau Efek Samping Obat (Tiap Kunjungan)',
          description: 'ACEi: batuk kering (ganti ARB), hiperkalemia, pantau kreatinin.\nARB: hiperkalemia.\nCCB: edema tungkai, sakit kepala, palpitasi.\nDiuretik Tiazid: hipokalemia, hiperurisemia, hiperglikemia.\nBeta Bloker: bradikardia, bronkospasme.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ht-monitoring'
    },

    // ============================================================
    // NODE 9B: TERAPI DM + CKD
    // ============================================================
    'ht-terapi-dm-ckd': {
      id: 'ht-terapi-dm-ckd',
      type: 'checklist',
      title: 'Node 9B: Hipertensi + DM / PGK — Target Lebih Ketat',
      description: 'Kombinasi HT dengan DM atau PGK = risiko kardiovaskular sangat tinggi. Pemilihan obat harus berbasis bukti renoprotektif.',
      items: [
        {
          id: 'dm-target',
          title: '1. Target TD: < 130/80 mmHg',
          description: 'Pada DM + albuminuria: target lebih ketat (sistolik 120-130 mmHg jika ditoleransi). Evaluasi ketat — jangan sampai terlalu rendah (risiko hipoperfusi ginjal).',
          required: true,
          category: 'action'
        },
        {
          id: 'dm-ras-wajib',
          title: '2. RAS Blocker (ACEi atau ARB) adalah WAJIB',
          description: 'ACEi/ARB memberikan efek renoprotektif dan kardioprotektif. Pilih ACEi ATAU ARB — jangan dikombinasikan. Monitor kreatinin 2-4 minggu setelah inisiasi. Kenaikan kreatinin < 30% dari baseline masih dapat diterima.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dm-diuretik-egfr',
          title: '3. Pilih Diuretik Sesuai eGFR',
          description: 'eGFR ≥ 30 mL/mnt: gunakan Tiazid/Indapamide.\neGFR < 30 mL/mnt: ganti ke Loop Diuretik (Furosemid) — tiazid tidak efektif pada eGFR rendah.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dm-monitor-kalium-kreatinin',
          title: '4. Monitor Kalium & Kreatinin Berkala',
          description: 'Cek K+ dan kreatinin 2-4 minggu setelah inisiasi RAS Blocker, kemudian tiap 3-6 bulan. Hiperkalemia > 5.5 mEq/L → pertimbangkan kurangi dosis atau ganti obat. JANGAN tambah Spironolakton tanpa monitoring ketat.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-kontrol-gula',
          title: '5. Pastikan Kontrol Gula Darah Juga Optimal',
          description: 'Kontrol glikemik dan kontrol TD bersama memberikan outcome terbaik. Hindari Beta Bloker pada DM tidak stabil yang sering hipoglikemia (dapat menutupi gejala hipoglikemia).',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ht-monitoring'
    },

    // ============================================================
    // NODE 9C: TERAPI GERIATRI
    // ============================================================
    'ht-terapi-geriatri': {
      id: 'ht-terapi-geriatri',
      type: 'checklist',
      title: 'Node 9C: Hipertensi Geriatri (≥ 60 Tahun) — "Go Low, Go Slow"',
      description: 'Pendekatan individual untuk lansia. Nilai frailty sebelum terapi agresif. Efek samping lebih sering dan lebih berbahaya pada lansia.',
      items: [
        {
          id: 'ger-frailty',
          title: '1. Nilai Status Frailty (Clinical Frailty Scale 1-9)',
          description: 'Skor 1-3 (Fit/Robust): terapi standar boleh.\nSkor 4-5 (Pre-frail): hati-hati, pantau ketat.\nSkor 6-9 (Frail): monoterapi dosis kecil, target TD lebih longgar.\nPasien demensia berat/multimorbid: konsultasikan ke tim geriatri.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ger-target',
          title: '2. Target TD Sesuai Kondisi Lansia',
          description: 'Usia 60-79 tahun (fit): sistolik 130-139 mmHg.\nUsia ≥ 80 tahun: sistolik 130-150 mmHg.\nFrail: jangan turunkan sampai < 130 mmHg (risiko iskemia organ).\nDiastolik: jangan terlalu rendah (risiko hipoperfusi koroner).',
          required: true,
          category: 'action'
        },
        {
          id: 'ger-pilih-obat',
          title: '3. Pilihan Obat: CCB atau Tiazid sebagai Awal',
          description: 'Amlodipin atau Nifedipin SR (CCB) adalah pilihan aman untuk lansia.\nIndapamide (Tiazid-like) efektif dengan efek metabolik minimal.\nHindari: Alfa-bloker (risiko hipotensi jatuh). Hati-hati Loop Diuretik (hiponatremia, hipokalemia, inkontinensia).',
          required: true,
          category: 'medication'
        },
        {
          id: 'ger-dosis-pelan',
          title: '4. Mulai Dosis Rendah, Naikkan Bertahap Setiap 4 Minggu',
          description: 'Mulai setengah dosis standar. Naikkan dosis setiap 4 minggu atau lebih. Pantau TD baring dan berdiri tiap kunjungan (hipotensi ortostatik). Monitor fungsi ginjal, elektrolit, dan status kognitif.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ger-jatuh',
          title: '5. Cegah Risiko Jatuh',
          description: 'Evaluasi risiko jatuh tiap kunjungan. Pertimbangkan latihan keseimbangan (fisioterapi). Hindari polifarmasi. Edukasi keluarga/caregiver untuk mendampingi pasien.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ht-monitoring'
    },

    // ============================================================
    // NODE 9D: KONDISI KHUSUS
    // ============================================================
    'ht-terapi-khusus': {
      id: 'ht-terapi-khusus',
      type: 'checklist',
      title: 'Node 9D: Kondisi Klinis Khusus — Pilihan Obat Berbeda',
      description: 'Beberapa kondisi memerlukan pendekatan berbeda dari hipertensi umum.',
      items: [
        {
          id: 'kh-gagal-jantung',
          title: '1. HT + Gagal Jantung (HFrEF)',
          description: 'Pilih: ACEi/ARB (atau ARNI) + Beta Bloker + MRA (Spironolakton) + Diuretik Loop jika retensi cairan. HINDARI: CCB non-dihidropiridin (Verapamil/Diltiazem) karena memperburuk fungsi sistolik. Target sistolik 120-130 mmHg.',
          required: true,
          category: 'medication'
        },
        {
          id: 'kh-kehamilan',
          title: '2. HT dalam Kehamilan / Pre-eklampsia',
          description: 'Obat aman: Metildopa, Nifedipin (CCB), Labetalol.\nKONTRAINDIKASI dalam kehamilan: ACEi dan ARB (fetotoksik — JANGAN digunakan).\nTD ≥ 170/110 pada kehamilan = darurat obstetrik → rawat inap + MgSO4 untuk pencegahan eklampsia → rujuk SpOG.',
          required: true,
          category: 'safety'
        },
        {
          id: 'kh-fibrilasi-atrial',
          title: '3. HT + Fibrilasi Atrial',
          description: 'Kontrol denyut: Beta Bloker ATAU CCB non-dihidropiridin (Diltiazem/Verapamil).\nAntihipertensi pilihan: ACEi/ARB.\nWajib hitung skor CHA₂DS₂-VASc untuk pertimbangan antikoagulan (NOAC atau Warfarin).',
          required: false,
          category: 'medication'
        },
        {
          id: 'kh-hipertensi-resisten',
          title: '4. Hipertensi Resisten (TD ≥ 140/90 Meski 3 Obat Maksimal)',
          description: 'Definisi: TD tidak mencapai target meski 3 obat berbeda golongan (RAS + CCB + Diuretik) dosis maksimal.\nLangkah:\n1. Konfirmasi kepatuhan minum obat\n2. Singkirkan white coat hypertension dan penyebab sekunder\n3. Tambahkan Spironolakton 25-50 mg (jika eGFR > 45, K+ < 4.5)\n→ Rujuk spesialis hipertensi/kardiologi.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ht-monitoring'
    },

    // ============================================================
    // NODE 10: MONITORING & FOLLOW-UP
    // ============================================================
    'ht-monitoring': {
      id: 'ht-monitoring',
      type: 'checklist',
      title: 'Node 10: Monitoring & Follow-Up Jangka Panjang',
      description: 'Pemantauan berkala adalah kunci keberhasilan pengendalian hipertensi. Hipertensi adalah kondisi seumur hidup — kepatuhan dan edukasi sama pentingnya dengan obat.',
      items: [
        {
          id: 'mon-jadwal',
          title: '1. Jadwal Kontrol: Tiap 1-2 Bulan Saat Titrasi, Tiap 3-6 Bulan Jika Stabil',
          description: 'Saat titrasi/penyesuaian obat: kontrol tiap 1-2 bulan. Jika TD sudah stabil di target: tiap 3-6 bulan. Evaluasi HMOD lengkap (EKG + lab) tiap 12 bulan.',
          required: true,
          category: 'action'
        },
        {
          id: 'mon-target-td',
          title: '2. Nilai Pencapaian Target TD Setiap Kunjungan',
          description: 'Apakah TD sudah di target? Jika belum: cek kepatuhan terlebih dahulu sebelum menaikkan dosis. Tanyakan hasil HBPM di rumah. Bandingkan TD klinik vs HBPM untuk deteksi white coat effect.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'mon-kepatuhan',
          title: '3. Evaluasi Kepatuhan & Hambatan Terapi',
          description: 'Identifikasi hambatan: biaya obat mahal? Efek samping mengganggu? Lupa minum? Percaya tidak perlu obat kalau tidak pusing?\nIntervensi: sederhanakan regimen (SPC jika memungkinkan), libatkan keluarga, berikan edukasi ulang.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'mon-lab',
          title: '4. Lab Berkala: Elektrolit, Kreatinin, Gula Darah, Profil Lipid',
          description: 'K+ dan kreatinin: tiap 3-6 bulan (pasien ACEi/ARB/diuretik).\nProfil lipid: tiap tahun.\nGula darah: tiap 6-12 bulan (terutama pasien diuretik tiazid).\nEKG: tiap tahun minimum.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'mon-indikasi-rujuk',
          title: '5. Indikasi Rujuk ke Fasilitas Tingkat Lanjut',
          description: 'Rujuk jika:\n• Curiga hipertensi sekunder (usia muda, refrakter)\n• Hipertensi resisten (3 obat sudah maksimal)\n• Perlu ekokardiografi, USG karotis, atau DXA\n• TD sangat tidak terkontrol meski sudah diterapi optimal\n• Ada HMOD berat yang butuh spesialis',
          required: true,
          category: 'action'
        }
      ]
    }

  },
  references: [
    'KMK RI No. HK.01.07/MENKES/4634/2021 — PNPK Tata Laksana Hipertensi Dewasa.',
    'Konsensus Penatalaksanaan Hipertensi 2021 — Perhimpunan Dokter Hipertensi Indonesia (PERHI).',
    'Unger T, et al. 2020 International Society of Hypertension (ISH) Global Hypertension Practice Guidelines. Hypertension. 2020;75(6):1334–1357.',
    'Williams B, et al. 2018 ESC/ESH Guidelines for the Management of Arterial Hypertension. Eur Heart J. 2018;39:3021–3104.',
    'Whelton PK, et al. 2017 ACC/AHA/AAPA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults. Hypertension. 2018;71:e13–e115.'
  ]
};
