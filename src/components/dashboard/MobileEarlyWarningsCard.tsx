import React from 'react';
import { AlertTriangle, MapPin, Zap, Wind, ChevronRight, Activity } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useUI } from '../../context/UIContext';
import { DemoBadge } from '../common/DemoBadge';

export const MobileEarlyWarningsCard: React.FC = () => {
  const { userLocation } = useWeather();
  const { setActiveTab } = useUI();

  const locationName = userLocation?.city || 'Karangploso, Malang';

  const warnings = [
    {
      title: 'Heavy Thunderstorm',
      location: 'Blitar, Jawa Timur',
      icon: Zap,
      color: 'bg-blue-600 text-white',
      badgeColor: 'bg-amber-400 text-slate-900',
      description: "There's a potential for moderate to heavy rain which may be followed by lightning & strong winds.",
      pills: ['Wonodadi', 'Udanawu', 'Ponggok']
    },
    {
      title: 'Strong Winds & Squalls',
      location: 'Coastal Corridor',
      icon: Wind,
      color: 'bg-slate-800 text-white',
      badgeColor: 'bg-sky-400 text-slate-900',
      description: "Potential for light to severe wind gusts accompanying localized convective cells.",
      pills: ['Pemogan', 'Dauh Puri', 'Corridor 4']
    }
  ];

  return (
    <div className="space-y-4 p-4">
      {/* Compact Header Summary Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#38b6ff] to-[#004aad] text-white flex items-center justify-between shadow-md">
        <div>
          <div className="text-3xl font-black">25°C</div>
          <div className="text-xs font-bold text-sky-100">Partly Cloudy</div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30">
          <MapPin className="w-3.5 h-3.5" />
          <span>{locationName}</span>
        </div>
      </div>

      {/* Hazard / Earthquake Card (Screen 2 Mock) */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" /> Recent Hazard Bulletin
          </span>
          <DemoBadge label="SEISMIC" variant="amber" />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <span>Magnitude 4.0 SR</span>
            </h4>
            <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-rose-500" /> Northeast of Tarakan Sector
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">2,433.1 km away from your position</p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xl shrink-0 shadow-inner">
            🌐
          </div>
        </div>
      </div>

      {/* Early Warning Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Early Warning</h3>
            <p className="text-[10px] text-slate-400 font-medium">For today, 9:30 - 10:00 WIB</p>
          </div>

          <button
            onClick={() => setActiveTab('alerts')}
            className="text-xs font-bold text-sky-600 flex items-center gap-1 cursor-pointer"
          >
            <span>See more</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Warning Cards */}
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory py-1 no-scrollbar">
          {warnings.map((warn, i) => {
            const Icon = warn.icon;
            return (
              <div
                key={i}
                className={`min-w-[260px] snap-center p-4 rounded-3xl ${warn.color} shadow-lg flex flex-col justify-between space-y-3 shrink-0`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${warn.badgeColor}`}>
                    Alert
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-white">{warn.title}</h4>
                  <p className="text-xs text-sky-100 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-sky-200" /> {warn.location}
                  </p>
                  <p className="text-[11px] text-white/80 font-medium line-clamp-2 mt-2 leading-snug">
                    {warn.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {warn.pills.map((pill, pIdx) => (
                    <span key={pIdx} className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-bold text-white">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
