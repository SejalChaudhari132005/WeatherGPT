export interface RadarLayer {
  id: 'rain' | 'cloud' | 'wind' | 'lightning' | 'temperature';
  label: string;
  unit: string;
}

export const RADAR_LAYERS: RadarLayer[] = [
  { id: 'rain', label: 'Precipitation Radar', unit: 'mm/h' },
  { id: 'cloud', label: 'Cloud Satellite Cover', unit: '%' },
  { id: 'wind', label: 'Wind Vector Vectors', unit: 'km/h' },
  { id: 'lightning', label: 'Lightning Strikes', unit: 'strikes/min' },
  { id: 'temperature', label: 'Thermal Surface Map', unit: '°C' },
];

export const TIMELINE_SLOTS = ['10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM (Now)', '+15 Min', '+30 Min'];

export class RadarService {
  public getLayers(): RadarLayer[] {
    return RADAR_LAYERS;
  }
}

export const radarService = new RadarService();
