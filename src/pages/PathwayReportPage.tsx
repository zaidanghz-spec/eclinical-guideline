import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle2, AlertCircle, FileText, Printer, Stethoscope } from 'lucide-react';
import { usePathwaySessions } from '../hooks/usePathwaySessions';
import { dynamicPathways } from '../lib/dynamicPathways';
import Navbar from '../components/Navbar';

export default function PathwayReportPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { sessions, loading } = usePathwaySessions();

  const session = sessions.find(s => s.id === sessionId);
  const pathway = session ? dynamicPathways[session.diseaseId] : null;

  useEffect(() => {
    if (!loading && !session) {
      // If session is not found and we are done loading
      navigate('/history');
    }
  }, [session, loading, navigate]);

  if (loading || !session || !pathway) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Get chronological sequence of nodes visited
  const visitedNodes = session.pathway_history || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Actions Header */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to History</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-700 font-semibold shadow-sm hover:bg-slate-50 transition-all"
          >
            <Printer className="w-5 h-5" />
            <span>Print Report</span>
          </button>
        </div>

        {/* Report Paper */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none print:border-none">
          {/* Document Header */}
          <div className="bg-slate-900 px-8 py-10 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Clinical Pathway Report</h1>
                  <p className="text-slate-400">Eclinical Guideline System</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 font-semibold text-sm rounded-lg border border-teal-500/30 uppercase">
                  {session.status.replace('_', ' ')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-700/50">
              <div>
                <div className="text-slate-400 text-sm mb-1">Diagnosis</div>
                <div className="font-semibold">{session.diseaseName}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Patient Code</div>
                <div className="font-semibold text-teal-400">{session.patient_code || 'Unspecified'}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Session ID</div>
                <div className="font-mono text-sm leading-relaxed truncate">{session.id}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Date</div>
                <div className="font-semibold">
                  {new Date(session.updated_at || session.startedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-12">
              {visitedNodes.map((historyItem, stepIndex) => {
                const node = pathway.nodes[historyItem.nodeId];
                if (!node) return null;

                const isChecklist = node.type === 'checklist';
                const isDecision = node.type === 'decision';

                return (
                  <section key={`${historyItem.nodeId}-${stepIndex}`} className="relative">
                    {/* Step Timeline Line */}
                    {stepIndex !== visitedNodes.length - 1 && (
                      <div className="absolute left-[19px] top-10 bottom-[-40px] w-0.5 bg-slate-100 print:hidden" />
                    )}

                    <div className="flex gap-6">
                      {/* Step Number */}
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center font-bold text-slate-500">
                        {stepIndex + 1}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1.5">
                        <h2 className="text-xl font-bold text-slate-900 mb-1">{node.title}</h2>
                        {node.description && (
                          <p className="text-slate-600 mb-6">{node.description}</p>
                        )}

                        {isChecklist && (
                          <div className="space-y-3 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            {node.items.map((item) => {
                              const isChecked = session.checklist[item.id];
                              const note = session.notes && session.notes[item.id];
                              
                              return (
                                <div key={item.id} className={`flex items-start gap-4 p-4 rounded-xl border bg-white ${isChecked ? 'border-teal-100' : 'border-slate-200'} shadow-sm`}>
                                  <div className="mt-0.5">
                                    {isChecked ? (
                                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                    ) : (
                                      <div className="w-5 h-5 border-2 border-slate-300 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className={`font-semibold ${isChecked ? 'text-slate-900' : 'text-slate-600'}`}>
                                        {item.title}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider 
                                        ${item.required ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                                        {item.required ? 'Required' : 'Optional'}
                                      </span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-2">
                                      {item.description}
                                    </p>
                                    
                                    {/* Clinical Notes Display */}
                                    {note && (
                                      <div className="mt-3 bg-yellow-50/50 border border-yellow-100 rounded-lg p-3 text-sm">
                                        <div className="font-semibold text-yellow-800 mb-1 flex items-center gap-1.5">
                                          <FileText className="w-4 h-4" />
                                          Clinical Notes:
                                        </div>
                                        <p className="text-yellow-900">{note}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {isDecision && (
                          <div className="mt-4">
                            {(() => {
                              const decisionRecord = session.decisions?.find(d => d.nodeId === node.id);
                              if (!decisionRecord) {
                                return (
                                  <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-center">
                                    No branch selection recorded.
                                  </div>
                                );
                              }

                              const branch = node.branches.find(b => b.id === decisionRecord.branchId);
                              
                              // Fallback in case the pathway structure changed
                              if (!branch) {
                                return (
                                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-medium">
                                    Decision made: {decisionRecord.branchTitle}
                                  </div>
                                );
                              }

                               return (
                                <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm">
                                  <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
                                    Selected Branch
                                  </div>
                                  <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-${branch.color}-100 text-${branch.color}-600`}>
                                      <Stethoscope className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-bold text-slate-900">{branch.title}</h3>
                                      <p className="text-slate-600 mt-1">{branch.description}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
            
            {/* Conclusion Area */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Conclusion & Audit Summary</h2>
              
              {session.variations && session.variations.length > 0 ? (
                <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                    <div>
                      <h3 className="text-lg font-bold text-orange-900">Clinical Variances Recorded</h3>
                      <p className="text-orange-800">
                        Tenaga medis telah menyelesaikan penanganan pasien dengan variasi klinis / penyimpangan dari pedoman karena alasan berikut:
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {session.variations.map((v, i) => (
                      <li key={i} className="bg-white p-4 rounded-xl border border-orange-100 text-slate-700">
                        <div className="font-bold text-orange-900 mb-1">Variasi / Bypass pada tahap: {v.nodeId}</div>
                        <div>"{v.variationReason}"</div>
                        {v.incompleteSteps && v.incompleteSteps.length > 0 && (
                          <div className="mt-2 text-sm bg-slate-50 p-2 rounded text-slate-600 border border-slate-100">
                            <strong>Checklist yang dilewati:</strong> {v.incompleteSteps.join(', ')}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-teal-50 border-2 border-teal-200 p-6 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="bg-teal-100 rounded-full p-2">
                    <CheckCircle2 className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-teal-900 mb-1">Standard Guideline Adherence</h3>
                    <p className="text-teal-800">
                      Tenaga medis telah menyelesaikan penanganan pasien sesuai dengan pedoman klinis yang berlaku. Tidak ditemukan penyimpangan (variasi) dari langkah-langkah pedoman <strong>{session.diseaseName}</strong>. Pathway dipatuhi dan dijalankan sebagaimana mestinya.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Authenticity Signature Block (Print purposes) */}
              <div className="mt-12 pt-8 border-t border-slate-200 hidden print:block">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Report Generated Automatically</p>
                    <p className="font-mono text-xs text-slate-400">ID: {session.id}</p>
                    <p className="font-mono text-xs text-slate-400">{new Date().toString()}</p>
                  </div>
                  <div className="text-center w-48">
                    <div className="border-b border-slate-400 h-16 mb-2"></div>
                    <p className="text-sm font-semibold text-slate-800">Assessing Clinician</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
