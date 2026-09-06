import React from 'react';
import { FarmerAdvisory } from '../components/roles/FarmerAdvisory';
import { FisherAdvisory } from '../components/roles/FisherAdvisory';
import { AviationDisasterAdvisory } from '../components/roles/AviationDisasterAdvisory';
import { RoleBasedAdvisoryCard } from '../components/dashboard/RoleBasedAdvisoryCard';
import { useWeather } from '../context/WeatherContext';

export const AdvisoriesPage: React.FC = () => {
  const { activeRole } = useWeather();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Sector-Specific Weather Advisories</h1>
        <p className="text-xs text-slate-500">Decisive operational weather guidance for Agriculture, Marine, Aviation & Emergency Response</p>
      </div>

      <RoleBasedAdvisoryCard />

      <FarmerAdvisory />
      <FisherAdvisory />
      <AviationDisasterAdvisory />
    </div>
  );
};
