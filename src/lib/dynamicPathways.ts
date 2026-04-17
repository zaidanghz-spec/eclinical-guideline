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
import { fibrilasiAtriumPathway } from './pathways/fibrilasi-atrium';
import { otitisEksternaPathway } from './pathways/otitis-eksterna';
import { konjungtivitisPathway } from './pathways/konjungtivitis';
import { ispaPathway } from './pathways/ispa';
import { tuberkulosisPathway } from './pathways/tuberkulosis';
import { pneumoniaPathway } from './pathways/pneumonia-komunitas';
import { reaksiAlergiPathway } from './pathways/reaksi-alergi';
import { aritmiPathway } from './pathways/aritmia';
import { sprainStrainPathway } from './pathways/sprain-strain';
import { myalgiaPathway } from './pathways/myalgia';
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
 'hipertensi-dewasa': hipertensiPathway,

 // ACUTE KIDNEY INJURY (AKI) - KDIGO Guidelines
 'acute-kidney-injury': acuteKidneyInjuryPathway,
  'myalgia': myalgiaPathway,
  'intoksikasi-kimia': intoksikasiKimiaPathway,

 // DIABETES MELITUS TIPE 2 - PNPK 2020 & PERKENI 2021
 'diabetes-melitus': diabetesMelitusPathway,

 // DISPEPSIA & H. PYLORI - PGI 2021
 'dispepsia': dispepsiaPathway,

 // REAKSI GIGITAN SERANGGA - Kemenkes RI 2022/2023
 'reaksi-gigitan-serangga': insectBitePathway,

 // DIARE AKUT & KRONIK - PGI 2024
 'acute-gastroenteritis': diareDewasaPathway,

 // SUPRAVENTRICULAR TACHYCARDIA (TaSuV) - merged ke pathway aritmia komprehensif
 // Tetap gunakan key 'svt' agar backward compatible
 'svt': aritmiPathway,

 // FIBRILASI ATRIUM NON-VALVULAR - PERKI/InaHRS → merged ke pathway aritmia komprehensif
 'arrhythmias': aritmiPathway,

 // OTITIS EKSTERNA - KMK 1186/2022 + PERHATI-KL + AAO-HNSF 2014
 'otitis-eksterna': otitisEksternaPathway,

 // KONJUNGTIVITIS AKUT - KMK 1186/2022 + AAO PPP 2023
 'konjungtivitis': konjungtivitisPathway,

 // SPRAIN DAN STRAIN - KMK 1186/2022 + Ottawa Rules + PRICE Protocol
 'sprain-strain': sprainStrainPathway,

 // REAKSI ALERGI AKUT & URTIKARIA - PNPK Anafilaksis + EAACI/WAO
 'reaksi-alergi': reaksiAlergiPathway,

 // BENIGN PAROXYSMAL POSITIONAL VERTIGO (BPPV) - PPK Neurologi PERDOSSI 2023
 // Imported from separate file (14 nodes, 9 checklist + 5 decision)
'vertigo': bppvPathway,

 // NYERI KEPALA TIPE TEGANG (TTH) - PPK Neurologi PERDOSSI 2023 + ICHD-3
 // Imported from separate file, severity-based branching (Infrequent/Frequent/Chronic)
'tension-type-headache': tthPathway,

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

   'ispa': ispaPathway
,


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


 // RHEUMATOID ARTHRITIS (RA) - ACR/EULAR 2010 + EULAR 2019 + ACR 2021 + Treat-to-Target Strategy


 // COMMUNITY-ACQUIRED PNEUMONIA (CAP) - ATS/IDSA 2019 + BTS 2019 + WHO 2022 + PPK Indonesia
'pneumonia-komunitas': pneumoniaPathway,

 // TUBERKULOSIS PARU - WHO 2022 + PPK Indonesia + ISTC 2022 + End TB Strategy
'tuberkulosis-paru': tuberkulosisPathway,

 // STROKE ISCHEMIC - AHA/ASA 2019 + ESO 2021 + PERDOSSI 2020 + Time is Brain

};