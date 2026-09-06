import { useState, useEffect, useCallback } from 'react';
import { WeatherGPTResponse } from '../types/weather';
import { weatherService } from '../services/weatherService';
import { useLocation } from './useLocation';

export const useWeather = () => {
  const { location } = useLocation();
  const [weather, setWeather] = useState<WeatherGPTResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    if (location?.latitude == null || location?.longitude == null) {
      return;
    }

    setLoading(true);
    setError(null);

    console.log("Weather request coordinates:", {
      latitude: location.latitude,
      longitude: location.longitude,
      city: location.city,
      source: location.source
    });

    try {
      const data = await weatherService.getWeather(
        location.latitude,
        location.longitude,
        location.source || 'gps'
      );
      console.log("Weather response:", data);
      setWeather(data);
      setLoading(false);
    } catch (err: any) {
      console.error('[useWeather] Error fetching live weather:', err);
      setError('Weather data is temporarily unavailable.');
      setLoading(false);
    }
  }, [location?.latitude, location?.longitude, location?.source]);

  // Fetch weather when exact coordinates change
  useEffect(() => {
    if (location?.latitude != null && location?.longitude != null) {
      fetchWeather();
    }
  }, [location?.latitude, location?.longitude, fetchWeather]);

  // Auto-refresh weather every 10 minutes (600,000 ms)
  useEffect(() => {
    const timer = setInterval(() => {
      if (location?.latitude != null && location?.longitude != null) {
        fetchWeather();
      }
    }, 600000);
    return () => clearInterval(timer);
  }, [location?.latitude, location?.longitude, fetchWeather]);

  return {
    weather,
    loading,
    error,
    refreshWeather: fetchWeather,
  };
};
