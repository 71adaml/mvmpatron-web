import React from 'react';

// Soft, slowly drifting colour blobs behind the whole page; the glass panels blur them.
const LiquidBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 pointer-events-none" aria-hidden="true">
    <div className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full bg-orange-300/50 blur-[120px] animate-drift" />
    <div className="absolute top-1/3 -right-40 w-[38rem] h-[38rem] rounded-full bg-sky-200/60 blur-[120px] animate-drift-slow" />
    <div className="absolute -bottom-40 left-1/4 w-[36rem] h-[36rem] rounded-full bg-amber-200/60 blur-[120px] animate-drift" />
    <div className="absolute top-1/2 left-0 w-[24rem] h-[24rem] rounded-full bg-rose-200/40 blur-[100px] animate-drift-slow" />
  </div>
);

export default LiquidBackground;
