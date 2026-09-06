import { UserLocation } from './location';
export type { UserLocation };

export type WeatherCondition =
  | 'Sunny'
  | 'Partly Cloudy'
  | 'Cloudy'
  | 'Overcast'
  | 'Light Rain'
  | 'Moderate Rain'
  | 'Heavy Rain'
  | 'Thunderstorm'
  | 'Showers'
  | string;

export interface WeatherLocationMeta {
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  state: string;
  country: string;
  source?: string;
}

export interface WeatherCurrent {
  temperature: number | null;
  feels_like: number | null;
  humidity: number | null;
  rain_probability: number | null;
  precipitation: number | null;
  wind_speed: number | null;
  wind_direction: string | null;
  visibility: number | null;
  pressure: number | null;
  uv_index: number | null;
  condition: string;
  icon: string;
  weather_code: number | null;
  observed_at: string | null;
}

export interface WeatherHourlyItem {
  time: string;
  iso_time?: string;
  temp: number;
  condition: string;
  icon: string;
  rainProb: number;
  highlight?: boolean;
}

export interface WeatherDailyItem {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  rainProbability: number;
  rainProb?: number;
  humidity: number;
}

export interface WeatherSourceMeta {
  provider: string;
  retrieved_at: string | null;
  is_cached?: boolean;
}

export interface WeatherGPTResponse {
  location: WeatherLocationMeta;
  current: WeatherCurrent;
  hourly: WeatherHourlyItem[];
  daily: WeatherDailyItem[];
  source: WeatherSourceMeta;
}

// Legacy interfaces retained for backward compatibility with secondary components
export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  uvIndex: number;
  rainProbability: number;
  updatedAt: string;
  highTemp?: number;
  lowTemp?: number;
  airQualityIndex?: number;
  airQualityLabel?: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  rainProbability: number;
  isHighRisk?: boolean;
}

export interface DailyForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  rainProbability: number;
  humidity: number;
}

export interface HyperlocalRisk {
  areaName: string;
  distanceKm: number;
  rainRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  waterloggingRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  lightning: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  wind: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  temperature: number;
}
