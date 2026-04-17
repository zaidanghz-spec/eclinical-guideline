// ============================================================
// TATA LAKSANA KERACUNAN AKUT (INTOKSIKASI)
// REFERENSI UTAMA:
// 1. Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Keracunan Akut,
//    KMK No. HK.01.07/MENKES/633/2023
// 2. Sentra Informasi Keracunan (SIKER) Nasional – Badan POM RI
//    Buku Saku Tatalaksana Keracunan Edisi 2021
// 3. Pedoman Diagnosis & Penatalaksanaan Keracunan – PAPDI 2020
// 4. WHO Model Formulary 2023 – Antidote & Poison Management
// 5. UpToDate Clinical Overview: Approach to the Patient with Poisoning
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const intoksikasiKimiaPathway: DynamicPathway = {
  diseaseId: 'intoksikasi-kimia',
  diseaseName: 'Tata Laksana Keracunan Akut (PNPK Kemenkes 2023)',
  startNodeId: 'tox-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT (First 5 Minutes)
    // ============================================================
    'tox-initial-assessment': {
      id: 'tox-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment IGD — First 5 Minutes!',
      description: 'Semua pasien keracunan akut dimulai dari sini. Prioritas: stabilisasi ABCDE SEBELUM identifikasi racun. Jangan tunda resusitasi untuk menunggu info racun lengkap.',
      items: [
        {
          id: 'tox-abcde-survey',
          title: 'PRIMARY SURVEY — ABCDE STAT',
          description: 'Airway: bersih? gurgling? stridor? Breathing: RR, SpO₂, pergerakan dada simetris? Circulation: HR, BP, CRT, akral? Disability: GCS (Eyes, Verbal, Motor), pupil (miosis/midriasis?), tonus. Exposure: lepas semua pakaian untuk cari luka, rute paparan (kulit, mulut, inhalasi, suntikan?).',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'tox-vital-monitor',
          title: 'Vital Signs STAT + Continuous Monitor',
          description: 'HR, BP, RR, SpO₂, Suhu, GCS. Pasang monitor EKG kontinu (banyak racun menyebabkan aritmia!). Pasang oksimetri nadi dan kapnografi jika tersedia. Ukur GDS: hipoglikemia → D40% IV dulu sebelum semua tindakan lain!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'tox-o2-airway',
          title: 'O₂ Tinggi + Amankan Airway',
          description: 'Berikan O₂ masker 10–15 LPM SEMUA pasien keracunan dengan penurunan kesadaran. Jika GCS ≤8 atau napas tidak adekuat → intubasi segera (RSI). Hindari intubasi nasotrakeal jika ada risiko perdarahan (misalnya keracunan antikoagulan).',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'tox-iv-access-labs',
          title: 'IV Access Large Bore (18G) + Ambil Darah',
          description: '2 jalur IV perifer besar. Ambil darah BERSAMAAN: DL, elektrolit, BUN/Kreatinin, GDS, SGOT/SGPT, AGD (Analisis Gas Darah), Laktat, Paracetamol level (jika dicurigai), Toksinologi urin & serum jika tersedia. Simpan juga 50 mL isi lambung untuk analisis forensik!',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'tox-decon-skin',
          title: 'Dekontaminasi Kulit / Mata — SEGERA',
          description: 'Paparan kulit: Lepas SEMUA pakaian (termasuk perhiasan) → bilas kulit 15–20 menit dengan air mengalir + sabun. Petugas pakai APD (sarung tangan, masker)! Paparan mata: Irigasi mata dengan NaCl 0.9% atau air bersih minimal 15–20 menit, arahkan dari nasal ke lateral. Jangan delay untuk anamnesis dulu!',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'tox-anamnesis-cepat',
          title: 'Anamnesis Cepat — 4 Pertanyaan Kunci',
          description: '(1) ZAT APA? — nama produk, konsentrasi, formulasi. (2) BERAPA BANYAK? — dosis, jumlah, kemasan habis? (3) KAPAN? — waktu paparan, sudah berapa jam? (4) BAGAIMANA? — diminum, dihirup, kulit, suntikan, difus? Tanya keluarga/saksi jika pasien tidak sadar. Cari di sekitar pasien: botol, blister obat, karung pestisida.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'tox-call-siker',
          title: 'Hubungi SIKER Nasional untuk Konsultasi Racun!',
          description: 'SIKER (Sentra Informasi Keracunan) Nasional — BPOM: Telp 1500-533 (24 jam). Berikan info: jenis racun, jumlah, berat badan pasien, kondisi saat ini. SIKER akan berikan panduan antidotum dan tata laksana spesifik berdasarkan data toksikologi Indonesia.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'tox-ekg-aritmia',
          title: 'EKG 12 Sadapan — Banyak Racun Sebabkan Aritmia!',
          description: 'Wajib pada: keracunan obat jantung (digoksin, beta-bloker, CCB, antiaritmia), antidepresan trisiklik (TCA), antihistamin, organofosfat, CO. Cari: QTc memanjang (risiko Torsade!), QRS lebar (TCA!), bradiaritmia, heart block.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'tox-severity-decision'
    },

    // ============================================================
    // NODE 2: SEVERITY DECISION
    // ============================================================
    'tox-severity-decision': {
      id: 'tox-severity-decision',
      type: 'decision',
      title: 'Node 2: Derajat Kegawatan — Immediate Classification',
      description: 'Klasifikasi segera berdasarkan kondisi klinis. BUKAN berdasarkan jenis racun atau dosis. Kondisi klinis menentukan kecepatan tata laksana.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'tox-critical',
          title: 'KRITIS — Tidak Sadar / Henti Napas / Henti Jantung / Kejang',
          description: 'GCS ≤8, henti napas, bradikardi berat, hipotensi persisten, status epileptikus, aritmia mengancam. → Intubasi + resusitasi STAT + antidotum segera!',
          color: 'red',
          nextNodeId: 'tox-resuscitation',
          riskLevel: 'high'
        },
        {
          id: 'tox-severe',
          title: 'BERAT — Simtomatis Tapi Sadar (GCS >8)',
          description: 'Sadar tapi ada gejala sistemik: miosis pupil, hipersalivasi, kejang ringan, aritmia ringan, hipotensi stabil, mual muntah hebat, nyeri perut berat. → Identifikasi toksidrom + antidotum + dekontaminasi GI.',
          color: 'orange',
          nextNodeId: 'tox-toxidrome-id',
          riskLevel: 'medium'
        },
        {
          id: 'tox-mild',
          title: 'RINGAN — Simtomatis Lokal / Asimtomatis',
          description: 'Sadar penuh, tanda vital normal, hanya ada keluhan ringan (mual, gatal, nyeri lokal). Observasi minimal 6 jam, dekontaminasi GI jika tepat indikasi.',
          color: 'green',
          nextNodeId: 'tox-toxidrome-id',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: RESUSCITATION (Pasien Kritis)
    // ============================================================
    'tox-resuscitation': {
      id: 'tox-resuscitation',
      type: 'checklist',
      title: 'Node 3: RESUSCITATION — Pasien Tidak Sadar / Kritis',
      description: 'Stabilisasi ABCDE dulu. Antidotum empiris boleh diberikan WITHOUT mengetahui jenis racun jika toksidrom khas.',
      items: [
        {
          id: 'res-intubasi-rsi',
          title: 'INTUBASI RSI — GCS ≤8 atau Napas Tidak Adekuat',
          description: 'Rapid Sequence Intubation (RSI): Preoksigenasi 3 mnt → Ketamine 1–2 mg/kgBB IV + Succinylcholine 1.5 mg/kgBB IV → intubasi + konfirmasi kapnografi. Jika curiga organofosfat: suksinilkolin dapat memperpanjang kelumpuhan → gunakan Rocuronium 1.2 mg/kgBB sebagai alternatif.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'res-antidotum-empiris',
          title: 'Antidotum EMPIRIS — Berikan Sesuai Toksidrom yang Diduga',
          description: 'Opioid (miosis, bradipnea, tidak sadar) → Nalokson 0.4–2 mg IV/IM, ulangi tiap 2–3 mnt (max 10 mg). Benzodiazepine (depresi SSP) → Flumazenil 0.2 mg IV, ulangi tiap 1 mnt (max 1 mg). Organofosfat (SLUDGE, bradikardi, miosis) → Atropin 2–4 mg IV STAT segera! Antidepresan trisiklik (QRS >120 ms, hipotensi) → NaHCO₃ 1–2 mEq/kgBB IV STAT!',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'res-cairan-syok',
          title: 'Resusitasi Cairan Syok (Bila Ada Hipotensi)',
          description: 'Kristaloid NaCl 0.9% atau RL 10–20 mL/kgBB IV bolus cepat. Ulangi hingga MAP >65 mmHg. Jika tidak respons → vasopressor: Norepinefrin 0.1–0.3 mcg/kgBB/mnt IV (pilihan utama syok vasodilatatif akibat racun). Hindari Dopamin pada keracunan simpatomimetik.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'res-kejang',
          title: 'Tata Laksana Kejang Akibat Racun',
          description: 'Lini 1: Diazepam 0.1–0.3 mg/kgBB IV pelan (max 10 mg) atau Lorazepam 0.1 mg/kgBB IV. Lini 2: Phenobarbital 15–20 mg/kgBB IV pelan. JANGAN gunakan Fenitoin (tidak efektif untuk kejang akibat racun). Kejang refrakter → Propofol 1–2 mg/kgBB + intubasi + ICU.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'res-aritmia',
          title: 'Tata Laksana Aritmia Akibat Racun',
          description: 'QRS lebar (Antidepresan Trisiklik/TCA) → NaHCO₃ 1–2 mEq/kgBB IV, target pH 7.45–7.55. QTc memanjang (>500 ms, Torsade) → MgSO₄ 2 g (8 mmol) IV dalam 10 mnt, perbaiki K⁺ dan Mg²⁺. Bradikardi persisten (Beta-Bloker/CCB) → Kalsium Klorida 10% 10 mL IV + Glukagon 5–10 mcg/kgBB IV. Hindari amiodaron pada keracunan TCA (memperparah QTc).',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'res-icu-admit',
          title: 'Rawat ICU — Monitoring Ketat',
          description: 'Semua pasien kritis keracunan → ICU. Monitor: EKG kontinu, AGD serial, elektrolit serial, fungsi ginjal-hati 6-12 jam. Konsul Toksikologi Klinik / Penyakit Dalam jika tersedia.',
          required: true,
          category: 'action',
          role: 'both',
        }
      ],
      nextNodeId: 'tox-toxidrome-id'
    },

    // ============================================================
    // NODE 4: TOXIDROME IDENTIFICATION
    // ============================================================
    'tox-toxidrome-id': {
      id: 'tox-toxidrome-id',
      type: 'decision',
      title: 'Node 4: Identifikasi Toksidrom — Racun Apa Yang Terlibat?',
      description: 'Toksidrom = kumpulan tanda klinis khas akibat jenis racun tertentu. Identifikasi toksidrom → tentukan antidotum spesifik. Satu pasien bisa punya >1 toksidrom jika campuran racun.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'tox-cholinergic',
          title: 'KOLINERGIK — Organofosfat / Pestisida / Karbamat / Jamur Muscarin',
          description: 'SLUDGE/DUMBELS: Salivasi berlebih, Lakrimasi, Urinasi, Defekasi, emesis/muntah, Bradikardi, Bronkospasme, Keringat berlebih, miosis, Fasikulasi otot. Paling mematikan dari pertanian Indonesia!',
          color: 'green',
          nextNodeId: 'tox-organophosphate',
          riskLevel: 'high'
        },
        {
          id: 'tox-anticholinergic',
          title: 'ANTIKOLINERGIK — Antihistamin / Atropin Berlebih / Jimsonweed / Beberapa Antidepresan',
          description: 'Mad as a hatter (delirium), Blind as a bat (midriasis), Red as a beet (flushing), Hot as a hare (hipertermi), Dry as a bone (kulit kering, tidak berkeringat), Tachycardia, retensi urin.',
          color: 'orange',
          nextNodeId: 'tox-anticholinergic-mgmt',
          riskLevel: 'medium'
        },
        {
          id: 'tox-opioid-sedatif',
          title: 'OPIOID / SEDATIF — Morfin / Metadon / Diazepam / Opioid Palsu / Pil Koplo',
          description: 'Depresi SSP (GCS turun), miosis (pinpoint pupils), bradipnea (<12×/mnt), bradikardia, hipotensi. Indonesia: penyalahgunaan tramadol, kodein, dan "pil koplo" (PCC, Riklona).',
          color: 'purple',
          nextNodeId: 'tox-opioid-mgmt',
          riskLevel: 'high'
        },
        {
          id: 'tox-korosif-path',
          title: 'KOROSIF — Asam / Basa Kuat / Pemutih / Air Keras',
          description: 'Luka bakar mulut-kerongkongan, nyeri menelan hebat, hipersalivasi, stridor (edema laring), nyeri epigastrium hebat. Di Indonesia: sering air keras (HCl/H₂SO₄), cairan pemutih (NaOCl), atau bahan kimia rumah tangga.',
          color: 'red',
          nextNodeId: 'tox-korosif',
          riskLevel: 'high'
        },
        {
          id: 'tox-methanol-path',
          title: 'METANOL / ETILEN GLIKOL — Miras Oplosan / Cairan Pendingin',
          description: 'Miras oplosan Indonesia! Fase laten 6–24 jam → penglihatan kabur (snowfield vision), nyeri perut, asidosis metabolik berat (anion gap tinggi), cedera retina. Etilen glikol: gagal ginjal akut.',
          color: 'blue',
          nextNodeId: 'tox-methanol',
          riskLevel: 'high'
        },
        {
          id: 'tox-paracetamol-path',
          title: 'PARASETAMOL / ASETAMINOFEN — Overdosis / Usaha Bunuh Diri',
          description: 'Mual muntah 0–24 jam → asimtomatis 24–72 jam (FASE PALING BAHAYA karena tidak terasa) → gagal hati 72–96 jam. Kasus bunuh diri terbanyak dengan parasetamol di Indonesia!',
          color: 'yellow',
          nextNodeId: 'tox-paracetamol',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 5: ORGANOFOSFAT / PESTISIDA
    // Ref: PNPK Kemenkes + WHO Pesticide Poisoning Guidelines 2008
    // ============================================================
    'tox-organophosphate': {
      id: 'tox-organophosphate',
      type: 'checklist',
      title: 'Node 5: Keracunan Organofosfat / Pestisida — PNPK Kemenkes',
      description: 'Penyebab kematian pestisida terbanyak di Indonesia (sawah, kebun). Target: "ATROPINISASI" — bukan overdosis atropin. Progresif dan cepat mematikan jika tidak ditangani dalam jam pertama.',
      items: [
        {
          id: 'op-dekontaminasi-wajib',
          title: 'DEKONTAMINASI SEGERA — Jangan Tunda untuk Antidotum!',
          description: 'Semua petugas wajib APD (sarung tangan, apron, masker). Lepas semua pakaian dan sepatu pasien → bagging. Bilas kulit dengan sabun + air mengalir 15–20 menit. Bilas mata jika ada paparan. Pasien yang tidak didekontaminasi dapat meracuni petugas IGD!',
          required: true,
          category: 'safety',
          role: 'both',
        },
        {
          id: 'op-atropin-stat',
          title: 'ATROPIN IV — SEGERA, Titrasi Sampai "Paru Kering"',
          description: 'Dosis AWAL: Dewasa 2–4 mg IV bolus. Anak 0.05 mg/kgBB IV. ULANGI setiap 5–10 menit, GANDAKAN dosis jika tidak respons. Target BUKAN denyut jantung atau midriasis, tapi: PARU KERING (tidak ada ronki/sekret, RR normal, SpO₂ ≥94%, tidak ada wheezing). Dosis total bisa 10–50 mg dalam kasus berat. Jangan takut dosis tinggi jika masih ada sekret paru!',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'op-atropin-target',
          title: 'Target Atropinisasi — BUKAN Flushing/Midriasis/Takikardia',
          description: 'Atropinisasi BERHASIL jika: Sekret paru bersih (auskultasi bersih), SpO₂ normal, RR normal, tidak ada hipersalivasi. BUKAN target: midriasis (boleh tetap miosis), flushing, HR >100 (sudah over-atropinisasi jika HR >120 tanpa hypers ekret). Jangan hentikan atropin sampai sekret paru benar-benar hilang!',
          required: true,
          category: 'action',
          role: 'both',
        },
        {
          id: 'op-pralidoksim',
          title: '2-PAM (Pralidoksin) — Reaktivator AChE, Berikan Segera!',
          description: 'Dosis: 1–2 g IV dalam 100 mL NaCl 0.9% selama 15–30 mnt. Kemudian infus 200–500 mg/jam. HARUS diberikan DALAM 24–48 JAM pertama (sebelum "aging"/ikatan permanen terjadi). Setelah 48 jam: tidak efektif. Di Indonesia: tidak selalu tersedia → prioritaskan atropin. Jika tidak ada 2-PAM: maksimalkan atropinisasi.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'op-gastric-lavage',
          title: 'Bilas Lambung — Jika Ingesti Oral <1–2 Jam',
          description: 'Pasang NGT (25–28 Fr) dan pastikan airway aman (intubasi jika GCS rendah). Bilas dengan NaCl 0.9% atau air bersih 200–300 mL per siklus hingga jernih. Kontraindikasi bilas lambung: tanda korosif (bukan organofosfat murni), tidak bisa proteksi airway.',
          required: false,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'op-kontraindikasi',
          title: 'HINDARI: Morfin, Suksinilkolin, Fenotiazin!',
          description: 'DILARANG: Morfin/opioid (depresi napas). Suksinilkolin untuk intubasi (organofosfat inhibisi asetilkolinesterase → lumpuh berkepanjangan, gunakan Rocuronium 1.2 mg/kg). Fenotiazin (antiemetik berbasis klorpromazin → menurunkan ambang kejang). Furosemid (bukan edema, tapi sekret bronkus).',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'op-icu-monitoring',
          title: 'ICU Monitoring + Evaluasi Intermediate Syndrome',
          description: 'Rawat ICU minimal 24–72 jam. Awasi "Intermediate Syndrome" (hari ke-1 sampai 4): kelemahan otot proksimal, paralisis otot napas, meski sudah teratropinisasi baik. Cek aktivitas kolinesterase plasma (ChE): nilai <25% normal = intoksikasi berat. Evaluasi serial setiap 6–12 jam.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'tox-general-monitoring'
    },

    // ============================================================
    // NODE 6: ANTIKOLINERGIK
    // Ref: PNPK Kemenkes + UpToDate Anticholinergic Toxidrome
    // ============================================================
    'tox-anticholinergic-mgmt': {
      id: 'tox-anticholinergic-mgmt',
      type: 'checklist',
      title: 'Node 6: Keracunan Antikolinergik / Sindrom Antikolinergik',
      description: 'Kebalikan kolinergik. Kulit panas kering, midriasis, retensi urin, delirium, takikardia. Sumber: antihistamin (prometazin, difenhidramin), atropin berlebih, beberapa tanaman (Datura).',
      items: [
        {
          id: 'ac-suportif-utama',
          title: 'Tata Laksana Suportif — Prioritas Utama',
          description: 'Ruangan sejuk & gelap (photophobia!). Sedasi benzodiazepine jika agitasi berat (Diazepam 5–10 mg IV pelan). Monitor suhu (hipertermia sampai 41°C → kompres, cooling blanket). Kateter urin (retensi urin). Cairan IV (hidrasi).',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'ac-fisostigmin',
          title: 'Fisostigmin — Antidotum Antikolinergik (Hanya Jika Tepat Indikasi)',
          description: 'Fisostigmin 1–2 mg IV pelan (>5 mnt). HANYA jika: delirium parah yang tidak respons benzodiazepin, hipertermia berat, atau takikardia >150 bpm mengancam. JANGAN jika: QRS >100 ms (risiko asistol!), curiga TCA (antidepresan trisiklik). Tidak tersedia umum di Indonesia — konsul spesialis.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ac-monitoring-qrs',
          title: 'Monitor EKG Ketat — Waspadai QRS Lebar (TCA!)',
          description: 'Antikolinergik murni (antihistamin) → QRS sempit. Jika QRS >100 ms → curiga TCA! Berikan NaHCO₃ 1–2 mEq/kgBB IV jika QRS lebar. Jangan berikan fisostigmin pada TCA → dapat sebabkan asistol.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'tox-general-monitoring'
    },

    // ============================================================
    // NODE 7: OPIOID / SEDATIF
    // Ref: PNPK Kemenkes + WHO Guidelines on Opioid Overdose 2014
    // ============================================================
    'tox-opioid-mgmt': {
      id: 'tox-opioid-mgmt',
      type: 'checklist',
      title: 'Node 7: Keracunan Opioid / Sedatif — Nalokson STAT!',
      description: 'Keracunan opioid (termasuk pil koplo, tramadol, kodein, dan fentanil ilegal). Trias: miosis, bradipnea, penurunan kesadaran. Nalokson adalah antidotum spesifik dan efektif dalam menit!',
      items: [
        {
          id: 'op2-nalokson-im-iv',
          title: 'NALOKSON — Antidotum Opioid STAT!',
          description: 'Dosis dewasa: 0.4–2 mg IV/IM/IN (intranasal). Onset IV: 2 mnt. Onset IM/IN: 5 mnt. ULANGI tiap 2–3 mnt jika tidak respons (max 10 mg). Jika tidak ada IV → IM di deltoid atau SC bersamaan beberapa titik untuk absorpsi cepat. Half-life NALOKSON (30–60 mnt) JAUH LEBIH PENDEK dari opioid → awasi re-narkosis! Infus nalokson: ⅔ dosis respons awal per jam.',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'op2-obs-renarcos',
          title: 'Observasi Minimal 4–6 Jam untuk Re-Narkosis',
          description: 'Nalokson habis efek → opioid masih ada → pasien bisa tidak sadar lagi (re-narkosis). Opioid long-acting (metadon, slow-release morfin) → perlu observasi 12–24 jam atau infus nalokson kontinu. Jangan pulangkan pasien dalam 6 jam pertama!',
          required: true,
          category: 'safety',
          role: 'both',
        },
        {
          id: 'op2-benzodiazepine',
          title: 'Jika Benzodiazepine (BZD) — Flumazenil HATI-HATI!',
          description: 'Flumazenil 0.2 mg IV pelan, ulangi 0.1 mg tiap 1 mnt (max 1 mg). KONTRAINDIKASI flumazenil: Pasien epilepsi rutin (dapat memicu kejang), ketergantungan BZD kronik (withdrawal seizure!), overdosis campuran BZD+TCA. Jika ada keraguan → prioritaskan supportif dan airway, bukan flumazenil.',
          required: false,
          category: 'medication',
          role: 'nurse',
        }
      ],
      nextNodeId: 'tox-general-monitoring'
    },

    // ============================================================
    // NODE 8: KOROSIF (Asam / Basa Kuat)
    // Ref: PNPK Kemenkes IS 1.19 + AAPCC Guidelines
    // ============================================================
    'tox-korosif': {
      id: 'tox-korosif',
      type: 'checklist',
      title: 'Node 8: Cedera Korosif — Asam / Basa Kuat',
      description: 'Penyebab: air keras (HCl, H₂SO₄), NaOH, cairan pemutih (NaOCl), obat pembasmi karat. JANGAN induksi muntah, jangan bilas lambung, jangan arang aktif!',
      items: [
        {
          id: 'cor-airway-priority',
          title: 'AIRWAY — Prioritas Absolut! (Sering Edema Laring Cepat!)',
          description: 'Stridor atau perubahan suara = edema laring sedang berkembang → intubasi segera sebelum airway tertutup total! Jika sudah tersumbat → krikotirotomi atau trakeostomi darurat. Jangan tunggu sampai stridor parah!',
          required: true,
          category: 'action',
          role: 'both',
        },
        {
          id: 'cor-npo-strict',
          title: 'NPO KETAT — Dilarang Apapun Per Oral!',
          description: 'DILARANG: Susu (MITOS!), air, makanan, apapun per oral. Bisa memperluas luka dan menyebabkan aspirasi. Pasang NGT drainase hanya setelah endoskopi (Rujuk RS) konfirmasi tidak ada perforasi.',
          required: true,
          category: 'safety',
          role: 'doctor',
        },
        {
          id: 'cor-no-lavage-charcoal',
          title: 'DILARANG: Bilas Lambung + Arang Aktif + Induktor Muntah!',
          description: 'MUTLAK DILARANG! Bilas lambung: re-ekspos esofagus, risiko perforasi. Arang aktif: tidak efektif untuk korosif, menghalangi endoskopi (Rujuk RS). Induktor muntah (syrup ipecac): muntah paksa dapat perforasi esofagus yang sudah cedera. 3 larangan ini BEDA dengan keracunan obat lainnya!',
          required: true,
          category: 'safety',
          role: 'doctor',
        },
        {
          id: 'cor-endoskopi (Rujuk RS)',
          title: 'Endoskopi (Rujuk RS) (EGD) dalam 12–24 Jam — Grading Zargar',
          description: 'Endoskopi (Rujuk RS) fleksibel dalam 12–24 jam untuk: Grading kerusakan (Zargar 0–IIIb), prediksi striktur esofagus, tentukan kebutuhan operasi. Jangan endoskopi (Rujuk RS) jika >48 jam (risiko perforasi meningkat) atau perforasi sudah dicurigai (foto toraks: pneumomediastinum?).',
          required: true,
          category: 'action',
          role: 'doctor',
        },
        {
          id: 'cor-proton-pump',
          title: 'PPI IV + Sucralfat + Antibiotik Profilaksis',
          description: 'Omeprazol 40 mg IV tiap 12 jam (proteksi mukosa). Sucralfat suspensi 1 g 4× sehari jika bisa menelan. Antibiotik profilaksis (amoksisilin-klavulanat atau sefazolin IV) jika grade ≥IIb (luka dalam). Steroid TIDAK terbukti efektif (kontroversi) — tidak direkomendasikan rutin.',
          required: true,
          category: 'medication',
          role: 'doctor',
        }
      ],
      nextNodeId: 'tox-general-monitoring'
    },

    // ============================================================
    // NODE 9: METANOL / ETILEN GLIKOL — Miras Oplosan
    // Ref: PNPK Kemenkes + WHO Technical Report Series + PAPDI 2020
    // ============================================================
    'tox-methanol': {
      id: 'tox-methanol',
      type: 'checklist',
      title: 'Node 9: Keracunan Metanol / Miras Oplosan — PNPK Kemenkes',
      description: 'Miras oplosan bercampur metanol industrial. Fase laten tipuan: pasien tampak hanya mabuk biasa, lalu 6–24 jam kemudian → buta, asidosis berat, kematian. Kematian bisa dicegah jika antidotum diberikan di fase laten!',
      items: [
        {
          id: 'meth-agd-anion-gap',
          title: 'AGD + Anion Gap — Kunci Diagnosis Metanol!',
          description: 'Anion Gap = Na - (Cl + HCO₃). Normal <12 mEq/L. Metanol: Anion Gap tinggi (>20) + asidosis metabolik berat. Hitung juga Osmol Gap = Osmolalitas terukur - Osmolalitas teritung. Osmol Gap >10 → curiga alkohol toksik. Lab jika tersedia: kadar metanol serum (>25 mEq → terapi, >50 mEq → dialisis).',
          required: true,
          category: 'assessment',
          role: 'doctor',
        },
        {
          id: 'meth-antidotum',
          title: 'ANTIDOTUM: Etanol atau Fomepizol — Blokir Metabolisme Metanol',
          description: 'Etanol ORAL (tersedia di Indonesia, lebih terjangkau): Dosis loading 0.8 g/kgBB oral (whisky/vodka 40% = 2 mL/kgBB). Target etanol serum 100–150 mg/dL. Rumatan 0.1 g/kgBB/jam. Etanol IV (etanol 10% dalam D5W): 7.6 mL/kgBB loading, rumatan 1–2 mL/kgBB/jam. Fomepizol IV (4-MP, jika tersedia): 15 mg/kgBB IV loading → 10 mg/kgBB tiap 12 jam. Pilihan superior tapi sangat mahal. Berikan antidotum SEBELUM menunggu konfirmasi kadar metanol serum!',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'meth-folat',
          title: 'Folinat (Asam Folat / Leucovorin) — Percepat Eliminasi Format',
          description: 'Asam folat 50 mg IV tiap 6 jam atau Leucovorin 1 mg/kgBB IV tiap 4–6 jam. Membantu metabolisme asam format (formiat) → CO₂ + H₂O. Diteruskan hingga metanol serum tidak terdeteksi.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'meth-bikarbonat',
          title: 'Koreksi Bikarbonat — Jika pH <7.30',
          description: 'NaHCO₃ 1–2 mEq/kgBB IV jika pH <7.30 atau HCO₃⁻ <10 mEq/L. Target pH ≥7.35. Koreksi asidosis meningkatkan eliminasi formiat. Monitor elektrolit serial.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'meth-hemodialisis',
          title: 'HEMODIALISIS — Indikasi Mutlak dan Segera!',
          description: 'Indikasi HD: pH <7.25–7.30, gangguan penglihatan apapun (buta sebagian/total), kadar metanol >50 mg/dL (>15.6 mmol/L), atau gagal terapi konservatif. HD: bersihkan metanol dan formiat secara efisien. Lanjutkan etanol SELAMA HD (HD membersihkan etanol juga). Hubungi pusat HD terdekat SEGERA jika ada indikasi!',
          required: true,
          category: 'action',
          role: 'doctor',
        }
      ],
      nextNodeId: 'tox-general-monitoring'
    },

    // ============================================================
    // NODE 10: PARASETAMOL OVERDOSIS
    // Ref: PNPK Kemenkes + Acetaminophen Toxicity — UpToDate 2024
    //      Rumack-Matthew Nomogram
    // ============================================================
    'tox-paracetamol': {
      id: 'tox-paracetamol',
      type: 'checklist',
      title: 'Node 10: Overdosis Parasetamol — NAC SEGERA (<8 Jam)!',
      description: 'Kasus overdosis paling sering dalam usaha bunuh diri di Indonesia. BERBAHAYA karena "silent" — asimtomatis 24–72 jam, lalu gagal hati fatal. Efektif dicegah jika NAC diberikan <8–10 jam!',
      items: [
        {
          id: 'para-waktu-ingesti',
          title: 'Konfirmasi Waktu Ingesti — Kunci Keputusan!',
          description: 'Tanya dengan pasti: jam berapa minum obat? Berapa banyak? (hitung total mg atau jumlah butir). Ingesti <8 jam: peluang NAC maksimal. 8–24 jam: NAC masih efektif. >24 jam: NAC tetap berikan, fungsi hati mungkin sudah terdampak. Waktu tidak diketahui → anggap terburuk, mulai NAC.',
          required: true,
          category: 'assessment',
          role: 'doctor',
        },
        {
          id: 'para-level-serum',
          title: 'Kadar Parasetamol Serum (4 Jam Post-Ingesti) + Nomogram Rumack-Matthew',
          description: 'Periksa kadar parasetamol serum minimal 4 jam setelah ingesti. Plot di Nomogram Rumack-Matthew: Zona "Treatment" (di atas garis) → NAC wajib. Zona "No Treatment" (di bawah garis) → observasi. Jika lab tidak tersedia dalam 4 jam → mulai NAC empiris jika dosis ingesti >150 mg/kgBB atau >7.5 g dewasa.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'para-nac-iv',
          title: 'N-ACETYLCYSTEINE (NAC) — Antidotum Spesifik, Efektif <8 Jam',
          description: 'NAC IV (lebih disukai): Dosis 3 kantong — (1) 150 mg/kgBB dalam D5W 200 mL, infus 1 jam; (2) 50 mg/kgBB dalam D5W 500 mL, infus 4 jam; (3) 100 mg/kgBB dalam D5W 1000 mL, infus 16 jam. Total 21 jam. NAC ORAL (jika IV tidak tersedia): 140 mg/kgBB loading → 70 mg/kgBB tiap 4 jam (17 dosis). Diminum diencerkan, sering menyebabkan mual → antiemetik dulu.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'para-arang-aktif',
          title: 'Arang Aktif (Activated Charcoal) — Jika Ingesti <1–2 Jam',
          description: 'Dosis: 50–100 g dewasa, 1 g/kgBB anak. Efektif hanya jika <1 jam (idealnya) atau <2 jam dari ingesti. Jangan berikan jika: GCS turun (risiko aspirasi), pasien muntah hebat, setelah N-acetylcysteine oral (mengurangi absorpsi NAC).',
          required: false,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'para-fungsi-hati-serial',
          title: 'Monitor Fungsi Hati Serial — ALT/AST Tiap 12–24 Jam',
          description: 'Baseline SGPT/SGOT saat masuk. Ulangi 24 jam, 48 jam, 72 jam. ALT/SGPT >1000 IU/L: hepatotoksisitas signifikan → pertimbangkan transplantasi hati. Tanda gagal hati berat: INR >6.5, kreatinin >300 µmol/L (Kriteria Kings College → transplantasi!). Konsul Gastro-Hepatologi segera.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'para-psikiatri',
          title: 'Konsul Psikiatri — WAJIB pada Kasus Usaha Bunuh Diri',
          description: 'Semua kasus overdosis disengaja (OD bunuh diri) → WAJIB konsul psikiatri setelah kondisi medis stabil. Jangan discharge tanpa evaluasi psikiatri. Libatkan keluarga. Pastikan keamanan pasien.',
          required: true,
          category: 'documentation',
          role: 'both',
        }
      ],
      nextNodeId: 'tox-general-monitoring'
    },

    // ============================================================
    // NODE 11: GENERAL MONITORING & DISPOSITION
    // ============================================================
    'tox-general-monitoring': {
      id: 'tox-general-monitoring',
      type: 'checklist',
      title: 'Node 11: Monitoring Lanjutan & Kriteria Perawatan',
      description: 'Stabilisasi pasca resusitasi awal selesai. Tentukan level of care dan rencana monitoring selanjutnya.',
      items: [
        {
          id: 'gm-icu-criteria',
          title: 'Kriteria ICU / HCU',
          description: 'Rawat ICU jika: butuh intubasi/ventilator, kejang berulang, GCS <12 persisten, asidosis metabolik berat (pH <7.2), aritmia mengancam, hipotensi refrakter, atau keracunan dengan potensi memburuk cepat (organofosfat, metanol, TCA). HCU jika monitoring ketat diperlukan tapi belum/belum perlu ventilator.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'gm-lab-serial',
          title: 'Lab Serial Wajib per 6–12 Jam',
          description: 'AGD, elektrolit (K⁺, Na⁺, Mg²⁺), BUN/Kreatinin (fungsi ginjal), SGOT/SGPT (fungsi hati), DL, GDS. Frekuensi bergantung derajat keracunan dan antidotum yang diberikan. Monitor koagulopati pada keracunan hepatotoksik.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'gm-specimen',
          title: 'Simpan Spesimen Forensik — Penting untuk Hukum!',
          description: 'Simpan: Urin 100 mL (pertama kali kateter), Darah 10 mL (tube merah, tanpa preservatif), Isi lambung 50 mL (jika bilas lambung dilakukan), Botol/kemasan racun yang ditemukan di sekitar pasien. Labeli dengan nama+tanggal+jam. Serahkan ke laboratorium toksikologi/forensik dengan berita acara. Penting untuk kasus hukum/kekerasan!',
          required: true,
          category: 'documentation',
          role: 'both',
        },
        {
          id: 'gm-psikiatri-sosial',
          title: 'Evaluasi Psikiatri + Asesmen Sosial — Jika Intensional',
          description: 'Konsul psikiatri wajib pada semua kasus overdosis intensional (bunuh diri). Libatkan pekerja sosial untuk asesmen situasi keluarga. Jangan discharge sebelum psikiatri memberikan clearance. Crisis plan dan support network keluarga.',
          required: true,
          category: 'documentation',
          role: 'nurse',
        },
        {
          id: 'gm-discharge-criteria',
          title: 'Kriteria Discharge / Rawat Jalan',
          description: 'Safe to discharge jika: GCS normal 15, tanda vital stabil 12 jam terakhir, tidak ada keluhan baru, lab dalam batas aman, tidak ada risiko rekurensi keracunan, dan evaluasi psikiatri sudah dilakukan (jika kasus intentional). Edukasi keluarga tentang pencegahan paparan ulang.',
          required: true,
          category: 'documentation',
          role: 'nurse',
        }
      ]
    }

  },
  references: [
    'Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Keracunan Akut. KMK No. HK.01.07/MENKES/633/2023. Kementerian Kesehatan Republik Indonesia.',
    'Sentra Informasi Keracunan (SIKER) Nasional – Direktorat Pelayanan Kefarmasian, BPOM RI. Buku Saku Tatalaksana Keracunan. Edisi 2021. Hotline 1500-533.',
    'Pedoman Diagnosis dan Penatalaksanaan Keracunan. Perhimpunan Dokter Penyakit Dalam Indonesia (PAPDI). 2020.',
    'Buku Pedoman Penanganan Gigitan dan Sengatan Hewan Berbisa dan Keracunan Tumbuhan. Direktorat Pelayanan Kesehatan Rujukan, Kemenkes RI. 2023.',
    'World Health Organization (WHO). Pesticides and Health. Acute Pesticide Poisoning: A Proposed Classification Tool. WHO Technical Report Series. 2008.',
    'World Health Organization (WHO). Community Management of Opioid Overdose. WHO Guidelines. 2014.',
    'Rumack BH, Matthew H. Acetaminophen poisoning and toxicity. Pediatrics. 1975;55(6):871–876. (Rumack-Matthew Nomogram).',
    'Mégarbane B, et al. Antidotes for toxicological emergencies: A practical guide. American Journal of Emergency Medicine. 2024.',
    'Chiew AL, et al. Guidelines on the management of acetaminophen overdose. Australian and New Zealand guidelines. 2020.',
    'Kraut JA, et al. Toxic alcohol ingestions: clinical features, diagnosis, and management. Clin J Am Soc Nephrol. 2008;3(1):208–225.'
  ]
};
