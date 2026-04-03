import { useState } from 'react';
import { Pill, ChevronDown, ChevronUp } from 'lucide-react';

interface MedicationCardProps {
  name: string;
  dose: string;
  route: string;
  indication: string;
  contraindication?: string;
  type: 'emergency' | 'standard';
  timing?: string; // New: "Immediate", "Within 10 min", "If SpO2 <94%"
}

export function MedicationCard({ 
  name, 
  dose, 
  route, 
  indication, 
  contraindication,
  type,
  timing = 'As prescribed'
}: MedicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEmergency = type === 'emergency';
  
  return (
    <div className="group relative">
      {/* Left accent line - subtle vertical indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full transition-all ${
        isEmergency 
          ? 'bg-red-500/40 group-hover:bg-red-500/60' 
          : 'bg-teal-500/30 group-hover:bg-teal-500/50'
      }`} />
      
      {/* Main card - integrated clinical action style */}
      <div className="pl-4 ml-3">
        {/* Header - always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left"
        >
          <div className="flex items-start gap-3 py-2 group-hover:translate-x-0.5 transition-transform">
            {/* Icon */}
            <div className={`p-1.5 rounded-md mt-0.5 ${
              isEmergency 
                ? 'bg-red-50 text-red-600' 
                : 'bg-teal-50 text-teal-600'
            }`}>
              <Pill className="w-4 h-4" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title row */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 text-sm leading-tight">
                    {name}
                  </h4>
                  
                  {/* Timing label - subtle */}
                  <p className="text-xs text-slate-500 mt-0.5">
                    {timing}
                  </p>
                </div>
                
                {/* Badges */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {isEmergency && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-100 text-red-700 rounded border border-red-200">
                      REQUIRED
                    </span>
                  )}
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-purple-100 text-purple-700 rounded border border-purple-200">
                    MEDICATION
                  </span>
                  
                  {/* Expand indicator */}
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </button>
        
        {/* Collapsible details */}
        {isExpanded && (
          <div className="mt-2 ml-9 pb-3 space-y-2 text-sm border-l-2 border-slate-100 pl-4 animate-in slide-in-from-top-1 duration-200">
            {/* Dose */}
            <div className="flex items-start gap-2">
              <span className="text-slate-500 text-xs font-medium min-w-[70px]">Dose:</span>
              <span className="text-slate-900 font-medium text-xs">{dose}</span>
            </div>
            
            {/* Route */}
            {route && route !== 'As prescribed' && (
              <div className="flex items-start gap-2">
                <span className="text-slate-500 text-xs font-medium min-w-[70px]">Route:</span>
                <span className="text-slate-700 text-xs">{route}</span>
              </div>
            )}
            
            {/* Indication */}
            <div className="flex items-start gap-2">
              <span className="text-slate-500 text-xs font-medium min-w-[70px]">Indication:</span>
              <span className="text-slate-700 text-xs leading-relaxed">{indication}</span>
            </div>
            
            {/* Contraindication warning */}
            {contraindication && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="flex items-start gap-2 bg-red-50 rounded-lg p-2.5 border border-red-100">
                  <span className="text-red-700 text-xs font-semibold min-w-[70px] flex items-center gap-1">
                    <span className="text-base">⚠️</span>
                    Caution:
                  </span>
                  <span className="text-red-800 text-xs leading-relaxed font-medium">
                    {contraindication}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
