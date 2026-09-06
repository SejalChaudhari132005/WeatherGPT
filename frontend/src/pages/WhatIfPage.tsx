import React from 'react';
import { WhatIfSimulator } from '../components/whatif/WhatIfSimulator';

export const WhatIfPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <WhatIfSimulator />
    </div>
  );
};
