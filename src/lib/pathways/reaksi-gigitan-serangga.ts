// ============================================================
// TATA LAKSANA REAKSI GIGITAN & SENGATAN SERANGGA
// REFERENSI UTAMA:
// 1. KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
//    Bab: "Reaksi Gigitan Serangga" & "Anafilaksis"
// 2. Pedoman Penanganan Gigitan, Sengatan Hewan Berbisa &
//    Keracunan Tumbuhan. Kemenkes RI. 2023.
// 3. Panduan Anafilaksis – World Allergy Organization (WAO) 2020
// 4. Simons FER, et al. WAO Guideline for the Assessment &
//    Management of Anaphylaxis. WAO Journal. 2011.
// 5. Pumphrey RS. Fatal posture in anaphylactic shock. J Allergy
//    Clin Immunol. 2003 (supine position evidence)
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const insectBitePathway: DynamicPathway = {
  diseaseId: 'reaksi-gigitan-serangga',
  diseaseName: 'Reaksi Gigitan & Sengatan Serangga (KMK 1186/2022 + Kemenkes 2023)',
  startNodeId: 'ib-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT (First 5 Minutes)
    // ============================================================
    'ib-initial-assessment': {
      id: 'ib-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — First 5 Minutes!',
      description: 'Semua pasien gigitan/sengatan serangga: nilai kecepatan! Reaksi anafilaktik bisa fatal dalam 15–30 menit. Mulai dari tanda bahaya, bukan dari anamnesis.',
      items: [
        {
          id: 'ib-abcde-survey',
          title: 'PRIMARY SURVEY — ABCDE STAT',
          description: 'Airway: stridor? angioedema lidah/leher? suara serak? Breathing: wheeze, dyspnea, SpO₂? Circulation: HR, BP, akral dingin? CRT >3 dtk? Disability: GCS, gelisah? Exposure: lokasi gigitan/sengatan, jumlah sengatan (sengatan >10 = risiko toksik sistemik!), jenis serangga jika diketahui.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ib-vital-monitor',
          title: 'Vital Signs STAT + Continuous Monitor',
          description: 'HR (takikardia awal pada anafilaksis), BP (hipotensi = syok anafilaktik), RR, SpO₂, Suhu. Pasang oksimetri nadi segera. Catat waktu gigitan/sengatan vs waktu gejala pertama → menentukan kecepatan progresi.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ib-tanda-anafilaksis-screen',
          title: 'SCREEN ANAFILAKSIS — CRITICAL ASSESSMENT!',
          description: 'Anafilaksis JIKA ada ≥2 dari sistem berikut, atau hipotensi saja setelah paparan alergen: (1) Kulit/mukosa: urtikaria generalisata, angioedema, flushing. (2) Respirasi: stridor, wheeze, dispnea, SpO₂ turun. (3) Sirkulasi: hipotensi SBP <90 mmHg, sinkop. (4) GI: mual/muntah/nyeri perut mendadak. (5) Neurologi: pusing berat, altered consciousness. SATU GEJALA HIPOTENSI SAJA = ANAFILAKSIS jika setelah paparan alergen!',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'ib-identifikasi-serangga',
          title: 'Identifikasi Serangga & Lokasi Luka',
          description: 'Jenis serangga: Lebah/tawon (Vespa affinis — paling berbahaya di Indonesia), nyamuk, semut api (Solenopsis invicta), kecoa, tungau, kutu, laba-laba, kalajengking. Cari: sengat yang tertinggal (lebah madu = sengat dengan kantung racun), jumlah luka, pola luka (tunggal vs multipel). Sengatan multipel Vespa + reaksi sistemik = LIFE-THREATENING!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ib-anamnesis-alergi',
          title: 'Anamnesis Cepat — Riwayat Alergi & Atopi',
          description: 'Pernah reaksi berat sengatan sebelumnya? Riwayat asma, rinitis alergi, eksim (atopi → risiko anafilaksis lebih tinggi)? Sedang minum beta-bloker (memperparah anafilaksis dan mengurangi respons epinefrin!)? Sedang hamil? Punya epipen auto-injector? Riwayat keluarga dengan alergi venom lebah?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ib-iv-access',
          title: 'IV Access Large Bore (18G) — Semua Pasien Simtomatis',
          description: 'Pasang IV segera pada semua pasien dengan gejala sistemik apapun. 2 jalur IV jika ada tanda anafilaksis. Ambil darah: DL, triptase serum (dalam 1–2 jam pasca reaksi, jika tersedia = biomarker anafilaksis terbaik).',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'ib-o2-prep',
          title: 'Siapkan O₂ + Crash Cart + Epinefrin SIAP di Tangan',
          description: 'O₂ masker 6–10 LPM siap pakai. Siapkan EPINEFRIN 1:1000 di tangan sebelum semua assessment selesai (jangan cari-cari ketika pasien sudah kolaps!). Crash cart dan defibrillator standby. Posisi pasien: supine + kaki dielevasikan (kecuali ada distres napas berat/angioedema → semi-duduk).',
          required: true,
          category: 'safety',
          role: 'nurse',
        }
      ],
      nextNodeId: 'ib-severity-decision'
    },

    // ============================================================
    // NODE 2: SEVERITY DECISION
    // ============================================================
    'ib-severity-decision': {
      id: 'ib-severity-decision',
      type: 'decision',
      title: 'Node 2: Klasifikasi Reaksi — Lokal, Sedang-Berat, atau Anafilaksis?',
      description: 'Klasifikasi menentukan kecepatan dan jenis tindakan. Jangan tunda epinefrin pada anafilaksis!',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ib-anaphylaxis',
          title: 'ANAFILAKSIS / SYOK ANAFILAKTIK — EPINEFRIN IM SEGERA!',
          description: 'Reaksi sistemik berat: hipotensi, stridor/angioedema, bronkospasme, urtikaria generalisata + satu sistem lain. Syok: SBP <90 + penurunan kesadaran. JANGAN TUNDA — epinefrin IM dalam 1 menit pertama!',
          color: 'red',
          nextNodeId: 'ib-anaphylaxis-management',
          riskLevel: 'high'
        },
        {
          id: 'ib-systemic-moderate',
          title: 'REAKSI SISTEMIK SEDANG — Ada Gejala Sistemik Tanpa Syok',
          description: 'Ada satu sistem terlibat (mis. hanya urtikaria luas + mual, atau hanya wheeze + nyeri perut), BP masih normal. Pertimbangkan epinefrin IM profilaktik jika progresi cepat!',
          color: 'orange',
          nextNodeId: 'ib-systemic-management',
          riskLevel: 'medium'
        },
        {
          id: 'ib-local-only',
          title: 'REAKSI LOKAL — Hanya di Sekitar Luka Gigitan/Sengatan',
          description: 'Nyeri, eritema, edema, urtikaria terbatas di area luka. Tidak ada gejala sistemik. Tanda vital normal. Ukuran normal reaksi lokal lebah: diameter ≤10 cm. Large local reaction (LLR): >10 cm, berlangsung >24 jam, tidak berbahaya.',
          color: 'green',
          nextNodeId: 'ib-local-management',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: ANAPHYLAXIS MANAGEMENT (EMERGENCY!)
    // Ref: WAO Guideline 2020 + KMK 1186/2022
    // ============================================================
    'ib-anaphylaxis-management': {
      id: 'ib-anaphylaxis-management',
      type: 'checklist',
      title: 'Node 3: ANAFILAKSIS — Epinefrin IM STAT! (WAO Guideline 2020)',
      description: 'Epinefrin IM adalah satu-satunya terapi lini pertama anafilaksis. Antihistamin dan steroid BUKAN lini pertama — keduanya terlalu lambat untuk mencegah kematian. Jangan tunda epinefrin!',
      items: [
        {
          id: 'ana-epinefrin-im-stat',
          title: 'EPINEFRIN IM — SEGERA, TANPA DELAY! (Lini Pertama Satu-Satunya)',
          description: 'Epinefrin (Adrenalin) 1:1000 (= 1 mg/mL). Dosis: Dewasa 0.3–0.5 mg IM | Anak ≥30 kg: 0.3 mg IM | Anak <30 kg: 0.01 mg/kgBB IM (max 0.3 mg). Suntik di 1/3 anterolateral tengah paha (bukan deltoid — absorpsi lebih lambat!). Berikan MELALUI baju jika perlu. Ulangi tiap 5–15 MENIT jika tidak ada perbaikan. Tidak ada kontraindikasi epinefrin pada anafilaksis — lebih baik memberikan daripada menahan!',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ana-posisi-supine',
          title: 'Posisi Supine + Elevasi Kaki (KRITIS!)',
          description: 'SEGERA rebahkan pasien dalam posisi supine dengan kaki dielevasi (Trendelenburg modifikasi). Jangan biarkan pasien duduk/berdiri tiba-tiba → "empty aorta syndrome" (kematian mendadak saat perubahan posisi). Jika distres napas berat/angioedema → semi-duduk. Ibu hamil → miring ke kiri.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'ana-o2-highflow',
          title: 'O₂ High Flow — Masker 10–15 LPM',
          description: 'O₂ masker non-rebreather 10–15 LPM. Target SpO₂ ≥94%. Jika ada stridor berat/angioedema laring berkembang cepat → persiapkan intubasi atau krikotirotomi darurat. Jangan biarkan pasien sendirian saat O₂ dipasang!',
          required: true,
          category: 'action',
          role: 'both',
        },
        {
          id: 'ana-cairan',
          title: 'Resusitasi Cairan IV — Jika Hipotensi',
          description: 'NaCl 0.9% 1–2 L IV bolus cepat (dewasa) atau 10–20 mL/kgBB (anak) jika hipotensi. Ulangi bolus sampai BP membaik. Cairan dapat diberikan bersamaan dengan epinefrin IM. Jika tidak respons → epinefrin IV infus 0.1–1 mcg/kgBB/mnt (ICU setting).',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'ana-bronkospasme',
          title: 'Bronkospasme / Wheeze — Nebulisasi Salbutamol (TAMBAHAN, bukan ganti epinefrin!)',
          description: 'Jika bronkospasme persisten setelah epinefrin IM → tambahkan Salbutamol nebulisasi 2.5–5 mg per nebulizer. Bukan pengganti epinefrin — gunakan sebagai terapi tambahan. Ipratropium bromida 0.5 mg nebulisasi bisa ditambahkan (terutama pada pasien dengan beta-bloker).',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ana-antihistamin-steroid-adjuvan',
          title: 'Antihistamin + Steroid — ADJUVAN Saja, Bukan Lini Pertama!',
          description: 'Setelah epinefrin, boleh tambahkan: Difenhidramin 25–50 mg IM/IV (antihistamin H1). Ranitidine 50 mg IV atau Simetidin 300 mg IV (antihistamin H2 — untuk kulit dan GI). Deksametason 10 mg IV atau Metilprednisolon 125 mg IV (cegah fase lambat, onset 4–6 jam). TIDAK efektif untuk manifestasi akut/airway/syok — epinefrin tetap kunci!',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ana-beta-bloker-glucagon',
          title: 'Pasien dengan Beta-Bloker → GLUKAGON IV!',
          description: 'Beta-bloker memblokir efek epinefrin → anafilaksis lebih berat dan kurang respons terhadap epinefrin. Berikan Glukagon 1–5 mg IV bolus pelan (3–5 mnt), kemudian infus 5–15 mcg/mnt. Efektif membypass reseptor beta. Epinefrin tetap diberikan dengan dosis lebih tinggi.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ana-observasi-biphasic',
          title: 'Observasi Minimum 4–24 Jam — Awasi Reaksi Bifasik!',
          description: 'Reaksi bifasik: gejala kambuh 1–72 jam setelah tampak membaik (terjadi pada 5–20% kasus). Faktor risiko reaksi bifasik: reaksi berat, butuh >1 dosis epinefrin, tertundanya pemberian epinefrin. Rawat inap minimum 24 jam jika: reaksi berat, usia tua, asma, atau kondisi jantung.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ana-rujuk-rawat',
          title: 'Rawat Inap + Rujuk Dokter Spesialis',
          description: 'Semua anafilaksis → rawat inap minimal 24 jam. Konsul Penyakit Dalam/Alergi-Imunologi. Setelah stabil: resepkan EpiPen auto-injector untuk dibawa pulang (jika tersedia). Edukasi: kunjungan ke dokter spesialis alergi untuk uji skin-prick dan imunoterapi venom.',
          required: true,
          category: 'action',
          role: 'nurse',
        }
      ],
      nextNodeId: 'ib-discharge-edu'
    },

    // ============================================================
    // NODE 4: SYSTEMIC MODERATE MANAGEMENT
    // ============================================================
    'ib-systemic-management': {
      id: 'ib-systemic-management',
      type: 'checklist',
      title: 'Node 4: Reaksi Sistemik Sedang — Monitoring Ketat + Terapi',
      description: 'Ada gejala sistemik tapi belum memenuhi kriteria anafilaksis penuh. Pertimbangkan epinefrin profilaktik jika ada progresi cepat. Monitor minimal 4 jam.',
      items: [
        {
          id: 'sys-observasi-ketat',
          title: 'Observasi Ketat & Siapkan Epinefrin IM',
          description: 'Monitor vital signs tiap 15 menit minimal 4 jam. Epinefrin 1:1000 di tangan siap digunakan. Jika ada tanda progresi ke anafilaksis → berikan epinefrin IM SEGERA, jangan tunggu!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'sys-antihistamin',
          title: 'Antihistamin H1 — Oral atau IM',
          description: 'Cetirizine 10 mg oral (non-sedatif, onset 1–2 jam). Atau Difenhidramin 25–50 mg oral/IM (onset lebih cepat, sedatif). Loratadine 10 mg oral jika tidak tersedia cetirizine. Untuk urtikaria dan pruritus. BUKAN untuk penanganan syok atau bronkospasme!',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'sys-steroid-oral-im',
          title: 'Kortikosteroid — Cegah Reaksi Lambat',
          description: 'Prednison 40–60 mg oral jika bisa menelan, ATAU Deksametason 5–10 mg IM/IV. Tujuan: mencegah komponen fase lambat reaksi (onset 4–8 jam). Tidak efektif untuk gejala akut yang sudah ada. Berikan untuk 3–5 hari, tapering jika gejala berat.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'sys-bronkodilator',
          title: 'Bronkodilator — Jika Ada Wheeze',
          description: 'Salbutamol (Ventolin) MDI 2–4 puff atau nebulisasi 2.5–5 mg jika ada wheeze/bronkospasme. Ipratropium 0.5 mg nebulisasi bisa dikombinasikan. Jika wheeze tidak respons → pertimbangkan epinefrin IM (tanda anafilaksis!).',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'sys-cabut-sengat',
          title: 'Cabut Sengat Lebah — Cara yang Benar!',
          description: 'Sengat lebah madu (Apis mellifica) meninggalkan kantung racun. Cara yang BENAR: kikis/geser menggunakan kartu kredit atau kuku (arah horizontal). JANGAN dicabut dengan pinset (memeras kantung racun → lebih banyak venom masuk). Segera setelah sengat diketahui — jangan tunggu selesai asesmen!',
          required: true,
          category: 'action',
          role: 'nurse',
        }
      ],
      nextNodeId: 'ib-discharge-edu'
    },

    // ============================================================
    // NODE 5: LOCAL REACTION MANAGEMENT
    // Ref: KMK 1186/2022 + Kemenkes 2023
    // ============================================================
    'ib-local-management': {
      id: 'ib-local-management',
      type: 'checklist',
      title: 'Node 5: Reaksi Lokal — Tatalaksana Simtomatis',
      description: 'Reaksi lokal biasanya self-limiting 24–72 jam. Terapi bertujuan mengurangi gejala dan mencegah infeksi sekunder.',
      items: [
        {
          id: 'loc-cabut-sengat',
          title: 'Cabut Sengat (Jika Lebah Madu) — SEGERA',
          description: 'Kikis/geser sengat menggunakan kartu kredit, kuku, atau tepi spatula. BUKAN dicabut dengan pinset. Makin cepat sengat dicabut, makin sedikit venom yang masuk. Jangan tunda >30 detik untuk mencari alat "yang benar".',
          required: true,
          category: 'action',
          role: 'both',
        },
        {
          id: 'loc-kompres-dingin',
          title: 'Kompres Dingin / Es Batu (bukan langsung ke kulit)',
          description: 'Kompres es yang dibungkus kain 10–15 menit, ulangi tiap 1–2 jam. Mengurangi nyeri, pembengkakan, dan penyebaran venom lokal. JANGAN kompres panas (memperburuk peradangan). Untuk sengatan ubur-ubur: bilas dengan cuka 5% (menginaktivasi nematosit yang belum pecah), bukan air tawar!',
          required: true,
          category: 'action',
          role: 'both',
        },
        {
          id: 'loc-cuci-bersih',
          title: 'Cuci Luka dengan Sabun & Air Mengalir',
          description: 'Cuci area gigitan/sengatan dengan sabun dan air mengalir 10–15 menit. Untuk madu (ubur-ubur) gunakan cuka 5%. Untuk tungau (mite/scabies) → pertimbangkan skrining kontak dan permethrin.',
          required: true,
          category: 'action',
          role: 'both',
        },
        {
          id: 'loc-antihistamin',
          title: 'Antihistamin Oral — Kurangi Pruritus & Urtikaria Lokal',
          description: 'Non-sedatif (diutamakan siang hari): Cetirizine 1×10 mg atau Loratadine 1×10 mg selama 3–7 hari. Sedatif (jika mengganggu tidur): Klorfeniraminy (CTM) 3×4 mg. Hindari antihistamin sedatif pada pengemudi atau pekerja dengan mesin.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'loc-topikal',
          title: 'Krim Kortikosteroid Topikal + Analgesia Lokal',
          description: 'Krim Hidrokortison 1% (OTC) untuk reaksi ringan, atau Mometason Furoat 0.1% / Betametason Valerat 0.1% untuk reaksi lebih kuat, 2× sehari selama 5–7 hari pada area eritema/urtika. Jangan gunakan pada luka terbuka. Parasetamol 500–1000 mg oral jika nyeri.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'loc-antibiotik-jika-infeksi',
          title: 'Antibiotik — HANYA Jika Ada Tanda Infeksi Sekunder',
          description: 'Antibiotik TIDAK boleh diberikan rutin! HANYA jika ada: pus/nanah, selulitis (kemerahan menyebar, panas, nyeri tekan melebihi area luka, demam). Jika ada infeksi: Amoksisilin-Klavulanat 2×875/125 mg atau Sefaleksin 3×500 mg selama 5 hari.',
          required: false,
          category: 'medication',
          role: 'doctor',
        }
      ],
      nextNodeId: 'ib-discharge-edu'
    },

    // ============================================================
    // NODE 6: DISCHARGE EDUKASI & FOLLOW-UP
    // ============================================================
    'ib-discharge-edu': {
      id: 'ib-discharge-edu',
      type: 'checklist',
      title: 'Node 6: Edukasi Pulang & Pencegahan Rekurensi',
      description: 'Edukasi pasien dan keluarga tentang tanda bahaya, kapan kembali ke IGD, dan pencegahan episode berikutnya.',
      items: [
        {
          id: 'edu-tanda-bahaya',
          title: 'Edukasi Tanda Bahaya — Kembali ke IGD Segera Jika:',
          description: 'Sesak napas mendadak, suara serak/serak/stridor, bibir-lidah membengkak, kulit gatal sangat luas, pingsan/pusing berat, mual-muntah hebat, rasa "akan mati", detak jantung sangat cepat. JANGAN tunggu sampai parah — anafilaksis bisa fatal dalam 15–30 menit!',
          required: true,
          category: 'documentation',
          role: 'nurse',
        },
        {
          id: 'edu-epipen',
          title: 'Resepkan EpiPen Auto-Injector bagi Pasien Risiko Tinggi',
          description: 'Resepkan EpiPen/Auvi-Q untuk: Pasien dengan riwayat anafilaksis sebelumnya, Penderita asma dengan alergi venom, Pasien yang jauh dari fasilitas kesehatan. Ajari cara penggunaan EpiPen: cap biru off, orange end to thigh, jab and hold 10 detik, rub area, segera ke RS walaupun sudah suntik!',
          required: true,
          category: 'documentation',
          role: 'doctor',
        },
        {
          id: 'edu-pencegahan',
          title: 'Edukasi Pencegahan Paparan Ulang',
          description: 'Hindari area sarang lebah/tawon (terutama Vespa affinis yang sangat agresif). Pakai baju lengan panjang dan sepatu saat berkebun/sawah. Hindari parfum/wangi-wangian saat di luar ruangan. Jangan membunuh lebah/tawon sendirian — minta bantuan. Jangan tinggalkan makanan manis di luar ruangan.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'edu-medic-alert',
          title: 'Medical Alert Bracelet & Kartu Alergi',
          description: 'Rekomendasikan pasien dengan alergi venom berat untuk menggunakan gelang/ID medis alergi. Beri kartu/surat keterangan alergi venom yang bisa ditunjukkan di IGD manapun.',
          required: false,
          category: 'documentation',
          role: 'doctor',
        },
        {
          id: 'edu-rujuk-alergi',
          title: 'Rujuk ke Dokter Spesialis Alergi-Imunologi',
          description: 'Semua pasien dengan anafilaksis atau reaksi sistemik berat → rujuk ke SpA-I (Alergi-Imunologi) untuk: Uji skin-prick/RAST venom spesifik, Pertimbangan Venom Immunotherapy (VIT) — satu-satunya terapi kuratif, efektif >90% mencegah reaksi sistemik pada sengatan berikutnya.',
          required: true,
          category: 'action',
          role: 'doctor',
        }
      ]
    }

  },
  references: [
    'KMK No. HK.01.07/MENKES/1186/2022 – Pedoman Praktik Klinis bagi Dokter di Fasilitas Pelayanan Kesehatan Tingkat Pertama. Kemenkes RI. Bab: Reaksi Gigitan Serangga & Anafilaksis.',
    'Pedoman Penanganan Gigitan, Sengatan Hewan Berbisa dan Keracunan Tumbuhan. Direktorat Pelayanan Kesehatan Rujukan, Kementerian Kesehatan RI. 2023.',
    'Simons FER, et al. World Allergy Organization Guidelines for the Assessment and Management of Anaphylaxis. WAO Journal. 2011;4(2):13–37.',
    'Sampson HA, et al. Second symposium on the definition and management of anaphylaxis: Summary report — Second National Institute of Allergy and Infectious Disease/Food Allergy and Anaphylaxis Network symposium. J Allergy Clin Immunol. 2006;117(2):391–397.',
    'Pumphrey RS. Fatal posture in anaphylactic shock. J Allergy Clin Immunol. 2003;112(2):451–452. (Evidence for supine position)',
    'Golden DBK, et al. Stinging Insect Hypersensitivity: A Practice Parameter Update 2016. Ann Allergy Asthma Immunol. 2017;118(1):28–54.',
    'Bilo MB, et al. Diagnosis of Hymenoptera venom allergy. Allergy. 2005;60(11):1339–1349.',
    'Muraro A, et al. EAACI Food Allergy and Anaphylaxis Guidelines. Allergy. 2014;69(8):1026–1045.',
    'King RM, et al. Insect sting allergy: Diagnosis and management. Australian Family Physician. 2016;45(5):295–299.'
  ]
};
