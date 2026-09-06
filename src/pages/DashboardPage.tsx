import React from 'react';
import { HeroWeatherCard } from '../components/dashboard/HeroWeatherCard';
import { AskWeatherGPTCard } from '../components/dashboard/AskWeatherGPTCard';
import { RadarMap } from '../components/radar/RadarMap';
import { HourlyForecastCard } from '../components/dashboard/HourlyForecastCard';
import { DarkHumidityCard } from '../components/dashboard/DarkHumidityCard';
import { TomorrowForecastCard } from '../components/dashboard/TomorrowForecastCard';
import { ProactiveAlertCard } from '../components/dashboard/ProactiveAlertCard';
import { RoleBasedAdvisoryCard } from '../components/dashboard/RoleBasedAdvisoryCard';
import { HyperlocalWeatherCard } from '../components/dashboard/HyperlocalWeatherCard';
import { useProfile } from '../hooks/useProfile';

export const DashboardPage: React.FC = () => {
  const { username } = useProfile();

  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* Top Greeting Header matching Screenshot */}
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 block">
          YOUR CONVERSATIONAL WEATHER DESK
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          {getGreetingTime()} <span className="animate-bounce">👋</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Your quick weather cards on the left. A full WeatherGPT conversation on the right.
        </p>
      </div>

      {/* Main Split Grid Layout matching Screenshot: Left Quick Weather Cards | Right AI Weather Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Primary Weather Card + 4 Metric Cards */}
        <HeroWeatherCard />

        {/* Right Column: Vibrant AI Weather Desk Card */}
        <AskWeatherGPTCard />
      </div>

      {/* Proactive WeatherGPT Notice Banner */}
      <ProactiveAlertCard />

      {/* Row 2 Grid: Saved Cities/Dark AQI | Temperature Today | Tomorrow Forecast */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <DarkHumidityCard />
        <HourlyForecastCard />
        <TomorrowForecastCard />
      </div>

      {/* Live Satellite Radar Map */}
      <RadarMap />

      {/* Role Based Selector & Hyperlocal Micro-Area Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RoleBasedAdvisoryCard />
        <HyperlocalWeatherCard />
      </div>
    </div>
  );
};
