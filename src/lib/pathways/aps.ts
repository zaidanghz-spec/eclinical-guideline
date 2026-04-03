// ============================================================
// ANGINA PEKTORIS STABIL (APS) - POST-TRIASE FKTP
// ============================================================
// Diintegrasikan ke dalam payung Sindrom Koroner (ska.ts)
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const apsPathway: DynamicPathway = {
  diseaseId: 'angina-pektoris-stabil',
  diseaseName: 'Angina Pektoris Stabil (APS)',
  startNodeId: 'aps-anamnesis-lanjutan',
  nodes: {

    // NODE: ANAMNESIS LANJUTAN (Setelah Triase Awal)
    'aps-anamnesis-lanjutan': {
      id: 'aps-anamnesis-lanjutan',
      type: 'checklist',
      title: 'Pemeriksaan Klinis Angina Stabil (Klinik)',
      description: 'Karena Triase Awal menyingkirkan SKA, fokuskan pada kronisitas penyakit ini.',
      items: [
        {
          id: 'aps-ccs-class',
          title: 'Tentukan Klasifikasi CCS (Kemampuan Aktivitas)',
          description: 'CCS I: Nyeri hanya saat aktivitas berat. CCS II: Jalan 2 blok/naik tangga 1 lantai terhambat. CCS III: Aktivitas ringan terhambat. Catat ini ke rekam medis.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-rf-check',
          title: 'Cek Faktor Risiko Penyerta',
          description: 'Riwayat Hipertensi, DM, Kolesterol, atau Merokok aktif yang perlu dikendalikan melalui pengobatan rawat jalan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-echo-lab-rujuk',
          title: 'KETERBATASAN ALAT: Siapkan Lembar Rujukan Ekokardiografi',
          description: 'Klinik tidak memiliki Echo/Treadmill. Pasien dengan gejala PJK Stabil murni WAJIB dirujuk ke Poli Jantung RSUD untuk menilai fungsi pompa (LVEF).',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'aps-ptp-stratification'
    },

    // NODE: DECISION
    'aps-ptp-stratification': {
      id: 'aps-ptp-stratification',
      type: 'decision',
      title: 'Keputusan Tatalaksana Klinik PJK Stabil',
      description: 'Pilih alur pengobatan saat pasien menunggu jadwal rujukan poli jantung.',
      warningLevel: 'info',
      branches: [
        {
          id: 'aps-rujuk-diagnosis',
          title: 'Klinis Sesuai PJK -> Resepkan Obat Awal',
          description: 'Beri obat dasar sambil merujuk.',
          color: 'blue',
          nextNodeId: 'aps-tmo-fktp',
          riskLevel: 'medium'
        },
        {
          id: 'aps-non-cardiac',
          title: 'Klinis Dominan Non-Kardiak',
          description: 'Nyeri dada lebih condong ke lambung (GERD) atau Paru-paru.',
          color: 'green',
          nextNodeId: 'aps-low-ptp-management',
          riskLevel: 'low'
        }
      ]
    },

    'aps-low-ptp-management': {
      id: 'aps-low-ptp-management',
      type: 'checklist',
      title: 'Tatalaksana Angina Non-Kardiak',
      description: 'Nyeri kemungkinan besar GERD atau penyakit otot dada.',
      items: [
        {
          id: 'aps-non-cardiac-eval',
          title: 'Gunakan Obat Alternatif',
          description: 'Beri Anti-asam lambung atau Parasetamol/NSAID ringan. Observasi respon lewat kontrol klinik.',
          required: true,
          category: 'assessment'
        }
      ]
    },

    'aps-tmo-fktp': {
      id: 'aps-tmo-fktp',
      type: 'checklist',
      title: 'Terapi Medis PJK Stabil (Klinik)',
      description: 'Obat-obatan dasar APS sebelum evaluasi spesialis jantung.',
      items: [
        {
          id: 'aps-nitrat-sl',
          title: 'ISDN Sublingual',
          description: 'Bekali pasien ISDN 5mg (di bawah lidah). Edukasi BILA nyeri kronis kumat. KE IGD bila tidak mempan.',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-beta-blocker',
          title: 'Resep Beta Blocker (Bisoprolol / Atenolol)',
          description: 'Jika tensi/nadi normal, resepkan beta blocker oral setiap hari.',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-aspirin',
          title: 'Resep Aspirin Dosis Rendah',
          description: 'Pencegahan pendarahan (Aspirin 80mg per hari).',
          required: true,
          category: 'medication'
        }
      ]
    }
  }
};
