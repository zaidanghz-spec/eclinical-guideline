// ========================================================================
// FRAKTUR (TERBUKA & TERTUTUP) - REVISI BERSIH
// Referensi: PNPK Fraktur KMK HK.01.07/MENKES/270/2019
// ATLS 10th Edition 2018, Ottawa Rules, FLOW Trial (Lancet 2015)
// NICE NG38, BOAST 2020
// Setting: Klinik / FKTP tanpa X-Ray, CT, OR
// Alat: TTV (Tensi, Termometer, Oksimetri), EKG, Suction, Nebulizer
// Prinsip: ABCDE → Kontrol Perdarahan → Bidai → Nyeri → RUJUK
// ========================================================================

import { DynamicPathway } from '../dynamicPathways';

export const frakturPathway: DynamicPathway = {
  diseaseId: 'fraktur',
  diseaseName: 'Fraktur (Terbuka & Tertutup) — PNPK 2019',
  startNodeId: 'fraktur-primary-survey',
  nodes: {

    // ============================================================
    // NODE 1: PRIMARY SURVEY (ABCDE)
    // ============================================================
    'fraktur-primary-survey': {
      id: 'fraktur-primary-survey',
      type: 'checklist',
      title: 'Node 1: Primary Survey ABCDE — "Life Before Limb"',
      description: 'PNPK 2019: Resusitasi dan penanganan ancaman jiwa SELALU mendahului penanganan fraktur. Lakukan ABCDE dengan cepat dan serentak.',
      items: [
        {
          id: 'fraktur-airway',
          title: 'A — Airway (Bebaskan Jalan Napas + Proteksi Leher)',
          description: 'Buka jalan napas dengan jaw thrust (jika curiga cedera servikal). Bersihkan darah/muntahan dengan SUCTION jika ada. Jaga leher tetap netral (pasang collar jika tersedia).',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'fraktur-breathing',
          title: 'B — Breathing (Periksa Napas + SpO2)',
          description: 'Pasang oksimetri. Inspeksi dada: napas simetris? Ada jejas? Auskultasi: suara napas kiri-kanan sama? Jika SpO2 < 94% → beri O2. Curiga tension pneumothorax jika: deviasi trakea, hipersonor satu sisi, JVP meningkat → RUJUK CITO.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fraktur-circulation',
          title: 'C — Circulation (Kontrol Perdarahan + Cek TD)',
          description: 'Ukur tekanan darah dan nadi. Tekan langsung perdarahan eksternal dengan kasa steril. Pasang IV line 2 jalur jika bisa. Tanda syok: TD sistolik < 90, nadi > 100, akral dingin, CRT > 2 detik → tangani segera.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-tourniquet',
          title: 'Tourniquet Jika Perdarahan Masif Ekstremitas',
          description: 'Pasang tourniquet jika perdarahan ekstremitas tidak terkontrol dengan penekanan langsung. Catat WAKTU pemasangan. Jangan lebih dari 2 jam tanpa pelepasan sementara.',
          required: false,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-disability',
          title: 'D — Disability (Status Neurologis)',
          description: 'Nilai GCS (Eye/Verbal/Motor) + reaksi pupil. Periksa motorik dan sensorik semua ekstremitas. Curiga cedera spinal: kelemahan bilateral, priapismus, atau syok neurogenik (bradikardia + hipotensi) → jangan mobilisasi, stabilisasi dan RUJUK.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fraktur-exposure',
          title: 'E — Exposure (Buka Pakaian + Cegah Hipotermi)',
          description: 'Buka pakaian untuk periksa seluruh tubuh (anterior dan posterior/log roll jika curiga spinal). Cari perdarahan tersembunyi di abdomen, pelvis, atau paha. Tutup kembali dengan selimut setelah selesai untuk cegah hipotermia.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-shock-class',
          title: 'Kenali Kelas Syok Hemoragik',
          description: 'Kelas I (< 15% EBV): nadi & TD normal.\nKelas II (15-30%): takikardia, TD masih aman.\nKelas III (30-40%): takikardia + hipotensi.\nKelas IV (> 40%): takikardi berat, hipotensi berat, kesadaran turun.\nEstimasi kehilangan darah: Fraktur femur ~1-1.5L. Fraktur pelvis hingga 3L.',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'fraktur-ekg-indikasi',
          title: 'EKG — Skrining Jantung pada Trauma (Jika Indikasi)',
          description: 'Lakukan EKG jika: trauma tumpul dada (curiga kontusio miokard), pasien > 50 tahun, atau mekanisme sinkop/jatuh. Perhatikan aritmia atau perubahan ST. Lampirkan di surat rujukan.',
          required: false,
          category: 'assessment'
          role: 'both',
        }
      ],
      nextNodeId: 'fraktur-life-threat-decision'
    },

    // ============================================================
    // NODE 2: DECISION — ANCAMAN JIWA?
    // ============================================================
    'fraktur-life-threat-decision': {
      id: 'fraktur-life-threat-decision',
      type: 'decision',
      title: 'Node 2: Apakah Ada Ancaman Jiwa?',
      description: 'Nilai hemodinamik, SpO2, dan kesadaran setelah Primary Survey.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'fraktur-life-threatening',
          title: '🔴 ADA ANCAMAN JIWA — Stabilisasi & Rujuk CITO',
          description: 'Syok kelas III-IV, tension pneumothorax, flail chest, kesadaran turun, perdarahan internal masif, fraktur pelvis tidak stabil.',
          color: 'red',
          nextNodeId: 'fraktur-emergency-stabilize',
          riskLevel: 'high'
        },
        {
          id: 'fraktur-stable',
          title: '🟢 HEMODINAMIK STABIL — Lanjut Secondary Survey',
          description: 'TD sistolik > 90, nadi < 120, SpO2 > 94%, GCS 15. Tidak ada tanda perdarahan internal aktif.',
          color: 'green',
          nextNodeId: 'fraktur-secondary-survey',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: EMERGENCY — STABILISASI & RUJUK
    // ============================================================
    'fraktur-emergency-stabilize': {
      id: 'fraktur-emergency-stabilize',
      type: 'checklist',
      title: 'Node 3: Stabilisasi Darurat — Minimal & Cepat sebelum Rujuk',
      description: 'Di klinik tanpa OR dan radiologi: fokus stabilisasi cepat (A-B-C), lalu segera transfer. Setiap menit delay memperburuk prognosis pada syok hemoragik.',
      items: [
        {
          id: 'fraktur-emerg-cairan',
          title: '1. Resusitasi Cairan: RL / NaCl 0.9% Bolus',
          description: 'Bolus 500-1000 mL cepat jika TD sistolik < 90. Target: TD sistolik 80-90 mmHg (permissive hypotension pada trauma tanpa cedera kepala). Jangan overload cairan.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-emerg-perdarahan',
          title: '2. Kontrol Perdarahan Eksternal',
          description: 'Tekan langsung. Gunakan tourniquet pada perdarahan masif ekstremitas. Improvised pelvic binder (bedsheet diikat melingkar pelvis) jika curiga fraktur pelvis. JANGAN cabut benda yang menancap.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-emerg-bidai',
          title: '3. Bidai Sementara sebelum Transport',
          description: 'Bidai dengan bahan apapun yang tersedia (kayu, karton). Pastikan bidai mencakup sendi di atas dan bawah fraktur. Tujuan: kurangi nyeri, cegah cedera jaringan lunak bertambah, kurangi perdarahan.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-emerg-analgesik',
          title: '4. Analgesik IV untuk Transport',
          description: 'Ketorolac 30 mg IV (jika hemodinamik stabil) ATAU Tramadol 50 mg IV lambat. Morfin 2-4 mg IV titrasi hanya jika tersedia dan hemodinamik aman. Nyeri tidak terkontrol memperburuk syok.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'fraktur-emerg-monitor-transport',
          title: '5. Monitor Kontinu saat Transport',
          description: 'SpO2 dan nadi kontinu via oksimetri. TD setiap 5-10 menit. Suction standby jika risiko muntah. Pastikan IV line tetap berfungsi. Oksigen nasal kanul tetap terpasang.',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'fraktur-emerg-rujukan',
          title: '6. Surat Rujukan SBAR — Lengkap & Jelas',
          description: 'Cantumkan: mekanisme cedera, vital signs serial, temuan primary survey, tindakan yang sudah dilakukan, waktu tourniquet jika ada, cairan yang masuk, dan NPO status.',
          required: true,
          category: 'documentation'
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 4: SECONDARY SURVEY — LOOK / FEEL / MOVE
    // ============================================================
    'fraktur-secondary-survey': {
      id: 'fraktur-secondary-survey',
      type: 'checklist',
      title: 'Node 4: Secondary Survey — Look, Feel, Move (Tanpa Rontgen)',
      description: 'PNPK 2019: Pemeriksaan muskuloskeletal secara menyeluruh. Di klinik tanpa rontgen, diagnosis fraktur adalah KLINIS. Semua suspect fraktur harus di-splint dan dirujuk untuk imaging.',
      items: [
        {
          id: 'fraktur-anamnesis-moi',
          title: 'Anamnesis: Mekanisme Cedera (MOI)',
          description: 'High-energy (KLL, jatuh > 3 meter, tertimpa benda berat) → curiga fraktur multipel + cedera internal.\nLow-energy (jatuh dari berdiri, terpeleset) pada usia > 50 tahun → curiga fraktur kerapuhan/osteoporosis.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fraktur-anamnesis-gejala',
          title: 'Anamnesis: Gejala, Riwayat, & Obat',
          description: 'Tanyakan: nyeri lokasi, bengkak, tidak bisa digerakkan, mati rasa. Riwayat: osteoporosis, obat pengencer darah (Warfarin, aspirin, DOAC), alergi obat, jam makan terakhir (persiapan anestesi di RS).',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fraktur-look',
          title: 'LOOK — Lihat Deformitas, Kulit, Bengkak',
          description: 'Perhatikan: deformitas (angulasi, rotasi, pemendekan), edema, memar (ekimosis), luka terbuka (tulang terekspos?), kulit tegang/menonjol oleh fragmen (tented skin), warna kulit (pucat = gangguan vaskular).',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fraktur-feel',
          title: 'FEEL — Palpasi Nyeri Tekan & Krepitasi',
          description: 'Palpasi lembut sepanjang tulang. Nyeri tekan lokal pada tulang = sangat sugestif fraktur. Krepitasi JANGAN sengaja dicari — hanya catat jika terasa saat pemeriksaan. Suhu kulit distal (dingin = gangguan vaskular).',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fraktur-move',
          title: 'MOVE — Periksa Gerak Sendi',
          description: 'JANGAN paksa gerak jika ada deformitas jelas. Minta pasien gerakkan sendiri (active ROM) sendi di atas dan di bawah cedera. Gerakan abnormal pada shaft = fraktur. Ketidakmampuan gerak aktif = kehilangan fungsi.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fraktur-neurovascular',
          title: '⚠️ WAJIB: Pemeriksaan Neurovaskular Distal',
          description: 'VASKULAR: raba nadi distal (dorsalis pedis/tibialis posterior pada kaki; radialis/ulnaris pada tangan), CRT (< 2 detik normal), warna dan suhu kulit.\nNEUROLOGIS: rasa raba halus dan kekuatan gerak jari.\nDOKUMENTASI sebelum DAN sesudah setiap manipulasi!',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'fraktur-pelvis-spine',
          title: 'Periksa Pelvis & Tulang Belakang (High-Energy Trauma)',
          description: 'Pelvis: kompresi AP dan lateral gentle SEKALI saja (tidak diulang). Spine: palpasi processus spinosus dari atas ke bawah — nyeri midline atau step deformity? Jika curiga: jangan mobilisasi, pertahankan posisi log roll.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fraktur-ottawa-rules',
          title: 'Ottawa Rules (Untuk Ankle / Lutut) — Bantu Triase Rujukan',
          description: 'Ottawa Ankle Rules: POSITIF (perlu rontgen) jika: tidak bisa weight-bear 4 langkah ATAU nyeri tekan pada maleolus posterior/ujung fibula/basis metatarsal V/navikular.\nJika NEGATIF: kemungkinan fraktur < 2%, bisa rujukan non-urgent.',
          required: false,
          category: 'assessment'
          role: 'doctor',
        }
      ],
      nextNodeId: 'fraktur-open-closed-decision'
    },

    // ============================================================
    // NODE 5: DECISION — TERBUKA vs TERTUTUP
    // ============================================================
    'fraktur-open-closed-decision': {
      id: 'fraktur-open-closed-decision',
      type: 'decision',
      title: 'Node 5: Fraktur Terbuka atau Tertutup?',
      description: 'PNPK 2019: Fraktur terbuka adalah kegawatdaruratan karena risiko infeksi berat (osteomielitis, sepsis). Prioritas: antibiotik dan rujuk untuk debridemen di OK.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'fraktur-open',
          title: '🔴 FRAKTUR TERBUKA — Ada Luka di Area Fraktur',
          description: 'Tulang terekspos ATAU ada luka yang berhubungan dengan lokasi fraktur. Kegawatdaruratan — butuh antibiotik segera, irigasi, dan debridemen di OK.',
          color: 'red',
          nextNodeId: 'fraktur-open-management',
          riskLevel: 'high'
        },
        {
          id: 'fraktur-nv-problem',
          title: '🔴 GANGGUAN NEUROVASKULAR — Ancaman Hilangnya Tungkai',
          description: 'Nadi distal tidak teraba, CRT > 4 detik, ekstremitas pucat/dingin/biru, mati rasa atau paralisis. Window revaskularisasi: < 6 jam!',
          color: 'red',
          nextNodeId: 'fraktur-neurovascular-emergency',
          riskLevel: 'high'
        },
        {
          id: 'fraktur-closed',
          title: '🟢 FRAKTUR TERTUTUP — Kulit Intak',
          description: 'Tidak ada luka yang berhubungan dengan fraktur. Waspadai sindrom kompartemen (terutama tibia dan forearm).',
          color: 'blue',
          nextNodeId: 'fraktur-closed-management',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 6: FRAKTUR TERBUKA — MANAJEMEN AWAL
    // ============================================================
    'fraktur-open-management': {
      id: 'fraktur-open-management',
      type: 'checklist',
      title: 'Node 6: Fraktur Terbuka — Protokol Awal (Sebelum Rujuk)',
      description: 'PNPK 2019: Fraktur terbuka butuh stabilisasi hemodinamik, antibiotik, dan debridemen di OK. Di klinik: antibiotik SEKARANG, irigasi awal, tutup luka steril, bidai, tetanus, lalu rujuk.',
      items: [
        {
          id: 'fraktur-open-grade',
          title: '1. Klasifikasi Gustilo-Anderson (Catat di Surat Rujukan)',
          description: 'Grade I: luka < 1 cm, bersih.\nGrade II: luka > 1 cm, tanpa avulsi berat.\nGrade IIIA: jaringan lunak cukup menutup tulang.\nGrade IIIB: jaringan lunak tidak cukup, perlu rekonstruksi.\nGrade IIIC: ada cedera arteri yang perlu reparasi (risiko amputasi 25%).',
          required: true,
          category: 'assessment'
          role: 'doctor',
        },
        {
          id: 'fraktur-open-abx',
          title: '2. ⚑ ANTIBIOTIK SEGERA — Berikan Sekarang! (PNPK 2019, Rekomendasi I-A)',
          description: 'Grade I-II: Cefazolin 2 g IV (atau Cefuroxime 1.5 g IV).\nGrade III: Cefazolin 2 g IV + Gentamisin 5 mg/kgBB IV.\nKontaminasi tanah/sawah: tambah Penisilin dosis tinggi (untuk Clostridium).\nAlergi sefalosporin: Klindamisin 900 mg IV.\nJANGAN tunggu rujukan — berikan sekarang!',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'fraktur-open-tetanus',
          title: '3. Profilaksis Tetanus (PNPK 2019, I-A)',
          description: 'Semua fraktur terbuka → berikan:\n• TT 0.5 mL IM jika belum booster > 10 tahun atau status tidak diketahui.\n• TIG 250-500 IU IM di ekstremitas berbeda jika riwayat imunisasi tidak lengkap/tidak pernah.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'fraktur-open-foto-luka',
          title: '4. Foto Dokumentasi Luka SEBELUM Ditutup',
          description: 'Foto dengan penggaris sebagai skala. Tujuan: RS rujukan tidak perlu buka ulang perban (mengurangi risiko kontaminasi ulang). Lampirkan foto di surat rujukan.',
          required: true,
          category: 'documentation'
          role: 'both',
        },
        {
          id: 'fraktur-open-irigasi',
          title: '5. Irigasi Awal dengan NaCl 0.9% (Tekanan Rendah)',
          description: 'Irigasi 1-2 L NaCl 0.9% untuk membilas kontaminan kasar. JANGAN gunakan antiseptik (povidon-iod, klorheksidin, H2O2) — merusak jaringan dan tidak lebih efektif dari salin saja (FLOW Trial, Lancet 2015). Jangan lakukan debridemen agresif di klinik.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-open-tutup-luka',
          title: '6. Tutup Luka Sementara (Kasa Steril + NaCl 0.9%)',
          description: 'Tutup dengan kasa steril basah (dibasahi NaCl 0.9%), balut. JANGAN: masukkan tulang yang mencuat ke dalam, jahit luka, atau tutup rapat (meningkatkan risiko infeksi anaerob). Penutupan definitif di OK oleh operator.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-open-bidai',
          title: '7. Bidai Sementara (Sendi Atas + Bawah Fraktur)',
          description: 'Gunakan backslab/posterior slab (BUKAN gips sirkumferensial — meningkatkan risiko kompartemen). Pastikan bidai mencakup sendi 1 tingkat di atas dan bawah fraktur. Cek neurovaskular distal SETELAH bidai terpasang.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-open-analgesik',
          title: '8. Analgesik IV (Nyeri Fraktur Terbuka Sangat Berat)',
          description: 'Paracetamol 1 g IV + Ketorolac 30 mg IV (jika tidak ada risiko perdarahan berat). Tramadol 50-100 mg IV lambat jika masih nyeri. Morfin 2-4 mg IV titrasi jika tersedia dan hemodinamik stabil.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'fraktur-open-rujuk-ok',
          title: '9. RUJUK SEGERA ke Ortopedi / OK',
          description: 'Surat rujukan wajib cantumkan: waktu kejadian, mekanisme, grade Gustilo, foto luka, antibiotik yang diberikan + waktu pemberian, status tetanus, status neurovaskular distal, vital signs, EKG jika dilakukan.',
          required: true,
          category: 'safety'
          role: 'doctor',
        }
      ]
    },

    // ============================================================
    // NODE 7: FRAKTUR TERTUTUP — MANAJEMEN
    // ============================================================
    'fraktur-closed-management': {
      id: 'fraktur-closed-management',
      type: 'checklist',
      title: 'Node 7: Fraktur Tertutup — Tatalaksana Awal (PNPK 2019)',
      description: 'Di klinik tanpa rontgen: diagnosis klinis, bidai, analgesik, dan tentukan urgensi rujukan. SEMUA suspect fraktur harus dirujuk untuk konfirmasi imaging.',
      items: [
        {
          id: 'fraktur-closed-diagnosis-klinis',
          title: '1. Diagnosis Klinis Fraktur (Tanpa Rontgen)',
          description: 'Suspect fraktur jika ≥ 3 dari: mekanisme cedera adekuat, nyeri tekan lokal tepat pada tulang, deformitas (angulasi/rotasi/pemendekan), krepitasi, gerakan abnormal, atau hilang fungsi.\nSemua suspect fraktur → bidai dan rujuk untuk rontgen.',
          required: true,
          category: 'assessment'
          role: 'doctor',
        },
        {
          id: 'fraktur-closed-kompartemen-skrining',
          title: '⚠️ 2. Skrining Sindrom Kompartemen — SETIAP PASIEN!',
          description: 'Tanda AWAL yang harus dikenali:\n• Nyeri tidak sebanding dengan cedera (pain out of proportion)\n• Nyeri saat jari digerakkan pasif (pain with passive stretch)\nTanda LANJUT (sudah terlambat!): mati rasa, pucat, nadi menghilang, paralisis.\nHigh-risk: fraktur tibia, forearm, supracondylar humerus (anak). Jika curiga → RUJUK SEGERA.',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'fraktur-closed-bidai',
          title: '3. Pembidaian Sementara (PNPK 2019)',
          description: 'Gunakan backslab/posterior slab (BUKAN gips melingkar penuh — risiko kompartemen). Bidai mencakup sendi 1 tingkat di atas dan bawah fraktur. Padding di tonjolan tulang (maleolus, olekranon). Cek neurovaskular SETELAH bidai.\nPanduan lokasi:\n• Klavikula/bahu: arm sling\n• Forearm: sugar-tong splint\n• Pergelangan tangan: thumb spica / volar slab\n• Tungkai bawah: long-leg posterior slab\n• Ankle: backslab posterior\n• Jari: buddy-taping',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'fraktur-closed-neurovascular-post-bidai',
          title: '4. ⚠️ Re-check Neurovaskular Setelah Bidai',
          description: 'Bidai yang terlalu ketat bisa menekan pembuluh darah/saraf. Wajib periksa ulang: nadi distal, CRT, sensasi, dan gerak jari. Bandingkan dengan status sebelum bidai. Jika nadi hilang atau kesemutan baru → longgarkan bidai segera.',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'fraktur-closed-analgesik',
          title: '5. Analgesik Multimodal (WHO Pain Ladder)',
          description: 'Step 1: Paracetamol 500-1000 mg oral setiap 6 jam (minum rutin, bukan hanya saat nyeri).\nStep 2: tambah NSAID — Ibuprofen 400 mg 3x/hari sesudah makan (HATI-HATI pada lansia/gagal ginjal, max 5-7 hari).\nStep 3: tambah Tramadol 50 mg 3-4x/hari jika nyeri berat.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'fraktur-closed-rice',
          title: '6. RICE Protocol',
          description: 'Rest: hindari tumpuan berat pada fraktur ekstremitas bawah (gunakan tongkat/kruk).\nIce: kompres es 20 menit on/off selama 48-72 jam pertama.\nCompression: balut elastis gentle.\nElevation: tinggikan lebih tinggi dari jantung (bantal di bawah betis, BUKAN di bawah lutut).',
          required: true,
          category: 'action'
          role: 'nurse',
        }
      ],
      nextNodeId: 'fraktur-urgency-decision'
    },

    // ============================================================
    // NODE 8: DECISION — URGENSI RUJUKAN FRAKTUR TERTUTUP
    // ============================================================
    'fraktur-urgency-decision': {
      id: 'fraktur-urgency-decision',
      type: 'decision',
      title: 'Node 8: Seberapa Mendesak Rujukan?',
      description: 'Tanpa rontgen, lebih baik over-refer daripada melewatkan fraktur signifikan.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'urgency-same-day',
          title: '🔴 URGENT — Rujuk Hari Ini (Same Day)',
          description: 'Deformitas berat (angulasi > 30°, rotasi, pemendekan jelas), tented skin (kulit tegang oleh fragmen), curiga fraktur femur/pelvis/intra-articular, atau curiga sindrom kompartemen.',
          color: 'red',
          nextNodeId: 'fraktur-urgent-refer',
          riskLevel: 'high'
        },
        {
          id: 'urgency-1-3-days',
          title: '🟠 SEMI-URGENT — Rujuk 1-3 Hari',
          description: 'Deformitas sedang, fraktur shaft tulang panjang stabil dalam splint, edema signifikan. Splint + analgesik + follow-up segera.',
          color: 'orange',
          nextNodeId: 'fraktur-semi-urgent-management',
          riskLevel: 'medium'
        },
        {
          id: 'urgency-elective',
          title: '🟢 NON-URGENT — Rujuk 1-2 Minggu',
          description: 'Suspect fraktur minimal: nyeri tekan lokal ringan, bisa weight-bear, tanpa deformitas bermakna. (Contoh: iga, klavikula non-displaced, jari).',
          color: 'green',
          nextNodeId: 'fraktur-conservative',
          riskLevel: 'low'
        },
        {
          id: 'urgency-fragility',
          title: '🟣 FRAKTUR KERAPUHAN — Lansia / Osteoporosis',
          description: 'Low-energy trauma pada usia > 50 tahun atau postmenopause. Perlu evaluasi osteoporosis + manajemen fraktur. Fraktur hip → URGENT (operasi < 48 jam).',
          color: 'purple',
          nextNodeId: 'fraktur-fragility',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 9: URGENT REFER
    // ============================================================
    'fraktur-urgent-refer': {
      id: 'fraktur-urgent-refer',
      type: 'checklist',
      title: 'Node 9: Fraktur Urgent — Persiapan Rujukan Hari Ini',
      description: 'Pastikan pasien tiba di RS dengan kondisi terstabilisasi, surat rujukan lengkap, dan perut kosong (NPO) untuk persiapan operasi/sedasi.',
      items: [
        {
          id: 'urgent-koreksi-deformitas',
          title: '1. Koreksi Deformitas Gross (Jika Terlatih)',
          description: 'Jika ada deformitas berat yang menyebabkan tented skin atau gangguan neurovaskular: lakukan traksi inline gentle sebelum splint. JIKA TIDAK terlatih: splint as-is dan RUJUK — jangan paksakan reposisi tanpa rontgen.',
          required: false,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'urgent-bidai-optimal',
          title: '2. Bidai Optimal sebelum Transport',
          description: 'Posisi fungsional: ankle 90°, lutut fleksi ringan (10-15°), siku 90°, pergelangan tangan netral. Padding di tonjolan tulang. Backslab/posterior slab (bukan gips melingkar). Ikat dengan elastic bandage.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'urgent-npo',
          title: '3. NPO (Puasa) — Persiapan Operasi/Sedasi',
          description: 'Kemungkinan besar butuh operasi atau sedasi untuk reposisi di RS. Instruksikan: makanan padat puasa 6 jam, cairan jernih puasa 2 jam. Catat jam makan terakhir dalam surat rujukan.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'urgent-monitor-serial',
          title: '4. Monitor Neurovaskular Setiap 30 Menit',
          description: 'Sampai pasien ditransfer: periksa nadi distal, CRT, sensasi, gerak jari. Catat tiap pemeriksaan. Jika memburuk → longgarkan splint, jika tetap memburuk → curiga kompartemen → rujuk lebih cito.',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'urgent-surat-rujukan',
          title: '5. Surat Rujukan Lengkap (SBAR)',
          description: 'Wajib cantumkan: waktu cedera + mekanisme, temuan Look/Feel/Move, status neurovaskular (sebelum dan sesudah bidai), analgesik yang diberikan, splint yang dipasang, vital signs (termasuk EKG jika ada), komorbid + obat rutin, NPO status.',
          required: true,
          category: 'documentation'
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 10: SEMI-URGENT MANAGEMENT
    // ============================================================
    'fraktur-semi-urgent-management': {
      id: 'fraktur-semi-urgent-management',
      type: 'checklist',
      title: 'Node 10: Fraktur Semi-Urgent — Rawat Jalan, Kontrol 1-3 Hari',
      description: 'Fraktur stabil dalam splint, tanpa gangguan neurovaskular aktif. Aman rawat jalan dengan edukasi red flags yang jelas.',
      items: [
        {
          id: 'semi-resep-analgesik',
          title: '1. Resep Analgesik Oral',
          description: 'Paracetamol 500-1000 mg setiap 6 jam (minum rutin, bukan hanya saat nyeri). Ibuprofen 400 mg 3x/hari sesudah makan (maksimal 5-7 hari). Tramadol 50 mg 3x/hari jika nyeri masih berat.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'semi-edukasi-splint',
          title: '2. Edukasi Perawatan Splint di Rumah',
          description: 'Jaga splint tetap kering (bungkus plastik saat mandi). Elevasi anggota gerak saat istirahat. Gerakkan jari tangan/kaki setiap jam untuk mencegah kaku. JANGAN lepas splint sendiri. JANGAN masukkan benda ke dalam splint.',
          required: true,
          category: 'documentation'
          role: 'both',
        },
        {
          id: 'semi-red-flags',
          title: '⚠️ 3. Edukasi RED FLAGS — Kapan Harus Segera ke IGD',
          description: 'Segera kembali atau ke IGD jika:\n• Nyeri semakin berat meski sudah minum obat (curiga kompartemen!)\n• Jari tangan/kaki mati rasa, kesemutan, atau tidak bisa digerakkan\n• Jari pucat, dingin, atau kebiruan\n• Splint terasa sangat ketat tiba-tiba\n• Muncul bau busuk dari luka/splint',
          required: true,
          category: 'safety'
          role: 'both',
        },
        {
          id: 'semi-followup',
          title: '4. Jadwal Kontrol: Klinik Ortopedi 1-3 Hari',
          description: 'Berikan surat pengantar ke RS untuk rontgen konfirmasi fraktur dan evaluasi rencana definitif (konservatif atau operasi). Jika tidak ada ortopedi di RS terdekat, arahkan ke RS lain yang tersedia.',
          required: true,
          category: 'documentation'
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 11: CONSERVATIVE / NON-URGENT
    // ============================================================
    'fraktur-conservative': {
      id: 'fraktur-conservative',
      type: 'checklist',
      title: 'Node 11: Fraktur Minimal / Konservatif — Proteksi & Follow-Up',
      description: 'PNPK 2019: Proteksi saja untuk fraktur yang tidak bergeser, stabil. Contoh: iga, klavikula non-displaced, falang, fraktur kompresi ringan vertebra. Tetap HARUS dirujuk untuk rontgen konfirmasi.',
      items: [
        {
          id: 'conservative-proteksi',
          title: '1. Proteksi Sesuai Lokasi',
          description: 'Ekstremitas atas: arm sling.\nEkstremitas bawah: kurangi tumpuan beban (gunakan tongkat/kruk).\nIga: Analgesik adekuat adalah tatalaksana utama (bukan elastic bandage ketat — menghambat napas dalam dan meningkatkan risiko pneumonia).\nJari: buddy-taping.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'conservative-analgesik',
          title: '2. Analgesik Oral',
          description: 'Paracetamol 500-1000 mg setiap 6 jam + Ibuprofen 400 mg 3x/hari sesudah makan (5-7 hari). Tramadol 50 mg 3x/hari jika masih nyeri signifikan.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'conservative-nutrisi',
          title: '3. Optimasi Penyembuhan Tulang',
          description: 'Kalsium 1000 mg/hari dari makanan (susu, keju, ikan kecil) + suplemen jika kurang. Vitamin D cukup (paparan matahari pagi + suplemen 800-1200 IU/hari jika lansia). Protein adekuat. Berhenti merokok (merokok memperlambat penyembuhan tulang 2-3x).',
          required: false,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'conservative-followup',
          title: '4. Follow-Up: Rontgen Elektif 1-2 Minggu',
          description: 'Surat pengantar untuk rontgen konfirmasi. Beberapa fraktur (skaphoid, stress fracture) baru tampak di rontgen setelah 2-3 minggu. Kembalikan jika: nyeri semakin berat, bengkak progresif, atau fungsi memburuk.',
          required: true,
          category: 'documentation'
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 12: NEUROVASCULAR EMERGENCY
    // ============================================================
    'fraktur-neurovascular-emergency': {
      id: 'fraktur-neurovascular-emergency',
      type: 'checklist',
      title: 'Node 12: Gangguan Neurovaskular — Limb-Threatening! Rujuk CITO',
      description: 'Waktu iskemia hangat > 6 jam = kerusakan otot ireversibel. "Golden period" revaskularisasi < 6 jam. Stabilisasi segera dan transfer ke RS dengan bedah vaskular.',
      items: [
        {
          id: 'nv-catat-waktu-iskemia',
          title: '1. ⏱ Catat Waktu Mulai Iskemia',
          description: 'Kapan tungkai mulai pucat/dingin/nadi hilang? Ini menentukan apakah masih dalam golden period (< 6 jam). Cantumkan waktu ini di surat rujukan sebagai informasi terpenting bagi bedah vaskular.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'nv-hard-signs',
          title: '2. Identifikasi Hard Signs Cedera Vaskular',
          description: 'Hard signs (butuh OR segera): nadi tidak teraba distal, perdarahan pulsatil, hematoma membesar, bruit/thrill, iskemia distal (6P: Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia).\nSoft signs (butuh angiografi): nadi lemah/asimetri, hematoma stabil non-pulsatil.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'nv-realign',
          title: '3. Koreksi Alignment Gentle (Traksi Inline)',
          description: 'Deformitas berat bisa menekan atau menekuk arteri. Lakukan traksi inline gentle untuk restore alignment. Cek ulang nadi setelah koreksi — jika nadi kembali: splint, monitor ketat, tetap rujuk. Jika nadi tetap hilang: RUJUK CITO tanpa menunda.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'nv-splint-transport',
          title: '4. Bidai Longgar + Transport SEGERA dengan Ambulans',
          description: 'Bidai untuk stabilisasi (JANGAN ketat — mengurangi perfusi). Elevasi tungkai ringan. IV line + oksigen tetap berjalan. Analgesik IV. Monitor SpO2 + TD kontinu. Hubungi RS tujuan terlebih dahulu untuk persiapan tim bedah vaskular.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'nv-surat-rujukan',
          title: '5. Surat Rujukan — Tekankan "LIMB-THREATENING EMERGENCY"',
          description: 'Wajib cantumkan: waktu onset iskemia, hard signs yang ditemukan, upaya realignment + hasilnya, status neurovaskular serial (sebelum dan sesudah), vital signs, mekanisme cedera.',
          required: true,
          category: 'documentation'
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 13: FRAKTUR KERAPUHAN / OSTEOPOROSIS
    // ============================================================
    'fraktur-fragility': {
      id: 'fraktur-fragility',
      type: 'checklist',
      title: 'Node 13: Fraktur Kerapuhan — Osteoporosis & Skrining Ulang Jatuh',
      description: 'PNPK 2019: Fraktur kerapuhan = komplikasi utama osteoporosis. Jatuh dari berdiri pada usia > 50 tahun yang menyebabkan fraktur harus memicu evaluasi osteoporosis. Fraktur berikutnya dapat dicegah.',
      items: [
        {
          id: 'fragility-identifikasi',
          title: '1. Konfirmasi Fraktur Kerapuhan',
          description: 'Curiga jika: jatuh dari berdiri (low-energy), usia > 50 tahun (terutama wanita postmenopause), lokasi khas: pergelangan tangan, pinggul (femur proksimal), tulang belakang, bahu.\nFraktur pada batang tulang panjang pasien tua → anggap patologis sampai terbukti sebaliknya.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fragility-fraktur-hip-urgent',
          title: '⚑ 2. Fraktur Pinggul (Hip) = URGENT — Operasi dalam 48 Jam!',
          description: 'Fraktur proksimal femur pada lansia: operasi dalam 36-48 jam menurunkan mortalitas secara bermakna. Delay > 48 jam meningkatkan mortalitas hingga 41%. Rujuk hari ini jika curiga fraktur pinggul.',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'fragility-risiko-jatuh',
          title: '3. Asesmen Risiko Jatuh',
          description: 'Tanyakan: riwayat jatuh sebelumnya? Obat yang meningkatkan risiko jatuh (sedatif, antihipertensi, hipoglikemik)? Gangguan penglihatan/keseimbangan? Bahaya di rumah (lantai licin, tangga gelap)?\nPeriksa hipotensi ortostatik: ukur TD baring lalu berdiri — jika sistolik turun > 20 mmHg → risiko jatuh tinggi.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'fragility-vitamin-d',
          title: '4. Mulai Suplementasi Vitamin D + Kalsium (PNPK 2019, I-A)',
          description: 'Berikan dari sekarang tanpa menunggu DXA:\n• Vitamin D3 800-1200 IU/hari\n• Kalsium ≥ 800 mg/hari (dari makanan + suplemen)\nRujuk ke spesialis untuk DXA bone scan dan evaluasi terapi bisphosphonate jika indikasi.',
          required: false,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'fragility-edukasi',
          title: '5. Edukasi Pencegahan Jatuh & Fraktur Ulang',
          description: 'Latihan keseimbangan (Tai Chi, latihan proprioception). Review semua obat-obatan — kurangi polifarmasi. Modifikasi lingkungan rumah: karpet anti-slip, pegangan di kamar mandi, pencahayaan cukup. Berhenti merokok + kurangi alkohol.',
          required: true,
          category: 'documentation'
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 14: SINDROM KOMPARTEMEN — EMERGENCY
    // ============================================================
    'fraktur-compartment-emergency': {
      id: 'fraktur-compartment-emergency',
      type: 'checklist',
      title: 'Node 14: Sindrom Kompartemen — RUJUK CITO untuk Fasciotomy!',
      description: 'Fasciotomy dalam < 6 jam dari onset = recovery penuh. > 12 jam = kerusakan permanen dan kemungkinan amputasi. Di klinik tanpa OR: bebaskan tekanan, stabilisasi, dan RUJUK SEGERA.',
      items: [
        {
          id: 'kompart-lepas-semua',
          title: '1. ⚑ LEPASKAN SEMUA yang Melingkar — PERTAMA KALI!',
          description: 'Lepas semua: splint, balut elastis, gips, pakaian ketat. Bahkan cutting splint saja dapat menurunkan tekanan kompartemen hingga 40%. Lakukan SEBELUM tindakan lain apapun.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'kompart-posisi',
          title: '2. Posisi Tungkai Setinggi Jantung (BUKAN Lebih Tinggi)',
          description: 'SALAH: elevasi tinggi (menurunkan arterial perfusion pressure).\nBETUL: posisikan setinggi jantung saja — menjaga keseimbangan antara perfusi arteri dan pengurangan edema vena.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'kompart-oksigen-monitoring',
          title: '3. Oksigen + Monitor Kontinu',
          description: 'Oksigen 2-4 L/menit nasal kanul. SpO2 + HR kontinu via oksimetri. TD setiap 15 menit. IV line untuk analgesik — JANGAN menahan analgesik, nyeri kompartemen sangat berat.',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'kompart-rujuk',
          title: '4. RUJUK SEGERA — Pasien Butuh Fasciotomy di OK',
          description: 'Tekankan di surat rujukan: "suspect compartment syndrome, butuh fasciotomy segera."\nCantumkan: waktu onset nyeri memberat, temuan klinis (6P), tindakan yang sudah dilakukan (splint dilepas, posisi). Transport ambulans jika tersedia.',
          required: true,
          category: 'action'
          role: 'doctor',
        }
      ]
    }

  },
  references: [
    'KMK No. HK.01.07/MENKES/270/2019 — Pedoman Nasional Praktik Klinis (PNPK) Penatalaksanaan Fraktur.',
    'American College of Surgeons. Advanced Trauma Life Support (ATLS), 10th Edition. 2018.',
    'Bhandari M, et al. (FLOW Trial). Fluid Lavage of Open Wounds (FLOW): A Multicenter, Blinded Trial. Lancet. 2015.',
    'Stiell IG, et al. Ottawa Ankle Rules — A decision rule for the use of radiography in acute ankle injuries. JAMA. 1993.',
    'British Orthopaedic Association Standards for Trauma (BOAST). Open Fracture Management. 2020.',
    'NICE Guideline NG38. Fractures (non-complex): assessment and management. 2016 (Updated 2023).',
    'Shiga T, et al. Is operative delay associated with increased mortality of hip fracture patients? CMAJ. 2008.'
  ]
};
