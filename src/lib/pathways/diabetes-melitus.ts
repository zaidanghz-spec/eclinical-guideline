import { DynamicPathway } from '../dynamicPathways';

export const diabetesMelitusPathway: DynamicPathway = {
  diseaseId: 'diabetes-melitus-tipe-2',
  diseaseName: 'Diabetes Melitus Tipe 2 (PNPK 2020 & PERKENI 2021)',
  startNodeId: 'dm-initial-assessment',
  nodes: {
    'dm-initial-assessment': {
      id: 'dm-initial-assessment',
      type: 'checklist',
      title: 'Fase 1: Evaluasi Awal & Penegakan Diagnosis (Keterbatasan Alat)',
      description: 'Mengingat ketiadaan alat periksa HbA1c dan lab canggih, diagnosis DM Tipe 2 mengutamakan gejala klasik 4P dan glukometer kapiler (Point-of-Care).',
      items: [
        {
          id: 'dm-anamnesis-gejala',
          title: 'Anamnesis Gejala Klasik & Faktor Risiko',
          description: 'Cari gejala klasik 4P (Poliuria, Polidipsia, Polifagia, Penurunan berat badan tak bersebab). Evaluasi faktor risiko kardiovaskular (Hipertensi, Obesitas).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-ttv',
          title: 'Pemantauan Tanda Vital (Tensi, Termometer, Oxymeter)',
          description: 'Wajib periksa tekanan darah (HT komorbid sering terjadi pada DM) dan suhu. Takikardi, nafas cepat (Kussmaul), dan saturasi turun menandakan kegawatan komplikasi (KAD / Asidosis metabolik).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-kriteria-diagnosis',
          title: 'Pemeriksaan Glukosa Darah Kapiler (Glucometer)',
          description: 'Cek Glukosa Darah Sewaktu (GDS) atau Puasa (GDP) via ujung jari. Diagnosis tegak bila Gejala Klasik (+) DAN GDS >= 200 mg/dL. Jika tidak punya glucometer SAMA SEKALI, RUJUK SEGERA untuk penegakan diagnosis.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-ekg-suction',
          title: 'Persiapan Kegawatan (EKG & Suction)',
          description: 'Lakukan EKG jika pasien mengeluh nyeri dada atau curiga gangguan jantung penyerta. Standby Suction jika terjadi penurunan kesadaran tiba-tiba (Koma Diabetikum/KAD/SHH).',
          required: false,
          category: 'safety'
        },
        {
          id: 'dm-rujuk-hba1c',
          title: 'Rujuk Pemeriksaan Laboratorium Konfirmasi (HbA1c & Fungsi Ginjal)',
          description: 'Disarankan untuk merujuk pasien ke Lab / RS Terdekat minimal untuk pemeriksaan baseline: HbA1c, Ureum/Kreatinin, dan Profil Lipid (karena fasilitas tidak sedia).',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'dm-treatment-decision'
    },

    'dm-treatment-decision': {
      id: 'dm-treatment-decision',
      type: 'decision',
      title: 'Pemilihan Terapi Awal (Tanpa Target HbA1c)',
      description: 'Karena HbA1c tidak bisa diperiksa langsung, pendekatan terapi menggunakan estimasi Glukosa Darah Puasa (GDP) atau Sewaktu (GDS) dari glukometer sesuai panduan substitusi.',
      branches: [
        {
          id: 'dm-branch-gds-low',
          title: 'GDP < 130 mg/dL / GDS < 200 mg/dL',
          description: 'Kondisi stabil, gejala ringan. Modifikasi Gaya Hidup + Monoterapi Metformin.',
          color: 'teal',
          nextNodeId: 'dm-monotherapy'
        },
        {
          id: 'dm-branch-gds-mid',
          title: 'GDP 130-250 mg/dL / GDS 200-300 mg/dL',
          description: 'Modifikasi Gaya Hidup + Langsung Terapi Kombinasi 2 Obat OHO.',
          color: 'blue',
          nextNodeId: 'dm-dual-therapy'
        },
        {
          id: 'dm-branch-gds-high-symptomatic',
          title: 'GDP > 250 mg/dL / GDS > 300 mg/dL / Bergejala Berat (KAD/SHH)',
          description: 'Gejala ketonuria, krisis hiperglikemia, Koma. OHO tidak memadai!',
          color: 'red',
          nextNodeId: 'dm-insulin-therapy'
        }
      ]
    },

    'dm-monotherapy': {
      id: 'dm-monotherapy',
      type: 'checklist',
      title: 'Monoterapi Lini Pertama & Edukasi Non-Farmakologis',
      description: 'Tata laksana awal DM ringan-sedang dan stabil.',
      items: [
        {
          id: 'dm-lifestyle',
          title: 'Edukasi Terapi Nutrisi Medis & Fisik',
          description: 'Edukasi porsi makan, hindari gula sederhana. Olahraga jalan sehat 30 mnt/hari (150 mnt/minggu). Turunkan berat badan jika obesitas.',
          required: true,
          category: 'action'
        },
        {
          id: 'dm-metformin-ebm',
          title: 'Pemberian OHO Lini Pertama (Metformin)',
          description: 'PNPK 2020: Pilihan mutlaknya Metformin. Mulai dosis kecil 500mg/hari saat/sesudah makan (cegah mual). PERKENI 2021 merekomendasikan: Bila pasien diketahui (dari faskes/rujukan sebelumnya) punya penyulit jantung/ginjal kronik, rekomendasikan agar obat diganti menjadi SGLT-2 inhibitor di faskes tingkat lanjut.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dm-followup-gds',
          title: 'Jadwal Pemantauan GDS Harian/Mingguan',
          description: 'Pantau GDS / GDP secara berkala 1-2 minggu ke depan. Karena tanpa HbA1c, cek efektivitas dari keluhan poliuria/polidipsia dan tren penurunan GDS.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dm-complication-screening'
    },

    'dm-dual-therapy': {
      id: 'dm-dual-therapy',
      type: 'checklist',
      title: 'Terapi Kombinasi Ganda (Dual Therapy OHO)',
      description: 'Pasien glukosa tinggi sejak awal atau tidak membaik dengan monoterapi.',
      items: [
        {
          id: 'dm-combo-base',
          title: 'Teruskan Modifikasi Gaya Hidup & Lanjutkan Metformin',
          description: 'Bila fungsi ginjal normal (dilihat dari hasil rujukan jika ada), Metformin dinaikkan dosis hingga batas maksimal toleransi (mis. 2000mg/hari) dan tambahkan obat kedua.',
          required: true,
          category: 'action'
        },
        {
          id: 'dm-choice-2nd',
          title: 'Tambahkan Obat Kedua: Sulfonilurea (Terjangkau)',
          description: 'Kombinasi paling terjangkau & sering tersedia di faskes terbatas adalah Metformin + Sulfonilurea (Glimepiride / Gliquidone). Edukasikan pasien risiko HIPOGLIKEMIA berat (siapkan manisan bila lemas akut).',
          required: true,
          category: 'medication'
        }
      ],
      nextNodeId: 'dm-complication-screening'
    },

    'dm-insulin-therapy': {
      id: 'dm-insulin-therapy',
      type: 'checklist',
      title: 'Tatalaksana Hiperglikemia Ekstrem / Rujuk Insulin',
      description: 'Pasien dengan krisis glukosa tinggi sangat berisiko kematian bila dicoba distabilkan dengan OHO saja.',
      items: [
        {
          id: 'dm-fluid-resus',
          title: 'Manajemen Cairan (Resusitasi Cepat)',
          description: 'Krisis hiperglikemia (GDS > 300) sering disertai dehidrasi ekstrim (poliuri massif). Segera pasang IV line dan drip Normal Saline (NaCl 0.9%) 1000cc dalam 1-2 jam pertama.',
          required: true,
          category: 'action'
        },
        {
          id: 'dm-rujuk-cito',
          title: 'RUJUK CITO untuk Terapi Insulin IV',
          description: 'Karena obat insulin titrasi intravena, analisis gas darah, dan monitoring keton membutuhkan IGD rumah sakit paripurna, pasien WAJIB DIRUJUK setelah stabilisasi cairan awal. OHO tablet tidak akan bekerja cepat untuk life-saving di sini.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'dm-complication-screening'
    },

    'dm-complication-screening': {
      id: 'dm-complication-screening',
      type: 'checklist',
      title: 'Skrining Komplikasi Jangka Panjang (Adaptasi Faskes)',
      description: 'Skrining komplikasi mikro/makrovaskular berpedoman pada keterbatasan alat.',
      items: [
        {
          id: 'comp-retinopathy',
          title: 'RUJUK Skrining Retinopati Diabetik',
          description: 'Alat funduskopi mungkin tidak tersedia. Rujuk pasien rutin setiap tahun ke Poli Mata (Opthalmologis).',
          required: true,
          category: 'action'
        },
        {
          id: 'comp-nephropathy',
          title: 'RUJUK Skrining Nefropati (UACR & Ginjal)',
          description: 'Tanpa tes darah/urin fungsi ginjal di tempat pengobatan primer, pasien perlu dirujuk tes lab mikroalbuminuria & eGFR eksternal per tahun.',
          required: true,
          category: 'action'
        },
        {
          id: 'comp-neuropathy',
          title: 'Pemeriksaan Klinis Neuropati (Diabetic Foot)',
          description: 'Inspeksi & palpasi telapak kaki tanpa alat canggih wajib dilakukan tiap kunjungan! Cek hilangnya refleks dan sensibilitas sentuhan sederhana. Cek adanya ulkus tersembunyi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'comp-macrovascular',
          title: 'Terapi Profilaksis Tekanan Darah (Pake Tensi)',
          description: 'EBM PERKENI 2021 merekomendasikan Tensimeter harus digunakan tiap visit. Target tensi <130/80 (Jika PNPK 140/90). Bila hipertensi, berikan obat (ACEI/ARB) sekaligus perlindungan ginjal.',
          required: true,
          category: 'medication'
        }
      ]
    }
  }
};
