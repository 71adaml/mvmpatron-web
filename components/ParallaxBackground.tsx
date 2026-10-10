import React, { useEffect, useRef } from 'react';

interface ParallaxBackgroundProps {
  // Base name of the image in public/images: bg-<name>-1200.webp and bg-<name>-1800.webp
  name: string;
  // Layer drawn over the picture so text and glass cards stay readable
  overlayClassName: string;
}

// A section background picture that moves slower than the page while scrolling.
// The parent section needs `relative overflow-hidden`; content goes in a `relative` wrapper on top.
const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ name, overlayClassName }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const section = img?.parentElement;
    if (!img || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // 0 when the section's centre is in the middle of the screen
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      img.style.transform = `translate3d(0, ${offset * -0.2}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <img
        ref={imgRef}
        src={`/images/bg-${name}-1200.webp`}
        srcSet={`/images/bg-${name}-1200.webp 1200w, /images/bg-${name}-1800.webp 1800w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute left-0 w-full h-[140%] -top-[20%] object-cover will-change-transform pointer-events-none select-none"
      />
      <div className={`absolute inset-0 pointer-events-none ${overlayClassName}`} />
    </>
  );
};

export default ParallaxBackground;
