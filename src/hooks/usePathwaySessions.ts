import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = '/api';

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
  user_id?: string;
  disease_id?: string;
  disease_name?: string;
  current_node_id?: string | null;
  started_at?: string;
  completed_at?: string | null;
  updated_at?: string;
  patient_code?: string;
  pathway_history?: Array<{ nodeId: string; nodeName: string }>;
}

function mapSession(raw: any): PathwaySession {
  return {
    id: raw.id,
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
    user_id: raw.userId || raw.user_id,
    disease_id: raw.diseaseId || raw.disease_id,
    disease_name: raw.diseaseName || raw.disease_name,
    current_node_id: raw.currentNodeId || raw.current_node_id || null,
    started_at: raw.startedAt || raw.started_at || '',
    completed_at: raw.completedAt || raw.completed_at || null,
    updated_at: raw.updatedAt || raw.updated_at || raw.startedAt || '',
    patient_code: raw.patientCode || raw.patient_code || '',
    pathway_history: raw.pathwayHistory || raw.pathway_history || [],
  };
}

export function usePathwaySessions() {
  const { user, accessToken } = useAuth();
  const [sessions, setSessions] = useState<PathwaySession[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<PathwaySession | null>(null);
  const [authError, setAuthError] = useState(false);

  const getHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  }), [accessToken]);

  const fetchSessions = useCallback(async () => {
    if (!user || !accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/pathway`, { headers: getHeaders() });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) setAuthError(true);
        throw new Error(data.error || 'Failed to fetch sessions');
      }
      setSessions((data.sessions || []).map(mapSession));
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, [user, accessToken, getHeaders]);

  const createSession = async (
    diseaseId: string, diseaseName: string, _patientCode?: string
  ): Promise<PathwaySession | null> => {
    if (!user || !accessToken) { toast.error('Please sign in to save progress'); return null; }
    try {
      const res = await fetch(`${API_BASE}/pathway?action=create`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ diseaseId, diseaseName, patientCode: _patientCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create session');
      const session = mapSession(data.session);
      setCurrentSession(session);
      await fetchSessions();
      return session;
    } catch (error: any) {
      console.error('Error creating session:', error);
      toast.error('Failed to create session', { description: error.message });
      return null;
    }
  };

  const updateSession = async (sessionId: string, updates: Partial<PathwaySession>): Promise<boolean> => {
    if (!user || !accessToken) return false;
    try {
      const res = await fetch(`${API_BASE}/pathway?action=update`, {
        method: 'PUT', headers: getHeaders(),
        body: JSON.stringify({ sessionId, ...updates }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update session');
      const session = mapSession(data.session);
      setCurrentSession(session);
      return true;
    } catch (error: any) {
      console.error('Error updating session:', error);
      return false;
    }
  };

  const saveDraft = async (
    sessionId: string, checklist: Record<string, boolean>, notes: Record<string, string>,
    currentNodeId: string, pathwayHistory: Array<{ nodeId: string; nodeName: string }>, decisions: any[], variations: any[] = []
  ): Promise<boolean> => {
    if (!user || !accessToken) return false;
    try {
      const res = await fetch(`${API_BASE}/pathway?action=update`, {
        method: 'PUT', headers: getHeaders(),
        body: JSON.stringify({ sessionId, checklist, notes, currentNodeId, pathwayHistory, decisions, variations, status: 'in_progress' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save draft');
      const session = mapSession(data.session);
      setCurrentSession(session);
      toast.success('Draft saved successfully!');
      await fetchSessions();
      return true;
    } catch (error: any) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
      return false;
    }
  };

  const completeSession = async (sessionId: string): Promise<boolean> => {
    if (!user || !accessToken) return false;
    try {
      const res = await fetch(`${API_BASE}/pathway?action=complete`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to complete session');
      setCurrentSession(null);
      await fetchSessions();
      toast.success('Pathway completed successfully!');
      return true;
    } catch (error: any) {
      console.error('Error completing session:', error);
      toast.error('Failed to complete session');
      return false;
    }
  };

  const loadSession = async (sessionId: string): Promise<PathwaySession | null> => {
    if (!user || !accessToken) return null;
    const found = sessions.find(s => s.id === sessionId);
    if (found) { setCurrentSession(found); return found; }
    await fetchSessions();
    return null;
  };

  const getSessionsByPatientCode = async (_patientCode: string): Promise<PathwaySession[]> => {
    return sessions.filter(s => s.patient_code === _patientCode);
  };

  useEffect(() => {
    if (user && accessToken) { fetchSessions(); } else { setSessions([]); }
  }, [user, accessToken, fetchSessions]);

  return {
    sessions, loading, currentSession, authError, setCurrentSession,
    createSession, updateSession, saveDraft, completeSession, loadSession,
    getSessionsByPatientCode, refreshSessions: fetchSessions,
  };
}
