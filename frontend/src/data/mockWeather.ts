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

export interface HourlyForecastItem {
  time: string;
  temp: number;
  condition: string;
  rainProb: number;
  icon: string;
  highlight?: boolean;
}

export interface RiskGauge {
  type: string;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  color: string;
  description: string;
}

export interface RoleIntelligenceDetail {
  heading: string;
  metrics: { label: string; value: string; detail: string; status: 'good' | 'warning' | 'critical' }[];
  recommendation: string;
}

export interface WeeklyForecastItem {
  day: string;
  condition: string;
  high: number;
  low: number;
  rainProb: number;
  icon: string;
}

export interface ComprehensiveWeatherData {
  city: string;
  state: string;
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
  updatedTime: string;
  hourlyForecast: HourlyForecastItem[];
  weeklyForecast: WeeklyForecastItem[];
  risks: RiskGauge[];
  alerts: { id: string; title: string; riskLevel: string; timeWindow: string; affectedArea: string }[];
  roleIntelligence: Record<string, RoleIntelligenceDetail>;
}

export function getMockWeatherData(city: string = 'Pune', state: string = 'Maharashtra'): ComprehensiveWeatherData {
  return {
    city,
    state,
    temperature: 27,
    feelsLike: 30,
    condition: 'Scattered Showers',
    humidity: 78,
    windSpeed: 18,
    windDirection: 'SW',
    visibility: 8.5,
    pressure: 1012,
    uvIndex: 6,
    rainProbability: 76,
    updatedTime: '2 min ago',
    hourlyForecast: [
      { time: 'NOW', temp: 27, condition: 'Showers', rainProb: 30, icon: '🌦️' },
      { time: '4 PM', temp: 28, condition: 'Heavy Rain', rainProb: 76, icon: '🌧️', highlight: true },
      { time: '5 PM', temp: 27, condition: 'Thunderstorm', rainProb: 82, icon: '⛈️', highlight: true },
      { time: '6 PM', temp: 26, condition: 'Heavy Rain', rainProb: 80, icon: '🌧️', highlight: true },
      { time: '7 PM', temp: 25, condition: 'Moderate Rain', rainProb: 65, icon: '🌧️', highlight: true },
      { time: '8 PM', temp: 25, condition: 'Light Rain', rainProb: 40, icon: '🌦️' },
    ],
    weeklyForecast: [
      { day: 'Today', condition: 'Scattered Showers', high: 28, low: 22, rainProb: 76, icon: '🌦️' },
      { day: 'Mon', condition: 'Heavy Rain', high: 27, low: 22, rainProb: 85, icon: '🌧️' },
      { day: 'Tue', condition: 'Thunderstorm', high: 29, low: 23, rainProb: 70, icon: '⛈️' },
      { day: 'Wed', condition: 'Light Drizzle', high: 30, low: 24, rainProb: 40, icon: '🌦️' },
      { day: 'Thu', condition: 'Partly Cloudy', high: 31, low: 24, rainProb: 20, icon: '⛅' },
      { day: 'Fri', condition: 'Mostly Sunny', high: 32, low: 25, rainProb: 10, icon: '☀️' },
      { day: 'Sat', condition: 'Scattered Showers', high: 29, low: 23, rainProb: 60, icon: '🌦️' },
    ],
    risks: [
      { type: 'Rainfall', level: 'HIGH', color: 'bg-rose-100 text-rose-800 border-rose-300', description: 'Peak 45mm/hr expected at 4 PM' },
      { type: 'Flood Risk', level: 'HIGH', color: 'bg-rose-100 text-rose-800 border-rose-300', description: '3 low-lying drainage zones vulnerable' },
      { type: 'Wind Gusts', level: 'MEDIUM', color: 'bg-amber-100 text-amber-800 border-amber-300', description: 'Gale speeds up to 28 km/h' },
      { type: 'Lightning', level: 'CRITICAL', color: 'bg-red-500 text-white border-red-700', description: 'Active convective strikes within 5 km' },
      { type: 'Heat Risk', level: 'LOW', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', description: 'Optimal ambient thermal index' },
    ],
    alerts: [
      { id: 'alt-1', title: 'Heavy Monsoon Downpour Warning', riskLevel: 'HIGH', timeWindow: '4 PM - 9 PM', affectedArea: `${city} Sector 4` },
      { id: 'alt-2', title: 'Urban Waterlogging Caution', riskLevel: 'MEDIUM', timeWindow: '5 PM - 8 PM', affectedArea: `${city} Central Drain` },
    ],
    roleIntelligence: {
      citizen: {
        heading: 'Urban Transit & Outdoor Safety',
        metrics: [
          { label: 'Outdoor Plan', value: 'Carry Umbrella', detail: 'Rain probability 76% after 4 PM', status: 'warning' },
          { label: 'Commute Safety', value: 'Moderate Delay', detail: 'Traffic slowdown on main arterial roads', status: 'warning' },
          { label: 'Thermal Comfort', value: 'Comfortable', detail: 'Humidity 78%, ambient temp 27°C', status: 'good' },
        ],
        recommendation: 'Complete evening commutes before 4 PM or keep rain gear handy.',
      },
      farmer: {
        heading: 'Crop Health & Irrigation Schedule',
        metrics: [
          { label: 'Soil Moisture', value: 'High (84%)', detail: 'Optimal natural root hydration', status: 'good' },
          { label: 'Irrigation Need', value: 'Delay Irrigation', detail: '76% rain probability tonight', status: 'warning' },
          { label: 'Crop Rain Window', value: 'High Window', detail: '4 PM to 7 PM heavy precipitation', status: 'critical' },
        ],
        recommendation: 'Hold chemical spraying & irrigation. Ensure field drainage channels are clear.',
      },
      fisherman: {
        heading: 'Marine & Offshore Sailing Intelligence',
        metrics: [
          { label: 'Sailing Condition', value: 'Caution Advised', detail: 'Swell period 8s, moderate sea state', status: 'warning' },
          { label: 'Wave Height', value: '1.4 Meters', detail: 'Peak wave period 2 PM - 6 PM', status: 'warning' },
          { label: 'Wind Velocity', value: '18 km/h SW', detail: 'Offshore squalls potential', status: 'warning' },
        ],
        recommendation: 'Small fishing craft should return to port before 2 PM coastal wind escalation.',
      },
      disaster_manager: {
        heading: 'Situational Emergency & Flood Preparedness',
        metrics: [
          { label: 'Rain Escalation', value: 'Severe Warning', detail: '45mm/hr rate cell approaching', status: 'critical' },
          { label: 'Flood-Prone Zones', value: '3 Active Hotspots', detail: 'Underpass 4 & River Bank Sector B', status: 'critical' },
          { label: 'Drainage Capacity', value: '88% Peak Load', detail: 'Surcharging expected around 5:30 PM', status: 'warning' },
        ],
        recommendation: 'Pre-position dewatering pump units at Underpass 4 and issue community alerts.',
      },
      urban_planner: {
        heading: 'Municipal Drainage & High-Rise Safety',
        metrics: [
          { label: 'Waterlogging Risk', value: 'High Exposure', detail: 'Low-lying basin runoff 42mm', status: 'critical' },
          { label: 'Crane Operation', value: 'Halt Above 20m', detail: 'Wind gusts exceeding 28 km/h', status: 'warning' },
          { label: 'Heat Island', value: 'Subdued (+0.8°C)', detail: 'Cloud cover suppressing surface heating', status: 'good' },
        ],
        recommendation: 'Issue crane operations suspension for high-rise sites between 3 PM and 7 PM.',
      },
      researcher: {
        heading: 'Climate Anomalies & Historical Baseline',
        metrics: [
          { label: 'Rainfall Anomaly', value: '+18% Anomaly', detail: 'Above 2015-2025 decadal average', status: 'warning' },
          { label: 'Thermal Index', value: '-0.5°C Anomaly', detail: 'Cooler due to convective cloud cover', status: 'good' },
          { label: 'Model Agreement', value: '92% High Consensus', detail: 'IMD GFS & ECMWF multi-model ensemble', status: 'good' },
        ],
        recommendation: 'Record convective precipitation trajectory for decadal monsoon runoff analysis.',
      },
      aviation: {
        heading: 'Terminal Aerodrome & Runway Conditions',
        metrics: [
          { label: 'Visibility', value: '8.5 km (Good)', detail: 'May drop to 2.5 km in heavy showers', status: 'good' },
          { label: 'Cloud Base', value: '2,200 Feet', detail: 'Overcast cumulonimbus layers', status: 'warning' },
          { label: 'Crosswind Risk', value: '14 knots SW', detail: 'Runway 27 crosswind component within limits', status: 'good' },
        ],
        recommendation: 'Monitor convective storm cell approaching runway approach corridor for 4:15 PM landing slot.',
      },
    },
  };
}

export const MOCK_PROACTIVE_NOTICE: ProactiveNotice = {
  id: 'pn-001',
  title: 'Convective Storm Cell Approaching',
  summary: 'Intense rain cell detected 18km Southwest moving towards your micro-sector.',
  timeframe: 'Next 45 minutes',
  actionText: 'View Radar Map',
};

