import React from 'react';
import { MapPin, Sun, CloudRain, Sparkles, ArrowRight, Clock, ShieldCheck, ChevronDown } from 'lucide-react';
import { getRoleTheme } from '../../config/roleThemes';
import { getHeroBackgroundImage } from '../../services/locationImageService';
import { ComprehensiveWeatherData } from '../../data/mockWeather';
import { DemoBadge } from '../common/DemoBadge';
import { useLocation } from '../../hooks/useLocation';

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
  const { location, openSelector } = useLocation();
  const theme = getRoleTheme(role);

  // Dynamic location display from LocationContext
  const displayCity = location?.city || locationName.split(',')[0] || weather.city;
  const displayState = location?.state || weather.state || 'Maharashtra';
  const fullLocationString = `${displayCity}, ${displayState}`;
  const isGps = (location?.source || location?.location_source) === 'gps';

  const bgImage = getHeroBackgroundImage(role, displayCity);
  const decision = theme.defaultDecision;

  return (
    <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-2xl transition-all font-['Arimo'] border border-slate-200/80">
      {/* High-Resolution Location-Aware Background Image */}
      <img
        src={bgImage}
        alt={`${displayCity} Weather Background`}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-700 hover:scale-100"
      />

      {/* Role-Specific Weather-Responsive Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${theme.overlayGradient}`} />

      {/* Content Container */}
      <div className="relative z-10 p-3.5 sm:p-7 md:p-8 text-white space-y-3.5 sm:space-y-6 flex flex-col justify-between min-h-[370px] sm:min-h-[420px]">
        {/* Top Badges & Location Header */}
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            {/* Interactive Location Selector Pill */}
            <button
              onClick={openSelector}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-[10px] sm:text-xs font-black text-white border border-white/30 transition-all cursor-pointer group shadow-sm"
              title="Click to set or change location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#fcd444] shrink-0" />
              <span className="truncate">📍 {fullLocationString}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isGps ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'} shrink-0 ml-0.5`}></span>
              <span className="text-[9px] opacity-90 shrink-0 font-extrabold">
                {isGps ? '● Live location' : '● Selected location'}
              </span>
              <ChevronDown className="w-3 h-3 text-white/70 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
            </button>

            {/* Badges Container */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Mode Badge */}
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[9px] sm:text-[10px] font-extrabold text-white border border-white/20 shrink-0 shadow-xs">
                <span>{theme.modeIcon}</span>
                <span>{theme.modeBadgeLabel}</span>
              </div>

              {/* Role Badge */}
              <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${theme.badgeStyle} backdrop-blur-md text-[9px] sm:text-[10px] font-black text-white border border-white/30 shrink-0 shadow-xs uppercase tracking-wider`}>
                <ShieldCheck className="w-3 h-3" />
                <span>{role}</span>
              </div>

              {/* Environment Indicator */}
              <DemoBadge label="DEMO DATA" variant="amber" />
            </div>
          </div>
        </div>

        {/* Hero Middle Section: Temperature & Weather Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end pt-1">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-white drop-shadow-md">
                {weather.temperature}°
              </span>
              <div className="text-[#fcd444] font-bold text-base sm:text-xl flex items-center gap-1">
                <CloudRain className="w-5 h-5 inline" />
                <span>{weather.condition}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white/90">
              <span>Feels like {weather.feelsLike}°</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-white/80" />
                <span>Updated {weather.updatedTime || 'Just now'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Weather Decision Card */}
        <div className="w-full bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-white/20 shadow-xl space-y-2.5 transition-all">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 text-xs font-black text-[#fcd444] tracking-wide uppercase min-w-0">
              <Sparkles className="w-4 h-4 shrink-0 text-[#fcd444]" />
              <span className="truncate">WeatherGPT {role} Decision</span>
            </div>

            <button
              onClick={() => onAskGpt(decision.action)}
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-white hover:text-[#fcd444] transition-colors cursor-pointer shrink-0"
            >
              <span>Ask AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
              {decision.icon} {decision.action}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {decision.reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
