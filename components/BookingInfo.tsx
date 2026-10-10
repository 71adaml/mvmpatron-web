import React from 'react';
import { OPENING_HOURS } from './openingHours';

const steps = [
  { title: 'Zadzwoń', desc: 'Powiedz, jaki masz pojazd i czego potrzebujesz. Doradzimy przez telefon.' },
  { title: 'Umów termin', desc: 'Pracujemy na wizyty umówione, więc nie czekasz w kolejce.' },
  { title: 'Przyjedź do warsztatu', desc: 'ul. Wrocławska 32a, Pisarzowice. Przywieź swoje opony, a my zajmiemy się resztą.' },
];

const faq = [
  {
    q: 'Czy muszę się umówić?',
    a: 'Tak. Przyjmujemy po wcześniejszym umówieniu telefonicznym pod numerem +48 721 456 905.',
  },
  {
    q: 'Czy sprzedajecie opony?',
    a: 'Nie sprzedajemy opon. Przywieź własne, a my je zamontujemy, wyważymy lub naprawimy.',
  },
  {
    q: 'Czy mogę zostawić opony na przechowanie?',
    a: 'Tak, prowadzimy przechowalnię opon. Zapytaj o szczegóły przy umawianiu wizyty.',
  },
  {
    q: 'Jak mogę zapłacić?',
    a: 'Gotówką lub kartą.',
  },
  {
    q: 'W jakich godzinach pracujecie?',
    a: OPENING_HOURS.map((h) => `${h.days}: ${h.hours}`).join(', ') + '.',
  },
];

const BookingInfo: React.FC = () => {
  return (
    <section id="jak-sie-umowic" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Jak się umówić</h2>
            <p className="text-lg text-slate-600 font-medium">
              Pracujemy na wizyty umówione telefonicznie. To proste:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {steps.map((step, index) => (
              <div key={step.title} className="p-8 rounded-3xl glass transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-orange-600/30">
                  {index + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-2">{step.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-20">
            <a
              href="tel:+48721456905"
              className="inline-block bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/30 border-b-4 border-orange-800 active:scale-95"
            >
              Zadzwoń i umów wizytę: +48 721 456 905
            </a>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight text-center">Najczęstsze pytania</h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <details key={item.q} className="group p-6 rounded-3xl glass transition-all">
                  <summary className="flex justify-between items-center gap-4 cursor-pointer list-none font-bold text-slate-900 text-lg">
                    {item.q}
                    <svg className="w-5 h-5 text-orange-600 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-slate-600 font-medium leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingInfo;
