import { Link } from 'react-router';
import { motion } from 'motion/react';
import { 
  Activity, 
  Brain, 
  Heart, 
  AlertCircle, 
  ClipboardList, 
  Clock,
  CheckCircle2,
  Shield,
  TrendingUp
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Clock,
      title: 'Protokol Emergency',
      description: 'Target waktu intervensi kritis untuk setiap kondisi darurat',
    },
    {
      icon: CheckCircle2,
      title: 'Evidence-Based',
      description: 'Berdasarkan guideline WHO dan pola resistensi antibiotik lokal Indonesia',
    },
    {
      icon: Shield,
      title: '30 Penyakit Umum',
      description: 'Mencakup penyakit tersering di Indonesia terorganisir per sistem organ',
    },
    {
      icon: TrendingUp,
      title: 'Interactive Flowchart',
      description: 'Branching pathways dengan decision points Yes/No',
    },
  ];

  const entryMethods = [
    {
      to: '/anamnesis',
      icon: ClipboardList,
      title: 'Anamnesis Terpandu',
      description: 'Sistem diagnosis berbasis pertanyaan riwayat medis standar',
      color: 'from-blue-500 to-blue-600',
      accentColor: 'bg-blue-500',
    },
    {
      to: '/organ-system',
      icon: Heart,
      title: 'Sistem Organ',
      description: 'Pilih langsung berdasarkan sistem organ (Kardio, Respirasi, Neuro, dll)',
      color: 'from-purple-500 to-purple-600',
      accentColor: 'bg-purple-500',
    },
    {
      to: '/emergency',
      icon: AlertCircle,
      title: 'Kasus Emergency',
      description: 'Akses cepat protokol kegawatdaruratan dengan prioritas ordering',
      color: 'from-red-500 to-red-600',
      accentColor: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl text-slate-900">Clinical Pathway Indonesia</span>
            </div>
            <div className="flex gap-4">
              <Link 
                to="/organ-system" 
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Penyakit
              </Link>
              <Link 
                to="/emergency" 
                className="text-slate-600 hover:text-red-600 transition-colors"
              >
                Emergency
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6"
          >
            <Brain className="w-5 h-5" />
            <span className="font-medium">Clinical Decision Support System</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Algoritma Klinis
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Evidence-Based
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            Panduan clinical pathway untuk <strong>30 penyakit umum di Indonesia</strong> dengan 
            protokol emergency, interactive flowchart, dan sistem decision support berbasis anamnesis terstruktur.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/anamnesis"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              <ClipboardList className="w-5 h-5" />
              Mulai Anamnesis
            </Link>
            <Link
              to="/emergency"
              className="inline-flex items-center gap-2 bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 hover:shadow-lg hover:scale-105 transition-all"
            >
              <AlertCircle className="w-5 h-5" />
              Akses Emergency
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Entry Methods Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-4">Pilih Metode Entry</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Tiga cara untuk mengakses clinical pathway sesuai kebutuhan klinis Anda
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {entryMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Link to={method.to} className="block group">
                  <div className="relative bg-white rounded-2xl p-8 shadow-md border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-2 h-full">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${method.color} mb-6`}>
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-semibold text-xl text-slate-900 mb-3">{method.title}</h3>
                    <p className="text-slate-600 mb-6">{method.description}</p>
                    
                    <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                      <span>Mulai</span>
                      <span>→</span>
                    </div>

                    {/* Accent bar */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${method.accentColor} rounded-b-2xl`} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">30</div>
              <div className="text-blue-100">Penyakit Umum Indonesia</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl font-bold mb-2">6</div>
              <div className="text-blue-100">Sistem Organ</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Protokol Emergency</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-2">
            Clinical Pathway Indonesia - Evidence-Based Medicine untuk Praktik Klinis
          </p>
          <p className="text-sm">
            Berdasarkan guideline WHO, PPK Indonesia, dan pola resistensi antibiotik lokal
          </p>
          <p className="text-xs mt-4 text-slate-500">
            ⚠️ Untuk tenaga kesehatan profesional. Bukan pengganti judgment klinis.
          </p>
        </div>
      </footer>
    </div>
  );
}
