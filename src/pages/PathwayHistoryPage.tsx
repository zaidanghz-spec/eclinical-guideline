import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  PlayCircle,
  FileText,
  Trash2,
  AlertCircle,
  Activity,
  TrendingUp,
  History,
  Filter,
  Search,
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePathwaySessions, PathwaySession } from '../hooks/usePathwaySessions';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';

export default function PathwayHistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { sessions, loading, loadSession, getSessionsByPatientCode } = usePathwaySessions();
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [patientCodeSearch, setPatientCodeSearch] = useState('');
  const [patientSessions, setPatientSessions] = useState<PathwaySession[] | null>(null);
  const [searchingPatient, setSearchingPatient] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const filteredSessions = sessions.filter(session => {
    // Filter by status
    if (filter !== 'all' && session.status !== filter) {
      return false;
    }

    // Filter by search query
    if (searchQuery && !session.diseaseName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const inProgressCount = sessions.filter(s => s.status === 'in_progress').length;
  const completedCount = sessions.filter(s => s.status === 'completed').length;

  const handleResumeSession = async (session: PathwaySession) => {
    await loadSession(session.id);
    navigate(`/pathway-dynamic/${session.diseaseId}`, { 
      state: { sessionId: session.id, resume: true } 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDuration = (startedAt: string, completedAt: string | null) => {
    const start = new Date(startedAt);
    const end = completedAt ? new Date(completedAt) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m`;
    }
  };

  const getCompletionPercentage = (session: PathwaySession) => {
    const totalChecked = Object.values(session.checklist).filter(Boolean).length;
    const total = Object.keys(session.checklist).length;
    return total > 0 ? Math.round((totalChecked / total) * 100) : 0;
  };

  const handleSearchByPatientCode = async () => {
    if (!patientCodeSearch.trim()) return;
    setSearchingPatient(true);
    const results = await getSessionsByPatientCode(patientCodeSearch.trim());
    setPatientSessions(results);
    setSearchingPatient(false);
  };

  const displaySessions = patientSessions !== null ? patientSessions : filteredSessions;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Loading pathway history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/home')}
                className="p-2 hover:bg-white rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-slate-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Pathway History</h1>
                <p className="text-slate-600 mt-1">
                  All your clinical pathway sessions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl border border-slate-200 px-4 py-2">
                <div className="text-sm text-slate-600">Total Sessions</div>
                <div className="text-2xl font-bold text-teal-600">{sessions.length}</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">In Progress</div>
                  <div className="text-2xl font-bold text-slate-900">{inProgressCount}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Completed</div>
                  <div className="text-2xl font-bold text-slate-900">{completedCount}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Completion Rate</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {sessions.length > 0 ? Math.round((completedCount / sessions.length) * 100) : 0}%
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Patient Code Search */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200 p-4 mb-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
                <input
                  type="text"
                  value={patientCodeSearch}
                  onChange={(e) => {
                    setPatientCodeSearch(e.target.value);
                    if (!e.target.value.trim()) setPatientSessions(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchByPatientCode()}
                  placeholder="Search by patient code (e.g. P00123)..."
                  className="w-full pl-10 pr-4 py-2.5 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                />
              </div>
              <button
                onClick={handleSearchByPatientCode}
                disabled={searchingPatient || !patientCodeSearch.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {searchingPatient ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Search Patient</span>
              </button>
              {patientSessions !== null && (
                <button
                  onClick={() => { setPatientSessions(null); setPatientCodeSearch(''); }}
                  className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-all"
                >
                  Clear
                </button>
              )}
            </div>
            {patientSessions !== null && (
              <div className="mt-2 text-sm text-teal-700 font-medium">
                Found {patientSessions.length} session(s) for patient code: {patientCodeSearch}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by disease name..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="all">All Status</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sessions List */}
        {displaySessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-slate-200 p-12 text-center"
          >
            <History className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Sessions Found</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery || filter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Start your first clinical pathway to see history here'}
            </p>
            <Link
              to="/pathways"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all"
            >
              <Activity className="w-5 h-5" />
              <span>Browse Pathways</span>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {displaySessions.map((session, index) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  index={index}
                  onResume={handleResumeSession}
                  formatDate={formatDate}
                  calculateDuration={calculateDuration}
                  getCompletionPercentage={getCompletionPercentage}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// Session Card Component
function SessionCard({
  session,
  index,
  onResume,
  formatDate,
  calculateDuration,
  getCompletionPercentage
}: {
  session: PathwaySession;
  index: number;
  onResume: (session: PathwaySession) => void;
  formatDate: (date: string) => string;
  calculateDuration: (start: string, end: string | null) => string;
  getCompletionPercentage: (session: PathwaySession) => number;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const percentage = getCompletionPercentage(session);
  const isCompleted = session.status === 'completed';

  const statusColors = {
    in_progress: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      badge: 'bg-blue-100'
    },
    completed: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      badge: 'bg-green-100'
    },
    abandoned: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-700',
      badge: 'bg-slate-100'
    }
  };

  const colors = statusColors[session.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border-2 border-slate-200 hover:border-teal-300 transition-all shadow-sm hover:shadow-lg overflow-hidden"
    >
      {/* Main Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            {/* Disease Name */}
            <h3 className="text-xl font-bold text-slate-900 mb-1">{session.diseaseName}</h3>
            {(session.patient_code || session.patientCode) && (
              <div className="text-sm text-teal-600 font-medium mb-2">
                Patient: {session.patient_code || session.patientCode}
              </div>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(session.startedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{calculateDuration(session.startedAt, session.completedAt)}</span>
              </div>
              <div className={`px-2 py-1 ${colors.badge} ${colors.text} rounded-lg font-semibold text-xs uppercase`}>
                {session.status.replace('_', ' ')}
              </div>
            </div>
          </div>

          {/* Status Icon */}
          <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center`}>
            {isCompleted ? (
              <CheckCircle2 className={`w-8 h-8 ${colors.text}`} />
            ) : (
              <PlayCircle className={`w-8 h-8 ${colors.text}`} />
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-600 font-medium">Completion Progress</span>
            <span className="text-teal-600 font-bold">{percentage}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${isCompleted ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-teal-500 to-cyan-600'}`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!isCompleted && (
            <button
              onClick={() => onResume(session)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Resume Pathway</span>
            </button>
          )}
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`${isCompleted ? 'flex-1' : ''} px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2`}
          >
            <FileText className="w-5 h-5" />
            <span>{showDetails ? 'Hide' : 'View'} Details</span>
          </button>

          {/* TODO: Export PDF button
          <button
            className="px-4 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
          </button>
          */}
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-200 bg-slate-50"
          >
            <div className="p-6 space-y-4">
              {/* Session Info */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Session Information</h4>
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Session ID:</span>
                    <span className="text-slate-900 font-mono">{session.id.slice(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Started:</span>
                    <span className="text-slate-900">{formatDate(session.startedAt)}</span>
                  </div>
                  {session.completedAt && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Completed:</span>
                      <span className="text-slate-900">{formatDate(session.completedAt)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-600">Current Node:</span>
                    <span className="text-slate-900">{session.currentNodeId || 'Not started'}</span>
                  </div>
                </div>
              </div>

              {/* Checklist Progress */}
              {Object.keys(session.checklist).length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Checklist Progress ({Object.values(session.checklist).filter(Boolean).length}/{Object.keys(session.checklist).length})
                  </h4>
                  <div className="bg-white rounded-xl border border-slate-200 p-4 max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {Object.entries(session.checklist).slice(0, 10).map(([key, checked]) => (
                        <div key={key} className="flex items-center gap-2 text-sm">
                          {checked ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-slate-300 rounded-full flex-shrink-0" />
                          )}
                          <span className={checked ? 'text-slate-900' : 'text-slate-500'}>
                            {key}
                          </span>
                        </div>
                      ))}
                      {Object.keys(session.checklist).length > 10 && (
                        <p className="text-xs text-slate-500 italic">
                          +{Object.keys(session.checklist).length - 10} more items...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Clinical Notes */}
              {Object.keys(session.notes).length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Clinical Notes ({Object.keys(session.notes).length})
                  </h4>
                  <div className="bg-white rounded-xl border border-slate-200 p-4 max-h-48 overflow-y-auto">
                    <div className="space-y-3">
                      {Object.entries(session.notes).map(([key, note]) => (
                        <div key={key} className="text-sm">
                          <div className="font-semibold text-slate-700 mb-1">{key}:</div>
                          <div className="text-slate-600 bg-slate-50 rounded-lg p-2">{note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Decisions Made */}
              {session.decisions && session.decisions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Clinical Decisions ({session.decisions.length})
                  </h4>
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="space-y-2">
                      {session.decisions.map((decision, idx) => (
                        <div key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-slate-400">{idx + 1}.</span>
                          <span className="text-slate-900">{decision.branchTitle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Variations */}
              {session.variations && session.variations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    Clinical Variations ({session.variations.length})
                  </h4>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <div className="space-y-3">
                      {session.variations.map((variation, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-semibold text-orange-900 mb-1">
                            Variation {idx + 1}:
                          </div>
                          <div className="text-orange-800">{variation.variationReason}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}