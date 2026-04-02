// ========================================================================
// HIPERTENSI - ACC/AHA 2017 + ESC/ESH 2018 + JNC 8 + WHO Guidelines
// ========================================================================
// Evidence: ACC/AHA 2017, ESC/ESH 2018, JNC 8 (2014), WHO 2021, PERKI
// Flow: Initial Assessment → BP Classification → Risk Stratification → Lifestyle + Medication → Monitoring → Resistant HTN or Emergency
// Target: <140/90 mmHg (general), <130/80 mmHg (high CV risk, DM, CKD)
// Total Nodes: 13 nodes (9 checklist + 4 decision)
// Total Items: 95 checklist items
// ========================================================================

import { DynamicPathway } from '../dynamicPathways';

export const hypertensionPathway: DynamicPathway = {
  diseaseId: 'hypertension',
  diseaseName: 'Hipertensi (Hypertension)',
  startNodeId: 'htn-initial-assessment',
  nodes: {
    
    // ============================================================
    // NODE 1: INITIAL ASSESSMENT & DIAGNOSIS CONFIRMATION
    // 14 items
    // ============================================================
    'htn-initial-assessment': {
      id: 'htn-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment & BP Confirmation',
      description: '🩺 Proper BP measurement & diagnostic workup',
      items: [
        {
          id: 'htn-proper-bp-technique',
          title: '✅ Teknik Pengukuran TD yang BENAR',
          description: 'Pasien duduk 5 menit, kaki rata lantai, punggung tersandar, lengan setinggi jantung, manset pas (80% lingkar lengan), NO bicara, NO HP, bladder kosong',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-multiple-measurements',
          title: '🔁 Ukur TD MINIMAL 2 Kali dengan Jarak 1-2 Menit',
          description: 'Ambil rata-rata dari 2-3 pengukuran. Jika selisih >10 mmHg → ukur lagi. Record BOTH arms untuk detect peripheral artery disease!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-bp-documentation',
          title: '📋 Dokumentasi TD Lengkap',
          description: 'SBP = ___ mmHg, DBP = ___ mmHg. Lengan kanan/kiri. Posisi duduk/berbaring. Waktu: pagi/siang/malam. Sebelum/sesudah obat.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'htn-confirm-elevated-bp',
          title: '⚠️ Konfirmasi TD Tinggi di Kunjungan TERPISAH',
          description: 'JANGAN diagnosis HTN dari 1 kunjungan (kecuali emergency)! Perlu 2-3 kunjungan dalam 1-4 minggu untuk konfirmasi. Atau ABPM/HBPM.',
          required: true,
          category: 'safety'
        },
        {
          id: 'htn-white-coat-screening',
          title: '🏥 Skrining White Coat Hypertension',
          description: 'TD tinggi di klinik tapi normal di rumah? Consider HBPM (Home BP Monitoring) atau ABPM (24-hour ambulatory BP). Prevalence 15-30%!',
          required: false,
          category: 'assessment'
        },
        {
          id: 'htn-symptoms-inquiry',
          title: '🗣️ Anamnesis Gejala Hipertensi',
          description: 'Mayoritas ASIMTOMATIK! Tanyakan: Headache (occipital, pagi hari), dizziness, visual changes, chest pain, dyspnea, palpitasi, epistaksis',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-duration-onset',
          title: '📅 Durasi & Onset Hipertensi',
          description: 'Sejak kapan TD tinggi? Baru terdeteksi atau sudah lama? Riwayat TD sebelumnya? Pregnancy-induced HTN?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-medication-history',
          title: '💊 Riwayat Pengobatan HTN',
          description: 'Sudah minum obat anti-hipertensi? Jenis? Dosis? Compliance? Side effects? Berapa lama? Controlled atau tidak?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-cardiovascular-risk-factors',
          title: '🫀 Identifikasi Faktor Risiko Kardiovaskular',
          description: 'Usia (M>55yo, F>65yo), smoking (current/ex), DM, dyslipidemia, family Hx CVD (M<55yo, F<65yo), obesity (BMI>30), physical inactivity',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-target-organ-damage-screen',
          title: '🎯 Skrining Target Organ Damage (TOD)',
          description: 'HEART: chest pain, dyspnea, orthopnea, PND. BRAIN: TIA, stroke. KIDNEY: nocturia, hematuria, proteinuria. EYE: visual changes. PVD: claudication',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-secondary-causes-screen',
          title: '🔍 Skrining Penyebab Hipertensi Sekunder',
          description: 'Red flags: Usia <30 atau >60 tahun onset baru, resistant HTN, hypokalemia (aldosteronism), abdominal bruit (renal artery stenosis), cushingoid, pheochromocytoma symptoms',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-physical-exam-focused',
          title: '🔬 Pemeriksaan Fisik Fokus',
          description: 'BMI & waist circumference, cardiac exam (S4 gallop, displaced PMI), lung crackles, carotid bruit, abdominal bruit, peripheral pulses, fundoscopy (Keith-Wagener grade)',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-baseline-labs-mandatory',
          title: '🩺 Lab Baseline MANDATORY - Assess CV Risk & TOD',
          description: 'Urinalysis (proteinuria, hematuria), Cr + eGFR (CKD?), K+ (aldosteronism?), Glucose/HbA1c (DM?), Lipid panel (dyslipidemia?), ECG (LVH? old MI?)',
          required: true,
          category: 'assessment'
        },
        {
          id: 'htn-ecg-baseline',
          title: '📈 ECG 12-Lead MANDATORY',
          description: 'Deteksi LVH (Sokolow-Lyon, Cornell criteria), old MI, arrhythmia (AFib), conduction abnormalities. LVH = TOD marker!',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'htn-bp-classification'
    },

    // ============================================================
    // NODE 2: BP CLASSIFICATION DECISION (ACC/AHA 2017)
    // 5 branches
    // ============================================================
    'htn-bp-classification': {
      id: 'htn-bp-classification',
      type: 'decision',
      title: 'Node 2: BP Classification - ACC/AHA 2017 Categories',
      description: '📊 Klasifikasi berdasarkan rata-rata BP dari multiple measurements',
      warningLevel: 'info',
      branches: [
        {
          id: 'normal-bp',
          title: '✅ NORMAL BP - SBP <120 AND DBP <80',
          description: 'Reassurance + healthy lifestyle reinforcement. Recheck BP annually.',
          icon: '✅',
          color: 'green',
          nextNodeId: 'htn-normal-bp-advice',
          riskLevel: 'low'
        },
        {
          id: 'elevated-bp',
          title: '⚠️ ELEVATED BP - SBP 120-129 AND DBP <80',
          description: 'Prehypertension - LIFESTYLE MODIFICATION intensive! High risk progression to HTN.',
          icon: '⚠️',
          color: 'yellow',
          nextNodeId: 'htn-elevated-lifestyle',
          riskLevel: 'low'
        },
        {
          id: 'stage1-htn',
          title: '🟠 STAGE 1 HTN - SBP 130-139 OR DBP 80-89',
          description: 'Assess 10-year ASCVD risk. If ≥10% OR DM/CKD → start meds. If <10% → lifestyle first.',
          icon: '🟠',
          color: 'orange',
          nextNodeId: 'htn-stage1-risk-stratification',
          riskLevel: 'low'
        },
        {
          id: 'stage2-htn',
          title: '🔴 STAGE 2 HTN - SBP ≥140 OR DBP ≥90',
          description: 'START MEDICATIONS immediately + lifestyle! Usually need 2-drug combination.',
          icon: '🔴',
          color: 'red',
          nextNodeId: 'htn-stage2-treatment',
          riskLevel: 'high'
        },
        {
          id: 'hypertensive-emergency',
          title: '🚨 HYPERTENSIVE CRISIS - SBP ≥180 OR DBP ≥120',
          description: 'WITH organ damage (encephalopathy, MI, stroke, AKI, pulmonary edema) = EMERGENCY! ICU IV meds! WITHOUT = urgency, oral meds.',
          icon: '🚨',
          color: 'red',
          nextNodeId: 'htn-hypertensive-crisis',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 3: NORMAL BP - Reassurance & Prevention
    // 5 items
    // ============================================================
    'htn-normal-bp-advice': {
      id: 'htn-normal-bp-advice',
      type: 'checklist',
      title: 'Node 3: Normal BP - Prevention Counseling',
      description: '✅ Maintain healthy lifestyle to prevent HTN',
      items: [
        {
          id: 'normal-congratulate',
          title: '👏 Positive Reinforcement',
          description: 'Bagus! Tekanan darah Anda normal. Pertahankan gaya hidup sehat!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'normal-healthy-lifestyle',
          title: '🥗 Edukasi Gaya Hidup Sehat',
          description: 'DASH diet, reduce sodium <2.3g/hari, exercise 150 min/week, maintain BMI 18.5-24.9, limit alcohol, NO smoking',
          required: true,
          category: 'documentation'
        },
        {
          id: 'normal-weight-management',
          title: '⚖️ Weight Management',
          description: 'Maintain ideal body weight. Setiap 1 kg turun → SBP turun ~1 mmHg!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'normal-annual-screening',
          title: '📅 Annual BP Screening',
          description: 'Recheck BP setiap tahun. Jika ada faktor risiko → setiap 6 bulan.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'normal-risk-factors-modify',
          title: '🎯 Address Modifiable Risk Factors',
          description: 'Jika ada DM, dyslipidemia, smoking → manage agresif untuk prevent CVD!',
          required: false,
          category: 'action'
        }
      ]
    },

    // ============================================================
    // NODE 4: ELEVATED BP - Intensive Lifestyle Modification
    // 8 items
    // ============================================================
    'htn-elevated-lifestyle': {
      id: 'htn-elevated-lifestyle',
      type: 'checklist',
      title: 'Node 4: Elevated BP - Intensive Lifestyle Intervention',
      description: '⚠️ High-risk untuk HTN - Lifestyle FIRST, NO medications yet',
      items: [
        {
          id: 'elevated-explain-prehtn',
          title: '📚 Explain Prehypertension Risk',
          description: 'BP 120-129/<80 = elevated, bukan normal! Risiko tinggi jadi HTN dalam 4 tahun. REVERSIBLE dengan lifestyle!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'elevated-dash-diet-detailed',
          title: '🥗 DASH Diet Education - DETAILED!',
          description: 'Dietary Approaches to Stop Hypertension: Tinggi sayur, buah, whole grain, lean protein, low-fat dairy. Kurangi red meat, sugar, processed food. Effect: -11 mmHg SBP!',
          required: true,
          category: 'action'
        },
        {
          id: 'elevated-sodium-restriction',
          title: '🧂 Sodium Restriction <2.3g/hari (Ideal <1.5g)',
          description: '1 sendok teh garam = 2.3g sodium! Hindari: fast food, processed food, MSG, kecap asin, keju, snack asin. Baca label nutrisi! Effect: -5-6 mmHg',
          required: true,
          category: 'action'
        },
        {
          id: 'elevated-weight-loss-target',
          title: '⚖️ Weight Loss Target - Every 1kg = -1mmHg!',
          description: 'Target: BMI 18.5-24.9, waist <90cm (M) / <80cm (F). Strategi: deficit 500 kcal/hari = 0.5kg/week. SUSTAINABLE!',
          required: true,
          category: 'action'
        },
        {
          id: 'elevated-exercise-prescription',
          title: '🏃 Exercise Prescription - SPECIFIC!',
          description: 'Aerobic: 150 min/week (30 min 5x/week) moderate intensity OR 75 min vigorous. Dynamic resistance: 2-3x/week. Effect: -5-8 mmHg. Start slow jika inactive!',
          required: true,
          category: 'action'
        },
        {
          id: 'elevated-alcohol-limit',
          title: '🍺 Alcohol Limitation',
          description: 'Men: ≤2 drinks/day. Women: ≤1 drink/day. 1 drink = beer 350mL, wine 150mL, spirits 45mL. Excessive alcohol → HTN!',
          required: true,
          category: 'action'
        },
        {
          id: 'elevated-smoking-cessation',
          title: '🚭 Smoking Cessation - MANDATORY!',
          description: 'Smoking → acute BP spike + chronic CVD risk! Rujuk ke smoking cessation program. Consider nicotine replacement therapy.',
          required: true,
          category: 'action'
        },
        {
          id: 'elevated-recheck-3months',
          title: '📅 Follow-Up 3-6 Bulan',
          description: 'Recheck BP setelah intensive lifestyle 3-6 bulan. Jika tetap elevated atau naik → consider medications.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'htn-lifestyle-followup-decision'
    },

    // ============================================================
    // NODE 5: STAGE 1 HTN - Risk Stratification Decision
    // 2 branches
    // ============================================================
    'htn-stage1-risk-stratification': {
      id: 'htn-stage1-risk-stratification',
      type: 'decision',
      title: 'Node 5: Stage 1 HTN - ASCVD Risk Stratification',
      description: '🎯 Tentukan perlu obat ATAU lifestyle saja berdasarkan CV risk',
      warningLevel: 'warning',
      branches: [
        {
          id: 'stage1-low-risk',
          title: '✅ LOW CV RISK - ASCVD <10% & NO DM/CKD',
          description: 'Lifestyle modification intensive 3-6 bulan FIRST. Monitor BP monthly. Start meds jika tidak turun.',
          icon: '✅',
          color: 'green',
          nextNodeId: 'htn-stage1-lifestyle-trial',
          riskLevel: 'low'
        },
        {
          id: 'stage1-high-risk',
          title: '🔴 HIGH CV RISK - ASCVD ≥10% OR DM OR CKD',
          description: 'START MEDICATIONS immediately + lifestyle! Target BP <130/80 mmHg.',
          icon: '🔴',
          color: 'red',
          nextNodeId: 'htn-stage1-medication-initiation',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 6: STAGE 1 LOW RISK - Lifestyle Trial First
    // 6 items
    // ============================================================
    'htn-stage1-lifestyle-trial': {
      id: 'htn-stage1-lifestyle-trial',
      type: 'checklist',
      title: 'Node 6: Stage 1 HTN (Low CV Risk) - Lifestyle Trial',
      description: '🥗 Intensive lifestyle 3-6 bulan sebelum mulai obat',
      items: [
        {
          id: 'stage1low-explain-strategy',
          title: '📚 Explain Treatment Strategy',
          description: 'Stage 1 HTN tapi risiko CV rendah → trial lifestyle dulu 3-6 bulan. Jika tidak turun → mulai obat. Monitor ketat!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'stage1low-comprehensive-lifestyle',
          title: '🎯 Comprehensive Lifestyle Modification',
          description: 'DASH diet, sodium <2.3g, weight loss, exercise 150 min/week, limit alcohol, NO smoking. TARGET: turun 10-20 mmHg!',
          required: true,
          category: 'action'
        },
        {
          id: 'stage1low-home-bp-monitoring',
          title: '🏠 Home BP Monitoring (HBPM) - MANDATORY',
          description: 'Ukur BP di rumah 2x/hari (pagi sebelum obat/sarapan, malam sebelum tidur). Catat log. Automated device validated.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'stage1low-bp-target-education',
          title: '🎯 Target BP Education',
          description: 'Target: <130/80 mmHg dalam 3-6 bulan dengan lifestyle. Jika tidak tercapai → mulai obat.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'stage1low-monthly-followup',
          title: '📅 Monthly Follow-Up Schedule',
          description: 'Kontrol setiap bulan untuk monitor BP & compliance lifestyle. Bring BP log!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'stage1low-medication-criteria',
          title: '💊 Kriteria Mulai Obat',
          description: 'Mulai meds jika: BP tidak turun setelah 3-6 bulan lifestyle ATAU BP naik ke Stage 2 ATAU develop CVD/CKD.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'htn-lifestyle-followup-decision'
    },

    // ============================================================
    // NODE 7: STAGE 1 HIGH RISK - Medication Initiation
    // 10 items
    // ============================================================
    'htn-stage1-medication-initiation': {
      id: 'htn-stage1-medication-initiation',
      type: 'checklist',
      title: 'Node 7: Stage 1 HTN (High Risk) - Start Medications',
      description: '💊 Monotherapy + Lifestyle untuk high CV risk patients',
      items: [
        {
          id: 'stage1high-explain-rationale',
          title: '📚 Explain Medication Rationale',
          description: 'Stage 1 HTN + high CV risk (ASCVD ≥10% OR DM OR CKD) → perlu obat SEGERA + lifestyle untuk prevent stroke/MI/kidney failure!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'stage1high-bp-target',
          title: '🎯 Target BP <130/80 mmHg',
          description: 'Untuk DM, CKD, CAD, stroke history, high CV risk → target ketat <130/80. General population → <140/90.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'stage1high-choose-first-line',
          title: '💊 Pilih First-Line Monotherapy (ACEi/ARB, CCB, atau Thiazide)',
          description: 'ACEi/ARB (prioritas jika DM/CKD/proteinuria), CCB (jika elderly/black population), Thiazide-like diuretic (chlorthalidone preferred). AVOID beta-blocker as first-line!',
          required: true,
          category: 'medication'
        },
        {
          id: 'stage1high-acei-arb-dosing',
          title: '🧪 ACEi/ARB - Start Low, Go Slow',
          description: 'ACEi: Lisinopril 5-10mg OD, Ramipril 2.5-5mg OD. ARB: Losartan 50mg OD, Valsartan 80mg OD, Telmisartan 40mg OD. Check Cr & K+ in 2-4 weeks!',
          required: false,
          category: 'medication'
        },
        {
          id: 'stage1high-ccb-dosing',
          title: '💊 CCB (Calcium Channel Blocker) Dosing',
          description: 'Amlodipine 5mg OD (can ↑ to 10mg), Nifedipine GITS 30mg OD. Side effects: ankle edema, flushing, headache.',
          required: false,
          category: 'medication'
        },
        {
          id: 'stage1high-thiazide-dosing',
          title: '💧 Thiazide-Like Diuretic Dosing',
          description: 'Chlorthalidone 12.5-25mg OD (preferred, longer half-life) OR HCTZ 12.5-25mg OD. Monitor K+ & glucose!',
          required: false,
          category: 'medication'
        },
        {
          id: 'stage1high-side-effects-education',
          title: '⚠️ Side Effects Education & Warnings',
          description: 'ACEi: dry cough (switch to ARB), angioedema (STOP immediately!). ARB: dizziness. CCB: edema. Thiazide: hypokalemia, hyperglycemia, hyperuricemia.',
          required: true,
          category: 'safety'
        },
        {
          id: 'stage1high-contraindications-check',
          title: '🚫 Check Contraindications',
          description: 'ACEi/ARB: pregnancy (teratogenic!), bilateral RAS, hyperkalemia. CCB: severe AS. Thiazide: gout (relative).',
          required: true,
          category: 'safety'
        },
        {
          id: 'stage1high-lifestyle-concurrent',
          title: '🥗 Continue Lifestyle Modification Concurrent!',
          description: 'Obat BUKAN pengganti lifestyle! Tetap DASH diet, exercise, weight loss, low sodium. Synergistic effect!',
          required: true,
          category: 'action'
        },
        {
          id: 'stage1high-followup-2-4weeks',
          title: '📅 Follow-Up 2-4 Minggu Post-Initiation',
          description: 'Check: BP response, side effects, labs (Cr, K+, glucose). Jika BP belum target → uptitrate dose atau add 2nd drug.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'htn-medication-followup'
    },

    // ============================================================
    // NODE 8: STAGE 2 HTN - Immediate Combination Therapy
    // 11 items
    // ============================================================
    'htn-stage2-treatment': {
      id: 'htn-stage2-treatment',
      type: 'checklist',
      title: 'Node 8: Stage 2 HTN - START 2-Drug Combination',
      description: '💊💊 SBP ≥140 OR DBP ≥90 → Combination therapy IMMEDIATELY!',
      items: [
        {
          id: 'stage2-urgency-explain',
          title: '🚨 Explain Treatment Urgency',
          description: 'Stage 2 HTN (≥140/90) → risiko CVD signifikan! Perlu 2 obat sekaligus untuk cepat control BP. Target <130/80 dalam 3 bulan.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'stage2-combination-rationale',
          title: '💊💊 Why Combination Therapy?',
          description: 'Single drug rarely controls Stage 2 HTN. Combination 2 drugs dosis rendah = lebih efektif + lebih sedikit side effects vs 1 drug dosis tinggi!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'stage2-preferred-combinations',
          title: '🎯 Preferred 2-Drug Combinations (Evidence-Based)',
          description: 'BEST: ACEi/ARB + CCB OR ACEi/ARB + Thiazide OR CCB + Thiazide. AVOID: ACEi + ARB (no benefit, more harm). AVOID: BB + Thiazide (metabolic effects).',
          required: true,
          category: 'medication'
        },
        {
          id: 'stage2-acei-ccb-combo',
          title: '💊 Combination Option 1: ACEi/ARB + CCB',
          description: 'Contoh: Lisinopril 10mg + Amlodipine 5mg OD. OR Telmisartan 40mg + Amlodipine 5mg. Excellent for DM, CKD, elderly.',
          required: false,
          category: 'medication'
        },
        {
          id: 'stage2-acei-thiazide-combo',
          title: '💊 Combination Option 2: ACEi/ARB + Thiazide',
          description: 'Contoh: Lisinopril 10mg + HCTZ 12.5mg OD. OR Losartan 50mg + HCTZ 12.5mg. Good for volume overload, black patients.',
          required: false,
          category: 'medication'
        },
        {
          id: 'stage2-ccb-thiazide-combo',
          title: '💊 Combination Option 3: CCB + Thiazide',
          description: 'Contoh: Amlodipine 5mg + Chlorthalidone 12.5mg OD. Good jika ACEi/ARB contraindicated.',
          required: false,
          category: 'medication'
        },
        {
          id: 'stage2-single-pill-combination',
          title: '💊 Prefer Single-Pill Combination (SPC) untuk Compliance',
          description: 'SPC (fixed-dose combination) → better adherence! Contoh: Amlodipine/Valsartan, Lisinopril/HCTZ, Telmisartan/Amlodipine.',
          required: true,
          category: 'medication'
        },
        {
          id: 'stage2-labs-baseline',
          title: '🩺 Labs Before Starting Combination',
          description: 'Cr, eGFR, K+, Na+, glucose, lipid panel. MANDATORY untuk detect contraindications & monitor!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'stage2-lifestyle-essential',
          title: '🥗 Lifestyle Modification TETAP Essential!',
          description: 'Meds bukan magic pill! Sodium <2.3g, DASH diet, weight loss, exercise. Lifestyle → bisa reduce need for 3rd drug!',
          required: true,
          category: 'action'
        },
        {
          id: 'stage2-home-bp-monitoring',
          title: '🏠 Home BP Monitoring Mandatory',
          description: 'Ukur BP 2x/hari, catat log. Bring ke follow-up untuk titration decision!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'stage2-followup-monthly',
          title: '📅 Monthly Follow-Up Until BP at Target',
          description: 'Check BP, side effects, labs (Cr, K+) monthly. Uptitrate atau add 3rd drug jika belum target dalam 3 bulan.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'htn-medication-followup'
    },

    // ============================================================
    // NODE 9: LIFESTYLE FOLLOW-UP DECISION (For Elevated & Stage 1 Low Risk)
    // 3 branches
    // ============================================================
    'htn-lifestyle-followup-decision': {
      id: 'htn-lifestyle-followup-decision',
      type: 'decision',
      title: 'Node 9: Lifestyle Trial Follow-Up (3-6 Bulan)',
      description: '📊 Evaluasi respon lifestyle intervention',
      warningLevel: 'warning',
      branches: [
        {
          id: 'lifestyle-success',
          title: '✅ BP Controlled - Continue Lifestyle',
          description: 'BP turun ke <130/80 dengan lifestyle alone! Maintain strategi, monitor setiap 3-6 bulan.',
          icon: '✅',
          color: 'green',
          nextNodeId: 'htn-lifestyle-success-maintenance',
          riskLevel: 'low'
        },
        {
          id: 'lifestyle-partial',
          title: '⚠️ Partial Response - Intensify OR Add Meds',
          description: 'BP turun tapi belum target. Assess compliance lifestyle. Jika sudah maksimal → consider meds.',
          icon: '⚠️',
          color: 'yellow',
          nextNodeId: 'htn-stage1-medication-initiation',
          riskLevel: 'low'
        },
        {
          id: 'lifestyle-failure',
          title: '🔴 No Response OR Progression - Start Meds',
          description: 'BP tidak turun atau naik ke Stage 2. START medications now!',
          icon: '🔴',
          color: 'red',
          nextNodeId: 'htn-stage1-medication-initiation',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 10: LIFESTYLE SUCCESS - Maintenance & Monitoring
    // 5 items
    // ============================================================
    'htn-lifestyle-success-maintenance': {
      id: 'htn-lifestyle-success-maintenance',
      type: 'checklist',
      title: 'Node 10: BP Controlled with Lifestyle - Maintenance',
      description: '✅ Pertahankan lifestyle & monitor long-term',
      items: [
        {
          id: 'success-congratulate',
          title: '🎉 Congratulate Achievement!',
          description: 'Excellent! BP controlled dengan lifestyle alone. Ini membuktikan power of healthy living!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'success-maintain-habits',
          title: '🎯 Maintain Healthy Habits LIFELONG',
          description: 'DASH diet, low sodium, exercise, healthy weight BUKAN program sementara - ini lifestyle SELAMANYA!',
          required: true,
          category: 'documentation'
        },
        {
          id: 'success-periodic-monitoring',
          title: '📅 Periodic BP Monitoring',
          description: 'Recheck BP setiap 3-6 bulan di klinik. Continue home BP monitoring 1-2x/minggu untuk early detection.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'success-watch-progression',
          title: '⚠️ Watch for Progression',
          description: 'HTN bisa develop over time meskipun lifestyle baik (age, genetics). Jika BP naik lagi → consider meds.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'success-cv-risk-optimization',
          title: '🫀 Continue CV Risk Optimization',
          description: 'Check lipid panel, glucose, manage ALL CV risk factors (tidak hanya BP). Prevent CVD holistically!',
          required: true,
          category: 'action'
        }
      ]
    },

    // ============================================================
    // NODE 11: MEDICATION FOLLOW-UP & TITRATION
    // 10 items
    // ============================================================
    'htn-medication-followup': {
      id: 'htn-medication-followup',
      type: 'checklist',
      title: 'Node 11: Medication Follow-Up & Titration',
      description: '📊 Monitor response, side effects, labs & adjust treatment',
      items: [
        {
          id: 'fu-bp-measurement',
          title: '🩺 Proper BP Measurement - In-Office',
          description: 'Multiple measurements dengan proper technique. Compare dengan home BP log.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fu-target-assessment',
          title: '🎯 Assess BP Target Achievement',
          description: 'Target: <130/80 (high risk), <140/90 (general). Achieved? Maintenance. Not achieved? Uptitrate or add drug.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fu-medication-adherence',
          title: '💊 Assess Medication Adherence',
          description: 'Tanyakan: lupa minum obat? Side effects mengganggu? Biaya terlalu mahal? Barriers to adherence?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fu-side-effects-screen',
          title: '⚠️ Screen for Side Effects',
          description: 'ACEi: cough? ARB: dizziness? CCB: ankle edema? Thiazide: frequent urination? Adjust jika intolerable!',
          required: true,
          category: 'safety'
        },
        {
          id: 'fu-labs-monitoring',
          title: '🩺 Labs Monitoring',
          description: 'Cr, eGFR, K+ (especially ACEi/ARB users), Na+, glucose (thiazide users). Frequency: 2-4 weeks post-change, then 3-6 months.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fu-lifestyle-compliance',
          title: '🥗 Reassess Lifestyle Compliance',
          description: 'Sodium intake? Weight change? Exercise frequency? Reinforcement education!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fu-dose-optimization',
          title: '📈 Dose Optimization Strategy',
          description: 'Jika BP belum target: FIRST uptitrate current drug to max dose, THEN add 2nd/3rd drug. Sequential approach.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fu-add-third-drug',
          title: '💊 Adding Third Drug (Triple Therapy)',
          description: 'Jika 2 drugs belum cukup → add 3rd class. Ideal: ACEi/ARB + CCB + Thiazide. Consider resistant HTN workup!',
          required: false,
          category: 'medication'
        },
        {
          id: 'fu-comorbidity-optimization',
          title: '🫀 Optimize Comorbidity Management',
          description: 'DM control (HbA1c <7%), lipid control (statin jika indicated), antiplatelet jika CAD. Holistic approach!',
          required: true,
          category: 'action'
        },
        {
          id: 'fu-next-visit-schedule',
          title: '📅 Schedule Next Follow-Up',
          description: 'Monthly jika uncontrolled atau med changes. Every 3-6 months jika BP at target & stable.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'htn-control-status-decision'
    },

    // ============================================================
    // NODE 12: BP CONTROL STATUS DECISION
    // 3 branches
    // ============================================================
    'htn-control-status-decision': {
      id: 'htn-control-status-decision',
      type: 'decision',
      title: 'Node 12: BP Control Status - Next Steps?',
      description: '📊 Evaluate current BP control & determine pathway',
      warningLevel: 'info',
      branches: [
        {
          id: 'bp-controlled-stable',
          title: '✅ BP CONTROLLED & STABLE - Maintenance',
          description: 'BP at target dengan current regimen. Continue medications + lifestyle. Monitor 3-6 bulan.',
          icon: '✅',
          color: 'green',
          nextNodeId: 'htn-maintenance-longterm',
          riskLevel: 'low'
        },
        {
          id: 'bp-uncontrolled-compliant',
          title: '⚠️ UNCONTROLLED despite ≥3 Drugs - Resistant HTN',
          description: 'BP tidak terkontrol meskipun 3 drugs (termasuk diuretik) dosis optimal + lifestyle. Workup resistant HTN!',
          icon: '⚠️',
          color: 'orange',
          nextNodeId: 'htn-resistant-workup',
          riskLevel: 'high'
        },
        {
          id: 'bp-crisis-symptoms',
          title: '🚨 HYPERTENSIVE CRISIS - Emergency Referral',
          description: 'BP ≥180/120 WITH symptoms (headache, visual changes, chest pain, dyspnea, neuro deficits) → ER NOW!',
          icon: '🚨',
          color: 'red',
          nextNodeId: 'htn-hypertensive-crisis',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 13: LONG-TERM MAINTENANCE (Controlled BP)
    // 7 items
    // ============================================================
    'htn-maintenance-longterm': {
      id: 'htn-maintenance-longterm',
      type: 'checklist',
      title: 'Node 13: Long-Term Maintenance - Controlled HTN',
      description: '✅ Sustain BP control & prevent complications',
      items: [
        {
          id: 'maint-continue-medications',
          title: '💊 Continue Current Medication Regimen',
          description: 'HTN = chronic disease! Obat harus diminum SEUMUR HIDUP kecuali dokter instruksikan stop. JANGAN stop sendiri!',
          required: true,
          category: 'medication'
        },
        {
          id: 'maint-adherence-strategies',
          title: '📋 Adherence Strategies',
          description: 'Pill organizer, smartphone reminder, couple dengan rutinitas (breakfast, bedtime), refill auto, involve family support.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'maint-home-bp-monitoring',
          title: '🏠 Continue Home BP Monitoring',
          description: '1-2x per minggu cukup jika controlled. Catat untuk follow-up. Alert jika >130/80 persistent.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'maint-lifestyle-sustain',
          title: '🥗 Sustain Lifestyle Modifications',
          description: 'Healthy lifestyle PERMANENT, bukan temporary! Weight maintenance, exercise, low sodium → bisa reduce medication needs.',
          required: true,
          category: 'action'
        },
        {
          id: 'maint-annual-labs',
          title: '🩺 Annual Labs & Screening',
          description: 'Yearly: Cr, eGFR, K+, lipid panel, HbA1c/glucose, urinalysis. ECG setiap 3-5 tahun. Echo jika indicated.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'maint-cv-risk-management',
          title: '🫀 Comprehensive CV Risk Management',
          description: 'Aspirin jika ASCVD >10%, statin jika dyslipidemia, DM control, smoking cessation. Treat the WHOLE patient!',
          required: true,
          category: 'action'
        },
        {
          id: 'maint-periodic-followup',
          title: '📅 Periodic Follow-Up Schedule',
          description: 'Every 3-6 bulan jika stable. Sooner jika: med changes, symptoms, comorbidities.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 14: RESISTANT HYPERTENSION WORKUP
    // 12 items
    // ============================================================
    'htn-resistant-workup': {
      id: 'htn-resistant-workup',
      type: 'checklist',
      title: 'Node 14: Resistant Hypertension - Systematic Workup',
      description: '🔍 Uncontrolled pada ≥3 drugs → investigate causes',
      items: [
        {
          id: 'resistant-definition-confirm',
          title: '📋 Confirm TRUE Resistant HTN Definition',
          description: 'BP ≥130/80 despite 3 drugs (ACEi/ARB + CCB + diuretic) dosis optimal OR controlled dengan ≥4 drugs. AND good adherence!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'resistant-pseudo-causes',
          title: '⚠️ Rule Out PSEUDO-Resistant HTN',
          description: '1) Poor adherence (most common!), 2) White coat HTN (confirm ABPM!), 3) Improper BP technique, 4) Suboptimal dosing',
          required: true,
          category: 'assessment'
        },
        {
          id: 'resistant-medication-review',
          title: '💊 Review ALL Medications for Interfering Drugs',
          description: 'NSAIDs (ibuprofen, diklofenak), steroids, oral contraceptives, decongestants (pseudoephedrine), antidepressants (venlafaxine), immunosuppressants (cyclosporine)',
          required: true,
          category: 'assessment'
        },
        {
          id: 'resistant-lifestyle-barriers',
          title: '🥗 Identify Lifestyle Barriers',
          description: 'Excessive sodium intake (check 24h urine sodium >3g/day?), obesity (BMI >30), excessive alcohol (>2 drinks/day)',
          required: true,
          category: 'assessment'
        },
        {
          id: 'resistant-secondary-htn-screen',
          title: '🔍 Screen for SECONDARY Hypertension Causes',
          description: 'Primary aldosteronism (most common!), renal artery stenosis, pheochromocytoma, Cushing syndrome, thyroid disorders, coarctation of aorta, OSA',
          required: true,
          category: 'assessment'
        },
        {
          id: 'resistant-aldosterone-renin-ratio',
          title: '🧪 Aldosterone-Renin Ratio (ARR) - Screen Primary Aldosteronism',
          description: 'Morning sample, sitting. ARR >20-30 + aldosterone >15 ng/dL = suspect! Confirm dengan salt suppression test. Prevalence 10-20% resistant HTN!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'resistant-renal-artery-duplex',
          title: '🩻 Renal Artery Duplex Ultrasound',
          description: 'Screen renal artery stenosis jika: abdominal bruit, flash pulmonary edema, asymmetric kidneys, onset <30 or >60 yo, worsening renal function on ACEi',
          required: false,
          category: 'assessment'
        },
        {
          id: 'resistant-sleep-apnea-screen',
          title: '😴 Screen Obstructive Sleep Apnea (OSA)',
          description: 'STOP-BANG score. Prevalence 50-80% resistant HTN! Snoring, daytime sleepiness, witnessed apnea, obesity, neck circumference >40cm. CPAP → BP turun!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'resistant-optimize-diuretic',
          title: '💧 Optimize Diuretic Therapy',
          description: 'Switch HCTZ → Chlorthalidone (more potent, longer half-life) 25mg. OR add loop diuretic jika CKD (eGFR <30). OR add spironolactone 25-50mg!',
          required: true,
          category: 'medication'
        },
        {
          id: 'resistant-add-spironolactone',
          title: '💊 Add Spironolactone (4th Drug) - Evidence-Based!',
          description: 'Spironolactone 25-50mg OD = MOST effective 4th drug! ASCOT-PATHWAY trial. Monitor K+ closely (risk hyperkalemia esp with ACEi/ARB). Avoid jika Cr >2.5 or K+ >5.',
          required: true,
          category: 'medication'
        },
        {
          id: 'resistant-specialist-referral',
          title: '👨‍⚕️ Referral ke Hypertension Specialist',
          description: 'Consider rujuk ke cardiologist/nephrologist jika: persistent resistant HTN, secondary causes suspected, young patient, rapid onset',
          required: true,
          category: 'action'
        },
        {
          id: 'resistant-device-therapy-consider',
          title: '⚡ Consider Device-Based Therapy (Refractory Cases)',
          description: 'Renal denervation (investigational), carotid baroreceptor stimulation. Only di specialized centers untuk truly refractory HTN!',
          required: false,
          category: 'action'
        }
      ]
    },

    // ============================================================
    // NODE 15: HYPERTENSIVE CRISIS (Emergency/Urgency)
    // 10 items
    // ============================================================
    'htn-hypertensive-crisis': {
      id: 'htn-hypertensive-crisis',
      type: 'checklist',
      title: 'Node 15: Hypertensive Crisis - BP ≥180/120',
      description: '🚨 Differentiate Emergency (with TOD) vs Urgency (no TOD)',
      items: [
        {
          id: 'crisis-repeat-bp-confirm',
          title: '🩺 REPEAT BP Measurement - Confirm Crisis',
          description: 'Proper technique, proper cuff size, both arms. Recheck after 5 min rest. Eliminate white coat effect.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'crisis-symptoms-screen',
          title: '🚨 Screen for EMERGENCY Symptoms (Acute TOD)',
          description: 'Hypertensive encephalopathy (headache, confusion, seizure, visual changes), acute MI/ACS (chest pain), acute pulmonary edema (dyspnea, orthopnea), acute stroke/TIA, aortic dissection, eclampsia, AKI',
          required: true,
          category: 'safety'
        },
        {
          id: 'crisis-emergency-vs-urgency',
          title: '⚠️ DIFFERENTIATE: Emergency vs Urgency',
          description: 'EMERGENCY: BP ≥180/120 + acute TOD → IV meds, ICU, rapid BP reduction. URGENCY: BP ≥180/120 + NO TOD → oral meds, observation, gradual reduction 24-48h.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'crisis-emergency-transfer-icu',
          title: '🚨 HYPERTENSIVE EMERGENCY - Transfer ICU STAT!',
          description: 'Jika ada acute TOD → IV antihypertensive (nicardipine, labetalol, nitroprusside), arterial line monitoring, ICU care. Target: reduce MAP 10-20% dalam 1 jam, max 25% dalam 24h. AVOID rapid drop!',
          required: false,
          category: 'action'
        },
        {
          id: 'crisis-urgency-oral-meds',
          title: '💊 HYPERTENSIVE URGENCY - Oral Medications',
          description: 'NO acute TOD → give oral meds (captopril 25mg PO, clonidine 0.1-0.2mg PO, labetalol 200mg PO). Observe 4-6 jam. Target: gradual reduction over 24-48h.',
          required: false,
          category: 'medication'
        },
        {
          id: 'crisis-avoid-immediate-release-nifedipine',
          title: '🚫 AVOID Immediate-Release Nifedipine (Outdated!)',
          description: 'IR nifedipine sublingual → unpredictable rapid BP drop → stroke/MI! NEVER use! Use alternatives (captopril, labetalol, clonidine).',
          required: true,
          category: 'safety'
        },
        {
          id: 'crisis-workup-precipitants',
          title: '🔍 Identify Precipitating Factors',
          description: 'Med noncompliance (most common!), cocaine/amphetamine use, NSAID use, pregnancy (preeclampsia?), pheochromocytoma crisis, MAO inhibitor interaction',
          required: true,
          category: 'assessment'
        },
        {
          id: 'crisis-labs-urgent',
          title: '🩺 Urgent Labs & Imaging',
          description: 'CBC, Cr, BUN, electrolytes, urinalysis (hematuria, proteinuria?), troponin (if chest pain), ECG, CXR (pulmonary edema?), head CT (if neuro symptoms)',
          required: true,
          category: 'assessment'
        },
        {
          id: 'crisis-long-term-plan',
          title: '📋 Long-Term BP Management Plan Post-Crisis',
          description: 'After stabilization → investigate WHY crisis occurred. Optimize chronic BP control. Adherence counseling. Close follow-up.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'crisis-patient-education',
          title: '📚 Patient Education - Prevent Recurrence',
          description: 'NEVER skip medications! Regular follow-up. Lifestyle adherence. Recognize warning symptoms. Emergency contact info.',
          required: true,
          category: 'documentation'
        }
      ]
    }
  }
};
