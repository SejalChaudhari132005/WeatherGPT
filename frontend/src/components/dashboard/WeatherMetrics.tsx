import React from 'react';
import { Thermometer, Wind, Droplets, Eye, Gauge, Sun, CloudRain } from 'lucide-react';
import { WeatherCurrent } from '../../types/weather';

interface Props {
  current?: WeatherCurrent | null;
  // Legacy prop fallback
  weather?: any;
}

export const WeatherMetrics: React.FC<Props> = ({ current, weather }) => {
  const temp = current?.temperature ?? weather?.temperature ?? null;
  const feelsLike = current?.feels_like ?? weather?.feelsLike ?? null;
  const rainProb = current?.rain_probability ?? weather?.rainProbability ?? null;
  const windSpeed = current?.wind_speed ?? weather?.windSpeed ?? null;
  const windDir = current?.wind_direction ?? weather?.windDirection ?? '';
  const humidity = current?.humidity ?? weather?.humidity ?? null;
  const visibility = current?.visibility ?? weather?.visibility ?? null;
  const pressure = current?.pressure ?? weather?.pressure ?? null;
  const uv = current?.uv_index ?? weather?.uvIndex ?? null;

  const metrics = [
    { label: 'Temperature', value: temp !== null ? `${temp}°C` : '--°C', icon: Thermometer, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Feels Like', value: feelsLike !== null ? `${feelsLike}°C` : '--°C', icon: Thermometer, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Rain Prob', value: rainProb !== null ? `${rainProb}%` : '--%', icon: CloudRain, color: 'text-[#38b6ff]', bg: 'bg-sky-50' },
    { label: 'Wind Speed', value: windSpeed !== null ? `${windSpeed} km/h ${windDir}` : '-- km/h', icon: Wind, color: 'text-[#004aad]', bg: 'bg-blue-50' },
    { label: 'Humidity', value: humidity !== null ? `${humidity}%` : '--%', icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Visibility', value: visibility !== null ? `${visibility} km` : '-- km', icon: Eye, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Pressure', value: pressure !== null ? `${pressure} hPa` : '-- hPa', icon: Gauge, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'UV Index', value: uv !== null ? `${uv}` : '--', icon: Sun, color: 'text-[#fcd444]', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-2 font-['Arimo']">
      <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider px-1">
        Current Environmental Conditions
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex items-center gap-2 sm:gap-3 min-w-0"
            >
              <div className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl ${m.bg} ${m.color} shrink-0`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block truncate">
                  {m.label}
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 block mt-0.5 truncate">
                  {m.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
