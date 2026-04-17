// ============================================================
// SINDROM KORONER AKUT (SKA)
// Mencakup: STEMI, NSTEMI, UAP
// Referensi:
// - Pedoman Tata Laksana Sindrom Koroner Akut — PERKI 2018 (Update 2022)
// - KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
// - 2023 ESC Guidelines for the Management of Acute Coronary Syndromes
// - 2021 ACC/AHA Guideline for Coronary Artery Revascularization
// - AHA ACLS Guidelines 2020
// Setting: Klinik / FKTP
// Alat: TTV (Tensi, Termometer, Oksimetri), EKG, Suction
// TIDAK ADA: Troponin/hs-cTn, Cath Lab, Fibrinolisis, IVUS, Echo
// Prinsip: DIAGNOSIS CEPAT → STABILISASI → RUJUK SECEPATNYA
// "TIME IS MUSCLE" — setiap 30 menit delay PCI = 7.5 kematian per 1000 pasien
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const skaPathway: DynamicPathway = {
  diseaseId: 'sindrom-koroner-akut',
  diseaseName: 'Sindrom Koroner Akut — STEMI, NSTEMI, UAP (PERKI 2022)',
  startNodeId: 'ska-initial',
  nodes: {

    // ============================================================
    // NODE 1: RAPID ASSESSMENT (Bersamaan, dalam < 10 Menit!)
    // ============================================================
    'ska-initial': {
      id: 'ska-initial',
      type: 'checklist',
      title: 'Node 1: Rapid Assessment — Nyeri Dada < 10 Menit Pertama!',
      description: 'SKA = DARURAT WAKTU. EKG harus direkam dalam 10 menit dari pasien tiba. Lakukan semua langkah ini BERSAMAAN — sambil staf memasang sadapan EKG, dokter tanya anamnesis dan periksa vital signs.',
      items: [
        {
          id: 'ska-cek-kesadaran-nadi',
          title: 'CEK KESADARAN + NADI (< 10 Detik Pertama)',
          description: 'Panggil nama, tepuk bahu. Raba nadi karotis.\n✅ SADAR + ADA NADI → Lanjut assessment cepat.\n🚨 TIDAK SADAR / TIDAK ADA NADI → MULAI CPR SEGERA + panggil bantuan + RUJUK CITO! (→ Protokol Aritmia/Cardiac Arrest)',
          required: true,
          category: 'safety'
        },
        {
          id: 'ska-anamnesis-nyeri',
          title: 'Anamnesis — Karakteristik Nyeri Dada (OPQRST)',
          description: 'Onset: Kapan mulai? Mendadak saat istirahat atau saat aktivitas?\nQuality: Seperti ditekan batu berat, diremas, rasa terbakar?\nRadiation: Menjalar ke lengan kiri, leher, rahang, atau punggung?\nSeverity: Skala nyeri 1–10?\nTime: Sudah berapa lama? > 20 menit tanpa henti → curiga STEMI!\nGejala penyerta: Keringat dingin, mual, muntah, sesak, palpitasi, sinkop.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-anamnesis-risiko',
          title: 'Anamnesis — Faktor Risiko & Riwayat Jantung',
          description: 'Tanyakan: Hipertensi? DM? Kolesterol? Merokok? Riwayat PJK/STEMI sebelumnya? Pernah PCI atau CABG? Obat yang diminum saat ini (antikoagulan, statin, beta-bloker)? Riwayat alergi aspirin?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-ttv-cepat',
          title: 'TTV Cepat — TD, Nadi, SpO₂, RR (Bersamaan dengan Pasang EKG)',
          description: 'Tekanan darah: sistolik < 90 = SYOK KARDIOGENIK!\nNadi: takikardia > 100 atau bradikardia < 60?\nSpO₂: < 90% → pasang O₂ segera. < 95% → pertimbangkan O₂.\nRR: Cepat dan dangkal? Curiga edema paru.\nSUHU: Demam → curiga perikarditis atau miokarditis.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-pemfis',
          title: 'Pemeriksaan Fisik Singkat',
          description: 'Auskultasi jantung: S3 gallop (gagal jantung akut?), murmur baru (regurgitasi mitral akut / VSD?).\nAuskultasi paru: ronki di basal bilateral (edema paru akut).\nVena jugularis: JVP meningkat (gagal jantung kanan)?\nEkstremitas: akral dingin, sianosis (curiga syok kardiogenik).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-ekg-stat',
          title: '⚡ EKG 12-Lead STAT — WAJIB < 10 Menit dari Pasien Tiba!',
          description: 'EKG adalah SATU-SATUNYA alat diagnostik definitif SKA di klinik tanpa lab troponin.\nREKAM SEKARANG — sambil anamnesis dan pemeriksaan fisik berlangsung.\n\nPerhatikan:\n• ST Elevasi ≥ 1 mm di ≥ 2 lead bersebelahan → STEMI\n• LBBB baru atau didapat baru → Setara STEMI (Sgarbossa criteria)\n• ST Depresi / T Inversi → NSTEMI/UAP\n• EKG Normal bukan menyingkirkan SKA — 6% STEMI EKG awal normal!\nJika awal normal tapi nyeri tipikal → ULANG EKG tiap 15–30 menit!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ska-o2',
          title: 'O₂ Supplemental Sesuai SpO₂',
          description: 'SpO₂ < 90% → O₂ 4–8 L/menit via masker atau nasal kanul. Target SpO₂ ≥ 90–94%.\nJANGAN berikan O₂ rutin jika SpO₂ ≥ 94% — oksigen berlebih pada normoksia dapat memperluas area infark (ESC 2023 rekomendasi IIa).',
          required: true,
          category: 'action'
        },
        {
          id: 'ska-akses-iv',
          title: 'Pasang IV Line + Monitor EKG Kontinu',
          description: 'Pasang IV line 18G atau lebih besar di lengan antecubital. Mulai infus NaCl 0.9% atau RL pelan (KVO). Pasang elektroda EKG untuk monitoring kontinu selama pasien masih di klinik. Siapkan defibrillator/AED jika tersedia.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ska-ekg-decision'
    },

    // ============================================================
    // NODE 2: DECISION — INTERPRETASI EKG
    // ============================================================
    'ska-ekg-decision': {
      id: 'ska-ekg-decision',
      type: 'decision',
      title: 'Node 2: Interpretasi EKG — Tentukan Jenis SKA',
      description: 'EKG adalah penentu arah utama. Di klinik tanpa troponin, EKG adalah satu-satunya pembeza STEMI dari NSTEMI/UAP.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ska-branch-stemi',
          title: '🔴 STEMI — ST Elevasi atau LBBB Baru',
          description: 'ST Elevasi ≥ 1 mm di ≥ 2 lead bersebelahan (atau ≥ 2 mm di V1–V3), ATAU LBBB baru yang tidak diketahui sebelumnya. EMERGENCY REPERFUSI — hitung menit, bukan jam!',
          color: 'red',
          nextNodeId: 'ska-stemi-management',
          riskLevel: 'high'
        },
        {
          id: 'ska-branch-nstemi-uap',
          title: '🟠 NSTEMI / UAP — ST Depresi, T Inversi, atau Normal',
          description: 'ST Depresi ≥ 0.5 mm, T Inversi baru, atau EKG normal TAPI klinis tipikal SKA. Tanpa troponin, tidak bisa dibedakan NSTEMI vs UAP — keduanya harus dirujuk.',
          color: 'orange',
          nextNodeId: 'ska-nstemi-uap-management',
          riskLevel: 'high'
        },
        {
          id: 'ska-branch-diagnosa-lain',
          title: '🟢 EKG Normal, Nyeri Tidak Tipikal — Pertimbangkan Diagnosis Lain',
          description: 'EKG normal + nyeri tidak tipikal (tajam/tusuk, berubah posisi, direproduksi tekan). Curiga: GERD, muskuloskeletal, kostokondritis, diseksi aorta, PE. TETAP monitor serial EKG + rujuk jika tidak yakin.',
          color: 'green',
          nextNodeId: 'ska-evaluasi-ulang',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: STEMI — STABILISASI & RUJUK REPERFUSI
    // ============================================================
    'ska-stemi-management': {
      id: 'ska-stemi-management',
      type: 'checklist',
      title: 'Node 3A: STEMI — Stabilisasi & Rujuk CITO untuk Reperfusi!',
      description: 'PERKI 2022 / ESC 2023: Target Door-to-Balloon (D2B) < 90 menit untuk PCI primer. Target Door-to-Needle (D2N) < 30 menit jika fibrinolisis. Di klinik: obat dual antiplatelet → panggil ambulans → kirim dengan EKG!\n\n"Time is Muscle" — setiap 30 menit delay PCI primer = 7.5 kematian per 1000 pasien (De Luca, Lancet 2004).',
      items: [
        {
          id: 'stemi-aspirin',
          title: '1. ⚡ ASPIRIN 160–320 mg KUNYAH — Berikan SEKARANG!',
          description: 'Aspirin (asam asetilsalisilat) DIKUNYAH (bukan ditelan utuh) 160–320 mg. Onset lebih cepat jika dikunyah. KONTRAINDIKASI: Riwayat alergi aspirin yang terbukti (urtikaria/anafilaksis), perdarahan GI aktif. Jangan tunda menunggu konfirmasi — manfaat jauh melebihi risiko pada STEMI tipikal.',
          required: true,
          category: 'medication'
        },
        {
          id: 'stemi-nitrat',
          title: '2. Nitrogliserin Sublingual (Jika TD Sistolik > 90 mmHg)',
          description: 'Isosorbid Dinitrat (ISDN) 5 mg sublingual ATAU Nitrogliserin spray 0.4 mg sublingual.\nTujuan: Vasodilatasi → kurangi preload → kurangi nyeri iskemik.\nKONTRAINDIKASI ABSOLUT: TD sistolik < 90 mmHg, bradikardia < 50, penggunaan PDE-5 inhibitor (sildenafil/tadalafil) dalam 24–48 jam, infark ventrikel kanan (ST elevasi di V4R).',
          required: true,
          category: 'medication'
        },
        {
          id: 'stemi-morfin',
          title: '3. Morfin 2–4 mg IV (Jika Nyeri Tidak Terkontrol)',
          description: 'Morfin 2–4 mg IV perlahan jika nyeri tidak berkurang dengan nitrogliserin. Dapat diulang tiap 5–15 menit.\nCATATAN ESC 2023: Data observasional menunjukkan morfin dapat menghambat absorpsi oral antiplatelet (P2Y12 inhibitor) → berikan hanya jika nyeri sangat berat dan tidak terkontrol. Monitor pernapasan (siapkan nalokson jika ada).',
          required: false,
          category: 'medication'
        },
        {
          id: 'stemi-identifikasi-lokasi',
          title: '4. Identifikasi Lokasi Infark dari EKG (Untuk Surat Rujukan)',
          description: 'Lead EKG yang terkena → lokasi infark:\n• II, III, aVF → Inferior (RCA) — Waspadai infark ventrikel kanan!\n• I, aVL, V5–V6 → Lateral (LCX)\n• V1–V4 → Anterior/Anteroseptal (LAD) — Terluas, risiko gagal jantung terbesar\n• V1–V2 ST depresi + T positif tinggi → Posterior (cek V7–V9)\nInferior STEMI: Selfie lead kanan (V3R, V4R) untuk deteksi RV infark.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'stemi-time-onset',
          title: '5. Catat & Hitung Waktu Onset Nyeri',
          description: 'Catat: (1) Waktu onset nyeri (kapan pertama mulai), (2) Waktu EKG direkam, (3) Waktu aspirin diberikan, (4) Waktu rujukan diberangkatkan.\nInformasi ini KRITIS untuk tim RS menentukan strategi reperfusi:\n• Onset < 12 jam: Reperfusi masih sangat bermanfaat\n• Onset > 12 jam: PCI masih boleh jika ada nyeri persisten atau hemodinamik tidak stabil',
          required: true,
          category: 'documentation'
        },
        {
          id: 'stemi-rujuk-pci',
          title: '6. RUJUK CITO ke RS dengan Fasilitas PCI / Cath Lab',
          description: 'Hubungi RS tujuan SEBELUM pasien berangkat — minta mereka siapkan Cath Lab.\nJika RS PCI dapat dicapai < 120 menit → TUJUAN LANGSUNG RS PCI (Primary PCI).\nJika RS PCI > 120 menit → TUJU RS TERDEKAT untuk FIBRINOLISIS, lalu transfer ke PCI center.\nAMBULAN wajib ada: IV tetap jalan, O₂ tetap, monitor EKG, EKG fisik dibawa dokter pendamping.',
          required: true,
          category: 'action'
        },
        {
          id: 'stemi-surat-rujukan',
          title: '7. Surat Rujukan LENGKAP — Kirim Foto EKG ke RS Tujuan!',
          description: 'Isi surat rujukan:\n• Identitas pasien, BB, TB\n• Waktu onset nyeri, waktu EKG\n• Interpretasi EKG (lokasi, derajat ST elevasi)\n• Obat yang sudah diberikan + waktu pemberian\n• Vital signs serial\n• Riwayat: HT, DM, alergi aspirin/kontras\n• STATUS NPO (puasa) untuk persiapan Cath Lab\nKIRIM FOTO EKG via WhatsApp ke dokter IGD RS tujuan sebelum pasien tiba!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'stemi-syok-kardiogenik',
          title: '⚠️ Jika Ada Syok Kardiogenik (TD < 90, Akral Dingin)',
          description: 'Syok kardiogenik pada STEMI = mortalitas 50–80% tanpa intervensi dini.\nTindakan di klinik:\n• Posisi pasien flat (BUKAN Trendelenburg — meningkatkan preload jantung yang gagal)\n• Cairan SANGAT HATI-HATI: jika syok bukan akibat hypovolemia → cairan bisa memperburuk edema paru\n• Norepinefrin sebagai vasopressor jika tersedia (dopamin sudah tidak direkomendasikan ESC 2023)\n• RUJUK CITO — syok kardiogenik butuh PCI + IABP/Impella segera.',
          required: false,
          category: 'safety'
        }
      ]
    },

    // ============================================================
    // NODE 3B: NSTEMI / UAP — STABILISASI & RUJUK
    // ============================================================
    'ska-nstemi-uap-management': {
      id: 'ska-nstemi-uap-management',
      type: 'checklist',
      title: 'Node 3B: NSTEMI / UAP — Stabilisasi & Rujuk IGD RS',
      description: 'NSTEMI/UAP tanpa troponin tidak bisa disingkirkan di klinik primer. Semua kasus dengan klinis tipikal ACS + EKG non-STEMI harus dirujuk ke RS untuk hs-Troponin, risk stratifikasi (GRACE score), dan kemungkinan angiografi.',
      items: [
        {
          id: 'nest-aspirin',
          title: '1. ASPIRIN 160–320 mg KUNYAH — Berikan Sekarang!',
          description: 'Sama seperti STEMI — aspirin dikunyah segera. Kontraindikasi: riwayat alergi aspirin terbukti atau perdarahan GI aktif.',
          required: true,
          category: 'medication'
        },
        {
          id: 'nest-nitrat',
          title: '2. Nitrogliserin Sublingual (Jika Nyeri Masih Ada & TD > 90)',
          description: 'ISDN 5 mg sublingual atau Nitrogliserin spray 0.4 mg sublingual untuk kontrol nyeri.\nKontraindikasi sama dengan STEMI: TD < 90, bradikardia, PDE-5 inhibitor, infark RV.',
          required: true,
          category: 'medication'
        },
        {
          id: 'nest-serial-ekg',
          title: '3. EKG Serial Tiap 15–30 Menit Sambil Menunggu Ambulans',
          description: 'NSTEMI dapat berkembang menjadi STEMI dalam hitungan menit (progressive occlusion). Rekam ulang EKG tiap 15–30 menit. Jika muncul ST Elevasi baru → eskalasi ke protokol STEMI segera!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'nest-stratifikasi-risiko',
          title: '4. Nilai Tanda Risiko Tinggi (Perlu Rujuk Segera)',
          description: 'Risiko SANGAT TINGGI (rujuk dalam < 2 jam):\n• Hemodinamik instabil / syok kardiogenik\n• Nyeri dada refrakter meski sudah nitrogliserin\n• Gagal jantung akut / edema paru\n• Aritmia ventrikel yang mengancam jiwa (VT/VF)\n• Perubahan dinamis ST-T di EKG serial\n\nRisiko TINGGI (rujuk dalam < 24 jam):\n• ST Depresi luas ≥ 0.5 mm\n• T Inversi dalam di lead prekordial\n• Troponin positif (jika tersedia)\n• TIMI Score ≥ 3 / GRACE Score > 140',
          required: true,
          category: 'assessment'
        },
        {
          id: 'nest-rujuk',
          title: '5. RUJUK IGD RS — Dokter Pendamping + EKG Fisik',
          description: 'Hubungi IGD RS tujuan, kabarkan pasien datang dengan suspek ACS non-STEMI.\nKirim foto EKG terakhir via WhatsApp ke dokter IGD.\nSelama transport: monitor SpO₂ dan EKG kontinu, IV tetap jalan, O₂ sesuai target.\nDokter pendamping harus membawa: surat rujukan lengkap + kertas EKG asli.',
          required: true,
          category: 'action'
        },
        {
          id: 'nest-surat-rujukan',
          title: '6. Surat Rujukan Lengkap',
          description: 'Cantumkan: Waktu onset nyeri, EKG serial (termasuk waktu masing-masing), obat yang sudah diberikan + waktu, vital signs serial, faktor risiko KV, riwayat alergi aspirin/kontras, dan status NPO.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 3C: EKG NORMAL + TIDAK TIPIKAL — EVALUASI ULANG
    // ============================================================
    'ska-evaluasi-ulang': {
      id: 'ska-evaluasi-ulang',
      type: 'checklist',
      title: 'Node 3C: EKG Normal & Klinis Tidak Tipikal — Evaluasi Diagnosis Lain',
      description: 'EKG normal TIDAK menyingkirkan SKA — 6% STEMI memiliki EKG awal normal. Tetap monitor ketat dan pertimbangkan diagnosis banding serius.',
      items: [
        {
          id: 'eval-ekg-serial',
          title: '1. EKG Serial — Rekam Ulang Tiap 15–30 Menit × 2–3 Kali',
          description: 'Jika EKG pertama normal tapi nyeri dada tipikal → rekam ulang tiap 15–30 menit minimal 2 kali lagi. Infark posterior dan RV bisa EKG awal normal/samar. Pertimbangkan lead tambahan V7–V9 (posterior) dan V3R–V4R (RV).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'eval-diagnosa-banding',
          title: '2. Pertimbangkan Diagnosis Banding Serius',
          description: '⚠️ Kondisi serius yang harus disingkirkan:\n• DISEKSI AORTA: Nyeri punggung tembus, TD kedua lengan beda > 20, nadi asimetris → RUJUK CITO!\n• EMBOLI PARU: Sesak mendadak, takikardia, S1Q3T3 di EKG, faktor risiko DVT/imobilisasi → RUJUK!\n• PERIKARDITIS: Nyeri lebih ringan saat merebah, lebih baik duduk condong, saddle-shaped ST elevasi difus, PR depresi\n• SPASME ESOFAGUS: Mirip nyeri dada iskemik, respons nitrat, tapi tidak ada perubahan EKG\n• GERD: Rasa terbakar epigastrium, memburuk setelah makan\n• MUSKULOSKELETAL: Nyeri tajam, direproduksi tekanan dada, berubah posisi',
          required: true,
          category: 'assessment'
        },
        {
          id: 'eval-tindak-lanjut',
          title: '3. Tindak Lanjut Sesuai Penilaian Klinis',
          description: 'Jika TIDAK BISA MENYINGKIRKAN SKA dengan pasti → RUJUK ke RS untuk troponin serial.\nJika sangat yakin diagnosis non-kardiak dan pasien stabil → rawat jalan dengan instruksi jelas:\n• Edukasi kapan harus segera ke IGD (nyeri dada tipikal, sesak, sinkop)\n• Kontrol ulang dalam 24–48 jam\n• Aspirin empiris boleh dipertimbangkan jika ada faktor risiko KV multipel',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ska-post-event-monitoring'
    },

    // ============================================================
    // NODE 4: MONITORING PASCA-EVENT & EDUKASI JANGKA PANJANG
    // ============================================================
    'ska-post-event-monitoring': {
      id: 'ska-post-event-monitoring',
      type: 'checklist',
      title: 'Node 4: Monitoring & Edukasi Pasca-Kepulangan dari RS',
      description: 'FKTP memegang peran penting dalam kepatuhan terapi jangka panjang pasca SKA. Pasien pasca STEMI tanpa DAPT kontinu memiliki risiko stent thrombosis hingga 30 kali lipat.',
      items: [
        {
          id: 'post-dapt-kepatuhan',
          title: '1. Pantau Kepatuhan DAPT (Dual Antiplatelet Therapy)',
          description: 'DAPT = Aspirin + P2Y12 inhibitor (Clopidogrel, Ticagrelor, atau Prasugrel) wajib diminum minimal 12 bulan pasca PCI atau ACS.\nTANYAKAN tiap kunjungan: Apakah kedua obat masih diminum? Ada perdarahan (gusi, tinja hitam)?\nJANGAN HENTIKAN sendiri — risiko stent thrombosis akut yang mematikan!',
          required: true,
          category: 'medication'
        },
        {
          id: 'post-statin',
          title: '2. Statin Intensitas Tinggi — Wajib Seumur Hidup',
          description: 'Rosuvastatin 20–40 mg atau Atorvastatin 40–80 mg/hari harus diminum pasca ACS, target LDL < 55 mg/dL (PERKI 2022 / ESC 2023).\nCek efek samping: miopati (nyeri otot), kenaikan enzim hati. Jangan dihentikan tanpa konsultasi dokter.',
          required: true,
          category: 'medication'
        },
        {
          id: 'post-beta-bloker',
          title: '3. Beta Bloker Pasca STEMI (Terutama Jika LVEF Turun)',
          description: 'Bisoprolol 2.5–10 mg atau Carvedilol 3.125–25 mg/hari diindikasikan pada pasca STEMI, terutama jika LVEF ≤ 40% atau ada gagal jantung. Pantau bradikardia, hipotensi, bronkospasme.',
          required: false,
          category: 'medication'
        },
        {
          id: 'post-ekg-kontrol',
          title: '4. EKG Berkala di Klinik',
          description: 'Rekam EKG setiap 3–6 bulan atau jika ada keluhan baru. Perhatikan: Aritmia pasca infark (VT, FA), Aneurisma ventrikel (ST elevasi persisten), Q patologis permanen (tanda bekas infark).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'post-modifikasi-risiko',
          title: '5. Modifikasi Faktor Risiko — Target Agresif',
          description: 'TD: Target < 130/80 mmHg.\nGula darah: HbA1c < 7% pada DM.\nLDL: Target < 55 mg/dL.\nMerokok: BERHENTI TOTAL — merokok pasca ACS meningkatkan risiko re-infark 50%.\nAktivitas fisik: Cardiac rehabilitation, mulai dengan jalan kaki 30 menit/hari.',
          required: true,
          category: 'action'
        },
        {
          id: 'post-edukasi-red-flags',
          title: '6. Edukasi Red Flags — Kapan Harus ke IGD Segera',
          description: 'Instruksikan pasien dan keluarga: Hubungi 119/IGD SEGERA jika:\n• Nyeri dada seperti dulu (atau lebih berat) saat istirahat > 5 menit\n• Sesak napas mendadak atau memburuk tiba-tiba\n• Jantung berdebar sangat cepat atau tidak teratur mendadak\n• Pingsan atau hampir pingsan\n• Keringat dingin mendadak tanpa penyebab jelas\nJANGAN tunggu atau coba minum obat dulu — hubungi bantuan segera!',
          required: true,
          category: 'safety'
        },
        {
          id: 'post-rujuk-kardio',
          title: '7. Indikasi Rujuk Ulang ke Spesialis Jantung',
          description: 'Rujuk kembali ke SpJantung jika:\n• Pasca ACS: evaluasi ekokardiografi (LVEF), stress test, atau angiografi lanjutan perlu\n• Gejala angina berulang meski sudah terapi optimal\n• Efek samping obat mayor yang perlu penyesuaian\n• LVEF ≤ 35% setelah 3 bulan terapi → evaluasi ICD',
          required: true,
          category: 'action'
        }
      ]
    }

  },
  references: [
    'PERKI. Pedoman Tata Laksana Sindrom Koroner Akut. Perhimpunan Dokter Spesialis Kardiovaskular Indonesia. Edisi Keempat, 2018 (Update 2022).',
    'KMK No. HK.01.07/MENKES/1186/2022 – Panduan Praktik Klinis bagi Dokter di FKTP. Kemenkes RI. Bab: Penyakit Jantung Koroner.',
    'Byrne RA, et al. 2023 ESC Guidelines for the management of acute coronary syndromes. Eur Heart J. 2023;44(38):3720–3826.',
    'Lawton JS, et al. 2021 ACC/AHA/SCAI Guideline for Coronary Artery Revascularization. J Am Coll Cardiol. 2022;79(2):e21–e129.',
    'Panchal AR, et al. 2020 American Heart Association Guidelines for CPR and ECC: Part 3 – Adult Basic and Advanced Life Support. Circulation. 2020.',
    'De Luca G, et al. Time-to-treatment significantly affects the extent of ST-segment resolution and myocardial blush in patients with acute myocardial infarction. Lancet. 2004;363(9423):1788–1791.',
    'Mathews R, et al. In-hospital morphine use and outcomes in acute STEMI. J Am Coll Cardiol. 2015;65(15):1574–1581. [RE: Morfin dan absorpsi antiplatelet oral]'
  ]
};
