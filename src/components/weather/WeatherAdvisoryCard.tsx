import React from 'react';
import { Lightbulb, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { WeatherAdvisoryPayload } from '../../types/chat';

interface Props {
  advisory: WeatherAdvisoryPayload;
}

export const WeatherAdvisoryCard: React.FC<Props> = ({ advisory }) => {
  const getImpactStyles = (level: string) => {
    switch (level) {
      case 'severe':
      case 'high':
        return {
          bg: 'bg-rose-50/90 border-rose-200 text-rose-900',
          badge: 'bg-rose-600 text-white',
          icon: ShieldAlert,
          iconColor: 'text-rose-600',
        };
      case 'medium':
        return {
          bg: 'bg-amber-50/90 border-amber-200 text-amber-900',
          badge: 'bg-amber-500 text-white',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
        };
      default:
        return {
          bg: 'bg-sky-50/90 border-sky-200 text-sky-900',
          badge: 'bg-[#38b6ff] text-white',
          icon: Lightbulb,
          iconColor: 'text-[#004aad]',
        };
    }
  };

  const styles = getImpactStyles(advisory.impactLevel);
  const Icon = styles.icon;

  return (
    <div className={`my-2.5 p-3.5 rounded-2xl border ${styles.bg} shadow-2xs space-y-2 font-['Arimo'] transition-all`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${styles.iconColor} shrink-0`} />
          <span className="text-xs font-black tracking-tight">{advisory.title}</span>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${styles.badge}`}>
          {advisory.impactLevel} Impact
        </span>
      </div>

      <p className="text-xs font-medium leading-relaxed opacity-95">
        {advisory.advisoryText}
      </p>

      {advisory.actionableSteps && advisory.actionableSteps.length > 0 && (
        <ul className="space-y-1 pt-1 border-t border-slate-200/50 text-[11px]">
          {advisory.actionableSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-1.5 font-medium text-slate-700">
              <span className="text-[#38b6ff] font-bold">•</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
