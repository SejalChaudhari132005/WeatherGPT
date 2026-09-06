import React, { useState } from 'react';
import { Sliders, AlertTriangle, CloudRain, Clock, Wind, Waves, Car, ShieldAlert } from 'lucide-react';
import { DemoBadge } from '../common/DemoBadge';

export const WhatIfSimulator: React.FC = () => {
  const [rainIntensity, setRainIntensity] = useState<number>(45); // mm/hr
  const [durationHours, setDurationHours] = useState<number>(4); // hours
  const [windSpeed, setWindSpeed] = useState<number>(35); // km/h

  // Calculate simulated risk outputs dynamically
  const totalRainMm = rainIntensity * durationHours;

  let floodRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME' = 'LOW';
  let floodColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';

  if (totalRainMm > 200) {
    floodRiskLevel = 'EXTREME';
    floodColor = 'text-purple-700 bg-purple-50 border-purple-300';
  } else if (totalRainMm > 120) {
    floodRiskLevel = 'HIGH';
    floodColor = 'text-rose-600 bg-rose-50 border-rose-300';
  } else if (totalRainMm > 60) {
    floodRiskLevel = 'MEDIUM';
    floodColor = 'text-amber-600 bg-amber-50 border-amber-300';
  }

  const waterloggingDelayMin = Math.round(totalRainMm * 0.8);
  const trafficDelayMin = Math.round(totalRainMm * 1.2 + windSpeed * 0.5);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">⚡ "What-If" Extreme Event Simulator</h3>
            <p className="text-xs text-slate-500">Simulate localized flood, waterlogging & traffic impact scenarios</p>
          </div>
        </div>

        <DemoBadge label="SIMULATION • NOT OFFICIAL" variant="amber" />
      </div>

      {/* Interactive Controls Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
        {/* Rain Intensity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-sky-600" /> Rain Intensity
            </span>
            <span className="text-sky-600 font-extrabold">{rainIntensity} mm/hr</span>
          </div>
          <input
            type="range"
            min="10"
            max="120"
            value={rainIntensity}
            onChange={(e) => setRainIntensity(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>10 (Drizzle)</span>
            <span>60 (Heavy)</span>
            <span>120 (Torrential)</span>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" /> Duration
            </span>
            <span className="text-indigo-600 font-extrabold">{durationHours} Hours</span>
          </div>
          <input
            type="range"
            min="1"
            max="12"
            value={durationHours}
            onChange={(e) => setDurationHours(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>1 Hr</span>
            <span>6 Hrs</span>
            <span>12 Hrs</span>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-amber-600" /> Wind Speed
            </span>
            <span className="text-amber-600 font-extrabold">{windSpeed} km/h</span>
          </div>
          <input
            type="range"
            min="5"
            max="90"
            value={windSpeed}
            onChange={(e) => setWindSpeed(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>5 (Calm)</span>
            <span>45 (Gale)</span>
            <span>90 (Storm)</span>
          </div>
        </div>
      </div>

      {/* Simulated Output Cards */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Simulated Scenario Impact Analysis (Accumulated Rain: {totalRainMm} mm)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-5 rounded-2xl border ${floodColor} space-y-1`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">Simulated Flood Risk</span>
              <Waves className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black">{floodRiskLevel}</p>
            <p className="text-[11px] font-medium opacity-80">
              Drainage capacity threshold exceeded by {Math.max(0, totalRainMm - 50)}mm
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Waterlogging Inundation</span>
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">~{waterloggingDelayMin} cm depth</p>
            <p className="text-[11px] text-slate-500 font-medium">Subway underpasses vulnerable</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Traffic Delay</span>
              <Car className="w-5 h-5 text-rose-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">+{trafficDelayMin} mins</p>
            <p className="text-[11px] text-slate-500 font-medium">Gridlock expected on major expressways</p>
          </div>
        </div>
      </div>

      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs font-bold text-center">
        ⚠️ SIMULATION MODE ONLY — THIS IS NOT AN OFFICIAL GOVERNMENT WARNING BROADCAST
      </div>
    </div>
  );
};
