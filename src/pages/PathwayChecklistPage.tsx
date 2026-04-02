import { toast } from 'sonner';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle,
  StickyNote,
  Send,
  AlertCircle,
  X,
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { diseases } from '../lib/diseases';
import { pathways } from '../lib/pathways';

// Convert pathway steps into individual checklist items
interface ChecklistStep {
  id: string;
  title: string;
  description: string;
  required: boolean;
  category: string;
}

export default function PathwayChecklistPage() {
  const { diseaseId } = useParams();
  const navigate = useNavigate();
  const disease = diseases.find(d => d.id === diseaseId);
  const pathway = pathways[diseaseId || ''];
  
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [stepNotes, setStepNotes] = useState<Record<string, string>>({});
  const [showNotesFor, setShowNotesFor] = useState<string | null>(null);
  const [showVariationModal, setShowVariationModal] = useState(false);
  const [variationReason, setVariationReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Convert pathway steps into detailed checklist items
  const checklistSteps = useMemo((): ChecklistStep[] => {
    if (!pathway) return [];
    
    const steps: ChecklistStep[] = [];
    
    pathway.steps.forEach((step, stepIndex) => {
      const baseId = `step-${stepIndex}`;
      
      // Main step
      steps.push({
        id: `${baseId}-main`,
        title: step.title,
        description: step.description,
        required: true,
        category: step.type
      });

      // Criteria as individual steps
      if (step.criteria && step.criteria.length > 0) {
        step.criteria.forEach((criterion, idx) => {
          steps.push({
            id: `${baseId}-criteria-${idx}`,
            title: `Assess: ${criterion}`,
            description: `Evaluate and document: ${criterion}`,
            required: step.type === 'decision' || step.type === 'assessment',
            category: 'assessment'
          });
        });
      }

      // Medications as individual steps
      if (step.medications && step.medications.length > 0) {
        step.medications.forEach((med, idx) => {
          steps.push({
            id: `${baseId}-med-${idx}`,
            title: `Administer: ${med.name}`,
            description: `${med.dose}${med.route ? ` (${med.route})` : ''}${med.duration ? ` - ${med.duration}` : ''}`,
            required: true,
            category: 'medication'
          });
        });
      }

      // Red flags as individual checks
      if (step.redFlags && step.redFlags.length > 0) {
        step.redFlags.forEach((flag, idx) => {
          steps.push({
            id: `${baseId}-redflag-${idx}`,
            title: `Check Red Flag: ${flag.substring(0, 50)}`,
            description: flag,
            required: true,
            category: 'safety'
          });
        });
      }
    });

    return steps;
  }, [pathway]);

  // Calculate completion
  const completion = useMemo(() => {
    const total = checklistSteps.length;
    const completed = Object.values(checkedSteps).filter(Boolean).length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    
    const requiredSteps = checklistSteps.filter(s => s.required);
    const requiredCompleted = requiredSteps.filter(s => checkedSteps[s.id]).length;
    const requiredPercentage = requiredSteps.length > 0 ? (requiredCompleted / requiredSteps.length) * 100 : 0;
    
    return {
      total,
      completed,
      percentage: Math.round(percentage),
      requiredTotal: requiredSteps.length,
      requiredCompleted,
      requiredPercentage: Math.round(requiredPercentage)
    };
  }, [checkedSteps, checklistSteps]);

  // Find next incomplete step
  const nextIncompleteStepId = useMemo(() => {
    return checklistSteps.find(step => !checkedSteps[step.id])?.id || null;
  }, [checkedSteps, checklistSteps]);

  // Auto-scroll to next incomplete on mount
  useEffect(() => {
    if (nextIncompleteStepId && stepRefs.current[nextIncompleteStepId]) {
      const timer = setTimeout(() => {
        stepRefs.current[nextIncompleteStepId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleToggle = (stepId: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
    toast.success('Step updated');
  };

  const handleSubmit = () => {
    if (completion.percentage === 100) {
      setIsSubmitting(true);
      setTimeout(() => {
        toast.success(`Clinical pathway for ${disease?.name} submitted successfully!`);
        setIsSubmitting(false);
        navigate('/home');
      }, 1500);
    } else {
      setShowVariationModal(true);
    }
  };

  const handleVariationSubmit = () => {
    if (!variationReason.trim()) {
      toast.error('Alasan variasi klinis harus diisi');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Pathway dengan variasi klinis berhasil disubmit');
      setIsSubmitting(false);
      setShowVariationModal(false);
      navigate('/home');
    }, 1500);
  };

  const uncheckedSteps = checklistSteps.filter(step => !checkedSteps[step.id]);

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

  const categoryColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    decision: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'bg-blue-100' },
    action: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', icon: 'bg-teal-100' },
    assessment: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'bg-purple-100' },
    medication: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: 'bg-green-100' },
    safety: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'bg-red-100' },
    info: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', icon: 'bg-slate-100' }
  };

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
              <div className="text-xs text-slate-500">Clinical Pathway Checklist</div>
            </div>

            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Pathway Progress</h2>
              <p className="text-sm text-slate-600 mt-1">
                {completion.completed} of {completion.total} steps completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-teal-600">{completion.percentage}%</div>
              <div className="text-xs text-slate-500">Overall</div>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion.percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
            />
          </div>

          {/* Required Steps Progress */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-600">
              Required steps: <span className="font-semibold text-slate-900">
                {completion.requiredCompleted}/{completion.requiredTotal}
              </span>
            </span>
            <span className={`font-semibold ${
              completion.requiredPercentage === 100 ? 'text-green-600' : 'text-orange-600'
            }`}>
              {completion.requiredPercentage}%
            </span>
          </div>
        </motion.div>

        {/* Checklist Steps */}
        <div className="space-y-3">
          {checklistSteps.map((step, index) => {
            const isChecked = checkedSteps[step.id];
            const isNextIncomplete = step.id === nextIncompleteStepId;
            const colors = categoryColors[step.category] || categoryColors.info;

            return (
              <motion.div
                key={step.id}
                ref={(el) => { stepRefs.current[step.id] = el; }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`relative ${isNextIncomplete ? 'ring-2 ring-teal-400 ring-offset-2' : ''}`}
              >
                <div
                  className={`bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                    isChecked 
                      ? 'border-teal-300 bg-teal-50/50' 
                      : `border-slate-200 hover:border-teal-200`
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => handleToggle(step.id)}
                        className="flex-shrink-0 mt-1"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-6 h-6 text-teal-600" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-400 hover:text-teal-400" />
                          )}
                        </motion.div>
                      </button>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors.icon} ${colors.text}`}>
                                {step.category.toUpperCase()}
                              </span>
                              {step.required && (
                                <span className="text-xs text-red-600 font-semibold">REQUIRED</span>
                              )}
                              {isNextIncomplete && (
                                <span className="text-xs text-teal-600 font-semibold animate-pulse">
                                  ← NEXT
                                </span>
                              )}
                            </div>
                            <h3 className={`font-semibold ${
                              isChecked ? 'text-teal-900' : 'text-slate-900'
                            }`}>
                              {step.title}
                            </h3>
                          </div>

                          {/* Notes Button */}
                          <button
                            onClick={() => setShowNotesFor(showNotesFor === step.id ? null : step.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              stepNotes[step.id] || showNotesFor === step.id
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                            }`}
                            title="Add clinical notes"
                          >
                            <StickyNote className="w-4 h-4" />
                          </button>
                        </div>

                        <p className={`text-sm ${
                          isChecked ? 'text-teal-700' : 'text-slate-600'
                        }`}>
                          {step.description}
                        </p>

                        {/* Notes Textarea */}
                        <AnimatePresence>
                          {showNotesFor === step.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3"
                            >
                              <textarea
                                value={stepNotes[step.id] || ''}
                                onChange={(e) => setStepNotes(prev => ({ ...prev, [step.id]: e.target.value }))}
                                placeholder="Catatan klinis untuk langkah ini..."
                                className="w-full p-3 text-sm border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none bg-white"
                                rows={3}
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

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sticky bottom-6 z-10"
        >
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
              completion.percentage === 100
                ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg shadow-teal-200 hover:shadow-xl'
                : 'bg-slate-400 hover:bg-slate-500'
            } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <span>Submitting...</span>
              </>
            ) : completion.percentage === 100 ? (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Pathway</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Pathway ({completion.percentage}%)</span>
              </>
            )}
          </button>
        </motion.div>
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
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Checklist Belum Lengkap</h3>
                    <p className="text-sm text-slate-600">
                      {uncheckedSteps.length} langkah belum diselesaikan
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVariationModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Options */}
                <div className="grid gap-4 mb-6">
                  <button
                    onClick={() => setShowVariationModal(false)}
                    className="p-4 border-2 border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-teal-900">
                          Kembali ke Checklist
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          Lengkapi semua langkah yang diperlukan
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600" />
                    </div>
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">ATAU</span>
                  </div>
                </div>

                {/* Variation Form */}
                <div className="mt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <strong>Isi Variasi Klinis</strong> jika kondisi pasien memerlukan modifikasi 
                        dari protokol standar. Dokumentasi lengkap diperlukan untuk audit klinis.
                      </div>
                    </div>
                  </div>

                  {/* Unchecked Steps List */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Langkah yang belum diselesaikan:
                    </label>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-48 overflow-y-auto">
                      <ul className="space-y-2">
                        {uncheckedSteps.map((step, idx) => (
                          <li key={step.id} className="text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-slate-400">{idx + 1}.</span>
                            <span>{step.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Variation Reason */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Alasan Variasi Klinis: <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      value={variationReason}
                      onChange={(e) => setVariationReason(e.target.value)}
                      placeholder="Jelaskan alasan klinis mengapa langkah tertentu tidak dilakukan atau dimodifikasi. Contoh: 'Pasien memiliki alergi terhadap obat X, sehingga diganti dengan alternatif Y berdasarkan konsultasi dengan senior...'"
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                      rows={6}
                    />
                    <div className="mt-2 text-xs text-slate-500">
                      Minimal 50 karakter untuk dokumentasi yang memadai
                    </div>
                  </div>

                  {/* Submit Variation */}
                  <button
                    onClick={handleVariationSubmit}
                    disabled={variationReason.length < 50}
                    className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all ${
                      variationReason.length >= 50
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg'
                        : 'bg-slate-300 cursor-not-allowed'
                    }`}
                  >
                    Submit dengan Variasi Klinis
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}