'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const bracketRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const bracket = bracketRef.current;
    if (!cursor || !bracket) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const ease = 0.18;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease;

      gsap.set(cursor, {
        x: cursorPos.current.x - 10,
        y: cursorPos.current.y - 10,
      });
      gsap.set(bracket, {
        x: cursorPos.current.x,
        y: cursorPos.current.y,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="hover"]') ||
        target.closest('.game-card')
      ) {
        setIsHovering(true);
        gsap.to(cursor, { scale: 2.5, borderColor: '#D4FF2A', duration: 0.2, ease: 'power2.out' });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="hover"]') ||
        target.closest('.game-card')
      ) {
        setIsHovering(false);
        gsap.to(cursor, { scale: 1, borderColor: '#F3EFFB', duration: 0.2, ease: 'power2.out' });
      }
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.7, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: isHovering ? 2.5 : 1, duration: 0.15 });
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isHovering]);

  return (
    <>
      {/* Main crosshair cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-5 h-5">
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-[#F3EFFB]" />
          {/* Crosshair lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-[#F3EFFB] -translate-y-1/2 opacity-80" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#F3EFFB] -translate-x-1/2 opacity-80" />
          {/* Outer square */}
          <div className="absolute inset-0 border border-[#F3EFFB] opacity-60" />
        </div>
      </div>

      {/* Hover bracket expansion */}
      {isHovering && (
        <div
          ref={bracketRef}
          className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ willChange: 'transform', animation: 'bracket-expand 0.2s ease forwards' }}
        >
          <div className="relative w-12 h-12">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4FF2A]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4FF2A]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4FF2A]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4FF2A]" />
          </div>
        </div>
      )}
    </>
  );
}
