import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { consultationDoctorNames, isConsultationDoctor } from '../lib/doctorConsultation';

// ─── Fix #14: Typed interfaces menggantikan any[] ───────────────────────────
export interface ClinicalDecision {
  nodeId: string;
  branchId: string;
  branchTitle: string;
  selectedAt: string;
}

export interface ClinicalVariation {
  nodeId: string;
  variationReason: string;
  incompleteSteps: string[];  // Fix #14: was any[]
  documentedAt: string;
}

export interface DoctorOrder {
  diagnosis: string;
  prescription: string;      // resep / instruksi pengobatan
  instructions: string;      // instruksi tindakan tambahan
  followupPlan: string;      // rencana tindak lanjut
  referral: boolean;
  referralNote: string;
  orderedAt: string;
  doctorName: string;
}

// ─── Fix #8: Unifikasi interface — hanya camelCase, snake_case hanya di DB ───
export interface PathwaySession {
  id: string;
  userId: string;
  diseaseId: string;
  diseaseName: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  currentNodeId: string | null;
  checklist: Record<string, boolean>;
  decisions: ClinicalDecision[];     // Fix #14: typed
  variations: ClinicalVariation[];   // Fix #14: typed
  notes: Record<string, string>;
  startedAt: string;
  completedAt: string | null;
  patientCode: string;
  pathwayHistory: Array<{ nodeId: string; nodeName: string; completedAt?: string }>;
  updatedAt: string;
  // Nurse-Doctor collaboration
  consultationStatus: 'none' | 'waiting_doctor' | 'doctor_responded';
  nurseNote: string;
  reportedAt: string | null;
  doctorOrders: DoctorOrder | null;
  doctorId: string | null;

  // Fix #8: Snake_case aliases retained ONLY for DB/API compat — consumers should use camelCase
  /** @deprecated use patientCode */ patient_code?: string;
  /** @deprecated use pathwayHistory */ pathway_history?: PathwaySession['pathwayHistory'];
  /** @deprecated use currentNodeId */ current_node_id?: string | null;
  /** @deprecated use consultationStatus */ consultation_status?: PathwaySession['consultationStatus'];
  /** @deprecated use doctorOrders */ doctor_orders?: DoctorOrder | null;
  // Legacy fields from earlier API versions
  started_at?: string;
  updated_at?: string;
  completed_at?: string | null;
  disease_id?: string;
  disease_name?: string;
  user_id?: string;
  nurse_note?: string;
  reported_at?: string | null;
  doctor_id?: string | null;
}

interface PathwaySessionsContextType {
  sessions: PathwaySession[];
  loading: boolean;
  authError: string | null;
  currentSession: PathwaySession | null;
  refreshSessions: () => Promise<PathwaySession[]>;
  loadSession: (sessionId: string) => Promise<PathwaySession | null>;
  getSessionsByPatientCode: (patientCode: string) => Promise<PathwaySession[]>;
  createSession: (diseaseId: string, diseaseName: string, patientCode?: string) => Promise<PathwaySession | null>;
  updateSession: (sessionId: string, updates: Partial<PathwaySession>) => Promise<boolean>;
  saveDraft: (
    sessionId: string,
    checklist: Record<string, boolean>,
    notes: Record<string, string>,
    currentNodeId: string,
    pathwayHistory: PathwaySession['pathwayHistory'],
    decisions: ClinicalDecision[],
    variations: ClinicalVariation[]
  ) => Promise<boolean>;
  completeSession: (sessionId: string) => Promise<boolean>;
  deleteSession: (sessionId: string) => Promise<boolean>;
  reportToDoctor: (sessionId: string, nurseNote: string) => Promise<boolean>;
  submitDoctorOrder: (sessionId: string, order: Omit<DoctorOrder, 'orderedAt' | 'doctorName'>) => Promise<boolean>;
}

const PathwaySessionsContext = createContext<PathwaySessionsContextType | undefined>(undefined);
const DEV_SESSIONS_KEY = 'dev_pathway_sessions';

function isDevToken(token: string | null) {
  return import.meta.env.DEV && !!token?.startsWith('dev-token:');
}

function readDevSessions(): PathwaySession[] {
  try {
    return JSON.parse(localStorage.getItem(DEV_SESSIONS_KEY) || '[]') as PathwaySession[];
  } catch {
    return [];
  }
}

function writeDevSessions(sessions: PathwaySession[]) {
  localStorage.setItem(DEV_SESSIONS_KEY, JSON.stringify(sessions));
}

function updateDevSession(sessionId: string, updater: (session: PathwaySession) => PathwaySession) {
  const sessions = readDevSessions();
  const updated = sessions.map((session) => session.id === sessionId ? updater(session) : session);
  writeDevSessions(updated);
  return updated.find((session) => session.id === sessionId) || null;
}

async function readApiJson(res: Response) {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }

  const body = await res.text();
  throw new Error(`Unexpected ${res.status} ${res.statusText || 'response'} from pathway API: ${body.slice(0, 140)}`);
}

function parseJsonValue<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value !== 'string') return value as T;
  try {
    const parsed = JSON.parse(value);
    return parsed === null || parsed === undefined ? fallback : parsed as T;
  } catch {
    console.warn('[PathwaySessions] Ignoring malformed JSON session field');
    return fallback;
  }
}

function normalizeChecklist(value: unknown): Record<string, boolean> {
  const parsed = parseJsonValue<Record<string, unknown>>(value, {});
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
  return Object.fromEntries(
    Object.entries(parsed).map(([key, val]) => [key, Boolean(val)])
  );
}

function normalizeNotes(value: unknown): Record<string, string> {
  const parsed = parseJsonValue<Record<string, unknown>>(value, {});
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
  return Object.fromEntries(
    Object.entries(parsed).map(([key, val]) => [key, val === null || val === undefined ? '' : String(val)])
  );
}

function normalizeArray<T>(value: unknown): T[] {
  const parsed = parseJsonValue<unknown>(value, []);
  return Array.isArray(parsed) ? parsed as T[] : [];
}

function normalizeSessionId(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function mapSessions(rawSessions: unknown): PathwaySession[] {
  const rows = Array.isArray(rawSessions) ? rawSessions : [];
  const mapped: PathwaySession[] = [];
  let skipped = 0;

  rows.forEach((row, index) => {
    try {
      mapped.push(mapSession(row));
    } catch (error) {
      skipped += 1;
      console.warn(`[PathwaySessions] Skipping invalid pathway session row #${index + 1}`, error);
    }
  });

  if (skipped > 0) {
    console.warn(`[PathwaySessions] Skipped ${skipped} invalid pathway session row(s) from API response`);
  }

  return mapped;
}

// ─── Fix #9: mapSession — validasi ID, normalize ke camelCase ────────────────
function mapSession(raw: unknown): PathwaySession {
  if (!raw || typeof raw !== 'object') {
    throw new Error('mapSession: received non-object data');
  }
  const r = raw as Record<string, unknown>;

  // Fix #9: defensive ID check — jangan biarkan id = "undefined"
  const rawId = normalizeSessionId(r.id ?? r.session_id ?? r.sessionId ?? r._id);
  if (!rawId) {
    throw new Error(`mapSession: session has no ID. Keys: ${Object.keys(r).join(', ')}`);
  }

  const checklist = normalizeChecklist(r.checklist);
  const notes = normalizeNotes(r.notes);
  const decisions = normalizeArray<ClinicalDecision>(r.decisions);
  const variations = normalizeArray<ClinicalVariation>(r.variations)
    .map((variation) => ({
      ...variation,
      incompleteSteps: Array.isArray(variation.incompleteSteps) ? variation.incompleteSteps : [],
    }));
  const pathwayHistory = normalizeArray<{ nodeId: string; nodeName: string; completedAt?: string }>(r.pathwayHistory ?? r.pathway_history)
    .filter((entry) => entry && typeof entry.nodeId === 'string');
  const doctorOrders = parseJsonValue<DoctorOrder | null>(r.doctorOrders ?? r.doctor_orders, null);

  return {
    id: rawId,
    userId: String(r.userId ?? r.user_id ?? ''),
    diseaseId: String(r.diseaseId ?? r.disease_id ?? ''),
    diseaseName: String(r.diseaseName ?? r.disease_name ?? ''),
    status: (r.status as PathwaySession['status']) ?? 'in_progress',
    currentNodeId: (r.currentNodeId ?? r.current_node_id ?? null) as string | null,
    checklist,
    decisions,
    variations,
    notes,
    startedAt: String(r.startedAt ?? r.started_at ?? ''),
    completedAt: (r.completedAt ?? r.completed_at ?? null) as string | null,
    patientCode: String(r.patientCode ?? r.patient_code ?? ''),
    pathwayHistory,
    updatedAt: String(r.updatedAt ?? r.updated_at ?? r.startedAt ?? r.started_at ?? ''),
    consultationStatus: ((r.consultationStatus ?? r.consultation_status) as PathwaySession['consultationStatus']) ?? 'none',
    nurseNote: String(r.nurseNote ?? r.nurse_note ?? ''),
    reportedAt: (r.reportedAt ?? r.reported_at ?? null) as string | null,
    doctorOrders,
    doctorId: (r.doctorId ?? r.doctor_id ?? null) as string | null,
    // snake_case passthrough aliases for legacy consumers
    patient_code: String(r.patientCode ?? r.patient_code ?? ''),
    current_node_id: (r.currentNodeId ?? r.current_node_id ?? null) as string | null,
    consultation_status: ((r.consultationStatus ?? r.consultation_status) as PathwaySession['consultationStatus']) ?? 'none',
    doctor_orders: doctorOrders,
  };
}

export function PathwaySessionsProvider({ children }: { children: ReactNode }) {
  const { user, accessToken } = useAuth();
  const [sessions, setSessions] = useState<PathwaySession[]>([]);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<PathwaySession | null>(null);
  const fetchSeqRef = useRef(0);
  const mountedRef = useRef(true);
  const sessionsLoadedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      fetchSeqRef.current += 1;
    };
  }, []);

  const fetchSessions = useCallback(async (): Promise<PathwaySession[]> => {
    if (!user || !accessToken) return [];
    const seq = ++fetchSeqRef.current;
    if (isDevToken(accessToken)) {
      const devSessions = readDevSessions();
      if (!mountedRef.current || seq !== fetchSeqRef.current) return devSessions;
      setSessions(devSessions);
      setCurrentSession(devSessions.find(s => s.status === 'in_progress') || null);
      setAuthError(null);
      sessionsLoadedRef.current = true;
      setLoading(false);
      return devSessions;
    }
    if (!sessionsLoadedRef.current) {
      setLoading(true);
    }
    try {
      const res = await fetch('/api/pathway', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await readApiJson(res);
      if (res.ok) {
        const mapped = mapSessions(data.sessions);
        if (!mountedRef.current || seq !== fetchSeqRef.current) return mapped;
        setSessions(mapped);
        const inProgress = mapped.find((s: PathwaySession) => s.status === 'in_progress');
        setCurrentSession(inProgress || null);
        const skippedCount = Array.isArray(data.sessions) ? data.sessions.length - mapped.length : 0;
        setAuthError(skippedCount > 0 ? `${skippedCount} sesi lama tidak ditampilkan karena ID data kosong. Sesi lain tetap bisa digunakan.` : null);
        sessionsLoadedRef.current = true;
        return mapped;
      } else {
        // Fix #24: user-facing error untuk fetch failure
        console.error('Error fetching sessions:', data.error);
        if (mountedRef.current && seq === fetchSeqRef.current) {
          const message = res.status === 401
            ? 'Sesi login sudah tidak valid. Silakan logout lalu login ulang.'
            : `Gagal memuat sesi pathway dari server (${res.status}). ${data.error || 'Coba refresh halaman.'}`;
          setAuthError(message);
          toast.error(message);
        }
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      // Fix #24: user-facing notification
      if (mountedRef.current && seq === fetchSeqRef.current) {
        const message = error instanceof Error
          ? `Gagal memuat sesi pathway. Masalahnya kemungkinan di API/server, bukan koneksi internet. Detail: ${error.message}`
          : 'Gagal memuat sesi pathway. Masalahnya kemungkinan di API/server, bukan koneksi internet.';
        setAuthError(message);
        toast.error('Gagal memuat sesi pathway dari server.');
      }
    } finally {
      if (mountedRef.current && seq === fetchSeqRef.current) {
        setLoading(false);
      }
    }
    return [];
  }, [user, accessToken]);

  useEffect(() => {
    if (user && accessToken) {
      fetchSessions();
    } else {
      setSessions([]);
      setCurrentSession(null);
      setAuthError(null);
      sessionsLoadedRef.current = false;
    }
  }, [user, accessToken, fetchSessions]);

  useEffect(() => {
    if (!user || !accessToken) return;
    if (!isConsultationDoctor(user.email) && user.role !== 'admin') return;

    const interval = window.setInterval(() => {
      fetchSessions();
    }, 15000);
    return () => window.clearInterval(interval);
  }, [accessToken, fetchSessions, user]);

  const loadSession = useCallback(async (sessionId: string): Promise<PathwaySession | null> => {
    if (!user || !accessToken || !sessionId) return null;
    const localSession = sessions.find(session => session.id === sessionId);
    if (localSession) {
      setCurrentSession(localSession);
      return localSession;
    }

    const latestSessions = await fetchSessions();
    const refreshedSession = latestSessions.find(session => session.id === sessionId) || null;
    if (refreshedSession) {
      setCurrentSession(refreshedSession);
      setAuthError(null);
      return refreshedSession;
    }

    setAuthError('Sesi pathway tidak ditemukan atau tidak dapat diakses.');
    return null;
  }, [accessToken, fetchSessions, sessions, user]);

  const getSessionsByPatientCode = useCallback(async (patientCode: string): Promise<PathwaySession[]> => {
    if (!user || !accessToken) return [];
    const normalizedCode = patientCode.trim().toLowerCase();
    if (!normalizedCode) return [];

    const latestSessions = await fetchSessions();
    const sourceSessions = latestSessions.length > 0 ? latestSessions : sessions;
    const matches = sourceSessions.filter(session =>
      (session.patientCode || session.patient_code || '').trim().toLowerCase() === normalizedCode
    );
    return matches;
  }, [accessToken, fetchSessions, sessions, user]);

  const createSession = async (diseaseId: string, diseaseName: string, patientCode?: string) => {
    if (!user || !accessToken) return null;
    if (isDevToken(accessToken)) {
      const existing = readDevSessions().find(
        session => session.diseaseId === diseaseId && session.patientCode === (patientCode || '') && session.status === 'in_progress'
      );
      if (existing) {
        setCurrentSession(existing);
        return existing;
      }
      const now = new Date().toISOString();
      const session: PathwaySession = {
        id: `dev-session-${crypto.randomUUID()}`,
        userId: user.id,
        diseaseId,
        diseaseName,
        status: 'in_progress',
        currentNodeId: null,
        checklist: {},
        decisions: [],
        variations: [],
        notes: {},
        startedAt: now,
        completedAt: null,
        patientCode: patientCode || '',
        pathwayHistory: [],
        updatedAt: now,
        consultationStatus: 'none',
        nurseNote: '',
        reportedAt: null,
        doctorOrders: null,
        doctorId: null,
      };
      const sessions = [session, ...readDevSessions()];
      writeDevSessions(sessions);
      setSessions(sessions);
      setCurrentSession(session);
      return session;
    }
    try {
      const res = await fetch('/api/pathway?action=create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ diseaseId, diseaseName, patientCode }),
      });
      const data = await res.json();
      if (res.ok && data.session) {
        const session = mapSession(data.session);
        setSessions(prev => [session, ...prev.filter(existing => existing.id !== session.id)]);
        setCurrentSession(session);
        setAuthError(null);
        return session;
      }
      // Fix #24: error response handling
      toast.error(`Gagal membuat sesi: ${data.error || 'Kesalahan server'}`);
      return null;
    } catch (error) {
      console.error('Error creating session:', error);
      // Fix #24: user-facing error
      toast.error('Gagal membuat sesi. Periksa koneksi internet Anda.');
      return null;
    }
  };

  const updateSession = async (sessionId: string, updates: Partial<PathwaySession>) => {
    if (!user || !accessToken) return false;
    if (isDevToken(accessToken)) {
      const session = updateDevSession(sessionId, prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
      if (!session) return false;
      const sessions = readDevSessions();
      setSessions(sessions);
      setCurrentSession(session.status === 'in_progress' ? session : null);
      return true;
    }
    try {
      const res = await fetch('/api/pathway?action=update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ sessionId, ...updates }),
      });
      const data = await res.json();
      if (res.ok && data.session) {
        const session = mapSession(data.session);
        setSessions(prev => prev.map(s => s.id === session.id ? session : s));
        setCurrentSession(prev => prev?.id === session.id ? session : prev);
        setAuthError(null);
        return true;
      }
      setAuthError(data.error || 'Gagal memperbarui sesi pathway');
      return false;
    } catch (error) {
      console.error('Error updating session:', error);
      return false;
    }
  };

  const saveDraft = async (
    sessionId: string,
    checklist: Record<string, boolean>,
    notes: Record<string, string>,
    currentNodeId: string,
    pathwayHistory: PathwaySession['pathwayHistory'],
    decisions: ClinicalDecision[],
    variations: ClinicalVariation[]
  ) => {
    if (!user || !accessToken) return false;
    if (isDevToken(accessToken)) {
      const session = updateDevSession(sessionId, prev => ({
        ...prev,
        checklist,
        notes,
        currentNodeId,
        pathwayHistory,
        decisions,
        variations,
        status: 'in_progress',
        updatedAt: new Date().toISOString(),
      }));
      if (!session) return false;
      setSessions(readDevSessions());
      setCurrentSession(session);
      return true;
    }
    try {
      const res = await fetch('/api/pathway?action=update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          sessionId, checklist, notes, currentNodeId,
          pathwayHistory, decisions, variations, status: 'in_progress'
        }),
      });
      const data = await res.json();
      if (res.ok && data.session) {
        const session = mapSession(data.session);
        setSessions(prev => prev.map(s => s.id === session.id ? session : s));
        setCurrentSession(prev => prev?.id === session.id ? session : prev);
        setAuthError(null);
        toast.success('Draf berhasil disimpan');
        return true;
      }
      // Fix #24: user-visible error jika save gagal
      toast.error('Gagal menyimpan draf. Data mungkin tidak tersimpan.', { duration: 5000 });
      return false;
    } catch (error) {
      console.error('Error saving draft:', error);
      // Fix #24: kritis — perawat di klinik harus tahu jika save gagal
      toast.error('Gagal menyimpan data. Pastikan koneksi internet stabil sebelum melanjutkan.', {
        duration: 8000,
        description: 'Coba simpan ulang secara manual dengan tombol Simpan.',
      });
      return false;
    }
  };

  const completeSession = async (sessionId: string) => {
    if (!user || !accessToken) return false;
    if (isDevToken(accessToken)) {
      updateDevSession(sessionId, prev => ({
        ...prev,
        status: 'completed',
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      setSessions(readDevSessions());
      setCurrentSession(null);
      toast.success('Pemeriksaan selesai!');
      return true;
    }
    try {
      const res = await fetch('/api/pathway?action=complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ sessionId }),
      });
      if (res.ok) {
        toast.success('Pemeriksaan selesai!');
        await fetchSessions();
        setCurrentSession(null);
        return true;
      }
      const data = await res.json();
      // Fix #24
      toast.error(`Gagal menyelesaikan sesi: ${data.error || 'Kesalahan server'}`);
      return false;
    } catch (error) {
      console.error('Error completing session:', error);
      toast.error('Gagal menyelesaikan sesi. Periksa koneksi Anda.');
      return false;
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!user || !accessToken) return false;
    if (isDevToken(accessToken)) {
      const sessions = readDevSessions().filter(session => session.id !== sessionId);
      writeDevSessions(sessions);
      setSessions(sessions);
      toast.success('Sesi berhasil dihapus');
      return true;
    }
    try {
      const res = await fetch('/api/pathway', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (res.ok && data.deleted) {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        setCurrentSession(prev => prev?.id === sessionId ? null : prev);
        toast.success('Sesi berhasil dihapus');
        return true;
      }
      toast.error(`Gagal menghapus sesi: ${data.error || 'Tidak ditemukan'}`);
      return false;
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error('Gagal menghapus sesi.');
      return false;
    }
  };

  // Perawat melaporkan sesi ke Dokter
  const reportToDoctor = async (sessionId: string, nurseNote: string) => {
    if (!user || !accessToken) return false;
    if (isDevToken(accessToken)) {
      const session = updateDevSession(sessionId, prev => ({
        ...prev,
        consultationStatus: 'waiting_doctor',
        nurseNote,
        reportedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      if (!session) return false;
      setSessions(readDevSessions());
      toast.success(`Laporan masuk ke Doctor Inbox ${consultationDoctorNames()}`);
      return true;
    }
    try {
      const res = await fetch('/api/pathway?action=report', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ sessionId, nurseNote }),
      });
      const data = await res.json();
      if (res.ok && data.session) {
        const session = mapSession(data.session);
        setSessions(prev => prev.map(s => s.id === session.id ? session : s));
        setCurrentSession(prev => prev?.id === session.id ? session : prev);
        toast.success(`Laporan masuk ke Doctor Inbox ${consultationDoctorNames()}`);
        return true;
      }
      toast.error('Gagal mengirim laporan ke dokter');
      return false;
    } catch (error) {
      console.error('Error reporting to doctor:', error);
      toast.error('Gagal mengirim laporan. Periksa koneksi Anda.');
      return false;
    }
  };

  // Dokter mengisi instruksi / resep
  const submitDoctorOrder = async (sessionId: string, order: Omit<DoctorOrder, 'orderedAt' | 'doctorName'>) => {
    if (!user || !accessToken) return false;
    if (isDevToken(accessToken)) {
      const fullOrder: DoctorOrder = {
        ...order,
        orderedAt: new Date().toISOString(),
        doctorName: user.name,
      };
      const session = updateDevSession(sessionId, prev => ({
        ...prev,
        doctorOrders: fullOrder,
        consultationStatus: 'doctor_responded',
        doctorId: user.id,
        updatedAt: new Date().toISOString(),
      }));
      if (!session) return false;
      setSessions(readDevSessions());
      toast.success('Instruksi dokter berhasil dikirim!');
      return true;
    }
    try {
      const fullOrder: DoctorOrder = {
        ...order,
        orderedAt: new Date().toISOString(),
        doctorName: user.name,
      };
      const res = await fetch('/api/pathway?action=doctor-order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ sessionId, doctorOrders: fullOrder }),
      });
      const data = await res.json();
      if (res.ok && data.session) {
        const session = mapSession(data.session);
        setSessions(prev => prev.map(s => s.id === session.id ? session : s));
        setCurrentSession(prev => prev?.id === session.id ? session : prev);
        toast.success('Instruksi dokter berhasil dikirim!');
        return true;
      }
      toast.error('Gagal mengirim instruksi dokter');
      return false;
    } catch (error) {
      console.error('Error submitting doctor order:', error);
      toast.error('Gagal mengirim instruksi. Periksa koneksi Anda.');
      return false;
    }
  };

  return (
    <PathwaySessionsContext.Provider value={{
      sessions, loading, authError, currentSession, refreshSessions: fetchSessions,
      loadSession, getSessionsByPatientCode,
      createSession, updateSession, saveDraft, completeSession, deleteSession,
      reportToDoctor, submitDoctorOrder,
    }}>
      {children}
    </PathwaySessionsContext.Provider>
  );
}

export function usePathwaySessions() {
  const context = useContext(PathwaySessionsContext);
  if (context === undefined) {
    throw new Error('usePathwaySessions must be used within a PathwaySessionsProvider');
  }
  return context;
}
