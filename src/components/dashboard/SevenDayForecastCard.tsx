import React from 'react';
import { Calendar, CloudRain, Sun, Cloud, CloudLightning } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { WeatherCondition } from '../../types/weather';

export const SevenDayForecastCard: React.FC = () => {
  const { sevenDayForecast } = useWeather();

  const getConditionIcon = (cond: WeatherCondition) => {
    switch (cond) {
      case 'Sunny':
      case 'Clear':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Thunderstorm':
        return <CloudLightning className="w-5 h-5 text-purple-600" />;
      case 'Heavy Rain':
      case 'Light Rain':
        return <CloudRain className="w-5 h-5 text-sky-500" />;
      default:
        return <Cloud className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-bold text-slate-900">7-Day Forecast</h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">Ensemble Model</span>
      </div>

      <div className="space-y-3">
        {sevenDayForecast.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-all"
          >
            {/* Day name & date */}
            <div className="w-24">
              <p className="text-sm font-bold text-slate-800">{item.day}</p>
              <p className="text-[11px] text-slate-400 font-medium">{item.date}</p>
            </div>

            {/* Condition Icon */}
            <div className="flex items-center gap-2 w-32">
              {getConditionIcon(item.condition)}
              <span className="text-xs font-semibold text-slate-700 truncate">{item.condition}</span>
            </div>

            {/* Rain Probability */}
            <div className="flex items-center gap-1 text-xs font-bold text-sky-600 w-16">
              <CloudRain className="w-3.5 h-3.5" />
              <span>{item.rainProbability}%</span>
            </div>

            {/* High/Low Temperature Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400 w-6 text-right">{item.low}°</span>
              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-amber-400 rounded-full"
                  style={{ width: `${Math.min(100, (item.high / 40) * 100)}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-slate-900 w-6">{item.high}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
