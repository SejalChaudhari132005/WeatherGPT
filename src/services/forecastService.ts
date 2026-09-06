import { HourlyForecast, DailyForecast } from '../types/weather';
import { MOCK_HOURLY_FORECAST, MOCK_DAILY_FORECAST } from '../data/mockWeather';

export class ForecastService {
  public async getHourlyForecast(): Promise<HourlyForecast[]> {
    return MOCK_HOURLY_FORECAST;
  }

  public async getSevenDayForecast(): Promise<DailyForecast[]> {
    return MOCK_DAILY_FORECAST;
  }
}

export const forecastService = new ForecastService();
