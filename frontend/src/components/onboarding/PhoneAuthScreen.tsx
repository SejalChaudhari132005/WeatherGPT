import React, { useState } from 'react';
import { ArrowLeft, Mail, LockKeyhole, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const PhoneAuthScreen: React.FC = () => {
  const { loginWithEmail, signUpWithEmail, signInWithGoogle, isSubmitting, errorMessage, goToStep } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput) return;
    if (isSignUp) {
      await signUpWithEmail(emailInput.trim(), passwordInput);
    } else {
      await loginWithEmail(emailInput.trim(), passwordInput);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-4 sm:p-6 md:p-8 relative">
      <div className="w-full max-w-md bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between min-h-[85vh] sm:min-h-[520px] transition-all">
        {/* Top Header */}
        <div>
          <button
            onClick={() => goToStep('WELCOME')}
            className="p-2 rounded-2xl bg-slate-50 text-slate-600 border border-slate-200/80 shadow-2xs hover:bg-slate-100 transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Let's get started</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Sign in to continue to WeatherGPT</p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="my-auto space-y-4 py-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Email</label>
            <div className="relative">
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Enter your email" className="w-full pl-4 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-base font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-2xs transition-all" autoFocus />
              <Mail className="w-5 h-5 text-slate-400 absolute right-3.5 top-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Enter your password" className="w-full pl-4 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-base font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-2xs transition-all" />
              <LockKeyhole className="w-5 h-5 text-slate-400 absolute right-3.5 top-4" />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

        </form>

        {/* Bottom Button */}
        <div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !emailInput.trim() || !passwordInput}
            className="w-full py-4 rounded-2xl bg-[#004aad] hover:bg-[#003882] disabled:bg-slate-300 active:scale-[0.98] text-white font-extrabold text-base shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer font-['Arimo']"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
              </>
            ) : (
              <>
                <span>{isSignUp ? 'Sign Up' : 'Login'}</span>
              </>
            )}
          </button>
          <button type="button" onClick={signInWithGoogle} disabled={isSubmitting} className="w-full py-3.5 mt-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer">
            <span className="font-black text-base">G</span>
            <span>Continue with Google</span>
          </button>
          <p className="text-center text-xs text-slate-500 mt-4">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={() => setIsSignUp((current) => !current)} className="font-bold text-sky-700 hover:text-sky-800">
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
