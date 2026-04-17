// ============================================================
// DIARE AKUT DEWASA
// ICD-10: A09 (Gastroenteritis infeksius akut)
// Referensi:
// - Konsensus Nasional Penatalaksanaan Diare pada Pasien Dewasa — PB PGI & PP PETRI 2024
// - KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
// - WHO Guidelines for Cholera Treatment. WHO/CDS/SER/GIS/2004.6
// - ACG Clinical Guideline: Management of Acute Diarrhea. Am J Gastroenterol. 2016
// Setting: Klinik / FKTP
// Alat: TTV (Tensi, Termometer, Oksimetri), EKG, Suction, Nebulizer
// TIDAK ADA: Kultur feses, PCR feses, kolonoskopi
// Prinsip: Penilaian dehidrasi → Tatalaksana cairan → Tentukan perlu antibiotik?
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const diareDewasaPathway: DynamicPathway = {
  diseaseId: 'acute-gastroenteritis',
  diseaseName: 'Diare Akut Dewasa (Konsensus PGI & PETRI 2024)',
  startNodeId: 'diare-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT — Anamnesis + TTV + Pemfis
    // ============================================================
    'diare-initial-assessment': {
      id: 'diare-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis, TTV & Pemeriksaan Fisik',
      description: 'Prioritas utama: nilai status dehidrasi dan apakah ada tanda kegawatan (syok, sepsis). Dehidrasi berat dan syok septik adalah penyebab kematian akibat diare yang dapat dicegah.',
      items: [
        {
          id: 'dr-anamnesis-diare',
          title: 'Anamnesis — Karakteristik Diare',
          description: 'Tanyakan:\n• Frekuensi: berapa kali BAB per hari?\n• Konsistensi: cair seperti air, berlendir, atau berdarah?\n• Volume: sedikit tapi sering atau banyak setiap kali?\n• Warna: kuning, hijau, kehitaman?\n• Nyeri perut: ada kram? Di mana?\n• Demam: suhu berapa? Kapan mulai?\n• Sudah berapa hari diare?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dr-anamnesis-durasi',
          title: 'Anamnesis — Durasi & Klasifikasi Diare',
          description: 'Klasifikasi penting untuk pilihan terapi:\n• AKUT: < 14 hari (kebanyakan infeksi)\n• PERSISTEN: 14–30 hari\n• KRONIK: > 30 hari (arahkan ke investigasi lanjut)\n\nFokus pathway ini: DIARE AKUT (< 14 hari).\nJika persisten/kronik → evaluasi penyebab lain (IBD, malabsorpsi, parasit) + rujuk.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dr-anamnesis-penyerta',
          title: 'Anamnesis — Gejala Penyerta & Faktor Risiko',
          description: 'Tanyakan:\n• Mual dan muntah: seberapa sering?\n• Bisa minum oral atau muntah setiap minum?\n• Riwayat makan apa sebelumnya? Makanan tidak matang, warung baru, air tidak bersih?\n• Baru bepergian ke daerah endemik? (Traveler\'s Diarrhea)\n• Riwayat konsumsi antibiotik dalam 3 bulan terakhir? → risiko C. difficile\n• Kontak dengan orang diare serumah?\n• Status imun: DM, HIV, atau dalam kemoterapi?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dr-alarm-features',
          title: '⚠️ Skrining ALARM FEATURES — Perlu Penanganan Lebih Lanjut',
          description: 'Tandai jika ada:\n• BAB berdarah atau berlendir banyak (disentri)\n• Demam > 38.5°C yang menetap > 72 jam\n• Penurunan berat badan drastis\n• Anemia\n• Usia > 50 tahun onset baru\n• Riwayat IBD atau keganasan GI dalam keluarga\n• Pasien immunocompromised (HIV, kemoterapi, transplantasi)\n• Tidak ada perbaikan setelah antibiotik empiris 3 hari',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'dr-ttv',
          title: 'TTV + Penilaian Dehidrasi (PRIORITAS!)',
          description: 'Tekanan Darah + Nadi: sistolik < 90, nadi > 100 → SYOK HIPOVOLEMIK!\nSuhu: > 38.5°C → curiga diare inflamatorik/bakterial\nSpO₂: biasanya normal pada diare murni\n\nTes ortostatik: ukur TD baring vs berdiri (drop SBP ≥ 20 mmHg = dehidrasi moderat-berat)\n\nSKOR DALDIYONO untuk estimasi defisit cairan (dehidrasi berat):\nKebutuhan IV (L) = (Skor/15) × 10% × BB(kg)',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dr-derajat-dehidrasi',
          title: 'Nilai Derajat Dehidrasi',
          description: 'RINGAN (< 5% BB hilang): haus, mukosa sedikit kering, normal aktif\nSEDANG (5–10% BB hilang): haus, mata cekung, turgor menurun, mukosa kering, urin sedikit\nBERAT (> 10% BB hilang): lemas/letargi, mata sangat cekung, turgor sangat lambat, tidak bisa minum, nadi cepat & lemah\nSYOK: TD < 90, nadi > 120, akral dingin, CRT > 2 detik, kesadaran menurun',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dr-pemfis-abdomen',
          title: 'Pemeriksaan Fisik Abdomen',
          description: 'Inspeksi: distensi? (curiga ileus/peritonitis)\nAuskultasi: bising usus hiperperistaltik (diare) atau tidak ada (ileus paralitik)\nPerkusi: tympani\nPalpasi: nyeri tekan? Defans muskular/rigiditas → tanda PERITONITIS → rujuk bedah!\nPeriksa: tanda-tanda dehidrasi (mata cekung, turgor, mukosa mulut)',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'diare-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE — BERAT ATAU RINGAN?
    // ============================================================
    'diare-triage-decision': {
      id: 'diare-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Status Dehidrasi & Jenis Diare',
      description: 'Tentukan jalur berdasarkan beratnya dehidrasi dan karakter diare.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'dir-syok',
          title: '🔴 SYOK HIPOVOLEMIK — TD < 90, Nadi > 100, Akral Dingin',
          description: 'Dehidrasi berat disertai syok. Resusitasi cairan IV agresif SEGERA + rujuk IGD RS.',
          color: 'red',
          nextNodeId: 'diare-syok-management',
          riskLevel: 'high'
        },
        {
          id: 'dir-inflamatorik',
          title: '🟠 DIARE INFLAMATORIK / DISENTRI — BAB Berdarah/Lendir + Demam',
          description: 'BAB berdarah/berlendir, demam > 38.5°C, tanda sepsis. Butuh antibiotik empiris.',
          color: 'orange',
          nextNodeId: 'diare-inflamatorik',
          riskLevel: 'high'
        },
        {
          id: 'dir-non-inflamatorik',
          title: '🟢 DIARE NON-INFLAMATORIK — Cair Tanpa Darah, Tanpa Demam Tinggi',
          description: 'Diare cair tanpa darah, tanpa demam berat, tanpa tanda sepsis. Etiologi viral/toksin. Terapi: rehidrasi + suportif.',
          color: 'green',
          nextNodeId: 'diare-non-inflamatorik',
          riskLevel: 'low'
        },
        {
          id: 'dir-kronik',
          title: '🔵 DIARE PERSISTEN / KRONIK — > 14 Hari atau Alarm Features',
          description: 'Durasi > 14 hari, atau tidak respons antibiotik empiris 3 hari, atau ada alarm features. Perlu investigasi lanjut — rujuk.',
          color: 'blue',
          nextNodeId: 'diare-kronik-rujuk',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 3A: SYOK HIPOVOLEMIK
    // ============================================================
    'diare-syok-management': {
      id: 'diare-syok-management',
      type: 'checklist',
      title: 'Node 3A: Syok Hipovolemik — Resusitasi Agresif & Rujuk IGD',
      description: 'Syok pada diare = kehilangan cairan massif. Target: pemulihan tekanan darah dan perfusi organ sebelum rujuk.',
      items: [
        {
          id: 'syok-posisi-iv',
          title: '1. Posisi Trendelenburg + IV Line 2 Jalur',
          description: 'Posisikan kaki lebih tinggi dari kepala (Trendelenburg). Pasang IV line 2 jalur besar (18G atau lebih). Mulai resusitasi cairan segera.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'syok-cairan-agresif',
          title: '2. Resusitasi Cairan IV Agresif',
          description: 'Bolus RL 500–1000 mL cepat (15–30 menit). Ulangi evaluasi TTV setelah setiap 500 mL.\nTarget: TD sistolik > 90 mmHg, nadi < 100, CRT < 2 detik.\nFormula Daldiyono jika kholera/dehidrasi berat:\nKebutuhan IV (L) = (Skor/15) × 10% × BB(kg)\n\nBerikan 50% dalam 1 jam pertama, sisa dalam 2–3 jam berikutnya.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'syok-o2-monitor',
          title: '3. O₂ + Monitor TTV Kontinu',
          description: 'Pasang oksimetri kontinu. Jika SpO₂ < 94% → O₂ nasal kanul 2–4 L/menit. Monitor TD, nadi, CRT tiap 15 menit. Pasang kateter urin jika tersedia — pantau produksi urin (target > 0.5 mL/kg/jam).',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'syok-npo',
          title: '4. NPO (Puasa Oral) + Suction Standby',
          description: 'Hentikan makan dan minum per oral jika syok atau muntah masif. Siapkan suction untuk antisipasi muntah dan aspirasi. JANGAN beri Loperamide pada pasien syok.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'syok-rujuk',
          title: '5. RUJUK IGD RS — Sambil Resusitasi Jalan',
          description: 'Hubungi RS tujuan terlebih dahulu. Transportasi dengan ambulans. Infus IV tetap jalan selama perjalanan. Dokter pendamping wajib ada.\nSurat rujukan: TTV serial, volume cairan yang sudah diberikan, estimasi kehilangan cairan, waktu onset.',
          required: true,
          category: 'documentation',
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 3B: DIARE INFLAMATORIK/DISENTRI
    // ============================================================
    'diare-inflamatorik': {
      id: 'diare-inflamatorik',
      type: 'checklist',
      title: 'Node 3B: Diare Inflamatorik / Disentri — Rehidrasi + Antibiotik Empiris',
      description: 'Diare dengan darah/lendir dan demam → curiga bakteri invasif (Shigella, Salmonella, Campylobacter, E. coli EIEC). Antibiotik empiris berdasarkan panduan PGI & PETRI 2024.',
      items: [
        {
          id: 'inf-rehidrasi',
          title: '1. Rehidrasi (Sesuai Derajat Dehidrasi)',
          description: 'RINGAN-SEDANG: oralit 400–600 mL/jam selama 2 jam pertama, lalu 200–400 mL tiap BAB atau muntah.\nBERAT atau tidak bisa minum: IV RL atau NaCl 0.9% sesuai estimasi defisit.\n\nJangan hentikan makan — lanjutkan diet lunak rendah serat (BRAT: banana, rice, applesauce, toast).',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'inf-antibiotik',
          title: '2. Antibiotik Empiris (Konsensus PGI & PETRI 2024)',
          description: 'Lini pertama (Asia Tenggara, hindari resistensi Campylobacter terhadap kuinolon):\n• Azitromisin 500 mg 1× sehari selama 3 hari\n\nAlternatif:\n• Siprofloksasin 500 mg 2× sehari selama 3 hari\n• Levofloksasin 500 mg 1× sehari selama 3 hari\n\nKhusus C. difficile (diare pasca antibiotik): Metronidazole 500 mg 3× sehari × 10–14 hari.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'inf-hindari-loperamide',
          title: '3. ⚠️ KONTRAINDIKASI Loperamide pada Disentri!',
          description: 'Loperamide (antimotilitas) DILARANG pada diare berdarah atau demam tinggi.\nAlasan: memperlambat transit usus → bakteri invasif tertahan lebih lama → risiko komplikasi: megakolon toksik, sepsis sistemik, invasi dinding usus.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'inf-probiotik',
          title: '4. Probiotik — Cegah Antibiotik-Associated Diarrhea (AAD)',
          description: 'Berikan probiotik bersamaan dengan antibiotik:\n• Lactobacillus rhamnosus GG ≥ 2×10⁹ CFU/hari\n• ATAU Saccharomyces boulardii 1×10¹⁰ CFU/hari\n\nDiminum 2 jam terpisah dari antibiotik. Bukti kuat untuk pencegahan AAD (Cochrane 2013: NNT = 8).',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'inf-evaluasi-48-jam',
          title: '5. Evaluasi dalam 48–72 Jam',
          description: 'Pasien harus kembali dalam 48–72 jam:\n• Membaik (demam turun, BAB berdarah berkurang) → lanjut antibiotik sampai 3 hari\n• Tidak membaik atau memburuk → pertimbangkan: salah diagnosis, resistensi antibiotik, komplikasi (perforasi, megakolon) → RUJUK RS',
          required: true,
          category: 'documentation',
          role: 'both',
        }
      ],
      nextNodeId: 'diare-edukasi-followup'
    },

    // ============================================================
    // NODE 3C: DIARE NON-INFLAMATORIK
    // ============================================================
    'diare-non-inflamatorik': {
      id: 'diare-non-inflamatorik',
      type: 'checklist',
      title: 'Node 3C: Diare Non-Inflamatorik (Cair, Tanpa Darah) — Rehidrasi & Suportif',
      description: 'Mayoritas adalah viral (Norovirus, Rotavirus) atau toksin bakteri (Staphylococcus, B. cereus) — bersifat self-limiting 3–5 hari. Antibiotik TIDAK dianjurkan. Fokus: rehidrasi dan simptomatis.',
      items: [
        {
          id: 'non-rehidrasi',
          title: '1. Rehidrasi Oral — Prioritas Utama!',
          description: 'ORALIT (Oral Rehydration Solution):\n• Ringan: 400–600 mL/jam selama 2 jam pertama, lalu 200 mL tiap BAB cair\n• Sedang: 80–100 mL/kg dalam 3 jam\n• Berat/tidak bisa minum/muntah profus: IV RL kristaloid\n\nJika tidak punya oralit: air matang + gula 1 sdm + garam ½ sdt per 300 mL air.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'non-loperamide',
          title: '2. Loperamide (Anti-Motilitas) — Simptomatis',
          description: 'Loperamide BOLEH diberikan pada diare non-inflamatorik tanpa demam:\n• Dosis awal: 4 mg oral\n• Kemudian: 2 mg setiap BAB cair\n• Maksimum: 16 mg/hari (dewasa), 8 mg/hari (lansia)\n• Maksimum penggunaan: 48 jam\n\nManfaat: memperpendek durasi diare ~1.5 hari, kurangi frekuensi 16%.\n\n⚠️ HENTIKAN jika: 42 jam tidak membaik, demam muncul, BAB berdarah muncul.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'non-probiotik',
          title: '3. Probiotik (Dianjurkan)',
          description: 'Konsensus PGI 2024 merekomendasikan probiotik untuk semua diare akut:\n• Lactobacillus acidophilus + rhamnosus: 3× 2 kapsul/hari selama 7 hari\n• ATAU Lactobacillus rhamnosus GG ≥ 2×10⁹ CFU/hari\n• ATAU Saccharomyces boulardii\n\nBukti: mempersingkat durasi diare hingga 24 jam (Cochrane 2010).',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'non-jangan-antibiotik',
          title: '4. ⚠️ JANGAN Antibiotik untuk Diare Viral/Toksin!',
          description: 'Antibiotik TIDAK diperlukan untuk diare cair tanpa darah dan tanpa demam tinggi.\nAlasan: mayoritas adalah virus (self-limiting). Antibiotik tidak berpengaruh pada toksin bakteri (S. aureus, B. cereus).\n\nPenggunaan antibiotik berlebihan → resistensi bakteri dan AAD (Antibiotic-Associated Diarrhea).',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'non-diet',
          title: '5. Diet & Edukasi Selama Diare',
          description: 'Lanjutkan makan ringan — BRAT diet: pisang, nasi, apel kukus, roti tawar.\nHindari: susu sapi (laktosa), makanan berlemak, makanan pedas, kafein dan alkohol.\nMinum air atau oralit lebih banyak dari biasa.\nCuci tangan dengan sabun sebelum makan dan setelah BAB.',
          required: true,
          category: 'action',
          role: 'both',
        }
      ],
      nextNodeId: 'diare-edukasi-followup'
    },

    // ============================================================
    // NODE 3D: KRONIK / ALARM — RUJUK
    // ============================================================
    'diare-kronik-rujuk': {
      id: 'diare-kronik-rujuk',
      type: 'checklist',
      title: 'Node 3D: Diare Kronik / Alarm Features — Siapkan Rujukan',
      description: 'Diare > 14 hari, tidak respons terapi, atau ada alarm features perlu investigasi lanjutan yang tidak tersedia di klinik primer.',
      items: [
        {
          id: 'kro-simptomatis',
          title: '1. Terapi Simptomatis Sambil Menunggu Rujukan',
          description: 'Jika tidak ada tanda disentri (tanpa darah, tanpa demam tinggi): boleh coba Loperamide 2–4 mg sebelum makan/aktivitas untuk kenyamanan.\nTrial diet rendah laktosa atau FODMAP rendah (karbohidrat fermentasi) jika dicurigai IBS/malabsorpsi laktosa.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'kro-rujuk-investigasi',
          title: '2. RUJUK untuk Investigasi Lanjutan ke SpPenyakit Dalam / Gastroenterologi',
          description: 'Pemeriksaan yang diperlukan di faskes lanjutan:\n• Kultur feses (sensitifitas rendah 2%, tapi standar untuk panduan)\n• PCR multipleks feses (GI Syndromic Panel) — lebih sensitif\n• Fecal Calprotectin — marker inflamasi usus (IBD vs IBS)\n• Celiac marker (anti-tTG IgA) jika curigai celiac\n• Kolonoskopi/biopsi jika alarm features (+)',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'kro-surat-rujukan',
          title: '3. Surat Rujukan Lengkap',
          description: 'Cantumkan: durasi diare, frekuensi per hari, karakter feses, alarm features yang ada, riwayat pengobatan dan respons, riwayat antibiotik, riwayat bepergian.\nKlasifikasikan untuk RS tujuan: apakah diare osmotik, sekretori, inflamatorik, malabsorpsi, atau fungsional?',
          required: true,
          category: 'documentation',
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 4: EDUKASI & FOLLOW-UP
    // ============================================================
    'diare-edukasi-followup': {
      id: 'diare-edukasi-followup',
      type: 'checklist',
      title: 'Node 4: Edukasi Pasien & Kriteria Kembali Segera',
      description: 'Edukasi penting untuk mencegah dehidrasi di rumah dan mengenali tanda bahaya.',
      items: [
        {
          id: 'edu-rehidrasi-rumah',
          title: '1. Edukasi Rehidrasi Mandiri di Rumah',
          description: 'Minum oralit atau cairan elektrolit setiap kali BAB cair.\nJika tidak ada oralit: air matang + 1 sdm gula + ½ sdt garam per 300 mL.\nJangan minum cairan yang terlalu manis (jus kemasan, soft drink) — memperparah diare osmotik.',
          required: true,
          category: 'documentation',
          role: 'both',
        },
        {
          id: 'edu-higienitas',
          title: '2. Higienitas untuk Cegah Penularan',
          description: 'Cuci tangan 20 detik dengan sabun sebelum makan, setelah BAB, setelah menyentuh pasien.\nJangan berbagi peralatan makan. Memasak makanan hingga matang sempurna.\nAir minum harus masak atau air kemasan terpercaya.',
          required: true,
          category: 'documentation',
          role: 'both',
        },
        {
          id: 'edu-red-flags-kembali',
          title: '3. Kembali Segera / Ke IGD Jika Ada Ini',
          description: 'Instruksikan kembali segera jika:\n• Tidak bisa minum sama sekali atau muntah setiap kali minum\n• Pusing, hampir pingsan, atau sudah pingsan\n• BAB hitam (melena) atau berdarah banyak tiba-tiba\n• Demam tinggi > 39°C yang menetap\n• Tidak ada BAK > 8 jam (tanda dehidrasi berat)\n• Kesadaran menurun atau anak rewel dan lesu extreme',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'edu-jadwal-kontrol',
          title: '4. Jadwal Kontrol & Evaluasi Respons',
          description: 'Diare non-inflamatorik: kembali jika tidak membaik dalam 3–5 hari.\nDiare inflamatorik dengan antibiotik: kembali dalam 48–72 jam untuk evaluasi.\nJika membaik penuh → tidak perlu kembali.\nJika tidak membaik → eskalasi terapi atau rujuk.',
          required: true,
          category: 'documentation',
          role: 'both',
        }
      ]
    }

  },
  references: [
    'PB PGI & PP PETRI. Konsensus Nasional Penatalaksanaan Diare pada Pasien Dewasa di Indonesia. 2024.',
    'KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP. Kemenkes RI. Bab: Diare Akut.',
    'Guerrant RL, et al. Practice Guidelines for the Management of Infectious Diarrhea. Clinical Infectious Diseases. 2001;32(3):331–350.',
    'Riddle MS, et al. ACG Clinical Guideline: Diagnosis, Treatment, and Prevention of Acute Diarrheal Infections in Adults. Am J Gastroenterol. 2016;111(5):602–622.',
    'Guarino A, et al. ESPGHAN/ESPID Evidence-Based Guidelines for the Management of Acute Gastroenteritis. J Pediatr Gastroenterol Nutr. 2014.',
    'Allen SJ, et al. Probiotics for treating acute infectious diarrhoea. Cochrane Database of Systematic Reviews. 2010.',
    'WHO. The Treatment of Diarrhoea: A Manual for Physicians and Other Senior Health Workers. 4th edition. WHO Document WHO/CDD/SER/80.2. Geneva, 2005.'
  ]
};
