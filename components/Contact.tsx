
import React from 'react';

const Contact: React.FC = () => {
  // Używamy Plus Code: 6V52+88 Pisarzowice, Polska oraz nazwy firmy w dymku
  const plusCode = "6V52+88 Pisarzowice, Polska";
  const companyName = "MVM Patron";
  const encodedQuery = encodeURIComponent(`${plusCode} (${companyName})`);
  const googleMapsUrl = `https://www.google.com/maps?q=${encodedQuery}&hl=pl&z=17&output=embed`;

  return (
    <section id="kontakt" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-active">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Skontaktuj się z nami</h2>
              <p className="text-lg text-slate-600 mb-10 font-medium">
                Masz pytania dotyczące nietypowych śrub, naprawy gwintu lub chcesz umówić się na wymianę opon? Jesteśmy dostępni telefonicznie oraz mailowo. Zapraszamy do naszego warsztatu w Pisarzowicach.
              </p>

              <div className="space-y-6">
                {/* Location Card */}
                <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-lg">
                  <div className="bg-orange-100 p-4 rounded-2xl text-orange-600 shadow-sm">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">Nasza Lokalizacja</h4>
                    <p className="text-slate-600 font-semibold leading-relaxed">
                      ul. Wrocławska 32a<br/>
                      55-330 Pisarzowice (koło Wilkszyna)
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-lg">
                  <div className="bg-orange-100 p-4 rounded-2xl text-orange-600 shadow-sm">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">E-mail</h4>
                    <a href="mailto:mvm@mvmpatron.pl" className="text-slate-600 font-semibold leading-relaxed hover:text-orange-600 transition-colors">
                      mvm@mvmpatron.pl
                    </a>
                  </div>
                </div>

                {/* Phone CTA */}
                <a 
                  href="tel:+48721456905" 
                  className="flex items-center gap-4 sm:gap-6 p-5 sm:p-7 rounded-[2rem] sm:rounded-[2.5rem] bg-orange-600 text-white shadow-2xl shadow-orange-600/30 transition-all hover:scale-[1.02] hover:shadow-orange-600/50 active:scale-95 group relative overflow-hidden"
                >
                  <div className="bg-slate-950 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] text-orange-500 shadow-xl shadow-black/40 group-hover:scale-110 transition-transform duration-500 z-10 animate-pulse-subtle shrink-0">
                    <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="z-10 min-w-0">
                    <h4 className="font-bold text-white/90 text-[10px] sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 group-hover:text-white transition-colors truncate">Zadzwoń bezpośrednio</h4>
                    <p className="text-xl xs:text-2xl sm:text-4xl font-black tracking-tighter whitespace-nowrap">+48 721 456 905</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </a>
              </div>
            </div>

            {/* Google Maps Container */}
            <div className="rounded-[3rem] overflow-hidden h-[500px] shadow-2xl border-8 border-slate-50 relative bg-slate-100 reveal reveal-active" style={{transitionDelay: '200ms'}}>
               <iframe 
                 src={googleMapsUrl}
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Lokalizacja MVM Patron w Google Maps"
                 className="grayscale hover:grayscale-0 transition-all duration-700"
               />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2.5s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Contact;
