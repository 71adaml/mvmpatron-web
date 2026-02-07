
import React, { useState, useEffect } from 'react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mvm-cookie-consent');
    if (consent) {
      const { timestamp } = JSON.parse(consent);
      const sixMonths = 180 * 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp > sixMonths) {
        setIsVisible(true);
      }
    } else {
      // Delay showing for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (type: 'all' | 'essential') => {
    const data = {
      consent: type,
      timestamp: Date.now()
    };
    localStorage.setItem('mvm-cookie-consent', JSON.stringify(data));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-[60] animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200 p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold text-base mb-1 tracking-tight">Prywatność i Pliki Cookie</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Używamy plików cookie i narzędzi analitycznych, aby ulepszyć przeglądanie, wyświetlać spersonalizowane treści oraz analizować ruch w warsztacie MVM Patron. 
              Przejdź do <button onClick={onOpenPrivacy} className="text-orange-600 font-bold hover:underline">Zasad ochrony danych osobowych</button>, aby dowiedzieć się więcej.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => saveConsent('all')}
            className="flex-1 bg-orange-600 text-white text-xs font-black uppercase tracking-widest py-3 px-4 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95"
          >
            Akceptuję wszystkie
          </button>
          <button 
            onClick={() => saveConsent('essential')}
            className="flex-1 bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-widest py-3 px-4 rounded-xl hover:bg-slate-200 transition-all active:scale-95"
          >
            Odrzuć opcjonalne
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
