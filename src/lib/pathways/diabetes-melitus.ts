import { DynamicPathway } from '../dynamicPathways';

export const diabetesMelitusPathway: DynamicPathway = {
  diseaseId: 'diabetes-melitus',
  diseaseName: 'Diabetes Melitus Tipe 2 Dewasa (PNPK 2020)',
  startNodeId: 'dm-initial-evaluation',
  nodes: {
    'dm-initial-evaluation': {
      id: 'dm-initial-evaluation',
      type: 'checklist',
      title: 'Fase 1: Evaluasi Medis Lengkap Awal & Diagnosis',
      description: 'Lakukan evaluasi riwayat penyakit, pemeriksaan fisik, laboratorium, dan penapisan komplikasi pada pertemuan pertama berdasarkan kriteria diagnosis DM.',
      items: [
        {
          id: 'dm-diagnosis-criteria',
          title: 'Kriteria Diagnosis (Salah Satu Memenuhi)',
          description: 'Gula Darah Puasa (GDP) >= 126 mg/dL ATAU Glukosa 2 Jam setelah TTGO 75g >= 200 mg/dL ATAU HbA1c >= 6.5% ATAU Gula Darah Sewaktu (GDS) >= 200 mg/dL disertai keluhan klasik (poliuria, polidipsia, polifagia, penurunan BB).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-physical-exam',
          title: 'Pemeriksaan Jasmani Komprehensif',
          description: 'Ukur Tinggi, Berat Badan, IMT. Tekanan Darah (termasuk posisi berdiri untuk hipotensi ortostatik). Cek tiroid, jantung. Pemeriksaan Kaki: ABI, palpasi nadi, monofilamen 10g (neuropati). Pemeriksaan Kulit (Acanthosis nigricans).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-lab-screening',
          title: 'Evaluasi Lab & Penapisan Komplikasi',
          description: 'Cek Profil Lipid puasa (Kolesterol Total, LDL, HDL, Trigliserida), Tes fungsi ginjal (Ureum, Kreatinin, LFG), Urinalisa (rasio albumin-kreatinin), EKG, Foto Toraks, & Funduskopi rujukan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-education',
          title: 'Edukasi Awal & Promosi Gaya Hidup',
          description: 'Memberikan informasi penyakit, pemantauan glukosa, hipoglikemia, perawatan kaki, dan pengenalan komplikasi kronis serta intervensi nutrisi.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dm-lifestyle-intervention'
    },

    'dm-lifestyle-intervention': {
      id: 'dm-lifestyle-intervention',
      type: 'checklist',
      title: 'Fase 2: Manajemen Gaya Hidup (Diet & Latihan Fisis)',
      description: 'Diterapkan pada seluruh pasien sebagai langkah dasar intervensi diabetes melitus.',
      items: [
        {
          id: 'dm-nutrition',
          title: 'Tata Laksana Gizi Klinis (Diet)',
          description: 'Karbohidrat min. 130g/hari (pilih low-GI). Total lemak <30% (Batasi lemak jenuh). Protein 10-20% total kalori. Serat 20-35g/hari. Sodium <= 1500mg/hari. Turunkan berat badan jika obes (>5% penurunan).',
          required: true,
          category: 'action'
        },
        {
          id: 'dm-exercise',
          title: 'Latihan Fisis Aerobik',
          description: 'Aktivitas teratur 3-5 hari/minggu total 150 menit/minggu (intensitas sedang, misalnya: jogging ringan, berenang, jalan cepat). Batasi jeda antar latihan min. tidak >2 hari berturut-turut.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'dm-algorithm-hba1c'
    },

    'dm-algorithm-hba1c': {
      id: 'dm-algorithm-hba1c',
      type: 'decision',
      title: 'Algoritme Pilihan Farmakoterapi Berdasarkan HbA1c',
      description: 'Pemilihan terapi oral atau insulin didasari oleh profil HbA1c saat awal terdiagnosis atau hasil evaluasi.',
      branches: [
        {
          id: 'hba1c-under-75',
          title: 'HbA1c < 7.5%',
          description: 'Pemberian Monoterapi disamping modifikasi gaya hidup sehat.',
          color: 'green',
          nextNodeId: 'dm-monotherapy'
        },
        {
          id: 'hba1c-over-75',
          title: 'HbA1c >= 7.5%',
          description: 'Pemberian Terapi Kombinasi 2 Obat langsung (Dual Therapy).',
          color: 'blue',
          nextNodeId: 'dm-dual-therapy'
        },
        {
          id: 'hba1c-over-9-stable',
          title: 'HbA1c > 9.0% (Tanpa Gejala Kritis)',
          description: 'Tanpa dekompensasi metabolik / penurunan BB drastis. Kombinasi 2 atau 3 obat.',
          color: 'orange',
          nextNodeId: 'dm-triple-therapy'
        },
        {
          id: 'hba1c-over-9-decomp',
          title: 'HbA1c > 9.0% & Dekompensasi Metabolik',
          description: 'Dengan gejala berat / krisis glikemik. Wajib terapi Insulin Kombinasi.',
          color: 'red',
          nextNodeId: 'dm-insulin-therapy'
        }
      ]
    },

    'dm-monotherapy': {
      id: 'dm-monotherapy',
      type: 'checklist',
      title: 'Monoterapi Obat Antihiperglikemia Oral Lini Pertama',
      description: 'Lini pertama mayoritas kasus adalah Metformin. Evaluasi respon dalam waktu yang ditentukan.',
      items: [
        {
          id: 'mono-metformin',
          title: 'Mulai Terapi Metformin',
          description: 'Metformin adalah pilihan pertama kecuali kontraindikasi (LFG <30 ml/min). Dosis mulai rendah untuk cek toleransi GI.',
          required: true,
          category: 'medication'
        },
        {
          id: 'mono-ascvd-check',
          title: 'Evaluasi Risiko / Penyakit Kardiovaskular & Ginjal',
          description: 'Bila ada PKVAS (PJK, stroke, PAD), Gagal Jantung, atau Penyakit Ginjal Kronik, disarankan SGLT-2 inhibitor atau Agonis GLP-1 sbg prioritas lini kombinasi selanjutnya.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'mono-eval',
          title: 'Evaluasi 3 Bulan',
          description: 'Jika HbA1c belum mencapai target (<7%) dalam 3 bulan, segera naikkan ke Terapi Kombinasi 2 macam obat.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dm-comorbid-monitoring'
    },

    'dm-dual-therapy': {
      id: 'dm-dual-therapy',
      type: 'checklist',
      title: 'Terapi Kombinasi Ganda (Dual Therapy)',
      description: 'Kombinasikan Metformin dengan golongan obat lain dengan mekanisme kerja berbeda.',
      items: [
        {
          id: 'dual-choice',
          title: 'Pemilihan Obat Lini Kedua',
          description: 'Pilih salah satu sesuai individualisasi: Sulfonilurea (jika masalah biaya), TZD, DPP-4 Inhibitor, SGLT-2 Inhibitor, Agonis GLP-1, atau Acarbose.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dual-ascvd-priority',
          title: 'Kombinasi Khusus (PKVAS / Gagal Jantung / CKD)',
          description: 'Wajib utamakan SGLT-2 Inhibitor / Agonis GLP-1 jika pasien memiliki riwayat kardiovaskular aterosklerotik tau penyakit ginjal kronis asalkan LFG memadai.',
          required: true,
          category: 'action'
        },
        {
          id: 'dual-eval',
          title: 'Evaluasi 3 Bulan',
          description: 'Jika HbA1c belum mencapai target (<7%) dalam 3 bulan pengobatan kombinasi ganda, naikkan ke kombinasi 3 macam obat.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dm-comorbid-monitoring'
    },

    'dm-triple-therapy': {
      id: 'dm-triple-therapy',
      type: 'checklist',
      title: 'Terapi Kombinasi 3 Obat (Triple Therapy)',
      description: 'Eskalasi pengobatan bagi pasien dengan respon terapi yang sulit.',
      items: [
        {
          id: 'triple-choice',
          title: 'Kombinasi Metformin + Obat 2 + Obat 3',
          description: 'Pilih kombinasi oral ketiga yang rasional. Jika target tidak tercapai 3 bulan, lanjut intensifikasi Insulin Basal.',
          required: true,
          category: 'medication'
        }
      ],
      nextNodeId: 'dm-comorbid-monitoring'
    },

    'dm-insulin-therapy': {
      id: 'dm-insulin-therapy',
      type: 'checklist',
      title: 'Terapi Insulin (Kombinasi atau Basal-Bolus)',
      description: 'Diberikan bila OHO kombinasi dosis optimal gagal, fungsi ginjal/hati berat, koma/KAD/SHH, penurunan BB cepat, stres berat/infeksi, atau krisis hiperglikemia (HbA1c >9% dekompensasi).',
      items: [
        {
          id: 'ins-basal',
          title: 'Mulai Insulin Basal',
          description: 'Mulai dari dosis 10 unit atau 0.2 unit/kgBB di malam hari. OHO dapat terus dipertahankan.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ins-titration',
          title: 'Titrasi Dosis & Evaluasi GDP',
          description: 'Tambah/kurang 2-4 unit tiap 3-5 hari sampai target Gula Darah Puasa tercapai. Bila target belum dicapai & HbA1c belum target, tambahkan insulin prandial atau agonis GLP-1.',
          required: true,
          category: 'action'
        },
        {
          id: 'ins-akut-krisis',
          title: 'Untuk Kegawatan KAD/SHH',
          description: 'Bila hiperglikemia akut, gunakan Insulin Kerja Sangat Cepat (Rapid-Acting) Intravena drip ditambah hidrasi cairan agresif dan resusitasi. Targetkan penurunan stabil cairan dan keton darah.',
          required: false,
          category: 'safety'
        }
      ],
      nextNodeId: 'dm-comorbid-monitoring'
    },

    'dm-comorbid-monitoring': {
      id: 'dm-comorbid-monitoring',
      type: 'checklist',
      title: 'Fase Pemantauan Target & Tatalaksana Komorbid',
      description: 'Pengendalian faktor risiko secara holistik mencegah komplikasi makrovaskuler & mikrovaskuler.',
      items: [
        {
          id: 'target-kendali',
          title: 'Pantau Sasaran Pengendalian DM',
          description: 'HbA1c < 7% (individual). Glukosa Puasa 80-130 mg/dL. Glukosa 1-2 Jam PP < 180 mg/dL. Evaluasi mandiri via PGDM jika pakai insulin rutin.',
          required: true,
          category: 'action'
        },
        {
          id: 'target-hipertensi',
          title: 'Manajemen Hipertensi (Target < 140/90 mmHg)',
          description: 'Bila tensi >140/90, beri monoterapi Antihipertensi (ACEi/ARB diutamakan untuk proteksi nefropati) setelah penyesuaian gaya hidup.',
          required: true,
          category: 'medication'
        },
        {
          id: 'target-lipid',
          title: 'Dislipidemia & Statin',
          description: 'Beri statin untuk target LDL < 100 mg/dL (atau < 70 mg/dL bila ada PKVAS). Anjurkan trigliserida < 150 mg/dL.',
          required: true,
          category: 'medication'
        },
        {
          id: 'target-aspirin',
          title: 'Terapi Antiplatelet (Aspirin)',
          description: 'Aspirin 75-162mg/hari diberikan u/ prevensi sekunder penderita PKVAS ATAU prevensi primer bila umur >50 tahun plus faktor risiko 1 mayor (hipertensi/albuminuria/dislipid).',
          required: false,
          category: 'medication'
        },
        {
          id: 'target-komplikasi',
          title: 'Skrining Periodik Komplikasi',
          description: 'Funduskopi rutin ut/ Retinopati. Cek protein/albuminuria urin ut/ Nefropati. Pemeriksaan monofilamen + rawat kaki ut/ cegah Ulkus diabetik (Neuropati).',
          required: true,
          category: 'assessment'
        }
      ]
    }
  },
  references: [
    'PNPK Tata Laksana Diabetes Melitus Tipe 2 Dewasa (KMK RI No. HK.01.07/MENKES/603/2020)',
    'Pedoman Pengelolaan dan Pencegahan Diabetes Melitus Tipe 2 Dewasa di Indonesia - PERKENI 2021'
  ]
};
