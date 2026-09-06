import React from 'react';
import { CloudRain, Sun, Cloud, CloudLightning, Clock, AlertTriangle } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { WeatherCondition } from '../../types/weather';

export const HourlyForecastCard: React.FC = () => {
  const { hourlyForecast } = useWeather();

  const getConditionIcon = (cond: WeatherCondition) => {
    switch (cond) {
      case 'Sunny':
      case 'Clear':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'Thunderstorm':
        return <CloudLightning className="w-6 h-6 text-purple-600 animate-pulse" />;
      case 'Heavy Rain':
      case 'Light Rain':
        return <CloudRain className="w-6 h-6 text-sky-500" />;
      default:
        return <Cloud className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-bold text-slate-900">Today's Hourly Forecast</h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">High Risk Period Highlighted</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {hourlyForecast.map((hour, idx) => (
          <div
            key={idx}
            className={`min-w-28 p-4 rounded-2xl border flex flex-col items-center justify-between text-center transition-all ${
              hour.isHighRisk
                ? 'bg-gradient-to-b from-rose-50 to-amber-50 border-rose-300 shadow-md shadow-rose-500/10'
                : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80'
            }`}
          >
            <span className="text-xs font-bold text-slate-500 mb-1">{hour.time}</span>

            <div className="my-2">{getConditionIcon(hour.condition)}</div>

            <span className="text-lg font-black text-slate-900">{hour.temperature}°</span>

            <div className="flex items-center gap-1 text-[11px] font-bold text-sky-600 mt-2">
              <CloudRain className="w-3 h-3" />
              <span>{hour.rainProbability}%</span>
            </div>

            {hour.isHighRisk && (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-extrabold uppercase tracking-wider">
                <AlertTriangle className="w-2.5 h-2.5" />
                <span>Heavy Rain</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
