
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900 pt-20">
      {/* Background Layer with Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ 
            transform: `translateY(${offsetY * 0.4}px) scale(1.1)`,
          }}
        >
          <img 
            src="/images/MVM-PATRON.png" 
            alt="MVM Patron - Ilustracja warsztatu retro" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Retro Dark Overlay for better text contrast and vintage vibe */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/40"></div>
        <div className="absolute inset-0 bg-orange-950/10 mix-blend-overlay"></div>
        
        {/* Subtle Tire Tread Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ 
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGcIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTI0IDIwaC04djEwaDhWMjB6TTI0IDBoLTh2MTBoOFYwem0wIDQwaC04VjMwaDh2MTB6Ii8+PC9nPjwvc3ZnPg==')`, 
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Top Location Badge */}
          <div className="flex flex-col items-start gap-4 mb-12 mt-12 animate-spring-up" style={{ animationDelay: '200ms' }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block px-5 py-2 rounded-xl bg-orange-600 text-white font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-orange-600/20">
                Wrocław • Pisarzowice • Miękinia • Wilkszyn • Leśnica • Głoska • Mrozów • Krępice
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold text-white leading-[1.1] mb-10 tracking-tighter drop-shadow-2xl animate-spring-up" style={{ animationDelay: '450ms' }}>
            Zaawansowana <br/>
            <span className="text-orange-600 inline-block mt-2 relative">
              wulkanizacja
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-orange-600/30 blur-lg"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white font-bold mb-6 max-w-2xl drop-shadow-md animate-spring-up" style={{ animationDelay: '600ms' }}>
            Wymiana, wyważanie i naprawa opon: auta osobowe, 4x4, motocykle, quady, TIR, maszyny rolnicze i budowlane.
          </p>

          <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed max-w-2xl font-medium drop-shadow-md animate-spring-up" style={{ animationDelay: '700ms' }}>
            Od bezpiecznych przejazdów autostradą, przez górskie serpentyny, aż po ekstremalny off-road. MVM Patron to warsztat, który dba o Twój kontakt z podłożem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-spring-up" style={{ animationDelay: '950ms' }}>
            <a 
              href="#usługi" 
              className="bg-orange-600 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all text-center shadow-2xl shadow-orange-600/40 border-b-4 border-orange-800 active:scale-95 group"
            >
              <span className="inline-block group-hover:translate-x-1 transition-transform">Nasze Usługi</span>
            </a>
            <a 
              href="#kontakt" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/20 transition-all text-center active:scale-95"
            >
              Dojazd do Warsztatu
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative large wheel element - animated rotation */}
      <div className="absolute -right-24 bottom-[-10%] opacity-[0.05] pointer-events-none hidden lg:block scale-150 rotate-12 transition-transform duration-[20s] hover:rotate-45">
        <svg className="w-[800px] h-[800px] text-white animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
        </svg>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 120s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
