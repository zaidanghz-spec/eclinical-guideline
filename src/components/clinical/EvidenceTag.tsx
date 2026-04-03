interface EvidenceTagProps {
  level: string;
  source: string;
}

export function EvidenceTag({ level, source }: EvidenceTagProps) {
  const getColorClass = () => {
    if (level === 'IA') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (level === 'IB') return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
    if (level === 'IIA') return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getColorClass()} text-xs font-medium`}>
      <span className="font-bold">{level}</span>
      <span className="opacity-70">•</span>
      <span>{source}</span>
    </div>
  );
}
