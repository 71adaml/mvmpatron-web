
import React, { useEffect, useRef, useState } from 'react';

const pricing = [
  {
    category: "Felgi Stalowe",
    price: "100 zł",
    features: ["Wymiana 4 opon", "Wyważanie", "Dokręcanie kluczem dynamometrycznym", "Kontrola ciśnienia"],
    isPopular: false
  },
  {
    category: "Felgi Aluminiowe",
    price: "140 zł",
    features: ["Bezinwazyjny montaż", "Wyważanie laserowe", "Ciężarki klejone", "Czyszczenie piast"],
    isPopular: true
  },
  {
    category: "SUV / Off-Road",
    price: "180 zł",
    features: ["Duże rozmiary kół", "Opony Run-Flat / XL", "Optymalizacja bicia", "Kontrola stanu zaworów"],
    isPopular: false
  }
];

const Pricing: React.FC = () => {
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
    <section id="cennik" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-20 reveal ${isVisible ? 'reveal-active' : ''}`}>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Przejrzysty Cennik</h2>
          <p className="text-orange-600 font-bold uppercase tracking-widest text-sm">Ceny za komplet 4 kół • Brak ukrytych kosztów</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricing.map((plan, index) => (
            <div 
              key={index} 
              className={`relative p-10 rounded-3xl border-2 flex flex-col reveal ${isVisible ? 'reveal-active' : ''} ${plan.isPopular ? 'border-orange-600 shadow-2xl scale-105 z-10' : 'border-slate-100 shadow-sm'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                  Najczęściej wybierany
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.category}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-600 text-sm font-semibold">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href="#kontakt" 
                className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-center transition-all ${plan.isPopular ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Rezerwuj Termin
              </a>
            </div>
          ))}
        </div>
        
        <div className={`mt-16 text-center max-w-2xl mx-auto reveal ${isVisible ? 'reveal-active' : ''}`}>
           <p className="text-slate-500 font-semibold italic">
             * Wycena dla maszyn ciężkich, budowlanych i rolniczych ustalana jest indywidualnie na podstawie gabarytów i rodzaju usługi. Zapraszamy do kontaktu telefonicznego.
           </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
