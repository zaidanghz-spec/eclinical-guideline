// ============================================================
// BENIGN PAROXYSMAL POSITIONAL VERTIGO (BPPV)
// ICD-10: H81.1
// Referensi:
// - PPK Neurologi PERDOSSI 2023
// - Barany Society Diagnostic Criteria 2015 (J Vestib Res 2015;25:105-117)
// - AAO-HNS Clinical Practice Guideline: BPPV 2017 (Otolaryngol Head Neck Surg 2017;156:S1-S47)
// - Hilton M, Pinder D. Cochrane Review: Epley (CRT) for BPPV 2014
// - KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
// Setting: Klinik / FKTP
// Alat: TTV (Tensi, Termometer, Oksimetri), EKG, Suction
// Prinsip: Diagnosis BPPV adalah KLINIS — tidak perlu imaging atau lab
// CRT (Canalith Repositioning Therapy) dapat dilakukan di klinik manapun
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const bppvPathway: DynamicPathway = {
  diseaseId: 'vertigo',
  diseaseName: 'BPPV — Benign Paroxysmal Positional Vertigo (PERDOSSI 2023)',
  startNodeId: 'bppv-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT — Anamnesis + TTV + Pemfis
    // ============================================================
    'bppv-initial-assessment': {
      id: 'bppv-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis, TTV & Pemeriksaan Fisik',
      description: 'BPPV = diagnosis klinis. Tidak perlu MRI/CT/audiometri untuk kasus tipikal. Siapkan suction di samping bed untuk antisipasi pasien mual/muntah selama manuver diagnostik.',
      items: [
        {
          id: 'bppv-anamnesis-vertigo',
          title: 'Anamnesis — Karakteristik Vertigo Posisional',
          description: 'Vertigo BPPV tipikal adalah:\n• Sensasi berputar yang dicetuskan perubahan posisi kepala: berbaring, miring kanan/kiri, menoleh, menengadah, membungkuk\n• Episodik dan singkat: umumnya < 1 menit per episode\n• Tanyakan: posisi spesifik apa yang memicu?\n• Mual sering ada, muntah bisa ada — tapi TIDAK ada gangguan pendengaran atau demam',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'bppv-anamnesis-ddx',
          title: 'Anamnesis — Singkirkan Penyebab Lain',
          description: 'BUKAN BPPV jika ada:\n• Tinnitus + gangguan pendengaran → curiga Meniere\n• Vertigo kontinu (terus-menerus) tanpa posisi → curiga Vestibular Neuritis\n• Defisit neurologis (kelemahan, bicara pelo) → curiga SENTRAL (stroke!)\n• Gangguan pendengaran tiba-tiba satu sisi → curiga Sudden SNHL',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'bppv-anamnesis-faktor-risiko',
          title: 'Anamnesis — Faktor Risiko & Riwayat',
          description: 'Faktor risiko BPPV: trauma kepala, bedrest lama, BPPV sebelumnya, osteoporosis, defisiensi Vitamin D (Jeong et al. Neurology 2020), riwayat otitis media.\nRiwayat obat: aminoglikosida, furosemide dosis tinggi, antihipertensi (hipotensi ortostatik), sedatif.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'bppv-red-flags',
          title: '⚠️ Skrining RED FLAGS — Vertigo Sentral (BUKAN BPPV)',
          description: 'RUJUK SEGERA jika ada SATU dari:\n• Diplopia, disartria, disfagia, hemiparesis\n• Ataksia berat (tidak bisa berjalan tanpa jatuh)\n• Penurunan kesadaran\n• Nyeri kepala hebat mendadak ("thunderclap")\n• Nistagmus vertikal murni (pure downbeat/upbeat) tanpa manuver\n• Defisit nervus kranialis\n\nJika red flag → STOP → jangan manuver → stabilisasi → rujuk IGD RS.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'bppv-ttv',
          title: 'TTV — TD, Nadi, Suhu, SpO₂',
          description: 'Tekanan Darah: ukur baring dan 3 menit berdiri. Drop sistolik ≥ 20 mmHg = hipotensi ortostatik → pusing bisa karena hemodinamik bukan BPPV!\nSuhu: demam + vertigo → curiga labyrinthitis/mastoiditis/SSP, bukan BPPV.\nSpO₂: < 94% → beri O₂, evaluasi penyebab lain.\nNadi: ireguler → rekam EKG (aritmia bisa menyebabkan presinkop menyerupai vertigo).',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'bppv-ekg',
          title: 'EKG 12-Lead — Singkirkan Penyebab Kardiak',
          description: 'Rekam EKG pada:\n• Usia > 60 tahun\n• Nadi ireguler (AF?)\n• Riwayat atau faktor risiko penyakit jantung\n• Pusing/presinkop yang lebih cocok dengan penyebab kardiak\n\nPada BPPV murni muda tanpa komorbid → EKG tidak wajib tapi dianjurkan sebagai safety-net.',
          required: false,
          category: 'assessment',
          role: 'both',
        },
        {
          id: 'bppv-pemfis-neuro',
          title: 'Pemeriksaan Fisik — Neurologis Bedside',
          description: 'GCS harus 15 pada BPPV. Periksa:\n• Gerakan bola mata: nistagmus spontan? (jika ada → curiga sentral)\n• Kekuatan motorik ekstremitas simetris\n• Koordinasi: finger-nose-finger, heel-shin\n• Tes Romberg: mata terbuka jatuh = serebelum (RED FLAG!)\n• Tes Fukuda: jalan di tempat 50 langkah mata tertutup — deviasi > 30° ke satu sisi = lesi vestibular\n• Pendengaran kasar (bisikan): asimetris? → curiga Meniere bukan BPPV',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'bppv-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION
    // ============================================================
    'bppv-triage-decision': {
      id: 'bppv-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage — Profil Vertigo Pasien Ini?',
      description: 'Berdasarkan anamnesis, TTV, EKG, dan pemeriksaan fisik, tentukan jalur tatalaksana.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'bppv-profile-perifer',
          title: '🟢 BPPV Tipikal — Perifer, Posisional, Stabil',
          description: 'Vertigo posisional episodik < 1 menit, tidak ada red flags neurologis, vital signs stabil, nadi reguler, EKG normal. Lanjut ke manuver diagnostik.',
          color: 'green',
          nextNodeId: 'bppv-manuver-diagnostik',
          riskLevel: 'low'
        },
        {
          id: 'bppv-profile-sentral',
          title: '🔴 RED FLAG (+) — Curiga Vertigo Sentral (Stroke!)',
          description: 'Ada defisit neurologis, nistagmus atipikal, atau tanda serebelar. Tidak dapat ditangani di klinik tanpa CT/MRI. Stabilisasi → Rujuk RS segera.',
          color: 'red',
          nextNodeId: 'bppv-sentral-rujuk',
          riskLevel: 'high'
        },
        {
          id: 'bppv-profile-kardiak',
          title: '🟠 EKG Abnormal — Curiga Penyebab Kardiak',
          description: 'EKG menunjukkan aritmia atau iskemia. Pusing mungkin presinkop kardiak bukan vertigo vestibular. Tatalaksana sesuai temuan EKG → jika perlu rujuk kardiologi.',
          color: 'orange',
          nextNodeId: 'bppv-kardiak-rujuk',
          riskLevel: 'high'
        },
        {
          id: 'bppv-profile-ortostatik',
          title: '🟡 Hipotensi Ortostatik Positif',
          description: 'Drop TD sistolik ≥ 20 mmHg saat berdiri. Pusing kemungkinan hemodinamik. Cari penyebab: dehidrasi, obat antihipertensi, neuropati otonom DM.',
          color: 'yellow',
          nextNodeId: 'bppv-ortostatik-management',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 3: MANUVER DIAGNOSTIK
    // ============================================================
    'bppv-manuver-diagnostik': {
      id: 'bppv-manuver-diagnostik',
      type: 'checklist',
      title: 'Node 3: Manuver Diagnostik & Identifikasi Kanal',
      description: 'Semua manuver hanya memerlukan tempat tidur periksa — tidak perlu alat vestibular khusus. Siapkan suction standby untuk antisipasi mual/muntah.',
      items: [
        {
          id: 'dm-siapkan-suction',
          title: '1. Siapkan Suction di Samping Bed',
          description: 'Manuver diagnostik sering memrovokasi vertigo dan mual hebat. Siapkan suction dan kantong muntah. Jelaskan prosedur kepada pasien: "Akan terjadi pusing sesaat, tapi aman dan tidak berbahaya."',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'dm-dix-hallpike',
          title: '2. Manuver Dix-Hallpike (Gold Standard — Kanal Posterior)',
          description: 'TEKNIK: Pasien duduk → kepala rotasi 45° ke sisi yang dicurigai → baring cepat dengan kepala menggantung 20–30° di bawah meja.\nOBSERVASI 30–60 detik:\n• Latensi nistagmus (1–5 detik) → khas BPPV\n• Nistagmus torsional ke telinga bawah + upbeat → kanal posterior\n• Durasi < 1 menit → khas BPPV\n• Fatigable (berkurang dengan pengulangan) → khas BPPV\n\nLakukan kiri dan kanan. Sisi yang lebih provokatif = sisi lesi.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dm-supine-roll',
          title: '3. Supine Roll Test (Kanal Horizontal)',
          description: 'TEKNIK: Terlentang dengan kepala diangkat 20–30° → putar kepala 90° ke kanan, observasi 30 detik → kembali tengah → putar ke kiri.\n\nHASIL:\n• Geotropic (nistagmus ke telinga bawah): kanalolitiasis — sisi nistagmus lebih kuat = sisi lesi\n• Apogeotropic (nistagmus ke telinga atas): kupulolitiasis — sisi nistagmus lebih lemah = sisi lesi',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'dm-dokumentasi',
          title: '4. Dokumentasi Nistagmus',
          description: 'Catat:\n• Manuver yang positif (Dix-Hallpike kanan/kiri atau Supine Roll kanan/kiri)\n• Arah komponen cepat nistagmus\n• Ada komponen torsional atau tidak\n• Latensi (detik), durasi (detik)\n• Fatigable (ya/tidak)\n\nNistagmus SENTRAL: tidak ada latensi, tidak fatigable, direction-changing spontan → RUJUK!',
          required: true,
          category: 'documentation',
          role: 'both',
        }
      ],
      nextNodeId: 'bppv-kanal-decision'
    },

    // ============================================================
    // NODE 4: KANAL IDENTIFICATION
    // ============================================================
    'bppv-kanal-decision': {
      id: 'bppv-kanal-decision',
      type: 'decision',
      title: 'Node 4: Identifikasi Kanal Semisirkularis',
      description: 'Pilih berdasarkan hasil manuver diagnostik.',
      branches: [
        {
          id: 'kanal-posterior',
          title: '🔵 Kanal Posterior (~80%) — Dix-Hallpike Positif',
          description: 'Nistagmus torsional ke telinga bawah + upbeat, latensi 1–5 detik, < 1 menit, fatigable. Terapi: Manuver Epley atau Semont.',
          color: 'blue',
          nextNodeId: 'bppv-terapi-posterior',
          riskLevel: 'low'
        },
        {
          id: 'kanal-horizontal',
          title: '🟡 Kanal Horizontal (~15%) — Supine Roll Positif',
          description: 'Nistagmus horizontal geotropic atau apogeotropic. Terapi: Manuver Gufoni atau Lempert (BBQ Roll).',
          color: 'orange',
          nextNodeId: 'bppv-terapi-horizontal',
          riskLevel: 'low'
        },
        {
          id: 'kanal-resolved',
          title: '🟢 Probable BPPV — Manuver Negatif (Spontan Sembuh)',
          description: 'Anamnesis khas BPPV tapi manuver tidak memicu nistagmus. Kemungkinan otokonia sudah kembali ke utrikulus. Tetap edukasi dan follow-up.',
          color: 'green',
          nextNodeId: 'bppv-edukasi',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 5A: TERAPI KANAL POSTERIOR — EPLEY / SEMONT
    // ============================================================
    'bppv-terapi-posterior': {
      id: 'bppv-terapi-posterior',
      type: 'checklist',
      title: 'Node 5A: CRT Kanal Posterior — Manuver Epley (Efektivitas 80–95%)',
      description: 'Canalith Repositioning Therapy hanya memerlukan tempat tidur periksa. Efektivitas Epley: 80–95% dalam 1–3 sesi (Cochrane Review, Hilton & Pinder 2014).',
      items: [
        {
          id: 'post-antiemetik',
          title: '1. Siapkan Antiemetik Jika Mual Berat',
          description: 'Jika mual berat sebelum CRT: Ondansetron 4 mg sublingual ATAU Dimenhydrinate 50 mg oral (onset 15–30 menit). Suction standby. Jelaskan: "Akan terasa pusing selama manuver, itu normal dan pertanda obat bekerja."',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'post-epley-1',
          title: '2. Epley Step 1 — Dix-Hallpike Sisi Terkena',
          description: 'Kepala rotasi 45° ke sisi terkena → baring cepat dengan kepala menggantung 20–30° → tunggu nistagmus habis + 30 detik tambahan (~1–2 menit total). Pasien akan merasakan vertigo — reassure: "Ini tanda yang bagus."',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'post-epley-2',
          title: '3. Epley Step 2 — Rotasi Kepala ke Sisi Sehat',
          description: 'Pertahankan kepala menggantung → rotasi perlahan 90° ke sisi kontralateral (sisi sehat) → tunggu 30–60 detik. Nistagmus bisa muncul sebentar saat rotasi — ini normal.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'post-epley-3',
          title: '4. Epley Step 3 — Miring ke Sisi Sehat',
          description: 'Pasien miring ke sisi sehat → kepala rotasi lebih lanjut sampai hidung menghadap lantai (45° dari horizontal) → tunggu 30–60 detik.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'post-epley-4',
          title: '5. Epley Step 4 — Duduk Perlahan',
          description: 'Bantu pasien duduk perlahan, kepala sedikit menunduk. Pertahankan posisi duduk 1–2 menit. Observasi: masih vertigo? → boleh ulangi (maksimal 3x per sesi).\n\nAlternatif Semont: untuk pasien obesitas, nyeri leher, atau lordosis berat. Efektivitas sebanding dengan Epley (Chen et al. 2019).',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'post-observasi',
          title: '6. Observasi 15–30 Menit Pasca-CRT',
          description: 'Pasien duduk tegak. Monitor SpO₂ dan nadi (oksimetri). Pusing ringan residual setelah CRT = normal (kompensasi sentral). Vertigo berat rekuren = ulangi manuver.\n\nAAO-HNS 2017: Restriksi posisi pasca-CRT TIDAK terbukti meningkatkan keberhasilan — boleh beraktivitas normal.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'post-obat-simptomatis',
          title: '7. Obat Simptomatis (Opsional, Maks 3–5 Hari)',
          description: 'Dimenhydrinate 50 mg 3x/hari ATAU Betahistine 6–24 mg 3x/hari — hanya untuk gejala akut berat, maksimal 3–5 hari.\n⚠️ AAO-HNS 2017 (Strong Recommendation): vestibular suppressant TIDAK boleh menjadi terapi utama BPPV — CRT adalah terapi definitif!',
          required: false,
          category: 'medication',
          role: 'doctor',
        }
      ],
      nextNodeId: 'bppv-evaluasi-post-crt'
    },

    // ============================================================
    // NODE 5B: TERAPI KANAL HORIZONTAL — GUFONI / LEMPERT
    // ============================================================
    'bppv-terapi-horizontal': {
      id: 'bppv-terapi-horizontal',
      type: 'checklist',
      title: 'Node 5B: CRT Kanal Horizontal — Manuver Gufoni / Lempert (BBQ Roll)',
      description: 'Efektivitas Gufoni untuk kanalolitiasis geotropic: 74–80% per sesi (Mandala et al. 2013).',
      items: [
        {
          id: 'hor-subtipe',
          title: '1. Konfirmasi Subtipe: Geotropic atau Apogeotropic',
          description: 'GEOTROPIC (kanalolitiasis): nistagmus ke telinga bawah, sisi nistagmus lebih kuat = sisi lesi.\nAPOGEOTROPIC (kupulolitiasis): nistagmus ke telinga atas, sisi nistagmus lebih lemah = sisi lesi.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'hor-gufoni',
          title: '2. Manuver Gufoni (untuk Geotropic/Kanalolitiasis)',
          description: 'Duduk → baring cepat ke sisi SEHAT → tunggu 1 menit → rotasi kepala 45° ke bawah (hidung ke lantai) → tahan 2 menit → duduk perlahan. Ulangi 2–3x jika perlu.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'hor-lempert',
          title: '3. Manuver Lempert / BBQ Roll (Alternatif)',
          description: 'Terlentang → rotasi 90° ke sisi SEHAT, tahan 30–60 detik → rotasi 90° lagi (tengkurap), tahan → rotasi 90° lagi, tahan → duduk.\nTotal rotasi 270° ke sisi sehat. Alternatif jika Gufoni gagal.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'hor-obat',
          title: '4. Obat Simptomatis (Opsional, Maks 3–5 Hari)',
          description: 'Dimenhydrinate 50 mg 3x/hari ATAU Betahistine 6–24 mg 3x/hari ATAU Cinnarizine 15–30 mg 3x/hari (PERDOSSI 2023). Hanya untuk gejala akut berat.',
          required: false,
          category: 'medication',
          role: 'doctor',
        }
      ],
      nextNodeId: 'bppv-evaluasi-post-crt'
    },

    // ============================================================
    // NODE 6: EVALUASI POST-CRT
    // ============================================================
    'bppv-evaluasi-post-crt': {
      id: 'bppv-evaluasi-post-crt',
      type: 'decision',
      title: 'Node 6: Evaluasi Setelah CRT — Berhasil?',
      description: 'Ulangi manuver diagnostik (Dix-Hallpike atau Supine Roll) untuk konfirmasi hasil CRT.',
      branches: [
        {
          id: 'crt-berhasil',
          title: '🟢 CRT Berhasil — Nistagmus & Vertigo Hilang',
          description: 'Manuver Dix-Hallpike/Supine Roll negatif. Pasien merasa perbaikan signifikan. Lanjut ke edukasi dan discharge.',
          color: 'green',
          nextNodeId: 'bppv-edukasi',
          riskLevel: 'low'
        },
        {
          id: 'crt-parsial',
          title: '🟡 Respons Parsial — Masih Ada Pusing Ringan (Bukan Vertigo)',
          description: 'Nistagmus sudah negatif tapi masih ada unsteadiness/lightheadedness. Normal pada 40–60% pasien pasca-CRT (kompensasi sentral). Edukasi + latihan Brandt-Daroff di rumah.',
          color: 'orange',
          nextNodeId: 'bppv-residual',
          riskLevel: 'low'
        },
        {
          id: 'crt-gagal',
          title: '🔴 CRT Gagal — Vertigo & Nistagmus Masih Ada',
          description: 'Masih ada nistagmus kuat dan vertigo setelah 3x manuver. Pertimbangkan: kanal salah, multi-canal BPPV, kupulolitiasis, atau diagnosis bukan BPPV.',
          color: 'red',
          nextNodeId: 'bppv-refrakter',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 7: EDUKASI & DISCHARGE
    // ============================================================
    'bppv-edukasi': {
      id: 'bppv-edukasi',
      type: 'checklist',
      title: 'Node 7: Edukasi Pasien & Discharge',
      description: 'BPPV adalah gangguan jinak. Edukasi yang baik mengurangi kecemasan dan membantu deteksi dini kekambuhan.',
      items: [
        {
          id: 'edu-prognosis',
          title: '1. Edukasi Prognosis — BPPV adalah Kondisi JINAK',
          description: 'BPPV bukan stroke, bukan tumor otak. Ini adalah masalah pada batu kecil (otokonia) di telinga dalam yang bergeser. Prognosis: Ad vitam bonam. Bisa kambuh.\nRekurensi: ~15% dalam 1 tahun, ~50% lifetime — tapi dapat diterapi lagi dengan manuver yang sama.',
          required: true,
          category: 'documentation',
          role: 'both',
        },
        {
          id: 'edu-brandt-daroff',
          title: '2. Latihan Brandt-Daroff di Rumah',
          description: 'TEKNIK: Duduk tegak → baring miring ke kanan (30 detik atau sampai pusing hilang) → duduk tegak (30 detik) → baring miring ke kiri (30 detik) → duduk.\nUlangi 10–20x, 3x sehari, selama 2 minggu.\nTujuan: habituasi vestibular dan kompensasi sentral. Efektif untuk residual dizziness (AAO-HNS 2017 Level B).',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'edu-vitamin-d',
          title: '3. Suplementasi Vitamin D + Kalsium (untuk Cegah Kekambuhan)',
          description: 'Jeong et al. Neurology 2020 (RCT): Vitamin D 400 IU 2x/hari + Kalsium 500 mg 2x/hari pada pasien dengan 25-OH Vit D < 20 ng/mL → menurunkan rekurensi BPPV sebesar 24% (NNT=26).\nPertimbangkan terutama pada wanita postmenopause dan lansia.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'edu-mengemudi',
          title: '4. Jangan Mengemudi Segera Setelah CRT',
          description: 'Hindari mengemudi minimal 30–60 menit setelah manuver. Jika masih ada residual pusing → hindari mengemudi sampai gejala hilang. Jelaskan risiko vertigo mendadak saat berkendara.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'edu-kembali-segera',
          title: '5. Kembali Segera Jika Ada Ini',
          description: 'Instruksikan kembali ke klinik jika:\n• Vertigo berulang yang tidak membaik dalam 1–2 minggu\n• Muncul gejala BARU: kelemahan anggota gerak, bicara pelo, gangguan pendengaran tiba-tiba\n• Tidak bisa berjalan tanpa jatuh (ataksia berat)\nGejala baru ini bukan BPPV — perlu evaluasi ulang.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'edu-obat-pulang',
          title: '6. Resep Pulang (Jika Masih Ada Pusing Ringan)',
          description: 'Dimenhydrinate 50 mg 3x/hari MAKSIMAL 3 hari, HANYA jika masih ada pusing. ATAU Betahistine 6 mg 3x/hari (boleh sampai 2 minggu).\n\n⚠️ JANGAN resepkan vestibular suppressant jangka panjang — menghambat kompensasi vestibular (AAO-HNS 2017 Strong Recommendation Against).',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'edu-followup',
          title: '7. Jadwal Kontrol & Indikasi Rujuk',
          description: 'Kontrol 1–2 minggu. Jika masih BPPV saat kontrol → ulangi manuver CRT.\nIndikasi rujuk Spesialis Neurologi:\n• Kekambuhan > 3x dalam 1 tahun\n• Refrakter setelah 3 sesi CRT\n• Kecurigaan sentral yang belum bisa disingkirkan\n• Vertigo intractable + dehidrasi → rawat inap',
          required: true,
          category: 'documentation',
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE 8: RESIDUAL DIZZINESS
    // ============================================================
    'bppv-residual': {
      id: 'bppv-residual',
      type: 'checklist',
      title: 'Node 8: Residual Dizziness Post-CRT — Kompensasi Sentral',
      description: 'Pusing non-spesifik (bukan vertigo berputar) setelah CRT berhasil terjadi pada 40–60% pasien. Rata-rata berlangsung 1–4 minggu. BUKAN indikasi CRT ulang jika Dix-Hallpike sudah negatif.',
      items: [
        {
          id: 'res-reassurance',
          title: '1. Reassurance — Ini Normal!',
          description: 'Jelaskan: otokonia sudah direposisi (BPPV sembuh), tapi otak masih perlu waktu rekalibrasi. Rata-rata 1–4 minggu, bisa sampai 3 bulan pada lansia. Bukan tanda ada yang "salah".',
          required: true,
          category: 'documentation',
          role: 'both',
        },
        {
          id: 'res-rehab',
          title: '2. Rehabilitasi Vestibular di Rumah',
          description: 'Latihan Brandt-Daroff 3x/hari. Latihan gaze stabilization: fiksasi pandangan pada target sambil gerakkan kepala horizontal/vertikal 20x. Latihan keseimbangan: berdiri satu kaki, jalan tandem.\nCochrane Review (McDonnell & Hillier 2015): VRT efektif mempercepat resolusi residual dizziness.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'res-betahistin',
          title: '3. Betahistine (Opsional 2–4 Minggu)',
          description: 'Betahistine 6–24 mg 3x/hari selama 2–4 minggu untuk kenyamanan pasien. Evidence kontroversial (BEMED trial, Cochrane 2016: tidak superior dari plasebo), namun PERDOSSI 2023 masih merekomendasikan untuk praktik klinis.',
          required: false,
          category: 'medication',
          role: 'doctor',
        }
      ],
      nextNodeId: 'bppv-edukasi'
    },

    // ============================================================
    // NODE 9: BPPV REFRAKTER
    // ============================================================
    'bppv-refrakter': {
      id: 'bppv-refrakter',
      type: 'checklist',
      title: 'Node 9: BPPV Refrakter — Re-evaluasi & Pertimbangkan Rujuk',
      description: 'CRT gagal setelah 3x manuver dalam 1 sesi. Re-evaluasi identifikasi kanal dan pertimbangkan rujuk.',
      items: [
        {
          id: 'ref-re-evaluasi-kanal',
          title: '1. Re-evaluasi Identifikasi Kanal',
          description: 'Ulangi SEMUA manuver diagnostik. Apakah mungkin:\n• Kanal salah (posterior vs horizontal)?\n• Sisi salah?\n• Multi-canal BPPV (6–20% kasus)?\n\nTIPS: pada multi-canal, tangani kanal posterior terlebih dahulu, lalu kanal horizontal.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ref-self-epley',
          title: '2. Ajarkan Self-Epley di Rumah',
          description: 'Radtke et al. (Neurology 2004, RCT): Self-Epley maneuver efektif sebanding dengan Epley klinik setelah edukasi yang baik.\nAAO-HNS 2017: Self-administered CRT direkomendasikan (Level B).\nAjarkan pasien melakukan Epley sendiri 3x/hari × 1 minggu, lalu re-evaluasi di klinik.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'ref-indikasi-rujuk',
          title: '3. Indikasi Rujuk ke Spesialis Neurologi / Neuro-Otologi',
          description: 'Cantumkan dalam surat rujukan:\n• Hasil manuver diagnostik (sisi, arah nistagmus)\n• CRT yang sudah dilakukan (jumlah sesi + hasil)\n• Vital signs termasuk tes ortostatik\n• Hasil EKG\n\nIndikasi rujuk (PPK PERDOSSI 2023):\n• Refrakter > 3 bulan\n• Kekambuhan > 3x setahun\n• Nistagmus atipikal (tidak sesuai pola BPPV manapun)\n• Gejala sentral yang muncul',
          required: true,
          category: 'action',
          role: 'nurse',
        }
      ]
    },

    // ============================================================
    // NODE: SENTRAL RUJUK
    // ============================================================
    'bppv-sentral-rujuk': {
      id: 'bppv-sentral-rujuk',
      type: 'checklist',
      title: 'Node: Vertigo Sentral — Stabilisasi & Rujuk IGD RS SEGERA',
      description: 'Red flags terdeteksi. Klinik tanpa CT/MRI: STABILISASI dan RUJUK SEGERA. Jangan buang waktu untuk pemeriksaan yang bisa dilakukan di RS.',
      items: [
        {
          id: 'sen-monitor',
          title: '1. Monitor TTV Kontinu',
          description: 'Pantau TD, nadi, SpO₂. TD > 180 → pertimbangkan antihipertensi oral sambil menunggu rujuk. SpO₂ < 94% → O₂ nasal kanul. Bradikardia/aritmia → rekam EKG kontinu.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'sen-hints',
          title: '2. HINTS Exam Bedside (Untuk Vertigo Akut Kontinu)',
          description: 'Kattah et al. Stroke 2009: HINTS exam sensitivitas 100% untuk stroke, lebih baik dari MRI dalam 48 jam pertama.\n\nHead Impulse: NORMAL (tidak ada catch-up saccade) = SENTRAL\nNystagmus: direction-changing atau vertikal = SENTRAL\nTest of Skew: skew deviation = SENTRAL\n\nJika ≥ 1 komponen sentral → probabilitas stroke tinggi → rujuk IGD segera!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'sen-iv-antiemetik',
          title: '3. IV Line + Antiemetik untuk Kenyamanan Transportasi',
          description: 'Pasang IV line NaCl 0.9%. Ondansetron 4 mg sublingual/IV ATAU Dimenhydrinate 50 mg IM untuk kontrol mual/muntah berat selama transportasi. Siapkan suction di ambulans.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'sen-rujukan',
          title: '4. Surat Rujukan Lengkap ke IGD RS',
          description: 'Cantumkan: onset + durasi vertigo, temuan neurologis (defisit apa), hasil HINTS exam, TTV serial, hasil EKG, red flags yang ditemukan, obat yang diberikan.\nMinta CT/MRI kepala di RS tujuan.\n\nTransportasi: ambulans jika penurunan kesadaran/hemiparesis. Dengan pendamping jika masih sadar dan stabil.',
          required: true,
          category: 'documentation',
          role: 'both',
        }
      ]
    },

    // ============================================================
    // NODE: KARDIAK RUJUK
    // ============================================================
    'bppv-kardiak-rujuk': {
      id: 'bppv-kardiak-rujuk',
      type: 'checklist',
      title: 'Node: Pusing Penyebab Kardiak — Tatalaksana Sesuai EKG',
      description: 'EKG abnormal. Pusing kemungkinan presinkop kardiak. Tatalaksana sesuai temuan EKG.',
      items: [
        {
          id: 'kar-interpretasi',
          title: '1. Interpretasi EKG & Tentukan Urgensi',
          description: 'RUJUK IGD SEGERA: STEMI, Blok AV total (derajat 3), VT, AF dengan RVR cepat.\nRUJUK SEMI-URGENT (poli kardiologi): AF baru, LBBB, ST depresi signifikan, QT panjang.\nOBSERVASI/POLIKLINIK: Sinus bradikardia ringan, PAC/PVC isolated.',
          required: true,
          category: 'assessment',
          role: 'both',
        },
        {
          id: 'kar-stabilisasi',
          title: '2. Stabilisasi Sesuai Temuan + Rujuk',
          description: 'Bradikardia simtomatis: Atropine 0.5 mg IV → rujuk.\nSTEMI: Aspirin 160–320 mg kunyah + rujuk IGD cito.\nAF RVR: rate control jika tersedia (beta bloker oral) → rujuk.\n\nMonitor SpO₂ dan nadi kontinu selama menunggu transportasi.',
          required: true,
          category: 'action',
          role: 'doctor',
        }
      ]
    },

    // ============================================================
    // NODE: HIPOTENSI ORTOSTATIK
    // ============================================================
    'bppv-ortostatik-management': {
      id: 'bppv-ortostatik-management',
      type: 'checklist',
      title: 'Node: Hipotensi Ortostatik — Cari & Atasi Penyebab',
      description: 'Pusing kemungkinan hemodinamik karena drop TD saat berdiri. Bukan vertigo vestibular.',
      items: [
        {
          id: 'ort-cari-penyebab',
          title: '1. Cari Penyebab Hipotensi Ortostatik',
          description: 'Dehidrasi (mual/diare/intake kurang)? Obat antihipertensi (dosis berlebih)? Neuropati otonom (DM, Parkinson)? Bedrest lama? Usia tua + polifarmasi?\n\nAtasi penyebab yang dapat dikoreksi: perbaiki hidrasi, review dosis antihipertensi.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ort-edukasi',
          title: '2. Edukasi & Tata Cara Berdiri',
          description: 'Instruksikan:\n• Berdiri perlahan — dari tidur ke duduk dulu, lalu berdiri\n• Duduk di sisi tempat tidur 1–2 menit sebelum berdiri\n• Hindari berdiri mendadak\n• Pastikan asupan cairan adekuat\n• Review obat antihipertensi dengan dokter',
          required: true,
          category: 'action',
          role: 'both',
        }
      ],
      nextNodeId: 'bppv-edukasi'
    }

  },
  references: [
    'PERDOSSI. Panduan Praktik Klinis Neurologi (PPK Neurologi). Perhimpunan Dokter Spesialis Neurologi Indonesia. 2023.',
    'Bhattacharyya N, et al. Clinical Practice Guideline: Benign Paroxysmal Positional Vertigo (Update). Otolaryngol Head Neck Surg. 2017;156(3_suppl):S1–S47. (AAO-HNS 2017)',
    'von Brevern M, et al. Diagnostic criteria for benign paroxysmal positional vertigo: Consensus document of the Committee for the Classification of Vestibular Disorders of the Barány Society. J Vestib Res. 2015;25(3–4):105–117.',
    'Hilton MP, Pinder DK. The Epley (canalith repositioning) manoeuvre for benign paroxysmal positional vertigo. Cochrane Database Syst Rev. 2014.',
    'Jeong SH, et al. Randomized Trial of Vitamin D Supplementation for Prevention of BPPV Recurrence. Neurology. 2020;95(9):e1162–e1170.',
    'Kattah JC, et al. HINTS to Diagnose Stroke in the Acute Vestibular Syndrome. Stroke. 2009;40(11):3504–3510.',
    'Radtke A, et al. Self-treatment of benign paroxysmal positional vertigo: Semont manoeuvre vs Epley procedure. Neurology. 2004;63(1):150–152.',
    'KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP. Kemenkes RI. Bab: Vertigo.'
  ]
};
