import React, { useState } from 'react';
import { Sprout, CloudRain, Droplet, ShieldAlert, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_FARMER_ADVISORY } from '../../data/mockAdvisories';
import { useWeather } from '../../context/WeatherContext';
import { useVoice } from '../../hooks/useVoice';
import { DemoBadge } from '../common/DemoBadge';

export const FarmerAdvisory: React.FC = () => {
  const { userLocation } = useWeather();
  const { speakText, isSpeaking } = useVoice();
  const [showMarathiText, setShowMarathiText] = useState(false);

  const locationName = userLocation?.city || 'Mumbai Sector';

  const handleExplainMarathi = () => {
    setShowMarathiText(true);
    speakText(MOCK_FARMER_ADVISORY.marathiSummary, 'mr-IN');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">🌾 Crop Weather Advisory</h3>
            <p className="text-xs text-slate-500">Location: {locationName} • Crop: {MOCK_FARMER_ADVISORY.crop}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DemoBadge label="AGRI INTELLIGENCE" variant="purple" />
          <button
            onClick={handleExplainMarathi}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span>🎙 Explain in Marathi</span>
          </button>
        </div>
      </div>

      {/* Marathi Translation Box */}
      {showMarathiText && (
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Marathi Voice Summary (मराठी सारांश):
          </div>
          <p className="text-sm font-semibold leading-relaxed">{MOCK_FARMER_ADVISORY.marathiSummary}</p>
        </div>
      )}

      {/* Grid of Farmer Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rain Outlook */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <CloudRain className="w-4 h-4 text-sky-600" />
            <span>Precipitation Outlook</span>
          </div>
          <p className="text-sm font-bold text-slate-800">{MOCK_FARMER_ADVISORY.rainOutlook}</p>
        </div>

        {/* Irrigation Recommendation */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Droplet className="w-4 h-4 text-blue-600" />
            <span>Irrigation Recommendation</span>
          </div>
          <p className="text-sm font-bold text-slate-800">{MOCK_FARMER_ADVISORY.irrigationRecommendation}</p>
        </div>

        {/* Chemical Spraying Window */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span>Spraying Window</span>
          </div>
          <p className="text-sm font-bold text-slate-800">{MOCK_FARMER_ADVISORY.sprayingWindow}</p>
        </div>

        {/* Disease Risk */}
        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Crop Disease Risk</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-black uppercase">
              {MOCK_FARMER_ADVISORY.diseaseRiskLevel}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-800">{MOCK_FARMER_ADVISORY.diseaseRisk}</p>
        </div>
      </div>
    </div>
  );
};
