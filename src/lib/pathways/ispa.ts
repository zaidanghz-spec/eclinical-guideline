import { DynamicPathway } from '../dynamicPathways';

export const ispaPathway: DynamicPathway = {
  diseaseId: 'ispa',
  diseaseName: 'ISPA Non-Pneumonia (Fasilitas Primer Tanpa X-Ray)',
  startNodeId: 'ispa-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT
    // ============================================================
    'ispa-initial-assessment': {
      id: 'ispa-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — TTV, Sesak, & Skrining Red Flags',
      description: 'Di klinik tanpa X-Ray dan lab darah, diagnosis ISPA harus fokus pada penyingkiran kegawatdaruratan (Pneumonia berat, Asma/PPOK eksaserbasi berat) menggunakan TTV dan Stetoskop.',
      items: [
        {
          id: 'ispa-anamnesis',
          title: 'Anamnesis: Gejala Utama',
          description: 'Berapa hari demam, batuk (kering vs berdahak), pilek, nyeri tenggorok? Apakah ada sesak napas akut? Riwayat alergi, asma, atau merokok?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ispa-ttv',
          title: 'VITAL SIGNS LENGKAP — Wajib Hitung RR (Respiration Rate)!',
          description: 'Ukur Suhu, Tensi, Nadi, Oksimetri (SpO2), dan RR. \nCRITICAL: RR >24 x/menit pada dewasa (atau takipnea pada anak) + demam adalah prediktor terkuat pneumonia klinis. SpO2 < 92% = RED FLAG.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ispa-fisik-paru',
          title: 'Auskultasi & Inspeksi Thorax (Stetoskop)',
          description: 'Inspeksi: Adakah retraksi dinding dada (tarikan otot sela iga/leher) saat napas? \nAuskultasi: Wheezing (mengi -> asma/PPOK), Ronki basah kasar/halus (curiga pneumonia/edema paru), atau suara napas menurun di satu sisi?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ispa-fisik-orofaring',
          title: 'Inspeksi Orofaring (Penlight)',
          description: 'Cek faring hiperemis, amandel membesar, atau adanya eksudat putih/kuning di tonsil (curiga faringitis bakteri/strep).',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ispa-red-flags',
          title: 'Skrining RED FLAGS',
          description: 'Perhatikan tanda gagal napas: SpO2 <92% room air, RR >30x/mnt, retraksi dada hebat, bibir sianosis (kebiruan), kesadaran menurun/letargi, atau tidak bisa bicara satu kalimat penuh.',
          required: true,
          category: 'safety',
          role: 'nurse',
        }
      ],
      nextNodeId: 'ispa-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION
    // ============================================================
    'ispa-triage-decision': {
      id: 'ispa-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Rujuk, Nebulisasi, atau Rawat Jalan?',
      description: 'Klasifikasikan keparahan berdasarkan TTV dan auskultasi paru.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'ispa-gagal-napas',
          title: 'RED FLAG POSITIF (Curiga Pneumonia / Gagal Napas)',
          description: 'SpO2 <92%, takipnea berat (RR>30), ronki luas, retraksi dada, letargi. Suspek Pneumonia CURB-65 tinggi.',
          color: 'red',
          nextNodeId: 'ispa-emergency-referral',
          riskLevel: 'high'
        },
        {
          id: 'ispa-wheezing',
          title: 'WHEEZING KEDENGARAN (Eksaserbasi Asma / PPOK)',
          description: 'Pasien sesak dengan suara mengi (wheezing) dominan, SpO2 masih >92%, riwayat asma/PPOK ada.',
          color: 'orange',
          nextNodeId: 'ispa-nebulization-management',
          riskLevel: 'medium'
        },
        {
          id: 'ispa-ringan',
          title: 'TIDAK SESAK, PARU BERSIH (ISPA Ringan)',
          description: 'SpO2 >95%, RR normal, paru vesikuler tanpa ronki/wheezing. (Common cold, faringitis, bronkitis akut tanpa penyulit).',
          color: 'green',
          nextNodeId: 'ispa-mild-management',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: EMERGENCY REFERRAL (RED FLAG)
    // ============================================================
    'ispa-emergency-referral': {
      id: 'ispa-emergency-referral',
      type: 'checklist',
      title: 'Node 3: Red Flag — Stabilisasi & Rujuk (Urgent)',
      description: 'Pasien kemungkinan mengalami Pneumonia yang butuh konfirmasi X-Ray, Lab (Darah Lengkap), dan antibiotik IV di RS.',
      items: [
        {
          id: 'ref-oksigen',
          title: 'Oksigenasi Terapi',
          description: 'Berikan Oksigen nasal kanul 2-4 L/menit atau sungkup muka sederhana (simple mask) 6-8 L/menit. Targetkan SpO2 >94%.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'ref-iv-line',
          title: 'Pasang Akses Intravena (IV Line)',
          description: 'Pasang infus perifer (RL atau NaCl 0.9%) jika pasien tampak dehidrasi (demam tinggi lama, tidak mau makan/minum) atau takikardia parah.',
          required: false,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'ref-surat-rujuk',
          title: 'Surat Rujukan ke IGD RS',
          description: 'Tulis surat rujukan dengan indikasi klinis susp. Pneumonia. Cantumkan hasil TTV (terutama RR dan SpO2 ruangan), temuan stetoskop, dan tindakan prarujukan (O2).',
          required: true,
          category: 'documentation',
          role: 'nurse',
        },
        {
          id: 'ref-edukasi-pneumonia',
          title: 'Edukasi Keluarga Pasien',
          description: 'Jelaskan bahwa radang paru-paru tidak bisa didiagnosis pasti / diobati tuntas di faskes dasar tanpa X-Ray, sehingga butuh evaluasi lanjutan, agar nyawa tidak terancam.',
          required: true,
          category: 'safety',
          role: 'nurse',
        }
      ]
    },

    // ============================================================
    // NODE 4: NEBULIZATION MANAGEMENT (WHEEZING)
    // ============================================================
    'ispa-nebulization-management': {
      id: 'ispa-nebulization-management',
      type: 'checklist',
      title: 'Node 4: Tatalaksana Napas (Nebulisasi & Suction)',
      description: 'Lakukan terapi penyelamatan napas menggunakan alat nebulizer (dan suction jika ada banyak lendir menyumbat).',
      items: [
        {
          id: 'nebu-bronkodilator',
          title: 'Pemberian Nebulisasi Bronkodilator',
          description: 'Berikan Salbutamol nebul (2.5 mg) dicampur NaCl 0.9% 2cc. Jika dewasi/PPOK, pertimbangkan Ipratropium Bromida kombinasi.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'nebu-oksigen',
          title: 'Oksigen Suplemental (Jika Perlu)',
          description: 'Oksigen 2-4 L/m nasal kanul selama dan antar siklus nebulisasi bila SpO2 batas bawah (92-94%).',
          required: false,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'nebu-suction',
          title: 'Suction Lendir (Terutama Anak/Bayi)',
          description: 'Jika ada penumpukan lendir hebat (ronki basah/gurgling) di saluran napas atas yang tidak bisa dibatukkan mandiri (pada anak/bayi), gunakan mesin suction dengan kateter lembut secara hati-hati (jangan lebih dari 10 detik per penarikan).',
          required: false,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'nebu-evaluasi',
          title: 'Evaluasi Pasca-Nebulisasi 15-20 Menit',
          description: 'Dengarkan ulang (auskultasi). Hitung RR. \nJika wheezing hilang/berkurang drastis -> pasien aman pulang (pindah ke tatalaksana ISPA Ringan). \nJika masih mengi/sesak -> bisa ulang Nebul maksimal 3x jeda 20 menit. Masih gagal -> RUJUK IGD.',
          required: true,
          category: 'assessment',
          role: 'doctor',
        }
      ],
      nextNodeId: 'ispa-mild-management'
    },

    // ============================================================
    // NODE 5: MILD ISPA MANAGEMENT
    // ============================================================
    'ispa-mild-management': {
      id: 'ispa-mild-management',
      type: 'checklist',
      title: 'Node 5: Rawat Jalan ISPA (Common Cold & Bronkitis Akut)',
      description: 'Terapi suportif dan simptomatik. SEBAGIAN BESAR ADALAH VIRUS. HINDARI ANTIBIOTIK RUTIN.',
      items: [
        {
          id: 'mild-antipiretik',
          title: 'Antipiretik / Analgesik',
          description: 'Paracetamol 500 mg 3x sehari (dewasa) prn demam/nyeri seluruh badan/nyeri tenggorokan.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'mild-dekongestan',
          title: 'Dekongestan & Antihistamin',
          description: 'Berikan obat flu kombinasi atau Cetirizine 1x10 mg (malam) + Pseudoefedrin untuk mengurangi pilek/hidung tersumbat.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'mild-antititusif-mukolitik',
          title: 'Obat Batuk (Ekspektoran vs Penekan Batuk)',
          description: 'Jika batuk berdahak kental: Guaifenesin / Bromhexine (ekspektoran). \nJika batuk kering mengganggu tidur: Dextromethorphan (Gunakan hati-hati, jangan kombinasikan ekspektoran + penekan batuk di saat bersamaan!).',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'mild-no-antibiotik',
          title: 'JANGAN BERIKAN ANTIBIOTIK KECUALI INDIKASI JELAS!',
          description: 'Antibiotik TIDAK meredakan flu/batuk virus (90% kasus bronkitis akut itu VIRUS). \nHANYA berikan Amoxicillin (500mg 3x sehari x 5-7 hari) JIKA: curiga kuat faringitis Streptococcus (demam mendadak, amandel eksudat bernanah, tanpa batuk pilek).',
          required: true,
          category: 'safety',
          role: 'both',
        },
        {
          id: 'mild-edukasi-istirahat',
          title: 'Edukasi Pencegahan & Istirahat',
          description: 'Gunakan masker, cuci tangan, perbanyak minum air hangat. Istirahat 3-5 hari di rumah. Kembali kontrol jika >5 hari demam tidak turun atau timbul sesak napas akut (waspada pneumonia sekunder).',
          required: true,
          category: 'documentation',
          role: 'nurse',
        }
      ]
    }

  },
  references: [
    'KMK No. HK.01.07/MENKES/1186/2022 – Panduan Praktik Klinis bagi Dokter di Fasilitas Pelayanan Kesehatan Tingkat Pertama. Bab Respirasi (ISPA, Bronkitis Akut, Asma).',
    'WHO Guidelines for the Management of Acute Respiratory Infections in Primary Care.',
    'Centor Criteria for Group A Streptococcal Pharyngitis.',
    'Global Initiative for Asthma (GINA) Guidelines - Management of Acute Exacerbation in Primary Care.'
  ]
};
