// ============================================================
// DEMAM / INFEKSI DENGUE (DBD / DSS)
// ICD-10: A91
// Referensi:
// - Pedoman Nasional Pelayanan Kedokteran (PNPK) Infeksi Dengue (Kemenkes 2021)
// - WHO Comprehensive Guidelines for Prevention and Control of Dengue and DHF (Revised)
// Setting: Klinik / FKTP / Poli Umum
// Alat Terbatas: TTV (Tensi, Termometer, Oksimetri), Tourniquet (Manset Tensi), Infus/Cairan Kristaloid.
// Fokus Utama di Klinik Primer: Triage "Warning Signs", Deteksi Syok (DSS) sejak dini, 
// dan penentuan siapa yang bisa dirawat di rumah (Poli) vs Rujuk CITO.
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const dbdPathway: DynamicPathway = {
  diseaseId: 'dbd',
  diseaseName: 'Infeksi Dengue (DBD / DSS)',
  startNodeId: 'dengue-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT
    // ============================================================
    'dengue-initial-assessment': {
      id: 'dengue-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Pemeriksaan TTV & Pencarian "Warning Signs"',
      description: 'Lakukan di 5 menit pertama untuk menilai stabilitas hemodinamik pasien demam pelana kuda.',
      items: [
        {
          id: 'dbd-anamnesis-akut',
          title: 'Anamnesis Karakteristik Demam',
          description: 'Demam mendadak tinggi 2-7 hari (bifasik/pelana kuda), nyeri kepala hebat, nyeri retro-orbital (belakang mata), nyeri otot/sendi (break-bone fever).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-ttv-hemodinamik',
          title: 'Periksa TTV Kritis & Perifer (AWAS SYOK!)',
          description: 'Cek Tekanan Darah (Pulse pressure sempik < 20 mmHg? misal 100/90).\nCek Nadi (Takikardi hebat >100x/mnt? Lemah/halus?).\nCek Akral (Raba tangan dan kaki: dingin? basah? lembap?).\nCek CRT (Capillary Refill Time > 2 detik?).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-warning-signs',
          title: 'Cari Gejala "Warning Signs" (Tanda Waspada)',
          description: 'Tanyakan dan observasi:\n- Sakit perut / nyeri tekan perut terus-menerus?\n- Muntah persisten (> 3x dalam 24 jam)?\n- Lemah, letargi, atau gelisah?\n- Perdarahan mukosa (mimisan, gusi berdarah, BAB hitam/melena)?',
          required: true,
          category: 'safety'
        },
        {
          id: 'dbd-rumpel-leede',
          title: 'Uji Tourniquet (Rumple Leede Test)',
          description: 'Pompa tensimeter di pertengahan sistolik & diastolik, tahan 5 menit. Positif bila > 10 petekie di area 1 inchi persegi volar lengan bawah. (Positif = kapiler rapuh, curiga Dengue).',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'dengue-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION (POLI VS IGD)
    // ============================================================
    'dengue-triage-decision': {
      id: 'dengue-triage-decision',
      type: 'decision',
      title: 'Node 2: Triase Rujukan Dengue',
      description: 'Klasifikasikan derajat infeksi Dengue untuk menentukan lokasi perawatan. Sesuai WHO Kategori A, B, C.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'dengue-syok',
          title: '🔴 Dengue Shock Syndrome (DSS) / Kategori C',
          description: 'Akral dingin, CRT > 2 dtk, nadi sangat lemah/cepat, TD turun atau hipotensi (<90/60). Kondisi Mengancam Nyawa!',
          color: 'red',
          nextNodeId: 'dbd-resusitasi-rujuk',
          riskLevel: 'high'
        },
        {
          id: 'dengue-warning',
          title: '🟠 Dengue DENGAN Warning Signs / Kategori B',
          description: 'TD & Akral masih baik, TAPI pasien muntah persisten, nyeri perut hebat, pendarahan aktif, atau dehidrasi bera. Perlu rawat inap.',
          color: 'orange',
          nextNodeId: 'dbd-cairan-rujuk',
          riskLevel: 'medium'
        },
        {
          id: 'dengue-tanpa-warning',
          title: '🟢 Dengue TANPA Warning Signs / Kategori A',
          description: 'Hanya demam, nyeri sendi/kepala, masih bisa makan/minum oral dengan baik, produksi kencing (BAK) normal. Aman rawat jalan di Poli.',
          color: 'green',
          nextNodeId: 'dbd-rawat-jalan',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: RESUSITASI DARURAT DSS SECARA CITO!
    // ============================================================
    'dbd-resusitasi-rujuk': {
      id: 'dbd-resusitasi-rujuk',
      type: 'checklist',
      title: 'Node 3A: Darurat Syok (DSS) — Resusitasi di Klinik',
      description: 'Jangan langsung rujuk tanpa infus. Lakukan loading cairan terlebih dahulu sebelum masuk ambulans!',
      items: [
        {
          id: 'dss-iv-line',
          title: 'Akses IV Cepat (Besar)',
          description: 'Pasang IV line jarum besar (18G atau 20G) secepatnya. Jika ketersediaan ada 2 jalur, pasang dua-duanya.',
          required: true,
          category: 'action'
        },
        {
          id: 'dss-loading-cairan',
          title: 'Loading Cairan Kristaloid SUPER CEPAT',
          description: 'Ringer Laktat (RL) atau Asering: Berikan 10-20 mL/kgBB bolus bebas / guyur habis dalam 15-30 menit pertama.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dss-oksigenasi',
          title: 'Siapkan Oksigenasi',
          description: 'Pasang oksigen nasal kanul/NRM untuk optimalisasi jaringan di tengah penurunan perfusi (Syok).',
          required: true,
          category: 'medication'
        },
        {
          id: 'dss-rujuk-ambulan',
          title: 'Rujuk CITO dengan Ambulan & Perawat',
          description: 'Hubungi RS dengan fasilitas ruang HCU/ICU dan ketersediaan bank darah (bila perlu transfusi). Dampingi dengan perawat karena cairan harus tetap diguyur selama di ambulans sesuai respons tensi.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3B: RUJUK OBSERVASI (DENGUE WARNING SIGNS)
    // ============================================================
    'dbd-cairan-rujuk': {
      id: 'dbd-cairan-rujuk',
      type: 'checklist',
      title: 'Node 3B: Rujuk Rawat Inap (Warning Signs)',
      description: 'Pencegahan jatuh ke kondisi syok di perjalanan.',
      items: [
        {
          id: 'dws-iv-cairan',
          title: 'Pasang Infus Maintenance / Bolus Ringan',
          description: 'Pasang infus Ringer Laktat (RL) 5-7 ml/kgBB/jam sambil menunggu proses rujukan RS selesai.',
          required: true,
          category: 'action'
        },
        {
          id: 'dws-hindari-oral',
          title: 'Puasakan Sementara (Bila Muntah Persisten)',
          description: 'Cegah aspirasi lambung jika pasien terus muntah; ganti hidrasi sepenuhnya via infus.',
          required: true,
          category: 'safety'
        },
        {
          id: 'dws-rujuk',
          title: 'Rujuk Rawat Inap Biasa',
          description: 'Buat surat rujukan menjelaskan adanya keluhan Alarm/Warning Signs. RS nantinya akan periksa Hematokrit & Trombosit.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3C: RAWAT JALAN (POLI/KLINIK)
    // ============================================================
    'dbd-rawat-jalan': {
      id: 'dbd-rawat-jalan',
      type: 'checklist',
      title: 'Node 3C: Tatalaksana Poli (Aman Dirumah)',
      description: 'Terapi mutlak demam Dengue level A adalah cairan oral dan manajemen antipiretik yang aman tanpa resiko pendarahan.',
      items: [
        {
          id: 'drj-hidrasi-oral',
          title: 'Edukasi: Terapi Cairan Oral',
          description: 'Pasien wajib minum cairan elektrolit/jus/susu (bukan sekedar air putih biasa) minimal 2-3 liter per hari. Susu, isotonik komersial, kaldu, atau oralit disarankan untuk cegah kebocoran plasma.',
          required: true,
          category: 'action'
        },
        {
          id: 'drj-antipiretik',
          title: 'Obat Penurun Demam: WAJIB Parasetamol Saja',
          description: 'Beri Parasetamol 3-4 x 500mg. \n❌ MUTLAK DILARANG: Aspirin, Ibuprofen, Asam Mefenamat, Natrium Diklofenak. NSAID memperparah perdarahan lambung (GI Bleeding) dan menurunkan jumlah trombosit.',
          required: true,
          category: 'medication'
        },
        {
          id: 'drj-cek-lab',
          title: 'Anjuran Cek Darah Rutin Rutin',
          description: 'Jika demam sudah hari ke-3, wajib cek tes darah rutin (Trombosit dan Hematokrit) untuk memantau apakah trombosit mulai merosot. (Boleh tes IgM/IgG jika tersedia).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'drj-kapan-kembali',
          title: 'Edukasi Kapan Harus Kembali ke Klinik (Emergency)',
          description: 'Jelaskan Fase Kritis terjadi saat demam TURUN (hari 3-5). Ajarkan keluarga waspada jika: \nPasien tidak mau minum, BAK tidak ada lebih dari 6 jam, nyeri perut sangat sakit, atau tiba-tiba lemas dingin. Jika hal ini terjadi: Segera ke IGD.',
          required: true,
          category: 'documentation'
        }
      ]
    }
  },
  references: [
    'PNPK Kemenkes: Keputusan Menteri Kesehatan RI Nomor HK.01.07/MENKES/1186/2022 Tentang Panduan Praktik Klinis Demam Berdarah Dengue',
    'WHO: Comprehensive Guidelines for Prevention and Control of Dengue and DHF (Revised Edition)',
    'Pedoman Nasional Praktik Kedokteran PAPDI (Perhimpunan Dokter Spesialis Penyakit Dalam Indonesia)'
  ]
};
