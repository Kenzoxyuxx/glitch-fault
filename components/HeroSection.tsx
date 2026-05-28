'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const headline3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo(
        headline1Ref.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.3 }
      );
      gsap.fromTo(
        headline2Ref.current,
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.45 }
      );
      gsap.fromTo(
        headline3Ref.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.6 }
      );
      gsap.fromTo(
        phoneRef.current,
        { y: 60, opacity: 0, rotateY: 0 },
        { y: 0, opacity: 1, rotateY: -8, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.9 }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.1 }
      );

      // Scroll-driven parallax
      if (sectionRef.current) {
        gsap.to(headline1Ref.current, {
          x: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to(headline2Ref.current, {
          x: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to(headline3Ref.current, {
          x: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        // Phone tilts toward viewer on scroll
        gsap.to(phoneRef.current, {
          rotateX: 12,
          rotateY: 8,
          scale: 0.92,
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ backgroundColor: '#1C122C', perspective: '1200px' }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines" />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212, 255, 42, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Brutalist headline stack */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 flex flex-col items-center">
        {/* Headline block */}
        <div className="relative w-full flex flex-col items-start md:items-center gap-0 mb-8">
          <div
            ref={headline1Ref}
            className="font-black uppercase leading-none text-left md:text-center"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 10rem)',
              color: '#F3EFFB',
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              willChange: 'transform',
            }}
          >
            VIRAL.
          </div>
          <div
            ref={headline2Ref}
            className="font-black uppercase leading-none self-end md:self-center"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 10rem)',
              color: '#D4FF2A',
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              willChange: 'transform',
            }}
          >
            MOBILE.
          </div>
          <div
            ref={headline3Ref}
            className="font-black uppercase leading-none text-left md:text-center"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 10rem)',
              color: '#F3EFFB',
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              willChange: 'transform',
              WebkitTextStroke: '2px #F3EFFB',
              WebkitTextFillColor: 'transparent',
            }}
          >
            UNBOUND.
          </div>
        </div>

        {/* Phone mockup */}
        <div
          ref={phoneRef}
          className="relative float-phone"
          style={{
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            zIndex: 20,
          }}
        >
          {/* Phone outer shell */}
          <div
            className="relative volt-glow"
            style={{
              width: 'clamp(200px, 22vw, 280px)',
              height: 'clamp(380px, 42vw, 530px)',
              borderRadius: '36px',
              backgroundColor: '#120C1E',
              border: '2px solid rgba(212, 255, 42, 0.35)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {/* Notch */}
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
              style={{
                width: '80px',
                height: '22px',
                backgroundColor: '#0D0918',
                borderRadius: '12px',
                zIndex: 2,
              }}
            >
              <div className="w-2 h-2 rounded-full ml-3" style={{ backgroundColor: '#281D3D' }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#D4FF2A', opacity: 0.6 }} />
            </div>

            {/* Screen area */}
            <div
              className="absolute inset-2 rounded-[28px] overflow-hidden"
              style={{ backgroundColor: '#0A0614' }}
            >
              {/* Game screen content - simulated game UI */}
              <div className="relative w-full h-full overflow-hidden">
                {/* Animated game background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #0F0A1A 0%, #1A0F2E 50%, #0A1A12 100%)',
                  }}
                />

                {/* Scanlines on screen */}
                <div className="absolute inset-0 scanlines opacity-30" />

                {/* Simulated game HUD */}
                <div className="absolute inset-0 flex flex-col p-3">
                  {/* Top HUD bar */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((h) => (
                        <div
                          key={h}
                          className="w-3 h-3"
                          style={{
                            backgroundColor: h <= 2 ? '#FF5A36' : 'rgba(255,90,54,0.25)',
                            clipPath: 'polygon(50% 0%, 100% 35%, 82% 100%, 18% 100%, 0% 35%)',
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono-custom font-bold" style={{ color: '#D4FF2A', fontSize: '8px' }}>
                        12,480
                      </div>
                      <div className="text-xs font-mono-custom" style={{ color: '#9B90B8', fontSize: '6px' }}>
                        SCORE
                      </div>
                    </div>
                  </div>

                  {/* Game area */}
                  <div className="flex-1 relative overflow-hidden">
                    {/* Moving grid */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(212,255,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,255,42,0.06) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        animation: 'marquee-left 3s linear infinite',
                      }}
                    />

                    {/* Game elements */}
                    <div
                      className="absolute"
                      style={{
                        bottom: '35%',
                        left: '30%',
                        width: '28px',
                        height: '28px',
                        backgroundColor: '#D4FF2A',
                        clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                        filter: 'drop-shadow(0 0 8px rgba(212,255,42,0.8))',
                        animation: 'float-phone 1.5s ease-in-out infinite',
                      }}
                    />

                    {/* Obstacles */}
                    {[20, 55, 75].map((pos, i) => (
                      <div
                        key={i}
                        className="absolute"
                        style={{
                          bottom: `${20 + i * 15}%`,
                          right: `${pos}%`,
                          width: '12px',
                          height: '18px',
                          backgroundColor: '#FF5A36',
                          filter: 'drop-shadow(0 0 4px rgba(255,90,54,0.6))',
                        }}
                      />
                    ))}
                  </div>

                  {/* Bottom controls */}
                  <div className="flex justify-between items-end pt-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ border: '1px solid rgba(212,255,42,0.3)', backgroundColor: 'rgba(212,255,42,0.05)' }}
                    >
                      <div className="grid grid-cols-3 gap-0.5 w-5 h-5">
                        {[false, true, false, true, false, true, false, true, false].map((filled, idx) => (
                          <div
                            key={idx}
                            className="w-1 h-1"
                            style={{ backgroundColor: filled ? '#D4FF2A' : 'transparent' }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {['A', 'B'].map((btn) => (
                        <div
                          key={btn}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono-custom"
                          style={{
                            backgroundColor: btn === 'A' ? 'rgba(212,255,42,0.15)' : 'rgba(255,90,54,0.15)',
                            border: `1px solid ${btn === 'A' ? 'rgba(212,255,42,0.4)' : 'rgba(255,90,54,0.4)'}`,
                            color: btn === 'A' ? '#D4FF2A' : '#FF5A36',
                            fontSize: '9px',
                          }}
                        >
                          {btn}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* LIVE badge */}
                <div
                  className="absolute top-10 right-3 px-1.5 py-0.5 flex items-center gap-1"
                  style={{ backgroundColor: '#FF5A36' }}
                >
                  <div className="w-1 h-1 rounded-full bg-white" style={{ animation: 'volt-pulse 1s ease-in-out infinite' }} />
                  <span className="text-white font-mono-custom font-bold" style={{ fontSize: '7px' }}>LIVE</span>
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
              style={{ width: '40px', height: '3px', backgroundColor: 'rgba(243,239,251,0.4)' }}
            />
          </div>

          {/* Phone glow reflection */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2"
            style={{
              width: '160px',
              height: '30px',
              background: 'radial-gradient(ellipse, rgba(212,255,42,0.25) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
        </div>

        {/* Subtitle & tags */}
        <div ref={subtitleRef} className="mt-12 text-center max-w-lg">
          <p className="text-sm tracking-[0.25em] uppercase font-mono-custom mb-4" style={{ color: '#9B90B8' }}>
            CURATED DROPS — TRENDING GAMES — EXCLUSIVE ACCESS
          </p>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['ACTION', 'ROGUELITE', 'MULTIPLAYER', 'STRATEGY', 'BATTLE ROYALE'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs tracking-[0.2em] font-mono-custom border"
                style={{
                  color: '#9B90B8',
                  borderColor: 'rgba(155, 144, 184, 0.2)',
                  backgroundColor: 'rgba(40, 29, 61, 0.5)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-8 flex items-center gap-6">
          <a
            href="#viral-matrix"
            data-cursor="hover"
            className="px-8 py-4 font-mono-custom font-bold text-sm tracking-[0.2em] uppercase transition-all duration-200"
            style={{
              backgroundColor: '#D4FF2A',
              color: '#1C122C',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
            }}
          >
            EXPLORE VAULT
          </a>
          <a
            href="#spec-scanner"
            className="text-sm tracking-[0.15em] uppercase font-mono-custom flex items-center gap-2 group"
            style={{ color: '#9B90B8' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: '#9B90B8' }} />
            SEE TRENDING
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #1C122C)' }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="text-xs tracking-[0.3em] uppercase font-mono-custom" style={{ color: 'rgba(155,144,184,0.5)' }}>
          SCROLL
        </div>
        <div
          className="w-px h-12 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(155,144,184,0.2)' }}
        >
          <div
            className="absolute top-0 w-full"
            style={{
              height: '40%',
              backgroundColor: '#D4FF2A',
              animation: 'scan-beam 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
