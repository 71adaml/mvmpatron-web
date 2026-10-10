import ParallaxBackground from './ParallaxBackground';
import React, { useEffect, useRef, useState } from 'react';

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  backDetails: string[];
}

const services: ServiceItem[] = [
  {
    title: "Wymiana Opon Osobowych",
    desc: "Bezinwazyjny montaż na profesjonalnych maszynach. Obsługujemy felgi do 30 cali oraz trudne profile.",
    backDetails: [
      "Profesjonalny montaż i demontaż ogumienia przy użyciu nowoczesnego sprzętu",
      "Precyzyjne wyważenie komputerowe eliminujące wibracje na kierownicy",
      "Dokręcanie kół kluczem dynamometrycznym dla pełnego bezpieczeństwa",
      "Kontrola szczelności zaworów i optymalizacja ciśnienia w oponach",
      "Ceny od 140 pln/brutto"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14.5l.8-2.4C5.1 11.2 5.9 10 7.5 10h9c1.6 0 2.4 1.2 2.7 2.1l.8 2.4m-18 0h20m-19 0v3.5A1.5 1.5 0 003.5 19.5h1a1.5 1.5 0 001.5-1.5m12 0a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-3.5m-15.5 0h14m-12 3.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm11 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14.5v-4.5M8 10h8" />
      </svg>
    )
  },
  {
    title: "Serwis TIR i Ciężarowe",
    desc: "Specjalistyczna wulkanizacja dla pojazdów ciężarowych. Obsługujemy zestawy TIR, naczepy oraz autobusy.",
    backDetails: [
      "Kompleksowy serwis i wulkanizacja opon dla samochodów ciężarowych oraz zestawów TIR",
      "Obsługa kół naczep, autobusów oraz pojazdów specjalistycznych",
      "Profesjonalny montaż i wyważanie kół wielkogabarytowych"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 15h16m0 0v-8a1 1 0 011-1h3l1.5 3.5V15h-1m-19 0v2h1m16 0h1m-16-2H3v-7h11v7" />
        <circle cx="5.5" cy="17.5" r="2.5" strokeWidth={1.5} />
        <circle cx="11.5" cy="17.5" r="2.5" strokeWidth={1.5} />
        <circle cx="18.5" cy="17.5" r="2.5" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 7h4v4h-4V7zM6 10h4" />
      </svg>
    )
  },
  {
    title: "Ciągniki i maszyny rolnicze",
    desc: "Kompleksowa obsługa kół do ciągników i kombajnów. Naprawa opon wielkogabarytowych oraz dętek rolniczych.",
    backDetails: [
      "Opony ciągnikowe i kombajnowe",
      "Naprawa dętek rolniczych o każdej wielkości",
      "Serwis kół bliźniaczych i międzyrzędzi"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 17h16m0 0V9s-1-4-5-4h-3v5H4v7" />
        <circle cx="16" cy="17" r="4" strokeWidth={1.5} />
        <circle cx="6" cy="19" r="2" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v5m-3 0h3m4 0h3m-7-5h5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 13h5" />
      </svg>
    )
  },
  {
    title: "Maszyny Budowlane",
    desc: "Serwis opon do koparek, ładowarek i innego sprzętu budowlanego. Naprawy wulkanizacyjne gabarytów.",
    backDetails: [
      "Opony do koparek, ładowarek i walców",
      "Naprawy specjalistyczne na miejscu",
      "Wzmocnienia opon przemysłowych"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 18h12m0 0V9l3-4h3l1.5 2V18h-1m-18 0v-6h11m-11 6h1m12 0h1" />
        <circle cx="5" cy="18" r="3" strokeWidth={1.5} />
        <circle cx="13" cy="18" r="3" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 12l6-4m0 0l4-2m-4 2v6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 12h5l-1 4h-4z" />
      </svg>
    )
  },
  {
    title: "Serwis opon motocyklowych",
    desc: "Obsługujemy wszelkie typy motocykli szosowych, turystycznych i chopperów oraz skutery. Precyzyjne wyważanie kół.",
    backDetails: [
      "Wyważanie statyczne i dynamiczne",
      "Opony szosowe, turystyczne i sportowe",
      "Obsługa dużych chopperów i skuterów"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="5" cy="17" r="3" strokeWidth={1.5} />
        <circle cx="19" cy="17" r="3" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 17L8 7h6l2 3 3 7m-11 0l1-5h6l1 5m-1 0a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7l-1-2h2m7 5l-2-4h-2" />
      </svg>
    )
  },
  {
    title: "Serwis opon aut terenowych 4x4",
    desc: "Specjalistyczna wymiana i wyważanie opon terenowych typu MT i AT. Obsługujemy duże koła off-road i szerokie felgi.",
    backDetails: [
      "Opony MT/AT do 30 cali",
      "Wyważanie kół z dużym offsetem",
      "Obsługa felg typu Beadlock"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 13h1.5l1.5-4h11l1.5 4h4.5v5h-1a3 3 0 01-6 0h-5a3 3 0 01-6 0H2v-5z" />
        <circle cx="6.5" cy="18" r="2.5" strokeWidth={1.5} />
        <circle cx="17.5" cy="18" r="2.5" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 9h1l1-3.5h6L14 9h1m-10 4h12m-6-4v4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 13h-2v-1.5c0-.5-.5-1-1-1" />
      </svg>
    )
  },
  {
    title: "Serwis Quadów (ATV)",
    desc: "Profesjonalna wymiana i wulkanizacja opon do quadów przeprawowych i sportowych. Obsługa pojazdów 4x4.",
    backDetails: [
      "Wulkanizacja opon quadów i pojazdów UTV",
      "Opony przeprawowe, błotne i sportowe",
      "Montaż dętek wzmacnianych (heavy duty)"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="6" cy="17" r="3" strokeWidth={1.5} />
        <circle cx="18" cy="17" r="3" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 14h18v-4H3v4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 10V6h12v4M6 8h12" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10v4m6-4v4" />
        <circle cx="6" cy="17" r="1" fill="currentColor" />
        <circle cx="18" cy="17" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "Pojazdy Ogrodowe",
    desc: "Kompleksowy serwis kół do traktorków kosiarek, odśnieżarek i wózków. Naprawa dętek ogrodniczych.",
    backDetails: [
      "Opony do traktorków kosiarek",
      "Naprawa kół taczek, wózków i przyczepek",
      "Dętki o małych średnicach do kosiarek"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 17h16M4 17V8h12v9m4 0v-4h-4v4" />
        <circle cx="7" cy="19" r="2" strokeWidth={1.5} />
        <circle cx="13" cy="19" r="2" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 8V5h8v3m-4 5h4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13l2 1v2l-2 1" />
      </svg>
    )
  },
  {
    title: "Dętki Rowerowe & Akcesoria",
    desc: "Serwis dętek rowerowych, sprzedaż nowych dętek w wielu rozmiarach oraz profesjonalnych zestawów naprawczych.",
    backDetails: [
      "Wymiana dętek rowerowych 'od ręki'",
      "Szeroki wybór rozmiarów i typów wentyli",
      "Zestawy naprawcze i akcesoria pomocnicze"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="6" cy="17" r="3.5" strokeWidth={1.5} />
        <circle cx="18" cy="17" r="3.5" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 17v-4l4-8h5l3 8v4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 5l1.5-2H13l1.5 2m-6 8h7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.5 9h7" />
      </svg>
    )
  },
  {
    title: "Naprawy Specjalistyczne & Detailing",
    desc: "Ratujemy trudne przypadki: odkręcanie zapieczonych śrub, gwintowanie szpilek oraz detailingowe czyszczenie kół.",
    backDetails: [
      "Wykręcanie zerwanych i obrobionych śrub",
      "Naprawa uszkodzonych gwintów piast",
      "Usuwanie starego kleju i pyłu hamulcowego"
    ],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth={1.2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7v10M7 12h10m-8.5-3.5l7 7m0-7l-7 7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 19l2 2m-18 0l2-2m0-14l-2-2m18 0l-2 2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    )
  }
];

const ServiceCard: React.FC<{ service: ServiceItem, index: number, isVisible: boolean }> = ({ service, index, isVisible }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative perspective-1000 h-[400px] cursor-pointer reveal ${isVisible ? 'reveal-active' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? 'is-flipped' : ''}`}>
        
        {/* Front Side: Enhanced Hover Effects with Scale and Highlight Glow */}
        <div className="absolute inset-0 backface-hidden p-8 rounded-[2.5rem] glass flex flex-col items-start transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(249,115,22,0.25)] hover:-translate-y-4 hover:scale-[1.03] hover:ring-4 hover:ring-orange-500/20 group overflow-hidden">
          
          {/* Dynamic Decorative highlight gradient - animated on hover */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent rotate-45 pointer-events-none group-hover:translate-x-1/4 group-hover:translate-y-1/4 transition-transform duration-1000" />

          <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-orange-600/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 relative z-10">
            {service.icon}
          </div>
          
          <h3 className="text-xl font-extrabold text-slate-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors relative z-10">
            {service.title}
          </h3>
          
          <p className="text-slate-600 leading-relaxed font-medium text-sm relative z-10">
            {service.desc}
          </p>
          
          <div className="mt-auto flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity relative z-10">
            <span>Kliknij po szczegóły</span>
            <svg className="w-4 h-4 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          
          {/* Bottom highlight bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/50 transition-all duration-700" />
        </div>

        {/* Back Side: Matching 3D style but in Corporate Orange */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 p-8 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-orange-700 text-white border-t border-l border-white/30 border-r border-b border-black/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
          
          {/* Subtle texture for back side */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-md">
              {service.icon}
            </div>
            <h4 className="font-black text-lg leading-tight tracking-tight">Zakres usług</h4>
          </div>
          
          <ul className="space-y-4 flex-grow relative z-10">
            {service.backDetails.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] shrink-0" />
                <span className="text-sm font-bold leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto pt-6 border-t border-white/20 flex justify-between items-center relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">MVM Patron Expert</span>
            <div className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
               <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
               </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="usługi" ref={sectionRef} className="relative py-32 overflow-hidden">
      <ParallaxBackground name="services-workshop" overlayClassName="bg-gradient-to-b from-slate-50/40 via-slate-50/10 to-slate-50/40" />
      <div className="container mx-auto px-6 relative z-10">
        <div className={`on-image text-center max-w-3xl mx-auto mb-24 reveal ${isVisible ? 'reveal-active' : ''}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-600 text-xs font-black uppercase tracking-[0.3em] mb-6">
            Ekspertyza & Technologia
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tighter leading-tight">Nasze Specjalizacje</h2>
          <p className="text-xl text-slate-800 font-medium leading-relaxed">
            Kompleksowa opieka nad kołami Twojego pojazdu. Wykorzystujemy najbardziej zaawansowane maszyny, by zapewnić Ci absolutne bezpieczeństwo na drodze.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              index={index} 
              isVisible={isVisible} 
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
        .perspective-1000 {
          perspective: 2000px;
        }
      `}</style>
    </section>
  );
};

export default Services;