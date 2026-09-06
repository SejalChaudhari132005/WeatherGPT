import React from 'react';
import { MessageSquare, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import { useLocation } from '../hooks/useLocation';
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
import { DemoBadge } from '../components/common/DemoBadge';

interface Props {
  onBack?: () => void;
  onOpenChatWithPrompt?: (promptText: string) => void;
  onNavigatePage?: (page: any) => void;
}

export const DashboardPage: React.FC<Props> = ({
  onOpenChatWithPrompt,
  onNavigatePage,
}) => {
  const { weather, loading, error, refreshWeather } = useWeather();
  const { location } = useLocation();
  const { profile } = useAuthContext();

  const role = (profile?.role || 'citizen').toLowerCase();
  const city = location?.city || profile?.city || 'Pune';
  const state = location?.state || profile?.state || 'Maharashtra';
  const locationDisplay = `${city}, ${state}`;

  // Fallback mock weather container if live stream unavailable
  const fallbackMock = getMockWeatherData(city, state);
  const roleIntelligence = fallbackMock.roleIntelligence[role] || fallbackMock.roleIntelligence.citizen;

  const handleAskGpt = (promptText: string) => {
    if (onOpenChatWithPrompt) {
      onOpenChatWithPrompt(promptText);
    }
  };

  // Convert live normalized weather into WeatherHero props
  const heroWeatherData = weather ? {
    ...fallbackMock,
    city: weather.location.city || city,
    state: weather.location.state || state,
    temperature: weather.current.temperature ?? fallbackMock.temperature,
    feelsLike: weather.current.feels_like ?? fallbackMock.feelsLike,
    condition: weather.current.condition || fallbackMock.condition,
    humidity: weather.current.humidity ?? fallbackMock.humidity,
    windSpeed: weather.current.wind_speed ?? fallbackMock.windSpeed,
    windDirection: weather.current.wind_direction || fallbackMock.windDirection,
    visibility: weather.current.visibility ?? fallbackMock.visibility,
    pressure: weather.current.pressure ?? fallbackMock.pressure,
    uvIndex: weather.current.uv_index ?? fallbackMock.uvIndex,
    rainProbability: weather.current.rain_probability ?? fallbackMock.rainProbability,
    updatedTime: weather.source.retrieved_at ? new Date(weather.source.retrieved_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
  } : fallbackMock;

  const hourlyItems = weather?.hourly && weather.hourly.length > 0 ? weather.hourly : fallbackMock.hourlyForecast;
  const weeklyItems = weather?.daily && weather.daily.length > 0
    ? weather.daily.map(d => ({ ...d, rainProb: d.rainProbability }))
    : fallbackMock.weeklyForecast;

  return (
    <div className="min-h-screen bg-[#F4F7FC] p-2.5 sm:p-4 md:p-6 font-['Arimo'] max-w-4xl mx-auto space-y-3.5 sm:space-y-5 pb-24 overflow-x-hidden w-full max-w-full">
      
      {/* Top Header with Live Provider Data Badge & Manual Refresh */}
      <div className="flex items-center justify-between gap-2 px-0.5 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white text-[#004aad] border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center">
            <img src="/assets/logo-icon.png" alt="WeatherGPT Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-2xl font-black text-slate-900 tracking-tight truncate">Live Weather Dashboard</h2>
              {weather?.source?.provider && (
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black tracking-wide border border-emerald-300">
                  ● {weather.source.is_cached ? 'CACHED' : 'LIVE'} ({weather.source.provider})
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">Hyperlocal weather & role intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => refreshWeather()}
            disabled={loading}
            title="Refresh weather data"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#004aad] hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#38b6ff]' : ''}`} />
          </button>

          <button
            onClick={() => handleAskGpt(`Give me a complete weather report for ${locationDisplay}`)}
            className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#004aad] to-[#38b6ff] text-white shadow-md flex items-center gap-1 text-xs font-extrabold cursor-pointer hover:opacity-95 transition-all shrink-0 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fcd444]" />
            <span className="text-[11px] sm:text-xs font-black">Chat</span>
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-2 font-semibold">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => refreshWeather()} className="text-[11px] underline font-bold text-amber-900">
            Retry
          </button>
        </div>
      )}

      {/* 1. Location-Aware & Role-Aware Hero */}
      <WeatherHero
        weather={heroWeatherData}
        role={role}
        locationName={locationDisplay}
        onAskGpt={handleAskGpt}
      />

      {/* 2. Current Environmental Metrics */}
      <WeatherMetrics current={weather?.current} weather={heroWeatherData} />

      {/* 3. Hourly Forecast Timeline */}
      <HourlyForecast hourly={hourlyItems} />

      {/* 4. Role Intelligence Section */}
      <RoleIntelligence
        intelligence={roleIntelligence}
        roleTitle={role.replace('_', ' ').toUpperCase()}
        onAskGpt={handleAskGpt}
      />

      {/* 5. Hyperlocal Area Risk Overview */}
      <RiskOverview risks={fallbackMock.risks} onAskGpt={handleAskGpt} />

      {/* 6. Live Weather Radar Map */}
      <LiveWeatherMap
        locationName={locationDisplay}
        onOpenFullMap={() => onNavigatePage && onNavigatePage('map')}
      />

      {/* 7. Active Emergency Weather Alerts */}
      <WeatherAlerts
        alerts={fallbackMock.alerts}
        onOpenAlerts={() => onNavigatePage && onNavigatePage('alerts')}
      />

      {/* 8. 7-Day Forecast */}
      <WeeklyForecast weekly={weeklyItems} />

      {/* 9. Role-Aware Quick Actions (Chat Integration) */}
      <QuickActions role={role} locationName={locationDisplay} onAskGpt={handleAskGpt} />
    </div>
  );
};
