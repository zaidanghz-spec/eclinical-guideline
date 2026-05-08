import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle2, AlertCircle, FileText, Printer, Stethoscope, Calendar, ShieldAlert, GitBranch, Activity, Pill, ClipboardCheck } from 'lucide-react';
import { usePathwaySessions } from '../hooks/usePathwaySessions';
import { dynamicPathways } from '../lib/dynamicPathways';
import { buildPathwayExecutionReport, structureChecklistItem, type ClinicalExecutionReport, type StructuredSubcard } from '../lib/clinicalPathwayEngine';
import Navbar from '../components/Navbar';

export default function PathwayReportPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { sessions, loading, refreshSessions } = usePathwaySessions();
  const [attemptedRefresh, setAttemptedRefresh] = useState(false);
  
  const targetId = sessionId?.trim();
  const session = sessions.find(s => String(s.id) === String(targetId));
  const pathwayKey = session?.diseaseId || '';
  const pathway = pathwayKey ? dynamicPathways[pathwayKey] : null;

  // Manual Trigger to refresh if not loading but not found
  useEffect(() => {
    if (!loading && !session && sessions.length === 0 && !attemptedRefresh) {
      setAttemptedRefresh(true);
      refreshSessions();
    }
  }, [loading, session, sessions.length, refreshSessions, attemptedRefresh]);

  // Fix #26: Auto-refresh (Polling) every 5s if session is still in progress
  useEffect(() => {
    if (session?.status === 'in_progress') {
      const interval = setInterval(() => {
        refreshSessions();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [session?.status, refreshSessions]);

  const displayDate = (s: any) => {
    try {
      const d = new Date(s.updated_at || s.startedAt || Date.now());
      return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return 'N/A';
    }
  };

  // 1. LOADING STAGE
  if (loading && !session) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="animate-spin w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full mb-6" />
        <h2 className="text-xl font-bold text-slate-800">Menarik Data dari Server...</h2>
        <p className="text-slate-400 mt-2 font-mono text-sm">Mencari Sesi: {targetId}</p>
      </div>
    );
  }

  // 2. MISSING SESSION STAGE
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-red-100 overflow-hidden">
            <div className="bg-red-50 p-8 border-b border-red-100 flex items-center gap-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <AlertCircle className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-900">Sesi Tidak Ditemukan</h1>
                <p className="text-red-700">Gagal memuat detail pemeriksaan klinis ini.</p>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
               <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Sesi yang Dicari</h3>
                  <div className="font-mono text-lg text-slate-900 break-all">{targetId || 'UNKNOWN'}</div>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Status Sinkronisasi</h3>
                  <div className="font-bold text-slate-900">
                    {loading ? 'Sedang Memuat...' : `Ditemukan ${sessions.length} sesi di sistem.`}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Informasi untuk Pengembang:</h3>
                <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-teal-400 whitespace-pre-wrap overflow-x-auto">
                  {JSON.stringify({ 
                    urlParamId: targetId,
                    totalSystemRecords: sessions.length,
                    availableIds: sessions.slice(0, 5).map(s => s.id),
                    isLoading: loading,
                    hasAttemptedRefresh: attemptedRefresh
                  }, null, 2)}
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => refreshSessions()} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                  Coba Muat Ulang (Force Sync)
                </button>
                <button onClick={() => navigate('/history')} className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition-all">
                  Kembali ke Riwayat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. MISSING PATHWAY DEFINITION
  if (!pathway) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-6">
                <AlertCircle className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Pedoman Tidak Terdaftar</h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Sesi ditemukan ({session.diseaseName}), namun rincian pedoman klinis untuk penyakit ini ({session.diseaseId}) belum terdaftar di registry sistem.
            </p>
            <button onClick={() => navigate('/history')} className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold">
                Kembali ke Riwayat
            </button>
        </div>
      </div>
    );
  }

  // 4. MAIN REPORT CONTENT
  // Fix #26: Include current node if session is in progress
  const history = session.pathwayHistory || session.pathway_history || [];
  const visitedNodes = [...history];
  if (session.status === 'in_progress' && session.currentNodeId) {
    if (!visitedNodes.find(n => n.nodeId === session.currentNodeId)) {
      visitedNodes.push({ 
        nodeId: session.currentNodeId, 
        nodeName: pathway.nodes[session.currentNodeId]?.title || 'Langkah Saat Ini' 
      });
    }
  }
  const executionReport: ClinicalExecutionReport = buildPathwayExecutionReport({
    pathway,
    currentNodeId: session.currentNodeId || session.current_node_id || pathway.startNodeId,
    checkedSteps: session.checklist || {},
    notes: session.notes || {},
    decisions: session.decisions || [],
    variations: session.variations || [],
    pathwayHistory: history,
    effectiveMode: 'full',
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button onClick={() => navigate('/history')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-700 font-bold shadow-sm hover:bg-slate-50">
            <Printer className="w-5 h-5" />
            <span>Cetak PDF</span>
          </button>
          {session.status === 'in_progress' && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg border border-teal-100 text-xs font-bold animate-pulse">
              <div className="w-2 h-2 bg-teal-500 rounded-full" />
              LIVE UPDATE AKTIF
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none print:border-none">
          {/* Header Paper */}
          <div className="bg-slate-900 px-8 py-10 text-white">
            <div className="flex justify-between items-start mb-10">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Laporan Alur Klinis</h1>
                  <p className="text-slate-400 text-sm">Dokumentasi Digital E-Clinical</p>
                </div>
              </div>
                <div className={`px-4 py-2 border rounded-xl text-sm font-bold uppercase tracking-wider ${
                  session.status === 'completed' 
                    ? 'bg-teal-500/20 border-teal-500/30 text-teal-400' 
                    : 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                }`}>
                  {session.status === 'completed' ? 'SELESAI' : 'BERJALAN (LIVE)'}
                </div>
              </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
              <div>
                <span className="text-slate-500 text-xs uppercase font-bold tracking-widest block mb-1">Diagnosis</span>
                <span className="font-semibold text-slate-100">{session.diseaseName}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs uppercase font-bold tracking-widest block mb-1">Kode Pasien</span>
                <span className="font-semibold text-teal-400">{session.patient_code || '---'}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs uppercase font-bold tracking-widest block mb-1">Waktu</span>
                <span className="font-semibold text-slate-100">{displayDate(session)}</span>
              </div>
              <div className="overflow-hidden">
                <span className="text-slate-500 text-xs uppercase font-bold tracking-widest block mb-1">ID Sesi</span>
                <span className="text-xs font-mono text-slate-400 truncate block">{session.id}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <ReportComplianceSummary report={executionReport} />

            <div className="space-y-12">
              {visitedNodes.length === 0 ? (
                <div className="p-16 border-2 border-dashed border-slate-100 rounded-3xl text-center text-slate-400 italic">
                  Tidak ada riwayat langkah yang tercatat dalam sesi ini.
                </div>
              ) : (
                (() => {
                  const isMultiDay = visitedNodes.some(hn => {
                    if (!hn.completedAt || !session.startedAt) return false;
                    const s = new Date(session.startedAt);
                    const e = new Date(hn.completedAt);
                    return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() > new Date(s.getFullYear(), s.getMonth(), s.getDate()).getTime();
                  });

                  let lastPrintedDay = 0;

                  return visitedNodes.map((historyItem, idx) => {
                    const node = pathway.nodes[historyItem.nodeId];
                    if (!node) return null;
                    
                    let dayHeader = null;
                    if (isMultiDay && historyItem.completedAt && session.startedAt) {
                      const start = new Date(session.startedAt);
                      const end = new Date(historyItem.completedAt);
                      const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
                      const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
                      const diffDays = Math.round((endDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24));
                      const currentDay = diffDays + 1;
                      
                      if (currentDay > lastPrintedDay) {
                         dayHeader = <div className="mt-8 mb-6"><div className="text-sm font-bold text-teal-600 bg-teal-50 border border-teal-100 px-4 py-2 rounded-xl shadow-sm inline-flex items-center gap-2 print:border-none print:shadow-none"><Calendar className="w-4 h-4" /> Hari ke-{currentDay} ({end.toLocaleDateString('id-ID')})</div></div>;
                         lastPrintedDay = currentDay;
                      }
                    }

                    return (
                      <div key={`${historyItem.nodeId}-${idx}`}>
                        {dayHeader}
                        <div className="relative pl-14 mb-12">
                          {idx !== visitedNodes.length - 1 && <div className="absolute left-6 top-10 bottom-[-64px] w-0.5 bg-slate-100" />}
                          <div className="absolute left-0 top-0.5 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-500 shadow-sm">
                            {idx + 1}
                          </div>
                          
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-slate-900">{node.title}</h3>
                            {node.description && <p className="text-slate-500 leading-relaxed mt-1">{node.description}</p>}
                          </div>

                          {node.type === 'checklist' && (
                            <div className="mt-4 grid gap-3">
                                {node.items.map(item => {
                                  const isChecked = session.checklist[item.id];
                                  const note = session.notes && session.notes[item.id];
                                  const role = (item as any).role || 'both';
                                  const structured = structureChecklistItem(item);
                                  const timelineEntry = executionReport.timeline.find(entry => entry.itemId === item.id);
                                  const variation = session.variations?.find(v => v.incompleteSteps?.includes(item.id));
                                  const status = timelineEntry?.status || (isChecked ? 'completed' : item.required ? 'non-compliant' : 'skipped');
                                  const statusClass: Record<string, string> = {
                                    completed: 'bg-teal-100 text-teal-800 border-teal-200',
                                    skipped: 'bg-slate-100 text-slate-700 border-slate-200',
                                    variation: 'bg-orange-100 text-orange-800 border-orange-200',
                                    justified: 'bg-blue-100 text-blue-800 border-blue-200',
                                    'non-compliant': 'bg-red-100 text-red-800 border-red-200',
                                    decision: 'bg-purple-100 text-purple-800 border-purple-200',
                                  };
                                  
                                  return (
                                    <div key={item.id} className={`p-5 rounded-2xl border transition-all ${
                                      isChecked 
                                        ? 'bg-teal-50/30 border-teal-100 ring-1 ring-teal-100' 
                                        : status === 'justified'
                                          ? 'bg-blue-50/40 border-blue-100'
                                        : status === 'variation'
                                          ? 'bg-orange-50/40 border-orange-100'
                                        : status === 'non-compliant'
                                          ? 'bg-red-50/40 border-red-100'
                                        : role === 'doctor'
                                          ? 'bg-purple-50/40 border-purple-100 border-dashed'
                                          : 'bg-slate-50/50 border-slate-100'
                                    }`}>
                                      <div className="flex gap-4">
                                        {isChecked ? (
                                          <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                          </div>
                                        ) : (
                                          <div className={`w-6 h-6 border-2 rounded-full flex-shrink-0 mt-0.5 ${
                                            role === 'doctor' ? 'border-purple-300' : 'border-slate-300'
                                          }`} />
                                        )}
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between gap-4">
                                            <div>
                                              <div className="font-bold text-slate-800">{structured.title}</div>
                                              <div className="text-xs text-slate-500 mt-0.5">{structured.subtitle}</div>
                                            </div>
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border ${statusClass[status] || statusClass.skipped}`}>
                                              {status === 'non-compliant' ? 'non-compliant' : status}
                                            </span>
                                          </div>

                                          <div className="mt-3 grid md:grid-cols-2 gap-2">
                                            {structured.subcards.map((card, cardIndex) => (
                                              <ReportSubcard key={`${item.id}-${card.label}-${cardIndex}`} card={card} />
                                            ))}
                                          </div>

                                          {note && (
                                            <div className="mt-4 p-4 bg-white border border-yellow-200 rounded-xl text-sm text-yellow-800 shadow-sm">
                                              <div className="flex items-center gap-2 mb-1 not-italic font-bold text-yellow-900 uppercase text-[10px]">Catatan Klinis:</div>
                                              {note}
                                            </div>
                                          )}
                                          {variation?.variationReason && (
                                            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-900 shadow-sm">
                                              <div className="flex items-center gap-2 mb-1 font-bold text-blue-900 uppercase text-[10px]">Justifikasi Variasi:</div>
                                              {variation.variationReason}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          )}

                          {node.type === 'decision' && (
                            <div className="mt-4">
                              {(() => {
                                const dec = session.decisions?.find(d => d.nodeId === node.id);
                                const branch = dec ? node.branches.find(b => b.id === dec.branchId) : null;
                                return (
                                  <div className="p-6 bg-slate-900 rounded-2xl flex gap-6 items-center shadow-lg">
                                    <div className="w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                                      <Stethoscope className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-[10px] text-teal-400 font-black uppercase tracking-widest mb-1">Keputusan Klinis Diambil</div>
                                      <div className="font-bold text-white text-lg">{branch?.title || dec?.branchTitle || 'N/A'}</div>
                                      {branch?.description && <div className="text-slate-400 text-xs mt-1">{branch.description}</div>}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()
              )}
            </div>

            <div className="mt-20 pt-10 border-t border-slate-200">
               {executionReport.compliance.status === 'variation' ? (
                <div className="p-8 bg-orange-50 rounded-3xl border-2 border-orange-100 flex gap-6">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-900 text-xl">Penyelesaian dengan Variasi</h4>
                    <p className="text-orange-800 mt-2 leading-relaxed">
                      Penanganan telah diselesaikan namun terdapat langkah pedoman klinis standar <strong>{session.diseaseName}</strong> yang disesuaikan atau dilewati sesuai dengan pertimbangan kondisi klinis pasien di lapangan.
                    </p>
                  </div>
                </div>
              ) : executionReport.compliance.status === 'compliant' ? (
                <div className="p-8 bg-teal-50 rounded-3xl border-2 border-teal-100 flex gap-6">
                  <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 shrink-0">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-900 text-xl">Kepatuhan Penuh (Fully Compliant)</h4>
                    <p className="text-teal-800 mt-2 leading-relaxed">
                      Seluruh langkah penanganan dalam pedoman klinis <strong>{session.diseaseName}</strong> telah dilaksanakan sesuai standar tanpa variasi. Dokumentasi menunjukkan kepatuhan 100% terhadap protokol yang berlaku.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-red-50 rounded-3xl border-2 border-red-100 flex gap-6">
                  <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-900 text-xl">Belum Sesuai Clinical Pathway</h4>
                    <p className="text-red-800 mt-2 leading-relaxed">
                      Masih terdapat mandatory step yang belum dilakukan atau belum memiliki justifikasi. Lihat bagian audit log dan warning compliance untuk detail langkah yang perlu dilengkapi.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-20 pt-12 border-t border-slate-100 hidden print:flex justify-between items-end">
                <div className="text-[10px] text-slate-400 font-mono space-y-1">
                    <div>Dokumen hasil sistem E-Clinical DSS</div>
                    <div>Digital Signature: {session.id?.slice(0, 8)}-{Date.now()}</div>
                    <div>Dicetak pada: {new Date().toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="w-56 h-px bg-slate-300 mb-3" />
                  <div className="font-black text-slate-900 text-xs uppercase tracking-widest">Dokter Pemeriksa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ReportSubcard({ card }: { card: StructuredSubcard }) {
  const tone: Record<string, string> = {
    assessment: 'bg-purple-50 border-purple-200 text-purple-900',
    red_flag: 'bg-red-50 border-red-200 text-red-900',
    decision: 'bg-orange-50 border-orange-200 text-orange-900',
    immediate_action: 'bg-teal-50 border-teal-200 text-teal-900',
    monitoring: 'bg-cyan-50 border-cyan-200 text-cyan-900',
    medication: 'bg-violet-50 border-violet-200 text-violet-900',
    documentation: 'bg-blue-50 border-blue-200 text-blue-900',
    contraindication: 'bg-red-50 border-red-200 text-red-900',
  };
  return (
    <div className={`rounded-xl border p-3 ${tone[card.kind] || 'bg-slate-50 border-slate-200 text-slate-900'}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <ReportSubcardIcon kind={card.kind} />
        <span className="text-[10px] font-black uppercase tracking-wide">{card.label}</span>
        {card.priority === 'critical' && (
          <span className="ml-auto rounded bg-red-600 text-white px-1.5 py-0.5 text-[9px] font-black">URGENT</span>
        )}
      </div>
      {card.bullets.length > 0 ? (
        <ul className="space-y-1">
          {card.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-xs leading-relaxed text-slate-700">
              <span className="text-slate-400">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs leading-relaxed text-slate-700">{card.content}</p>
      )}
    </div>
  );
}

function ReportSubcardIcon({ kind }: { kind: StructuredSubcard['kind'] }) {
  if (kind === 'red_flag' || kind === 'contraindication') return <ShieldAlert className="w-3.5 h-3.5" />;
  if (kind === 'decision') return <GitBranch className="w-3.5 h-3.5" />;
  if (kind === 'immediate_action') return <Activity className="w-3.5 h-3.5" />;
  if (kind === 'monitoring') return <ClipboardCheck className="w-3.5 h-3.5" />;
  if (kind === 'medication') return <Pill className="w-3.5 h-3.5" />;
  return <FileText className="w-3.5 h-3.5" />;
}

function ReportComplianceSummary({ report }: { report: ClinicalExecutionReport }) {
  const statusClass = report.compliance.status === 'compliant'
    ? 'bg-teal-50 text-teal-800 border-teal-200'
    : report.compliance.status === 'variation'
      ? 'bg-orange-50 text-orange-800 border-orange-200'
      : 'bg-red-50 text-red-800 border-red-200';
  const badgeClass: Record<string, string> = {
    completed: 'bg-teal-100 text-teal-800 border-teal-200',
    skipped: 'bg-slate-100 text-slate-700 border-slate-200',
    variation: 'bg-orange-100 text-orange-800 border-orange-200',
    justified: 'bg-blue-100 text-blue-800 border-blue-200',
    'non-compliant': 'bg-red-100 text-red-800 border-red-200',
    decision: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return (
    <div className="mb-10 space-y-5 print:break-inside-avoid">
      <div className={`rounded-2xl border-2 p-5 ${statusClass}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-widest opacity-70">Kesimpulan Kepatuhan</div>
            <h2 className="text-xl font-black mt-1">{report.compliance.label}</h2>
            <p className="text-sm mt-2 opacity-90">
              Mandatory completed {report.compliance.mandatoryCompleted}/{report.compliance.mandatoryTotal};
              variasi {report.compliance.variations}; non-compliant {report.compliance.nonCompliant}.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <MiniStat label="Done" value={report.compliance.completed} />
            <MiniStat label="Skipped" value={report.compliance.skipped} />
            <MiniStat label="Variation" value={report.compliance.variations} />
            <MiniStat label="NC" value={report.compliance.nonCompliant} />
          </div>
        </div>
      </div>

      {report.actions.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-black text-slate-900 mb-3">Generated Clinical Action Request</h3>
          <div className="grid gap-3">
            {report.actions.slice(0, 8).map((action) => (
              <div key={action.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase rounded bg-slate-900 text-white px-2 py-0.5">{action.priority}</span>
                  <span className="text-[10px] font-bold rounded bg-teal-50 text-teal-700 px-2 py-0.5">{action.subPathway}</span>
                </div>
                <div className="font-bold text-slate-900">{action.title}</div>
                <ul className="mt-2 space-y-1">
                  {action.actions.map((item) => <li key={item} className="text-sm text-slate-600">- {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 p-5">
        <h3 className="font-black text-slate-900 mb-3">Expandable Audit Log</h3>
        <div className="space-y-2">
          {report.timeline.map((entry) => (
            <details key={entry.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <summary className="list-none cursor-pointer">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900">{entry.order}. {entry.title}</div>
                    <div className="text-xs text-slate-500">{entry.subPathway}</div>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${badgeClass[entry.status]}`}>
                    {entry.status}
                  </span>
                </div>
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                {entry.note && <p><strong>Justifikasi/Catatan:</strong> {entry.note}</p>}
                {entry.details.slice(0, 4).map((detail) => <p key={detail}>{detail}</p>)}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <h3 className="font-black text-blue-900 mb-3">Metadata Guideline</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {report.guidelines.map((guideline, index) => (
            <div key={`${guideline.source}-${index}`} className="rounded-xl border border-blue-200 bg-white p-3">
              <div className="font-bold text-blue-900 text-sm">{guideline.source}</div>
              <div className="text-xs text-blue-700 mt-1">{guideline.year} - {guideline.version}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/70 border border-current/10 px-3 py-2 min-w-[64px]">
      <div className="text-[10px] font-black uppercase opacity-60">{label}</div>
      <div className="text-xl font-black">{value}</div>
    </div>
  );
}
