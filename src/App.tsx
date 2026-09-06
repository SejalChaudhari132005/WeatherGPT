import React, { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { UIProvider } from './context/UIContext';
import { WeatherProvider } from './context/WeatherContext';
import { AuthProvider, useAuthContext } from './context/AuthContext';

import { ChatSidebar } from './components/sidebar/ChatSidebar';
import { ChatPage } from './pages/ChatPage';
import { DashboardPage } from './pages/DashboardPage';
import { MapPage } from './pages/MapPage';
import { AlertsPage } from './pages/AlertsPage';
import { ClimatePage } from './pages/ClimatePage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { PwaInstallPrompt } from './components/common/PwaInstallPrompt';

import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { PhoneAuthScreen } from './components/onboarding/PhoneAuthScreen';
import { OtpVerificationScreen } from './components/onboarding/OtpVerificationScreen';
import { ProfileSetupScreen } from './components/onboarding/ProfileSetupScreen';
import { RoleSelectionScreen } from './components/onboarding/RoleSelectionScreen';
import { RoleConfirmationScreen } from './components/onboarding/RoleConfirmationScreen';
import { LocationSetupScreen } from './components/onboarding/LocationSetupScreen';
import { LocationConfirmationScreen } from './components/onboarding/LocationConfirmationScreen';

import { Conversation, ActiveNavPage } from './types/chat';
import { chatService } from './services/chatService';
import { Loader2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { profile } = useAuthContext();
  const userId = profile?.user_id || 'dev_user';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavPage, setActiveNavPage] = useState<ActiveNavPage>('dashboard');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>('');

  // Fetch user conversations from Supabase / LocalStorage
  const loadConversations = useCallback(async () => {
    const list = await chatService.fetchConversations(userId);
    setConversations(list);
    if (!activeConversationId && list.length > 0) {
      setActiveConversationId(list[0].id);
    }
  }, [userId, activeConversationId]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const handleNewChat = async () => {
    setActiveConversationId('');
    setActiveNavPage('chat');
  };

  const renderActivePage = () => {
    switch (activeNavPage) {
      case 'chat':
        return (
          <ChatPage
            onOpenSidebar={() => setSidebarOpen(true)}
            activeConversationId={activeConversationId}
            onSelectConversation={(id) => setActiveConversationId(id)}
            onNavigate={(page) => setActiveNavPage(page)}
            conversations={conversations}
            onRefreshConversations={loadConversations}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage
            onBack={() => setActiveNavPage('chat')}
            onNavigatePage={(page) => setActiveNavPage(page)}
            onOpenChatWithPrompt={(prompt) => {
              setActiveNavPage('chat');
            }}
          />
        );
      case 'map':
        return <MapPage onBack={() => setActiveNavPage('chat')} />;
      case 'alerts':
        return <AlertsPage onBack={() => setActiveNavPage('chat')} />;
      case 'climate':
        return <ClimatePage onBack={() => setActiveNavPage('chat')} />;
      case 'profile':
        return <ProfilePage onBack={() => setActiveNavPage('chat')} />;
      case 'settings':
        return <SettingsPage onBack={() => setActiveNavPage('chat')} />;
      default:
        return (
          <ChatPage
            onOpenSidebar={() => setSidebarOpen(true)}
            activeConversationId={activeConversationId}
            onSelectConversation={(id) => setActiveConversationId(id)}
            onNavigate={(page) => setActiveNavPage(page)}
            conversations={conversations}
            onRefreshConversations={loadConversations}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex flex-col font-['Arimo'] antialiased selection:bg-[#38b6ff] selection:text-white w-full max-w-full overflow-x-hidden">
      <PwaInstallPrompt />

      {/* Navigation Sidebar & Drawer */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={(id) => setActiveConversationId(id)}
        onNewChat={handleNewChat}
        onRenameConversation={() => {}}
        onDeleteConversation={() => {}}
        activeNavPage={activeNavPage}
        onNavigate={(page) => setActiveNavPage(page)}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col md:pl-72 transition-all w-full max-w-full overflow-x-hidden">
        {renderActivePage()}
      </div>
    </div>
  );
};

const RootRouter: React.FC = () => {
  const { authStatus, onboardingStep } = useAuthContext();

  if (authStatus === 'LOADING') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
        <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col items-center gap-3 text-white">
          <Loader2 className="w-8 h-8 text-[#38b6ff] animate-spin" />
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
