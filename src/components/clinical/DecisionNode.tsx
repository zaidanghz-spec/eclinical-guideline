import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DecisionNodeProps {
  question: string;
  options: {
    label: string;
    value: string;
    color: 'red' | 'green' | 'yellow' | 'blue';
  }[];
  onSelect: (value: string) => void;
  selectedValue?: string;
}

export function DecisionNode({ 
  question, 
  options, 
  onSelect,
  selectedValue 
}: DecisionNodeProps) {
  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      red: isSelected 
        ? 'bg-red-500 text-white border-red-500' 
        : 'bg-red-500/10 text-red-300 border-red-500/30 hover:bg-red-500/20',
      green: isSelected
        ? 'bg-emerald-500 text-white border-emerald-500'
        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20',
      yellow: isSelected
        ? 'bg-amber-500 text-white border-amber-500'
        : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20',
      blue: isSelected
        ? 'bg-blue-500 text-white border-blue-500'
        : 'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-white text-lg mb-1">Decision Point</h4>
          <p className="text-gray-300">{question}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`px-6 py-4 rounded-lg border-2 font-medium transition-all ${
                getColorClasses(option.color, isSelected)
              } ${isSelected ? 'ring-4 ring-white/20 scale-105' : ''}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
