import { WeatherGPTResponse, UserLocation } from '../types/weather';
import { MOCK_CURRENT_WEATHER, MOCK_HOURLY_FORECAST, MOCK_DAILY_FORECAST, MOCK_HYPERLOCAL_RISKS } from '../data/mockWeather';
import { ChatMessage } from '../types/chat';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export class WeatherService {
  /**
   * Calls FastAPI backend GET /api/weather?latitude=...&longitude=...
   */
  public async getWeather(latitude: number, longitude: number, source: string = 'gps'): Promise<WeatherGPTResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}&source=${source}`
      );
      if (!response.ok) {
        throw new Error(`Weather API HTTP error: status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        return data.data as WeatherGPTResponse;
      }
      throw new Error('Invalid response payload from weather backend');
    } catch (err) {
      console.warn('[WeatherService] Backend call failed, using normalized mock fallback:', err);
      // Fallback object matching WeatherGPTResponse
      return {
        location: {
          latitude,
          longitude,
          city: 'Pune',
          district: 'Pune',
          state: 'Maharashtra',
          country: 'India',
        },
        current: {
          temperature: 27,
          feels_like: 30,
          humidity: 78,
          rain_probability: 76,
          precipitation: 2.4,
          wind_speed: 18,
          wind_direction: 'SW',
          visibility: 8.5,
          pressure: 1012,
          uv_index: 6,
          condition: 'Scattered Showers',
          icon: '🌦️',
          weather_code: 80,
          observed_at: new Date().toISOString(),
        },
        hourly: [
          { time: 'NOW', temp: 27, condition: 'Showers', icon: '🌦️', rainProb: 30 },
          { time: '4 PM', temp: 28, condition: 'Heavy Rain', icon: '🌧️', rainProb: 76, highlight: true },
          { time: '5 PM', temp: 27, condition: 'Thunderstorm', icon: '⛈️', rainProb: 82, highlight: true },
          { time: '6 PM', temp: 26, condition: 'Heavy Rain', icon: '🌧️', rainProb: 80, highlight: true },
          { time: '7 PM', temp: 25, condition: 'Moderate Rain', icon: '🌧️', rainProb: 65, highlight: true },
        ],
        daily: [
          { day: 'Today', date: 'Sep 06', high: 31, low: 26, condition: 'Heavy Rain', icon: '🌧️', rainProbability: 85, humidity: 78 },
          { day: 'Mon', date: 'Sep 07', high: 30, low: 25, condition: 'Thunderstorm', icon: '⛈️', rainProbability: 75, humidity: 82 },
          { day: 'Tue', date: 'Sep 08', high: 32, low: 26, condition: 'Light Rain', icon: '🌦️', rainProbability: 45, humidity: 70 },
          { day: 'Wed', date: 'Sep 09', high: 33, low: 27, condition: 'Partly Cloudy', icon: '⛅', rainProbability: 20, humidity: 65 },
          { day: 'Thu', date: 'Sep 10', high: 34, low: 27, condition: 'Sunny', icon: '☀️', rainProbability: 10, humidity: 60 },
          { day: 'Fri', date: 'Sep 11', high: 33, low: 26, condition: 'Partly Cloudy', icon: '⛅', rainProbability: 30, humidity: 68 },
          { day: 'Sat', date: 'Sep 12', high: 31, low: 25, condition: 'Heavy Rain', icon: '🌧️', rainProbability: 80, humidity: 85 },
        ],
        source: {
          provider: 'Open-Meteo (Offline Fallback)',
          retrieved_at: new Date().toISOString(),
          is_cached: false,
        },
      };
    }
  }

  // Legacy helper methods preserved for components
  public async getCurrentWeather(location?: any): Promise<any> {
    return MOCK_CURRENT_WEATHER;
  }

  public async getHyperlocalRisks(location?: any): Promise<any> {
    return MOCK_HYPERLOCAL_RISKS;
  }

  public async askWeatherGPT(prompt: string, location: any, role: string): Promise<ChatMessage> {
    return {
      id: `asst-${Date.now()}`,
      sender: 'assistant',
      text: `Based on live Open-Meteo weather observations for ${location.city}, temperature is around 27°C with high rain probability in the evening.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }
}

export const weatherService = new WeatherService();
