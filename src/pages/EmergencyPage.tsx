import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, AlertCircle, Clock, TrendingUp, GitBranch, ClipboardList, ChevronRight } from 'lucide-react';
import { diseases, organSystems } from '../lib/diseases';
import { pathways } from '../lib/pathways';
import { dynamicPathways } from '../lib/dynamicPathways';

const urgencyColors: Record<string, string> = {
  immediate: 'bg-red-600',
  urgent: 'bg-orange-500',
  semiUrgent: 'bg-yellow-500',
};

const urgencyLabels: Record<string, string> = {
  immediate: 'IMMEDIATE',
  urgent: 'URGENT',
  semiUrgent: 'SEMI-URGENT',
};

export default function EmergencyPage() {
  const navigate = useNavigate();

  // Filter emergency diseases that actually have a pathway defined
  const availableEmergencyDiseases = diseases.filter(disease => {
    const hasPathway = pathways[disease.id] || dynamicPathways[disease.id];
    return disease.isEmergency && hasPathway;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-red-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="text-slate-600 hover:text-red-600 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <AlertCircle className="w-6 h-6 text-red-600" />
            <span className="font-bold text-xl text-slate-900">Protokol Emergency</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Alert Banner */}
          <div className="bg-red-600 text-white p-6 rounded-2xl mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 flex-shrink-0" />
              <div>
                <h2 className="font-bold text-2xl mb-2">⚠️ Akses Cepat Kegawatdaruratan</h2>
                <p className="text-red-100">
                  Clinical pathways di bawah ini diurutkan berdasarkan <strong>prioritas waktu intervensi</strong>.
                  Setiap detik sangat berharga dalam kondisi emergency.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-8">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Target Waktu Intervensi</h3>
                <p className="text-sm text-blue-700">
                  Waktu maksimal dari diagnosis hingga intervensi kritis dimulai. 
                  Guideline berdasarkan WHO dan PPK Indonesia.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency List */}
        <div className="space-y-4">
          {availableEmergencyDiseases.map((disease, index) => {
            const pathway = pathways[disease.id];
            const dynamicPathway = dynamicPathways[disease.id];
            const isDynamic = !!dynamicPathway;

            // Optional: calculate steps
            const stepCount = dynamicPathway 
              ? Object.values(dynamicPathway.nodes).filter(n => n.type === 'checklist').reduce((acc, node) => {
                  if (node.type === 'checklist') return acc + node.items.length;
                  return acc;
                }, 0)
              : (pathway?.steps.length || 0);

            return (
              <motion.div
                key={disease.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={isDynamic ? `/pathway-dynamic/${disease.id}` : `/pathway-checklist/${disease.id}`}
                  className="block bg-white rounded-xl p-6 shadow-md border-2 border-slate-200 hover:border-red-400 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${urgencyColors[(disease as any).urgency] || 'bg-red-600'} text-white`}>
                          {urgencyLabels[(disease as any).urgency] || 'EMERGENCY'}
                        </span>
                        {isDynamic && (
                          <div className="flex items-center gap-1 text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                            <GitBranch className="w-3 h-3" />
                            Dynamic
                          </div>
                        )}
                        {disease.timeToIntervention && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold">{disease.timeToIntervention}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-red-600 transition-colors">
                        {disease.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">{disease.nameEn}</p>

                      <div className="flex items-center gap-6 mb-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <ClipboardList className="w-4 h-4 text-teal-600" />
                          <span>{stepCount} clinical steps</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 max-w-sm truncate">
                          <TrendingUp className="w-4 h-4 flex-shrink-0 text-blue-600" />
                          <span className="truncate">{disease.prevalenceIndonesia}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {disease.keywords.slice(0, 4).map((keyword) => (
                          <span key={keyword} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center text-red-600 group-hover:translate-x-2 transition-transform self-center">
                      <span className="font-semibold hidden sm:inline">Start Checklist</span>
                      <ChevronRight className="w-6 h-6 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          
          {availableEmergencyDiseases.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500">Tidak ada pathway emergency yang tersedia saat ini.</p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-slate-100 rounded-xl">
          <p className="text-sm text-slate-600 text-center">
            <strong>⚠️ Catatan Penting:</strong> Protokol ini adalah panduan klinis. 
            Setiap kasus harus disesuaikan dengan kondisi pasien individual dan judgment klinis profesional.
            Jangan ragu untuk konsultasi dengan senior atau spesialis jika diperlukan.
          </p>
        </div>
      </div>
    </div>
  );
}