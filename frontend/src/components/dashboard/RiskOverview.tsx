import React from 'react';
import { AlertCircle, CloudRain, ShieldAlert, Wind, Zap, Sun } from 'lucide-react';
import { RiskGauge } from '../../data/mockWeather';

interface Props {
  risks: RiskGauge[];
  onAskGpt: (promptText: string) => void;
}

export const RiskOverview: React.FC<Props> = ({ risks, onAskGpt }) => {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'rainfall':
        return CloudRain;
      case 'flood risk':
        return ShieldAlert;
      case 'wind gusts':
        return Wind;
      case 'lightning':
        return Zap;
      default:
        return Sun;
    }
  };

  return (
    <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-3 font-['Arimo']">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 min-w-0">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0" />
          <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">Your Area Risk Profile</h3>
        </div>
        <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase shrink-0">Real-Time Risk</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
        {risks.map((risk, idx) => {
          const Icon = getIcon(risk.type);
          return (
            <button
              key={idx}
              onClick={() => onAskGpt(`Tell me more about the ${risk.type} risk in my location`)}
              className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-sky-50/70 hover:border-[#38b6ff]/50 flex items-center justify-between text-left transition-all cursor-pointer group gap-2"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                <div className="p-2 rounded-xl bg-white text-slate-700 shadow-2xs group-hover:text-[#004aad] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-slate-900 group-hover:text-[#004aad] truncate">
                    {risk.type}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">
                    {risk.description}
                  </div>
                </div>
              </div>

              <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider shrink-0 ${risk.color}`}>
                {risk.level}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
