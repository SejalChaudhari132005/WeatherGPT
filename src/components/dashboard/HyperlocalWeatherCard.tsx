import React from 'react';
import { Navigation, MapPin, CloudRain, Waves, Zap, Wind } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { DemoBadge } from '../common/DemoBadge';

export const HyperlocalWeatherCard: React.FC = () => {
  const { hyperlocalRisks, userLocation } = useWeather();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
            <Navigation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Weather Around You</h3>
            <p className="text-xs text-slate-500">Hyperlocal micro-basin telemetry • Real GPS pinpoint</p>
          </div>
        </div>
        <DemoBadge label="HYPERLOCAL 1KM" variant="purple" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {hyperlocalRisks.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border transition-all ${
              idx === 0
                ? 'bg-gradient-to-r from-sky-50/80 to-blue-50/80 border-sky-200/90 shadow-sm'
                : 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${idx === 0 ? 'text-sky-600' : 'text-slate-400'}`} />
                <span className="text-xs font-bold text-slate-800">{item.areaName}</span>
              </div>
              <span className="text-xs font-black text-slate-900">{item.temperature}°C</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 text-[10px] text-center">
              <div className="p-1.5 rounded-xl bg-white/80 border border-slate-200/60">
                <div className="text-slate-400 font-semibold mb-0.5">Rain</div>
                <span className={`font-extrabold ${item.rainRisk === 'HIGH' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {item.rainRisk}
                </span>
              </div>

              <div className="p-1.5 rounded-xl bg-white/80 border border-slate-200/60">
                <div className="text-slate-400 font-semibold mb-0.5">Waterlog</div>
                <span className={`font-extrabold ${item.waterloggingRisk === 'HIGH' ? 'text-rose-600' : 'text-amber-600'}`}>
                  {item.waterloggingRisk}
                </span>
              </div>

              <div className="p-1.5 rounded-xl bg-white/80 border border-slate-200/60">
                <div className="text-slate-400 font-semibold mb-0.5">Lightning</div>
                <span className={`font-extrabold ${item.lightning === 'HIGH' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {item.lightning}
                </span>
              </div>

              <div className="p-1.5 rounded-xl bg-white/80 border border-slate-200/60">
                <div className="text-slate-400 font-semibold mb-0.5">Wind</div>
                <span className={`font-extrabold ${item.wind === 'HIGH' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {item.wind}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
