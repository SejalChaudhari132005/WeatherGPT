import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthStatus, OnboardingStep, UserRole } from '../types/user';
import { authService } from '../services/authService';
import { profileService } from '../services/profileService';
import { locationService } from '../services/locationService';

interface AuthContextType {
  authStatus: AuthStatus;
  onboardingStep: OnboardingStep;
  setOnboardingStep: (step: OnboardingStep) => void;
  userId: string | null;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  otpToken: string;
  setOtpToken: (otp: string) => void;
  otpSentMessage: string;
  resendTimer: number;
  isSubmitting: boolean;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
  userProfile: UserProfile | null;
  profile: UserProfile | null;

  // Actions
  handleSendOtp: (phone: string) => Promise<boolean>;
  handleVerifyOtp: (token: string) => Promise<boolean>;
  handleResendOtp: () => Promise<void>;
  handleSaveUsername: (username: string) => Promise<void>;
  handleSaveRole: (role: UserRole) => Promise<void>;
  handleSaveLocationGps: () => Promise<boolean>;
  handleSaveLocationManual: (cityOption: any) => Promise<void>;
  handleConfirmOnboarding: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (partial: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('LOADING');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('WELCOME');
  const [userId, setUserId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otpToken, setOtpToken] = useState<string>('');
  const [otpSentMessage, setOtpSentMessage] = useState<string>('');
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Timer effect for OTP resend countdown
  useEffect(() => {
    let interval: any;
    if (resendTimer > 0 && onboardingStep === 'OTP') {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer, onboardingStep]);

  // Initial Auth Check on app startup
  useEffect(() => {
    const initAuth = async () => {
      setAuthStatus('LOADING');
      try {
        const session = await authService.getSession();
        if (session && session.user) {
          const uid = session.user.id;
          setUserId(uid);
          setPhoneNumber(session.user.phone || '');

          const profile = await profileService.getProfile(uid);
          setUserProfile(profile);

          if (profileService.isProfileComplete(profile)) {
            setAuthStatus('PROFILE_COMPLETE');
            setOnboardingStep('COMPLETE');
          } else {
            setAuthStatus('PROFILE_INCOMPLETE');
            if (!profile?.username) setOnboardingStep('USERNAME');
            else if (!profile?.role) setOnboardingStep('ROLE');
            else setOnboardingStep('LOCATION');
          }
        } else {
          // Check local stored session for offline dev mode
          const localProf = localStorage.getItem('weathergpt_user_profile');
          if (localProf) {
            const parsed: UserProfile = JSON.parse(localProf);
            if (profileService.isProfileComplete(parsed)) {
              setUserId(parsed.user_id);
              setUserProfile(parsed);
              setAuthStatus('PROFILE_COMPLETE');
              setOnboardingStep('COMPLETE');
              return;
            }
          }

          setAuthStatus('UNAUTHENTICATED');
          setOnboardingStep('WELCOME');
        }
      } catch (err) {
        console.error('Init Auth error:', err);
        setAuthStatus('UNAUTHENTICATED');
        setOnboardingStep('WELCOME');
      }
    };

    initAuth();
  }, []);

  const handleSendOtp = async (phone: string): Promise<boolean> => {
    setIsSubmitting(true);
    setErrorMessage(null);
    const res = await authService.sendPhoneOtp(phone);
    setIsSubmitting(false);

    if (res.success) {
      setPhoneNumber(phone);
      setOtpSentMessage(res.message || 'OTP Sent');
      setResendTimer(30);
      setOnboardingStep('OTP');
      return true;
    } else {
      setErrorMessage(res.message || 'Failed to send OTP.');
      return false;
    }
  };

  const handleVerifyOtp = async (token: string): Promise<boolean> => {
    setIsSubmitting(true);
    setErrorMessage(null);
    const res = await authService.verifyPhoneOtp(phoneNumber, token);
    setIsSubmitting(false);

    if (res.success && res.user) {
      const uid = res.user.id;
      setUserId(uid);

      // Check existing profile
      const existing = await profileService.getProfile(uid);
      if (existing) {
        setUserProfile(existing);
        if (profileService.isProfileComplete(existing)) {
          setAuthStatus('PROFILE_COMPLETE');
          setOnboardingStep('COMPLETE');
          return true;
        }
      }

      setAuthStatus('PROFILE_INCOMPLETE');
      setOnboardingStep('USERNAME');
      return true;
    } else {
      setErrorMessage(res.message || 'Verification failed.');
      return false;
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    await handleSendOtp(phoneNumber);
  };

  const handleSaveUsername = async (username: string) => {
    if (!username.trim()) return;
    const uid = userId || `usr-${Date.now()}`;
    setUserId(uid);

    const updated = await profileService.upsertProfile({
      user_id: uid,
      phone: phoneNumber,
      username: username.trim(),
      role: userProfile?.role || 'citizen',
    });

    setUserProfile(updated);
    setOnboardingStep('ROLE');
  };

  const handleSaveRole = async (role: UserRole) => {
    if (!userId) return;
    const updated = await profileService.upsertProfile({
      user_id: userId,
      role,
    });

    setUserProfile(updated);
    setOnboardingStep('ROLE_CONFIRM');
  };

  const handleSaveLocationGps = async (): Promise<boolean> => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const coords = await locationService.getCurrentPosition();
      const resolved = await locationService.reverseGeocode(coords.latitude, coords.longitude);

      if (!userId) return false;

      const updated = await profileService.upsertProfile({
        user_id: userId,
        latitude: resolved.latitude,
        longitude: resolved.longitude,
        city: resolved.city,
        district: resolved.district,
        state: resolved.state,
        country: resolved.country,
        location_source: 'gps',
      });

      setUserProfile(updated);
      setIsSubmitting(false);
      setOnboardingStep('LOCATION_CONFIRM');
      return true;
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Location permission denied or timed out.');
      return false;
    }
  };

  const handleSaveLocationManual = async (cityOption: any) => {
    if (!userId) return;
    const updated = await profileService.upsertProfile({
      user_id: userId,
      latitude: cityOption.latitude,
      longitude: cityOption.longitude,
      city: cityOption.name,
      district: cityOption.district,
      state: cityOption.state,
      country: cityOption.country,
      location_source: 'manual',
    });

    setUserProfile(updated);
    setOnboardingStep('LOCATION_CONFIRM');
  };

  const handleConfirmOnboarding = async () => {
    if (!userProfile || !userId) return;

    const finalProfile = await profileService.upsertProfile({
      ...userProfile,
      user_id: userId,
    });

    setUserProfile(finalProfile);
    setAuthStatus('PROFILE_COMPLETE');
    setOnboardingStep('COMPLETE');
  };

  const handleSignOut = async () => {
    await authService.signOut();
    localStorage.removeItem('weathergpt_user_profile');
    setUserProfile(null);
    setUserId(null);
    setAuthStatus('UNAUTHENTICATED');
    setOnboardingStep('WELCOME');
  };

  const updateProfile = async (partial: Partial<UserProfile>) => {
    if (!userId) return;
    const updated = await profileService.upsertProfile({
      user_id: userId,
      ...userProfile,
      ...partial,
    });
    setUserProfile(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        onboardingStep,
        setOnboardingStep,
        userId,
        phoneNumber,
        setPhoneNumber,
        otpToken,
        setOtpToken,
        otpSentMessage,
        resendTimer,
        isSubmitting,
        errorMessage,
        setErrorMessage,
        userProfile,
        profile: userProfile,

        handleSendOtp,
        handleVerifyOtp,
        handleResendOtp,
        handleSaveUsername,
        handleSaveRole,
        handleSaveLocationGps,
        handleSaveLocationManual,
        handleConfirmOnboarding,
        handleSignOut,
        signOut: handleSignOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
