import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

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
  currentSession: PathwaySession | null;
  refreshSessions: () => Promise<void>;
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

// ─── Fix #9: mapSession — validasi ID, normalize ke camelCase ────────────────
function mapSession(raw: unknown): PathwaySession {
  if (!raw || typeof raw !== 'object') {
    throw new Error('mapSession: received non-object data');
  }
  const r = raw as Record<string, unknown>;

  // Fix #9: defensive ID check — jangan biarkan id = "undefined"
  const rawId = r.id ?? r.session_id ?? r.sessionId ?? r._id;
  if (!rawId) {
    throw new Error(`mapSession: session has no ID. Keys: ${Object.keys(r).join(', ')}`);
  }

  return {
    id: String(rawId),
    userId: String(r.userId ?? r.user_id ?? ''),
    diseaseId: String(r.diseaseId ?? r.disease_id ?? ''),
    diseaseName: String(r.diseaseName ?? r.disease_name ?? ''),
    status: (r.status as PathwaySession['status']) ?? 'in_progress',
    currentNodeId: (r.currentNodeId ?? r.current_node_id ?? null) as string | null,
    checklist: (r.checklist as Record<string, boolean>) ?? {},
    decisions: (r.decisions as ClinicalDecision[]) ?? [],
    variations: (r.variations as ClinicalVariation[]) ?? [],
    notes: (r.notes as Record<string, string>) ?? {},
    startedAt: String(r.startedAt ?? r.started_at ?? ''),
    completedAt: (r.completedAt ?? r.completed_at ?? null) as string | null,
    patientCode: String(r.patientCode ?? r.patient_code ?? ''),
    pathwayHistory: (r.pathwayHistory ?? r.pathway_history ?? []) as PathwaySession['pathwayHistory'],
    updatedAt: String(r.updatedAt ?? r.updated_at ?? r.startedAt ?? r.started_at ?? ''),
    consultationStatus: ((r.consultationStatus ?? r.consultation_status) as PathwaySession['consultationStatus']) ?? 'none',
    nurseNote: String(r.nurseNote ?? r.nurse_note ?? ''),
    reportedAt: (r.reportedAt ?? r.reported_at ?? null) as string | null,
    doctorOrders: (r.doctorOrders ?? r.doctor_orders ?? null) as DoctorOrder | null,
    doctorId: (r.doctorId ?? r.doctor_id ?? null) as string | null,
    // snake_case passthrough aliases for legacy consumers
    patient_code: String(r.patientCode ?? r.patient_code ?? ''),
    current_node_id: (r.currentNodeId ?? r.current_node_id ?? null) as string | null,
    consultation_status: ((r.consultationStatus ?? r.consultation_status) as PathwaySession['consultationStatus']) ?? 'none',
    doctor_orders: (r.doctorOrders ?? r.doctor_orders ?? null) as DoctorOrder | null,
  };
}

export function PathwaySessionsProvider({ children }: { children: ReactNode }) {
  const { user, accessToken } = useAuth();
  const [sessions, setSessions] = useState<PathwaySession[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<PathwaySession | null>(null);

  const fetchSessions = useCallback(async () => {
    if (!user || !accessToken) return;
    setLoading(true);
    try {
      const res = await fetch('/api/pathway', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        const mapped = (data.sessions || []).map(mapSession);
        setSessions(mapped);
        const inProgress = mapped.find((s: PathwaySession) => s.status === 'in_progress');
        setCurrentSession(inProgress || null);
      } else {
        // Fix #24: user-facing error untuk fetch failure
        console.error('Error fetching sessions:', data.error);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      // Fix #24: user-facing notification
      toast.error('Gagal memuat sesi. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  }, [user, accessToken]);

  useEffect(() => {
    if (user && accessToken) {
      fetchSessions();
    } else {
      setSessions([]);
      setCurrentSession(null);
    }
  }, [user, accessToken, fetchSessions]);

  const createSession = async (diseaseId: string, diseaseName: string, patientCode?: string) => {
    if (!user || !accessToken) return null;
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
        setSessions(prev => [session, ...prev]);
        setCurrentSession(session);
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
        return true;
      }
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
        toast.success('Laporan berhasil dikirim ke Dokter!');
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
      sessions, loading, currentSession, refreshSessions: fetchSessions,
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
