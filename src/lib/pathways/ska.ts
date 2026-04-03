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
  diseaseName: 'Sindrom Koroner Akut & Angina Pektoris Stabil',
  startNodeId: 'coronary-triage',
  nodes: {

    // Merge seluruh node dari Angina Pektoris Stabil (APS)
    ...apsPathway.nodes,

    // NODE 0: GLOBAL TRIAGE CHECKLIST (PAGE 1)
    'coronary-triage': {
      id: 'coronary-triage',
      type: 'checklist',
      title: 'Triase Awal Nyeri Dada (Langkah Pertama Klinik)',
      description: 'Lakukan evaluasi keluhan Kunci PJK yang dihadapkan ke fasilitas Anda dengan alat yang tersedia (EKG, Tensi, Oximeter).',
      items: [
        {
          id: 'triage-pain-char',
          title: 'Survei OPQRST Nyeri Dada',
          description: 'Onset (Sejak kapan?), Quality (Seperti tertindih/terasa panas?), Radiation (Menjalar ke rahang punggung/lengan?), Time (Apa lebih dari 20 menit tanpa henti?).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'triage-ttv',
          title: 'Pemeriksaan Vitals (Tensimeter & Oximeter)',
          description: 'Cek tensi untuk memonitor syok atau krisis hipertensi. Berikan oksigen tabung JIKA angka oxymeter <90%.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'triage-emergency-airway',
          title: 'Siagakan Suction (Jika Diperlukan)',
          description: 'Bila kondisi memburuk dan ada sumbatan muntahan/saliva di napas, siagakan alat Suction. (Hindari Nebulizer pada PJK akut kecuali konkomitansi Asthma)',
          required: false,
          category: 'action'
        },
        {
          id: 'triage-ecg',
          title: 'WAJIB: Rekam EKG 12 Sadapan < 10 Menit',
          description: 'Rekam EKG sekarang juga. EKG adalah penentu arah kedaruratan infark di klinik karena troponin tidak ada.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'coronary-umbrella-decision'
    },

    // NODE 1: DECISION (PAGE 2) - STABIL VS AKUT
    'coronary-umbrella-decision': {
      id: 'coronary-umbrella-decision',
      type: 'decision',
      title: 'Triase Penyakit Jantung Koroner: Kondisi Stabil atau Akut?',
      description: 'Berdasarkan hasil Triase & EKG baru saja, tentukan jenis koroner ini:',
      warningLevel: 'critical',
      branches: [
        {
          id: 'branch-ska',
          title: 'Sindrom Koroner Akut (UAP / NSTEMI / STEMI)',
          description: 'Nyeri dada akut >20 menit saat istirahat, nyeri dada baru yang berat, pucat/keringat dingin, ATAU EKG menunjukkan depresi/elevasi ST. (Emergency)',
          color: 'red',
          nextNodeId: 'ska-ecg-decision',
          riskLevel: 'high'
        },
        {
          id: 'branch-aps',
          title: 'Angina Pektoris Stabil (APS)',
          description: 'Nyeri dada KRONIK, selalu dipicu aktivitas/stres, dan cepat hilang dengan istirahat <10 menit. EKG istirahat tidak ada gambaran darurat ST/T.',
          color: 'blue',
          nextNodeId: 'aps-anamnesis-lanjutan', // Routing ke APS pathway
          riskLevel: 'medium'
        }
      ]
    },

    // ==========================================
    // SKA PATHWAY : AKUT
    // ==========================================
    'ska-ecg-decision': {
      id: 'ska-ecg-decision',
      type: 'decision',
      title: 'Interpretasi Hasil EKG Klinik Terkini',
      description: 'Menentukan jalur rujukan ke Rumah Sakit. (Tidak dapat melakukan tindakan definitif Cath Lab/Fibrinolisis di Faskes ini).',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ska-stemi-branch',
          title: 'Hasil EKG: STEMI (Ada ST Elevasi)',
          description: 'Elevasi segmen ST persisten atau LBBB baru terdeteksi di EKG. Ini adalah darurat intervensi bedah/reperfusi.',
          color: 'red',
          nextNodeId: 'ska-stemi-rujukan-decision',
          riskLevel: 'high'
        },
        {
          id: 'ska-nstemi-uap-branch',
          title: 'Hasil EKG: NSTEMI / UAP (Depresi ST / T Inversi / Normal)',
          description: 'EKG tidak ada ST elevasi, NAMUN klinis SKA akut. Wajib dirujuk ke IGD karena fasilitas Klinik (tanpa Lab hs-cTn) tidak dapat menyingkirkan infark.',
          color: 'orange',
          nextNodeId: 'ska-nest-rujukan',
          riskLevel: 'high'
        }
      ]
    },

    // STEMI Rujukan Branch
    'ska-stemi-rujukan-decision': {
      id: 'ska-stemi-rujukan-decision',
      type: 'decision',
      title: 'STEMI: Keputusan Destinasi Rujukan CITO (Time is Muscle)',
      description: 'Fokus klinik Anda adalah Rujukan dan Transportasi secepat-cepatnya.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ska-rujuk-pci',
          title: 'RUJUKAN CITO: RS Fasilitas Cath Lab (<120 Menit)',
          description: 'Ambulans dapat mencapai pusat bedah intervensi IKP Primer (Cath Lab) dalam hitungan menit.',
          color: 'blue',
          nextNodeId: 'ska-persiapan-rujukan-stemi',
          riskLevel: 'high'
        },
        {
          id: 'ska-rujuk-fibrinolitik',
          title: 'RUJUKAN CITO: RSUD/RS Terdekat (Untuk Fibrinolitik)',
          description: 'Lokasi Anda jauh dari RS tipe A/B. Perjalanan ke fasilitas Cath Lab >120 menit. RSUD terdekat untuk obat penghancur gumpalan darah.',
          color: 'orange',
          nextNodeId: 'ska-persiapan-rujukan-stemi',
          riskLevel: 'high'
        }
      ]
    },

    'ska-persiapan-rujukan-stemi': {
      id: 'ska-persiapan-rujukan-stemi',
      type: 'checklist',
      title: 'Persiapan Transportasi & Stabilisasi STEMI',
      description: 'Pertolongan pertama sebelum ambulans diberangkatkan.',
      items: [
        {
          id: 'ska-aspirin-loading',
          title: 'Berikan Aspilet 160-320 mg Kunyah',
          description: 'JIKA TERSEDIA: Wajib langsung berikan aspirih kunyah saat ini juga.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ska-hubungi-igd',
          title: 'Klakson Ambulans & Telepon IGD Tujuan',
          description: 'Kabarkan: "Pasien suspek STEMI, O2 terpasang / Tensi ... kami meluncur ke arah Anda." Lakukan pemasangan IV.',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-bawa-ekg',
          title: 'Dokumentasi Kertas EKG',
          description: 'Lembar EKG / Foto digital sangat amat penting dibawa dokter pendamping.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'ska-long-term-management'
    },

    // SKA-NEST Rujukan Branch
    'ska-nest-rujukan': {
      id: 'ska-nest-rujukan',
      type: 'checklist',
      title: 'Tata Laksana & Stabilisasi CITO NSTEMI/UAP',
      description: 'Tanpa konfirmasi Lab kreatinin & hs-cTn, observasi tidak boleh diteruskan di Faskes Primer.',
      items: [
        {
          id: 'ska-nest-rujuk-segera',
          title: 'Hubungi Ambulans / RS Tujuan Sekarang!',
          description: 'Meskipun bukan STEMI, pasien tak ber ST-Elevasi dengan gejala khas merupakan darurat tingkat tinggi.',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-nest-serial-ekg',
          title: 'EKG Ulang (Bila Ambulans Lama)',
          description: 'Bila respons agak terhambat, atau nyeri menjalar sangat kuat kembali, REKAM ULANG EKG (Monitor transisi dari NSTEMI menjadi STEMI).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-nest-meds',
          title: 'Loading Aspirin & O2 Terpantau',
          description: 'Sebagaimana STEMI, kunyah aspirin (bila tersedia), dan pertahankan saturasi >90% dgn Oximeter.',
          required: true,
          category: 'medication'
        }
      ],
      nextNodeId: 'ska-long-term-management'
    },

    // Post-Rujukan Long Term Mgmt
    'ska-long-term-management': {
      id: 'ska-long-term-management',
      type: 'checklist',
      title: 'Pemantauan Rawat Jalan Paska Kepulangan dari RS Lanjutan',
      description: 'Klinik / FKTP memegang kendali kepatuhan pasca rawat Rumah Sakit.',
      items: [
        {
          id: 'ska-fktp-dapt',
          title: 'Patuhi DAPT & Statin',
          description: 'Monitor terus resep RS Lanjutan (Aspirin + Penghambat P2Y12) wajib rutin diminum agar stent koroner tidak tersumbat.',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-fktp-ekg-kontrol',
          title: 'Periksa / Rekam EKG Berkala saat kontrol Posbindu',
          description: 'Deteksi apakah ritme jantung aman.',
          required: true,
          category: 'assessment'
        }
      ]
    }
  }
};
