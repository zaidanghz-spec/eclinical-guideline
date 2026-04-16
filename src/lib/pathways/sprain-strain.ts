import { DynamicPathway } from '../dynamicPathways';

export const sprainStrainPathway: DynamicPathway = {
  diseaseId: 'sprain-strain',
  diseaseName: 'Sprain dan Strain (Cedera Otot dan Ligamen)',
  startNodeId: 'ss-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT
    // ============================================================
    'ss-initial-assessment': {
      id: 'ss-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis & Pemeriksaan Fisik Terarah',
      description: 'Diagnosis klinis sangat penting di fasilitas tanpa X-Ray. Gunakan pendekatan Look, Feel, Move dan identifikasi kebutuhan rujukan X-Ray.',
      items: [
        {
          id: 'ss-anamnesis',
          title: 'Anamnesis: Mekanisme Cedera (OPQRST)',
          description: 'Kapan dan bagaimana cedera terjadi? (Mendarat salah, terpelintir, terbentur). Apakah ada bunyi "pop" / "krek" saat kejadian (tanda robekan ligamen parah)? Apakah bisa berjalan/menahan beban sesaat setelah kejadian dan saat ini?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ss-ttv',
          title: 'Vital Signs',
          description: 'Cek Tensi, Suhu, Nadi (TTV dasar minimal). Nyeri hebat dapat menaikkan TD dan nadi. Suhu biasanya normal (jika demam tanpa sumber lain, pikirkan infeksi, walau jarang di cedera tertutup).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ss-look-feel-move',
          title: 'Pemeriksaan Fisik LOKAL: Look, Feel, Move',
          description: 'LOOK: Bengkak? Memar (ekimosis)? Deformitas (perubahan bentuk tulang/sendi yang menyolok)? \nFEEL: Nyeri tekan pada jaringan lunak vs tulang? Teraba panas? \nMOVE: Range of Motion (ROM) terbatas karena nyeri? Sendi teraba longgar/instabil?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ss-ottawa-rules',
          title: 'Skrining Kebutuhan X-Ray (Ottawa Rules)',
          description: 'Klinik TANPA X-Ray WAJIB merujuk jika (Ottawa Ankle/Knee Rules): \n1. Nyeri tekan BONE (tulang) di batas posterior malleolus lateral/medial (6 cm ke atas), base metacarpal ke-5, atau tulang navicular. \n2. ATAU Pasien sama sekali TIDAK BISA menahan beban (jalan 4 langkah) baik saat kejadian maupun di klinik.',
          required: true,
          category: 'safety'
        },
        {
          id: 'ss-neurovaskular',
          title: 'Skrining Neurovaskular Distal',
          description: 'Cek CRT (Capillary Refill Time < 2 detik), Raba denyut nadi di bawah area cedera (dorso pedis / radialis), Cek sensorik/rasa di ujung jari. Defisit = DARURAT (Sindrom Kompartemen/Cedera Pembuluh Darah) -> RUJUK CITO!',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ss-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION
    // ============================================================
    'ss-triage-decision': {
      id: 'ss-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Rujuk atau Tangani di Klinik?',
      description: 'Tentukan apakah ini sprain/strain ringan-sedang, atau ada dugaan fraktur/komplikasi yang butuh pencitraan (X-Ray) dan Rujuk.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'ss-red-flag',
          title: 'RED FLAG POSITIF (Curiga Fraktur/Dislokasi/Grade III)',
          description: 'Deformitas tulang, bunyi "pop" + instabilitas sendi, gagal uji Ottawa (nyeri tulang/tidak bisa jalan 4 langkah), atau defisit neurovaskular distal.',
          color: 'red',
          nextNodeId: 'ss-referral-management',
          riskLevel: 'high'
        },
        {
          id: 'ss-no-red-flag',
          title: 'TIDAK ADA RED FLAG (Sprain/Strain Ringan-Sedang)',
          description: 'Nyeri pada ligamen/otot (bukan tulang), bengkak ringan-sedang, ROM terbatas nyeri tapi stabil, pasien MASIH BISA jalan/menahan beban minimal.',
          color: 'green',
          nextNodeId: 'ss-conservative-management',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: REFERRAL MANAGEMENT (RED FLAG)
    // ============================================================
    'ss-referral-management': {
      id: 'ss-referral-management',
      type: 'checklist',
      title: 'Node 3: Red Flag Positif — Imobilisasi Temporer & Rujuk',
      description: 'Pasien butuh kepastian X-Ray atau intervensi RS (Spesialis Bedah Orthopedi/UGD). Tugas klinik: stabilisasi dan analgesia awal.',
      items: [
        {
          id: 'ref-imobilisasi',
          title: 'Imobilisasi Sementara Sendi/Tulang',
          description: 'Pasang spalk (bidai) atau mitela/sling. Bidai harus melingkupi satu persendian di atas dan di bawah area cedera untuk menstabilkan. Jangan dibebat terlalu kencang (cek pulsasi distal setelah pasang bidai).',
          required: true,
          category: 'action'
        },
        {
          id: 'ref-analgesik',
          title: 'Berikan Analgesik PO Sebelum Merujuk',
          description: 'Gunakan Paracetamol 500-1000 mg oral, atau NSAID (Ibuprofen 400 mg / Asam Mefenamat 500mg) dengan makanan/antasida jika ada riwayat dispepsia, sambil menunggu dirujuk.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ref-rujuk-cepat',
          title: 'Rujuk ke IGD RS terdekat yang Punya X-Ray / Dokter Orthopedi',
          description: 'Siapkan surat rujukan memuat detail: Mekanisme cedera, hasil pemeriksaan (red flag), jam kejadian, obat yang sudah diberikan, dan indikasi permintaan Roentgen/X-Ray.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'ref-edukasi-larangan-urut',
          title: 'Edukasi: DILARANG KERAS DIURUT/PIJAT',
          description: 'Beritahu pasien dan keluarga sebelum merujuk, JANGAN DIPIJAT/DIURUT ke tukang pijat tulang. Dapat menyebabkan pembengkakan jaringan memburuk, emboli, atau memperparah fraktur tertutup menjadi terbuka.',
          required: true,
          category: 'safety'
        }
      ]
    },

    // ============================================================
    // NODE 4: CONSERVATIVE MANAGEMENT (PRICE / POLICE)
    // ============================================================
    'ss-conservative-management': {
      id: 'ss-conservative-management',
      type: 'checklist',
      title: 'Node 4: Tatalaksana Konservatif (Metode PRICE / POLICE)',
      description: 'Sprain/Strain derajat I (ringan) & II (sedang). Penanganan utama pada 48-72 jam pertama adalah mengendalikan inflamasi dan mengurangi nyeri.',
      items: [
        {
          id: 'price-protect-rest',
          title: 'Protection & Rest (Lindungi & Istirahat)',
          description: 'PROTECT: Lindungi area dari cedera lebih lanjut. REST: Istirahatkan bagian yang cedera. Kurangi tumpuan beban (weight-bearing). Jika kaki, bisa pakai tongkat kruk sementara. Jika lengan, kurangi aktivitas mengangkat.',
          required: true,
          category: 'action'
        },
        {
          id: 'price-ice',
          title: 'Ice (Kompres Dingin)',
          description: 'PENTING: Gunakan kompres es (ice pack / es dibungkus handuk) selama 15-20 menit, diulang setiap 2-3 jam pada 48 jam pertama. AWAS: Jangan taruh es langsung ke kulit (bisa frostbite). JANGAN KOMPRES PANAS/HANGAT di 48 jam pertama (memperburuk bengkak)!',
          required: true,
          category: 'action'
        },
        {
          id: 'price-compression',
          title: 'Compression (Kompresi dengan Elastic Bandage)',
          description: 'Balut area cedera dengan perban elastis (tensocrepe). Balut dari bagian distal (ujung) ke proksimal (atas) untuk mendorong aliran balik vena. Jangan terlalu ketat. Jika jari membiru, kesemutan, atau dingin, segera LONGGARKAN.',
          required: true,
          category: 'action'
        },
        {
          id: 'price-elevation',
          title: 'Elevation (Elevasi/Tinggikan)',
          description: 'Posisikan area yang cedera sedikit lebih tinggi dari level jantung, terutama saat duduk atau tidur. Cth: ganjal pergelangan kaki dengan bantal. Membantu gravitasi mengurangi pembengkakan/edema.',
          required: true,
          category: 'action'
        },
        {
          id: 'ss-nsaid',
          title: 'Medikasi: Analgesik / NSAID',
          description: 'Ibuprofen 400 mg 3x sehari ATAU Asam Mefenamat 500 mg 3x sehari (pc). Jika pasien lansia / ada riwayat ulkus peptikum, ganti dengan obat COX-2 inhibitor, atau Paracetamol 500-1000 mg 3-4x sehari.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ss-edukasi-bahaya-pijat',
          title: 'Edukasi: Dilarang Pijat 72 Jam Pertama (Prinsip HARM)',
          description: 'Hindari H.A.R.M: (Heat/Panas, Alkohol, Running/Aktivitas Berat, Massage/Pijat) pada 72 jam pertama karena akan meningkatkan aliran darah dan memperparah bengkak dan nyeri perut.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ss-education-followup'
    },

    // ============================================================
    // NODE 5: EDUCATION & FOLLOW-UP
    // ============================================================
    'ss-education-followup': {
      id: 'ss-education-followup',
      type: 'checklist',
      title: 'Node 5: Edukasi Akhir & Rencana Kontrol',
      description: 'Pastikan pasien memahami kapan harus kembali.',
      items: [
        {
          id: 'ss-followup-time',
          title: 'Kontrol dalam 3-5 Hari',
          description: 'Minta pasien datang kembali setelah 3-5 hari untuk evaluasi ulang tingkat nyeri, bengkak, dan instabilitas. Jika tidak membaik sama sekali atau memburuk, rujuk X-Ray.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'ss-return-to-activity',
          title: 'Edukasi Return to Activity Bertahap',
          description: 'Setelah 72 jam dan nyeri berkurang, boleh mulai kompres hangat. Mulai gerakkan sendi perlahan (ROM aktif) tanpa beban berat. Aktivitas olahraga berat baru boleh setelah sendi bebas nyeri sepenuhnya (bisa 2-6 minggu).',
          required: true,
          category: 'action'
        },
        {
          id: 'ss-red-flag-home',
          title: 'Kapan Ke IGD Segera (Return Precautions)',
          description: 'Edukasi ke pasien, segera ke RS jika: Timbul kebas/kesemutan hebat ujung jari, area di bawah cedera menjadi dingin/pucat kebiruan, nyeri menjadi tidak tertahankan (curiga kompartemen sindrom), atau tidak membaik sama sekali setelah berhari-hari.',
          required: true,
          category: 'safety'
        }
      ]
    }
  },
  references: [
    'KMK No. HK.01.07/MENKES/1186/2022 – Panduan Praktik Klinis bagi Dokter di Fasilitas Pelayanan Kesehatan Tingkat Pertama. Bab Muskuloskeletal: Sprain dan Strain.',
    'Brukner P, Khan K. Brukner & Khan\'s Clinical Sports Medicine. 5th ed. McGraw-Hill Education; 2017.',
    'Stiell IG, Greenberg GH, McKnight RD, et al. Decision rules for the use of radiography in acute ankle injuries. JAMA. 1993;269(9):1127-1132. (Ottawa Ankle Rules).',
    'Bleakley CM, Glasgow P, MacAuley DC. PRICE needs updating, should we call the POLICE? Br J Sports Med. 2012;46(4):220-221. (Protection Optimal Loading Ice Compression Elevation).'
  ]
};
