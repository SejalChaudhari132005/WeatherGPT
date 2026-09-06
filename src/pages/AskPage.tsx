import React from 'react';
import { AskWeatherGPTCard } from '../components/dashboard/AskWeatherGPTCard';

export const AskPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Conversational Atmospheric Intelligence</h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Ask WeatherGPT complex questions about rain probability, agriculture, sea conditions, travel, or climate anomalies.
        </p>
      </div>
      <AskWeatherGPTCard />
    </div>
  );
};
