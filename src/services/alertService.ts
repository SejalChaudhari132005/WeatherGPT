import { WeatherAlert, ProactiveNotice } from '../types/alert';
import { MOCK_ALERTS, MOCK_PROACTIVE_NOTICE } from '../data/mockWeather';

export class AlertService {
  public async getActiveAlerts(): Promise<WeatherAlert[]> {
    return MOCK_ALERTS;
  }

  public async getProactiveNotice(): Promise<ProactiveNotice> {
    return MOCK_PROACTIVE_NOTICE;
  }
}

export const alertService = new AlertService();
