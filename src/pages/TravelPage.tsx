import React from 'react';
import { RouteWeatherCard } from '../components/travel/RouteWeatherCard';

export const TravelPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <RouteWeatherCard />
    </div>
  );
};
