
import React, { useState, useEffect, useRef, useCallback } from 'react';

const galleryItems = [
  { 
    url: "https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&q=80&w=1200", 
    title: "Profesjonalne Maszyny", 
    category: "Warsztat",
    size: "large"
  },
  { 
    url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800", 
    title: "Opony Terenowe 4x4", 
    category: "Realizacje",
    size: "normal"
  },
  { 
    url: "https://images.unsplash.com/photo-1532581133501-831872124508?auto=format&fit=crop&q=80&w=800", 
    title: "Precyzyjne Wyważanie", 
    category: "Serwis",
    size: "normal"
  },
  { 
    url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=1200", 
    title: "Felgi Aluminiowe Premium", 
    category: "Detailing",
    size: "large"
  },
  { 
    url: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=800", 
    title: "Wymiana Opon Motocyklowych", 
    category: "Jednoślady",
    size: "normal"
  },
  { 
    url: "https://images.unsplash.com/photo-1554231642-83232c94998d?auto=format&fit=crop&q=80&w=800", 
    title: "Opony Ciężarowe TIR", 
    category: "Gabaryty",
    size: "normal"
  }
];

const TireGallery: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryItems.length);
    }
  }, [selectedIndex]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, showNext, showPrev]);

  return (
    <section id="galeria" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isVisible ? 'reveal-active' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Nasza Praca w Obiektywie</h2>
          <p className="text-lg text-slate-600 font-medium">
            Zobacz, jak wygląda codzienność w MVM Patron. Stawiamy na czystość, nowoczesną technologię i najwyższą precyzję wykonania każdej usługi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div 
              key={index} 
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-[2.5rem] group shadow-xl cursor-zoom-in reveal ${isVisible ? 'reveal-active' : ''} ${item.size === 'large' ? 'md:row-span-2' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 min-h-[300px]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 rounded-lg bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest mb-3">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-bold tracking-tight drop-shadow-md">
                  {item.title}
                </h3>
              </div>

              <div className="absolute inset-4 border-2 border-white/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none scale-95 group-hover:scale-100 duration-500" />
            </div>
          ))}
        </div>

        <div className={`mt-20 text-center reveal ${isVisible ? 'reveal-active' : ''}`}>
          <a 
            href="https://www.facebook.com/mvmpatron" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-orange-600 transition-all group active:scale-95 shadow-2xl shadow-slate-900/20"
          >
            <span>Zobacz więcej na Facebooku</span>
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[110] text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full"
            aria-label="Zamknij podgląd"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev Button */}
          <button 
            onClick={showPrev}
            className="absolute left-4 sm:left-10 z-[110] text-white/50 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-4 sm:p-6 rounded-full hover:scale-110 active:scale-95"
            aria-label="Poprzednie zdjęcie"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button 
            onClick={showNext}
            className="absolute right-4 sm:right-10 z-[110] text-white/50 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-4 sm:p-6 rounded-full hover:scale-110 active:scale-95"
            aria-label="Następne zdjęcie"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Image Container */}
          <div 
            className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group w-full max-h-[80vh] flex items-center justify-center">
              <img 
                src={galleryItems[selectedIndex].url} 
                alt={galleryItems[selectedIndex].title}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/10 animate-in zoom-in-95 duration-500"
              />
            </div>
            
            <div className="mt-8 text-center animate-in slide-in-from-bottom-4 duration-500">
              <span className="inline-block px-4 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-black uppercase tracking-[0.2em] mb-3">
                {galleryItems[selectedIndex].category}
              </span>
              <h4 className="text-white text-3xl font-black tracking-tight mb-2">
                {galleryItems[selectedIndex].title}
              </h4>
              <p className="text-white/50 font-bold uppercase tracking-widest text-xs">
                Zdjęcie {selectedIndex + 1} z {galleryItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TireGallery;
