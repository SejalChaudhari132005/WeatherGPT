import React from 'react';
import { Play, Pause, RotateCcw, CloudRain, Cloud, Wind, Zap, Thermometer } from 'lucide-react';
import { RADAR_LAYERS, TIMELINE_SLOTS, RadarLayer } from '../../services/radarService';

interface RadarControlsProps {
  activeLayer: string;
  setActiveLayer: (layerId: 'rain' | 'cloud' | 'wind' | 'lightning' | 'temperature') => void;
  activeTimelineIndex: number;
  setActiveTimelineIndex: (idx: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const RadarControls: React.FC<RadarControlsProps> = ({
  activeLayer,
  setActiveLayer,
  activeTimelineIndex,
  setActiveTimelineIndex,
  isPlaying,
  setIsPlaying
}) => {
  const layerIcons = {
    rain: CloudRain,
    cloud: Cloud,
    wind: Wind,
    lightning: Zap,
    temperature: Thermometer
  };

  return (
    <div className="space-y-4">
      {/* Layer selector pills */}
      <div className="flex flex-wrap items-center gap-2">
        {RADAR_LAYERS.map((layer) => {
          const Icon = layerIcons[layer.id];
          const isActive = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-[1.02]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{layer.label}</span>
            </button>
          );
        })}
      </div>

      {/* Timeline Scrubber */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <span className="text-xs font-bold text-slate-800">
              Scrubber Timeline: <span className="text-sky-600">{TIMELINE_SLOTS[activeTimelineIndex]}</span>
            </span>
          </div>

          <button
            onClick={() => setActiveTimelineIndex(4)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 text-xs font-semibold"
            title="Reset to Now"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step buttons */}
        <div className="grid grid-cols-7 gap-1">
          {TIMELINE_SLOTS.map((slot, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTimelineIndex(idx)}
              className={`py-1.5 rounded-xl text-[10px] font-extrabold transition-all ${
                activeTimelineIndex === idx
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {slot.replace(' (Now)', '')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
