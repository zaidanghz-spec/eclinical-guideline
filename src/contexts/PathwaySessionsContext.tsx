import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

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
  pathway_history?: Array<{ nodeId: string; nodeName: string }>;
  updated_at?: string;
  started_at?: string;
  completed_at?: string | null;
  disease_id?: string;
  disease_name?: string;
  user_id?: string;
  current_node_id?: string | null;
}

interface PathwaySessionsContextType {
  sessions: PathwaySession[];
  loading: boolean;
  refreshSessions: () => Promise<void>;
  createSession: (diseaseId: string, diseaseName: string, patientCode?: string) => Promise<PathwaySession | null>;
  updateSession: (sessionId: string, updates: Partial<PathwaySession>) => Promise<boolean>;
  saveDraft: (
    sessionId: string, 
    checklist: Record<string, boolean>, 
    notes: Record<string, string>,
    currentNodeId: string, 
    pathwayHistory: Array<{ nodeId: string; nodeName: string }>, 
    decisions: any[],
    variations: any[]
  ) => Promise<boolean>;
  completeSession: (sessionId: string) => Promise<boolean>;
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
  };
}

export function PathwaySessionsProvider({ children }: { children: ReactNode }) {
  const { user, accessToken } = useAuth();
  const [sessions, setSessions] = useState<PathwaySession[]>([]);
  const [loading, setLoading] = useState(false);

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
        setSessions((data.sessions || []).map(mapSession));
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
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error completing session:', error);
      return false;
    }
  };

  return (
    <PathwaySessionsContext.Provider value={{ 
      sessions, loading, refreshSessions: fetchSessions, 
      createSession, updateSession, saveDraft, completeSession 
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
