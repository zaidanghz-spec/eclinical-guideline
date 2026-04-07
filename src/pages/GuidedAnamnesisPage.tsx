import { toast } from 'sonner';
import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  Activity, 
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  MapPin,
  Zap,
  CheckCircle,
  Circle,
  Brain,
  Target
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { AnamnesisData, calculateCompletion, generateSuggestions } from '../lib/anamnesisEngine';
import { dynamicPathways } from '../lib/dynamicPathways';

const initialData: AnamnesisData = {
  onset: {
    when: '',
    suddenGradual: '',
    activity: '',
  },
  provocation: {
    worsenedBy: [],
    relievedBy: [],
  },
  quality: {
    description: '',
    type: [],
  },
  region: {
    location: '',
    radiation: [],
  },
  severity: {
    scale: 0,
    impact: '',
  },
  time: {
    duration: '',
    pattern: '',
    frequency: '',
  },
};

const sections = [
  { 
    id: 'onset', 
    title: 'Onset', 
    subtitle: 'Kapan gejala dimulai?', 
    icon: Clock, 
    color: 'blue',
    hint: 'Acute / Subacute / Chronic timing',
    letter: 'O'
  },
  { 
    id: 'provocation', 
    title: 'Provocation', 
    subtitle: 'Diperberat/diperingan oleh?', 
    icon: Zap, 
    color: 'orange',
    hint: 'Worse with exertion? Better with rest?',
    letter: 'P'
  },
  { 
    id: 'quality', 
    title: 'Quality', 
    subtitle: 'Kualitas gejala', 
    icon: Activity, 
    color: 'purple',
    hint: 'Sharp / Dull / Crushing / Burning',
    letter: 'Q'
  },
  { 
    id: 'region', 
    title: 'Region', 
    subtitle: 'Lokasi & radiasi', 
    icon: MapPin, 
    color: 'green',
    hint: 'Localized or radiating pattern?',
    letter: 'R'
  },
  { 
    id: 'severity', 
    title: 'Severity', 
    subtitle: 'Skala keparahan', 
    icon: TrendingUp, 
    color: 'red',
    hint: 'Pain scale 0-10 and functional impact',
    letter: 'S'
  },
  { 
    id: 'time', 
    title: 'Time', 
    subtitle: 'Durasi gejala', 
    icon: Clock, 
    color: 'teal',
    hint: 'Duration and temporal pattern',
    letter: 'T'
  },
];

export default function GuidedAnamnesisPage() {
  const [activeSection, setActiveSection] = useState(-1);
  const [data, setData] = useState<AnamnesisData>(initialData);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const completion = useMemo(() => calculateCompletion(data), [data]);
  const suggestions = useMemo(() => {
    if (completion >= 70) {
      return generateSuggestions(data);
    }
    return [];
  }, [data, completion]);

  // Calculate section completion
  const getSectionCompletion = (sectionId: string): boolean => {
    switch(sectionId) {
      case 'onset':
        return !!(data.onset.when && data.onset.suddenGradual);
      case 'provocation':
        return data.provocation.worsenedBy.length > 0 || data.provocation.relievedBy.length > 0;
      case 'quality':
        return !!(data.quality.description || data.quality.type.length > 0);
      case 'region':
        return !!data.region.location;
      case 'severity':
        return data.severity.scale > 0;
      case 'time':
        return !!data.time.duration;
      default:
        return false;
    }
  };

  // Clinical confidence calculation
  const calculateClinicalConfidence = (): number => {
    const onsetComplete = getSectionCompletion('onset');
    const qualityComplete = getSectionCompletion('quality');
    const regionComplete = getSectionCompletion('region');
    
    let confidence = 0;
    if (onsetComplete) confidence += 30;
    if (qualityComplete) confidence += 30;
    if (regionComplete) confidence += 20;
    if (getSectionCompletion('provocation')) confidence += 10;
    if (getSectionCompletion('severity')) confidence += 5;
    if (getSectionCompletion('time')) confidence += 5;
    
    return confidence;
  };

  const clinicalConfidence = calculateClinicalConfidence();
  
  // AI unlock criteria
  const onsetComplete = getSectionCompletion('onset');
  const qualityComplete = getSectionCompletion('quality');
  const regionComplete = getSectionCompletion('region');
  const aiUnlocked = onsetComplete && qualityComplete && regionComplete;

  const toggleInArray = (arr: string[], value: string) => {
    return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
  };

  const handleGenerateSuggestions = () => {
    if (completion < 70) {
      toast.error('Lengkapi minimal 70% data anamnesis untuk mendapatkan suggestions');
      return;
    }
    setShowSuggestions(true);
    toast.success('AI differential diagnosis generated!');
  };

  // Get smart clinical feedback
  const getClinicalFeedback = (): { message: string; severity: 'info' | 'warning' | 'error' } => {
    if (clinicalConfidence >= 80) {
      return { message: 'Excellent data quality — High diagnostic confidence', severity: 'info' };
    } else if (clinicalConfidence >= 50) {
      return { message: 'Good baseline data — Consider adding temporal pattern for better accuracy', severity: 'info' };
    } else if (clinicalConfidence >= 30) {
      return { message: 'Moderate confidence — Add symptom quality and region for differential diagnosis', severity: 'warning' };
    } else {
      return { message: 'Low diagnostic confidence — Essential data missing (onset timing, quality, location)', severity: 'error' };
    }
  };

  const clinicalFeedback = getClinicalFeedback();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header - Compact */}
        <div className="mb-5">
          <Link 
            to="/home" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-md border border-white/20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">
                  Guided Anamnesis
                </h1>
                <p className="text-sm text-slate-600">
                  Intelligent OPQRST framework with AI-powered differential diagnosis
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{Math.round(completion)}%</div>
                <div className="text-xs text-slate-500">Complete</div>
              </div>
            </div>

            {/* OPQRST Flow Stepper */}
            <div className="mt-4 mb-3">
              <div className="flex items-center justify-between gap-1">
                {sections.map((section, index) => {
                  const isComplete = getSectionCompletion(section.id);
                  const isActive = activeSection === index;
                  
                  return (
                    <div key={section.id} className="flex items-center flex-1">
                      {/* Step Circle */}
                      <button
                        onClick={() => setActiveSection(activeSection === index ? -1 : index)}
                        className={`
                          relative w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm
                          transition-all duration-300
                          ${isComplete ? 'bg-teal-500 text-white shadow-md' : 
                            isActive ? 'bg-purple-500 text-white shadow-lg scale-110' : 
                            'bg-slate-200 text-slate-500 hover:bg-slate-300'}
                        `}
                      >
                        {isComplete ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span>{section.letter}</span>
                        )}
                      </button>
                      
                      {/* Connector Line */}
                      {index < sections.length - 1 && (
                        <div className={`
                          flex-1 h-0.5 mx-1 transition-all duration-300
                          ${getSectionCompletion(sections[index + 1].id) ? 'bg-teal-400' : 'bg-slate-200'}
                        `} />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Stepper Labels - Mobile hidden */}
              <div className="hidden md:flex items-center justify-between gap-1 mt-1.5">
                {sections.map((section) => (
                  <div key={section.id} className="flex-1 text-center">
                    <span className="text-[9px] font-semibold text-slate-500 uppercase">
                      {section.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Confidence Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-semibold text-slate-700">Clinical Confidence</span>
                </div>
                <span className="text-xs font-bold text-purple-600">{clinicalConfidence}%</span>
              </div>
              
              <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${clinicalConfidence}%` }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-y-0 left-0 rounded-full ${
                    clinicalConfidence >= 80 ? 'bg-gradient-to-r from-teal-500 to-green-500' :
                    clinicalConfidence >= 50 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                    clinicalConfidence >= 30 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                />
              </div>
            </div>

            {/* Smart Clinical Feedback */}
            <motion.div
              key={clinicalFeedback.message}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 p-2.5 rounded-lg flex items-start gap-2 text-sm ${
                clinicalFeedback.severity === 'error' ? 'bg-red-50 border border-red-200' :
                clinicalFeedback.severity === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-teal-50 border border-teal-200'
              }`}
            >
              {clinicalFeedback.severity === 'error' ? (
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              ) : clinicalFeedback.severity === 'warning' ? (
                <Target className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              )}
              <span className={`text-xs font-medium ${
                clinicalFeedback.severity === 'error' ? 'text-red-800' :
                clinicalFeedback.severity === 'warning' ? 'text-yellow-800' :
                'text-teal-800'
              }`}>
                {clinicalFeedback.message}
              </span>
            </motion.div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left: OPQRST Sections - Reduced spacing */}
          <div className="lg:col-span-2 space-y-3">
            {sections.map((section, index) => {
              const isComplete = getSectionCompletion(section.id);
              const isActive = activeSection === index;
              
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`
                    bg-white rounded-xl border-2 overflow-hidden transition-all duration-300
                    ${isActive ? 'shadow-lg border-purple-300 ring-2 ring-purple-200' : 
                      isComplete ? 'shadow-sm border-teal-200' : 
                      'shadow-sm border-slate-200 hover:border-slate-300'}
                  `}
                >
                  <button
                    onClick={() => setActiveSection(activeSection === index ? -1 : index)}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-11 h-11 rounded-xl flex items-center justify-center relative
                        ${isComplete ? 'bg-teal-100' : `bg-${section.color}-100`}
                      `}>
                        {isComplete ? (
                          <CheckCircle2 className="w-6 h-6 text-teal-600" />
                        ) : (
                          <section.icon className={`w-6 h-6 text-${section.color}-600`} />
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                          {section.title}
                          {isComplete && (
                            <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full font-semibold">
                              Done
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">{section.hint}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${
                      isActive ? 'rotate-90' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-200"
                      >
                        <div className="p-4 space-y-3 bg-slate-50/50">
                          {/* ONSET Section */}
                          {section.id === 'onset' && (
                            <>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Kapan gejala dimulai?
                                </label>
                                <input
                                  type="text"
                                  value={data.onset.when}
                                  onChange={(e) => setData({ ...data, onset: { ...data.onset, when: e.target.value } })}
                                  placeholder="Contoh: 2 jam yang lalu, pagi ini pukul 06:00..."
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Onset Pattern
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {['sudden', 'gradual'].map((type, idx) => (
                                    <button
                                      key={type}
                                      onClick={() => setData({ ...data, onset: { ...data.onset, suddenGradual: type } })}
                                      className={`p-2.5 text-sm rounded-lg border-2 transition-all font-medium ${
                                        data.onset.suddenGradual === type
                                          ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                                          : 'border-slate-200 hover:border-purple-300 text-slate-700'
                                      }`}
                                    >
                                      {idx === 0 ? 'Sudden (Acute)' : 'Gradual (Subacute)'}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Activity at Onset
                                </label>
                                <input
                                  type="text"
                                  value={data.onset.activity}
                                  onChange={(e) => setData({ ...data, onset: { ...data.onset, activity: e.target.value } })}
                                  placeholder="Contoh: Berjalan, berolahraga, istirahat..."
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                              </div>
                            </>
                          )}

                          {/* PROVOCATION Section */}
                          {section.id === 'provocation' && (
                            <>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Worsened By (Pilih semua yang sesuai)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {['exertion', 'breathing', 'eating', 'movement', 'stress'].map(factor => (
                                    <button
                                      key={factor}
                                      onClick={() => setData({ 
                                        ...data, 
                                        provocation: { ...data.provocation, worsenedBy: toggleInArray(data.provocation.worsenedBy, factor) }
                                      })}
                                      className={`p-2 text-xs rounded-lg border-2 transition-all font-medium ${
                                        data.provocation.worsenedBy.includes(factor)
                                          ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                                          : 'border-slate-200 hover:border-purple-300 text-slate-700'
                                      }`}
                                    >
                                      {factor === 'exertion' ? 'Aktivitas' : factor === 'breathing' ? 'Bernapas' : factor === 'eating' ? 'Makan' : factor === 'movement' ? 'Gerakan' : 'Stres'}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Relieved By
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {['rest', 'medication', 'position change'].map(factor => (
                                    <button
                                      key={factor}
                                      onClick={() => setData({ 
                                        ...data, 
                                        provocation: { ...data.provocation, relievedBy: toggleInArray(data.provocation.relievedBy, factor) }
                                      })}
                                      className={`p-2 text-xs rounded-lg border-2 transition-all font-medium ${
                                        data.provocation.relievedBy.includes(factor)
                                          ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                                          : 'border-slate-200 hover:border-purple-300 text-slate-700'
                                      }`}
                                    >
                                      {factor === 'rest' ? 'Istirahat' : factor === 'medication' ? 'Obat' : 'Ubah posisi'}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          {/* QUALITY Section */}
                          {section.id === 'quality' && (
                            <>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Patient's Own Words
                                </label>
                                <textarea
                                  value={data.quality.description}
                                  onChange={(e) => setData({ ...data, quality: { ...data.quality, description: e.target.value } })}
                                  placeholder="Seperti apa rasanya? Gunakan kata-kata pasien sendiri..."
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                  rows={2}
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Clinical Descriptors
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {['sharp', 'dull', 'burning', 'stabbing', 'crushing', 'pressure'].map(descriptor => (
                                    <button
                                      key={descriptor}
                                      onClick={() => setData({ 
                                        ...data, 
                                        quality: { ...data.quality, type: toggleInArray(data.quality.type, descriptor) }
                                      })}
                                      className={`p-2 text-xs rounded-lg border-2 transition-all font-medium ${
                                        data.quality.type.includes(descriptor)
                                          ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                                          : 'border-slate-200 hover:border-purple-300 text-slate-700'
                                      }`}
                                    >
                                      {descriptor === 'sharp' ? 'Tajam' : descriptor === 'dull' ? 'Tumpul' : descriptor === 'burning' ? 'Terbakar' : descriptor === 'stabbing' ? 'Ditusuk' : descriptor === 'crushing' ? 'Dihimpit' : 'Tertekan'}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          {/* REGION Section */}
                          {section.id === 'region' && (
                            <>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Primary Location
                                </label>
                                <input
                                  type="text"
                                  value={data.region.location}
                                  onChange={(e) => setData({ ...data, region: { ...data.region, location: e.target.value } })}
                                  placeholder="Dimana tepatnya? Dada, perut, kepala, dll"
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Radiation Pattern
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {['left arm', 'right arm', 'jaw', 'back', 'abdomen', 'none'].map(location => (
                                    <button
                                      key={location}
                                      onClick={() => setData({ 
                                        ...data, 
                                        region: { ...data.region, radiation: toggleInArray(data.region.radiation, location) }
                                      })}
                                      className={`p-2 text-xs rounded-lg border-2 transition-all font-medium ${
                                        data.region.radiation.includes(location)
                                          ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                                          : 'border-slate-200 hover:border-purple-300 text-slate-700'
                                      }`}
                                    >
                                      {location === 'left arm' ? 'Lengan kiri' : location === 'right arm' ? 'Lengan kanan' : location === 'jaw' ? 'Rahang' : location === 'back' ? 'Punggung' : location === 'abdomen' ? 'Perut' : 'Tidak menjalar'}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          {/* SEVERITY Section */}
                          {section.id === 'severity' && (
                            <>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Pain Scale: {data.severity.scale}/10
                                </label>
                                <input
                                  type="range"
                                  min="0"
                                  max="10"
                                  value={data.severity.scale}
                                  onChange={(e) => setData({ ...data, severity: { ...data.severity, scale: parseInt(e.target.value) } })}
                                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                                />
                                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                  <span>No pain</span>
                                  <span className="text-red-600 font-bold">Worst imaginable</span>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Functional Impact
                                </label>
                                <textarea
                                  value={data.severity.impact}
                                  onChange={(e) => setData({ ...data, severity: { ...data.severity, impact: e.target.value } })}
                                  placeholder="Bagaimana gejala ini mempengaruhi aktivitas sehari-hari?"
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                  rows={2}
                                />
                              </div>

                              <div className="bg-slate-100 rounded-lg p-3 border border-slate-200">
                                <div className="text-[10px] font-bold text-slate-700 mb-1.5 uppercase">Clinical Reference:</div>
                                <div className="space-y-0.5 text-[10px] text-slate-600">
                                  <div>0-3: Mild — Activity unaffected</div>
                                  <div>4-6: Moderate — Some functional limitation</div>
                                  <div>7-10: Severe — Significant impairment</div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* TIME Section */}
                          {section.id === 'time' && (
                            <>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Duration
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                  {['<1 hour', '1-6 hours', '6-24 hours', '>24 hours'].map(dur => (
                                    <button
                                      key={dur}
                                      onClick={() => setData({ ...data, time: { ...data.time, duration: dur } })}
                                      className={`p-2.5 text-xs rounded-lg border-2 transition-all font-medium ${
                                        data.time.duration === dur
                                          ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-sm'
                                          : 'border-slate-200 hover:border-teal-300 text-slate-700'
                                      }`}
                                    >
                                      {dur === '<1 hour' ? '<1 jam' : dur === '1-6 hours' ? '1-6 jam' : dur === '6-24 hours' ? '6-24 jam' : '>24 jam'}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Temporal Pattern
                                </label>
                                <input
                                  type="text"
                                  value={data.time.pattern}
                                  onChange={(e) => setData({ ...data, time: { ...data.time, pattern: e.target.value } })}
                                  placeholder="Contoh: Konstan, hilang-timbul, membaik, memburuk..."
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                  Frequency
                                </label>
                                <input
                                  type="text"
                                  value={data.time.frequency}
                                  onChange={(e) => setData({ ...data, time: { ...data.time, frequency: e.target.value } })}
                                  placeholder="Contoh: Setiap hari, beberapa kali seminggu..."
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right: AI Differential Panel - Upgraded */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200 sticky top-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">AI Differential</h3>
                  <p className="text-[10px] text-slate-500">Powered by clinical reasoning</p>
                </div>
              </div>

              {!aiUnlocked ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-7 h-7 text-purple-600 animate-pulse" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Complete essential data to unlock AI
                  </p>
                  
                  {/* Checklist unlock criteria */}
                  <div className="bg-slate-50 rounded-lg p-3 text-left space-y-2">
                    <div className="text-[10px] font-bold text-slate-600 uppercase mb-2">Required for Analysis:</div>
                    <div className={`flex items-center gap-2 text-xs ${onsetComplete ? 'text-teal-700' : 'text-slate-600'}`}>
                      {onsetComplete ? (
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                      <span className={onsetComplete ? 'font-semibold' : ''}>Onset timing</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${qualityComplete ? 'text-teal-700' : 'text-slate-600'}`}>
                      {qualityComplete ? (
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                      <span className={qualityComplete ? 'font-semibold' : ''}>Symptom quality</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${regionComplete ? 'text-teal-700' : 'text-slate-600'}`}>
                      {regionComplete ? (
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                      <span className={regionComplete ? 'font-semibold' : ''}>Location/region</span>
                    </div>
                  </div>
                </div>
              ) : completion < 70 ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-7 h-7 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">
                    Add {70 - Math.round(completion)}% more data
                  </p>
                  <p className="text-xs text-slate-600">
                    for complete differential diagnosis
                  </p>
                  <div className="mt-3 text-xs text-slate-500">
                    Current: {Math.round(completion)}% / Target: 70%
                  </div>
                </div>
              ) : !showSuggestions ? (
                <div className="text-center py-6">
                  <button
                    onClick={handleGenerateSuggestions}
                    className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 mx-auto shadow-lg"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate Differential
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 mb-3">
                    Based on clinical data, differential diagnosis:
                  </p>

                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.diseaseId}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-xl border-2 ${
                        index === 0
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      {index === 0 && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span className="text-[9px] font-bold text-purple-600 uppercase tracking-wide">Most Likely</span>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-slate-900">{suggestion.diseaseName}</h4>
                        <span className="text-lg font-bold text-purple-600">{Math.round(suggestion.probability)}%</span>
                      </div>

                      {suggestion.matchedCriteria.length > 0 && (
                        <div className="mb-2">
                          <div className="text-[9px] font-bold text-slate-600 mb-1 uppercase">Matched criteria:</div>
                          <ul className="space-y-0.5">
                            {suggestion.matchedCriteria.slice(0, 2).map((criteria, idx) => (
                              <li key={idx} className="text-[10px] text-slate-600 flex items-start gap-1">
                                <CheckCircle2 className="w-3 h-3 text-teal-600 flex-shrink-0 mt-0.5" />
                                <span>{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {suggestion.additionalQuestions.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
                          <div className="text-[9px] font-bold text-blue-900 mb-1.5 uppercase">
                            Targeted questions:
                          </div>
                          <ul className="space-y-0.5">
                            {suggestion.additionalQuestions.slice(0, 2).map((q, idx) => (
                              <li key={idx} className="text-[10px] text-blue-800">• {q}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link
                        to={dynamicPathways[suggestion.diseaseId] 
                          ? `/pathway-dynamic/${suggestion.diseaseId}` 
                          : `/pathway-checklist/${suggestion.diseaseId}`}
                        className="block mt-2.5 text-center py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition-colors"
                      >
                        View Clinical Pathway →
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}