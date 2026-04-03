import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { diseases } from '../lib/diseases';

export default function AnamnesisPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    chiefComplaint: '',
    symptoms: [] as string[],
    duration: '',
    severity: ''
  });
  const [suggestions, setSuggestions] = useState<typeof diseases>([]);

  // Basic symptom options derived from our most common disease keywords
  const symptomOptions = [
    { id: 'chest pain', label: 'Nyeri Dada (Chest Pain)' },
    { id: 'headache', label: 'Sakit Kepala' },
    { id: 'fever', label: 'Demam' },
    { id: 'dizziness', label: 'Pusing (Dizziness/Vertigo)' },
    { id: 'weakness', label: 'Kelemahan (Weakness)' },
    { id: 'vomiting', label: 'Muntah' },
    { id: 'cough', label: 'Batuk' },
    { id: 'shortness of breath', label: 'Sesak Napas' }
  ];

  const handleSymptomToggle = (symptomId: string) => {
    setData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(id => id !== symptomId)
        : [...prev.symptoms, symptomId]
    }));
  };

  const analyzeSuggestions = () => {
    // Simple analysis based on symptom match
    const matched = diseases.filter(d => 
      data.symptoms.some(s => d.keywords.some(k => k.toLowerCase().includes(s.toLowerCase()))) ||
      d.keywords.some(k => k.toLowerCase().includes(data.chiefComplaint.toLowerCase()))
    );
    // Sort by emergency first, then by match count
    matched.sort((a, b) => (b.isEmergency ? 1 : 0) - (a.isEmergency ? 1 : 0));
    setSuggestions(matched.slice(0, 5));
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="text-slate-600 hover:text-blue-600 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="font-bold text-xl text-slate-900">Anamnesis Terpandu</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`w-16 h-1 mx-2 transition-colors ${
                    step > num ? 'bg-blue-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Keluhan Utama</span>
            <span>Gejala</span>
            <span>Durasi & Severity</span>
            <span>Saran Diagnosis</span>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="mb-4">Apa Keluhan Utama Pasien?</h2>
            <p className="text-slate-600 mb-6">
              Deskripsikan keluhan utama yang membawa pasien datang
            </p>

            <textarea
              value={data.chiefComplaint}
              onChange={(e) => setData({ ...data, chiefComplaint: e.target.value })}
              placeholder="Contoh: Nyeri dada sejak 2 jam yang lalu..."
              className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />

            <button
              onClick={() => setStep(2)}
              disabled={!data.chiefComplaint.trim()}
              className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Lanjutkan →
            </button>
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="mb-4">Pilih Gejala yang Dialami</h2>
            <p className="text-slate-600 mb-6">
              Pilih semua gejala yang relevan (bisa lebih dari satu)
            </p>

            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {symptomOptions.map(symptom => (
                <button
                  key={symptom.id}
                  onClick={() => handleSymptomToggle(symptom.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    data.symptoms.includes(symptom.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{symptom.label}</span>
                    {data.symptoms.includes(symptom.id) && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
              >
                ← Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={data.symptoms.length === 0}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
              >
                Lanjutkan →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="mb-4">Durasi dan Tingkat Keparahan</h2>

            <div className="mb-6">
              <label className="block font-semibold mb-3">Durasi Gejala:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['<1 jam', '1-6 jam', '6-24 jam', '>24 jam'].map(duration => (
                  <button
                    key={duration}
                    onClick={() => setData({ ...data, duration })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      data.duration === duration
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-3">Tingkat Keparahan:</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'mild', label: 'Ringan' },
                  { id: 'moderate', label: 'Sedang' },
                  { id: 'severe', label: 'Berat' },
                ].map(severity => (
                  <button
                    key={severity.id}
                    onClick={() => setData({ ...data, severity: severity.id })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      data.severity === severity.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {severity.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
              >
                ← Kembali
              </button>
              <button
                onClick={analyzeSuggestions}
                disabled={!data.duration || !data.severity}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
              >
                Analisis →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4 - Suggestions */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-6 h-6 text-blue-600" />
                <h2 className="mb-0">Saran Differential Diagnosis</h2>
              </div>
              <p className="text-slate-600">
                Berdasarkan anamnesis, berikut adalah kemungkinan diagnosis:
              </p>
            </div>

            {suggestions.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <p className="text-yellow-800 font-medium mb-2">
                  Tidak ditemukan match yang kuat
                </p>
                <p className="text-sm text-yellow-700 mb-4">
                  Coba akses langsung via sistem organ atau emergency
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    to="/organ-system"
                    className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Sistem Organ
                  </Link>
                  <Link
                    to="/emergency"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Emergency
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {suggestions.map((disease, index) => (
                  <motion.div
                    key={disease.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/pathway/${disease.id}`}
                      className="block bg-white rounded-xl p-6 shadow-md border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {index === 0 && (
                              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold">
                                MOST LIKELY
                              </span>
                            )}
                            {disease.isEmergency && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold">
                                EMERGENCY
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-lg text-slate-900 mb-1">
                            {disease.name}
                          </h3>
                          <p className="text-sm text-slate-500 mb-2">{disease.nameEn}</p>
                          <p className="text-sm text-slate-600">{disease.prevalenceIndonesia}</p>
                        </div>
                        <span className="text-blue-600 text-xl">→</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setStep(1);
                setData({ chiefComplaint: '', symptoms: [], duration: '', severity: '' });
                setSuggestions([]);
              }}
              className="mt-6 w-full bg-slate-200 text-slate-700 py-4 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
            >
              Mulai Anamnesis Baru
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}