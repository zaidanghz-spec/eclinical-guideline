import { DynamicPathway } from '../dynamicPathways';

export const dispepsiaPathway: DynamicPathway = {
  diseaseId: 'dispepsia',
  diseaseName: 'Dispepsia & Infeksi Helicobacter pylori (PGI 2021)',
  startNodeId: 'dispepsia-initial-assessment',
  nodes: {
    'dispepsia-initial-assessment': {
      id: 'dispepsia-initial-assessment',
      type: 'checklist',
      title: 'Fase 1: Evaluasi Awal & Skrining Alarm Symptoms',
      description: 'Pendekatan Uninvestigated Dyspepsia di Layanan Primer (Klinik Keterbatasan Alat).',
      items: [
        {
          id: 'ref-dispepsia-initial',
          title: 'REFERENSI KREDIBILITAS CHECKLIST',
          description: 'Sumber: Konsensus Nasional Penatalaksanaan Dispepsia dan Infeksi Helicobacter pylori di Indonesia (Revisi 2021) oleh PGI. Algoritma telah DISESUAIKAN CUSTOME untuk klinik dengan limitasi: Hanya punya TTV, EKG, Suction, dan Termometer tanpa Endoskopi/UBT.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'disp-ttv',
          title: 'Pemantauan Keadaan Umum (TTV & Oxymeter)',
          description: 'Cek Tensi, Nadi, dan Saturasi Oksigen. Waspadai syok hipovolemik terselubung jika ada riwayat BAB hitam (melena) atau muntah darah (hematemesis).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'disp-ekg-ruleout',
          title: 'Wajib EKG: Singkirkan Sindrom Koroner Akut',
          description: 'Nyeri ulu hati (epigastrik) BISA JADI adalah serangan jantung / Infark Miokard Inferior terutama pada pasien usia lanjut, DM, atau hipertensi. WAJIB pastikan EKG normal sebelum dilabel dispepsia!',
          required: true,
          category: 'safety'
        },
        {
          id: 'disp-alarm-symptoms',
          title: 'Skrining Tanda Bahaya (Alarm Features)',
          description: 'Cari tahu apakah ada: 1) Penurunan BB drastis, 2) Muntah persisten, 3) Disfagia progresif (sulit menelan), 4) Perdarahan GI (melena/hematemesis), 5) Usia awal keluhan > 45 tahun, 6) Massa perut teraba, 7) Anemia.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'disp-nsaid-history',
          title: 'Evaluasi Obat-obatan Penyebab',
          description: 'Cari riwayat konsumsi NSAID kronis (Ibuprofen, Meloxicam, Asam Mefenamat), Aspirin, jamu-jamuan sendi peningkat asam lambung. Berhentikan segera jika mematuhi kaidah.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'dispepsia-alarm-decision'
    },

    'dispepsia-alarm-decision': {
      id: 'dispepsia-alarm-decision',
      type: 'decision',
      title: 'Algoritma Keputusan Penatalaksanaan Awal',
      description: 'Pisahkan kasus yang bisa dirawat empiris di tempat dengan yang WAJIB dirujuk untuk endoskopi / konfirmasi H. pylori.',
      branches: [
        {
          id: 'disp-no-alarm',
          title: 'TANPA Alarm Symptoms (Usia < 45th)',
          description: 'Uninvestigated Dyspepsia aman. Terapi Empiris (PPI-based).',
          color: 'teal',
          nextNodeId: 'dispepsia-empiric-therapy'
        },
        {
          id: 'disp-with-alarm',
          title: 'ADA Alarm Symptoms / Usia > 45 th',
          description: 'Indikasi Rujuk GI / Endoskopi SEGERA.',
          color: 'red',
          nextNodeId: 'dispepsia-rujuk-endoskopi'
        },
        {
          id: 'disp-hpylori-confirmed',
          title: 'Pasien Rujukan/Membawa Hasil H. pylori (+)',
          description: 'Ada bukti Lab / UBT / Histologi positif dari faskes lain.',
          color: 'orange',
          nextNodeId: 'dispepsia-eradication-hpylori'
        }
      ]
    },

    'dispepsia-empiric-therapy': {
      id: 'dispepsia-empiric-therapy',
      type: 'checklist',
      title: 'Terapi Empiris Dispepsia (Uninvestigated Dyspepsia)',
      description: 'Langkah pengobatan standar sebelum dilakukan diagnostik invasif.',
      items: [
        {
          id: 'ref-dispepsia-empiric',
          title: 'REFERENSI KREDIBILITAS CHECKLIST',
          description: 'PGI 2021 merekomendasikan strategi "Test and Treat" untuk daerah endemik, NAMUN akibat KETIADAAN ALAT testing non-invasif H.Pylori di klinik ini, opsi EBM kedua ("Empiric Acid-Suppression Therapy") diterapkan secara absolut.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'disp-ppi',
          title: 'Proton Pump Inhibitor (PPI) Empiris',
          description: 'Terapi lini pertama EBM PGI: Berikan dosis standar PPI (contoh: Omeprazole 20mg 1-2x/hari, atau Lansoprazole 30mg 1x/hari, Pantoprazole 40mg 1x/hari). Durasi empiris: 2 hingga 4 minggu.',
          required: true,
          category: 'medication'
        },
        {
          id: 'disp-prokinetic',
          title: 'Tambahan Prokinetik (Sesuai Gejala Dominan)',
          description: 'Bila dispepsia tipe distres post-prandial (begah, cepat kenyang, kembung), KOMBinasikan PPI dengan obat Prokinetik (contoh: Domperidone 10mg 3x/hari atau Itopride hydrochloric). Hindari Metoclopramide jangka panjang karena efek ekstrapiramidal.',
          required: false,
          category: 'medication'
        },
        {
          id: 'disp-lifestyle',
          title: 'Edukasi Modifikasi Pola Hidup',
          description: 'Hindari rokok, alkohol, kafein tinggi (kopi kental), makanan pedas/sintetis berlebih. Makan tepat waktu porsi terbagi (small frequent meals). Menghindari obesitas jika distensi rongga perut memicu GERD/Dispepsia.',
          required: true,
          category: 'action'
        },
        {
          id: 'disp-eval-empiric',
          title: 'Jadwalkan Evaluasi Re-visit 2-4 Minggu',
          description: 'Instruksikan pasien mutlak KEMBALI dalam 2-4 minggu. Bila gejala tidak respons sama sekali, saat itu pasien WAJIB DI-RUJUK ke RS yang punya tes H. pylori / OGD (Endoskopi).',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dispepsia-evaluation'
    },

    'dispepsia-rujuk-endoskopi': {
      id: 'dispepsia-rujuk-endoskopi',
      type: 'checklist',
      title: 'Tatalaksana Khusus Red Flag & Rujukan',
      description: 'Prosedur pengamanan pasien dengan risiko malignansi atau komplikasi ulkus.',
      items: [
        {
          id: 'ref-dispepsia-rujuk',
          title: 'REFERENSI KREDIBILITAS CHECKLIST',
          description: 'PGI Konsensus 2021 merekomendasikan: Setiap keluhan dispepsia onset usia >45 tahun, atau dibarengi perdarahan GI, anemia tak jelas sebab, dan red flags lainnya adalah indikasi MUTLAK Esofagogastroduodenoskopi (EGD).',
          required: true,
          category: 'documentation'
        },
        {
          id: 'disp-iv-line',
          title: 'Resusitasi Cairan Darurat (Bila Perdarahan)',
          description: 'Jika pasien takikardi, hipotensi, dan melena memburuk, segera loading resusitasi fluid RL/NaCl 0.9%. JANGAN beri makan per-oral.',
          required: true,
          category: 'safety'
        },
        {
          id: 'disp-prep-suction',
          title: 'Standby Suction Mesin',
          description: 'Jika ada muntah masif / hematemesis aktif, waspadai aspirasi darah ke jalan napas, amankan patensi ABC, standby selang suction portabel yang ada.',
          required: false,
          category: 'safety'
        },
        {
          id: 'disp-rujuk-spgeh',
          title: 'RUJUK Dokter Spesialis Gastroenterohepatologi (K-GEH)',
          description: 'Terangkan rasional medis kepada pasien dan siapkan pengantar ke Rumah Sakit terdekat untuk intervensi hemostatik endoskopi diagnostik.',
          required: true,
          category: 'action'
        }
      ]
    },

    'dispepsia-eradication-hpylori': {
      id: 'dispepsia-eradication-hpylori',
      type: 'checklist',
      title: 'Regimen Eradikasi Helicobacter pylori (Confirmed)',
      description: 'Jika pasien tegak terkonfirmasi menderita H. pylori dari fasilitas lanjutan.',
      items: [
        {
          id: 'ref-dispepsia-hpylori',
          title: 'REFERENSI KREDIBILITAS CHECKLIST',
          description: 'Sumber: Konsensus Nasional PGI 2021 Tatalaksana H.Pylori. Diperbarui khusus melihat resistensi clarithromycin tinggi (>20%) di Indonesia dan kurang tersedianya obat regimen Bismuth.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'disp-erad-firstline',
          title: 'EBM PGI: Pilihan Regimen Lini Pertama Concomitant',
          description: 'Karena resistensi obat tua tinggi dan Bismuth sulit dicari, PGI 2021 sangat menyarankan Terapi Konkomitan 14 Hari: \nPPI Dosis Ganda + Amoxicillin 1g (2x/hr) + Clarithromycin 500mg (2x/hr) + Metronidazole 500mg 3x/hari. HARUS DIMINUM 14 HARI PENUH demi memutus rantai resistensi!',
          required: true,
          category: 'medication'
        },
        {
          id: 'disp-erad-fluoroquinolone',
          title: 'EBM Alternatif: Terapi Levofloxacin',
          description: 'Jika alergi penisilin/amoxicillin atau suspek gagal klaritromisin. Gunakan Lini Kedua: PPI Dosis Ganda + Levofloxacin 500mg 1x/hari + Amoxicillin 1g 2x/hari (atau Metronidazole) selama 10-14 hari.',
          required: false,
          category: 'medication'
        },
        {
          id: 'disp-probio-consideration',
          title: 'Tambahkan Probiotik atau Muko-protektor',
          description: 'Sukralfat / Rebamipide untuk melapisi mukosa lambung selama masa inflamas akut, dan probiotik dapat menekan efek samping dysbiosis antibiotik masif di regimen ini.',
          required: false,
          category: 'medication'
        }
      ],
      nextNodeId: 'dispepsia-evaluation'
    },

    'dispepsia-evaluation': {
      id: 'dispepsia-evaluation',
      type: 'checklist',
      title: 'Evaluasi & Tindak Lanjut Panjang',
      description: 'Folow-up pasien di kunjungan berikutnya',
      items: [
        {
          id: 'ref-dispepsia-eval',
          title: 'REFERENSI KREDIBILITAS CHECKLIST',
          description: 'Step-down therapy & re-evaluation policy mengikuti alur PGI 2021.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'disp-eval-success',
          title: 'Respons Terapi Tuntas (Berhasil)',
          description: 'Apabila gejala merada pasca terapi empiris: Lakukan "On-Demand Therapy" (berikan antasida / PPI hanya saat gejala kumat) – tidak perlu minum reguler untuk efisiensi.',
          required: true,
          category: 'action'
        },
        {
          id: 'disp-eval-fail',
          title: 'Respons Terapi Kurang / Gagal',
          description: 'Apabila dispepsia menetap sesudah 2-4 minggu. Pasien naik status ke Indikasi Rujuk Mutlak Spesialis Gastro.',
          required: true,
          category: 'action'
        }
      ]
    }
  }
};
