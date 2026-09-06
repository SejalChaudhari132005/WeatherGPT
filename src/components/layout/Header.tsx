import React from 'react';
import { MapPin, Mic, Search, Bell, User, Sparkles, Globe, Radio } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useWeather } from '../../context/WeatherContext';
import { useLanguage } from '../../context/LanguageContext';
import { DemoBadge } from '../common/DemoBadge';

export const Header: React.FC = () => {
  const { setLocationModalOpen, setVoiceModalOpen, sidebarOpen } = useUI();
  const { userLocation } = useWeather();
  const { t, language } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 17) return t('goodAfternoon');
    return t('goodEvening');
  };

  const formattedLocation = userLocation
    ? `${userLocation.city}, ${userLocation.state}`
    : 'Mumbai, Maharashtra';

  return (
    <header
      className={`sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/70 transition-all duration-300 ${
        sidebarOpen ? 'md:ml-64' : 'md:ml-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Greeting & Location */}
        <div className="flex items-center gap-3">
          {/* Location Trigger */}
          <button
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200/80 text-sky-900 transition-all group cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-[10px] text-sky-600 font-bold uppercase tracking-wider leading-none">
                Current Location
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1">
                {formattedLocation}
                <span className="text-[10px] text-sky-500">▼</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Search trigger */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div
            onClick={() => setLocationModalOpen(true)}
            className="w-full relative flex items-center bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-2xl px-3.5 py-2 cursor-pointer transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400 mr-2.5" />
            <span className="text-xs text-slate-400 font-medium">Search city, pincode or location...</span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Indicator & Demo Badge */}
          <div className="hidden sm:flex items-center gap-2">
            <DemoBadge label="DEMO MODE" variant="amber" />
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Updated 2 min ago</span>
            </div>
          </div>

          {/* Voice Microphone Trigger Button */}
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="p-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/25 transition-all transform active:scale-95 flex items-center justify-center gap-1.5 text-xs font-bold"
            title="Voice Assistant"
          >
            <Mic className="w-4 h-4" />
            <span className="hidden md:inline">Voice</span>
          </button>

          {/* Notifications */}
          <button className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>

          {/* Profile */}
          <div className="p-2 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};
