import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  AlertCircle,
  Bell,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  LogIn,
  RefreshCw,
  Stethoscope,
  UserRound,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { usePathwaySessions } from '../hooks/usePathwaySessions';
import { consultationDoctorNames, isConsultationDoctor } from '../lib/doctorConsultation';

function formatDate(value?: string | null) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DoctorInboxPage() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { sessions, loading, refreshSessions, loadSession } = usePathwaySessions();
  const canAccess = isAdmin || isConsultationDoctor(user?.email);

  useEffect(() => {
    if (!canAccess) return;
    refreshSessions();
    const interval = window.setInterval(() => {
      refreshSessions();
    }, 8000);
    return () => window.clearInterval(interval);
  }, [canAccess, refreshSessions]);

  const pendingSessions = useMemo(() => {
    return sessions
      .filter((session) => session.consultationStatus === 'waiting_doctor' && session.status === 'in_progress')
      .sort((a, b) => new Date(b.reportedAt || b.updatedAt).getTime() - new Date(a.reportedAt || a.updatedAt).getTime());
  }, [sessions]);

  const respondedSessions = useMemo(() => {
    return sessions
      .filter((session) => session.consultationStatus === 'doctor_responded')
      .slice(0, 5);
  }, [sessions]);

  const joinSession = async (sessionId: string, diseaseId: string) => {
    await loadSession(sessionId);
    navigate(`/pathway-dynamic/${diseaseId}?session=${sessionId}`, {
      state: { sessionId, resume: true, role: 'doctor' },
    });
  };

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl border border-red-200 p-8 text-center shadow-sm">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Doctor Inbox terbatas</h1>
            <p className="text-slate-600">
              Halaman ini hanya untuk {consultationDoctorNames()} atau admin.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Doctor Inbox</h1>
                <p className="text-slate-600">Notifikasi konsultasi pathway untuk {consultationDoctorNames()}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => refreshSessions()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-teal-200 bg-white text-teal-700 font-bold hover:bg-teal-50 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-xs font-bold uppercase text-slate-400 mb-1">Menunggu dokter</div>
            <div className="text-3xl font-black text-red-600">{pendingSessions.length}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-xs font-bold uppercase text-slate-400 mb-1">Sudah direspons</div>
            <div className="text-3xl font-black text-emerald-600">{respondedSessions.length}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-xs font-bold uppercase text-slate-400 mb-1">Live sync</div>
            <div className="text-sm font-bold text-teal-700 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Auto-refresh 8 detik
            </div>
          </div>
        </div>

        {pendingSessions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Belum ada permintaan dokter</h2>
            <p className="text-slate-600">Permintaan tindakan klinis dari perawat akan muncul di sini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white rounded-2xl border border-red-100 shadow-sm p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-[260px]">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-black uppercase">
                        <Bell className="w-3.5 h-3.5" />
                        Konsultasi baru
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
                        <CalendarClock className="w-3.5 h-3.5" />
                        {formatDate(session.reportedAt || session.updatedAt)}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{session.diseaseName}</h2>
                    <div className="mt-2 grid sm:grid-cols-3 gap-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <UserRound className="w-4 h-4 text-slate-400" />
                        Pasien {session.patientCode || '-'}
                      </div>
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-slate-400" />
                        {Object.values(session.checklist).filter(Boolean).length} checklist selesai
                      </div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-slate-400" />
                        Live pathway session
                      </div>
                    </div>
                    {session.nurseNote && (
                      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="text-xs font-bold uppercase text-slate-400 mb-1">Catatan / permintaan perawat</div>
                        <pre className="whitespace-pre-wrap break-words text-sm text-slate-700 font-sans max-h-40 overflow-auto">
                          {session.nurseNote}
                        </pre>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => joinSession(session.id, session.diseaseId)}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 shadow-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    Join Live Session
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
