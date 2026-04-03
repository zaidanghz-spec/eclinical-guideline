// ============================================================
// UMBRELLA SINDROM KORONER AKUT & ANGINA PEKTORIS STABIL
// ============================================================
// Sumber: Pedoman Tata Laksana Sindrom Koroner Akut Edisi ke-5 (PERKI 2024)
//         & PNPK Kemenkes 2023 untuk Angina Pektoris Stabil
// Penyakit: Angina Pectoris Stabil, Angina Pectoris Tidak Stabil (APTS / UAP), NSTEMI, STEMI
// ============================================================

import { DynamicPathway } from '../dynamicPathways';
import { apsPathway } from './aps'; // Import APS pathway untuk di-merge

export const skaPathway: DynamicPathway = {
  diseaseId: 'sindrom-koroner-akut',
  diseaseName: 'Sindrom Koroner Akut (termasuk Angina Pektoris Stabil)',
  startNodeId: 'coronary-umbrella-decision',
  nodes: {

    // Merge seluruh node dari Angina Pektoris Stabil (APS)
    ...apsPathway.nodes,

    // NODE 0: UMBRELLA DECISION
    'coronary-umbrella-decision': {
      id: 'coronary-umbrella-decision',
      type: 'decision',
      title: 'Triase Penyakit Jantung Koroner: Kondisi Stabil atau Akut?',
      description: 'Pilih apakah pasien mengalami Sindrom Koroner Akut (Kedaruratan) atau Angina Pektoris Stabil (Kronik). Pemilihan ini akan menentukan jalur panduan yang digunakan.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'branch-ska',
          title: 'Sindrom Koroner Akut (UAP / NSTEMI / STEMI)',
          description: 'Nyeri dada akut >20 menit saat istirahat, nyeri dada baru yang berat, atau perburukan progresif. Merujuk pada Pedoman PERKI 2024.',
          color: 'red',
          nextNodeId: 'ska-initial-assessment',
          riskLevel: 'high'
        },
        {
          id: 'branch-aps',
          title: 'Angina Pektoris Stabil (APS)',
          description: 'Nyeri dada diprovokasi oleh aktivitas fisik/stres, hilang saat istirahat dalam hitungan menit,<10 menit. Pola sudah stabil. Merujuk pada PNPK Kemenkes 2023.',
          color: 'blue',
          nextNodeId: 'aps-anamnesis',
          riskLevel: 'medium'
        }
      ]
    },

    // NODE 1: INITIAL ASSESSMENT SKA
    'ska-initial-assessment': {
      id: 'ska-initial-assessment',
      type: 'checklist',
      title: 'Triase dan Diagnosis Awal SKA (Dalam 10 Menit)',
      description: 'PERKI 2024 BAB 1: Diagnosis kerja SKA ditegakkan berdasarkan keluhan angina tipikal (berat/tertekan di dada >20 menit) dan pemeriksaan EKG 12 sadapan yang direkam dalam 10 menit pertama sejak Kontak Medis Pertama (KMP).',
      items: [
        {
          id: 'ska-ecg-10min',
          title: 'EKG 12-Sadapan < 10 Menit (Wajib)',
          description: 'Lakukan EKG 12 sadapan dalam 10 menit. Jika mencurigakan iskemia inferior/posterior, rekam juga V3R-V4R dan V7-V9. Evaluasi elevasi segmen ST, depresi segmen ST, atau inversi gelombang T.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-aspirin-loading',
          title: 'Aspirin Loading Dose (160-320 mg)',
          description: 'Berikan Aspirin 160-320 mg (sebaiknya dikunyah) SEGERA setelah diagnosis kerja SKA ditegakkan, diikuti dosis rumatan 80-100 mg 1x/hari.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-oxygen',
          title: 'Oksigen (Hanya Jika SpO2 <90%)',
          description: 'Suplementasi oksigen DIREKOMENDASIKAN HANYA JIKA pasien hipoksemia (Saturasi O2 < 90%). Oksigen rutin pada SpO2 normal TIDAK disarankan.',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-nitrate',
          title: 'Nitrat Sublingual (Untuk Gejala)',
          description: 'Nitrogliserin sublingual untuk meredakan nyeri iskemik. KONTRAINDIKASI: Hipotensi, bradikardia/takikardia ekstrim, curiga infark ventrikel kanan (RV infarct), pemakaian PDE-5 inhibitor (sildenafil 24j/tadalafil 48j).',
          required: false,
          category: 'medication'
        },
        {
          id: 'ska-morphine',
          title: 'Morfin IV (Untuk Nyeri Berat)',
          description: 'Morfin 5-10 mg intravena jika nyeri tidak teratasi. Hati-hati: Morfin dapat menunda absorpsi antiplatelet oral dan menyebabkan mual muntah.',
          required: false,
          category: 'medication'
        },
        {
          id: 'ska-cardiac-biomarkers',
          title: 'Ambil Sampel hs-cTn (High-Sensitivity Troponin)',
          description: 'Pengukuran biomarka jantung (hs-cTn) direkomendasikan pada semua pasien dugaan SKA. Gunakan algoritma 0h/1h atau 0h/2h untuk triase cepat (Rule-in / Rule-out). JANGAN tunda terapi reperfusi (jika STEMI) demi menunggu hasil troponin.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ska-ecg-decision'
    },

    // NODE 2: ECG DECISION
    'ska-ecg-decision': {
      id: 'ska-ecg-decision',
      type: 'decision',
      title: 'Interpretasi EKG & Pembagian Algoritma',
      description: 'PERKI 2024: Tentukan klasifikasi awal SKA berdasarkan EKG. Apakah ada Elevasi Segmen ST persisten atau Ekuivalen?',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ska-stemi-branch',
          title: 'STEMI (ST-Elevation MI)',
          description: 'Elevasi segmen ST persisten di >=2 sadapan bersebelahan, atau LBBB baru, atau EKG ekuivalen (contoh: posterior MI di V7-V9). Membutuhkan REPERFUSI CITO!',
          color: 'red',
          nextNodeId: 'ska-stemi-reperfusion-decision',
          riskLevel: 'high'
        },
        {
          id: 'ska-nstemi-uap-branch',
          title: 'SKA-NEST (NSTEMI / APTS / UAP)',
          description: 'ST Depresi, gelombang T inversi persisten, atau EKG normal. Gejala angina progresif/istirahat. Diperlukan stratifikasi risiko untuk waktu angiografi.',
          color: 'orange',
          nextNodeId: 'ska-nest-risk-stratification',
          riskLevel: 'medium'
        }
      ]
    },

    // ==========================================
    // STEMI PATHWAY BRANCH (PERKI 2024 - Bab 3)
    // ==========================================
    'ska-stemi-reperfusion-decision': {
      id: 'ska-stemi-reperfusion-decision',
      type: 'decision',
      title: 'STEMI: Keputusan Strategi Reperfusi (Time is Muscle)',
      description: 'Tentukan kemampuan fasilitas dan waktu yang dibutuhkan untuk mencapai wire-crossing IKP Primer (Fasilitas PCI).',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ska-primary-pci',
          title: 'IKP Primer (PCI < 120 Menit)',
          description: 'Target waktu diagnosis hingga IKP (wire-crossing) < 120 menit (ideal <90 menit jika datang langsung ke RS PCI). Reperfusi Tipe Utama.',
          color: 'blue',
          nextNodeId: 'ska-stemi-pci',
          riskLevel: 'low'
        },
        {
          id: 'ska-fibrinolysis',
          title: 'Fibrinolitik Terlebih Dahulu (PCI > 120 Menit)',
          description: 'Waktu transfer/tunggu IKP diprediksi > 120 menit. Berikan fibrinolitik dalam 30 menit (Door-to-needle < 30 menit) kecuali ada kontraindikasi.',
          color: 'orange',
          nextNodeId: 'ska-stemi-fibrinolysis',
          riskLevel: 'medium'
        }
      ]
    },

    'ska-stemi-pci': {
      id: 'ska-stemi-pci',
      type: 'checklist',
      title: 'Tatalaksana STEMI - IKP Primer (PCI)',
      description: 'Tatalaksana medikamentosa peri-prosedural untuk pasien yang akan menjalani IKP Primer (PERKI 2024 BAB 3.2.1.1).',
      items: [
        {
          id: 'ska-stemi-pci-dapt',
          title: 'P2Y12 Inhibitor Loading Dose',
          description: 'Ticagrelor (Loading 180mg, rumatan 90mg 2x1) ATAU Prasugrel (Loading 60mg, rumatan 10mg 1x1). Clopidogrel 600mg dipertimbangkan JIKA Tic/Pras tidak tersedia/kontraindikasi.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-stemi-pci-anticoag',
          title: 'Antikoagulan IV Intra-prosedural',
          description: 'UFH (bolus 70-100 U/kg) ATAU Enoxaparin (0.5 mg/kg IV bolus). Fondaparinux TIDAK DISARANKAN untuk IKP Primer rutin.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-stemi-pci-radial',
          title: 'Akses Radial Direkomendasikan',
          description: 'Akses arteri radialis direkomendasikan dibanding femoralis untuk menurunkan risiko perdarahan.',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-stemi-pci-des',
          title: 'Penggunaan Stent DES',
          description: 'Penggunaan DES (Drug-Eluting Stent) generasi terbaru direkomendasikan lebih utama dibanding BMS.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ska-long-term-management'
    },

    'ska-stemi-fibrinolysis': {
      id: 'ska-stemi-fibrinolysis',
      type: 'checklist',
      title: 'Tatalaksana STEMI - Fibrinolisis',
      description: 'Pemberian obat fibrinolitik jika IKP Primer akan tertunda > 120 menit. (PERKI 2024 BAB 3.2.2).',
      items: [
        {
          id: 'ska-lytic-contraindications',
          title: 'Cek Kontraindikasi Absolut Fibrinolisis',
          description: 'Eksklusi: Stroke hemoragik kapanpun, Stroke iskemik dalam 3 bulan, tumor SSP, malformasi AV, curiga diseksi aorta, perdarahan aktif (kecuali mens).',
          required: true,
          category: 'safety'
        },
        {
          id: 'ska-lytic-agent',
          title: 'Pemberian Fibrinolitik (Target < 30 Menit)',
          description: 'Obat spesifik fibrin (Tenekteplase/Alteplase) lebih disarankan dari Streptokinase. Streptokinase 1.5 Juta U IV selama 30-60 menit.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-lytic-clopidogrel',
          title: 'P2Y12: Clopidogrel (Bukan Ticagrelor/Prasugrel)',
          description: 'Untuk pasien STEMI yang mendapat Terapi Fibrinolisis, Clopidogrel diberikan (Loading 300 mg jika usia <75 thn, 75 mg jika >75 thn). Ticagrelor/Prasugrel belum cukup bukti aman untuk fibrinolisis akut.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-lytic-anticoag',
          title: 'Antikoagulan Penyerta (Hingga Revaskularisasi / 8 Hari)',
          description: 'Enoxaparin (bolus 30 mg IV, dilanjut dosis SC) lebih dipilih dibandingkan UFH, ATAU Fondaparinux. Diberikan hingga revaskularisasi tercapai atau s.d masa perawatan. Dosis disesuaikan usia.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-lytic-evaluation',
          title: 'Evaluasi Keberhasilan (60-90 Menit)',
          description: 'Fibrinolisis BERHASIL: Resolusi segmen ST >=50% & gejala membaik. GAGAL: ST menetap / gejala nyeri dada rekuren -> Indikasi RESCUE PCI.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-lytic-pharmaco-invasive',
          title: 'Lanjutkan Strategi Farmako-invasif',
          description: 'Segera transfer ke center IKP setelah fibrinolisis, rencanakan rutin angiografi dini dalam waktu 2-24 jam walau respon fibrinolitik sukses.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ska-long-term-management'
    },


    // ==========================================
    // SKA-NEST PATHWAY BRANCH (APTS/NSTEMI - PERKI 2024 Bab 2)
    // ==========================================
    'ska-nest-risk-stratification': {
      id: 'ska-nest-risk-stratification',
      type: 'decision',
      title: 'Stratifikasi Risiko SKA-NEST (NSTEMI / APTS)',
      description: 'Gunakan GRACE Risk Score, kriteria klinis (hemodinamik), dan risiko perdarahan ARC-HBR untuk menentukan waktu IKP (Strategi Invasif).',
      warningLevel: 'warning',
      branches: [
        {
          id: 'ska-nest-very-high-risk',
          title: 'Risiko Sangat Tinggi (Invasif Segera < 2 Jam)',
          description: 'Kriteria: Syok kardiogenik, nyeri dada refrakter/berulang berat, gagal jantung akut akibat SKA, VT/VF, komplikasi mekanik, atau depresi ST >1mm di 6+ lead + elevasi ST di aVR/V1.',
          color: 'red',
          nextNodeId: 'ska-nest-invasive-immediate',
          riskLevel: 'high'
        },
        {
          id: 'ska-nest-high-risk',
          title: 'Risiko Tinggi (Invasif Dini < 24 Jam)',
          description: 'Kriteria: Terbukti ada NSTEMI (hs-cTn positif rise & fall), GRACE score > 140, ada perubahan dinamis segmen ST.',
          color: 'orange',
          nextNodeId: 'ska-nest-invasive-early',
          riskLevel: 'high'
        },
        {
          id: 'ska-nest-low-risk',
          title: 'Risiko Rendah / Tidak Tinggi (Invasif Selektif)',
          description: 'Tidak memenuhi kriteria sangat tinggi/tinggi. Angina Pektoris Tidak Stabil (APTS) probabilitas rendah, troponin negatif. Lakukan Invasif Selektif apabila tes iskemis mencurigakan atau rawat jalan konservatif.',
          color: 'blue',
          nextNodeId: 'ska-nest-invasive-selective',
          riskLevel: 'medium'
        }
      ]
    },

    'ska-nest-invasive-immediate': {
      id: 'ska-nest-invasive-immediate',
      type: 'checklist',
      title: 'Tata Laksana SKA-NEST Ekstrem (Invasif Segera < 2 Jam)',
      description: 'Risiko Sangat Tinggi. Siapkan Cath Lab darurat selayaknya STEMI.',
      items: [
        {
          id: 'ska-nest-imm-antiplatelet',
          title: 'P2Y12 + Aspirin',
          description: 'Diberikan Aspirin (160-320mg). Dosis loading P2Y12 (Prasugrel/Ticagrelor) diberikan. Catatan: Pada SKA-NEST rutinitas pre-treatment dengan P2Y12 SEBELUM angiografi sering tak dianjurkan, NAMUN jika prosedur <2 jam bisa menyesuaikan operasional dokter intervensi.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-nest-imm-anticoag',
          title: 'Pemberian Antikoagulan UFH',
          description: 'UFH (Heparin) diutamakan untuk persiapan IKP cito. Hindari fondaparinux jika akan PCI segera karena risiko kateter trombosis (butuh bolus UFH tambahan).',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-nest-imm-cath',
          title: 'Aktivasi Tim Kateterisasi (Target <2 Jam)',
          description: 'Segera pindahkan ke ruang kateterisasi (Invasif Segera). Akses radial disarankan.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ska-long-term-management'
    },

    'ska-nest-invasive-early': {
      id: 'ska-nest-invasive-early',
      type: 'checklist',
      title: 'Tata Laksana SKA-NEST - Invasif Dini (< 24 Jam)',
      description: 'Risiko Tinggi (hs-cTn positif, GRACE >140, EKG depresi ST).',
      items: [
        {
          id: 'ska-nest-early-dapt-timing',
          title: 'P2Y12: Jangan Pre-treatment Rutin',
          description: 'PERKI 2024: Loading P2Y12 (Prasugrel 60mg / Ticagrelor 180mg) DIANJURKAN DILAKUKAN SAAT IKP (setelah angiografi diketahui), TIDAK sebagai terapi rutin sebelum angiografi (Pre-treatment) bila pasien dijadwalkan Invasif Dini <24 jam.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-nest-early-anticoag',
          title: 'Pemberian Antikoagulan (Fondaparinux / Enox / UFH)',
          description: 'Fondaparinux (2.5 mg SC) lebih direkomendasikan jika intervensi ditunda, NAMUN harus tambah UFH bolus penuh saat meja PCI. Alternatif: Enoxaparin / UFH untuk bridging sebelum angiografi.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-nest-early-cath',
          title: 'Jadwalkan Angiografi Koroner dalam 24 Jam',
          description: 'Transfer ke ruang rawat intensif (ICCU) dan jadwalkan ke Cath Lab.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ska-long-term-management'
    },

    'ska-nest-invasive-selective': {
      id: 'ska-nest-invasive-selective',
      type: 'checklist',
      title: 'Tata Laksana APTS / NSTEMI Risiko Rendah (Invasif Selektif)',
      description: 'Angina pektoris tidak stabil (APTS) kemungkinan rendah / observasi. Tata laksana non-invasif.',
      items: [
        {
          id: 'ska-nest-sel-observation',
          title: 'Penggunaan Algoritma 0h/1h atau 0h/2h hs-cTn',
          description: 'Tentukan jalur Rule-Out atau Observasi menggunakan parameter troponin. Observasi perubahan di jam 1/jam 2/jam 3.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-nest-sel-pretreatment',
          title: 'Pre-treatment P2Y12 (Bila Terapi Konservatif)',
          description: 'Pemberian Clopidogrel / Ticagrelor / Prasugrel dapat diperimbangkan jika dikelola secara konservatif penuh ATAU bila risiko perdarahan rendah.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-nest-sel-testing',
          title: 'Pemeriksaan Stress Test atau MSCT',
          description: 'Bila iskemia tidak terbukti dan pasien bebas nyeri, jadwalkan uji latih (exercise test), Ecocardiography Stres, atau CCTA secara elektif.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ska-long-term-management'
    },


    // ==========================================
    // LONG TERM MANAGEMENT (PERKI 2024 Bab 6)
    // ==========================================
    'ska-long-term-management': {
      id: 'ska-long-term-management',
      type: 'checklist',
      title: 'Manajemen Jangka Panjang Pasca-Koroner',
      description: 'PERKI 2024: Terapi medis pasca evakuasi iskemik untuk menurunkan kejadian kardiovaskular.',
      items: [
        {
          id: 'ska-dapt-12months',
          title: 'DAPT (Dual Antiplatelet Therapy) 12 Bulan',
          description: 'Aspirin (80-100 mg/hari) SEUMUR HIDUP. Ditambah P2Y12 inhibitor (Ticagrelor 90mg 2x1 / Prasugrel 10mg 1x1 / Clopidogrel 75mg 1x1) selama 12 BULAN standar, kecuali risiko perdarahan tinggi (> 1 kriteria mayor ARC-HBR).',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-af-oac',
          title: 'Jika Pasien Memiliki Indikasi OAC (Misal FA)',
          description: 'Kurangi durasi TAT (Triple Therapy: NOAC + DAPT) menjadi sependek mungkin (1 minggu). Lanjutkan DAT (NOAC + Clopidogrel) selama 6-12 bulan, disusul NOAC tunggal.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-lipid-target',
          title: 'Kontrol Lipid Agresif (Statin + Ezetimibe)',
          description: 'Gunakan Statin Intensitas Tinggi. Target LDL-C < 55 mg/dL AND reduksi >= 50% dari baseline. Jika target tak capai dalam 4-6 minggu, tambah Ezetimibe.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-beta-blocker-ace',
          title: 'Penyekat Beta & ACE-i',
          description: 'Beta-blocker dilanjutkan rutin bila ada tanda disfungsi ventrikel (EF <40%). ACE Inhibitor rutin untuk EF <40%, DM, hipertensi, CKD.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-post-rehab-lifestyle',
          title: 'Rehabilitasi Kardiovaskular & Modifikasi Hidup',
          description: 'Berhenti merokok MUTLAK. Program rehabilitasi jantung komprehensif, olahraga aktivitas ringan-sedang (>150 jam/minggu), pengaturan berat badan (IMT normal).',
          required: true,
          category: 'action'
        }
      ]
    }
  }
};
