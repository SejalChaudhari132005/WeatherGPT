import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Sparkles } from 'lucide-react';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);

  useEffect(() => {
    // Detect iOS
    const ua = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(ua);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (isIosDevice && !isStandalone) {
      setIsIos(true);
      // Show iOS banner after 3 seconds
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // Detect Android / Chrome beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User installed WeatherGPT PWA');
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-50 max-w-md bg-slate-900 text-white rounded-3xl p-4 shadow-2xl border border-slate-700/80 animate-bounceIn flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-sky-600 rounded-2xl text-white shadow-md shadow-sky-600/30 shrink-0">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">Install WeatherGPT App</div>
          <p className="text-xs text-slate-200 font-medium">
            {isIos
              ? 'Tap Share ➔ "Add to Home Screen"'
              : 'Add to Home Screen for fast native app experience'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isIos && (
          <button
            onClick={handleInstallClick}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/30 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Install</span>
          </button>
        )}

        <button
          onClick={() => setShowPrompt(false)}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
