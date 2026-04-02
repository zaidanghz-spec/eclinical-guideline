// ========================================================================
// FRAKTUR (OPEN & CLOSED) - PNPK Penatalaksanaan Fraktur 2019
// KMK HK.01.07/MENKES/270/2019
// ========================================================================
// Evidence: PNPK Fraktur KemenKes RI 2019 (Rekomendasi 1-13),
//           ATLS 10th Edition 2018, BOAST Guidelines 2020,
//           FLOW Trial (Lancet 2015), SPRINT Trial, OTA/ACS 2023,
//           Cochrane Reviews, NICE NG38 2016/2023
// ICD-10: S02-S92 (varies by location)
//
// SETTING: Klinik Pratama / Faskes Tingkat Pertama / IGD RS Tipe C-D
// ALAT TERSEDIA: Tensimeter, Termometer, Pulse Oximeter, EKG 12-lead,
//                Suction, Nebulizer
// ALAT TIDAK TERSEDIA: Rontgen/X-ray, CT Scan, MRI, Fluoroskopi,
//                       Kamar Operasi, Stryker (compartment pressure),
//                       Doppler vaskular, Lab lengkap
//
// Prinsip: Stabilisasi ABC -> Splinting -> Pain control -> RUJUK
// Diagnosis fraktur di klinik tanpa rontgen = KLINIS (Look/Feel/Move)
// Semua fraktur yang dicurigai HARUS di-splint dan DIRUJUK untuk imaging
//
// Flow: Primary Survey (ABCDE) -> Hemorrhage Control -> Secondary Survey
//       (Look/Feel/Move) -> Open vs Closed -> Classification ->
//       Initial Management -> Splinting -> Pain -> REFER
// Total Nodes: 16 nodes (10 checklist + 6 decision)
// ========================================================================

import { DynamicPathway } from '../dynamicPathways';

export const frakturPathway: DynamicPathway = {
  diseaseId: 'fraktur',
  diseaseName: 'Fraktur (Open & Closed) - PNPK 2019',
  startNodeId: 'fraktur-primary-survey',
  nodes: {

    // ============================================================
    // NODE 1: PRIMARY SURVEY (ABCDE) - PNPK 2019 Rekomendasi 1
    // ============================================================
    'fraktur-primary-survey': {
      id: 'fraktur-primary-survey',
      type: 'checklist',
      title: 'Node 1: Primary Survey -- ABCDE (PNPK 2019, Rekomendasi 1)',
      description: 'PNPK 2019: "Tenaga kesehatan haruslah memahami dan telah mengikuti pelatihan BLS dan ATLS." Prioritas utama: menangani kegagalan akut sistem pernapasan dan kardiovaskular. Fraktur BUKAN prioritas jika ada ancaman nyawa. Gunakan alat yang tersedia untuk assessment dan monitoring.',
      items: [
        {
          id: 'fraktur-airway-cspine',
          title: 'A -- Airway dengan Proteksi C-Spine',
          description: 'PNPK 2019 Rek.1: "Pembebasan obstruksi jalan napas dengan membaringkan pasien dalam posisi telentang, jaw thrust, dan membersihkan faring." [II-B]. SUCTION tersedia untuk bersihkan sekret/darah/muntahan. Jika curiga cedera servikal: manual in-line stabilization, JANGAN fleksi/ekstensi leher. Pasang collar jika tersedia.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fraktur-breathing-ventilation',
          title: 'B -- Breathing & Ventilasi',
          description: '[PULSE OXIMETER] Monitor SpO2 kontinu. [NEBULIZER] Tersedia jika bronkospasme. Inspeksi dada: gerak napas simetris? Flail chest (fraktur iga multipel)? Auskultasi: suara napas bilateral? TENSION PNEUMOTHORAX (tanda: deviasi trakea, hipersonor, suara napas menurun unilateral, distensi JVP) -> dekompresi jarum jika terlatih, jika tidak -> RUJUK SEGERA. SpO2 target >=94%.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-circulation-hemorrhage',
          title: 'C -- Circulation & Kontrol Perdarahan',
          description: '[TENSIMETER] Ukur TD. [PULSE OXIMETER] Monitor nadi kontinu. PNPK 2019 Rek.1: "Kontrol perdarahan dengan penekanan manual kepada luka terbuka menggunakan balutan sementara" [II-B]. Akses IV 2 jalur large bore jika tersedia. Cairan kristaloid isotonis (RL atau NaCl 0.9%) [PNPK 2019 Rek.1 No.5, II-B]. Tanda syok: takikardi >100, hipotensi <90 sistolik, CRT >2 detik, akral dingin.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-tourniquet-consideration',
          title: 'Tourniquet (Jika Perdarahan Masif Ekstremitas)',
          description: 'PNPK 2019: "Penggunaan torniket untuk menghentikan pendarahan dilaksanakan dengan hati-hati. Terlalu longgar hanya menahan aliran balik vena dan meningkatkan pendarahan. Terlalu ketat menyebabkan kerusakan permanen pembuluh darah, saraf, dan jaringan lunak." CATAT waktu pemasangan tourniquet. Jangan lebih dari 2 jam tanpa release.',
          required: false,
          category: 'action'
        },
        {
          id: 'fraktur-disability-neuro',
          title: 'D -- Disability (Status Neurologis)',
          description: 'GCS (Eye/Verbal/Motor). Reaksi pupil bilateral. Motorik dan sensorik semua ekstremitas -- bandingkan kanan-kiri. Cedera spinal cord? (kelemahan bilateral, level sensorik, priapismus, syok neurogenik: bradikardia + hipotensi). Jika GCS <13 atau defisit neurologis -> stabilisasi dan RUJUK.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-exposure-environment',
          title: 'E -- Exposure & Environmental Control',
          description: 'Buka pakaian untuk full body examination. Periksa seluruh tubuh: anterior, posterior (log roll jika curiga spinal injury), perineum. Cegah hipotermia: selimut hangat, tutup kembali setelah periksa. PNPK 2019: "Perlu diingat pendarahan dapat terjadi secara internal seperti di rongga abdomen, toraks, atau kompartemen jaringan lunak."',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-shock-recognition',
          title: 'PNPK 2019 Rek.1 No.4: Kenali Tanda Syok',
          description: 'PNPK 2019: "Mengenali tanda-tanda syok dan tata laksana yang sesuai" [II-B]. Kelas I (<15% blood loss): nadi normal, TD normal. Kelas II (15-30%): takikardi, TD normal. Kelas III (30-40%): takikardi, hipotensi. Kelas IV (>40%): takikardi berat, hipotensi berat, penurunan kesadaran. Fraktur femur tunggal: kehilangan 1-1.5L darah. Fraktur pelvis: sampai 3L.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fraktur-ecg-screening',
          title: '[EKG] Skrining Kardiak pada Pasien Trauma',
          description: 'INDIKASI EKG di setting trauma: (1) Trauma tumpul dada (kontusio miokard), (2) Pasien >50 tahun (risiko aritmia saat resusitasi), (3) Mekanisme jatuh/sinkop (apakah jatuh karena aritmia?), (4) Monitoring selama resusitasi cairan. Perhatikan: aritmia, ST changes (kontusio myokard), takikardia sinus (respon syok). [PERTIMBANGAN EBM] ATLS 10th Ed: EKG direkomendasikan pada blunt thoracic trauma. Kontusio myokard terjadi pada 10-16% blunt chest trauma.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'fraktur-life-threat-decision'
    },

    // ============================================================
    // NODE 2: DECISION -- LIFE-THREATENING vs STABLE
    // ============================================================
    'fraktur-life-threat-decision': {
      id: 'fraktur-life-threat-decision',
      type: 'decision',
      title: 'Decision: Apakah Ada Ancaman Jiwa?',
      description: 'PNPK 2019: Resusitasi dan penanganan kondisi mengancam jiwa SELALU mendahului penanganan fraktur. "Life before Limb."',
      warningLevel: 'critical',
      branches: [
        {
          id: 'fraktur-life-threatening',
          title: '[HIGH] LIFE-THREATENING -- Stabilisasi & Rujuk Segera',
          description: 'Syok hemoragik (Kelas III-IV), tension pneumothorax, flail chest, penurunan kesadaran, perdarahan internal masif, fraktur pelvis tidak stabil. Stabilisasi ABC lalu RUJUK IGD RS dengan trauma center SEGERA.',
          color: 'red',
          nextNodeId: 'fraktur-emergency-stabilize-refer',
          riskLevel: 'high'
        },
        {
          id: 'fraktur-hemodynamically-stable',
          title: 'Hemodinamik Stabil -- Lanjut Secondary Survey',
          description: 'Vital signs stabil (TD >90 sistolik, nadi <120, SpO2 >94%, GCS 15). Tidak ada tanda perdarahan internal. Lanjut ke evaluasi fraktur (secondary survey).',
          color: 'green',
          nextNodeId: 'fraktur-secondary-survey',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: EMERGENCY STABILIZE & REFER
    // ============================================================
    'fraktur-emergency-stabilize-refer': {
      id: 'fraktur-emergency-stabilize-refer',
      type: 'checklist',
      title: 'Node 3: Stabilisasi Emergency & Rujuk RS',
      description: 'Kondisi mengancam jiwa terdeteksi. Di klinik tanpa OR dan imaging: fokus pada STABILISASI ABC dan TRANSPORT SEGERA. Setiap menit delay meningkatkan mortalitas pada syok hemoragik.',
      items: [
        {
          id: 'fraktur-emerg-iv-fluid',
          title: 'Resusitasi Cairan: Kristaloid Isotonis Bolus',
          description: 'PNPK 2019 Rek.1 No.5: "Jenis cairan yang digunakan adalah kristaloid isotonis, seperti Ringer Laktat atau Normal Saline" [II-B]. Bolus 1-2L cepat. [PERTIMBANGAN EBM] ATLS 10th Ed 2018 + Damage Control Resuscitation: target permissive hypotension (SBP 80-90 mmHg) pada trauma perdarahan TANPA head injury. Hindari over-resuscitation yang memperberat perdarahan.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-emerg-hemorrhage-control',
          title: 'Kontrol Perdarahan Eksternal',
          description: 'Penekanan langsung pada luka. Pelvic binder (improvised: bedsheet diikat kencang melingkar pelvis) jika curiga fraktur pelvis. Tourniquet pada perdarahan masif ekstremitas. Balut tekan. JANGAN cabut benda yang menancap.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-emerg-splint-before-transport',
          title: 'Pembidaian Sementara Sebelum Transport',
          description: 'PNPK 2019 Rek.2: "Tujuan utama: mengurangi nyeri, mempertahankan posisi, membantu penyembuhan, mengembalikan fungsi" [II-B]. Bidai sementara (APAPUN yang tersedia: kayu, karton, vakum splint) mencakup sendi di atas dan bawah fraktur. Tujuan: kurangi nyeri, cegah cedera jaringan lunak lebih lanjut, kurangi perdarahan.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-emerg-pain-control',
          title: 'Analgesik Kuat untuk Transport',
          description: 'Ketorolac 30mg IV (jika hemodinamik stabil) ATAU Tramadol 50-100mg IV lambat ATAU Morfin 2-4mg IV titrasi (jika tersedia, HATI-HATI pada hipotensi). Fraktur pain is severe -- adequate analgesia menurunkan respons stres dan memperbaiki outcome.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fraktur-emerg-monitoring-transport',
          title: 'Monitoring Selama Transport',
          description: '[PULSE OXIMETER] Monitor SpO2 dan nadi kontinu. [TENSIMETER] Ukur TD setiap 5-10 menit. Catat intake cairan. Suction standby jika risiko muntah/aspirasi. Pastikan IV line terpasang dan berfungsi.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fraktur-emerg-rujukan-sbar',
          title: 'Surat Rujukan & Handover SBAR',
          description: 'Situation: trauma [mekanisme], kondisi saat ini. Background: usia, komorbid, obat rutin. Assessment: vital signs serial, temuan primary survey, tindakan yang dilakukan. Recommendation: butuh imaging, OR, transfusi. CATAT: waktu kejadian, waktu tiba di klinik, waktu tourniquet (jika dipasang), cairan yang sudah masuk.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 4: SECONDARY SURVEY -- FRACTURE ASSESSMENT
    // ============================================================
    'fraktur-secondary-survey': {
      id: 'fraktur-secondary-survey',
      type: 'checklist',
      title: 'Node 4: Secondary Survey -- Evaluasi Fraktur (Look/Feel/Move)',
      description: 'PNPK 2019: "Pemeriksaan muskuloskeletal dilakukan secara menyeluruh dari ekstremitas atas secara bilateral. Prinsip pemeriksaan: Look, Feel dan Move." Tanpa rontgen, diagnosis fraktur adalah KLINIS berdasarkan mekanisme + temuan fisik.',
      items: [
        {
          id: 'fraktur-mechanism-injury',
          title: 'Anamnesis: Mekanisme Cedera (MOI)',
          description: 'PNPK 2019: "Anamnesis yang dapat diperoleh adalah mekanisme terjadinya cedera diikuti dengan ketidakmampuan menggunakan tungkai yang cedera." HIGH ENERGY (KLL, jatuh >3m, tertimpa benda berat): curiga fraktur multipel, cedera internal. LOW ENERGY (jatuh dari berdiri, terpeleset): curiga fraktur kerapuhan jika usia >50 tahun.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-symptoms-history',
          title: 'Anamnesis: Gejala & Riwayat',
          description: 'PNPK 2019: "Nyeri, kebiruan dan bengkak. Keluhan lain: rasa baal, ketidakmampuan menggerakan, pucat di kulit atau sianosis, darah di urin, nyeri perut, ketidakmampuan bernafas." Tanyakan juga: cedera sebelumnya, riwayat osteoporosis, obat pengencer darah (meningkatkan perdarahan), alergi obat, makan terakhir (persiapan anestesi).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-look-inspection',
          title: 'LOOK (Inspeksi) -- Deformitas, Luka, Pembengkakan',
          description: 'PNPK 2019: "Look: apakah terdapat pembengkakan, memar dan deformitas. Penting mengetahui apakah kulit masih intak atau tidak untuk menentukan jenis fraktur terbuka atau tertutup." Catat: deformitas (angulasi, rotasi, pemendekan), edema, ekimosis, luka terbuka (ukuran, kontaminasi, tulang terekspos?), warna kulit (pucat = vaskular compromise), tented skin (kulit tegang oleh fragmen tulang).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-feel-palpation',
          title: 'FEEL (Palpasi) -- Nyeri Tekan, Krepitasi',
          description: 'PNPK 2019: "Feel: melakukan palpasi pada area yang cedera dan mungkin terjadi perlunakan." Palpasi lembut sepanjang tulang. Nyeri tekan lokal = sangat sugestif fraktur. Krepitasi (JANGAN sengaja cari -- hanya catat jika terasa). Suhu kulit (dingin = gangguan vaskular). [NOTE] Fraktur skaphoid: nyeri di anatomical snuff box (PNPK 2019).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-move-rom',
          title: 'MOVE (Gerakan) -- ROM & Fungsi',
          description: 'PNPK 2019: "Move: untuk mengetahui adakah krepitasi dan pergerakan abnormal. Penting untuk bertanya kepada pasien apakah dapat menggerakan sendi yang lebih distal dari cedera." JANGAN paksa gerakan jika jelas ada fraktur! Periksa ROM sendi di atas dan bawah cedera. Abnormal mobility (false movement) pada shaft = fraktur.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-neurovascular-exam',
          title: '[KRITIS] Pemeriksaan Neurovaskular Distal',
          description: 'PNPK 2019: "Vaskularisasi dan kecurigaan gangguan saraf perlu dilakukan." VASKULAR: palpasi nadi distal (dorsalis pedis, tibialis posterior, radialis, ulnaris), CRT <2 detik, warna kulit, suhu. NEUROLOGIS: sensorik (raba halus tiap dermatom), motorik (dorsofleksi, plantarfleksi, ekstensi jari). DOKUMENTASI sebelum DAN sesudah setiap manipulasi. [NOTE] Nadi bisa masih teraba meski ada cedera arteri parsial.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fraktur-pelvis-spine-check',
          title: 'Periksa Pelvis & Spine (Jika High-Energy Trauma)',
          description: 'PNPK 2019: "Pemeriksaan pelvis dan spine perlu dilakukan jika terjadi high energy injury." Pelvis: kompresi AP dan lateral gentle (HANYA SEKALI, jangan diulang-ulang). Spine: palpasi processus spinosus, step deformity, nyeri midline. Jika nyeri: jangan mobilisasi, log roll saja, collar tetap terpasang.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-wound-skin-assessment',
          title: 'Penilaian Luka & Integritas Kulit',
          description: 'Apakah kulit INTAK (fraktur tertutup) atau ada LUKA yang berhubungan dengan fraktur (fraktur terbuka)? Ukur luka: panjang, lebar, kedalaman. Kontaminasi: tanah, rumput, benda asing? Tulang terekspos? Viabilitas jaringan lunak: warna, kontraktilitas, sirkulasi otot (4C). FOTO luka sebelum ditutup (untuk RS rujukan).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-multiple-injury-screening',
          title: 'Skrining Cedera Multipel (PNPK 2019 Rule of Two)',
          description: 'PNPK 2019 Rule of Two No.4: "Gaya yang sangat kuat pada proses trauma dapat menyebabkan cedera lebih dari satu level." SELALU curiga cedera multipel pada high-energy trauma. Periksa seluruh tubuh secara sistematis: kepala, wajah, leher, dada, abdomen, pelvis, ekstremitas bilateral. Jangan tunnel vision pada fraktur yang jelas.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-ebm-ottawa-rules',
          title: '[PERTIMBANGAN EBM] Ottawa Rules (Ankle/Knee/C-spine)',
          description: 'EVIDENCE: Ottawa Ankle Rules (Stiell et al. JAMA 1993, validated >15 RCTs): sensitivitas 98-100% untuk fraktur ankle/midfoot. Ottawa Knee Rules: sensitivitas 98.5% untuk fraktur lutut. Canadian C-Spine Rules: sensitivitas 99.4% untuk fraktur servikal. Di klinik TANPA rontgen: clinical decision rules ini membantu menentukan URGENSI rujukan. Jika Ottawa Rules negatif: probabilitas fraktur sangat rendah (<2%), rujukan bisa semi-urgent. Centang jika diterapkan.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'fraktur-open-closed-decision'
    },

    // ============================================================
    // NODE 5: DECISION -- OPEN vs CLOSED FRACTURE
    // ============================================================
    'fraktur-open-closed-decision': {
      id: 'fraktur-open-closed-decision',
      type: 'decision',
      title: 'Decision: Fraktur Terbuka vs Tertutup (PNPK 2019)',
      description: 'PNPK 2019: "Fraktur terbuka adalah fraktur yang berhubungan dengan lingkungan luar melalui defek jaringan lunak. Fraktur terbuka merupakan suatu kegawatdaruratan." Klasifikasi ini menentukan urgensi antibiotik, irigasi, dan rujukan.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'fraktur-open-branch',
          title: '[HIGH] FRAKTUR TERBUKA -- Kegawatdaruratan',
          description: 'Ada luka yang berhubungan dengan fraktur (tulang terekspos, atau luka di area fraktur). Risiko infeksi tinggi. Butuh antibiotik segera, irigasi, dan rujuk untuk debridemen di OR.',
          color: 'red',
          nextNodeId: 'fraktur-open-management',
          riskLevel: 'high'
        },
        {
          id: 'fraktur-closed-branch',
          title: 'FRAKTUR TERTUTUP -- Kulit Intak',
          description: 'PNPK 2019: "Fraktur tertutup adalah fraktur yang tidak memiliki hubungan dengan lingkungan luar." Kulit di atas fraktur intak. Risiko infeksi rendah, tapi tetap waspadai sindrom kompartemen.',
          color: 'blue',
          nextNodeId: 'fraktur-closed-management',
          riskLevel: 'medium'
        },
        {
          id: 'fraktur-neurovascular-compromise',
          title: '[HIGH] GANGGUAN NEUROVASKULAR -- Limb Threatening',
          description: 'Nadi distal tidak teraba, CRT >4 detik, ekstremitas pucat/sianosis/dingin, paralisis, anestesi. Dengan atau tanpa luka terbuka. Ancaman kehilangan tungkai jika tidak ditangani dalam 6 jam.',
          color: 'red',
          nextNodeId: 'fraktur-neurovascular-emergency',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 6: OPEN FRACTURE MANAGEMENT
    // PNPK 2019 Section D.4 + Rekomendasi
    // ============================================================
    'fraktur-open-management': {
      id: 'fraktur-open-management',
      type: 'checklist',
      title: 'Node 6: Fraktur Terbuka -- Tatalaksana Awal (PNPK 2019)',
      description: 'PNPK 2019: "Fraktur terbuka merupakan suatu kegawatdaruratan yang membutuhkan tata laksana cepat termasuk stabilisasi hemodinamik, pemberian antibiotik." Di klinik tanpa OR: fokus pada antibiotik, irigasi awal, pembidaian, tetanus, dan RUJUK untuk debridemen definitif di OR.',
      items: [
        {
          id: 'fraktur-open-gustilo-classify',
          title: 'Klasifikasi Gustilo-Anderson (PNPK 2019 Tabel 2)',
          description: 'GRADE I: luka <1 cm, bersih, fraktur sederhana. Risiko infeksi 0-2%. GRADE II: luka >1 cm, tanpa kerusakan jaringan lunak berat, tanpa flap/avulsi. Risiko infeksi 2-7%. GRADE IIIA: jaringan lunak cukup menutup tulang, laserasi berat. Risiko infeksi 5-10%. GRADE IIIB: jaringan lunak tidak cukup, perlu rekonstruksi, periosteum lepas. Risiko infeksi 10-50%. GRADE IIIC: ada kerusakan arteri yang perlu reparasi. Risiko amputasi 25%. CATAT grade dalam surat rujukan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-open-abx-stat',
          title: '[KRITIS] Antibiotik SEGERA -- PNPK 2019 (I-A)',
          description: 'PNPK 2019 Rekomendasi: "Terapi antibiotik sistemik untuk bakteri gram-positif harus diberikan sesegera mungkin" [I-A]. GRADE I-II: Cefazolin 2g IV (atau Cefuroxime 1.5g IV). GRADE III: Cefazolin 2g IV + Gentamisin 5mg/kg IV (tambah gram-negatif coverage). Kontaminasi tanah/sawah: tambah Penisilin dosis tinggi (Clostridium). HINDARI fluorokuinolon (PNPK 2019: "penggunaannya tidak didukung hasil penelitian, risiko nonunion dan delayed union").',
          required: true,
          category: 'medication'
        },
        {
          id: 'fraktur-open-abx-alergi',
          title: 'Alternatif Antibiotik Jika Alergi (PNPK 2019 Rek.13)',
          description: 'Alergi Penisilin: Klindamisin 900mg IV dosis tunggal. Alergi Sefalosporin/MRSA: Vankomisin dosis tunggal + Levofloxacin 750mg IV (HANYA jika tidak ada opsi lain -- ingat risiko fluorokuinolon pada penyembuhan tulang). [PERTIMBANGAN EBM] EAST Guideline 2011: Klindamisin adalah alternatif first-line jika alergi beta-laktam.',
          required: false,
          category: 'medication'
        },
        {
          id: 'fraktur-open-abx-timing-ebm',
          title: '[PERTIMBANGAN EBM] Timing Antibiotik: Seberapa Cepat?',
          description: 'PNPK 2019: "sesegera mungkin." EVIDENCE KLASIK: Patzakis & Wilkins 1989 -- antibiotik dalam 3 jam menurunkan infeksi 60%. EVIDENCE TERBARU -- Lack et al. JBJS 2015 (meta-analysis): setiap 1 jam keterlambatan meningkatkan risiko infeksi. NAMUN, Schenker et al. JBJS 2012 (retrospektif 1112 pasien): 66 menit delay = tidak ada perbedaan signifikan infeksi. PRAKTIS: berikan SEKARANG, jangan tunggu rujukan. Centang jika antibiotik diberikan <1 jam dari kedatangan.',
          required: false,
          category: 'medication'
        },
        {
          id: 'fraktur-open-tetanus',
          title: 'Profilaksis Tetanus (PNPK 2019, I-A)',
          description: 'PNPK 2019 Rekomendasi [I-A]: (1) TT + TIG pada SEMUA fraktur terbuka yang belum imunisasi lengkap/status tidak diketahui. (2) TT pada semua yang tidak booster >10 tahun. (3) TIG untuk yang tidak pernah/tidak lengkap imunisasi. Dosis: TT 0.5mL IM, TIG 250-500 IU IM (pada ekstremitas kontralateral dari TT). "Derajat keparahan luka tidak menentukan keputusan pemberian TIG."',
          required: true,
          category: 'medication'
        },
        {
          id: 'fraktur-open-wound-photo',
          title: 'Foto Dokumentasi Luka SEBELUM Ditutup',
          description: 'Foto dengan penggaris untuk skala ukuran. Dokumentasi: lokasi, ukuran, kedalaman, kontaminasi, tulang terekspos, viabilitas jaringan lunak. Tujuan: RS rujukan tidak perlu buka ulang penutup luka (mengurangi kontaminasi ulang). PNPK 2019: hindari membuka dressing berulang kali.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'fraktur-open-irrigation-initial',
          title: 'Irigasi Awal di Klinik (NaCl 0.9%, Tekanan Rendah)',
          description: 'PNPK 2019: "Gunakan saline untuk irigasi. Hindari pencampuran dengan antibiotik atau antiseptik (povidone iodine, chlorhexidine, H2O2)" [II-B]. "Gunakan tekanan cairan irigasi rendah" [II-B]. Irigasi awal 1-2L NaCl 0.9% untuk membilas kontaminan kasar. JANGAN debridemen agresif di klinik -- debridemen definitif di OR. [PERTIMBANGAN EBM] FLOW Trial (Lancet 2015, RCT n=2447): low-pressure saline sama efektif dengan high-pressure, dan soap irrigation TIDAK lebih baik dari saline.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-open-dressing',
          title: 'Penutupan Luka Sementara (Sterile Saline-Soaked Gauze)',
          description: 'Tutup dengan kasa steril yang dibasahi NaCl 0.9%, lalu balut. JANGAN masukkan tulang yang mencuat kembali (mendorong bakteri ke dalam). JANGAN jahit luka di klinik (penutupan luka definitif adalah keputusan operator di OR). PNPK 2019: penutupan luka primer hanya boleh dilakukan jika debridemen sudah adekuat.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-open-splinting',
          title: 'Pembidaian Sementara (Mencakup Sendi Atas & Bawah)',
          description: 'PNPK 2019 Rek.2: pembidaian untuk mengurangi nyeri dan melindungi jaringan lunak [II-B]. Bidai HARUS mencakup sendi di atas dan bawah fraktur. Gunakan splint yang tidak melingkar penuh (backslab/posterior slab) -- PNPK 2019: gips sirkumferensial meningkatkan risiko sindrom kompartemen. Padding di tonjolan tulang. Re-check neurovaskular POST-splinting.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-open-debridement-timing-ebm',
          title: '[PERTIMBANGAN EBM] Timing Debridemen: 6-Jam Rule vs Evidence Baru',
          description: 'PNPK 2019: "Semua fraktur terbuka ekstremitas bawah harus dilakukan irigasi dan debridemen dalam waktu 8 jam. Ekstremitas atas Grade Gustilo >1: dalam 8 jam. Ekstremitas atas Grade I: dalam 12 jam" [II-B]. EVIDENCE TERBARU -- BOAST 2020 + Schenker et al. 2012: timing debridemen kurang penting dari KUALITAS debridemen. Delay debridemen AMAN jika: antibiotik sudah diberikan, luka sudah di-irigasi dan ditutup bersih, splint terpasang. "6-hour rule" tidak lagi dogmatik. Centang untuk dokumentasi bahwa antibiotik + irigasi sudah dilakukan sebelum rujuk.',
          required: false,
          category: 'documentation'
        },
        {
          id: 'fraktur-open-pain-management',
          title: 'Analgesik Adekuat',
          description: 'Fraktur terbuka: nyeri SANGAT berat. Paracetamol 1g IV + Ketorolac 30mg IV (jika tidak ada risiko perdarahan). Tramadol 50-100mg IV lambat jika masih nyeri berat. Morfin 2-4mg IV titrasi jika tersedia dan hemodinamik stabil. [PERTIMBANGAN EBM] WHO Pain Ladder + ATLS: opioid TIDAK dikontraindikasikan pada trauma jika dimonitor. Undertreatment of pain memperberat syok.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fraktur-open-rujuk-ortho',
          title: 'RUJUK Ortopedi untuk Debridemen & Fiksasi di OR',
          description: 'SEMUA fraktur terbuka membutuhkan debridemen di OR (PNPK 2019: "Irigasi dan debridemen definitif harus dilakukan di ruang operasi dengan fasilitas anestesi lengkap" [II-B]). Surat rujukan harus mencantumkan: (1) Waktu kejadian, (2) Mekanisme, (3) Grade Gustilo, (4) Foto luka, (5) Antibiotik yang diberikan + waktu, (6) Tetanus status, (7) Status neurovaskular, (8) Vital signs, (9) EKG jika dilakukan.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-open-abx-duration-ebm',
          title: '[PERTIMBANGAN EBM] Durasi Antibiotik: Pendek vs Panjang',
          description: 'PNPK 2019: Grade I-II: 3 hari atau +3 hari setelah setiap tindakan. Grade III: 3 hari, kontaminasi berat sampai 5 hari [II-B]. EVIDENCE TERBARU -- Dellinger et al. NEJM 1988 (RCT n=248): untuk Grade I-II, antibiotik 24 jam post wound closure CUKUP, tidak ada perbedaan dengan 5 hari. Haddad et al. 2015 meta-analysis: extended antibiotik >72 jam TIDAK menurunkan infeksi pada Grade I-II. NAMUN, PNPK 2019 masih merekomendasikan 3 hari. Keputusan durasi serahkan ke RS rujukan -- klinik berikan dosis awal.',
          required: false,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 7: CLOSED FRACTURE MANAGEMENT
    // PNPK 2019 Section D.1-3 + Rekomendasi 2-12
    // ============================================================
    'fraktur-closed-management': {
      id: 'fraktur-closed-management',
      type: 'checklist',
      title: 'Node 7: Fraktur Tertutup -- Tatalaksana Awal (PNPK 2019)',
      description: 'PNPK 2019 Rek.2: "Tujuan utama: mengurangi nyeri, mempertahankan posisi anatomis, membantu penyembuhan, mengembalikan fungsi" [II-B]. Di klinik tanpa rontgen: lakukan pembidaian klinis, analgesik, dan tentukan urgensi rujukan.',
      items: [
        {
          id: 'fraktur-closed-soft-tissue-grade',
          title: 'Klasifikasi Kerusakan Jaringan Lunak (PNPK 2019 Tabel 3)',
          description: 'PNPK 2019: Tipe 0: kerusakan minimal, pola fraktur simple. Tipe I: abrasi/kontusio superfisial, fraktur ringan-sedang. Tipe II: abrasi dalam, terkontaminasi, sindrom kompartemen impending, fraktur berat (contoh: segmental tibia). Tipe III: kontusio kulit ekstensif, kerusakan otot berat, avulsi subkutan, sindrom kompartemen, kerusakan vaskular. Tipe II-III: urgensi lebih tinggi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-closed-clinical-diagnosis',
          title: 'Diagnosis Klinis Fraktur (Tanpa Rontgen)',
          description: 'TANPA rontgen, diagnosis berdasarkan: (1) Mekanisme cukup (jatuh, trauma langsung), (2) Nyeri tekan lokal yang jelas pada tulang, (3) Deformitas (angulasi, rotasi, pemendekan), (4) Krepitasi, (5) Abnormal mobility, (6) Loss of function. JIKA ada 3+ tanda di atas pada lokasi anatomi yang sesuai: suspect fraktur sampai terbukti sebaliknya (dengan rontgen di RS). SEMUA suspect fraktur harus di-splint dan dirujuk untuk imaging.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-closed-splinting',
          title: 'Pembidaian (PNPK 2019 Rek.5)',
          description: 'PNPK 2019 Rek.5: "Imobilisasi relatif diindikasikan pada fraktur yang relatif tidak tergeser, namun juga tidak stabil. Diperlukan pemeriksaan rontgen berulang" [II-B]. Di klinik: gunakan backslab/posterior slab (gips tidak melingkar penuh) ATAU bidai improvised. Mencakup sendi atas dan bawah fraktur. HINDARI gips sirkumferensial pada fase akut (risiko kompartemen). Padding di tonjolan tulang (maleolus, olekranon, calcaneus).',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-closed-splint-types',
          title: 'Jenis Bidai Sesuai Lokasi (Panduan Praktis)',
          description: 'UPPER LIMB: Arm sling (klavikula, proksimal humerus), Sugar-tong splint (forearm), Thumb spica (skaphoid), Ulnar gutter (metacarpal V). LOWER LIMB: Long-leg posterior slab (tibia/femur), Backslab (ankle), Knee immobilizer (patella/distal femur). PELVIS: Pelvic binder/bedsheet. SPINE: Collar + long board (jangan mobilisasi). Jika tidak ada splint formal: gunakan karton, kayu, majalah yang digulung + kain.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-closed-neurovascular-post-splint',
          title: '[KRITIS] Re-check Neurovaskular Setelah Pembidaian',
          description: 'Pembidaian bisa menyebabkan/memperburuk gangguan neurovaskular. WAJIB periksa: nadi distal, CRT, sensorik, motorik SETELAH splint terpasang. Bandingkan dengan sebelum splint. Jika nadi hilang atau parestesia baru: LONGGARKAN splint segera. Dokumentasi status neurovaskular pre dan post splinting.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fraktur-closed-analgesia',
          title: 'Analgesik Multimodal (WHO Pain Ladder)',
          description: 'Step 1: Paracetamol 1g PO/IV setiap 6 jam (round-the-clock, BUKAN PRN). Step 2: tambah NSAID (Ibuprofen 400mg PO 3x/hari atau Ketorolac 30mg IV -- HATI-HATI pada lansia, gagal ginjal, perdarahan). Step 3: tambah opioid (Tramadol 50mg PO 3-4x/hari atau Morfin 5-10mg PO 4-6 jam). [PERTIMBANGAN EBM] NSAID dan penyembuhan tulang: Giannoudis et al. JBJS 2015 review -- short-term NSAID (<2 minggu) AMAN dan TIDAK menghambat penyembuhan. Penggunaan jangka panjang yang kontroversial.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fraktur-closed-rice',
          title: 'RICE Protocol: Rest, Ice, Compression, Elevation',
          description: 'REST: hindari weight-bearing pada fraktur lower limb (crutches). ICE: 20 menit on / 20 menit off, 48-72 jam pertama (kurangi edema dan nyeri). COMPRESSION: balut elastis gentle (JANGAN terlalu kencang). ELEVATION: tinggikan di atas level jantung (bantal di bawah betis, BUKAN di bawah lutut). Peak swelling hari ke-2-3.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-closed-compartment-screening',
          title: '[KRITIS] Skrining Sindrom Kompartemen',
          description: 'PNPK 2019: kompartemen sindrom dapat terjadi pada fraktur tertutup, terutama tipe II-III. TANDA AWAL (HARUS dikenali!): (1) Pain out of proportion -- nyeri tidak sesuai dengan tingkat cedera, memburuk, (2) Pain with passive stretch (nyeri saat jari kaki/tangan digerakkan pasif). TANDA LANJUT (sudah terlambat!): Paresthesia, Pallor, Pulselessness, Paralysis. HIGH-RISK: fraktur tibia, forearm, supracondylar humerus anak. Jika curiga: JANGAN tunggu tanda lanjut, RUJUK SEGERA. [NOTE] Di klinik tanpa Stryker device: diagnosis KLINIS.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fraktur-closed-ebm-xray-necessity',
          title: '[PERTIMBANGAN EBM] Apakah Semua Suspect Fraktur Butuh Rontgen?',
          description: 'PNPK 2019: "Pemeriksaan sinar-X atau foto polos: modalitas sederhana dan WAJIB dilakukan." Di klinik TANPA rontgen: SEMUA suspect fraktur klinis harus dirujuk untuk imaging. NAMUN, Ottawa Rules dapat membantu triase: jika Ottawa Ankle Rules negatif (bisa weight-bear 4 langkah + tidak ada nyeri tekan tulang pada zona tertentu): fraktur sangat unlikely (<2%). Bisa dipertimbangkan rujukan NON-urgent. [EBM] Stiell et al. JAMA 1993 + BMJ 2003: Ottawa Rules mengurangi rontgen 30-40% tanpa miss fraktur signifikan.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'fraktur-closed-urgency-decision'
    },

    // ============================================================
    // NODE 8: DECISION -- CLOSED FRACTURE URGENCY
    // ============================================================
    'fraktur-closed-urgency-decision': {
      id: 'fraktur-closed-urgency-decision',
      type: 'decision',
      title: 'Decision: Urgensi Rujukan Fraktur Tertutup',
      description: 'Menentukan timing rujukan berdasarkan temuan klinis. Tanpa rontgen, lebih baik over-refer daripada miss fraktur signifikan.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'fraktur-closed-urgent',
          title: '[HIGH] URGENT -- Rujuk Hari Ini (Same Day)',
          description: 'Deformitas berat (angulasi >30 derajat, rotasi, pemendekan jelas), curiga fraktur intra-artikular (efusi sendi besar), kulit tegang oleh fragmen (tented skin -- risiko nekrosis), fraktur femur/pelvis, curiga sindrom kompartemen, cedera neurovaskular.',
          color: 'red',
          nextNodeId: 'fraktur-closed-urgent-refer',
          riskLevel: 'high'
        },
        {
          id: 'fraktur-closed-semi-urgent',
          title: 'SEMI-URGENT -- Rujuk 1-3 Hari',
          description: 'Deformitas sedang, fraktur shaft tulang panjang (stabil dalam splint), fraktur distal radius/ankle (displaced tapi splinted), edema signifikan. Splint, analgesik, follow-up 1-3 hari.',
          color: 'orange',
          nextNodeId: 'fraktur-closed-semi-urgent-management',
          riskLevel: 'medium'
        },
        {
          id: 'fraktur-closed-non-urgent',
          title: 'NON-URGENT -- Rujuk 1-2 Minggu',
          description: 'Curiga fraktur minimal (nyeri tekan lokal, bisa weight-bear, tidak ada deformitas), fraktur stabil (klavikula non-displaced, iga, jari). Proteksi/sling, analgesik, follow-up imaging elektif.',
          color: 'green',
          nextNodeId: 'fraktur-closed-conservative',
          riskLevel: 'low'
        },
        {
          id: 'fraktur-closed-fragility',
          title: '[NOTE] Curiga Fraktur Kerapuhan (Lansia)',
          description: 'Low-energy trauma (jatuh dari berdiri) pada pasien >50 tahun, terutama wanita postmenopause. Curiga osteoporosis sebagai penyebab dasar. Perlu evaluasi tambahan.',
          color: 'purple',
          nextNodeId: 'fraktur-fragility-screening',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 9: URGENT CLOSED FRACTURE REFERRAL
    // ============================================================
    'fraktur-closed-urgent-refer': {
      id: 'fraktur-closed-urgent-refer',
      type: 'checklist',
      title: 'Node 9: Fraktur Tertutup Urgent -- Rujuk Hari Ini',
      description: 'Fraktur dengan risiko tinggi komplikasi jika tidak ditangani segera. Stabilisasi + splint + rujuk same-day ke RS dengan ortopedi.',
      items: [
        {
          id: 'fraktur-urgent-deformity-align',
          title: 'Koreksi Deformitas Gross (Jika Terlatih)',
          description: 'JIKA ada deformitas berat yang menyebabkan tented skin atau gangguan neurovaskular DAN Anda terlatih: lakukan traksi inline gentle untuk koreksi alignment sebelum splint. JIKA TIDAK terlatih: splint as-is, JANGAN paksa reposisi. Reposisi di klinik tanpa rontgen berisiko cedera tambahan. Selalu re-check neurovaskular setelah manipulasi.',
          required: false,
          category: 'action'
        },
        {
          id: 'fraktur-urgent-splint-optimal',
          title: 'Pembidaian Posisi Optimal',
          description: 'Position of function: ankle 90 derajat, lutut slight flexion (10-15 derajat), siku 90 derajat, wrist neutral-slight extension. Padai tonjolan tulang. Mold splint untuk pertahankan alignment. Slab/backslab (BUKAN sirkumferensial). Fixasi dengan elastic bandage.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-urgent-npo',
          title: 'NPO (Puasa) -- Persiapan Operasi/Sedasi',
          description: 'Probabilitas tinggi butuh operasi/sedasi untuk reposisi. NPO: makanan padat 6 jam, cairan jernih 2 jam. Inform pasien jangan makan/minum. IV line terpasang. Jika sudah makan: catat waktu makan terakhir dalam surat rujukan.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-urgent-serial-neurovascular',
          title: 'Monitoring Neurovaskular Serial (Setiap 30-60 Menit)',
          description: 'WAJIB sampai pasien ditransfer: periksa nadi distal, CRT, sensorik, motorik. Dokumentasikan setiap pemeriksaan. Jika deteriorasi: longgarkan splint, elevasi, jika tetap memburuk -> kemungkinan sindrom kompartemen -> RUJUK SEGERA.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fraktur-urgent-refer-handover',
          title: 'Surat Rujukan Lengkap (SBAR)',
          description: 'Cantumkan: (1) Waktu cedera + mekanisme, (2) Temuan Look/Feel/Move, (3) Status neurovaskular (pre dan post splint), (4) Analgesia yang diberikan, (5) Splint yang dipasang, (6) Vital signs termasuk EKG jika dilakukan, (7) Komorbid + obat rutin, (8) NPO status + jam makan terakhir.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 10: SEMI-URGENT MANAGEMENT
    // ============================================================
    'fraktur-closed-semi-urgent-management': {
      id: 'fraktur-closed-semi-urgent-management',
      type: 'checklist',
      title: 'Node 10: Fraktur Tertutup Semi-Urgent -- Splint & Rujuk 1-3 Hari',
      description: 'Fraktur stabil dalam splint, tanpa gangguan neurovaskular, tanpa tented skin. Aman untuk rawat jalan dengan splint dan follow-up segera.',
      items: [
        {
          id: 'fraktur-semi-splint-care',
          title: 'Edukasi Perawatan Splint',
          description: 'Jaga splint tetap kering (bungkus plastik saat mandi). Elevasi 48-72 jam. Gerakkan jari tangan/kaki setiap jam (cegah kekakuan). JANGAN lepas splint sendiri. JANGAN masukkan benda ke dalam splint (garuk).',
          required: true,
          category: 'documentation'
        },
        {
          id: 'fraktur-semi-oral-analgesia',
          title: 'Resep Analgesik Oral',
          description: 'Paracetamol 500-1000mg PO setiap 6 jam (TETAP minum, bukan hanya saat nyeri). Ibuprofen 400mg PO 3x/hari sesudah makan (maks 5-7 hari). Tramadol 50mg PO 3-4x/hari PRN jika nyeri berat. [PERTIMBANGAN EBM] Paracetamol + NSAID kombinasi lebih efektif dari masing-masing tunggal (Moore et al. Cochrane 2015). NSAID short-term aman untuk penyembuhan tulang.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fraktur-semi-red-flags-education',
          title: 'Edukasi RED FLAGS -- Kapan Harus Segera ke IGD',
          description: 'SEGERA kembali/ke IGD jika: (1) Nyeri bertambah berat meskipun sudah minum obat -- curiga sindrom kompartemen, (2) Jari tangan/kaki mati rasa, kesemutan, atau tidak bisa digerakkan, (3) Jari pucat, dingin, atau biru, (4) Splint terasa sangat ketat, (5) Bau busuk dari luka/splint. CETAK atau TULIS red flags ini untuk pasien bawa pulang.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fraktur-semi-dvt-prevention',
          title: 'Pencegahan DVT (Fraktur Lower Limb)',
          description: 'Ankle pumps: dorsofleksi/plantarfleksi 10x setiap jam saat bangun tidur. Minum cukup. Mobilisasi dini sesuai kemampuan (dengan crutches/walker jika lower limb). [PERTIMBANGAN EBM] NICE NG89 2018: VTE prophylaxis farmakologis (LMWH) direkomendasikan pada fraktur lower limb dengan imobilisasi >3 hari. Ini keputusan RS, tapi berikan edukasi pencegahan non-farmakologis.',
          required: false,
          category: 'action'
        },
        {
          id: 'fraktur-semi-followup-schedule',
          title: 'Jadwal Follow-Up: Klinik Ortopedi 1-3 Hari',
          description: 'Rontgen di RS untuk konfirmasi diagnosis. Evaluasi alignment. Rencana definitif (konservatif vs operatif). Berikan surat pengantar dengan temuan klinis lengkap. Jika tidak ada ortopedi di RS terdekat: follow-up ke RS dengan ortopedi terdekat.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'fraktur-semi-sick-leave',
          title: 'Surat Keterangan Istirahat (Jika Dibutuhkan)',
          description: 'Upper limb non-dominant: 1-2 minggu awal. Upper limb dominant: 2-4 minggu awal. Lower limb: 4-8 minggu awal (tergantung pekerjaan). Sesuaikan dengan jenis pekerjaan (sedentary vs manual labor). Final sick leave ditentukan oleh ortopedi.',
          required: false,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 11: CONSERVATIVE MANAGEMENT (NON-URGENT)
    // PNPK 2019 Rekomendasi 4 (Proteksi)
    // ============================================================
    'fraktur-closed-conservative': {
      id: 'fraktur-closed-conservative',
      type: 'checklist',
      title: 'Node 11: Fraktur Minimal/Stabil -- Proteksi & Konservatif',
      description: 'PNPK 2019 Rek.4: "Tata laksana berupa proteksi saja diindikasikan pada fraktur yang tidak bergeser atau relatif tidak bergeser, fraktur stabil" [II-B]. Di klinik tanpa rontgen: curiga klinis fraktur minimal. Tetap HARUS dirujuk untuk konfirmasi rontgen.',
      items: [
        {
          id: 'fraktur-conservative-examples',
          title: 'Fraktur yang Mungkin Konservatif (PNPK 2019 Rek.4)',
          description: 'PNPK 2019: "Fraktur stabil tulang iga, falang, metacarpal pada orang dewasa, fraktur stabil klavikula pada anak, fraktur kompresi ringan vertebra, fraktur impaksi ujung atas humerus." Di klinik: jika klinis sesuai (nyeri lokal minimal, bisa fungsi, tanpa deformitas) DAN mekanisme low-energy: kemungkinan besar konservatif.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-conservative-protection',
          title: 'Proteksi Sesuai Lokasi (PNPK 2019)',
          description: 'PNPK 2019: "Pada ekstremitas atas: mitela simpel (arm sling). Pada ekstremitas bawah: mengurangi tumpuan beban badan melalui penggunaan tongkat/crutch." Fraktur iga: elastic bandage dada (JANGAN terlalu ketat -- menghambat napas), analgesik adekuat. Buddy taping untuk jari.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-conservative-bone-healing',
          title: 'Optimasi Penyembuhan Tulang (Nutrisi & Lifestyle)',
          description: 'Kalsium 1000-1200mg/hari (susu, keju, ikan kecil). Vitamin D 800-1000 IU/hari (paparan matahari + suplemen). Protein adekuat 1.2-1.5g/kgBB. HINDARI merokok (delay union 2-3x lipat). [PERTIMBANGAN EBM] Bischoff-Ferrari et al. NEJM 2012: vitamin D 800 IU/hari + kalsium menurunkan risiko fraktur pada lansia. PNPK 2019 (Fraktur Kerapuhan): vitamin D 800-1200 IU/hari.',
          required: false,
          category: 'action'
        },
        {
          id: 'fraktur-conservative-follow-up',
          title: 'Follow-Up untuk Konfirmasi Rontgen (1-2 Minggu)',
          description: 'PNPK 2019 Rule of Two No.5: "Beberapa fraktur dapat sulit dideteksi segera setelah cedera, pemeriksaan x-ray ulang dalam 2-3 minggu dapat menunjukkan lesi fraktur maupun formasi kalus." Fraktur occult (skaphoid, stress fracture) mungkin baru terlihat di rontgen ulang. Rujuk untuk rontgen konfirmasi.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'fraktur-conservative-return-precaution',
          title: 'Return Precaution: Kapan Harus Kembali',
          description: 'KEMBALI SEGERA jika: nyeri bertambah berat (bukan berkurang), muncul bengkak progresif, mati rasa/kesemutan, tidak bisa gerakkan jari, warna kulit berubah. Jika dalam 1 minggu nyeri tidak membaik: mungkin bukan fraktur simple -- perlu evaluasi lebih lanjut.',
          required: true,
          category: 'safety'
        }
      ]
    },

    // ============================================================
    // NODE 12: NEUROVASCULAR EMERGENCY
    // ============================================================
    'fraktur-neurovascular-emergency': {
      id: 'fraktur-neurovascular-emergency',
      type: 'checklist',
      title: 'Node 12: Gangguan Neurovaskular -- LIMB-THREATENING EMERGENCY',
      description: 'PNPK 2019 (Gustilo IIIC): "Semua jenis fraktur terbuka dengan kerusakan arteri yang memerlukan tindakan reparasi. Risiko amputasi 25%." Waktu iskemia hangat >6 jam: risiko kehilangan tungkai meningkat drastis. STABILISASI dan RUJUK SEGERA ke RS dengan bedah vaskular.',
      items: [
        {
          id: 'fraktur-nv-document-ischemia-time',
          title: '[KRITIS] Catat Waktu Mulai Iskemia',
          description: 'Kapan tungkai mulai pucat/dingin/nadi hilang? Ini menentukan viabilitas tungkai. Warm ischemia >6 jam: kerusakan otot ireversibel, rhabdomyolysis, gagal ginjal. "Golden period" revaskularisasi: <6 jam.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-nv-hard-signs',
          title: 'Identifikasi Hard Signs vs Soft Signs Cedera Vaskular',
          description: 'HARD SIGNS (butuh OR SEGERA): nadi tidak teraba, perdarahan pulsatil, hematoma yang membesar, bruit/thrill, iskemia distal (6P: Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia). SOFT SIGNS (butuh evaluasi lanjut): nadi melemah, hematoma stabil, cedera saraf di dekat arteri.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-nv-realignment',
          title: 'Koreksi Alignment (Traksi Inline Gentle)',
          description: 'Deformitas berat bisa menekuk/menekan arteri. Lakukan traksi inline gentle untuk restore alignment SEBELUM splint. Sering kali ini saja bisa mengembalikan nadi distal (arteri yang terjepit oleh fragmen tulang). Re-check nadi setelah koreksi. JIKA nadi kembali: splint, monitor ketat, tetap rujuk. JIKA nadi tetap hilang: RUJUK SEGERA.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-nv-splint-transport',
          title: 'Splint (JANGAN Ketat) + Transport SEGERA',
          description: 'Splint untuk stabilisasi tapi JANGAN menekan. Elevasi tungkai. Monitor SpO2, TD, nadi kontinu. IV line. Analgesik IV. RUJUK ke RS dengan bedah vaskular dan ortopedi. Transport AMBULANS jika available.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-nv-mess-score-ebm',
          title: '[PERTIMBANGAN EBM] MESS Score (Mangled Extremity Severity Score)',
          description: 'EVIDENCE: Johansen et al. J Trauma 1990. MESS Score >=7: prediktif amputasi dengan spesifisitas tinggi. KOMPONEN: (1) Skeletal/soft tissue injury (1-4), (2) Limb ischemia (1-6), (3) Shock (0-2), (4) Age (0-2). NAMUN, Bosse et al. JBJS 2001 (LEAP Study): MESS saja TIDAK cukup untuk putuskan amputasi -- keputusan harus di RS oleh tim multidisiplin. Centang jika MESS dihitung sebagai informasi untuk RS.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'fraktur-nv-rujukan-vaskular',
          title: 'Surat Rujukan: RS dengan Bedah Vaskular + Ortopedi',
          description: 'Cantumkan: (1) WAKTU ISKEMIA (dari kapan nadi hilang), (2) Hard signs yang ditemukan, (3) Upaya realignment dilakukan/tidak + respons, (4) Status neurovaskular serial, (5) Vital signs, (6) Mekanisme + deskripsi cedera. TEKANKAN urgensi: "limb-threatening, butuh evaluasi vaskular segera."',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 13: FRAGILITY FRACTURE SCREENING
    // PNPK 2019 Section E (Fraktur Kerapuhan)
    // ============================================================
    'fraktur-fragility-screening': {
      id: 'fraktur-fragility-screening',
      type: 'checklist',
      title: 'Node 13: Skrining Fraktur Kerapuhan / Osteoporosis (PNPK 2019)',
      description: 'PNPK 2019 Section E: "Fraktur kerapuhan merupakan komplikasi utama osteoporosis." WHO: "Fraktur yang disebabkan oleh cedera yang tidak cukup untuk mematahkan tulang normal." Lokasi khas: vertebra, femur proksimal (pinggul), distal forearm (pergelangan), humerus proksimal.',
      items: [
        {
          id: 'fraktur-fragility-identify',
          title: 'Identifikasi Fraktur Kerapuhan',
          description: 'CURIGA jika: (1) Low-energy trauma (jatuh dari berdiri atau lebih rendah), (2) Usia >50 tahun (terutama wanita postmenopause), (3) Lokasi khas osteoporosis (vertebra, hip, wrist, proksimal humerus), (4) PNPK 2019: "Fraktur pada batang tulang panjang pada pasien tua adalah fraktur patologis sampai terbukti sebaliknya."',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-fragility-risk-factors',
          title: 'Faktor Risiko Osteoporosis',
          description: 'Usia lanjut, wanita postmenopause, riwayat fraktur sebelumnya (risiko terbesar!), riwayat keluarga fraktur hip, BMI rendah, merokok, alkohol berlebihan, kortikosteroid jangka panjang, immobilitas, defisiensi vitamin D, malabsorpsi, hipertiroid, Cushing syndrome. [PERTIMBANGAN EBM] FRAX Tool (WHO): bisa menghitung risiko fraktur 10 tahun tanpa DXA -- gunakan versi online di klinik.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-fragility-fall-assessment',
          title: 'Asesmen Risiko Jatuh',
          description: 'PNPK 2019: "Sebagian besar fraktur berasal dari trauma jatuh, intervensi untuk menurunkan risiko jatuh sangat efektif mencegah fraktur." Evaluasi: (1) Riwayat jatuh sebelumnya (berapa kali, kapan), (2) Obat yang meningkatkan risiko jatuh (sedatif, antihipertensi, hipoglikemik), (3) Gangguan keseimbangan/penglihatan, (4) Hipotensi ortostatik (PERIKSA dengan tensimeter: TD baring vs berdiri), (5) Bahaya di rumah (karpet licin, tangga tanpa pegangan, pencahayaan kurang).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fraktur-fragility-acute-management',
          title: 'Tatalaksana Fraktur Akut (Sama Seperti Fraktur Lain)',
          description: 'Pembidaian, analgesik, rujuk untuk imaging dan definitif management. PNPK 2019: "Perujukan segera di pusat perawatan ortopedik." Fraktur hip (femur proksimal): URGENT -- butuh operasi dalam 24-48 jam (menurunkan mortalitas). [PERTIMBANGAN EBM] NICE NG124 2017: operasi fraktur hip dalam 36 jam -> mortalitas turun. Delay >48 jam: mortalitas meningkat 41% (Shiga et al. CMAJ 2008).',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-fragility-vitamin-d-calcium',
          title: 'Mulai Suplementasi Vitamin D + Kalsium (PNPK 2019)',
          description: 'PNPK 2019: "Apapun regimen penatalaksanaan osteoporosis, semua pasien harus mendapatkan kalsium dan vitamin D yang cukup." Dosis: Vitamin D 800-1200 IU/hari (D3 lebih dipilih dari D2). Kalsium >=800mg/hari (idealnya 1000mg dari diet + suplemen). [PERTIMBANGAN EBM] PNPK 2019 [I-A]: "Vitamin D dan kalsium dapat mencegah beberapa jenis fraktur." Bischoff-Ferrari NEJM 2012: dosis >=800 IU/hari efektif menurunkan risiko fraktur. Berikan mulai SEKARANG, tidak perlu tunggu DXA.',
          required: false,
          category: 'medication'
        },
        {
          id: 'fraktur-fragility-rujuk-dxa',
          title: 'Rujuk untuk DXA & Evaluasi Osteoporosis',
          description: 'PNPK 2019: "Pasien tua dengan fraktur sebaiknya dilakukan pemeriksaan osteoporosis dengan bone densitometry." DXA TIDAK tersedia di klinik -- rujuk ke RS/klinik dengan fasilitas DXA. PNPK 2019 Tabel 4: T-score <=-2.5: risiko tinggi (terapi). T-score -1.5 s/d -2.5: intermediat (FRAX). T-score >-1.5: rendah (preventif). Surat rujukan: cantumkan fraktur kerapuhan + faktor risiko.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-fragility-secondary-prevention',
          title: 'Edukasi Pencegahan Sekunder',
          description: 'PNPK 2019: "Fraktur kerapuhan meningkatkan risiko fraktur di masa datang." Pencegahan jatuh: latihan keseimbangan, review obat, koreksi penglihatan, modifikasi rumah. Nutrisi: kalsium, vitamin D, protein adekuat. Latihan: berjalan 30 menit/hari atau 45 menit 3x/seminggu (PNPK 2019). BERHENTI merokok. Kurangi alkohol.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'fraktur-fragility-bisphosphonate-ebm',
          title: '[PERTIMBANGAN EBM] Inisiasi Bisphosphonate di Klinik?',
          description: 'PNPK 2019: "Bisfosfonat merupakan terapi lini pertama osteoporosis" [I-A]. NAMUN, inisiasi terapi osteoporosis idealnya SETELAH DXA dan evaluasi lengkap oleh spesialis. Di klinik: berikan vitamin D + kalsium dulu, rujuk untuk DXA, biarkan spesialis memulai bisphosphonate. JANGAN inisiasi sendiri tanpa evaluasi -- ada kontraindikasi (insufisiensi ginjal, hipokalsemia). Centang jika merujuk untuk evaluasi terapi osteoporosis.',
          required: false,
          category: 'medication'
        }
      ]
    },

    // ============================================================
    // NODE 14: DECISION -- COMPARTMENT SYNDROME ALERT
    // (Accessible from any closed fracture pathway)
    // ============================================================
    'fraktur-compartment-decision': {
      id: 'fraktur-compartment-decision',
      type: 'decision',
      title: 'Decision: Curiga Sindrom Kompartemen?',
      description: 'PNPK 2019 Tabel 3: sindrom kompartemen dapat muncul pada fraktur tertutup Tipe II-III. Ini adalah EMERGENCY bedah. Diagnosis KLINIS -- jangan tunggu alat pengukur pressure (Stryker). Jika ragu: TREAT AS COMPARTMENT SYNDROME.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'fraktur-compartment-yes',
          title: '[HIGH] CURIGA SINDROM KOMPARTEMEN -- RUJUK SEGERA',
          description: 'Pain out of proportion + pain with passive stretch. Kompartemen tegang. LONGGARKAN SEMUA yang melingkar (splint, balut, gips). Elevasi setinggi jantung (BUKAN lebih tinggi -- menurunkan perfusi). RUJUK SEGERA untuk fasciotomy.',
          color: 'red',
          nextNodeId: 'fraktur-compartment-emergency',
          riskLevel: 'high'
        },
        {
          id: 'fraktur-compartment-no',
          title: 'Tidak Ada Tanda Sindrom Kompartemen',
          description: 'Nyeri terkontrol dengan analgesik, tidak ada nyeri saat passive stretch, kompartemen tidak tegang. TETAP monitor ketat 24-48 jam (terutama tibia dan forearm).',
          color: 'green',
          nextNodeId: 'fraktur-closed-semi-urgent-management',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 15: COMPARTMENT SYNDROME EMERGENCY
    // ============================================================
    'fraktur-compartment-emergency': {
      id: 'fraktur-compartment-emergency',
      type: 'checklist',
      title: 'Node 15: Sindrom Kompartemen -- Emergency Fasciotomy Needed',
      description: 'Fasciotomy harus dilakukan dalam 6 jam dari onset untuk mencegah nekrosis otot ireversibel. Di klinik tanpa OR: STABILISASI dan RUJUK SEGERA. Setiap menit delay meningkatkan kerusakan permanen.',
      items: [
        {
          id: 'fraktur-compart-remove-all',
          title: '[KRITIS] Lepaskan SEMUA yang Melingkar',
          description: 'Lepas SEMUA: splint, bandage, gips, perban, pakaian ketat. Bahkan cutting yang menurunkan pressure 40% bisa bermakna. Padding yang menekan juga dilepas. Ini harus dilakukan PERTAMA, bahkan sebelum analgesik.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-compart-elevate-heart-level',
          title: 'Posisi Tungkai Setinggi Jantung (BUKAN Lebih Tinggi)',
          description: 'SALAH: elevasi tinggi (menurunkan arterial perfusion pressure). BENAR: posisikan setinggi jantung (optimasi perfusi tanpa meningkatkan venous engorgement). [PERTIMBANGAN EBM] AAOS 2024: tidak ada evidence kuat bahwa elevasi meningkatkan outcome kompartemen -- yang terpenting adalah fasciotomy segera.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-compart-o2-monitor',
          title: 'Oksigen + Monitoring Kontinu',
          description: '[PULSE OXIMETER] Monitor SpO2 + HR kontinu. [TENSIMETER] TD setiap 15 menit (perfusion pressure = diastolic BP - compartment pressure). Berikan O2 supplemental jika SpO2 <94%. IV line terpasang. Analgesik IV (JANGAN menunda analgesik -- nyeri sindrom kompartemen SANGAT berat).',
          required: true,
          category: 'safety'
        },
        {
          id: 'fraktur-compart-rujuk-fasciotomy',
          title: 'RUJUK SEGERA untuk Fasciotomy',
          description: 'Fasciotomy hanya bisa dilakukan di OR. Surat rujukan: TEKANKAN "suspect compartment syndrome, butuh fasciotomy segera." Catat: (1) Waktu onset gejala (kapan nyeri mulai memberat), (2) Temuan klinis (6P), (3) Tindakan yang sudah dilakukan (splint dilepas, elevasi). Transport AMBULANS jika tersedia.',
          required: true,
          category: 'action'
        },
        {
          id: 'fraktur-compart-ebm-timing',
          title: '[PERTIMBANGAN EBM] Timing Fasciotomy & Outcome',
          description: 'EVIDENCE: Finkelstein et al. J Orthop Trauma 1996: fasciotomy <6 jam = recovery penuh. 6-12 jam = beberapa defisit permanen. >12 jam = kerusakan masif, amputasi mungkin diperlukan. Sheridan & Matsen J Orthop Trauma 1986: fasciotomy >12 jam dari onset = 100% residual deficit. PESAN: jangan tunda. Jika RAGU apakah ini sindrom kompartemen: PERLAKUKAN sebagai sindrom kompartemen dan RUJUK.',
          required: false,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 16: SPECIAL CONSIDERATIONS -- PEDIATRIC & ELDERLY
    // ============================================================
    'fraktur-special-populations': {
      id: 'fraktur-special-populations',
      type: 'checklist',
      title: 'Node 16: Pertimbangan Khusus -- Anak & Lansia',
      description: 'Fraktur pada populasi khusus memerlukan pendekatan berbeda. PNPK 2019: fraktur pada anak melibatkan lempeng epifisis (growth plate). Fraktur pada lansia sering patologis (osteoporosis/tumor).',
      items: [
        {
          id: 'fraktur-pediatric-growth-plate',
          title: '[ANAK] Fraktur Lempeng Epifisis (Growth Plate)',
          description: 'PNPK 2019: "Pada anak, adanya lempeng epifisis dapat membingungkan." Cedera Salter-Harris melibatkan growth plate -- bisa menyebabkan gangguan pertumbuhan jika tidak ditangani. Salah interpretasi di klinik tanpa rontgen: SELALU rujuk fraktur anak untuk imaging. [NOTE] Fraktur supracondylar humerus pada anak: risiko tinggi cedera neurovaskular (arteri brachialis + nervus medianus). SELALU cek nadi radialis.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'fraktur-pediatric-nad',
          title: '[ANAK] Skrining Non-Accidental Injury (Child Abuse)',
          description: 'CURIGA jika: (1) Mekanisme tidak sesuai cedera, (2) Delay presentasi (orang tua terlambat bawa), (3) Fraktur spiral pada anak yang belum bisa jalan, (4) Fraktur multipel dengan usia berbeda, (5) Riwayat cedera berulang, (6) Perilaku anak (ketakutan, withdrawn). Jika curiga: dokumentasikan, laporkan sesuai prosedur perlindungan anak.',
          required: false,
          category: 'safety'
        },
        {
          id: 'fraktur-elderly-pathological',
          title: '[LANSIA] Curiga Fraktur Patologis (Tumor/Metastasis)',
          description: 'PNPK 2019: "Penyebab tersering fraktur kerapuhan pada pasien usia >40 tahun: myelomatosis, karsinoma sekunder, Paget disease." Curiga jika: (1) Fraktur tanpa trauma adekuat, (2) Nyeri tulang progresif sebelum fraktur, (3) Penurunan berat badan, (4) Riwayat kanker. Rujuk untuk evaluasi lengkap (lab, imaging). [PERTIMBANGAN EBM] PNPK 2019: "Fraktur pada batang tulang panjang pada pasien tua = fraktur patologis sampai terbukti sebaliknya."',
          required: false,
          category: 'assessment'
        },
        {
          id: 'fraktur-elderly-anticoagulant',
          title: '[LANSIA] Pasien dengan Antikoagulan/Antiplatelet',
          description: 'Lansia sering minum Warfarin, DOAC, Aspirin, Clopidogrel -- meningkatkan perdarahan. Tanyakan obat-obatan. JANGAN hentikan antikoagulan sendiri (risiko stroke). Catat dalam surat rujukan. Mungkin butuh reversal agent di RS sebelum operasi. Fraktur minor bisa perdarahan signifikan pada antikoagulan.',
          required: false,
          category: 'medication'
        },
        {
          id: 'fraktur-elderly-ecg-preop',
          title: '[EKG] Pre-Referral EKG untuk Lansia (Persiapan Pre-Operatif)',
          description: 'Jika pasien >60 tahun dengan fraktur yang kemungkinan butuh operasi: lakukan EKG SEKARANG. Hasil EKG lampirkan dalam surat rujukan -- menghemat waktu pre-operatif di RS. Perhatikan: AF (risiko stroke, mungkin perlu bridging antikoagulan), iskemia, aritmia.',
          required: false,
          category: 'assessment'
        }
      ]
    }
  }
};
