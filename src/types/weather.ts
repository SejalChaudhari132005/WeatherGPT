export type WeatherCondition =
  | 'Sunny'
  | 'Clear'
  | 'Partly Cloudy'
  | 'Cloudy'
  | 'Overcast'
  | 'Light Rain'
  | 'Heavy Rain'
  | 'Thunderstorm'
  | 'Windy'
  | 'Foggy';

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number; // percentage
  windSpeed: number; // km/h
  windDirection: string;
  visibility: number; // km
  pressure: number; // hPa
  uvIndex: number;
  rainProbability: number; // percentage
  updatedAt: string;
  highTemp: number;
  lowTemp: number;
  airQualityIndex: number; // 0-500
  airQualityLabel: 'Good' | 'Moderate' | 'Poor' | 'Unhealthy' | 'Hazardous';
}

export interface HourlyForecast {
  time: string; // e.g., '12 PM'
  temperature: number;
  condition: WeatherCondition;
  rainProbability: number;
  isHighRisk?: boolean;
}

export interface DailyForecast {
  day: string; // e.g., 'Monday'
  date: string; // e.g., 'Sep 07'
  high: number;
  low: number;
  condition: WeatherCondition;
  rainProbability: number;
  humidity: number;
}

export interface IntelligenceMetric {
  title: string;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  value: string | number;
  description: string;
}

export interface HyperlocalRisk {
  areaName: string;
  distanceKm: number;
  rainRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  waterloggingRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  lightning: 'LOW' | 'MEDIUM' | 'HIGH';
  wind: 'LOW' | 'MEDIUM' | 'HIGH';
  temperature: number;
}
