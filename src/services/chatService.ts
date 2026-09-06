import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Conversation, ChatMessage, PromptSuggestion, WeatherDataPayload } from '../types/chat';

const LOCAL_CONVERSATIONS_KEY = 'weathergpt_conversations';
const LOCAL_MESSAGES_KEY_PREFIX = 'weathergpt_messages_';

// Helper to access LocalStorage for Dev Fallback
const getLocalConversations = (userId: string): Conversation[] => {
  try {
    const raw = localStorage.getItem(`${LOCAL_CONVERSATIONS_KEY}_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalConversations = (userId: string, conversations: Conversation[]) => {
  try {
    localStorage.setItem(`${LOCAL_CONVERSATIONS_KEY}_${userId}`, JSON.stringify(conversations));
  } catch {
    // Ignore
  }
};

const getLocalMessages = (conversationId: string): ChatMessage[] => {
  try {
    const raw = localStorage.getItem(`${LOCAL_MESSAGES_KEY_PREFIX}${conversationId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalMessages = (conversationId: string, messages: ChatMessage[]) => {
  try {
    localStorage.setItem(`${LOCAL_MESSAGES_KEY_PREFIX}${conversationId}`, JSON.stringify(messages));
  } catch {
    // Ignore
  }
};

export const getSuggestedPromptsByRole = (role: string): PromptSuggestion[] => {
  const normalizedRole = (role || 'citizen').toLowerCase();

  if (normalizedRole.includes('farmer')) {
    return [
      { id: '1', icon: '🌾', text: "Should I irrigate today?", roleCategory: 'Farmer' },
      { id: '2', icon: '🌧️', text: "Will rain affect my crop this week?", roleCategory: 'Farmer' },
      { id: '3', icon: '🌱', text: "Is tomorrow suitable for spraying?", roleCategory: 'Farmer' },
      { id: '4', icon: '🌡️', text: "What is the soil temperature & moisture outlook?", roleCategory: 'Farmer' },
    ];
  }

  if (normalizedRole.includes('fisher') || normalizedRole.includes('marine')) {
    return [
      { id: '1', icon: '🎣', text: "Is it safe to go fishing tomorrow?", roleCategory: 'Fisherfolk' },
      { id: '2', icon: '🌊', text: "What are the wave height & swell conditions?", roleCategory: 'Fisherfolk' },
      { id: '3', icon: '🌬️', text: "What will coastal wind speed be at sea?", roleCategory: 'Fisherfolk' },
      { id: '4', icon: '⚡', text: "Are there thunderstorm risks offshore?", roleCategory: 'Fisherfolk' },
    ];
  }

  if (normalizedRole.includes('disaster') || normalizedRole.includes('emergency')) {
    return [
      { id: '1', icon: '🚨', text: "What areas are at severe weather risk?", roleCategory: 'Disaster Manager' },
      { id: '2', icon: '🌊', text: "Where is urban flooding likely in my zone?", roleCategory: 'Disaster Manager' },
      { id: '3', icon: '📍', text: "Show high-risk storm & wind locations", roleCategory: 'Disaster Manager' },
      { id: '4', icon: '⛈️', text: "Any severe lightning advisories near me?", roleCategory: 'Disaster Manager' },
    ];
  }

  if (normalizedRole.includes('urban') || normalizedRole.includes('planner')) {
    return [
      { id: '1', icon: '🏗️', text: "How will rainfall impact city drainage today?", roleCategory: 'Urban Planner' },
      { id: '2', icon: '🌡️', text: "Heat island risk assessment for today", roleCategory: 'Urban Planner' },
      { id: '3', icon: '🌬️', text: "Wind gust impact on high-rise structures", roleCategory: 'Urban Planner' },
    ];
  }

  // Default Citizen prompts
  return [
    { id: '1', icon: '🌧️', text: "Will it rain today in my area?", roleCategory: 'Citizen' },
    { id: '2', icon: '🚗', text: "Is it safe to travel today?", roleCategory: 'Citizen' },
    { id: '3', icon: '☔', text: "Should I carry an umbrella tonight?", roleCategory: 'Citizen' },
    { id: '4', icon: '🌡️', text: "Is there a heatwave or extreme temp risk?", roleCategory: 'Citizen' },
    { id: '5', icon: '⚡', text: "Is there any severe weather near me?", roleCategory: 'Citizen' },
  ];
};

export const chatService = {
  // Fetch all active conversations for user
  async fetchConversations(userId: string): Promise<Conversation[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select('*')
          .eq('user_id', userId)
          .is('deleted_at', null)
          .order('updated_at', { ascending: false });

        if (!error && data) {
          return data.map((item) => ({
            id: item.id,
            userId: item.user_id,
            title: item.title,
            role: item.role,
            locationName: item.location_name,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            deletedAt: item.deleted_at,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetchConversations fallback:', err);
      }
    }

    return getLocalConversations(userId);
  },

  // Create new empty conversation
  async createConversation(
    userId: string,
    role: string,
    locationName: string,
    initialTitle: string = 'New Conversation'
  ): Promise<Conversation> {
    const newConv: Conversation = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `conv_${Date.now()}`,
      userId,
      title: initialTitle,
      role,
      locationName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .insert({
            user_id: userId,
            title: initialTitle,
            role,
            location_name: locationName,
          })
          .select()
          .single();

        if (!error && data) {
          return {
            id: data.id,
            userId: data.user_id,
            title: data.title,
            role: data.role,
            locationName: data.location_name,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
        }
      } catch (err) {
        console.warn('Supabase createConversation fallback:', err);
      }
    }

    const localList = getLocalConversations(userId);
    const updated = [newConv, ...localList];
    saveLocalConversations(userId, updated);
    return newConv;
  },

  // Fetch messages for a conversation
  async fetchMessages(conversationId: string): Promise<ChatMessage[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (!error && data) {
          return data.map((m) => ({
            id: m.id,
            conversationId: m.conversation_id,
            userId: m.user_id,
            sender: m.role as any,
            text: m.content,
            timestamp: m.created_at,
            weatherData: m.weather_data,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetchMessages fallback:', err);
      }
    }

    return getLocalMessages(conversationId);
  },

  // Send message and get mock AI response
  async sendMessage(
    conversationId: string,
    userId: string,
    content: string,
    role: string,
    locationName: string
  ): Promise<{ userMessage: ChatMessage; assistantMessage: ChatMessage; updatedTitle?: string }> {
    const userMsgId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `msg_u_${Date.now()}`;
    const nowIso = new Date().toISOString();

    const userMessage: ChatMessage = {
      id: userMsgId,
      conversationId,
      userId,
      sender: 'user',
      text: content,
      timestamp: nowIso,
    };

    // Save user message to Supabase if available
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('messages').insert({
          id: userMsgId,
          conversation_id: conversationId,
          user_id: userId,
          role: 'user',
          content: content,
        });
      } catch (e) {
        // Fallback
      }
    }

    // Save to local storage
    const currentMsgs = getLocalMessages(conversationId);
    let updatedMsgs = [...currentMsgs, userMessage];
    saveLocalMessages(conversationId, updatedMsgs);

    // Auto Title Generation if title is 'New Conversation' or first message
    let updatedTitle: string | undefined = undefined;
    const conversations = getLocalConversations(userId);
    const targetConv = conversations.find((c) => c.id === conversationId);

    if (targetConv && (targetConv.title === 'New Conversation' || currentMsgs.length === 0)) {
      // Auto-generate summary title
      let snippet = content.slice(0, 30);
      if (content.toLowerCase().includes('rain')) snippet = `🌧 Rain forecast – ${locationName.split(',')[0]}`;
      else if (content.toLowerCase().includes('fish') || content.toLowerCase().includes('wave')) snippet = `🌊 Marine weather – ${locationName.split(',')[0]}`;
      else if (content.toLowerCase().includes('farm') || content.toLowerCase().includes('irrigat')) snippet = `🌾 Farming advisory – ${locationName.split(',')[0]}`;
      else if (content.toLowerCase().includes('travel') || content.toLowerCase().includes('drive')) snippet = `🚗 Travel weather – ${locationName.split(',')[0]}`;
      else snippet = `${content.slice(0, 24)}...`;

      updatedTitle = snippet;
      this.renameConversation(conversationId, updatedTitle, userId);
    }

    // Build structured mock assistant weather response based on prompt context
    const assistantMsgId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `msg_a_${Date.now()}`;
    const assistantPayload = this.generateMockWeatherResponse(content, role, locationName);

    const assistantMessage: ChatMessage = {
      id: assistantMsgId,
      conversationId,
      userId,
      sender: 'assistant',
      text: assistantPayload.narrativeText,
      timestamp: new Date().toISOString(),
      weatherData: assistantPayload.weatherData,
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('messages').insert({
          id: assistantMsgId,
          conversation_id: conversationId,
          user_id: userId,
          role: 'assistant',
          content: assistantMessage.text,
          weather_data: assistantMessage.weatherData,
        });

        // Touch updated_at on conversation
        await supabase
          .from('conversations')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', conversationId);
      } catch (e) {
        // Fallback
      }
    }

    updatedMsgs = [...updatedMsgs, assistantMessage];
    saveLocalMessages(conversationId, updatedMsgs);

    return { userMessage, assistantMessage, updatedTitle };
  },

  // Rename conversation
  async renameConversation(conversationId: string, newTitle: string, userId: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('conversations')
          .update({ title: newTitle, updated_at: new Date().toISOString() })
          .eq('id', conversationId);
      } catch (e) {
        // Ignore
      }
    }

    const conversations = getLocalConversations(userId);
    const updated = conversations.map((c) =>
      c.id === conversationId ? { ...c, title: newTitle, updatedAt: new Date().toISOString() } : c
    );
    saveLocalConversations(userId, updated);
    return true;
  },

  // Soft delete conversation
  async deleteConversation(conversationId: string, userId: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('conversations')
          .update({ deleted_at: new Date().toISOString() })
          .eq('id', conversationId);
      } catch (e) {
        // Ignore
      }
    }

    const conversations = getLocalConversations(userId);
    const updated = conversations.filter((c) => c.id !== conversationId);
    saveLocalConversations(userId, updated);
    return true;
  },

  // Search conversations by query
  async searchConversations(userId: string, query: string): Promise<Conversation[]> {
    const all = await this.fetchConversations(userId);
    if (!query.trim()) return all;

    const q = query.toLowerCase();
    return all.filter((c) => c.title.toLowerCase().includes(q));
  },

  // Mock Weather AI Response Generator
  generateMockWeatherResponse(
    query: string,
    role: string,
    locationName: string
  ): { narrativeText: string; weatherData: WeatherDataPayload } {
    const q = query.toLowerCase();
    const city = locationName.split(',')[0] || 'your area';

    if (q.includes('rain') || q.includes('umbrella') || q.includes('shower')) {
      return {
        narrativeText: `🌧 Rain is likely today in ${city}.\n\nThere is approximately a 72% chance of rainfall, with the highest probability concentrated between 4 PM and 7 PM.`,
        weatherData: {
          rainProbability: 72,
          tempC: 25,
          condition: 'Moderate Thunderstorms',
          timeWindow: '4 PM – 7 PM',
          windSpeedKmH: 24,
          humidityPct: 78,
          locationName,
          confidenceScore: 84,
          sources: ['IMD Regional Model', 'GFS Global Data'],
          isDemoData: true,
          advisory: {
            title: 'Rain Protection & Travel Advisory',
            advisoryText: `If you're traveling during this period in ${city}, carry rain protection and allow extra travel time due to waterlogging in low-lying roads.`,
            impactLevel: 'medium',
            actionableSteps: [
              'Carry waterproof rain gear or umbrella.',
              'Avoid low-lying underpasses between 4 PM - 7 PM.',
              'Drive carefully with headlights on during heavy downpours.',
            ],
          },
        },
      };
    }

    if (q.includes('farm') || q.includes('crop') || q.includes('irrigate') || q.includes('spray')) {
      return {
        narrativeText: `🌾 Agricultural Advisory for ${city}.\n\nSoil moisture levels are currently moderate. Light to moderate showers are forecasted over the next 24 to 36 hours.`,
        weatherData: {
          rainProbability: 65,
          tempC: 27,
          condition: 'Scattered Showers',
          timeWindow: 'Next 36 Hours',
          windSpeedKmH: 14,
          humidityPct: 82,
          locationName,
          confidenceScore: 88,
          sources: ['Agromet Advisory Service', 'GFS 0.25 Grid'],
          isDemoData: true,
          advisory: {
            title: 'Farm Irrigation & Spraying Notice',
            advisoryText: 'Postpone chemical spraying operations until Friday due to expected rain wash-off risk. Irrigation can be paused for 2 days.',
            impactLevel: 'low',
            actionableSteps: [
              'Pause field canal irrigation for 48 hours.',
              'Delay pesticide spraying to avoid chemical wash-off.',
              'Inspect field drainage channels for smooth runoff.',
            ],
          },
        },
      };
    }

    if (q.includes('fish') || q.includes('wave') || q.includes('sea') || q.includes('marine')) {
      return {
        narrativeText: `🎣 Marine & Coastal Forecast for ${city}.\n\nOffshore wave heights are predicted to range between 1.8m and 2.4m, accompanied by gusty winds up to 28 km/h.`,
        weatherData: {
          rainProbability: 40,
          tempC: 28,
          condition: 'Rough Sea Conditions',
          timeWindow: 'Next 24 Hours',
          windSpeedKmH: 28,
          humidityPct: 85,
          locationName,
          confidenceScore: 86,
          sources: ['INCOIS Marine Advisory', 'ECMWF Wave Model'],
          isDemoData: true,
          advisory: {
            title: 'Fisherfolk Safety Bulletin',
            advisoryText: 'Small fishing vessels are advised to exercise extreme caution when navigating deep offshore waters beyond 10 nautical miles.',
            impactLevel: 'high',
            actionableSteps: [
              'Small boat operations should stay within 5 nautical miles of shore.',
              'Check VHF radio channels & GPS distress beacons before departure.',
              'Return to harbor if wind gusts exceed 32 km/h.',
            ],
          },
        },
      };
    }

    // Default Weather AI response
    return {
      narrativeText: `🌤 Hyperlocal Weather Assessment for ${city}.\n\nCurrently experiencing pleasant conditions with mild cloud coverage. Temperatures will average around 26°C with light wind gusts.`,
      weatherData: {
        rainProbability: 20,
        tempC: 26,
        condition: 'Partly Cloudy',
        timeWindow: 'Today',
        windSpeedKmH: 16,
        humidityPct: 62,
        locationName,
        confidenceScore: 90,
        sources: ['WeatherGPT Ensemble System', 'Open Data Forecasts'],
        isDemoData: true,
        advisory: {
            title: 'General Weather Overview',
            advisoryText: 'Conditions are favorable for normal outdoor activities and travel throughout the day.',
            impactLevel: 'low',
            actionableSteps: [
              'Enjoy comfortable outdoor conditions.',
              'Stay hydrated during afternoon peak temperatures.',
            ],
          },
      },
    };
  },
};
