import { supabase } from "../lib/supabase";
import {
  Conversation,
  ChatMessage,
  PromptSuggestion,
  WeatherDataPayload,
} from "../types/chat";

/**
 * Role-based suggested prompts
 */
export const getSuggestedPromptsByRole = (
  role: string
): PromptSuggestion[] => {
  const normalizedRole = (role || "citizen").toLowerCase();

  if (normalizedRole.includes("farmer")) {
    return [
      {
        id: "1",
        icon: "🌾",
        text: "Should I irrigate today?",
        roleCategory: "Farmer",
      },
      {
        id: "2",
        icon: "🌧️",
        text: "Will rain affect my crop this week?",
        roleCategory: "Farmer",
      },
      {
        id: "3",
        icon: "🌱",
        text: "Is tomorrow suitable for spraying?",
        roleCategory: "Farmer",
      },
      {
        id: "4",
        icon: "🌡️",
        text: "What is the soil temperature & moisture outlook?",
        roleCategory: "Farmer",
      },
    ];
  }

  if (
    normalizedRole.includes("fisher") ||
    normalizedRole.includes("marine")
  ) {
    return [
      {
        id: "1",
        icon: "🎣",
        text: "Is it safe to go fishing tomorrow?",
        roleCategory: "Fisherfolk",
      },
      {
        id: "2",
        icon: "🌊",
        text: "What are the wave height & swell conditions?",
        roleCategory: "Fisherfolk",
      },
      {
        id: "3",
        icon: "🌬️",
        text: "What will coastal wind speed be at sea?",
        roleCategory: "Fisherfolk",
      },
      {
        id: "4",
        icon: "⚡",
        text: "Are there thunderstorm risks offshore?",
        roleCategory: "Fisherfolk",
      },
    ];
  }

  if (
    normalizedRole.includes("disaster") ||
    normalizedRole.includes("emergency")
  ) {
    return [
      {
        id: "1",
        icon: "🚨",
        text: "What areas are at severe weather risk?",
        roleCategory: "Disaster Manager",
      },
      {
        id: "2",
        icon: "🌊",
        text: "Where is urban flooding likely in my zone?",
        roleCategory: "Disaster Manager",
      },
      {
        id: "3",
        icon: "📍",
        text: "Show high-risk storm & wind locations",
        roleCategory: "Disaster Manager",
      },
      {
        id: "4",
        icon: "⛈️",
        text: "Any severe lightning advisories near me?",
        roleCategory: "Disaster Manager",
      },
    ];
  }

  if (
    normalizedRole.includes("urban") ||
    normalizedRole.includes("planner")
  ) {
    return [
      {
        id: "1",
        icon: "🏗️",
        text: "How will rainfall impact city drainage today?",
        roleCategory: "Urban Planner",
      },
      {
        id: "2",
        icon: "🌡️",
        text: "Heat island risk assessment for today",
        roleCategory: "Urban Planner",
      },
      {
        id: "3",
        icon: "🌬️",
        text: "Wind gust impact on high-rise structures",
        roleCategory: "Urban Planner",
      },
    ];
  }

  return [
    {
      id: "1",
      icon: "🌧️",
      text: "Will it rain today in my area?",
      roleCategory: "Citizen",
    },
    {
      id: "2",
      icon: "🚗",
      text: "Is it safe to travel today?",
      roleCategory: "Citizen",
    },
    {
      id: "3",
      icon: "☔",
      text: "Should I carry an umbrella tonight?",
      roleCategory: "Citizen",
    },
    {
      id: "4",
      icon: "🌡️",
      text: "Is there a heatwave or extreme temp risk?",
      roleCategory: "Citizen",
    },
    {
      id: "5",
      icon: "⚡",
      text: "Is there any severe weather near me?",
      roleCategory: "Citizen",
    },
  ];
};

export const chatService = {
  /**
   * Fetch conversations for authenticated user
   */
  async fetchConversations(
    userId: string
  ): Promise<Conversation[]> {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User is not authenticated.");
      }

      if (user.id !== userId) {
        throw new Error("Unauthorized user.");
      }

      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .is("deleted_at", null)
        .order("updated_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      return (data || []).map((item) => ({
        id: item.id,
        userId: item.user_id,
        title: item.title,
        role: item.role,
        locationName: item.location_name,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        deletedAt: item.deleted_at,
      }));
    } catch (error) {
      console.error(
        "Error fetching conversations:",
        error
      );

      throw error;
    }
  },

  /**
   * Create a new conversation
   */
  async createConversation(
    userId: string,
    role: string,
    locationName: string,
    initialTitle: string = "New Conversation"
  ): Promise<Conversation> {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User is not authenticated.");
      }

      if (user.id !== userId) {
        throw new Error("Unauthorized user.");
      }

      const { data, error } = await supabase
        .from("conversations")
        .insert({
          user_id: user.id,
          title: initialTitle,
          role,
          location_name: locationName,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        id: data.id,
        userId: data.user_id,
        title: data.title,
        role: data.role,
        locationName: data.location_name,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        deletedAt: data.deleted_at ?? null,
      };
    } catch (error) {
      console.error(
        "Error creating conversation:",
        error
      );

      throw error;
    }
  },

  /**
   * Fetch messages for a conversation
   */
  async fetchMessages(
    conversationId: string
  ): Promise<ChatMessage[]> {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User is not authenticated.");
      }

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: true,
        });

      if (error) {
        throw error;
      }

      return (data || []).map((message) => ({
        id: message.id,
        conversationId: message.conversation_id,
        userId: message.user_id,
        sender: message.role as ChatMessage["sender"],
        text: message.content,
        timestamp: message.created_at,
        weatherData: message.weather_data,
      }));
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error
      );

      throw error;
    }
  },

  /**
   * Send a message.
   *
   * NOTE:
   * This currently uses the existing mock weather-response
   * generator. Replace this section with the FastAPI AI
   * endpoint once the backend chat API is ready.
   */
  async sendMessage(
    conversationId: string,
    userId: string,
    content: string,
    role: string,
    locationName: string
  ): Promise<{
    userMessage: ChatMessage;
    assistantMessage: ChatMessage;
    updatedTitle?: string;
  }> {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User is not authenticated.");
      }

      if (user.id !== userId) {
        throw new Error("Unauthorized user.");
      }

      const userMessage: ChatMessage = {
        id:
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : `msg_u_${Date.now()}`,
        conversationId,
        userId: user.id,
        sender: "user",
        text: content,
        timestamp: new Date().toISOString(),
      };

      const { error: userMessageError } =
        await supabase.from("messages").insert({
          id: userMessage.id,
          conversation_id: conversationId,
          user_id: user.id,
          role: "user",
          content,
        });

      if (userMessageError) {
        throw userMessageError;
      }

      let updatedTitle: string | undefined;

      const { data: conversation } =
        await supabase
          .from("conversations")
          .select("title")
          .eq("id", conversationId)
          .eq("user_id", user.id)
          .single();

      if (
        conversation?.title === "New Conversation"
      ) {
        let title = content.slice(0, 30);

        if (
          content
            .toLowerCase()
            .includes("rain")
        ) {
          title = `🌧 Rain forecast – ${
            locationName.split(",")[0]
          }`;
        } else if (
          content
            .toLowerCase()
            .includes("fish") ||
          content
            .toLowerCase()
            .includes("wave")
        ) {
          title = `🌊 Marine weather – ${
            locationName.split(",")[0]
          }`;
        } else if (
          content
            .toLowerCase()
            .includes("farm") ||
          content
            .toLowerCase()
            .includes("irrigat")
        ) {
          title = `🌾 Farming advisory – ${
            locationName.split(",")[0]
          }`;
        } else if (
          content
            .toLowerCase()
            .includes("travel") ||
          content
            .toLowerCase()
            .includes("drive")
        ) {
          title = `🚗 Travel weather – ${
            locationName.split(",")[0]
          }`;
        }

        updatedTitle = title;

        await supabase
          .from("conversations")
          .update({
            title,
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", conversationId)
          .eq("user_id", user.id);
      }

      /*
       * EXISTING DEMO RESPONSE
       *
       * Keep this temporarily until the FastAPI
       * chat/AI endpoint is implemented.
       */
      const assistantPayload =
        this.generateMockWeatherResponse(
          content,
          role,
          locationName
        );

      const assistantMessage: ChatMessage = {
        id:
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : `msg_a_${Date.now()}`,
        conversationId,
        userId: user.id,
        sender: "assistant",
        text: assistantPayload.narrativeText,
        timestamp: new Date().toISOString(),
        weatherData:
          assistantPayload.weatherData,
      };

      const { error: assistantError } =
        await supabase.from("messages").insert({
          id: assistantMessage.id,
          conversation_id: conversationId,
          user_id: user.id,
          role: "assistant",
          content: assistantMessage.text,
          weather_data:
            assistantMessage.weatherData,
        });

      if (assistantError) {
        throw assistantError;
      }

      await supabase
        .from("conversations")
        .update({
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", conversationId)
        .eq("user_id", user.id);

      return {
        userMessage,
        assistantMessage,
        updatedTitle,
      };
    } catch (error) {
      console.error(
        "Error sending message:",
        error
      );

      throw error;
    }
  },

  /**
   * Rename conversation
   */
  async renameConversation(
    conversationId: string,
    newTitle: string,
    userId: string
  ): Promise<boolean> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.id !== userId) {
        throw new Error("Unauthorized user.");
      }

      const { error } = await supabase
        .from("conversations")
        .update({
          title: newTitle,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", conversationId)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error(
        "Error renaming conversation:",
        error
      );

      return false;
    }
  },

  /**
   * Soft delete conversation
   */
  async deleteConversation(
    conversationId: string,
    userId: string
  ): Promise<boolean> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.id !== userId) {
        throw new Error("Unauthorized user.");
      }

      const { error } = await supabase
        .from("conversations")
        .update({
          deleted_at:
            new Date().toISOString(),
        })
        .eq("id", conversationId)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error(
        "Error deleting conversation:",
        error
      );

      return false;
    }
  },

  /**
   * Search conversations
   */
  async searchConversations(
    userId: string,
    query: string
  ): Promise<Conversation[]> {
    const conversations =
      await this.fetchConversations(userId);

    if (!query.trim()) {
      return conversations;
    }

    const normalizedQuery =
      query.toLowerCase();

    return conversations.filter((conversation) =>
      conversation.title
        .toLowerCase()
        .includes(normalizedQuery)
    );
  },

  /**
   * Temporary demo weather response.
   *
   * Replace with FastAPI/AI response later.
   */
  generateMockWeatherResponse(
    query: string,
    role: string,
    locationName: string
  ): {
    narrativeText: string;
    weatherData: WeatherDataPayload;
  } {
    const q = query.toLowerCase();

    const city =
      locationName.split(",")[0] ||
      "your area";

    if (
      q.includes("rain") ||
      q.includes("umbrella") ||
      q.includes("shower")
    ) {
      return {
        narrativeText: `🌧 Rain is likely today in ${city}.\n\nThere is approximately a 72% chance of rainfall, with the highest probability concentrated between 4 PM and 7 PM.`,
        weatherData: {
          rainProbability: 72,
          tempC: 25,
          condition: "Moderate Thunderstorms",
          timeWindow: "4 PM – 7 PM",
          windSpeedKmH: 24,
          humidityPct: 78,
          locationName,
          confidenceScore: 84,
          sources: [
            "IMD Regional Model",
            "GFS Global Data",
          ],
          isDemoData: true,
          advisory: {
            title:
              "Rain Protection & Travel Advisory",
            advisoryText: `If you're traveling during this period in ${city}, carry rain protection and allow extra travel time due to waterlogging in low-lying roads.`,
            impactLevel: "medium",
            actionableSteps: [
              "Carry waterproof rain gear or umbrella.",
              "Avoid low-lying underpasses between 4 PM - 7 PM.",
              "Drive carefully with headlights on during heavy downpours.",
            ],
          },
        },
      };
    }

    if (
      q.includes("farm") ||
      q.includes("crop") ||
      q.includes("irrigate") ||
      q.includes("spray")
    ) {
      return {
        narrativeText: `🌾 Agricultural Advisory for ${city}.\n\nSoil moisture levels are currently moderate. Light to moderate showers are forecasted over the next 24 to 36 hours.`,
        weatherData: {
          rainProbability: 65,
          tempC: 27,
          condition: "Scattered Showers",
          timeWindow: "Next 36 Hours",
          windSpeedKmH: 14,
          humidityPct: 82,
          locationName,
          confidenceScore: 88,
          sources: [
            "Agromet Advisory Service",
            "GFS 0.25 Grid",
          ],
          isDemoData: true,
          advisory: {
            title:
              "Farm Irrigation & Spraying Notice",
            advisoryText:
              "Postpone chemical spraying operations until Friday due to expected rain wash-off risk. Irrigation can be paused for 2 days.",
            impactLevel: "low",
            actionableSteps: [
              "Pause field canal irrigation for 48 hours.",
              "Delay pesticide spraying to avoid chemical wash-off.",
              "Inspect field drainage channels for smooth runoff.",
            ],
          },
        },
      };
    }

    if (
      q.includes("fish") ||
      q.includes("wave") ||
      q.includes("sea") ||
      q.includes("marine")
    ) {
      return {
        narrativeText: `🎣 Marine & Coastal Forecast for ${city}.\n\nOffshore wave heights are predicted to range between 1.8m and 2.4m, accompanied by gusty winds up to 28 km/h.`,
        weatherData: {
          rainProbability: 40,
          tempC: 28,
          condition: "Rough Sea Conditions",
          timeWindow: "Next 24 Hours",
          windSpeedKmH: 28,
          humidityPct: 85,
          locationName,
          confidenceScore: 86,
          sources: [
            "INCOIS Marine Advisory",
            "ECMWF Wave Model",
          ],
          isDemoData: true,
          advisory: {
            title:
              "Fisherfolk Safety Bulletin",
            advisoryText:
              "Small fishing vessels are advised to exercise extreme caution when navigating deep offshore waters beyond 10 nautical miles.",
            impactLevel: "high",
            actionableSteps: [
              "Small boat operations should stay within 5 nautical miles of shore.",
              "Check VHF radio channels & GPS distress beacons before departure.",
              "Return to harbor if wind gusts exceed 32 km/h.",
            ],
          },
        },
      };
    }

    return {
      narrativeText: `🌤 Hyperlocal Weather Assessment for ${city}.\n\nCurrently experiencing pleasant conditions with mild cloud coverage. Temperatures will average around 26°C with light wind gusts.`,
      weatherData: {
        rainProbability: 20,
        tempC: 26,
        condition: "Partly Cloudy",
        timeWindow: "Today",
        windSpeedKmH: 16,
        humidityPct: 62,
        locationName,
        confidenceScore: 90,
        sources: [
          "WeatherGPT Ensemble System",
          "Open Data Forecasts",
        ],
        isDemoData: true,
        advisory: {
          title:
            "General Weather Overview",
          advisoryText:
            "Conditions are favorable for normal outdoor activities and travel throughout the day.",
          impactLevel: "low",
          actionableSteps: [
            "Enjoy comfortable outdoor conditions.",
            "Stay hydrated during afternoon peak temperatures.",
          ],
        },
      },
    };
  },
};