import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PathwaySectionProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function PathwaySection({ 
  title, 
  subtitle,
  icon, 
  children,
  defaultExpanded = true,
  variant = 'primary'
}: PathwaySectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const variantClasses = {
    primary: 'from-teal-500/10 to-cyan-500/10 border-teal-500/30',
    secondary: 'from-blue-500/10 to-indigo-500/10 border-blue-500/30',
    danger: 'from-red-500/10 to-orange-500/10 border-red-500/30',
  };

  const iconColors = {
    primary: 'text-teal-400',
    secondary: 'text-blue-400',
    danger: 'text-red-400',
  };

  return (
    <div className={`bg-gradient-to-br ${variantClasses[variant]} rounded-xl border backdrop-blur-sm overflow-hidden`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg bg-white/5 ${iconColors[variant]}`}>
            {icon}
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-gray-400" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <div className="space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
