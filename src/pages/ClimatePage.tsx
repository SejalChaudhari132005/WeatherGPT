import React from 'react';
import { ClimateAnalytics } from '../components/climate/ClimateAnalytics';

export const ClimatePage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ClimateAnalytics />
    </div>
  );
};
