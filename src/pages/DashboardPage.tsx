import React from 'react';
import { HeroWeatherCard } from '../components/dashboard/HeroWeatherCard';
import { AskWeatherGPTCard } from '../components/dashboard/AskWeatherGPTCard';
import { HourlyForecastCard } from '../components/dashboard/HourlyForecastCard';
import { SevenDayForecastCard } from '../components/dashboard/SevenDayForecastCard';
import { WeatherIntelligencePanel } from '../components/dashboard/WeatherIntelligencePanel';
import { HyperlocalWeatherCard } from '../components/dashboard/HyperlocalWeatherCard';
import { ProactiveAlertCard } from '../components/dashboard/ProactiveAlertCard';
import { RoleBasedAdvisoryCard } from '../components/dashboard/RoleBasedAdvisoryCard';
import { AlertBanner } from '../components/alerts/AlertBanner';
import { RadarMap } from '../components/radar/RadarMap';
import { FarmerAdvisory } from '../components/roles/FarmerAdvisory';
import { FisherAdvisory } from '../components/roles/FisherAdvisory';
import { AviationDisasterAdvisory } from '../components/roles/AviationDisasterAdvisory';
import { useWeather } from '../context/WeatherContext';

export const DashboardPage: React.FC = () => {
  const { activeRole } = useWeather();

  return (
    <div className="space-y-6 pb-12">
      {/* Proactive WeatherGPT Notice Banner */}
      <ProactiveAlertCard />

      {/* Main Grid Layout: Left/Main Content + Right Intelligence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Main Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Weather Card */}
          <HeroWeatherCard />

          {/* Ask WeatherGPT Conversational Desk */}
          <AskWeatherGPTCard />

          {/* Active Severe Weather Warning Banner */}
          <AlertBanner />

          {/* Hyperlocal Micro-Area Risks */}
          <HyperlocalWeatherCard />

          {/* Today's Hourly Forecast */}
          <HourlyForecastCard />

          {/* Live Radar Preview */}
          <RadarMap />

          {/* 7-Day Forecast */}
          <SevenDayForecastCard />
        </div>

        {/* Right Column: Intelligence Panel & Role-based Cards */}
        <div className="space-y-6">
          {/* Weather Intelligence Matrix & Recommendation */}
          <WeatherIntelligencePanel />

          {/* Role Based Selector */}
          <RoleBasedAdvisoryCard />

          {/* Role Specific Active Advisory View */}
          {activeRole === 'Farmer' && <FarmerAdvisory />}
          {activeRole === 'Fisher' && <FisherAdvisory />}
          {(activeRole === 'Aviation' || activeRole === 'Disaster Manager' || activeRole === 'Urban Planner' || activeRole === 'Researcher') && (
            <AviationDisasterAdvisory />
          )}
        </div>
      </div>
    </div>
  );
};
