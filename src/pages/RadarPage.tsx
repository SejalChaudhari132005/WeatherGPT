import React from 'react';
import { RadarMap } from '../components/radar/RadarMap';

export const RadarPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-left">
        <h1 className="text-2xl font-extrabold text-slate-900">Live Weather Radar & Precipitation Telemetry</h1>
        <p className="text-xs text-slate-500">Doppler radar echoes, satellite cloud cover & wind vectors</p>
      </div>
      <RadarMap />
    </div>
  );
};
