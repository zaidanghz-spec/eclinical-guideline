import { Link } from 'react-router';
import { motion } from 'motion/react';
import { 
  ClipboardList, 
  Brain, 
  AlertCircle, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  Activity,
  Heart,
  History,
  PlayCircle,
  FileText,
  Shield,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePathwaySessions } from '../hooks/usePathwaySessions';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const { sessions, loading, authError } = usePathwaySessions();
  const [hasError, setHasError] = useState(false);

  console.log(' [HomePage] Rendering HomePage...');
  console.log(' [HomePage] User:', user ? { email: user.email, name: user.name } : null);
  console.log(' [HomePage] Sessions:', sessions ? sessions.length : 'null');
  console.log(' [HomePage] Loading:', loading);
  console.log(' [HomePage] Auth Error:', authError);
  console.log(' [HomePage] Has error:', hasError);

  // Catch any rendering errors
  useEffect(() => {
    console.log(' [HomePage] useEffect - Setting up error handler');
    const errorHandler = (error: ErrorEvent) => {
      console.error(' [HomePage] Rendering error:', error);
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);
    return () => {
      console.log(' [HomePage] useEffect - Cleaning up error handler');
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  // If there's an error, show a simple fallback
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8 text-center">
            <div className="text-red-600 mb-4">
              <AlertCircle className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Please refresh the page or try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats from real sessions
  const completedSessions = sessions?.filter(s => s.status === 'completed') || [];
  const inProgressSessions = sessions?.filter(s => s.status === 'in_progress') || [];
  
  // Get recent sessions (max 3)
  const recentSessions = sessions?.slice(0, 3) || [];

  const quickActions = [
    {
      to: '/pathways',
      title: 'Clinical Pathways',
      description: 'Evidence-based diagnostic and treatment protocols',
      icon: ClipboardList,
      color: 'from-teal-500 to-teal-600',
      accentColor: 'bg-teal-500',
    },
    {
      to: '/anamnesis-guided',
      title: 'Guided Anamnesis',
      description: 'Structured patient history using OPQRST framework',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      accentColor: 'bg-blue-500',
    },
    {
      to: '/emergency',
      title: 'Emergency Protocols',
      description: 'Time-critical interventions and emergency guidelines',
      icon: AlertCircle,
      color: 'from-amber-500 to-amber-600',
      accentColor: 'bg-amber-500',
    },
    {
      to: '/history',
      title: 'Patient History',
      description: 'View pathway history by patient code',
      icon: History,
      color: 'from-purple-500 to-purple-600',
      accentColor: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="bg-gradient-to-r from-teal-500/90 to-cyan-500/90 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            {/* Medical waveform pattern background */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <pattern id="waveform" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0,20 L10,20 L15,5 L20,35 L25,20 L30,20 L35,15 L40,25 L45,20 L100,20" 
                        stroke="white" strokeWidth="1" fill="none" opacity="0.3"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#waveform)" />
              </svg>
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      Welcome back, {user?.name?.replace(/^(Dr\.\s*|dr\.\s*)/i, 'Dr. ')}
                    </h1>
                    <p className="text-sm text-teal-50">
                      Evidence-based Clinical Decision Support
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-teal-50">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date().toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-teal-50/80 text-xs">
                    <Shield className="w-4 h-4" />
                    <span>PPK • WHO • Evidence-Based</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="mb-10">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Clinical Tools
            </p>
            <h2 className="text-xl font-bold text-gray-900">Quick Access</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={action.to}
                  className="block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-teal-200 transition-all group overflow-hidden"
                >
                  {/* Top accent bar */}
                  <div className={`h-1 ${action.accentColor}`}></div>
                  
                  <div className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} mb-4 group-hover:scale-105 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-10"></div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Recent Activity
                  </p>
                  <h2 className="text-lg font-bold text-gray-900">Clinical Sessions</h2>
                </div>
                <Link 
                  to="/pathways" 
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-3">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-10 h-10 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-500 text-sm">Loading sessions...</p>
                  </div>
                ) : recentSessions.length > 0 ? (
                  recentSessions.map((session, index) => {
                    const timeAgo = new Date(session.started_at || session.startedAt).toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    
                    return (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100"
                      >
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          session.status === 'completed' 
                            ? 'bg-teal-100 text-teal-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {session.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 truncate">
                            {session.disease_name || session.diseaseName}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                            <span>{timeAgo}</span>
                            {(session.patient_code || session.patientCode) && (
                              <span className="text-teal-600 font-medium">
                                | Patient: {session.patient_code || session.patientCode}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className={`text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0 ${
                          session.status === 'completed' 
                            ? 'bg-teal-100 text-teal-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {session.status === 'completed' ? 'Completed' : 'In Progress'}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm mb-1 font-medium">No recent sessions</p>
                    <p className="text-gray-500 text-xs mb-4">Start your first clinical pathway</p>
                    <Link 
                      to="/pathways" 
                      className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-semibold transition-colors"
                    >
                      <span>Browse Pathways</span>
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats & Info */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Statistics
                </p>
                <h3 className="text-lg font-bold text-gray-900">Today's Overview</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-0.5">Total Pathways</div>
                    <div className="text-2xl font-bold text-gray-900">{sessions?.length || 0}</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-600 mb-0.5">Completed</div>
                      <div className="text-2xl font-bold text-gray-900">{completedSessions?.length || 0}</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-600 mb-0.5">In Progress</div>
                      <div className="text-2xl font-bold text-gray-900">{inProgressSessions?.length || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence-Based Info Card */}
            <div className="bg-gradient-to-br from-teal-500/95 to-cyan-500/95 rounded-xl p-6 text-white shadow-sm border border-teal-400/20">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Evidence-Based Medicine</h3>
                  <p className="text-xs text-teal-50">Trusted clinical guidelines</p>
                </div>
              </div>
              
              <p className="text-sm text-teal-50 leading-relaxed mb-5">
                All protocols are aligned with WHO guidelines, Indonesian PPK standards, and latest evidence-based research.
              </p>
              
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium">
                  WHO Guidelines
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium">
                  PPK Indonesia
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium">
                  Evidence-Based
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}