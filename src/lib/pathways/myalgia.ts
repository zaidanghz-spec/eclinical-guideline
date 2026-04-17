// ============================================================
// MYALGIA / NYERI OTOT NON-SPESIFIK
// ICD-10: M79.1
// Referensi:
// - KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP (Panduan Praktik Klinis)
// - Konsensus Nyeri Musculoskeletal PIRA (Perhimpunan Reumatologi Indonesia)
// Setting: Klinik / FKTP
// Alat: TTV, Termometer, Tensimeter
// Prinsip: Diagnosis eksklusi. Singkirkan red flags (infeksi sistemik, statin-induced, rhabdomyolysis, polimialgia reumatika) sebelum mendiagnosis myalgia tegang otot biasa.
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const myalgiaPathway: DynamicPathway = {
  diseaseId: 'myalgia',
  diseaseName: 'Myalgia / Nyeri Otot Non-Spesifik (PPK FKTP)',
  startNodeId: 'myalgia-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT
    // ============================================================
    'myalgia-initial-assessment': {
      id: 'myalgia-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis, TTV & Pemeriksaan Fisik',
      description: 'Myalgia (nyeri otot) sangat umum di poliklinik primer. Biasanya akibat tegang otot atau aktivitas fisik berlebih. Namun, myalgia BISA menjadi gejala awal infeksi sistemik (dengue, leptospirosis) atau efek samping obat. Lakukan skrining menyeluruh.',
      items: [
        {
          id: 'mya-anamnesis-nyeri',
          title: 'Anamnesis — Karakteristik Nyeri Otot',
          description: 'Lakukan evaluasi etiologi nyeri (PQRST):\n• Provocating: apa yang memicu? (olahraga, angkat berat, postur buruk)\n• Quality: pegal, kram, ketarik?\n• Region: terlokalisir (1 area) atau difus (seluruh tubuh)?\n• Onset: tiba-tiba atau bertahap?\n• Time: sudah berapa lama? Pegal pagi hari (morning stiffness)?\n\nNyeri terlokalisir → curiga tegang otot/cedera.\nNyeri difus/seluruh tubuh → curiga infeksi virus, kelelahan kronis, atau efek obat.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'mya-anamnesis-penyerta',
          title: 'Anamnesis — Gejala Penyerta & Riwayat Obat',
          description: 'Pertanyaan penting:\n• Demam? (Hati-hati: Dengue, Chikungunya, Leptospirosis, Influenza sering presentasi myalgia difus + demam)\n• Kelemahan otot yang nyata? (Sulit berdiri dari duduk, sulit angkat tangan)\n• Warna urin gelap seperti teh? (Curiga rhabdomyolysis)\n• Baru minum obat Kholesterol (Statin)?\n• Riwayat trauma otot baru-baru ini?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'mya-red-flags',
          title: '⚠️ Skrining RED FLAGS — Hati-Hati Penyebab Serius!',
          description: 'Hati-hati dan periksa lebih lanjut jika ada:\n• Kelemahan otot progresif yang nyata (paresis)\n• Urin berwarna gelap / coklat tua (rhabdomyolysis)\n• Demam tinggi mendadak (infeksi sistemik)\n• Myalgia sangat berat disertai pasien syok/toksik\n• Usia > 50 tahun dengan nyeri bahu/panggul & kaku pagi hari > 45 menit (Polymyalgia Rheumatica)\n• Riwayat konsumsi statin akut dengan nyeri otot berat',
          required: true,
          category: 'safety'
        },
        {
          id: 'mya-ttv',
          title: 'TTV — Suhu, TD, Nadi, SpO₂',
          description: 'Suhu: ≥ 38°C + myalgia → curiga Myalgia Infeksiosa (virus/bakteri).\nNadi: takikardia → bisa karena dehidrasi (infeksi) atau nyeri hebat.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'mya-pemfis-lokal',
          title: 'Pemeriksaan Fisik — Area Nyeri (Muskuloskeletal & Neurologis)',
          description: '1. Inspeksi: ada bengkak memerah (inflamasi)? ada memar teraba keras (hematoma/compartment)?\n2. Palpasi: raba otot yang nyeri — teraba spasme/kaku? Adakah nyeri tekan fokal? Adakah bengkak sendi (arthritis — bukan myalgia)?\n3. Neurologis Bedside: Tes kekuatan motorik (cukup tahanan tangan) dan refleks patella kasar. Jika ada kelemahan motorik nyata → BUKAN myalgia biasa (→ rujuk neuro).',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'myalgia-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION
    // ============================================================
    'myalgia-triage-decision': {
      id: 'myalgia-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Klasifikasi Nyeri Otot Berdasarkan Asesmen',
      description: 'Tentukan jalur penanganan myalgia berdasarkan ada/tidaknya red flag dan gejala penyerta.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'mya-redflag-rujuk',
          title: '🔴 RED FLAG / KEGAWATAN — Rhabdomyolysis / Kelemahan Signifikan',
          description: 'Ada urin warna teh, kelemahan motorik nyata, atau myalgia berat akibat statin. Rujuk IGD/RS untuk evaluasi CPK dan hidrasi IV.',
          color: 'red',
          nextNodeId: 'myalgia-redflag-rujuk',
          riskLevel: 'high'
        },
        {
          id: 'mya-infeksi',
          title: '🟠 MYALGIA INFEKSIOSA — Myalgia Difus + Demam',
          description: 'Myalgia difus seluruh tubuh disertai demam, kemungkinan prodromal infeksi virus (dengue, flu, leptospirosis). Pantau arah infeksi tropis.',
          color: 'orange',
          nextNodeId: 'myalgia-infeksi-management',
          riskLevel: 'medium'
        },
        {
          id: 'mya-mekanik',
          title: '🟢 MYALGIA MEKANIK — Tegang Otot Terlokalisir, Tanpa Red Flag',
          description: 'Nyeri otot 1–2 area (mis. punggung, leher, betis), riwayat aktivitas, tanpa demam, tanpa kelemahan. Myalgia M79.1 murni kelas primer.',
          color: 'green',
          nextNodeId: 'myalgia-mekanik-management',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: RED FLAG / RUJUK
    // ============================================================
    'myalgia-redflag-rujuk': {
      id: 'myalgia-redflag-rujuk',
      type: 'checklist',
      title: 'Node 3A: Red Flags — Evaluasi Lanjut / Rujuk',
      description: 'Keadaan yang tidak dapat ditangani hanya dengan pereda nyeri di klinik primer. Dibutuhkan lab (CPK, ureum/kreatinin, elektrolit) atau konsultasi.',
      items: [
        {
          id: 'rjf-urinteh-hidrasi',
          title: '1. Jika Urin Hitam / Mengaku Kelemahan Hebat',
          description: 'Curiga Rhabdomyolysis!\n→ Pasang IV line dengan NaCl 0.9% (Normal Saline). Hidrasi agresif segera untuk mencegah GGA (Acute Kidney Injury).\n→ JANGAN beri NSAID (diklofenak/ibuprofen/meloksikam) — bahaya untuk ginjal.\n→ Rujuk CITO ke IGD RS untuk lab enzim otot (CPK) dan fungsi ginjal.',
          required: true,
          category: 'action'
        },
        {
          id: 'rjf-statin-stop',
          title: '2. Jika Konsumsi Obat Kolesterol (Statin)',
          description: 'SAMS (Statin-Associated Muscle Symptoms) — nyeri otot difus, kram, yang muncul minggu/bulan pertama konsumsi Simvastatin/Atorvastatin/Rosuvastatin.\n→ STOP obat statin segera.\n→ Edukasi pasien bahwa nyeri akan berkurang setelah obat dihentikan (2–4 minggu).\n→ Rujuk Spesialis Penyakit Dalam untuk ganti terapi lipid jika nyeri hebat.',
          required: true,
          category: 'medication'
        },
        {
          id: 'rjf-polimialgia-cek',
          title: '3. Jika Usia > 50 + Kaku Pagi Hari (Polymyalgia Rheumatica)',
          description: 'Nyeri otot + kaku di bahu, leher, atau panggul tiap pagi > 45 menit pada orang tua (bukan nyeri sendi, tapi otot proksimal).\n→ PPK menyarankan rujuk SpPD/Konsultan Reumatologi untuk pertimbangan terapi kortikosteroid.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3B: MYALGIA INFEKSIOSA
    // ============================================================
    'myalgia-infeksi-management': {
      id: 'myalgia-infeksi-management',
      type: 'checklist',
      title: 'Node 3B: Myalgia Infeksiosa — Demam & Nyeri Difus',
      description: 'Ini adalah myalgia sekunder akibat infeksi (gejala prodromal). Pengobatan kausatif & simptomatis ringan wajib dilakukan, hindari obat keras sebelum diagnosis tegak.',
      items: [
        {
          id: 'inf-parasetamol',
          title: '1. Analgetik/Antipiretik Aman — Parasetamol Utama',
          description: 'Gunakan Parasetamol 500–1000 mg tiap 6–8 jam.\n⚠️ JANGAN BERI NSAID / KORTIKOSTEROID pada hari 1–3 demam!\nJika ini adalah Demam Berdarah Dengue (DBD) awal, NSAID meningkatkan risiko perdarahan GI.',
          required: true,
          category: 'medication'
        },
        {
          id: 'inf-hidrasi',
          title: '2. Hidrasi Oral Cukup',
          description: 'Anjurkan pasien minum cukup air putih 2 L/hari tubuh. Dehidrasi akibat demam dapat memperparah rasa myalgia.',
          required: true,
          category: 'action'
        },
        {
          id: 'inf-pemantauan-infeksi',
          title: '3. Pemantauan Tanda Penyakit Tropis',
          description: 'Lakukan edukasi tanda darurat:\nBila demam sudah > 3 hari → minta test darah rutin/NS1.\nBila ada bintik merah, gusi berdarah, mual hebat, atau nyeri betis hebat pasca banjir (Lepto) → segera kembali ke faskes.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'myalgia-edukasi-followup'
    },

    // ============================================================
    // NODE 3C: MYALGIA MEKANIK / TEGANG OTOT TERLOKALISIR
    // ============================================================
    'myalgia-mekanik-management': {
      id: 'myalgia-mekanik-management',
      type: 'checklist',
      title: 'Node 3C: Myalgia Mekanik — Tatalaksana Konservatif',
      description: 'Nyeri terlokalisir sekunder dari spasme, otot kaku atau mikrotrauma otot akibat aktivitas repetitif, posisi statis lama, atau olahraga. PPK menganjurkan terapi farmakologi dan non-farmakologi bersamaan.',
      items: [
        {
          id: 'mek-analgetik',
          title: '1. Analgetik Lini Pertama / NSAID Oral',
          description: 'Pilih salah satu (Berikan maksimal 5–7 hari):\n• Ibuprofen 400 mg 3x/hari sesudah makan\n• Natrium Diklofenak 25–50 mg 2–3x/hari\n• Meloksikam 7.5–15 mg 1x/hari\n• Parasetamol 500mg 3x/hari (Pilihan jika pasien lansia/ada riwayat maag)',
          required: true,
          category: 'medication'
        },
        {
          id: 'mek-relaksan-otot',
          title: '2. Muscle Relaxant (Bila Disertai Spasme/Kaku Hebat)',
          description: 'Tambahkan perelaksasi otot jangka sangat pendek (3–5 hari) jika palpasi otot sangat keras / spasme gerak:\n• Eperisone HCl 50 mg 3x/hari\n• ATAU Diazepam 2 mg 2x/hari (hati-hati sedasi)',
          required: false,
          category: 'medication'
        },
        {
          id: 'mek-topikal-patch',
          title: '3. Analgetik Topikal / Patch (Sangat Dianjurkan)',
          description: 'Krim natrium diklofenak 1%, krim capsaicin, menthol, atau plester analgetik.\nMemiliki profil keamanan jauh lebih baik dari obat oral untuk myalgia fokal ringan. Gosok area yang pegal secukupnya 3–4x sehari.',
          required: true,
          category: 'medication'
        },
        {
          id: 'mek-rice',
          title: '4. Non-Farmako: Prinsip Rest & Kompres',
          description: '• REST: Istirahatkan otot yang nyeri 1–2 hari dari aktivitas berat/mengangkat\n• HEAT/COLD: Kompres es jika < 48 jam paska cedera aktivitas. Kompres hangat jika pegal kronik / > 48 jam.\n• GENTLE STRETCHING: Lakukan peregangan otot perlahan 3x/hari.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'myalgia-edukasi-followup'
    },

    // ============================================================
    // NODE 4: EDUKASI & PROGNOSIS
    // ============================================================
    'myalgia-edukasi-followup': {
      id: 'myalgia-edukasi-followup',
      type: 'checklist',
      title: 'Node 4: Edukasi Pasien, Ergonomi & Kriteria Kembali',
      description: 'Edukasi memegang peranan krusial untuk mencegah myalgia mekanik berulang.',
      items: [
        {
          id: 'edu-ergonomi',
          title: '1. Edukasi Postur & Ergonomi (Penting!)',
          description: '• Anjurkan tidak dalam satu posisi yang sama > 1-2 jam. Berdiri dan stretching setelah duduk lama di depan laptop.\n• Angkat barang: berjongkok dulu, lalu berdiri dengan punggung lurus (angkat menggunakan paha, BUKAN punggung).\n• Tidur dengan bantal yang sejajar postur leher.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-kepatuhan-obat',
          title: '2. Aturan Minum NSAID',
          description: 'Peringatkan pasien selalu minum Ibuprofen / Diklofenak / Meloksikam SETELAH MAKAN KEMAMPUAN untuk mencegah iritasi lambung.\nHentikan obat begitu otot terasa sembuh (jangan ditelan jangka rutin mingguan).',
          required: true,
          category: 'medication'
        },
        {
          id: 'edu-kapan-kembali',
          title: '3. Kapan Harus Kembali ke Faskes?',
          description: 'Pasien harus kembali bila:\n• Nyeri otot tidak membaik setelah 1 minggu pengobatan\n• Muncul demam tinggi mendadak\n• Timbul ruam di kulit\n• Rasa kebas atau kesemutan menjalar (suspek keterlibatan saraf / HNP)',
          required: true,
          category: 'safety'
        }
      ]
    }
  },
  references: [
    'KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP. Kemenkes RI. Bab: Nyeri muskuloskeletal.',
    'Ira E, et al. Konsensus Penatalaksanaan Nyeri Muskuloskeletal, Perhimpunan Reumatologi Indonesia (PIRA), Jakarta, 2016.',
    'American College of Rheumatology. Guidelines for the management of musculoskeletal pain. 2020.',
    'SAMS (Statin-Associated Muscle Symptoms) Clinical Pathway. European Atherosclerosis Society (EAS) Consensus Panel. 2015.'
  ]
};
