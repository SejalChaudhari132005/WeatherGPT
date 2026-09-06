import { useAuthContext } from '../context/AuthContext';

export function useProfile() {
  const {
    userProfile,
    handleSaveUsername,
    handleSaveRole,
    handleConfirmOnboarding,
    isSubmitting,
    errorMessage,
  } = useAuthContext();

  return {
    profile: userProfile,
    username: userProfile?.username || '',
    role: userProfile?.role || 'citizen',
    saveUsername: handleSaveUsername,
    saveRole: handleSaveRole,
    confirmOnboarding: handleConfirmOnboarding,
    isSubmitting,
    errorMessage,
  };
}
