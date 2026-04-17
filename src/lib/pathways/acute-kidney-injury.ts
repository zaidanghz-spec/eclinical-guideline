// ============================================================
// GANGGUAN GINJAL AKUT (GGA) / ACUTE KIDNEY INJURY (AKI)
// ICD-10: N17
// Referensi:
// - Konsensus Tatalaksana Gangguan Ginjal Akut Dewasa — PERNEFRI 2023
// - KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl. 2012;2(1):1–138.
// - KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
// - Bellomo R, et al. Acute Renal Failure — Definition, Outcome Measures (ADQI). Crit Care. 2004
// Setting: Klinik / FKTP
// Alat: TTV (Tensi, Termometer, Oksimetri), EKG
// TIDAK ADA: Lab kreatinin on-site, USG (Rujuk RS), dialisis, ICU
// Prinsip: DETEKSI DINI → ATASI PENYEBAB REVERSIBLE → KELOLA KOMPLIKASI → RUJUK TEPAT WAKTU
// GGA di klinik = TEMUKAN dan STABILKAN sebelum rujuk — jangan tunda!
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const acuteKidneyInjuryPathway: DynamicPathway = {
  diseaseId: 'acute-kidney-injury',
  diseaseName: 'Gangguan Ginjal Akut (GGA/AKI) — PERNEFRI 2023 & KDIGO',
  startNodeId: 'gga-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT — Anamnesis + TTV + Pemfis
    // ============================================================
    'gga-initial-assessment': {
      id: 'gga-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis, TTV & Pemeriksaan Fisik',
      description: 'GGA = penurunan fungsi ginjal mendadak dalam 7 hari. Di klinik tanpa lab kreatinin, diagnosis klinis berdasarkan OUTPUT URIN adalah kunci. Deteksi dini dan atasi penyebab reversibel dapat memulihkan fungsi ginjal sepenuhnya.',
      items: [
        {
          id: 'gga-anamnesis-keluhan',
          title: 'Anamnesis — Keluhan Utama & Onset',
          description: 'Tanyakan:\n• Kapan urin mulai berkurang atau tidak keluar?\n• Volume urin per hari: berkurang drastis atau berhenti?\n• Nyeri pinggang atau suprapubik?\n• Warna urin: keruh, gelap, atau berdarah (hematuria)?\n• Sudah berapa hari?\n• Keluhan penyerta: bengkak kaki/wajah, sesak, mual, muntah, lemas, gelisah, kejang?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-anamnesis-penyebab',
          title: 'Anamnesis — Cari Penyebab Reversibel (Pre, Intra, Post Renal)',
          description: 'Tiga kategori penyebab GGA:\n\n🔵 PRE-RENAL (terbanyak, reversibel jika ditangani cepat):\nDehibrasi berat (diare, muntah, demam tinggi, perdarahan, luka bakar luas)? Gagal jantung akut (edema, sesak)? Sepsis/syok?\n\n🟡 INTRA-RENAL (kerusakan sel ginjal):\nObat nefrotoksik: NSAID (ibuprofen rutin?), aminoglikosida, kontras radiologi, jamu-jamu?\nInfeksi berat + sepsis? Glomerulonefritis, vaskulitis?\n\n🔴 POST-RENAL (obstruksi — reversibel jika dibebaskan):\nPria usia tua: BPH? Urolitiasis? Tumor vejika/prostat?\nRiwayat pemasangan kateter urin? Tidak bisa kencing sama sekali?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-anamnesis-obat',
          title: 'Anamnesis — Riwayat Obat & Zat Nefrotoksik (STOP Segera!)',
          description: 'Identifikasi dan HENTIKAN obat nefrotoksik:\n• NSAID: Ibuprofen, Diklofenak, Meloksikam, Asam Mefenamat\n• ACEi / ARB: Kaptopril, Ramipril, Losartan (tunda saat syok/dehidrasi)\n• Aminoglikosida: Gentamisin, Amikacin\n• Kontras radiologi iodinasi (dalam 48–72 jam terakhir)\n• Jamu-jamu herbal (kebo, tawon, beluntas, dll — sering nefrotoksik)\n• Metformin (tunda pada GGA — risiko asidosis laktat)',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-ttv-hemodinamik',
          title: 'TTV + Penilaian Hemodinamik (PRIORITAS!)',
          description: 'Tekanan Darah:\n• Hipotensi (TD < 90) → GGA Pre-Renal / Syok → resusitasi cairan SEGERA\n• Hipertensi berat (TD > 180) → bisa GGA intra-renal (glomerulonefritis, renovaskular)\n\nNadi: Takikardia + hipotensi = syok\nSuhu: Demam tinggi → sepsis sebagai penyebab GGA\nSpO₂: < 94% → curiga edema paru akibat overload cairan GGA stadium lanjut\n\nUkur TD berbaring dan berdiri (hipotensi ortostatik = dehidrasi/pre-renal)',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-output-urin',
          title: '⚡ Nilai Output Urin — Diagnostik Utama di Klinik Tanpa Lab',
          description: 'KDIGO 2012 — Kriteria GGA berdasarkan Output Urin:\n• OLIGURIA: < 0.5 mL/kgBB/jam selama ≥ 6 jam\n• Contoh: pasien 60 kg → < 30 mL/jam = oliguria\n• ANURIA: < 100 mL dalam 24 jam → DARURAT!\n\nCara taksir di klinik tanpa kateter:\n→ Tanya: berapa kali kencing hari ini? Volume per kali kira-kira berapa?\n→ Pasang kateter Foley jika perlu untuk pengukuran akurat\n→ Catat jam pertama setelah kateter dipasang → hitung output per jam',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-ekg-wajib',
          title: '⚡ EKG 12-Lead — WAJIB! Skrining Hiperkalemia Mematikan',
          description: 'Hiperkalemia (K⁺ > 5.5) adalah komplikasi GGA paling berbahaya dan dapat menyebabkan henti jantung mendadak.\n\nTanda EKG hiperkalemia (dari ringan ke berat):\n1. Tall peaked T-wave (T lancip tinggi)\n2. Pemanjangan PR interval\n3. Pelebaran QRS (> 120 ms)\n4. Sine wave pattern → VF/asistol!\n\nJika EKG menunjukkan tanda hiperkalemia → TANGANI SEGERA + RUJUK CITO!\nJika EKG normal → aman (kadar K⁺ kemungkinan < 6 mEq/L)',
          required: true,
          category: 'safety'
        },
        {
          id: 'gga-pemfis',
          title: 'Pemeriksaan Fisik',
          description: 'STATUS HIDRASI:\n• Dehidrasi (pre-renal): mukosa kering, turgor turun, mata cekung, CRT > 2 dtk\n• Overload (stadium lanjut): edema kaki/pergelangan/wajah, distensi JVP, ronki paru (edema paru)\n\nABDOMEN: nyeri suprapubik (retensi urin), massa? Kandung kemih teraba penuh di suprapubik = obstruksi (post-renal)!\n\nKESADARAN: Bingung, agitasi, atau mengantuk berlebihan = ensefalopati uremikum (urgensi RUJUK)\n\nKULIT: Pucat, Mudah memar = uremia kronik (bukan GGA murni)',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'gga-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE
    // ============================================================
    'gga-triage-decision': {
      id: 'gga-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Tingkat Kegawatan GGA',
      description: 'Tentukan jalur berdasarkan status hemodinamik dan tanda komplikasi mengancam jiwa.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'gga-kritis',
          title: '🔴 KRITIS — Syok / Hiperkalemia EKG / Anuria / Ensefalopati',
          description: 'Ada SATU dari: TD < 90 (syok), EKG tanda hiperkalemia, Anuria > 12 jam, Edema paru akut, Kesadaran menurun (ensefalopati uremikum). Stabilisasi SEGERA + Rujuk IGD RS CITO.',
          color: 'red',
          nextNodeId: 'gga-kritis-management',
          riskLevel: 'high'
        },
        {
          id: 'gga-pre-renal',
          title: '🟡 Pre-Renal — Dehidrasi / Syok Hipovolemik Ringan-Sedang',
          description: 'Tanda dehidrasi + oliguria tanpa komplikasi metabolik berat. Penyebab paling umum dan paling reversibel. Resusitasi cairan IV.',
          color: 'orange',
          nextNodeId: 'gga-prerenal-management',
          riskLevel: 'medium'
        },
        {
          id: 'gga-post-renal',
          title: '🟠 Post-Renal — Obstruksi (Tidak Bisa Kencing / Kandung Kemih Penuh)',
          description: 'Kandung kemih teraba penuh, tidak bisa kencing, atau anuria tanpa dehidrasi. Penyebab: BPH, batu, tumor. Pembebasan obstruksi segera!',
          color: 'orange',
          nextNodeId: 'gga-postrenal-management',
          riskLevel: 'medium'
        },
        {
          id: 'gga-stabil-monitor',
          title: '🟢 Stabil — GGA Ringan, Penyebab Jelas, Tidak Ada Komplikasi',
          description: 'Oliguria ringan, hemodinamik stabil, EKG normal, penyebab pre/post-renal reversibel sudah diatasi. Monitor ketat + atasi penyebab.',
          color: 'green',
          nextNodeId: 'gga-supportive-care',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: KRITIS — STABILISASI & RUJUK
    // ============================================================
    'gga-kritis-management': {
      id: 'gga-kritis-management',
      type: 'checklist',
      title: 'Node 3A: GGA Kritis — Stabilisasi Darurat & Rujuk IGD RS CITO',
      description: 'GGA dengan komplikasi mengancam jiwa membutuhkan ICU/dialisis — tidak dapat ditangani tuntas di klinik. Fokus: stabilisasi singkat lalu rujuk secepat mungkin.',
      items: [
        {
          id: 'kri-hiperkalemia',
          title: '1. ⚡ TANGANI HIPERKALEMIA (Jika EKG Abnormal)',
          description: 'Jika EKG menunjukkan tall T-wave atau QRS lebar:\n\n① Kalsium Glukonat 10% 10 mL IV perlahan 5–10 menit → STABILISASI membran jantung (efek dalam 1–3 menit, tahan 30–60 menit)\n\n② Insulin Reguler 10 unit IV + Dextrose 40% 50 mL IV → GESER K⁺ masuk sel (efek 15–30 menit)\n\n③ Salbutamol nebulizer 10–20 mg → GESER K⁺ masuk sel (alternatif/tambahan)\n\n④ Sodium Bikarbonat 8.4% 50 mL IV (jika ada asidosis bersamaan)\n\nTindakan ini SEMENTARA — K⁺ akan kembali naik jika tidak dialisis!',
          required: true,
          category: 'medication'
        },
        {
          id: 'kri-airway-o2',
          title: '2. Amankan Airway + O₂ (Jika Ada Edema Paru / Kesadaran Menurun)',
          description: 'Posisi pasien: duduk tegak (jika edema paru). Siapkan suction jika penurunan kesadaran.\nO₂ via masker atau nasal kanul — target SpO₂ ≥ 94%.\nJika kesadaran menurun → posisi miring, siapkan suction, JANGAN beri makan/minum.',
          required: true,
          category: 'safety'
        },
        {
          id: 'kri-iv-cairan',
          title: '3. IV Line + Cairan HATI-HATI (Jangan Overload!)',
          description: 'Pasang IV line. Jika ADA syok (TD < 90): bolus NaCl 0.9% 250–500 mL pelan, evaluasi respons.\nJika TIDAK ada syok dan ada tanda overload (edema paru, JVP meningkat): JANGAN beri cairan berlebihan → memperburuk!\nHindari RL pada hiperkalemia (RL mengandung K⁺ 4 mEq/L).',
          required: true,
          category: 'action'
        },
        {
          id: 'kri-stop-nefrotoksik',
          title: '4. STOP Semua Obat Nefrotoksik SEKARANG',
          description: 'Hentikan: NSAID, ACEi/ARB, aminoglikosida, kontras iodinasi, metformin, jamu-jamu herbal.\nJangan tunda — setiap jam perpanjangan paparan memperparah kerusakan ginjal.',
          required: true,
          category: 'medication'
        },
        {
          id: 'kri-rujuk-cito',
          title: '5. RUJUK IGD RS dengan ICU / Unit Dialisis — CITO!',
          description: 'Hubungi RS tujuan terlebih dahulu — pastikan ada ICU dan fasilitas dialisis (hemodialisis atau CRRT).\nTransportasi dengan ambulans + pendamping. IV tetap jalan. Monitor EKG jika ada.\n\nSurat rujukan cantumkan:\n• Waktu onset oliguria/anuria\n• Volume urin terakhir yang terukur\n• EKG (foto/bawa printout)\n• Obat yang sudah diberikan (Ca Glukonat, Insulin, dll)\n• TTV serial\n• Penyebab yang dicurigai',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3B: PRE-RENAL — RESUSITASI CAIRAN
    // ============================================================
    'gga-prerenal-management': {
      id: 'gga-prerenal-management',
      type: 'checklist',
      title: 'Node 3B: GGA Pre-Renal — Resusitasi Cairan & Atasi Penyebab',
      description: 'GGA pre-renal = hipoperfusi ginjal (bukan kerusakan sel ginjal). Penyebab tersering dan paling reversibel — 80% fungsi ginjal pulih jika cairan diberikan tepat waktu!',
      items: [
        {
          id: 'pre-stop-nefrotoksik',
          title: '1. STOP Semua Obat Nefrotoksik',
          description: 'Hentikan: NSAID, ACEi/ARB (terutama saat dehidrasi/syok), jamu herbal nefrotoksik. NSAID pada dehidrasi adalah penyebab utama GGA pre-renal di klinik!',
          required: true,
          category: 'medication'
        },
        {
          id: 'pre-cairan-iv',
          title: '2. Resusitasi Cairan IV Kristaloid',
          description: 'Cairan pilihan: NaCl 0.9% (Normal Saline) atau Ringer Laktat.\nJangan gunakan koloid Starch (HES) — terbukti meningkatkan risiko GGA (KDIGO 2012)!\n\nDosis:\n• Dehidrasi ringan–sedang: 500 mL bolus dalam 30 menit, evaluasi TTV dan output urin\n• Dehidrasi berat/syok: 1000 mL dalam 30–60 menit → evaluasi ulang, ulangi jika perlu\n\nTarget: TD sistolik > 90–100 mmHg, nadi < 100, urin mulai keluar dalam 1–2 jam',
          required: true,
          category: 'medication'
        },
        {
          id: 'pre-monitor-output',
          title: '3. Monitor Output Urin Setelah Resusitasi',
          description: 'Pasang kateter Foley untuk pengukuran akurat.\nJika urin MULAI KELUAR dalam 1–2 jam resusitasi → konfirmasi GGA pre-renal berhasil diatasi → lanjut observasi.\nJika TIDAK ada urin meski TD sudah > 90 → kemungkinan komponen intra-renal atau obstruksi → pertimbangkan rujuk.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'pre-atasi-penyebab',
          title: '4. Atasi Penyebab Hipoperfusi',
          description: 'Diare/muntah berat: lanjutkan cairan oral (oralit) jika bisa minum + IV.\nGagal jantung: HATI-HATI cairan — jangan beri terlalu banyak → akan memperburuk gagal jantung. Konsultasikan ke SpPD/SpJantung.\nSepsis: antibiotik empiris bersamaan cairan. Pertahankan MAP > 65 mmHg.\nPerdarahan: transfusi jika Hb < 7 g/dL → rujuk RS.',
          required: true,
          category: 'action'
        },
        {
          id: 'pre-evaluasi-sijam',
          title: '5. Evaluasi Tiap 2 Jam — Rujuk Jika Tidak Respons',
          description: 'Monitor TTV dan output urin setiap 2 jam setelah resusitasi.\nJika TIDAK membaik dalam 4–6 jam ATAU muncul tanda komplikasi (EKG abnormal, SpO₂ turun, kesadaran menurun) → RUJUK IGD RS.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'gga-supportive-care'
    },

    // ============================================================
    // NODE 3C: POST-RENAL — BEBASKAN OBSTRUKSI
    // ============================================================
    'gga-postrenal-management': {
      id: 'gga-postrenal-management',
      type: 'checklist',
      title: 'Node 3C: GGA Post-Renal — Bebaskan Obstruksi Segera!',
      description: 'GGA post-renal = obstruksi aliran urin. Fungsi ginjal dapat pulih SEMPURNA jika obstruksi dibebaskan dalam < 12–24 jam!',
      items: [
        {
          id: 'pos-kateter-foley',
          title: '1. Pasang Kateter Foley Segera (Jika Obstruksi Kandung Kemih)',
          description: 'Jika kandung kemih teraba penuh (retensi urin karena BPH, striktur uretra, obat antikolinergik):\n→ Pasang kateter Foley 16F–18F segera.\n→ Tampung urin bertahap (jangan keluarkan seluruh urin sekaligus pada retensi kronik — risiko perdarahan post-dekompresi).\n→ Drainase max 500 mL pertama, lalu klem 15–30 menit, kemudian buka kembali.\n\nTanda sukses: urin mengalir deras → konfirmasi GGA post-renal.',
          required: true,
          category: 'action'
        },
        {
          id: 'pos-penyebab-lain',
          title: '2. Jika Obstruksi Di Atas Kandung Kemih (Ureter/Ginjal)',
          description: 'Batu ureter atau tumor yang obstruksi di atas level kandung kemih → kateter Foley TIDAK membantu!\nTanda: pasien tidak bisa kencing tapi kandung kemih kosong saat palpasi/perkusi.\n→ Perlu USG (Rujuk RS) untuk konfirmasi hidronefrosis\n→ Perlu ureteral stent atau nefrostomi perkutan di RS\n→ RUJUK ke SpUrologi / SpBedah segera!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'pos-stop-obat-pemicu',
          title: '3. Stop Obat yang Memicu Retensi Urin',
          description: 'Obat yang dapat menyebabkan retensi urin/obstruksi fungsional:\n• Antikolinergik: antipsikotik (haloperidol, klorpromazin), antispasmodik, antihistamin generasi 1\n• Opioid\n• Dekongestan (pseudoefedrin)\n\nHentikan jika memungkinkan. Ganti dengan alternatif yang lebih aman.',
          required: true,
          category: 'medication'
        },
        {
          id: 'pos-monitor-pos-kateter',
          title: '4. Monitor Output Urin Pasca Pembebasan Obstruksi',
          description: 'Setelah kateter terpasang dan urin mengalir:\n• Pantau output urin tiap jam\n• Waspada "post-obstructive diuresis": poliuria masif (> 200–300 mL/jam) bisa terjadi → infus cairan untuk kompensasi\n• Pantau elektrolit (K⁺, Na⁺) secara klinis — retensi urin lama akumulasi waste products\n\nJika urin masih tidak keluar setelah kateter terpasang benar → RUJUK untuk USG (Rujuk RS) dan evaluasi bedah.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'gga-supportive-care'
    },

    // ============================================================
    // NODE 4: PERAWATAN SUPORTIF UMUM
    // ============================================================
    'gga-supportive-care': {
      id: 'gga-supportive-care',
      type: 'checklist',
      title: 'Node 4: Perawatan Suportif — Optimalisasi & Cegah Progresivitas',
      description: 'PERNEFRI 2023 / KDIGO: Tatalaksana suportif untuk semua stadium GGA yang tidak memerlukan dialisis segera.',
      items: [
        {
          id: 'sup-cairan-balance',
          title: '1. Balance Cairan Ketat',
          description: 'Hitung input vs output setiap hari:\n• Jika DEHIDRASI (output > input) → beri cairan sampai haluaran urin terjaga\n• Jika OVERLOAD (edema, berat badan naik, SpO₂ turun) → RESTRIKSI cairan + pertimbangkan furosemide (HANYA jika ada overload terkonfirmasi, bukan sebagai profilaksis)\n\nJANGAN gunakan diuretik untuk "memacu" ginjal — tidak terbukti mencegah atau membalikkan GGA (KDIGO 2012 — Level A).',
          required: true,
          category: 'action'
        },
        {
          id: 'sup-stop-nefrotoksik',
          title: '2. Stop & Hindari Semua Obat Nefrotoksik',
          description: 'Review semua obat pasien. Stop: NSAID, aminoglikosida, kontras, ACEi/ARB (sementara).\nSesuaikan dosis obat yang diekskresi ginjal berdasarkan estimasi GFR (misalnya: metformin, beberapa antibiotik, digoksin).\nHindari kontras radiologi sampai fungsi ginjal pulih.',
          required: true,
          category: 'medication'
        },
        {
          id: 'sup-diet-ginjal',
          title: '3. Diet & Pembatasan Kalium',
          description: 'Batasi asupan KALIUM jika oliguria:\n• Hindari: pisang, kentang, tomat, kacang-kacangan, coklat, buah kering\n• Hindari: garam kalium (KCl) sebagai pengganti garam\n\nBatasi FOSFOR: susu, keju, daging merah berlebihan.\nProtein tidak perlu dibatasi ketat kecuali uremia berat.\nBatasi asupan cairan oral sesuai output urin + insensible loss (± 500–700 mL/hari).',
          required: true,
          category: 'action'
        },
        {
          id: 'sup-pantau-ekg',
          title: '4. EKG Serial — Monitor Hiperkalemia',
          description: 'Rekam EKG ulang tiap 4–6 jam selama oliguria aktif atau setiap kali ada perubahan klinis.\nTanda memburuk: tall T-wave semakin prominen, PR memanjang, QRS melebar → tanda hiperkalemia meningkat → tangani + rujuk segera.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'sup-indikasi-rujuk',
          title: '5. Indikasi Rujuk ke RS — Jangan Tunda!',
          description: 'RUJUK SEGERA jika:\n• Oliguria/anuria tidak membaik dalam 6–12 jam meski penyebab diatasi\n• Tanda hiperkalemia di EKG muncul atau memburuk\n• Edema paru / SpO₂ < 94% tidak membaik\n• Kesadaran menurun (ensefalopati uremikum)\n• GDS tidak terkontrol (hiperglikemia pada DM + GGA)\n• Perlu dialisis (kriteria TD)\n\nKriteria dialisis (TPdG) yang perlu segera di RS:\nAsidosis refrakter pH < 7.1, Hiperkalemia K > 6.5 mEq/L, Edema paru refrakter, Ensefalopati uremikum, Anuria Stadium 3.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'gga-monitoring-edukasi'
    },

    // ============================================================
    // NODE 5: MONITORING & EDUKASI PASCA-GGA
    // ============================================================
    'gga-monitoring-edukasi': {
      id: 'gga-monitoring-edukasi',
      type: 'checklist',
      title: 'Node 5: Monitoring Jangka Panjang & Edukasi Pencegahan GGA Ulang',
      description: 'Setelah GGA teratasi — 10–15% pasien berkembang menjadi CKD dalam 90 hari. Monitoring pasca-GGA sangat penting.',
      items: [
        {
          id: 'mon-lab-kontrol',
          title: '1. Lab Kontrol Setelah Rawat Jalan (Rujuk Lab)',
          description: 'Periksakan ke lab dalam 1–4 minggu pasca episode GGA:\n• Kreatinin serum + hitung eGFR\n• Elektrolit: Kalium, Natrium\n• Urinalisa + rasio albumin-kreatinin\n\nJika eGFR masih < 60 setelah 3 bulan → GGA berkembang menjadi CKD → rujuk nefrologi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'mon-TD-dipantau',
          title: '2. Pantau Tekanan Darah Rutin',
          description: 'GGA meningkatkan risiko hipertensi kronik dan CKD. Pantau TD tiap kunjungan.\nTarget TD pasca-GGA: < 130/80 mmHg.\nJika hipertensi muncul pasca-GGA → mulai antihipertensi (ACEi/ARB — setelah fungsi ginjal stabil, eGFR > 30).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'mon-edukasi-pencegahan',
          title: '3. Edukasi Pencegahan GGA Berulang',
          description: 'Instruksikan:\n• JANGAN minum NSAID (Ibuprofen, Diklofenak, dll) tanpa resep dokter\n• Jaga hidrasi yang cukup — minum 8 gelas air/hari, terutama saat cuaca panas\n• JANGAN minum jamu-jamu tak terstandarisasi\n• Jika mengalami diare/muntah berat → segera ke dokter, jangan tunda\n• Beritahu dokter lain bahwa pernah GGA sebelum diberi obat baru\n• Kontrol penyakit dasar: DM, hipertensi, batu ginjal',
          required: true,
          category: 'documentation'
        },
        {
          id: 'mon-kapan-segera',
          title: '4. Kembali Segera Jika Ada Ini',
          description: 'Instruksikan pasien kembali SEGERA ke klinik/IGD jika:\n• Urin kembali berkurang drastis\n• Bengkak tiba-tiba di kaki atau wajah memburuk\n• Sesak napas saat berbaring\n• Bingung atau tidak sadat\n• Jantung berdebar-debar tidak biasa',
          required: true,
          category: 'safety'
        }
      ]
    }

  },
  references: [
    'PERNEFRI (Perhimpunan Nefrologi Indonesia). Konsensus Tatalaksana Gangguan Ginjal Akut Dewasa. 2023.',
    'KDIGO AKI Work Group. KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl. 2012;2(1):1–138.',
    'KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP. Kemenkes RI. Bab: Gagal Ginjal Akut.',
    'Bellomo R, et al. Acute renal failure – definition, outcome measures, animal models, fluid therapy, and information technology needs. Crit Care. 2004;8(4):R204–R212.',
    'Prowle JR, et al. Fluid balance and acute kidney injury. Nat Rev Nephrol. 2010;6(2):107–115.',
    'Lameire NH, et al. Acute kidney injury: An increasing global concern. Lancet. 2013;382(9887):170–179.'
  ]
};
