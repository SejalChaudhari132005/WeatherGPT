export interface WeatherAdvisoryPayload {
  title: string;
  advisoryText: string;
  impactLevel: 'low' | 'medium' | 'high' | 'severe';
  actionableSteps?: string[];
}

export interface WeatherDataPayload {
  rainProbability?: number; // e.g. 72%
  tempC?: number;
  condition?: string;
  timeWindow?: string; // e.g. "4 PM - 7 PM"
  windSpeedKmH?: number;
  humidityPct?: number;
  advisory?: WeatherAdvisoryPayload;
  locationName?: string; // e.g. "Nashik, Maharashtra"
  confidenceScore?: number; // e.g. 84
  sources?: string[]; // e.g. ["IMD", "GFS", "Doppler Radar"]
  isDemoData?: boolean;
}

export interface ExplainableMetadata {
  sources: string[];
  confidenceScore: number;
  resolution: string;
  updatedAt: string;
  rationale: string;
}

export interface ChatMessage {
  id: string;
  conversationId?: string;
  userId?: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string; // ISO String or readable format
  weatherData?: WeatherDataPayload;
  suggestedFollowups?: string[];
  roleContext?: string;
  explainable?: ExplainableMetadata;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  role: string;
  locationName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  messageCount?: number;
  lastMessageSnippet?: string;
}

export interface PromptSuggestion {
  id: string;
  icon: string;
  text: string;
  roleCategory: string;
}

export type ActiveNavPage = 'chat' | 'dashboard' | 'map' | 'alerts' | 'climate' | 'profile' | 'settings';
