import { CurrentWeather, HyperlocalRisk } from '../types/weather';
import { MOCK_CURRENT_WEATHER, MOCK_HYPERLOCAL_RISKS } from '../data/mockWeather';
import { UserLocation } from '../types/location';
import { ChatMessage } from '../types/chat';

export class WeatherService {
  /**
   * Returns current weather for the specified location (Mocked for Phase 1, ready for real API)
   */
  public async getCurrentWeather(location: UserLocation): Promise<CurrentWeather> {
    // In Phase 1, we add subtle location-derived variation so different cities feel distinct
    const hash = (location.city || 'Mumbai').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const tempOffset = (hash % 7) - 3; // -3 to +3 degrees variation

    return {
      ...MOCK_CURRENT_WEATHER,
      temperature: Math.max(18, Math.min(42, MOCK_CURRENT_WEATHER.temperature + tempOffset)),
      feelsLike: Math.max(20, Math.min(45, MOCK_CURRENT_WEATHER.feelsLike + tempOffset)),
      updatedAt: 'Updated 2 mins ago',
    };
  }

  /**
   * Returns hyperlocal risks around the user's GPS location
   */
  public async getHyperlocalRisks(location: UserLocation): Promise<HyperlocalRisk[]> {
    return MOCK_HYPERLOCAL_RISKS.map((risk: any, index: number) => {
      if (index === 0) {
        return {
          ...risk,
          areaName: `${location.city} Sector (Near ${location.district})`
        };
      }
      return risk;
    });
  }

  /**
   * Generates AI Conversational Weather answers with Explainable metadata
   */
  public async askWeatherGPT(question: string, location: UserLocation, role: string): Promise<ChatMessage> {
    const q = question.toLowerCase();
    let text = `Based on high-resolution radar and ensemble model feeds for ${location.city}, `;
    let explainSource = ['IMD High-Res Radar', 'GFS 0.25° Global Model', 'WeatherGPT Neural Downscaler'];

    if (q.includes('rain today') || q.includes('rain tonight') || q.includes('will it rain')) {
      text += `there is an **85% probability of heavy showers** between 2:00 PM and 5:00 PM today. Expected rainfall accumulation is around 45–60 mm. Outdoor activities should be completed before 1:30 PM.`;
    } else if (q.includes('travel') || q.includes('safe to travel')) {
      text += `transit along major corridors near ${location.city} is moderately safe right now, but **heavy rain and low visibility (<1.5 km)** are predicted during evening peak hours. Exercise extra caution on highway passes.`;
    } else if (q.includes('farm') || q.includes('crop') || role === 'Farmer') {
      text += `for farming operations near ${location.district}, heavy precipitation is imminent. **Postpone irrigation and chemical spraying** today to prevent fertilizer wash-off. Ensure field drainage channels are clear.`;
    } else if (q.includes('fish') || q.includes('sea') || role === 'Fisher') {
      text += `coastal waters off ${location.state} present **rough to very rough seas** with wave heights reaching 2.4 - 3.8 meters and wind gusts up to 55 km/h. **Sailing is NOT recommended** for small craft today.`;
    } else if (q.includes('flood') || q.includes('waterlog')) {
      text += `waterlogging risk is **HIGH** in low-lying underpasses and storm basins near ${location.city}. Moderate to severe street runoff is expected during the 3 PM convective peak.`;
    } else {
      text += `current temperature is **${MOCK_CURRENT_WEATHER.temperature}°C** (feels like ${MOCK_CURRENT_WEATHER.feelsLike}°C) with **78% humidity**. Rain cell development is active in the surrounding 25 km quadrant.`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      explainable: {
        sources: explainSource,
        confidenceScore: 84 + (q.length % 12),
        resolution: '1 km Grid Mesh',
        updatedAt: 'Live (Demo Feed)',
        rationale: `Ensemble consensus combining Doppler radar reflectivity (>42 dBZ) and humidity convergence indices over ${location.city}.`
      },
      suggestedFollowups: [
        'What-If rain continues for 4 hours?',
        `Show 7-day forecast for ${location.city}`,
        'Check route weather to nearest major city',
        'Explain in Marathi'
      ]
    };
  }
}

export const weatherService = new WeatherService();
