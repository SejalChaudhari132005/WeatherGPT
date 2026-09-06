export type UserRole =
  | 'Citizen'
  | 'Farmer'
  | 'Fisher'
  | 'Disaster Manager'
  | 'Aviation'
  | 'Urban Planner'
  | 'Researcher';

export const ALL_ROLES: { id: string; title: string; icon: string }[] = [
  { id: 'citizen', title: 'Citizen / General Public', icon: '🚗' },
  { id: 'farmer', title: 'Farmer / Agricultural', icon: '🌾' },
  { id: 'fisher', title: 'Fisherfolk / Marine', icon: '🎣' },
  { id: 'disaster_manager', title: 'Disaster Manager', icon: '🚨' },
  { id: 'urban_planner', title: 'Urban Planner', icon: '🏗️' },
  { id: 'researcher', title: 'Researcher / Climate Analyst', icon: '📈' },
  { id: 'aviation', title: 'Aviation', icon: '✈️' },
];

export interface FarmerAdvisoryData {
  crop: string;
  rainOutlook: string;
  irrigationRecommendation: string;
  sprayingWindow: string;
  diseaseRisk: string;
  diseaseRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  soilMoisture: string;
  marathiSummary: string;
  hindiSummary: string;
}

export interface FisherAdvisoryData {
  waveHeight: string;
  windSpeed: string;
  visibility: string;
  seaCondition: string;
  sailingRisk: 'SAFE' | 'CAUTION' | 'DANGER';
  safeWindow: string;
  highTideTime: string;
}

export interface TravelRoutePoint {
  name: string;
  condition: string;
  temp: number;
  rainRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  visibility: string;
  wind: string;
  hasWarning?: boolean;
  warningText?: string;
}
