import { FarmerAdvisoryData, FisherAdvisoryData, TravelRoutePoint } from '../types/role';

export const MOCK_FARMER_ADVISORY: FarmerAdvisoryData = {
  crop: 'Cotton / Kharif Crops',
  rainOutlook: 'Heavy showers expected between 2 PM and 5 PM today (40-60mm).',
  irrigationRecommendation: 'Postpone irrigation today. Natural rainfall is sufficient for soil root zone.',
  sprayingWindow: 'Avoid pesticide / fertilizer application for the next 24 hours to prevent runoff losses.',
  diseaseRisk: 'Fungal leaf blight risk elevated due to high ambient humidity (78%).',
  diseaseRiskLevel: 'HIGH',
  soilMoisture: '84% (Adequate to Surplus)',
  marathiSummary: 'आज दुपारी २ ते ५ दरम्यान मुसळधार पावसाची शक्यता आहे. शेतात पाणी साचणार नाही याची काळजी घ्या आणि खत फवारणी थांबवा.',
  hindiSummary: 'आज दोपहर 2 से 5 बजे के बीच भारी बारिश की संभावना है। सिंचाई स्थगित करें और कीटनाशक छिड़काव रोकें।'
};

export const MOCK_FISHER_ADVISORY: FisherAdvisoryData = {
  waveHeight: '2.4 - 3.8 Meters',
  windSpeed: '28 - 42 km/h (Gusts up to 55 km/h)',
  visibility: 'Poor (3-5 km in rain squalls)',
  seaCondition: 'Rough to Very Rough',
  sailingRisk: 'DANGER',
  safeWindow: 'Unsafe for small vessel navigation until tomorrow 08:00 AM.',
  highTideTime: '03:45 PM (4.2 meters High Tide)'
};

export const MOCK_TRAVEL_ROUTE: TravelRoutePoint[] = [
  {
    name: 'Mumbai Departure',
    condition: 'Partly Cloudy',
    temp: 29,
    rainRisk: 'LOW',
    visibility: '8 km',
    wind: '14 km/h'
  },
  {
    name: 'Lonavala Ghat Pass',
    condition: 'Heavy Fog & Downpour',
    temp: 22,
    rainRisk: 'HIGH',
    visibility: '1.2 km',
    wind: '32 km/h',
    hasWarning: true,
    warningText: 'Landslide alert on ghat sections. Drive with fog lights.'
  },
  {
    name: 'Khandala Corridor',
    condition: 'Moderate Rain',
    temp: 24,
    rainRisk: 'MEDIUM',
    visibility: '4 km',
    wind: '22 km/h'
  },
  {
    name: 'Pune Destination',
    condition: 'Overcast / Mild Drizzle',
    temp: 27,
    rainRisk: 'LOW',
    visibility: '7 km',
    wind: '16 km/h'
  }
];
