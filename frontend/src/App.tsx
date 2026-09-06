import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { UIProvider, useUI } from './context/UIContext';
import { WeatherProvider } from './context/WeatherContext';
import { AuthProvider, useAuthContext } from './context/AuthContext';

import { MobileAppShell } from './components/layout/MobileAppShell';
import { MobileHeroWeatherCard } from './components/dashboard/MobileHeroWeatherCard';
import { MobileEarlyWarningsCard } from './components/dashboard/MobileEarlyWarningsCard';
import { MobileRadarMapScreen } from './components/radar/MobileRadarMapScreen';
import { AskWeatherGPTCard } from './components/dashboard/AskWeatherGPTCard';
import { RoleBasedAdvisoryCard } from './components/dashboard/RoleBasedAdvisoryCard';
import { FarmerAdvisory } from './components/roles/FarmerAdvisory';
import { FisherAdvisory } from './components/roles/FisherAdvisory';

import { LocationSelectorModal } from './components/location/LocationSelectorModal';
import { VoiceModal } from './components/common/VoiceModal';
import { ExplainableAIModal } from './components/common/ExplainableAIModal';
import { PwaInstallPrompt } from './components/common/PwaInstallPrompt';

import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { PhoneAuthScreen } from './components/onboarding/PhoneAuthScreen';
import { OtpVerificationScreen } from './components/onboarding/OtpVerificationScreen';
import { ProfileSetupScreen } from './components/onboarding/ProfileSetupScreen';
import { RoleSelectionScreen } from './components/onboarding/RoleSelectionScreen';
import { RoleConfirmationScreen } from './components/onboarding/RoleConfirmationScreen';
import { LocationSetupScreen } from './components/onboarding/LocationSetupScreen';
import { LocationConfirmationScreen } from './components/onboarding/LocationConfirmationScreen';

import { AlertsPage } from './pages/AlertsPage';
import { ClimatePage } from './pages/ClimatePage';
import { WhatIfPage } from './pages/WhatIfPage';
import { TravelPage } from './pages/TravelPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { ProfilePage } from './pages/ProfilePage';
import { Loader2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, emergencyMode } = useUI();

  const renderActivePage = () => {
    if (emergencyMode) return <EmergencyPage />;

    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-2 pb-12">
            <MobileHeroWeatherCard />
            <MobileEarlyWarningsCard />
            <RoleBasedAdvisoryCard />
          </div>
        );
      case 'ask':
        return (
          <div className="p-4 space-y-4 pb-12">
            <AskWeatherGPTCard />
          </div>
        );
      case 'advisories':
        return (
          <div className="p-4 space-y-4 pb-12">
            <RoleBasedAdvisoryCard />
            <FarmerAdvisory />
            <FisherAdvisory />
          </div>
        );
      case 'alerts':
        return <AlertsPage />;
      case 'radar':
        return <MobileRadarMapScreen />;
      case 'climate':
        return <ClimatePage />;
      case 'whatif':
        return <WhatIfPage />;
      case 'travel':
        return <TravelPage />;
      case 'emergency':
        return <EmergencyPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <div className="space-y-2 pb-12">
            <MobileHeroWeatherCard />
            <MobileEarlyWarningsCard />
          </div>
        );
    }
  };

  return (
    <MobileAppShell>
      <LocationSelectorModal />
      <VoiceModal />
      <ExplainableAIModal />
      <PwaInstallPrompt />
      {renderActivePage()}
    </MobileAppShell>
  );
};

const RootRouter: React.FC = () => {
  const { authStatus, onboardingStep } = useAuthContext();

  if (authStatus === 'LOADING') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col items-center gap-3 text-white">
          <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider">Loading WeatherGPT Session...</span>
        </div>
      </div>
    );
  }

  if (authStatus === 'PROFILE_COMPLETE' || onboardingStep === 'COMPLETE') {
    return <MainAppContent />;
  }

  switch (onboardingStep) {
    case 'WELCOME':
      return <WelcomeScreen />;
    case 'PHONE':
      return <PhoneAuthScreen />;
    case 'OTP':
      return <OtpVerificationScreen />;
    case 'USERNAME':
      return <ProfileSetupScreen />;
    case 'ROLE':
      return <RoleSelectionScreen />;
    case 'ROLE_CONFIRM':
      return <RoleConfirmationScreen />;
    case 'LOCATION':
      return <LocationSetupScreen />;
    case 'LOCATION_CONFIRM':
      return <LocationConfirmationScreen />;
    default:
      return <WelcomeScreen />;
  }
};

export function App() {
  return (
    <LanguageProvider>
      <UIProvider>
        <AuthProvider>
          <WeatherProvider>
            <RootRouter />
          </WeatherProvider>
        </AuthProvider>
      </UIProvider>
    </LanguageProvider>
  );
}

export default App;
