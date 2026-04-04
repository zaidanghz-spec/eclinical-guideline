import { DynamicPathway } from '../dynamicPathways';

export const acuteKidneyInjuryPathway: DynamicPathway = {
  diseaseId: 'acute-kidney-injury',
  diseaseName: 'Gangguan Ginjal Akut (GGA)',
  startNodeId: 'gga-initial-assessment',
  nodes: {
    'gga-initial-assessment': {
      id: 'gga-initial-assessment',
      type: 'checklist',
      title: 'Penilaian Awal & Diagnosis GGA',
      description: 'Lakukan evaluasi awal untuk menegakkan diagnosis dan mengidentifikasi penyebab GGA.',
      items: [
        {
          id: 'gga-diag-scr',
          title: 'Evaluasi Serum Kreatinin',
          description: 'Peningkatan kreatinin serum >0,3 mg/dL dalam 48 jam ATAU >1,5 kali dari nilai basal dalam 7 hari.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-diag-uo',
          title: 'Evaluasi Laju Urin (Urine Output)',
          description: 'Laju urin <0,5 ml/kgBB/jam selama lebih dari 6 jam.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-risk-factors',
          title: 'Identifikasi Faktor Risiko',
          description: 'Lakukan evaluasi etiologi (Pre-renal, Intrinsik, Post-renal) dan singkirkan agen nefrotoksik.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'gga-severity-decision'
    },

    'gga-severity-decision': {
      id: 'gga-severity-decision',
      type: 'decision',
      title: 'Stratifikasi Keparahan & Indikasi Darurat',
      description: 'Apakah terdapat indikasi darurat yang mengancam nyawa untuk terapi pendukung ginjal (TPdG)?',
      branches: [
        {
          id: 'gga-emergency',
          title: 'Indikasi Darurat TPdG',
          description: 'Hadirnya komplikasi mengancam nyawa (Oliguria/anuria, asidosis berat pH<7.1, Hiperkalemia refrakter >6.5, Edema paru)',
          color: 'red',
          nextNodeId: 'gga-emergency-management'
        },
        {
          id: 'gga-conservative',
          title: 'Kondisi Stabil / Tanpa Darurat',
          description: 'Hemodinamik stabil atau dapat dikoreksi, belum membutuhkan TPdG darurat.',
          color: 'emerald',
          nextNodeId: 'gga-conservative-management'
        }
      ]
    },

    'gga-conservative-management': {
      id: 'gga-conservative-management',
      type: 'checklist',
      title: 'Tatalaksana Suportif & Konservatif',
      description: 'Pertahankan fungsi fisiologis dan cegah progresivitas GGA.',
      items: [
        {
          id: 'gga-hemodynamic',
          title: 'Resusitasi Cairan & Optimalisasi Hemodinamik',
          description: 'Gunakan isotonis kristaloid (NaCl 0.9%). Jaga MAP > 65-70 mmHg. Hindari penggunaan koloid (Starch).',
          required: true,
          category: 'action'
        },
        {
          id: 'gga-vasopressor',
          title: 'Pemberian Vasopresor',
          description: 'Gunakan Noradrenalin sebagai pilihan utama jika MAP < 65 mmHg setelah resusitasi cairan adekuat.',
          required: false,
          category: 'action'
        },
        {
          id: 'gga-nephrotoxic',
          title: 'Hentikan Obat Nefrotoksik',
          description: 'Evaluasi regimen obat dan hentikan seluruh obat nefrotoksik non-esensial. Sesuaikan dosis antibiotik.',
          required: true,
          category: 'action'
        },
        {
          id: 'gga-glucose',
          title: 'Kontrol Glukosa Ketat',
          description: 'Pertahankan profil glukosa darah pada rentang 110-149 mg/dl pada pasien kritis.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'gga-reassessment-decision'
    },

    'gga-reassessment-decision': {
      id: 'gga-reassessment-decision',
      type: 'decision',
      title: 'Evaluasi Respon Terapi Konservatif',
      description: 'Bagaimana respon fungsi ginjal pasien terhadap terapi konservatif paska 48 jam?',
      branches: [
        {
          id: 'gga-improving',
          title: 'Klinis Membaik',
          description: 'Pemulihan output urin dan penurunan atau stabilisasi serum kreatinin.',
          color: 'emerald',
          nextNodeId: 'gga-recovery-maintenance'
        },
        {
          id: 'gga-worsening',
          title: 'Progresif Memburuk',
          description: 'Perkembangan ke arah stadium 3 KDIGO, refractory anuria, atau asidosis berat.',
          color: 'red',
          nextNodeId: 'gga-emergency-management'
        }
      ]
    },

    'gga-recovery-maintenance': {
      id: 'gga-recovery-maintenance',
      type: 'checklist',
      title: 'Pemeliharaan dan Nutrisi',
      description: 'Lanjutkan pengelolaan konservatif paska pemulihan akut.',
      items: [
        {
          id: 'gga-nutrition',
          title: 'Optimalisasi Terapi Nutrisi',
          description: 'Lakukan skrining risiko malnutrisi. Berikan kalori sesuai kebutuhan dengan evaluasi berkala.',
          required: true,
          category: 'action'
        },
        {
          id: 'gga-monitor-kidney',
          title: 'Pemantauan Fungsi Ginjal Transisi',
          description: 'Lanjutkan monitoring fungsi ginjal secara periodik hingga 3 bulan (pengawasan AKD ke CKD).',
          required: true,
          category: 'action'
        }
      ]
    },

    'gga-emergency-management': {
      id: 'gga-emergency-management',
      type: 'checklist',
      title: 'Persiapan Terapi Pendukung Ginjal (TPdG)',
      description: 'Kolaorasi dan persiapkan TPdG ekstracorporeal / dialisis peritoneal segera.',
      items: [
        {
          id: 'gga-tpdg-modality',
          title: 'Pemilihan Modalitas TPdG',
          description: 'Pertimbangkan IHD (untuk hiperkalemia/komplikasi mengancam) atau CRRT (untuk syok kardiovaskular / hemodinamik tidak stabil).',
          required: true,
          category: 'safety'
        },
        {
          id: 'gga-vascular-access',
          title: 'Insersi Akses Vaskular',
          description: 'Gunakan Vena Jugularis Kanan sebagai prioritas utama untuk akses pemasangan CVC HD.',
          required: true,
          category: 'safety'
        },
        {
          id: 'gga-tpdg-dose',
          title: 'Preskripsi Dosis dan Antikoagulan',
          description: 'Target Kt/V mingguan 3.9 atau volume effluent 20-25 ml/kg/jam. Pilih antikoagulan (Sitrat atau Heparin) sesuai kondisi dan risiko perdarahan pasien.',
          required: true,
          category: 'safety'
        }
      ]
    }
  }
};
