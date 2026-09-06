import React from 'react';
import { ArrowLeft, TrendingUp, Calendar, BarChart2 } from 'lucide-react';
import { DemoBadge } from '../components/common/DemoBadge';

interface Props {
  onBack: () => void;
}

export const ClimatePage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F4F7FC] p-4 sm:p-6 font-['Arimo'] max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-white text-slate-700 border border-slate-200 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Climate Analytics</h2>
            <p className="text-xs text-slate-500 font-medium">Historical climate trends & multi-year anomalies</p>
          </div>
        </div>

        <DemoBadge label="CLIMATE DATA" variant="sky" />
      </div>

      <div className="space-y-4">
        {/* Rainfall Trend Card */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#38b6ff]" /> Regional Rainfall Trend (10-Year Anomaly)
            </span>
            <span className="text-[10px] font-bold text-slate-400">2016 - 2026</span>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Annual precipitation in your region shows a +14% increase compared to the 30-year climate normal, with intensified monsoon bursts.
          </p>

          <div className="h-28 rounded-2xl bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 border border-sky-200/60 flex items-end justify-between p-3">
            {[45, 60, 30, 85, 70, 95, 80].map((val, idx) => (
              <div key={idx} className="w-8 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-[#004aad]"
                  style={{ height: `${val}%` }}
                ></div>
                <span className="text-[9px] font-bold text-slate-500">M{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Temperature Trend Card */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-500" /> Temperature Anomaly & Heat Days
            </span>
            <span className="text-[10px] font-bold text-slate-400">Historical Comparison</span>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Summer peak temperatures have averaged +1.2°C above baseline averages over the past 5 seasons.
          </p>
        </div>
      </div>
    </div>
  );
};
