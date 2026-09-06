import React, { useState } from 'react';
import { Sun, CloudRain, Cloud, Thermometer, Wind, Umbrella } from 'lucide-react';

export const HourlyForecastCard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'temp' | 'wind' | 'rain'>('temp');

  const timeNodes = [
    { period: 'Morning', time: '8:00 AM', temp: 20, icon: <Sun className="w-5 h-5 text-amber-500" /> },
    { period: 'Afternoon', time: '1:00 PM', temp: 24, icon: <Sun className="w-5 h-5 text-amber-500" /> },
    { period: 'Evening', time: '6:00 PM', temp: 28, icon: <CloudRain className="w-5 h-5 text-sky-500" /> },
    { period: 'Night', time: '10:00 PM', temp: 22, icon: <Cloud className="w-5 h-5 text-slate-400" /> },
    { period: 'Late Night', time: '2:00 AM', temp: 19, icon: <Cloud className="w-5 h-5 text-slate-400" /> },
  ];

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 shadow-sm border border-slate-200/60 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Today's Temperature</h3>
          <p className="text-[11px] text-slate-400 font-medium sm:hidden">Swipe to explore timeline</p>
        </div>

        {/* Filter Pill Icons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => setActiveFilter('temp')}
            className={`p-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'temp' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Temperature"
          >
            <Thermometer className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveFilter('wind')}
            className={`p-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'wind' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Wind"
          >
            <Wind className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveFilter('rain')}
            className={`p-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'rain' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Precipitation"
          >
            <Umbrella className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Swipeable Mobile Carousel / Desktop Grid */}
      <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto snap-x snap-mandatory pt-2 pb-1 no-scrollbar">
        {timeNodes.map((node, idx) => (
          <div
            key={idx}
            className="min-w-[90px] sm:min-w-0 snap-center p-3 sm:p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-between text-center space-y-2 shrink-0 sm:shrink"
          >
            <div className="p-2.5 rounded-full bg-white shadow-2xs">
              {node.icon}
            </div>

            <div>
              <div className="text-base sm:text-xl font-black text-slate-900">{node.temp}°</div>
              <div className="text-[11px] font-bold text-slate-600 mt-0.5">{node.period}</div>
              <div className="text-[10px] text-slate-400 font-medium">{node.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
