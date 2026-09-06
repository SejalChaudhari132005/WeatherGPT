import React from 'react';
import { AlertTriangle, ArrowRight, ShieldAlert, Zap, CloudRain } from 'lucide-react';

interface Props {
  alerts: { id: string; title: string; riskLevel: string; timeWindow: string; affectedArea: string }[];
  onOpenAlerts: () => void;
}

export const WeatherAlerts: React.FC<Props> = ({ alerts, onOpenAlerts }) => {
  return (
    <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-3 font-['Arimo']">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
          <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">Active Weather Alerts</h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[9px] sm:text-[10px] font-black uppercase shrink-0">
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-2">
        {alerts.map((item) => (
          <div key={item.id} className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-black text-amber-950 flex items-center gap-1.5 min-w-0">
                <CloudRain className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">{item.title}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase shrink-0">
                {item.riskLevel}
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold text-amber-900/80 pt-0.5 gap-2">
              <span className="truncate">📍 {item.affectedArea}</span>
              <span className="shrink-0">{item.timeWindow}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onOpenAlerts}
        className="w-full py-2.5 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-amber-50 text-slate-800 hover:text-amber-900 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
      >
        <span>View All Emergency Alerts</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
