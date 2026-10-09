
import React from 'react';
import { OPENING_HOURS } from './openingHours';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <p className="text-slate-400 max-sm mb-4">
              Serwis opon w Pisarzowicach koło Wrocławia. Wymiana, wyważanie i naprawy wulkanizacyjne: auta osobowe, 4x4, motocykle, quady, TIR, maszyny rolnicze i budowlane.
            </p>
            <p className="text-slate-500 text-sm mb-4">
              ul. Wrocławska 32a, 55-330 Pisarzowice
            </p>
            <ul className="text-slate-400 text-sm mb-4 space-y-1">
              {OPENING_HOURS.map((h) => (
                <li key={h.days}>{h.days}: <span className="text-slate-300 font-semibold">{h.hours}</span></li>
              ))}
            </ul>
            <div className="space-y-2 mb-8">
              <p className="text-orange-500 font-bold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+48721456905" className="hover:underline">+48 721 456 905</a>
              </p>
              <p className="text-orange-500 font-bold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:mvm@mvmpatron.pl" className="hover:underline">mvm@mvmpatron.pl</a>
              </p>
            </div>
            <div className="flex gap-4">
               {/* Facebook Link Updated to mvmpatron */}
               <a 
                 href="https://www.facebook.com/mvmpatron" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-[#1877F2] transition-all group"
                 aria-label="Facebook MVM Patron"
               >
                 <svg className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                 </svg>
               </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Szybkie Linki</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#usługi" className="hover:text-white transition-colors">Usługi</a></li>
              <li><a href="#jak-sie-umowic" className="hover:text-white transition-colors">Jak się umówić</a></li>
              <li><a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Informacje</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <button 
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors text-left"
                >
                  Polityka Prywatności
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors text-left"
                >
                  Regulamin
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} MVM Patron. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
