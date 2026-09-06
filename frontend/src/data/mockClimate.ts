export interface ClimateTrendPoint {
  year: number;
  extremeRainfallDays: number;
  monsoonRainfallMm: number;
  heatwaveDays: number;
}

export const MOCK_CLIMATE_TRENDS: ClimateTrendPoint[] = [
  { year: 1980, extremeRainfallDays: 4, monsoonRainfallMm: 1850, heatwaveDays: 6 },
  { year: 1985, extremeRainfallDays: 5, monsoonRainfallMm: 1900, heatwaveDays: 7 },
  { year: 1990, extremeRainfallDays: 5, monsoonRainfallMm: 1820, heatwaveDays: 8 },
  { year: 1995, extremeRainfallDays: 6, monsoonRainfallMm: 1940, heatwaveDays: 9 },
  { year: 2000, extremeRainfallDays: 7, monsoonRainfallMm: 1980, heatwaveDays: 11 },
  { year: 2005, extremeRainfallDays: 9, monsoonRainfallMm: 2150, heatwaveDays: 13 },
  { year: 2010, extremeRainfallDays: 10, monsoonRainfallMm: 2020, heatwaveDays: 14 },
  { year: 2015, extremeRainfallDays: 11, monsoonRainfallMm: 2090, heatwaveDays: 17 },
  { year: 2020, extremeRainfallDays: 13, monsoonRainfallMm: 2210, heatwaveDays: 19 },
  { year: 2025, extremeRainfallDays: 15, monsoonRainfallMm: 2280, heatwaveDays: 22 }
];

export const MOCK_CLIMATE_METRICS = {
  extremeRainfallChange: '+18%',
  monsoonRainfallChange: '+7%',
  heatwaveDaysChange: '+23%',
  analysisText: 'Over the last 45 years (1980-2025), localized satellite and meteorological observations show a 18% increase in single-day extreme precipitation events (defined as >100mm in 24 hrs).'
};
