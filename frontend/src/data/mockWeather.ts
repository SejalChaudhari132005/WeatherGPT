import { CurrentWeather, HourlyForecast, DailyForecast, HyperlocalRisk } from '../types/weather';
import { WeatherAlert, ProactiveNotice } from '../types/alert';

export const MOCK_CURRENT_WEATHER: CurrentWeather = {
  temperature: 29,
  feelsLike: 32,
  condition: 'Partly Cloudy',
  humidity: 78,
  windSpeed: 14,
  windDirection: 'WSW',
  visibility: 8,
  pressure: 1008,
  uvIndex: 6,
  rainProbability: 65,
  updatedAt: 'Just now',
  highTemp: 31,
  lowTemp: 26,
  airQualityIndex: 42,
  airQualityLabel: 'Good',
};

export const MOCK_HOURLY_FORECAST: HourlyForecast[] = [
  { time: 'Now', temperature: 29, condition: 'Partly Cloudy', rainProbability: 25 },
  { time: '12 PM', temperature: 30, condition: 'Cloudy', rainProbability: 40 },
  { time: '1 PM', temperature: 31, condition: 'Light Rain', rainProbability: 65 },
  { time: '2 PM', temperature: 29, condition: 'Heavy Rain', rainProbability: 85, isHighRisk: true },
  { time: '3 PM', temperature: 28, condition: 'Thunderstorm', rainProbability: 90, isHighRisk: true },
  { time: '4 PM', temperature: 27, condition: 'Heavy Rain', rainProbability: 80, isHighRisk: true },
  { time: '5 PM', temperature: 27, condition: 'Light Rain', rainProbability: 55 },
  { time: '6 PM', temperature: 26, condition: 'Cloudy', rainProbability: 30 },
  { time: '7 PM', temperature: 26, condition: 'Partly Cloudy', rainProbability: 20 },
];

export const MOCK_DAILY_FORECAST: DailyForecast[] = [
  { day: 'Today', date: 'Sep 06', high: 31, low: 26, condition: 'Heavy Rain', rainProbability: 85, humidity: 78 },
  { day: 'Mon', date: 'Sep 07', high: 30, low: 25, condition: 'Thunderstorm', rainProbability: 75, humidity: 82 },
  { day: 'Tue', date: 'Sep 08', high: 32, low: 26, condition: 'Light Rain', rainProbability: 45, humidity: 70 },
  { day: 'Wed', date: 'Sep 09', high: 33, low: 27, condition: 'Partly Cloudy', rainProbability: 20, humidity: 65 },
  { day: 'Thu', date: 'Sep 10', high: 34, low: 27, condition: 'Sunny', rainProbability: 10, humidity: 60 },
  { day: 'Fri', date: 'Sep 11', high: 33, low: 26, condition: 'Partly Cloudy', rainProbability: 30, humidity: 68 },
  { day: 'Sat', date: 'Sep 12', high: 31, low: 25, condition: 'Heavy Rain', rainProbability: 80, humidity: 85 },
];

export const MOCK_HYPERLOCAL_RISKS: HyperlocalRisk[] = [
  {
    areaName: 'Your Micro-Sector (Within 1.5 km)',
    distanceKm: 0,
    rainRisk: 'HIGH',
    waterloggingRisk: 'HIGH',
    lightning: 'MEDIUM',
    wind: 'MEDIUM',
    temperature: 29
  },
  {
    areaName: 'North Suburb Junction',
    distanceKm: 2.4,
    rainRisk: 'HIGH',
    waterloggingRisk: 'HIGH',
    lightning: 'HIGH',
    wind: 'MEDIUM',
    temperature: 28
  },
  {
    areaName: 'Coastal Highway Corridor',
    distanceKm: 4.1,
    rainRisk: 'MEDIUM',
    waterloggingRisk: 'MEDIUM',
    lightning: 'LOW',
    wind: 'HIGH',
    temperature: 29
  },
  {
    areaName: 'South Commercial Hub',
    distanceKm: 5.8,
    rainRisk: 'LOW',
    waterloggingRisk: 'LOW',
    lightning: 'LOW',
    wind: 'LOW',
    temperature: 30
  }
];

export const MOCK_ALERTS: WeatherAlert[] = [
  {
    id: 'alt-001',
    title: 'Heavy Rainfall & Waterlogging Warning',
    location: 'Current District & Surrounding Basins',
    startTime: '4:00 PM',
    endTime: '9:00 PM',
    severity: 'SEVERE',
    riskLevel: 'HIGH',
    description: 'Convective storm cloud build-up expected to unleash 45-65mm rain in 3 hours.',
    impacts: [
      'Waterlogging in low-lying underpasses',
      'Severe traffic congestion during peak evening commute',
      'Reduced roadway visibility below 1.5 km'
    ],
    recommendedActions: [
      'Complete critical outdoor transit before 3:30 PM',
      'Avoid parking vehicles near storm drains or under old trees',
      'Monitor live radar feeds for localized flash flood notices'
    ],
    issuedBy: 'Meteorological Intelligence System (IMD/Radar Synthetic Feed)',
    updatedAt: '15 mins ago'
  }
];

export const MOCK_PROACTIVE_NOTICE: ProactiveNotice = {
  id: 'pn-1',
  title: 'Rainfall Intensity Escalation',
  summary: 'Radar cell trajectory indicates rain intensity will increase significantly over your sector between 2:00 PM - 4:00 PM.',
  timeframe: 'Next 2 Hours',
  actionText: 'View localized risk breakdown'
};
