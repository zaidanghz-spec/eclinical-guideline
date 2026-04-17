// ============================================================
// TUBERKULOSIS PARU (TB PARU)
// ICD-10: A15 / A16
// Referensi:
// - Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Tuberkulosis, KMK No. HK.01.07/MENKES/755/2019
// - Petunjuk Teknis Penatalaksanaan Tuberkulosis (Kemenkes RI 2021)
// - WHO Consolidated Guidelines on Tuberculosis 2022
// Setting: Klinik / FKTP
// Alat: TTV (Tensi, Termometer, Oksimetri), Suction, O₂
// TIDAK ADA: GenXpert/TCM, Rontgen Thorax, Kultur Dahak (rujuk sampel atau pasien)
// Prinsip: IDENTIFIKASI KLINIS CEPAT → KONTROL INFEKSI (Masker!) → ATASI KEGAWATAN (Hemoptisis masif) → RAWAT JALAN & RUJUK LAB
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const tuberkulosisPathway: DynamicPathway = {
  diseaseId: 'tuberkulosis-paru',
  diseaseName: 'Tuberkulosis Paru (PNPK 2019 & Kemenkes)',
  startNodeId: 'tb-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT
    // ============================================================
    'tb-initial-assessment': {
      id: 'tb-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Skrining Awal & Kontrol Infeksi',
      description: 'Cari tahu apakah pasien ini datang dengan kegawatan napas/batuk darah, baru dicurigai TB (suspek), atau sudah sedang dalam pengobatan (kontrol OAT).',
      items: [
        {
          id: 'tb-kontrol-infeksi',
          title: '⚡ PROTEKSI SEGERA! (Pencegahan & Pengendalian Infeksi)',
          description: 'Jika pasien datang batuk: pakaikan masker bedah pada pasien SEGERA. Petugas wajib memakai masker N95 / KN95 jika berhadapan dengan suspek TB aktif. Lakukan anamnesis di ruang terpisah berventilasi baik.',
          required: true,
          category: 'safety'
        },
        {
          id: 'tb-kegawatan',
          title: 'Cek Kegawatan: Batuk Darah Masif / Sesak Berat?',
          description: 'Batuk darah masif (> 200–600 mL/24 jam atau > 2–3 gelas aqua) ATAU sesak berat (SpO₂ < 90%) adalah ancaman asfiksia akut. Berpotensi menutup jalan napas. TANGANI SEGERA sbg DARURAT.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tb-anamnesis-gejala',
          title: 'Anamnesis — Trias Klasik TB',
          description: 'Gejala utama: Batuk produktif ≥ 2 minggu (bisa berdarah).\nGejala penyerta (B-Gejala): Demam meriang / subfebris (terutama sore/malam), keringat malam meski tanpa aktivitas, penurunan berat badan drastis tanpa sebab, lemas/malaise.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tb-anamnesis-riwayat',
          title: 'Anamnesis — Faktor Risiko & Riwayat',
          description: '• Apakah ada kontak erat / serumah dengan penderita TB?\n• Apakah punya DM, HIV, atau kondisi gangguan imun (malnutrisi, usia lanjut)?\n• Apakah PERNAH minum obat flek paru (OAT) 6 bulan di masa lalu (putus obat / kambuh)?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tb-ttv-pemfis',
          title: 'TTV + Pemeriksaan Fisik Paru',
          description: 'Suhu: Biasanya subfebris (37.5 - 38°C).\nNadi & SpO₂: Takikardi? Desaturasi? BB: Timbang BB wajib (untuk hitung dosis OAT nanti).\nPemfis dada: Suara napas bronkial, amforik (kavitas), redup saat perkusi, ronki basah kasar di apeks (paru atas).',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'tb-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION
    // ============================================================
    'tb-triage-decision': {
      id: 'tb-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Alur Tatalaksana TB',
      description: 'Berdasarkan penilaian, pasien masuk kelompok mana?',
      warningLevel: 'warning',
      branches: [
        {
          id: 'tb-darurat-hemoptisis',
          title: '🔴 DARURAT — Hemoptisis Masif / Sesak Napas Berat',
          description: 'Batuk darah banyak membanjiri jalan napas atau SpO₂ < 90%. Risiko asfiksia & syok perdarahan. Rujuk segera!',
          color: 'red',
          nextNodeId: 'tb-kegawatan-management',
          riskLevel: 'high'
        },
        {
          id: 'tb-terduga',
          title: '🟠 TERDUGA TB (Suspek) — Belum Terdiagnosis',
          description: 'Pasien batuk >2 minggu + gejala khas, tapi belum tes dahak. Perlu prosedur diagnosis di FKTP.',
          color: 'orange',
          nextNodeId: 'tb-diagnosis-testing',
          riskLevel: 'medium'
        },
        {
          id: 'tb-kontrol-oat',
          title: '🟢 PASIEN TB — Kontrol OAT & Evaluasi Efek Samping',
          description: 'Pasien yang sudah terdiagnosis dan sedang minum OAT rutin, datang untuk kontrol atau mengeluh efek samping lambung/kulit/hati.',
          color: 'green',
          nextNodeId: 'tb-pasien-management',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: MANAJEMEN DARURAT (HEMOPTISIS MASIF)
    // ============================================================
    'tb-kegawatan-management': {
      id: 'tb-kegawatan-management',
      type: 'checklist',
      title: 'Node 3A: Darurat Hemoptisis Masif & Asfiksia',
      description: 'Stabilisasi jalan napas SEBELUM merujuk ke IGD RS.',
      items: [
        {
          id: 'dar-posisi-suction',
          title: 'Airway & Posisi — Siapkan Suction!',
          description: 'Posisikan pasien miring / dekubitus lateral ke sisi paru yang SAKIT (jika tahu mana yang sakit) agar darah tidak masuk tumpah ke paru sehat.\nSiapkan mesin SUCTION (penyedot) secara aktif jika darah menumpuk di mulut.',
          required: true,
          category: 'action'
        },
        {
          id: 'dar-oksigenasi',
          title: 'Oksigenasi',
          description: 'Berikan O₂ via NRM (Non-Rebreathing Mask) 10-15 L/menit untuk mengatasi hipoksia sekunder akibat perdarahan jalan napas.',
          required: true,
          category: 'medication'
        },
        {
          id: 'dar-iv-line',
          title: 'Akses IV & Kristaloid',
          description: 'Pasang IV line 2 jalur jika perdarahan masif (potensi syok hemoragik). Berikan bolus NaCl 0.9% atau RL 250-500 cc.',
          required: true,
          category: 'action'
        },
        {
          id: 'dar-rujuk',
          title: 'Rujuk CITO ke RS',
          description: 'Jalan langsung ke IGD RS. Dokter umum di klinik jangan attempt tindakan hemostatik paru tanpa fasilitas ICU. Edukasi keluarga: perdarahan masif paru fatal tanpa penanganan.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3B: TERDUGA TB (PROSEDUR DIAGNOSIS)
    // ============================================================
    'tb-diagnosis-testing': {
      id: 'tb-diagnosis-testing',
      type: 'checklist',
      title: 'Node 3B: Edukasi Tes Dahak (TCM) & Diagnosis',
      description: 'Pasien dikategorikan terduga TB. Harus segera dipastikan dengan tes mikrobiologis.',
      items: [
        {
          id: 'dx-tes-tcm',
          title: '1. Rencanakan Tes Cepat Molekuler (TCM) — Wajib Lini Pertama',
          description: 'PNPK 2019 mewajibkan TCM (GeneXpert) sebagai alat diagnostik pertama! TCM langsung mendeteksi DNA bakteri dan resistensi Rifampisin secara bersamaan.',
          required: true,
          category: 'action'
        },
        {
          id: 'dx-kumpul-dahak',
          title: '2. Panduan Kumpul Dahak Pagi & Sewaktu (S-P)',
          description: 'Pasien klinik diminta mengumpulkan setidaknya 2 pot dahak (meskipun TCM cukup 1 pot spesimen baik).\nS: Sewaktu saat pertama datang ke klinik.\nP: Pagi baru bangun tidur keesokan harinya.\nEdukasi mengambil dahak dalam (batuk perut), BUKAN ludah.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'dx-rujuk-sampel',
          title: '3. Tata Cara Rujuk Sampel Test / Röntgen',
          description: 'Klinik swasta biasanya tidak punya TCM.\n→ Kirim spesimen pot dahak tersebut ke Puskesmas Rujukan / RS Jejaring TCM terdekat (lewat kurir faskes standar TB).\n→ ATAU instruksikan pasien membawa surat pengantar ke Puskesmas terdekat untuk periksa TCM.\n→ Tambahkan Rontgen Thorax jika keluhan sugestif tapi dahak sulit keluar / TCM tidak tersedia.',
          required: true,
          category: 'action'
        },
        {
          id: 'dx-simtomatis',
          title: '4. Obat Simtomatis Sementara + Isolasi',
          description: 'Beri obat pelega (OBH, asetilsistein, parasetamol) secara suportif selama menunggu hasil. INGAT KAN: Jangan pernah mulai OAT (Obat Anti-TB) secara "Coba-Coba" (Trial TB) tanpa dasar klinis/lab yang kuat! Instruksikan isolasi di kamar sendiri dan buka ventilasi jendela di rumah.',
          required: true,
          category: 'medication'
        }
      ],
      nextNodeId: 'tb-rujuk-balik-lab'
    },

    // ============================================================
    // NODE 3C: PASIEN TB OAT (EVALUASI SAMPINGAN)
    // ============================================================
    'tb-pasien-management': {
      id: 'tb-pasien-management',
      type: 'checklist',
      title: 'Node 3C: Manajemen Kasus Pasien Menenggak OAT',
      description: 'Pengawasan efek samping hepatotoksisitas sangat krusial pada pasien klinik primer.',
      items: [
        {
          id: 'oat-evaluasi-hepatotoksik',
          title: '⚠️ Skrining Hepatotoksik — Gagal Hati Akibat OAT',
          description: 'Rifampisin, Isoniazid, Pirazinamid beracun bagi hati.\nTanyakan keluhan utama: Mual/muntah berlebih? Lemas luar biasa? Mata jadi KUNING (jaundice)? Urin sekental/segelap air teh padahal bukan dehidrasi?\nJika Ya → STOP SEMUA OAT! Rujuk lab untuk tes SGOT/SGPT dan Bilirubin STAT.',
          required: true,
          category: 'safety'
        },
        {
          id: 'oat-evaluasi-kulit',
          title: 'Skrining Alergi Kulit / Gatal',
          description: 'Ruam gatal ringan → Beri antihistamin, OAT lanjutkan perlahan.\nRuam berat/Stevens-Johnson (melepuh/lepas) → STOP OAT segera, rujukan rawat inap.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'oat-neuropati',
          title: 'Skrining Neuropati Perifer (Isoniazid)',
          description: 'Kebas atau kesemutan di tapak kaki dominan?\nBerikan tambahan Vitamin B6 (Piridoksin) 100 mg / hari. OAT tetap dilanjutkan.',
          required: true,
          category: 'medication'
        },
        {
          id: 'oat-keputuhan',
          title: 'Monitoring Kepatuhan (DOTS)',
          description: 'Evaluasi buku kontrol. PMO (Pengawas Menelan Obat). Jika putus obat > 2 bulan (Lost to follow-up), harus dirujuk tata laksana uji resistensi sebelum mulai sisipan obat baru.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 4: HASIL LAB & EDUKASI KELUARGA
    // ============================================================
    'tb-rujuk-balik-lab': {
      id: 'tb-rujuk-balik-lab',
      type: 'decision',
      title: 'Node 4: Evaluasi Hasil Lab TCM & Tindak Lanjut',
      description: 'Hasil dahak molekuler TCM sudah keluar. Apakah MTB-nya positif? Apakah Resisten Obat (RO)?',
      warningLevel: 'info',
      branches: [
        {
          id: 'tcm-positif-sensitif',
          title: '🟢 MTB Positif, Rifampisin Sensitif (TB-SO)',
          description: 'TB Paru biasa. Mulai pengobatan OAT Kategori 1 di FKTP selama 6 bulan.',
          color: 'teal',
          nextNodeId: 'tb-mulai-oat'
        },
        {
          id: 'tcm-positif-resisten',
          title: '🔴 MTB Positif, Rifampisin Resisten (TB-RO / MDR-TB)',
          description: 'Bakteri kebal obat. Wajib dirujuk ke RS Paru rujukan regional. Dilarang diberi Kategori 1.',
          color: 'red',
          nextNodeId: 'tb-darurat-hemoptisis' // Placeholder untuk penghentian rujukan
        },
        {
          id: 'tcm-negatif',
          title: '🟣 MTB Negatif, Tapi Gejala Klinis Kuat',
          description: 'Rontgen Thorax menunjukan infiltrate aktif/kavitas. Diagnosis TB Klinis.',
          color: 'purple',
          nextNodeId: 'tb-mulai-oat' // Lanjut secara klinis empiris via dokter spesialis
        }
      ]
    },

    // ============================================================
    // NODE 5: INISIASI OAT FKTP
    // ============================================================
    'tb-mulai-oat': {
      id: 'tb-mulai-oat',
      type: 'checklist',
      title: 'Node 5: Inisiasi OAT Kategori 1 — Dosifikasi & Edukasi',
      description: 'Obat Anti Tuberkulosis harus diberikan dengan benar via FDC (Fixed Dose Combination).',
      items: [
        {
          id: 'oat-dosis-bb',
          title: 'Pemberian OAT Kategori 1 Sesuai Berat Badan (BB)',
          description: 'Fase Intensif (2 bulan pertama) — (RHZE) diminum tiap hari:\n• BB 30-37 kg: 2 tablet/hari\n• BB 38-54 kg: 3 tablet/hari\n• BB 55-70 kg: 4 tablet/hari\n• BB >70 kg: 5 tablet/hari',
          required: true,
          category: 'medication'
        },
        {
          id: 'oat-warna-kencing',
          title: 'Edukasi Hal Wajar: Warna Kencing Merah!',
          description: 'Wajib diedukasikan bahwa air kencing dan keringat akan berubah warna jadi MERAH/ORANYE akibat obat Rifampisin. Ini NORMAL dan BUKAN BATUK DARAH.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'oat-cara-minum',
          title: 'Aturan Menelan',
          description: 'OAT harus diminum SEKALIGUS (tidak dicicil) pada pagi hari SAAT PERUT KOSONG (1 jam sebelum atau 2 jam sesudah makan) agar diserap maksimal. Jika perut mual hebat, boleh diundur ke malam sebelum tidur.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'oat-kontak-tracing',
          title: 'Investigasi Kontak Erat',
          description: 'Periksa seluruh anggota keluarga serumah (Kontak Tracing). Anak usia < 5 tahun asimtomatik di rumah pasien wajib diberikan Terapi Pencegahan Tuberkulosis (TPT) isoniazid 6 bulan.',
          required: true,
          category: 'safety'
        }
      ]
    }
  },
  references: [
    'KMK No. HK.01.07/MENKES/755/2019 tentang Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Tuberkulosis.',
    'Kementerian Kesehatan RI. Petunjuk Teknis Penatalaksanaan Tuberkulosis. Edisi 2021.',
    'World Health Organization (WHO). WHO consolidated guidelines on tuberculosis: Module 3: Diagnosis - Rapid diagnostics for tuberculosis detection. 2021.',
    'World Health Organization (WHO). WHO consolidated guidelines on tuberculosis: Module 4: Treatment. 2022.'
  ]
};
