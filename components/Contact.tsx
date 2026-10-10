
import React from 'react';
import { OPENING_HOURS } from './openingHours';
import ParallaxBackground from './ParallaxBackground';

const Contact: React.FC = () => {
  // Używamy Plus Code: 6V52+88 Pisarzowice, Polska oraz nazwy firmy w dymku
  const plusCode = "6V52+88 Pisarzowice, Polska";
  const companyName = "MVM Patron";
  const encodedQuery = encodeURIComponent(`${plusCode} (${companyName})`);
  const googleMapsUrl = `https://www.google.com/maps?q=${encodedQuery}&hl=pl&z=17&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(plusCode)}`;

  return (
    <section id="kontakt" className="relative py-24 overflow-hidden">
      <ParallaxBackground name="contact-road" overlayClassName="bg-gradient-to-b from-slate-50/40 via-slate-50/10 to-slate-50/40" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-active">
              <h2 className="on-image text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Skontaktuj się z nami</h2>
              <p className="on-image text-lg text-slate-800 mb-10 font-medium">
                Chcesz wymienić lub naprawić opony w aucie, motocyklu, ciężarówce albo maszynie rolniczej? Zadzwoń, a doradzimy i umówimy termin wizyty. Zapraszamy do warsztatu w Pisarzowicach, kilka minut od Wrocławia.
              </p>

              <div className="space-y-6">
                {/* Location Card */}
                <div className="flex items-start gap-5 p-6 rounded-3xl glass transition-all hover:-translate-y-1">
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
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Nawiguj do warsztatu
                    </a>
                  </div>
                </div>

                {/* Opening Hours Card */}
                <div className="flex items-start gap-5 p-6 rounded-3xl glass transition-all hover:-translate-y-1">
                  <div className="bg-orange-100 p-4 rounded-2xl text-orange-600 shadow-sm">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-lg mb-1">Godziny otwarcia</h4>
                    <ul className="text-slate-600 font-semibold leading-relaxed">
                      {OPENING_HOURS.map((h) => (
                        <li key={h.days} className="flex justify-between gap-4">
                          <span>{h.short}</span>
                          <span className="text-slate-900 whitespace-nowrap">{h.hours}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-orange-600 font-bold mt-2">Wizyty po wcześniejszym umówieniu telefonicznym.</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-start gap-5 p-6 rounded-3xl glass transition-all hover:-translate-y-1">
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
            <div className="rounded-[3rem] overflow-hidden h-[500px] shadow-2xl border-8 border-white/60 relative bg-white/40 backdrop-blur-xl reveal reveal-active" style={{transitionDelay: '200ms'}}>
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
