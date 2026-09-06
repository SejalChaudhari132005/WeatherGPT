import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Clock, Activity, Layers, ShieldCheck } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { DemoBadge } from '../common/DemoBadge';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const MobileRadarMapScreen: React.FC = () => {
  const { userLocation } = useWeather();
  const [activeFilter, setActiveFilter] = useState<'recent' | 'm5' | 'felt'>('recent');

  const lat = userLocation?.latitude || 19.076;
  const lng = userLocation?.longitude || 72.8777;
  const locationName = userLocation?.city || 'Karangploso, Malang';

  return (
    <div className="relative min-h-[750px] w-full flex flex-col justify-between overflow-hidden">
      {/* Top Map Overlay Filter Pills */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveFilter('recent')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold shadow-md backdrop-blur-md border transition-all cursor-pointer ${
            activeFilter === 'recent'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white/90 text-slate-700 border-white'
          }`}
        >
          Recent
        </button>

        <button
          onClick={() => setActiveFilter('m5')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold shadow-md backdrop-blur-md border transition-all cursor-pointer ${
            activeFilter === 'm5'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white/90 text-slate-700 border-white'
          }`}
        >
          M ≥ 5
        </button>

        <button
          onClick={() => setActiveFilter('felt')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold shadow-md backdrop-blur-md border transition-all cursor-pointer ${
            activeFilter === 'felt'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white/90 text-slate-700 border-white'
          }`}
        >
          Felt
        </button>
      </div>

      {/* Interactive Map View */}
      <div className="h-[480px] w-full relative z-1">
        <MapContainer
          key={`${lat}-${lng}`}
          center={[lat, lng]}
          zoom={9}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[lat, lng]} icon={markerIcon}>
            <Popup>
              <div className="text-xs font-bold">
                📍 {locationName}<br />
                <span className="text-sky-600">Detected User GPS</span>
              </div>
            </Popup>
          </Marker>

          <Circle
            center={[lat + 0.05, lng + 0.04]}
            radius={18000}
            pathOptions={{
              color: '#e11d48',
              fillColor: '#fda4af',
              fillOpacity: 0.4,
              weight: 2
            }}
          />
        </MapContainer>
      </div>

      {/* Bottom Floating Info Card Sheet (Screen 3 Design) */}
      <div className="relative z-[1000] p-4 space-y-3 bg-[#F4F7FC]">
        {/* Top 3 Stats Pill Box */}
        <div className="p-3.5 rounded-3xl bg-white shadow-lg border border-slate-200/80 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="flex justify-center text-sky-600 mb-0.5"><Clock className="w-4 h-4" /></div>
            <div className="text-xs font-black text-slate-900">Today</div>
            <div className="text-[9px] text-slate-400 font-semibold">09:41 WIB</div>
          </div>

          <div className="border-x border-slate-100">
            <div className="flex justify-center text-rose-600 mb-0.5"><Activity className="w-4 h-4" /></div>
            <div className="text-xs font-black text-slate-900">4.0 SR</div>
            <div className="text-[9px] text-slate-400 font-semibold">Magnitude</div>
          </div>

          <div>
            <div className="flex justify-center text-emerald-600 mb-0.5"><Layers className="w-4 h-4" /></div>
            <div className="text-xs font-black text-slate-900">10 km</div>
            <div className="text-[9px] text-slate-400 font-semibold">Depth</div>
          </div>
        </div>

        {/* Location Details Sheet */}
        <div className="p-4 rounded-3xl bg-white shadow-md border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Earthquake Location</h4>
            <DemoBadge label="REALTIME MAP" variant="blue" />
          </div>

          <div className="space-y-1.5 text-xs text-slate-700 font-semibold pt-1">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>Epicenter at sea 21 km northeast of {locationName}</span>
            </div>

            <div className="flex items-start gap-2 text-slate-500">
              <span className="text-amber-500 font-bold shrink-0">🎯</span>
              <span>8.25 South Latitude - 116.00 East Longitude</span>
            </div>

            <div className="flex items-start gap-2 text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Felt by region (MMI Scale): {locationName}, Coastal Sector</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
