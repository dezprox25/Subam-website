import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinates (instant)
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // Ring coordinates (delayed/lerped)
  const ringX = useRef(0);
  const ringY = useRef(0);

  useEffect(() => {
    // Disable on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX.current - 4}px, ${mouseY.current - 4}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);

    // Lerp animation for the ring
    const animateRing = () => {
      const lerp = 0.15;
      ringX.current += (mouseX.current - ringX.current) * lerp;
      ringY.current += (mouseY.current - ringY.current) * lerp;

      if (ringRef.current) {
        const size = isHovered ? 60 : 40;
        ringRef.current.style.transform = `translate3d(${ringX.current - size / 2}px, ${ringY.current - size / 2}px, 0)`;
      }

      requestAnimationFrame(animateRing);
    };

    const animationId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [isHovered, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`cursor-dot transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      />
      <div 
        ref={ringRef} 
        className={`cursor-ring transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'hovered' : ''}`}
      >
        {/* Optional honeycomb hint in the ring */}
        <div className={`absolute inset-0 opacity-10 transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-0'}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-brand-earth stroke-[2]">
            <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
