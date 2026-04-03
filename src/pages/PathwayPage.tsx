import { useParams, Link, useNavigate } from 'react-router';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Info,
  Pill,
  Activity,
  TrendingUp,
  Square,
  CheckSquare,
  Award
} from 'lucide-react';
import { diseases } from '../lib/diseases';
import { pathways } from '../lib/pathways';
import ProgressBar from '../components/ProgressBar';

export default function PathwayPage() {
  const { diseaseId } = useParams();
  const navigate = useNavigate();
  const disease = diseases.find(d => d.id === diseaseId);
  const pathway = pathways[diseaseId || ''];
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    if (!pathway || pathway.steps.length === 0) return 0;
    return Math.round((completedSteps.length / pathway.steps.length) * 100);
  }, [completedSteps, pathway]);

  if (!disease) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Disease Not Found</h2>
          <p className="text-slate-600 mb-6">The requested clinical pathway does not exist.</p>
          <button 
            onClick={() => navigate('/organ-system')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Back to Organ Systems
          </button>
        </div>
      </div>
    );
  }

  if (!pathway) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Pathway Not Available</h2>
          <p className="text-slate-600 mb-6">
            Clinical pathway for <strong>{disease.name}</strong> is currently being developed.
          </p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const isCompleted = (stepIndex: number) => completedSteps.includes(stepIndex);

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
            <div className="flex-1">
              <div className="font-bold text-lg text-slate-900">{disease.name}</div>
              <div className="text-xs text-slate-500">{disease.nameEn}</div>
            </div>
            {disease.isEmergency && (
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                EMERGENCY
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">{disease.name}</h2>
              <div className="space-y-3">
                {disease.isEmergency && disease.timeToIntervention && (
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <Clock className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="text-xs text-red-600 font-semibold">TARGET WAKTU INTERVENSI</div>
                      <div className="font-bold text-red-800">{disease.timeToIntervention}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-blue-600 font-semibold">PREVALENSI INDONESIA</div>
                    <div className="text-sm text-blue-800">{disease.prevalenceIndonesia}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Keywords:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {disease.keywords.map(keyword => (
                  <span key={keyword} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-900">Pathway Progress</span>
              <span className="text-lg font-bold text-blue-600">{completionPercentage}%</span>
            </div>
            <ProgressBar percentage={completionPercentage} label="" />
            <div className="text-sm text-slate-600 mt-2">
              {completedSteps.length} of {pathway.steps.length} steps completed
            </div>
          </div>
        </motion.div>

        {/* Clinical Pathway Checklist */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-2"> Clinical Pathway Checklist</h2>
            <p className="text-blue-100">
              Centang setiap langkah saat sudah selesai dilakukan
            </p>
          </div>

          {pathway.steps.map((step, index) => {
            const completed = isCompleted(index);

            return (
              <motion.div
                key={index}
                id={`step-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                {index > 0 && (
                  <div className="absolute left-8 -top-4 w-1 h-4 bg-slate-300" />
                )}

                <div className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                  completed 
                    ? 'border-green-400 bg-green-50/30' 
                    : 'border-slate-200 hover:border-blue-300'
                }`}>
                  {/* Step Header - CLICKABLE CHECKBOX */}
                  <button
                    onClick={() => toggleStep(index)}
                    className={`w-full p-5 text-left transition-colors ${
                      step.type === 'decision' 
                        ? 'bg-blue-50 border-b border-blue-200 hover:bg-blue-100' 
                        : 'bg-slate-50 border-b border-slate-200 hover:bg-slate-100'
                    } ${completed ? 'bg-green-50 border-green-200' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        {completed ? (
                          <CheckSquare className="w-8 h-8 text-green-600" />
                        ) : (
                          <Square className="w-8 h-8 text-slate-400" />
                        )}
                      </div>

                      {/* Step Number */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        completed 
                          ? 'bg-green-600 text-white' 
                          : step.type === 'decision' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-600 text-white'
                      }`}>
                        {index + 1}
                      </div>

                      {/* Step Info */}
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-slate-500 uppercase">
                          {step.type === 'decision' ? 'Decision Point' : 
                           step.type === 'action' ? 'Action Required' : 
                           step.type === 'assessment' ? 'Assessment' : 'Information'}
                        </div>
                        <div className={`font-semibold ${completed ? 'text-green-900' : 'text-slate-900'}`}>
                          {step.title}
                        </div>
                      </div>

                      {/* Completed Badge */}
                      {completed && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 border border-green-300 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-green-700" />
                          <span className="text-sm font-semibold text-green-700">Completed</span>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Step Content */}
                  <div className="p-6">
                    <p className={`text-slate-700 mb-4 ${completed ? 'line-through opacity-60' : ''}`}>
                      {step.description}
                    </p>

                    {step.details && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-800">{step.details}</div>
                        </div>
                      </div>
                    )}

                    {/* Criteria Checklist */}
                    {step.criteria && step.criteria.length > 0 && (
                      <div className="mb-4">
                        <div className="font-semibold mb-2">Kriteria:</div>
                        <ul className="space-y-2">
                          {step.criteria.map((criterion, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-slate-700">{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Medications */}
                    {step.medications && step.medications.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Pill className="w-5 h-5 text-green-600" />
                          <div className="font-semibold text-green-900">Terapi:</div>
                        </div>
                        <ul className="space-y-2">
                          {step.medications.map((med, idx) => (
                            <li key={idx} className="text-sm text-green-800">
                              <strong>{med.name}</strong>: {med.dose}
                              {med.route && ` (${med.route})`}
                              {med.duration && ` - ${med.duration}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Red Flags */}
                    {step.redFlags && step.redFlags.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <div className="font-semibold text-red-900">Red Flags:</div>
                        </div>
                        <ul className="space-y-2">
                          {step.redFlags.map((flag, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-red-600"></span>
                              <span className="text-sm text-red-800">{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Decision Branches */}
                    {step.branches && (
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            If YES:
                          </div>
                          <p className="text-sm text-green-800">{step.branches.yes}</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            If NO:
                          </div>
                          <p className="text-sm text-red-800">{step.branches.no}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Celebration */}
        {completionPercentage === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl text-center mt-8 shadow-2xl"
          >
            <Award className="w-20 h-20 mx-auto mb-4 animate-bounce" />
            <h3 className="text-3xl font-bold mb-2"> Pathway Completed!</h3>
            <p className="text-green-100 mb-6 text-lg">
              Anda telah menyelesaikan semua langkah clinical pathway untuk {disease.name}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => {
                  setCompletedSteps([]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <Activity className="w-5 h-5" />
                Reset Pathway
              </button>
              <Link
                to="/organ-system"
                className="bg-green-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-900 transition-colors"
              >
                Lihat Penyakit Lain
              </Link>
            </div>
          </motion.div>
        )}

        {/* Evidence Notice */}
        <div className="mt-8 p-6 bg-slate-100 rounded-xl">
          <p className="text-sm text-slate-600 text-center">
            <strong> Evidence-Based:</strong> Pathway ini disusun berdasarkan guideline WHO, 
            PPK Indonesia, dan pola resistensi antibiotik lokal. 
            Selalu sesuaikan dengan kondisi pasien individual dan konsultasi senior jika diperlukan.
          </p>
        </div>
      </div>
    </div>
  );
}
