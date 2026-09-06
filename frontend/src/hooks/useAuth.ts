import { useAuthContext } from '../context/AuthContext';

export function useAuth() {
  const {
    authStatus,
    onboardingStep,
    userId,
    phoneNumber,
    otpSentMessage,
    resendTimer,
    isSubmitting,
    errorMessage,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
    handleEmailLogin,
    handleEmailSignUp,
    handleGoogleSignIn,
    handleSignOut,
    setOnboardingStep,
  } = useAuthContext();

  return {
    isAuthenticated: authStatus === 'AUTHENTICATED' || authStatus === 'PROFILE_COMPLETE',
    isProfileComplete: authStatus === 'PROFILE_COMPLETE',
    authStatus,
    onboardingStep,
    userId,
    phoneNumber,
    otpSentMessage,
    resendTimer,
    isSubmitting,
    errorMessage,
    sendOtp: handleSendOtp,
    verifyOtp: handleVerifyOtp,
    resendOtp: handleResendOtp,
    loginWithEmail: handleEmailLogin,
    signUpWithEmail: handleEmailSignUp,
    signInWithGoogle: handleGoogleSignIn,
    signOut: handleSignOut,
    goToStep: setOnboardingStep,
  };
}
