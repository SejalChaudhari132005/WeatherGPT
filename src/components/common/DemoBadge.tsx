import React from 'react';

interface DemoBadgeProps {
  label?: string;
  variant?: 'amber' | 'blue' | 'purple' | 'sky';
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ label = 'DEMO DATA', variant = 'amber' }) => {
  const styles = {
    amber: 'bg-amber-100/90 text-amber-900 border-amber-300/60',
    blue: 'bg-sky-100/90 text-sky-900 border-sky-300/60',
    sky: 'bg-sky-100/90 text-sky-900 border-sky-300/60',
    purple: 'bg-purple-100/90 text-purple-900 border-purple-300/60',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-2xs ${styles[variant]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
      {label}
    </span>
  );
};
