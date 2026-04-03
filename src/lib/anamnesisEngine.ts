import { diseases } from './diseases';

export interface AnamnesisData {
  onset: {
    when: string;
    suddenGradual: string;
    activity: string;
  };
  provocation: {
    worsenedBy: string[];
    relievedBy: string[];
  };
  quality: {
    description: string;
    type: string[];
  };
  region: {
    location: string;
    radiation: string[];
  };
  severity: {
    scale: number;
    impact: string;
  };
  time: {
    duration: string;
    pattern: string;
    frequency: string;
  };
}

export interface PathwaySuggestion {
  diseaseId: string;
  diseaseName: string;
  probability: number;
  matchedCriteria: string[];
  additionalQuestions: string[];
}

export function calculateCompletion(data: AnamnesisData): number {
  const fields = [
    data.onset.when,
    data.onset.suddenGradual,
    data.provocation.worsenedBy.length > 0,
    data.provocation.relievedBy.length > 0,
    data.quality.description,
    data.quality.type.length > 0,
    data.region.location,
    data.severity.scale > 0,
    data.severity.impact,
    data.time.duration,
    data.time.pattern,
  ];

  const filledFields = fields.filter(Boolean).length;
  return (filledFields / fields.length) * 100;
}

export function generateSuggestions(data: AnamnesisData): PathwaySuggestion[] {
  const suggestions: PathwaySuggestion[] = [];

  // Combine all user input into searchable text
  const searchText = [
    data.onset.when,
    data.onset.suddenGradual,
    data.onset.activity,
    ...data.provocation.worsenedBy,
    ...data.provocation.relievedBy,
    data.quality.description,
    ...data.quality.type,
    data.region.location,
    ...data.region.radiation,
    data.severity.impact,
    data.time.duration,
    data.time.pattern,
    data.time.frequency,
  ].join(' ').toLowerCase();

  diseases.forEach(disease => {
    let score = 0;
    const matched: string[] = [];
    const questions: string[] = [];

    // ========================================
    // KEYWORD MATCHING - Match disease keywords with user input
    // ========================================
    const keywordMatches = disease.keywords.filter(keyword => 
      searchText.includes(keyword.toLowerCase())
    );
    
    if (keywordMatches.length > 0) {
      const keywordScore = keywordMatches.length * 15;
      score += keywordScore;
      matched.push(`Keyword match: ${keywordMatches.join(', ')}`);
    }

    // ========================================
    // ONSET ANALYSIS
    // ========================================
    if (data.onset.suddenGradual === 'sudden') {
      if (['acs', 'stroke-iskemik', 'pulmonary-embolism', 'seizures', 'acute-appendicitis', 'dka', 'hypoglycemia', 'thyroid-storm', 'adrenal-crisis', 'asthma-exacerbation'].includes(disease.id)) {
        score += 15;
        matched.push('Onset mendadak (sesuai dengan ' + disease.name + ')');
      }
    }

    if (data.onset.suddenGradual === 'gradual') {
      if (['heart-failure', 'pneumonia-komunitas', 'tuberkulosis-paru', 'copd-exacerbation', 'diabetes-melitus-tipe-2', 'rheumatoid-arthritis'].includes(disease.id)) {
        score += 10;
        matched.push('Onset bertahap/gradual');
      }
    }

    // ========================================
    // SEVERITY ANALYSIS
    // ========================================
    if (data.severity.scale >= 7) {
      if (disease.isEmergency) {
        score += 10;
        matched.push('Severity tinggi → kemungkinan kondisi emergency');
      }
    }

    if (data.severity.scale >= 1 && data.severity.scale <= 4) {
      if (!disease.isEmergency) {
        score += 5;
        matched.push('Severity ringan-sedang');
      }
    }

    // ========================================
    // QUALITY ANALYSIS - Pain Character
    // ========================================
    
    // Crushing/Pressure pain → Cardiac
    if (data.quality.type.includes('crushing') || data.quality.type.includes('pressure') || 
        searchText.includes('tertekan') || searchText.includes('ditekan')) {
      if (['acs', 'pulmonary-embolism'].includes(disease.id)) {
        score += 20;
        matched.push('Nyeri tipe crushing/pressure → suspect cardiac');
      }
    }

    // Sharp pain → Pleuritic, Appendicitis
    if (data.quality.type.includes('sharp') || searchText.includes('tajam') || searchText.includes('menusuk')) {
      if (['acute-appendicitis', 'pneumonia-komunitas', 'pulmonary-embolism'].includes(disease.id)) {
        score += 12;
        matched.push('Nyeri tajam/sharp');
      }
    }

    // Burning pain → GI issues
    if (data.quality.type.includes('burning') || searchText.includes('terbakar') || searchText.includes('panas')) {
      if (['upper-gi-bleeding', 'acute-pancreatitis'].includes(disease.id)) {
        score += 15;
        matched.push('Nyeri terbakar → suspect GI');
      }
    }

    // Throbbing/Pulsating → Headache, Migraine, Meningitis
    if (searchText.includes('berdenyut') || searchText.includes('throbbing') || searchText.includes('pulsating')) {
      if (['meningitis', 'hypertensive-crisis'].includes(disease.id)) {
        score += 12;
        matched.push('Nyeri berdenyut');
      }
    }

    // ========================================
    // REGION ANALYSIS - Location
    // ========================================
    
    // Chest pain
    const hasChestPain = data.region.location.toLowerCase().includes('chest') || 
        data.region.location.toLowerCase().includes('dada');
    
    if (hasChestPain) {
      if (['acs', 'heart-failure', 'pulmonary-embolism', 'pneumonia-komunitas', 'asthma-exacerbation'].includes(disease.id)) {
        score += 15;
        matched.push('Lokasi nyeri dada');
      }
    }

    // Radiation to arm/jaw → ACS
    if (data.region.radiation.some(r => 
        r.toLowerCase().includes('arm') || 
        r.toLowerCase().includes('lengan') ||
        r.toLowerCase().includes('jaw') ||
        r.toLowerCase().includes('rahang'))) {
      if (disease.id === 'acs') {
        score += 20;
        matched.push('Radiasi ke lengan/rahang → highly suspicious for ACS');
      }
    }

    // Abdominal pain
    if (searchText.includes('abdomen') || searchText.includes('perut') || searchText.includes('abdominal')) {
      if (['acute-gastroenteritis', 'acute-appendicitis', 'upper-gi-bleeding', 'acute-pancreatitis', 'typhoid-fever'].includes(disease.id)) {
        score += 15;
        matched.push('Nyeri abdomen/perut');
      }
    }

    // Right lower quadrant → Appendicitis
    if (searchText.includes('right lower') || searchText.includes('kanan bawah') || searchText.includes('mcburney')) {
      if (disease.id === 'acute-appendicitis') {
        score += 30;
        matched.push(' RLQ pain (McBurney) → HIGHLY SUSPECT APPENDICITIS!');
      }
    }

    // Epigastric pain → Pancreatitis, GI bleeding
    if (searchText.includes('epigastric') || searchText.includes('ulu hati') || searchText.includes('upper abdomen')) {
      if (['acute-pancreatitis', 'upper-gi-bleeding'].includes(disease.id)) {
        score += 20;
        matched.push('Epigastric pain');
      }

      // Radiating to back → Pancreatitis
      if (searchText.includes('back') || searchText.includes('punggung')) {
        if (disease.id === 'acute-pancreatitis') {
          score += 25;
          matched.push('Epigastric → back radiation → suspect Pancreatitis');
        }
      }
    }

    // Headache
    if (searchText.includes('head') || searchText.includes('kepala') || searchText.includes('sakit kepala')) {
      if (['meningitis', 'hypertensive-crisis', 'stroke-iskemik'].includes(disease.id)) {
        score += 12;
        matched.push('Sakit kepala');
      }
    }

    // Leg pain/swelling → DVT
    if (searchText.includes('leg') || searchText.includes('kaki') || searchText.includes('betis') || searchText.includes('calf')) {
      if (disease.id === 'dvt') {
        score += 20;
        matched.push('Nyeri/bengkak kaki → suspect DVT');
      }
    }

    // Joint pain → Arthritis
    if (searchText.includes('joint') || searchText.includes('sendi') || searchText.includes('arthritis')) {
      if (['rheumatoid-arthritis', 'polymyalgia-rheumatica'].includes(disease.id)) {
        score += 18;
        matched.push('Nyeri sendi');
      }

      // Morning stiffness → RA, PMR
      if (searchText.includes('morning stiffness') || searchText.includes('kaku pagi')) {
        if (['rheumatoid-arthritis', 'polymyalgia-rheumatica'].includes(disease.id)) {
          score += 22;
          matched.push('Morning stiffness → suspect RA/PMR');
        }
      }

      // Symmetric joints → RA
      if (searchText.includes('symmetric') || searchText.includes('simetris')) {
        if (disease.id === 'rheumatoid-arthritis') {
          score += 20;
          matched.push('Symmetric arthritis → suspect RA');
        }
      }

      // Shoulder/hip in elderly → PMR
      if ((searchText.includes('shoulder') || searchText.includes('hip') || searchText.includes('bahu')) &&
          (searchText.includes('elderly') || searchText.includes('lansia') || searchText.includes('>60'))) {
        if (disease.id === 'polymyalgia-rheumatica') {
          score += 25;
          matched.push('Shoulder/hip pain in elderly → suspect PMR');
        }
      }
    }

    // ========================================
    // PROVOCATION ANALYSIS
    // ========================================
    
    // Worsened by exertion → Cardiac
    if (data.provocation.worsenedBy.some(p => 
        p.toLowerCase().includes('exertion') || 
        p.toLowerCase().includes('aktivitas') ||
        p.toLowerCase().includes('exercise'))) {
      if (['acs', 'heart-failure', 'asthma-exacerbation'].includes(disease.id)) {
        score += 15;
        matched.push('Diperberat aktivitas → cardiac/respiratory origin');
      }
    }

    // Worsened by eating → GI
    if (searchText.includes('eating') || searchText.includes('makan') || searchText.includes('food')) {
      if (['upper-gi-bleeding', 'acute-pancreatitis', 'acute-gastroenteritis'].includes(disease.id)) {
        score += 12;
        matched.push('Diperberat makan → GI issue');
      }
    }

    // Relieved by rest → Cardiac angina
    if (data.provocation.relievedBy.some(p => 
        p.toLowerCase().includes('rest') || 
        p.toLowerCase().includes('istirahat'))) {
      if (['acs', 'heart-failure'].includes(disease.id)) {
        score += 10;
        matched.push('Membaik dengan istirahat');
      }
    }

    // Worsened by breathing → Pleuritic
    if (searchText.includes('breathing') || searchText.includes('napas') || searchText.includes('inspirasi')) {
      if (['pneumonia-komunitas', 'pulmonary-embolism', 'asthma-exacerbation'].includes(disease.id)) {
        score += 15;
        matched.push('Diperberat napas → pleuritic pain');
      }

      // Pleuritic pain + chest → UNLIKELY ACS
      if (hasChestPain && disease.id === 'acs') {
        score -= 20;
        matched.push(' Pleuritic chest pain → less likely ACS');
      }
    }

    // Worsened by position change → BPPV
    if (data.provocation.worsenedBy.some(p => 
        p.toLowerCase().includes('posisi') || 
        p.toLowerCase().includes('position') ||
        p.toLowerCase().includes('miring') ||
        p.toLowerCase().includes('menoleh') ||
        p.toLowerCase().includes('menengadah') ||
        p.toLowerCase().includes('berbaring') ||
        p.toLowerCase().includes('bangun') ||
        p.toLowerCase().includes('lying') ||
        p.toLowerCase().includes('turning'))) {
      if (disease.id === 'vertigo') {
        score += 30;
        matched.push('[HIGH] Diperberat perubahan posisi -- khas BPPV (PPK Neurologi 2023)');
      }
    }

    // Relieved by staying still → BPPV
    if (data.provocation.relievedBy.some(p => 
        p.toLowerCase().includes('diam') || 
        p.toLowerCase().includes('still') ||
        p.toLowerCase().includes('tidak bergerak'))) {
      if (disease.id === 'vertigo') {
        score += 15;
        matched.push('Membaik dengan tidak bergerak -- mendukung BPPV');
      }
    }

    // ========================================
    // TIME PATTERN ANALYSIS
    // ========================================
    
    // Acute onset (<1 hour)
    if (data.time.duration === '<1 hour' && data.onset.suddenGradual === 'sudden') {
      if (['acs', 'stroke-iskemik', 'pulmonary-embolism', 'seizures', 'hypoglycemia'].includes(disease.id)) {
        score += 10;
        matched.push('Onset akut <1 jam');
      }
    }

    // Chronic (>weeks) → Chronic diseases
    if (searchText.includes('weeks') || searchText.includes('months') || searchText.includes('kronik') || searchText.includes('chronic')) {
      if (['tuberkulosis-paru', 'copd-exacerbation', 'diabetes-melitus-tipe-2', 'heart-failure', 'rheumatoid-arthritis'].includes(disease.id)) {
        score += 12;
        matched.push('Gejala kronik');
      }
    }

    // Progressive pattern → TB, Heart Failure
    if (searchText.includes('progressive') || searchText.includes('progresif') || searchText.includes('semakin memburuk')) {
      if (['tuberkulosis-paru', 'heart-failure', 'copd-exacerbation'].includes(disease.id)) {
        score += 10;
        matched.push('Pola progresif');
      }
    }

    // ========================================
    // FEVER & INFECTIOUS DISEASES
    // ========================================
    
    const hasFever = searchText.includes('fever') || searchText.includes('demam');
    
    if (hasFever) {
      if (['pneumonia-komunitas', 'tuberkulosis-paru', 'meningitis', 'sepsis', 'dbd', 'malaria', 'typhoid-fever', 'covid-19', 'ispa', 'leptospirosis', 'acute-gastroenteritis'].includes(disease.id)) {
        score += 15;
        matched.push('Demam');
      }

      // High fever → DBD, Malaria, Typhoid, Sepsis
      if (searchText.includes('tinggi') || searchText.includes('high') || searchText.includes('39') || searchText.includes('40')) {
        if (['dbd', 'malaria', 'typhoid-fever', 'sepsis', 'meningitis'].includes(disease.id)) {
          score += 18;
          matched.push('Demam tinggi');
        }
      }

      // Prolonged fever → TB, Typhoid
      if (searchText.includes('prolonged') || searchText.includes('berkepanjangan') || searchText.includes('>1 week') || searchText.includes('minggu')) {
        if (['tuberkulosis-paru', 'typhoid-fever', 'hiv-opportunistic', 'malaria'].includes(disease.id)) {
          score += 20;
          matched.push('Demam berkepanjangan → suspect TB/Typhoid');
        }
      }

      // Stepladder fever → Typhoid
      if (searchText.includes('stepladder') || searchText.includes('naik bertahap')) {
        if (disease.id === 'typhoid-fever') {
          score += 30;
          matched.push(' Stepladder fever → HIGHLY SPECIFIC FOR TYPHOID!');
        }
      }

      // Periodic fever + chills → Malaria
      if (searchText.includes('periodic') || searchText.includes('chills') || searchText.includes('menggigil') || searchText.includes('rigor')) {
        if (disease.id === 'malaria') {
          score += 30;
          matched.push(' Periodic fever + chills → HIGHLY SUSPECT MALARIA!');
        }
      }

      // Fever + night sweats → TB
      if (searchText.includes('night sweat') || searchText.includes('keringat malam')) {
        if (['tuberkulosis-paru', 'hiv-opportunistic'].includes(disease.id)) {
          score += 22;
          matched.push('Fever + night sweats → suspect TB/HIV');
        }
      }

      // Fever + chest pain → Pneumonia, NOT cardiac
      if (hasChestPain) {
        if (['pneumonia-komunitas'].includes(disease.id)) {
          score += 20;
          matched.push('Fever + chest pain → suspect pneumonia');
        }
        if (['acs', 'heart-failure'].includes(disease.id)) {
          score -= 30;
          matched.push(' Fever + chest pain → less likely pure cardiac');
        }
      }
    }

    // ========================================
    // RESPIRATORY SYMPTOMS
    // ========================================

    // Dyspnea/Sesak napas
    if (searchText.includes('dyspnea') || searchText.includes('sesak') || searchText.includes('breathless') || searchText.includes('napas') || searchText.includes('shortness')) {
      if (['asthma-exacerbation', 'copd-exacerbation', 'heart-failure', 'pneumonia-komunitas', 'pulmonary-embolism', 'covid-19'].includes(disease.id)) {
        score += 15;
        matched.push('Sesak napas/dyspnea');
      }

      // Sudden dyspnea → PE, Asthma
      if (searchText.includes('sudden') || searchText.includes('mendadak') || searchText.includes('tiba-tiba')) {
        if (['pulmonary-embolism', 'asthma-exacerbation'].includes(disease.id)) {
          score += 22;
          matched.push('Sesak mendadak → suspect PE/Acute asthma');
        }
      }

      // Orthopnea → Heart Failure
      if (searchText.includes('orthopnea') || searchText.includes('worse lying') || searchText.includes('sulit tidur')) {
        if (disease.id === 'heart-failure') {
          score += 30;
          matched.push(' Orthopnea → HIGHLY SPECIFIC FOR HEART FAILURE!');
        }
      }

      // PND → Heart Failure
      if (searchText.includes('pnd') || searchText.includes('terbangun malam')) {
        if (disease.id === 'heart-failure') {
          score += 25;
          matched.push('PND → suspect Heart Failure');
        }
      }
    }

    // Wheezing → Asthma, COPD
    if (searchText.includes('wheezing') || searchText.includes('mengi') || searchText.includes('ngik')) {
      if (['asthma-exacerbation', 'copd-exacerbation'].includes(disease.id)) {
        score += 22;
        matched.push('Wheezing');
      }

      // Wheezing + allergen → Asthma
      if (searchText.includes('allergen') || searchText.includes('alergen') || searchText.includes('asap') || searchText.includes('debu')) {
        if (disease.id === 'asthma-exacerbation') {
          score += 18;
          matched.push('Wheezing + allergen → suspect Asthma');
        }
      }

      // Wheezing + smoking → COPD
      if (searchText.includes('smok') || searchText.includes('rokok') || searchText.includes('tobacco')) {
        if (disease.id === 'copd-exacerbation') {
          score += 18;
          matched.push('Wheezing + smoking → suspect COPD');
        }
      }
    }

    // Cough patterns
    const hasCough = searchText.includes('cough') || searchText.includes('batuk');
    
    if (hasCough) {
      if (['pneumonia-komunitas', 'tuberkulosis-paru', 'asthma-exacerbation', 'copd-exacerbation', 'covid-19', 'ispa'].includes(disease.id)) {
        score += 12;
        matched.push('Batuk');
      }

      // Chronic cough → TB, COPD
      if (searchText.includes('chronic') || searchText.includes('kronik') || searchText.includes('>2 week') || searchText.includes('>3 week')) {
        if (['tuberkulosis-paru', 'copd-exacerbation'].includes(disease.id)) {
          score += 20;
          matched.push('Batuk kronik (>2-3 weeks) → suspect TB/COPD');
        }
      }

      // Productive cough → Pneumonia, COPD, TB
      if (searchText.includes('productive') || searchText.includes('sputum') || searchText.includes('dahak') || searchText.includes('berdahak')) {
        if (['pneumonia-komunitas', 'copd-exacerbation', 'tuberkulosis-paru'].includes(disease.id)) {
          score += 15;
          matched.push('Batuk produktif/berdahak');
        }

        // Yellow/green sputum → Bacterial pneumonia
        if (searchText.includes('yellow') || searchText.includes('green') || searchText.includes('kuning') || searchText.includes('hijau')) {
          if (disease.id === 'pneumonia-komunitas') {
            score += 20;
            matched.push('Sputum kuning/hijau → suspect bacterial pneumonia');
          }
        }
      }

      // Hemoptysis → TB, PE
      if (searchText.includes('hemoptysis') || searchText.includes('batuk darah') || searchText.includes('darah')) {
        if (['tuberkulosis-paru', 'pulmonary-embolism'].includes(disease.id)) {
          score += 25;
          matched.push('Hemoptysis → suspect TB/PE');
        }
      }

      // Dry cough → Viral, COVID, Asthma
      if (searchText.includes('dry') || searchText.includes('kering')) {
        if (['covid-19', 'ispa', 'asthma-exacerbation'].includes(disease.id)) {
          score += 12;
          matched.push('Batuk kering');
        }
      }
    }

    // ========================================
    // NEUROLOGICAL SYMPTOMS
    // ========================================

    // STROKE-SPECIFIC (very specific!)
    if (searchText.includes('hemiparesis') || searchText.includes('hemiplegia') || searchText.includes('kelemahan satu sisi')) {
      if (disease.id === 'stroke-iskemik') {
        score += 35;
        matched.push(' Hemiparesis → HIGHLY SUSPECT STROKE!');
      }
    }

    if (searchText.includes('facial droop') || searchText.includes('wajah tidak simetris') || searchText.includes('senyum miring')) {
      if (disease.id === 'stroke-iskemik') {
        score += 35;
        matched.push(' Facial droop → HIGHLY SUSPECT STROKE!');
      }
    }

    if (searchText.includes('aphasia') || searchText.includes('bicara pelo') || searchText.includes('slurred speech')) {
      if (disease.id === 'stroke-iskemik') {
        score += 35;
        matched.push(' Aphasia → HIGHLY SUSPECT STROKE!');
      }
    }

    // FAST criteria
    const fastCriteria = [
      searchText.includes('facial droop') || searchText.includes('wajah tidak simetris'),
      searchText.includes('arm weakness') || searchText.includes('kelemahan lengan') || searchText.includes('hemiparesis'),
      searchText.includes('speech') || searchText.includes('bicara pelo'),
      searchText.includes('sudden') || searchText.includes('mendadak')
    ].filter(Boolean).length;

    if (fastCriteria >= 2 && disease.id === 'stroke-iskemik') {
      score += 50;
      matched.push(` FAST criteria (${fastCriteria}/4) → STROKE EMERGENCY!`);
    }

    // EXCLUDE stroke if fever
    if (hasFever && disease.id === 'stroke-iskemik') {
      score -= 35;
      matched.push(' Fever present → less likely stroke');
    }

    // General weakness
    if (searchText.includes('weakness') || searchText.includes('lemah')) {
      if (['stroke-iskemik', 'meningitis', 'sepsis', 'hypoglycemia'].includes(disease.id)) {
        score += 12;
        matched.push('Kelemahan');
      }
    }

    // Headache + stiff neck → Meningitis
    if ((searchText.includes('headache') || searchText.includes('sakit kepala')) &&
        (searchText.includes('stiff neck') || searchText.includes('kaku kuduk'))) {
      if (disease.id === 'meningitis') {
        score += 40;
        matched.push(' Severe headache + stiff neck → HIGHLY SUSPECT MENINGITIS!');
      }
    }

    // Photophobia → Meningitis
    if (searchText.includes('photophobia') || searchText.includes('silau') || searchText.includes('takut cahaya')) {
      if (disease.id === 'meningitis') {
        score += 20;
        matched.push('Photophobia → suspect Meningitis');
      }
    }

    // Dizziness - ONLY Vertigo/Hypertensive, NOT stroke
    if (searchText.includes('dizzy') || searchText.includes('pusing') || searchText.includes('dizziness')) {
      if (['vertigo', 'hypertensive-crisis'].includes(disease.id)) {
        score += 15;
        matched.push('Pusing/dizziness');
      }
      
      if (disease.id === 'stroke-iskemik' && !searchText.includes('hemiparesis') && !searchText.includes('weakness')) {
        score -= 25;
        matched.push(' Isolated dizziness without weakness → less likely stroke');
      }
    }

    // Vertigo (spinning) - BPPV specific analysis
    if (searchText.includes('spinning') || searchText.includes('berputar') || searchText.includes('vertigo')) {
      if (disease.id === 'vertigo') {
        score += 30;
        matched.push('[HIGH] Vertigo/sensasi berputar -- suspect BPPV');
      }
    }

    // BPPV-specific: Positional triggers
    if (searchText.includes('posisi') || searchText.includes('position') || searchText.includes('miring') || 
        searchText.includes('telentang') || searchText.includes('menoleh') || searchText.includes('menengadah') ||
        searchText.includes('berbaring') || searchText.includes('lying') || searchText.includes('rolling')) {
      if (disease.id === 'vertigo') {
        score += 25;
        matched.push('[HIGH] Vertigo posisional (dicetuskan perubahan posisi) -- khas BPPV');
      }
    }

    // BPPV: Short duration episodes
    if ((searchText.includes('singkat') || searchText.includes('brief') || searchText.includes('sebentar') || 
         searchText.includes('detik') || searchText.includes('seconds') || searchText.includes('<1 min')) &&
        (searchText.includes('pusing') || searchText.includes('vertigo') || searchText.includes('berputar'))) {
      if (disease.id === 'vertigo') {
        score += 20;
        matched.push('[HIGH] Episode vertigo singkat (<1 menit) -- khas BPPV (PPK Neurologi 2023)');
      }
    }

    // BPPV: Recurrent episodes
    if ((searchText.includes('berulang') || searchText.includes('recurrent') || searchText.includes('kambuh') || searchText.includes('episodik')) &&
        (searchText.includes('pusing') || searchText.includes('vertigo') || searchText.includes('berputar'))) {
      if (disease.id === 'vertigo') {
        score += 15;
        matched.push('Episode vertigo berulang -- suspect BPPV');
      }
    }

    // BPPV vs Meniere differentiation: NO hearing loss/tinnitus
    if ((searchText.includes('pusing') || searchText.includes('vertigo')) && 
        !searchText.includes('tinnitus') && !searchText.includes('hearing') && !searchText.includes('pendengaran') && !searchText.includes('telinga berdenging')) {
      if (disease.id === 'vertigo') {
        score += 10;
        matched.push('Vertigo tanpa gangguan pendengaran/tinnitus -- mendukung BPPV (bukan Meniere)');
      }
    }

    // BPPV: Nausea with positional vertigo
    if ((searchText.includes('mual') || searchText.includes('nausea') || searchText.includes('muntah')) &&
        (searchText.includes('pusing') || searchText.includes('vertigo') || searchText.includes('berputar'))) {
      if (disease.id === 'vertigo') {
        score += 12;
        matched.push('Mual/muntah menyertai vertigo -- umum pada BPPV');
      }
    }

    // BPPV exclusion: Continuous vertigo suggests vestibular neuritis, not BPPV
    if ((searchText.includes('terus menerus') || searchText.includes('continuous') || searchText.includes('konstan') || searchText.includes('constant')) &&
        (searchText.includes('pusing') || searchText.includes('vertigo'))) {
      if (disease.id === 'vertigo') {
        score -= 20;
        matched.push('[NOTE] Vertigo kontinu/terus-menerus -- kurang khas BPPV, pertimbangkan vestibular neuritis');
      }
    }

    // BPPV exclusion: Vertigo with hearing loss suggests Meniere
    if ((searchText.includes('pendengaran') || searchText.includes('hearing') || searchText.includes('tuli') || searchText.includes('deaf')) &&
        (searchText.includes('pusing') || searchText.includes('vertigo'))) {
      if (disease.id === 'vertigo') {
        score -= 15;
        matched.push('[NOTE] Vertigo + gangguan pendengaran -- pertimbangkan Penyakit Meniere');
      }
    }

    // Seizure
    if (searchText.includes('seizure') || searchText.includes('kejang') || searchText.includes('convulsion')) {
      if (['seizures', 'meningitis', 'hypoglycemia', 'stroke-iskemik'].includes(disease.id)) {
        score += 25;
        matched.push('Kejang/seizure');
      }

      // Prolonged seizure → Status Epilepticus
      if (searchText.includes('>5') || searchText.includes('prolonged') || searchText.includes('status')) {
        if (disease.id === 'seizures') {
          score += 25;
          matched.push(' Prolonged seizure → STATUS EPILEPTICUS!');
        }
      }
    }

    // Altered mental status
    if (searchText.includes('confusion') || searchText.includes('bingung') || searchText.includes('altered mental') || searchText.includes('kesadaran menurun')) {
      if (['sepsis', 'meningitis', 'hypoglycemia', 'dka', 'stroke-iskemik'].includes(disease.id)) {
        score += 18;
        matched.push('Penurunan kesadaran');
      }
    }

    // ========================================
    // BLEEDING MANIFESTATIONS
    // ========================================

    // Epistaxis
    if (searchText.includes('epistaxis') || searchText.includes('mimisan') || searchText.includes('nosebleed') || searchText.includes('hidung berdarah')) {
      if (['dbd', 'hypertensive-crisis', 'upper-gi-bleeding', 'sepsis'].includes(disease.id)) {
        score += 22;
        matched.push('Epistaxis/mimisan');
      }
    }

    // Gum bleeding
    if (searchText.includes('gum bleeding') || searchText.includes('gusi berdarah') || searchText.includes('bleeding gums')) {
      if (['dbd', 'sepsis', 'upper-gi-bleeding'].includes(disease.id)) {
        score += 22;
        matched.push('Gum bleeding');
      }
    }

    // Petechiae
    if (searchText.includes('petechiae') || searchText.includes('bintik merah') || searchText.includes('purpura')) {
      if (['dbd', 'sepsis'].includes(disease.id)) {
        score += 25;
        matched.push('Petechiae → suspect DBD/Sepsis');
      }
    }

    // MULTIPLE BLEEDING SITES → DBD
    const bleedingSites = [
      searchText.includes('mimisan') || searchText.includes('epistaxis'),
      searchText.includes('gusi berdarah') || searchText.includes('gum bleeding'),
      searchText.includes('petechiae') || searchText.includes('bintik merah'),
      searchText.includes('hematemesis') || searchText.includes('muntah darah'),
      searchText.includes('melena') || searchText.includes('tinja hitam')
    ].filter(Boolean).length;

    if (bleedingSites >= 2) {
      if (disease.id === 'dbd') {
        score += 40;
        matched.push(` Multiple bleeding sites (${bleedingSites}) → HIGHLY SUSPICIOUS FOR DBD!`);
      } else if (disease.id === 'sepsis') {
        score += 20;
        matched.push('Multiple bleeding → possible DIC/sepsis');
      }
    }

    // FEVER + BLEEDING → DBD/Sepsis, NOT cardiac
    if (hasFever && bleedingSites >= 1) {
      if (['dbd', 'sepsis'].includes(disease.id)) {
        score += 35;
        matched.push(' Fever + Bleeding → STRONGLY SUSPECT DBD/SEPSIS!');
      }
      
      if (['acs', 'heart-failure', 'arrhythmias'].includes(disease.id)) {
        score -= 50;
        matched.push(' Fever + Bleeding → NOT cardiac!');
      }
    }

    // ========================================
    // GI SYMPTOMS
    // ========================================

    // Diarrhea
    if (searchText.includes('diarrhea') || searchText.includes('diare') || searchText.includes('mencret')) {
      if (['acute-gastroenteritis', 'typhoid-fever', 'hiv-opportunistic', 'sepsis'].includes(disease.id)) {
        score += 18;
        matched.push('Diare');
      }

      // Bloody diarrhea
      if (searchText.includes('bloody') || searchText.includes('berdarah')) {
        if (['acute-gastroenteritis', 'typhoid-fever'].includes(disease.id)) {
          score += 20;
          matched.push('Diare berdarah');
        }
      }

      // Chronic diarrhea → HIV
      if (searchText.includes('chronic') || searchText.includes('kronik') || searchText.includes('>2 week')) {
        if (disease.id === 'hiv-opportunistic') {
          score += 25;
          matched.push('Chronic diarrhea → suspect HIV');
        }
      }
    }

    // Vomiting
    if (searchText.includes('vomiting') || searchText.includes('muntah') || searchText.includes('nausea') || searchText.includes('mual')) {
      if (['acute-gastroenteritis', 'acute-appendicitis', 'acute-pancreatitis', 'meningitis', 'dka', 'upper-gi-bleeding'].includes(disease.id)) {
        score += 12;
        matched.push('Muntah/mual');
      }
    }

    // Hematemesis
    if (searchText.includes('hematemesis') || searchText.includes('muntah darah') || searchText.includes('coffee ground')) {
      if (disease.id === 'upper-gi-bleeding') {
        score += 35;
        matched.push(' Hematemesis → UPPER GI BLEEDING!');
      }
    }

    // Melena
    if (searchText.includes('melena') || searchText.includes('black stool') || searchText.includes('tinja hitam')) {
      if (disease.id === 'upper-gi-bleeding') {
        score += 35;
        matched.push(' Melena → UPPER GI BLEEDING!');
      }
    }

    // Hematemesis + Melena
    if ((searchText.includes('hematemesis') || searchText.includes('muntah darah')) &&
        (searchText.includes('melena') || searchText.includes('tinja hitam'))) {
      if (disease.id === 'upper-gi-bleeding') {
        score += 50;
        matched.push(' Hematemesis + Melena → EMERGENCY GI BLEEDING!');
      }
    }

    // ========================================
    // CARDIOVASCULAR SPECIFIC
    // ========================================

    // High Blood Pressure / Hypertension symptoms
    if (searchText.includes('blood pressure') || searchText.includes('tekanan darah') || searchText.includes('darah tinggi') || searchText.includes('hipertensi')) {
      if (['hypertension', 'hypertensive-crisis'].includes(disease.id)) {
        score += 25;
        matched.push('Riwayat hipertensi/darah tinggi');
      }
    }

    // Headache (occipital) - characteristic of HTN
    if ((searchText.includes('headache') || searchText.includes('sakit kepala')) && 
        (searchText.includes('occipital') || searchText.includes('belakang kepala') || searchText.includes('tengkuk'))) {
      if (['hypertension', 'hypertensive-crisis'].includes(disease.id)) {
        score += 18;
        matched.push('Headache occipital (khas HTN)');
      }
    }

    // Morning headache - HTN characteristic
    if ((searchText.includes('headache') || searchText.includes('sakit kepala')) && 
        (searchText.includes('morning') || searchText.includes('pagi'))) {
      if (disease.id === 'hypertension') {
        score += 15;
        matched.push('Morning headache (khas HTN)');
      }
    }

    // Palpitations - differentiate SVT vs AFib vs other
    if (searchText.includes('palpitation') || searchText.includes('berdebar') || searchText.includes('irregular')) {
      // SVT: sudden onset, regular, rapid
      if ((searchText.includes('sudden') || searchText.includes('mendadak')) && 
          (searchText.includes('rapid') || searchText.includes('cepat') || searchText.includes('racing'))) {
        if (disease.id === 'svt') {
          score += 30;
          matched.push(' Sudden onset rapid palpitations → SUSPECT SVT!');
        }
      }
      
      // Generic palpitations
      if (['svt', 'arrhythmias', 'thyroid-storm', 'hypoglycemia'].includes(disease.id)) {
        score += 18;
        matched.push('Palpitasi');
      }

      // Irregular palpitations → AFib more likely than SVT
      if (searchText.includes('irregular')) {
        if (disease.id === 'arrhythmias') {
          score += 15;
          matched.push('Irregular palpitations → suspect AFib');
        }
        if (disease.id === 'svt') {
          score -= 10;
          matched.push(' Irregular rhythm → less likely SVT (SVT usually regular)');
        }
      }
    }

    // Syncope/presyncope with palpitations → SVT
    if ((searchText.includes('syncope') || searchText.includes('pingsan') || searchText.includes('presyncope')) &&
        (searchText.includes('palpitation') || searchText.includes('berdebar'))) {
      if (disease.id === 'svt') {
        score += 25;
        matched.push('Syncope + palpitations → SVT with hemodynamic compromise');
      }
    }

    // Chest discomfort with palpitations
    if ((searchText.includes('chest') || searchText.includes('dada')) &&
        (searchText.includes('palpitation') || searchText.includes('berdebar'))) {
      if (['svt', 'acs'].includes(disease.id)) {
        score += 15;
        matched.push('Chest discomfort + palpitations');
      }
    }

    // Edema/swelling
    if (searchText.includes('edema') || searchText.includes('bengkak') || searchText.includes('swelling')) {
      // Bilateral → HF
      if (searchText.includes('bilateral') || searchText.includes('kedua kaki')) {
        if (disease.id === 'heart-failure') {
          score += 25;
          matched.push('Bilateral leg edema → suspect Heart Failure');
        }
      }
      
      // Unilateral → DVT
      if (searchText.includes('unilateral') || searchText.includes('satu kaki')) {
        if (disease.id === 'dvt') {
          score += 30;
          matched.push(' Unilateral leg swelling → HIGHLY SUSPECT DVT!');
        }
      }

      if (!searchText.includes('bilateral') && !searchText.includes('unilateral')) {
        if (['heart-failure', 'dvt'].includes(disease.id)) {
          score += 12;
          matched.push('Edema');
        }
      }
    }

    // ========================================
    // ENDOCRINE & METABOLIC
    // ========================================

    // Diabetes 3Ps
    const diabetesPs = [
      searchText.includes('polyuria') || searchText.includes('banyak kencing'),
      searchText.includes('polydipsia') || searchText.includes('banyak minum') || searchText.includes('haus'),
      searchText.includes('polyphagia') || searchText.includes('banyak makan')
    ].filter(Boolean).length;

    if (diabetesPs >= 2) {
      if (['diabetes-melitus-tipe-2', 'dka'].includes(disease.id)) {
        score += 35;
        matched.push(` Classic 3P symptoms (${diabetesPs}/3) → HIGHLY SUSPECT DIABETES!`);
      }
    } else if (diabetesPs === 1) {
      if (['diabetes-melitus-tipe-2', 'dka'].includes(disease.id)) {
        score += 18;
        matched.push('Diabetes symptom (polyuria/polydipsia/polyphagia)');
      }
    }

    // Hyperglycemia
    if (searchText.includes('hyperglycemia') || searchText.includes('gula darah tinggi') || searchText.includes('>200')) {
      if (['diabetes-melitus-tipe-2', 'dka'].includes(disease.id)) {
        score += 25;
        matched.push('Hiperglikemia');
      }
    }

    // DKA-specific
    if (searchText.includes('kussmaul') || searchText.includes('fruity') || searchText.includes('acetone')) {
      if (disease.id === 'dka') {
        score += 35;
        matched.push(' Kussmaul/fruity breath → DKA!');
      }
    }

    // Hypoglycemia
    if (searchText.includes('hypoglycemia') || searchText.includes('gula darah rendah') || searchText.includes('<70') ||
        searchText.includes('tremor') || searchText.includes('cold sweat') || searchText.includes('keringat dingin')) {
      if (disease.id === 'hypoglycemia') {
        score += 28;
        matched.push(' Hypoglycemia symptoms!');
      }
    }

    // Thyroid storm
    if ((searchText.includes('tachycardia') || searchText.includes('jantung cepat')) && hasFever &&
        (searchText.includes('agitation') || searchText.includes('gelisah') || searchText.includes('tremor'))) {
      if (disease.id === 'thyroid-storm') {
        score += 40;
        matched.push(' Tachycardia + fever + agitation → THYROID STORM!');
      }
    }

    // ========================================
    // SHOCK & HYPOTENSION
    // ========================================

    if (searchText.includes('hypotension') || searchText.includes('shock') || searchText.includes('tekanan darah rendah')) {
      if (['sepsis', 'adrenal-crisis', 'upper-gi-bleeding', 'dbd'].includes(disease.id)) {
        score += 22;
        matched.push('Hypotension/shock');
      }
    }

    // ========================================
    // SKIN & ALLERGY
    // ========================================

    if (searchText.includes('rash') || searchText.includes('ruam') || searchText.includes('gatal') || searchText.includes('urtikaria')) {
      if (['alergi-dermatitis', 'dbd'].includes(disease.id)) {
        score += 18;
        matched.push('Ruam/gatal');
      }

      // Urticaria → Allergy
      if (searchText.includes('urtikaria') || searchText.includes('hives') || searchText.includes('bentol')) {
        if (disease.id === 'alergi-dermatitis') {
          score += 25;
          matched.push('Urtikaria → suspect allergy');
        }
      }
    }

    // Anaphylaxis
    if (searchText.includes('anaphylaxis') || 
        ((searchText.includes('rash') || searchText.includes('ruam')) && 
         (searchText.includes('dyspnea') || searchText.includes('sesak')) &&
         (searchText.includes('hypotension') || searchText.includes('shock')))) {
      if (disease.id === 'alergi-dermatitis') {
        score += 50;
        matched.push(' ANAPHYLAXIS → EMERGENCY!');
      }
    }

    // ========================================
    // MUSCULOSKELETAL & TRAUMA
    // ========================================

    // Trauma
    if (searchText.includes('trauma') || searchText.includes('injury') || searchText.includes('fall') || 
        searchText.includes('jatuh') || searchText.includes('kecelakaan')) {
      if (disease.id === 'fraktur') {
        score += 28;
        matched.push('Riwayat trauma');
      }

      // Exclude non-traumatic if clear trauma
      if (!['fraktur'].includes(disease.id) && (searchText.includes('accident') || searchText.includes('kecelakaan'))) {
        score -= 20;
        matched.push(' Trauma history → less likely non-traumatic');
      }
    }

    // Deformity
    if ((searchText.includes('deformity') || searchText.includes('bengkok')) &&
        (searchText.includes('cannot move') || searchText.includes('tidak bisa gerak'))) {
      if (disease.id === 'fraktur') {
        score += 35;
        matched.push(' Deformity + immobility → FRACTURE!');
      }
    }

    // ========================================
    // TROPICAL DISEASES
    // ========================================

    // Travel to endemic area
    if (searchText.includes('travel') || searchText.includes('perjalanan') || searchText.includes('papua') || searchText.includes('ntt')) {
      if (['malaria', 'leptospirosis'].includes(disease.id)) {
        score += 20;
        matched.push('Travel to endemic area');
      }
    }

    // Flood exposure → Leptospirosis
    if (searchText.includes('flood') || searchText.includes('banjir') || searchText.includes('water exposure')) {
      if (disease.id === 'leptospirosis') {
        score += 30;
        matched.push(' Flood exposure → SUSPECT LEPTOSPIROSIS!');
      }
    }

    // Jaundice
    if (searchText.includes('jaundice') || searchText.includes('icterus') || searchText.includes('kuning') || searchText.includes('mata kuning')) {
      if (['leptospirosis', 'typhoid-fever', 'upper-gi-bleeding'].includes(disease.id)) {
        score += 20;
        matched.push('Jaundice');
      }
    }

    // Weight loss
    if (searchText.includes('weight loss') || searchText.includes('berat badan turun') || searchText.includes('kurus')) {
      if (['tuberkulosis-paru', 'hiv-opportunistic', 'diabetes-melitus-tipe-2', 'typhoid-fever'].includes(disease.id)) {
        score += 18;
        matched.push('Weight loss');
      }
    }

    // COVID: Anosmia
    if (searchText.includes('anosmia') || searchText.includes('loss of smell') || searchText.includes('hilang penciuman')) {
      if (disease.id === 'covid-19') {
        score += 35;
        matched.push(' Anosmia → HIGHLY SPECIFIC FOR COVID-19!');
      }
    }

    // ========================================
    // ADDITIONAL TARGETED QUESTIONS
    // ========================================
    if (score > 30) {
      if (disease.id === 'acs') {
        questions.push('Apakah ada riwayat diabetes, hipertensi, atau merokok?');
        questions.push('Apakah pasien berkeringat dingin saat nyeri?');
        questions.push('Apakah ada riwayat penyakit jantung keluarga?');
      } else if (disease.id === 'stroke-iskemik') {
        questions.push('Apakah ada kelemahan satu sisi tubuh?');
        questions.push('Apakah bicara pelo atau wajah tidak simetris?');
        questions.push('Apakah ada riwayat hipertensi atau AF?');
      } else if (disease.id === 'pulmonary-embolism') {
        questions.push('Apakah ada riwayat perjalanan jauh atau immobilisasi?');
        questions.push('Apakah ada bengkak di kaki?');
        questions.push('Apakah ada riwayat DVT atau operasi?');
      } else if (disease.id === 'acute-appendicitis') {
        questions.push('Apakah nyeri dimulai dari pusar lalu pindah ke kanan bawah?');
        questions.push('Apakah ada demam atau mual/muntah?');
        questions.push('Apakah nyeri bertambah saat berjalan atau batuk?');
      } else if (disease.id === 'tuberkulosis-paru') {
        questions.push('Apakah batuk sudah lebih dari 2 minggu?');
        questions.push('Apakah ada keringat malam atau berat badan turun?');
        questions.push('Apakah ada kontak dengan penderita TB?');
      } else if (disease.id === 'pneumonia-komunitas') {
        questions.push('Apakah ada batuk berdahak kuning/hijau?');
        questions.push('Apakah ada sesak napas atau nyeri dada saat bernapas?');
        questions.push('Apakah pasien memiliki komorbid (DM, jantung, paru)?');
      } else if (disease.id === 'dbd') {
        questions.push('Apakah demam sudah 2-7 hari?');
        questions.push('Apakah ada perdarahan (gusi, hidung, bintik merah)?');
        questions.push('Apakah ada hasil lab trombosit rendah?');
      } else if (disease.id === 'diabetes-melitus-tipe-2') {
        questions.push('Apakah ada riwayat keluarga diabetes?');
        questions.push('Apakah ada obesitas atau kurang aktivitas fisik?');
        questions.push('Apakah sudah cek gula darah atau HbA1c?');
      } else if (disease.id === 'asthma-exacerbation') {
        questions.push('Apakah ada riwayat asma sebelumnya?');
        questions.push('Apakah ada faktor pencetus (alergen, asap, cuaca)?');
        questions.push('Apakah menggunakan inhaler? Seberapa sering?');
      } else if (disease.id === 'sepsis') {
        questions.push('Apakah ada tanda infeksi (luka, pneumonia, ISK)?');
        questions.push('Apakah tekanan darah rendah atau denyut jantung cepat?');
        questions.push('Apakah ada gangguan organ (sesak, oliguria, confusion)?');
      } else if (disease.id === 'meningitis') {
        questions.push('Apakah ada kaku kuduk (leher kaku)?');
        questions.push('Apakah ada riwayat kontak dengan penderita meningitis?');
        questions.push('Apakah sudah dilakukan lumbar puncture?');
      } else if (disease.id === 'heart-failure') {
        questions.push('Apakah sesak lebih berat saat berbaring (orthopnea)?');
        questions.push('Apakah ada bengkak di kedua kaki?');
        questions.push('Apakah ada riwayat penyakit jantung sebelumnya?');
      } else if (disease.id === 'hypertension') {
        questions.push('Berapa tekanan darah terakhir yang diukur?');
        questions.push('Apakah ada riwayat keluarga hipertensi atau penyakit jantung?');
        questions.push('Apakah ada riwayat DM, kolesterol tinggi, atau merokok?');
        questions.push('Apakah sudah pernah minum obat darah tinggi sebelumnya?');
      } else if (disease.id === 'svt') {
        questions.push('Apakah jantung berdebar dimulai TIBA-TIBA (seperti on/off switch)?');
        questions.push('Apakah pernah mengalami episode serupa sebelumnya?');
        questions.push('Apakah ada chest pain, pusing, atau hampir pingsan?');
        questions.push('Apakah episode berhenti dengan cara tertentu (Valsalva, batuk, dll)?');
      } else if (disease.id === 'vertigo') {
        questions.push('Apakah pusing diprovokasi perubahan posisi kepala (miring, menoleh, menengadah)?');
        questions.push('Berapa lama durasi setiap episode pusing? (detik, menit, jam?)');
        questions.push('Apakah ada gangguan pendengaran atau telinga berdenging (tinnitus)?');
        questions.push('Apakah ada kelemahan anggota gerak, bicara pelo, atau pandangan ganda?');
        questions.push('Apakah ada riwayat trauma kepala atau BPPV sebelumnya?');
      }
    }

    // Only add to suggestions if score is meaningful
    if (score > 20) {
      suggestions.push({
        diseaseId: disease.id,
        diseaseName: disease.name,
        probability: Math.min(score, 95),
        matchedCriteria: matched,
        additionalQuestions: questions,
      });
    }
  });

  // Sort by probability and return top 5
  return suggestions.sort((a, b) => b.probability - a.probability).slice(0, 5);
}
