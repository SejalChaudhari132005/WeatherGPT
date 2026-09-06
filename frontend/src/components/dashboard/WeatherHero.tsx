import React from 'react';
import { MapPin, Sun, CloudRain, Sparkles, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { getRoleTheme } from '../../config/roleThemes';
import { getHeroBackgroundImage } from '../../services/locationImageService';
import { ComprehensiveWeatherData } from '../../data/mockWeather';
import { DemoBadge } from '../common/DemoBadge';

interface Props {
  weather: ComprehensiveWeatherData;
  role: string;
  locationName: string;
  onAskGpt: (promptText: string) => void;
}

export const WeatherHero: React.FC<Props> = ({
  weather,
  role,
  locationName,
  onAskGpt,
}) => {
  const theme = getRoleTheme(role);
  const city = locationName.split(',')[0] || weather.city;
  const bgImage = getHeroBackgroundImage(role, city);

  const decision = theme.defaultDecision;

  return (
    <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-2xl transition-all font-['Arimo'] border border-slate-200/80">
      {/* High-Resolution Location-Aware Background Image */}
      <img
        src={bgImage}
        alt={`${city} Weather Background`}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-700 hover:scale-100"
      />

      {/* Role-Specific Weather-Responsive Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${theme.overlayGradient}`} />

      {/* Content Container */}
      <div className="relative z-10 p-3.5 sm:p-7 md:p-8 text-white space-y-3.5 sm:space-y-6 flex flex-col justify-between min-h-[370px] sm:min-h-[420px]">
        {/* Top Badges & Location Header */}
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-black text-white border border-white/30 shrink min-w-0 max-w-[55%] sm:max-w-none">
              <MapPin className="w-3 h-3 text-[#fcd444] shrink-0" />
              <span className="truncate">📍 {locationName}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5 shrink-0"></span>
              <span className="text-[9px] opacity-80 shrink-0">Live</span>
            </div>

            {/* Badges Container */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Mode Badge */}
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[9px] sm:text-[10px] font-extrabold text-white border border-white/20 shrink-0 shadow-xs">
                <span>{theme.modeIcon}</span>
                <span>{theme.modeBadgeLabel}</span>
              </div>

              {/* Role Badge */}
              <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase border shrink-0 shadow-xs ${theme.badgeStyle}`}>
                <span>{theme.badgeLabel}</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-white/85 font-bold truncate max-w-full">{theme.tagline}</p>
        </div>

        {/* Center Temperature & Weather Condition */}
        <div className="my-1 sm:my-2 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl sm:text-7xl font-black tracking-tight">{weather.temperature}°</span>
              <span className="text-xl sm:text-2xl font-bold text-sky-200">C</span>
            </div>

            <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5 flex items-center gap-2">
              <span>{weather.condition}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/80 font-bold mt-1">
              <span>Feels like {weather.feelsLike}°</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-sky-300" />
                Updated {weather.updatedTime}
              </span>
            </div>
          </div>

          {/* Primary Weather Graphic Icon */}
          <div className="relative p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 shadow-xl shrink-0">
            <CloudRain className="w-10 h-10 sm:w-18 sm:h-18 text-[#38b6ff]" />
          </div>
        </div>

        {/* --- ROLE-AWARE WEATHER DECISION CARD --- */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md text-slate-900 border border-white/50 shadow-xl space-y-1.5">
          <div className="flex items-start justify-between gap-1.5">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <span className="text-lg sm:text-xl shrink-0">{decision.icon}</span>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#004aad] tracking-wider block truncate">
                  WeatherGPT Recommendation
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight truncate">{decision.action}</h3>
              </div>
            </div>

            <div className="shrink-0 pt-0.5">
              <DemoBadge label="DEMO DATA" variant="sky" />
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-slate-600 font-medium leading-snug">
            {decision.reason}
          </p>

          <button
            onClick={() => onAskGpt(`Why is "${decision.action}" recommended for ${city}?`)}
            className="w-full py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#38b6ff] to-[#004aad] hover:opacity-95 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer mt-1 active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#fcd444] shrink-0" />
            <span className="text-[10px] sm:text-xs text-center leading-tight truncate">Ask WeatherGPT AI about this decision</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
