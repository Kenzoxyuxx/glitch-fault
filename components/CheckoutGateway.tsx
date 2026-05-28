'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CheckoutGateway() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: 'top 75%',
          onEnter: () => {
            const words = headingRef.current?.querySelectorAll('.word-reveal');
            if (!words) return;
            gsap.fromTo(
              words,
              { y: '100%', opacity: 0 },
              { y: '0%', opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power4.out' }
            );
          },
          once: true,
        });
      }

      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll('.content-reveal');
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(
              items,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    const trail = trailRef.current;
    if (!btn || !trail) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Magnetic pull
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Trail glow follows cursor
    gsap.to(trail, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      duration: 0.2,
      ease: 'none',
    });
  };

  const onMouseLeave = () => {
    const btn = btnRef.current;
    const trail = trailRef.current;
    if (!btn || !trail) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });

    gsap.to(trail, {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="checkout"
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: '#1C122C' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-lines opacity-20" />

      {/* Large background text watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="font-black uppercase whitespace-nowrap"
          style={{
            fontSize: 'clamp(6rem, 20vw, 22rem)',
            color: 'rgba(212,255,42,0.03)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          VAULT
        </div>
      </div>

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-px h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(212,255,42,0.15) 40%, rgba(212,255,42,0.15) 60%, transparent 100%)',
          right: '15%',
          transform: 'skewX(-5deg)',
        }}
      />

      <div className="relative z-10 max-w-[1100px] w-full">
        {/* Phase tag */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-px" style={{ backgroundColor: '#D4FF2A' }} />
          <span className="text-xs tracking-[0.4em] uppercase font-mono-custom" style={{ color: '#D4FF2A' }}>
            PHASE 04
          </span>
        </div>

        {/* Main heading with overflow clip reveal */}
        <div ref={headingRef} className="mb-12 overflow-hidden">
          {[
            { text: 'UPGRADE YOUR', color: '#9B90B8', size: 'clamp(1.5rem, 4vw, 3.5rem)' },
            { text: 'POCKET', color: '#F3EFFB', size: 'clamp(3.5rem, 10vw, 10rem)' },
            { text: 'SYSTEM.', color: '#D4FF2A', size: 'clamp(3.5rem, 10vw, 10rem)' },
          ].map(({ text, color, size }) => (
            <div key={text} className="overflow-hidden leading-none">
              <div
                className="word-reveal font-black uppercase tracking-tight"
                style={{
                  color,
                  fontSize: size,
                  letterSpacing: '-0.02em',
                  lineHeight: text === 'UPGRADE YOUR' ? 1.2 : 0.9,
                }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description + feature list */}
          <div className="space-y-8">
            <p
              className="content-reveal text-base leading-relaxed opacity-0"
              style={{ color: '#9B90B8', lineHeight: 1.7 }}
            >
              The most curated collection of viral mobile games, ranked by real player data.
              No filler. No fluff. Every title battle-tested across millions of devices.
            </p>

            <div className="content-reveal space-y-4 opacity-0">
              {[
                { label: 'INSTANT ACCESS', desc: 'Download codes delivered instantly.' },
                { label: 'VAULT MEMBERSHIP', desc: 'Exclusive early access to pre-release titles.' },
                { label: 'ZERO HIDDEN FEES', desc: 'What you see is what you pay.' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{
                      border: '1px solid #D4FF2A',
                      backgroundColor: 'rgba(212,255,42,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div className="w-2 h-2" style={{ backgroundColor: '#D4FF2A' }} />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.25em] uppercase font-mono-custom font-bold mb-0.5" style={{ color: '#F3EFFB' }}>
                      {label}
                    </div>
                    <div className="text-sm" style={{ color: '#9B90B8' }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="content-reveal opacity-0">
            <div
              className="p-8 relative overflow-hidden"
              style={{
                backgroundColor: '#281D3D',
                border: '1px solid rgba(212,255,42,0.15)',
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-px" style={{ backgroundColor: '#D4FF2A' }} />
                <div className="absolute top-0 right-0 w-px h-full" style={{ backgroundColor: '#D4FF2A' }} />
              </div>

              <div className="mb-8">
                <div className="text-xs tracking-[0.3em] uppercase font-mono-custom mb-2" style={{ color: '#9B90B8' }}>
                  VAULT MEMBERSHIP
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-5xl font-mono-custom" style={{ color: '#F3EFFB' }}>
                    $9
                  </span>
                  <span className="font-mono-custom text-xl" style={{ color: '#FF5A36' }}>.99</span>
                  <span className="text-sm font-mono-custom" style={{ color: '#9B90B8' }}>/mo</span>
                </div>
                <div className="mt-2 text-xs font-mono-custom tracking-[0.15em] px-2 py-1 inline-block" style={{ backgroundColor: 'rgba(255,90,54,0.1)', color: '#FF5A36', border: '1px solid rgba(255,90,54,0.3)' }}>
                  SAVE 40% VS SINGLE TITLES
                </div>
              </div>

              {/* CTA button with magnetic effect */}
              <div className="relative">
                <button
                  ref={btnRef}
                  data-cursor="hover"
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  className="relative w-full py-5 font-black text-base tracking-[0.25em] uppercase font-mono-custom overflow-hidden fire-glow"
                  style={{
                    backgroundColor: '#FF5A36',
                    color: '#F3EFFB',
                    willChange: 'transform',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { backgroundColor: '#FF7052', duration: 0.2 });
                  }}
                >
                  {/* Fire trail glow */}
                  <div
                    ref={trailRef}
                    className="absolute pointer-events-none"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255,90,54,0.6) 0%, transparent 70%)',
                      transform: 'translate(-50%, -50%)',
                      opacity: 0,
                      zIndex: 0,
                    }}
                  />
                  <span className="relative z-10">ACCESS THE VAULT ↗</span>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-6 flex items-center justify-center gap-6">
                {['2.8K REVIEWS', 'SECURE CHECKOUT', 'INSTANT ACCESS'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <div className="w-1 h-1" style={{ backgroundColor: 'rgba(155,144,184,0.5)' }} />
                    <span className="text-xs font-mono-custom tracking-[0.1em]" style={{ color: 'rgba(155,144,184,0.6)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
