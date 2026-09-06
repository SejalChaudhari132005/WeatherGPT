import { MOCK_CLIMATE_TRENDS, MOCK_CLIMATE_METRICS } from '../data/mockClimate';

export class ClimateService {
  public async getHistoricalTrends() {
    return MOCK_CLIMATE_TRENDS;
  }

  public async getClimateSummary() {
    return MOCK_CLIMATE_METRICS;
  }
}

export const climateService = new ClimateService();
