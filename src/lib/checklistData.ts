export interface ChecklistItem {
  id: string;
  text: string;
  required: boolean;
  notes?: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface PathwayChecklist {
  diseaseId: string;
  diseaseName: string;
  sections: ChecklistSection[];
}

export const pathwayChecklists: PathwayChecklist[] = [
  {
    diseaseId: 'acs',
    diseaseName: 'Sindrom Koroner Akut (ACS)',
    sections: [
      {
        id: 'assessment',
        title: 'Assessment Awal',
        items: [
          { id: 'abc', text: 'ABC stabilisasi - Airway, Breathing, Circulation terkontrol', required: true },
          { id: 'vitalsign', text: 'Vital signs tercatat (TD, nadi, RR, SpO2, suhu)', required: true },
          { id: 'ivaccess', text: 'Akses IV terpasang minimal 1 line', required: true },
          { id: 'monitor', text: 'Cardiac monitor & pulse oximetry terpasang', required: true },
          { id: 'allergies', text: 'Riwayat alergi obat ditanyakan dan dicatat', required: true },
        ],
      },
      {
        id: 'diagnostics',
        title: 'Diagnostik',
        items: [
          { id: 'ekg', text: 'EKG 12-lead dilakukan dalam <10 menit dari kedatangan', required: true },
          { id: 'troponin', text: 'Troponin baseline diambil (0 jam)', required: true },
          { id: 'cbc', text: 'CBC, elektrolit, fungsi ginjal, gula darah diperiksa', required: true },
          { id: 'coag', text: 'PT/aPTT baseline (sebelum antikoagulan)', required: true },
          { id: 'xray', text: 'Foto thorax PA (jika hemodinamik stabil)', required: false },
        ],
      },
      {
        id: 'risk-stratification',
        title: 'Stratifikasi Risiko',
        items: [
          { id: 'stemi-check', text: 'Klasifikasi ACS: STEMI vs NSTEMI/UAP berdasarkan EKG', required: true },
          { id: 'killip', text: 'Killip classification dinilai (I-IV)', required: true },
          { id: 'grace', text: 'GRACE score dihitung untuk NSTEMI (jika applicable)', required: false },
          { id: 'contraindication', text: 'Kontraindikasi reperfusi therapy diperiksa', required: true },
        ],
      },
      {
        id: 'treatment',
        title: 'Terapi',
        items: [
          { id: 'aspirin', text: 'Aspirin 160-320mg (kunyah) diberikan', required: true },
          { id: 'p2y12', text: 'P2Y12 inhibitor (Clopidogrel 600mg atau Ticagrelor) diberikan', required: true },
          { id: 'anticoag', text: 'Antikoagulan (Heparin/Fondaparinux) diberikan sesuai protokol', required: true },
          { id: 'nitrate', text: 'Nitrogliserin SL diberikan (jika tidak ada kontraindikasi)', required: false },
          { id: 'morphine', text: 'Morfin 2-4mg IV untuk kontrol nyeri (jika diperlukan)', required: false },
          { id: 'oxygen', text: 'O2 suplementasi jika SpO2 <94%', required: true },
          { id: 'reperfusion', text: 'Reperfusion strategy (PCI/Fibrinolisis) dilakukan sesuai waktu', required: true },
          { id: 'betablocker', text: 'Beta-blocker oral dimulai (jika tidak ada kontraindikasi)', required: true },
          { id: 'acei', text: 'ACE-I/ARB dimulai dalam 24 jam (terutama jika anterior MI/EF rendah)', required: true },
          { id: 'statin', text: 'High-intensity statin (Atorvastatin 80mg) dimulai', required: true },
        ],
      },
      {
        id: 'monitoring',
        title: 'Monitoring & Follow-up',
        items: [
          { id: 'icu-admit', text: 'Pasien di-admit ke CCU/ICCU', required: true },
          { id: 'troponin-serial', text: 'Troponin serial (0, 3, 6 jam) direncanakan', required: true },
          { id: 'complications', text: 'Monitoring komplikasi: aritmia, HF, mechanical complications', required: true },
          { id: 'echo', text: 'Echocardiography direncanakan untuk assess EF dan komplikasi', required: true },
          { id: 'rehab', text: 'Cardiac rehabilitation dan secondary prevention direncanakan', required: false },
        ],
      },
    ],
  },
  {
    diseaseId: 'stroke',
    diseaseName: 'Stroke Iskemik',
    sections: [
      {
        id: 'assessment',
        title: 'Assessment Awal',
        items: [
          { id: 'onset-time', text: 'WAKTU ONSET atau "last known well time" DICATAT dengan PASTI', required: true },
          { id: 'abc', text: 'ABC stabilisasi - Pertimbangkan intubasi jika GCS <8', required: true },
          { id: 'vitals', text: 'Vital signs: TD, nadi, RR, SpO2, suhu, GCS tercatat', required: true },
          { id: 'glucose', text: 'Fingerstick glucose segera diperiksa (exclude hipoglikemia)', required: true },
          { id: 'nihss', text: 'NIHSS score dinilai untuk severity assessment', required: true },
        ],
      },
      {
        id: 'diagnostics',
        title: 'Diagnostik',
        items: [
          { id: 'ct-scan', text: 'CT Brain non-kontras STAT dilakukan dalam <25 menit', required: true },
          { id: 'cbc', text: 'CBC, elektrolit, fungsi ginjal, gula darah diperiksa', required: true },
          { id: 'coag', text: 'PT/INR, aPTT diperiksa (penting untuk rtPA checklist)', required: true },
          { id: 'ekg', text: 'EKG 12-lead (screen untuk AF dan cardiac source)', required: true },
          { id: 'cta', text: 'CTA/MRA jika kandidat thrombectomy (onset <24 jam, LVO suspek)', required: false },
        ],
      },
      {
        id: 'risk-stratification',
        title: 'Klasifikasi & Eligibility',
        items: [
          { id: 'hemorrhage-exclude', text: 'Perdarahan intrakranial dieksklusi dari CT', required: true },
          { id: 'rtpa-window', text: 'Onset <4.5 jam confirmed untuk eligibility rtPA', required: true },
          { id: 'rtpa-checklist', text: 'Checklist kriteria inklusi & kontraindikasi rtPA dilengkapi', required: true },
          { id: 'bp-control', text: 'TD dikontrol <185/110 mmHg (syarat rtPA)', required: true },
        ],
      },
      {
        id: 'treatment',
        title: 'Terapi',
        items: [
          { id: 'rtpa', text: 'rtPA (Alteplase 0.9mg/kg) diberikan jika eligible', required: false },
          { id: 'antiplatelet', text: 'Aspirin 160-325mg jika TIDAK diberi rtPA (tunggu 24 jam post-rtPA)', required: true },
          { id: 'bp-management', text: 'Manajemen TD sesuai protokol (permissive hypertension vs kontrol agresif)', required: true },
          { id: 'glucose-control', text: 'Kontrol gula darah 140-180 mg/dL', required: true },
          { id: 'temperature', text: 'Kontrol demam (target normothermia)', required: true },
          { id: 'thrombectomy', text: 'Mechanical thrombectomy jika LVO dan eligible (<24 jam)', required: false },
        ],
      },
      {
        id: 'monitoring',
        title: 'Monitoring & Komplikasi',
        items: [
          { id: 'neuro-monitoring', text: 'Neuro checks ketat (q15min x 2h, q30min x 6h, q1h x 16h)', required: true },
          { id: 'icu-stroke', text: 'Admit ke Stroke Unit / ICU', required: true },
          { id: 'ct-24h', text: 'CT Brain ulang 24 jam post rtPA (sebelum antiplatelet)', required: true },
          { id: 'swallow-screen', text: 'Swallow screening sebelum PO (aspiration risk)', required: true },
          { id: 'dvt-prophylaxis', text: 'DVT prophylaxis (pneumatic compression / LMWH)', required: true },
          { id: 'rehab', text: 'Early mobilization & stroke rehabilitation direncanakan', required: true },
        ],
      },
    ],
  },
  {
    diseaseId: 'dengue',
    diseaseName: 'Demam Berdarah Dengue (DBD)',
    sections: [
      {
        id: 'assessment',
        title: 'Assessment & Diagnosis',
        items: [
          { id: 'fever-history', text: 'Demam tinggi mendadak 2-7 hari', required: true },
          { id: 'hemorrhagic', text: 'Manifestasi perdarahan (petechiae, epistaksis, gusi berdarah, dll)', required: true },
          { id: 'tourniquet', text: 'Tourniquet test dilakukan (positif jika ≥10 petechiae per 2.5cm²)', required: false },
          { id: 'vitals', text: 'Vital signs: TD, nadi, RR, suhu, capillary refill time', required: true },
        ],
      },
      {
        id: 'diagnostics',
        title: 'Pemeriksaan Lab',
        items: [
          { id: 'cbc', text: 'CBC lengkap: Hb, Ht, trombosit, leukosit', required: true },
          { id: 'ns1', text: 'Dengue NS1 antigen atau IgM/IgG rapid test', required: true },
          { id: 'baseline-ht', text: 'Hematokrit baseline dicatat (untuk monitor hemokonsentrasi)', required: true },
          { id: 'renal-liver', text: 'Ureum/kreatinin, SGOT/SGPT, Albumin', required: true },
        ],
      },
      {
        id: 'risk-stratification',
        title: 'Klasifikasi & Warning Signs',
        items: [
          { id: 'who-criteria', text: 'Klasifikasi DHF grade I-IV berdasarkan WHO criteria', required: true },
          { id: 'warning-signs', text: 'Periksa WARNING SIGNS: nyeri perut, muntah persisten, letargi, Ht naik + plt turun', required: true },
          { id: 'shock-check', text: 'Assess tanda SHOCK: pulse pressure <20, hipotensi, akral dingin, oliguria', required: true },
          { id: 'phase', text: 'Tentukan fase penyakit: febrile / critical (day 3-7) / recovery', required: true },
        ],
      },
      {
        id: 'treatment',
        title: 'Terapi Cairan',
        items: [
          { id: 'iv-access', text: 'Akses IV terpasang (minimal 1 line, 2 jika shock)', required: true },
          { id: 'fluid-shock', text: 'Jika SHOCK: Bolus RL/NaCl 20ml/kg dalam 15-30 menit', required: false },
          { id: 'fluid-warning', text: 'Jika WARNING SIGNS tanpa shock: Maintenance 5-7 ml/kg/jam', required: false },
          { id: 'monitor-ht', text: 'Monitor Ht serial tiap 4-6 jam (marker plasma leakage)', required: true },
          { id: 'urine-output', text: 'Target urine output >0.5 ml/kg/jam', required: true },
          { id: 'colloid', text: 'Pertimbangkan colloid jika shock persisten setelah 2-3 crystalloid bolus', required: false },
        ],
      },
      {
        id: 'monitoring',
        title: 'Monitoring & Transfusi',
        items: [
          { id: 'vitals-frequent', text: 'Vital signs monitoring ketat (tiap 1-4 jam sesuai severity)', required: true },
          { id: 'plt-transfusion', text: 'Transfusi trombosit HANYA jika perdarahan aktif + plt <50,000', required: false },
          { id: 'overhidrasi', text: 'Watch for overhidrasi: respiratory distress, pulmonary edema', required: true },
          { id: 'recovery-phase', text: 'Fase recovery: KURANGI IV fluid (diuresis = tanda recovery)', required: true },
          { id: 'discharge-criteria', text: 'Kriteria pulang: afebrile >48h, Ht stabil, plt >50k trending up, no distress', required: true },
        ],
      },
    ],
  },
];

// Alias for backward compatibility
export const checklists = pathwayChecklists;

// Pathway validation logic
export const pathwayValidation = {
  validateChecklist: (checkedItems: Record<string, boolean>, checklist: PathwayChecklist) => {
    const allItems = checklist.sections.flatMap(s => s.items);
    const requiredItems = allItems.filter(i => i.required);
    const requiredChecked = requiredItems.filter(item => checkedItems[item.id]);
    
    return {
      isComplete: allItems.every(item => checkedItems[item.id]),
      allRequiredCompleted: requiredItems.every(item => checkedItems[item.id]),
      completionPercentage: (Object.keys(checkedItems).filter(k => checkedItems[k]).length / allItems.length) * 100,
      missingRequired: requiredItems.filter(item => !checkedItems[item.id]),
    };
  },
};
