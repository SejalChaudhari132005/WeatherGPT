import React, { useState } from 'react';
import { ArrowLeft, Map, Layers, CloudRain, Wind, Sun, Thermometer, MapPin } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { DemoBadge } from '../components/common/DemoBadge';

interface Props {
  onBack: () => void;
}

export const MapPage: React.FC<Props> = ({ onBack }) => {
  const { userLocation } = useWeather();
  const [activeLayer, setActiveLayer] = useState<'rain' | 'wind' | 'cloud' | 'temp'>('rain');

  const locationDisplay = userLocation
    ? `${userLocation.city}, ${userLocation.state || userLocation.country}`
    : 'Nashik, Maharashtra';

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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Weather Radar Map</h2>
            <p className="text-xs text-slate-500 font-medium">Interactive weather layer overlay</p>
          </div>
        </div>

        <DemoBadge label="MOCK RADAR" variant="sky" />
      </div>

      {/* Layer Controls */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveLayer('rain')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeLayer === 'rain'
              ? 'bg-[#004aad] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <CloudRain className="w-3.5 h-3.5" />
          <span>Rain Radar</span>
        </button>

        <button
          onClick={() => setActiveLayer('wind')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeLayer === 'wind'
              ? 'bg-[#004aad] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Wind className="w-3.5 h-3.5" />
          <span>Wind Vector</span>
        </button>

        <button
          onClick={() => setActiveLayer('cloud')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeLayer === 'cloud'
              ? 'bg-[#004aad] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Cloud Cover</span>
        </button>

        <button
          onClick={() => setActiveLayer('temp')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeLayer === 'temp'
              ? 'bg-[#004aad] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Thermometer className="w-3.5 h-3.5" />
          <span>Temperature</span>
        </button>
      </div>

      {/* Map Container Mock */}
      <div className="relative rounded-3xl overflow-hidden h-[420px] bg-slate-900 border border-slate-200 shadow-xl flex items-center justify-center text-white text-center p-6">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-sky-950 to-blue-900 opacity-90"></div>

        {/* Location Marker Pulsing */}
        <div className="relative z-10 space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#38b6ff]/30 flex items-center justify-center mx-auto animate-ping absolute left-1/2 -ml-7 -mt-2"></div>
          <div className="w-14 h-14 rounded-full bg-[#004aad] text-white flex items-center justify-center mx-auto shadow-2xl relative z-10 border-2 border-white">
            <MapPin className="w-7 h-7 text-[#fcd444]" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
              <span>📍 {locationDisplay}</span>
            </div>
            <p className="text-xs text-sky-200 font-bold mt-2">Active Layer: {activeLayer.toUpperCase()} OVERLAY</p>
          </div>
        </div>
      </div>
    </div>
  );
};
