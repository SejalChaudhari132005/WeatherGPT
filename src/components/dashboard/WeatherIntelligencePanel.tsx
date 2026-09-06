import React from 'react';
import { CloudRain, Waves, Wind, Zap, Activity, CheckCircle2, Lightbulb } from 'lucide-react';
import { DemoBadge } from '../common/DemoBadge';

export const WeatherIntelligencePanel: React.FC = () => {
  const risks = [
    { title: 'Rain Risk', level: 'HIGH', icon: CloudRain, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { title: 'Flood Risk', level: 'MEDIUM', icon: Waves, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { title: 'Wind Risk', level: 'LOW', icon: Wind, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { title: 'Lightning', level: 'LOW', icon: Zap, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-bold text-slate-900">Weather Intelligence</h3>
        </div>
        <DemoBadge label="INTELLIGENCE MATRIX" variant="blue" />
      </div>

      {/* Grid of risk indicators */}
      <div className="grid grid-cols-2 gap-3">
        {risks.map((r, i) => {
          const Icon = r.icon;
          return (
            <div key={i} className={`p-4 rounded-2xl border ${r.color} flex flex-col justify-between`}>
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-wider">{r.level}</span>
              </div>
              <span className="text-xs font-bold opacity-80">{r.title}</span>
            </div>
          );
        })}
      </div>

      {/* Outdoor Suitability Score */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outdoor Suitability</div>
          <p className="text-xs text-slate-500 mt-0.5">Calculated based on wind, precipitation & UV index</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-black text-amber-600">62%</div>
          <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">Moderate</span>
        </div>
      </div>

      {/* Today's Recommendation */}
      <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 flex items-start gap-3">
        <div className="p-2 bg-sky-600 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1">Today's Recommendation</h4>
          <p className="text-xs text-sky-950 font-medium leading-relaxed">
            Heavier rain is expected during the afternoon peak (2:00 PM – 5:00 PM). Consider completing critical outdoor activities earlier in the day.
          </p>
        </div>
      </div>
    </div>
  );
};
