
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Usługi', href: '#usługi' },
    { name: 'Jak się umówić', href: '#jak-sie-umowic' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/70 shadow-lg shadow-slate-900/5 py-3' : 'bg-transparent py-6 md:py-10 lg:py-14'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <picture>
                <source type="image/webp" srcSet="/images/logo-64.webp 1x, /images/logo-128.webp 2x" />
                <img src="/images/logo-64.png" alt="Logo MVM Patron" width={96} height={48} className="h-9 sm:h-12 w-auto drop-shadow-md" />
              </picture>
              <span className={`text-xl sm:text-2xl font-black tracking-tighter transition-colors duration-300 ${isScrolled || isMenuOpen ? 'text-slate-900' : 'text-white'}`}>
                MVM<span className={`${isScrolled || isMenuOpen ? 'text-orange-600' : 'text-orange-500'}`}> PATRON</span>
              </span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <a 
                href="tel:+48721456905" 
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 font-black transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm whitespace-nowrap ${
                  isScrolled || isMenuOpen
                    ? 'text-orange-600 border-orange-600 bg-orange-50' 
                    : 'text-white border-white/30 bg-white/10 backdrop-blur-sm'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+48 721 456 905</span>
              </a>
              <a 
                href="mailto:mvm@mvmpatron.pl" 
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 font-black transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm whitespace-nowrap ${
                  isScrolled || isMenuOpen
                    ? 'text-orange-600 border-orange-600 bg-orange-50' 
                    : 'text-white border-white/30 bg-white/10 backdrop-blur-sm'
                }`}
                title="mvm@mvmpatron.pl"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden lg:inline">mvm@mvmpatron.pl</span>
              </a>
            </div>
            
            {/* Small screen mobile shortcuts */}
            <div className="flex sm:hidden items-center gap-1">
              <a href="tel:+48721456905" className={`p-2 rounded-full border-2 ${isScrolled || isMenuOpen ? 'text-orange-600 border-orange-600' : 'text-white border-white/30'}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </a>
              <a href="mailto:mvm@mvmpatron.pl" className={`p-2 rounded-full border-2 ${isScrolled || isMenuOpen ? 'text-orange-600 border-orange-600' : 'text-white border-white/30'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-bold">
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`transition-colors duration-300 ${isScrolled ? 'text-slate-700 hover:text-orange-600' : 'text-white/90 hover:text-white'}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${isScrolled || isMenuOpen ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/80 backdrop-blur-2xl transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-black text-slate-900 hover:text-orange-600 transition-colors uppercase tracking-tighter"
            >
              {item.name}
            </a>
          ))}
          <div className="w-full h-px bg-slate-100 max-w-xs my-4"></div>
          <div className="flex flex-col items-center gap-6">
            <a 
              href="tel:+48721456905"
              className="flex flex-col items-center gap-2 group"
            >
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Zadzwoń do nas</span>
              <span className="text-2xl font-black text-orange-600 group-hover:scale-105 transition-transform">+48 721 456 905</span>
            </a>
            <a 
              href="mailto:mvm@mvmpatron.pl"
              className="flex flex-col items-center gap-2 group"
            >
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Napisz do nas</span>
              <span className="text-2xl font-black text-orange-600 group-hover:scale-105 transition-transform">mvm@mvmpatron.pl</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
