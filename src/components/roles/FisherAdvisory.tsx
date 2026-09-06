import React from 'react';
import { Fish, Waves, Wind, Eye, ShieldAlert, Compass } from 'lucide-react';
import { MOCK_FISHER_ADVISORY } from '../../data/mockAdvisories';
import { useWeather } from '../../context/WeatherContext';
import { DemoBadge } from '../common/DemoBadge';

export const FisherAdvisory: React.FC = () => {
  const { userLocation } = useWeather();
  const locationName = userLocation?.state || 'Maharashtra';

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl border border-blue-200">
            <Fish className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">🎣 Marine & Fishing Advisory</h3>
            <p className="text-xs text-slate-500">Coastal Zone: Off {locationName} Shoreline</p>
          </div>
        </div>

        <DemoBadge label="DEMO DATA" variant="amber" />
      </div>

      {/* Sailing Risk Highlight */}
      <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-rose-600 animate-pulse" />
          <div>
            <div className="text-xs font-black text-rose-800 uppercase tracking-wider">
              Sailing Risk Assessment: <span className="underline">{MOCK_FISHER_ADVISORY.sailingRisk}</span>
            </div>
            <p className="text-sm font-bold text-rose-950 mt-0.5">
              {MOCK_FISHER_ADVISORY.safeWindow}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-extrabold uppercase">
          NO BOAT DEPARTURE
        </span>
      </div>

      {/* Grid of Marine Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
            <Waves className="w-4 h-4 text-blue-600" />
            <span>Wave Height</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">{MOCK_FISHER_ADVISORY.waveHeight}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
            <Wind className="w-4 h-4 text-blue-600" />
            <span>Offshore Wind</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">{MOCK_FISHER_ADVISORY.windSpeed}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
            <Eye className="w-4 h-4 text-blue-600" />
            <span>Sea Visibility</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">{MOCK_FISHER_ADVISORY.visibility}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>High Tide Schedule</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">{MOCK_FISHER_ADVISORY.highTideTime}</p>
        </div>
      </div>
    </div>
  );
};
