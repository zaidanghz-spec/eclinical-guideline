// ============================================================
// ANGINA PEKTORIS STABIL (APS) - SETTING FKTP/KLINIK
// ============================================================
// Sumber: PNPK Kemenkes HK.01.07/MENKES/1419/2023 (PERKI)
// Fasilitas Tersedia: TTV (Tensi, Termometer, Oxymeter), EKG, Suction, Nebulizer
// Keterbatasan: TIDAK ADA Ekokardiografi, Uji Latih, CCTA, atau Laboratorium
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const apsPathway: DynamicPathway = {
  diseaseId: 'angina-pektoris-stabil',
  diseaseName: 'Angina Pektoris Stabil (APS)',
  startNodeId: 'aps-anamnesis',
  nodes: {

    // NODE 1: ANAMNESIS & KLASIFIKASI NYERI
    'aps-anamnesis': {
      id: 'aps-anamnesis',
      type: 'checklist',
      title: 'Triase dan Anamnesis Awal Angina Stabil (Klinik)',
      description: 'PNPK 2023: Anamnesis adalah kunci utama diagnosis APS di Faskes Primer.',
      items: [
        {
          id: 'aps-chest-pain-character',
          title: 'Triase Angina Tipikal (3 Kriteria Emas)',
          description: 'Cari 3 tanda: (1) Rasa tertindih/berat di substernal, (2) Timbul HANYA saat ada pemicu aktivitas fisik atau emosi, (3) Merasa lega/hilang saat istirahat <10 menit.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-akut-screening',
          title: 'Skrining Kedaruratan SKA',
          description: 'PERHATIAN! Apakah nyerinya timbul saat ini juga, terjadi saat istirahat, atau >20 menit tanpa henti? BILA YA, hentikan kuesioner ini dan beralih ke jalur rujukan SKA. Jika tidak, lanjutkan anamnesis stabil ini.',
          required: true,
          category: 'safety'
        },
        {
          id: 'aps-ccs-class',
          title: 'Klasifikasi CCS (Kemampuan Aktivitas)',
          description: 'Tanyakan: Apakah nyeri dada sampai menghalangi jalan cepat 2 blok? Naik tangga 1 lantai? Jika iya, tulis riwayat limitasi tersebut (CCS Kelas II-III).',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'aps-physical-exam'
    },

    // NODE 2: PEMERIKSAAN FISIK & KETERBATASAN KLINIK
    'aps-physical-exam': {
      id: 'aps-physical-exam',
      type: 'checklist',
      title: 'Pemeriksaan Klinik & Alat Terbatas (TTV & EKG)',
      description: 'Gunakan seluruh alat yang ada: Tensimeter, Oxymeter, Termometer, dan mesin EKG.',
      items: [
        {
          id: 'aps-ttv-check',
          title: 'Pemeriksaan Tensimeter & Oxymeter',
          description: 'Wajib mengukur tekanan darah, detak jantung. Catat apakah HR meningkat (Tanda risiko tinggi). Pasang oxymeter ke jari untuk memastikan tidak ada hipoksia.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-ecg-rest',
          title: 'Pemeriksaan EKG 12 Sadapan Istirahat',
          description: 'Rekam EKG sekarang. EKG Normal PADA SAAT ISTIRAHAT TIDAK MENYINGKIRKAN DIAGNOSIS APS. Namun apabila EKG menunjukkan Q patologis atau depresi ST kronik, segera catat.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-suction-nebulizer-exclude',
          title: 'Eksklusi Penyakit Respirasi (Suction/Nebul)',
          description: 'Jika ada wheezing berat / riwayat asma yang menyebabkan sesak (bukan angina kardiak), pertimbangkan nebulizer. Angina kronis biasanya TIDAK memerlukan bedah jalan napas atau suction / nebul.',
          required: false,
          category: 'action'
        },
        {
          id: 'aps-echo-lab-rujuk',
          title: 'KETERBATASAN ALAT: Siapkan Lembar Rujukan Uji Non-Invasif PJK',
          description: 'Karena tidak adanya Echo atau Treadmill/CCTA, pasien dengan gejala PJK Stabil (dan memiliki EKG tidak jelas/normal) WAJIB dirujuk ke faskes tingkat lanjut untuk mencari tahu Pre-Test Probability yang obyektif.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'aps-ptp-stratification'
    },

    // NODE 3: DECISION - STRATIFIKASI PRA-RUJUKAN
    'aps-ptp-stratification': {
      id: 'aps-ptp-stratification',
      type: 'decision',
      title: 'Keputusan Tatalaksana Klinik PJK Stabil',
      description: 'Tentukan langkah pemberian obat sembari menunggu rujukan Ekokardiografi / Poly Jantung RSUD.',
      warningLevel: 'info',
      branches: [
        {
          id: 'aps-rujuk-diagnosis',
          title: 'Obat Awal & Rujuk Konsultan Kardiologi (Lanjut)',
          description: 'Faskes tingkat pertama dapat memberikan obat pereda serangan & pereda frekuensi sambil menjadwalkan pemeriksaan diagnostik tingkat dua.',
          color: 'orange',
          nextNodeId: 'aps-tmo-fktp',
          riskLevel: 'medium'
        },
        {
          id: 'aps-non-cardiac',
          title: 'Kempanjang Diagnosis Klinis Non-Kardiak',
          description: 'Pola angina tidak cocok sama sekali (contoh: nyeri kalau ditekan/punggung/GERD). Tangani sesuai diagnosis lambung/otot, obati dengan antasida/parasetamol.',
          color: 'green',
          nextNodeId: 'aps-low-ptp-management',
          riskLevel: 'low'
        }
      ]
    },

    // NODE 4: LOW PTP MANAGEMENT
    'aps-low-ptp-management': {
      id: 'aps-low-ptp-management',
      type: 'checklist',
      title: 'Tatalaksana Angina Non-Kardiak (Klinis Rendah Risiko)',
      description: 'Nyeri kemungkinan besar GERD atau Muskuloskeletal.',
      items: [
        {
          id: 'aps-non-cardiac-eval',
          title: 'Gunakan Obat Alternatif',
          description: 'Beri PPI/Antasida untuk lambung, pereda nyeri untuk otot/tulang. Observasi respon dalam beberapa hari lewat kontrol klinik rutin.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-rf-correction-low',
          title: 'Tetap Pantau Tensimeter Rutin',
          description: 'Cegah memburuknya hipertensi. Pantau berkala di FKTP.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'aps-tmo-fktp' // fall off
    },

    // NODE 5: TMO DI FASILITAS KLINIK (Obat Dasar)
    'aps-tmo-fktp': {
      id: 'aps-tmo-fktp',
      type: 'checklist',
      title: 'Terapi Medis Optimal (Dapat Diresepkan di Klinik Dasar)',
      description: 'Obat-obatan lini pertama APS (Jika apotek FKTP Anda memiliki stok obat program PRB/JKN).',
      items: [
        {
          id: 'aps-nitrat-sl',
          title: 'Pemberian Resep Obat ISDN Sublingual',
          description: 'Bekali pasien ISDN 5mg Sublingual (di bawah lidah). Edukasi cara pemakaian bila angina kumat. Tekankan untuk SEGERA KE IGD / KLINIK bila 3 pil setiap 5 menit gagal.',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-beta-blocker',
          title: 'Resep Beta Blocker (Bisoprolol / Atenolol)',
          description: 'Terapi inti anti-anginal kronik. Jika tensi dan nadi stabil (tidak ada bradikardia / blok AV), resepkan Beta Blocker tablet untuk diminum setiap hari.',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-aspirin',
          title: 'Resep Aspirin Dosis Rendah',
          description: 'Pencegahan agregasi (80mg per hari) diresepkan jika gejala klinis cukup kuat suspek PJK.',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-rujukan-surat',
          title: 'BERIKAN SURAT RUJUKAN EKOKARDIOGRAFI & TREADMILL',
          description: 'Pasien wajib dirujuk ke RS / Poli Jantung terdekat untuk mengukur kerusakan pompa jantung (LVEF) dengan Echo, dan uji iskemia. Segala keputusan alat Cath Lab/PCI ada di spesialis jantung.',
          required: true,
          category: 'documentation'
        }
      ]
    }
  }
};
