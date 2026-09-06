import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { UIProvider, useUI } from './context/UIContext';
import { WeatherProvider, useWeather } from './context/WeatherContext';

import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

import { WelcomeLocationModal } from './components/location/WelcomeLocationModal';
import { LocationSelectorModal } from './components/location/LocationSelectorModal';
import { VoiceModal } from './components/common/VoiceModal';
import { ExplainableAIModal } from './components/common/ExplainableAIModal';

import { DashboardPage } from './pages/DashboardPage';
import { AskPage } from './pages/AskPage';
import { RadarPage } from './pages/RadarPage';
import { AlertsPage } from './pages/AlertsPage';
import { AdvisoriesPage } from './pages/AdvisoriesPage';
import { ClimatePage } from './pages/ClimatePage';
import { WhatIfPage } from './pages/WhatIfPage';
import { TravelPage } from './pages/TravelPage';
import { EmergencyPage } from './pages/EmergencyPage';

const AppContent: React.FC = () => {
  const { activeTab, simpleMode, emergencyMode, sidebarOpen } = useUI();
  const { hasLocationBeenSet } = useWeather();

  const renderActivePage = () => {
    if (emergencyMode) return <EmergencyPage />;

    switch (activeTab) {
      case 'home':
        return <DashboardPage />;
      case 'ask':
        return <AskPage />;
      case 'live':
        return <DashboardPage />;
      case 'radar':
        return <RadarPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'advisories':
        return <AdvisoriesPage />;
      case 'climate':
        return <ClimatePage />;
      case 'whatif':
        return <WhatIfPage />;
      case 'travel':
        return <TravelPage />;
      case 'emergency':
        return <EmergencyPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#F4F7FC] text-slate-900 ${simpleMode ? 'text-lg leading-relaxed' : ''}`}>
      {/* First Screen Welcome & Location Modal */}
      <WelcomeLocationModal />

      {/* Global Modals */}
      <LocationSelectorModal />
      <VoiceModal />
      <ExplainableAIModal />

      {/* App Shell */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          {/* Header */}
          <Header />

          {/* Page Router Body */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
            {renderActivePage()}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <UIProvider>
        <WeatherProvider>
          <AppContent />
        </WeatherProvider>
      </UIProvider>
    </LanguageProvider>
  );
}

export default App;
