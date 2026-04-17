// ========================================================================
// SUPRAVENTRICULAR TACHYCARDIA (TaSuV) - PERKI + Perhimpunan Aritmia Indonesia
// ========================================================================
// Evidence: Pedoman Tatalaksana Takiaritmia Supraventrikular PERKI 2022,
// ACC/AHA/ESC Guidelines 2019, Perhimpunan Aritmia Indonesia
// Flow: Initial Assessment → Hemodynamic Stability → Stable (Vagal+Meds) OR Unstable (Cardioversion) 
// → Conversion Success → Long-term Management OR Ablation Referral
// Critical: ACLS-ready, ECG 12-lead mandatory, IV access, crash cart standby
// Total Nodes: 14 nodes (10 checklist + 4 decision)
// Total Items: 92 checklist items
// ========================================================================

import { DynamicPathway } from'../dynamicPathways';

export const svtPathway: DynamicPathway = {
 diseaseId:'svt',
 diseaseName:'Supraventricular Tachycardia (Takiaritmia Supraventrikular)',
 startNodeId:'svt-initial-assessment',
 nodes: {
 
 // ============================================================
 // NODE 1: INITIAL ASSESSMENT & ECG DIAGNOSIS (H0 - First 5 Minutes)
 // 13 items
 // ============================================================
'svt-initial-assessment': {
 id:'svt-initial-assessment',
 type:'checklist',
 title:'Node 1: Initial Assessment - First 5 Minutes (EMERGENCY!)',
 description:' Rapid assessment, ECG diagnosis, prepare for intervention',
 items: [
 {
 id:'svt-abcde-primary-survey',
 title:' PRIMARY SURVEY - ABCDE',
 description:'Airway patent? Breathing adequate? Circulation (pulse, BP)? Disability (consciousness)? Exposure (monitor attachment)',
 required: true,
 category:'assessment'
 },
 {
 id:'svt-vital-signs-immediate',
 title:' Vital Signs STAT - Continuous Monitoring',
 description:'Heart Rate (count!), BP, RR, SpO2, Temperature. Attach cardiac monitor IMMEDIATELY! HR usually 150-250 bpm for SVT.',
 required: true,
 category:'assessment'
 },
 {
 id:'svt-symptoms-inquiry',
 title:' Anamnesis Kilat - Gejala Akut',
 description:'Palpitasi onset mendadak? Chest pain/discomfort? Dyspnea? Dizziness/presyncope? Syncope (red flag!)? Durasi episode?',
 required: true,
 category:'assessment'
 },
 {
 id:'svt-hemodynamic-stability-screen',
 title:' HEMODYNAMIC STABILITY ASSESSMENT - CRITICAL!',
 description:'UNSTABLE jika: Altered mental status, Chest pain (ischemia), Acute heart failure (pulmonary edema), Hypotension (SBP <90 mmHg), Shock signs. ANY ONE = UNSTABLE!',
 required: true,
 category:'safety'
 },
 {
 id:'svt-ecg-12-lead-stat',
 title:' ECG 12-Lead STAT - Dalam 5 Menit!',
 description:'MANDATORY! Record ECG DURING tachycardia untuk diagnosis. Jika converting spontan → record post-conversion ECG juga (WPW? delta wave?)',
 required: true,
 category:'assessment'
 },
 {
 id:'svt-ecg-interpretation-svt',
 title:' ECG Interpretation - Confirm SVT',
 description:'Narrow QRS (<120ms = supraventricular). Regular rhythm. HR 150-250 bpm. P wave: absent/inverted/after QRS (different from sinus). NO AV block.',
 required: true,
 category:'assessment'
 },
 {
 id:'svt-differential-diagnosis-ecg',
 title:' Differential Diagnosis via ECG',
 description:'AVNRT (most common, no visible P): HR 150-250, regular, retrograde P in QRS. AVRT (WPW): delta wave on baseline. Atrial flutter: sawtooth pattern. Atrial tach: visible P before QRS.',
 required: true,
 category:'assessment'
 },
 {
 id:'svt-iv-access-large-bore',
 title:' IV Access - Large Bore (18G)',
 description:'Minimal 1 jalur IV perifer besar untuk adenosine/medications. Two lines preferred untuk unstable patients!',
 required: true,
 category:'action'
 },
 {
 id:'svt-oxygen-supplementation',
 title:' Oxygen Supplementation',
 description:'O2 nasal cannula 2-4 L/min jika SpO2 <94% atau dyspnea. Prepare for intubation jika unstable!',
 required: false,
 category:'medication'
 },
 {
 id:'svt-crash-cart-standby',
 title:' Crash Cart & Defibrillator STANDBY',
 description:'Prepare defibrillator di bedside! Cardioversion pads ON patient jika unstable atau high-risk. Set synchronized mode!',
 required: true,
 category:'safety'
 },
 {
 id:'svt-previous-episodes-history',
 title:' Riwayat Episode Sebelumnya',
 description:'Pernah SVT sebelumnya? Frekuensi? Trigger? How terminated (spontan, vagal, meds, cardioversion)? Riwayat WPW atau ablation?',
 required: true,
 category:'assessment'
 },
 {
 id:'svt-cardiac-history-comorbid',
 title:' Cardiac History & Comorbidities',
 description:'Structural heart disease (CAD, valvular, cardiomyopathy)? Heart failure? Previous MI? Medications (beta-blocker, digoxin, AAD)?',
 required: true,
 category:'assessment'
 },
 {
 id:'svt-contraindications-check',
 title:' Check Contraindications untuk Treatment',
 description:'Asthma/COPD severe (adenosine relative contraindication). Hypotension (avoid beta-blocker/CCB). WPW with AFib (NO adenosine/CCB/digoxin → VFib!).',
 required: true,
 category:'safety'
 }
 ],
 nextNodeId:'svt-hemodynamic-stability-decision'
 },

 // ============================================================
 // NODE 2: HEMODYNAMIC STABILITY DECISION - Critical Branch Point
 // 2 branches
 // ============================================================
'svt-hemodynamic-stability-decision': {
 id:'svt-hemodynamic-stability-decision',
 type:'decision',
 title:'Node 2: Hemodynamic Stability - IMMEDIATE Decision',
 description:' Unstable = Cardioversion NOW! Stable = Vagal maneuvers + Meds',
 warningLevel:'critical',
 branches: [
 {
 id:'svt-unstable',
 title:' UNSTABLE - CARDIOVERSION STAT!',
 description:'Altered consciousness, chest pain (ongoing ischemia), acute HF (pulmonary edema), hypotension (SBP <90), shock. DO NOT DELAY!',
 icon:'',
 color:'red',
 nextNodeId:'svt-unstable-cardioversion',
 riskLevel:'high'
 },
 {
 id:'svt-stable',
 title:' STABLE - Vagal Maneuvers + Medications',
 description:'Alert, no chest pain, BP normal, no HF signs. Sequential approach: vagal → adenosine → rate control → cardioversion if fail.',
 icon:'',
 color:'green',
 nextNodeId:'svt-stable-vagal-maneuvers',
 riskLevel:'low'
 }
 ]
 },

 // ============================================================
 // NODE 3: UNSTABLE SVT - SYNCHRONIZED CARDIOVERSION (EMERGENCY!)
 // 10 items
 // ============================================================
'svt-unstable-cardioversion': {
 id:'svt-unstable-cardioversion',
 type:'checklist',
 title:'Node 3: UNSTABLE SVT - Synchronized Cardioversion STAT!',
 description:' Electrical cardioversion is treatment of choice for unstable SVT',
 items: [
 {
 id:'unstable-call-code-team',
 title:' CALL CODE TEAM / RESUSCITATION TEAM',
 description:'Alert cardiologist, anesthesiologist if available. Prepare for advanced airway management.',
 required: true,
 category:'action'
 },
 {
 id:'unstable-prepare-sedation',
 title:' Prepare Procedural Sedation (If Time Permits)',
 description:'Midazolam 1-2mg IV slow OR Propofol 0.5mg/kg OR Etomidate 0.1-0.2mg/kg. ONLY if hemodynamically allows! Skip jika syok/arrest imminent!',
 required: false,
 category:'medication'
 },
 {
 id:'unstable-attach-pads',
 title:' Attach Defibrillator Pads - SYNCHRONIZED MODE',
 description:'Anterolateral position (right upper chest + left lateral). SET TO SYNCHRONIZED MODE! Check sync marker on QRS. NOT unsynchronized!',
 required: true,
 category:'action'
 },
 {
 id:'unstable-initial-energy-level',
 title:' Initial Energy Level: 50-100 Joules (Synchronized)',
 description:'Narrow-complex SVT: Start 50-100J. If fail → escalate 100-200J. Biphasic preferred. Charge defibrillator!',
 required: true,
 category:'action'
 },
 {
 id:'unstable-clear-shock',
 title:'"CLEAR!" - Deliver Synchronized Shock',
 description:'Announce"oxygen OFF, everyone CLEAR!". Visual check all clear. Press SHOCK button. May need to hold button (synced shock has delay).',
 required: true,
 category:'action'
 },
 {
 id:'unstable-assess-rhythm-post-shock',
 title:' Assess Rhythm Immediately Post-Shock',
 description:'Check monitor: converted to sinus? Still SVT? Escalate energy if not converted. Maximum 3 attempts before pharmacological.',
 required: true,
 category:'assessment'
 },
 {
 id:'unstable-post-cardioversion-ecg',
 title:' ECG 12-Lead Post-Cardioversion',
 description:'Document rhythm post-cardioversion. Look for WPW pattern (delta wave), pre-excitation. Assess for ischemia.',
 required: true,
 category:'assessment'
 },
 {
 id:'unstable-monitor-vital-signs',
 title:' Continuous Monitoring Post-Cardioversion',
 description:'Vital signs setiap 5 menit x 30 menit. Watch for: recurrent SVT, hypotension (sedation), arrhythmias, skin burns.',
 required: true,
 category:'assessment'
 },
 {
 id:'unstable-if-failed-cardioversion',
 title:' If Cardioversion Failed (Rare)',
 description:'Consider: incorrect diagnosis (VT?), wrong energy, not synchronized, resistant SVT. Try pharmacological (amiodarone) OR repeat cardioversion higher energy.',
 required: false,
 category:'action'
 },
 {
 id:'unstable-icu-admission',
 title:' Admit to ICU / Cardiac Monitoring Unit',
 description:'Unstable SVT → ICU monitoring post-cardioversion. Cardiology consult. Investigate underlying cause. Plan long-term management.',
 required: true,
 category:'action'
 }
 ],
 nextNodeId:'svt-post-conversion-management'
 },

 // ============================================================
 // NODE 4: STABLE SVT - VAGAL MANEUVERS (First-Line for Stable)
 // 9 items
 // ============================================================
'svt-stable-vagal-maneuvers': {
 id:'svt-stable-vagal-maneuvers',
 type:'checklist',
 title:'Node 4: STABLE SVT - Vagal Maneuvers (First-Line)',
 description:' Safe, non-pharmacological termination. Success rate ~25-50% for AVNRT/AVRT',
 items: [
 {
 id:'vagal-explain-procedure',
 title:' Explain Vagal Maneuvers to Patient',
 description:'Jelaskan tujuan: stimulasi saraf vagus untuk"reset" jantung. Safe, non-invasive. Mungkin perlu beberapa kali attempt.',
 required: true,
 category:'documentation'
 },
 {
 id:'vagal-continue-monitoring',
 title:' Continuous ECG Monitoring During Maneuvers',
 description:'MANDATORY continuous monitor untuk detect conversion ATAU dangerous rhythm (bradycardia, asystole - rare tapi possible!).',
 required: true,
 category:'safety'
 },
 {
 id:'vagal-modified-valsalva',
 title:' MODIFIED VALSALVA MANEUVER - MOST EFFECTIVE!',
 description:'TECHNIQUE: 1) Strain against 10mL syringe selama 15 detik (supine), 2) IMMEDIATELY setelah strain → passive leg raise 45° selama 15 detik. SUCCESS RATE 43% (vs 17% standard Valsalva)! Evidence: REVERT trial.',
 required: true,
 category:'action'
 },
 {
 id:'vagal-carotid-sinus-massage',
 title:' CAROTID SINUS MASSAGE (If Valsalva Fails)',
 description:'TECHNIQUE: Palpate carotid pulse di bawah angle of jaw. Massage firm selama 5-10 detik. ONE SIDE only! CONTRAINDICATION: carotid bruit, stroke history, elderly >65yo. Risk: stroke, asystole!',
 required: false,
 category:'action'
 },
 {
 id:'vagal-ice-water-face-immersion',
 title:' COLD WATER FACIAL IMMERSION (Diving Reflex)',
 description:'TECHNIQUE: Immerse wajah di ice-cold water 10-15 detik OR ice pack di wajah. Especially effective di pediatric! Safe alternative ke carotid massage.',
 required: false,
 category:'action'
 },
 {
 id:'vagal-avoid-ineffective-methods',
 title:' AVOID INEFFECTIVE/DANGEROUS Maneuvers',
 description:'JANGAN: eyeball pressure (retinal detachment risk!), abdominal pressure (ineffective), bilateral carotid massage (NEVER!). Cough alone (low efficacy).',
 required: true,
 category:'safety'
 },
 {
 id:'vagal-assess-response',
 title:' Assess Response to Vagal Maneuvers',
 description:'SUCCESS: Tiba-tiba convert ke sinus rhythm (HR drop drastis, regular P waves). FAIL: tetap SVT. PARTIAL: sementara slow tapi tidak convert.',
 required: true,
 category:'assessment'
 },
 {
 id:'vagal-document-results',
 title:' Document Vagal Maneuver Results',
 description:'Catat: maneuver apa yang dicoba, berapa kali, response (convert/fail), ECG strip pre & post-maneuver.',
 required: true,
 category:'documentation'
 },
 {
 id:'vagal-prepare-adenosine',
 title:' Prepare Adenosine Jika Vagal Gagal',
 description:'Jika vagal maneuvers FAIL setelah 2-3 attempts → proceed to ADENOSINE (next step). Jangan delay >5-10 menit!',
 required: true,
 category:'action'
 }
 ],
 nextNodeId:'svt-vagal-response-decision'
 },

 // ============================================================
 // NODE 5: VAGAL MANEUVER RESPONSE DECISION
 // 2 branches
 // ============================================================
'svt-vagal-response-decision': {
 id:'svt-vagal-response-decision',
 type:'decision',
 title:'Node 5: Vagal Maneuver Response - Success or Failed?',
 description:' Evaluate conversion to sinus rhythm',
 warningLevel:'info',
 branches: [
 {
 id:'vagal-success',
 title:' CONVERTED to Sinus Rhythm',
 description:'Vagal maneuver successful! HR normal, regular P waves, asymptomatic. Proceed to post-conversion care.',
 icon:'',
 color:'green',
 nextNodeId:'svt-post-conversion-management',
 riskLevel:'low'
 },
 {
 id:'vagal-failed',
 title:' FAILED - Still in SVT',
 description:'Vagal maneuvers tidak berhasil setelah 2-3 attempts. Proceed to ADENOSINE therapy.',
 icon:'',
 color:'orange',
 nextNodeId:'svt-adenosine-therapy',
 riskLevel:'low'
 }
 ]
 },

 // ============================================================
 // NODE 6: ADENOSINE THERAPY - Most Effective Pharmacological
 // 12 items
 // ============================================================
'svt-adenosine-therapy': {
 id:'svt-adenosine-therapy',
 type:'checklist',
 title:'Node 6: ADENOSINE Therapy - Drug of Choice for SVT',
 description:' Success rate >90% for AVNRT/AVRT! Ultra-short half-life (10 seconds)',
 items: [
 {
 id:'adenosine-check-contraindications',
 title:' Check CONTRAINDICATIONS untuk Adenosine',
 description:'ABSOLUTE: 2nd/3rd degree AV block, sick sinus syndrome, severe asthma (bronchospasm!), WPW with AFib. RELATIVE: recent dipyridamole (potentiates!), theophylline (antagonizes).',
 required: true,
 category:'safety'
 },
 {
 id:'adenosine-warn-patient',
 title:' WARN Patient Tentang Side Effects',
 description:'EXPLAIN:"Obat ini akan membuat jantung berhenti sebentar (3-5 detik). Anda akan merasa: chest tightness, dyspnea, flushing, sense of impending doom. HANYA 10-15 detik! NORMAL!" Informed consent!',
 required: true,
 category:'documentation'
 },
 {
 id:'adenosine-prepare-dose',
 title:' Prepare ADENOSINE 6mg (Initial Dose)',
 description:'Adenosine 6mg IV (first dose). Prepare TWO syringes: Syringe 1 = Adenosine 6mg, Syringe 2 = NS flush 20mL. Large-bore IV PROXIMAL (AC fossa preferred).',
 required: true,
 category:'medication'
 },
 {
 id:'adenosine-rapid-push-technique',
 title:' RAPID IV PUSH Technique - CRITICAL!',
 description:'TECHNIQUE: 1) Push adenosine CEPAT (<3 detik), 2) IMMEDIATELY follow dengan NS 20mL flush CEPAT, 3) ELEVATE arm untuk facilitate flow ke central circulation. SPEED IS CRITICAL (half-life 10 sec)!',
 required: true,
 category:'action'
 },
 {
 id:'adenosine-continuous-monitoring',
 title:' CONTINUOUS ECG Monitoring Selama Adenosine',
 description:'MANDATORY print/record ECG strip! Watch for: 1) Transient AV block (expected!), 2) Conversion to sinus, 3) Unmasking underlying atrial flutter/fib.',
 required: true,
 category:'assessment'
 },
 {
 id:'adenosine-assess-first-dose',
 title:' Assess Response 1-2 Menit Post-Adenosine',
 description:'SUCCESS: Convert to sinus rhythm. FAIL: Still SVT. DIAGNOSTIC: Unmask atrial flutter (sawtooth) atau AFib (irregular). If FAIL → repeat with HIGHER dose.',
 required: true,
 category:'assessment'
 },
 {
 id:'adenosine-second-dose-12mg',
 title:' Second Dose: ADENOSINE 12mg (If First Dose Failed)',
 description:'Jika 6mg tidak convert → tunggu 1-2 menit, then give Adenosine 12mg dengan SAME rapid push technique. Success rate cumulative ~90%.',
 required: false,
 category:'medication'
 },
 {
 id:'adenosine-third-dose-12mg',
 title:' Third Dose: ADENOSINE 12mg (If Second Failed)',
 description:'Jika masih gagal → boleh attempt ketiga 12mg. Total max 3 doses. Jika 3x gagal → consider alternative diagnosis atau alternative drugs.',
 required: false,
 category:'medication'
 },
 {
 id:'adenosine-side-effects-management',
 title:' Manage Common Side Effects',
 description:'EXPECTED: Flushing (face red), dyspnea, chest pressure, brief asystole (3-5 sec), nausea. Self-limited 10-30 seconds! Reassure patient. RARE: prolonged asystole (prepare atropine!).',
 required: true,
 category:'safety'
 },
 {
 id:'adenosine-if-atrial-flutter-unmasked',
 title:' If Atrial Flutter/Fib UNMASKED (Diagnostic Value)',
 description:'Adenosine blocks AV node temporarily → unmask underlying atrial rhythm! Jika ternyata AFib/Flutter → different management (rate control, anticoagulation).',
 required: true,
 category:'assessment'
 },
 {
 id:'adenosine-post-conversion-ecg',
 title:' ECG 12-Lead Post-Conversion',
 description:'Jika berhasil convert → ECG lengkap untuk detect WPW (delta wave), ischemia, baseline abnormalities.',
 required: true,
 category:'assessment'
 },
 {
 id:'adenosine-if-failed-three-doses',
 title:' If Adenosine Failed After 3 Doses',
 description:'Consider: 1) Diagnosis bukan AVNRT/AVRT (atrial tach?), 2) Alternative drugs (beta-blocker, CCB), 3) Electrical cardioversion. Consult cardiology!',
 required: true,
 category:'action'
 }
 ],
 nextNodeId:'svt-adenosine-response-decision'
 },

 // ============================================================
 // NODE 7: ADENOSINE RESPONSE DECISION
 // 2 branches
 // ============================================================
'svt-adenosine-response-decision': {
 id:'svt-adenosine-response-decision',
 type:'decision',
 title:'Node 7: Adenosine Response - Converted or Failed?',
 description:' Evaluate pharmacological conversion success',
 warningLevel:'warning',
 branches: [
 {
 id:'adenosine-success',
 title:' CONVERTED to Sinus Rhythm',
 description:'Adenosine successful! Regular sinus rhythm, symptoms resolved. Proceed to post-conversion management.',
 icon:'',
 color:'green',
 nextNodeId:'svt-post-conversion-management',
 riskLevel:'low'
 },
 {
 id:'adenosine-failed',
 title:' FAILED - Alternative Pharmacological Therapy',
 description:'Adenosine failed after 3 doses OR unmasked AFib/Flutter. Try beta-blockers atau calcium channel blockers untuk rate control.',
 icon:'',
 color:'orange',
 nextNodeId:'svt-alternative-pharmacological',
 riskLevel:'low'
 }
 ]
 },

 // ============================================================
 // NODE 8: ALTERNATIVE PHARMACOLOGICAL THERAPY (If Adenosine Failed)
 // 10 items
 // ============================================================
'svt-alternative-pharmacological': {
 id:'svt-alternative-pharmacological',
 type:'checklist',
 title:'Node 8: Alternative Pharmacological Therapy',
 description:' Beta-blockers, CCB, atau Amiodarone untuk refractory SVT',
 items: [
 {
 id:'alt-reassess-hemodynamics',
 title:' RE-ASSESS Hemodynamic Stability',
 description:'Jika patient menjadi UNSTABLE (hypotension, altered MS, chest pain) → STOP pharmacological, proceed to CARDIOVERSION immediately!',
 required: true,
 category:'safety'
 },
 {
 id:'alt-choose-agent-no-hf',
 title:' Choose Agent Based on Patient Factors',
 description:'NO heart failure/LV dysfunction: Beta-blocker (metoprolol, esmolol) OR CCB (diltiazem, verapamil). WITH HF/LV dysfunction: Amiodarone ONLY (beta-blocker/CCB contraindicated!).',
 required: true,
 category:'medication'
 },
 {
 id:'alt-beta-blocker-metoprolol',
 title:' Option 1: METOPROLOL IV',
 description:'Metoprolol 2.5-5mg IV slow push (over 2 min). May repeat q5min up to 15mg total. Monitor BP & HR! CONTRAINDICATION: asthma, severe bradycardia, hypotension, AV block.',
 required: false,
 category:'medication'
 },
 {
 id:'alt-beta-blocker-esmolol',
 title:' Option 2: ESMOLOL IV (Ultra-Short Acting)',
 description:'Esmolol 500 mcg/kg bolus over 1 min, then infusion 50 mcg/kg/min. Advantage: ultra-short half-life (9 min) → easy titration, reversible if hypotension.',
 required: false,
 category:'medication'
 },
 {
 id:'alt-ccb-diltiazem',
 title:' Option 3: DILTIAZEM IV',
 description:'Diltiazem 0.25mg/kg (15-20mg) IV bolus over 2 min. If no response in 15 min → 0.35mg/kg (20-25mg). Then infusion 5-15 mg/h. Monitor BP closely!',
 required: false,
 category:'medication'
 },
 {
 id:'alt-ccb-verapamil',
 title:' Option 4: VERAPAMIL IV',
 description:'Verapamil 5-10mg (0.075-0.15 mg/kg) IV slow push over 2-3 min. May repeat 10mg after 15-30 min if needed. AVOID in WPW (can precipitate VFib!). Monitor BP!',
 required: false,
 category:'medication'
 },
 {
 id:'alt-amiodarone-if-structural',
 title:' Option 5: AMIODARONE (If Structural Heart Disease)',
 description:'Amiodarone 150mg IV over 10 min, then infusion 1mg/min x 6h, then 0.5mg/min x 18h. SAFEST jika LV dysfunction! Slower onset but effective. Monitor QT interval!',
 required: false,
 category:'medication'
 },
 {
 id:'alt-avoid-combination-negative-inotropes',
 title:' AVOID Combining Beta-Blocker + CCB',
 description:'JANGAN combine beta-blocker + CCB (risk: severe bradycardia, hypotension, HF exacerbation)! Choose ONE class only!',
 required: true,
 category:'safety'
 },
 {
 id:'alt-monitor-response',
 title:' Monitor Response to Medications',
 description:'GOAL: Rate control (<110 bpm) OR rhythm control (conversion to sinus). Monitor vital signs q5-10min. ECG continuous monitoring.',
 required: true,
 category:'assessment'
 },
 {
 id:'alt-if-pharmacological-failed',
 title:' If ALL Pharmacological Therapy Failed',
 description:'Jika beta-blocker, CCB, dan amiodarone semua gagal → consider synchronized cardioversion (elective). Consult cardiology untuk ablation workup.',
 required: true,
 category:'action'
 }
 ],
 nextNodeId:'svt-alternative-response-decision'
 },

 // ============================================================
 // NODE 9: ALTERNATIVE THERAPY RESPONSE DECISION
 // 2 branches
 // ============================================================
'svt-alternative-response-decision': {
 id:'svt-alternative-response-decision',
 type:'decision',
 title:'Node 9: Alternative Therapy Response',
 description:' Rate controlled or need cardioversion?',
 warningLevel:'warning',
 branches: [
 {
 id:'alt-success-rate-controlled',
 title:' SUCCESS - Rate Controlled or Converted',
 description:'HR <110 bpm, hemodynamically stable, symptoms improved. Proceed to post-conversion/maintenance.',
 icon:'',
 color:'green',
 nextNodeId:'svt-post-conversion-management',
 riskLevel:'low'
 },
 {
 id:'alt-failed-cardioversion-needed',
 title:' FAILED - Elective Cardioversion Needed',
 description:'Medications failed, still tachycardic, persistent symptoms. Plan synchronized cardioversion dengan sedasi.',
 icon:'',
 color:'orange',
 nextNodeId:'svt-elective-cardioversion',
 riskLevel:'low'
 }
 ]
 },

 // ============================================================
 // NODE 10: ELECTIVE CARDIOVERSION (For Refractory Stable SVT)
 // 7 items
 // ============================================================
'svt-elective-cardioversion': {
 id:'svt-elective-cardioversion',
 type:'checklist',
 title:'Node 10: Elective Synchronized Cardioversion',
 description:' Planned cardioversion untuk refractory stable SVT',
 items: [
 {
 id:'elective-informed-consent',
 title:' Informed Consent',
 description:'Explain procedure, risks (skin burn, arrhythmia, failed conversion), benefits, alternatives. Written consent jika kondisi memungkinkan.',
 required: true,
 category:'documentation'
 },
 {
 id:'elective-npo-status',
 title:' NPO Status - Minimal 4-6 Jam',
 description:'Ideal: NPO 6-8 jam sebelum sedasi. Jika emergency → assess aspiration risk. Prepare suction.',
 required: true,
 category:'safety'
 },
 {
 id:'elective-procedural-sedation',
 title:' Procedural Sedation - Safe & Effective',
 description:'Midazolam 1-2mg + Fentanyl 50mcg IV slow. OR Propofol 0.5-1mg/kg. OR Etomidate 0.1-0.2mg/kg. Titrasi to sedation. Monitor SpO2, BP, RR!',
 required: true,
 category:'medication'
 },
 {
 id:'elective-synchronized-mode',
 title:' Ensure SYNCHRONIZED Mode ON',
 description:'Defibrillator MUST be in SYNC mode! Check sync marker appears on each QRS. Energy: Start 100J, escalate to 200J if needed.',
 required: true,
 category:'action'
 },
 {
 id:'elective-deliver-shock',
 title:' Deliver Synchronized Shock',
 description:'"CLEAR!" → Visual check → Deliver shock. Assess rhythm immediately. Success rate >95% for SVT with cardioversion!',
 required: true,
 category:'action'
 },
 {
 id:'elective-post-procedure-monitoring',
 title:' Post-Procedure Monitoring',
 description:'Monitor vital signs q5min until awake. ECG continuous monitoring x 2-4 jam. Watch for recurrent SVT, arrhythmias, sedation effects.',
 required: true,
 category:'assessment'
 },
 {
 id:'elective-cardiology-consult',
 title:'‍ Cardiology Consult for Ablation Evaluation',
 description:'Refractory SVT needing cardioversion → HIGH-PRIORITY for catheter ablation referral! Cure rate >95% for AVNRT/AVRT!',
 required: true,
 category:'action'
 }
 ],
 nextNodeId:'svt-post-conversion-management'
 },

 // ============================================================
 // NODE 11: POST-CONVERSION MANAGEMENT
 // 9 items
 // ============================================================
'svt-post-conversion-management': {
 id:'svt-post-conversion-management',
 type:'checklist',
 title:'Node 11: Post-Conversion Management & Monitoring',
 description:' Sinus rhythm restored - Monitor, investigate, prevent recurrence',
 items: [
 {
 id:'post-confirm-sinus-rhythm',
 title:' Confirm Sinus Rhythm - ECG 12-Lead',
 description:'ECG lengkap: Regular P waves before each QRS, normal PR interval, narrow QRS. Look for WPW (delta wave), pre-excitation.',
 required: true,
 category:'assessment'
 },
 {
 id:'post-symptom-resolution',
 title:' Assess Symptom Resolution',
 description:'Palpitasi berhenti? Chest discomfort resolved? Dyspnea membaik? Patient merasa"normal" kembali?',
 required: true,
 category:'assessment'
 },
 {
 id:'post-vital-signs-normalization',
 title:' Vital Signs Normalization',
 description:'HR 60-100 bpm, BP normal, SpO2 >94%, no respiratory distress. Continue monitoring x 2-6 jam untuk detect recurrence.',
 required: true,
 category:'assessment'
 },
 {
 id:'post-labs-troponin (Rujuk RS)-electrolytes',
 title:' Labs: Troponin (Rujuk RS), Electrolytes, Thyroid',
 description:'Troponin (Rujuk RS) (jika ada chest pain → r/o MI). Electrolytes (K+, Mg2+ - low level → arrhythmogenic). TSH (hyperthyroidism → SVT trigger).',
 required: true,
 category:'assessment'
 },
 {
 id:'post-echocardiography-if-indicated',
 title:' Echocardiography (If Indicated)',
 description:'Echo jika: first episode SVT, structural heart disease suspected, prolonged tachycardia (tachycardia-induced cardiomyopathy?), recurrent episodes.',
 required: false,
 category:'assessment'
 },
 {
 id:'post-identify-triggers',
 title:' Identify & Address Triggers',
 description:'Common triggers: caffeine, alcohol, stress, sleep deprivation, decongestants, stimulants, exercise. Patient education: avoid triggers!',
 required: true,
 category:'action'
 },
 {
 id:'post-wpw-workup-if-delta-wave',
 title:' WPW Workup Jika Delta Wave Present',
 description:'Delta wave → Wolff-Parkinson-White syndrome! HIGH-RISK for sudden death (AFib → VFib). URGENT cardiology referral untuk ablation! AVOID digoxin/CCB/adenosine!',
 required: true,
 category:'safety'
 },
 {
 id:'post-patient-education',
 title:' Patient Education - Warning Signs',
 description:'Teach: recognize SVT symptoms (sudden palpitations), when to seek care (persistent >20 min, chest pain, syncope), vagal maneuvers at home (modified Valsalva).',
 required: true,
 category:'documentation'
 },
 {
 id:'post-discharge-or-admit',
 title:' Disposition Decision',
 description:'DISCHARGE: First episode, benign etiology, rapid conversion, no WPW, reliable patient. ADMIT: Recurrent, structural HD, WPW, elderly, failed outpatient management.',
 required: true,
 category:'documentation'
 }
 ],
 nextNodeId:'svt-recurrence-risk-decision'
 },

 // ============================================================
 // NODE 12: RECURRENCE RISK & LONG-TERM MANAGEMENT DECISION
 // 3 branches
 // ============================================================
'svt-recurrence-risk-decision': {
 id:'svt-recurrence-risk-decision',
 type:'decision',
 title:'Node 12: Recurrence Risk - Long-Term Strategy?',
 description:' First episode vs Recurrent → Different management',
 warningLevel:'info',
 branches: [
 {
 id:'first-episode-low-risk',
 title:' FIRST EPISODE - Observation & Education',
 description:'First SVT episode, benign course, no structural HD, no WPW. Conservative approach: lifestyle modification, trigger avoidance, follow-up.',
 icon:'',
 color:'green',
 nextNodeId:'svt-first-episode-management',
 riskLevel:'low'
 },
 {
 id:'recurrent-pill-in-pocket',
 title:' RECURRENT SVT -"Pill-in-Pocket" Strategy',
 description:'Recurrent but infrequent episodes (<1x/month), hemodynamically stable, no WPW. Self-administered oral beta-blocker atau CCB saat episode.',
 icon:'',
 color:'yellow',
 nextNodeId:'svt-pill-in-pocket-strategy',
 riskLevel:'low'
 },
 {
 id:'frequent-or-wpw-ablation',
 title:' FREQUENT SVT or WPW - ABLATION REFERRAL',
 description:'Frequent episodes (>1x/month), impaired QoL, WPW syndrome, patient preference. DEFINITIVE CURE with catheter ablation! Success >95%.',
 icon:'',
 color:'blue',
 nextNodeId:'svt-ablation-referral',
 riskLevel:'low'
 }
 ]
 },

 // ============================================================
 // NODE 13: FIRST EPISODE MANAGEMENT - Conservative
 // 6 items
 // ============================================================
'svt-first-episode-management': {
 id:'svt-first-episode-management',
 type:'checklist',
 title:'Node 13: First Episode SVT - Conservative Management',
 description:' Observation, education, lifestyle modification',
 items: [
 {
 id:'first-reassurance',
 title:' Reassurance - SVT is Benign (Usually)',
 description:'Jelaskan: SVT bukan serangan jantung! Mayoritas benign, tidak life-threatening (kecuali WPW). Many people experience once in lifetime.',
 required: true,
 category:'documentation'
 },
 {
 id:'first-lifestyle-modification',
 title:' Lifestyle Modification - Trigger Avoidance',
 description:'AVOID: excessive caffeine (>3 cups/day), alcohol (especially binge), energy drinks, decongestants, cocaine/stimulants. Reduce stress, adequate sleep.',
 required: true,
 category:'action'
 },
 {
 id:'first-teach-vagal-maneuvers',
 title:' Teach Modified Valsalva at Home',
 description:'Patient dapat try modified Valsalva jika episode rekuren: strain ke 10mL syringe 15 detik, lalu passive leg raise 15 detik. Success rate 43%!',
 required: true,
 category:'documentation'
 },
 {
 id:'first-emergency-plan',
 title:' Emergency Action Plan',
 description:'Seek immediate care jika: episode >20-30 menit, chest pain, syncope, severe dyspnea, tidak resolve dengan vagal maneuvers. Call ambulance!',
 required: true,
 category:'documentation'
 },
 {
 id:'first-cardiology-followup',
 title:' Cardiology Follow-Up 2-4 Minggu',
 description:'Routine cardiology f/u untuk review ECG, echo results, discuss long-term plan. Evaluate need for prophylactic therapy jika recurrent.',
 required: true,
 category:'documentation'
 },
 {
 id:'first-no-chronic-meds',
 title:' NO Chronic Antiarrhythmic Meds (Yet)',
 description:'First episode → NO prophylactic medications. Wait & observe. Only start chronic therapy jika recurrent/frequent episodes.',
 required: true,
 category:'medication'
 }
 ]
 },

 // ============================================================
 // NODE 14: PILL-IN-POCKET STRATEGY (Recurrent Infrequent SVT)
 // 7 items
 // ============================================================
'svt-pill-in-pocket-strategy': {
 id:'svt-pill-in-pocket-strategy',
 type:'checklist',
 title:'Node 14:"Pill-in-Pocket" Strategy - Self-Treatment',
 description:' Patient self-administers oral medication at onset SVT',
 items: [
 {
 id:'pip-eligibility-criteria',
 title:' Confirm Eligibility untuk Pill-in-Pocket',
 description:'ELIGIBLE: Infrequent episodes, hemodynamically stable saat SVT, NO WPW, NO severe structural HD, reliable patient, previous successful conversion dengan meds.',
 required: true,
 category:'assessment'
 },
 {
 id:'pip-choose-medication',
 title:' Choose Pill-in-Pocket Medication',
 description:'OPTION 1: Metoprolol 50-100mg PO. OPTION 2: Diltiazem 120-180mg PO. OPTION 3: Verapamil 120-240mg PO. Choose based on patient factors & previous response.',
 required: true,
 category:'medication'
 },
 {
 id:'pip-prescribe-single-dose',
 title:' Prescribe SINGLE-DOSE"As-Needed"',
 description:'Rx: Metoprolol 50mg tabs, 10,"Take 1-2 tablets at onset of palpitations. Max 1 dose per day. Seek ER if not resolved in 60 min."',
 required: true,
 category:'medication'
 },
 {
 id:'pip-patient-instructions',
 title:' Detailed Patient Instructions',
 description:'1) Recognize SVT onset (sudden palpitations). 2) Try vagal maneuvers first. 3) If fail → take pill-in-pocket. 4) Rest, avoid driving. 5) Seek ER if not resolved in 60 min OR symptoms worsen.',
 required: true,
 category:'documentation'
 },
 {
 id:'pip-safety-warnings',
 title:' Safety Warnings',
 description:'JANGAN take jika: hypotension (dizzy, lightheaded), severe fatigue, chest pain ongoing. JANGAN combine dengan alcohol. JANGAN drive setelah take medication!',
 required: true,
 category:'safety'
 },
 {
 id:'pip-log-episodes',
 title:' Keep Episode Log',
 description:'Patient catat: tanggal, waktu, duration, trigger, response to pill-in-pocket. Bring log ke follow-up untuk evaluate efficacy.',
 required: true,
 category:'documentation'
 },
 {
 id:'pip-escalation-criteria',
 title:' Escalation to Ablation',
 description:'Consider ablation jika: pill-in-pocket ineffective, episodes increase frequency (>1x/month), impaired QoL, patient preference for cure.',
 required: true,
 category:'action'
 }
 ]
 },

 // ============================================================
 // NODE 15: ABLATION REFERRAL (Definitive Cure)
 // 8 items
 // ============================================================
'svt-ablation-referral': {
 id:'svt-ablation-referral',
 type:'checklist',
 title:'Node 15: Catheter Ablation Referral - DEFINITIVE CURE',
 description:' Radiofrequency ablation success rate >95% untuk AVNRT/AVRT!',
 items: [
 {
 id:'ablation-indications',
 title:' Confirm Ablation Indications',
 description:'CLASS I (Strong): WPW syndrome, Frequent symptomatic episodes, Failed/intolerant medications, Patient preference. CLASS IIa: Single episode + high-risk occupation (pilot, driver).',
 required: true,
 category:'assessment'
 },
 {
 id:'ablation-wpw-urgent',
 title:' WPW Syndrome = URGENT Ablation Referral',
 description:'Delta wave present → WPW → RISK sudden cardiac death (AFib → VFib via accessory pathway)! Ablation CURATIVE + eliminates SCD risk. PRIORITY referral!',
 required: true,
 category:'safety'
 },
 {
 id:'ablation-explain-procedure',
 title:' Explain Catheter Ablation Procedure',
 description:'Minimally invasive, femoral vein access, intracardiac catheters, EP study to map circuit, radiofrequency energy to ablate. Duration 1-3 hours. Success >95%. Overnight stay usually.',
 required: true,
 category:'documentation'
 },
 {
 id:'ablation-success-rates',
 title:' Success Rates by Mechanism',
 description:'AVNRT: 95-98% cure, <1% AV block. AVRT (WPW): 93-95% cure, <1% recurrence. Atrial tachycardia: 85-90%. Atrial flutter: >95% (very high success).',
 required: true,
 category:'documentation'
 },
 {
 id:'ablation-risks-complications',
 title:' Risks & Complications (RARE)',
 description:'Major complications <1%: AV block needing pacemaker (<1%), cardiac tamponade (0.5%), stroke (<0.5%), vascular injury. Minor: bleeding, hematoma (2-3%).',
 required: true,
 category:'documentation'
 },
 {
 id:'ablation-pre-procedure-workup',
 title:' Pre-Ablation Workup',
 description:'ECG (12-lead in SR + during SVT if available), Echo, Labs (CBC, coag, Cr), Informed consent, NPO 6-8 jam, Anticoagulation status (hold DOACs 24-48h).',
 required: true,
 category:'assessment'
 },
 {
 id:'ablation-post-procedure-expectations',
 title:' Post-Ablation Expectations',
 description:'Overnight monitoring. Resume normal activity 3-5 days. Avoid heavy lifting 1 week. Recurrence risk <5% (usually within 3 months). F/u cardiology 1 month.',
 required: true,
 category:'documentation'
 },
 {
 id:'ablation-quality-of-life',
 title:' Quality of Life Benefit',
 description:'Ablation = CURE! No more episodes, no chronic meds, no lifestyle restrictions, improved QoL. Cost-effective vs lifetime medications. Patient satisfaction >90%.',
 required: true,
 category:'documentation'
 }
 ]
 }
 }
};
