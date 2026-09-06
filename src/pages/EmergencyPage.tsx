import React from 'react';
import { EmergencyModeScreen } from '../components/alerts/EmergencyModeScreen';

export const EmergencyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-4">
      <EmergencyModeScreen />
    </div>
  );
};
