import { DynamicPathway } from '../dynamicPathways';

export const acuteKidneyInjuryPathway: DynamicPathway = {
  diseaseId: 'acute-kidney-injury',
  diseaseName: 'Gangguan Ginjal Akut (GGA)',
  startNodeId: 'gga-initial-assessment',
  nodes: {
    'gga-initial-assessment': {
      id: 'gga-initial-assessment',
      type: 'checklist',
      title: 'Fase 1: Evaluasi Awal & Penegakan Diagnosis (KDIGO)',
      description: 'Lakukan evaluasi awal berdasarkan kriteria definisi dan identifikasi etiologi GGA sesegera mungkin dalam 48 jam.',
      items: [
        {
          id: 'gga-anamnesis-urine',
          title: 'Anamnesis & Penilaian Produksi Urin (Kriteria Utama Tanpa Alat)',
          description: 'Langkah pertama memastikan kecurigaan GGA. Kriteria klinis GGA dapat ditegakkan HANYA dengan melihat produksi urin bila Urine Output <0,5 ml/kgBB/jam selama >6 jam. Pasang kateter urin bila perlu untuk pengukuran akurat.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-diag-lab',
          title: 'Pemeriksaan Laboratorium (Serum Kreatinin)',
          description: 'Diagnosis pasti membutuhkan cek Peningkatan Cr Serum >0,3 mg/dL. Mengingat alat lab serum kreatinin tidak tersedia, patokan utama adalah produksi urin. Bila klinis memburuk tanpa alat lab, SEGERA RUJUK ke fasilitas sekunder.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-ttv',
          title: 'Pemantauan Tanda-Tanda Vital (Tensi, Termometer, Oxymeter)',
          description: 'Lakukan pemantauan untuk menilai tanda syok pre-renal (hipovolemia) atau infeksi sistemik (sepsis). Jika TD sangat rendah / oksigenasi buruk dan tidak sanggup diatasi, SEGERA RUJUK.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-ekg',
          title: 'Pemeriksaan EKG (Elektrokardiograf)',
          description: 'Langkah krusial berikutnya! Wajib dilakukan segera untuk skrining komplikasi mematikan hiperkalemia (Hadirnya Tall T-Wave / QRS melebar). Jika gambaran EKG mengkhawatirkan atau mesin EKG/listrik mati, SEGERA RUJUK.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'gga-suction',
          title: 'Evaluasi Kesadaran & Persiapan Suction',
          description: 'Cek kesadaran pasien. Jika GGA memicu ensefalopati uremikum (kejang/koma), standby mesin suction untuk antisipasi aspirasi muntah. Jika mesin suction listrik tidak ada, wajib siapkan suction manual / bulb darurat.',
          required: false,
          category: 'safety'
        },
        {
          id: 'gga-nebulizer',
          title: 'Tersedianya Mesin Nebulizer (Jika EKG Curiga Hiperkalemia)',
          description: 'Bila EKG merujuk ke hiperkalemia, siapkan nebulizer sebagai opsi lini kedua pendamping (inhalasi Salbutamol) penggeser Kalium. Jika nebulizer rusak/tak ada, gunakan alternatif lini pertama (Calcium Gluconate & Insulin IV) lantas RUJUK.',
          required: false,
          category: 'medication'
        },
        {
          id: 'gga-etiology-exposure',
          title: 'Identifikasi Etiologi & Stop Paparan Nefrotoksik',
          description: 'Tentukan apakah penyebabnya pre-renal atau post-renal (seperti batu/obstruksi). Singkirkan paparan racun ginjal: hentikan segera penggunaan obat NSAID, ACEI/ARB (saat syok), dan pastikan bebas dari jamu-jamuan toksik.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'gga-age-decision'
    },

    'gga-age-decision': {
      id: 'gga-age-decision',
      type: 'decision',
      title: 'Kategori Usia (Anak vs Dewasa)',
      description: 'Apakah pasien berusia anak-anak (< 18 tahun) atau dewasa?',
      branches: [
        {
          id: 'age-pediatric',
          title: 'Anak / Neonatus',
          description: 'Gunakan kriteria pRIFLE / nRIFLE dan manajemen anak (Panduan 7).',
          color: 'purple',
          nextNodeId: 'gga-pediatric-management'
        },
        {
          id: 'age-adult',
          title: 'Dewasa',
          description: 'Lanjutkan panduan PERNEFRI untuk dewasa / umum.',
          color: 'blue',
          nextNodeId: 'gga-special-cases-decision'
        }
      ]
    },

    'gga-pediatric-management': {
      id: 'gga-pediatric-management',
      type: 'checklist',
      title: 'Tatalaksana GGA Pada Anak (Panduan 7)',
      description: 'Manajemen khusus GGA pada neonatus dan anak-anak berdasarkan kriteria pRIFLE / nRIFLE dan terapi konservatif spesifik.',
      items: [
        {
          id: 'ped-criterion',
          title: 'Diagnosis & Kriteria (pRIFLE / nRIFLE)',
          description: 'Evaluasi berdasarkan klirens kreatinin atau output urin spesifik pedriatik. Klasifikasi menjadi Risk, Injury, Failure, Loss, End-Stage.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ped-conservative',
          title: 'Terapi Konservatif & Resusitasi',
          description: 'Pada keadaan syok/dehidrasi, berikan cairan NaCl 0.9% / Ringer Laktat 10-20 mL/kgBB, awasi ketat jangan sampai asidosis hiperkloremia atau hipervolemia paru.',
          required: true,
          category: 'action'
        },
        {
          id: 'ped-hyperkalemia',
          title: 'Penanganan Medikamentosa Khusus Anak',
          description: 'Apabila ada asidosis ringan tangani penyebabnya. Hiperkalemia refrakter beri asupan proteksi jantung Ca-Gluconate dan shift Kalium ke dalam sel (Insulin-Glukosa).',
          required: true,
          category: 'medication'
        },
        {
          id: 'ped-tpga',
          title: 'Terapi Pengganti Ginjal Akut (TPGA) Anak',
          description: 'Indikasi: asidosis refrakter, fluid overload dengan gagalan organ, ensefalopati uremikum. Dapat dilakukan Dialisis Peritoneal Akut (DPA) karena akses lebih aman, PD, CRRT atau HD.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'gga-nutrition-maintenance'
    },

    'gga-special-cases-decision': {
      id: 'gga-special-cases-decision',
      type: 'decision',
      title: 'Identifikasi Populasi / Keadaan Khusus',
      description: 'Apakah pasien masuk dalam kategori keadaan klinis khusus yang membutuhkan protokol spesifik tambahan?',
      branches: [
        {
          id: 'gga-special-yes',
          title: 'Ya, Keadaan Khusus',
          description: 'Pasien hamil, pasca/pre-operatif, GGA-kontras, atau pemicu kemoterapi',
          color: 'teal',
          nextNodeId: 'gga-special-management'
        },
        {
          id: 'gga-special-no',
          title: 'Tidak, Kasus Umum',
          description: 'Lanjutkan ke klasifikasi stadium untuk populasi umum',
          color: 'slate',
          nextNodeId: 'gga-staging-decision'
        }
      ]
    },

    'gga-special-management': {
      id: 'gga-special-management',
      type: 'checklist',
      title: 'Tatalaksana Kondisi Khusus (Kontras, Perioperatif, Kehamilan, Kemoterapi)',
      description: 'Protokol spesifik untuk menangani dan mencegah GGA pada keadaan tertentu berdasarkan panduan (Bab 4).',
      items: [
        {
          id: 'spec-contrast',
          title: 'Pencegahan GGA akibat Kontras',
          description: 'Gunakan profilaksis Saline 0.9% hidrasi intravena (1-3 ml/kg/jam). Hindari profilaksis IHD/Hemofiltrasi. Gunakan kontras low-osmolar/iso-osmolar dosis terendah.',
          required: false,
          category: 'action'
        },
        {
          id: 'spec-surgery',
          title: 'Manajemen Perioperatif',
          description: 'Pertahankan normovolemia. Target MAP 100-110% dari baseline. Diuretik tidak direkomendasikan untuk GGA perioperatif kecuali fluid overload.',
          required: false,
          category: 'action'
        },
        {
          id: 'spec-pregnancy',
          title: 'GGA pada Kehamilan',
          description: 'Pendekatan multidisipliner Obgyn. Terminasi kehamilan jika indikasi PE Berat/Eklampsi dengan komplikasi organ gagal respon terhadap terapi medis pada janin <34 minggu terindikasi.',
          required: false,
          category: 'safety'
        },
        {
          id: 'spec-chemo',
          title: 'Pencegahan GGA Kemoterapi',
          description: 'Berikan volume hidrasi (NaCl 0.9% 2-4L) sebelum dan sesudah obat. Suplementasi Mg dan pertimbangkan Mannitol (Forced Diuresis) untuk obat high-risk spt cisplatin.',
          required: false,
          category: 'medication'
        }
      ],
      nextNodeId: 'gga-staging-decision'
    },

    'gga-staging-decision': {
      id: 'gga-staging-decision',
      type: 'decision',
      title: 'Klasifikasi Stadium (KDIGO)',
      description: 'Klasifikasikan keparahan GGA pasien untuk menentukan agresivitas monitoring dan indikasi dialisis.',
      branches: [
        {
          id: 'stage-1',
          title: 'Stadium 1',
          description: 'Cr naik 1.5-1.9x nilai dasar ATAU Urine <0.5 mL/kg/jam selama 6-12 jam.',
          color: 'green',
          nextNodeId: 'gga-supportive-care'
        },
        {
          id: 'stage-2',
          title: 'Stadium 2',
          description: 'Cr naik 2.0-2.9x nilai dasar ATAU Urine <0.5 mL/kg/jam selama >12 jam.',
          color: 'orange',
          nextNodeId: 'gga-supportive-care'
        },
        {
          id: 'stage-3',
          title: 'Stadium 3',
          description: 'Cr naik >3.0x ATAU Cr >4.0 mg/dL ATAU Anuria >12 jam / Oliguria >24 jam.',
          color: 'red',
          nextNodeId: 'gga-complication-decision'
        }
      ]
    },

    'gga-supportive-care': {
      id: 'gga-supportive-care',
      type: 'checklist',
      title: 'Perawatan Suportif & Optimalisasi Hemodinamik (Umum)',
      description: 'Pertahankan fungsi ginjal dan cegah progresivitas GGA sesuai Bundle Perawatan GGA.',
      items: [
        {
          id: 'sup-fluid',
          title: 'Resusitasi Cairan Sensitif',
          description: 'Gunakan cairan kristaloid isotonik (Normal Saline 0.9%). JANGAN gunakan Starch (Koloid) karena terbukti meningkatan GGA! Pantau risiko hiperkloremia jika butuh NS volume besar.',
          required: true,
          category: 'medication'
        },
        {
          id: 'sup-map',
          title: 'Target Perfusi (MAP & Vasopresor)',
          description: 'Pastikan MAP >65-70 mmHg (atau 80-85 mmHg jika ada HT Kronik). Syok? Gunakan Noradrenalin sebagai vasopresor lini pertama. (Dopamin DILARANG u/ proteksi ginjal).',
          required: true,
          category: 'action'
        },
        {
          id: 'sup-sugar',
          title: 'Kontrol Glikemik Ketat',
          description: 'Pada keadaan pasien kritis dengan GGA, pertahankan Gula Darah pada batas target 110-149 mg/dL menggunakan insulin reguler intravena.',
          required: true,
          category: 'medication'
        },
        {
          id: 'sup-diuretics',
          title: 'Stop Diuretik Rutin (Kecuali Overload)',
          description: 'Diuretik (e.g. Furosemide) TIDAK BOLEH digunakan untuk terapi atau prevensi GGA. Hanya berikan dalam kasus overhidrasi / edema paru refrakter (Furosemide Stress Test boleh untuk prediksi).',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'gga-complication-decision'
    },

    'gga-complication-decision': {
      id: 'gga-complication-decision',
      type: 'decision',
      title: 'Tanda Bahaya dan Indikasi TPdG / Cuci Darah',
      description: 'Apakah didapatkan komplikasi metabolik berat atau tanda-tanda ancaman nyawa akibat kegagalan fungsi renal?',
      branches: [
        {
          id: 'comp-emergency',
          title: 'Hadir Komplikasi Mengancam Nyawa',
          description: 'Asidosis Refrakter, Hiperkalemia >6.5, Edema Paru Absolut, atau Anuria (Stadium 3).',
          color: 'red',
          nextNodeId: 'gga-complication-management'
        },
        {
          id: 'comp-stable',
          title: 'Tanpa Indikasi CITO (Stabil)',
          description: 'Status asam-basa, kalium, dan cairan pasien terkendali minimal.',
          color: 'emerald',
          nextNodeId: 'gga-nutrition-maintenance'
        }
      ]
    },

    'gga-complication-management': {
      id: 'gga-complication-management',
      type: 'checklist',
      title: 'Tatalaksana Komplikasi Bedah Medis Akut (Jembatan Menuju Ekstrakorporeal)',
      description: 'Protokol temporer stabilisasi kondisi vital sebelum dimulainya Terapi Pendukung Ginjal (TPdG/Dialisis).',
      items: [
        {
          id: 'comp-kali',
          title: 'Stabilisasi Hiperkalemia Berat (K > 6.5)',
          description: 'Eksitasi jantung dihalangi dengan Calcium Gluconas IV. Masukkan K ke sel dengan Insulin (10 unit) + Glukosa D40%. Pasang bed-monitor EKG.',
          required: true,
          category: 'action'
        },
        {
          id: 'comp-acid',
          title: 'Koreksi Asidosis Bikarbonat',
          description: 'Bila pH < 7.1-7.2 dan HCO3 < 15 mEq/L, berikan terapi Sodium Bikarbonat secara titrasi. Pantau status Na (waspada hipernatremia) dan ventilator (pCO2).',
          required: true,
          category: 'medication'
        },
        {
          id: 'comp-overload',
          title: 'Penanganan Overload Cairan Refrakter',
          description: 'Berikan terapi intermiten / IV pump Diuretik Loop (Furosemide dosis tinggi). Jika O2 saturasi terus memburuk dan output urin nihil, persiapkan CVC Dialisis segera.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'gga-tpdg-management'
    },

    'gga-tpdg-management': {
      id: 'gga-tpdg-management',
      type: 'checklist',
      title: 'Pelaksanaan Terapi Pendukung Ginjal (TPdG/CRRT/IHD/DP)',
      description: 'Inisiasi intervensi organ artifisial (Dialisis/TPG) sesuai pedoman PERNEFRI Bab 3.',
      items: [
        {
          id: 'tpdg-modality',
          title: 'Pemilihan Modalitas Sesuai Syok',
          description: 'Hemodinamik tak stabil / edema otak / syok = Wajib CKD-CRRT, PIRRT atau DP Akut. Jika hemodinamik stabil & kalium sangat tinggi = IHD (Intermittent Hemodialisis) pilihan utama.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'tpdg-access',
          title: 'Pemasangan Akses Vaskuler dengan USG',
          description: 'Kateter Non-Tunnel. Urutan insersi: 1) Vena Jugularis Kanan, 2) Vena Femoral, 3) Vena Jugularis Kiri. (Hindari subclavia). CVC hanya digunakan untuk prosedur ekstra korporeal.',
          required: true,
          category: 'safety'
        },
        {
          id: 'tpdg-dose',
          title: 'Target Peresepan Dosis & Dialisat',
          description: 'Target Kt/V = 3.9/minggu untuk IHD. Efluen = 20-25 ml/kg/jam untuk CRRT. Gunakan membran filter biokompatibel dengan Buffer ekstrakorporeal Bikarbonat (jangan laktat bila liver dysfunction).',
          required: true,
          category: 'action'
        },
        {
          id: 'tpdg-anticoag',
          title: 'Pemberian Antikoagulan Sirkuit',
          description: 'TANPA perdarahan: CRRT gunakan Sitrat Regional (utama) atau LMWH. IHD gunakan UFH/LMWH. DENGAN perdarahan/HIT: Gunakan Sitrat Regional, hidari heparin murni. (Bisa gunakan Argatroban jika HIT).',
          required: true,
          category: 'medication'
        }
      ],
      nextNodeId: 'gga-nutrition-maintenance'
    },

    'gga-nutrition-maintenance': {
      id: 'gga-nutrition-maintenance',
      type: 'checklist',
      title: 'Dosis Obat, Nutrisi & Pemeliharaan Fase Pemulihan',
      description: 'Tatalaksana suportif pasca stabilisasi akut dan pemeliharaan transisi ke Poli Rawat Jalan (Bab 5 & 6).',
      items: [
        {
          id: 'maint-dose',
          title: 'Rekalibrasi Dosis Farmakokinetik',
          description: 'Sesuaikan dosis antibiotik hidrofilik (Beta laktam, Aminoglikosida) sesuai klirens/eGFR/durasi CRRT. Peningkatan kompartemen cairan/sepsis= dosis loading wajib agresif.',
          required: true,
          category: 'medication'
        },
        {
          id: 'maint-nutri',
          title: 'Manutrisi & Skrining Nutrisi (Renal iNUT)',
          description: 'Lakukan skoring dengan ESPEN GLIM atau Renal iNUT. Prioritaskan jalur Enteral. Pertimbangkan pengembalian Kalori yang memadai pada hiperkatabolisme akibat CRRT.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'maint-monitoring',
          title: 'Evaluasi Fase AKD (Acute Kidney Disease) ke CKD',
          description: 'Pemantauan secara berkala setelah discharge dalam waktu <3 bulan (Periode Penyakit Ginjal Akut) utk mencegah progresi ke End-Stage CKD.',
          required: true,
          category: 'documentation'
        }
      ]
    }
  }
};
