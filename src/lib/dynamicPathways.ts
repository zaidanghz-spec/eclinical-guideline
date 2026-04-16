// Dynamic Branching Clinical Pathway System
// Based on Indonesian PPK (Panduan Praktik Klinis) + WHO Guidelines

import { dbdPathway } from'./pathways/dbd';
import { hipertensiPathway } from './pathways/hipertensi';
import { svtPathway } from'./pathways/svt';
import { bppvPathway } from'./pathways/bppv';
import { frakturPathway } from'./pathways/fraktur';
import { tthPathway } from './pathways/tth';
import { apsPathway } from './pathways/aps';
import { skaPathway } from './pathways/ska';
import { acuteKidneyInjuryPathway } from './pathways/acute-kidney-injury';
import { diabetesMelitusPathway } from './pathways/diabetes-melitus';
import { diareDewasaPathway } from './pathways/diare-dewasa';
import { dispepsiaPathway } from './pathways/dispepsia';
import { insectBitePathway } from './pathways/reaksi-gigitan-serangga';
import { intoksikasiKimiaPathway } from './pathways/intoksikasi-kimia';

export interface PathwayChecklistItem {
 id: string;
 title: string;
 description: string;
 required: boolean;
 category:'assessment' |'action' |'medication' |'safety' |'documentation';
}

export interface PathwayBranch {
 id: string;
 title: string;
 description: string;
 icon?: string;
 color: string;
 nextNodeId: string;
 riskLevel?:'high' |'medium' |'low';
}

export interface DecisionNode {
 id: string;
 type:'decision';
 title: string;
 description: string;
 warningLevel?:'info' |'warning' |'critical';
 branches: PathwayBranch[];
}

export interface ChecklistNode {
 id: string;
 type:'checklist';
 title: string;
 description?: string;
 items: PathwayChecklistItem[];
 nextNodeId?: string; // Optional - for sequential flow
}

export type PathwayNode = DecisionNode | ChecklistNode;

export interface DynamicPathway {
 diseaseId: string;
 diseaseName: string;
 startNodeId: string;
 nodes: Record<string, PathwayNode>;
 references?: string[];
}

export const dynamicPathways: Record<string, DynamicPathway> = {
 // TUBERKULOSIS PARU - PPK Indonesia + WHO 2021

 // DEMAM BERDARAH DENGUE (DBD) - WHO 2009/2012 + PPK Indonesia 
 // Imported from separate file for better organization (11 nodes, 83 items)
'dbd': dbdPathway,

 // HIPERTENSI DEWASA - PNPK Kemenkes 2021
 'hipertensi': hipertensiPathway,

 // ACUTE KIDNEY INJURY (AKI) - KDIGO Guidelines
 'acute-kidney-injury': acuteKidneyInjuryPathway,

 // DIABETES MELITUS TIPE 2 - PNPK 2020 & PERKENI 2021
 'diabetes-melitus': diabetesMelitusPathway,

 // DISPEPSIA & H. PYLORI - PGI 2021
 'dispepsia': dispepsiaPathway,

 // REAKSI GIGITAN SERANGGA - Kemenkes RI 2022/2023
 'reaksi-gigitan-serangga': insectBitePathway,

 // DIARE AKUT & KRONIK - PGI 2024
 'acute-gastroenteritis': diareDewasaPathway,

 // SUPRAVENTRICULAR TACHYCARDIA (TaSuV) - PERKI + Perhimpunan Aritmia Indonesia
 // Imported from separate file for better organization (14 nodes, 92 items)
'svt': svtPathway,

 // BENIGN PAROXYSMAL POSITIONAL VERTIGO (BPPV) - PPK Neurologi PERDOSSI 2023
 // Imported from separate file (14 nodes, 9 checklist + 5 decision)
'vertigo': bppvPathway,

 // NYERI KEPALA TIPE TEGANG (TTH) - PPK Neurologi PERDOSSI 2023 + ICHD-3
 // Imported from separate file, severity-based branching (Infrequent/Frequent/Chronic)
'tension-type-headache': tthPathway,
  'intoksikasi-kimia': intoksikasiKimiaPathway,

 // ANGINA PEKTORIS STABIL (APS) - PNPK Kemenkes HK.01.07/MENKES/1419/2023 + ESC 2019
 // ISCHEMIA Trial 2020, COMPASS 2018. 16 nodes, PTP-guided, FFR-integrated
 'angina-pektoris-stabil': apsPathway,

 // SINDROM KORONER AKUT (SKA) - PERKI 2024
  'sindrom-koroner-akut': skaPathway,

  // ISPA NON-PNEUMONIA (PRIMARY CARE RESPIRATORY) - PPK Indonesia + PAPDI
'ispa-non-pneumonia': {
 diseaseId:'ispa-non-pneumonia',
 diseaseName:'ISPA Non-Pneumonia (Primary Care Respiratory Infections)',
 startNodeId:'respiratory-triage',
 nodes: {
'respiratory-triage': {
 id:'respiratory-triage',
 type:'checklist',
 title:'Placeholder',
 items: []
 }
 }
 },

 // VERTIGO - OLD inline pathway renamed to avoid overriding imported bppvPathway
 // Legacy nodes kept for vestibular neuritis and Meniere sub-pathways
'vertigo-legacy': {
 diseaseId:'vertigo-legacy',
 diseaseName:'Vertigo (Legacy Reference)',
 startNodeId:'vertigo-initial-assessment',
 nodes: {
'vertigo-initial-assessment': {
 id:'vertigo-initial-assessment',
 type:'checklist',
 title:'Initial Assessment & Red Flags Screening',
 description:'Rule out life-threatening central causes before proceeding',
 items: [
 {
 id:'vertigo-vital-signs',
 title:'Vital Signs & Oxygen Saturation',
 description:'BP, HR, RR, suhu, SpO2. Hipotensi/bradikardi bisa meniru vertigo',
 required: true,
 category:'assessment'
 },
 {
 id:'vertigo-neuro-exam-brief',
 title:'Brief Neurological Examination',
 description:'Kesadaran, pupil, motorik ekstremitas, cerebellar signs (finger-to-nose, heel-to-shin)',
 required: true,
 category:'assessment'
 },
 {
 id:'vertigo-red-flag-headache',
 title:'RED FLAG: Severe Headache (Thunderclap/Worst Ever)?',
 description:'Pikirkan SAH, cerebellar hemorrhage, vertebral dissection. Onset mendadak + nyeri kepala hebat = EMERGENCY',
 required: true,
 category:'safety'
 },
 {
 id:'vertigo-red-flag-neuro-deficit',
 title:'RED FLAG: Focal Neurological Deficit?',
 description:'Diplopia, dysarthria, dysphagia, ataxia truncal, hemiparesis, numbness → CENTRAL CAUSE (stroke posterior circulation)',
 required: true,
 category:'safety'
 },
 {
 id:'vertigo-red-flag-recent-trauma',
 title:'RED FLAG: Recent Head/Neck Trauma?',
 description:'Trauma bisa sebabkan labyrinthine concussion, perilymphatic fistula, atau vertebral artery dissection',
 required: true,
 category:'safety'
 },
 {
 id:'vertigo-red-flag-age-risk',
 title:'RED FLAG: Usia >60 Tahun + Vascular Risk Factors?',
 description:'DM, hipertensi, smoking, dyslipidemia → risiko tinggi stroke posterior circulation (vertebrobasilar)',
 required: true,
 category:'safety'
 },
 {
 id:'vertigo-hintsplus-if-indicated',
 title:'HINTS Plus Exam (Jika Acute Vestibular Syndrome)',
 description:'Head Impulse (VOR test), Nystagmus direction, Test of Skew, PLUS hearing loss. Central jika: normal head impulse, direction-changing nystagmus, skew deviation',
 required: false,
 category:'assessment'
 },
 {
 id:'vertigo-document-characteristics',
 title:'Dokumentasi Karakteristik Vertigo',
 description:'Onset (mendadak/bertahap), durasi (detik/menit/jam/hari), pencetus (perubahan posisi?), gejala penyerta (hearing loss, tinnitus, aural fullness, headache)',
 required: true,
 category:'documentation'
 }
 ]
 },

'vertigo-central-peripheral-decision': {
 id:'vertigo-central-peripheral-decision',
 type:'decision',
 title:'Clinical Decision: Central vs Peripheral Vertigo',
 description:'Berdasarkan hasil assessment, tentukan apakah ini central (EMERGENCY) atau peripheral (benign) cause',
 warningLevel:'critical',
 branches: [
 {
 id:'branch-central-vertigo',
 title:' CENTRAL VERTIGO SUSPECTED',
 description:'Ada red flags: focal neuro signs, severe headache, abnormal HINTS exam, atau vascular risk factors tinggi',
 icon:'',
 color:'red',
 riskLevel:'high',
 nextNodeId:'central-vertigo-emergency'
 },
 {
 id:'branch-peripheral-vertigo',
 title:' PERIPHERAL VERTIGO (Benign)',
 description:'Tidak ada red flags, isolated vertigo, kemungkinan BPPV/vestibular neuritis/Meniere',
 icon:'',
 color:'teal',
 riskLevel:'low',
 nextNodeId:'peripheral-vertigo-workup'
 }
 ]
 },

'central-vertigo-emergency': {
 id:'central-vertigo-emergency',
 type:'checklist',
 title:'EMERGENCY: Central Vertigo Management',
 description:'Suspect stroke, cerebellar hemorrhage, atau vertebral dissection',
 items: [
 {
 id:'central-activate-stroke-protocol',
 title:'Aktivasi Stroke Protocol STAT',
 description:'Panggil neurologist, aktivasi tim stroke, persiapan CT/MRI imaging',
 required: true,
 category:'action'
 },
 {
 id:'central-ct-head-urgent',
 title:'CT Head Non-Contrast URGENT',
 description:'Rule out hemorrhage (sensitivity rendah untuk posterior fossa stroke, MRI DWI lebih superior)',
 required: true,
 category:'assessment'
 },
 {
 id:'central-mri-dwi-if-available',
 title:'MRI Brain with DWI (Gold Standard)',
 description:'MRI DWI/FLAIR untuk posterior circulation stroke (brainstem, cerebellum). CT sering miss infarct kecil di fossa posterior',
 required: false,
 category:'assessment'
 },
 {
 id:'central-iv-access-npo',
 title:'IV Access + NPO + Cardiac Monitor',
 description:'Persiapan untuk kemungkinan thrombolysis atau intervensi',
 required: true,
 category:'action'
 },
 {
 id:'central-aspirin-if-stroke',
 title:'Aspirin 160-320mg (Jika Stroke Iskemik Confirmed)',
 description:'SETELAH imaging rule out hemorrhage. Jangan beri antiplatelet sebelum CT',
 required: false,
 category:'medication'
 },
 {
 id:'central-consult-neurosurgery-if-hemorrhage',
 title:'Konsul Neurosurgery STAT (Jika Cerebellar Hemorrhage)',
 description:'Hematoma >3cm atau mass effect memerlukan surgical decompression',
 required: false,
 category:'action'
 },
 {
 id:'central-antiemetic-safe',
 title:'Antiemetik: Ondansetron 4-8mg IV',
 description:'Hindari promethazine/meclizine (sedasi berlebihan, ganggu neurologic monitoring)',
 required: false,
 category:'medication'
 },
 {
 id:'central-admit-icu-neuro',
 title:'Admit ICU/Stroke Unit',
 description:'Central vertigo requires admission dan neuro monitoring',
 required: true,
 category:'action'
 }
 ]
 },

'peripheral-vertigo-workup': {
 id:'peripheral-vertigo-workup',
 type:'checklist',
 title:'Peripheral Vertigo: Detailed Workup',
 description:'Differential diagnosis: BPPV (50%), Vestibular Neuritis (20%), Meniere (10%)',
 items: [
 {
 id:'peripheral-otoscopy',
 title:'Otoscopy Bilateral',
 description:'Rule out cerumen impaction, otitis media, cholesteatoma',
 required: true,
 category:'assessment'
 },
 {
 id:'peripheral-hearing-test-whisper',
 title:'Weber & Rinne Test / Whisper Test',
 description:'Hearing loss? Meniere (sensorineural), otosclerosis (conductive)',
 required: true,
 category:'assessment'
 },
 {
 id:'peripheral-nystagmus-observation',
 title:'Observasi Nystagmus Spontan',
 description:'Horizontal unidirectional nystagmus (vestibular neuritis), no nystagmus at rest (BPPV)',
 required: true,
 category:'assessment'
 },
 {
 id:'peripheral-gait-romberg',
 title:'Gait & Romberg Test',
 description:'Ataxia? Romberg positif (vestibulopathy peripheral), normal gait (BPPV mild)',
 required: true,
 category:'assessment'
 },
 {
 id:'peripheral-duration-pattern',
 title:'Dokumentasi Durasi & Pattern Episode',
 description:'Detik-menit + posisional = BPPV, Jam-hari tanpa posisi = vestibular neuritis, Episode rekuren + tinnitus/hearing = Meniere',
 required: true,
 category:'documentation'
 }
 ]
 },

'peripheral-diagnosis-decision': {
 id:'peripheral-diagnosis-decision',
 type:'decision',
 title:'Peripheral Vertigo Differential Diagnosis',
 description:'Pilih pathway berdasarkan karakteristik klinis',
 warningLevel:'info',
 branches: [
 {
 id:'branch-bppv',
 title:' BPPV (Benign Paroxysmal Positional Vertigo)',
 description:'Vertigo singkat (<1 menit), triggered by head position changes, tidak ada hearing loss',
 icon:'',
 color:'blue',
 riskLevel:'low',
 nextNodeId:'bppv-diagnostic-maneuvers'
 },
 {
 id:'branch-vestibular-neuritis',
 title:' Vestibular Neuritis / Labyrinthitis',
 description:'Vertigo persisten (jam-hari), onset akut, nausea/vomiting hebat, ± hearing loss (labyrinthitis)',
 icon:'',
 color:'orange',
 riskLevel:'medium',
 nextNodeId:'vestibular-neuritis-management'
 },
 {
 id:'branch-meniere',
 title:' Meniere Disease',
 description:'Episodik vertigo (20min-12jam) + fluctuating hearing loss + tinnitus + aural fullness',
 icon:'',
 color:'purple',
 riskLevel:'medium',
 nextNodeId:'meniere-management'
 }
 ]
 },

'bppv-diagnostic-maneuvers': {
 id:'bppv-diagnostic-maneuvers',
 type:'checklist',
 title:'BPPV: Diagnostic Maneuvers',
 description:'Identify which semicircular canal is affected',
 items: [
 {
 id:'bppv-dix-hallpike-right',
 title:'Dix-Hallpike Test - Sisi KANAN',
 description:'Pasien duduk → berbaring cepat dengan kepala hanging 30° & rotasi 45° ke KANAN. Positif jika nystagmus torsional upbeat + vertigo (posterior canal BPPV)',
 required: true,
 category:'assessment'
 },
 {
 id:'bppv-dix-hallpike-left',
 title:'Dix-Hallpike Test - Sisi KIRI',
 description:'Ulangi maneuver dengan rotasi kepala ke KIRI. Canal affected adalah sisi yang memicu nystagmus+vertigo',
 required: true,
 category:'assessment'
 },
 {
 id:'bppv-supine-roll-test',
 title:'Supine Roll Test (Horizontal Canal)',
 description:'Pasien supine, putar kepala cepat ke kanan & kiri. Horizontal nystagmus geotropic (HC-BPPV canalithiasis) atau apogeotropic (cupulolithiasis)',
 required: false,
 category:'assessment'
 },
 {
 id:'bppv-document-positive-side',
 title:'Dokumentasi: Canal Affected & Side',
 description:'Posterior canal (90%), horizontal canal (8%), anterior canal (2%). Catat sisi kanan/kiri',
 required: true,
 category:'documentation'
 }
 ]
 },

'bppv-treatment-decision': {
 id:'bppv-treatment-decision',
 type:'decision',
 title:'BPPV Treatment Selection',
 description:'Pilih particle repositioning maneuver berdasarkan canal affected',
 warningLevel:'info',
 branches: [
 {
 id:'branch-posterior-canal-bppv',
 title:' Posterior Canal BPPV (Tersering)',
 description:'Dix-Hallpike positif dengan nystagmus torsional upbeat',
 icon:'',
 color:'teal',
 riskLevel:'low',
 nextNodeId:'bppv-epley-maneuver'
 },
 {
 id:'branch-horizontal-canal-bppv',
 title:' Horizontal Canal BPPV',
 description:'Supine roll test positif dengan nystagmus horizontal',
 icon:'',
 color:'blue',
 riskLevel:'low',
 nextNodeId:'bppv-barbeque-maneuver'
 }
 ]
 },

'bppv-epley-maneuver': {
 id:'bppv-epley-maneuver',
 type:'checklist',
 title:'Epley Maneuver (Posterior Canal BPPV)',
 description:'Particle repositioning - Success rate 80% setelah 1-2 sesi',
 items: [
 {
 id:'epley-explain-patient',
 title:'Edukasi Pasien: Akan Memicu Vertigo Sementara',
 description:'Jelaskan bahwa vertigo akan diprovokasi saat maneuver, tapi ini normal dan aman',
 required: true,
 category:'action'
 },
 {
 id:'epley-position-1',
 title:'Posisi 1: Dix-Hallpike Position (Affected Side)',
 description:'Pasien duduk → berbaring cepat dengan kepala hanging & rotasi ke sisi affected. Tahan 30 detik atau sampai nystagmus berhenti',
 required: true,
 category:'action'
 },
 {
 id:'epley-position-2',
 title:'Posisi 2: Rotasi Kepala 90° ke Sisi Sehat',
 description:'Putar kepala 90° ke arah sisi sehat (tanpa angkat kepala). Tahan 30 detik',
 required: true,
 category:'action'
 },
 {
 id:'epley-position-3',
 title:'Posisi 3: Miring ke Sisi Sehat (Nose Down)',
 description:'Minta pasien miring ke sisi sehat, kepala tetap rotasi (hidung menghadap lantai). Tahan 30 detik',
 required: true,
 category:'action'
 },
 {
 id:'epley-position-4',
 title:'Posisi 4: Duduk Kembali',
 description:'Angkat pasien pelan ke posisi duduk dengan kepala fleksi 45° (dagu ke dada). Tahan 30 detik',
 required: true,
 category:'action'
 },
 {
 id:'epley-reassess-dixhallpike',
 title:'Reassessment: Ulangi Dix-Hallpike Test',
 description:'Jika masih positif, ulangi Epley maneuver (maksimal 2-3 kali dalam satu visit)',
 required: true,
 category:'assessment'
 },
 {
 id:'epley-post-treatment-instruction',
 title:'Instruksi Pasca-Maneuver',
 description:'Tidur semi-fowler 1-2 malam, hindari tidur sisi affected 1 minggu, hindari gerakan kepala ekstrem 48 jam',
 required: true,
 category:'documentation'
 },
 {
 id:'epley-antiemetic-prn',
 title:'Antiemetik PRN: Ondansetron 4mg ODT atau Domperidone 10mg',
 description:'Hanya jika nausea hebat. AVOID vestibular suppressant chronic (meclizine, betahistine) - menghambat kompensasi vestibular',
 required: false,
 category:'medication'
 },
 {
 id:'epley-followup-1week',
 title:'Follow-Up 1 Minggu (Jika Tidak Membaik)',
 description:'Jika gejala persisten >1 minggu, ulangi maneuver atau pertimbangkan canal lain, vestibular rehabilitation',
 required: true,
 category:'documentation'
 }
 ]
 },

'bppv-barbeque-maneuver': {
 id:'bppv-barbeque-maneuver',
 type:'checklist',
 title:'Barbeque Roll Maneuver (Horizontal Canal BPPV)',
 description:'Lempert maneuver untuk HC-BPPV canalithiasis',
 items: [
 {
 id:'barbeque-patient-supine',
 title:'Pasien Supine dengan Kepala Netral',
 description:'Posisi awal berbaring telentang',
 required: true,
 category:'action'
 },
 {
 id:'barbeque-rotate-affected',
 title:'Rotasi Kepala 90° ke Sisi Affected',
 description:'Putar kepala searah dengan canal affected. Tahan 30 detik',
 required: true,
 category:'action'
 },
 {
 id:'barbeque-rotate-180',
 title:'Lanjutkan Rotasi 90° (Total 180° dari Awal)',
 description:'Sekarang wajah menghadap sisi sehat. Tahan 30 detik',
 required: true,
 category:'action'
 },
 {
 id:'barbeque-rotate-270',
 title:'Lanjutkan Rotasi 90° (Total 270°)',
 description:'Pasien sekarang prone (tengkurap). Tahan 30 detik',
 required: true,
 category:'action'
 },
 {
 id:'barbeque-rotate-360',
 title:'Rotasi Final 90° Kembali ke Supine',
 description:'Kembali ke posisi awal (total 360° rotation)',
 required: true,
 category:'action'
 },
 {
 id:'barbeque-reassess-supine-roll',
 title:'Reassessment: Supine Roll Test',
 description:'Cek apakah nystagmus masih ada. Ulangi maneuver jika perlu',
 required: true,
 category:'assessment'
 },
 {
 id:'barbeque-home-exercises',
 title:'Forced Prolonged Positioning (Jika Gagal)',
 description:'Tidur sisi sehat selama 12 jam (alternative untuk refractory horizontal canal BPPV)',
 required: false,
 category:'action'
 }
 ]
 },

'vestibular-neuritis-management': {
 id:'vestibular-neuritis-management',
 type:'checklist',
 title:'Vestibular Neuritis / Labyrinthitis Management',
 description:'Viral inflammation of vestibular nerve. Self-limited tapi gejala berat 3-7 hari',
 items: [
 {
 id:'vn-confirm-acute-vestibular-syndrome',
 title:'Konfirmasi Acute Vestibular Syndrome (AVS)',
 description:'Vertigo akut persisten (>24 jam), nausea/vomiting, imbalance, nystagmus horizontal unidirectional, NO focal neuro signs',
 required: true,
 category:'assessment'
 },
 {
 id:'vn-head-impulse-test',
 title:'Head Impulse Test (HIT)',
 description:'Abnormal HIT (corrective saccade) → peripheral. Normal HIT di AVS akut → CENTRAL stroke! (HINTS exam)',
 required: true,
 category:'assessment'
 },
 {
 id:'vn-audiometry-if-hearing-loss',
 title:'Audiometry (Jika Ada Hearing Loss)',
 description:'Hearing loss + vertigo = labyrinthitis (viral cochlear involvement). Pure vestibular = neuritis',
 required: false,
 category:'assessment'
 },
 {
 id:'vn-corticosteroid-early',
 title:'Methylprednisolone 100mg PO Daily x 3 Hari → Taper 7-10 Hari',
 description:'Steroid dalam 72 jam onset meningkatkan recovery vestibular function (Cochrane 2011). JANGAN beri antiviral (tidak terbukti efektif)',
 required: true,
 category:'medication'
 },
 {
 id:'vn-antiemetic-shortterm',
 title:'Vestibular Suppressant SHORT-TERM (3-5 Hari): Meclizine 25mg TID atau Dimenhydrinate 50mg TID',
 description:'Hanya untuk fase akut (3-5 hari pertama). Prolonged use menghambat central compensation',
 required: false,
 category:'medication'
 },
 {
 id:'vn-ondansetron-severe-nausea',
 title:'Ondansetron 4-8mg IV/PO (Nausea Berat)',
 description:'Untuk kontrol nausea tanpa sedasi vestibular',
 required: false,
 category:'medication'
 },
 {
 id:'vn-iv-fluids-if-dehydrated',
 title:'IV Fluid Resuscitation (Jika Dehidrasi dari Vomiting)',
 description:'RL atau NS, monitor intake-output',
 required: false,
 category:'action'
 },
 {
 id:'vn-early-mobilization',
 title:'Early Mobilization (Setelah 48-72 Jam)',
 description:'Encourage walking dengan assistance untuk stimulasi vestibular compensation. Bed rest berkepanjangan BURUK',
 required: true,
 category:'action'
 },
 {
 id:'vn-vestibular-rehab-referral',
 title:'Rujuk Vestibular Rehabilitation (Setelah Fase Akut)',
 description:'VRT (Cawthorne-Cooksey exercises) mempercepat kompensasi, dimulai minggu ke-2',
 required: true,
 category:'action'
 },
 {
 id:'vn-mri-if-atypical',
 title:'MRI Brain + IAC (Jika Atypical atau Tidak Membaik)',
 description:'Rule out CPA tumor (acoustic neuroma), demyelinating disease, stroke',
 required: false,
 category:'assessment'
 },
 {
 id:'vn-followup-2weeks',
 title:'Follow-Up 2 Minggu',
 description:'Assessment recovery, mulai VRT jika residual symptoms. Mayoritas recover 6-12 minggu',
 required: true,
 category:'documentation'
 }
 ]
 },

'meniere-management': {
 id:'meniere-management',
 type:'checklist',
 title:'Meniere Disease Management',
 description:'Endolymphatic hydrops - chronic episodic vertigo + SNHL + tinnitus + aural fullness',
 items: [
 {
 id:'meniere-confirm-criteria',
 title:'Konfirmasi Diagnosis Meniere (AAO-HNS 2015 Criteria)',
 description:'≥2 episode vertigo 20min-12jam + SNHL frekuensi rendah + fluctuating aural symptoms (tinnitus/fullness) + not better explained by other diagnosis',
 required: true,
 category:'assessment'
 },
 {
 id:'meniere-audiometry-baseline',
 title:'Pure Tone Audiometry',
 description:'Low-frequency SNHL (250-1000 Hz) yang fluctuating. Confirmatory test',
 required: true,
 category:'assessment'
 },
 {
 id:'meniere-mri-iac-rule-out',
 title:'MRI Brain + IAC (Rule Out Acoustic Neuroma)',
 description:'SNHL unilateral memerlukan imaging untuk exclude CPA tumor',
 required: true,
 category:'assessment'
 },
 {
 id:'meniere-lifestyle-low-salt',
 title:'Lifestyle: Low Sodium Diet <2g/Day',
 description:'Reduce endolymphatic pressure. Evidence lemah tapi standard practice',
 required: true,
 category:'action'
 },
 {
 id:'meniere-avoid-triggers',
 title:'Avoid Triggers: Caffeine, Alkohol, MSG, Stress',
 description:'Trigger individual vary. Food diary bisa membantu identifikasi',
 required: true,
 category:'action'
 },
 {
 id:'meniere-diuretic-thiazide',
 title:'Hydrochlorothiazide 25mg PO Daily (Profilaksis)',
 description:'HCTZ untuk maintenance therapy. Cochrane review: modest benefit untuk frekuensi attack',
 required: false,
 category:'medication'
 },
 {
 id:'meniere-betahistine-prophylaxis',
 title:'Betahistine 16-24mg PO TID (Profilaksis)',
 description:'Histamine analog. Popular di Eropa/Asia, evidence mixed. Bisa trial 3-6 bulan',
 required: false,
 category:'medication'
 },
 {
 id:'meniere-acute-attack-meclizine',
 title:'Acute Attack: Meclizine 25mg atau Diazepam 2-5mg',
 description:'Untuk abort acute vertigo episode. PRN use',
 required: false,
 category:'medication'
 },
 {
 id:'meniere-acute-attack-antiemetic',
 title:'Acute Attack: Promethazine 25mg IM/IV atau Ondansetron 4mg',
 description:'Kontrol nausea/vomiting',
 required: false,
 category:'medication'
 },
 {
 id:'meniere-intratympanic-gentamicin',
 title:'Refractory Case: Intratympanic Gentamicin (Rujuk ENT)',
 description:'Chemical labyrinthectomy untuk intractable Meniere. Kontrol vertigo 80-90% tapi risiko hearing loss',
 required: false,
 category:'action'
 },
 {
 id:'meniere-surgical-endolymphatic-shunt',
 title:'Refractory Case: Endolymphatic Sac Decompression (Rujuk ENT)',
 description:'Surgical option untuk preserve hearing. Evidence controversial',
 required: false,
 category:'action'
 },
 {
 id:'meniere-hearing-aid-if-progressive',
 title:'Rujuk Audiologist untuk Hearing Aid (Jika SNHL Progresif)',
 description:'Mayoritas Meniere akan progress ke hearing loss permanen unilateral',
 required: false,
 category:'action'
 },
 {
 id:'meniere-patient-education',
 title:'Edukasi: Chronic Disease, Variabel Course, Tidak Life-Threatening',
 description:'Reassurance penting. Mayoritas attack berkurang seiring waktu (burned out labyrinth)',
 required: true,
 category:'documentation'
 },
 {
 id:'meniere-followup-ent',
 title:'Follow-Up ENT Regular + Serial Audiometry',
 description:'Monitor hearing, adjust treatment',
 required: true,
 category:'documentation'
 }
 ]
 }
 }
 },

 // ISPA (Infeksi Saluran Pernapasan Akut) - PPK Indonesia + WHO + IDSA/ATS 2019
'ispa': {
 diseaseId:'ispa',
 diseaseName:'ISPA (Infeksi Saluran Pernapasan Akut)',
 startNodeId:'ispa-initial-assessment',
 nodes: {
'ispa-initial-assessment': {
 id:'ispa-initial-assessment',
 type:'checklist',
 title:'Initial Assessment & Red Flags Screening',
 description:'ISPA triage - rule out severe pneumonia/sepsis first',
 items: [
 {
 id:'ispa-anamnesis',
 title:'Anamnesis ISPA (OPQRST)',
 description:'Onset (mendadak/gradual?), batuk (produktif/kering?), sesak napas, demam (berapa hari?), nyeri tenggorok, rinorea, myalgia, riwayat kontak ISPA',
 required: true,
 category:'assessment'
 },
 {
 id:'ispa-vital-signs',
 title:'Vital Signs Lengkap',
 description:'RR (takipnea >24x/min?), SpO2 room air (<90% = severe), HR, BP, suhu (>38°C), kesadaran',
 required: true,
 category:'assessment'
 },
 {
 id:'ispa-thorax-exam',
 title:'Pemeriksaan Thorax',
 description:'Inspeksi (retraksi, sianosis), palpasi (fremitus), perkusi (dullness = konsolidasi), auskultasi (ronki, wheezing, bronchial breathing)',
 required: true,
 category:'assessment'
 },
 {
 id:'ispa-oropharynx-exam',
 title:'Pemeriksaan Orofaring',
 description:'Hiperemia faring, tonsil membesar/eksudat, KGB leher (lymphadenopathy), stridor (epiglotitis?)',
 required: true,
 category:'assessment'
 },
 {
 id:'ispa-red-flag-sepsis',
 title:'RED FLAG: Tanda Sepsis (qSOFA ≥2)?',
 description:'Altered mental status + RR ≥22 + SBP ≤100 mmHg → EMERGENCY sepsis protocol!',
 required: true,
 category:'safety'
 },
 {
 id:'ispa-red-flag-respiratory-failure',
 title:'RED FLAG: Respiratory Distress/Failure?',
 description:'SpO2 <90%, RR >30, akses otot bantu napas, sianosis sentral → immediate oxygen + consider ICU',
 required: true,
 category:'safety'
 },
 {
 id:'ispa-comorbidities',
 title:'Identifikasi Komorbiditas',
 description:'DM, CKD, penyakit jantung, PPOK, asma, imunosupresi (HIV, kemoterapi, steroid kronis) → risk stratification',
 required: true,
 category:'assessment'
 },
 {
 id:'ispa-smoking-history',
 title:'Riwayat Merokok & Polusi',
 description:'Perokok aktif/pasif, paparan polusi udara, okupasi berisiko (tambang, pabrik)',
 required: false,
 category:'assessment'
 }
 ]
 },

'ispa-severity-triage': {
 id:'ispa-severity-triage',
 type:'decision',
 title:'Severity Triage - CURB-65 & Clinical Assessment',
 description:'Stratifikasi ringan vs berat untuk menentukan setting perawatan dan intensitas terapi',
 warningLevel:'warning',
 branches: [
 {
 id:'ispa-mild-branch',
 title:'MILD ISPA (CURB-65 0-1, Stable)',
 description:'Tidak ada tanda pneumonia berat, SpO2 >92%, vital stabil → workup outpatient',
 icon:'',
 color:'green',
 nextNodeId:'ispa-mild-upper-lower-decision',
 riskLevel:'low'
 },
 {
 id:'ispa-severe-branch',
 title:'MODERATE-SEVERE (CURB-65 ≥2 atau Red Flags)',
 description:'Pneumonia suspected/confirmed + tanda severity → immediate workup & admission consideration',
 icon:'',
 color:'red',
 nextNodeId:'ispa-pneumonia-workup',
 riskLevel:'high'
 }
 ]
 },

 // MILD ISPA BRANCH
'ispa-mild-upper-lower-decision': {
 id:'ispa-mild-upper-lower-decision',
 type:'decision',
 title:'Upper vs Lower Respiratory Tract Infection',
 description:'Diferensiasi lokasi infeksi untuk terapi yang tepat',
 warningLevel:'info',
 branches: [
 {
 id:'upper-rti-branch',
 title:'UPPER RTI (Common Cold/Pharyngitis/Rhinitis)',
 description:'Gejala dominan di hidung/tenggorok tanpa tanda lower airway involvement',
 icon:'',
 color:'blue',
 nextNodeId:'upper-rti-management',
 riskLevel:'low'
 },
 {
 id:'lower-rti-branch',
 title:'LOWER RTI (Acute Bronchitis)',
 description:'Batuk produktif >5 hari, ronki/wheezing, tanpa konsolidasi/pneumonia',
 icon:'',
 color:'teal',
 nextNodeId:'acute-bronchitis-management',
 riskLevel:'low'
 }
 ]
 },

'upper-rti-management': {
 id:'upper-rti-management',
 type:'checklist',
 title:'Upper RTI - Symptomatic Management',
 description:'Mayoritas viral (rhinovirus, coronavirus, adenovirus) → antibiotik TIDAK diindikasikan kecuali bacterial pharyngitis',
 items: [
 {
 id:'upper-rti-viral-education',
 title:'Edukasi Infeksi Viral Self-Limiting',
 description:'Durasi 7-10 hari, antibiotik tidak mempercepat penyembuhan common cold. Istirahat cukup, hidrasi, nutrisi baik',
 required: true,
 category:'documentation'
 },
 {
 id:'upper-rti-paracetamol',
 title:'Paracetamol 500mg PO q6h PRN',
 description:'Untuk demam >38°C atau nyeri tenggorok. Max 4g/hari. HINDARI pada gangguan hepar',
 required: true,
 category:'medication'
 },
 {
 id:'upper-rti-decongestant',
 title:'Decongestant (Pseudoephedrine/Phenylephrine)',
 description:'Untuk kongesti nasal. HATI-HATI pada hipertensi tidak terkontrol, aritmia, glaukoma',
 required: false,
 category:'medication'
 },
 {
 id:'upper-rti-antihistamine',
 title:'Antihistamin (Cetirizine 10mg PO OD)',
 description:'Untuk rinorea allergic component. Sedasi minimal dibanding generasi 1',
 required: false,
 category:'medication'
 },
 {
 id:'upper-rti-throat-lozenges',
 title:'Throat Lozenges/Gargle Salt Water',
 description:'Untuk nyeri tenggorok. Gargle dengan air garam hangat 3-4x/hari',
 required: false,
 category:'action'
 },
 {
 id:'upper-rti-centor-score',
 title:'BACTERIAL Pharyngitis Assessment (Centor Score)',
 description:'Tonsillar exudate (1) + Tender anterior cervical lymph (1) + Fever >38°C (1) + Absence of cough (1). Score ≥3 → consider rapid strep test',
 required: true,
 category:'assessment'
 },
 {
 id:'upper-rti-antibiotics-if-bacterial',
 title:'Antibiotik HANYA jika Bacterial Pharyngitis Confirmed',
 description:'Amoxicillin 500mg PO TID x 10 hari (GABHS) ATAU Azithromycin 500mg OD x 3 hari (alergi penisilin). JANGAN berikan untuk viral pharyngitis',
 required: false,
 category:'medication'
 },
 {
 id:'upper-rti-warning-signs',
 title:'Warning Signs untuk Re-evaluasi',
 description:'Kembali jika: demam >3 hari, sesak napas muncul, batuk produktif purulen, tidak ada perbaikan 7-10 hari',
 required: true,
 category:'safety'
 },
 {
 id:'upper-rti-follow-up',
 title:'Follow-up PRN (jika tidak ada perbaikan)',
 description:'Re-assessment dalam 5-7 hari jika gejala persisten atau perburukan',
 required: true,
 category:'documentation'
 }
 ]
 },

'acute-bronchitis-management': {
 id:'acute-bronchitis-management',
 type:'checklist',
 title:'Acute Bronchitis Management',
 description:'Viral dalam 90% kasus - HINDARI antibiotik rutin (Cochrane 2017)',
 items: [
 {
 id:'bronchitis-viral-education',
 title:'Edukasi Bronchitis Viral (Mayoritas)',
 description:'90% viral (influenza, RSV, rhinovirus). Antibiotik TIDAK direkomendasikan kecuali suspek pertussis atau superinfeksi bakterial',
 required: true,
 category:'documentation'
 },
 {
 id:'bronchitis-chest-xray-if-doubt',
 title:'Chest X-ray jika Suspek Pneumonia',
 description:'Indikasi foto thorax: RR >24, HR >100, suhu >38°C, ronki lokal/konsolidasi. Rule out pneumonia',
 required: true,
 category:'assessment'
 },
 {
 id:'bronchitis-symptomatic-paracetamol',
 title:'Paracetamol 500-1000mg PO q6h PRN',
 description:'Untuk demam dan myalgia. Hidrasi adekuat (2-3L/hari)',
 required: true,
 category:'medication'
 },
 {
 id:'bronchitis-bronchodilator-if-wheeze',
 title:'Bronkodilator jika Wheezing (Salbutamol Inhaler)',
 description:'Salbutamol 2 puff q4-6h PRN untuk bronkospasme. Pertimbangkan asma/PPOK underlying',
 required: false,
 category:'medication'
 },
 {
 id:'bronchitis-antitussive-if-dry-cough',
 title:'Antitussive (Dextromethorphan) jika Batuk Kering Mengganggu',
 description:'Untuk batuk non-produktif yang mengganggu tidur. HINDARI jika batuk produktif (ekspektorasi diperlukan)',
 required: false,
 category:'medication'
 },
 {
 id:'bronchitis-mucolytic',
 title:'Mucolytic (Acetylcysteine/Bromhexine) untuk Sputum Kental',
 description:'Evidence terbatas, tapi dapat membantu ekspektorasi. Hidrasi tetap yang terpenting',
 required: false,
 category:'medication'
 },
 {
 id:'bronchitis-no-routine-antibiotics',
 title:'HINDARI Antibiotik Rutin (ACP/CDC Guideline)',
 description:'Antibiotik TIDAK menurunkan durasi gejala pada bronchitis viral. Berikan HANYA jika: suspek pertussis (batuk >2 minggu + paroxysmal/whooping), atau imunosupresi berat',
 required: true,
 category:'safety'
 },
 {
 id:'bronchitis-smoking-cessation',
 title:'Smoking Cessation Counseling',
 description:'Perokok berisiko bronchitis berulang dan PPOK. Rujuk program berhenti merokok',
 required: true,
 category:'documentation'
 },
 {
 id:'bronchitis-follow-up',
 title:'Follow-up dalam 1 Minggu jika Tidak Ada Perbaikan',
 description:'Re-evaluasi jika batuk >3 minggu (consider post-infectious cough, asma, GERD, pertussis)',
 required: true,
 category:'documentation'
 }
 ]
 },

 // MODERATE-SEVERE PNEUMONIA BRANCH
'ispa-pneumonia-workup': {
 id:'ispa-pneumonia-workup',
 type:'checklist',
 title:'Pneumonia Diagnostic Workup',
 description:'Community-Acquired Pneumonia (CAP) - IDSA/ATS 2019 Guidelines',
 items: [
 {
 id:'pneumonia-chest-xray',
 title:'Chest X-ray PA/AP (MANDATORY)',
 description:'Konfirmasi infiltrat, konsolidasi, efusi pleura. Foto thorax adalah gold standard diagnosis pneumonia',
 required: true,
 category:'assessment'
 },
 {
 id:'pneumonia-cbc',
 title:'Complete Blood Count (CBC)',
 description:'Leukositosis (>15,000 = bacterial likely), leukopenia (<4,000 = severe/poor prognosis), shift to left',
 required: true,
 category:'assessment'
 },
 {
 id:'pneumonia-crp-procalcitonin',
 title:'CRP & Procalcitonin (jika tersedia)',
 description:'CRP >100 mg/L atau PCT >0.5 ng/mL mendukung etiologi bakterial. PCT guided therapy dapat kurangi penggunaan antibiotik',
 required: false,
 category:'assessment'
 },
 {
 id:'pneumonia-blood-culture',
 title:'Blood Culture x2 (SEBELUM Antibiotik)',
 description:'Indikasi: ICU admission, cavitary lesion, leukopenia, alkoholisme, asplenia, efusi pleura. Positif ~5-14% CAP',
 required: false,
 category:'assessment'
 },
 {
 id:'pneumonia-sputum-culture',
 title:'Sputum Gram Stain & Culture',
 description:'Jika produktif, ICU, empiric gagal. Kualitas baik: <10 epitel, >25 PMN per LPF',
 required: false,
 category:'assessment'
 },
 {
 id:'pneumonia-urinary-antigen',
 title:'Urinary Antigen Test (Legionella, Pneumococcus)',
 description:'Indikasi: ICU, cavitary, efusi, gagal outpatient antibiotik, travel history (AC/cooling tower untuk Legionella)',
 required: false,
 category:'assessment'
 },
 {
 id:'pneumonia-curb65-score',
 title:'CURB-65 Severity Scoring (MANDATORY)',
 description:'Confusion (1) + Ureum >7mmol/L atau BUN >20mg/dL (1) + RR ≥30 (1) + BP: SBP<90 atau DBP≤60 (1) + age ≥65 (1). Score 0-1=outpatient, 2=ward, ≥3=ICU consider',
 required: true,
 category:'assessment'
 },
 {
 id:'pneumonia-arterial-gas',
 title:'Arterial Blood Gas jika SpO2 <92%',
 description:'Evaluasi hipoksemia (PaO2 <60 mmHg), hiperkapnia (PaCO2 >50), asidosis. Tentukan kebutuhan ventilasi',
 required: false,
 category:'assessment'
 },
 {
 id:'pneumonia-electrolytes',
 title:'Elektrolit & Renal Function',
 description:'Ureum/kreatinin (CURB-65), Na/K (SIADH risk pada Legionella), glucose (DM control)',
 required: true,
 category:'assessment'
 },
 {
 id:'pneumonia-oxygen-if-hypoxic',
 title:'Supplemental Oxygen untuk Target SpO2 >92%',
 description:'Nasal kanul, simple mask, atau high-flow jika needed. Monitor ABG serial',
 required: true,
 category:'action'
 }
 ]
 },

'pneumonia-severity-decision': {
 id:'pneumonia-severity-decision',
 type:'decision',
 title:'Pneumonia Severity Stratification - Setting Perawatan',
 description:'Berdasarkan CURB-65 dan clinical judgment untuk menentukan outpatient vs inpatient vs ICU',
 warningLevel:'critical',
 branches: [
 {
 id:'pneumonia-low-risk',
 title:'LOW RISK (CURB-65 0-1)',
 description:'Outpatient treatment - oral antibiotics, follow-up ketat',
 icon:'',
 color:'green',
 nextNodeId:'pneumonia-outpatient-treatment',
 riskLevel:'low'
 },
 {
 id:'pneumonia-moderate-risk',
 title:'MODERATE RISK (CURB-65 2)',
 description:'Ward admission - IV antibiotics, monitoring, oxygen support',
 icon:'',
 color:'orange',
 nextNodeId:'pneumonia-ward-treatment',
 riskLevel:'medium'
 },
 {
 id:'pneumonia-high-risk',
 title:'HIGH RISK (CURB-65 ≥3 atau Severe CAP Criteria)',
 description:'ICU consideration - septic shock, mechanical ventilation need, multi-organ failure',
 icon:'',
 color:'red',
 nextNodeId:'pneumonia-icu-treatment',
 riskLevel:'high'
 }
 ]
 },

'pneumonia-outpatient-treatment': {
 id:'pneumonia-outpatient-treatment',
 type:'checklist',
 title:'CAP Outpatient Treatment (CURB-65 0-1)',
 description:'Oral antibiotics - pilih berdasarkan komorbiditas dan risk MDR',
 items: [
 {
 id:'outpatient-no-comorbid-amoxicillin',
 title:'Pasien TANPA Komorbid: Amoxicillin 1g PO TID x 5-7 hari',
 description:'First-line untuk CAP tanpa komorbid. Coverage S. pneumoniae. ATAU Amoxicillin-clavulanate 875/125 mg BID',
 required: false,
 category:'medication'
 },
 {
 id:'outpatient-no-comorbid-macrolide',
 title:'ATAU Macrolide: Azithromycin 500mg OD x 3 hari',
 description:'Alternative jika alergi beta-laktam. Coverage atypical (Mycoplasma, Chlamydia). Resistance concern di beberapa area',
 required: false,
 category:'medication'
 },
 {
 id:'outpatient-comorbid-amoxclav-macrolide',
 title:'Pasien DENGAN Komorbid: Amox-Clav + Azithromycin',
 description:'Komorbid = DM, CKD, CHF, PPOK, imunosupresi. Dual therapy untuk broader coverage termasuk atypical',
 required: false,
 category:'medication'
 },
 {
 id:'outpatient-alternative-fluoroquinolone',
 title:'ATAU Respiratory Fluoroquinolone: Levofloxacin 750mg PO OD',
 description:'Monoterapi untuk CAP dengan komorbid. HINDARI jika riwayat tendon issues, QTc prolongation. Resistance concern',
 required: false,
 category:'medication'
 },
 {
 id:'outpatient-symptomatic',
 title:'Symptomatic: Paracetamol, Adequate Hydration, Rest',
 description:'Hidrasi 2-3L/hari, istirahat, nutrisi baik. Hindari NSAID (risk GI/renal)',
 required: true,
 category:'medication'
 },
 {
 id:'outpatient-follow-up-48h',
 title:'Follow-up dalam 48-72 Jam (Clinical atau Telepon)',
 description:'Re-assess response to therapy. Jika tidak ada perbaikan → consider admission atau change antibiotics',
 required: true,
 category:'documentation'
 },
 {
 id:'outpatient-warning-signs-admission',
 title:'Warning Signs untuk Immediate Admission',
 description:'Sesak bertambah, SpO2 <92%, confusion, tidak bisa minum, demam persisten >3 hari terapi',
 required: true,
 category:'safety'
 },
 {
 id:'outpatient-chest-xray-follow-up',
 title:'Follow-up Chest X-ray dalam 6 Minggu (jika usia >50 atau perokok)',
 description:'Rule out underlying malignancy atau TB. Resolusi infiltrat bisa 4-12 minggu',
 required: true,
 category:'documentation'
 }
 ]
 },

'pneumonia-ward-treatment': {
 id:'pneumonia-ward-treatment',
 type:'checklist',
 title:'CAP Inpatient Ward Treatment (CURB-65 2)',
 description:'IV antibiotics - dual therapy recommended untuk broader coverage',
 items: [
 {
 id:'ward-iv-betalactam-ceftriaxone',
 title:'IV Beta-lactam: Ceftriaxone 2g IV OD',
 description:'ATAU Ampicillin-Sulbactam 3g IV q6h. Coverage S. pneumoniae, H. influenzae',
 required: true,
 category:'medication'
 },
 {
 id:'ward-iv-macrolide-azithromycin',
 title:'PLUS Macrolide: Azithromycin 500mg IV OD',
 description:'Dual therapy menurunkan mortalitas (meta-analysis). Coverage atypical pathogens (Legionella, Mycoplasma)',
 required: true,
 category:'medication'
 },
 {
 id:'ward-alternative-fluoroquinolone',
 title:'ATAU Respiratory Fluoroquinolone: Levofloxacin 750mg IV OD',
 description:'Monoterapi alternative jika alergi beta-laktam. Switch to PO when improving',
 required: false,
 category:'medication'
 },
 {
 id:'ward-oxygen-therapy',
 title:'Supplemental Oxygen untuk SpO2 Target 92-96%',
 description:'Nasal kanul atau simple mask. Monitor ABG jika SpO2 <92% despite oxygen',
 required: true,
 category:'action'
 },
 {
 id:'ward-iv-fluids',
 title:'IV Fluid Resuscitation jika Dehidrasi',
 description:'NS atau RL 500-1000mL bolus, kemudian maintenance. Monitor input-output, avoid overload',
 required: true,
 category:'action'
 },
 {
 id:'ward-thromboprophylaxis',
 title:'VTE Prophylaxis: Enoxaparin 40mg SC OD',
 description:'Untuk semua pasien immobile/bedrest. HINDARI jika HIT, bleeding risk tinggi',
 required: true,
 category:'medication'
 },
 {
 id:'ward-daily-assessment',
 title:'Daily Clinical Assessment (Vital Signs, SpO2, Mental Status)',
 description:'Monitor response to therapy. Criteria for clinical stability: T<37.8, HR<100, RR<24, SBP≥90, SpO2≥90%, able to eat',
 required: true,
 category:'assessment'
 },
 {
 id:'ward-switch-to-oral',
 title:'IV to PO Switch saat Clinically Stable',
 description:'Criteria: afebrile 24h, hemodynamically stable, GI tract functioning. Switch ke oral antibiotics yang equivalent',
 required: true,
 category:'action'
 },
 {
 id:'ward-discharge-planning',
 title:'Discharge Planning & Outpatient Follow-up',
 description:'Total durasi antibiotik 5-7 hari (bisa extend jika slow response). Follow-up 1 minggu post-discharge',
 required: true,
 category:'documentation'
 }
 ]
 },

'pneumonia-icu-treatment': {
 id:'pneumonia-icu-treatment',
 type:'checklist',
 title:'Severe CAP - ICU Protocol (CURB-65 ≥3)',
 description:'Aggressive resuscitation + broad-spectrum antibiotics + organ support',
 items: [
 {
 id:'icu-sepsis-bundle',
 title:'Sepsis Resuscitation Bundle (Hour-1 Bundle)',
 description:'Lactate measurement, blood culture sebelum antibiotik, broad-spectrum antibiotik dalam 1 jam, fluid 30mL/kg jika hipotensi/lactate ≥4',
 required: true,
 category:'action'
 },
 {
 id:'icu-broad-spectrum-betalactam',
 title:'IV Broad-Spectrum Beta-lactam: Ceftriaxone 2g IV OD ATAU Piperacillin-Tazobactam 4.5g IV q6h',
 description:'Coverage gram-positive (S. pneumoniae) dan gram-negative. Pip-tazo untuk risk Pseudomonas (bronchiectasis, recent hospitalization)',
 required: true,
 category:'medication'
 },
 {
 id:'icu-macrolide-or-fluoroquinolone',
 title:'PLUS Azithromycin 500mg IV OD ATAU Levofloxacin 750mg IV OD',
 description:'Dual therapy MANDATORY untuk severe CAP (mortality benefit). Coverage atypical + anti-inflammatory effect',
 required: true,
 category:'medication'
 },
 {
 id:'icu-consider-mrsa-coverage',
 title:'Consider MRSA Coverage: Vancomycin 15-20mg/kg IV q12h (jika risk MRSA)',
 description:'Risk factors MRSA: recent hospitalization, IVDU, necrotizing pneumonia, empyema. Target trough 15-20 mcg/mL',
 required: false,
 category:'medication'
 },
 {
 id:'icu-mechanical-ventilation',
 title:'Mechanical Ventilation jika Respiratory Failure',
 description:'Indikasi: RR>35, PaO2/FiO2 <200 (ARDS), pH<7.25, altered mental status. Low tidal volume 6mL/kg PBW',
 required: false,
 category:'action'
 },
 {
 id:'icu-vasopressors',
 title:'Vasopressors jika Septic Shock (MAP <65 despite fluid)',
 description:'Norepinephrine first-line. Target MAP ≥65 mmHg. Monitor lactate clearance',
 required: false,
 category:'medication'
 },
 {
 id:'icu-steroids-if-shock',
 title:'Hydrocortisone 50mg IV q6h jika Refractory Septic Shock',
 description:'Untuk shock yang butuh vasopressor despite adequate fluid. HINDARI steroid dosis tinggi',
 required: false,
 category:'medication'
 },
 {
 id:'icu-procalcitonin-guided',
 title:'Procalcitonin-Guided Antibiotic Duration',
 description:'Jika PCT tersedia, dapat guide de-escalation. Stop antibiotik jika PCT turun >80% dari peak atau <0.5 ng/mL + clinical improvement',
 required: false,
 category:'assessment'
 },
 {
 id:'icu-source-control',
 title:'Source Control: Drainage jika Empyema/Parapneumonic Effusion',
 description:'Thoracentesis diagnostic. Chest tube jika empyema (pH<7.2, glucose<60, LDH>1000, gram stain positive)',
 required: false,
 category:'action'
 },
 {
 id:'icu-icu-bundle',
 title:'ICU Care Bundle: DVT prophylaxis, stress ulcer prophylaxis, glycemic control',
 description:'Enoxaparin 40mg SC OD, PPI (pantoprazole 40mg IV OD), target glucose 140-180 mg/dL',
 required: true,
 category:'action'
 },
 {
 id:'icu-daily-rounds',
 title:'Daily Multidisciplinary ICU Rounds',
 description:'Assess response, de-escalation plan, extubation readiness, ICU liberation',
 required: true,
 category:'documentation'
 },
 {
 id:'icu-step-down-criteria',
 title:'Step-down ke Ward saat Stable (off vasopressor >24h, SpO2 >92% on low-flow O2)',
 description:'Continue antibiotik sampai total 7-10 hari (longer jika bacteremia, cavitary, slow response)',
 required: true,
 category:'documentation'
 }
 ]
 }
 }
 },


 // ALERGI & DERMATITIS - PPK Indonesia + WHO + EAACI 2024 + AAD 2023
'alergi-dermatitis': {
 diseaseId:'alergi-dermatitis',
 diseaseName:'Alergi & Dermatitis',
 startNodeId:'allergy-initial-assessment',
 nodes: {
'allergy-initial-assessment': {
 id:'allergy-initial-assessment',
 type:'checklist',
 title:'Initial Assessment - Allergic Presentation',
 description:'Comprehensive assessment untuk diferensiasi acute allergic reaction vs chronic dermatitis',
 items: [
 {
 id:'allergy-anamnesis-onset',
 title:'Anamnesis: Onset & Timeline',
 description:'Acute (menit-jam) vs subacute (hari-minggu) vs chronic (>12 minggu). Acute onset mendadak → suspek allergic reaction. Chronic relapsing → dermatitis',
 required: true,
 category:'assessment'
 },
 {
 id:'allergy-skin-lesion-morphology',
 title:'Morfologi Lesi Kulit',
 description:'Urtikaria (wheal & flare, gatal, mobile, <24h), angioedema (deeper, tidak gatal), eksim/eczema (erythema, scaling, kronik), papul, vesikel, lichenifikasi',
 required: true,
 category:'assessment'
 },
 {
 id:'allergy-distribution-pattern',
 title:'Pola Distribusi Lesi',
 description:'Localized vs generalized. Atopic: fleksural (lipat siku, lutut). Contact: site of exposure. Seborrheic: scalp, face (nasolabial, eyebrow)',
 required: true,
 category:'assessment'
 },
 {
 id:'allergy-trigger-identification',
 title:'Identifikasi Trigger/Allergen',
 description:'Makanan (seafood, kacang, telur), obat (antibiotik, NSAID), gigitan serangga, lateks, kontak (kosmetik, logam), aeroallergen (debu, tungau, serbuk)',
 required: true,
 category:'assessment'
 },
 {
 id:'allergy-systemic-symptoms',
 title:'Gejala Sistemik (RED FLAGS)',
 description:'Dyspnea, wheezing, stridor, hypotension, syncope, GI symptoms (nausea, vomiting, diarrhea) → risk anaphylaxis!',
 required: true,
 category:'safety'
 },
 {
 id:'allergy-vital-signs',
 title:'Vital Signs & Airway Assessment',
 description:'BP (hipotensi?), HR (takikardi?), RR, SpO2. Inspeksi airway: tongue swelling, lip edema, stridor → immediate airway management!',
 required: true,
 category:'assessment'
 },
 {
 id:'allergy-atopy-history',
 title:'Riwayat Atopi Personal & Keluarga',
 description:'Asma, rhinitis alergi, atopic dermatitis, food allergy. Family history atopi meningkatkan risk 3-4x',
 required: true,
 category:'assessment'
 },
 {
 id:'allergy-previous-reactions',
 title:'Riwayat Reaksi Alergi Sebelumnya',
 description:'Anaphylaxis previous (risk rekurensi tinggi), severity progression, known allergen, epinephrine auto-injector dimiliki?',
 required: false,
 category:'assessment'
 },
 {
 id:'allergy-current-medications',
 title:'Obat Saat Ini (Beta-blocker, ACEi?)',
 description:'Beta-blocker menghalangi response epinephrine. ACEi meningkatkan risk angioedema. Antihistamin consumption sebelumnya?',
 required: true,
 category:'assessment'
 }
 ]
 },

'allergy-acute-vs-chronic-decision': {
 id:'allergy-acute-vs-chronic-decision',
 type:'decision',
 title:'Acute Allergic Reaction vs Chronic Dermatitis',
 description:'Klasifikasi berdasarkan onset dan presentasi klinis',
 warningLevel:'warning',
 branches: [
 {
 id:'acute-allergic-branch',
 title:'ACUTE ALLERGIC REACTION (onset <24 jam)',
 description:'Urtikaria, angioedema, anaphylaxis → immediate treatment & severity assessment',
 icon:'',
 color:'red',
 nextNodeId:'acute-allergy-severity-triage',
 riskLevel:'high'
 },
 {
 id:'chronic-dermatitis-branch',
 title:'CHRONIC DERMATITIS (onset >12 minggu atau relapsing)',
 description:'Atopic dermatitis, contact dermatitis, seborrheic dermatitis → type classification',
 icon:'',
 color:'blue',
 nextNodeId:'chronic-dermatitis-classification',
 riskLevel:'low'
 }
 ]
 },

'acute-allergy-severity-triage': {
 id:'acute-allergy-severity-triage',
 type:'decision',
 title:'Acute Allergy Severity Triage',
 description:'Stratifikasi severity untuk menentukan urgency & aggressiveness terapi (WAO Anaphylaxis Guidance 2020)',
 warningLevel:'critical',
 branches: [
 {
 id:'mild-allergic-reaction',
 title:'MILD (Localized Urticaria/Pruritus)',
 description:'Skin-only symptoms, no systemic involvement → oral antihistamine',
 icon:'',
 color:'green',
 nextNodeId:'mild-allergy-treatment',
 riskLevel:'low'
 },
 {
 id:'moderate-allergic-reaction',
 title:'MODERATE (Widespread/Angioedema/GI)',
 description:'Generalized urticaria, angioedema (non-airway), GI symptoms → IM antihistamine + corticosteroid',
 icon:'',
 color:'orange',
 nextNodeId:'moderate-allergy-treatment',
 riskLevel:'medium'
 },
 {
 id:'severe-anaphylaxis',
 title:'SEVERE ANAPHYLAXIS (Airway/Breathing/Circulation)',
 description:'Dyspnea, stridor, hypotension, altered consciousness → IMMEDIATE IM EPINEPHRINE!',
 icon:'',
 color:'red',
 nextNodeId:'anaphylaxis-emergency-protocol',
 riskLevel:'high'
 }
 ]
 },

'mild-allergy-treatment': {
 id:'mild-allergy-treatment',
 type:'checklist',
 title:'Mild Allergic Reaction - Outpatient Management',
 description:'Localized urticaria tanpa systemic symptoms',
 items: [
 {
 id:'mild-oral-antihistamine',
 title:'Oral 2nd Generation Antihistamine (Non-sedating)',
 description:'Cetirizine 10mg PO OD ATAU Loratadine 10mg PO OD. Onset 1-3 jam. Avoid 1st gen (sedasi, anticholinergic)',
 required: true,
 category:'medication'
 },
 {
 id:'mild-topical-cooling',
 title:'Topical Cooling & Soothing (Calamine Lotion)',
 description:'Untuk gatal lokal. Cold compress. Hindari menggaruk (risk lichenifikasi)',
 required: false,
 category:'action'
 },
 {
 id:'mild-avoid-trigger',
 title:'Identifikasi & Avoid Trigger',
 description:'Dokumentasi suspected allergen. Stop suspected food/medication. Avoid re-exposure',
 required: true,
 category:'action'
 },
 {
 id:'mild-monitoring-progression',
 title:'Patient Education: Warning Signs Progression',
 description:'Kembali SEGERA jika: sesak napas, lip/tongue swelling, dizziness, nausea/vomiting → risk anaphylaxis',
 required: true,
 category:'safety'
 },
 {
 id:'mild-follow-up-allergist',
 title:'Follow-up Allergist (jika recurrent atau severe trigger)',
 description:'Rujuk untuk skin prick test atau specific IgE test. Consider desensitization therapy (immunotherapy)',
 required: false,
 category:'documentation'
 }
 ]
 },

'moderate-allergy-treatment': {
 id:'moderate-allergy-treatment',
 type:'checklist',
 title:'Moderate Allergic Reaction - Intensive Management',
 description:'Widespread urticaria atau angioedema non-life-threatening',
 items: [
 {
 id:'moderate-im-antihistamine',
 title:'IM/IV Antihistamine: Diphenhydramine 25-50mg IM/IV',
 description:'Faster onset dibanding oral (15-30 min). Alternative: Chlorpheniramine 10mg IM. SE: sedasi',
 required: true,
 category:'medication'
 },
 {
 id:'moderate-corticosteroid',
 title:'Corticosteroid: Methylprednisolone 125mg IV ATAU Prednisone 40-60mg PO',
 description:'Mencegah biphasic reaction (rebound 4-12 jam kemudian). Taper 3-5 hari jika severe',
 required: true,
 category:'medication'
 },
 {
 id:'moderate-h2-blocker',
 title:'H2 Blocker (Adjuvant): Ranitidine 50mg IV atau Famotidine 20mg IV',
 description:'Synergistic dengan H1 blocker untuk urticaria. Especially jika GI symptoms prominent',
 required: false,
 category:'medication'
 },
 {
 id:'moderate-observation',
 title:'Observation 4-6 Jam (Monitor Biphasic Reaction)',
 description:'Biphasic reaction terjadi 4-12 jam post-initial. Monitor vital signs, respiratory status',
 required: true,
 category:'action'
 },
 {
 id:'moderate-consider-epinephrine',
 title:'Consider Epinephrine jika Progressive Symptoms',
 description:'Jika angioedema meluas ke airway, dyspnea muncul, hypotension → escalate ke anaphylaxis protocol',
 required: true,
 category:'safety'
 },
 {
 id:'moderate-discharge-planning',
 title:'Discharge dengan Oral Antihistamine + Steroid Taper',
 description:'Cetirizine 10mg OD x 7-10 hari. Prednisone taper (40→20→10 mg over 5 hari). Avoid trigger',
 required: true,
 category:'medication'
 },
 {
 id:'moderate-epinephrine-prescription',
 title:'Prescribe EpiPen (Epinephrine Auto-injector) jika High Risk',
 description:'Indikasi: previous anaphylaxis, food allergy (peanut, seafood), remote location. Education cara pakai: inject outer thigh, hold 10 sec',
 required: false,
 category:'action'
 }
 ]
 },

'anaphylaxis-emergency-protocol': {
 id:'anaphylaxis-emergency-protocol',
 type:'checklist',
 title:'ANAPHYLAXIS Emergency Protocol - Life-Saving Interventions',
 description:'Time-critical management sesuai WAO Anaphylaxis Guidelines 2020',
 items: [
 {
 id:'anaphylaxis-epinephrine-im-stat',
 title:'IM EPINEPHRINE 0.3-0.5mg (1:1000) STAT - FIRST-LINE!',
 description:'Inject vastus lateralis (mid-anterolateral thigh). Repeat q5-15min jika tidak ada response. NEVER delay untuk antihistamine!',
 required: true,
 category:'medication'
 },
 {
 id:'anaphylaxis-abcs',
 title:'ABCs: Airway, Breathing, Circulation',
 description:'Posisi supine + leg elevation (jika hipotensi). High-flow O2 10-15L via NRM. Prepare for intubation jika stridor/tongue swelling',
 required: true,
 category:'action'
 },
 {
 id:'anaphylaxis-iv-access',
 title:'IV Access x2 Large Bore (16-18G)',
 description:'Untuk fluid resuscitation + medication. Jika sulit → IO access',
 required: true,
 category:'action'
 },
 {
 id:'anaphylaxis-fluid-resuscitation',
 title:'Aggressive IV Fluid: NS/RL 1-2L Bolus (20mL/kg)',
 description:'Untuk shock/hypotension. Repeat bolus jika SBP <90. Avoid overload jika pulmonary edema',
 required: true,
 category:'action'
 },
 {
 id:'anaphylaxis-antihistamine-adjuvant',
 title:'Adjuvant: Diphenhydramine 25-50mg IV + Ranitidine 50mg IV',
 description:'H1 + H2 blocker. BUKAN first-line! Jangan delay epinephrine untuk ini',
 required: true,
 category:'medication'
 },
 {
 id:'anaphylaxis-corticosteroid-iv',
 title:'Corticosteroid: Methylprednisolone 125mg IV atau Hydrocortisone 200mg IV',
 description:'Prevent biphasic reaction (20% kasus). NO immediate effect! Onset 4-6 jam',
 required: true,
 category:'medication'
 },
 {
 id:'anaphylaxis-bronchodilator-if-wheeze',
 title:'Nebulized Salbutamol jika Bronchospasm/Wheezing',
 description:'Salbutamol 5mg nebulized. TIDAK menggantikan epinephrine!',
 required: false,
 category:'medication'
 },
 {
 id:'anaphylaxis-vasopressor-if-refractory',
 title:'Vasopressor (Norepinephrine) jika Refractory Shock',
 description:'Jika hipotensi persisten despite epinephrine + fluid. Start 0.05-0.1 mcg/kg/min. Target MAP ≥65',
 required: false,
 category:'medication'
 },
 {
 id:'anaphylaxis-glucagon-if-beta-blocker',
 title:'Glucagon 1-2mg IV (jika pasien pakai Beta-blocker)',
 description:'Beta-blocker blunts epinephrine effect. Glucagon bypasses beta-receptor. SE: vomiting',
 required: false,
 category:'medication'
 },
 {
 id:'anaphylaxis-icu-admission',
 title:'ICU/HDU Admission untuk Observation 24 Jam',
 description:'Monitor biphasic reaction (up to 72 jam pada severe cases). Serial vital signs, continuous monitoring',
 required: true,
 category:'action'
 },
 {
 id:'anaphylaxis-tryptase-level',
 title:'Serum Tryptase Level (1-4 jam post-reaction)',
 description:'Diagnostic marker anaphylaxis. Elevated (>11.4 ng/mL) confirms mast cell activation. Untuk diagnosis retrospektif',
 required: false,
 category:'assessment'
 },
 {
 id:'anaphylaxis-discharge-epipen',
 title:'Discharge dengan EpiPen + Allergy Action Plan',
 description:'Prescribe 2x epinephrine auto-injector (EpiPen). Edukasi cara pakai + when to use. Medical alert bracelet. MANDATORY allergist referral',
 required: true,
 category:'action'
 }
 ]
 },

'chronic-dermatitis-classification': {
 id:'chronic-dermatitis-classification',
 type:'decision',
 title:'Chronic Dermatitis Type Classification',
 description:'Diferensiasi tipe dermatitis berdasarkan morfologi, distribusi, dan trigger',
 warningLevel:'info',
 branches: [
 {
 id:'atopic-dermatitis-branch',
 title:'ATOPIC DERMATITIS (Eczema)',
 description:'Chronic relapsing, fleksural distribution, family/personal history atopi, pruritus dominant',
 icon:'',
 color:'purple',
 nextNodeId:'atopic-dermatitis-management',
 riskLevel:'low'
 },
 {
 id:'contact-dermatitis-branch',
 title:'CONTACT DERMATITIS (Allergic/Irritant)',
 description:'Well-demarcated, site of contact exposure, occupational/cosmetic trigger',
 icon:'',
 color:'teal',
 nextNodeId:'contact-dermatitis-management',
 riskLevel:'low'
 },
 {
 id:'seborrheic-dermatitis-branch',
 title:'SEBORRHEIC DERMATITIS',
 description:'Seborrheic areas (scalp, face, chest), greasy scales, Malassezia overgrowth',
 icon:'',
 color:'blue',
 nextNodeId:'seborrheic-dermatitis-management',
 riskLevel:'low'
 }
 ]
 },

'atopic-dermatitis-management': {
 id:'atopic-dermatitis-management',
 type:'checklist',
 title:'Atopic Dermatitis Management - Stepwise Approach',
 description:'AAD Guidelines 2023 - Moisturize, anti-inflammatory, prevent flare',
 items: [
 {
 id:'atopic-severity-scorad',
 title:'Assess Severity (SCORAD atau EASI Score)',
 description:'Mild: <25, Moderate: 25-50, Severe: >50. Atau rule of 9s untuk % BSA affected. Stratifikasi terapi based on severity',
 required: true,
 category:'assessment'
 },
 {
 id:'atopic-emollient-therapy',
 title:'EMOLLIENT Therapy (CORNERSTONE!) - Apply Liberally & Frequently',
 description:'Ceramide-based moisturizer 2-3x/hari. Immediately post-bath (within 3 min). Repair skin barrier. Cetaphil, CeraVe, Eucerin',
 required: true,
 category:'medication'
 },
 {
 id:'atopic-bath-habits',
 title:'Bath Modification: Lukewarm Water, Mild Soap',
 description:'Avoid hot water, harsh soap (SLS). Short bath (<10 min). Pat dry gently. Soak & seal method',
 required: true,
 category:'action'
 },
 {
 id:'atopic-topical-corticosteroid',
 title:'Topical Corticosteroid (TCS) - First-line untuk Flare',
 description:'Mild: Hydrocortisone 1-2.5%. Moderate: Triamcinolone 0.1%, Mometasone 0.1%. Potent: Betamethasone dipropionate. Apply OD-BID to inflamed area. Taper saat improve',
 required: true,
 category:'medication'
 },
 {
 id:'atopic-steroid-sparing',
 title:'Topical Calcineurin Inhibitor (Steroid-sparing)',
 description:'Tacrolimus 0.03-0.1% ointment BID atau Pimecrolimus 1% cream BID. Untuk sensitive area (face, eyelid, genitalia). Avoid sun exposure (no sunscreen interaction)',
 required: false,
 category:'medication'
 },
 {
 id:'atopic-antihistamine-pruritus',
 title:'Oral Antihistamine untuk Pruritus (terutama malam hari)',
 description:'Cetirizine 10mg qHS atau Hydroxyzine 25mg qHS (sedating → help sleep). Control itch-scratch cycle',
 required: false,
 category:'medication'
 },
 {
 id:'atopic-trigger-avoidance',
 title:'Trigger Identification & Avoidance',
 description:'Common triggers: dust mite, pets, wool clothing, stress, heat/sweat. Dust mite control (wash bedding 60°C weekly, allergen-proof covers)',
 required: true,
 category:'action'
 },
 {
 id:'atopic-infection-watch',
 title:'Monitor & Treat Secondary Infection',
 description:'S. aureus colonization common (90%). Signs: honey-crusted, weeping, fever. Treat: Mupirocin topical atau Cephalexin PO jika widespread',
 required: true,
 category:'safety'
 },
 {
 id:'atopic-phototherapy-moderate-severe',
 title:'Phototherapy (NB-UVB) untuk Moderate-Severe',
 description:'Jika topical inadequate. 3x/week. Cumulative dose. Rujuk dermatology untuk phototherapy unit',
 required: false,
 category:'action'
 },
 {
 id:'atopic-systemic-severe',
 title:'Systemic Therapy untuk Severe Refractory',
 description:'Dupilumab (IL-4/IL-13 inhibitor) SC injection q2 weeks. ATAU Cyclosporine, Methotrexate, Azathioprine. Rujuk dermatologist',
 required: false,
 category:'medication'
 },
 {
 id:'atopic-patient-education',
 title:'Patient Education: Chronic Disease, Flare Management',
 description:'Atopic dermatitis adalah chronic relapsing. Emollient DAILY even when clear. Recognize early flare → early TCS. Not curable tapi controllable',
 required: true,
 category:'documentation'
 }
 ]
 },

'contact-dermatitis-management': {
 id:'contact-dermatitis-management',
 type:'checklist',
 title:'Contact Dermatitis Management',
 description:'Allergic (type IV hypersensitivity) vs Irritant contact dermatitis',
 items: [
 {
 id:'contact-allergen-identification',
 title:'Identify & Remove Allergen/Irritant (MOST IMPORTANT!)',
 description:'Common: nickel (jewelry), fragrance, preservative (parabens), rubber (latex), plants (poison ivy). Occupational exposure (hairdresser, healthcare worker)',
 required: true,
 category:'action'
 },
 {
 id:'contact-patch-test',
 title:'Patch Testing (Gold Standard for Allergic CD)',
 description:'Apply suspected allergen to back, read 48-96h. Positive = papular reaction. Rujuk dermatology untuk standardized panel',
 required: false,
 category:'assessment'
 },
 {
 id:'contact-acute-weeping-compress',
 title:'Acute Weeping Dermatitis: Wet Compress',
 description:'Burow solution (aluminum acetate) atau saline compress 15-20 min TID. Dry & soothe',
 required: false,
 category:'action'
 },
 {
 id:'contact-topical-corticosteroid',
 title:'Topical Corticosteroid (TCS)',
 description:'Potent-very potent untuk acute severe. Betamethasone dipropionate 0.05% atau Clobetasol 0.05% BID x 2 minggu. Taper to low potency',
 required: true,
 category:'medication'
 },
 {
 id:'contact-systemic-steroid-severe',
 title:'Systemic Corticosteroid (jika Severe/Widespread)',
 description:'Prednisone 40-60mg PO OD x 5-7 hari, taper over 2-3 minggu. Jangan stop abrupt (risk rebound)',
 required: false,
 category:'medication'
 },
 {
 id:'contact-barrier-protection',
 title:'Barrier Protection (Occupational CD)',
 description:'Gloves (nitrile jika latex allergy), protective clothing. Barrier cream sebelum work. Hand hygiene gentle soap',
 required: true,
 category:'action'
 },
 {
 id:'contact-emollient',
 title:'Emollient untuk Restore Barrier',
 description:'Frequent application, especially post-hand washing. Fragrance-free, hypoallergenic',
 required: true,
 category:'medication'
 },
 {
 id:'contact-follow-up',
 title:'Follow-up & Re-challenge Avoidance',
 description:'Educate suspected allergen. Check product labels. Consider hypoallergenic alternatives',
 required: true,
 category:'documentation'
 }
 ]
 },

'seborrheic-dermatitis-management': {
 id:'seborrheic-dermatitis-management',
 type:'checklist',
 title:'Seborrheic Dermatitis Management',
 description:'Malassezia-related inflammatory condition (AAD 2023)',
 items: [
 {
 id:'seb-derm-scalp-shampoo',
 title:'Medicated Shampoo untuk Scalp (First-line)',
 description:'Ketoconazole 2% shampoo 2x/minggu ATAU Selenium sulfide 2.5% ATAU Zinc pyrithione 1%. Lather 5-10 min before rinse',
 required: true,
 category:'medication'
 },
 {
 id:'seb-derm-face-antifungal',
 title:'Topical Antifungal untuk Face/Body',
 description:'Ketoconazole 2% cream BID x 4 minggu. Alternatif: Ciclopirox 1% cream. Target Malassezia overgrowth',
 required: true,
 category:'medication'
 },
 {
 id:'seb-derm-low-potency-steroid',
 title:'Low-potency TCS untuk Inflammation',
 description:'Hydrocortisone 1% cream BID pada area inflamed. JANGAN long-term pada wajah (risk atrophy, telangiectasia). Max 2 minggu',
 required: true,
 category:'medication'
 },
 {
 id:'seb-derm-calcineurin-inhibitor',
 title:'Topical Calcineurin Inhibitor (Steroid-sparing untuk Face)',
 description:'Tacrolimus 0.1% atau Pimecrolimus 1% BID. Maintenance therapy untuk prevent relapse',
 required: false,
 category:'medication'
 },
 {
 id:'seb-derm-gentle-cleansing',
 title:'Gentle Skin Care Routine',
 description:'Avoid harsh soap, hot water. Fragrance-free cleanser. Pat dry. Moisturizer non-comedogenic',
 required: true,
 category:'action'
 },
 {
 id:'seb-derm-trigger-avoidance',
 title:'Trigger Management',
 description:'Stress reduction, adequate sleep. Cold weather worsening (humidifier). Avoid oily hair products',
 required: false,
 category:'action'
 },
 {
 id:'seb-derm-maintenance',
 title:'Maintenance Therapy (Relapsing Nature)',
 description:'Ketoconazole shampoo 1x/minggu long-term. Recurrence common → chronic disease education',
 required: true,
 category:'documentation'
 }
 ]
 }
 }
 },

 // FRAKTUR - Imported from /src/lib/pathways/fraktur.ts (PNPK 2019)
'fraktur': frakturPathway,

 // FRAKTUR (OLD INLINE) - Renamed to avoid conflict
'fraktur-legacy': {
 diseaseId:'fraktur-legacy',
 diseaseName:'Fraktur Legacy (Old)',
 startNodeId:'fracture-atls-assessment',
 nodes: {
'fracture-atls-assessment': {
 id:'fracture-atls-assessment',
 type:'checklist',
 title:'ATLS Primary Survey & Initial Fracture Assessment',
 description:'Trauma evaluation dengan ATLS approach - ABC before fracture management!',
 items: [
 {
 id:'fracture-airway-assessment',
 title:'A - Airway Assessment (C-spine Protection)',
 description:'Pastikan airway paten. SEMUA trauma → assume C-spine injury until proven otherwise. Manual in-line stabilization, rigid collar',
 required: true,
 category:'safety'
 },
 {
 id:'fracture-breathing-assessment',
 title:'B - Breathing & Ventilation',
 description:'RR, SpO2, auskultasi. Rule out tension pneumothorax, flail chest (rib fracture), hemothorax. High-flow O2 jika distress',
 required: true,
 category:'assessment'
 },
 {
 id:'fracture-circulation-hemorrhage',
 title:'C - Circulation & Hemorrhage Control',
 description:'BP, HR, capillary refill. STOP external bleeding dengan direct pressure/tourniquet. 2 IV lines large bore. Pelvic fracture → pelvic binder',
 required: true,
 category:'action'
 },
 {
 id:'fracture-disability-neuro',
 title:'D - Disability (Neurological Status)',
 description:'GCS, pupil reaction. Motor & sensory function semua ekstremitas. Spinal cord injury?',
 required: true,
 category:'assessment'
 },
 {
 id:'fracture-exposure',
 title:'E - Exposure & Environmental Control',
 description:'Buka semua pakaian untuk full body examination. Prevent hypothermia (warm blanket). Log roll untuk periksa punggung',
 required: true,
 category:'action'
 },
 {
 id:'fracture-mechanism-injury',
 title:'Mechanism of Injury (MOI)',
 description:'High energy (KLL, jatuh >3m) vs low energy. High energy → suspect multiple injuries, internal bleeding. Waktu kejadian?',
 required: true,
 category:'assessment'
 },
 {
 id:'fracture-limb-inspection',
 title:'Inspeksi Ekstremitas yang Cedera',
 description:'Deformitas (angulasi, rotasi, shortening), luka terbuka (SIZE, contamination), perdarahan aktif, bone exposure',
 required: true,
 category:'assessment'
 },
 {
 id:'fracture-neurovascular-exam',
 title:'Neurovascular Examination (CRITICAL!)',
 description:'Pulse distal (dorsalis pedis, posterior tibial, radial), capillary refill <2s, sensory (dermatomal), motor function. Document BEFORE & AFTER manipulation!',
 required: true,
 category:'safety'
 },
 {
 id:'fracture-pain-assessment',
 title:'Pain Assessment & Analgesia',
 description:'Pain score 0-10. Berikan analgesia ADEQUATE. Morphine 0.1mg/kg IV titrasi ATAU Ketamine 0.3mg/kg IV (jika hipotensi). Fracture pain is SEVERE!',
 required: true,
 category:'medication'
 },
 {
 id:'fracture-xray-two-views',
 title:'X-Ray 2 Projections (AP + Lateral) - Include Joint Above & Below',
 description:'MANDATORY before manipulation. Assess: fracture line, displacement, angulation, comminution, intra-articular involvement',
 required: true,
 category:'assessment'
 }
 ]
 },

'fracture-open-vs-closed-decision': {
 id:'fracture-open-vs-closed-decision',
 type:'decision',
 title:'Fraktur Terbuka vs Tertutup',
 description:'Klasifikasi berdasarkan hubungan fraktur dengan lingkungan luar (CRITICAL untuk infection risk!)',
 warningLevel:'critical',
 branches: [
 {
 id:'open-fracture-branch',
 title:'OPEN FRACTURE (Fraktur Terbuka)',
 description:'Ada luka terbuka dengan komunikasi ke fraktur → HIGH INFECTION RISK! Gustilo grading & urgent antibiotics',
 icon:'',
 color:'red',
 nextNodeId:'open-fracture-gustilo-classification',
 riskLevel:'high'
 },
 {
 id:'closed-fracture-branch',
 title:'CLOSED FRACTURE (Fraktur Tertutup)',
 description:'Kulit intact, no communication dengan luar → Monitor compartment syndrome + splinting',
 icon:'',
 color:'blue',
 nextNodeId:'closed-fracture-management',
 riskLevel:'medium'
 }
 ]
 },

'open-fracture-gustilo-classification': {
 id:'open-fracture-gustilo-classification',
 type:'decision',
 title:'Gustilo-Anderson Classification (Open Fracture)',
 description:'Klasifikasi berdasarkan ukuran luka, kontaminasi, dan kerusakan jaringan lunak (predicts infection & outcome)',
 warningLevel:'critical',
 branches: [
 {
 id:'gustilo-grade-1',
 title:'Grade I (Clean, <1cm wound)',
 description:'Luka <1cm, minimal contamination, simple fracture pattern → Lowest infection risk (0-2%)',
 icon:'1⃣',
 color:'green',
 nextNodeId:'open-fracture-grade-1-management',
 riskLevel:'low'
 },
 {
 id:'gustilo-grade-2',
 title:'Grade II (Wound >1cm, moderate soft tissue)',
 description:'Luka >1cm, moderate contamination, moderate comminution → Infection risk 2-10%',
 icon:'2⃣',
 color:'orange',
 nextNodeId:'open-fracture-grade-2-management',
 riskLevel:'medium'
 },
 {
 id:'gustilo-grade-3',
 title:'Grade III (Extensive soft tissue damage)',
 description:'High-energy trauma, extensive contamination, periosteal stripping → Infection risk 10-50%. Sub-classify: IIIa/IIIb/IIIc',
 icon:'3⃣',
 color:'red',
 nextNodeId:'open-fracture-grade-3-subclassification',
 riskLevel:'high'
 }
 ]
 },

'open-fracture-grade-1-management': {
 id:'open-fracture-grade-1-management',
 type:'checklist',
 title:'Grade I Open Fracture - Basic Management',
 description:'Clean small wound dengan minimal contamination (PPK Indonesia + BOAST)',
 items: [
 {
 id:'grade1-immediate-antibiotic',
 title:'Antibiotic STAT: Cefazolin 2g IV (within 3 hours injury)',
 description:'First-generation cephalosporin. TIMING is critical! <3h → ↓infection 60%. Continue 24h post-op (NO prolonged course needed per FLOW trial)',
 required: true,
 category:'medication'
 },
 {
 id:'grade1-tetanus-prophylaxis',
 title:'Tetanus Prophylaxis',
 description:'Jika imunisasi lengkap (<5y): Tetanus Toxoid (TT) 0.5mL IM. Jika tidak/unknown: TT + Tetanus Immunoglobulin (TIG) 250 IU IM (different site)',
 required: true,
 category:'medication'
 },
 {
 id:'grade1-wound-photo-sterile-dressing',
 title:'Photo Dokumentasi + Sterile Dressing',
 description:'FOTO luka (size, contamination). Tutup dengan sterile saline-soaked gauze. JANGAN repeatedly remove dressing (↑contamination)',
 required: true,
 category:'action'
 },
 {
 id:'grade1-gentle-irrigation',
 title:'Gentle Wound Irrigation (NaCl 0.9%)',
 description:'Low-pressure irrigation 1-2L NaCl. Remove gross contamination. JANGAN high-pressure (drives bacteria deeper). Definitive debridement di OR',
 required: true,
 category:'action'
 },
 {
 id:'grade1-splinting-immobilization',
 title:'Splinting & Immobilization',
 description:'Above-below joint splinting. Maintain alignment. Relieve pressure on skin. Re-check neurovascular status POST-splinting',
 required: true,
 category:'action'
 },
 {
 id:'grade1-pain-management',
 title:'Adequate Analgesia',
 description:'IV opioid titrasi. Nerve block jika available (femoral block untuk femur fx). Pain control improve outcome',
 required: true,
 category:'medication'
 },
 {
 id:'grade1-referral-ortho',
 title:'URGENT Referral Orthopedic Surgeon (Debridement <24h)',
 description:'All open fractures need OR debridement."6-hour rule" controversial (latest evidence: <24h acceptable jika proper antibiotics). Stabilkan dulu, rujuk ASAP',
 required: true,
 category:'action'
 }
 ]
 },

'open-fracture-grade-2-management': {
 id:'open-fracture-grade-2-management',
 type:'checklist',
 title:'Grade II Open Fracture - Extended Management',
 description:'Larger wound dengan moderate soft tissue damage',
 items: [
 {
 id:'grade2-antibiotic-cefazolin',
 title:'Antibiotic: Cefazolin 2g IV q8h',
 description:'Continue 24h post-definitive fixation. BOAST guideline: single agent (cephalosporin) sufficient untuk grade I-II',
 required: true,
 category:'medication'
 },
 {
 id:'grade2-tetanus',
 title:'Tetanus Prophylaxis (TT + TIG)',
 description:'Sama seperti grade I. Semua open fracture butuh tetanus protection',
 required: true,
 category:'medication'
 },
 {
 id:'grade2-wound-assessment',
 title:'Wound Assessment: Size, Contamination, Tissue Viability',
 description:'Ukur wound length & width. Assess contamination (soil, grass, foreign body). Muscle viability: 4C (Color, Consistency, Contractility, Circulation)',
 required: true,
 category:'assessment'
 },
 {
 id:'grade2-copious-irrigation',
 title:'Copious Irrigation (3-6L NaCl)',
 description:'Volume matters! 3-6L untuk grade II. Remove particulate contamination. Povidone-iodine atau chlorhexidine NO BENEFIT per FLOW trial',
 required: true,
 category:'action'
 },
 {
 id:'grade2-avoid-bone-reduction',
 title:'AVOID Pushing Protruding Bone Back (Increase Contamination!)',
 description:'Jika tulang mencuat keluar → JANGAN paksa masukkan kembali (push bacteria deep). Splint as is. Reduction di OR dengan proper debridement',
 required: true,
 category:'safety'
 },
 {
 id:'grade2-compartment-syndrome-watch',
 title:'Monitor Compartment Syndrome (6 P\'s)',
 description:'Pain (out of proportion, with passive stretch), Pressure (tense compartment), Paresthesia, Pallor, Pulselessness, Paralysis. Late signs = BAD!',
 required: true,
 category:'safety'
 },
 {
 id:'grade2-splinting',
 title:'Temporary Splinting/External Fixation',
 description:'Grade II mungkin butuh external fixator untuk stabilisasi temporary sebelum definitive OR',
 required: true,
 category:'action'
 },
 {
 id:'grade2-referral-urgent',
 title:'URGENT Ortho Referral (Debridement & Fixation)',
 description:'Grade II → debridement + stabilization + delayed primary closure atau VAC dressing',
 required: true,
 category:'action'
 }
 ]
 },

'open-fracture-grade-3-subclassification': {
 id:'open-fracture-grade-3-subclassification',
 type:'decision',
 title:'Grade III Sub-classification',
 description:'Extensive soft tissue damage - determine severity & vascular status',
 warningLevel:'critical',
 branches: [
 {
 id:'grade-3a',
 title:'Grade IIIa (Adequate Soft Tissue Coverage)',
 description:'High-energy, extensively comminuted TAPI soft tissue coverage adequate untuk tulang',
 icon:'A',
 color:'orange',
 nextNodeId:'open-fracture-grade-3a-management',
 riskLevel:'high'
 },
 {
 id:'grade-3b',
 title:'Grade IIIb (Periosteal Stripping, Need Flap)',
 description:'Massive soft tissue loss, bone exposed, periosteum stripped → NEED free flap/rotational flap',
 icon:'B',
 color:'red',
 nextNodeId:'open-fracture-grade-3b-management',
 riskLevel:'high'
 },
 {
 id:'grade-3c',
 title:'Grade IIIc (VASCULAR INJURY Requiring Repair)',
 description:'Any grade dengan arterial injury → LIMB-THREATENING! Immediate vascular surgery consult',
 icon:'C',
 color:'red',
 nextNodeId:'open-fracture-grade-3c-vascular-emergency',
 riskLevel:'high'
 }
 ]
 },

'open-fracture-grade-3a-management': {
 id:'open-fracture-grade-3a-management',
 type:'checklist',
 title:'Grade IIIa Management',
 description:'High-energy fracture dengan adequate soft tissue coverage',
 items: [
 {
 id:'grade3a-broad-spectrum-abx',
 title:'Broad-Spectrum Antibiotics: Cefazolin 2g IV + Gentamicin 5mg/kg IV',
 description:'Grade III → ADD aminoglycoside untuk gram-negative coverage. Continue 24-72h post-debridement',
 required: true,
 category:'medication'
 },
 {
 id:'grade3a-tetanus',
 title:'Tetanus Prophylaxis',
 description:'TT + TIG (jika belum terimunisasi lengkap)',
 required: true,
 category:'medication'
 },
 {
 id:'grade3a-copious-irrigation-6-9l',
 title:'Copious Irrigation (6-9L NaCl)',
 description:'High-volume irrigation untuk grade III. Mechanical lavage remove bacteria',
 required: true,
 category:'action'
 },
 {
 id:'grade3a-debridement-plan',
 title:'Plan Serial Debridement ("Second Look" 24-48h)',
 description:'Grade III often need multiple debridements. Reassess wound, remove non-viable tissue."When in doubt, cut it out"',
 required: true,
 category:'documentation'
 },
 {
 id:'grade3a-external-fixation',
 title:'External Fixation untuk Temporary Stabilization',
 description:'Grade III → ex-fix first, delayed definitive fixation setelah soft tissue heal',
 required: false,
 category:'action'
 },
 {
 id:'grade3a-referral-multidisciplinary',
 title:'Multidisciplinary Referral: Ortho + Plastic Surgery',
 description:'Grade III butuh team approach. Plastic surgery untuk soft tissue reconstruction',
 required: true,
 category:'action'
 }
 ]
 },

'open-fracture-grade-3b-management': {
 id:'open-fracture-grade-3b-management',
 type:'checklist',
 title:'Grade IIIb Management - Massive Soft Tissue Loss',
 description:'Periosteal stripping, exposed bone, need flap coverage',
 items: [
 {
 id:'grade3b-abx-triple',
 title:'Triple Antibiotics: Cefazolin + Gentamicin + Metronidazole (jika farm contamination)',
 description:'Add anaerobic coverage (Metronidazole 500mg IV q8h) jika farm injury, soil contamination',
 required: true,
 category:'medication'
 },
 {
 id:'grade3b-irrigation-9l',
 title:'High-Volume Irrigation (≥9L)',
 description:'Massive contamination → massive irrigation',
 required: true,
 category:'action'
 },
 {
 id:'grade3b-aggressive-debridement',
 title:'Aggressive Debridement (Remove ALL Non-viable Tissue)',
 description:'4C assessment muscle viability. Resect non-viable muscle completely. Bone fragments tanpa soft tissue attachment → remove',
 required: true,
 category:'documentation'
 },
 {
 id:'grade3b-negative-pressure-wound',
 title:'Negative Pressure Wound Therapy (VAC)',
 description:'VAC dressing promote granulation, prepare wound bed untuk flap. Change q2-3 hari',
 required: false,
 category:'action'
 },
 {
 id:'grade3b-flap-coverage-timing',
 title:'Plan Flap Coverage (within 7 days = ↓infection)',
 description:'Early flap coverage (<7 days) → better outcome. Delay → ↑infection, osteomyelitis. Plastic surgery URGENT consult',
 required: true,
 category:'documentation'
 },
 {
 id:'grade3b-referral-tertiary',
 title:'Referral Tertiary Center (Ortho Trauma + Microsurgery)',
 description:'Grade IIIb need free flap (latissimus, gracilis) → microsurgery center',
 required: true,
 category:'action'
 }
 ]
 },

'open-fracture-grade-3c-vascular-emergency': {
 id:'open-fracture-grade-3c-vascular-emergency',
 type:'checklist',
 title:'Grade IIIc - VASCULAR EMERGENCY!',
 description:'Arterial injury dengan limb ischemia - time to revascularization <6 hours!',
 items: [
 {
 id:'grade3c-ischemia-time',
 title:'Document Ischemia Time (WARM vs COLD ischemia)',
 description:'Warm ischemia >6h → ↑amputation, rhabdomyolysis, compartment syndrome. COLD limb worse prognosis',
 required: true,
 category:'assessment'
 },
 {
 id:'grade3c-vascular-exam',
 title:'Vascular Examination: Hard Signs vs Soft Signs',
 description:'HARD SIGNS (need immediate OR): absent pulse, expanding hematoma, pulsatile bleeding, bruit/thrill. SOFT SIGNS: diminished pulse, small hematoma',
 required: true,
 category:'assessment'
 },
 {
 id:'grade3c-ankle-brachial-index',
 title:'Ankle-Brachial Index (ABI) jika Soft Signs',
 description:'ABI <0.9 → likely arterial injury, need CT angio. ABI >0.9 → unlikely significant injury',
 required: false,
 category:'assessment'
 },
 {
 id:'grade3c-mess-score',
 title:'MESS Score (Mangled Extremity Severity Score)',
 description:'Score ≥7 → predictive amputation. Consider: skeletal/soft tissue injury, limb ischemia, shock, age. Counsel patient/family re: amputation risk',
 required: true,
 category:'assessment'
 },
 {
 id:'grade3c-abx-resuscitation',
 title:'Antibiotics + Aggressive Resuscitation',
 description:'Cefazolin + Gentamicin. Fluid resuscitation (avoid hypothermia, acidosis, coagulopathy). Transfuse jika Hb <7',
 required: true,
 category:'medication'
 },
 {
 id:'grade3c-temporary-shunt',
 title:'Temporary Vascular Shunt (jika Delayed Vascular Surgeon)',
 description:'Shunt artery untuk maintain perfusion while await definitive repair. Prevent prolonged ischemia',
 required: false,
 category:'action'
 },
 {
 id:'grade3c-fasciotomy-prophylactic',
 title:'Prophylactic Fasciotomy (MANDATORY post-revascularization)',
 description:'Revascularization after prolonged ischemia → reperfusion edema → compartment syndrome. Fasciotomy BEFORE closure',
 required: true,
 category:'safety'
 },
 {
 id:'grade3c-immediate-or',
 title:'IMMEDIATE OR:"Life Before Limb" (stabilize fracture THEN vascular repair)',
 description:'Sequence: temporary stabilization (ex-fix) → vascular repair → fasciotomy. Vascular surgery + Orthopedic trauma collaboration',
 required: true,
 category:'action'
 }
 ]
 },

'closed-fracture-management': {
 id:'closed-fracture-management',
 type:'checklist',
 title:'Closed Fracture Initial Management',
 description:'Comprehensive assessment & initial stabilization untuk fraktur tertutup (PPK + WHO + NICE 2024)',
 items: [
 {
 id:'closed-fracture-classification',
 title:'Fracture Classification (AO/OTA System)',
 description:'Simple vs comminuted. Extra-articular vs intra-articular. Displacement: <50% contact OK for many fractures. Angulation tolerance varies by location',
 required: true,
 category:'assessment'
 },
 {
 id:'closed-neurovascular-exam',
 title:'Neurovascular Examination (MANDATORY Before & After Reduction)',
 description:'Pulse (palpation + Doppler), capillary refill <2s, two-point discrimination, motor function (grade 0-5). Nerve injury 10% closed fracture. DOCUMENT clearly!',
 required: true,
 category:'assessment'
 },
 {
 id:'closed-skin-assessment',
 title:'Assess Skin Integrity & Soft Tissue Injury',
 description:'Tented skin (risk necrosis), blisters (friction vs blood-filled), abrasions, swelling severity. Severe swelling delay definitive treatment',
 required: true,
 category:'assessment'
 },
 {
 id:'closed-multimodal-analgesia',
 title:'Multimodal Analgesia (WHO Pain Ladder)',
 description:'Step 1: Paracetamol 1g IV q6h + NSAID (Ketorolac 30mg IV). Step 2: ADD opioid (Morphine 0.1mg/kg IV titrasi). Step 3: Regional block (femoral, brachial). Fracture hematoma block untuk reduction',
 required: true,
 category:'medication'
 },
 {
 id:'closed-xray-standard-views',
 title:'X-Ray Standard: 2 Views (AP + Lateral) + Joint Above & Below',
 description:'NEVER manipulate before X-ray (except life-threatening). Rule:"two views of two joints". Assess: fracture pattern, displacement, angulation, rotation, comminution',
 required: true,
 category:'assessment'
 },
 {
 id:'closed-reduction-technique',
 title:'Closed Reduction Technique (jika Indicated)',
 description:'Adequate analgesia/sedation. Traction-counter-traction. Reverse mechanism of injury. Assess stability post-reduction. Accept some angulation/displacement based on location & age',
 required: false,
 category:'action'
 },
 {
 id:'closed-splinting-immobilization',
 title:'Splinting & Immobilization (Above-Below Joint)',
 description:'Splint types: Long-leg posterior slab (femur/tibia), Sugar-tong (forearm), Thumb spica (scaphoid). AVOID circumferential cast acutely (compartment syndrome risk). Padding over bony prominences',
 required: true,
 category:'action'
 },
 {
 id:'closed-post-intervention-xray',
 title:'Post-Reduction/Splinting X-Ray',
 description:'Confirm acceptable alignment maintained in splint. Loss of reduction common in first week → follow-up X-ray needed',
 required: true,
 category:'assessment'
 },
 {
 id:'closed-post-splint-neurovascular',
 title:'Re-check Neurovascular Status POST-Splinting',
 description:'Manipulation & splinting can cause/worsen neurovascular compromise. Document any changes. Loosen splint jika pulse lost',
 required: true,
 category:'safety'
 },
 {
 id:'closed-compartment-syndrome-monitoring',
 title:'Compartment Syndrome Monitoring (High-Risk: Tibia, Forearm, Supracondylar)',
 description:'EARLY sign: Pain out-of-proportion to injury, worse with passive stretch. LATE signs (5 P\'s): Paresthesia, Pallor, Pulselessness, Paralysis, Poikilothermia. DO NOT WAIT FOR LATE SIGNS!',
 required: true,
 category:'safety'
 },
 {
 id:'closed-compartment-pressure-criteria',
 title:'Compartment Pressure Measurement (Stryker device)',
 description:'Indications: Clinical suspicion, unreliable exam (unconscious, intoxicated). Absolute pressure >30mmHg OR Delta pressure <30mmHg (Diastolic BP - Compartment pressure) → URGENT fasciotomy',
 required: false,
 category:'assessment'
 },
 {
 id:'closed-rice-protocol',
 title:'RICE Protocol: Rest, Ice, Compression (gentle), Elevation',
 description:'Ice 20 min on/20 min off x 48-72h (↓swelling, pain). Elevate ABOVE heart (pillow under calf, NOT under knee). Gentle compression (elastic bandage, NOT tight). Early mobilization non-injured joints',
 required: true,
 category:'action'
 },
 {
 id:'closed-vte-risk-assessment',
 title:'VTE Risk Assessment & Prophylaxis',
 description:'Risk factors: lower limb fracture, immobility >3 days, age >60, obesity, previous VTE. Prophylaxis: Enoxaparin 40mg SC OD (start when hemostasis secure) OR mechanical (IPC, TED stockings). Duration: until mobile',
 required: true,
 category:'medication'
 },
 {
 id:'closed-tetanus-status',
 title:'Tetanus Immunization Status',
 description:'Meskipun closed fracture, check tetanus status. Jika luka abrasi/laserasi kecil: TT booster jika >5 tahun sejak dosis terakhir',
 required: false,
 category:'medication'
 }
 ]
 },

'closed-fracture-urgency-decision': {
 id:'closed-fracture-urgency-decision',
 type:'decision',
 title:'Closed Fracture - Urgency Stratification untuk Rujukan',
 description:'Menentukan timing optimal rujukan berdasarkan displacement, location, dan neurovascular status',
 warningLevel:'warning',
 branches: [
 {
 id:'urgent-closed-fracture',
 title:'URGENT (Same Day Referral)',
 description:'Displaced intra-articular, neurovascular compromise, tented skin, unstable fracture, compartment syndrome risk tinggi',
 icon:'',
 color:'red',
 nextNodeId:'urgent-closed-fracture-referral',
 riskLevel:'high'
 },
 {
 id:'semi-urgent-closed-fracture',
 title:'SEMI-URGENT (Within 1 Week)',
 description:'Displaced extra-articular shaft fracture, stable setelah reduction, moderate soft tissue injury',
 icon:'',
 color:'orange',
 nextNodeId:'semi-urgent-closed-fracture-management',
 riskLevel:'medium'
 },
 {
 id:'elective-closed-fracture',
 title:'ELECTIVE (2-4 Weeks)',
 description:'Non-displaced/minimally displaced, stable fracture pattern, conservative management possible',
 icon:'',
 color:'green',
 nextNodeId:'elective-closed-fracture-conservative',
 riskLevel:'low'
 }
 ]
 },

'urgent-closed-fracture-referral': {
 id:'urgent-closed-fracture-referral',
 type:'checklist',
 title:'Urgent Closed Fracture - Immediate Referral Protocol',
 description:'High-risk fractures requiring same-day orthopedic evaluation',
 items: [
 {
 id:'urgent-phone-consult',
 title:'Phone Consultation dengan Orthopedic Surgeon STAT',
 description:'Explain: fracture type, displacement, neurovascular status, soft tissue condition, reduction attempted?. Arrange immediate transfer',
 required: true,
 category:'action'
 },
 {
 id:'urgent-splint-position',
 title:'Optimal Splinting Position (Maintain Reduction)',
 description:'Position of function: Ankle 90°, knee slight flex, elbow 90°, wrist neutral. Adequate padding. Mold splint to maintain reduction',
 required: true,
 category:'action'
 },
 {
 id:'urgent-npo-status',
 title:'NPO (Nil Per Os) - Persiapan Anestesi',
 description:'High likelihood need surgery/sedation untuk reduction. NPO 6 jam (solid), 2 jam (clear fluid). IV access maintained',
 required: true,
 category:'action'
 },
 {
 id:'urgent-serial-neuro-checks',
 title:'Serial Neurovascular Checks (q1h)',
 description:'Document pulse, sensation, motor q1 jam. Immediate OR jika deterioration. Loosen splint jika pulse lost',
 required: true,
 category:'safety'
 },
 {
 id:'urgent-imaging-cd',
 title:'Provide Imaging CD/USB untuk Referral Hospital',
 description:'Bawa X-ray films atau CD. Avoid repeat radiation jika images adequate',
 required: true,
 category:'documentation'
 },
 {
 id:'urgent-transfer-handover',
 title:'Proper Handover: SBAR (Situation, Background, Assessment, Recommendation)',
 description:'Written handover: patient details, injury mechanism, fracture classification, neurovascular status, interventions done, timing',
 required: true,
 category:'documentation'
 }
 ]
 },

'semi-urgent-closed-fracture-management': {
 id:'semi-urgent-closed-fracture-management',
 type:'checklist',
 title:'Semi-Urgent Closed Fracture - Outpatient Follow-up',
 description:'Stable fractures dengan rujukan ortho dalam 1 minggu',
 items: [
 {
 id:'semi-urgent-splint-instructions',
 title:'Splint Care Instructions',
 description:'Keep dry (plastic bag saat mandi). Elevate 48-72h. Wiggle fingers/toes hourly. JANGAN remove splint sendiri',
 required: true,
 category:'documentation'
 },
 {
 id:'semi-urgent-oral-analgesia',
 title:'Oral Analgesia Prescription (Multimodal)',
 description:'Paracetamol 1g PO q6h (standing dose) + Ibuprofen 400mg PO q8h (with food). Tramadol 50mg PO q6h PRN (severe pain). Avoid long-term opioid',
 required: true,
 category:'medication'
 },
 {
 id:'semi-urgent-swelling-management',
 title:'Swelling Management Protocol',
 description:'Elevate above heart as much as possible. Ice 20 min q2-3h x 48h. Active ROM non-injured joints (prevent stiffness). Expect peak swelling day 2-3',
 required: true,
 category:'action'
 },
 {
 id:'semi-urgent-red-flags-education',
 title:'RED FLAGS Education (Return Immediately)',
 description:'SEGERA kembali jika: (1) Increasing pain despite meds, (2) Numbness/tingling, (3) Fingers/toes cold/blue/pale, (4) Unable to move fingers/toes, (5) Cast feels too tight, (6) Foul smell',
 required: true,
 category:'safety'
 },
 {
 id:'semi-urgent-follow-up-schedule',
 title:'Schedule Orthopedic Follow-up (within 1 week)',
 description:'First follow-up 5-7 hari: repeat X-ray (check alignment), assess soft tissue healing, plan definitive treatment (casting, surgery)',
 required: true,
 category:'documentation'
 },
 {
 id:'semi-urgent-work-sick-note',
 title:'Work/School Sick Leave (estimated based on fracture)',
 description:'Upper limb non-dominant: 2-4 minggu. Dominant hand: 4-8 minggu. Lower limb: 6-12 minggu (non-weight bearing period). Adjust based on occupation',
 required: false,
 category:'documentation'
 },
 {
 id:'semi-urgent-dvt-prophylaxis-counsel',
 title:'DVT Prevention Counseling',
 description:'Ankle pumps (dorsi/plantarflexion) 10x setiap jam saat bangun. Adequate hydration. Mobilize early as pain allows (with crutches jika lower limb)',
 required: false,
 category:'action'
 }
 ]
 },

'elective-closed-fracture-conservative': {
 id:'elective-closed-fracture-conservative',
 type:'checklist',
 title:'Elective Closed Fracture - Conservative Management',
 description:'Stable non-displaced fractures suitable untuk non-operative treatment',
 items: [
 {
 id:'elective-fracture-examples',
 title:'Common Elective Conservative Fractures',
 description:'Non-displaced: radial head, clavicle (midshaft <100% displacement), 5th metacarpal neck (acceptable angulation <40°), stable ankle (isolated lateral malleolus), torus/buckle fracture (anak)',
 required: true,
 category:'assessment'
 },
 {
 id:'elective-immobilization-duration',
 title:'Immobilization Duration (Evidence-Based)',
 description:'Torus fracture: 3 minggu removable splint. Clavicle: sling 2-4 minggu. Metacarpal: buddy taping 3-4 minggu. Ankle: walking boot 4-6 minggu. Serial X-ray week 1, 2, 6',
 required: true,
 category:'action'
 },
 {
 id:'elective-functional-bracing',
 title:'Functional Bracing Concept',
 description:'Early protected mobilization better than rigid immobilization untuk many fractures. Maintain ROM adjacent joints. Prevent muscle atrophy',
 required: false,
 category:'action'
 },
 {
 id:'elective-bone-healing-nutrition',
 title:'Optimize Bone Healing (Nutrition & Lifestyle)',
 description:'Calcium 1000-1200mg/hari (dairy, green leafy veg). Vitamin D 800-1000 IU (sunlight, supplement). Protein adequate (1.2-1.5g/kg). AVOID smoking (delay union 2-3x)',
 required: false,
 category:'action'
 },
 {
 id:'elective-progressive-loading',
 title:'Progressive Weight-Bearing Protocol',
 description:'Non-weight bearing → Partial (touch toe) → Weight-bearing as tolerated. Guided by pain. Crutches training. Progression based on X-ray callus formation',
 required: false,
 category:'action'
 },
 {
 id:'elective-physiotherapy-referral',
 title:'Physiotherapy Referral (prevent stiffness)',
 description:'Start after initial healing (3-6 minggu). ROM exercises, strengthening, proprioception. Especially important for intra-articular fractures',
 required: false,
 category:'action'
 },
 {
 id:'elective-ortho-follow-up',
 title:'Orthopedic Clinic Follow-up (2-4 minggu)',
 description:'Non-urgent appointment. Repeat X-ray assess healing. Convert splint to cast jika needed. Monitor for delayed/non-union (rare in conservative management)',
 required: true,
 category:'documentation'
 },
 {
 id:'elective-return-to-activity',
 title:'Return to Sport/Heavy Work Guidelines',
 description:'Radiographic union (bridging callus 3+ cortices) + clinical union (no pain with stress). Upper limb: 6-8 minggu. Lower limb: 10-12 minggu. Contact sports: +4 minggu',
 required: false,
 category:'documentation'
 }
 ]
 }
 }
 },

 // POLYMYALGIA RHEUMATICA (PMR) - PPK Indonesia + ACR/EULAR 2012 + BSR/BHPR 2020 + EULAR 2015
'polymyalgia-rheumatica': {
 diseaseId:'polymyalgia-rheumatica',
 diseaseName:'Polymyalgia Rheumatica (PMR)',
 startNodeId:'pmr-initial-assessment',
 nodes: {
'pmr-initial-assessment': {
 id:'pmr-initial-assessment',
 type:'checklist',
 title:'PMR Initial Clinical Assessment',
 description:'Comprehensive evaluation untuk diagnosis Polymyalgia Rheumatica (Elderly-onset inflammatory disorder)',
 items: [
 {
 id:'pmr-age-criterion',
 title:'Age ≥50 Years (MANDATORY Criterion)',
 description:'PMR is rare before age 50. Peak incidence 70-80 years. Consider alternative diagnosis jika <50 tahun (RA, malignancy, infection)',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-symptom-duration',
 title:'Symptom Duration ≥2 Weeks (typically ≥1 month)',
 description:'Acute/subacute onset. 50% pasien dapat ingat tanggal exact onset. Gejala bilateral dalam beberapa minggu',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-bilateral-shoulder-pain',
 title:'Bilateral Shoulder Pain & Stiffness',
 description:'Onset paling sering di bahu (70%). Nyeri proksimal (deltoid area). Kesulitan menyisir rambut, memakai baju. Nyeri nokturnal common',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-pelvic-girdle-pain',
 title:'Bilateral Pelvic Girdle Pain (Hip/Thigh)',
 description:'Nyeri proksimal paha. Kesulitan bangkit dari kursi, naik tangga, keluar mobil. 50-70% memiliki shoulder + hip involvement',
 required: false,
 category:'assessment'
 },
 {
 id:'pmr-morning-stiffness',
 title:'Morning Stiffness >45 minutes (CLASSIC!)',
 description:'Duration >1 jam very suggestive PMR. Stiffness after rest ("gel phenomenon"). Improve dengan activity. BUKAN weakness (kekuatan otot normal)',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-constitutional-symptoms',
 title:'Constitutional Symptoms (50% cases)',
 description:'Low-grade fever (<38°C), fatigue (profound!), malaise, anorexia, weight loss (5-10%). Depression common. Tapi HIGH fever/night sweats → think infection/malignancy',
 required: false,
 category:'assessment'
 },
 {
 id:'pmr-physical-exam',
 title:'Physical Examination: Limited ROM, Normal Strength',
 description:'Active ROM ↓↓ (pain-limited). Passive ROM preserved. Kekuatan otot 5/5 (BUKAN myopathy). No muscle atrophy. Tenderness shoulder/hip girdle',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-peripheral-findings',
 title:'Peripheral Manifestations (30-40%)',
 description:'Distal extremity swelling dengan pitting edema ("RS3PE syndrome"). Carpal tunnel syndrome. Knee effusion (transient synovitis)',
 required: false,
 category:'assessment'
 },
 {
 id:'pmr-esr-crp',
 title:'Inflammatory Markers: ESR ≥40 mm/h AND/OR CRP Elevated',
 description:'ESR usually 50-100 mm/h (>40 in 95% cases). CRP elevated. Normal ESR/CRP very unusual (7-20% cases) → re-evaluate diagnosis',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-baseline-labs',
 title:'Baseline Laboratory: CBC, LFT, Creatinine, Glucose, TSH',
 description:'CBC: mild anemia of chronic disease. Rule out: hypothyroidism (TSH), infection, malignancy. Baseline untuk monitor steroid complications',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-rheumatoid-factor',
 title:'Rheumatoid Factor (RF) & Anti-CCP (Negative in PMR)',
 description:'PMR: RF negative, anti-CCP negative. Jika positive → think RA (elderly-onset RA can mimic PMR). Symmetrical small joint involvement favor RA',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-red-flag-screen',
 title:'RED FLAGS Screening (Exclude Mimics)',
 description:'Weight loss >10%, high fever, night sweats (malignancy?), weakness (myopathy?), asymmetric symptoms (arthritis?), small joint swelling (RA?), visual symptoms (GCA!)',
 required: true,
 category:'safety'
 }
 ]
 },

'pmr-acr-eular-scoring': {
 id:'pmr-acr-eular-scoring',
 type:'checklist',
 title:'ACR/EULAR 2012 Classification Criteria Scoring',
 description:'Scoring system untuk PMR diagnosis (Score ≥4 = PMR likely, without ultrasound)',
 items: [
 {
 id:'pmr-score-morning-stiffness',
 title:'Morning Stiffness Duration >45 minutes = +2 points',
 description:'Classic PMR feature. Stiffness improve dengan activity',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-score-hip-involvement',
 title:'Hip Pain/Limited ROM = +1 point',
 description:'Pelvic girdle involvement. Difficulty rising from chair',
 required: false,
 category:'assessment'
 },
 {
 id:'pmr-score-rf-negative',
 title:'Negative RF & Anti-CCP = +2 points',
 description:'Absence of RA markers. PMR is seronegative',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-score-no-peripheral-joints',
 title:'Absence of Other Joint Involvement = +1 point',
 description:'No significant small joint synovitis (distinguish from RA)',
 required: false,
 category:'assessment'
 },
 {
 id:'pmr-calculate-score',
 title:'Calculate Total Score (Range 0-6 without ultrasound)',
 description:'Score ≥4 → PMR classification met (Sensitivity 68%, Specificity 78%). Score <4 → consider alternative diagnosis. Ultrasound can add points (shoulder bursitis +1, hip synovitis +1)',
 required: true,
 category:'assessment'
 }
 ]
 },

'pmr-diagnosis-decision': {
 id:'pmr-diagnosis-decision',
 type:'decision',
 title:'PMR Diagnosis & Giant Cell Arteritis (GCA) Risk Assessment',
 description:'Berdasarkan ACR/EULAR score & clinical features - CRITICAL: Screen for GCA (15-20% overlap!)',
 warningLevel:'warning',
 branches: [
 {
 id:'pmr-with-gca-risk',
 title:'PMR dengan GCA Features (URGENT!)',
 description:'Headache, visual symptoms, jaw claudication, scalp tenderness → Risk blindness! Urgent high-dose steroid',
 icon:'',
 color:'red',
 nextNodeId:'pmr-gca-urgent-management',
 riskLevel:'high'
 },
 {
 id:'pmr-confirmed',
 title:'PMR without GCA (Score ≥4)',
 description:'Classic PMR features, elevated ESR/CRP, no GCA symptoms → Standard steroid treatment',
 icon:'',
 color:'green',
 nextNodeId:'pmr-standard-treatment',
 riskLevel:'low'
 },
 {
 id:'pmr-uncertain',
 title:'Uncertain Diagnosis (Score <4 OR Atypical)',
 description:'Low score, normal ESR/CRP, age <60, atypical features → Extensive workup untuk alternative diagnosis',
 icon:'',
 color:'orange',
 nextNodeId:'pmr-alternative-diagnosis-workup',
 riskLevel:'medium'
 }
 ]
 },

'pmr-gca-urgent-management': {
 id:'pmr-gca-urgent-management',
 type:'checklist',
 title:'PMR with Giant Cell Arteritis (GCA) - URGENT Protocol',
 description:'High-dose steroid untuk prevent blindness! Temporal artery biopsy within 1 week',
 items: [
 {
 id:'gca-visual-assessment',
 title:'URGENT Visual Assessment (Ophthalmology Consult)',
 description:'Visual acuity, visual fields, fundoscopy. GCA can cause sudden permanent blindness (anterior ischemic optic neuropathy). 15-20% with PMR have GCA',
 required: true,
 category:'safety'
 },
 {
 id:'gca-high-dose-steroid',
 title:'HIGH-DOSE Prednisolone 40-60mg PO Daily IMMEDIATELY',
 description:'START STAT (do NOT wait for biopsy). If visual loss: IV Methylprednisolone 1g daily x 3 days. Taper after symptoms controlled',
 required: true,
 category:'medication'
 },
 {
 id:'gca-temporal-artery-exam',
 title:'Temporal Artery Examination',
 description:'Palpate: tenderness, thickening, nodularity, absent pulsation. Scalp tenderness. Jaw claudication (pain with chewing)',
 required: true,
 category:'assessment'
 },
 {
 id:'gca-biopsy-arrange',
 title:'Arrange Temporal Artery Biopsy (within 1 week)',
 description:'Gold standard diagnosis. Biopsy still positive up to 2 weeks after steroid start. Skip lesions → need 2-3cm segment',
 required: true,
 category:'action'
 },
 {
 id:'gca-urgent-rheumatology',
 title:'URGENT Rheumatology Referral (same day)',
 description:'GCA needs specialist management. Consider temporal artery ultrasound/PET-CT jika available',
 required: true,
 category:'action'
 }
 ]
 },

'pmr-standard-treatment': {
 id:'pmr-standard-treatment',
 type:'checklist',
 title:'PMR Standard Treatment - Glucocorticoid Initiation',
 description:'Evidence-based steroid protocol (BSR/BHPR 2020 + EULAR 2015)',
 items: [
 {
 id:'pmr-pred-initial-dose',
 title:'Prednisolone 12.5-15mg PO Once Daily (Morning)',
 description:'Start 12.5-15mg (NOT >20mg per PPK). Take with food. Morning dose mimics natural cortisol rhythm. Dramatic response within 1-3 days confirms diagnosis',
 required: true,
 category:'medication'
 },
 {
 id:'pmr-response-assessment',
 title:'Assess Response at 1 Week (70% improvement expected)',
 description:'RAPID response (1-3 days) = diagnostic. ≥70% symptom improvement in 1 week. No response → re-evaluate diagnosis (not PMR, infection, malignancy)',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-gastroprotection',
 title:'Gastroprotection: PPI (Omeprazole 20mg OD)',
 description:'All patients on steroids >2 weeks. Prevent peptic ulcer. Omeprazole/Lansoprazole before breakfast',
 required: true,
 category:'medication'
 },
 {
 id:'pmr-bone-protection',
 title:'Bone Protection: Calcium 1000mg + Vitamin D 800 IU Daily',
 description:'MANDATORY untuk semua on steroids. Prevent glucocorticoid-induced osteoporosis. Consider bisphosphonate jika age >65, T-score <-1.5, prolonged therapy',
 required: true,
 category:'medication'
 },
 {
 id:'pmr-baseline-dexa',
 title:'Baseline DEXA Scan (jika available)',
 description:'Assess baseline bone density. Fracture risk assessment. Repeat yearly on steroids',
 required: false,
 category:'assessment'
 },
 {
 id:'pmr-diabetes-screening',
 title:'Monitor Blood Glucose (Steroids → Hyperglycemia)',
 description:'Check fasting glucose baseline & monthly. Steroid-induced diabetes common (20-30%). Adjust diet, may need metformin/insulin',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-steroid-education',
 title:'Steroid Side Effects Education',
 description:'Weight gain, mood changes, insomnia, skin fragility, bruising, hyperglycemia, hypertension, cataracts, osteoporosis. NEVER stop suddenly (adrenal suppression)',
 required: true,
 category:'documentation'
 },
 {
 id:'pmr-symptom-diary',
 title:'Patient Symptom Diary (Pain & Stiffness Score 0-10)',
 description:'Daily morning stiffness duration. Pain score. Guide tapering decisions. Relapse detection',
 required: false,
 category:'documentation'
 }
 ]
 },

'pmr-tapering-protocol': {
 id:'pmr-tapering-protocol',
 type:'checklist',
 title:'Steroid Tapering Protocol (BSR/BHPR 2020 Evidence-Based)',
 description:'Slow taper over 12-18 months to minimize relapse (50-60% relapse rate!)',
 items: [
 {
 id:'pmr-taper-week-4',
 title:'Week 4-6: Reduce to 10mg Daily (if symptoms controlled)',
 description:'First reduction setelah 4 minggu di dose awal. Check ESR/CRP. Jika symptoms recur → return to previous dose',
 required: true,
 category:'medication'
 },
 {
 id:'pmr-taper-month-3',
 title:'Month 3: Reduce to 7.5mg Daily',
 description:'Taper 1-2.5mg setiap 4-6 minggu. Monitor symptoms & ESR closely. Slower taper below 10mg (↑relapse risk)',
 required: true,
 category:'medication'
 },
 {
 id:'pmr-taper-month-6',
 title:'Month 6: Reduce to 5mg Daily',
 description:'Aim for 5mg by 6 months (50% achieve this). Below 5mg → very slow taper (0.5-1mg every 6-8 weeks)',
 required: true,
 category:'medication'
 },
 {
 id:'pmr-taper-year-1',
 title:'Month 12: Target 2-3mg OR Discontinue',
 description:'Minimum treatment duration 12 months (prevent relapse). Some need 18-24 months. Consider D/C jika asymptomatic + normal ESR x 3 months',
 required: true,
 category:'medication'
 },
 {
 id:'pmr-relapse-criteria',
 title:'Relapse Criteria (Return of Symptoms + ↑ESR)',
 description:'Shoulder/hip pain return, morning stiffness >45 min, ESR rise. Occurs in 50-60%. Management: increase pred to previous effective dose, then slower taper',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-taper-too-fast-warning',
 title:'WARNING: Do NOT Taper Too Fast (↑Relapse)',
 description:'Taper >1mg/month → high relapse. Below 5mg → taper 0.5-1mg every 6-8 weeks. Patient pressure to stop quickly → resist!',
 required: true,
 category:'safety'
 }
 ]
 },

'pmr-monitoring-followup': {
 id:'pmr-monitoring-followup',
 type:'checklist',
 title:'Long-term Monitoring & Follow-up',
 description:'Regular monitoring untuk disease activity & steroid complications',
 items: [
 {
 id:'pmr-followup-schedule',
 title:'Follow-up Schedule: Monthly x 6 months, then q3 months',
 description:'First 6 months: monthly (tapering phase). Then q3 months until off steroids. Annual thereafter (late relapse possible)',
 required: true,
 category:'documentation'
 },
 {
 id:'pmr-esr-monitoring',
 title:'ESR/CRP Monitoring at Each Visit',
 description:'Trend more important than absolute value. Rising ESR + symptoms → relapse. ESR normal but symptoms → may still be active (10-20%)',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-steroid-complications',
 title:'Monitor Steroid Complications',
 description:'BP (monthly), Weight, Fasting glucose (q3 months), DEXA (yearly), Ophthalmology (cataracts/glaucoma yearly), Mood/sleep',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-gca-vigilance',
 title:'Ongoing GCA Vigilance (can develop anytime)',
 description:'Ask about headache, visual symptoms, jaw claudication at EVERY visit. 20% develop GCA during PMR course (most within 1st year)',
 required: true,
 category:'safety'
 },
 {
 id:'pmr-exercise-physio',
 title:'Physiotherapy & Exercise Program',
 description:'Prevent muscle atrophy & deconditioning. Gentle ROM exercises. Weight-bearing for bone health. Balance training (fall prevention)',
 required: false,
 category:'action'
 },
 {
 id:'pmr-immunization',
 title:'Vaccinations: Influenza (yearly), Pneumococcal, Shingles',
 description:'Immunocompromised on steroids. Annual flu vaccine. Pneumovax. Shingles vaccine (Shingrix - NOT live) jika age >50',
 required: false,
 category:'medication'
 },
 {
 id:'pmr-infection-warning',
 title:'Infection Risk Education (Steroid-related)',
 description:'Higher infection risk. Seek medical attention for fever, persistent cough, dysuria. May need to increase steroid during severe illness ("sick day rules")',
 required: true,
 category:'safety'
 }
 ]
 },

'pmr-alternative-diagnosis-workup': {
 id:'pmr-alternative-diagnosis-workup',
 type:'checklist',
 title:'Alternative Diagnosis Workup (Atypical PMR Features)',
 description:'Extensive investigation jika low ACR/EULAR score atau atypical presentation',
 items: [
 {
 id:'pmr-alternative-ra',
 title:'Rheumatoid Arthritis (Elderly-Onset RA)',
 description:'Check RF, anti-CCP (if not done). Hand/wrist X-ray (erosions). Symmetrical small joint swelling. Can mimic PMR at onset',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-alternative-malignancy',
 title:'Paraneoplastic Syndrome (Malignancy Screening)',
 description:'PMR-like symptoms can be paraneoplastic. Age-appropriate cancer screening: CXR, mammogram, PSA, colonoscopy. Weight loss >10% red flag',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-alternative-infection',
 title:'Infection: Endocarditis, Osteomyelitis, TB',
 description:'Blood cultures (if fever). CXR. ESR >100 → think infection/malignancy. Travel history. TB screening',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-alternative-thyroid',
 title:'Hypothyroidism (TSH)',
 description:'Can cause myalgia, stiffness, elevated CK. Check TSH. Treat hypothyroidism → symptoms resolve',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-alternative-myopathy',
 title:'Inflammatory Myopathy (Polymyositis/Dermatomyositis)',
 description:'Check CK, aldolase (normal in PMR). EMG. Muscle biopsy jika weakness present. Skin rash (dermatomyositis)',
 required: false,
 category:'assessment'
 },
 {
 id:'pmr-alternative-osteoarthritis',
 title:'Bilateral Shoulder/Hip Osteoarthritis',
 description:'X-ray: joint space narrowing, osteophytes. ESR normal. NO morning stiffness >1h. Gradual onset (not acute)',
 required: false,
 category:'assessment'
 },
 {
 id:'pmr-alternative-fibromyalgia',
 title:'Fibromyalgia',
 description:'Widespread pain (not just shoulder/hip). Tender points. ESR normal. Younger age. No response to steroids',
 required: false,
 category:'assessment'
 },
 {
 id:'pmr-rheumatology-referral',
 title:'Rheumatology Referral (Uncertain Cases)',
 description:'Atypical features, age <60, normal ESR, poor steroid response, diagnostic uncertainty → specialist evaluation',
 required: true,
 category:'action'
 }
 ]
 },

'pmr-steroid-resistant': {
 id:'pmr-steroid-resistant',
 type:'checklist',
 title:'Steroid-Resistant or Relapsing PMR',
 description:'Management jika inadequate response atau frequent relapses',
 items: [
 {
 id:'pmr-resistant-reassess',
 title:'Reassess Diagnosis (Is it Really PMR?)',
 description:'Poor response to 15-20mg pred → unlikely PMR. Re-evaluate for RA, malignancy, infection, myopathy. Rheumatology consult',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-resistant-adherence',
 title:'Check Medication Adherence',
 description:'Confirm patient taking medication correctly. Morning dose? With food? Not missing doses?',
 required: true,
 category:'assessment'
 },
 {
 id:'pmr-resistant-increase-dose',
 title:'Increase Prednisolone (if confirmed PMR)',
 description:'Try 20-25mg daily. Reassess in 1 week. If still no response → NOT PMR',
 required: false,
 category:'medication'
 },
 {
 id:'pmr-relapsing-methotrexate',
 title:'Steroid-Sparing Agent: Methotrexate 7.5-15mg Weekly',
 description:'For relapsing PMR or unable to taper below 7.5mg. Allows lower steroid dose. Folic acid 5mg 24h post-MTX. Monitor LFT, CBC',
 required: false,
 category:'medication'
 },
 {
 id:'pmr-relapsing-tocilizumab',
 title:'Biologics: Tocilizumab (IL-6 inhibitor) - Specialist Only',
 description:'For refractory cases. GiACTA trial: effective in GCA. Limited data in PMR. Rheumatology-guided',
 required: false,
 category:'documentation'
 },
 {
 id:'pmr-resistant-specialist',
 title:'Mandatory Rheumatology Referral',
 description:'Steroid-resistant, relapsing, or complicated PMR needs specialist care',
 required: true,
 category:'action'
 }
 ]
 }
 }
 },

 // RHEUMATOID ARTHRITIS (RA) - ACR/EULAR 2010 + EULAR 2019 + ACR 2021 + Treat-to-Target Strategy
'rheumatoid-arthritis': {
 diseaseId:'rheumatoid-arthritis',
 diseaseName:'Rheumatoid Arthritis (RA)',
 startNodeId:'ra-initial-assessment',
 nodes: {
'ra-initial-assessment': {
 id:'ra-initial-assessment',
 type:'checklist',
 title:'RA Initial Clinical Assessment',
 description:'Comprehensive evaluation untuk diagnosis Rheumatoid Arthritis (Autoimmune inflammatory arthritis)',
 items: [
 {
 id:'ra-synovitis-pattern',
 title:'Synovitis Pattern: Symmetrical Polyarticular (≥3 joints)',
 description:'Classic: bilateral small joints (PIP, MCP, MTP, wrists). Spares DIP joints. Boggy swelling (vs bony hard OA). Tenderness, warmth. Early RA may be oligoarticular',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-morning-stiffness',
 title:'Morning Stiffness Duration >1 Hour (Classic!)',
 description:'Prolonged morning stiffness (>1h) very suggestive inflammatory arthritis (vs OA <30 min)."Gelling" after rest. Improves with activity. Duration correlates with disease activity',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-symptom-duration',
 title:'Symptom Duration ≥6 Weeks (Chronic Arthritis)',
 description:'Acute arthritis (<6 weeks): think viral, reactive. Chronic (≥6 weeks) = ACR/EULAR criterion. Early diagnosis critical (window of opportunity <3-6 months)',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-joint-examination',
 title:'Joint Examination: Swelling, Tenderness, Warmth (NOT Erythema)',
 description:'Palpate for synovial thickening (boggy). Squeeze test (MCP, MTP compression painful). Erythema rare in RA (think septic, gout, pseudogout). Document joint count (swollen/tender)',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-small-joints',
 title:'Small Joint Involvement (PIP, MCP, MTP, Wrists)',
 description:'PIP (proximal interphalangeal), MCP (metacarpophalangeal), MTP (metatarsophalangeal). MCP squeeze test. Wrist involvement very common (75%). DIP spared (distinguishes from OA/PsA)',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-large-joints',
 title:'Large Joint Involvement (Shoulders, Elbows, Knees, Ankles)',
 description:'Can involve any synovial joint. Knees common (effusion). Shoulders (↓ROM, painful arc). Hip involvement late (need X-ray). Cervical spine (C1-C2 instability risk)',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-constitutional-symptoms',
 title:'Constitutional Symptoms: Fatigue, Low-Grade Fever, Weight Loss',
 description:'Profound fatigue (90%). Low-grade fever (<38°C). Malaise. Anorexia. Weight loss. High fever → think infection, Adult Still disease',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-extra-articular-screen',
 title:'Extra-Articular Manifestations Screening',
 description:'Rheumatoid nodules (20-30%, extensor surfaces). Pulmonary (ILD, nodules, pleuritis). Cardiac (pericarditis). Ocular (scleritis, dry eyes - Sjögren overlap). Vasculitis (severe RA)',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-functional-impact',
 title:'Functional Assessment (HAQ Score - Health Assessment Questionnaire)',
 description:'Activities: dressing, arising, eating, walking, hygiene, reach, grip, activities. Score 0-3 (0=no difficulty, 3=unable). Baseline HAQ predicts disability & work loss',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-differential-diagnosis',
 title:'Exclude Mimics: Viral, Psoriatic, Crystalline, Reactive',
 description:'Viral arthritis (Parvo B19, HBV, HCV - transient). Psoriatic (DIP, asymmetric, nail/skin). Gout/pseudogout (acute monoarticular). Reactive (post-infection, asymmetric)',
 required: true,
 category:'assessment'
 }
 ]
 },

'ra-laboratory-workup': {
 id:'ra-laboratory-workup',
 type:'checklist',
 title:'RA Laboratory & Imaging Workup',
 description:'Comprehensive lab testing untuk diagnosis & prognosis assessment',
 items: [
 {
 id:'ra-rheumatoid-factor',
 title:'Rheumatoid Factor (RF) - IgM',
 description:'Positive in 70-80% RA (higher titer = worse prognosis). Can be negative in early RA (seronegative RA 20%). False positive: elderly, chronic infections, HCV, Sjögren',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-anti-ccp',
 title:'Anti-CCP (Anti-Cyclic Citrullinated Peptide) - HIGHLY SPECIFIC!',
 description:'Specificity 95-98% (better than RF). Sensitivity 60-70%. Positive years before symptoms. Predicts erosive disease. Gold standard for RA diagnosis',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-inflammatory-markers',
 title:'ESR & CRP (Acute Phase Reactants)',
 description:'ESR & CRP elevated in 60-70% active RA. Normal does NOT exclude RA (30% have normal). Correlates with disease activity (used in DAS28-ESR/CRP). Monitor treatment response',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-baseline-cbc',
 title:'CBC: Anemia of Chronic Disease, Thrombocytosis',
 description:'Normocytic anemia (60-80% active RA). Thrombocytosis (inflammation). Baseline untuk monitor MTX toxicity (neutropenia, macrocytosis)',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-baseline-lft-creat',
 title:'Baseline LFT & Creatinine (Pre-DMARD Screening)',
 description:'MANDATORY sebelum MTX (hepatotoxic). AST, ALT, albumin. Creatinine (GFR). Hepatitis B/C screening jika high risk. AVOID MTX jika liver disease/heavy alcohol',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-xray-hands-feet',
 title:'X-Ray Hands & Feet (Bilateral PA Views)',
 description:'Baseline untuk monitor erosions. Early: soft tissue swelling, periarticular osteopenia. Late: joint space narrowing, marginal erosions, subluxation. Erosions = poor prognosis',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-ultrasound-mri',
 title:'Ultrasound/MRI (if Available) - Detect Subclinical Synovitis',
 description:'US: power Doppler detects active inflammation (more sensitive than clinical exam). MRI: bone marrow edema (pre-erosive changes). Prognostic tool',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-ana-complement',
 title:'ANA & Complement (C3, C4) - Rule Out Lupus/Overlap',
 description:'ANA can be positive in RA (30-40%, low titer). High titer ANA + symptoms → think SLE. Low complement → SLE, vasculitis',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-tb-screening',
 title:'TB Screening (TST/IGRA) - MANDATORY Before Biologics',
 description:'Tuberculin Skin Test OR Interferon-Gamma Release Assay (QuantiFERON). CXR. Latent TB reactivation risk dengan TNF inhibitors. Treat LTBI before biologics',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-hep-b-c-hiv',
 title:'Hepatitis B/C & HIV Screening (Before Immunosuppression)',
 description:'HBsAg, Anti-HBs, Anti-HCV. Reactivation risk dengan DMARDs/biologics. HIV screening (endemic areas). Vaccinate if HBsAg negative',
 required: false,
 category:'assessment'
 }
 ]
 },

'ra-acr-eular-classification': {
 id:'ra-acr-eular-classification',
 type:'checklist',
 title:'ACR/EULAR 2010 Classification Criteria Scoring',
 description:'Score ≥6 = Definite RA (Sensitivity 82%, Specificity 61%)',
 items: [
 {
 id:'ra-score-joint-involvement',
 title:'Joint Involvement Score (0-5 points)',
 description:'1 large joint=0, 2-10 large joints=1, 1-3 small joints=2, 4-10 small joints=3, >10 joints (≥1 small)=5. Small=MCP,PIP,MTP,wrist. Large=shoulder,elbow,hip,knee,ankle',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-score-serology',
 title:'Serology Score (0-3 points)',
 description:'RF & anti-CCP both negative=0. Low positive RF OR anti-CCP (≤3x ULN)=2. High positive RF OR anti-CCP (>3x ULN)=3. High titer = worse prognosis',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-score-acute-phase',
 title:'Acute Phase Reactants (0-1 point)',
 description:'ESR & CRP both normal=0. Abnormal ESR OR CRP=1. Normal inflammatory markers does NOT exclude RA',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-score-duration',
 title:'Symptom Duration (0-1 point)',
 description:'<6 weeks=0, ≥6 weeks=1. Chronic arthritis criterion. Early diagnosis critical (window of opportunity)',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-calculate-total-score',
 title:'Calculate Total Score (Range 0-10)',
 description:'Score ≥6 = Definite RA (fulfill classification criteria). Score <6 = possible early RA (monitor closely) OR alternative diagnosis. Repeat in 3-6 months if uncertain',
 required: true,
 category:'assessment'
 }
 ]
 },

'ra-diagnosis-decision': {
 id:'ra-diagnosis-decision',
 type:'decision',
 title:'RA Diagnosis & Disease Activity Assessment',
 description:'Berdasarkan ACR/EULAR score - Early aggressive treatment = better outcomes!',
 warningLevel:'warning',
 branches: [
 {
 id:'ra-confirmed',
 title:'RA CONFIRMED (Score ≥6)',
 description:'Fulfill ACR/EULAR criteria → Immediate DMARD initiation! Early treatment = prevent erosions',
 icon:'',
 color:'red',
 nextNodeId:'ra-disease-activity-assessment',
 riskLevel:'high'
 },
 {
 id:'ra-probable-early',
 title:'Probable Early RA (Score 4-5)',
 description:'Suggestive but not definite → Close monitoring, consider early DMARD, repeat assessment 3 months',
 icon:'',
 color:'orange',
 nextNodeId:'ra-early-undifferentiated-management',
 riskLevel:'medium'
 },
 {
 id:'ra-alternative-diagnosis',
 title:'Alternative Diagnosis (Score <4)',
 description:'Low probability RA → Extensive workup untuk other arthritis (PsA, viral, crystalline, SLE)',
 icon:'',
 color:'blue',
 nextNodeId:'ra-alternative-workup',
 riskLevel:'low'
 }
 ]
 },

'ra-disease-activity-assessment': {
 id:'ra-disease-activity-assessment',
 type:'checklist',
 title:'Disease Activity Scoring - DAS28 Calculation',
 description:'Objective disease activity measurement untuk Treat-to-Target strategy',
 items: [
 {
 id:'ra-das28-tender-joints',
 title:'Tender Joint Count (TJC28 - 28 joints)',
 description:'Count tender joints: shoulders(2), elbows(2), wrists(2), MCPs(10), PIPs(10), knees(2). Score 0-28. Symmetrical pattern typical',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-das28-swollen-joints',
 title:'Swollen Joint Count (SJC28 - 28 joints)',
 description:'Count swollen joints (same 28 joints). Assess for boggy synovial thickening. Score 0-28',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-das28-esr-crp',
 title:'ESR (mm/hr) OR CRP (mg/L)',
 description:'DAS28-ESR uses ESR. DAS28-CRP uses CRP. Both validated. CRP more responsive to change',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-das28-patient-global',
 title:'Patient Global Assessment (PGA) - VAS 0-100mm',
 description:'Patient rates overall disease activity on visual analog scale. 0=very good, 100=very bad. Patient perspective critical',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-das28-calculation',
 title:'DAS28 Score Calculation & Interpretation',
 description:'DAS28 = 0.56TJC28 + 0.28√SJC28 + 0.70ln(ESR) + 0.014(PGA). Remission <2.6, Low 2.6-3.2, Moderate 3.2-5.1, High >5.1. Target: Remission or Low Disease Activity',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-cdai-alternative',
 title:'Alternative: CDAI (Clinical Disease Activity Index) - No Lab Needed',
 description:'CDAI = TJC28 + SJC28 + PGA + Physician Global. Remission ≤2.8, Low ≤10, Moderate ≤22, High >22. Simpler, no lab (good for resource-limited)',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-baseline-haq',
 title:'Baseline HAQ-DI (Health Assessment Questionnaire - Disability Index)',
 description:'Functional status: dressing, rising, eating, walking, hygiene, reach, grip, activities. Score 0-3. Predicts long-term disability',
 required: false,
 category:'assessment'
 }
 ]
 },

'ra-treatment-initiation': {
 id:'ra-treatment-initiation',
 type:'checklist',
 title:'RA Treatment Initiation - Methotrexate First-Line (EULAR/ACR)',
 description:'Immediate DMARD therapy!"Window of opportunity" - early treatment prevents erosions',
 items: [
 {
 id:'ra-mtx-first-line',
 title:'Methotrexate (MTX) 15mg PO Weekly - GOLD STANDARD First-Line',
 description:'Start 15mg PO weekly (can start 7.5mg jika elderly/frail). Escalate to 25mg if needed. Take same day weekly. Anchor DMARD. 60-70% respond',
 required: true,
 category:'medication'
 },
 {
 id:'ra-folic-acid',
 title:'Folic Acid 5mg 24h Post-MTX (MANDATORY - Reduce Toxicity)',
 description:'Give folic acid day AFTER MTX (e.g., MTX Monday → Folic acid Tuesday). Reduce nausea, mouth ulcers, hepatotoxicity. Do NOT give same day (↓efficacy)',
 required: true,
 category:'medication'
 },
 {
 id:'ra-bridging-prednisone',
 title:'Bridging Prednisolone 5-10mg Daily (Taper over 6-12 weeks)',
 description:'Low-dose steroid while awaiting DMARD effect (takes 6-12 weeks). Rapid symptom relief. Taper slowly to avoid flare. AVOID long-term high-dose',
 required: true,
 category:'medication'
 },
 {
 id:'ra-nsaid-analgesia',
 title:'NSAIDs (Ibuprofen, Naproxen, Celecoxib) + Gastroprotection',
 description:'Symptomatic relief (NOT disease-modifying). Lowest dose, shortest duration. PPI (omeprazole) if >60 years, GI risk. AVOID if CKD, CVD risk',
 required: false,
 category:'medication'
 },
 {
 id:'ra-patient-education',
 title:'Patient Education: Disease Course, Treatment Goals, Monitoring',
 description:'Chronic disease requiring lifelong treatment. Goal: Remission/Low Disease Activity. Regular monitoring. Avoid"alternative treatments" (delay DMARD)',
 required: true,
 category:'documentation'
 },
 {
 id:'ra-treat-to-target',
 title:'Treat-to-Target (T2T) Strategy: Target DAS28 <2.6 OR CDAI ≤2.8',
 description:'Paradigm shift! Tight control with frequent assessment (monthly initially). Escalate treatment if target not reached by 3-6 months. T2T → better outcomes',
 required: true,
 category:'documentation'
 },
 {
 id:'ra-contraception-women',
 title:'Contraception Counseling (MTX = Teratogenic!)',
 description:'MTX absolutely contraindicated pregnancy. Reliable contraception mandatory (women & men). Stop MTX 3 months before conception attempt',
 required: true,
 category:'safety'
 },
 {
 id:'ra-baseline-vaccinations',
 title:'Update Vaccinations (Before Immunosuppression)',
 description:'Influenza (yearly), Pneumococcal (PPSV23 + PCV13), Hepatitis B, Shingles (Shingrix - NOT live). NO live vaccines on DMARDs/biologics',
 required: false,
 category:'medication'
 }
 ]
 },

'ra-monitoring-protocol': {
 id:'ra-monitoring-protocol',
 type:'checklist',
 title:'MTX Monitoring Protocol & Toxicity Surveillance',
 description:'Mandatory monitoring untuk detect toxicity early',
 items: [
 {
 id:'ra-monitoring-schedule',
 title:'Monitoring Schedule: CBC, LFT, Creatinine',
 description:'Baseline → 2 weeks → 4 weeks → then MONTHLY x 3 months → then q2-3 months if stable. MORE frequent jika dose increase',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-mtx-hepatotoxicity',
 title:'Monitor Hepatotoxicity: AST/ALT, Albumin',
 description:'Transient transaminitis common (20-30%). STOP MTX jika ALT >3x ULN persistently. Cumulative dose >1.5g → fibrosis risk (rare). AVOID alcohol',
 required: true,
 category:'safety'
 },
 {
 id:'ra-mtx-bone-marrow',
 title:'Monitor Bone Marrow Suppression: CBC (WBC, Plt)',
 description:'Macrocytosis expected (folic acid antagonist). Leukopenia, thrombocytopenia rare but serious. STOP MTX jika WBC <3.5, Plt <100k. May need leucovorin rescue',
 required: true,
 category:'safety'
 },
 {
 id:'ra-mtx-pulmonary',
 title:'MTX Pneumonitis Screening (RARE but Serious)',
 description:'Acute onset dyspnea, dry cough, fever (NOT dose-related). Occurs 1-5% (unpredictable). STOP MTX immediately. High-dose steroid. Differentiate from RA-ILD',
 required: false,
 category:'safety'
 },
 {
 id:'ra-das28-monthly',
 title:'Disease Activity Assessment (DAS28/CDAI) - Monthly Initially',
 description:'Assess response monthly x 3 months, then q3 months. Target: DAS28 <2.6 OR CDAI ≤2.8 by 6 months. Escalate if not improving',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-adherence-check',
 title:'Medication Adherence Assessment',
 description:'Non-adherence 30-80% (major barrier). Ask non-judgmentally. Address barriers: cost, side effects, beliefs. Weekly pill organizer',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-infection-vigilance',
 title:'Infection Surveillance (↑Risk on Immunosuppression)',
 description:'Educate: fever >38°C, persistent cough, dysuria → seek medical attention. May need to hold DMARD during infection. Pneumocystis prophylaxis NOT routine',
 required: true,
 category:'safety'
 }
 ]
 },

'ra-treatment-escalation-decision': {
 id:'ra-treatment-escalation-decision',
 type:'decision',
 title:'Treatment Response Assessment (3-6 Months) - Treat-to-Target',
 description:'Escalate therapy jika target tidak tercapai (tight control strategy)',
 warningLevel:'warning',
 branches: [
 {
 id:'ra-remission-achieved',
 title:'REMISSION Achieved (DAS28 <2.6)',
 description:'Target reached! Maintain current therapy, monitor q3-6 months, consider dose reduction after sustained remission (>1 year)',
 icon:'',
 color:'green',
 nextNodeId:'ra-remission-maintenance',
 riskLevel:'low'
 },
 {
 id:'ra-partial-response',
 title:'Partial Response (↓DAS28 but still Moderate/High)',
 description:'Some improvement but not target → Add 2nd csDMARD (HCQ, SSZ) OR increase MTX dose → biologics if fail',
 icon:'',
 color:'orange',
 nextNodeId:'ra-dmard-combination',
 riskLevel:'medium'
 },
 {
 id:'ra-no-response',
 title:'NO Response (DAS28 unchanged/worse)',
 description:'MTX failure → Switch to biologics (TNF-i, IL-6i, JAK-i) OR triple DMARD therapy',
 icon:'',
 color:'red',
 nextNodeId:'ra-biologics-initiation',
 riskLevel:'high'
 }
 ]
 },

'ra-dmard-combination': {
 id:'ra-dmard-combination',
 type:'checklist',
 title:'DMARD Combination Therapy (Partial Response)',
 description:'Add 2nd conventional synthetic DMARD (csDMARD) before biologics',
 items: [
 {
 id:'ra-add-hydroxychloroquine',
 title:'Add Hydroxychloroquine (HCQ) 200-400mg Daily',
 description:'Safest DMARD. Add to MTX. Mild-moderate efficacy. Well-tolerated. Retinal toxicity rare (screen yearly >5 years). Takes 3-6 months',
 required: false,
 category:'medication'
 },
 {
 id:'ra-add-sulfasalazine',
 title:'Add Sulfasalazine (SSZ) 2g Daily (Divided Dose)',
 description:'Alternative to HCQ. Start 500mg daily, escalate to 2g (GI tolerance). Monitor CBC (cytopenias). Effective in combination',
 required: false,
 category:'medication'
 },
 {
 id:'ra-triple-therapy',
 title:'Triple Therapy: MTX + HCQ + SSZ',
 description:'Effective as biologics in some studies. Cheaper. Good option resource-limited. Monitor LFT, CBC. Side effects higher',
 required: false,
 category:'medication'
 },
 {
 id:'ra-increase-mtx-dose',
 title:'Increase MTX Dose → 20-25mg Weekly (Max)',
 description:'Many undertreated (on 10mg). Dose-response up to 25mg. Consider SC route if GI intolerance/poor absorption',
 required: true,
 category:'medication'
 },
 {
 id:'ra-reassess-3months',
 title:'Reassess Response at 3 Months',
 description:'DAS28/CDAI measurement. If still not target → Consider biologics (do NOT delay)',
 required: true,
 category:'assessment'
 }
 ]
 },

'ra-biologics-initiation': {
 id:'ra-biologics-initiation',
 type:'checklist',
 title:'Biologics & JAK Inhibitors (MTX-IR = MTX Inadequate Response)',
 description:'Advanced therapy untuk moderate-severe RA failing MTX',
 items: [
 {
 id:'ra-biologics-indications',
 title:'Indications: MTX Failure OR High Disease Activity + Poor Prognostic Factors',
 description:'MTX-IR (failed 3-6 months adequate dose). OR high disease activity + erosions/high RF-ACCP/extra-articular. Early biologics for severe RA',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-tb-screening-biologics',
 title:'TB Screening (MANDATORY!) - TST/IGRA + CXR',
 description:'TNF inhibitors ↑TB reactivation risk 3-10x. Treat latent TB BEFORE starting biologics. Isoniazid 9 months OR Rifampin 4 months',
 required: true,
 category:'safety'
 },
 {
 id:'ra-tnf-inhibitors',
 title:'TNF Inhibitors (First-Line Biologics): Adalimumab, Etanercept, Infliximab',
 description:'Most evidence. Adalimumab 40mg SC q2 weeks. Etanercept 50mg SC weekly. Infliximab 3mg/kg IV (loading). Efficacy 60-70%. Continue MTX (synergy)',
 required: false,
 category:'medication'
 },
 {
 id:'ra-il6-inhibitors',
 title:'IL-6 Inhibitors: Tocilizumab (Alternative/TNF-IR)',
 description:'Tocilizumab 8mg/kg IV q4 weeks OR 162mg SC weekly. Effective monotherapy (jika MTX intolerant). Monitor lipids (↑), LFT, neutropenia',
 required: false,
 category:'medication'
 },
 {
 id:'ra-jak-inhibitors',
 title:'JAK Inhibitors: Tofacitinib, Baricitinib (Oral - Patient Preference)',
 description:'Small molecule, oral (vs injection). Tofacitinib 5mg BID. Baricitinib 4mg daily. Rapid onset. Black box: infections, MACE, malignancy (age >65, smokers)',
 required: false,
 category:'medication'
 },
 {
 id:'ra-biosimilars',
 title:'Biosimilars (Cost-Effective Alternative)',
 description:'Biosimilar TNF-i available (cheaper). Similar efficacy/safety. Improve access. Switch stable patients',
 required: false,
 category:'documentation'
 },
 {
 id:'ra-biologics-monitoring',
 title:'Biologics Monitoring: Infections, TB, Malignancy',
 description:'Screen infections before EVERY infusion. Annual TB screening. Skin cancer screening. Hold during severe infections',
 required: true,
 category:'safety'
 },
 {
 id:'ra-biologics-failure',
 title:'Biologics Failure Strategy: Switch TNF-i → Non-TNF OR JAK-i',
 description:'Primary failure (no response 3 months) → switch class. Secondary failure (loss response) → try another same class OR switch. Cycling strategy',
 required: false,
 category:'documentation'
 }
 ]
 },

'ra-remission-maintenance': {
 id:'ra-remission-maintenance',
 type:'checklist',
 title:'Remission Maintenance & Long-Term Management',
 description:'Sustained remission achieved - prevent relapse & monitor complications',
 items: [
 {
 id:'ra-remission-criteria',
 title:'Confirm Sustained Remission (DAS28 <2.6 OR CDAI ≤2.8 for >6 months)',
 description:'Boolean remission (ACR/EULAR): TJC ≤1, SJC ≤1, CRP ≤1 mg/dL, PGA ≤1 (0-10 scale). Stringent definition',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-dose-reduction',
 title:'Consider DMARD Dose Reduction (After >1 Year Sustained Remission)',
 description:'Controversial. EULAR: can taper DMARDs in sustained remission (NOT discontinue). 50% relapse within 1 year if stop. Gradual taper (MTX 2.5mg q3 months)',
 required: false,
 category:'medication'
 },
 {
 id:'ra-monitoring-frequency',
 title:'Monitoring Frequency in Remission: q3-6 Months',
 description:'DAS28/CDAI q3-6 months. Annual X-ray (check progression). CBC, LFT q3 months on MTX. Less frequent if stable',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-cardiovascular-risk',
 title:'Cardiovascular Risk Management (RA = CVD Risk 2x)',
 description:'RA independent CVD risk factor. Aggressive control: HTN, DM, dyslipidemia, smoking cessation. Statin consider. Disease control ↓CVD risk',
 required: true,
 category:'action'
 },
 {
 id:'ra-osteoporosis-screen',
 title:'Osteoporosis Screening: DEXA Scan',
 description:'RA + steroids → high fracture risk. DEXA baseline & q2 years. Calcium 1200mg + Vit D 800 IU. Bisphosphonate if T-score <-2.5',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-ild-surveillance',
 title:'Interstitial Lung Disease (ILD) Surveillance',
 description:'RA-ILD prevalence 10-30% (subclinical). Risk: male, smoker, seropositive, nodules. Baseline CXR, consider HRCT. Annual symptoms screen (dyspnea, cough)',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-malignancy-screen',
 title:'Malignancy Screening (Lymphoma Risk 2x in RA)',
 description:'Age-appropriate cancer screening. Skin cancer (biologics). Lymphoma risk (RA itself, NOT DMARDs per se). No special screening beyond standard',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-pregnancy-planning',
 title:'Pregnancy Planning (Compatible DMARDs: HCQ, SSZ)',
 description:'STOP MTX, LEF (teratogenic). SAFE: HCQ, SSZ, Prednisone, Certolizumab (TNF-i). RA often improves during pregnancy, flares postpartum',
 required: false,
 category:'documentation'
 }
 ]
 },

'ra-early-undifferentiated-management': {
 id:'ra-early-undifferentiated-management',
 type:'checklist',
 title:'Early Undifferentiated Arthritis (Probable RA)',
 description:'Suggestive but tidak fulfill criteria - close monitoring critical',
 items: [
 {
 id:'ra-undiff-monitoring',
 title:'Close Monitoring: Reassess q3 Months',
 description:'40-60% undifferentiated arthritis evolve to RA within 1 year. Repeat RF, anti-CCP, X-ray. Look for evolution pattern',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-undiff-early-dmard',
 title:'Consider Early DMARD (if High Risk for Progression)',
 description:'Risk factors: anti-CCP+, erosions on X-ray/MRI, polyarticular, elevated CRP. Early treatment may prevent RA. Shared decision-making',
 required: false,
 category:'medication'
 },
 {
 id:'ra-undiff-imaging',
 title:'Advanced Imaging: MRI/Ultrasound',
 description:'Detect subclinical synovitis, bone marrow edema. Prognostic value. If available, helps predict progression',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-undiff-nsaid-steroid',
 title:'Symptomatic Treatment: NSAIDs, Low-Dose Steroid',
 description:'Symptom control while monitoring. Prednisone 5-7.5mg daily. NSAIDs lowest dose. AVOID delaying DMARD if RA confirmed',
 required: true,
 category:'medication'
 }
 ]
 },

'ra-alternative-workup': {
 id:'ra-alternative-workup',
 type:'checklist',
 title:'Alternative Diagnosis Workup (Low Probability RA)',
 description:'Extensive evaluation untuk other causes of polyarthritis',
 items: [
 {
 id:'ra-alt-psoriatic',
 title:'Psoriatic Arthritis: Skin/Nail Exam, Asymmetric, DIP Involvement',
 description:'Psoriasis (may be subtle - scalp, umbilicus, gluteal). Nail pitting, onycholysis. Dactylitis ("sausage digit"). Asymmetric. RF/anti-CCP negative',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-alt-crystalline',
 title:'Crystalline Arthritis: Joint Aspiration (Uric Acid, CPPD)',
 description:'Gout (monosodium urate - negatively birefringent). Pseudogout (calcium pyrophosphate - positively birefringent). Acute monoarticular typical',
 required: true,
 category:'assessment'
 },
 {
 id:'ra-alt-viral',
 title:'Viral Arthritis: Parvo B19, HBV, HCV, HIV, Chikungunya',
 description:'Transient polyarthritis. Parvovirus (children, pregnant). HCV (cryoglobulinemia). HIV (reactive). Travel history',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-alt-lupus',
 title:'SLE (Systemic Lupus Erythematosus): ANA, dsDNA, Complement',
 description:'Non-erosive arthritis. Malar rash, photosensitivity, serositis, renal. ANA positive (high titer). Low C3/C4. Anti-dsDNA specific',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-alt-reactive',
 title:'Reactive Arthritis: Post-Infection, Asymmetric, Enthesitis',
 description:'Follows GI (Salmonella, Shigella, Campylobacter) or GU (Chlamydia) infection. HLA-B27 associated. Urethritis, conjunctivitis, skin (keratoderma)',
 required: false,
 category:'assessment'
 },
 {
 id:'ra-alt-rheumatology-referral',
 title:'Rheumatology Referral (Complex Cases)',
 description:'Uncertain diagnosis, atypical features, poor response therapy → specialist evaluation',
 required: true,
 category:'action'
 }
 ]
 }
 }
 },

 // COMMUNITY-ACQUIRED PNEUMONIA (CAP) - ATS/IDSA 2019 + BTS 2019 + WHO 2022 + PPK Indonesia
'pneumonia-komunitas': {
 diseaseId:'pneumonia-komunitas',
 diseaseName:'Pneumonia Komunitas (CAP)',
 startNodeId:'cap-initial-assessment',
 nodes: {
'cap-initial-assessment': {
 id:'cap-initial-assessment',
 type:'checklist',
 title:'CAP Initial Clinical Assessment',
 description:'Comprehensive evaluation untuk diagnosis Community-Acquired Pneumonia',
 items: [
 {
 id:'cap-respiratory-symptoms',
 title:'Respiratory Symptoms: Cough, Dyspnea, Sputum Production',
 description:'Productive cough (purulent/rusty sputum). Dyspnea (↑respiratory rate). Pleuritic chest pain. Cough duration >24h typically. Hemoptysis red flag (TB, malignancy)',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-fever-chills',
 title:'Fever & Systemic Symptoms (Temp ≥38°C OR <36°C)',
 description:'Fever common (70-80%). Rigors (shaking chills) suggest bacteremia. Hypothermia (<36°C) = severe infection/immunocompromised. Malaise, myalgia',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-vital-signs',
 title:'Vital Signs: RR, HR, BP, SpO2, Temp (CRITICAL!)',
 description:'Tachypnea (RR ≥30) = severity marker. Tachycardia (HR >100). Hypotension (SBP <90). SpO2 <90% room air. Hypothermia/fever. SIRS criteria',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-lung-auscultation',
 title:'Lung Auscultation: Crackles, Bronchial Breath Sounds, Dullness',
 description:'Focal crackles (rales) - most sensitive sign. Bronchial breathing (consolidation). Dullness to percussion. Egophony. ↓Breath sounds (effusion). Wheeze less common',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-comorbidities',
 title:'Assess Comorbidities (Major Risk Factors for Severe CAP)',
 description:'COPD, heart failure, DM, CKD, liver disease, malignancy, immunosuppression (HIV, steroids, chemo). Age >65. Smoking. Aspiration risk (dysphagia, stroke)',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-recent-antibiotics',
 title:'Recent Antibiotic Use (Last 3 Months) - RESISTANCE RISK',
 description:'Prior antibiotics ↑drug-resistant Streptococcus pneumoniae (DRSP). Need broader coverage. Document antibiotic class & duration',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-severity-assessment',
 title:'Initial Severity Assessment (Altered Mental Status, Hypoxia)',
 description:'Confusion/AMS (early sign severe CAP). Respiratory distress. Hypoxemia. Shock. Criteria untuk ICU consideration. Early warning scores',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-exclude-hospital-acquired',
 title:'Exclude Hospital-Acquired Pneumonia (HAP/VAP)',
 description:'CAP = onset community OR <48h hospitalization. HAP = ≥48h admission. VAP = ventilated patient. Different pathogens (Pseudomonas, MRSA)',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-covid-screening',
 title:'COVID-19 Screening (Post-Pandemic Era Consideration)',
 description:'Symptoms overlap: fever, cough, dyspnea. Travel/contact history. Antigen/PCR testing. Co-infection possible (bacterial superinfection). Isolation precautions',
 required: false,
 category:'safety'
 },
 {
 id:'cap-tb-screening',
 title:'TB Screening (Endemic Areas - INDONESIA!)',
 description:'Chronic cough (>2-3 weeks), weight loss, night sweats, hemoptysis. Risk: HIV, DM, close contact. GeneXpert if suspected. Isolation',
 required: false,
 category:'assessment'
 }
 ]
 },

'cap-diagnostic-workup': {
 id:'cap-diagnostic-workup',
 type:'checklist',
 title:'CAP Diagnostic Workup & Investigations',
 description:'Essential tests untuk confirm diagnosis & assess severity',
 items: [
 {
 id:'cap-chest-xray',
 title:'Chest X-Ray (PA & Lateral) - GOLD STANDARD Diagnosis',
 description:'Infiltrate/consolidation confirms pneumonia. Lobar (Strep pneumo), Interstitial (atypical), Multilobar (severe). Complications: effusion, abscess, cavitation. Baseline untuk follow-up',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-pulse-oximetry',
 title:'Pulse Oximetry (SpO2) - Room Air & On O2',
 description:'SpO2 <90% room air = moderate-severe. <93% = supplemental O2 needed. ABG jika SpO2 <90% OR respiratory distress (PaO2, PaCO2, pH)',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-cbc',
 title:'Complete Blood Count (CBC): WBC, Differential',
 description:'Leukocytosis (WBC >15k) OR leukopenia (<4k). Neutrophilia with left shift. Leukopenia/lymphopenia = severe/viral. Thrombocytopenia (sepsis)',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-crp-procalcitonin',
 title:'Inflammatory Markers: CRP, Procalcitonin (if available)',
 description:'CRP >100 mg/L suggests bacterial. Procalcitonin >0.25 ng/mL bacterial (vs viral). Guide antibiotic duration. Serial monitoring',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-renal-electrolytes',
 title:'Renal Function & Electrolytes: Creatinine, Urea, Na, K',
 description:'Urea >7 mmol/L (CURB-65 criterion). AKI (dehydration, sepsis). Hyponatremia (SIADH - Legionella). Pre-antibiotic baseline',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-liver-function',
 title:'Liver Function Tests (LFT): Bilirubin, Transaminases',
 description:'Elevated in sepsis. Hepatic impairment affects antibiotic choice. Jaundice red flag (cholangitis, leptospirosis)',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-blood-cultures',
 title:'Blood Cultures x2 (BEFORE Antibiotics - Severe CAP Only)',
 description:'Positive 5-14% (low yield). Indications: severe CAP, ICU, cavitation, leukopenia, asplenia, IVDU. Take BEFORE antibiotics. Aerobic + anaerobic bottles',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-sputum-culture',
 title:'Sputum Gram Stain & Culture (if Productive Cough)',
 description:'Quality sputum: <10 epithelial cells, >25 WBC per HPF. Gram positive diplococci (Strep pneumo). Culture guides de-escalation. Low sensitivity',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-legionella-urinary-antigen',
 title:'Legionella Urinary Antigen (if Severe OR Hyponatremia)',
 description:'Detects Legionella pneumophila serogroup 1 (70% cases). Indications: severe CAP, hyponatremia, diarrhea, failure beta-lactam. Rapid test',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-pneumococcal-urinary-antigen',
 title:'Pneumococcal Urinary Antigen (Rapid Test)',
 description:'S. pneumoniae detection (sensitivity 70-80%). Severe CAP. Remains positive weeks (recent infection). Low specificity (colonization)',
 required: false,
 category:'assessment'
 }
 ]
 },

'cap-severity-scoring': {
 id:'cap-severity-scoring',
 type:'checklist',
 title:'CAP Severity Scoring - CURB-65 & PSI Assessment',
 description:'Objective severity stratification untuk admission & treatment decisions',
 items: [
 {
 id:'cap-curb65-confusion',
 title:'C = Confusion (Altered Mental Status) - 1 point',
 description:'New disorientation to person, place, time. AMTS ≤8 (Abbreviated Mental Test Score). Early sign severe CAP. Hypoxia, sepsis, delirium',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-curb65-urea',
 title:'U = Urea >7 mmol/L (BUN >20 mg/dL) - 1 point',
 description:'Elevated urea = dehydration, ↓renal perfusion, severe infection. Independent mortality predictor',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-curb65-rr',
 title:'R = Respiratory Rate ≥30/min - 1 point',
 description:'Tachypnea = hypoxia, ↑work of breathing, respiratory failure risk. Count full 60 seconds',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-curb65-bp',
 title:'B = Blood Pressure: SBP <90 OR DBP ≤60 mmHg - 1 point',
 description:'Hypotension = septic shock, ↓perfusion, ↑mortality. Needs fluid resuscitation, vasopressors',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-curb65-age',
 title:'65 = Age ≥65 Years - 1 point',
 description:'Elderly ↑mortality (comorbidities, immunosenescence, frailty). Age independent risk factor',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-curb65-total',
 title:'Calculate CURB-65 Total Score (0-5 points)',
 description:'Score 0-1 (Low risk, 1-3% mortality) → Outpatient. Score 2 (Moderate, 9% mortality) → Inpatient. Score 3-5 (High risk, 15-40% mortality) → ICU consideration',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-psi-alternative',
 title:'Alternative: PSI/PORT Score (Pneumonia Severity Index)',
 description:'More complex (20 variables). Age + comorbidities + vitals + labs. Class I-II outpatient, III consider admission, IV-V inpatient. ATS/IDSA guideline',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-smart-cop',
 title:'SMART-COP Score (Predicts Need for IRVS - Intensive Respiratory/Vasopressor Support)',
 description:'S=SBP<90, M=multilobar, A=albumin<3.5, R=RR, T=tachy>125, C=confusion, O=O2, P=pH. Score ≥3 predicts ICU need. Complements CURB-65',
 required: false,
 category:'assessment'
 }
 ]
 },

'cap-severity-decision': {
 id:'cap-severity-decision',
 type:'decision',
 title:'CAP Disposition & Treatment Setting Decision',
 description:'Berdasarkan CURB-65 score - Outpatient vs Inpatient vs ICU',
 warningLevel:'warning',
 branches: [
 {
 id:'cap-outpatient',
 title:'Outpatient Management (CURB-65 0-1, Low Risk)',
 description:'Low mortality risk (1-3%). Oral antibiotics, close follow-up. Safety-net advice. Return if worsening',
 icon:'',
 color:'green',
 nextNodeId:'cap-outpatient-treatment',
 riskLevel:'low'
 },
 {
 id:'cap-inpatient',
 title:'Hospital Admission (CURB-65 2, Moderate Risk)',
 description:'Moderate mortality (9%). IV antibiotics, monitoring, oxygen. Floor/ward admission',
 icon:'',
 color:'orange',
 nextNodeId:'cap-inpatient-treatment',
 riskLevel:'medium'
 },
 {
 id:'cap-icu',
 title:'ICU Admission (CURB-65 3-5 OR Severe CAP Criteria)',
 description:'High mortality (15-40%). Septic shock, respiratory failure, multi-organ dysfunction. ICU-level care',
 icon:'',
 color:'red',
 nextNodeId:'cap-icu-management',
 riskLevel:'high'
 }
 ]
 },

'cap-outpatient-treatment': {
 id:'cap-outpatient-treatment',
 type:'checklist',
 title:'Outpatient CAP Management (Mild - CURB-65 0-1)',
 description:'Oral antibiotics & supportive care untuk low-risk CAP',
 items: [
 {
 id:'cap-out-amoxicillin',
 title:'First-Line: Amoxicillin 1g PO TID x 5-7 days',
 description:'Covers Strep pneumoniae (most common). High dose (3g/day total). Well-tolerated. Cheap. ATS/IDSA first-line choice. Contraindication: penicillin allergy',
 required: true,
 category:'medication'
 },
 {
 id:'cap-out-macrolide-atypical',
 title:'Add Macrolide if Atypical Features: Azithromycin 500mg PO OD x 3d OR Clarithromycin',
 description:'Atypical organisms: Mycoplasma, Chlamydia, Legionella. Features: gradual onset, headache, myalgia, normal WBC. Macrolide resistance concern',
 required: false,
 category:'medication'
 },
 {
 id:'cap-out-doxycycline',
 title:'Alternative (Penicillin Allergy): Doxycycline 100mg PO BID x 7 days',
 description:'Covers typical + atypical. Cheap. GI upset. Avoid pregnancy, children <8y (teeth staining). Photosensitivity',
 required: false,
 category:'medication'
 },
 {
 id:'cap-out-fluoroquinolone',
 title:'Respiratory Fluoroquinolone (Comorbidities/Recent Abx): Levofloxacin 750mg PO OD x 5d',
 description:'Broad-spectrum (typical+atypical). Use jika: comorbidities (COPD, DM, heart failure), recent antibiotics, DRSP risk. Reserve untuk severe/resistant. Tendon rupture, QT prolongation',
 required: false,
 category:'medication'
 },
 {
 id:'cap-out-supportive',
 title:'Supportive Care: Hydration, Antipyretics, Rest',
 description:'Paracetamol 500-1000mg q6h PRN fever/pain. Adequate fluid intake (2-3L/day). Rest. Avoid smoking/alcohol. Nutrition',
 required: true,
 category:'action'
 },
 {
 id:'cap-out-safety-netting',
 title:'Safety-Net Advice: Return if Worsening (RED FLAGS)',
 description:'Return immediately if: worsening dyspnea, chest pain, confusion, unable to eat/drink, persistent high fever >3 days. Expected improvement 48-72h',
 required: true,
 category:'safety'
 },
 {
 id:'cap-out-followup',
 title:'Follow-up at 48-72 Hours (Review Response)',
 description:'Clinical improvement expected 2-3 days. Afebrile by day 3-4. Complete antibiotics course. CXR follow-up 6 weeks (rule out underlying pathology)',
 required: true,
 category:'documentation'
 },
 {
 id:'cap-out-smoking-cessation',
 title:'Smoking Cessation Counseling (If Smoker)',
 description:'Smoking ↑CAP risk 4x. Impairs mucociliary clearance. COPD risk. Offer cessation support, NRT',
 required: false,
 category:'action'
 }
 ]
 },

'cap-inpatient-treatment': {
 id:'cap-inpatient-treatment',
 type:'checklist',
 title:'Inpatient CAP Management (Moderate - CURB-65 2)',
 description:'Hospital ward admission - IV antibiotics & monitoring',
 items: [
 {
 id:'cap-in-beta-lactam-iv',
 title:'IV Beta-Lactam: Ampicillin-Sulbactam 1.5-3g IV q6h OR Ceftriaxone 2g IV OD',
 description:'Ceftriaxone 2g OD (once daily, convenient). Ampicillin-Sulbactam 1.5-3g q6h (covers aspiration). Broad Gram-positive/negative coverage',
 required: true,
 category:'medication'
 },
 {
 id:'cap-in-macrolide-add',
 title:'ADD Macrolide (MANDATORY - Dual Therapy): Azithromycin 500mg IV/PO OD',
 description:'Dual therapy (beta-lactam + macrolide) ↓mortality vs monotherapy. Covers atypical. Azithromycin 500mg IV day 1-2, then PO. Synergistic effect',
 required: true,
 category:'medication'
 },
 {
 id:'cap-in-fluoroquinolone-alternative',
 title:'Alternative Monotherapy: Levofloxacin 750mg IV OD OR Moxifloxacin 400mg IV OD',
 description:'Respiratory fluoroquinolone monotherapy acceptable. Use jika beta-lactam allergy. Broad-spectrum. Once daily. Expensive. Resistance concern',
 required: false,
 category:'medication'
 },
 {
 id:'cap-in-oxygen',
 title:'Oxygen Therapy: Target SpO2 94-98% (88-92% if COPD)',
 description:'Nasal cannula 1-6 L/min OR simple mask 5-10 L/min. Monitor SpO2 continuously. ABG if SpO2 <90%. Avoid hyperoxia (COPD CO2 retention)',
 required: true,
 category:'action'
 },
 {
 id:'cap-in-fluids',
 title:'IV Fluid Resuscitation (if Hypotensive/Dehydrated)',
 description:'Crystalloid (NaCl 0.9%, RL) 500-1000mL bolus. Assess response (BP, urine output). Maintenance 1.5-2L/day. Avoid overload (heart failure, pulmonary edema)',
 required: true,
 category:'action'
 },
 {
 id:'cap-in-thromboprophylaxis',
 title:'VTE Prophylaxis: Enoxaparin 40mg SC OD OR Heparin 5000 U SC BID',
 description:'All hospitalized CAP patients (immobilization, inflammation). Contraindication: active bleeding, severe thrombocytopenia. SCDs if contraindicated',
 required: true,
 category:'medication'
 },
 {
 id:'cap-in-monitoring',
 title:'Clinical Monitoring: Vitals q4-6h, I/O Chart, Daily CXR if Worsening',
 description:'Temp, HR, RR, BP, SpO2 q4-6h. Fluid balance. Clinical improvement 48-72h expected. Repeat CXR jika deterioration, effusion suspected',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-in-iv-to-po-switch',
 title:'IV to PO Switch Criteria (Usually Day 2-3)',
 description:'Switch when: afebrile >24h, hemodynamically stable, improving, tolerating PO. Continue same antibiotic class PO. Complete 5-7 days total',
 required: true,
 category:'medication'
 }
 ]
 },

'cap-icu-management': {
 id:'cap-icu-management',
 type:'checklist',
 title:'Severe CAP - ICU Management (CURB-65 3-5)',
 description:'Critical care untuk severe pneumonia - septic shock, respiratory failure',
 items: [
 {
 id:'cap-icu-criteria',
 title:'Severe CAP Criteria (ICU Admission Indications)',
 description:'Major: Septic shock (vasopressors), Respiratory failure (mechanical ventilation). Minor (≥3): RR≥30, PaO2/FiO2≤250, multilobar, confusion, uremia, leukopenia, thrombocytopenia, hypothermia',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-icu-broad-abx',
 title:'Broad-Spectrum IV Antibiotics: Beta-Lactam + Macrolide/Fluoroquinolone',
 description:'Ceftriaxone 2g IV q24h + Azithromycin 500mg IV OD. OR Cefotaxime 2g IV q8h. OR Piperacillin-Tazobactam 4.5g IV q6h (if Pseudomonas risk). STAT dose',
 required: true,
 category:'medication'
 },
 {
 id:'cap-icu-pseudomonas-risk',
 title:'Pseudomonas Coverage (if Risk Factors): Add Antipseudomonal Agent',
 description:'Risk: bronchiectasis, severe COPD, recent antibiotics, recent hospitalization. Piperacillin-Tazobactam OR Cefepime OR Carbapenem. ADD Fluoroquinolone (ciprofloxacin) OR aminoglycoside',
 required: false,
 category:'medication'
 },
 {
 id:'cap-icu-mrsa-risk',
 title:'MRSA Coverage (if Risk Factors): Vancomycin OR Linezolid',
 description:'Risk: IV drug use, recent hospitalization, known MRSA colonization, necrotizing pneumonia, empyema. Vancomycin 15-20mg/kg IV q8-12h (target trough 15-20). Linezolid 600mg IV q12h',
 required: false,
 category:'medication'
 },
 {
 id:'cap-icu-sepsis-resuscitation',
 title:'Sepsis Resuscitation (Surviving Sepsis Campaign 2021)',
 description:'Fluid bolus 30mL/kg crystalloid within 3h. Vasopressors if MAP <65 (norepinephrine first-line). Lactate monitoring. Source control. Early goal-directed therapy',
 required: true,
 category:'action'
 },
 {
 id:'cap-icu-respiratory-support',
 title:'Respiratory Support: High-Flow O2, NIV, OR Intubation',
 description:'High-flow nasal cannula (HFNC) 40-60 L/min if SpO2 <90%. NIV (CPAP/BiPAP) trial if no shock. Intubation criteria: unable to protect airway, refractory hypoxemia, respiratory arrest',
 required: true,
 category:'action'
 },
 {
 id:'cap-icu-steroids',
 title:'Corticosteroids (Severe CAP with Septic Shock): Hydrocortisone 50mg IV q6h',
 description:'Indication: refractory septic shock (vasopressors). Hydrocortisone 200mg/day (50mg q6h OR continuous infusion). ↓mortality, ↓vasopressor duration. NOT routine all severe CAP',
 required: false,
 category:'medication'
 },
 {
 id:'cap-icu-procalcitonin-guide',
 title:'Procalcitonin-Guided Antibiotic Duration (if Available)',
 description:'Serial procalcitonin monitoring. D/C antibiotics when PCT <0.25 ng/mL OR ↓80% from peak. ↓antibiotic days, no ↑mortality. Stewardship tool',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-icu-pleural-tap',
 title:'Pleural Effusion Management: Diagnostic Tap (if Moderate-Large)',
 description:'Ultrasound-guided thoracentesis. Send: pH, glucose, protein, LDH, Gram stain, culture. Empyema (pH<7.2, glucose<60, LDH>1000) → chest tube drainage',
 required: false,
 category:'action'
 }
 ]
 },

'cap-complications-monitoring': {
 id:'cap-complications-monitoring',
 type:'checklist',
 title:'CAP Complications Recognition & Management',
 description:'Monitor untuk complications yang memerlukan intervention',
 items: [
 {
 id:'cap-comp-respiratory-failure',
 title:'Respiratory Failure (Type 1 Hypoxemic)',
 description:'PaO2 <60 mmHg on room air. Causes: ARDS, severe pneumonia, massive effusion. Management: O2, HFNC, NIV, mechanical ventilation. Prone positioning if ARDS',
 required: true,
 category:'safety'
 },
 {
 id:'cap-comp-septic-shock',
 title:'Septic Shock (Hypotension Despite Fluids)',
 description:'Lactate >2 mmol/L + hypotension needing vasopressors (MAP ≥65). Norepinephrine first-line. Fluid resuscitation 30mL/kg. Broad antibiotics STAT. ICU transfer',
 required: true,
 category:'safety'
 },
 {
 id:'cap-comp-empyema',
 title:'Empyema (Complicated Parapneumonic Effusion)',
 description:'Persistent fever despite antibiotics. Pleural fluid: pH <7.2, glucose <60, bacteria/pus. Management: chest tube drainage (≥14Fr), fibrinolytics (tPA/DNase), VATS if loculated',
 required: true,
 category:'safety'
 },
 {
 id:'cap-comp-lung-abscess',
 title:'Lung Abscess (Cavitation on CXR)',
 description:'Risk: aspiration, poor dentition, alcoholism. CXR: cavity with air-fluid level. Prolonged antibiotics (4-6 weeks). Percutaneous drainage if large. Surgery if refractory',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-comp-ards',
 title:'ARDS (Acute Respiratory Distress Syndrome)',
 description:'Bilateral infiltrates + hypoxemia (PaO2/FiO2 <300) within 7 days. Non-cardiogenic. Management: lung-protective ventilation (TV 6mL/kg IBW, Pplat <30), PEEP, prone positioning, conservative fluids',
 required: false,
 category:'safety'
 },
 {
 id:'cap-comp-aki',
 title:'Acute Kidney Injury (AKI)',
 description:'Creatinine rise ≥0.3 mg/dL OR ↑1.5x baseline. Causes: sepsis, dehydration, drugs (NSAIDs, aminoglycosides). Monitor urine output, electrolytes. Renal replacement therapy if severe',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-comp-afib',
 title:'Atrial Fibrillation (New-Onset)',
 description:'Common complication (10-20% CAP). Inflammation, hypoxia, sympathetic surge. Management: rate control (beta-blockers), anticoagulation (if CHA2DS2-VASc ≥2). Often self-limited',
 required: false,
 category:'assessment'
 },
 {
 id:'cap-comp-treatment-failure',
 title:'Treatment Failure (No Improvement 72h)',
 description:'Persistent fever, worsening CXR. Causes: resistant organism, wrong diagnosis (PE, CHF, malignancy), complication (empyema, abscess). Repeat cultures, CT chest, ID consult',
 required: true,
 category:'safety'
 }
 ]
 },

'cap-antibiotic-stewardship': {
 id:'cap-antibiotic-stewardship',
 type:'checklist',
 title:'Antibiotic Stewardship & De-escalation',
 description:'Optimize antibiotic use - duration, de-escalation, resistance prevention',
 items: [
 {
 id:'cap-duration-5-7days',
 title:'Antibiotic Duration: 5-7 Days for Most CAP (NOT 10-14 days!)',
 description:'Evidence: 5-7 days non-inferior to longer courses. Afebrile + clinically stable → complete 5 days minimum. Extend if: slow response, complications, bacteremia, immunocompromised',
 required: true,
 category:'medication'
 },
 {
 id:'cap-deescalation',
 title:'De-escalation Based on Cultures (Narrow Spectrum)',
 description:'Blood/sputum culture positive → switch to narrowest-spectrum effective antibiotic. S. pneumoniae → Penicillin/Amoxicillin. Atypical → Macrolide. ↓resistance, ↓C. diff risk',
 required: true,
 category:'medication'
 },
 {
 id:'cap-stop-criteria',
 title:'Antibiotic Stop Criteria (Clinical Stability)',
 description:'STOP when: afebrile >24h, HR <100, RR <24, SBP >90, SpO2 >90%, tolerating PO, normal mentation. Do NOT wait for CXR clearance (lags 6 weeks)',
 required: true,
 category:'medication'
 },
 {
 id:'cap-avoid-unnecessary-coverage',
 title:'Avoid Unnecessary Broad-Spectrum (MRSA, Pseudomonas)',
 description:'Vancomycin, Linezolid, anti-pseudomonal agents ONLY if risk factors. Routine use ↑resistance (VRE, ESBL, CRE), ↑C. diff, ↑toxicity, ↑cost. Evidence-based indications',
 required: true,
 category:'safety'
 },
 {
 id:'cap-fluoroquinolone-caution',
 title:'Fluoroquinolone Judicious Use (FDA Black Box Warnings)',
 description:'Reserve untuk: severe CAP, beta-lactam allergy, DRSP. Risks: tendon rupture, aortic aneurysm, QT prolongation, C. diff, neuropathy. NOT first-line mild CAP',
 required: true,
 category:'safety'
 },
 {
 id:'cap-procalcitonin-duration',
 title:'Procalcitonin-Guided Duration (if Available)',
 description:'Measure PCT day 0, 3, 5, 7. Stop antibiotics when PCT <0.25 OR ↓80% peak. Safe, ↓antibiotic exposure by 2-3 days. ATS/IDSA conditional recommendation',
 required: false,
 category:'assessment'
 }
 ]
 },

'cap-discharge-followup': {
 id:'cap-discharge-followup',
 type:'checklist',
 title:'Discharge Planning & Follow-up',
 description:'Safe discharge criteria & long-term management',
 items: [
 {
 id:'cap-discharge-criteria',
 title:'Discharge Readiness Criteria (ALL Must Be Met)',
 description:'Clinical stability: afebrile >24h, HR <100, RR <24, SBP >90, SpO2 >90% room air, tolerating PO, normal cognition. Able to take oral antibiotics. Social support at home',
 required: true,
 category:'assessment'
 },
 {
 id:'cap-oral-antibiotics',
 title:'Discharge Antibiotics (Complete Course Oral)',
 description:'Switch to PO same class. Amoxicillin 1g TID, Azithromycin 500mg OD, Levofloxacin 750mg OD. Total duration 5-7 days (include IV days)',
 required: true,
 category:'medication'
 },
 {
 id:'cap-cxr-followup',
 title:'Follow-up CXR at 6 Weeks (Rule Out Underlying Pathology)',
 description:'MANDATORY age >50, smokers, persistent symptoms, slow resolution. Exclude: lung cancer, TB, bronchiectasis. 30% slow radiographic resolution (>4 weeks)',
 required: true,
 category:'documentation'
 },
 {
 id:'cap-pneumococcal-vaccine',
 title:'Pneumococcal Vaccination (PCV13 + PPSV23)',
 description:'All CAP survivors. PCV13 (Prevenar) first, then PPSV23 (Pneumovax) 8 weeks later. Reduces recurrence 40-60%. Age >65 OR comorbidities (COPD, DM, heart disease, asplenia)',
 required: true,
 category:'medication'
 },
 {
 id:'cap-influenza-vaccine',
 title:'Annual Influenza Vaccination',
 description:'Influenza ↑bacterial pneumonia risk (post-viral superinfection). Annual vaccination ↓CAP incidence 50%. Offer all patients',
 required: true,
 category:'medication'
 },
 {
 id:'cap-smoking-cessation-program',
 title:'Smoking Cessation Program Referral',
 description:'Smoking 1 preventable risk factor CAP. Offer: counseling, NRT (patches, gum), varenicline, bupropion."Teachable moment" post-illness',
 required: false,
 category:'action'
 },
 {
 id:'cap-comorbidity-optimization',
 title:'Optimize Comorbidity Management (COPD, DM, Heart Failure)',
 description:'COPD: inhaler technique, pulmonary rehab. DM: glycemic control. Heart failure: fluid management. Asthma: controller medications. Reduce recurrence risk',
 required: false,
 category:'action'
 },
 {
 id:'cap-red-flags-education',
 title:'Patient Education: RED FLAGS for Re-presentation',
 description:'Return immediately if: worsening dyspnea, chest pain, high fever return, coughing blood, confusion, unable to eat/drink. Expected recovery 4-6 weeks (fatigue may persist)',
 required: true,
 category:'documentation'
 }
 ]
 }
 }
 },

 // TUBERKULOSIS PARU - WHO 2022 + PPK Indonesia + ISTC 2022 + End TB Strategy
'tuberkulosis-paru': {
 diseaseId:'tuberkulosis-paru',
 diseaseName:'Tuberkulosis Paru (TB)',
 startNodeId:'tb-symptoms-screening',
 nodes: {
'tb-symptoms-screening': {
 id:'tb-symptoms-screening',
 type:'checklist',
 title:'TB Symptoms Screening & Risk Assessment',
 description:'Systematic screening untuk suspect TB - Indonesia RANK 2 TB burden worldwide!',
 items: [
 {
 id:'tb-cardinal-symptoms',
 title:'Cardinal TB Symptoms (ANY = Screen Further)',
 description:'Chronic cough ≥2 weeks (most sensitive), Fever >2 weeks (evening rise), Night sweats (drenching), Weight loss/anorexia. Hemoptysis highly suggestive',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-cough-characteristics',
 title:'Cough Characteristics: Duration, Productivity, Hemoptysis',
 description:'Chronic (≥2-3 weeks). Initially dry, then productive (purulent/mucoid). Hemoptysis (blood-streaked sputum) = cavitation. Massive hemoptysis rare (emergency)',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-systemic-symptoms',
 title:'Systemic Symptoms: Fever, Night Sweats, Weight Loss, Malaise',
 description:'Low-grade evening fever (37.5-38.5°C). Drenching night sweats (change clothes). Unintentional weight loss >10% in 3 months. Profound malaise, fatigue',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-respiratory-exam',
 title:'Respiratory Examination: Auscultation, Percussion',
 description:'Often NORMAL early disease. Upper lobe involvement: crackles (post-tussive), bronchial breathing. Cavitation: amphoric breath sounds. Effusion: dullness, ↓breath sounds',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-risk-factors',
 title:'TB Risk Factors Assessment (HIGH PRIORITY Screening)',
 description:'HIV/AIDS (↑20x risk), DM (↑3x), malnutrition, overcrowding, immunosuppression (steroids, biologics, chemo), silicosis, ESRD, close contact TB patient',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-contact-history',
 title:'TB Contact History (Household, Close Contacts)',
 description:'Household contact TB patient (↑infection risk 30-50%). Exposure duration >8h/day. Sputum smear-positive contact = high risk. Document contact name/address (tracing)',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-previous-treatment',
 title:'Previous TB Treatment History (Relapse, Default, Treatment Failure)',
 description:'Relapse (cured, now recurrent). Default/LTFU (incomplete treatment - drug resistance risk!). Treatment failure (persistent positive smear month 5). Prior MDR-TB exposure',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-hiv-screening',
 title:'HIV Screening (MANDATORY for ALL TB Suspects - Provider-Initiated)',
 description:'ALL TB patients should be offered HIV testing (WHO recommendation). TB-HIV co-infection 25% globally. HIV ↑extrapulmonary TB, atypical CXR, ↓cavitation. Consent required',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-dm-screening',
 title:'Diabetes Screening (TB-DM Co-morbidity Common)',
 description:'DM ↑TB risk 3x. TB-DM: slower culture conversion, ↑relapse, ↑mortality. Screen: random glucose OR HbA1c. DM affects rifampicin levels (drug interactions)',
 required: false,
 category:'assessment'
 },
 {
 id:'tb-nutrition-assessment',
 title:'Nutritional Status Assessment (BMI, Wasting)',
 description:'Malnutrition (BMI <18.5) common. Cachexia = advanced disease. Vitamin deficiencies. Nutrition support improves outcomes. Monitor weight monthly',
 required: false,
 category:'assessment'
 }
 ]
 },

'tb-diagnostic-workup': {
 id:'tb-diagnostic-workup',
 type:'checklist',
 title:'TB Diagnostic Workup - GeneXpert, Smear, Culture, CXR',
 description:'Comprehensive TB diagnosis - GeneXpert FIRST-LINE per WHO 2022',
 items: [
 {
 id:'tb-genexpert-mtb-rif',
 title:'GeneXpert MTB/RIF (Xpert) - FIRST-LINE Diagnostic Test (WHO 2022)',
 description:'Molecular test: detects MTB DNA + Rifampicin resistance (RR) in 2 hours! Sensitivity 85-90% (vs smear 50-60%). Single sputum. False negative if paucibacillary. Gold standard initial test',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-sputum-collection',
 title:'Sputum Collection Technique (2-3 Specimens: Spot-Morning-Spot)',
 description:'Deep cough sputum (NOT saliva). 2 specimens minimum: spot (clinic visit) + early morning (highest yield). 3rd spot if available. Volume ≥2-5mL. Instruct patient proper technique',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-sputum-smear-afb',
 title:'Sputum Smear Microscopy (AFB Stain - Ziehl-Neelsen)',
 description:'Acid-Fast Bacilli (AFB) stain. Report: negative, scanty (1-9 AFB/100 fields), 1+ (10-99 AFB/100 fields), 2+ (1-10 AFB/field), 3+ (>10 AFB/field). Positive = infectious! Low sensitivity (50-60%)',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-sputum-culture',
 title:'Sputum Culture (Gold Standard - Drug Susceptibility Testing)',
 description:'Liquid culture (MGIT - faster, 2-3 weeks) OR solid culture (LJ - 6-8 weeks). Most sensitive (detects 10-100 bacilli/mL). Drug susceptibility testing (DST) for resistance. Baseline for monitoring',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-chest-xray',
 title:'Chest X-Ray (PA & Lateral) - Pattern Recognition',
 description:'Classic: upper lobe infiltrate, cavitation (thick-walled), fibrosis, calcification. Miliary (millet seed - disseminated TB). Pleural effusion (lymphocytic, ADA >40). Lower lobe in HIV/elderly',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-hiv-test',
 title:'HIV Rapid Test (MANDATORY - All TB Patients)',
 description:'Provider-initiated HIV testing and counseling (PITC). Rapid antibody test (20 min). If positive → confirm with second test. CD4 count + viral load. ART initiation crucial (↓mortality 30-40%)',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-baseline-labs',
 title:'Baseline Laboratory Tests (Pre-Treatment)',
 description:'CBC (anemia, WBC), LFT (AST, ALT, bilirubin - hepatotoxicity monitoring), Creatinine (renal function), Uric acid (pyrazinamide), Glucose/HbA1c (DM screening). Baseline untuk monitor toxicity',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-tst-igra',
 title:'TST/IGRA (for Latent TB Diagnosis - Not Active TB)',
 description:'Tuberculin Skin Test (TST - Mantoux) OR Interferon-Gamma Release Assay (IGRA - QuantiFERON). For LTBI screening (close contacts, immunosuppressed). NOT diagnostic for active TB (can be negative)',
 required: false,
 category:'assessment'
 },
 {
 id:'tb-ct-chest',
 title:'CT Chest (if CXR Inconclusive OR Complications Suspected)',
 description:'High resolution CT: better detect cavitation, bronchiectasis, fibrosis, miliary pattern. Complications: empyema, pericardial effusion, mediastinal nodes. NOT routine (resource-limited)',
 required: false,
 category:'assessment'
 },
 {
 id:'tb-extrapulmonary-workup',
 title:'Extrapulmonary TB Workup (if Suspected: Lymph Node, Pleural, Meningeal)',
 description:'Lymph node: FNAB (AFB, GeneXpert, culture). Pleural: thoracentesis (ADA >40 U/L suggestive, lymphocytic, low glucose). TB meningitis: CSF (high protein, low glucose, lymphocytic, AFB - low yield)',
 required: false,
 category:'assessment'
 }
 ]
 },

'tb-classification-decision': {
 id:'tb-classification-decision',
 type:'decision',
 title:'TB Classification & Treatment Pathway Selection',
 description:'Classify TB based on GeneXpert/culture results - Drug-sensitive vs Drug-resistant',
 warningLevel:'critical',
 branches: [
 {
 id:'tb-drug-sensitive',
 title:'Drug-Sensitive TB (DS-TB)',
 description:'GeneXpert MTB detected, RIF resistance NOT detected. OR culture DST susceptible to all first-line drugs → Standard 6-month RHZE/RH regimen',
 icon:'',
 color:'green',
 nextNodeId:'tb-ds-treatment-initiation',
 riskLevel:'medium'
 },
 {
 id:'tb-rifampicin-resistant',
 title:'Rifampicin-Resistant TB (RR-TB) OR MDR-TB',
 description:'GeneXpert: RIF resistance detected. OR culture DST: resistant to RIF ± INH (MDR-TB) → Second-line drugs, longer treatment (9-20 months)',
 icon:'',
 color:'red',
 nextNodeId:'tb-dr-treatment-initiation',
 riskLevel:'high'
 },
 {
 id:'tb-hiv-coinfection',
 title:'TB-HIV Co-infection',
 description:'TB + HIV positive → Standard TB treatment + ART (antiretroviral therapy). Timing: ART within 2-8 weeks TB treatment start. IRIS risk',
 icon:'',
 color:'orange',
 nextNodeId:'tb-hiv-management',
 riskLevel:'high'
 }
 ]
 },

'tb-ds-treatment-initiation': {
 id:'tb-ds-treatment-initiation',
 type:'checklist',
 title:'Drug-Sensitive TB Treatment Initiation (DOTS Strategy)',
 description:'Standard 6-month regimen: 2 months RHZE (Intensive) + 4 months RH (Continuation)',
 items: [
 {
 id:'tb-rhze-regimen',
 title:'Intensive Phase: 2 Months RHZE (Rifampicin, Isoniazid, Pyrazinamide, Ethambutol)',
 description:'Fixed-dose combination (FDC) preferred. RHZE daily (2RHZE). Dosing by weight: <50kg (3 tabs), 50-70kg (4 tabs), >70kg (5 tabs). Kill rapidly dividing bacilli. DIRECTLY Observed Therapy (DOT)',
 required: true,
 category:'medication'
 },
 {
 id:'tb-continuation-phase',
 title:'Continuation Phase: 4 Months RH (Rifampicin, Isoniazid)',
 description:'After 2 months RHZE, switch to RH daily (4RH). FDC tablets. Sterilizing phase (kill dormant bacilli). Total treatment 6 months. DOT continuation',
 required: true,
 category:'medication'
 },
 {
 id:'tb-pyridoxine',
 title:'Pyridoxine (Vitamin B6) 10-25mg Daily (Prevent INH Neuropathy)',
 description:'Isoniazid-induced peripheral neuropathy prevention. MANDATORY for: DM, HIV, malnutrition, alcoholism, pregnancy, CKD. Cheap, well-tolerated',
 required: true,
 category:'medication'
 },
 {
 id:'tb-dot-enrollment',
 title:'DOTS Enrollment (Directly Observed Treatment, Short-course)',
 description:'WHO strategy: patient takes medication under observation (healthcare worker, family member, community volunteer). Daily OR 3x/week. Ensures adherence. Register in TB program',
 required: true,
 category:'documentation'
 },
 {
 id:'tb-treatment-card',
 title:'TB Treatment Card & Registration (TB01 Form)',
 description:'Document: patient details, diagnosis, regimen, DOT observer, follow-up schedule. National TB program registration. Confidentiality. Serial sputum tracking',
 required: true,
 category:'documentation'
 },
 {
 id:'tb-patient-education',
 title:'Patient Education: Adherence, Infectivity, Side Effects',
 description:'COMPLETE 6 months (DO NOT stop early even if feeling better!). Infectious first 2 weeks treatment (mask, ventilation, cough etiquette). Side effects red flags. Orange urine/tears (rifampicin) normal',
 required: true,
 category:'action'
 },
 {
 id:'tb-contact-tracing',
 title:'Contact Tracing & Household Screening (CRITICAL!)',
 description:'Identify close contacts (household, >8h/day exposure). Screen: symptoms, CXR, TST/IGRA. Children <5y: Isoniazid preventive therapy (IPT) if exposed. Prevent transmission',
 required: true,
 category:'action'
 },
 {
 id:'tb-infection-control',
 title:'Infection Control Measures (Airborne Precautions)',
 description:'Negative pressure room (if available). Surgical/N95 mask (patient wears when with others). Natural ventilation (open windows). UV light. Isolate until smear negative (2 weeks treatment)',
 required: true,
 category:'safety'
 },
 {
 id:'tb-nutrition-support',
 title:'Nutritional Support & Counseling',
 description:'High-protein, high-calorie diet. Micronutrient supplementation (vitamins, minerals). Monitor weight gain. Malnutrition impairs immunity & treatment response',
 required: false,
 category:'action'
 }
 ]
 },

'tb-intensive-phase-monitoring': {
 id:'tb-intensive-phase-monitoring',
 type:'checklist',
 title:'Intensive Phase Monitoring (Months 1-2)',
 description:'Close monitoring untuk treatment response & adverse effects',
 items: [
 {
 id:'tb-month1-clinical',
 title:'Month 1 Clinical Assessment: Symptoms, Weight, Adherence',
 description:'Clinical improvement expected (↓cough, fever, night sweats) within 2-4 weeks. Weight gain (good prognostic sign). Adherence check (pill count, DOT records). Side effects screening',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-month2-sputum',
 title:'Month 2 Sputum Smear/Culture (End Intensive Phase)',
 description:'CRITICAL: sputum smear should be negative by month 2 in 80-90% patients. If STILL positive → extend intensive phase OR investigate resistance/adherence. Culture conversion slower (3-4 months)',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-hepatotoxicity-monitoring',
 title:'Hepatotoxicity Monitoring (AST, ALT, Bilirubin)',
 description:'RIF + INH + PZA hepatotoxic. Baseline, then q2-4 weeks (or PRN symptoms). STOP drugs if: ALT >5x ULN asymptomatic OR >3x ULN symptomatic (jaundice, nausea, RUQ pain). Rechallenge protocol',
 required: true,
 category:'safety'
 },
 {
 id:'tb-visual-acuity',
 title:'Visual Acuity & Color Vision (Ethambutol Optic Neuropathy)',
 description:'Ethambutol can cause optic neuritis (dose >15mg/kg, >2 months, renal impairment). Monthly: visual acuity, red-green color discrimination. STOP if vision changes',
 required: true,
 category:'safety'
 },
 {
 id:'tb-peripheral-neuropathy',
 title:'Peripheral Neuropathy Screening (Isoniazid)',
 description:'Numbness/tingling feet/hands (stocking-glove). INH-induced (pyridoxine prevents). Check sensation, reflexes. Risk: DM, HIV, alcohol, malnutrition. Increase pyridoxine dose',
 required: false,
 category:'assessment'
 },
 {
 id:'tb-uric-acid',
 title:'Uric Acid Monitoring (Pyrazinamide-Induced Hyperuricemia)',
 description:'PZA ↑uric acid (most patients asymptomatic). Symptomatic gout rare. Check baseline + monthly. Allopurinol if gout. Continue PZA if possible (important drug)',
 required: false,
 category:'assessment'
 },
 {
 id:'tb-adherence-support',
 title:'Adherence Support & Barrier Assessment',
 description:'Identify barriers: side effects, stigma, transport, cost. Patient-centered approach. Treatment supporter involvement. Phone reminders. Incentives (conditional cash transfer)',
 required: true,
 category:'action'
 }
 ]
 },

'tb-continuation-phase-monitoring': {
 id:'tb-continuation-phase-monitoring',
 type:'checklist',
 title:'Continuation Phase Monitoring (Months 3-6)',
 description:'Monthly follow-up untuk ensure treatment completion',
 items: [
 {
 id:'tb-month3-assessment',
 title:'Month 3 Assessment: Clinical Response, Sputum',
 description:'Should be asymptomatic. Weight gain. Sputum smear negative (if not, investigate). Switch to continuation phase (4RH) if month 2 smear negative',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-month5-sputum',
 title:'Month 5 Sputum Smear/Culture (Pre-End Treatment)',
 description:'Should be negative. If POSITIVE month 5 = Treatment Failure → suspect drug resistance, non-adherence. GeneXpert repeat, culture DST. May need MDR-TB regimen',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-month6-completion',
 title:'Month 6 Treatment Completion Assessment',
 description:'Final sputum smear/culture (should be negative). CXR (residual changes - cavities may persist). Clinical cure (asymptomatic, weight gain). Declare treatment outcome',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-monthly-lft',
 title:'Monthly LFT Monitoring (Continue Hepatotoxicity Surveillance)',
 description:'RIF + INH hepatotoxic throughout treatment. Monthly AST/ALT (or PRN symptoms). Elderly, alcohol, HBV/HCV at higher risk',
 required: false,
 category:'safety'
 },
 {
 id:'tb-dot-verification',
 title:'DOT Adherence Verification (Monthly Pill Count)',
 description:'Verify DOT observer compliance. Pill count (should match expected consumption). Urine rifampicin test (orange color within 2h of dose = recent intake). Address non-adherence early',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-side-effects-management',
 title:'Side Effects Management (Ongoing)',
 description:'GI upset (take with food), rash (antihistamines, monitor for SJS), arthralgias (PZA - NSAIDs), orange discoloration (reassure). STOP drugs if severe: hepatitis, SJS, visual changes, severe rash',
 required: true,
 category:'safety'
 },
 {
 id:'tb-psychosocial-support',
 title:'Psychosocial Support & Stigma Reduction',
 description:'TB stigma major barrier (isolation, discrimination, job loss). Peer support groups. Mental health screening (depression common). Family education',
 required: false,
 category:'action'
 }
 ]
 },

'tb-treatment-outcome-decision': {
 id:'tb-treatment-outcome-decision',
 type:'decision',
 title:'TB Treatment Outcome Classification (WHO Definitions)',
 description:'Classify treatment outcome - Cured, Completed, Failed, Lost to Follow-up, Died',
 warningLevel:'warning',
 branches: [
 {
 id:'tb-cured',
 title:'CURED (Best Outcome)',
 description:'Smear-positive at diagnosis + negative smear/culture at end treatment & ≥1 previous occasion. Treatment completed successfully',
 icon:'',
 color:'green',
 nextNodeId:'tb-cure-followup',
 riskLevel:'low'
 },
 {
 id:'tb-treatment-completed',
 title:'Treatment Completed',
 description:'Completed full course without bacteriological confirmation of cure (smear-negative at diagnosis OR no follow-up smear). Clinically well',
 icon:'',
 color:'blue',
 nextNodeId:'tb-cure-followup',
 riskLevel:'low'
 },
 {
 id:'tb-treatment-failure',
 title:'Treatment Failure (Persistent Positive Smear Month 5)',
 description:'Smear positive at month 5 OR later during treatment. Suspect drug resistance OR non-adherence → GeneXpert, DST, MDR-TB regimen',
 icon:'',
 color:'red',
 nextNodeId:'tb-treatment-failure-management',
 riskLevel:'high'
 },
 {
 id:'tb-ltfu',
 title:'Lost to Follow-Up (LTFU) / Default',
 description:'Interrupted treatment ≥2 consecutive months. Major cause treatment failure & drug resistance. Needs tracing, re-engagement',
 icon:'',
 color:'orange',
 nextNodeId:'tb-ltfu-management',
 riskLevel:'high'
 }
 ]
 },

'tb-dr-treatment-initiation': {
 id:'tb-dr-treatment-initiation',
 type:'checklist',
 title:'Drug-Resistant TB Treatment (RR/MDR/XDR-TB)',
 description:'Second-line drugs - Longer duration (9-20 months), more toxic, expensive',
 items: [
 {
 id:'tb-dr-classification',
 title:'DR-TB Classification: RR, MDR, Pre-XDR, XDR',
 description:'RR-TB: RIF resistance. MDR-TB: RIF + INH resistance. Pre-XDR: MDR + fluoroquinolone OR injectable. XDR: Pre-XDR + both FQ & injectable. Worse prognosis (cure rate 50-70% vs 85% DS-TB)',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-dr-dst-comprehensive',
 title:'Comprehensive Drug Susceptibility Testing (All Second-Line Drugs)',
 description:'Culture + DST: fluoroquinolones (levofloxacin, moxifloxacin), injectables (amikacin, kanamycin), linezolid, bedaquiline, clofazimine. Guides individualized regimen',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-bpal-regimen',
 title:'BPaL Regimen (WHO 2022 - All Oral, 6-9 Months for MDR-TB)',
 description:'Bedaquiline + Pretomanid + Linezolid (+ moxifloxacin). Shorter duration (6-9 months vs 18-20 months). All oral. High cure rate (90%). Linezolid toxicity (neuropathy, bone marrow)',
 required: false,
 category:'medication'
 },
 {
 id:'tb-longer-mdr-regimen',
 title:'Longer MDR-TB Regimen (18-20 Months): Group A+B+C Drugs',
 description:'WHO grouping: A (levofloxacin/moxifloxacin, bedaquiline, linezolid), B (clofazimine, cycloserine/terizidone), C (ethambutol, pyrazinamide, amikacin). Individualized based on DST',
 required: false,
 category:'medication'
 },
 {
 id:'tb-dr-baseline-tests',
 title:'Baseline Tests: ECG (QTc), Audiometry, Thyroid, Electrolytes, Pregnancy',
 description:'Bedaquiline + FQ prolong QTc (arrhythmia risk). Audiometry (aminoglycosides ototoxic). TSH (PAS affects thyroid). K+, Mg2+ (correct before bedaquiline). Pregnancy test (teratogenic drugs)',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-dr-counseling',
 title:'Extensive Counseling: Long Treatment, Side Effects, Cure Rate',
 description:'DR-TB treatment challenging: 18-20 months (or 6-9 BPaL), more pills, worse side effects, cure rate lower (50-70%). Depression common. Adherence CRITICAL. Support system',
 required: true,
 category:'action'
 },
 {
 id:'tb-dr-isolation',
 title:'Infection Control: Extended Isolation (Until Culture Negative)',
 description:'DR-TB infectious longer (culture conversion 3-6 months). Negative pressure room. N95 mask. Separate household if possible. Contact tracing + IPT controversial',
 required: true,
 category:'safety'
 },
 {
 id:'tb-dr-specialist-referral',
 title:'DR-TB Specialist Referral (Programmatic Management)',
 description:'Refer to DR-TB program/specialist. Complex regimen design, toxicity management, surgery consideration (lobectomy for localized disease). Case conference',
 required: true,
 category:'action'
 }
 ]
 },

'tb-hiv-management': {
 id:'tb-hiv-management',
 type:'checklist',
 title:'TB-HIV Co-infection Management',
 description:'Dual therapy: TB treatment + ART - Timing critical to prevent IRIS',
 items: [
 {
 id:'tb-hiv-art-timing',
 title:'ART Initiation Timing (Within 2-8 Weeks of TB Treatment)',
 description:'CD4 <50: start ART within 2 weeks (↓mortality 30-40%). CD4 >50: start ART within 8 weeks. TB meningitis: DELAY ART 8 weeks (IRIS risk). Earlier ART = better survival',
 required: true,
 category:'medication'
 },
 {
 id:'tb-hiv-art-regimen',
 title:'ART Regimen Selection (Rifampicin Interactions!)',
 description:'Rifampicin induces CYP450 (↓ART levels). Preferred: TDF + 3TC/FTC + EFV (or DTG 50mg BID). AVOID: Nevirapine (hepatotoxic with TB drugs), PI (drug levels ↓). Adjust doses',
 required: true,
 category:'medication'
 },
 {
 id:'tb-hiv-cotrimoxazole',
 title:'Cotrimoxazole Prophylaxis (Prevent Opportunistic Infections)',
 description:'Trimethoprim-sulfamethoxazole 960mg daily (or 3x/week). Prevents PCP, toxoplasmosis, bacterial infections. Continue throughout TB treatment + ongoing if CD4 <200. Well-tolerated',
 required: true,
 category:'medication'
 },
 {
 id:'tb-hiv-iris-risk',
 title:'IRIS Risk Assessment & Recognition (Immune Reconstitution Inflammatory Syndrome)',
 description:'IRIS: paradoxical worsening 2-8 weeks post-ART (fever, lymph node enlargement, worsening CXR). Incidence 10-30% TB-HIV. Risk: low CD4, high VL, early ART. Differentiate from treatment failure',
 required: true,
 category:'safety'
 },
 {
 id:'tb-hiv-iris-management',
 title:'IRIS Management (Continue ART + TB Drugs, Add Steroids)',
 description:'CONTINUE both ART & TB treatment (do NOT stop). NSAIDs for mild IRIS. Prednisone 0.5-1mg/kg/day for severe IRIS (taper 4-6 weeks). Aspiration if lymph node abscess. Hospitalization if severe',
 required: false,
 category:'action'
 },
 {
 id:'tb-hiv-cd4-vl-monitoring',
 title:'CD4 Count & Viral Load Monitoring',
 description:'Baseline CD4 + VL. Repeat CD4 q3-6 months. VL at 6 months (should be undetectable). CD4 rise expected with ART (immune recovery). VL suppression = good adherence',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-hiv-adherence-dual',
 title:'Dual Adherence Support (TB + ART Pills = High Burden)',
 description:'Pill burden high (5-10 pills daily). Timing challenges (rifampicin empty stomach, EFV bedtime). DOT for TB, ART self-administered. Adherence counseling. Pill organizers',
 required: true,
 category:'action'
 },
 {
 id:'tb-hiv-hepatotoxicity-risk',
 title:'Increased Hepatotoxicity Risk (TB Drugs + NVP/EFV)',
 description:'TB drugs + Nevirapine = very high hepatotoxicity (AVOID). EFV safer. Monitor LFT closely (baseline, q2 weeks x 2 months, then monthly). Alcohol cessation. HBV/HCV screening',
 required: true,
 category:'safety'
 }
 ]
 },

'tb-treatment-failure-management': {
 id:'tb-treatment-failure-management',
 type:'checklist',
 title:'TB Treatment Failure Management',
 description:'Persistent positive smear month 5 - Investigate resistance & adherence',
 items: [
 {
 id:'tb-failure-definition',
 title:'Treatment Failure Definition (Bacteriological)',
 description:'Sputum smear positive at month 5 OR later. OR culture positive at month 5 OR later. Indicates: drug resistance, non-adherence, extensive disease, immunosuppression',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-failure-genexpert-repeat',
 title:'Repeat GeneXpert MTB/RIF (Detect Rifampicin Resistance)',
 description:'Fresh sputum specimen. RIF resistance detected = acquired resistance (treatment-induced). Switch to MDR-TB regimen URGENTLY. Culture + DST for all drugs',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-failure-adherence-assessment',
 title:'Adherence Assessment (Major Cause Treatment Failure)',
 description:'Detailed history: missed doses, DOT compliance, pill count. Urine rifampicin test. Barriers: side effects, stigma, cost, transport. If non-adherent → intensify DOT, address barriers',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-failure-hiv-test',
 title:'HIV Testing (if Not Done OR Repeat if Previously Negative)',
 description:'Undiagnosed HIV major cause treatment failure. Window period. Recent exposure. CD4 count if positive. Start ART',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-failure-malabsorption',
 title:'Assess Malabsorption (Diarrhea, GI Disease, HIV Enteropathy)',
 description:'Chronic diarrhea (HIV, parasites). Malabsorption ↓drug levels. Rifampicin levels can be measured. Consider IV/IM drugs. Treat underlying cause',
 required: false,
 category:'assessment'
 },
 {
 id:'tb-failure-switch-regimen',
 title:'Switch to Second-Line Regimen (Do NOT Add Single Drug)',
 description:'NEVER add single drug (creates further resistance). Switch to full second-line regimen (≥4 new drugs). MDR-TB regimen. Specialist consultation',
 required: true,
 category:'medication'
 },
 {
 id:'tb-failure-surgery-consider',
 title:'Consider Surgery (Adjunct - Localized Cavitary Disease)',
 description:'Lobectomy/pneumonectomy for localized disease with persistent cavity. After ≥2 months bacteriological conversion on second-line drugs. Reduces bacterial burden, ↓relapse. Specialist decision',
 required: false,
 category:'action'
 }
 ]
 },

'tb-cure-followup': {
 id:'tb-cure-followup',
 type:'checklist',
 title:'Treatment Completion & Post-TB Follow-up',
 description:'Cure achieved - Long-term monitoring & prevention',
 items: [
 {
 id:'tb-cure-definition',
 title:'Confirm Cure (Bacteriological + Clinical)',
 description:'Negative sputum smear/culture end of treatment. Asymptomatic. Weight gain. CXR stable/improved. Treatment outcome reported to TB program',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-post-treatment-cxr',
 title:'Post-Treatment CXR (Baseline for Future Comparison)',
 description:'Final CXR often shows residual changes: fibrosis, calcification, volume loss. Cavities may persist (sterile). Baseline for future (differentiate old vs new if symptoms recur)',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-relapse-counseling',
 title:'Relapse Risk Counseling (5-10% DS-TB, Higher MDR-TB)',
 description:'Relapse risk 5-10% within 2 years (most within 6-12 months). Higher risk: cavitary disease, delayed smear conversion, HIV, DM, malnutrition. Return if symptoms recur',
 required: true,
 category:'documentation'
 },
 {
 id:'tb-annual-followup',
 title:'Annual Follow-up (Year 1-2 Post-Treatment)',
 description:'Annual visit x 2 years: symptoms screen, CXR. Earlier if symptoms. Relapse treated as new episode (GeneXpert + culture DST - may have acquired resistance)',
 required: true,
 category:'documentation'
 },
 {
 id:'tb-lung-function-assessment',
 title:'Lung Function Assessment (Spirometry - If Extensive Disease)',
 description:'Post-TB lung disease (fibrosis, bronchiectasis) common. Dyspnea, ↓exercise tolerance. Spirometry: obstructive (bronchiectasis) OR restrictive (fibrosis) pattern. Pulmonary rehab',
 required: false,
 category:'assessment'
 },
 {
 id:'tb-contact-screening-completion',
 title:'Household Contact Screening Completion',
 description:'Ensure ALL household contacts screened. Children <5y completed IPT (6 months isoniazid). Adult contacts: symptoms, CXR, TST/IGRA. Treat LTBI if indicated',
 required: true,
 category:'action'
 },
 {
 id:'tb-infection-prevention-education',
 title:'TB Prevention Education (Future)',
 description:'Avoid close contact with active TB patients. Cough etiquette. Seek early care if symptoms. Maintain good nutrition, treat comorbidities (HIV, DM). NOT immune after cure (can get TB again)',
 required: true,
 category:'documentation'
 },
 {
 id:'tb-certificate-cure',
 title:'Treatment Completion Certificate (Employment, School)',
 description:'Provide official certificate: diagnosis, treatment dates, outcome (cured/completed). Needed for return to work/school. Non-infectious after 2 weeks treatment',
 required: true,
 category:'documentation'
 }
 ]
 },

'tb-ltfu-management': {
 id:'tb-ltfu-management',
 type:'checklist',
 title:'Lost to Follow-Up (LTFU) / Default Management',
 description:'Patient tracing & re-engagement - CRITICAL to prevent resistance',
 items: [
 {
 id:'tb-ltfu-definition',
 title:'LTFU Definition (Interrupted ≥2 Consecutive Months)',
 description:'Did not collect medications for ≥2 months. Major problem (10-20% patients). Causes treatment failure, drug resistance, transmission',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-ltfu-tracing',
 title:'Patient Tracing (Phone, Home Visit, Community Volunteer)',
 description:'Immediate action when missed appointment. Phone calls (multiple attempts). Home visit (community health worker). Contact family/emergency contact. Address in TB register',
 required: true,
 category:'action'
 },
 {
 id:'tb-ltfu-barriers-assessment',
 title:'Assess Barriers to Treatment (Why Patient Stopped)',
 description:'Common reasons: side effects (not addressed), feeling better (lack understanding), stigma, cost (transport, lost wages), moved residence, drug/alcohol use. Patient-centered approach',
 required: true,
 category:'assessment'
 },
 {
 id:'tb-ltfu-re-engagement',
 title:'Re-engagement Strategies (Non-Judgmental Approach)',
 description:'Motivational interviewing. Address barriers. Simplified regimen (daily vs 3x/week). Transport vouchers. Food packages. Flexible clinic hours. Decentralized DOT',
 required: true,
 category:'action'
 },
 {
 id:'tb-ltfu-restart-protocol',
 title:'Treatment Restart Protocol (Sputum Re-Check + Resistance Testing)',
 description:'Sputum smear + GeneXpert (check if still positive, acquired resistance). If negative + short interruption (<2 months) → complete original regimen. If positive + long default → restart from beginning',
 required: true,
 category:'medication'
 },
 {
 id:'tb-ltfu-enhanced-dot',
 title:'Enhanced DOT (Daily Observation, Reduced Self-Administration)',
 description:'High-risk patient for repeat default. Daily DOT (not 3x/week). Community-based DOT (home visits). Video DOT (smartphone app - record daily intake). Incentives',
 required: true,
 category:'action'
 },
 {
 id:'tb-ltfu-program-notification',
 title:'Notify TB Program (Update Treatment Card)',
 description:'Update TB register: outcome = LTFU (treatment interrupted). If re-engaged → new treatment card. Track patterns (quality improvement)',
 required: true,
 category:'documentation'
 }
 ]
 }
 }
 },

 // STROKE ISCHEMIC - AHA/ASA 2019 + ESO 2021 + PERDOSSI 2020 + Time is Brain
'stroke-iskemik': {
 diseaseId:'stroke-iskemik',
 diseaseName:'Stroke Iskemik',
 startNodeId:'stroke-emergency-assessment',
 nodes: {
'stroke-emergency-assessment': {
 id:'stroke-emergency-assessment',
 type:'checklist',
 title:'Stroke Emergency Assessment - TIME IS BRAIN!',
 description:'Rapid evaluation - Target: Door-to-Needle <60 min for IV tPA',
 items: [
 {
 id:'stroke-time-last-well',
 title:'Time Last Known Well (CRITICAL!) - Onset to Door Time',
 description:'EXACT time patient last seen normal (not time found!). IV tPA window: <4.5h. Thrombectomy window: <24h LVO. Wake-up stroke: use FLAIR/DWI mismatch. Document precisely (hh:mm)',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-fast-screen',
 title:'FAST Screen (Face-Arm-Speech-Time) - Prehospital Recognition',
 description:'F=Facial droop (smile asymmetry). A=Arm drift (raise both arms, one drifts). S=Speech slurred (repeat sentence). T=Time (call ambulance ASAP). Sensitivity 85% for stroke',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-vital-signs',
 title:'Vital Signs: BP, HR, RR, SpO2, Temp, Glucose (STAT!)',
 description:'BP often elevated (permissive hypertension - do NOT lower acutely unless >185/110 for tPA). Glucose critical (hypo/hyperglycemia mimics stroke). Temp (infection screen). SpO2 (maintain >94%)',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-nihss',
 title:'NIH Stroke Scale (NIHSS) Score - Severity Assessment',
 description:'Standardized neurological exam (0-42 points). 0=no deficit, 1-4=minor, 5-15=moderate, 16-20=moderate-severe, >20=severe. Predicts outcome. Document baseline for follow-up',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-neuro-exam',
 title:'Focused Neurological Exam: Hemiparesis, Aphasia, Visual Field Defect',
 description:'Lateralizing signs (L vs R hemisphere). Aphasia (Broca=expressive, Wernicke=receptive). Neglect. Gaze preference. Cranial nerve palsies. Cerebellar signs (posterior circulation)',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-exclude-mimics',
 title:'Exclude Stroke Mimics (Hypoglycemia, Seizure, Migraine, Conversion)',
 description:'Check glucose STAT (hypo <50 mg/dL common mimic). Post-ictal Todd paresis. Hemiplegic migraine. Functional disorder. PRES. Hypotension',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-airway-protection',
 title:'Airway Protection Assessment (GCS, Gag Reflex, Aspiration Risk)',
 description:'GCS <8-9 → intubation. Bulbar palsy (dysphagia, dysarthria). NBM until swallow assessment. Aspiration risk. Lateral position if ↓consciousness',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-iv-access',
 title:'IV Access x2 Large Bore (18G) - Blood Draw Simultaneously',
 description:'Two IV lines (one for tPA if eligible). Draw labs DURING cannulation (save time). Normal saline 0.9%. Avoid dextrose (hyperglycemia worsens outcome)',
 required: true,
 category:'action'
 },
 {
 id:'stroke-head-position',
 title:'Head Position: Flat OR 30° (Optimize Cerebral Perfusion)',
 description:'Flat (0°) may ↑cerebral blood flow. 30° head-up if aspiration risk, ↑ICP suspected. Avoid extreme head rotation',
 required: false,
 category:'action'
 },
 {
 id:'stroke-notify-team',
 title:'Activate Stroke Team (Neurologist, Radiology, Lab) - CODE STROKE',
 description:'Immediate neurology consult. Alert CT scan (priority). Notify lab (STAT results). Pharmacy (tPA). Stroke unit bed. Multidisciplinary response',
 required: true,
 category:'action'
 }
 ]
 },

'stroke-diagnostic-workup': {
 id:'stroke-diagnostic-workup',
 type:'checklist',
 title:'Stroke Diagnostic Workup - CT Brain & Labs',
 description:'Essential tests untuk differentiate ischemic vs hemorrhagic & assess tPA eligibility',
 items: [
 {
 id:'stroke-ct-brain-noncontrast',
 title:'CT Brain Non-Contrast (URGENT! - Within 25 min)',
 description:'Rule OUT hemorrhage (contraindication tPA). Early ischemic signs: loss grey-white differentiation, hyperdense MCA sign, insular ribbon. ASPECTS score. Normal CT early ischemic stroke common!',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-cta-head-neck',
 title:'CT Angiography (CTA) Head & Neck (if Thrombectomy Candidate)',
 description:'Identify large vessel occlusion (LVO): ICA, M1/M2 MCA, basilar. Thrombectomy benefit if LVO + <24h. Evaluate collaterals. Can do WITH non-contrast CT',
 required: false,
 category:'assessment'
 },
 {
 id:'stroke-labs-cbc',
 title:'CBC (Hemoglobin, Platelet, WBC)',
 description:'Anemia (↓oxygen delivery worsens stroke). Thrombocytopenia <100k (contraindication tPA). Polycythemia. Leukocytosis',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-coagulation-profile',
 title:'Coagulation: PT/INR, aPTT (tPA Contraindication if Abnormal)',
 description:'INR >1.7 contraindication tPA (warfarin). aPTT >40s (heparin). DOAC <48h → contraindication unless levels negative',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-glucose-stat',
 title:'Glucose (STAT! - Finger Stick & Lab)',
 description:'Hypoglycemia <50 mg/dL = mimic (TREAT D50 IV). Hyperglycemia >180 worsens outcome (insulin). Target 140-180 acutely',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-renal-electrolytes',
 title:'Renal Function & Electrolytes (Creatinine, Na, K)',
 description:'Creatinine (CTA contrast safety). Hyponatremia. CKD baseline',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-cardiac-markers',
 title:'Cardiac Biomarkers: Troponin, BNP (if Cardioembolic)',
 description:'Troponin: MI (stroke-heart syndrome). BNP: AF, heart failure (embolic source). ECG abnormalities post-stroke common',
 required: false,
 category:'assessment'
 },
 {
 id:'stroke-ecg',
 title:'ECG 12-Lead (Atrial Fibrillation - 1 Cardioembolic Cause)',
 description:'AF (15-20% ischemic strokes). Acute MI. QTc. Rhythm monitoring (telemetry) for paroxysmal AF',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-cxr',
 title:'Chest X-Ray (Aspiration Risk, Cardiomegaly)',
 description:'Baseline for aspiration pneumonia. Cardiomegaly. Pulmonary edema. NOT urgent (defer)',
 required: false,
 category:'assessment'
 },
 {
 id:'stroke-mri-brain',
 title:'MRI Brain DWI/FLAIR (Alternative to CT - More Sensitive)',
 description:'DWI detects ischemia within minutes. DWI-FLAIR mismatch = wake-up stroke <4.5h (tPA eligible). Slower than CT',
 required: false,
 category:'assessment'
 }
 ]
 },

'stroke-thrombolysis-decision': {
 id:'stroke-thrombolysis-decision',
 type:'decision',
 title:'IV Thrombolysis Eligibility Decision (tPA)',
 description:'Time-critical - IV Alteplase within 4.5 hours',
 warningLevel:'critical',
 branches: [
 {
 id:'stroke-tpa-eligible',
 title:'IV tPA ELIGIBLE (Within 4.5h, No Contraindications)',
 description:'Onset <4.5h, disabling deficit, no hemorrhage, INR <1.7, platelets >100k, BP <185/110 → PROCEED thrombolysis',
 icon:'',
 color:'green',
 nextNodeId:'stroke-tpa-protocol',
 riskLevel:'high'
 },
 {
 id:'stroke-thrombectomy-only',
 title:'Mechanical Thrombectomy (LVO, 6-24h Window)',
 description:'LVO on CTA + <24h + salvageable tissue (ASPECTS ≥6) → Thrombectomy (skip tPA if >4.5h)',
 icon:'',
 color:'orange',
 nextNodeId:'stroke-thrombectomy-protocol',
 riskLevel:'high'
 },
 {
 id:'stroke-medical-management',
 title:'Standard Medical Management',
 description:'Outside window OR contraindications → Antiplatelet, supportive care, secondary prevention',
 icon:'',
 color:'blue',
 nextNodeId:'stroke-acute-management',
 riskLevel:'medium'
 }
 ]
 },

'stroke-tpa-protocol': {
 id:'stroke-tpa-protocol',
 type:'checklist',
 title:'IV Alteplase (tPA) Thrombolysis Protocol',
 description:'Time-critical - Target Door-to-Needle <60 minutes',
 items: [
 {
 id:'stroke-tpa-contraindications-check',
 title:'FINAL Contraindications Check',
 description:'Absolute: ICH, recent stroke <3mo, major surgery <14d, GI bleed <21d, BP >185/110 refractory. Relative: minor stroke (NIHSS <4), seizure at onset',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-informed-consent',
 title:'Informed Consent (Risks: ICH 6%, Benefit: 30% Better Outcome)',
 description:'Discuss 6% ICH risk, 30% ↑good outcome. Emergency: proceed without consent if unavailable',
 required: true,
 category:'documentation'
 },
 {
 id:'stroke-bp-control-pre-tpa',
 title:'BP Control <185/110 mmHg (BEFORE tPA)',
 description:'Labetalol 10-20mg IV q10min (max 300mg). OR Nicardipine 5mg/h IV (↑2.5mg/h q5-15min, max 15mg/h)',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-tpa-dose-calculation',
 title:'Alteplase Dose: 0.9 mg/kg IV (Maximum 90 mg)',
 description:'Total 0.9 mg/kg (NOT 1 mg/kg). Max 90 mg. Example: 70kg = 63mg total. 10% bolus + 90% infusion over 60 min',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-tpa-bolus',
 title:'10% Bolus IV Push Over 1 Minute (STAT!)',
 description:'Example: 70kg = 6.3mg bolus IV over 1 min. Document Door-to-Needle time',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-tpa-infusion',
 title:'90% Infusion Over 60 Minutes (IV Pump)',
 description:'Remaining 90% over exactly 60 min. Dedicated line. Monitor continuously',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-tpa-monitoring-neuro',
 title:'Neuro Checks q15min During & 2h Post-Infusion',
 description:'NIHSS q15min, then q30min x6h, q1h x16h. Watch for sudden worsening (ICH). Severe headache = ICH until proven otherwise',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-tpa-bp-monitoring',
 title:'Strict BP Monitoring: q15min x2h, q30min x6h, q1h x16h',
 description:'Target <180/105 mmHg post-tPA (24h). Labetalol/nicardipine if elevated',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-no-antiplatelets-24h',
 title:'NO Antiplatelet/Anticoagulant x 24h Post-tPA',
 description:'NO aspirin, clopidogrel, heparin x 24h (↑bleeding). Defer until 24h CT confirms no ICH',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-ct-brain-24h',
 title:'Repeat CT Brain 24h Post-tPA (Rule Out ICH)',
 description:'Routine 24h CT. Earlier if deterioration, headache, ↑BP. ICH: supportive, reversal, neurosurgery',
 required: true,
 category:'assessment'
 }
 ]
 },

'stroke-thrombectomy-protocol': {
 id:'stroke-thrombectomy-protocol',
 type:'checklist',
 title:'Mechanical Thrombectomy Protocol (LVO)',
 description:'Endovascular clot retrieval - Time critical',
 items: [
 {
 id:'stroke-thrombectomy-criteria',
 title:'Thrombectomy Eligibility (AHA/ASA 2019)',
 description:'LVO (ICA, M1 MCA, basilar) on CTA. NIHSS ≥6. Pre-stroke mRS 0-1. ASPECTS ≥6 (0-6h) OR perfusion-selected (6-24h). Groin puncture <6h ideal',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-thrombectomy-consent',
 title:'Informed Consent (Risks: ICH, Dissection, Groin Hematoma)',
 description:'Discuss 5-10% ICH, dissection, groin complications. Benefit: 30-50% ↑good outcome (NNT=3-5!)',
 required: true,
 category:'documentation'
 },
 {
 id:'stroke-dual-antiplatelet-loading',
 title:'Consider DAPT Loading (ASA 300mg + Clopidogrel 300mg)',
 description:'Some centers give DAPT before thrombectomy. Controversial (↑bleeding?). Discuss with interventionalist',
 required: false,
 category:'medication'
 },
 {
 id:'stroke-thrombectomy-general-anesthesia',
 title:'Anesthesia: Conscious Sedation vs General',
 description:'Conscious sedation preferred (faster, better outcome). GA if agitation, airway compromise. Avoid hypotension',
 required: true,
 category:'action'
 },
 {
 id:'stroke-thrombectomy-procedure',
 title:'Endovascular: Stent-Retriever OR Aspiration',
 description:'Femoral access. Stent-retriever (Solitaire, Trevo) OR aspiration (ADAPT). TICI 2b-3 = success. Average 3 passes',
 required: true,
 category:'action'
 },
 {
 id:'stroke-post-thrombectomy-monitoring',
 title:'Post-Procedure Monitoring: Neuro, Groin, BP',
 description:'Neuro q15min x2h, q1h x6h. Groin checks. BP <180/105 x24h. ICU. Bed rest 6h',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-post-thrombectomy-imaging',
 title:'Post-Thrombectomy CT 24h (ICH Surveillance)',
 description:'Routine 24h CT. HT common (10-20%). PH-2 = symptomatic ICH',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-antiplatelet-post-thrombectomy',
 title:'Antiplatelet Post-Thrombectomy (After 24h CT)',
 description:'If no ICH → aspirin 100mg OR DAPT (if stent). Continue indefinitely',
 required: true,
 category:'medication'
 }
 ]
 },

'stroke-acute-management': {
 id:'stroke-acute-management',
 type:'checklist',
 title:'Acute Stroke Unit Management (First 72h)',
 description:'Supportive care - Stroke Unit ↓mortality 20%',
 items: [
 {
 id:'stroke-unit-admission',
 title:'Stroke Unit Admission (Specialized Multidisciplinary)',
 description:'Stroke unit ↓mortality 20%, ↓disability. Trained nurses, early mobilization, swallow screen, PT. Better than general ward',
 required: true,
 category:'action'
 },
 {
 id:'stroke-bp-permissive-hypertension',
 title:'BP: Permissive Hypertension (Unless >220/120)',
 description:'DO NOT lower acutely (↓perfusion). Target <220/120 (unless tPA - then <180/105). Exception: dissection, MI, pulmonary edema',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-glucose-control',
 title:'Glucose Control: 140-180 mg/dL',
 description:'Hyperglycemia >180 worsens outcome. Hypoglycemia <70 mimics stroke. Insulin sliding scale. Monitor q4-6h',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-temperature-control',
 title:'Treat Fever >37.5°C (Paracetamol, Cooling)',
 description:'Fever worsens outcome. Paracetamol 1g q6h. Cooling if >38.5°C. Investigate source (pneumonia, UTI, DVT)',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-oxygen-therapy',
 title:'Oxygen: Target SpO2 94-98% (Avoid Hyperoxia)',
 description:'O2 ONLY if <94%. Hyperoxia >98% may worsen (vasoconstriction). Room air if adequate',
 required: true,
 category:'action'
 },
 {
 id:'stroke-npo-swallow-screen',
 title:'NPO Until Swallow Screen (Aspiration Prevention)',
 description:'Dysphagia 40-70%. Water swallow test. SLP evaluation. Modified diet OR NG tube. Aspiration pneumonia 1 early death',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-dvt-prophylaxis',
 title:'DVT Prophylaxis: Enoxaparin 40mg SC (24-48h Post)',
 description:'Immobilization → DVT 10%. LMWH 24h post-stroke (48h if large). Contraindication: HT, large infarct, HTN. SCDs alternative',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-head-turning',
 title:'Head Turning q2h & Early Mobilization',
 description:'Pressure ulcer risk. Turn q2h. Air mattress. Mobilize 24-48h if stable. Passive ROM',
 required: true,
 category:'action'
 },
 {
 id:'stroke-bladder-management',
 title:'Bladder: Avoid Foley (UTI Risk)',
 description:'Intermittent catheterization preferred. Condom catheter. Bladder scan. Foley only if refractory retention',
 required: false,
 category:'action'
 },
 {
 id:'stroke-bowel-regimen',
 title:'Bowel Regimen (Prevent Constipation)',
 description:'Stool softeners (docusate), laxatives (senna). High fiber. Hydration. Monitor daily',
 required: false,
 category:'medication'
 }
 ]
 },

'stroke-secondary-prevention': {
 id:'stroke-secondary-prevention',
 type:'checklist',
 title:'Secondary Stroke Prevention (Long-term)',
 description:'Prevent recurrence - Risk 10-15% first year without treatment',
 items: [
 {
 id:'stroke-antiplatelet-choice',
 title:'Antiplatelet (After 24h CT if tPA OR Immediate)',
 description:'Aspirin 100-300mg daily. OR Clopidogrel 75mg. DAPT x21-90d if minor stroke/TIA (POINT/CHANCE) then aspirin alone',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-anticoagulation-afib',
 title:'Anticoagulation for AF (DOAC Preferred)',
 description:'AF stroke → anticoagulation MANDATORY (↓70%). DOAC: apixaban 5mg BID, rivaroxaban 20mg OD, dabigatran 150mg BID. Warfarin alternative (INR 2-3). Start 4-14d post',
 required: false,
 category:'medication'
 },
 {
 id:'stroke-statin-high-intensity',
 title:'High-Intensity Statin (Atorvastatin 80mg OR Rosuvastatin 20mg)',
 description:'ALL ischemic stroke. SPARCL: atorvastatin 80mg ↓recurrence 16%. Target LDL <70 mg/dL',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-bp-control-chronic',
 title:'BP Control: <140/90 mmHg (130/80 if DM)',
 description:'ACE-I/ARB first-line (perindopril, ramipril). Add CCB or thiazide. Gradual titration. Home monitoring',
 required: true,
 category:'medication'
 },
 {
 id:'stroke-diabetes-control',
 title:'Diabetes: HbA1c <7% (SGLT2i/GLP1-RA Preferred)',
 description:'DM ↑stroke 2-4x. SGLT2i (empagliflozin) or GLP-1 (semaglutide) - CV benefits. Metformin first-line',
 required: false,
 category:'medication'
 },
 {
 id:'stroke-smoking-cessation',
 title:'Smoking Cessation (↓Recurrence 50%)',
 description:'Smoking ↑stroke 2-4x. Counseling + NRT OR varenicline."Teachable moment". Referral',
 required: true,
 category:'action'
 },
 {
 id:'stroke-carotid-imaging',
 title:'Carotid Ultrasound (Assess Stenosis → CEA/CAS)',
 description:'Symptomatic stenosis >50% → CEA/CAS. Optimal 2 weeks post. Asymptomatic >70% controversial',
 required: true,
 category:'assessment'
 },
 {
 id:'stroke-echo-cardioembolic',
 title:'Echo (TTE ± TEE) - Cardioembolic Source',
 description:'TTE: LV thrombus, akinetic, valve. TEE: PFO, atrial thrombus, aortic atheroma. Young <50y high yield',
 required: false,
 category:'assessment'
 },
 {
 id:'stroke-pfo-closure',
 title:'PFO Closure (Cryptogenic Age <60 with Large Shunt)',
 description:'Cryptogenic + PFO + large shunt + age <60 → closure ↓recurrence (RESPECT, CLOSE, REDUCE)',
 required: false,
 category:'action'
 },
 {
 id:'stroke-lifestyle-modification',
 title:'Lifestyle: Exercise, Mediterranean Diet, Weight Loss, Alcohol Limit',
 description:'Mediterranean diet ↓stroke 30%. Exercise 150 min/week. Weight loss BMI >25. Alcohol ≤1-2 drinks/day. OSA screening',
 required: true,
 category:'action'
 }
 ]
 },

'stroke-complications-monitoring': {
 id:'stroke-complications-monitoring',
 type:'checklist',
 title:'Stroke Complications Recognition',
 description:'Monitor life-threatening & disabling complications',
 items: [
 {
 id:'stroke-comp-hemorrhagic-transformation',
 title:'Hemorrhagic Transformation (HT) - Bleeding into Infarct',
 description:'10-40% (higher tPA, large, cardioembolic). HI (benign), PH (symptomatic). Sudden worsening. CT emergent. Reverse anticoagulation',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-comp-cerebral-edema',
 title:'Cerebral Edema & ↑ICP (Large MCA)',
 description:'Malignant MCA: >50% territory, peaks day 2-5, 80% mortality. Signs: ↓GCS, pupil, Cushing. Management: head-up 30°, osmotherapy, decompressive hemicraniectomy (age <60, <48h)',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-comp-aspiration-pneumonia',
 title:'Aspiration Pneumonia (1 Early Death)',
 description:'Dysphagia 40-70%. Aspiration → bacterial pneumonia. Prevention: swallow screen, NBM, head-up. Treatment: antibiotics',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-comp-dvt-pe',
 title:'DVT & PE',
 description:'Immobility → DVT 10%. PE 1-2%. Prevention: LMWH, SCDs, mobilization. Diagnosis: d-dimer, Doppler, CTPA. Treatment: anticoagulation',
 required: true,
 category:'safety'
 },
 {
 id:'stroke-comp-seizures',
 title:'Post-Stroke Seizures (Early <7d OR Late Epilepsy)',
 description:'Early 2-5% (cortical, HT). Late epilepsy 5-10%. Do NOT prophylax. Treat if occurs: levetiracetam 500mg BID',
 required: false,
 category:'assessment'
 },
 {
 id:'stroke-comp-depression',
 title:'Post-Stroke Depression (30-50%)',
 description:'Underdiagnosed. Impairs recovery, ↑mortality. Screen PHQ-9. SSRI (sertraline) + psychotherapy. Avoid TCAs',
 required: false,
 category:'assessment'
 },
 {
 id:'stroke-comp-shoulder-subluxation',
 title:'Hemiplegic Shoulder Pain & Subluxation',
 description:'Flaccid → subluxation. Painful. Prevention: sling, lapboard, positioning. PT, analgesia. Avoid overhead pulleys',
 required: false,
 category:'action'
 },
 {
 id:'stroke-comp-spasticity',
 title:'Spasticity (Weeks-Months Post)',
 description:'UMN → ↑tone, clonus. Contractures. Treatment: PT (stretching), baclofen, tizanidine, botulinum toxin',
 required: false,
 category:'assessment'
 }
 ]
 },

'stroke-rehabilitation-planning': {
 id:'stroke-rehabilitation-planning',
 type:'checklist',
 title:'Stroke Rehabilitation & Discharge',
 description:'Early intensive rehab ↑recovery - Neuroplasticity critical first 3 months',
 items: [
 {
 id:'stroke-rehab-early-mobilization',
 title:'Early Mobilization (24-48h if Stable)',
 description:'Sit → chair → stand → walk. PT daily. Prevents DVT, pneumonia, contractures. Very early <24h controversial (AVERT)',
 required: true,
 category:'action'
 },
 {
 id:'stroke-rehab-multidisciplinary',
 title:'Multidisciplinary Team (PT, OT, SLP, Nursing, Psychology)',
 description:'PT (mobility, gait). OT (ADLs, fine motor). SLP (aphasia, dysphagia). Nursing (bladder, bowel). Psychology (depression)',
 required: true,
 category:'action'
 },
 {
 id:'stroke-rehab-goals',
 title:'Goal-Directed Rehab (SMART Goals)',
 description:'Patient-centered goals. Walk 50 feet, dress independently, speak 10-word sentences. Monitor (Barthel, FIM). Adjust weekly. Family involvement',
 required: true,
 category:'action'
 },
 {
 id:'stroke-rehab-constraint-induced',
 title:'Constraint-Induced Movement Therapy (CIMT) - Hemiplegic Arm',
 description:'Restraint unaffected arm → forced use 6h/day x2 weeks. Intensive task training. ↑motor recovery. Requires some hand function',
 required: false,
 category:'action'
 },
 {
 id:'stroke-rehab-aphasia',
 title:'Aphasia Therapy (SLP)',
 description:'Broca (expressive): speech production. Wernicke (receptive): comprehension. Intensive 3-5h/week. Computer programs. Family education',
 required: false,
 category:'action'
 },
 {
 id:'stroke-rehab-dysphagia',
 title:'Dysphagia Therapy & Modified Diet',
 description:'Swallow exercises (Mendelsohn, effortful swallow). Compensatory strategies (chin tuck). Thickened liquids, soft/minced foods. Progress as safe',
 required: false,
 category:'action'
 },
 {
 id:'stroke-discharge-disposition',
 title:'Discharge Disposition (Home, IRF, SNF, LTAC)',
 description:'Home (independent + support). IRF (3h therapy/day). SNF (nursing + moderate rehab). LTAC (medically complex)',
 required: true,
 category:'documentation'
 },
 {
 id:'stroke-home-modifications',
 title:'Home Modifications & DME',
 description:'Home eval (OT). Grab bars, raised toilet, shower bench, ramps. DME: walker, wheelchair, hospital bed. Remove fall hazards',
 required: true,
 category:'action'
 },
 {
 id:'stroke-caregiver-education',
 title:'Caregiver Training & Support',
 description:'Transfer techniques. Medication management. Recognize warnings. Respite care. Support groups. Burnout screening',
 required: true,
 category:'documentation'
 },
 {
 id:'stroke-driving-assessment',
 title:'Driving Assessment (If Returning)',
 description:'Visual defects, neglect, impaired judgment → unsafe. Formal evaluation (OT, behind-wheel). State laws. Alternative transportation',
 required: false,
 category:'documentation'
 },
 {
 id:'stroke-followup-neurology',
 title:'Neurology Follow-up (2-4 Weeks, Then q3-6 Months)',
 description:'Assess recovery, adherence, risk factors (BP, glucose, lipids). Adjust prevention. Monitor complications. Imaging if worsening',
 required: true,
 category:'documentation'
 }
 ]
 }
 }
 }
};