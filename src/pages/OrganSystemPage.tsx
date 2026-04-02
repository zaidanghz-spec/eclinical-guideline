import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, Activity, Brain, Apple, Stethoscope, Zap, Droplet } from 'lucide-react';
import { organSystems, diseases } from '../lib/diseases';

const systemIcons: Record<string, any> = {
  kardiovaskular: Heart,
  respirasi: Activity,
  neurologi: Brain,
  gastrointestinal: Apple,
  'infeksi-tropis': Droplet,
  endokrin: Zap,
};

const systemColors: Record<string, string> = {
  kardiovaskular: 'from-red-500 to-pink-600',
  respirasi: 'from-blue-500 to-cyan-600',
  neurologi: 'from-purple-500 to-indigo-600',
  gastrointestinal: 'from-green-500 to-emerald-600',
  'infeksi-tropis': 'from-teal-500 to-cyan-600',
  endokrin: 'from-yellow-500 to-orange-600',
};

export default function OrganSystemPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="text-slate-600 hover:text-purple-600 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="font-bold text-xl text-slate-900">Pilih Sistem Organ</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organSystems.map((system, index) => {
            const Icon = systemIcons[system.id] || Stethoscope;
            const colorClass = systemColors[system.id] || 'from-slate-500 to-gray-600';
            const diseasesInSystem = diseases.filter(d => d.organSystem === system.id);

            return (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Card Header */}
                  <div className={`h-32 bg-gradient-to-br ${colorClass} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <Icon className="w-16 h-16 text-white relative z-10" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{system.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{system.nameEn}</p>
                    <div className="text-sm text-slate-500 mb-4">
                      {diseasesInSystem.length} penyakit
                    </div>

                    {/* Disease List */}
                    <div className="space-y-2">
                      {diseasesInSystem.slice(0, 3).map((disease) => (
                        <Link
                          key={disease.id}
                          to={`/pathway/${disease.id}`}
                          className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group/item"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 group-hover/item:text-slate-900">
                              {disease.name}
                            </span>
                            {disease.isEmergency && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                                Emergency
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}

                      {diseasesInSystem.length > 3 && (
                        <div className="text-center pt-2">
                          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                            +{diseasesInSystem.length - 3} penyakit lainnya
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
