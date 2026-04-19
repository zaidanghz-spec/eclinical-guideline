#!/usr/bin/env node
// Script to add role property to all pathway checklist items
// Logic:
//   safety    -> nurse (perawat yang triage)
//   assessment -> nurse (perawat isi assessment awal) — EXCEPT if title hints toward doctor
//   action    -> nurse (default) or both
//   medication -> doctor (prescribing is doctor's job)
//   documentation -> both

const fs = require('fs');
const path = require('path');

const PATHWAYS_DIR = path.join(__dirname, 'src/lib/pathways');

// Keywords in title/description that suggest DOCTOR role
const DOCTOR_KEYWORDS = [
  'diagnosis', 'diagnos', 'prescri', 'resep', 'dosis', 'dosif',
  'terapi', 'obat', 'medika', 'rujuk', 'konsul', 'interpretasi',
  'keputusan klinis', 'trombol', 'kateter', 'drainase', 'pungsi',
  'intubas', 'defibril', 'kardiover', 'cardiover', 'DC shock',
  'antibioti', 'antiviral', 'OAT', 'DAPT', 'antikoagul',
  'informed consent', 'konfirmasi diagnosis', 'klasifikasi',
  'stratifikasi', 'staging', 'scoring',
  'bronkodilator iv', 'steroid iv', 'vasopressor',
  'mri', 'CT scan', 'EKG interpreta', 'lab interpreta',
  'biopsi', 'aspirasi', 'LP ', 'lumbal punksi'
];

// Keywords suggesting NURSE role
const NURSE_KEYWORDS = [
  'TTV', 'Tanda Vital', 'vital sign', 'tekanan darah', 'nadi', 'suhu',
  'anamnesis', 'keluhan', 'riwayat', 'anamnesa',
  'posisi', 'positioning', 'mobilisasi', 'ambulasi',
  'oksigen', 'O₂', 'O2', 'saturasi', 'SpO2', 'SpO₂',
  'IV line', 'akses IV', 'infus', 'cairan', 'kristaloid',
  'suction', 'monitor', 'observasi', 'evaluasi ketat',
  'edukasi', 'discharge', 'rawat luka', 'perawatan luka',
  'kompres', 'PRICE', 'RICE', 'immobilisasi', 'bidai',
  'Dix-Hallpike', 'Epley', 'Barbeque', 'maneuver',
  'otoscopy', 'irigasi', 'tetes', 'kompres telinga',
  'timbang BB', 'berat badan', 'tinggi badan',
  'Glasgow', 'AVPU', 'GCS',
  'DOTS', 'PMO', 'pot dahak', 'kontrol infeksi', 'masker',
  'NGT', 'kateter urin', 'foley',
  'nebulizer', 'inhalasi'
];

function inferRole(item) {
  const text = (item.title + ' ' + (item.description || '')).toLowerCase();
  const category = item.category;

  // Medication is almost always doctor
  if (category === 'medication') {
    return 'doctor';
  }

  // Documentation is shared
  if (category === 'documentation') {
    return 'both';
  }

  // Safety — usually nurse (first responder)
  if (category === 'safety') {
    return 'nurse';
  }

  // For assessment and action — check keywords
  for (const kw of DOCTOR_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) {
      return 'doctor';
    }
  }

  for (const kw of NURSE_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) {
      return 'nurse';
    }
  }

  // Default: both (collaborative)
  return 'both';
}

function addRolesToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has role: properties (like tuberkulosis.ts)
  const roleCount = (content.match(/role:\s*['"][a-z]+['"]/g) || []).length;
  const itemCount = (content.match(/category:\s*['"][a-z-]+['"]/g) || []).length;
  
  if (roleCount > 0 && roleCount >= itemCount * 0.5) {
    console.log(`  SKIP (already has roles): ${path.basename(filePath)}`);
    return false;
  }

  // Add role after each category line using regex replacement
  // Pattern: find category: '...' that is NOT already followed by role:
  content = content.replace(
    /(\bcategory:\s*'[^']+'\s*)((?![\s\S]{0,5}role:))/g,
    (match, categoryPart, rest, offset) => {
      // Parse the category value
      const catMatch = categoryPart.match(/category:\s*'([^']+)'/);
      if (!catMatch) return match;
      
      const category = catMatch[1];
      
      // We need title and description context — grab the surrounding lines
      const before = content.substring(Math.max(0, offset - 500), offset);
      const titleMatch = before.match(/title:\s*[`'"]([^`'"]+)/g);
      const descMatch = before.match(/description:\s*[`'"]([^`'"]{0,200})/g);
      
      const title = titleMatch ? titleMatch[titleMatch.length - 1] : '';
      const desc = descMatch ? descMatch[descMatch.length - 1] : '';
      const fakeItem = { category, title, description: desc };
      const role = inferRole(fakeItem);
      
      // Add role with same indentation as category
      const indent = categoryPart.match(/^(\s*)/)?.[1] || '          ';
      return `${categoryPart}${indent}role: '${role}',\n`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  DONE: ${path.basename(filePath)} (items=${itemCount})`);
  return true;
}

const files = fs.readdirSync(PATHWAYS_DIR)
  .filter(f => f.endsWith('.ts') && f !== 'tuberkulosis.ts') // TB already done
  .map(f => path.join(PATHWAYS_DIR, f));

console.log(`Processing ${files.length} pathway files...\n`);
let updated = 0;
for (const f of files) {
  process.stdout.write(`Processing ${path.basename(f)}... `);
  const changed = addRolesToFile(f);
  if (changed) updated++;
}
console.log(`\nDone. ${updated}/${files.length} files updated.`);
