import React from 'react';
import { X, ShieldCheck, Database, Layers, RefreshCw, Cpu, HelpCircle } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { DemoBadge } from './DemoBadge';

export const ExplainableAIModal: React.FC = () => {
  const { activeExplainableMsg, setActiveExplainableMsg } = useWeather();

  if (!activeExplainableMsg || !activeExplainableMsg.explainable) return null;

  const { sources, confidenceScore, resolution, updatedAt, rationale } = activeExplainableMsg.explainable;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 relative">
        <button
          onClick={() => setActiveExplainableMsg(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-sky-50 rounded-2xl text-sky-600 border border-sky-100">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">Explainable AI Transparency</h3>
              <DemoBadge label="DEMO METRICS" variant="blue" />
            </div>
            <p className="text-xs text-slate-500">Why WeatherGPT generated this decision output</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Decision Rationale & Physical Model Consensus
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">{rationale}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Database className="w-3.5 h-3.5 text-sky-600" />
                <span>Primary Data Sources</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {sources.map((s, i) => (
                  <span key={i} className="text-xs bg-white text-slate-700 px-2 py-0.5 rounded-md font-semibold border border-slate-200 shadow-2xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Model Confidence</span>
              </div>
              <p className="text-xl font-black text-slate-900">
                {confidenceScore}% <span className="text-xs font-medium text-emerald-600">(High)</span>
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Spatial Grid Resolution</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{resolution}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                <span>Model Sync Time</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{updatedAt}</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-sky-50/60 rounded-2xl border border-sky-100/80 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-xs text-sky-800 leading-snug">
            WeatherGPT synthesizes Doppler radar, ECMWF/GFS weather numerical outputs, and hyperlocal topography data to eliminate hallucinated weather predictions.
          </p>
        </div>
      </div>
    </div>
  );
};
