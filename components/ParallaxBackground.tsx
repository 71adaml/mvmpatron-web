import React, { useEffect, useRef } from 'react';

interface ParallaxBackgroundProps {
  // Base name of the image in public/images: bg-<name>-1200.webp and bg-<name>-1800.webp
  name: string;
  // Layer drawn over the picture so text and glass cards stay readable
  overlayClassName: string;
}

// A section background picture that moves much slower than the page while scrolling.
// The picture is pinned to the screen (sized to the screen, not to the section, so tall
// sections don't blow it up) and the section works as a window onto it.
// The parent section needs `relative overflow-hidden`; content goes in a `relative` wrapper on top.
// How far the picture drifts up while its section scrolls past, as a share of the screen height
const DRIFT = 0.12;

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ name, overlayClassName }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const section = img?.parentElement?.parentElement;
    if (!img || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // 0 when the section enters at the bottom of the screen, 1 when it leaves at the top
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      img.style.transform = `translate3d(0, ${progress * -DRIFT * 100}vh, 0)`;
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
      {/* clip-path keeps the pinned picture inside this section */}
      <div className="absolute inset-0 pointer-events-none" style={{ clipPath: 'inset(0)' }}>
        <img
          ref={imgRef}
          src={`/images/bg-${name}-1200.webp`}
          srcSet={`/images/bg-${name}-1200.webp 1200w, /images/bg-${name}-1800.webp 1800w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={{ height: `${(1 + DRIFT) * 100}lvh` }}
          className="fixed left-0 top-0 w-full h-screen object-cover will-change-transform select-none"
        />
      </div>
      <div className={`absolute inset-0 pointer-events-none ${overlayClassName}`} />
    </>
  );
};

export default ParallaxBackground;
