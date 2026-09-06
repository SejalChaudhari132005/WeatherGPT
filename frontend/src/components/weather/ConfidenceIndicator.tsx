import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  score?: number; // e.g. 84
}

export const ConfidenceIndicator: React.FC<Props> = ({ score = 85 }) => {
  const getBadgeColor = (val: number) => {
    if (val >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (val >= 70) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${getBadgeColor(score)}`}>
      <ShieldCheck className="w-3 h-3" />
      <span>Confidence: {score}%</span>
    </div>
  );
};
