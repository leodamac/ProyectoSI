'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import Link from 'next/link';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Don't show prompt immediately, wait a bit for user to explore
      setTimeout(() => {
        setShowPrompt(true);
        
        // Auto-compact after 10 seconds
        setTimeout(() => {
          setIsCompact(true);
        }, 10000);
      }, 30000); // Show after 30 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for 7 days
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  const handleExpand = () => {
    setIsCompact(false);
  };

  // Don't show if already installed or dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDays) {
        setShowPrompt(false);
      }
    }
  }, []);

  if (isInstalled || !showPrompt) {
    return null;
  }

  // Compact version
  if (isCompact) {
    return (
      <div className="fixed bottom-4 left-4 z-[40] animate-slide-up">
        <button
          onClick={handleExpand}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all p-3 flex items-center gap-2 group"
          aria-label="Instalar app"
        >
          <Download className="w-5 h-5" />
          <span className="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            Instalar App
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="ml-1 hover:bg-white/20 rounded-full p-0.5"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </button>
      </div>
    );
  }

  // Full version
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-[40] animate-slide-up">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/80 hover:text-white"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Download className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Instala Alkadami Keto</h3>
            <p className="text-sm text-emerald-50 mb-4">
              Accede más rápido y usa la app sin conexión a internet
            </p>
            <div className="flex gap-2">
              {deferredPrompt ? (
                <button
                  onClick={handleInstallClick}
                  className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors"
                >
                  Instalar Ahora
                </button>
              ) : (
                <Link
                  href="/instalar"
                  className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors inline-block"
                  onClick={() => setShowPrompt(false)}
                >
                  Ver Instrucciones
                </Link>
              )}
              <button
                onClick={handleDismiss}
                className="text-white/90 px-4 py-2 rounded-lg text-sm hover:text-white transition-colors"
              >
                Más tarde
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
