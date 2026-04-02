import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, StickyNote } from 'lucide-react';

interface ChecklistItemProps {
  id: string;
  text: string;
  required: boolean;
  checked: boolean;
  notes?: string;
  onToggle: (id: string) => void;
  onNotesChange: (id: string, notes: string) => void;
}

export default function ChecklistItem({
  id,
  text,
  required,
  checked,
  notes,
  onToggle,
  onNotesChange,
}: ChecklistItemProps) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group"
    >
      <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
        checked ? 'bg-teal-50 border border-teal-200' : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
      }`}>
        <button
          onClick={() => onToggle(id)}
          className="flex-shrink-0 mt-0.5"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {checked ? (
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
            ) : (
              <Circle className="w-5 h-5 text-slate-400" />
            )}
          </motion.div>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <label className={`text-sm cursor-pointer ${
              checked ? 'text-teal-900 font-medium' : 'text-slate-700'
            }`}>
              {text}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`p-1 rounded transition-colors ${
                notes || showNotes ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Add notes"
            >
              <StickyNote className="w-4 h-4" />
            </button>
          </div>

          {showNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2"
            >
              <textarea
                value={notes || ''}
                onChange={(e) => onNotesChange(id, e.target.value)}
                placeholder="Tambahkan catatan klinis..."
                className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                rows={2}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
