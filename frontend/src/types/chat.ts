export interface ExplainableMetadata {
  sources: string[]; // e.g. ['IMD', 'GFS', 'Doppler Radar']
  confidenceScore: number; // e.g. 84
  resolution: string; // e.g. '1 km'
  updatedAt: string; // e.g. '5 mins ago'
  rationale: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  explainable?: ExplainableMetadata;
  suggestedFollowups?: string[];
  roleContext?: string;
}
