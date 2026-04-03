// ============================================================
// UMBRELLA SINDROM KORONER AKUT & ANGINA PEKTORIS STABIL (SETTING FKTP/KLINIK)
// ============================================================
// Fasilitas Tersedia: TTV (Tensi, Termometer, Oxymeter), EKG, Suction, Nebulizer
// Keterbatasan: TIDAK ADA Lab Darah (Troponin, dll), TIDAK ADA fasilitas Cath Lab (PCI), TIDAK ADA Echo
// ============================================================

import { DynamicPathway } from '../dynamicPathways';
import { apsPathway } from './aps'; // Import APS pathway untuk di-merge

export const skaPathway: DynamicPathway = {
  diseaseId: 'sindrom-koroner-akut',
  diseaseName: 'Sindrom Koroner Akut (Klinik Dasar / Terbatas Alat)',
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
          description: 'Nyeri dada akut >20 menit saat istirahat, nyeri dada baru yang berat, pucat/keringat dingin. (Emergency)',
          color: 'red',
          nextNodeId: 'ska-initial-assessment',
          riskLevel: 'high'
        },
        {
          id: 'branch-aps',
          title: 'Angina Pektoris Stabil (APS)',
          description: 'Nyeri dada diprovokasi oleh aktivitas fisik/stres, hilang saat istirahat <10 menit. Pola sudah stabil.',
          color: 'blue',
          nextNodeId: 'aps-anamnesis',
          riskLevel: 'medium'
        }
      ]
    },

    // NODE 1: INITIAL ASSESSMENT SKA (ADJUSTED FOR CLINIC)
    'ska-initial-assessment': {
      id: 'ska-initial-assessment',
      type: 'checklist',
      title: 'Triase dan Diagnosis Awal SKA (Dalam 10 Menit di Klinik)',
      description: 'PERKI 2024: Diagnosis SKA. Lakukan penanganan dengan alat yang tersedia (TTV, Oxymeter, EKG, Suction).',
      items: [
        {
          id: 'ska-ttv-check',
          title: 'Cek TTV (Tensi, Suhu, Oxymeter)',
          description: 'Segera ukur tekanan darah (antisipasi syok / hipertensi darurat), pantau oksigenasi melalui Oxymeter, dan cek suhu dengan Termometer.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-ecg-10min',
          title: 'EKG 12-Sadapan < 10 Menit (SANGAT KRUSIAL)',
          description: 'EKG adalah satu-satunya alat penentu STEMI di fasilitas Anda. Evaluasi segmen ST segera dalam 10 menit.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-airway-clearance',
          title: 'Manajemen Jalan Napas (Jika Diperlukan)',
          description: 'Jika ada tanda distres napas berat dengan sekret/muntahan, gunakan SUCTION. Nebulizer DITUNDA dan TIDAK RUTIN untuk SKA, kecuali ada koinfeksi eksaserbasi asma/PPOK (hati-hati karena agonis beta meningkatkan denyut jantung).',
          required: false,
          category: 'action'
        },
        {
          id: 'ska-aspirin-loading',
          title: 'Aspirin Loading Dose (160-320 mg)',
          description: 'JIKA TERSEDIA: Berikan Aspirin (sebaiknya dikunyah) segera setelah curiga gejala klinis SKA.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-oxygen',
          title: 'Oksigen Suplemental (Panduan Oxymeter)',
          description: 'Hanya berikan O2 tabung JIKA angka pada Oxymeter <90% atau pasien tampak sangat sesak (hipoksemia).',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-lab-rujuk',
          title: 'Pemeriksaan Biomarka Lab (hs-cTn) -> WAJIB RUJUK',
          description: 'Keterbatasan Alat: Klinik tidak memiliki troponin. KARENA ITU, tidak dapat menyingkirkan NSTEMI secara tuntas di sini. Persiapkan rujukan sambil observasi EKG.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'ska-ecg-decision'
    },

    // NODE 2: ECG DECISION
    'ska-ecg-decision': {
      id: 'ska-ecg-decision',
      type: 'decision',
      title: 'Interpretasi Hasil EKG Klinik',
      description: 'Menentukan jalur rujukan. (Fasilitas tidak memadai untuk penanganan definitif).',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ska-stemi-branch',
          title: 'Hasil EKG: STEMI (Ada ST Elevasi)',
          description: 'Elevasi segmen ST persisten atau LBBB baru terdeteksi di EKG. Ini adalah darurat bedah IKP / Reperfusi.',
          color: 'red',
          nextNodeId: 'ska-stemi-rujukan-decision',
          riskLevel: 'high'
        },
        {
          id: 'ska-nstemi-uap-branch',
          title: 'Hasil EKG: NSTEMI / UAP (Depresi ST / T Inversi / Normal)',
          description: 'EKG tidak menunjukkan ST elevasi, namun karena fasilitas terbatas (tanpa Lab hs-cTn), tetap harus dirujuk ke IGD.',
          color: 'orange',
          nextNodeId: 'ska-nest-rujukan',
          riskLevel: 'high'
        }
      ]
    },

    // ==========================================
    // STEMI PATHWAY BRANCH
    // ==========================================
    'ska-stemi-rujukan-decision': {
      id: 'ska-stemi-rujukan-decision',
      type: 'decision',
      title: 'STEMI: Keputusan Destinasi Rujukan (Time is Muscle)',
      description: 'Fokus klinik Anda adalah MENSTABILKAN dan MENENTUKAN RUMAH SAKIT TUJUAN RUJUKAN tertepat dengan waktu tempuh transportasi.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ska-rujuk-pci',
          title: 'RUJUKAN CITO: RS dengan Fasilitas Cath Lab (Waktu <120 Menit)',
          description: 'Ambulans + perjalanan diperkirakan sampai ke pusat bedah IKP Primer dalam waktu kurang dari 120 menit.',
          color: 'blue',
          nextNodeId: 'ska-persiapan-rujukan-stemi',
          riskLevel: 'high'
        },
        {
          id: 'ska-rujuk-fibrinolitik',
          title: 'RUJUKAN CITO: RS Terdekat (Untuk Fibrinolitik)',
          description: 'Perjalanan ke RS khusus Cath Lab akan memakan waktu LAMA (>120 menit). Rujuk ke RSUD Terdekat agar pasien dapat menerima obat Fibrinolitik secepatnya (Target <30 mnt).',
          color: 'orange',
          nextNodeId: 'ska-persiapan-rujukan-stemi',
          riskLevel: 'high'
        }
      ]
    },

    'ska-persiapan-rujukan-stemi': {
      id: 'ska-persiapan-rujukan-stemi',
      type: 'checklist',
      title: 'Persiapan Transportasi & Rujukan STEMI',
      description: 'Tindakan yang harus diselesaikan PADA SAAT/SEBELUM ambulans datang ke fasilitas klinik Anda.',
      items: [
        {
          id: 'ska-hubungi-igd',
          title: 'Hubungi IGD Rumah Sakit Tujuan Terlebih Dahulu',
          description: 'Laporkan "Ada pasien kemungkinan STEMI di klinik kami sedang dirujuk." Jika memungkinkan pasang IV line dari klinik (sebelum naik ambulans).',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-transport-monitor',
          title: 'Pantau Vitals Selama Transfer',
          description: 'Bawa serta Tensimeter dan Oxymeter ke dalam ambulans pengangkut (jika mendampingi pasien). Siapkan Suction portable jika pasien terlihat tersedak muntahan/sekret dalam perjalanan.',
          required: true,
          category: 'safety'
        },
        {
          id: 'ska-bawa-ekg',
          title: 'BAWA HASIL CETAKAN EKG',
          description: 'Sangat krusial. Cetakan kertas EKG asli atau foto digital yang jelas HASIL DARI KLINIK HARUS disertakan kepada dokter IGD penerima.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'ska-loading-p2y12',
          title: 'Pemberian P2Y12 Inhibitor (Opsional, Bila Dokter Meresepkan & Tersedia)',
          description: 'Clopidogrel (300mg/600mg) ATAU Ticagrelor (180mg). Jika stok APOTEK KLINIK terbatas/tidak ada, tinggalkan untuk RS.',
          required: false,
          category: 'medication'
        }
      ],
      nextNodeId: 'ska-long-term-management'
    },

    // ==========================================
    // SKA-NEST PATHWAY BRANCH (APTS/NSTEMI)
    // ==========================================
    'ska-nest-rujukan': {
      id: 'ska-nest-rujukan',
      type: 'checklist',
      title: 'Tata Laksana & Stabilisasi SKA-NEST (NSTEMI / UAP)',
      description: 'Tidak ada STEMI di EKG. NAMUN risiko infark miokard tak ber-elevasi ST dapat sangat tinggi. Tanpa pemeriksaan hs-cTn dari Lab, KLINIK TIDAK BOLEH memulangkan pasien.',
      items: [
        {
          id: 'ska-nest-rujuk-segera',
          title: 'Persiapkan Rujukan Tanpa Menunggu Konfirmasi GRACE Score',
          description: 'Risiko pasti (High/Very High Risk) membutuhkan Troponin dan kreatinin, yang tidak ada. Asumsikan pasien dalam risiko tinggi.',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-nest-serial-ekg',
          title: 'Lakukan EKG Serial Sambil Menunggu Ambulans',
          description: 'Jika ambulans terlambat, ulangi rekam EKG setiap 15-30 menit ATAU bila keluhan nyeri dada pasien bertambah berat. Pastikan depresi ST tidak berubah menjadi Elevasi ST.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-nest-meds',
          title: 'Siapkan Obat Dasar (Jika Ada)',
          description: 'Lanjutkan Aspirin loading, pantau dengan Oxymeter, pastikan kenyamanan (Tirah Baring 100%).',
          required: true,
          category: 'medication'
        }
      ],
      nextNodeId: 'ska-persiapan-rujukan-stemi' // Routing ke instruksi ambulans yang sama
    },

    // ==========================================
    // LONG TERM MANAGEMENT
    // ==========================================
    'ska-long-term-management': {
      id: 'ska-long-term-management',
      type: 'checklist',
      title: 'Pemantauan Rawat Jalan Paska Kepulangan dari RS Lanjutan',
      description: 'Fasilitas klinik / FKTP berperan sangat besar paska operasi/rujukan RS (secondary prevention).',
      items: [
        {
          id: 'ska-fktp-dapt',
          title: 'Kontrol Kepatuhan Minum Obat DAPT & Statin',
          description: 'Cek tensimeter rutin. Ingatkan pasien: Aspirin + P2Y12 (12 Bulan), dan statin agar diminum secara disiplin.',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-fktp-ekg-kontrol',
          title: 'EKG Kontrol Rutin di Klinik',
          description: 'Gunakan fasilitas EKG Anda saat pasien kontrol untuk pengecekan perubahan dasar irama jika ada komplain palpitasi atau nyeri tersisa.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-post-rehab-lifestyle',
          title: 'Rutin Edukasi Gaya Hidup',
          description: 'Berhenti merokok MUTLAK. Pengaturan berat badan dan kontrol tekanan darah dengan Tensimeter secara pro-aktif.',
          required: true,
          category: 'action'
        }
      ]
    }
  }
};
