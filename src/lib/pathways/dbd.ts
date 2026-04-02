// ========================================================================
// DEMAM BERDARAH DENGUE (DBD) - WHO 2009/2012 Guidelines + PPK Indonesia
// ========================================================================
// Evidence: WHO Dengue Guidelines 2009/2012, PPK PAPDI, Kemenkes RI 2022
// Flow: Initial Assessment → Classification → Outpatient Management (Daily Loop) → Recovery OR Escalation to Inpatient
// Critical Phase Detection: Day 3-7 (defervescence period) - most dangerous!
// Total Nodes: 11 nodes (7 checklist + 4 decision)
// Total Items: 83 checklist items
// ========================================================================

import { DynamicPathway } from '../dynamicPathways';

export const dbdPathway: DynamicPathway = {
  diseaseId: 'dbd',
  diseaseName: 'Demam Berdarah Dengue (DBD)',
  startNodeId: 'dbd-initial-assessment',
  nodes: {
    
    // ============================================================
    // NODE 1: INITIAL ASSESSMENT (H0-H1) - First Contact
    // 12 items
    // ============================================================
    'dbd-initial-assessment': {
      id: 'dbd-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment & Screening (H0-H1)',
      description: '⏱️ First contact - Establish diagnosis & baseline parameters',
      items: [
        {
          id: 'dbd-arrival-time',
          title: '🕐 Catat Waktu Kedatangan & Onset Demam',
          description: 'Door time + hari ke-berapa demam (H1/H2/.../H7). Penting untuk tentukan fase penyakit!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'dbd-fever-pattern',
          title: '🌡️ Pola Demam Karakteristik Dengue',
          description: 'Demam tinggi mendadak (39-40°C), 2-7 hari. Tanyakan: bifasik (saddle-back)? Turun tanpa antipiretik?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-associated-symptoms',
          title: '📋 Gejala Penyerta Dengue',
          description: 'Headache, retro-orbital pain, myalgia, arthralgia (breakbone fever), mual, muntah, ruam',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-bleeding-manifestations',
          title: '🩸 Skrining Manifestasi Perdarahan',
          description: 'Petekie spontan, purpura, ekimosis, epistaksis, gusi berdarah, hematemesis, melena, menorrhagia',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-tourniquet-test',
          title: '✅ Uji Torniket (Rumple Leede Test)',
          description: 'Pompa 5 menit di midpoint SBP-DBP. Positif: >20 petekiae per 2.5cm² (area siku). Spesifisitas tinggi!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-vital-signs-baseline',
          title: '💓 Vital Signs Baseline - LENGKAP',
          description: 'TD (SBP & DBP), Pulse Pressure (PP = SBP-DBP, normal 30-40), HR, RR, Temp, SpO2. PP <20 mmHg = WARNING!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-physical-exam-focused',
          title: '🔍 Pemeriksaan Fisik Fokus',
          description: 'Hepatomegali (>2cm), splenomegali, asites (fluid thrill/shifting dullness), efusi pleura, edema',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-warning-signs-screen',
          title: '🚨 Skrining 6 WARNING SIGNS - KRUSIAL!',
          description: '1) Nyeri perut hebat/tender, 2) Muntah persisten, 3) Akumulasi cairan (asites/efusi), 4) Perdarahan mukosa, 5) Letargi/gelisah, 6) Hepatomegali >2cm. ANY ONE = ADMIT!',
          required: true,
          category: 'safety'
        },
        {
          id: 'dbd-hydration-status',
          title: '💧 Status Hidrasi Objektif',
          description: 'Turgor kulit, membran mukosa, mata cekung, nadi kuat/lemah, CRT <2", urin output (terakhir BAK?)',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-labs-baseline-cbc',
          title: '🩺 Lab BASELINE (H1) - MANDATORY!',
          description: 'CBC: Hb, Ht (BASELINE PENTING!), Plt, WBC. Simpan nilai ini untuk compare harian!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-diagnostic-confirmation',
          title: '🧪 Konfirmasi Diagnostik Dengue',
          description: 'NS1 antigen (H1-5, sensitivitas 90%), atau IgM/IgG serologis (H5+ untuk serokonversi)',
          required: true,
          category: 'assessment'
        },
        {
          id: 'dbd-comorbidities-check',
          title: '⚠️ Identifikasi Komorbid High-Risk',
          description: 'Hamil, infant <1yo, elderly >65yo, DM, CKD, gagal jantung, obesitas, imunosupresi. Perlu admit!',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'dbd-classification'
    },

    // ============================================================
    // NODE 2: CLASSIFICATION DECISION (WHO 2009)
    // 3 branches
    // ============================================================
    'dbd-classification': {
      id: 'dbd-classification',
      type: 'decision',
      title: 'Node 2: Klasifikasi Dengue - WHO 2009 Classification',
      description: '🎯 Tentukan severity untuk stratifikasi manajemen',
      warningLevel: 'critical',
      branches: [
        {
          id: 'dengue-without-warning',
          title: '🏠 Dengue TANPA Warning Signs - Outpatient',
          description: 'NO warning signs, toleransi oral baik, Ht <20% baseline, Plt >50k, akses faskes <30 menit, NO komorbid',
          icon: '✅',
          color: 'green',
          nextNodeId: 'dbd-outpatient-day1',
          riskLevel: 'low'
        },
        {
          id: 'dengue-with-warning',
          title: '⚠️ Dengue DENGAN Warning Signs - ADMIT!',
          description: '≥1 warning sign ATAU komorbid high-risk ATAU intoleransi oral. RAWAT INAP monitoring ketat!',
          icon: '⚠️',
          color: 'orange',
          nextNodeId: 'dbd-inpatient-warning',
          riskLevel: 'high'
        },
        {
          id: 'severe-dengue-shock',
          title: '🚨 Dengue Berat (Severe Dengue) - ICU STAT!',
          description: 'Syok (PP <20, TD turun, nadi lemah), perdarahan masif, organ failure (ALT >1000, Cr↑), altered mental status',
          icon: '🚨',
          color: 'red',
          nextNodeId: 'dbd-severe-icu',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 3: OUTPATIENT DAY 1 - Initial Setup & Education
    // 12 items
    // ============================================================
    'dbd-outpatient-day1': {
      id: 'dbd-outpatient-day1',
      type: 'checklist',
      title: 'Node 3: Outpatient Day 1 (H1) - Initial Setup',
      description: '📋 Setup monitoring harian & patient education',
      items: [
        {
          id: 'confirm-outpatient-criteria',
          title: '✅ RE-CONFIRM Kriteria Outpatient Safety',
          description: 'Checklist: Toleransi oral OK, NO warning signs, Plt >50k, Ht <20%, akses <30 menit, NO komorbid, pasien/keluarga reliable',
          required: true,
          category: 'safety'
        },
        {
          id: 'calculate-fluid-needs',
          title: '💧 Hitung Kebutuhan Cairan Individual',
          description: 'Formula: 1500 mL/m² BSA + 5-7 mL/kg ATAU simple: BB x 40 mL = TARGET per 24 jam. Tulis: "_____ mL/hari"',
          required: true,
          category: 'action'
        },
        {
          id: 'hydration-education-detailed',
          title: '🥤 Edukasi Hidrasi Oral AGRESIF - Detail!',
          description: 'ORS prioritas utama! Alternatif: air putih, jus buah segar, air kelapa, sup. Hindari: kopi, teh, soda. Bagi jadi 8-10 porsi kecil per hari. Set alarm tiap 1-2 jam!',
          required: true,
          category: 'action'
        },
        {
          id: 'antipyretic-paracetamol-only',
          title: '💊 Antipiretik: HANYA Paracetamol',
          description: 'Paracetamol 500-1000mg PO q4-6h PRN (max 4g/hari). STOP jika afebrile >24h tanpa obat.',
          required: true,
          category: 'medication'
        },
        {
          id: 'nsaid-absolute-contraindication',
          title: '🚫 BAHAYA MUTLAK: KONTRAINDIKASI NSAID!',
          description: 'JANGAN BERIKAN: Aspirin, Ibuprofen, Asam Mefenamat, Na Diklofenak, Ketorolac → RISIKO PERDARAHAN FATAL! Edukasi keluarga & beri stiker peringatan!',
          required: true,
          category: 'safety'
        },
        {
          id: 'rest-nutrition-advice',
          title: '🛏️ Istirahat Total & Nutrisi Optimal',
          description: 'Bed rest total (WFH/sick leave), tidur 8-10 jam, diet tinggi protein & kalori, sayur & buah banyak. NO aktivitas berat!',
          required: true,
          category: 'action'
        },
        {
          id: 'warning-signs-card-printed',
          title: '📄 Berikan KARTU WARNING SIGNS (Print!)',
          description: 'Print kartu 6 warning signs dalam Bahasa sederhana. Teach-back: minta pasien jelaskan kembali! Tempel di dinding/kulkas!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'daily-visit-schedule-strict',
          title: '📅 Jadwal Kontrol HARIAN - MANDATORY!',
          description: 'SETIAP HARI sampai 2 hari post-afebrile (biasanya H2-H9). Waktu SAMA tiap hari (misal: 10:00 AM). NO SKIP!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'hotline-24-7-number',
          title: '📞 Nomor Hotline 24/7 - Emergency Contact',
          description: 'Tulis nomor dokter jaga/IGD dengan JELAS. Hubungi KAPAN SAJA jika ada warning signs! JANGAN tunggu pagi!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'lab-order-daily-cbc',
          title: '🩺 Lab Order: CBC Harian MANDATORY',
          description: 'CBC (Hb, Ht, Plt, WBC) SETIAP kontrol untuk trend analysis. PENTING untuk deteksi fase kritis!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'baseline-labs-documentation',
          title: '📊 Dokumentasi Lab Baseline (H1)',
          description: 'Catat baseline labs: Hb = ___, Ht = ___, Plt = ___, WBC = ___. Ini GOLD STANDARD untuk compare!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'phase-of-illness-education',
          title: '📚 Edukasi Fase Penyakit Dengue',
          description: 'Jelaskan 3 fase: Febril (H1-3), Kritis (H3-7), Recovery (H7-10). FASE KRITIS = demam turun tapi BAHAYA naik!',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dbd-outpatient-daily-monitoring'
    },

    // ============================================================
    // NODE 4: DAILY MONITORING (H2-H7) - Loop Node
    // 12 items
    // ============================================================
    'dbd-outpatient-daily-monitoring': {
      id: 'dbd-outpatient-daily-monitoring',
      type: 'checklist',
      title: 'Node 4: Daily Monitoring (H2-H7) - Fase Febril & Kritis',
      description: '🔁 Assessment harian untuk deteksi early warning!',
      items: [
        {
          id: 'identify-day-of-illness',
          title: '📅 Identifikasi Hari Sakit (H Berapa?)',
          description: 'Hari ke-___ demam. H3-7 = FASE KRITIS! Extra vigilance!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'daily-symptom-anamnesis',
          title: '🗣️ Anamnesis Harian Terstruktur',
          description: 'Demam hari ini? Intake kemarin berapa liter? BAK berapa kali (≥6x normal)? Muntah? Nyeri perut? Perdarahan baru? Lemas? Gelisah?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'daily-vital-signs-detailed',
          title: '💓 Vital Signs Daily - Detailed',
          description: 'TD (SBP/DBP), Pulse Pressure (PP = SBP-DBP), HR, Temp, RR, SpO2. Akral: hangat/dingin? CRT <2"? Hidrasi: turgor kulit, mukosa',
          required: true,
          category: 'assessment'
        },
        {
          id: 'pulse-pressure-calculation',
          title: '📐 Hitung Pulse Pressure (PP)',
          description: 'PP = SBP - DBP. Normal: 30-40 mmHg. PP <20 mmHg = WARNING SIGN (early shock)!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'daily-physical-exam-focused',
          title: '🔍 Physical Exam Fokus Harian',
          description: 'Hepatomegali bertambah? (ukur dari arcus costae). Asites? Efusi pleura? Petekiae baru? Perdarahan mukosa? Edema?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'daily-labs-cbc-comparison',
          title: '🩺 Lab Harian: CBC & Compare!',
          description: 'CBC hari ini: Hb = ___, Ht = ___, Plt = ___, WBC = ___. Bandingkan dengan H1 (baseline) dan H-1 (kemarin)!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'hematocrit-delta-calculation',
          title: '📊 Hitung Delta Hematokrit (CRITICAL!)',
          description: 'Δ Ht = [(Ht today - Ht baseline) / Ht baseline] × 100%. Contoh: (45-40)/40 = 12.5%. WARNING jika Δ Ht >20%!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'plot-trend-graphs',
          title: '📈 Plot Grafik Trend Ht vs Plt',
          description: 'Visualisasi: Ht↑ sambil Plt↓ = CRITICAL PHASE imminent! Crossing point = DANGER ZONE! Show grafik ke pasien.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'defervescence-identification',
          title: '🌡️ Identifikasi Defervescence (FASE KRITIS!)',
          description: 'Suhu turun <38°C tanpa antipiretik? HATI-HATI! Ini bukan "sembuh" - ini MULAI FASE KRITIS (plasma leakage)!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'recheck-all-warning-signs',
          title: '🚨 Re-Screen SEMUA 6 Warning Signs',
          description: 'Systematic check: 1) Nyeri perut?, 2) Muntah persisten?, 3) Akumulasi cairan?, 4) Bleeding mukosa?, 5) Letargi/gelisah?, 6) Hepatomegali >2cm?',
          required: true,
          category: 'safety'
        },
        {
          id: 'oral-tolerance-evaluation',
          title: '🥤 Evaluasi Toleransi Oral Kemarin',
          description: 'Berhasil minum ≥2L kemarin? Tidak muntah? Jika NO atau muntah >3x → consider admit!',
          required: true,
          category: 'safety'
        },
        {
          id: 'urine-output-assessment',
          title: '💧 Urine Output Assessment',
          description: 'Frekuensi BAK kemarin? Normal: >6x/hari. <4x = OLIGURIA → WARNING SIGN! Tanya warna: kuning pekat?',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'dbd-daily-decision'
    },

    // ============================================================
    // NODE 5: DAILY DECISION - Safety Gateway (Loop Control)
    // 4 branches
    // ============================================================
    'dbd-daily-decision': {
      id: 'dbd-daily-decision',
      type: 'decision',
      title: 'Node 5: Daily Evaluation - Reassess SETIAP Hari',
      description: '🚦 Safety checkpoint: Continue, Admit, atau Discharge?',
      warningLevel: 'critical',
      branches: [
        {
          id: 'stable-continue-outpatient',
          title: '✅ STABIL - Lanjutkan Rawat Jalan',
          description: 'NO warning signs, toleransi oral baik, Δ Ht <20%, Plt >50k atau stabil, vital signs normal, urin adekuat',
          icon: '✅',
          color: 'green',
          nextNodeId: 'dbd-outpatient-reinforcement',
          riskLevel: 'low'
        },
        {
          id: 'warning-signs-admit-now',
          title: '⚠️ WARNING SIGNS (+) - RAWAT INAP SEKARANG!',
          description: '≥1 warning sign, intoleransi oral, Δ Ht >20%, Plt drop cepat (<50k atau turun >50% dalam 24h), oliguria, PP <20',
          icon: '⚠️',
          color: 'orange',
          nextNodeId: 'dbd-inpatient-warning',
          riskLevel: 'high'
        },
        {
          id: 'severe-deterioration-icu',
          title: '🚨 DENGUE BERAT - ICU EMERGENCY!',
          description: 'Syok (TD turun, nadi weak, CRT >2"), bleeding masif, altered consciousness, dyspnea (efusi/edema paru), organ dysfunction',
          icon: '🚨',
          color: 'red',
          nextNodeId: 'dbd-severe-icu',
          riskLevel: 'high'
        },
        {
          id: 'recovery-phase-discharge',
          title: '🎉 FASE KONVALESEN - Recovery & Discharge',
          description: 'Afebrile ≥48h tanpa antipiretik, kondisi umum baik, NO warning signs, Ht stabil 48h, Plt >50k trending up, toleransi oral excellent',
          icon: '🎉',
          color: 'blue',
          nextNodeId: 'dbd-recovery-discharge',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 6: OUTPATIENT REINFORCEMENT - Loop Back
    // 6 items
    // ============================================================
    'dbd-outpatient-reinforcement': {
      id: 'dbd-outpatient-reinforcement',
      type: 'checklist',
      title: 'Node 6: Reinforcement Education - Continue Outpatient',
      description: '🔁 Reinforce compliance sebelum kembali besok',
      items: [
        {
          id: 'praise-compliance',
          title: '👏 Positive Reinforcement',
          description: 'Bagus! Kondisi stabil hari ini. Pertahankan compliance hidrasi & monitoring!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'reinforce-hydration-target',
          title: '💧 REINFORCE Target Hidrasi',
          description: 'Terus minum 2-3L/hari! Kemarin berapa liter? Tips: Set alarm tiap jam, siapkan botol 500mL = 4-6 botol/hari',
          required: true,
          category: 'action'
        },
        {
          id: 'continue-paracetamol-prn',
          title: '💊 Continue Paracetamol PRN',
          description: 'Jika masih demam → 500-1000mg q4-6h. STOP jika afebrile >24h. Jangan lupa: NO NSAID!',
          required: true,
          category: 'medication'
        },
        {
          id: 'repeat-warning-signs-education',
          title: '🚨 Repeat Warning Signs Education',
          description: 'Tanyakan teach-back: "Coba sebutkan 6 tanda bahaya?" Jika lupa → review kartu lagi + diskusi!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'emphasize-critical-phase-day',
          title: '📅 Emphasize Fase Kritis',
          description: 'Sekarang hari ke-X. Hari 3-7 paling berbahaya! Setelah demam turun = extra waspada 48-72 jam!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'confirm-tomorrow-appointment',
          title: '📅 Konfirmasi Appointment Besok',
          description: 'Besok kontrol jam berapa? Jangan skip! Lab CBC besok pagi sebelum ke klinik ya!',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dbd-outpatient-daily-monitoring'
    },

    // ============================================================
    // NODE 7: RECOVERY & DISCHARGE PLANNING
    // 12 items
    // ============================================================
    'dbd-recovery-discharge': {
      id: 'dbd-recovery-discharge',
      type: 'checklist',
      title: 'Node 7: Recovery Phase - Safe Discharge Planning',
      description: '🎉 Fase konvalesen dengan proper follow-up',
      items: [
        {
          id: 'confirm-6-recovery-criteria',
          title: '✅ Konfirmasi 6 Kriteria Discharge SEMUA Terpenuhi',
          description: '1) Afebrile ≥48h no antipyretic, 2) Kondisi umum baik, 3) NO warning signs, 4) Ht stabil ≥48h, 5) Plt >50k trending up, 6) Urin output normal',
          required: true,
          category: 'safety'
        },
        {
          id: 'final-labs-pre-discharge',
          title: '🩺 Final Labs - Dokumentasi Recovery',
          description: 'CBC terakhir: Hb = ___, Ht = ___, Plt = ___, WBC = ___. Catatan: Plt recovery lambat 7-10 hari post-illness, normal 50-100k saat discharge',
          required: true,
          category: 'assessment'
        },
        {
          id: 'rest-education-post-dengue',
          title: '🛏️ Edukasi Istirahat Post-Dengue',
          description: 'Week 1-2: istirahat total di rumah. Hindari aktivitas berat, olahraga, traveling. Tidur 8-10 jam/hari. Fatigue normal sampai 2-4 minggu!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'gradual-return-to-activity',
          title: '📈 Gradual Return to Activity Plan',
          description: 'Week 1: 100% rest. Week 2: aktivitas ringan 50% (WFH ok). Week 3: 75% normal. Week 4+: full activity. Listen to your body!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'nutrition-recovery-advice',
          title: '🥗 Nutrisi untuk Recovery Optimal',
          description: 'Diet tinggi protein (telur, ayam, ikan, kacang), sayur & buah banyak (vit C & K), minum 2-3L/hari, multivitamin optional',
          required: true,
          category: 'documentation'
        },
        {
          id: 'followup-1-week-post-discharge',
          title: '📅 Follow-Up 1 Week Post-Discharge',
          description: 'Appointment 7 hari lagi untuk check kondisi & CBC. Target: Plt >150k atau minimal >100k trending up',
          required: true,
          category: 'documentation'
        },
        {
          id: 'reinfection-risk-education',
          title: '⚠️ Edukasi Risiko Re-Infeksi Dengue',
          description: '4 serotipe dengue (DENV1-4) - bisa kena lagi! Infeksi kedua LEBIH BERAT (risiko DHF/DSS naik 15x)! Demam lagi → periksa SEGERA!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'prevention-3m-plus-program',
          title: '🦟 Pencegahan DBD: Program 3M Plus',
          description: 'Menguras bak mandi/tempayan 1x/minggu, Menutup wadah air rapat, Mengubur/buang barang bekas. PLUS: abate bubuk, ikan cupang/guppy, fogging, repellent',
          required: true,
          category: 'documentation'
        },
        {
          id: 'community-vector-control',
          title: '🏘️ Peran Serta Masyarakat (PSN)',
          description: 'Laporkan ke RT/Kelurahan untuk fogging area. Ajak tetangga ikut 3M Plus. Satu rumah DBD → radius 100m berisiko!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'medical-resume-comprehensive',
          title: '📋 Resume Medis Lengkap',
          description: 'Diagnosis, hari demam (H1-H berapa), lab baseline & terendah, terapi, komplikasi (jika ada), kondisi saat discharge, advice follow-up',
          required: true,
          category: 'documentation'
        },
        {
          id: 'sick-leave-certificate',
          title: '📄 Surat Keterangan Sakit',
          description: '7-14 hari untuk recovery optimal. Jelaskan ke employer: kembali kerja bertahap (gradual). NO sick certificate → diskriminasi workplace!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'red-flags-post-discharge',
          title: '🚨 Red Flags Post-Discharge',
          description: 'Kembali SEGERA jika: demam lagi, perdarahan baru, nyeri perut, muntah, sesak napas, lemas berat, pusing berputar. JANGAN tunggu!',
          required: true,
          category: 'safety'
        }
      ]
    },

    // ============================================================
    // NODE 8: INPATIENT WITH WARNING SIGNS
    // 9 items
    // ============================================================
    'dbd-inpatient-warning': {
      id: 'dbd-inpatient-warning',
      type: 'checklist',
      title: 'Node 8: Inpatient Management - Dengue WITH Warning Signs',
      description: '⚠️ Monitoring ketat & IV fluid therapy',
      items: [
        {
          id: 'admit-to-ward-monitoring',
          title: '🏥 Rawat Inap - Ruang Perawatan Monitoring',
          description: 'Bed dengan monitoring vital signs tiap 1-2 jam, intake-output chart, lab serial',
          required: true,
          category: 'action'
        },
        {
          id: 'iv-access-large-bore',
          title: '💉 Pasang IV Line Besar (18G)',
          description: 'Minimal 1 jalur IV perifer dengan abocath besar untuk fluid resuscitation',
          required: true,
          category: 'action'
        },
        {
          id: 'start-iv-crystalloid-initial',
          title: '💧 Mulai Cairan IV Kristaloid',
          description: 'RL atau NaCl 0.9%: 5-7 mL/kgBB/jam untuk 1-2 jam pertama. Monitoring response!',
          required: true,
          category: 'medication'
        },
        {
          id: 'reassess-after-initial-fluid',
          title: '⏱️ Re-Assess Setelah 1-2 Jam',
          description: 'Check: vital signs, Ht (target: turun), urin output (target: >0.5 mL/kg/jam), kondisi klinis',
          required: true,
          category: 'assessment'
        },
        {
          id: 'titrate-iv-fluids-response',
          title: '🎚️ Titrasi Cairan Berdasarkan Respon',
          description: 'GOOD response: turunkan ke 3-5 mL/kg/jam. POOR response: naikkan 5-10 mL/kg/jam ATAU switch ke koloid',
          required: true,
          category: 'medication'
        },
        {
          id: 'monitor-hct-plt-serial',
          title: '🩺 Monitor Ht & Plt Serial (Tiap 6-12 Jam)',
          description: 'Trend Ht: naik >20% baseline = hemokonsentrasi (plasma leak). Plt: turun = risiko perdarahan',
          required: true,
          category: 'assessment'
        },
        {
          id: 'strict-intake-output-chart',
          title: '📊 Strict Intake-Output Charting',
          description: 'Catat semua: IV, oral intake, urin output, IWL. Balance setiap 6 jam. Target urine: >0.5 mL/kg/jam',
          required: true,
          category: 'documentation'
        },
        {
          id: 'watch-critical-phase-inpatient',
          title: '⚠️ Waspadai Fase Kritis (H3-7)',
          description: 'Defervescence = critical phase START! Risiko syok & plasma leakage maksimal 24-48h setelah demam turun!',
          required: true,
          category: 'safety'
        },
        {
          id: 'avoid-fluid-overload',
          title: '⚖️ Hindari Fluid Overload',
          description: 'Excessive fluid → edema paru, efusi masif, asites. Stop IV jika: stabil 24-48h + toleransi oral baik + Ht stabil',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'dbd-inpatient-response-decision'
    },

    // ============================================================
    // NODE 9: INPATIENT RESPONSE DECISION
    // 2 branches
    // ============================================================
    'dbd-inpatient-response-decision': {
      id: 'dbd-inpatient-response-decision',
      type: 'decision',
      title: 'Node 9: Evaluasi Respon Terapi Cairan',
      description: '🎯 Setelah 1-2 jam initial fluid therapy',
      warningLevel: 'warning',
      branches: [
        {
          id: 'good-response-maintenance',
          title: '✅ Respon Baik - Maintenance Fluids',
          description: 'Vital signs stabil atau membaik, Ht turun, urin >0.5 mL/kg/jam, perbaikan klinis',
          icon: '✅',
          color: 'green',
          nextNodeId: 'dbd-maintenance-fluids',
          riskLevel: 'low'
        },
        {
          id: 'poor-response-escalate',
          title: '🚨 Respon Buruk - Escalate ke ICU',
          description: 'TD masih turun, takikardia persisten, Ht tetap naik atau tidak turun, oliguria (<0.5 mL/kg/jam), kondisi memburuk',
          icon: '🚨',
          color: 'red',
          nextNodeId: 'dbd-severe-icu',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 10: MAINTENANCE FLUIDS
    // 3 items
    // ============================================================
    'dbd-maintenance-fluids': {
      id: 'dbd-maintenance-fluids',
      type: 'checklist',
      title: 'Node 10: Maintenance & Tapering IV Fluids',
      description: '⬇️ Tapering bertahap untuk cegah rebound plasma leak',
      items: [
        {
          id: 'taper-iv-gradually',
          title: '⬇️ Turunkan Rate IV Bertahap',
          description: '5-7 → 3-5 → 2-3 mL/kg/jam dalam 24-48 jam. Monitor response setiap step!',
          required: true,
          category: 'medication'
        },
        {
          id: 'stop-iv-when-stable',
          title: '🛑 Stop IV Jika Kriteria Terpenuhi',
          description: 'Stabil 24-48h, toleransi oral baik (>2L/hari), Ht stabil, urin adekuat, NO warning signs',
          required: true,
          category: 'action'
        },
        {
          id: 'discharge-planning-inpatient',
          title: '📋 Discharge Planning',
          description: 'Jika memenuhi kriteria recovery (afebrile 48h, Ht stabil, Plt >50k up) → prepare discharge',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'dbd-recovery-discharge'
    },

    // ============================================================
    // NODE 11: SEVERE DENGUE - ICU MANAGEMENT
    // 12 items
    // ============================================================
    'dbd-severe-icu': {
      id: 'dbd-severe-icu',
      type: 'checklist',
      title: 'Node 11: Severe Dengue / DSS - ICU Emergency!',
      description: '🚨 Resusitasi agresif & advanced life support',
      items: [
        {
          id: 'activate-code-dengue',
          title: '🚨 ACTIVATE CODE DENGUE - ICU STAT',
          description: 'Alert ICU team, siapkan bed ICU, call senior consultant, prepare resuscitation equipment',
          required: true,
          category: 'action'
        },
        {
          id: 'transfer-icu-immediately',
          title: '🏥 Transfer ke ICU / HDU',
          description: 'Monitoring invasif: arterial line, CVP, continuous vitals, lab serial, ABG',
          required: true,
          category: 'action'
        },
        {
          id: 'oxygen-high-flow',
          title: '🫁 Oxygen Therapy - High Flow',
          description: 'O2 4-6 L/menit via NRM, target SpO2 >95%. Jika distress: consider NIV atau intubasi',
          required: true,
          category: 'medication'
        },
        {
          id: 'iv-access-double-large-bore',
          title: '💉 Pasang 2 IV Lines (18G atau Lebih Besar)',
          description: 'Double access untuk resusitasi cairan agresif & transfusi simultan',
          required: true,
          category: 'action'
        },
        {
          id: 'fluid-bolus-crystalloid-20ml',
          title: '💧 Fluid Bolus: 10-20 mL/kgBB Kristaloid',
          description: 'RL atau NS 0.9% bolus dalam 15-30 menit. Re-assess setelah bolus!',
          required: true,
          category: 'medication'
        },
        {
          id: 'reassess-after-bolus',
          title: '⏱️ Re-Assess Setelah Bolus (15-30 menit)',
          description: 'Check: BP, HR, PP, CRT, mental status, urin output. Good? → turunkan rate. Bad? → repeat bolus',
          required: true,
          category: 'assessment'
        },
        {
          id: 'colloid-if-crystalloid-fails',
          title: '🧪 Koloid Jika Kristaloid Gagal',
          description: 'HES 6% atau Gelatin 4% atau Albumin 5%: 10-20 mL/kg dalam 1 jam. Max 2-3 bolus. Watch fluid overload!',
          required: false,
          category: 'medication'
        },
        {
          id: 'blood-transfusion-indications',
          title: '🩸 Transfusi Darah - Indikasi',
          description: 'PRC jika: Hb <10 + syok persisten OR perdarahan masif. TC jika: Plt <20k + bleeding aktif. FFP jika: koagulopati + bleeding',
          required: false,
          category: 'medication'
        },
        {
          id: 'inotrope-if-refractory-shock',
          title: '💊 Inotrope Jika Refractory Shock',
          description: 'Dopamine atau Norepinephrine jika tetap syok setelah fluid resuscitation adekuat. Perlu CVP monitoring!',
          required: false,
          category: 'medication'
        },
        {
          id: 'monitor-organ-function',
          title: '🫀 Monitor Fungsi Organ Serial',
          description: 'Liver: ALT/AST/bilirubin. Ginjal: Cr/BUN/urin output. Koagulasi: PT/aPTT. Metabolik: elektrolit, laktat, ABG',
          required: true,
          category: 'assessment'
        },
        {
          id: 'avoid-overload-severe',
          title: '⚠️ CRITICAL: Hindari Fluid Overload!',
          description: 'Setelah stabilisasi: CEPAT taper cairan! Overload → ARDS, edema paru, efusi masif, asites tension. FATAL!',
          required: true,
          category: 'safety'
        },
        {
          id: 'multidisciplinary-consult',
          title: '👥 Multidisciplinary Consultation',
          description: 'Consult: ICU, hematology (jika bleeding disorder), nephrology (jika AKI), pulmonology (jika ARDS)',
          required: false,
          category: 'action'
        }
      ]
    }
  }
};
