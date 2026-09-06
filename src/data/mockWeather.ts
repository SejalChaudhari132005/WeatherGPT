export interface HourlyForecastItem {
  time: string;
  icon: string;
  temp: number;
  rainProb: number;
  highlight?: boolean;
}

export interface WeeklyForecastItem {
  day: string;
  condition: string;
  icon: string;
  high: number;
  low: number;
  rainProb: number;
}

export interface RiskGauge {
  type: string;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  color: string;
}

export interface RoleIntelligenceDetail {
  heading: string;
  metrics: { label: string; value: string; detail: string; status: 'good' | 'warning' | 'critical' }[];
  recommendation: string;
}

export interface ComprehensiveWeatherData {
  locationName: string;
  city: string;
  district: string;
  state: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  updatedTime: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  uvIndex: number;
  rainProbability: number;
  hourlyForecast: HourlyForecastItem[];
  weeklyForecast: WeeklyForecastItem[];
  risks: RiskGauge[];
  alerts: { id: string; title: string; riskLevel: string; timeWindow: string; affectedArea: string }[];
  roleIntelligence: Record<string, RoleIntelligenceDetail>;
}

export const getMockWeatherData = (city: string = 'Pune', state: string = 'Maharashtra'): ComprehensiveWeatherData => {
  return {
    locationName: `${city}, ${state}`,
    city,
    district: city,
    state,
    country: 'India',
    temperature: 27,
    feelsLike: 30,
    condition: 'Scattered Showers',
    updatedTime: '2 min ago',
    humidity: 78,
    windSpeed: 18,
    windDirection: 'SW',
    visibility: 8.5,
    pressure: 1012,
    uvIndex: 6,
    rainProbability: 76,
    hourlyForecast: [
      { time: 'NOW', icon: '🌤️', temp: 27, rainProb: 30 },
      { time: '4 PM', icon: '🌧️', temp: 28, rainProb: 60, highlight: true },
      { time: '5 PM', icon: '⛈️', temp: 27, rainProb: 76, highlight: true },
      { time: '6 PM', icon: '🌧️', temp: 26, rainProb: 81, highlight: true },
      { time: '7 PM', icon: '🌧️', temp: 25, rainProb: 65 },
      { time: '8 PM', icon: '☁️', temp: 25, rainProb: 40 },
    ],
    weeklyForecast: [
      { day: 'Today', condition: 'Scattered Rain', icon: '🌧️', high: 28, low: 22, rainProb: 76 },
      { day: 'Thu', condition: 'Heavy Rain', icon: '⛈️', high: 26, low: 21, rainProb: 85 },
      { day: 'Fri', condition: 'Moderate Showers', icon: '🌧️', high: 27, low: 22, rainProb: 60 },
      { day: 'Sat', condition: 'Partly Cloudy', icon: '🌤️', high: 29, low: 23, rainProb: 25 },
      { day: 'Sun', condition: 'Sunny & Clear', icon: '☀️', high: 31, low: 24, rainProb: 10 },
      { day: 'Mon', condition: 'Hazy Sun', icon: '🌤️', high: 32, low: 24, rainProb: 15 },
      { day: 'Tue', condition: 'Isolated Thunderstorms', icon: '⛈️', high: 28, low: 22, rainProb: 50 },
    ],
    risks: [
      { type: 'Rainfall', level: 'HIGH', description: 'Intense rain peak 4 PM - 7 PM', color: 'bg-rose-500 text-white' },
      { type: 'Flood Risk', level: 'MEDIUM', description: 'Low-lying drainage exposure', color: 'bg-amber-500 text-white' },
      { type: 'Wind Gusts', level: 'MEDIUM', description: 'Gusts up to 28 km/h', color: 'bg-amber-500 text-white' },
      { type: 'Lightning', level: 'LOW', description: 'Isolated electrical activity', color: 'bg-emerald-500 text-white' },
      { type: 'Heat Risk', level: 'LOW', description: 'Comfortable thermal index', color: 'bg-emerald-500 text-white' },
    ],
    alerts: [
      {
        id: '1',
        title: 'Heavy Rain Alert',
        riskLevel: 'HIGH',
        timeWindow: 'Today 4:00 PM - 8:00 PM',
        affectedArea: `${city} Municipal & Coastal Belt`,
      },
      {
        id: '2',
        title: 'Squall & Lightning Advisory',
        riskLevel: 'MEDIUM',
        timeWindow: 'Next 12 Hours',
        affectedArea: `${state} Rural Sectors`,
      },
    ],
    roleIntelligence: {
      citizen: {
        heading: 'Citizen Outdoor & Travel Assistance',
        metrics: [
          { label: 'Commute Impact', value: 'Moderate Delay', detail: 'Rain peak between 4 PM - 7 PM', status: 'warning' },
          { label: 'Outdoor Activities', value: 'Not Recommended', detail: 'Carry waterproof rain protection', status: 'warning' },
          { label: 'Air Quality Index', value: 'Good (42 AQI)', detail: 'Clean atmospheric dispersion', status: 'good' },
        ],
        recommendation: 'Plan evening transit before 4 PM or carry heavy rain protection gear.',
      },

      farmer: {
        heading: 'Agricultural Crop & Irrigation Intelligence',
        metrics: [
          { label: 'Irrigation Need', value: 'Pause 48 Hours', detail: 'Sufficient soil moisture & rain incoming', status: 'good' },
          { label: 'Chemical Spraying', value: 'Postpone', detail: 'High risk of rain wash-off today', status: 'critical' },
          { label: 'Soil Moisture', value: 'Optimal (78%)', detail: 'Favorable for root absorption', status: 'good' },
        ],
        recommendation: 'Delay pesticide & fertilizer application. Ensure field runoff channels are clear.',
      },

      fisherman: {
        heading: 'Marine & Offshore Coastal Safety Bulletin',
        metrics: [
          { label: 'Offshore Waves', value: '1.4 m - 2.1 m', detail: 'Moderate to rough swell height', status: 'warning' },
          { label: 'Sailing Safety', value: 'Caution Advised', detail: 'Small craft should stay within 5 NM', status: 'critical' },
          { label: 'Wind Velocity', value: '18 - 28 km/h', detail: 'Gusty southwesterly winds', status: 'warning' },
        ],
        recommendation: 'Small vessels should avoid deep ocean waters beyond 10 NM today.',
      },

      disaster_manager: {
        heading: 'Regional Hazard & Crisis Response Overview',
        metrics: [
          { label: 'Flood Risk Index', value: 'High Exposure', detail: '3 municipal drainage basins vulnerable', status: 'critical' },
          { label: 'Emergency Readiness', value: 'Level 2 Alert', detail: 'Response units on standby', status: 'warning' },
          { label: 'Peak Hazard Window', value: '4 PM - 7 PM', detail: 'Expected accumulation: 42 mm', status: 'critical' },
        ],
        recommendation: 'Deploy emergency pump units to key underpass transit corridors before 3:30 PM.',
      },

      urban_planner: {
        heading: 'Urban Infrastructure & Drainage Stress Overview',
        metrics: [
          { label: 'Drainage Capacity', value: '82% Load', detail: 'Heavy runoff expected in low areas', status: 'warning' },
          { label: 'Urban Heat Island', value: 'Low Risk', detail: 'Cooling rain effect', status: 'good' },
          { label: 'Crane & Construction', value: 'Pause Operations', detail: 'Wind gusts exceeding 25 km/h', status: 'warning' },
        ],
        recommendation: 'Issue crane halt notice for active high-rise construction sites after 2 PM.',
      },

      researcher: {
        heading: 'Atmospheric Anomaly & Climate Model Analytics',
        metrics: [
          { label: 'Precipitation Anomaly', value: '+18% Baseline', detail: 'Compared to 10-year historical mean', status: 'warning' },
          { label: 'Thermal Index', value: '+0.8°C Anomaly', detail: 'Slightly above normal', status: 'good' },
          { label: 'Model Agreement', value: '88% High', detail: 'GFS & ECMWF model convergence', status: 'good' },
        ],
        recommendation: 'Model data shows strong convective cell formation along the regional trough line.',
      },

      aviation: {
        heading: 'Aviation Flight Corridor & Airport Conditions',
        metrics: [
          { label: 'Runway Visibility', value: '8.5 km', detail: 'May drop to 4 km during rain cells', status: 'good' },
          { label: 'Cloud Base Ceiling', value: '2,200 m', detail: 'Sufficient AGL clearance', status: 'good' },
          { label: 'Crosswind Gusts', value: '14 km/h', detail: 'SW Runway 27 operational', status: 'warning' },
        ],
        recommendation: 'Monitor convective cloud cell trajectory for evening approach vectors.',
      },
    },
  };
};

const defaultData = getMockWeatherData('Pune', 'Maharashtra');

export const MOCK_CURRENT_WEATHER: any = {
  temperature: defaultData.temperature,
  feelsLike: defaultData.feelsLike,
  condition: 'Partly Cloudy',
  humidity: defaultData.humidity,
  windSpeed: defaultData.windSpeed,
  windDirection: defaultData.windDirection,
  visibility: defaultData.visibility,
  pressure: defaultData.pressure,
  uvIndex: defaultData.uvIndex,
  rainProbability: defaultData.rainProbability,
  updatedAt: 'Updated 2 mins ago',
  highTemp: 29,
  lowTemp: 21,
  airQualityIndex: 42,
  airQualityLabel: 'Good',
};

export const MOCK_HOURLY_FORECAST: any[] = defaultData.hourlyForecast.map((h) => ({
  time: h.time,
  temperature: h.temp,
  condition: 'Partly Cloudy',
  rainProbability: h.rainProb,
  isHighRisk: h.highlight,
}));

export const MOCK_DAILY_FORECAST: any[] = defaultData.weeklyForecast.map((d) => ({
  day: d.day,
  date: 'Sep 07',
  high: d.high,
  low: d.low,
  condition: 'Partly Cloudy',
  rainProbability: d.rainProb,
  humidity: 75,
}));

export const MOCK_HYPERLOCAL_RISKS: any[] = defaultData.risks.map((r, idx) => ({
  areaName: `${defaultData.city} Sector ${idx + 1}`,
  distanceKm: (idx + 1) * 2.5,
  rainRisk: r.level === 'HIGH' ? 'HIGH' : r.level === 'MEDIUM' ? 'MEDIUM' : 'LOW',
  waterloggingRisk: r.level === 'HIGH' ? 'HIGH' : 'LOW',
  lightning: 'LOW',
  wind: r.level === 'MEDIUM' ? 'MEDIUM' : 'LOW',
  temperature: 27,
}));

export const MOCK_ALERTS: any[] = [
  {
    id: 'alert_1',
    title: 'Heavy Rain Warning',
    location: 'Pune Municipal Belt',
    startTime: 'Today 4:00 PM',
    endTime: 'Today 8:00 PM',
    severity: 'MODERATE',
    riskLevel: 'HIGH',
    description: 'Precipitation intensity peak expected between 4 PM - 7 PM.',
    impacts: ['Low-lying underpass waterlogging', 'Evening travel delays'],
    recommendedActions: ['Carry waterproof gear', 'Avoid flooded roads'],
    issuedBy: 'WeatherGPT Hazard System',
    updatedAt: '10 mins ago',
  },
];

export const MOCK_PROACTIVE_NOTICE: any = {
  id: 'notice_1',
  title: 'Heavy Rain Warning',
  summary: 'Precipitation intensity increasing after 4 PM.',
  timeframe: '4 PM - 7 PM',
  actionText: 'Carry rain protection gear',
};

