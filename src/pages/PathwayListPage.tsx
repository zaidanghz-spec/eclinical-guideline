import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  ClipboardList,
  Clock,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  GitBranch
} from 'lucide-react';
import { diseases, organSystems } from '../lib/diseases';
import { pathways } from '../lib/pathways';
import { dynamicPathways } from '../lib/dynamicPathways';

export default function PathwayListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [filterEmergency, setFilterEmergency] = useState(false);

  // Filter diseases that have pathways
  const availableDiseases = useMemo(() => {
    return diseases.filter(disease => {
      const hasPathway = pathways[disease.id] || dynamicPathways[disease.id];
      const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           disease.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSystem = selectedSystem === 'all' || disease.organSystem === selectedSystem;
      const matchesEmergency = !filterEmergency || disease.isEmergency;

      return hasPathway && matchesSearch && matchesSystem && matchesEmergency;
    });
  }, [searchQuery, selectedSystem, filterEmergency]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button 
              onClick={() => navigate('/home')}
              className="text-slate-600 hover:text-teal-600 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="font-bold text-xl text-slate-900">Clinical Pathways</h1>
              <p className="text-xs text-slate-500">Select a pathway to start checklist</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl p-6 mb-8 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Evidence-Based Clinical Pathways</h2>
              <p className="text-teal-100">
                Detailed step-by-step checklists untuk memandu keputusan klinis berdasarkan 
                guideline WHO, PPK Indonesia, dan best practices international.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pathways..."
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* System Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={selectedSystem}
                onChange={(e) => setSelectedSystem(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none bg-white"
              >
                <option value="all">All Systems</option>
                {organSystems.map(system => (
                  <option key={system.id} value={system.id}>
                    {system.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency Filter */}
            <button
              onClick={() => setFilterEmergency(!filterEmergency)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                filterEmergency
                  ? 'bg-red-100 text-red-700 border-2 border-red-300'
                  : 'bg-slate-100 text-slate-600 border-2 border-slate-200 hover:border-slate-300'
              }`}
            >
              <AlertCircle className="w-5 h-5" />
              {filterEmergency ? 'Emergency Only' : 'All Pathways'}
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{availableDiseases.length}</span> pathways
        </div>

        {/* Pathway Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableDiseases.map((disease, index) => {
            const systemInfo = organSystems.find(s => s.id === disease.organSystem);
            const pathway = pathways[disease.id];
            const dynamicPathway = dynamicPathways[disease.id];
            // Prioritize dynamic pathway - show step count from dynamic if available
            const stepCount = dynamicPathway 
              ? Object.values(dynamicPathway.nodes).filter(n => n.type === 'checklist').reduce((acc, node) => {
                  if (node.type === 'checklist') return acc + node.items.length;
                  return acc;
                }, 0)
              : (pathway?.steps.length || 0);
            const isDynamic = !!dynamicPathway;

            return (
              <motion.div
                key={disease.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={isDynamic ? `/pathway-dynamic/${disease.id}` : `/pathway-checklist/${disease.id}`}
                  className="block bg-white rounded-2xl border-2 border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className={`h-3 ${
                    disease.isEmergency 
                      ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                      : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                  }`} />

                  <div className="p-6">
                    {/* System Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {systemInfo?.name || 'General'}
                      </span>
                      <div className="flex items-center gap-2">
                        {isDynamic && (
                          <div className="flex items-center gap-1 text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                            <GitBranch className="w-3 h-3" />
                            Dynamic
                          </div>
                        )}
                        {disease.isEmergency && (
                          <div className="flex items-center gap-1 text-xs font-semibold text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            EMERGENCY
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Disease Name */}
                    <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                      {disease.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{disease.nameEn}</p>

                    {/* Stats */}
                    <div className="space-y-2 mb-4">
                      {disease.isEmergency && disease.timeToIntervention && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-red-600" />
                          <span className="text-slate-700">
                            <strong className="text-red-600">{disease.timeToIntervention}</strong>
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="w-4 h-4 text-teal-600" />
                        <span className="text-slate-700">
                          {stepCount} clinical steps
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-slate-700 text-xs">
                          {disease.prevalenceIndonesia}
                        </span>
                      </div>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {disease.keywords.slice(0, 3).map(keyword => (
                        <span key={keyword} className="text-xs px-2 py-1 bg-slate-50 text-slate-600 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <span className="text-sm font-semibold text-teal-600 group-hover:text-teal-700">
                        Start Checklist
                      </span>
                      <ChevronRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {availableDiseases.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No pathways found</h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSystem('all');
                setFilterEmergency(false);
              }}
              className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}