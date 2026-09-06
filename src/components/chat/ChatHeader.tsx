import React from 'react';
import { Menu, MapPin, User, ChevronRight, LayoutDashboard } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { useWeather } from '../../context/WeatherContext';

interface Props {
  onOpenSidebar: () => void;
  onNavigateProfile: () => void;
  onNavigateLocation: () => void;
  onNavigateDashboard?: () => void;
}

export const ChatHeader: React.FC<Props> = ({
  onOpenSidebar,
  onNavigateProfile,
  onNavigateLocation,
  onNavigateDashboard,
}) => {
  const { profile } = useAuthContext();
  const { userLocation } = useWeather();

  // Dynamic Location from Profile / GPS Context
  const locationDisplay = userLocation
    ? `${userLocation.city}, ${userLocation.state || userLocation.country}`
    : profile?.city
    ? `${profile.city}, ${profile.state || profile.country}`
    : 'Nashik, Maharashtra';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-4 pt-3 pb-2 select-none font-['Arimo']">
      <div className="flex items-center justify-between gap-2">
        {/* LEFT: ☰ Menu & Dashboard Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSidebar}
            aria-label="Open chat history"
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          {onNavigateDashboard && (
            <button
              onClick={onNavigateDashboard}
              className="px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#004aad] border border-sky-200/80 text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              <LayoutDashboard className="w-4 h-4 text-[#004aad]" />
              <span className="text-[11px] sm:text-xs">Dashboard</span>
            </button>
          )}
        </div>

        {/* CENTER: WeatherGPT Logo + Name */}
        <div className="flex items-center gap-1.5">
          <img src="/assets/logo-icon.png" alt="WeatherGPT Logo" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
          <h1 className="text-sm sm:text-base font-black text-black tracking-tight font-['Arimo']">
            WeatherGPT
          </h1>
        </div>

        {/* RIGHT: Profile Avatar Button */}
        <button
          onClick={onNavigateProfile}
          aria-label="User Profile"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#004aad] to-[#38b6ff] text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-sm cursor-pointer hover:opacity-90 transition-opacity shrink-0"
        >
          {profile?.username ? profile.username.charAt(0).toUpperCase() : <User className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>

      {/* Dynamic Saved Location Bar */}
      <div className="flex items-center justify-center pt-2 pb-0.5">
        <button
          onClick={onNavigateLocation}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-slate-800 text-xs font-bold border border-sky-200/70 shadow-2xs transition-colors cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>📍 {locationDisplay}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </button>
      </div>
    </header>
  );
};
