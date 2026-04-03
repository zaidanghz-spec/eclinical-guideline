import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface InteractiveCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  title: string;
  description: string;
  tooltip?: string;
  delay?: number;
}

export function InteractiveCard({
  icon: Icon,
  iconColor,
  iconBgColor,
  title,
  description,
  tooltip,
  delay = 0,
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (tooltip) {
          setTimeout(() => setShowTooltip(true), 200);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowTooltip(false);
      }}
      className="relative"
    >
      <motion.div
        className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white cursor-pointer transition-colors duration-300"
        animate={{
          y: isHovered ? -4 : 0,
          boxShadow: isHovered 
            ? '0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(20, 184, 166, 0.1)' 
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          borderColor: isHovered ? 'rgb(20, 184, 166)' : 'rgb(229, 231, 235)',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className={`${iconBgColor} p-2 rounded-lg flex-shrink-0`}
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Icon className={`size-5 ${iconColor}`} />
          </motion.div>
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 mb-1 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Tooltip */}
      {tooltip && showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute left-0 right-0 top-full mt-2 z-10"
        >
          <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl">
            <div className="absolute -top-1 left-6 w-2 h-2 bg-gray-900 rotate-45" />
            {tooltip}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
