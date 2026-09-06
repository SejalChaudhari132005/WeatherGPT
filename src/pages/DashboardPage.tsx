import React from 'react';
import { ArrowLeft, Sparkles, MessageSquare } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { useAuthContext } from '../context/AuthContext';
import { getMockWeatherData } from '../data/mockWeather';
import { WeatherHero } from '../components/dashboard/WeatherHero';
import { WeatherMetrics } from '../components/dashboard/WeatherMetrics';
import { HourlyForecast } from '../components/dashboard/HourlyForecast';
import { RiskOverview } from '../components/dashboard/RiskOverview';
import { RoleIntelligence } from '../components/dashboard/RoleIntelligence';
import { LiveWeatherMap } from '../components/dashboard/LiveWeatherMap';
import { WeatherAlerts } from '../components/dashboard/WeatherAlerts';
import { WeeklyForecast } from '../components/dashboard/WeeklyForecast';
import { QuickActions } from '../components/dashboard/QuickActions';

interface Props {
  onBack: () => void;
  onOpenChatWithPrompt?: (promptText: string) => void;
  onNavigatePage?: (page: any) => void;
}

export const DashboardPage: React.FC<Props> = ({
  onBack,
  onOpenChatWithPrompt,
  onNavigatePage,
}) => {
  const { userLocation } = useWeather();
  const { profile } = useAuthContext();

  const role = profile?.role || 'citizen';
  const city = userLocation?.city || profile?.city || 'Pune';
  const state = userLocation?.state || profile?.state || 'Maharashtra';
  const locationDisplay = `${city}, ${state}`;

  const weatherData = getMockWeatherData(city, state);
  const roleIntelligence = weatherData.roleIntelligence[role.toLowerCase()] || weatherData.roleIntelligence.citizen;

  const handleAskGpt = (promptText: string) => {
    if (onOpenChatWithPrompt) {
      onOpenChatWithPrompt(promptText);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] p-2.5 sm:p-4 md:p-6 font-['Arimo'] max-w-4xl mx-auto space-y-3.5 sm:space-y-5 pb-24 overflow-x-hidden w-full max-w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 px-0.5 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white text-[#004aad] border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center">
            <img src="/assets/logo-icon.png" alt="WeatherGPT Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-2xl font-black text-slate-900 tracking-tight truncate">Live Weather Dashboard</h2>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">Hyperlocal weather & role intelligence</p>
          </div>
        </div>

        <button
          onClick={() => handleAskGpt(`Give me a complete weather report for ${locationDisplay}`)}
          className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#004aad] to-[#38b6ff] text-white shadow-md flex items-center gap-1 text-xs font-extrabold cursor-pointer hover:opacity-95 transition-all shrink-0 active:scale-95"
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fcd444]" />
          <span className="text-[11px] sm:text-xs font-black">Chat</span>
        </button>
      </div>

      {/* 1. Location-Aware & Role-Aware Hero */}
      <WeatherHero
        weather={weatherData}
        role={role}
        locationName={locationDisplay}
        onAskGpt={handleAskGpt}
      />

      {/* 2. Current Environmental Metrics */}
      <WeatherMetrics weather={weatherData} />

      {/* 3. Hourly Forecast Timeline */}
      <HourlyForecast hourly={weatherData.hourlyForecast} />

      {/* 4. Role Intelligence Section */}
      <RoleIntelligence
        intelligence={roleIntelligence}
        roleTitle={role.replace('_', ' ').toUpperCase()}
        onAskGpt={handleAskGpt}
      />

      {/* 5. Hyperlocal Area Risk Overview */}
      <RiskOverview risks={weatherData.risks} onAskGpt={handleAskGpt} />

      {/* 6. Live Weather Radar Map */}
      <LiveWeatherMap
        locationName={locationDisplay}
        onOpenFullMap={() => onNavigatePage && onNavigatePage('map')}
      />

      {/* 7. Active Emergency Weather Alerts */}
      <WeatherAlerts
        alerts={weatherData.alerts}
        onOpenAlerts={() => onNavigatePage && onNavigatePage('alerts')}
      />

      {/* 8. 7-Day Forecast */}
      <WeeklyForecast weekly={weatherData.weeklyForecast} />

      {/* 9. Role-Aware Quick Actions (Chat Integration) */}
      <QuickActions role={role} locationName={locationDisplay} onAskGpt={handleAskGpt} />

      {/* Bottom Floating Navigation Dock for Quick Page Toggle */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-2xl border border-slate-700/80 flex items-center gap-2">
        <button
          className="px-3 py-1.5 rounded-full bg-[#004aad] text-white text-xs font-black flex items-center gap-1.5 shadow-xs"
        >
          <span>📊</span>
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => handleAskGpt(`Hi WeatherGPT, give me an updated weather summary for ${locationDisplay}`)}
          className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#fcd444]" />
          <span>WeatherGPT AI</span>
        </button>
      </div>
    </div>
  );
};
