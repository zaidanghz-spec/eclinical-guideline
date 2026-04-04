import { DynamicPathway } from '../dynamicPathways';

export const diabetesMelitusPathway: DynamicPathway = {
  diseaseId: 'diabetes-melitus-type-2',
  diseaseName: 'Diabetes Melitus Tipe 2 (PNPK 2020 & PERKENI 2021)',
  startNodeId: 'dm-initial-assessment',
  nodes: {
    'dm-initial-assessment': {
      id: 'dm-initial-assessment',
      type: 'checklist',
      title: 'Fase 1: Evaluasi Awal & Penegakan Diagnosis (Berdasarkan PERKENI 2021)',
      description: 'Diagnosis awal DM Tipe 2 mengutamakan gejala klasik (Polidipsi, Poliuri, Polifagi, Penurunan Berat Badan) dan pemeriksaan kadar glukosa plasma.',
      items: [
        {
          id: 'dm-anamnesis-gejala',
          title: 'Anamnesis Gejala Klasik & Faktor Risiko',
          description: 'Cari 4P (Poliuria, Polidipsia, Polifagia, Penurunan berat badan tak bersebab). Evaluasi faktor risiko (Obese, Hipertensi, Riwayat Keluarga, Dislipidemia).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-kriteria-diagnosis',
          title: 'Konfirmasi Kriteria Diagnosis Laboratorium',
          description: 'Diagnosis tegak apabila memenuhi salah satu: (1) Glukosa Darah Puasa (GDP) >= 126 mg/dL; (2) Glukosa Darah 2 Jam Post Prondial (GD2PP) >= 200 mg/dL; (3) HbA1c >= 6.5%; (4) Gejala Klasik + GDS >= 200 mg/dL.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dm-komplikasi-awal',
          title: 'Skrining Komplikasi Emergensi Awal',
          description: 'Singkirkan kegawatan metabolik: Ketoasidosis Diabetik (KAD) atau Status Hiperosmolar Hiperglikemik (SHH). Jika dicurigai ada KAD/SHH dengan tanda asidosis/dehidrasi berat, SEGERA RUJUK.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'dm-treatment-decision'
    },

    'dm-treatment-decision': {
      id: 'dm-treatment-decision',
      type: 'decision',
      title: 'Pemilihan Terapi Awal (HbA1c & Komorbiditas)',
      description: 'Langkah awal terapi medikamentosa. PNPK 2020 & PERKENI 2021 memiliki beberapa pendekatan. Mari pilih algoritma sesuai kadar HbA1c dan kondisi metabolik.',
      branches: [
        {
          id: 'dm-branch-hba1c-low',
          title: 'HbA1c < 7.5%',
          description: 'Modifikasi Gaya Hidup + Monoterapi OHO',
          color: 'teal',
          nextNodeId: 'dm-monotherapy'
        },
        {
          id: 'dm-branch-hba1c-mid',
          title: 'HbA1c 7.5% - < 9.0%',
          description: 'Modifikasi Gaya Hidup + Terapi Kombinasi 2 Obat',
          color: 'blue',
          nextNodeId: 'dm-dual-therapy'
        },
        {
          id: 'dm-branch-hba1c-high-asymptomatic',
          title: 'HbA1c >= 9.0% (Tanpa Gejala Metabolik)',
          description: 'Kombinasi 2 atau 3 OHO Obat',
          color: 'orange',
          nextNodeId: 'dm-dual-triple-therapy'
        },
        {
          id: 'dm-branch-hba1c-high-symptomatic',
          title: 'HbA1c >= 9.0% (Dengan Gejala B/KAD/SHH/BB Turun Cepat)',
          description: 'Indikasi Terapi Insulin (+/- OHO)',
          color: 'red',
          nextNodeId: 'dm-insulin-therapy'
        }
      ]
    },

    'dm-monotherapy': {
      id: 'dm-monotherapy',
      type: 'checklist',
      title: 'Monoterapi Lini Pertama & Modifikasi Gaya Hidup',
      description: 'Edukasi diet, aktivitas fisik, dan pemilihan obat pertama pada pasien DM baru yang stabi.',
      items: [
        {
          id: 'dm-lifestyle',
          title: 'Modifikasi Gaya Hidup (Terapis Nutrisi Medis)',
          description: 'Edukasi diet seimbang (kurangi karbo simpleks, tinggi serat). Olahraga 150 menit/minggu (intensitas sedang). Usahakan penurunan berat badan pada pasien obesitas.',
          required: true,
          category: 'action'
        },
        {
          id: 'dm-metformin-ebm',
          title: 'Penentuan OHO Lini Pertama (EBM PERKENI vs PNPK)',
          description: 'EBM - PNPK 2020: Pilihan mutlak adalah Metformin sebagai lini pertama tanpa melihat faktor komorbid.\nEBM - PERKENI 2021: Mempertimbangkan komorbiditas (ASCVD, CKD, Heart Failure).\n\nREKOMENDASI EBM BERSAMA (Terbaru): Bila tidak ada risiko klinis tinggi, berikan Metformin (titrasi dari 500mg/hari untuk cegah GI upset). NAMUN JIKA ada komorbid kardiovaskular tinggi / jantung / ginjal kronik, sangat disarankan segera pakai SGLT-2 inhibitor / GLP-1 RA karena efek proteksi organ terlepas dari HbA1c.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dm-followup-3mon',
          title: 'Jadwal Pemantauan (Follow Up)',
          description: 'Cek ulang HbA1c dalam 3 bulan. Jika target (individual mis. <7%) belum tercapai, segera tingkatkan ke dual-therapy.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dm-complication-screening'
    },

    'dm-dual-therapy': {
      id: 'dm-dual-therapy',
      type: 'checklist',
      title: 'Terapi Kombinasi Ganda (Dual Therapy)',
      description: 'Pasien datang dengan HbA1c 7.5% - 8.9% atau gagal monoterapi dalam 3 bulan.',
      items: [
        {
          id: 'dm-combo-base',
          title: 'Teruskan Modifikasi Gaya Hidup & Obat Dasar',
          description: 'Pastikan ketaatan pada diet, olahraga, dan teruskan Metformin (bila tidak ada intoleransi).',
          required: true,
          category: 'action'
        },
        {
          id: 'dm-choice-2nd',
          title: 'Pemilihan Obat Kedua (Patient-Centered Approach)',
          description: 'Pilih obat lini kedua berdasarkan profil pasien.\n- Risiko kardio/ginjal: SGLT2-i (Dapagliflozin/Empagliflozin) / GLP1-RA.\n- Risiko hipoglikemia yang dihindari: DPP-4i (Sitagliptin/Vildagliptin), SGLT2-i.\n- Pertimbangan biaya/BPJS: Sulfonilurea (Glimepiride/Gliclazide). Waspadai Hipoglikemia.',
          required: true,
          category: 'medication'
        }
      ],
      nextNodeId: 'dm-complication-screening'
    },

    'dm-dual-triple-therapy': {
      id: 'dm-dual-triple-therapy',
      type: 'checklist',
      title: 'Terapi Kombinasi Ganda atau Tripel (HbA1c >9% Tanpa Gejala Klinis)',
      description: 'Pasien asimptomatik namun memiliki HbA1c tinggi membutuhkan intensifikasi obat oral lebih agresif sebelum diputuskan insulin.',
      items: [
        {
          id: 'dm-triple-med',
          title: 'Gunakan 2 atau 3 Obat Hipoglikemik Oral Sekaligus',
          description: 'Mulai dengan kombinasi yang kuat (Misal: Metformin + Sulfonilurea + DPP4-i atau SGLT2-i). \nPerbedaan EBM PNPK & PERKENI:\nPNPK 2020: Merujuk minimal 2 obat, sangat cost-based.\nPERKENI 2021: Menekankan efikasi. Disarankan menggunakan kombinasi dengan patofisiologi berbeda (Tingkatkan sensitivitas + Pengeluaran glukosa).\nRekomendasi EBM Terbaru: Maksimalkan obat bersinergi kardioprotektif (Metformin + SGLT2i + DPP4i) bila mampu.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dm-prep-insulin',
          title: 'Edukasi Persiapan Insulin',
          description: 'Apabila target gagal dicapai dengan 3 obat OHO dalam 3 bulan, wajib edukasi kemungkinan insulin.',
          required: false,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dm-complication-screening'
    },

    'dm-insulin-therapy': {
      id: 'dm-insulin-therapy',
      type: 'checklist',
      title: 'Terapi Inisiasi Insulin (HbA1c > 9% / Bergejala Berat)',
      description: 'Inisiasi terapi injeksi terutama pada pasien dekompensasi metabolik, gejala ketosis, atau HbA1c > 9% dengan gejala klinis.',
      items: [
        {
          id: 'dm-insulin-basal',
          title: 'Inisiasi Insulin Basal',
          description: 'Mulai dengan insulin basal (Glargine / Detemir) 10 Unit/hari atau 0.1-0.2 U/kgBB. Titrasi dosis setiap 3 hari dengan patokan GDP sampai mencapai target (100-130 mg/dL).',
          required: true,
          category: 'action'
        },
        {
          id: 'dm-combo-insulin-oho',
          title: 'Lanjutkan / Sesuaikan OHO',
          description: 'Metformin biasanya tetap dilanjutkan jika tidak dikontraindikasikan. Sulfonilurea (SU) dihentikan atau dikurangi untuk menghindari hipoglikemia berat jika dimulai injeksi bolus.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dm-insulin-intensification',
          title: 'Indikasi Intensifikasi (Insulin Prandial)',
          description: 'Jika GDP terkontrol namun HbA1c belum tercapai, periksa GD2PP dan tambahkan 1 injeksi insulin kerja cepat (Prandial) sebelum makan utama (basal-plus algorithm).',
          required: false,
          category: 'action'
        }
      ],
      nextNodeId: 'dm-complication-screening'
    },

    'dm-complication-screening': {
      id: 'dm-complication-screening',
      type: 'checklist',
      title: 'Skrining Komplikasi Mikrovaskular & Makrovaskular Tipe 2',
      description: 'Skrining holistik sesuai PERKENI 2021 dan ADA, wajib diperiksa minimal 1 tahun sekali.',
      items: [
        {
          id: 'comp-retinopathy',
          title: 'Skrining Retinopati Diabetik',
          description: 'RUJUK pasien ke dokter mata untuk pemeriksaan funduskopi komprehensif saat baru didiagnosis, kemudian rujuk ulangan berkala tahunan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'comp-nephropathy',
          title: 'Skrining Nefropati Diabetik / CKD',
          description: 'Periksa UACR (Urine Albumin-to-Creatinine Ratio) urin sewaktu dan eGFR tahunan. Jika ada mikroalbuminuria ringan, wajib beri ACEI/ARB terlepas dari penderita hipertensi / normotensi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'comp-neuropathy',
          title: 'Skrining Neuropati Perifer (Diabetic Foot)',
          description: 'Periksa sensibilitas telapak kaki dengan Monofilamen 10g minimal 1 tahun sekali. Lakukan inspeksi tungkai deteksi luka/ulkus pada setiap kunjungan dokter.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'comp-macrovascular',
          title: 'Skrining Makrovaskular & Target Berbasis EBM',
          description: 'Target Tekanan Darah <130/80 (EBM PERKENI terbaru, PNPK 140/90). Berikan Terapi Statin Intensitas Sedang/Tinggi pada semua pasien DM > 40 tahun (Atorvastatin / Rosuvastatin) untuk profilaksis penyakit jantung koroner.',
          required: true,
          category: 'medication'
        }
      ]
    }
  }
};
