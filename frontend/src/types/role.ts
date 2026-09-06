export type UserRole =
  | 'Citizen'
  | 'Farmer'
  | 'Fisher'
  | 'Disaster Manager'
  | 'Aviation'
  | 'Urban Planner'
  | 'Researcher';

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
