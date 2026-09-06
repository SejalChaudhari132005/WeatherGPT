import React from 'react';
import { Sun, CloudRain, Sparkles, Building2 } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

export const DarkHumidityCard: React.FC = () => {
  const { currentWeather } = useWeather();

  const cities = [
    { name: 'New York', condition: 'Sunny', high: 22, low: 19, icon: '☀️' },
    { name: 'London', condition: 'Bright', high: 24, low: 26, icon: '🌤️' },
  ];

  return (
    <div className="space-y-3">
      {/* Saved City Quick Cards */}
      <div className="space-y-2">
        {cities.map((city, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl p-2 rounded-xl bg-slate-100/80">{city.icon}</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{city.name}</h4>
                <p className="text-[11px] text-slate-400 font-medium">{city.condition}</p>
              </div>
            </div>
            <div className="text-xs font-bold text-slate-700">
              <span className="text-amber-600">{city.high}°C</span> / <span className="text-slate-400">{city.low}°C</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dark Navy Air Quality & Humidity Card */}
      <div className="relative overflow-hidden rounded-[24px] bg-slate-900 text-white p-5 shadow-lg border border-slate-800 flex items-center justify-between">
        <div className="space-y-2 z-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Humidity & AQI</p>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Good Air Quality
            </h4>
            <p className="text-2xl font-black text-white">{currentWeather.humidity}% Humidity</p>
          </div>
        </div>

        {/* Night / Sun Graphic */}
        <div className="relative z-10 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <Sun className="w-10 h-10 text-amber-400 animate-spin-slow" />
        </div>
      </div>
    </div>
  );
};
