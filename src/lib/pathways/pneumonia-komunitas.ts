// ============================================================
// PNEUMONIA KOMUNITAS (CAP - Community-Acquired Pneumonia)
// ICD-10: J15.9
// Referensi:
// - Pedoman Diagnosis dan Penatalaksanaan Pneumonia Komunitas di Indonesia (PDPI 2014/2022)
// - Kementerian Kesehatan RI - PPK Dokter di Fasilitas Pelayanan Kesehatan Primer
// Setting: Klinik / FKTP
// Alat Terbatas: TTV, Oksimetri, Suction, Nebulizer
// Tidak Ada: Rontgen Thorax, Lab Darah (Ureum/BUN), Kultur
// Pendekatan utama: Skor CRB-65 (tanpa Ureum) untuk triase rawat jalan vs rujuk RS
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const pneumoniaPathway: DynamicPathway = {
  diseaseId: 'pneumonia-komunitas',
  diseaseName: 'Pneumonia Komunitas / CAP (PDPI)',
  startNodeId: 'cap-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT
    // ============================================================
    'cap-initial-assessment': {
      id: 'cap-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Penilaian Awal & Pemeriksaan Fisik',
      description: 'Identifikasi tanda-tanda infeksi saluran napas bawah akut dan nilai stabilitas medis pasien.',
      items: [
        {
          id: 'cap-anamnesis-batuk',
          title: 'Anamnesis Gejala Paru Akut',
          description: 'Keluhan utama: Batuk berdahak (purulen/kuning/hijau), demam tinggi, menggigil, sering disertai sesak napas atau nyeri dada pleuritik (nyeri saat menarik napas dalam).',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'cap-ttv-kritis',
          title: 'TTV & Pulse Oksimetri',
          description: 'Suhu >38°C?, Laju napas cepat (Takipnea >20x/mnt)?, Tekanan Darah turun?, SpO₂ turun (<95% ruangan)?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'cap-pemfis-paru',
          title: 'Auskultasi Paru',
          description: 'Dengarkan adanya: Ronki basah halus/kasar (crackles), suara napas bronkial, atau redup pada perkusi (tanda konsolidasi paru).',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'cap-jalan-napas',
          title: 'Cek Patensi Jalan Napas (Tanda Bahaya)',
          description: 'Bila pasien tampak sangat sesak, ngorok (gurgling) karena banyak dahak kental yang tidak bisa dibatukkan, siapkan SUCTION segera!',
          required: true,
          category: 'safety',
          role: 'nurse',
        }
      ],
      nextNodeId: 'cap-triage-crb65'
    },

    // ============================================================
    // NODE 2: TRIAGE MENGGUNAKAN CRB-65
    // ============================================================
    'cap-triage-crb65': {
      id: 'cap-triage-crb65',
      type: 'decision',
      title: 'Node 2: Triase Skor CRB-65 (Skrining FKTP)',
      description: 'Gunakan kriteria CRB-65 (tanpa Ureum) untuk menentukan apakah pasien bisa diobati di klinik atau harus dirujuk ke Rumah Sakit. Beri nilai 1 untuk setiap tanda di bawah ini:\n[C] Confusion: Disorientasi/kebingungan (GCS <15)\n[R] Respiration: Laju napas ≥ 30x/menit\n[B] Blood pressure: Sistolik < 90 mmHg ATAU Diastolik ≤ 60 mmHg\n[65] Umur: ≥ 65 tahun',
      warningLevel: 'critical',
      branches: [
        {
          id: 'cap-score-0',
          title: '🟢 CRB-65 Skor 0 (Risiko Rendah)',
          description: 'Pasien muda (<65 tahun), sadar baik, napas <30x/mnt, tensi stabil. Mortalitas < 1%.',
          color: 'green',
          nextNodeId: 'cap-rawat-jalan',
          riskLevel: 'low'
        },
        {
          id: 'cap-score-1-2',
          title: '🟠 CRB-65 Skor 1–2 (Risiko Sedang)',
          description: 'Ada 1 atau 2 faktor risiko. Butuh rontgen dan observasi ketat. Direkomendasikan RUJUK / Rawat Inap, terutama bila skor 2 atau saturasi < 92%.',
          color: 'orange',
          nextNodeId: 'cap-rawat-inap',
          riskLevel: 'medium'
        },
        {
          id: 'cap-score-3-4',
          title: '🔴 CRB-65 Skor 3–4 ATAU Sesak Berat (Risiko Tinggi)',
          description: 'Ancaman gagal napas atau Sepsis berat. Mortalitas sangat tinggi (15-40%). Tindakan Life-saving harus segera dilakukan.',
          color: 'red',
          nextNodeId: 'cap-icu-darurat',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 3A: RAWAT JALAN (SKOR 0)
    // ============================================================
    'cap-rawat-jalan': {
      id: 'cap-rawat-jalan',
      type: 'checklist',
      title: 'Node 3A: Tatalaksana CAP Ringan (Rawat Jalan)',
      description: 'Terapi antibiotik empiris oral untuk pasien tanpa komorbiditas berat menurut pedoman PDPI/PPK FKTP.',
      items: [
        {
          id: 'rj-antibiotik-lini1',
          title: 'Resepkan Antibiotik Lini Pertama',
          description: 'Golongan Beta-laktam: Amoksisilin oral 1 gram tiap 8 jam (Dosis tinggi sangat dianjurkan untuk atasi S. pneumoniae). \nATAU Makrolida: Azitromisin 500 mg/hari selama 3 hari, ATAU Klaritromisin 500 mg tiap 12 jam (jika dicurigai kuman atipikal/alergi penisilin).',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'rj-simtomatis',
          title: 'Terapi Suportif & Simtomatis',
          description: 'Obat Penurun Panas: Parasetamol 3 x 500 mg (jika demam).\nMukolitik / Ekspektoran: Asetilsistein 3 x 200 mg atau Gliseril Guaiakolat (GG) untuk mengencerkan dahak.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'rj-edukasi',
          title: 'Edukasi Red Flags & Kontrol',
          description: 'Pasien wajib kembali ke klinik jika dalam 48-72 jam demam tidak turun, sesak napas bertambah berat, atau tidak bisa makan/minum. Jika membaik, teruskan antibiotik minimal 5-7 hari.',
          required: true,
          category: 'documentation',
          role: 'nurse',
        }
      ]
    },

    // ============================================================
    // NODE 3B: RAWAT INAP / RUJUKAN (SKOR 1-2)
    // ============================================================
    'cap-rawat-inap': {
      id: 'cap-rawat-inap',
      type: 'checklist',
      title: 'Node 3B: Rujuk ke Faskes Lanjutan (RS)',
      description: 'Klinik primer tanpa rontgen thorax sebaiknya merujuk pasien CRB-65 skor 1 atau 2 untuk pemeriksaan radiologis dan terapi IV.',
      items: [
        {
          id: 'ri-suportif',
          title: 'Terapi Suportif Prakonfirmasi',
          description: 'Berikan Oksigen nasal kanul 2-4 L/mnt jika pasien merasa sesak tetapi SpO₂ masih >90%.\nMinumkan Parasetamol jika demam tinggi mengurangi ketidaknyamanan saat perjalanan.',
          required: true,
          category: 'action',
          role: 'doctor',
        },
        {
          id: 'ri-surat-rujuk',
          title: 'Buat Surat Rujukan',
          description: 'Tulis diagnosis Suspek Pneumonia Komunitas dengan rincian TTV dan Skor CRB-65. Cantumkan indikasi rujukan: "Membutuhkan foto polos dada (Chest X-Ray) dan evaluasi rawat inap".',
          required: true,
          category: 'documentation',
          role: 'nurse',
        }
      ]
    },

    // ============================================================
    // NODE 3C: KONDISI DARURAT / ICU / GAGAL NAPAS (SKOR 3-4)
    // ============================================================
    'cap-icu-darurat': {
      id: 'cap-icu-darurat',
      type: 'checklist',
      title: 'Node 3C: Life Saving & Rujuk Cito IGD',
      description: 'Stabilisasi ABC sangat krusial di FKTP sebelum merujuk menggunakan ambulans.',
      items: [
        {
          id: 'dar-oksigen-tinggi',
          title: 'Oksigenasi Aliran Tinggi / NRM',
          description: 'Berikan Oksigen sungkup muka Non-Rebreathing Mask (NRM) 10-15 L/menit. Targetkan SpO₂ naik minimal > 90% (88-92% jika pasien suspek PPOK).',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'dar-suction-neb',
          title: 'Tindakan Suction & Nebulizer (Bila Indikasi)',
          description: 'Bila terdengar produksi dahak kental berlebih di saluran napas atas (ngorok): lakukan SUCTION.\nBila terdengar mengi (wheezing) jelas bersamaan paru kotor, berikan NEBULIZER Salbutamol untuk melebarkan jalan napas darurat.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'dar-jalur-iv',
          title: 'Pasang Jalur IV (Infus)',
          description: 'Pasang IV line jarum besar (18G/20G). Jika tensi hipotensi (sistolik <90 mmHg), loading resusitasi cairan NaCl 0.9% 500 cc cepat sambil dinilai respon vitalnya.',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'dar-rujuk-ambulan',
          title: 'Rujuk CITO dengan Ambulan & Didampingi Perawat',
          description: 'Hubungi RS rujukan untuk kamar HCU/ICU dan isolasi infeksi penyerta. Pakaikan pasien masker jika tidak terpasang NRM. Perawat harus mendampingi dengan tas emergency (suction portabel/oksigen).',
          required: true,
          category: 'documentation',
          role: 'doctor',
        }
      ]
    }
  },
  references: [
    'Perhimpunan Dokter Paru Indonesia (PDPI). Pedoman Diagnosis & Penatalaksanaan Pneumonia Komunitas di Indonesia. 2014 & Revisit 2022.',
    'Kementerian Kesehatan Republik Indonesia. Panduan Praktik Klinis Bagi Dokter di Fasilitas Pelayanan Kesehatan Primer.',
    'British Thoracic Society (BTS) Guidelines for the Management of Community Acquired Pneumonia in Adults (CRB-65 Criteria).'
  ]
};
