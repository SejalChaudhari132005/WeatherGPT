import React from 'react';
import { CloudRain, Wind, Droplets, Clock, Thermometer } from 'lucide-react';
import { WeatherDataPayload } from '../../types/chat';

interface Props {
  data: WeatherDataPayload;
}

export const WeatherInsightCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="my-2.5 p-3.5 rounded-2xl bg-gradient-to-br from-white to-sky-50/70 border border-sky-100 shadow-2xs space-y-2.5 font-['Arimo']">
      <div className="flex items-center justify-between border-b border-sky-100/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-[#38b6ff]/15 text-[#004aad]">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900">{data.condition || 'Weather Insight'}</div>
            {data.timeWindow && (
              <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-sky-500" />
                <span>Peak Period: {data.timeWindow}</span>
              </div>
            )}
          </div>
        </div>

        {data.tempC !== undefined && (
          <div className="text-right">
            <div className="text-xl font-black text-slate-900">{data.tempC}°C</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
        {data.rainProbability !== undefined && (
          <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Rain Prob</div>
            <div className="text-xs font-extrabold text-[#004aad]">{data.rainProbability}%</div>
          </div>
        )}

        {data.windSpeedKmH !== undefined && (
          <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Wind</div>
            <div className="text-xs font-extrabold text-slate-800">{data.windSpeedKmH} km/h</div>
          </div>
        )}

        {data.humidityPct !== undefined && (
          <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Humidity</div>
            <div className="text-xs font-extrabold text-slate-800">{data.humidityPct}%</div>
          </div>
        )}
      </div>
    </div>
  );
};
