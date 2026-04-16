// ============================================================
// PEDOMAN NASIONAL PELAYANAN KEDOKTERAN (PNPK) - TATA LAKSANA HIPERTENSI DEWASA
// KEPUTUSAN MENTERI KESEHATAN NOMOR HK.01.07/MENKES/4634/2021
// KONSENSUS PENATALAKSANAAN HIPERTENSI PERHI 2021
// (Update dari Konsensus PERHI 2019, berbasis ISH 2020 & ESC/ESH 2018)
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const hipertensiPathway: DynamicPathway = {
  diseaseId: 'hipertensi-dewasa',
  diseaseName: 'Hipertensi Dewasa (PNPK 2021 & Konsensus PERHI 2021)',
  startNodeId: 'ht-triage-awal',
  nodes: {

    // ─────────────────────────────────────────────
    // NODE 1: TRIASE & PENGUKURAN TD AWAL
    // ─────────────────────────────────────────────
    'ht-triage-awal': {
      id: 'ht-triage-awal',
      type: 'checklist',
      title: 'Fase 1: Pengukuran Tekanan Darah & Triase Awal',
      description: 'Lakukan pengukuran TD secara benar sesuai standar PNPK 2021. Pasien duduk tenang 5 menit, lengan setinggi jantung, sfigmomanometer tervalidasi.',
      items: [
        {
          id: 'ht-persiapan-pasien',
          title: 'Persiapan Pasien Sebelum Pengukuran',
          description: 'Istirahat 5 menit, tidak konsumsi kafein/rokok/olahraga 30 menit sebelum. Tidak menahan BAK/BAB. Tidak pakaian ketat di lengan. Ruangan tenang. Pasien tidak berbicara saat pengukuran.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ukur-dua-lengan',
          title: 'Ukur TD pada Kedua Lengan (Kunjungan Pertama)',
          description: 'Perbedaan TDS >15 mmHg antara kedua lengan sugestif penyakit vaskular aterosklerotik → risiko kardiovaskular lebih tinggi. Gunakan lengan dengan TD tertinggi sebagai acuan untuk seterusnya.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-3x-ukur',
          title: 'Ukur TD 3x dengan Jarak 1-2 Menit',
          description: 'Pengukuran tambahan jika dua pertama berbeda >10 mmHg. TD pasien = rata-rata dua pengukuran terakhir. Catat hasil lengkap.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-cek-nadi',
          title: 'Hitung Nadi Istirahat & Nilai Irama',
          description: 'Palpasi nadi untuk deteksi aritmia (misal Fibrilasi Atrial). Nadi istirahat >80x/menit = faktor risiko kardiovaskular tambahan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ortostatik',
          title: 'Cek Hipotensi Ortostatik (1 & 3 Menit Berdiri)',
          description: 'Wajib pada kunjungan pertama, geriatri, DM, dan yang dicurigai hipotensi ortostatik. Positif bila TDS turun ≥20 mmHg atau TDD turun ≥10 mmHg setelah berdiri 3 menit.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-red-flags',
          title: 'Skrining Red Flags Krisis Hipertensi',
          description: 'Tanya: Sakit kepala hebat mendadak? Gangguan penglihatan/buta sesaat? Nyeri dada/punggung? Sesak napas mendadak? Lemas/kebas separuh tubuh (defisit neurologis)? Jika ya → kemungkinan Hipertensi Emergensi.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ht-kegawatdaruratan-decision'
    },

    // ─────────────────────────────────────────────
    // NODE 2: DECISION - KRISIS VS RAWAT JALAN
    // ─────────────────────────────────────────────
    'ht-kegawatdaruratan-decision': {
      id: 'ht-kegawatdaruratan-decision',
      type: 'decision',
      title: 'Apakah Ini Krisis Hipertensi?',
      description: 'Nilai: TD ≥180/110 mmHg + gejala kerusakan organ akut (HMOD Akut) = EMERGENSI. TD ≥180/110 tanpa gejala organ = URGENSI. TD <180/110 = Lanjut evaluasi rawat jalan.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ht-branch-emergensi',
          title: 'Hipertensi Emergensi (TD ≥180/110 + Tanda Kerusakan Organ)',
          description: 'Ada tanda HMOD akut: Ensefalopati, Edema Paru, SKA, Stroke/TIA, Diseksi Aorta, atau Eklampsia.',
          color: 'red',
          nextNodeId: 'ht-emergensi-tatalaksana',
          riskLevel: 'high'
        },
        {
          id: 'ht-branch-urgensi',
          title: 'Hipertensi Urgensi (TD ≥180/110 tanpa Kerusakan Organ)',
          description: 'Tidak ada tanda HMOD akut. Turunkan TD secara bertahap dengan obat oral dalam 24-48 jam.',
          color: 'orange',
          nextNodeId: 'ht-urgensi-tatalaksana',
          riskLevel: 'medium'
        },
        {
          id: 'ht-branch-rawat-jalan',
          title: 'Hipertensi Stabil (Rawat Jalan)',
          description: 'TD <180/110 atau tidak ada gejala kerusakan organ akut. Lanjut anamnesis komprehensif.',
          color: 'green',
          nextNodeId: 'ht-anamnesis-komplit',
          riskLevel: 'low'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // ALUR EMERGENSI
    // ─────────────────────────────────────────────
    'ht-emergensi-tatalaksana': {
      id: 'ht-emergensi-tatalaksana',
      type: 'checklist',
      title: 'Tatalaksana Hipertensi Emergensi (CITO)',
      description: 'Hipertensi Emergensi = HMOD Akut yang mengancam jiwa. Butuh obat IV dan titrasi ketat. Faskes primer → segera stabilisasi & rujuk IGD RS.',
      items: [
        {
          id: 'ht-iv-line-monitor',
          title: 'Pasang Jalur IV, Monitoring Ketat',
          description: 'Monitor TD tiap 15 menit. Pasang pulse oximetri dan EKG bila tersedia. Siapkan rujukan segera ke IGD/ICU.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-penurunan-td-aman',
          title: 'Target Penurunan TD dalam 1 Jam Pertama: Maksimal 20-25% MAP',
          description: 'JANGAN turunkan TD terlalu cepat/mendadak (kecuali: Diseksi Aorta → TDS <120 segera; Eklampsia → TDS <160/TDD <105; SKA → TDS <140). Penurunan mendadak dapat memicu iskemia otak/jantung.',
          required: true,
          category: 'safety'
        },
        {
          id: 'ht-obat-iv-pilihan',
          title: 'Pilihan Obat IV (Sesuai Target Organ)',
          description: 'Nikardipin IV (pilihan utama tersedia di Indonesia). Alternatif: Labetalol IV, Nitrogliserin IV (Edema paru/SKA), Esmolol+Nitroprusid (Diseksi Aorta), Nifedipin oral (Eklampsia bila IV tidak tersedia). HINDARI nifedipin sublingual (turun mendadak → berbahaya).',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-kondisi-spesifik-emergensi',
          title: 'Perhatikan Kondisi Klinis Spesifik',
          description: 'SKA: Nitrogliserin + Labetalol. Edema Paru Akut: Nitroprusid/Nitrogliserin + Furosemid IV. Ensefalopati: Labetalol/Nikardipin. Stroke Iskemik: Turunkan TD hati-hati bila TDS >220/TDD >120 (jangan diturunkan <185/110 bila rencana trombolisis). Perdarahan Intraserebral: Turun bertahap ke <140/90.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-segera-rujuk',
          title: 'Rujuk ke FKTL / IGD Segera',
          description: 'Setelah stabilisasi awal, buat surat rujukan lengkap dengan TD saat ini, terapi yang sudah diberikan, dan tanda vital.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // ALUR URGENSI
    // ─────────────────────────────────────────────
    'ht-urgensi-tatalaksana': {
      id: 'ht-urgensi-tatalaksana',
      type: 'checklist',
      title: 'Tatalaksana Hipertensi Urgensi',
      description: 'TD ≥180/110 mmHg TANPA bukti keterlibatan organ target akut. Tidak perlu rawat inap rutin, bisa diberikan obat oral.',
      items: [
        {
          id: 'ht-urgensi-oral',
          title: 'Berikan Obat Antihipertensi Oral, Turunkan Bertahap 24-48 Jam',
          description: 'Pilihan: Captopril 25mg oral, atau Amlodipin, atau Nifedipin SR (BUKAN sublingual). Target: Turunkan TD secara gradual dalam 24-48 jam, tidak perlu terlalu cepat.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-urgensi-evaluasi',
          title: 'Evaluasi dan Follow-Up Ketat',
          description: 'Pasien dipantau 1-2 jam di fasilitas kesehatan. Jika TD turun dan stabil, boleh rawat jalan dengan kontrol ulang dalam 24-48 jam. Edukasi tanda bahaya yang harus dibawa ke IGD.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-urgensi-cari-penyebab',
          title: 'Cari Penyebab Lonjakan TD Mendadak',
          description: 'Tanyakan: adakah konsumsi obat simpatomimetik (dekongestan, pseudoefedrin)? Nyeri hebat? Stress? Berhenti obat tiba-tiba (rebound klonidin)? Atasi penyebab dasar.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ht-anamnesis-komplit'
    },

    // ─────────────────────────────────────────────
    // NODE 3: ANAMNESIS KOMPREHENSIF
    // ─────────────────────────────────────────────
    'ht-anamnesis-komplit': {
      id: 'ht-anamnesis-komplit',
      type: 'checklist',
      title: 'Fase 2: Anamnesis Komprehensif & Skrining Hipertensi Sekunder',
      description: 'Gali riwayat lengkap untuk identifikasi faktor risiko, komorbid, HMOD, dan kemungkinan hipertensi sekunder sesuai PNPK 2021.',
      items: [
        {
          id: 'ht-riwayat-hipertensi',
          title: 'Riwayat Hipertensi & Terapi Sebelumnya',
          description: 'Berapa lama menderita hipertensi? Obat apa yang sudah diminum? Efek samping? Kepatuhan minum obat? Riwayat keluarga hipertensi/penyakit kardiovaskular dini.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-faktor-risiko',
          title: 'Identifikasi Faktor Risiko Kardiovaskular Utama',
          description: 'Tanyakan: Status merokok. Pola makan (garam, lemak jenuh, alkohol). Aktivitas fisik. Berat badan/IMT. Adanya DM, Dislipidemia, Hiperurisemia. Riwayat stroke/PJK/PAD pada diri sendiri dan keluarga.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-gejala-hmod',
          title: 'Cari Gejala Kerusakan Organ Target (HMOD)',
          description: 'Otak: Sakit kepala, TIA/stroke, penurunan kognitif. Jantung: Nyeri dada, sesak, edema, palpitasi, riwayat IMA/revaskularisasi. Ginjal: Poliuria, nokturia, hematuria. Arteri Perifer: Akral dingin, klaudikasio (nyeri betis saat jalan). Mata: Kabur mendadak, gangguan penglihatan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-skrining-sekunder',
          title: 'Skrining Hipertensi Sekunder',
          description: 'Curiga sekunder bila: Usia <40 tahun + HT derajat 2, TD mendadak naik pada riwayat normal, refrakter. Gejala sugestif: Ngorok/mengantuk (OSA), Kelemahan otot/kram (Aldosteronisme Primer), Berkeringat/palpitasi episodik (Feokromositoma), Hipotiroid/hipertiroid, Riwayat penyakit ginjal.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-obat-memperburuk',
          title: 'Cek Obat-obatan yang Meningkatkan TD',
          description: 'Tanyakan konsumsi rutin: Kortikosteroid, NSAID, obat flu (pseudoefedrin, fenilefrin), kontrasepsi oral, kemoterapi, eritropoietin, yohimbine, liquorice. Obat ini dapat menyebabkan atau memperburuk hipertensi.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ht-pemfis-lab'
    },

    // ─────────────────────────────────────────────
    // NODE 4: PEMERIKSAAN FISIK & LAB / HMOD
    // ─────────────────────────────────────────────
    'ht-pemfis-lab': {
      id: 'ht-pemfis-lab',
      type: 'checklist',
      title: 'Fase 3: Pemeriksaan Fisik, Lab, & Penilaian HMOD',
      description: 'Evaluasi komprehensif untuk menilai kerusakan organ target (HMOD) dan menyingkirkan hipertensi sekunder.',
      items: [
        {
          id: 'ht-antropometri',
          title: 'Antropometri: BB, TB, IMT, & Lingkar Pinggang',
          description: 'Hitung IMT. Target IMT 18.5-22.9 kg/m². Ukur Lingkar Pinggang: Pria <90 cm, Wanita <80 cm. Obesitas sentral = faktor risiko metabolik mandiri.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-pemfis-hmod',
          title: 'Pemeriksaan Fisik untuk HMOD',
          description: 'Auskultasi jantung (murmur, gallop S3), palpasi nadi perifer, cek ABI (jika tersedia), auskultasi bruit karotis/renal, palpasi ginjal. Tanda Cushing: striae, moon face. Tanda tiroid. Tanda koarktasio aorta (TD lengan vs tungkai berbeda).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-lab-dasar',
          title: 'Pemeriksaan Laboratorium Dasar',
          description: 'Wajib: Kreatinin + eGFR, Elektrolit (K+/Na+), Gula Darah Puasa, Profil Lipid (total, LDL, HDL, Trigliserida), Urinalisa (protein/albumin). Opsional: Asam Urat, Tes Fungsi Tiroid (TSH), Hemoglobin.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ekg',
          title: 'EKG 12-Lead: Deteksi LVH & Aritmia',
          description: 'Kriteria EKG LVH: Sokolow-Lyon SV1+RV5 >35 mm atau R di aVL ≥11 mm; Cornell Voltage SV3+RaVL >28mm (pria) / >20mm (wanita). Cek juga untuk deteksi Fibrilasi Atrial.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-urin-albumin',
          title: 'Rasio Albumin-Kreatinin Urin (ACR)',
          description: 'Mikroalbuminuria (30-300 mg/g) = tanda kerusakan ginjal dini dan faktor risiko kardiovaskular independen. Makroalbuminuria (>300 mg/g) = nefropati manifes.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-funduskopi',
          title: 'Funduskopi (Retinopati Hipertensi)',
          description: 'Dianjurkan terutama pada HT derajat 2-3, atau yang dicurigai HMOD berat. Deteksi: perdarahan retina, eksudat, papil edema (tanda hipertensi maligna).',
          required: false,
          category: 'assessment'
        },
        {
          id: 'ht-hbpm-abpm',
          title: 'Pertimbangkan HBPM / ABPM untuk Konfirmasi',
          description: 'HBPM (Home Blood Pressure Monitoring): Ukur 2x pagi (setelah BAK, sebelum sarapan & obat) dan 2x malam, minimal 7 hari. Nilai rata-rata ≥135/85 = hipertensi. Berguna untuk deteksi White Coat Hypertension dan Masked Hypertension.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ht-klasifikasi-risiko'
    },

    // ─────────────────────────────────────────────
    // NODE 5: KLASIFIKASI TD & STRATIFIKASI RISIKO
    // ─────────────────────────────────────────────
    'ht-klasifikasi-risiko': {
      id: 'ht-klasifikasi-risiko',
      type: 'decision',
      title: 'Klasifikasi Tekanan Darah & Stratifikasi Risiko',
      description: 'Klasifikasi TD berdasarkan PNPK 2021 (berbasis ESC/ESH 2018 & ISH 2020). Pilih derajat hipertensi pasien saat ini:',
      warningLevel: 'info',
      branches: [
        {
          id: 'ht-normal-tinggi',
          title: 'Normal Tinggi (TDS 130-139 dan/atau TDD 85-89)',
          description: 'Mulai intervensi gaya hidup. Obat hanya jika risiko CV sangat tinggi (terutama PJK). Kontrol 1 tahun.',
          color: 'blue',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'low'
        },
        {
          id: 'ht-derajat-1',
          title: 'Hipertensi Derajat 1 (TDS 140-159 dan/atau TDD 90-99)',
          description: 'Gaya hidup dulu 4-6 minggu. Jika risiko tinggi/ada HMOD, mulai obat bersamaan. Jika tidak improve, mulai obat.',
          color: 'orange',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'medium'
        },
        {
          id: 'ht-derajat-2',
          title: 'Hipertensi Derajat 2 (TDS 160-179 dan/atau TDD 100-109)',
          description: 'Inisiasi obat segera bersamaan dengan modifikasi gaya hidup.',
          color: 'red',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'high'
        },
        {
          id: 'ht-derajat-3',
          title: 'Hipertensi Derajat 3 (TDS ≥180 dan/atau TDD ≥110)',
          description: 'Inisiasi obat segera. Jika ada gejala HMOD → kembali ke jalur emergensi.',
          color: 'purple',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'high'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // NODE 6: MODIFIKASI GAYA HIDUP (WAJIB SEMUA)
    // ─────────────────────────────────────────────
    'ht-gaya-hidup': {
      id: 'ht-gaya-hidup',
      type: 'checklist',
      title: 'Fase 4: Intervensi Gaya Hidup (Fondasi Wajib Semua Pasien)',
      description: 'Modifikasi gaya hidup adalah lini pertama terapi hipertensi dan dilanjutkan bahkan saat sudah mulai obat. Dapat menurunkan TDS 8-10 mmHg.',
      items: [
        {
          id: 'ht-dash-diet',
          title: 'Diet DASH & Restriksi Garam',
          description: 'Batasi natrium <2g/hari (= 5g NaCl = 1 sendok teh garam = 3 sdm MSG). Diet kaya sayuran, buah segar, susu rendah lemak, kacang, minyak zaitun, ikan. Batasi daging merah, lemak jenuh, gula. Dapat menurunkan TDS 5-11 mmHg.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-berat-badan',
          title: 'Manajemen Berat Badan Ideal',
          description: 'Target IMT 18.5-22.9 kg/m². Lingkar pinggang pria <90 cm, wanita <80 cm. Setiap penurunan 5 kg BB dapat menurunkan TDS ±5 mmHg. Hindari penurunan BB agresif tanpa aktivitas fisik (risiko sarkopenia pada lansia).',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-olahraga',
          title: 'Resep Olahraga Aerobik (FITT)',
          description: 'Frekuensi: 5-7 kali/minggu. Intensitas: Sedang (40-60% Heart Rate Reserve). Tipe: Jalan cepat, joging, bersepeda, berenang, senam aerobik. Durasi: 30-60 menit/sesi. Dapat menurunkan TDS 5-8 mmHg. Didahului pemanasan 5-10 menit.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-berhenti-rokok',
          title: 'Berhenti Merokok',
          description: 'Status merokok ditanyakan setiap kunjungan. Merokok adalah faktor risiko vaskular dan kanker. Rujuk ke program berhenti merokok atau konseling motivasional.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-batasi-alkohol',
          title: 'Batasi Konsumsi Alkohol',
          description: 'Alkohol berlebih meningkatkan TD secara signifikan. Batasi jika dikonsumsi. Tanyakan riwayat konsumsi alkohol pada setiap kunjungan.',
          required: false,
          category: 'action'
        },
        {
          id: 'ht-pantau-tdrs',
          title: 'Edukasi Pemantauan TD Mandiri di Rumah (HBPM)',
          description: 'Anjurkan pasien memiliki tensimeter digital tervalidasi. Ukur pagi dan malam hari selama minimal 7 hari. Catat hasil. HBPM meningkatkan kepatuhan dan deteksi dini.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'ht-indikasi-obat-decision'
    },

    // ─────────────────────────────────────────────
    // NODE 7: KAPAN MEMULAI OBAT?
    // ─────────────────────────────────────────────
    'ht-indikasi-obat-decision': {
      id: 'ht-indikasi-obat-decision',
      type: 'decision',
      title: 'Penentuan Indikasi Memulai Terapi Obat',
      description: 'Evaluasi gaya hidup 4-6 minggu. Tentukan apakah pasien memerlukan terapi farmakologi berdasarkan derajat TD dan profil risiko:',
      warningLevel: 'info',
      branches: [
        {
          id: 'ht-terapi-umum',
          title: 'Hipertensi Derajat 1-2 Umum (Tanpa Komorbid Khusus)',
          description: 'HT Derajat 2-3: Mulai obat segera. HT Derajat 1 + risiko rendah: tunggu 4-6 minggu gaya hidup dulu. HT Derajat 1 + HMOD atau risiko tinggi: mulai obat sekarang.',
          color: 'blue',
          nextNodeId: 'ht-terapi-farmakologi',
          riskLevel: 'medium'
        },
        {
          id: 'ht-terapi-komorbid-dm-ckd',
          title: 'Dengan Diabetes Melitus dan/atau Penyakit Ginjal Kronik',
          description: 'Target TD lebih ketat: <130/80 mmHg. Wajib RAS Blocker (ACEi/ARB) kecuali kontraindikasi.',
          color: 'red',
          nextNodeId: 'ht-ckd-dm-plan',
          riskLevel: 'high'
        },
        {
          id: 'ht-terapi-geriatri',
          title: 'Pasien Geriatri (≥60 tahun, terutama Frail ≥80 tahun)',
          description: 'Target TD 130-139 mmHg (atau 130-150 bila frail). Monoterapi di awal, titrasi "go slow".',
          color: 'orange',
          nextNodeId: 'ht-geriatri-plan',
          riskLevel: 'medium'
        },
        {
          id: 'ht-terapi-khusus',
          title: 'Kondisi Khusus Lain (HT Resisten, Kehamilan, dll)',
          description: 'Hipertensi Resisten, Kehamilan, Gagal Jantung, Fibrilasi Atrial, dll.',
          color: 'purple',
          nextNodeId: 'ht-kondisi-khusus',
          riskLevel: 'high'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // NODE 8A: TERAPI FARMAKOLOGI UMUM
    // ─────────────────────────────────────────────
    'ht-terapi-farmakologi': {
      id: 'ht-terapi-farmakologi',
      type: 'checklist',
      title: 'Fase 5: Algoritma Farmakoterapi Hipertensi (Umum)',
      description: 'Lima golongan obat utama: ACEi, ARB, Beta Bloker, CCB, dan Diuretik. Strategi utama: KOMBINASI 2 obat sebagai terapi awal pada sebagian besar pasien.',
      items: [
        {
          id: 'ht-kombinasi-2-obat',
          title: 'Inisiasi Kombinasi 2 Obat (Rekomendasi Utama)',
          description: 'Kombinasi dianjurkan: RAS Blocker (ACEi ATAU ARB) + CCB, atau RAS Blocker + Diuretik Tiazid. Contoh praktis: Amlodipin 5mg + Candesartan 8mg. Pertimbangkan Single Pill Combination (SPC) untuk meningkatkan kepatuhan.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-safety-dual-ras',
          title: 'LARANGAN KERAS: Jangan Kombinasi ACEi + ARB',
          description: 'Kombinasi dua penghambat RAS (misalnya Captopril + Candesartan) TIDAK DIREKOMENDASIKAN. Terbukti meningkatkan risiko gagal ginjal akut dan hiperkalemia tanpa manfaat tambahan. Pilih hanya salah satu.',
          required: true,
          category: 'safety'
        },
        {
          id: 'ht-monoterapi-indikasi',
          title: 'Kapan Monoterapi Dipertimbangkan?',
          description: 'Pertimbangkan monoterapi pada: TDS <150 mmHg + risiko rendah, Lansia sangat tua (≥80 th) atau frail, Pasien dengan tekanan darah normal-tinggi + risiko sangat tinggi. Mulai dengan dosis rendah, titrasi bertahap.',
          required: false,
          category: 'action'
        },
        {
          id: 'ht-beta-bloker-indikasi',
          title: 'Beta Bloker: Sesuaikan Indikasi Spesifik',
          description: 'Beta Bloker diinjurkan jika ada: Angina/PJK, Pasca IMA, Gagal Jantung dengan LVEF menurun (HFrEF), Kontrol denyut Fibrilasi Atrial, atau Kehamilan. Jangan sebagai pilihan utama monoterapi tanpa indikasi spesifik.',
          required: false,
          category: 'medication'
        },
        {
          id: 'ht-triple-therapy',
          title: 'Eskalasi ke 3 Obat jika TD Belum Terkontrol',
          description: 'Bila kombinasi 2 obat tidak mencapai target dalam 4-6 minggu: Tambahkan obat ke-3 = RAS Blocker + CCB + Diuretik Tiazid. Bila masih tidak terkontrol → evaluasi kepatuhan, cek Hipertensi Resisten.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-target-td',
          title: 'Target Tekanan Darah Pengobatan',
          description: 'Usia <60 tahun: TDS 120-129 mmHg (jika ditoleransi). Usia ≥60 tahun: TDS 130-139 mmHg. Semua pasien: TDD <80 mmHg. Target minimal: <140/90 mmHg. Evaluasi TD tiap 1-3 bulan hingga target tercapai.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-efeksamping-pantau',
          title: 'Pantau Efek Samping Obat',
          description: 'ACEi: Batuk kering (ganti ARB), Hiperkalemia, pantau kreatinin. ARB: Hiperkalemia. CCB Dihidropiridin: Edema tungkai, sakit kepala. Diuretik Tiazid: Hipokalemia, hiperurisemia, hiperglikemia. Beta Bloker: Bradikardia, bronkospasme.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ht-monitoring-followup'
    },

    // ─────────────────────────────────────────────
    // NODE 8B: HT + CKD/DM
    // ─────────────────────────────────────────────
    'ht-ckd-dm-plan': {
      id: 'ht-ckd-dm-plan',
      type: 'checklist',
      title: 'Tatalaksana Hipertensi + Diabetes Melitus / Penyakit Ginjal Kronik',
      description: 'Kombinasi HT dengan DM atau PGK = kelompok risiko kardiovaskular sangat tinggi. Target TD lebih ketat dan pemilihan obat berbasis bukti renoprotektif. (PNPK 2021 & ESC/ESH 2018)',
      items: [
        {
          id: 'ht-ckd-target',
          title: 'Target TD: <130/80 mmHg (atau lebih ketat pada DM + albuminuria)',
          description: 'Bila risiko kardiovaskular 10 tahun >15%: Target TDS <130 mmHg dan TDD <80 mmHg. Pada nefropati diabetik: target 120-130/70-79 mmHg.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-ckd-ras-wajib',
          title: 'Wajib RAS Blocker (ACEi atau ARB) sebagai Terapi Dasar',
          description: 'ACEi/ARB memberikan efek renoprotektif dan kardioprotektif melebihi efek penurunan TD-nya. Jangan kombinasikan ACEi + ARB. Monitor kreatinin 2-4 minggu setelah inisiasi (kenaikan <30% dari baseline masih acceptable).',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-ckd-diuretik',
          title: 'Pilihan Diuretik Sesuai Fungsi Ginjal',
          description: 'Jika eGFR ≥30 ml/mnt: Tiazid/Indapamide efektif. Jika eGFR <30 ml/mnt: Ganti ke Loop Diuretik (Furosemid), karena tiazid tidak efektif pada eGFR rendah.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-ckd-monitor-kalium',
          title: 'Monitor Kalium & Kreatinin Berkala',
          description: 'Pada pasien CKD + RAS Blocker: cek K+ dan kreatinin tiap 2-4 minggu di awal, kemudian tiap 3-6 bulan. Hiperkalemia (K+ >5.5 mEq/L) = pertimbangkan turunkan dosis/ganti obat. Jangan tambahkan Spironolakton tanpa monitoring ketat (risiko hiperkalemia berat).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-dm-kontrol-gula',
          title: 'Kontrol Gula Darah Ketat pada DM',
          description: 'Kontrol glikemik yang baik menurunkan risiko komplikasi mikrovaskular dan cardiovascular. Sinergi antihipertensi + antidiabetik optimal = outcome terbaik. Hindari Beta Bloker pada DM yang tidak stabil (dapat menutupi gejala hipoglikemia).',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ht-monitoring-followup'
    },

    // ─────────────────────────────────────────────
    // NODE 8C: GERIATRI
    // ─────────────────────────────────────────────
    'ht-geriatri-plan': {
      id: 'ht-geriatri-plan',
      type: 'checklist',
      title: 'Tatalaksana Hipertensi Geriatri (≥60 Tahun)',
      description: 'Pendekatan individual, hati-hati efek samping. Prinsip "Go Low, Go Slow". Nilai status frailty (Clinical Frailty Scale 1-9) sebelum memulai terapi agresif.',
      items: [
        {
          id: 'ht-geriatri-frailty',
          title: 'Nilai Status Frailty (Clinical Frailty Scale)',
          description: 'Skor 1-3 = Fit/Robust: bisa terapi standar. Skor 4-5 = Pre-frail: hati-hati, pantau ketat. Skor 6-9 = Frail: mulai monoterapi dosis kecil, target TD lebih longgar (130-150 mmHg). Pasien multimorbid/demensia berat: konsultasikan ke tim geriatri.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-geriatri-target',
          title: 'Target TD Sesuai Usia & Kondisi',
          description: 'Usia 60-79 tahun (fit): Target TDS 130-139 mmHg. Usia ≥80 tahun: Target TDS 130-150 mmHg. Frail: Target TDS tidak lebih rendah dari 130 mmHg (risiko iskemia organ). TDD tidak boleh diturunkan terlalu rendah (risiko hipoperfusi koroner).',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-geriatri-obat',
          title: 'Pilihan Obat Awal Geriatri: CCB atau Tiazid',
          description: 'CCB Dihidropiridin (Amlodipin/Nifedipin) atau Tiazid/Indapamid sebagai pilihan awal. Hindari Alfa-1 Bloker (risiko hipotensi ortostatik jatuh). Hati-hati Diuretik Loop (hiponatremia, hipokalemia, inkontinensia).',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-geriatri-mulai-dosis',
          title: 'Mulai Dosis Rendah, Titrasi Bertahap',
          description: 'Mulai dengan setengah dosis standar. Naikkan dosis setiap 4 minggu atau lebih. Pantau tekanan darah sambil berdiri dan berbaring (deteksi hipotensi ortostatik). Pantau fungsi ginjal, elektrolit, dan efek kognitif.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-geriatri-jatuh',
          title: 'Pencegahan Risiko Jatuh',
          description: 'Evaluasi risiko jatuh pada setiap kunjungan. Pertimbangkan fisioterapi/balance exercise. Hindari polifarmasi berlebih. Edukasi keluarga/caregiver untuk monitor dan dampingi pasien.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ht-monitoring-followup'
    },

    // ─────────────────────────────────────────────
    // NODE 8D: KONDISI KHUSUS
    // ─────────────────────────────────────────────
    'ht-kondisi-khusus': {
      id: 'ht-kondisi-khusus',
      type: 'checklist',
      title: 'Tatalaksana Hipertensi Kondisi Khusus',
      description: 'Beberapa kondisi klinis memerlukan pendekatan spesifik berbeda.',
      items: [
        {
          id: 'ht-resisten',
          title: 'Hipertensi Resisten: TD ≥140/90 Meski 3 Obat Maksimal',
          description: 'Definisi: TD tidak capai target meski sudah 3 obat berbeda golongan (RAS + CCB + Diuretik) dosis maksimal. Langkah: (1) Konfirmasi kepatuhan & teknik ukur yang benar. (2) Singkirkan White Coat & Sekunder. (3) Tambahkan Spironolakton 25-50 mg (bila eGFR >45 & K+ <4.5). Alternatif: Bisoprolol atau Doksazosin. Rujuk spesialis.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-white-coat',
          title: 'White Coat Hypertension & Masked Hypertension',
          description: 'White coat: TD klinik tinggi, HBPM normal (prevalensi 20-50%). Intervensi gaya hidup + pantau HBPM berkala. Pertimbangkan obat jika ada HMOD atau risiko CV tinggi. Masked Hypertension: TD klinik normal, HBPM tinggi. Risiko CV sama seperti hipertensi menetap → pertimbangkan terapi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-kehamilan',
          title: 'Hipertensi dalam Kehamilan & Pre-Eklampsia',
          description: 'Pilihan obat aman: Metildopa, Nifedipin (CCB), Labetalol (bila tersedia). ACEi dan ARB DIKONTRAINDIKASIKAN dalam kehamilan (fetotoksik). TD ≥170/110 = darurat obstetrik → rawat inap. Pre-eklampsia berat: Nikardipin IV, MgSO4 untuk profilaksis eklampsia. Rujuk ke SpOG + SpPD/Kardiologi.',
          required: true,
          category: 'safety'
        },
        {
          id: 'ht-gagal-jantung',
          title: 'Hipertensi + Gagal Jantung (HFrEF)',
          description: 'Pilih ACEi/ARB (atau ARNI) + Beta Bloker + MRA (Spironolakton) + Diuretik Loop. Hindari CCB Non-Dihidropiridin (Verapamil/Diltiazem) pada HFrEF. Target TDS: 120-130 mmHg.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-fibrilasi-atrial',
          title: 'Hipertensi + Fibrilasi Atrial',
          description: 'Kontrol denyut: Beta Bloker atau CCB Non-Dihidropiridin (Diltiazem/Verapamil). ACEi/ARB sebagai antihipertensi utama. Wajib evaluasi skor CHA2DS2-VASc untuk antikoagulasi. Hindari CCB Dihidropiridin tunggal bila tidak terkontrol.',
          required: false,
          category: 'medication'
        }
      ],
      nextNodeId: 'ht-monitoring-followup'
    },

    // ─────────────────────────────────────────────
    // NODE 9: MONITORING & FOLLOW-UP
    // ─────────────────────────────────────────────
    'ht-monitoring-followup': {
      id: 'ht-monitoring-followup',
      type: 'checklist',
      title: 'Fase 6: Monitoring, Follow-Up & Tindak Lanjut',
      description: 'Pemantauan berkala adalah kunci keberhasilan pengendalian hipertensi jangka panjang. Evaluasi kepatuhan, target TD, dan efek samping obat.',
      items: [
        {
          id: 'ht-follow-frek',
          title: 'Jadwal Kontrol: Tiap 1-3 Bulan Hingga Target Tercapai',
          description: 'Frekuensi kontrol: Setiap 1-2 bulan saat titrasi/penyesuaian obat. Setiap 3-6 bulan bila TD sudah stabil. Setiap 12 bulan: evaluasi HMOD lengkap (EKG, lab, urin albumin).',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-cek-target-td',
          title: 'Pantau Pencapaian Target TD',
          description: 'Evaluasi setiap kunjungan: apakah TD sudah mencapai target? Bila belum: pertimbangkan eskalasi dosis, penambahan obat, atau evaluasi kepatuhan. Tanyakan cara ukur TD mandiri di rumah.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-kepatuhan',
          title: 'Evaluasi Kepatuhan Terapi & Edukasi Ulang',
          description: 'Identifikasi hambatan kepatuhan: biaya obat, efek samping, sistem kepercayaan. Dukung dengan edukasi, melibatkan keluarga, dan simplifikasi regimen (SPC/single pill combination bila memungkinkan). Kepatuhan adalah faktor terpenting keberhasilan terapi.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'ht-lab-berkala',
          title: 'Lab Berkala: Elektrolit, Kreatinin, Gula Darah',
          description: 'Monitor K+ dan kreatinin: terutama untuk pasien dengan ACEi/ARB, Diuretik. Profil lipid: tiap tahun. Gula darah: tiap 6-12 bulan (terutama pada diuretik tiazid). EKG minimal tiap tahun.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-rujuk-indikasi',
          title: 'Indikasi Rujuk ke Fasilitas Kesehatan Tingkat Lanjut',
          description: 'Rujuk bila: Curiga hipertensi sekunder. Usia <40 tahun + HT derajat ≥2. TD mendadak naik pada riwayat normal. Hipertensi resisten (sudah 3 obat maksimal). Perlu penilaian HMOD lanjutan (ekokardiografi, USG karotis). Kondisi klinis yang membutuhkan evaluasi spesialis.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-covid-management',
          title: 'Pasien Hipertensi di Era Post-COVID (Telemedicine)',
          description: 'Pertahankan obat antihipertensi (termasuk ACEi/ARB) selama dan pasca COVID-19. Tidak ada bukti ACEi/ARB memperburuk COVID-19. Monitor TD di rumah (HBPM). Manfaatkan layanan telemedicine untuk konsultasi dan penyesuaian dosis.',
          required: false,
          category: 'action'
        }
      ]
    }

  },
  references: [
    'PNPK Tata Laksana Hipertensi Dewasa (KMK RI No. HK.01.07/MENKES/4634/2021)',
    'Konsensus Penatalaksanaan Hipertensi 2021: Update Konsensus PERHI 2019 – Perhimpunan Dokter Hipertensi Indonesia (PERHI)',
    '2020 International Society of Hypertension (ISH) Global Hypertension Practice Guidelines. Hypertension. 2020;75(6):1334–1357',
    '2018 ESC/ESH Guidelines for the Management of Arterial Hypertension. Eur Heart J. 2018;39:3021-3104',
    '2017 ACC/AHA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults. Hypertension. 2018;71:1269-1324'
  ]
};
