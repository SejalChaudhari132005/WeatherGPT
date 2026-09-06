import React from 'react';
import { CloudRain, Wind, Droplets, Eye, Gauge, Thermometer, Sun, MapPin } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useUI } from '../../context/UIContext';

export const HeroWeatherCard: React.FC = () => {
  const { currentWeather, userLocation } = useWeather();
  const { simpleMode } = useUI();

  const locationName = userLocation
    ? `${userLocation.city}, ${userLocation.state}`
    : 'Mumbai, Maharashtra';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 text-white p-6 sm:p-8 shadow-xl shadow-sky-600/20 border border-sky-400/30">
      {/* Decorative cloud illustration background effects */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-900/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left main metrics */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold border border-white/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>{locationName}</span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-6xl sm:text-7xl font-black tracking-tighter">
              {currentWeather.temperature}°
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">{currentWeather.condition}</span>
              <span className="text-xs text-sky-100 font-medium">Feels like {currentWeather.feelsLike}°</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-sky-100 pt-1">
            <span>High: {currentWeather.highTemp}°</span>
            <span>•</span>
            <span>Low: {currentWeather.lowTemp}°</span>
            <span>•</span>
            <span className="bg-emerald-400/20 text-emerald-100 px-2 py-0.5 rounded-md font-bold">
              AQI {currentWeather.airQualityIndex} ({currentWeather.airQualityLabel})
            </span>
          </div>
        </div>

        {/* Dynamic Weather Illustration */}
        <div className="self-center md:self-auto p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner flex items-center justify-center animate-float">
          <CloudRain className="w-20 h-20 text-sky-100 drop-shadow-md" />
        </div>
      </div>

      {/* Grid of Weather Metrics */}
      {!simpleMode && (
        <div className="relative z-10 mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-2 text-xs text-sky-100 mb-1">
              <Droplets className="w-4 h-4 text-sky-200" />
              <span>Humidity</span>
            </div>
            <p className="text-lg font-bold">{currentWeather.humidity}%</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-2 text-xs text-sky-100 mb-1">
              <Wind className="w-4 h-4 text-sky-200" />
              <span>Wind Speed</span>
            </div>
            <p className="text-lg font-bold">{currentWeather.windSpeed} km/h</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-2 text-xs text-sky-100 mb-1">
              <Eye className="w-4 h-4 text-sky-200" />
              <span>Visibility</span>
            </div>
            <p className="text-lg font-bold">{currentWeather.visibility} km</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-2 text-xs text-sky-100 mb-1">
              <Gauge className="w-4 h-4 text-sky-200" />
              <span>Pressure</span>
            </div>
            <p className="text-lg font-bold">{currentWeather.pressure} hPa</p>
          </div>
        </div>
      )}
    </div>
  );
};
