// ============================================================
// TATA LAKSANA OTITIS EKSTERNA
// REFERENSI UTAMA:
// 1. KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
//    Bab: "Otitis Eksterna" (Sirkumskripta & Diffusa)
// 2. PPK PERHATI-KL (Perhimpunan Dokter Spesialis THT-BKL
//    Indonesia) — Otitis Eksterna Maligna & Rekuren
// 3. Rosenfeld RM, et al. Clinical Practice Guideline:
//    Acute Otitis Externa. Otolaryngol Head Neck Surg.
//    2014;150(1 Suppl):S1-S24. (AAO-HNSF Guideline)
// ============================================================
// CATATAN KAPASITAS KLINIK:
// Alat: TTV, EKG, Suction, Nebulizer
// Tidak tersedia: Otoskop detail, spesimen kultur, CT scan (Rujuk RS)
// → Diagnosis klinis + rujuk bila indikasi
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const otitisEksternaPathway: DynamicPathway = {
  diseaseId: 'otitis-eksterna',
  diseaseName: 'Otitis Eksterna (KMK 1186/2022 + AAO-HNSF 2014)',
  startNodeId: 'oe-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT
    // ============================================================
    'oe-initial-assessment': {
      id: 'oe-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Diagnosis Klinis (Tanpa Otoskop Canggih)',
      description: 'Otitis Eksterna (OE) = peradangan liang telinga luar (MAE). Diagnosis KLINIS — tidak butuh CT atau kultur untuk kasus biasa. Gunakan otoskop klinik biasa + lampu senter. WAJIB singkirkan OE Maligna pada pasien DM/imunokompromais.',
      items: [
        {
          id: 'oe-anamnesis-cepat',
          title: 'Anamnesis — Keluhan Utama & Riwayat',
          description: '(1) Seit kapan nyeri/gatal telinga? Onset akut <3 minggu? (2) Riwayat berenang/menyelam/diving? (Swimmers ear = OE difusa tersering). (3) Sering mengorek kuping dengan cotton bud atau benda tajam? (mikrotrauma → pintu masuk bakteri). (4) Ada riwayat DM, HIV, steroid kronik, atau imunokompromais? (RED FLAG OE Maligna!). (5) Pernah OE sebelumnya? Pengobatan apa? Respons terapi sebelumnya?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'oe-vital-signs',
          title: 'Vital Signs — TTV Lengkap',
          description: 'Tensi, Suhu (termometer), SpO₂ (oxymeter). OE simpleks biasanya AFEBRIS. Demam >38°C + pasien DM/lansia/imunokompromais → RED FLAG OE Maligna! Catat baseline sebelum terapi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'oe-tragus-test',
          title: 'TRAGUS TEST + AURICLE PULL TEST — Pemeriksaan Fisik Kunci!',
          description: 'Tekan tragus (tonjolon tulang rawan depan lubang telinga) → NYERI = OE positif. Tarik daun telinga ke atas-belakang → NYERI = OE positif. Ini membedakan OE dari Otitis Media Akut (OMA) — pada OMA tidak ada nyeri tarik aurikula. Salah satu positif → sangat sugestif OE.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'oe-inspeksi-mae',
          title: 'Inspeksi MAE dengan Lampu/Senter',
          description: 'Gunakan otoskop klinik atau lampu senter + spekulum telinga. Nilai: (1) MAE edema/menyempit? (2) Discharge — serous/purulen/berbau busuk? (3) Warna: kemerahan difus (OE difusa) vs tonjolan/furunkel (OE sirkumskripta) vs putih seperti kapas (otomikosis). (4) MAE tertutup total oleh edema? → bersihkan dulu dengan SUCTION sebelum tetes apapun.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'oe-red-flag-maligna',
          title: 'RED FLAG — Screen OE Maligna (WAJIB pada DM/Lansia/Imunokompromais!)',
          description: 'OE Maligna = OE Necrotizing = DARURAT THT! Cari pada pasien DM, HIV, steroid kronik, keganasan, transplantasi organ: (1) Nyeri telinga SANGAT BERAT tidak proporsional, (2) Discharge purulen berbau busuk, (3) Jaringan granulasi di dasar MAE (persimpangan tulang-tulang rawan), (4) Demam tinggi, tidak membaik dengan topikal setelah 48–72 jam, (5) Kelemahan otot wajah/Parese N. Fasialis (VII) → RUJUK CITO ke SpTHT + CT Temporal!',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'oe-type-decision'
    },

    // ============================================================
    // NODE 2: TYPE CLASSIFICATION
    // ============================================================
    'oe-type-decision': {
      id: 'oe-type-decision',
      type: 'decision',
      title: 'Node 2: Klasifikasi Tipe OE — Tentukan Jalur Tatalaksana',
      description: 'Perbedaan tipe OE menentukan terapi, obat topikal, dan keputusan rujuk. Semua tipe wajib BERSIHKAN MAE dulu sebelum terapi topikal!',
      warningLevel: 'warning',
      branches: [
        {
          id: 'oe-maligna',
          title: 'OE MALIGNA / Necrotizing — RUJUK CITO ke SpTHT + Rawat Inap!',
          description: 'DM/imunokompromais + nyeri hebat + granulasi di MAE + tidak respons topikal. Penyebab: Pseudomonas aeruginosa. Risiko osteomielitis basis kranii, parese N VII. TIDAK BISA ditangani di klinik — rujuk SEGERA!',
          color: 'red',
          nextNodeId: 'oe-maligna-management',
          riskLevel: 'high'
        },
        {
          id: 'oe-sirkumskripta',
          title: 'OE SIRKUMSKRIPTA — Furunkel / Bisul Terlokalisir',
          description: 'Furunkel/bisul di 1/3 luar MAE (area berambut/folikel). Nyeri lokal sangat besar, bisa ada fluktuasi. Penyebab: Staphylococcus aureus. Tata laksana: insisi dan drainase + antibiotik sistemik.',
          color: 'orange',
          nextNodeId: 'oe-sirkumskripta-management',
          riskLevel: 'medium'
        },
        {
          id: 'oe-difusa',
          title: 'OE DIFUSA (Swimmers Ear) — Peradangan Difus MAE',
          description: 'Liang telinga merah-bengkak merata, discharge +/-, nyeri tragus dan tarik aurikula +. Tersering akibat air, cotton bud, dermatitis. Penyebab: Pseudomonas + Staphylococcus. Tata laksana: ear toilet + tetes topikal antibiotik+steroid.',
          color: 'blue',
          nextNodeId: 'oe-difusa-management',
          riskLevel: 'medium'
        },
        {
          id: 'oe-otomikosis',
          title: 'OTOMIKOSIS — Infeksi Jamur MAE',
          description: 'MAE terasa penuh/gatal, discharge putih seperti kapas (Aspergillus) atau hitam/berwarna (jamur lain). Sering pada iklim lembab, penggunaan antibiotik topikal berkepanjangan, DM. Tata laksana: ear toilet + antifungal topikal (bukan antibiotik!)',
          color: 'green',
          nextNodeId: 'oe-otomikosis-management',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: OE MALIGNA — RUJUK CITO
    // ============================================================
    'oe-maligna-management': {
      id: 'oe-maligna-management',
      type: 'checklist',
      title: 'Node 3: OE MALIGNA — Stabilisasi & Rujuk CITO SpTHT!',
      description: 'OE Maligna (Necrotizing Otitis Externa) adalah DARURAT THT. Pseudomonas merusak tulang temporal → osteomielitis basis kranii → parese N VII → kematian. Klinik TIDAK bisa menangani — tugas klinik: stabilisasi, kontrol gula darah, dan rujuk segera.',
      items: [
        {
          id: 'mal-gda-kontrol',
          title: 'Cek & Kontrol Gula Darah SEGERA!',
          description: 'GDS > 200 mg/dL pada pasien DM: perbaiki kondisi metabolik sebelum atau bersamaan rujuk. Hiperglikemia memperparah infeksi Pseudomonas. Berikan terapi DM sesuai protokol + konsul SpPD jika diperlukan. EKG jika ada aritmia/keluhan jantung pada pasien DM lansia.',
          required: true,
          category: 'action'
        },
        {
          id: 'mal-antibiotik-sistemik',
          title: 'Antibiotik Sistemik Anti-Pseudomonas SEGERA (Sambil Menunggu Rujuk)',
          description: 'Ciprofloxacin 2×500–750 mg oral (pilihan utama, aktif vs Pseudomonas, tersedia oral). Jangan tunda sambil menunggu kultur. Jika sudah ada gambaran parese N VII atau tidak respons → antibiotik IV (Ciprofloxacin IV 2×400 mg atau Piperasilin-Tazobaktam) di RS tujuan.',
          required: true,
          category: 'medication'
        },
        {
          id: 'mal-rujuk-spetht',
          title: 'RUJUK CITO ke SpTHT + CT Scan (Rujuk RS) Temporal!',
          description: 'Surat rujukan wajib berisi: riwayat DM/imunokompromais, temuan klinis (granulasi MAE, nyeri hebat, discharge berbau), obat yang sudah diberikan. Tujuan RS: harus ada SpTHT + CT Temporal (untuk evaluasi ekstensi infeksi ke tulang). Tidak bisa CT di klinik → langsung kirim ke RS dengan fasilitas CT.',
          required: true,
          category: 'action'
        },
        {
          id: 'mal-ekg-lansia',
          title: 'EKG — Pada Pasien Lansia / DM dengan Keluhan Kardiak',
          description: 'EKG tersedia di klinik → gunakan pada pasien lansia DM dengan keluhan nyeri dada, sesak, atau palpitasi sebelum dirujuk. Identifikasi aritmia atau iskemia yang perlu tatalaksana bersamaan sebelum transportasi.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'oe-education-followup'
    },

    // ============================================================
    // NODE 4: OE SIRKUMSKRIPTA
    // ============================================================
    'oe-sirkumskripta-management': {
      id: 'oe-sirkumskripta-management',
      type: 'checklist',
      title: 'Node 4: OE Sirkumskripta — Furunkel Liang Telinga',
      description: 'Furunkel di 1/3 luar MAE. Sangat nyeri. Terapi: drainage + antibiotik oral. Suction klinik SANGAT BERGUNA untuk membersihkan MAE setelah insisi.',
      items: [
        {
          id: 'sir-ear-toilet-suction',
          title: 'Ear Toilet dengan SUCTION — Bersihkan MAE (Alat Tersedia di Klinik!)',
          description: 'Suction (yang tersedia di klinik) sangat efektif untuk ear toilet. Gunakan tip suction kecil/lembut (Fr 5–8 jika ada adaptor). Hisap debris, serumen cair, dan discharge dari MAE. Jika MAE terlalu sempit untuk suction → tampon + rujuk. PENTING: jangan suction terlalu dalam atau terlalu kuat (risiko trauma membran timpani).',
          required: true,
          category: 'action'
        },
        {
          id: 'sir-insisi-drainase',
          title: 'Insisi & Drainase Furunkel (Jika Ada Fluktuasi)',
          description: 'Jika furunkel sudah fluktuatif (lunak, berisi pus): insisi kecil dengan scalpel no. 11 atau jarum besar steril di titik paling fluktuatif. Drainase pus → bersihkan dengan suction. Pasang drain/tampon kecil jika perlu. Jika tidak fluktuatif (masih keras) → JANGAN insisi dulu, berikan antibiotik dan kompres hangat 3–4 hari.',
          required: true,
          category: 'action'
        },
        {
          id: 'sir-antibiotik-oral',
          title: 'Antibiotik Oral Anti-Stafilokokus — 7 Hari',
          description: 'Pilihan utama: Amoksisilin-klavulanat 2×875/125 mg atau 3×500/125 mg selama 7 hari. Alternatif: Sefaleksin 4×500 mg selama 7 hari. Jika alergi penisilin: Eritromisin 4×500 mg. JANGAN hanya antibiotik topikal untuk furunkel — butuh sistemik karena infeksi folikel dalam!',
          required: true,
          category: 'medication'
        },
        {
          id: 'sir-analgesia',
          title: 'Analgesia — Nyeri Furunkel Sangat Berat!',
          description: 'Parasetamol 3×500–1000 mg atau Ibuprofen 3×400 mg selama 5–7 hari. Jika nyeri sangat berat: kombinasikan parasetamol + ibuprofen (interval selang-seling). Kompres hangat 3–4×/hari 10–15 menit membantu pematangan furunkel dan mengurangi nyeri.',
          required: true,
          category: 'medication'
        },
        {
          id: 'sir-rujuk-bila-gagal',
          title: 'Rujuk ke SpTHT Jika Tidak Respons dalam 48–72 Jam',
          description: 'Indikasi rujuk: Furunkel tidak membaik dalam 48–72 jam dengan antibiotik, furunkel sangat besar menutup seluruh MAE, pasien imunokompromais/DM (risiko OE maligna), atau tanda septikemi (demam tinggi, menggigil).',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'oe-education-followup'
    },

    // ============================================================
    // NODE 5: OE DIFUSA
    // ============================================================
    'oe-difusa-management': {
      id: 'oe-difusa-management',
      type: 'checklist',
      title: 'Node 5: OE Difusa (Swimmers Ear) — Ear Toilet + Tetes Topikal',
      description: 'OE difusa akut = kondisi paling umum. Tata laksana: (A) Bersihkan MAE, (B) Buat MAE kering, (C) Tetes antibiotik+steroid topikal. Keberhasilan terapi topikal TERGANTUNG MAE bersih — ear toilet adalah langkah TERPENTING!',
      items: [
        {
          id: 'dif-ear-toilet-suction',
          title: 'EAR TOILET dengan Suction — Langkah TERPENTING! (Alat Tersedia!)',
          description: 'Suction klinik = alat terbaik untuk ear toilet MAE yang penuh debris/discharge. Posisi pasien duduk, kepala miring, suction perlahan dari MAE. Bersihkan debris, serumen, pus, dan sel epitel mati. Tanpa ear toilet yang baik → tetes obat tidak akan menembus MAE yang tertutup → terapi gagal. Catatan: cara alternatif jika suction tidak cukup kecil: kapas lidi/cotton swab steril untuk menyeka dengan lembut.',
          required: true,
          category: 'action'
        },
        {
          id: 'dif-tampon-mae-sempit',
          title: 'Tampon MAE — Jika Liang Sangat Sempit (Edema Berat)',
          description: 'Jika MAE sangat sempit akibat edema berat → tetes topikal tidak bisa masuk. Gunakan tampon/wick (kasa tipis atau spons komersial/Pope ear wick) → basahi dengan tetes antibiotik → masukkan perlahan ke MAE. Tampon menarik cairan obat masuk ke MAE. Cabut tampon setelah 2–3 hari. Jika tidak punya wick komersial: rujuk ke SpTHT untuk pemasangan tampon yang benar.',
          required: true,
          category: 'action'
        },
        {
          id: 'dif-tetes-topikal',
          title: 'Tetes Topikal — Antibiotik + Steroid (Pilihan Utama AAO-HNSF)',
          description: 'PILIHAN TERBAIK (berdasarkan AAO-HNSF 2014): Kombinasi antibiotik + steroid topikal. Pilihan di Indonesia: (1) Ofloksasin tetes telinga 0.3% 2×10 tetes/hari selama 7 hari, (2) Neomisin-polimiksin B-hidrokortison tetes telinga 3–4×3–4 tetes/hari selama 7 hari, (3) Deksametason-neomisin-polimiksin (Decadrex/Otopain) 3×4 tetes/hari. Cara memakai: pasien berbaring miring, teteskan, tarik-ulur aurikula untuk meratakan obat, tetap berbaring 3–5 menit.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dif-antibiotik-tidak-rutin',
          title: 'Antibiotik Oral — TIDAK Rutin! Hanya Jika Ada Indikasi!',
          description: 'Berdasarkan AAO-HNSF 2014 dan KMK 1186/2022: antibiotik oral TIDAK dianjurkan rutin untuk OE difusa tanpa komplikasi. BERIKAN antibiotik oral HANYA jika: ada ekstensi infeksi keluar MAE (selulitis aurikula/periaurikuler), limfadenopati regional, atau pasien imunokompromais/DM. Pilihan: amoksisilin-klavulanat atau sefaleksin 7 hari.',
          required: true,
          category: 'safety'
        },
        {
          id: 'dif-analgesia',
          title: 'Analgesia yang Adekuat',
          description: 'Parasetamol 3×500–1000 mg atau Ibuprofen 3×400 mg. OE difusa nyerinya signifikan — jangan kurang-kurangi analgesia. Hindari NSAID jika ada risiko perdarahan atau riwayat ulkus lambung.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dif-asam-asetat',
          title: 'Asidifikasi MAE dengan Larutan Asam Asetat 2% (Alternatif/Tambahan)',
          description: 'Larutan asam asetat 2% (cuka putih diencerkan 1:1 dengan air steril) dapat digunakan sebagai tetes telinga 2×4 tetes/hari. Mengubah pH MAE menjadi asam → menghambat pertumbuhan Pseudomonas dan jamur. Efektif sebagai monoterapi untuk OE ringan atau sebagai tambahan. Murah dan mudah dibuat jika tetes antibiotik tidak tersedia.',
          required: false,
          category: 'medication'
        },
        {
          id: 'dif-evaluation-7-days',
          title: 'Evaluasi 7 Hari — Respons Terapi?',
          description: 'Kontrol dalam 7 hari. Jika membaik: lanjutkan tetes sampai 7–10 hari total. Jika tidak membaik: evaluasi kepatuhan cara tetes, kemungkinan otomikosis (jamur) yang butuh antifungal, atau resistensi → rujuk SpTHT. 80–90% OE difusa akut membaik dengan topikal dalam 1 minggu.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'oe-education-followup'
    },

    // ============================================================
    // NODE 6: OTOMIKOSIS
    // ============================================================
    'oe-otomikosis-management': {
      id: 'oe-otomikosis-management',
      type: 'checklist',
      title: 'Node 6: Otomikosis — Infeksi Jamur MAE',
      description: 'OE akibat jamur, bukan bakteri. Sering salah diagosis → diberi antibiotik → makin parah. Klue: gatal dominan > nyeri, discharge seperti kapas/berbeda warna, riwayat antibiotik topikal lama atau iklim lembab.',
      items: [
        {
          id: 'miko-ear-toilet-primer',
          title: 'Ear Toilet Mekanik dengan Suction — Lebih Penting dari Tetes!',
          description: 'Pada otomikosis, bersihkan SEMUA debris secara mekanik lebih penting dari antifungal topikal. Spora jamur (hifa) harus diangkat secara fisik. Suction klinik: hisap debris jamur dari MAE. Ulangi ear toilet setiap kontrol. Efektivitas antifungal topikal sangat berkurang jika MAE tidak bersih dulu.',
          required: true,
          category: 'action'
        },
        {
          id: 'miko-antifungal-topikal',
          title: 'Antifungal Topikal — BUKAN Antibiotik!',
          description: 'Klotrimazol 1% tetes/krim (Canesten) 3×3 tetes/hari selama 14–21 hari. Atau Nistatin tetes/krim. Atau Tolnaftat 1%. Catatan di klinik: jika antifungal telinga tidak tersedia, klotrimazol KRIM (yang untuk kulit) bisa digunakan secara topikal di MAE pada cotton wick. JANGAN antifungal oral (flukonazol dll.) untuk otomikosis tanpa komplikasi.',
          required: true,
          category: 'medication'
        },
        {
          id: 'miko-hentikan-antibiotik',
          title: 'HENTIKAN Semua Antibiotik Topikal Sebelumnya!',
          description: 'Jika pasien sebelumnya pakai tetes antibiotik (neomisin, polimiksin) → HENTIKAN. Antibiotik mengubah flora MAE → overgrowth jamur. Asam asetat 2% bisa digunakan bersamaan sebagai acidifier. Hindari kelembaban berlebihan pada MAE selama pengobatan.',
          required: true,
          category: 'safety'
        },
        {
          id: 'miko-durasi-panjang',
          title: 'Durasi Pengobatan Lebih Lama — Minimal 14–21 Hari',
          description: 'Otomikosis butuh terapi LEBIH LAMA dari OE bakteri. Minimal 14–21 hari. Sering kambuh jika terapi dihentikan terlalu awal. Follow-up tiap 1–2 minggu untuk ear toilet dan evaluasi respons.',
          required: true,
          category: 'medication'
        },
        {
          id: 'miko-rujuk-bila-rekuren',
          title: 'Rujuk SpTHT Jika Rekuren atau Tidak Respons',
          description: 'Otomikosis rekuren atau gagal terapi → curiga: DM tidak terkontrol, imunosupresi tersembunyi, atau perforasi MT (memungkinkan infeksi jamur ke telinga tengah = Otomikosis MT — butuh tatalaksana berbeda). Rujuk untuk kultur jamur dan pendampingan SpTHT.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'oe-education-followup'
    },

    // ============================================================
    // NODE 7: EDUKASI & FOLLOW-UP
    // ============================================================
    'oe-education-followup': {
      id: 'oe-education-followup',
      type: 'checklist',
      title: 'Node 7: Edukasi Pasien & Pencegahan Rekurensi',
      description: 'OE sangat mudah kambuh tanpa edukasi yang benar. Edukasi yang baik mencegah rekurensi dan kepatuhan terapi lebih tinggi.',
      items: [
        {
          id: 'edu-jaga-kering',
          title: 'Telinga Harus KERING Selama Pengobatan (2–4 Minggu)',
          description: 'LARANGAN selama pengobatan: Renang, menyelam, mandi dengan kepala terendam. Cara mandi aman: sumbat lubang telinga dengan kapas yang diberi vaselin. Tidak perlu masukan air apapun ke dalam telinga. Keringkan telinga setelah wajah basah dengan pengering rambut dari jarak jauh (suhu rendah) 1–2 menit.',
          required: true,
          category: 'action'
        },
        {
          id: 'edu-stop-cotton-bud',
          title: 'STOP Cotton Bud / Mengorek Telinga — Selamanya!',
          description: 'Cotton bud justru mendorong kotoran lebih dalam, merusak lapisan self-cleaning MAE, dan menyebabkan mikrotrauma yang memudahkan infeksi. Jelaskan: MAE memiliki mekanisme "self-cleaning" alami (migrasi epitel ke arah luar). Telinga sehat TIDAK perlu dibersihkan dari dalam.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-cara-tetes',
          title: 'Ajarkan Cara Tetes Obat yang Benar',
          description: 'Berbaring miring dengan telinga sakit menghadap ke atas. Teteskan obat pelan-pelan sesuai dosis. Tarik-ulur aurikula (daun telinga) beberapa kali untuk meratakan obat ke seluruh MAE. Tetap berbaring minimal 3–5 menit jangan langsung berdiri. Lakukan 2–4×/hari sesuai resep. Ketidakpatuhan cara tetes = penyebab utama kegagalan terapi topikal!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-mencegah-swimmers-ear',
          title: 'Pencegahan Swimmers Ear (Jika Sering Berenang)',
          description: 'Gunakan penutup telinga (earplug) saat berenang. Setelah renang: miringkan kepala, tarik daun telinga untuk mengeluarkan air, keringkan dengan hair dryer jarak jauh. Boleh prophylactic drops: asam asetat 2% beberapa tetes setelah renang untuk menjaga keasaman MAE.',
          required: false,
          category: 'action'
        },
        {
          id: 'edu-tanda-memburuk',
          title: 'Kembali ke Klinik / Rujuk Segera Jika:',
          description: 'Tidak ada perbaikan dalam 72 jam. Nyeri makin bertambah berat. Muncul demam. Muncul pembengkakan di belakang telinga (mastoiditis?). Muncul kesulitan mengunyah atau membuka mulut. Muncul kelemahan otot wajah (mulut mencong, kelopak mata tidak bisa menutup) → PARESE N VII = OE MALIGNA → IGD SEGERA!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-kontrol',
          title: 'Jadwal Kontrol',
          description: 'OE Difusa/Sirkumskripta: kontrol 7 hari untuk ear toilet ulang dan evaluasi respons. Otomikosis: kontrol tiap 1–2 minggu selama minimal 3 minggu. OE rekuren (>3×/tahun): rujuk SpTHT untuk evaluasi alergi, dermatitis, atau kondisi predisposisi lainnya.',
          required: true,
          category: 'documentation'
        }
      ]
    }

  },
  references: [
    'KMK No. HK.01.07/MENKES/1186/2022 – Panduan Praktik Klinis bagi Dokter di Fasilitas Pelayanan Kesehatan Tingkat Pertama. Kementerian Kesehatan RI. Bab: Otitis Eksterna.',
    'PPK PERHATI-KL – Panduan Praktik Klinis Spesialis THT-Bedah Kepala Leher Indonesia. Perhimpunan Dokter Spesialis THT-BKL Indonesia. (Otitis Eksterna Maligna & Rekuren).',
    'Rosenfeld RM, Schwartz SR, Cannon CR, et al. Clinical Practice Guideline: Acute Otitis Externa. Otolaryngol Head Neck Surg. 2014;150(1 Suppl):S1-S24. DOI: 10.1177/0194599813517083. (AAO-HNSF Guideline)',
    'Wiegand S, et al. Otitis externa. J Eur Acad Dermatol Venereol. 2019;33(Suppl 1):10–27.',
    'Schaefer P, Baugh RF. Acute Otitis Externa: An Update. Am Fam Physician. 2012;86(11):1055–1061.',
    'Kaushik V, et al. Interventions for acute otitis externa. Cochrane Database Syst Rev. 2010;(1):CD004740. (Evidence: topical antibiotics superior to systemic for uncomplicated AOE)',
    'Carfrae MJ, Kesser BW. Malignant otitis externa. Otolaryngol Clin North Am. 2008;41(3):537–549. (OE Maligna reference)'
  ]
};
