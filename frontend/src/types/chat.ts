export interface ExplainableMetadata {
  sources: string[]; // e.g. ['IMD', 'GFS', 'Doppler Radar']
  confidenceScore: number; // e.g. 84
  resolution: string; // e.g. '1 km'
  updatedAt: string; // e.g. '5 mins ago'
  rationale: string;
}

export interface WeatherDataPayload {
  temperature?: number;
  tempC?: number;
  condition?: string;
  feelsLike?: number;
  humidity?: number;
  humidityPct?: number;
  windSpeed?: number;
  windSpeedKmH?: number;
  windDirection?: string;
  visibility?: number;
  rainProbability?: number;
  pressure?: number;
  uvIndex?: number;
  locationName?: string;
  timeWindow?: string;
  confidenceScore?: number;
  sources?: string[];
  advisory?: WeatherAdvisoryPayload | string;
  isDemoData?: boolean;
}

export interface WeatherAdvisoryPayload {
  title?: string;
  role?: string;
  headline?: string;
  recommendation?: string;
  advisoryText?: string;
  impactLevel?: string;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  steps?: string[];
  actionableSteps?: string[];
}

export interface ChatMessage {
  id: string;
  conversationId?: string;
  userId?: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  explainable?: ExplainableMetadata;
  suggestedFollowups?: string[];
  roleContext?: string;
  weatherData?: WeatherDataPayload;
  weatherAdvisory?: WeatherAdvisoryPayload;
}

export interface Conversation {
  id: string;
  userId?: string;
  title: string;
  role: string;
  locationName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export type ActiveNavPage =
  | 'chat'
  | 'dashboard'
  | 'map'
  | 'alerts'
  | 'climate'
  | 'profile'
  | 'settings';

export interface PromptSuggestion {
  id: string;
  title?: string;
  text?: string;
  prompt?: string;
  icon: string;
  role?: string;
  roleCategory?: string;
}
