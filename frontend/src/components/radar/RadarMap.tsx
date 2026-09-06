import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { RadarControls } from './RadarControls';
import { DemoBadge } from '../common/DemoBadge';
import { useWeather } from '../../context/WeatherContext';
import { Radar } from 'lucide-react';

// Custom Leaflet Pin Icon
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const RadarMap: React.FC = () => {
  const { userLocation } = useWeather();
  const [activeLayer, setActiveLayer] = useState<'rain' | 'cloud' | 'wind' | 'lightning' | 'temperature'>('rain');
  const [activeTimelineIndex, setActiveTimelineIndex] = useState<number>(4);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Default to User GPS or fallback
  const lat = userLocation?.latitude || 19.076;
  const lng = userLocation?.longitude || 72.8777;
  const cityName = userLocation?.city || 'Mumbai';

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveTimelineIndex((prev) => (prev + 1) % 7);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
            <Radar className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Live Weather Radar & Satellite</h3>
            <p className="text-xs text-slate-500">Center: {cityName} ({lat.toFixed(3)}°, {lng.toFixed(3)}°)</p>
          </div>
        </div>

        <DemoBadge label="DEMO DATA" variant="amber" />
      </div>

      {/* Map Container */}
      <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
        <MapContainer
          key={`${lat}-${lng}`}
          center={[lat, lng]}
          zoom={10}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Marker */}
          <Marker position={[lat, lng]} icon={markerIcon}>
            <Popup>
              <div className="text-xs font-bold">
                📍 {cityName} Sector<br />
                <span className="text-sky-600 font-medium">Detected User Location</span>
              </div>
            </Popup>
          </Marker>

          {/* Simulated Rain/Radar Convective Cell Circle */}
          <Circle
            center={[lat + 0.04, lng + 0.03]}
            radius={14000 + (activeTimelineIndex * 1500)}
            pathOptions={{
              color: activeLayer === 'rain' ? '#0284c7' : activeLayer === 'lightning' ? '#a855f7' : '#f59e0b',
              fillColor: activeLayer === 'rain' ? '#38bdf8' : activeLayer === 'lightning' ? '#c084fc' : '#fbbf24',
              fillOpacity: 0.35 + (activeTimelineIndex * 0.05),
              weight: 2
            }}
          />

          <Circle
            center={[lat - 0.03, lng - 0.02]}
            radius={8000}
            pathOptions={{
              color: '#e11d48',
              fillColor: '#fda4af',
              fillOpacity: 0.3,
              weight: 1.5
            }}
          />
        </MapContainer>

        {/* Map Overlay Watermark Banner */}
        <div className="absolute top-3 right-3 z-[1000] pointer-events-none">
          <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold tracking-wider rounded-xl uppercase border border-white/20 shadow-md">
            {activeLayer.toUpperCase()} LAYER • SIMULATED RADAR
          </span>
        </div>
      </div>

      {/* Controls */}
      <RadarControls
        activeLayer={activeLayer}
        setActiveLayer={setActiveLayer}
        activeTimelineIndex={activeTimelineIndex}
        setActiveTimelineIndex={setActiveTimelineIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};
