import React, { useState } from 'react';
import { Map, Navigation, ArrowRight, AlertTriangle, CloudRain, Eye, Wind, CheckCircle2 } from 'lucide-react';
import { MOCK_TRAVEL_ROUTE } from '../../data/mockAdvisories';
import { useWeather } from '../../context/WeatherContext';
import { DemoBadge } from '../common/DemoBadge';

export const RouteWeatherCard: React.FC = () => {
  const { userLocation } = useWeather();

  const [origin, setOrigin] = useState(userLocation?.city || 'Current Location');
  const [destination, setDestination] = useState('Pune');
  const [isCalculated, setIsCalculated] = useState(true);

  const handleCheckRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculated(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl border border-sky-100">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">🛣️ Route Weather Intelligence</h3>
            <p className="text-xs text-slate-500">Check weather hazards & rain risk along your highway travel corridor</p>
          </div>
        </div>

        <DemoBadge label="ROUTE WEATHER" variant="blue" />
      </div>

      {/* Input Form */}
      <form onSubmit={handleCheckRoute} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">From</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            placeholder="Starting location..."
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">To</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            placeholder="Destination city..."
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-xs shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Check Route</span>
          </button>
        </div>
      </form>

      {/* Waypoints Timeline Flow */}
      {isCalculated && (
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Waypoints Timeline ({origin} → {destination})
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {MOCK_TRAVEL_ROUTE.map((point, idx) => (
              <div key={idx} className="relative flex items-start justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                {/* Dot */}
                <div className={`absolute -left-[27px] top-5 w-4 h-4 rounded-full border-2 border-white shadow-xs ${
                  point.hasWarning ? 'bg-rose-600 animate-pulse' : 'bg-sky-600'
                }`}></div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900">{point.name}</span>
                    {point.hasWarning && (
                      <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Warning
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{point.condition} • {point.temp}°C</p>

                  {point.warningText && (
                    <div className="mt-2 p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 font-semibold">
                      ⚠️ {point.warningText}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1">
                    <CloudRain className="w-4 h-4 text-sky-600" />
                    <span>Risk: {point.rainRisk}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-slate-400" />
                    <span>Vis: {point.visibility}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
