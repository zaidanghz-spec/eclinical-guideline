import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

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

export interface PathwaySession {
  id: string;
  userId: string;
  diseaseId: string;
  diseaseName: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  currentNodeId: string | null;
  checklist: Record<string, boolean>;
  decisions: Array<{
    nodeId: string;
    branchId: string;
    branchTitle: string;
    selectedAt: string;
  }>;
  variations: Array<{
    nodeId: string;
    variationReason: string;
    incompleteSteps: any[];
    documentedAt: string;
  }>;
  notes: Record<string, string>;
  startedAt: string;
  completedAt: string | null;
  patient_code?: string;
  pathway_history?: Array<{ nodeId: string; nodeName: string; completedAt?: string }>;
  updated_at?: string;
  started_at?: string;
  completed_at?: string | null;
  disease_id?: string;
  disease_name?: string;
  user_id?: string;
  current_node_id?: string | null;
  // Nurse-Doctor collaboration fields
  consultation_status?: 'none' | 'waiting_doctor' | 'doctor_responded';
  nurse_note?: string;
  reported_at?: string | null;
  doctor_orders?: DoctorOrder | null;
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
    pathwayHistory: Array<{ nodeId: string; nodeName: string; completedAt?: string }>, 
    decisions: any[],
    variations: any[]
  ) => Promise<boolean>;
  completeSession: (sessionId: string) => Promise<boolean>;
  deleteSession: (sessionId: string) => Promise<boolean>;
  reportToDoctor: (sessionId: string, nurseNote: string) => Promise<boolean>;
  submitDoctorOrder: (sessionId: string, order: Omit<DoctorOrder, 'orderedAt' | 'doctorName'>) => Promise<boolean>;
}

const PathwaySessionsContext = createContext<PathwaySessionsContextType | undefined>(undefined);

function mapSession(raw: any): PathwaySession {
  return {
    id: String(raw.id || raw.session_id || raw.sessionId || raw._id),
    userId: raw.userId || raw.user_id,
    diseaseId: raw.diseaseId || raw.disease_id,
    diseaseName: raw.diseaseName || raw.disease_name,
    status: raw.status || 'in_progress',
    currentNodeId: raw.currentNodeId || raw.current_node_id || null,
    checklist: raw.checklist || {},
    decisions: raw.decisions || [],
    variations: raw.variations || [],
    notes: raw.notes || {},
    startedAt: raw.startedAt || raw.started_at || '',
    completedAt: raw.completedAt || raw.completed_at || null,
    patient_code: raw.patientCode || raw.patient_code || '',
    pathway_history: raw.pathwayHistory || raw.pathway_history || [],
    updated_at: raw.updatedAt || raw.updated_at || raw.startedAt || '',
    started_at: raw.startedAt || raw.started_at || '',
    completed_at: raw.completedAt || raw.completed_at || null,
    disease_id: raw.diseaseId || raw.disease_id,
    disease_name: raw.diseaseName || raw.disease_name,
    user_id: raw.userId || raw.user_id,
    current_node_id: raw.currentNodeId || raw.current_node_id || null,
    // Collaboration fields
    consultation_status: raw.consultation_status || 'none',
    nurse_note: raw.nurse_note || '',
    reported_at: raw.reported_at || null,
    doctor_orders: raw.doctor_orders || null,
    doctor_id: raw.doctor_id || null,
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
        // The most recent in-progress session is the "current" one
        const inProgress = mapped.find((s: PathwaySession) => s.status === 'in_progress');
        setCurrentSession(inProgress || null);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
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
      return null;
    } catch (error) {
      console.error('Error creating session:', error);
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
    sessionId: string, checklist: Record<string, boolean>, notes: Record<string, string>,
    currentNodeId: string, pathwayHistory: any[], decisions: any[], variations: any[]
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
      return false;
    } catch (error) {
      console.error('Error saving draft:', error);
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
      const data = await res.json();
      if (res.ok) {
        toast.success('Pemeriksaan selesai!');
        await fetchSessions();
        setCurrentSession(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error completing session:', error);
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
      return false;
    } catch (error) {
      console.error('Error deleting session:', error);
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
      return false;
    } catch (error) {
      console.error('Error reporting to doctor:', error);
      toast.error('Gagal mengirim laporan');
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
      return false;
    } catch (error) {
      console.error('Error submitting doctor order:', error);
      toast.error('Gagal mengirim instruksi');
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
