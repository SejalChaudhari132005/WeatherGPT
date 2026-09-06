import React from 'react';
import { Plane, ShieldAlert, Building, GraduationCap, AlertCircle, CheckCircle } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { DemoBadge } from '../common/DemoBadge';

export const AviationDisasterAdvisory: React.FC = () => {
  const { activeRole, userLocation } = useWeather();
  const locationName = userLocation?.city || 'Mumbai';

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-2xl border border-indigo-200">
            {activeRole === 'Aviation' && <Plane className="w-6 h-6" />}
            {activeRole === 'Disaster Manager' && <ShieldAlert className="w-6 h-6 text-rose-600" />}
            {activeRole === 'Urban Planner' && <Building className="w-6 h-6 text-purple-600" />}
            {activeRole === 'Researcher' && <GraduationCap className="w-6 h-6 text-amber-600" />}
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">{activeRole} Weather Brief</h3>
            <p className="text-xs text-slate-500">Domain specific telemetry for {locationName}</p>
          </div>
        </div>

        <DemoBadge label="DOMAIN METRICS" variant="blue" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            {activeRole === 'Aviation' ? 'Runway Crosswind' : 'Waterlogging Index'}
          </div>
          <p className="text-lg font-black text-slate-800">
            {activeRole === 'Aviation' ? '18 knots (WSW)' : 'High (74/100)'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            {activeRole === 'Aviation' ? 'Cloud Ceiling (RVR)' : 'Storm Surge Forecast'}
          </div>
          <p className="text-lg font-black text-slate-800">
            {activeRole === 'Aviation' ? '1,200 ft (Low Visibility)' : '+0.6m Coastal Clearance'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Operational Readiness
          </div>
          <p className="text-lg font-black text-amber-600">Cautionary (Level 2)</p>
        </div>
      </div>
    </div>
  );
};
