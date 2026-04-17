// ============================================================
// DISPEPSIA (Uninvestigated Dyspepsia & H. pylori)
// ICD-10: K30
// Referensi:
// - Konsensus Nasional Penatalaksanaan Dispepsia & Infeksi H. pylori — PGI 2021
// - KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
// - Moayyedi P, et al. ACG and CAG Clinical Guideline: Management of Dyspepsia. Am J Gastroenterol. 2017
// - Malfertheiner P, et al. (EURO-Hp V). Management of H. pylori. Gut. 2017;66(1):6–30.
// Setting: Klinik / FKTP
// Alat: TTV (Tensi, Termometer, Oksimetri), EKG, Suction
// TIDAK ADA: Endoskopi (Rujuk RS), UBT, Rapid H. pylori test, USG (Rujuk RS) abdomen
// Prinsip: EKG dulu untuk singkirkan SKA, lalu skrining alarm features
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const dispepsiaPathway: DynamicPathway = {
  diseaseId: 'dispepsia',
  diseaseName: 'Dispepsia & Infeksi H. pylori (Konsensus PGI 2021)',
  startNodeId: 'disp-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT — Anamnesis + TTV + Pemfis
    // ============================================================
    'disp-initial-assessment': {
      id: 'disp-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis, TTV & Pemeriksaan Fisik',
      description: 'Dispepsia = nyeri/rasa tidak nyaman di epigastrium. Di klinik tanpa endoskopi (Rujuk RS) dan UBT, pendekatan adalah "Uninvestigated Dyspepsia" berdasarkan klinis. PERHATIAN: Nyeri epigastrium bisa menjadi presentasi infark miokard inferior — EKG wajib dilakukan!',
      items: [
        {
          id: 'disp-anamnesis-keluhan',
          title: 'Anamnesis — Keluhan Utama & Karakter Nyeri',
          description: 'Tanyakan:\n• Lokasi: epigastrium (ulu hati)? Atau menjalar ke dada/punggung?\n• Kualitas: terbakar, penuh, berat, mual?\n• Waktu: saat lapar, sesudah makan, atau tidak menentu?\n• Sudah berapa lama? Pertama kali atau kambuhan?\n• Gejala dominan: tipe EPIGASTRIC PAIN (nyeri/panas dominan) vs POSTPRANDIAL DISTRESS (begah/cepat kenyang dominan)?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'disp-anamnesis-penyerta',
          title: 'Anamnesis — Gejala Penyerta & Riwayat',
          description: 'Tanyakan:\n• Mual dan muntah: berapa kali? Ada darah?\n• Penurunan nafsu makan atau berat badan?\n• BAB: normal, hitam (melena), atau berdarah?\n• Riwayat penyakit serupa sebelumnya?\n• Konsumsi rutin NSAID, Aspirin, kortikosteroid, atau jamu-jamu?\n• Merokok, alkohol, kopi berlebihan?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'disp-alarm-features',
          title: '⚠️ Skrining ALARM FEATURES — Perlu Endoskopi (Rujuk RS) SEGERA',
          description: 'Tanda bahaya yang mengharuskan rujuk endoskopi (Rujuk RS) (bukan terapi empiris):\n• Disfagia progresif (sulit menelan makin lama makin berat)\n• Penurunan berat badan drastis tanpa sebab jelas\n• Muntah persisten dan berulang\n• Perdarahan GI: hematemesis (muntah darah) atau melena (BAB hitam)\n• Anemia yang tidak jelas penyebabnya\n• Teraba massa di abdomen\n• Onset baru pada usia ≥ 45 tahun\n• Riwayat keluarga kanker lambung atau kolorektal',
          required: true,
          category: 'safety'
        },
        {
          id: 'disp-ttv',
          title: 'TTV — TD, Nadi, Suhu, SpO₂',
          description: 'Tekanan Darah + Nadi: sistolik < 90 atau nadi > 100 — curiga PERDARAHAN GI aktif (syok hipovolemik)!\nSuhu: demam + nyeri perut — curiga ulkus perforasi atau peritonitis!\nSpO₂ < 94%: beri O₂, evaluasi penyebab lain.\nBandingkan TTV baring vs duduk (tes ortostatik) jika curiga perdarahan terselubung.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'disp-ekg-wajib',
          title: '⚡ EKG 12-Lead — WAJIB! Singkirkan Infark Miokard Inferior',
          description: 'Nyeri epigastrium BISA MERUPAKAN presentasi Infark Miokard Inferior/STEMI terutama pada pasien usia lanjut, DM, atau hipertensi.\n\nPerhatikan di EKG:\n• ST Elevasi di lead II, III, aVF → STEMI Inferior — BUKAN dispepsia!\n• Jika EKG normal → aman lanjutkan evaluasi dispepsia\n\nJANGAN label pasien sebagai "dispepsia" tanpa EKG pada pasien ≥ 40 tahun dengan risiko kardiovaskular!',
          required: true,
          category: 'safety'
        },
        {
          id: 'disp-pemfis-abdomen',
          title: 'Pemeriksaan Fisik Abdomen',
          description: 'Inspeksi: distensi, massa?\nAuskultasi: bising usus normal?\nPerkusi: tympani atau redup?\nPalpasi:\n• Nyeri tekan epigastrium (ulkus/gastritis?)\n• Nyeri tekan McBurney (appendisitis DD?)\n• Hepatomegali atau massa?\n• Tanda peritonitis: defans muskular, rigiditas, nyeri lepas → RUJUK BEDAH SEGERA!\nPalpasi limpa: splenomegali?',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'disp-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION
    // ============================================================
    'disp-triage-decision': {
      id: 'disp-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Tentukan Jalur Tatalaksana',
      description: 'Tentukan berdasarkan EKG, tanda vital, alarm features, dan pemeriksaan fisik.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'disp-darurat',
          title: '🔴 DARURAT — Perdarahan GI Aktif / Peritonitis / STEMI',
          description: 'Ada tanda syok (TD < 90, takikardia) + melena/hematemesis, ATAU EKG menunjukkan STEMI Inferior, ATAU tanda peritonitis. Stabilisasi segera + rujuk IGD RS.',
          color: 'red',
          nextNodeId: 'disp-darurat-management',
          riskLevel: 'high'
        },
        {
          id: 'disp-alarm-rujuk',
          title: '🟠 RUJUK — Alarm Features (+) / Usia ≥ 45 Tahun',
          description: 'Ada disfagia, penurunan BB, muntah persisten, anemia, atau usia ≥ 45 tahun onset baru. Butuh endoskopi (Rujuk RS) untuk menyingkirkan keganasan — TIDAK bisa terapi empiris saja.',
          color: 'orange',
          nextNodeId: 'disp-rujuk-endoskopi (Rujuk RS)',
          riskLevel: 'high'
        },
        {
          id: 'disp-empiris',
          title: '🟢 TERAPI EMPIRIS — Uninvestigated Dyspepsia, Usia < 45, Tanpa Alarm',
          description: 'Tidak ada tanda darurat, tidak ada alarm features, usia < 45 tahun. Aman untuk terapi empiris di klinik sesuai konsensus PGI 2021.',
          color: 'green',
          nextNodeId: 'disp-terapi-empiris',
          riskLevel: 'low'
        },
        {
          id: 'disp-hpylori-positif',
          title: '🟡 H. pylori Terkonfirmasi (Membawa Hasil dari Faskes Lain)',
          description: 'Pasien membawa hasil UBT, RUT, atau histologi H. pylori (+) dari fasilitas lain. Langsung ke regimen eradikasi.',
          color: 'yellow',
          nextNodeId: 'disp-eradikasi-hpylori',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 3A: DARURAT — PERDARAHAN / PERITONITIS / STEMI
    // ============================================================
    'disp-darurat-management': {
      id: 'disp-darurat-management',
      type: 'checklist',
      title: 'Node 3A: DARURAT — Stabilisasi & Rujuk IGD RS Segera',
      description: 'Perdarahan GI aktif, peritonitis, atau STEMI Inferior yang menyamar sebagai dispepsia — semua butuh penanganan di RS.',
      items: [
        {
          id: 'dd-posisi-abc',
          title: '1. Amankan Airway, Breathing, Circulation',
          description: 'Posisikan pasien berbaring. Jika hematemesis aktif → posisi miring/lateral untuk cegah aspirasi. Siapkan suction.\nO₂ via masker 4–8 L/menit jika SpO₂ < 94%.',
          required: true,
          category: 'safety'
        },
        {
          id: 'dd-iv-resusitasi',
          title: '2. IV Line 2 Jalur + Resusitasi Cairan',
          description: 'Pasang IV line 2 jalur besar (18G atau lebih). Bolus RL atau NaCl 0.9% 500 mL cepat jika syok (TD < 90, nadi > 100).\nJANGAN beri makan atau minum per oral (NPO).',
          required: true,
          category: 'action'
        },
        {
          id: 'dd-stemi-protokol',
          title: '3. Jika EKG Menunjukkan STEMI Inferior → Protokol SKA',
          description: 'Aspirin 160–320 mg dikunyah. Nitrogliserin sublingual jika TD > 90. Rujuk ke RS dengan Cath Lab segera.\nJangan berikan antasida atau PPI sebagai satu-satunya terapi pada STEMI!',
          required: false,
          category: 'medication'
        },
        {
          id: 'dd-suction-standby',
          title: '4. Suction Standby (Jika Hematemesis)',
          description: 'Siapkan mesin suction di samping pasien. Jika muntah darah masif → suction segera untuk cegah aspirasi. Pasang oksimetri kontinu.',
          required: true,
          category: 'safety'
        },
        {
          id: 'dd-rujuk',
          title: '5. RUJUK IGD RS — Ambulans + Surat Rujukan Lengkap',
          description: 'Cantumkan: TTV serial, estimasi volume perdarahan, EKG, obat yang diberikan, waktu onset.\nUntuk perdarahan GI: RS dengan fasilitas endoskopi (Rujuk RS) dan transfusi. Untuk STEMI: RS dengan Cath Lab.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3B: RUJUK ENDOSKOPI (Rujuk RS) (Alarm Features)
    // ============================================================
    'disp-rujuk-endoskopi (Rujuk RS)': {
      id: 'disp-rujuk-endoskopi (Rujuk RS)',
      type: 'checklist',
      title: 'Node 3B: Alarm Features (+) — Siapkan Rujukan Endoskopi (Rujuk RS)',
      description: 'PGI 2021: Alarm features adalah indikasi mutlak esofagogastroduodenoskopi (EGD) untuk menyingkirkan keganasan lambung atau esofagus.',
      items: [
        {
          id: 'ae-ppi-sementara',
          title: '1. PPI Sambil Menunggu Jadwal Endoskopi (Rujuk RS)',
          description: 'Omeprazole 2 × 20 mg atau Lansoprazole 1 × 30 mg untuk kontrol gejala sambil menunggu jadwal rujukan. PPI tidak menyembunyikan keganasan pada endoskopi (Rujuk RS) jika diberikan ≤ 8 minggu.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ae-stop-nsaid',
          title: '2. Hentikan NSAID, Aspirin, Kortikosteroid (Jika Ada)',
          description: 'NSAID dan Aspirin adalah penyebab ulkus dan perdarahan yang paling umum. Hentikan jika memungkinkan. Jika aspirin untuk kardioproteksi → jangan hentikan tanpa konsultasi dokter yang meresepkan.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ae-surat-rujukan',
          title: '3. Surat Rujukan ke SpPenyakit Dalam / Gastroenterologi',
          description: 'Cantumkan: usia pasien, onset keluhan, alarm features yang ditemukan, riwayat konsumsi NSAID/aspirin, TTV, dan temuan pemfis.\nTujuan: Endoskopi (Rujuk RS) diagnostik (EGD) dan/atau tes H. pylori (UBT/RUT/histologi).',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3C: TERAPI EMPIRIS
    // ============================================================
    'disp-terapi-empiris': {
      id: 'disp-terapi-empiris',
      type: 'checklist',
      title: 'Node 3C: Terapi Empiris — Uninvestigated Dyspepsia (Usia < 45, Tanpa Alarm)',
      description: 'PGI 2021: Strategi "Test and Treat" H. pylori direkomendasikan di area endemik. Namun karena klinik tidak memiliki alat testing non-invasif (UBT/RUT), diberikan terapi acid-suppression empiris selama 2–4 minggu.',
      items: [
        {
          id: 'emp-hentikan-obat-penyebab',
          title: '1. Hentikan Obat Penyebab Dispepsia',
          description: 'Hentikan atau kurangi: NSAID (Ibuprofen, Diklofenak, Meloksikam, Asam Mefenamat), jamu-jamu, suplemen yang memperparah asam lambung.\nJika NSAID diperlukan → ganti dengan Parasetamol atau tambahkan PPI sebagai gastroproteksi.',
          required: true,
          category: 'medication'
        },
        {
          id: 'emp-ppi',
          title: '2. Proton Pump Inhibitor (PPI) — Lini Pertama',
          description: 'Pilihan PPI (minum 30–60 menit sebelum makan pertama):\n• Omeprazole 20 mg 1–2× sehari\n• Lansoprazole 30 mg 1× sehari\n• Pantoprazole 40 mg 1× sehari\n• Esomeprazole 20–40 mg 1× sehari\n\nDurasi: 2–4 minggu empiris. Evaluasi respons pada kunjungan berikutnya.',
          required: true,
          category: 'medication'
        },
        {
          id: 'emp-prokinetik',
          title: '3. Prokinetik (Jika Dominan Postprandial Distress)',
          description: 'Jika keluhan dominan: begah, cepat kenyang, rasa penuh setelah makan → tambahkan prokinetik:\n• Domperidone 10 mg 3× sehari (30 menit sebelum makan)\n• Itopride 50 mg 3× sehari\n\nHINDARI Metoklopramid jangka panjang (efek ekstrapiramidal).',
          required: false,
          category: 'medication'
        },
        {
          id: 'emp-antasida',
          title: '4. Antasida (Untuk Relief Cepat Gejala Akut)',
          description: 'Antasida (Al-Mg hydroxide, Simethicone) boleh diberikan untuk relief cepat gejala akut sambil menunggu efek PPI (yang memerlukan 2–3 hari untuk efek penuh). Berikan 1–2 jam setelah makan dan menjelang tidur.',
          required: false,
          category: 'medication'
        },
        {
          id: 'emp-modifikasi-gaya-hidup',
          title: '5. Modifikasi Gaya Hidup (Wajib Bersamaan)',
          description: 'Edukasikan:\n• Makan teratur, porsi kecil tapi sering (small frequent meals)\n• Hindari makanan pemicu: pedas, asam, berlemak tinggi, kopi, alkohol\n• Hindari berbaring langsung setelah makan (tunggu 2–3 jam)\n• Elevasi kepala 30° saat tidur jika ada gejala GERD\n• Berhenti merokok\n• Kurangi stres (stress meningkatkan sekresi asam)',
          required: true,
          category: 'action'
        },
        {
          id: 'emp-jadwal-kontrol',
          title: '6. Kontrol Ulang 2–4 Minggu — Evaluasi Respons',
          description: 'Jadwalkan kontrol wajib dalam 2–4 minggu.\n• Gejala MEMBAIK → penjelasan on-demand therapy (PPI hanya saat gejala kumat)\n• Gejala TIDAK MEMBAIK dalam 4 minggu → RUJUK untuk endoskopi (Rujuk RS) dan tes H. pylori\n\nJangan berikan PPI > 8 minggu tanpa evaluasi ulang!',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'disp-evaluasi-respons'
    },

    // ============================================================
    // NODE 3D: ERADIKASI H. PYLORI
    // ============================================================
    'disp-eradikasi-hpylori': {
      id: 'disp-eradikasi-hpylori',
      type: 'checklist',
      title: 'Node 3D: Eradikasi H. pylori (Hasil Konfirmasi Positif)',
      description: 'PGI 2021: Karena resistensi Clarithromycin tinggi (> 20%) di Indonesia dan Bismuth sulit didapat, regimen Konkomitan 14 hari adalah lini pertama utama.',
      items: [
        {
          id: 'hp-cek-alergi',
          title: '1. Cek Riwayat Alergi Penisilin',
          description: 'Alergi Amoxicillin (penisilin)?\n• TIDAK alergi → gunakan regimen konkomitan\n• ALERGI → gunakan regimen levofloxacin (lini kedua)\n\nTanyakan juga: riwayat penggunaan Clarithromycin sebelumnya atau metronidazol dalam 3 bulan terakhir (bisa ada resistensi).',
          required: true,
          category: 'safety'
        },
        {
          id: 'hp-regimen-konkomitan',
          title: '2. Lini Pertama: Regimen Konkomitan 14 Hari',
          description: 'Berikan bersamaan selama 14 hari (HARUS DIHABISKAN):\n• PPI dosis ganda (contoh: Omeprazole 20 mg 2× sehari)\n• Amoxicillin 1 g 2× sehari\n• Clarithromycin 500 mg 2× sehari\n• Metronidazole 500 mg 3× sehari\n\nEradikasi rate ~90%. Ingatkan pasien: 14 hari penuh tanpa putus!',
          required: true,
          category: 'medication'
        },
        {
          id: 'hp-regimen-levofloxacin',
          title: '3. Lini Kedua (Alergi Penisilin / Gagal Lini Pertama): Levofloxacin 14 Hari',
          description: 'Jika alergi amoxicillin atau gagal konkomitan:\n• PPI dosis ganda\n• Levofloxacin 500 mg 1× sehari\n• Metronidazole 500 mg 3× sehari\n\nDurasi 14 hari. Atau gunakan regimen Bismuth Quadruple jika Bismuth tersedia di RS.',
          required: false,
          category: 'medication'
        },
        {
          id: 'hp-mukoprotektor',
          title: '4. Mukoprotektor (Opsional — Proteksi Mukosa Lambung)',
          description: 'Sukralfat 3–4× sehari (diminum 1 jam sebelum makan) ATAU Rebamipide 100 mg 3× sehari untuk proteksi mukosa selama terapi antibiotik agresif. Probiotik (Lactobacillus) membantu mengurangi efek samping dysbiosis antibiotik.',
          required: false,
          category: 'medication'
        },
        {
          id: 'hp-konfirmasi-eradikasi',
          title: '5. Konfirmasi Eradikasi 4 Minggu Setelah Selesai Antibiotik',
          description: 'PGI 2021 merekomendasikan konfirmasi eradikasi dengan UBT atau tes feses (H. pylori stool antigen) minimal 4 minggu setelah antibiotik selesai.\nJika di klinik tidak tersedia → RUJUK ke fasilitas yang memiliki UBT untuk konfirmasi.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'disp-evaluasi-respons'
    },

    // ============================================================
    // NODE 4: EVALUASI RESPONS & MONITORING
    // ============================================================
    'disp-evaluasi-respons': {
      id: 'disp-evaluasi-respons',
      type: 'checklist',
      title: 'Node 4: Evaluasi Respons & Monitoring Jangka Panjang',
      description: 'Evaluasi pada kunjungan kontrol dan tentukan tindak lanjut.',
      items: [
        {
          id: 'ev-respons-baik',
          title: '1. Respons Baik — On-Demand Therapy',
          description: 'Gejala membaik dengan PPI empiris → alihkan ke "on-demand therapy": PPI hanya diminum saat gejala kambuh (bukan setiap hari terus menerus). Pantau penggunaan tidak boleh setiap hari jangka panjang tanpa evaluasi.\n\nPPI jangka panjang > 1 tahun: pantau risiko defisiensi Mg²⁺, B12, peningkatan risiko C. difficile.',
          required: true,
          category: 'action'
        },
        {
          id: 'ev-respons-gagal',
          title: '2. Respons Buruk — Rujuk Endoskopi (Rujuk RS)',
          description: 'Gejala TIDAK membaik setelah 4 minggu PPI empiris → RUJUK untuk endoskopi (Rujuk RS) (EGD) dan tes H. pylori.\nJangan terus berikan PPI empiris tanpa evaluasi. Gejala menetap bisa menandakan: H. pylori, ulkus peptikum, GERD erosif, keganasan, atau functional dyspepsia.',
          required: true,
          category: 'action'
        },
        {
          id: 'ev-edukasi-merah',
          title: '3. Edukasi — Segera Kembali Jika Ada Ini',
          description: 'Instruksikan pasien kembali segera jika:\n• Muntah darah atau BAB hitam (melena)\n• Nyeri perut tiba-tiba sangat berat\n• Demam tinggi bersamaan dengan nyeri perut\n• Tidak bisa minum atau makan sama sekali\n• Pusing atau pingsan (tanda syok)',
          required: true,
          category: 'safety'
        },
        {
          id: 'ev-edukasi-umum',
          title: '4. Edukasi Jangka Panjang — Kontrol Faktor Risiko',
          description: 'Dispepsia cenderung kambuh jika faktor risiko tidak diubah:\n• Lanjutkan modifikasi gaya hidup (diet, stres, rokok)\n• Gunakan NSAID secara bijak — jika perlu NSAID jangka panjang, minta resep gastroproteksi (PPI bersamaan)\n• Timbang badan secara berkala — obesitas memperparah GERD/dispepsia',
          required: true,
          category: 'documentation'
        }
      ]
    }

  },
  references: [
    'PGI (Perhimpunan Gastroenterologi Indonesia). Konsensus Nasional Penatalaksanaan Dispepsia dan Infeksi Helicobacter pylori di Indonesia. Revisi 2021.',
    'KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP. Kemenkes RI. Bab: Dispepsia.',
    'Malfertheiner P, et al. (European Hp Study Group). Management of Helicobacter pylori infection — The Maastricht V/Florence Consensus Report. Gut. 2017;66(1):6–30.',
    'Moayyedi P, et al. ACG and CAG Clinical Guideline: Management of Dyspepsia. Am J Gastroenterol. 2017;112(7):988–1013.',
    'Ford AC, et al. Helicobacter pylori eradication therapy to prevent gastric cancer. Gut. 2020;69(12):2113–2128.',
    'Soll AH. Gastric, duodenal, and stress ulcer. In: Sleisenger and Fordtrans Gastrointestinal and Liver Disease, 10th edition. Philadelphia: Elsevier, 2016.'
  ]
};
