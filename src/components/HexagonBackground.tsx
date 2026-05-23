import React from 'react';

const HexagonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Global Honeycomb Texture - slightly more visible */}
      <div className="absolute inset-0 honeycomb-pattern opacity-[0.2] mix-blend-multiply" />
      
      {/* Decorative Floating Hexagons - Higher Density */}
      <div className="absolute top-[15%] left-[5%] w-32 h-32 hexagon-float hidden md:block opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-brand-earth/40 stroke-[1.5]">
          <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" />
        </svg>
      </div>

      <div className="absolute top-[40%] right-[5%] w-24 h-24 hexagon-float-slow hidden md:block opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-brand-earth/30 stroke-1">
          <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" />
        </svg>
      </div>

      <div className="absolute bottom-[20%] left-[10%] w-40 h-40 hexagon-float-reverse hidden md:block opacity-25" style={{ animationDelay: '-7s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-brand-earth/35 stroke-[1.2]">
          <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" />
        </svg>
      </div>

      <div className="absolute bottom-[20%] right-[8%] w-48 h-48 hexagon-float hidden md:block opacity-30" style={{ animationDelay: '-5s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-brand-earth/30 stroke-1">
          <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" />
        </svg>
      </div>

      <div className="absolute top-[60%] left-[50%] w-16 h-16 hexagon-float-slow hidden lg:block opacity-15" style={{ animationDelay: '-12s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-brand-earth/20 stroke-[0.8]">
          <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" />
        </svg>
      </div>

      {/* Center Soft Glow Accent - more pronounced */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-earth/10 rounded-full blur-[120px] hexagon-pulse" />
      
      {/* Corner Accents - more visible */}
      <div className="absolute top-0 right-0 p-8 opacity-40 hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" className="stroke-brand-earth stroke-2 fill-none">
          <path d="M100 20 L120 32 L120 55 L100 67 L80 55 L80 32 Z" opacity="0.6" />
          <path d="M80 55 L100 67 L100 90 L80 102 L60 90 L60 67 Z" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

export default HexagonBackground;
