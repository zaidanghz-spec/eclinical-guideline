// ============================================================
// HIPERTENSI DEWASA
// ICD-10: I10 (Esensial), I11 (Hipertensi Heart Disease)
// Referensi: PNPK Tata Laksana Hipertensi Dewasa (Kemenkes 2021)
// Setting: Klinik FKTP (Alat: TTV, EKG)
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const hipertensiPathway: DynamicPathway = {
  diseaseId: 'hipertensi-dewasa',
  diseaseName: 'Hipertensi Dewasa (PNPK Kemenkes 2021)',
  startNodeId: 'ht-node1-assessment',
  nodes: {

    // ============================================================
    // NODE 1: ASSESSMENT + EKG
    // ============================================================
    'ht-node1-assessment': {
      id: 'ht-node1-assessment',
      type: 'checklist',
      title: 'Node 1: Pemeriksaan TTV & EKG (Screening Darurat)',
      description: 'Lakukan pemeriksaan tekanan darah dengan benar dan skrining kerusakan organ target (HMOD / Target Organ Damage).',
      items: [
        {
          id: 'ht-ukur-td',
          title: 'Ukur Tekanan Darah Terstandar',
          description: 'Pasien istirahat 5 menit. Tensi kedua lengan, ambil rerata tertinggi. Tensi > 140/90 mmHg disebut Hipertensi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-anamnesis-krisis',
          title: 'Skrining Gejala Krisis / Tanda Bahaya',
          description: 'Nyeri dada tembus ke punggung? Sesak napas mendadak? Sakit kepala hebat, mual muntah, pandangan kabur? (Gejala kerusakan organ target).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ekg-wajib',
          title: 'Rekam EKG 12-Sadapan',
          description: 'WAJIB pada pasien dengan TD >180/120 atau ada nyeri dada/sesak. Cari tanda: LVH (hipertrofi), Iskemik/Infark (ST elevasi/depresi), atau Aritmia (AF).',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ht-triage'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION
    // ============================================================
    'ht-triage': {
      id: 'ht-triage',
      type: 'decision',
      title: 'Node 2: Triage Hipertensi',
      description: 'Berdasarkan tingginya tensi dan gejala:',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ht-emergensi',
          title: '🔴 Hipertensi Emergensi (Krisis) -> IGD',
          description: 'TD ≥ 180/120 mmHg DENGAN kerusakan organ target nyata (nyeri dada akut, sesak berat, EKG khas infark, defisit neurologis/stroke).',
          color: 'red',
          nextNodeId: 'ht-rujuk-kritis',
          riskLevel: 'high'
        },
        {
          id: 'ht-urgensi',
          title: '🟠 Hipertensi Urgensi -> Observasi Klinik',
          description: 'TD ≥ 180/120 mmHg TANPA kerusakan organ target. Tidak ada sesak/nyeri dada/gangguan saraf.',
          color: 'orange',
          nextNodeId: 'ht-urgency-mgmt',
          riskLevel: 'medium'
        },
        {
          id: 'ht-stabil',
          title: '🟢 Hipertensi Derajat 1 / 2 -> Poliklinik',
          description: 'TD 140-179/90-119 mmHg. Gejala ringan (pegal tengkuk, pusing biasa).',
          color: 'green',
          nextNodeId: 'ht-poli-mgmt',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: MANAGEMENT
    // ============================================================
    'ht-rujuk-kritis': {
      id: 'ht-rujuk-kritis',
      type: 'checklist',
      title: 'Hipertensi Emergensi - Rujuk CITO!',
      description: 'Jangan turunkan TD sembarangan di klinik! Rujuk segera.',
      items: [
        {
          id: 'ht-em-o2',
          title: 'Berikan Oksigen',
          description: 'Pasang O2 nasal/sungkup jika SpO2 <95% atau sesak napas mengancam.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-em-iv',
          title: 'Pasang IV Line maintenance',
          description: 'Untuk akses obat antihipertensi IV yang akan diberikan di RS. Jangan guyur cairan!',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-em-rujuk',
          title: 'Rujuk dengan Ambulans',
          description: 'Bawa hasil EKG. Edukasi keluarga bahwa kondisi mengancam nyawa. (Bila di perjalanan sangat lama, obat anti-HT oral sublingual spt Captopril BISA berbahaya, prefer urus rujukan saja).',
          required: true,
          category: 'documentation'
        }
      ]
    },

    'ht-urgency-mgmt': {
      id: 'ht-urgency-mgmt',
      type: 'checklist',
      title: 'Hipertensi Urgensi - Observasi & Sublingual',
      description: 'Turunkan secara bertahap dalam jam ke hari, JANGAN turun mendadak (cegah stroke iskemik!).',
      items: [
        {
          id: 'ht-ur-capto',
          title: 'Captopril 25 mg Sublingual / Oral',
          description: 'Beri Captopril oral/sublingual. Tunggu 30-60 menit. Observasi sambil perhatikan tanda bahaya.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-ur-obs',
          title: 'Observasi 1-2 Jam',
          description: 'Pantau TD per 30 menit. Target penurunan JANGAN lebih dari 25% dari TD awal dalam waktu cepat.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-ur-pulang',
          title: 'Pulangkan Bila Turun',
          description: 'Jika membaik (TD turun 160-170an), bekali terapi kombinasi 2 obat (mis: Amlodipin + Lisinopril). Kontrol 3 hari lagi.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    'ht-poli-mgmt': {
      id: 'ht-poli-mgmt',
      type: 'checklist',
      title: 'Hipertensi Biasa (Derajat 1 & 2)',
      description: 'Gunakan protokol kombinasi OAH.',
      items: [
        {
          id: 'ht-po-diet',
          title: 'Edukasi DASH Diet (Rendah Garam)',
          description: 'Batasi natrium <2 gram/hari. Modifikasi gaya hidup.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'ht-po-obat',
          title: 'Obat Anti Hipetensi (Lini 1: CCB / ACEi / ARB)',
          description: 'Jika Ht Derajat 1: Amlodipin 1x5mg atau Candesartan 1x8mg.\nJika Ht Derajat 2: Pilih Kombinasi langsung (Amlodipin + Candesartan/Lisinopril). JANGAN kombinasi ACEi + ARB sekaligus!',
          required: true,
          category: 'medication'
        }
      ]
    }
  },
  references: ['PNPK Kemenkes 2021: Tata Laksana Hipertensi Dewasa.']
};
