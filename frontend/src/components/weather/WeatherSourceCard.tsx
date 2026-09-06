import React from 'react';
import { MapPin, Database, ShieldCheck, Clock } from 'lucide-react';
import { WeatherDataPayload } from '../../types/chat';

interface Props {
  data: WeatherDataPayload;
}

export const WeatherSourceCard: React.FC<Props> = ({ data }) => {
  const locationName = data.locationName || 'Saved Location';
  const confidence = data.confidenceScore || 84;
  const sourcesList = data.sources && data.sources.length > 0 ? data.sources.join(', ') : 'Demo Weather Source';

  return (
    <div className="pt-2 mt-3 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1.5 font-['Arimo']">
      <div className="flex items-center justify-between font-bold text-slate-700">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>{locationName}</span>
        </div>

        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
          <ShieldCheck className="w-3 h-3" />
          <span>Confidence: {confidence}%</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 font-medium">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Updated: Demo Data</span>
        </div>

        <div className="flex items-center gap-1">
          <Database className="w-3 h-3 text-sky-500" />
          <span>Sources: {sourcesList}</span>
        </div>
      </div>
    </div>
  );
};
