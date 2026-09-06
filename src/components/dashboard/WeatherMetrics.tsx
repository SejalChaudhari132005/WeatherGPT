import React from 'react';
import { Thermometer, Wind, Droplets, Eye, Gauge, Sun, CloudRain } from 'lucide-react';
import { ComprehensiveWeatherData } from '../../data/mockWeather';

interface Props {
  weather: ComprehensiveWeatherData;
}

export const WeatherMetrics: React.FC<Props> = ({ weather }) => {
  const metrics = [
    { label: 'Temperature', value: `${weather.temperature}°C`, icon: Thermometer, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Feels Like', value: `${weather.feelsLike}°C`, icon: Thermometer, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Rain Prob', value: `${weather.rainProbability}%`, icon: CloudRain, color: 'text-[#38b6ff]', bg: 'bg-sky-50' },
    { label: 'Wind Speed', value: `${weather.windSpeed} km/h ${weather.windDirection}`, icon: Wind, color: 'text-[#004aad]', bg: 'bg-blue-50' },
    { label: 'Humidity', value: `${weather.humidity}%`, icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Visibility', value: `${weather.visibility} km`, icon: Eye, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Pressure', value: `${weather.pressure} hPa`, icon: Gauge, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'UV Index', value: `${weather.uvIndex} (Mod)`, icon: Sun, color: 'text-[#fcd444]', bg: 'bg-amber-50' },
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
