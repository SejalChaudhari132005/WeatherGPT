import { supabase } from "../lib/supabase";

export interface AuthResponse {
  success: boolean;
  message?: string;
  session?: any;
  user?: any;
}

export class AuthService {
  /**
   * Email + Password Login
   */
  public async signInWithEmail(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const cleanEmail = email.trim();

      if (!cleanEmail || !password) {
        return {
          success: false,
          message: "Email and password are required.",
        };
      }

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      if (!data.session || !data.user) {
        return {
          success: false,
          message: "Login succeeded but no session was returned.",
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (err: any) {
      console.error("Email login error:", err);

      return {
        success: false,
        message:
          err?.message || "Unable to sign in. Please try again.",
      };
    }
  }

  /**
   * Email + Password Account Creation
   */
  public async signUpWithEmail(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const cleanEmail = email.trim();

      if (!cleanEmail || !password) {
        return {
          success: false,
          message: "Email and password are required.",
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          message: "Password must be at least 6 characters.",
        };
      }

      const { data, error } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      /*
       * If email confirmation is disabled in Supabase,
       * Supabase should return a session immediately.
       */
      if (!data.session || !data.user) {
        return {
          success: false,
          message:
            "Account was created, but no active session was returned. Please check your Supabase Email authentication settings.",
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (err: any) {
      console.error("Email signup error:", err);

      return {
        success: false,
        message:
          err?.message ||
          "Unable to create your account. Please try again.",
      };
    }
  }

  /**
   * Continue with Google
   */
  public async signInWithGoogle(): Promise<AuthResponse> {
    try {
      const redirectTo = window.location.origin;

      const { data, error } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
          },
        });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      if (!data.url) {
        return {
          success: false,
          message:
            "Google sign-in could not be started.",
        };
      }

      /*
       * Redirect the browser to Google.
       * Supabase handles the OAuth callback.
       */
      window.location.assign(data.url);

      return {
        success: true,
      };
    } catch (err: any) {
      console.error("Google login error:", err);

      return {
        success: false,
        message:
          err?.message ||
          "Unable to continue with Google.",
      };
    }
  }

  /**
   * Get the current authenticated Supabase session
   */
  public async getSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(
          "Get session error:",
          error
        );
        return null;
      }

      return session;
    } catch (err) {
      console.error(
        "Get session exception:",
        err
      );
      return null;
    }
  }

  /**
   * Get the current authenticated user
   */
  public async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error(
          "Get current user error:",
          error
        );
        return null;
      }

      return user;
    } catch (err) {
      console.error(
        "Get current user exception:",
        err
      );
      return null;
    }
  }

  /**
   * Sign out current user
   */
  public async signOut(): Promise<void> {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();