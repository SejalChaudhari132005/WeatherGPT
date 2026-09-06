import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Flame, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import { MOCK_CLIMATE_TRENDS, MOCK_CLIMATE_METRICS } from '../../data/mockClimate';
import { useWeather } from '../../context/WeatherContext';
import { DemoBadge } from '../common/DemoBadge';

export const ClimateAnalytics: React.FC = () => {
  const { userLocation } = useWeather();
  const locationName = userLocation?.city || 'Mumbai';

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-200">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Climate Intelligence & Anomaly Analytics</h3>
            <p className="text-xs text-slate-500">Historical decadal trends (1980 → 2025) for {locationName}</p>
          </div>
        </div>

        <DemoBadge label="CLIMATE ENGINE" variant="purple" />
      </div>

      <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80">
        <h4 className="text-sm font-bold text-sky-950 mb-1">
          "How has extreme rainfall changed here?"
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {MOCK_CLIMATE_METRICS.analysisText}
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
          <div className="flex items-center justify-between text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">
            <span>Extreme Rainfall Days</span>
            <TrendingUp className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-3xl font-black text-rose-600">{MOCK_CLIMATE_METRICS.extremeRainfallChange}</p>
          <p className="text-[11px] text-rose-700 font-semibold mt-1">Shift in &gt;100mm heavy rain occurrences</p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
          <div className="flex items-center justify-between text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
            <span>Monsoon Rainfall</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-3xl font-black text-sky-600">{MOCK_CLIMATE_METRICS.monsoonRainfallChange}</p>
          <p className="text-[11px] text-sky-700 font-semibold mt-1">Total season precipitation volume</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex items-center justify-between text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            <span>Heatwave Days</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-amber-600">{MOCK_CLIMATE_METRICS.heatwaveDaysChange}</p>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">Days exceeding 38°C threshold</p>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Decadal Trend Comparison (1980 – 2025)
          </span>
          <span className="text-xs text-slate-400 font-semibold">10-Year Epoch Increments</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_CLIMATE_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
              <YAxis yAxisId="left" stroke="#0284c7" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#e11d48" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="monsoonRainfallMm" name="Monsoon mm" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="extremeRainfallDays" name="Extreme Rain Days" stroke="#e11d48" strokeWidth={3} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="heatwaveDays" name="Heatwave Days" stroke="#d97706" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
