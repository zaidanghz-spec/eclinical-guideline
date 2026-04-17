import { toast } from 'sonner';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle,
  StickyNote,
  AlertTriangle,
  Info,
  AlertCircle,
  ChevronRight,
  Send,
  X,
  FileText,
  Sparkles,
  TrendingUp,
  Pill,
  Save,
  Calendar,
  Stethoscope,
  UserCheck,
  Users,
  Printer,
  ClipboardList,
  Phone,
  CheckCheck,
  Lock
} from 'lucide-react';
import { diseases } from '../lib/diseases';
import { dynamicPathways, ChecklistNode, DecisionNode } from '../lib/dynamicPathways';
import { useAuth } from '../contexts/AuthContext';
import { usePathwaySessions } from '../hooks/usePathwaySessions';
import type { DoctorOrder } from '../contexts/PathwaySessionsContext';

export default function DynamicPathwayPage() {
  const { diseaseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentSession, createSession, saveDraft, completeSession, reportToDoctor, submitDoctorOrder } = usePathwaySessions();
  
  const disease = diseases.find(d => d.id === diseaseId);
  const pathway = dynamicPathways[diseaseId || ''];
  
  const [currentNodeId, setCurrentNodeId] = useState<string>(pathway?.startNodeId || '');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [stepNotes, setStepNotes] = useState<Record<string, string>>({});
  const [showNotesFor, setShowNotesFor] = useState<string | null>(null);
  const [showValidationWarning, setShowValidationWarning] = useState(false);
  const [pendingBranchId, setPendingBranchId] = useState<string | null>(null);
  const [showVariationModal, setShowVariationModal] = useState(false);
  const [variationReason, setVariationReason] = useState('');
  const [pathwayHistory, setPathwayHistory] = useState<Array<{ nodeId: string; nodeName: string; completedAt?: string }>>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStartedAt, setSessionStartedAt] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);

  // Patient code + Role selection modal state
  const [showPatientCodeModal, setShowPatientCodeModal] = useState(true);
  const [modalStep, setModalStep] = useState<'code' | 'role' | 'doctor-presence'>('code');
  const [patientCode, setPatientCode] = useState('');
  const [patientCodeError, setPatientCodeError] = useState('');
  const [userRole, setUserRole] = useState<'nurse' | 'doctor' | null>(null);
  const [doctorPresent, setDoctorPresent] = useState<boolean | null>(null);
  const [decisions, setDecisions] = useState<any[]>([]);
  const [variations, setVariations] = useState<any[]>([]);

  // Effective mode: full (semua item) atau nurse-only (item dokter dilock)
  const effectiveMode = useMemo(() => {
    if (userRole === 'doctor') return 'full';
    if (userRole === 'nurse' && doctorPresent === true) return 'full';
    if (userRole === 'nurse' && doctorPresent === false) return 'nurse-only';
    return 'full'; // default sebelum dipilih
  }, [userRole, doctorPresent]);

  // Consultation state (nurse-only mode)
  const [consultationStatus, setConsultationStatus] = useState<'none' | 'waiting_doctor' | 'doctor_responded'>('none');
  const [doctorOrders, setDoctorOrders] = useState<DoctorOrder | null>(null);
  const [showDoctorOrderModal, setShowDoctorOrderModal] = useState(false);
  const [doctorOrderForm, setDoctorOrderForm] = useState<Omit<DoctorOrder, 'orderedAt' | 'doctorName'>>({
    diagnosis: '',
    prescription: '',
    instructions: '',
    followupPlan: '',
    referral: false,
    referralNote: '',
  });
  const [submittingOrder, setSubmittingOrder] = useState(false);
  
  const nodeRef = useRef<HTMLDivElement>(null);

  const currentNode = pathway?.nodes[currentNodeId];
  
  // Check for resume from location state
  useEffect(() => {
    const state = window.history.state?.usr;
    if (state?.sessionId && state?.resume && currentSession) {
      setShowPatientCodeModal(false);
      setSessionId(state.sessionId);
      setPatientCode(currentSession.patient_code || (currentSession as any).patientCode || '');
      if (currentSession.checklist) setCheckedSteps(currentSession.checklist);
      if (currentSession.notes) setStepNotes(currentSession.notes);
      if (currentSession.current_node_id || currentSession.currentNodeId) {
        setCurrentNodeId(currentSession.current_node_id || currentSession.currentNodeId || pathway?.startNodeId || '');
      }
      if (currentSession.pathway_history) setPathwayHistory(currentSession.pathway_history);
      if (currentSession.decisions) setDecisions(currentSession.decisions);
      if (currentSession.variations) setVariations(currentSession.variations);
      // Track the original session start date for multi-day detection
      const startedAt = currentSession.startedAt || currentSession.started_at || currentSession.startedAt;
      if (startedAt) setSessionStartedAt(startedAt);
      // Sync consultation status
      if (currentSession.consultation_status) setConsultationStatus(currentSession.consultation_status);
      if (currentSession.doctor_orders) setDoctorOrders(currentSession.doctor_orders);
    }
  }, [currentSession]);

  const handlePatientCodeSubmit = async () => {
    if (!patientCode.trim()) { setPatientCodeError('Kode pasien wajib diisi'); return; }
    if (patientCode.trim().length < 3) { setPatientCodeError('Kode pasien minimal 3 karakter'); return; }
    setPatientCodeError('');
    // Move to role selection step
    setModalStep('role');
  };

  const handleRoleSelect = (role: 'nurse' | 'doctor') => {
    setUserRole(role);
    if (role === 'doctor') {
      // Doctor → full mode, create session immediately
      setDoctorPresent(true);
      setModalStep('code'); // reset for next time
      startSession();
    } else {
      // Nurse → ask about doctor presence
      setModalStep('doctor-presence');
    }
  };

  const handleDoctorPresenceSelect = async (present: boolean) => {
    setDoctorPresent(present);
    await startSession();
  };

  const startSession = async () => {
    if (disease && pathway && user) {
      const now = new Date().toISOString();
      const session = await createSession(diseaseId || '', disease.name, patientCode.trim());
      if (session) {
        setSessionId(session.id);
        setSessionStartedAt(session.startedAt || now);
        setShowPatientCodeModal(false);
        toast.success('Sesi dimulai', { description: `Pasien: ${patientCode.trim()}` });
      }
    } else {
      setShowPatientCodeModal(false);
    }
  };

  // Auto-scroll to new node
  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentNodeId]);

  // Compute which day of the pathway we are currently on
  const currentDay = useMemo(() => {
    if (!sessionStartedAt) return 1;
    const start = new Date(sessionStartedAt);
    const today = new Date();
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.round((todayDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }, [sessionStartedAt]);

  // Check if current checklist node is complete
  const isCurrentNodeComplete = useMemo(() => {
    if (!currentNode || currentNode.type !== 'checklist') return true;
    const node = currentNode as ChecklistNode;
    // In nurse-only mode, we ignore items that require a doctor for progression
    const itemsToVerify = node.items.filter(item => {
      if (!item.required) return false;
      if (effectiveMode === 'nurse-only' && (item as any).role === 'doctor') return false;
      return true;
    });
    
    if (itemsToVerify.length === 0) return true;

    return itemsToVerify.every(item => {
      const isChecked = checkedSteps[item.id];
      const hasNote = stepNotes[item.id] && stepNotes[item.id].trim().length > 0;
      return isChecked || hasNote;
    });
  }, [currentNode, checkedSteps, stepNotes, effectiveMode]);

  // Get incomplete steps for current node
  const incompleteSteps = useMemo(() => {
    if (!currentNode || currentNode.type !== 'checklist') return [];
    const node = currentNode as ChecklistNode;
    return node.items.filter(item => {
      if (effectiveMode === 'nurse-only' && (item as any).role === 'doctor') return false;
      const isChecked = checkedSteps[item.id];
      const hasNote = stepNotes[item.id] && stepNotes[item.id].trim().length > 0;
      return !(isChecked || hasNote);
    });
  }, [currentNode, checkedSteps, stepNotes, effectiveMode]);

  const handleToggle = (stepId: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleBranchSelect = (_branchId: string, nextNodeId: string, branchTitle: string) => {
    // Check if previous node validation is needed
    const previousNode = pathwayHistory.length > 0 ? 
      pathway?.nodes[pathwayHistory[pathwayHistory.length - 1].nodeId] : null;
    
    if (previousNode && previousNode.type === 'checklist' && !isCurrentNodeComplete) {
      setShowValidationWarning(true);
      setPendingBranchId(nextNodeId);
      return;
    }

    // Navigate to next node
    navigateToNode(nextNodeId, branchTitle);
  };

  const navigateToNode = (nextNodeId: string, branchTitle: string) => {
    if (currentNode) {
      setPathwayHistory(prev => [...prev, { nodeId: currentNodeId, nodeName: currentNode.type === 'checklist' ? currentNode.title : currentNode.title, completedAt: new Date().toISOString() }]);
    }
    setCurrentNodeId(nextNodeId);
    setShowValidationWarning(false);
    setPendingBranchId(null);
    toast.success(`Navigating to: ${branchTitle}`);
  };

  const handleContinueWithIncomplete = () => {
    setShowValidationWarning(false);
    setShowVariationModal(true);
  };

  const handleVariationSubmit = () => {
    if (!variationReason.trim() || variationReason.length < 30) {
      toast.error('Alasan variasi klinis minimal 30 karakter');
      return;
    }
    
    const newVariation = {
      nodeId: currentNodeId,
      variationReason: variationReason,
      incompleteSteps: incompleteSteps.map(s => s.id),
      documentedAt: new Date().toISOString()
    };
    
    // Auto-save happens on state update due to how we manage saveDraft, 
    // but since saveDraft reads states directly, we need to pass variations directly.
    const newVariationsList = [...variations, newVariation];
    setVariations(newVariationsList);
    
    if (pendingBranchId) {
      const nextNode = pathway?.nodes[pendingBranchId];
      navigateToNode(pendingBranchId, nextNode?.type === 'checklist' ? nextNode.title : (nextNode as DecisionNode).title);
      setShowVariationModal(false);
      setVariationReason('');
      toast.success('Variasi klinis didokumentasikan');
    }
  };

  const handleSubmitPathway = async () => {
    if (sessionId) {
      await handleSaveDraft();
      completeSession(sessionId);
    }
    toast.success(`Clinical pathway for ${disease?.name} completed!`);
    navigate('/home');
  };

  const handleSaveDraft = async () => {
    if (!sessionId) {
      toast.error('No active session to save');
      return;
    }
    setSavingDraft(true);
    await saveDraft(sessionId, checkedSteps, stepNotes, currentNodeId, pathwayHistory, decisions, variations);
    setSavingDraft(false);
  };

  // ── Doctor: Submit Order ──
  const handleSubmitDoctorOrder = async () => {
    if (!sessionId) return;
    setSubmittingOrder(true);
    const ok = await submitDoctorOrder(sessionId, doctorOrderForm);
    if (ok) {
      setConsultationStatus('doctor_responded');
      setDoctorOrders({ ...doctorOrderForm, orderedAt: new Date().toISOString(), doctorName: user?.name || 'Dokter' });
      setShowDoctorOrderModal(false);
    }
    setSubmittingOrder(false);
  };

  // ── Generate PDF Report for nurse ──
  const handlePrintReport = () => {
    const allNodes = pathway?.nodes || {};
    const checkedItems: string[] = [];
    const pendingDoctorItems: string[] = [];

    Object.values(allNodes).forEach(node => {
      if (node.type !== 'checklist') return;
      (node as ChecklistNode).items.forEach(item => {
        if (checkedSteps[item.id]) {
          checkedItems.push(item.title);
        } else if ((item as any).role === 'doctor') {
          pendingDoctorItems.push(item.title);
        }
      });
    });

    const now = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <title>Laporan Klinis — ${disease?.name}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 32px; color: #1e293b; font-size: 13px; }
          h1 { font-size: 20px; color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 8px; }
          h2 { font-size: 14px; margin-top: 24px; color: #334155; border-left: 4px solid #0f766e; padding-left: 8px; }
          .meta { background: #f1f5f9; border-radius: 8px; padding: 12px 16px; margin: 16px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
          .meta div { font-size: 12px; }
          .meta span { font-weight: 700; }
          ul { padding-left: 20px; }
          li { margin-bottom: 4px; }
          .checked { color: #047857; }
          .checked::marker { content: '✓  '; }
          .pending { color: #b45309; }
          .pending::marker { content: '→  '; }
          .doctor-section { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 12px 16px; margin-top: 16px; }
          .footer { margin-top: 32px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px; }
          @media print { body { margin: 16px; } }
        </style>
      </head>
      <body>
        <h1>Laporan Klinis</h1>
        <div class="meta">
          <div><span>Penyakit:</span> ${disease?.name}</div>
          <div><span>Kode Pasien:</span> ${patientCode}</div>
          <div><span>Tanggal/Waktu:</span> ${now}</div>
          <div><span>Dibuat oleh:</span> ${userRole === 'nurse' ? 'Perawat' : 'Dokter'}</div>
        </div>

        <h2>Langkah Yang Sudah Dikerjakan</h2>
        <ul>
          ${checkedItems.length > 0 
            ? checkedItems.map(t => `<li class="checked">${t}</li>`).join('')
            : '<li><em>Belum ada langkah yang diselesaikan.</em></li>'}
        </ul>

        ${pendingDoctorItems.length > 0 ? `
        <div class="doctor-section">
          <h2 style="border:none;padding:0;margin:0 0 8px">Memerlukan Tindakan Dokter</h2>
          <p style="font-size:12px;color:#92400e;margin:0 0 8px">Item berikut tidak bisa diselesaikan oleh perawat dan membutuhkan instruksi dokter:</p>
          <ul>
            ${pendingDoctorItems.map(t => `<li class="pending">${t}</li>`).join('')}
          </ul>
        </div>` : ''}

        ${Object.entries(stepNotes).filter(([,v]) => v).length > 0 ? `
        <h2>Catatan Klinis</h2>
        <ul>${Object.entries(stepNotes).filter(([,v]) => v).map(([,v]) => `<li>${v}</li>`).join('')}</ul>
        ` : ''}

        <div class="footer">Dokumen ini dicetak dari sistem eclinical-guideline &bull; Hanya untuk penggunaan internal klinik</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
  };

  // Get next node for automatic progression
  const getNextNodeId = (currentNodeId: string): string | null => {
    // FIRST: Check if current node has nextNodeId property (NEW APPROACH!)
    const node = pathway?.nodes[currentNodeId];
    if (node && node.type === 'checklist' && node.nextNodeId) {
      return node.nextNodeId;
    }
    
    // FALLBACK: Use hardcoded mapping for pathways not yet updated
    const nodeNextMap: Record<string, string> = {
      // Vertigo pathway auto-progression
      'vertigo-initial-assessment': 'vertigo-central-peripheral-decision',
      'peripheral-vertigo-workup': 'peripheral-diagnosis-decision',
      'bppv-diagnostic-maneuvers': 'bppv-treatment-decision',
      
      // ISPA pathway auto-progression
      'ispa-initial-assessment': 'ispa-severity-triage',
      'ispa-pneumonia-workup': 'pneumonia-severity-decision',
      
      // DM Type 2 pathway auto-progression
      'dm2-initial-assessment': 'dm2-new-vs-established-decision',
      'dm2-glycemic-control-assessment': 'dm2-control-stratification-decision',
      
      // Alergi & Dermatitis pathway auto-progression
      'allergy-initial-assessment': 'allergy-acute-vs-chronic-decision',
      
      // Fraktur pathway auto-progression
      'fracture-atls-assessment': 'fracture-open-vs-closed-decision',
      'closed-fracture-management': 'closed-fracture-urgency-decision',
      
      // PMR pathway auto-progression
      'pmr-initial-assessment': 'pmr-acr-eular-scoring',
      'pmr-acr-eular-scoring': 'pmr-diagnosis-decision',
      'pmr-standard-treatment': 'pmr-tapering-protocol',
      'pmr-tapering-protocol': 'pmr-monitoring-followup',
      
      // RA pathway auto-progression
      'ra-initial-assessment': 'ra-laboratory-workup',
      'ra-laboratory-workup': 'ra-acr-eular-classification',
      'ra-acr-eular-classification': 'ra-diagnosis-decision',
      'ra-disease-activity-assessment': 'ra-treatment-initiation',
      'ra-treatment-initiation': 'ra-monitoring-protocol',
      'ra-monitoring-protocol': 'ra-treatment-escalation-decision',
      
      // CAP pathway auto-progression
      'cap-initial-assessment': 'cap-diagnostic-workup',
      'cap-diagnostic-workup': 'cap-severity-scoring',
      'cap-severity-scoring': 'cap-severity-decision',
      
      // TB pathway auto-progression
      'tb-symptoms-screening': 'tb-diagnostic-workup',
      'tb-diagnostic-workup': 'tb-classification-decision',
      'tb-ds-treatment-initiation': 'tb-intensive-phase-monitoring',
      'tb-intensive-phase-monitoring': 'tb-continuation-phase-monitoring',
      'tb-continuation-phase-monitoring': 'tb-treatment-outcome-decision',
      
      // Stroke pathway auto-progression
      'stroke-emergency-assessment': 'stroke-diagnostic-workup',
      'stroke-diagnostic-workup': 'stroke-thrombolysis-decision',
    };
    return nodeNextMap[currentNodeId] || null;
  };

  const handleContinueToNext = () => {
    const nextId = getNextNodeId(currentNodeId);
    if (nextId && pathway?.nodes[nextId]) {
      const nextNode = pathway.nodes[nextId];
      navigateToNode(nextId, nextNode.type === 'checklist' ? nextNode.title : (nextNode as DecisionNode).title);
    }
  };

  if (!disease || !pathway) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Pathway Not Found</h2>
          <button 
            onClick={() => navigate('/home')}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="text-center">
              <div className="font-bold text-slate-900">{disease.name}</div>
              <div className="text-xs text-slate-500">
                {patientCode && <span className="text-teal-600 font-medium">Patient: {patientCode} | </span>}
                Dynamic Clinical Guideline
              </div>
            </div>

            {/* Save Draft Button */}
            <div className="flex items-center gap-2">
              {sessionId && (
                <button
                  onClick={handleSaveDraft}
                  disabled={savingDraft}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium border border-teal-200"
                >
                  {savingDraft ? (
                    <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{savingDraft ? 'Saving...' : 'Save Draft'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!disease || !pathway ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Pathway Data Not Found</h2>
            <p className="text-slate-600 mb-6">The pathway you are looking for might have been moved or removed.</p>
            <button onClick={() => navigate('/home')} className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">Back to Home</button>
          </div>
        ) : (
          <>
            {/* Multi-day Banner */}
        {currentDay > 1 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-blue-200">
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="font-bold text-lg">Pathway — Hari ke-{currentDay}</div>
                <div className="text-blue-100 text-xs">Dimulai: {sessionStartedAt ? new Date(sessionStartedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''} · Hari ini: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Role + Doctor Status Banner */}
        {!showPatientCodeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
            <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm ${
              effectiveMode === 'nurse-only'
                ? 'bg-sky-50 border-sky-200 text-sky-800'
                : 'bg-teal-50 border-teal-200 text-teal-800'
            }`}>
              {effectiveMode === 'nurse-only' ? (
                <><Users className="w-4 h-4 flex-shrink-0" />
                <span>Mode <strong>Perawat</strong> — Item 🩺 Dokter akan ditandai untuk dilaporkan</span>
                <button onClick={handlePrintReport} className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-sky-600 text-white rounded-lg text-xs font-bold hover:bg-sky-700 transition-colors">
                  <Printer className="w-3 h-3" /> Cetak Laporan PDF
                </button></>
              ) : (
                <><Stethoscope className="w-4 h-4 flex-shrink-0" />
                <span>Mode <strong>{userRole === 'doctor' ? 'Dokter' : 'Perawat + Dokter'}</strong> — Akses penuh ke semua langkah</span></>
              )}
            </div>
          </motion.div>
        )}

        {/* Current Node */}
        <div ref={nodeRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNodeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {currentNode?.type === 'checklist' && (
                <ChecklistNodeComponent
                  node={currentNode as ChecklistNode}
                  checkedSteps={checkedSteps}
                  stepNotes={stepNotes}
                  showNotesFor={showNotesFor}
                  onToggle={handleToggle}
                  onNotesChange={(id, notes) => setStepNotes(prev => ({ ...prev, [id]: notes }))}
                  onToggleNotes={(id) => setShowNotesFor(showNotesFor === id ? null : id)}
                  isComplete={isCurrentNodeComplete}
                  effectiveMode={effectiveMode}
                />
              )}

              {currentNode?.type === 'decision' && (
                <DecisionNodeComponent
                  node={currentNode as DecisionNode}
                  onBranchSelect={handleBranchSelect}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Validation Warning */}
        <AnimatePresence>
          {showValidationWarning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4"
            >
              <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl shadow-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-orange-900 mb-2">
                      Peringatan: Checklist Belum Lengkap
                    </h3>
                    <p className="text-sm text-orange-800 mb-4">
                      {incompleteSteps.length} langkah belum diselesaikan pada node saat ini. 
                      Anda bisa melengkapi checklist atau melanjutkan dengan dokumentasi variasi klinis.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowValidationWarning(false);
                          setPendingBranchId(null);
                        }}
                        className="px-4 py-2 bg-white border-2 border-orange-300 text-orange-700 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
                      >
                        Kembali ke Checklist
                      </button>
                      <button
                        onClick={handleContinueWithIncomplete}
                        className="px-4 py-2 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                      >
                        Lanjutkan dengan Variasi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button (shown for intermediate checklist nodes with next decision) - PRIORITY FIRST */}
        {currentNode?.type === 'checklist' && isCurrentNodeComplete && getNextNodeId(currentNodeId) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 sticky bottom-6 z-10"
          >
            <button
              onClick={handleContinueToNext}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200 hover:shadow-xl"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Continue to Next Step</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Lapor Dokter / Dokter Ada di Tempat — selalu tampil di semua checklist node */}
        {currentNode?.type === 'checklist' && consultationStatus === 'none' && false && (
          /* hidden — replaced by in-card badges in nurse-only mode */
          <div />
        )}

        {/* Submit Button (shown at terminal nodes ONLY when no next step exists) */}
        {currentNode?.type === 'checklist' && isCurrentNodeComplete && !getNextNodeId(currentNodeId) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 sticky bottom-6 z-10"
          >
            <button
              onClick={handleSubmitPathway}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg shadow-teal-200 hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
              <span>Complete Pathway</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Clinical References Section */}
        {pathway?.references && pathway.references.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 p-6 bg-slate-100/50 rounded-2xl border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-slate-500" />
              <h4 className="font-bold text-slate-800">Referensi Klinis:</h4>
            </div>
            <ul className="space-y-2">
              {pathway.references.map((ref, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 italic">
                  <span>[{idx + 1}]</span>
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Variation Modal */}
      <AnimatePresence>
        {showVariationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVariationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Dokumentasi Variasi Klinis</h3>
                    <p className="text-sm text-slate-600">Jelaskan alasan modifikasi protokol</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVariationModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      Variasi dari protokol standar memerlukan dokumentasi untuk audit klinis dan 
                      pembelajaran sistem. Jelaskan kondisi pasien yang memerlukan modifikasi.
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Langkah yang belum diselesaikan:
                  </label>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-48 overflow-y-auto">
                    <ul className="space-y-2">
                      {incompleteSteps.map((step, idx) => (
                        <li key={step.id} className="text-sm text-slate-700 flex items-start gap-2">
                          <span className="text-slate-400">{idx + 1}.</span>
                          <span>{step.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Alasan Variasi Klinis: <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={variationReason}
                    onChange={(e) => setVariationReason(e.target.value)}
                    placeholder="Contoh: Pasien memiliki riwayat alergi terhadap aspirin, sehingga antiplatelet diganti dengan clopidogrel monoterapi sesuai diskusi dengan senior. Troponin negative dengan ECG normal, sehingga loading dose tidak diberikan..."
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                    rows={6}
                  />
                  <div className="mt-2 text-xs text-slate-500">
                    {variationReason.length}/30 karakter minimum
                  </div>
                </div>

                <button
                  onClick={handleVariationSubmit}
                  disabled={variationReason.length < 30}
                  className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all ${
                    variationReason.length >= 30
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  Simpan Variasi & Lanjutkan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── PATIENT CODE + ROLE SELECTION MODAL (multi-step) ───── */}
      <AnimatePresence>
        {showPatientCodeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">

              {/* Step indicator */}
              <div className="flex">
                {['Kode Pasien','Role','Dokter?'].map((label, i) => {
                  const step = i === 0 ? 'code' : i === 1 ? 'role' : 'doctor-presence';
                  const active = modalStep === step;
                  const done = (i === 0 && modalStep !== 'code') || (i === 1 && modalStep === 'doctor-presence');
                  return (
                    <div key={label} className={`flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-wide border-b-2 transition-colors ${
                      active ? 'border-teal-500 text-teal-700 bg-teal-50' :
                      done  ? 'border-green-400 text-green-600 bg-green-50' :
                               'border-slate-200 text-slate-400'
                    }`}>{done ? '✓ ' : ''}{label}</div>
                  );
                })}
              </div>

              {/* Step 1: Kode Pasien */}
              {modalStep === 'code' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Kode Pasien</h3>
                      <p className="text-xs text-slate-500">Untuk rekam medis & audit klinis</p>
                    </div>
                  </div>
                  <input
                    value={patientCode}
                    onChange={e => setPatientCode(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handlePatientCodeSubmit()}
                    placeholder="Contoh: P00123"
                    autoFocus
                    className="w-full p-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                  />
                  {patientCodeError && <p className="mt-2 text-xs text-red-600">{patientCodeError}</p>}
                  <button onClick={handlePatientCodeSubmit}
                    className="w-full mt-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 transition-all">
                    Lanjut →
                  </button>
                </div>
              )}

              {/* Step 2: Role Selection */}
              {modalStep === 'role' && (
                <div className="p-6">
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-slate-900">Anda menjalankan pathway ini sebagai?</h3>
                    <p className="text-xs text-slate-500 mt-1">Ini menentukan item mana yang tersedia</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleRoleSelect('nurse')}
                      className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 hover:border-sky-400 transition-all">
                      <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-sky-600" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-sky-800">Perawat</div>
                        <div className="text-[10px] text-sky-600">Item dokter akan ditandai</div>
                      </div>
                    </button>
                    <button onClick={() => handleRoleSelect('doctor')}
                      className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-violet-200 bg-violet-50 hover:bg-violet-100 hover:border-violet-400 transition-all">
                      <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-violet-600" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-violet-800">Dokter</div>
                        <div className="text-[10px] text-violet-600">Akses penuh semua item</div>
                      </div>
                    </button>
                  </div>
                  <button onClick={() => setModalStep('code')} className="w-full mt-4 py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">← Kembali</button>
                </div>
              )}

              {/* Step 3: Doctor Presence (nurse only) */}
              {modalStep === 'doctor-presence' && (
                <div className="p-6">
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-slate-900">Apakah Dokter ada di klinik saat ini?</h3>
                    <p className="text-xs text-slate-500 mt-1">Ini menentukan apakah item dokter bisa langsung dikerjakan</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleDoctorPresenceSelect(true)}
                      className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-400 transition-all">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCheck className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-800">Ya, Ada</div>
                        <div className="text-[10px] text-green-600">Akses penuh bersama</div>
                      </div>
                    </button>
                    <button onClick={() => handleDoctorPresenceSelect(false)}
                      className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-400 transition-all">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Lock className="w-6 h-6 text-amber-600" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-amber-800">Tidak Ada</div>
                        <div className="text-[10px] text-amber-600">Item dokter akan ditandai</div>
                      </div>
                    </button>
                  </div>
                  <button onClick={() => setModalStep('role')} className="w-full mt-4 py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">← Kembali</button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── LAPOR DOKTER (WA) Modal ───── */}
      {/* Functionality replaced by PDF Report system */}

      {/* Hidden — WA report replaced by PDF */}
      {/* ───── INSTRUKSI DOKTER Modal ───── */}
      <AnimatePresence>
        {showDoctorOrderModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDoctorOrderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-t-2xl p-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Instruksi & Resep Dokter</h3>
                  <p className="text-xs text-teal-100">Pasien: <strong>{patientCode}</strong> — {disease?.name}</p>
                </div>
                <button onClick={() => setShowDoctorOrderModal(false)} className="ml-auto p-1.5 hover:bg-white/20 rounded-lg">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Diagnosis Klinis</label>
                  <input
                    value={doctorOrderForm.diagnosis}
                    onChange={e => setDoctorOrderForm(f => ({ ...f, diagnosis: e.target.value }))}
                    placeholder='Contoh: "Pneumonia Komunitas derajat sedang (CURB-65 = 2)"'
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm focus:border-teal-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">💊 Resep / Terapi</label>
                  <textarea
                    value={doctorOrderForm.prescription}
                    onChange={e => setDoctorOrderForm(f => ({ ...f, prescription: e.target.value }))}
                    placeholder="Contoh:\n- Amoxicillin-Clavulanate 875/125mg 2x1 PO selama 7 hari\n- Paracetamol 500mg 3x1 PRN demam"
                    rows={3}
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm focus:border-teal-400 outline-none resize-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">📋 Instruksi Tindakan untuk Perawat</label>
                  <textarea
                    value={doctorOrderForm.instructions}
                    onChange={e => setDoctorOrderForm(f => ({ ...f, instructions: e.target.value }))}
                    placeholder="Contoh:\n- Pasang infus RL 20 tpm\n- Nebulizer Salbutamol 2.5mg sekarang\n- Monitor SpO2 tiap 1 jam"
                    rows={3}
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm focus:border-teal-400 outline-none resize-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">🔄 Rencana Tindak Lanjut</label>
                  <input
                    value={doctorOrderForm.followupPlan}
                    onChange={e => setDoctorOrderForm(f => ({ ...f, followupPlan: e.target.value }))}
                    placeholder='Contoh: "Kontrol 3 hari. Jika tidak membaik, rujuk ke RS"'
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm focus:border-teal-400 outline-none transition"
                  />
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <input
                    type="checkbox"
                    id="referral-check"
                    checked={doctorOrderForm.referral}
                    onChange={e => setDoctorOrderForm(f => ({ ...f, referral: e.target.checked }))}
                    className="w-4 h-4 accent-red-600"
                  />
                  <label htmlFor="referral-check" className="text-sm font-semibold text-red-800 cursor-pointer">🚑 Pasien perlu DIRUJUK ke RS</label>
                </div>
                {doctorOrderForm.referral && (
                  <textarea
                    value={doctorOrderForm.referralNote}
                    onChange={e => setDoctorOrderForm(f => ({ ...f, referralNote: e.target.value }))}
                    placeholder="Alasan rujukan dan RS yang dituju..."
                    rows={2}
                    className="w-full px-3 py-2.5 border-2 border-red-200 rounded-xl text-sm focus:border-red-400 outline-none resize-none transition"
                  />
                )}
                <button
                  onClick={handleSubmitDoctorOrder}
                  disabled={submittingOrder || !doctorOrderForm.diagnosis}
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                >
                  {submittingOrder ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><ClipboardList className="w-4 h-4" /> Kirim Instruksi ke Perawat</>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Checklist Node Component
function ChecklistNodeComponent({ 
  node, 
  checkedSteps, 
  stepNotes,
  showNotesFor,
  onToggle, 
  onNotesChange,
  onToggleNotes,
  isComplete,
  effectiveMode
}: { 
  node: ChecklistNode; 
  checkedSteps: Record<string, boolean>;
  stepNotes: Record<string, string>;
  showNotesFor: string | null;
  onToggle: (id: string) => void;
  onNotesChange: (id: string, notes: string) => void;
  onToggleNotes: (id: string) => void;
  isComplete: boolean;
  effectiveMode?: 'full' | 'nurse-only';
}) {
  const completedCount = node.items.filter(item => checkedSteps[item.id]).length;
  const percentage = Math.round((completedCount / node.items.length) * 100);

  // Define category accent colors (left border accent)
  const categoryAccents: Record<string, string> = {
    assessment: 'border-purple-400',
    action: 'border-teal-400',
    medication: 'border-purple-500',
    safety: 'border-red-400',
    documentation: 'border-blue-400'
  };

  // Separate medication items from other items
  const medicationItems = node.items.filter(item => item.category === 'medication');
  const otherItems = node.items.filter(item => item.category !== 'medication');

  // Group items by phases (smart auto-detection)
  const groupItemsByPhase = (items: typeof node.items) => {
    const phases: Record<string, typeof node.items> = {
      'Initial Management': [],
      'Treatment Phase': [],
      'Monitoring & Follow-up': []
    };

    items.forEach(item => {
      const title = item.title.toLowerCase();
      const desc = item.description.toLowerCase();
      
      // Phase detection logic
      if (title.includes('initial') || title.includes('assess') || title.includes('vitals') || 
          title.includes('abc') || title.includes('airway') || title.includes('baseline') ||
          desc.includes('first') || desc.includes('immediately')) {
        phases['Initial Management'].push(item);
      } else if (title.includes('monitor') || title.includes('follow') || title.includes('discharge') ||
                 desc.includes('serial') || desc.includes('repeat') || desc.includes('watch')) {
        phases['Monitoring & Follow-up'].push(item);
      } else {
        phases['Treatment Phase'].push(item);
      }
    });

    // Remove empty phases
    return Object.entries(phases).filter(([_, items]) => items.length > 0);
  };

  const allItems = [...otherItems, ...medicationItems];
  const phasedItems = groupItemsByPhase(allItems);

  // Extract decision support chip from description
  const extractDecisionChip = (description: string): string | null => {
    const patterns = [
      /if\s+([^.,]+)/i,
      /jika\s+([^.,]+)/i,
      /when\s+([^.,]+)/i,
    ];
    
    for (const pattern of patterns) {
      const match = description.match(pattern);
      if (match && match[1].length < 40) {
        return match[1].trim();
      }
    }
    return null;
  };

  return (
    <div className="space-y-5">
      {/* Node Header - Compact */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{node.title}</h2>
            {node.description && (
              <p className="text-sm text-slate-600">{node.description}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-teal-600">{percentage}%</div>
            <div className="text-xs text-slate-500">{completedCount}/{node.items.length}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
          />
        </div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 p-2.5 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-green-800">
              All steps completed - Ready to proceed
            </span>
          </motion.div>
        )}
      </div>

      {/* PHASED CLINICAL WORKFLOW */}
      {phasedItems.map(([phaseName, phaseItems], phaseIndex) => (
        <div key={phaseName} className="space-y-2">
          {/* Phase Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {phaseName}
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Phase Items - Timeline Style */}
          <div className="space-y-1.5">
            {phaseItems.map((item, index) => {
              const isChecked = checkedSteps[item.id];
              const hasNotes = !!stepNotes[item.id];
              const isMedication = item.category === 'medication';
              const accentColor = categoryAccents[item.category] || 'border-slate-300';
              
              // Nurse-only mode: lock items that require a doctor
              const isLocked = effectiveMode === 'nurse-only' && (item as any).role === 'doctor';
              
              // Progress state
              const progressState = isChecked ? 'completed' : hasNotes ? 'in-progress' : 'not-started';
              
              // Extract decision chip
              const decisionChip = extractDecisionChip(item.description);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (phaseIndex * 0.1) + (index * 0.03) }}
                  className="group"
                >
                  <div className={`
                    relative bg-white rounded-lg border-l-[3px] transition-all duration-200
                    ${isLocked 
                      ? 'border-l-violet-300 bg-slate-50 border border-dashed border-violet-200 opacity-75'
                      : isChecked ? `${accentColor} bg-slate-50/50` : 'border-slate-200 hover:border-slate-300'
                    }
                    ${isMedication && !isLocked ? 'border-l-[4px]' : ''}
                  `}>
                    <div className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        {/* Status Icon */}
                        <button
                          onClick={() => !isLocked && onToggle(item.id)}
                          disabled={isLocked}
                          className={`flex-shrink-0 mt-0.5 ${isLocked ? 'cursor-not-allowed' : ''}`}
                        >
                          <motion.div
                            whileHover={{ scale: isLocked ? 1 : 1.1 }}
                            whileTap={{ scale: isLocked ? 1 : 0.95 }}
                          >
                            {isLocked ? (
                              <Lock className="w-5 h-5 text-violet-400" />
                            ) : progressState === 'completed' ? (
                              <CheckCircle2 className="w-5 h-5 text-teal-600" />
                            ) : progressState === 'in-progress' ? (
                              <div className="w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                              </div>
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 group-hover:text-slate-400" />
                            )}
                          </motion.div>
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Locked: Lapor Dokter banner */}
                          {isLocked && (
                            <div className="mb-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 border border-violet-200">
                              <Stethoscope className="w-3 h-3 text-violet-600" />
                              <span className="text-[9px] font-bold text-violet-700 uppercase tracking-wide">Lapor Dokter</span>
                            </div>
                          )}
                          {/* Header Row */}
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1">
                              {/* Title with optional medication icon */}
                              <div className="flex items-center gap-2 mb-0.5">
                                {isMedication && (
                                  <Pill className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                                )}
                                <h4 className={`text-sm leading-tight ${
                                  isMedication ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'
                                } ${isChecked ? 'line-through text-slate-500' : ''}`}>
                                  {item.title}
                                </h4>
                              </div>
                              
                              {/* Category badge + Required badge + Role badge */}
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`
                                  text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide
                                  ${item.category === 'medication' ? 'bg-purple-100 text-purple-700' : ''}
                                  ${item.category === 'safety' ? 'bg-red-100 text-red-700' : ''}
                                  ${item.category === 'documentation' ? 'bg-blue-100 text-blue-700' : ''}
                                  ${item.category === 'action' ? 'bg-teal-100 text-teal-700' : ''}
                                  ${item.category === 'assessment' ? 'bg-purple-100 text-purple-700' : ''}
                                `}>
                                  {item.category}
                                </span>

                                {/* Role badge */}
                                {item.role === 'nurse' && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase bg-sky-100 text-sky-700 border border-sky-200 flex items-center gap-0.5">
                                    <Users className="w-2.5 h-2.5" /> Perawat
                                  </span>
                                )}
                                {item.role === 'doctor' && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase bg-violet-100 text-violet-700 border border-violet-200 flex items-center gap-0.5">
                                    <Stethoscope className="w-2.5 h-2.5" /> Dokter
                                  </span>
                                )}
                                {item.role === 'both' && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase bg-teal-100 text-teal-700 border border-teal-200 flex items-center gap-0.5">
                                    <UserCheck className="w-2.5 h-2.5" /> Keduanya
                                  </span>
                                )}
                                
                                {item.required && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase bg-red-100 text-red-700 border border-red-200">
                                    Required
                                  </span>
                                )}
                                
                                {/* Decision support chip */}
                                {decisionChip && (
                                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 italic">
                                    {decisionChip}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Notes button - small */}
                            <button
                              onClick={() => onToggleNotes(item.id)}
                              className={`p-1.5 rounded-md transition-colors ${
                                hasNotes || showNotesFor === item.id
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                              }`}
                            >
                              <StickyNote className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Description - Clinical hierarchy */}
                          {!isMedication ? (
                            <p className={`text-xs leading-relaxed ${
                              isChecked ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              {item.description}
                            </p>
                          ) : (
                            // Medication-specific structured display
                            <div className="space-y-0.5 text-xs">
                              {/* Parse medication details */}
                              {(() => {
                                const parts = item.description.split('.');
                                const indication = parts[0];
                                const details = parts.slice(1).join('.');
                                
                                return (
                                  <>
                                    <div className="flex items-start gap-2">
                                      <span className="text-slate-500 text-[10px] uppercase min-w-[60px] font-semibold">Indication:</span>
                                      <span className={`${isChecked ? 'text-slate-400' : 'text-slate-700'} font-medium`}>
                                        {indication}
                                      </span>
                                    </div>
                                    {details && (
                                      <div className="flex items-start gap-2">
                                        <span className="text-slate-500 text-[10px] uppercase min-w-[60px] font-semibold">Details:</span>
                                        <span className={`${isChecked ? 'text-slate-400' : 'text-slate-600'}`}>
                                          {details}
                                        </span>
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          )}

                          {/* Notes textarea */}
                          <AnimatePresence>
                            {showNotesFor === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2"
                              >
                                <textarea
                                  value={stepNotes[item.id] || ''}
                                  onChange={(e) => onNotesChange(item.id, e.target.value)}
                                  placeholder="Clinical notes..."
                                  className="w-full p-2 text-xs border border-slate-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 resize-none bg-white"
                                  rows={2}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Decision Node Component
function DecisionNodeComponent({ 
  node, 
  onBranchSelect
}: { 
  node: DecisionNode; 
  onBranchSelect: (branchId: string, nextNodeId: string, branchTitle: string) => void;
}) {
  const warningColors = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100', iconColor: 'text-blue-600' },
    warning: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100', iconColor: 'text-orange-600' },
    critical: { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-100', iconColor: 'text-red-600' }
  };

  const levelColors = node.warningLevel ? warningColors[node.warningLevel] : warningColors.info;
  const IconComponent = node.warningLevel === 'critical' ? AlertTriangle : 
                        node.warningLevel === 'warning' ? AlertCircle : Info;

  const branchColors: Record<string, string> = {
    red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
  };

  return (
    <div className="space-y-6">
      {/* Decision Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${levelColors.bg} border-2 ${levelColors.border} rounded-2xl p-6`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 ${levelColors.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <IconComponent className={`w-7 h-7 ${levelColors.iconColor}`} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-500 uppercase mb-1">Decision Point</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{node.title}</h2>
            <p className="text-slate-700">{node.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Branch Options */}
      <div className="space-y-4">
        <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
          Select Pathway:
        </div>

        <div className="grid gap-4">
          {node.branches.map((branch, index) => (
            <motion.button
              key={branch.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onBranchSelect(branch.id, branch.nextNodeId, branch.title)}
              className="group relative overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${branchColors[branch.color]} text-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
                <div className="flex items-center gap-4">
                  {branch.icon && (
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                      {branch.icon}
                    </div>
                  )}
                  
                  <div className="flex-1 text-left">
                    {branch.riskLevel && (
                      <div className="text-xs font-semibold uppercase mb-1 opacity-90">
                        {branch.riskLevel} Risk
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2">{branch.title}</h3>
                    <p className="text-sm opacity-90">{branch.description}</p>
                  </div>

                  <ChevronRight className="w-8 h-8 opacity-70 group-hover:translate-x-2 transition-transform" />
                </div>

                {/* Ripple effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}