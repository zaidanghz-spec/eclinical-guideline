import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

interface ChecklistSectionProps {
  title: string;
  items: ChecklistItem[];
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
}

export function ChecklistSection({ 
  title, 
  items, 
  icon,
  defaultExpanded = true 
}: ChecklistSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const progress = (checkedItems.size / items.length) * 100;

  return (
    <div className="bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-xl border border-teal-500/20 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-teal-400">{icon}</div>}
          <h3 className="font-semibold text-white text-lg">{title}</h3>
          <span className="text-sm text-gray-400">
            {checkedItems.size}/{items.length} ✓
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Progress Bar */}
      <div className="px-6 pb-2">
        <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">{Math.round(progress)}%</div>
      </div>

      {/* Checklist Items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-6 pb-4"
          >
            <div className="space-y-3">
              {items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      checked={checkedItems.has(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="w-5 h-5 rounded border-2 border-teal-500/50 bg-gray-800/50 
                               checked:bg-teal-500 checked:border-teal-500
                               focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-0
                               transition-all cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium transition-all ${
                      checkedItems.has(item.id) 
                        ? 'text-gray-400 line-through' 
                        : 'text-white group-hover:text-teal-300'
                    }`}>
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="text-sm text-gray-400 mt-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
