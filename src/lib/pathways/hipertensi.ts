// ============================================================
// HIPERTENSI DEWASA & KRISIS HIPERTENSI
// ICD-10: I10 (Esensial), I11 (Hypertensive Heart Disease), O14 (Preeklamsia)
// Referensi:
// - Konsensus Penatalaksanaan Hipertensi PERHI 2021
// - PNPK Tata Laksana Hipertensi Dewasa (Kemenkes 2021)
// Setting: Klinik Primer (FKTP)
// Alat: TTV, EKG, Urinalisis Dipstick (opsional), Suction/O2 (untuk stabilisasi)
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const hipertensiPathway: DynamicPathway = {
  diseaseId: 'hipertensi-dewasa',
  diseaseName: 'Hipertensi Dewasa & Krisis (Konsensus PERHI 2021)',
  startNodeId: 'ht-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: ANAMNESIS, TTV, PEMFIS & EKG (INITIAL SCREENING)
    // ============================================================
    'ht-initial-assessment': {
      id: 'ht-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Anamnesis, TTV, & Skrining Organ Target (HMOD)',
      description: 'Pemeriksaan standar untuk menegakkan diagnosis hipertensi dan mendeteksi komplikasi mematikan secara dini.',
      items: [
        {
          id: 'ht-tensi-standar',
          title: 'Pengukuran Tekanan Darah (TD) Terstandar',
          description: 'Pasien istirahat 5 menit. Gunakan manset lengan yang sesuai. Ukur di kedua lengan, gunakan nilai TD tertinggi sebagai patokan. Jika TD ≥140/90 mmHg → curiga Hipertensi.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'ht-gejala-akut',
          title: 'Skrining Gejala "Red Flag" (Tanda Bahaya)',
          description: 'Tanyakan secara aktif: \n- Nyeri dada kiri / tembus punggung? (Iskemik/Diseksi Aorta)\n- Sesak napas akut / ortopnea? (Edema Paru/Gagal Jantung)\n- Nyeri kepala hebat, muntah menyemprot, pelo, kelemahan separuh badan? (Stroke)\n- Pandangan tiba-tiba kabur gelap? (Papiledema/Retinopati).\nJika ADA → Waspada Krisis Hipertensi (Emergensi).',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'ht-faktor-risiko',
          title: 'Anamnesis Komorbid & Tanda Khusus',
          description: 'Riwayat DM, riwayat ginjal, stroke sebelumnya? Apakah pasien sedang HAMIL (Trimester 2/3)? Ibu hamil dengan TD >140/90 = Preeklamsia sampai terbukti sebaliknya.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'ht-wajib-ekg',
          title: 'Wajib Rekam EKG 12-Sadapan!',
          description: 'Semua pasien hipertensi di klinik (terutama TD >180/120 atau ada nyeri dada/sesak) wajib distrip EKG. Cari tanda: LVH (hipertrofi jantung kiri), ST-Elevasi/Depresi, Inversi T, atau Fibrilasi Atrium.',
          required: true,
          category: 'assessment'
          role: 'both',
        },
        {
          id: 'ht-lab-dasar',
          title: 'Laboratorium Sederhana (Jika Tersedia)',
          description: 'Lakukan pemeriksaan Urinalisis Dipstick (cari proteinuria, hematuria untuk menyingkirkan penyulit ginjal/preeklamsia).',
          required: false,
          category: 'assessment'
          role: 'nurse',
        }
      ],
      nextNodeId: 'ht-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE STRATIFIKASI RISIKO
    // ============================================================
    'ht-triage-decision': {
      id: 'ht-triage-decision',
      type: 'decision',
      title: 'Node 2: Triase Keparahan Hipertensi',
      description: 'Identifikasi tingkat keparahan berdasarkan tingginya TD dan ada/tidaknya gejala kegawatan.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ht-hamil-preeklamsia',
          title: '🟣 Ibu Hamil (Preeklamsia / Eklamsia)',
          description: 'Wanita Hamil dengan TD ≥140/90 mmHg DENGAN atau TANPA gejala pusing/pandangan kabur/proteinuria.',
          color: 'purple',
          nextNodeId: 'ht-preeklamsia-mgmt',
          riskLevel: 'high'
        },
        {
          id: 'ht-emergensi',
          title: '🔴 Hipertensi Emergensi (Krisis) -> Rujuk IGD',
          description: 'TD ≥180/120 mmHg disertai KERUSAKAN ORGAN (Sesak napas/edema paru, nyeri dada/ACS, defisit neurologis/Stroke).',
          color: 'red',
          nextNodeId: 'ht-emergensi-mgmt',
          riskLevel: 'high'
        },
        {
          id: 'ht-urgensi',
          title: '🟠 Hipertensi Urgensi -> Observasi Klinik',
          description: 'TD ≥180/120 mmHg namun pasien ASIMTOMATIK (tidak ada sesak, tidak nyeri dada, saraf normal).',
          color: 'orange',
          nextNodeId: 'ht-urgensi-mgmt',
          riskLevel: 'medium'
        },
        {
          id: 'ht-rawat-jalan',
          title: '🟢 Hipertensi Derajat 1 & 2 (Uncomplicated) -> Poli Umum',
          description: 'TD 140-179 / 90-119 mmHg. Disertai atau tanpa komorbid (DM/Gagal Ginjal). Target kontrol rawat jalan.',
          color: 'green',
          nextNodeId: 'ht-rutin-poliklinik',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: PREEKLAMSIA / HAMIL (EMERGENCY KEBIDANAN)
    // ============================================================
    'ht-preeklamsia-mgmt': {
      id: 'ht-preeklamsia-mgmt',
      type: 'checklist',
      title: 'Node 3A: Stabilisasi Preeklamsia / Eklamsia',
      description: 'Hipertensi pada kehamilan adalah bahaya kejang. Siapkan protokol proteksi kejang!',
      items: [
        {
          id: 'pe-mgso4',
          title: 'Protokol MgSO4 (Magnesium Sulfat) - Anti Kejang',
          description: 'Jika TD ≥160/110 atau ada ancaman kejang (pandangan kabur/nyeri ulu hati): \nBerikan MgSO4 40% sebanyak 4 gram (10 cc) dilarutkan dalam 10 cc akuades, suntik IV bolus pelan selama 5-10 menit. Lanjutkan rumatan di infus RL/D5%. Rujuk CITO PONEK!',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'pe-nifedipin',
          title: 'Dosis Penurun Tensi Hamil (Nifedipin)',
          description: 'Berikan Nifedipin oral 10 mg (TIDAK BOLEH sublingual karena risiko hipotensi janin akut). Ulangi 10 mg tiap 30 menit jika tensi masih ≥160/110 mmHg. Maksimal 30 mg.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'pe-dilarang',
          title: 'DILARANG: ACEi / ARB',
          description: 'MUTLAK DILARANG memberi Captopril, Lisinopril, Candesartan, Valsartan pada ibu hamil karena menyebabkan kematian/cacat ginjal janin (Teratogenik Tipe D).',
          required: true,
          category: 'safety'
          role: 'nurse',
        }
      ]
    },

    // ============================================================
    // NODE 3B: HIPERTENSI EMERGENSI & KOMPLIKASI AKUT
    // ============================================================
    'ht-emergensi-mgmt': {
      id: 'ht-emergensi-mgmt',
      type: 'checklist',
      title: 'Node 3B: Hipertensi Emergensi (Krisis)',
      description: 'Terdapat kerusakan organ akut (HMOD) sehingga butuh penanganan IV di IGD RS. FKTP hanya menstabilkan jalan napas.',
      items: [
        {
          id: 'em-abc-stabil',
          title: 'Stabilisasi ABC & Oksigenasi',
          description: 'Jika ada tanda Edema Paru / Decompensatio Cordis: Posisikan duduk (semi fowler), berikan O2 10-15L/mnt NRM. Bersihkan jalan napas dengan Suction bila banyak sputum berbuih muda (pink frothy sputum).',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'em-iv-maintenance',
          title: 'Pasang IV Line (Tanpa Guyur Cairan)',
          description: 'Pasang abocath (IV line) untuk persiapan obat antihipertensi parenteral (contoh: Nicardipine IV) di RS rujukan. DILARANG mengguyur cairan pada pasien ini karena akan menyebabkan gagal napas akibat overhidrasi paru.',
          required: true,
          category: 'action'
          role: 'nurse',
        },
        {
          id: 'em-jgn-turunkan',
          title: 'DILARANG Menurunkan TD Secara Oral Cepat!',
          description: 'Pada kasus Stroke Iskemik akut dengan Tensi ↑, JANGAN diturunkan jika TD masih <220/120! Menurunkan TD mendadak di klinik akan memperluas nekrosis otak akibat hipoperfusi paru/otak.',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'em-rujuk-cito',
          title: 'Rujuk CITO dengan Rekaman EKG',
          description: 'Pasien dikirim dengan ambulans didampingi tenaga medis. Serahkan cetakan EKG lengkap. Jangan menunda rujukan untuk sekadar menunggu reaksi obat oral.',
          required: true,
          category: 'documentation'
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 3C: HIPERTENSI URGENSI
    // ============================================================
    'ht-urgensi-mgmt': {
      id: 'ht-urgensi-mgmt',
      type: 'checklist',
      title: 'Node 3C: Observasi Hipertensi Urgensi',
      description: 'Tensi tinggi ≥180/120 namun PASIEN TERLIHAT BERBAHAYA TENANG (asimtomatis). Risiko stroke apabila tidak diawasi.',
      items: [
        {
          id: 'ur-obat-oral',
          title: 'Terapi Oral Kerja Singkat (Onset Cepat)',
          description: 'Berikan: Captopril 12.5 mg – 25 mg PER ORAL / Sublingual, ATAU Klonidin 0.15 mg oral. \nTarget: Bukan normal! Target turunkan TD 20-25% saja dari baseline dalam 1-2 jam pertama.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'ur-observasi',
          title: 'Rehat & Observasi Ketat 2 Jam di Klinik',
          description: 'Tidurkan pasien di tempat tidur observasi yang tenang dan redup. Cek TD setiap 15-30 menit. Cek adakah timbul keluhan nyeri kepala baru atau asimetri wajah.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        },
        {
          id: 'ur-pulang-edukasi',
          title: 'Kriteria Pulang & Resep Rawat Jalan',
          description: 'Jika setelah 2 jam TD berhasil turun pelan (misal jadi 160/100), pasien BOLEH DIRAWAT JALAN tanpa harus ke IGD. Pulangkan dengan resep OAH kombinasi dan minta kontrol ulang H+3.',
          required: true,
          category: 'documentation'
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 3D: HIPERTENSI POLIKLINIK (TATALAKSANA KASUS BARU/LAMA)
    // ============================================================
    'ht-rutin-poliklinik': {
      id: 'ht-rutin-poliklinik',
      type: 'checklist',
      title: 'Node 3D: Tatalaksana Hipertensi Poliklinik (PERHI 2021)',
      description: 'Panduan tata laksana medikamentosa berbasis pedoman Kemenkes bagi pasien Derajat 1 & 2 di rawat jalan.',
      items: [
        {
          id: 'poli-modifikasi-hidup',
          title: 'Intervensi Gaya Hidup (DASH Diet)',
          description: 'Wajib diedukasikan sebelum/bersamaan obat:\nBatasi natrium (garam) < 2 gram/hari, stop merokok, turunkan BB (BMI target 20-25), olahraga 30 mnt/hari (5x seminggu), kurangi kafein dan tinggalkan alkohol.',
          required: true,
          category: 'documentation'
          role: 'both',
        },
        {
          id: 'poli-step1-terapi',
          title: 'Langkah 1: Inisiasi Terapi Kombinasi (Wajib Pill Ganda) untuk Tensi >160',
          description: 'Berdasarkan PERHI 2021, terapi inisial saat ini langsung disarankan KOMBINASI DUAL (kecuali lansia renta atau Derajat 1 sangat ringan).\nPilihan: ACEi/ARB + CCB (Kalsium Antagonis), CONTOH: Amlodipin 1x5mg + Candesartan 1x8mg / Lisinopril 1x5mg.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'poli-komorbid-dm-ckd',
          title: 'Pertimbangan Khusus Komorbid (DM, Peny. Ginjal Kronis, Gagal Jantung)',
          description: 'Pasien DM atau CKD (dengan Mikroalbuminuria): WAJIB menggunakan ACEi (Captopril/Lisinopril/Ramipril) atau ARB (Candesartan/Telmisartan) sebagai lini pelindung ginjal. JANGAN pilih HCT/CCB sebagai lini tunggal pertama.',
          required: true,
          category: 'medication'
          role: 'doctor',
        },
        {
          id: 'poli-larangan-kombinasi',
          title: '⚠️ LHO DILARANG KERAS!',
          description: 'DILARANG DENGAN MUTLAK menggabungkan ACEi dengan ARB secara bersamaan (Memicu gagal ginjal akut dan hiperkalemia fatal!). Contoh larangan: Captopril + Candesartan di-resepkan bebarengan.',
          required: true,
          category: 'safety'
          role: 'nurse',
        },
        {
          id: 'poli-step2-3',
          title: 'Follow UP Rutin (Step 2 & 3 Jika Belum Terkontrol)',
          description: 'Kontrol ulang dalam 2-4 minggu. Jika target TD <140/90 (Atau <130/80 untuk DM) belum tercapai:\n- Step 2: Maksimalkan dosis kombinasi dual (Menaikkan Amlodipin ke 1x10mg atau Candesartan ke 1x16mg).\n- Step 3: Tambahkan Diuretik (Thiazide/HCT). Kombinasi TRIPLE.',
          required: true,
          category: 'assessment'
          role: 'nurse',
        }
      ]
    }
  },
  references: [
    'Konsensus Penatalaksanaan Hipertensi PERHI (Perhimpunan Dokter Hipertensi Indonesia) Edisi 2021',
    'Keputusan Menteri Kesehatan Nomor HK.01.07/MENKES/4634/2021 tentang Pedoman Nasional Pelayanan Kedokteran Tata Laksana Hipertensi Dewasa',
    'European Society of Cardiology (ESC) / ESH Guidelines for the management of arterial hypertension (2018/2023 Update)',
    'JNC-8 (Eighth Joint National Committee) Hypertension Guidelines'
  ]
};
