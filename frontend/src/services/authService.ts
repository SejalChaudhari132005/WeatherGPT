import { supabase } from '../lib/supabase';

export interface AuthResponse {
  success: boolean;
  message?: string;
  session?: any;
  user?: any;
}

export class AuthService {
  public async signInWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        return { success: false, message: error.message };
      }

      if (!data.session) {
        return { success: false, message: 'Authentication succeeded but no session was returned.' };
      }

      return { success: true, user: data.user, session: data.session };
    } catch (err: any) {
      return { success: false, message: err.message || 'Unable to sign in.' };
    }
  }

  public async signUpWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        return { success: false, message: error.message };
      }

      if (!data.session) {
        return {
          success: false,
          message: 'Account created. Check your email to confirm your account before signing in.',
        };
      }

      return { success: true, user: data.user, session: data.session };
    } catch (err: any) {
      return { success: false, message: err.message || 'Unable to create your account.' };
    }
  }

  public async signInWithGoogle(): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (!data.url) {
        return { success: false, message: 'Google sign-in could not be started.' };
      }

      window.location.assign(data.url);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Unable to continue with Google.' };
    }
  }

  /**
   * Format phone number to E.164 format (+919876543210)
   */
  public formatPhone(rawPhone: string, countryCode: string = '+91'): string {
    const cleaned = rawPhone.replace(/\D/g, '');
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+${cleaned}`;
    }
    return `${countryCode}${cleaned}`;
  }

  /**
   * Send SMS OTP via Supabase Auth
   */
  public async sendPhoneOtp(phoneNumber: string): Promise<AuthResponse> {
    const formatted = this.formatPhone(phoneNumber);

    if (formatted.length < 12) {
      return {
        success: false,
        message: 'Invalid mobile number. Please enter a valid 10-digit number.'
      };
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formatted,
      });

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: `6-digit verification code sent to ${formatted}.`
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Network failure while sending OTP. Please check connection.'
      };
    }
  }

  /**
   * Verify SMS OTP token
   */
  public async verifyPhoneOtp(phoneNumber: string, token: string): Promise<AuthResponse> {
    const formatted = this.formatPhone(phoneNumber);
    const cleanedToken = token.trim();

    if (cleanedToken.length !== 6) {
      return {
        success: false,
        message: 'Please enter the complete 6-digit OTP code.'
      };
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formatted,
        token: cleanedToken,
        type: 'sms',
      });

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      if (!data.session) {
        return {
          success: false,
          message: 'Authentication succeeded but no session was returned.'
        };
      }

      return {
        success: true,
        user: data.session.user,
        session: data.session,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Verification failed due to network error.'
      };
    }
  }

  /**
   * Get current Supabase auth session
   */
  public async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  /**
   * Sign out current user
   */
  public async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }
}

export const authService = new AuthService();
