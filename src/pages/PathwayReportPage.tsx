import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle2, AlertCircle, FileText, Printer, Stethoscope } from 'lucide-react';
import { usePathwaySessions } from '../hooks/usePathwaySessions';
import { dynamicPathways } from '../lib/dynamicPathways';
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
  const visitedNodes = session.pathway_history || [];

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
              <div className="px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-xl text-teal-400 text-sm font-bold uppercase tracking-wider">
                {session.status}
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
            <div className="space-y-12">
              {visitedNodes.length === 0 ? (
                <div className="p-16 border-2 border-dashed border-slate-100 rounded-3xl text-center text-slate-400 italic">
                  Tidak ada riwayat langkah yang tercatat dalam sesi ini.
                </div>
              ) : (
                visitedNodes.map((historyItem, idx) => {
                  const node = pathway.nodes[historyItem.nodeId];
                  if (!node) return null;
                  
                  return (
                    <div key={`${historyItem.nodeId}-${idx}`} className="relative pl-14">
                      {idx !== visitedNodes.length - 1 && <div className="absolute left-6 top-10 bottom-[-48px] w-0.5 bg-slate-100" />}
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
                             return (
                              <div key={item.id} className={`p-5 rounded-2xl border ${isChecked ? 'bg-teal-50/30 border-teal-100 ring-1 ring-teal-100' : 'bg-slate-50/50 border-slate-100'}`}>
                                <div className="flex gap-4">
                                  {isChecked ? (
                                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                                  ) : (
                                    <div className="w-6 h-6 border-2 border-slate-300 rounded-full" />
                                  )}
                                  <div className="flex-1">
                                    <div className="font-bold text-slate-800">{item.title}</div>
                                    <p className="text-slate-500 text-sm mt-1">{item.description}</p>
                                    {note && (
                                      <div className="mt-4 p-4 bg-white border border-yellow-200 rounded-xl text-sm text-yellow-800 shadow-sm italic">
                                        <div className="flex items-center gap-2 mb-1 not-italic font-bold text-yellow-900 uppercase text-[10px]">Catatan Klinis:</div>
                                        {note}
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
                  );
                })
              )}
            </div>

            <div className="mt-20 pt-10 border-t border-slate-200">
               {session.variations && session.variations.length > 0 ? (
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
              ) : (
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
