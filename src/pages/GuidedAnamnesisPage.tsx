import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Sparkles, AlertTriangle, CheckCircle2,
  MessageCircle, Activity, Zap, Shield, ChevronRight, RotateCcw
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { AnamnesisData, calculateCompletion, generateSuggestions, PathwaySuggestion } from '../lib/anamnesisEngine';

// ──────────────────────────────────────────
// INITIAL STATE
// ──────────────────────────────────────────
const initialData: AnamnesisData = {
  chiefComplaint: '',
  onset: { when: '', suddenGradual: '', duration: '', pattern: '' },
  quality: { descriptors: [], freeText: '' },
  location: { primary: '', radiation: [] },
  severity: 0,
  modifiers: { worsenedBy: [], relievedBy: [] },
  associatedSymptoms: [],
  history: { similar: null, comorbidities: [], medications: '', allergies: '' },
};

// ──────────────────────────────────────────
// STEP CONFIG (Natural Doctor Order)
// ──────────────────────────────────────────
const STEPS = [
  { id: 'chief', label: 'Keluhan Utama', step: 1 },
  { id: 'onset', label: 'Onset & Waktu', step: 2 },
  { id: 'location', label: 'Lokasi Keluhan', step: 3 },
  { id: 'quality', label: 'Sifat Keluhan', step: 4 },
  { id: 'severity', label: 'Keparahan', step: 5 },
  { id: 'modifiers', label: 'Faktor Pemberat/Peringan', step: 6 },
  { id: 'associated', label: 'Gejala Penyerta', step: 7 },
  { id: 'history', label: 'Riwayat Penyakit', step: 8 },
];

const PAIN_QUALITY = ['Tajam/Menusuk', 'Tumpul', 'Terbakar', 'Berdenyut', 'Tertekan/Ditekan', 'Kram/Nyeri seperti diremas'];
const WORSENED_BY = ['Aktivitas fisik', 'Makan', 'Bernapas dalam', 'Gerakan/posisi', 'Stres', 'Saat istirahat'];
const RELIEVED_BY = ['Istirahat', 'Makan/Minum', 'Obat', 'Ubah posisi', 'Panas/hangat', 'Dingin'];
const ASSOC_SYMPTOMS = [
  'Demam', 'Mual/Muntah', 'Sesak napas', 'Batuk', 'Pusing/Vertigo',
  'Sakit kepala', 'Diare', 'Nyeri saat BAK', 'Lemas/Lelah', 'Keringat malam',
  'Nafsu makan turun', 'Berat badan turun', 'Bengkak', 'Ikterus/Kuning',
  'Perdarahan', 'Kesemutan/Kebas',
];
const COMORBIDITIES = ['Diabetes Melitus', 'Hipertensi', 'Penyakit Jantung', 'Asma/PPOK', 'CKD/Gagal Ginjal', 'Stroke Sebelumnya', 'TB', 'HIV', 'Kehamilan', 'Kanker'];
const RADIATION_SITES = ['Lengan kiri', 'Lengan kanan', 'Rahang', 'Punggung', 'Bahu', 'Kaki/Tungkai', 'Tidak menjalar'];
const DURATION_OPTIONS = ['< 1 jam', '1–6 jam', '6–24 jam', '1–3 hari', '1–4 minggu', '> 1 bulan'];

type StepId = typeof STEPS[number]['id'];

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

// ──────────────────────────────────────────
// URGENCY BADGE
// ──────────────────────────────────────────
function UrgencyBadge({ urgency }: { urgency: PathwaySuggestion['urgency'] }) {
  const map = {
    emergency: { label: 'GAWAT DARURAT', cls: 'bg-red-100 text-red-700 border-red-200' },
    urgent: { label: 'SEGERA', cls: 'bg-orange-100 text-orange-700 border-orange-200' },
    routine: { label: 'POLI UMUM', cls: 'bg-green-100 text-green-700 border-green-200' },
  };
  const cfg = map[urgency];
  return (
    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border uppercase tracking-wider ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

// ──────────────────────────────────────────
// MAIN PAGE COMPONENT
// ──────────────────────────────────────────
export default function GuidedAnamnesisPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<StepId>('chief');
  const [data, setData] = useState<AnamnesisData>(initialData);
  const [showResults, setShowResults] = useState(false);

  const completion = useMemo(() => calculateCompletion(data), [data]);
  const suggestions = useMemo(() => showResults ? generateSuggestions(data) : [], [data, showResults]);

  const currentStepIdx = STEPS.findIndex(s => s.id === step);
  const isFirstStep = currentStepIdx === 0;
  const isLastStep = currentStepIdx === STEPS.length - 1;

  const goNext = () => {
    if (isLastStep) { setShowResults(true); return; }
    setStep(STEPS[currentStepIdx + 1].id);
  };
  const goPrev = () => {
    if (isFirstStep) return;
    setStep(STEPS[currentStepIdx - 1].id);
  };
  const reset = () => {
    setData(initialData);
    setStep('chief');
    setShowResults(false);
  };

  const upd = <K extends keyof AnamnesisData>(key: K, val: AnamnesisData[K]) =>
    setData(prev => ({ ...prev, [key]: val }));

  if (showResults) {
    return <ResultsView data={data} suggestions={suggestions} completion={completion} onReset={reset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/home" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-slate-900 text-lg">Anamnesis Terpandu</h1>
                  <p className="text-xs text-slate-500">Rekomendasi pathway berbasis klinis</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-indigo-600">{completion}%</div>
                <div className="text-xs text-slate-500">terisi</div>
              </div>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-1.5">
              {STEPS.map((s, idx) => {
                const done = idx < currentStepIdx;
                const active = s.id === step;
                return (
                  <div key={s.id} className="flex items-center flex-1">
                    <button
                      onClick={() => setStep(s.id)}
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all
                        ${done ? 'bg-indigo-600 text-white' : active ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400' : 'bg-slate-100 text-slate-400'}`}
                    >
                      {done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </button>
                    {idx < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-0.5 ${done ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${completion}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Current step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Step title */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="text-xs text-indigo-200 mb-0.5 font-semibold uppercase tracking-wider">
                  Langkah {currentStepIdx + 1} dari {STEPS.length}
                </div>
                <h2 className="text-white font-bold text-lg">{STEPS[currentStepIdx].label}</h2>
              </div>

              <div className="p-6 space-y-5">

                {/* ── STEP 1: Chief Complaint ── */}
                {step === 'chief' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Apa keluhan utama pasien saat ini? <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-slate-500 mb-3">
                      Tulis dengan bahasa pasien sendiri. Contoh: <em>"nyeri dada kiri", "pusing berputar", "sesak napas mendadak"</em>
                    </p>
                    <textarea
                      value={data.chiefComplaint}
                      onChange={e => upd('chiefComplaint', e.target.value)}
                      placeholder='Misalnya: "Nyeri perut kanan bawah sejak kemarin..."'
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none transition"
                    />
                  </div>
                )}

                {/* ── STEP 2: Onset ── */}
                {step === 'onset' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Kapan gejala ini pertama muncul?
                      </label>
                      <input
                        type="text"
                        value={data.onset.when}
                        onChange={e => upd('onset', { ...data.onset, when: e.target.value })}
                        placeholder='Contoh: "Pagi tadi jam 5", "3 hari yang lalu", "2 minggu ini"'
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Gejala muncul secara…
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { val: 'sudden', label: '⚡ Mendadak / Tiba-tiba', sub: 'Langsung terasa tanpa tanda sebelumnya' },
                          { val: 'gradual', label: '📈 Bertahap / Pelan-pelan', sub: 'Makin lama makin terasa berat' },
                        ].map(opt => (
                          <button key={opt.val}
                            onClick={() => upd('onset', { ...data.onset, suddenGradual: opt.val as any })}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              data.onset.suddenGradual === opt.val
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            <div className="text-sm font-semibold text-slate-800">{opt.label}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{opt.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Sudah berlangsung berapa lama?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {DURATION_OPTIONS.map(d => (
                          <button key={d}
                            onClick={() => upd('onset', { ...data.onset, duration: d })}
                            className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                              data.onset.duration === d
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                                : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Pola gejala?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: 'constant', label: 'Terus-menerus' },
                          { val: 'intermittent', label: 'Hilang-timbul' },
                          { val: 'progressive', label: 'Makin memberat' },
                        ].map(opt => (
                          <button key={opt.val}
                            onClick={() => upd('onset', { ...data.onset, pattern: opt.val as any })}
                            className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                              data.onset.pattern === opt.val
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                                : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Location ── */}
                {step === 'location' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Di mana lokasi keluhan/rasa tidak nyaman? <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-slate-500 mb-3">Minta pasien menunjuk atau mendeskripsikan area yang dirasakan.</p>
                      <input
                        type="text"
                        value={data.location.primary}
                        onChange={e => upd('location', { ...data.location, primary: e.target.value })}
                        placeholder='Contoh: "dada kiri", "perut kanan bawah", "kepala bagian depan"'
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Apakah keluhan menjalar ke tempat lain?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {RADIATION_SITES.map(site => (
                          <button key={site}
                            onClick={() => upd('location', { ...data.location, radiation: toggle(data.location.radiation, site) })}
                            className={`py-2.5 px-2 rounded-xl border-2 text-xs font-medium transition-all ${
                              data.location.radiation.includes(site)
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                                : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                            }`}
                          >
                            {site}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Quality ── */}
                {step === 'quality' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Bagaimana rasanya? (Pilih yang paling sesuai)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {PAIN_QUALITY.map(q => (
                          <button key={q}
                            onClick={() => upd('quality', { ...data.quality, descriptors: toggle(data.quality.descriptors, q) })}
                            className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                              data.quality.descriptors.includes(q)
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                                : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">
                        Deskripsi dengan kata-kata pasien sendiri
                      </label>
                      <textarea
                        value={data.quality.freeText}
                        onChange={e => upd('quality', { ...data.quality, freeText: e.target.value })}
                        placeholder='"Seperti ada yang menusuk-nusuk…", "Panas seperti terbakar dari dalam…"'
                        rows={2}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none transition"
                      />
                    </div>
                  </div>
                )}

                {/* ── STEP 5: Severity ── */}
                {step === 'severity' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-4">
                        Skala nyeri/keluhan: <span className={`text-2xl font-black ${data.severity >= 7 ? 'text-red-600' : data.severity >= 4 ? 'text-orange-500' : 'text-green-600'}`}>{data.severity}/10</span>
                      </label>
                      <input
                        type="range" min={0} max={10}
                        value={data.severity}
                        onChange={e => upd('severity', parseInt(e.target.value))}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>0 — Tidak ada</span>
                        <span className={data.severity >= 4 && data.severity <= 6 ? 'text-orange-600 font-semibold' : ''}>4-6 Sedang</span>
                        <span className="text-red-600 font-semibold">10 — Tidak tertahankan</span>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border-2 ${
                      data.severity >= 7 ? 'bg-red-50 border-red-200' :
                      data.severity >= 4 ? 'bg-orange-50 border-orange-200' :
                      'bg-green-50 border-green-200'
                    }`}>
                      <div className="text-sm font-semibold">
                        {data.severity === 0 ? '— Belum diisi' :
                         data.severity <= 3 ? '🟢 Ringan — Masih bisa beraktivitas' :
                         data.severity <= 6 ? '🟠 Sedang — Aktivitas terganggu' :
                         '🔴 Berat — Perlu penanganan segera'}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 6: Modifiers ── */}
                {step === 'modifiers' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-red-500" />
                        Apa yang memperberat keluhan?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {WORSENED_BY.map(f => (
                          <button key={f}
                            onClick={() => upd('modifiers', { ...data.modifiers, worsenedBy: toggle(data.modifiers.worsenedBy, f) })}
                            className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                              data.modifiers.worsenedBy.includes(f)
                                ? 'border-red-400 bg-red-50 text-red-800'
                                : 'border-slate-200 text-slate-600 hover:border-red-300'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        Apa yang meringankan keluhan?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {RELIEVED_BY.map(f => (
                          <button key={f}
                            onClick={() => upd('modifiers', { ...data.modifiers, relievedBy: toggle(data.modifiers.relievedBy, f) })}
                            className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                              data.modifiers.relievedBy.includes(f)
                                ? 'border-green-400 bg-green-50 text-green-800'
                                : 'border-slate-200 text-slate-600 hover:border-green-300'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 7: Associated Symptoms ── */}
                {step === 'associated' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Gejala lain yang dirasakan pasien?
                    </label>
                    <p className="text-xs text-slate-500 mb-3">Pilih semua yang ada saat ini. Semakin lengkap semakin akurat rekomendasinya.</p>
                    <div className="grid grid-cols-2 gap-2">
                      {ASSOC_SYMPTOMS.map(sym => (
                        <button key={sym}
                          onClick={() => upd('associatedSymptoms', toggle(data.associatedSymptoms, sym))}
                          className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all text-left flex items-center gap-2 ${
                            data.associatedSymptoms.includes(sym)
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                              : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                          }`}
                        >
                          {data.associatedSymptoms.includes(sym) ? <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" /> : <div className="w-4 h-4 border-2 border-slate-300 rounded-full flex-shrink-0" />}
                          {sym}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STEP 8: History ── */}
                {step === 'history' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Apakah pernah mengalami keluhan serupa sebelumnya?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: true, label: 'Ya, pernah' },
                          { val: false, label: 'Tidak pernah' },
                          { val: null, label: 'Tidak ingat' },
                        ].map(opt => (
                          <button key={String(opt.val)}
                            onClick={() => upd('history', { ...data.history, similar: opt.val })}
                            className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                              data.history.similar === opt.val
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                                : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Riwayat penyakit yang sudah ada (komorbid)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {COMORBIDITIES.map(c => (
                          <button key={c}
                            onClick={() => upd('history', { ...data.history, comorbidities: toggle(data.history.comorbidities, c) })}
                            className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                              data.history.comorbidities.includes(c)
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                                : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">
                        Obat yang sedang rutin diminum (opsional)
                      </label>
                      <input
                        type="text"
                        value={data.history.medications}
                        onChange={e => upd('history', { ...data.history, medications: e.target.value })}
                        placeholder='Contoh: "Amlodipine, Metformin, Salbutamol inhaler"'
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:border-indigo-400 outline-none transition"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="px-6 pb-6 flex items-center gap-3">
                <button
                  onClick={goPrev}
                  disabled={isFirstStep}
                  className="px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Sebelumnya
                </button>
                <button
                  onClick={goNext}
                  className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    isLastStep
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg'
                      : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700'
                  }`}
                >
                  {isLastStep ? (
                    <><Sparkles className="w-5 h-5" /> Lihat Rekomendasi</>
                  ) : (
                    <>Selanjutnya <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// RESULTS VIEW
// ──────────────────────────────────────────
function ResultsView({
  data, suggestions, completion, onReset,
}: {
  data: AnamnesisData;
  suggestions: PathwaySuggestion[];
  completion: number;
  onReset: () => void;
}) {
  const navigate = useNavigate();
  const hasEmergency = suggestions.some(s => s.urgency === 'emergency');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onReset} className="p-2 hover:bg-white rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Hasil Analisis Klinis</h1>
              <p className="text-xs text-slate-500">Berdasarkan {completion}% data anamnesis yang diisi</p>
            </div>
          </div>

          {/* Emergency Alert */}
          {hasEmergency && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-start gap-3 mb-4"
            >
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-red-900">Perhatian Dokter!</div>
                <div className="text-sm text-red-700">
                  Satu atau lebih diagnosis yang disarankan termasuk <strong>kegawatdaruratan</strong>. Pastikan penilaian klinis tetap menjadi acuan utama.
                </div>
              </div>
            </motion.div>
          )}

          {/* Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-4">
            <div className="text-xs font-bold text-slate-500 uppercase mb-2">Ringkasan Anamnesis</div>
            {data.chiefComplaint && (
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium border border-indigo-100">
                  📋 {data.chiefComplaint}
                </span>
                {data.location.primary && (
                  <span className="text-sm bg-slate-50 text-slate-700 px-3 py-1 rounded-full font-medium border border-slate-200">
                    📍 {data.location.primary}
                  </span>
                )}
                {data.onset.duration && (
                  <span className="text-sm bg-slate-50 text-slate-700 px-3 py-1 rounded-full font-medium border border-slate-200">
                    ⏱ {data.onset.duration}
                  </span>
                )}
                {data.severity > 0 && (
                  <span className={`text-sm px-3 py-1 rounded-full font-medium border ${
                    data.severity >= 7 ? 'bg-red-50 text-red-700 border-red-200' :
                    data.severity >= 4 ? 'bg-orange-50 text-orange-700 border-orange-200' :
                    'bg-green-50 text-green-700 border-green-200'
                  }`}>
                    🩺 Skala {data.severity}/10
                  </span>
                )}
              </div>
            )}
            {data.associatedSymptoms.length > 0 && (
              <div className="text-xs text-slate-500">
                + {data.associatedSymptoms.slice(0, 4).join(', ')}{data.associatedSymptoms.length > 4 ? ` & ${data.associatedSymptoms.length - 4} lainnya` : ''}
              </div>
            )}
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
            <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 mb-2">Data belum cukup untuk rekomendasi</h3>
            <p className="text-sm text-slate-500 mb-4">Tambahkan lebih banyak detail anamnesis untuk meningkatkan akurasi.</p>
            <button onClick={onReset} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
              Lengkapi Anamnesis
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              {suggestions.length} Diagnosis Banding Teratas
            </div>
            {suggestions.map((s, idx) => (
              <motion.div
                key={s.diseaseId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden ${
                  idx === 0 ? 'border-indigo-300' : 'border-slate-200'
                }`}
              >
                <div className={`px-5 py-4 ${idx === 0 ? 'bg-gradient-to-r from-indigo-50 to-purple-50' : ''}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      {idx === 0 && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">Paling Relevan</span>
                        </div>
                      )}
                      <h3 className="font-bold text-slate-900">{s.diseaseName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <UrgencyBadge urgency={s.urgency} />
                        <span className="text-xs text-slate-500">Relevansi klinis: {s.probability}%</span>
                      </div>
                    </div>
                    <div className={`text-2xl font-black ${
                      s.probability >= 70 ? 'text-indigo-600' :
                      s.probability >= 45 ? 'text-orange-500' :
                      'text-slate-400'
                    }`}>
                      {s.probability}%
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="text-xs text-slate-600 italic bg-white/60 rounded-lg px-3 py-2 border border-slate-100 mb-3">
                    💡 {s.reasoning}
                  </div>

                  {/* Matched Criteria */}
                  {s.matchedCriteria.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {s.matchedCriteria.map((c, i) => (
                        <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-teal-500" />{c}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Additional Questions */}
                  {s.additionalQuestions.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                      <div className="text-[10px] font-bold text-amber-700 uppercase mb-1.5">❓ Pertanyaan Tambahan untuk Konfirmasi:</div>
                      <ul className="space-y-1">
                        {s.additionalQuestions.map((q, i) => (
                          <li key={i} className="text-xs text-amber-800 flex items-start gap-1.5">
                            <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" />{q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => navigate(`/pathway-dynamic/${s.diseaseId}`)}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      idx === 0
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    Buka Pathway {s.diseaseName}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Disclaimer */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mt-2">
              <div className="text-xs text-slate-500 leading-relaxed">
                <strong>⚕️ Catatan Klinis:</strong> Rekomendasi ini bersifat bantu-pikir (decision-support) dan TIDAK menggantikan penilaian klinis dokter. Selalu integrasi dengan pemeriksaan fisik dan penunjang yang relevan sebelum menegakkan diagnosis.
              </div>
            </div>

            <button onClick={onReset} className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-white transition-all flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Anamnesis Ulang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}