export type AlertSeverity = 'INFO' | 'MODERATE' | 'SEVERE' | 'EXTREME';

export interface WeatherAlert {
  id: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  severity: AlertSeverity;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  description: string;
  impacts: string[];
  recommendedActions: string[];
  issuedBy: string;
  updatedAt: string;
}

export interface ProactiveNotice {
  id: string;
  title: string;
  summary: string;
  timeframe: string;
  actionText: string;
}
