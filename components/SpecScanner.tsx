'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TIER_LIST = [
  { rank: 'S', title: 'SHADOW BREACH', downloads: '48.2M', genre: 'ACTION' },
  { rank: 'S', title: 'NEON SURGE', downloads: '91.5M', genre: 'ROGUELITE' },
  { rank: 'A', title: 'FRACTURE WARS', downloads: '33.7M', genre: 'BATTLE' },
  { rank: 'A', title: 'CIRCUIT ZERO', downloads: '22.1M', genre: 'STRATEGY' },
  { rank: 'A', title: 'PIXEL DRIFT', downloads: '18.4M', genre: 'RACING' },
  { rank: 'B', title: 'VOID RUNNER', downloads: '12.9M', genre: 'PLATFORMER' },
  { rank: 'B', title: 'STELLAR SIEGE', downloads: '9.3M', genre: 'TOWER DEF' },
  { rank: 'C', title: 'BLOCK EMPIRE', downloads: '6.1M', genre: 'BUILDER' },
];

const MARQUEE_ITEMS = [
  'SHADOW BREACH', '91.5M PLAYERS', 'NEON SURGE', 'FRACTURE WARS',
  'VIRAL MATRIX', '60FPS GAMING', 'CIRCUIT ZERO', 'PIXEL DRIFT',
  'VOID RUNNER', 'TRENDING NOW', 'STELLAR SIEGE', 'TOP RATED',
];

const TIER_COLORS: Record<string, string> = {
  S: '#D4FF2A',
  A: '#FF5A36',
  B: '#F3EFFB',
  C: '#9B90B8',
};

function CounterStat({ label, start, end, suffix, color }: {
  label: string;
  start: number;
  end: number;
  suffix: string;
  color: string;
}) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;

        const duration = 2500;
        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(start + (end - start) * eased);
          setValue(current);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      once: true,
    });
  }, [start, end]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div
        className="font-black leading-none font-mono-custom"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color }}
      >
        {value.toLocaleString()}{suffix}
      </div>
      <div className="text-xs tracking-[0.3em] uppercase font-mono-custom" style={{ color: '#9B90B8' }}>
        {label}
      </div>
    </div>
  );
}

export default function SpecScanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const scanBeamRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    const beam = scanBeamRef.current;
    const content = contentRef.current;
    if (!beam || !content) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        const sectionH = sectionRef.current?.getBoundingClientRect().height || 800;

        gsap.set(beam, { top: 0, opacity: 1, display: 'block' });
        gsap.to(beam, {
          top: sectionH,
          duration: 2,
          ease: 'none',
          onUpdate: function () {
            // Reveal content as beam passes
          },
          onComplete: () => {
            gsap.to(beam, { opacity: 0, duration: 0.3 });
            setScanComplete(true);
          },
        });

        // Staggered reveals
        gsap.fromTo(
          content.querySelectorAll('.scan-reveal'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.5,
          }
        );
      },
      once: true,
    });

    if (headingRef.current) {
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spec-scanner"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#281D3D' }}
    >
      {/* Scanner beam */}
      <div
        ref={scanBeamRef}
        className="absolute left-0 right-0 z-30 pointer-events-none hidden"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #D4FF2A 20%, #D4FF2A 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(212,255,42,0.6), 0 0 40px rgba(212,255,42,0.3)',
          opacity: 0,
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: '#FF5A36' }} />
            <span className="text-xs tracking-[0.4em] uppercase font-mono-custom" style={{ color: '#FF5A36' }}>
              PHASE 03
            </span>
          </div>
          <h2
            className="font-black uppercase text-5xl md:text-7xl leading-none tracking-tight"
            style={{ color: '#F3EFFB', letterSpacing: '-0.02em' }}
          >
            SPEC
            <br />
            <span style={{ color: '#FF5A36' }}>SCANNER</span>
          </h2>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Live stats */}
          <div className="space-y-10">
            {/* Live counters */}
            <div
              className="scan-reveal p-8 opacity-0"
              style={{
                backgroundColor: '#1C122C',
                border: '1px solid rgba(212,255,42,0.12)',
              }}
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2" style={{ backgroundColor: '#FF5A36' }} />
                <span className="text-xs tracking-[0.4em] uppercase font-mono-custom" style={{ color: '#FF5A36' }}>
                  LIVE STORE DATA
                </span>
                <div
                  className="ml-auto px-2 py-0.5 text-xs font-mono-custom font-bold"
                  style={{ backgroundColor: 'rgba(255,90,54,0.15)', color: '#FF5A36', border: '1px solid rgba(255,90,54,0.3)' }}
                >
                  REAL-TIME
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <CounterStat label="TOTAL DOWNLOADS" start={0} end={194500000} suffix="+" color="#D4FF2A" />
                <CounterStat label="ACTIVE PLAYERS" start={0} end={4200000} suffix="+" color="#FF5A36" />
                <CounterStat label="GAMES AVAILABLE" start={0} end={2847} suffix="" color="#F3EFFB" />
                <CounterStat label="DAILY NEW REVIEWS" start={0} end={18400} suffix="+" color="#D4FF2A" />
              </div>
            </div>

            {/* Trending graph - simulated bars */}
            <div
              className="scan-reveal p-6 opacity-0"
              style={{
                backgroundColor: '#1C122C',
                border: '1px solid rgba(212,255,42,0.08)',
              }}
            >
              <div className="text-xs tracking-[0.3em] uppercase font-mono-custom mb-4" style={{ color: '#9B90B8' }}>
                7-DAY DOWNLOAD TREND
              </div>
              <div className="flex items-end gap-2 h-24">
                {[35, 58, 42, 78, 65, 90, 85].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full transition-all duration-1000"
                      style={{
                        height: scanComplete ? `${h}%` : '4px',
                        backgroundColor: i === 5 ? '#D4FF2A' : 'rgba(212,255,42,0.3)',
                        transitionDelay: `${i * 0.1}s`,
                      }}
                    />
                    <div className="text-xs font-mono-custom" style={{ color: '#9B90B8', fontSize: '9px' }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Tier list */}
          <div
            className="scan-reveal opacity-0"
            style={{
              backgroundColor: '#1C122C',
              border: '1px solid rgba(212,255,42,0.08)',
            }}
          >
            <div className="p-6 border-b" style={{ borderColor: 'rgba(212,255,42,0.08)' }}>
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.3em] uppercase font-mono-custom" style={{ color: '#9B90B8' }}>
                  VAULT TIER LIST
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#D4FF2A', animation: 'volt-pulse 1s ease-in-out infinite' }} />
                  <span className="text-xs font-mono-custom" style={{ color: '#D4FF2A' }}>UPDATING</span>
                </div>
              </div>
            </div>

            <div className="divide-y" style={{ borderColor: 'rgba(212,255,42,0.05)' }}>
              {TIER_LIST.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-4 transition-colors duration-200"
                  style={{
                    borderBottom: '1px solid rgba(212,255,42,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212,255,42,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Tier badge */}
                  <div
                    className="w-8 h-8 flex items-center justify-center font-black text-sm font-mono-custom flex-shrink-0"
                    style={{
                      backgroundColor: `${TIER_COLORS[item.rank]}15`,
                      border: `1px solid ${TIER_COLORS[item.rank]}40`,
                      color: TIER_COLORS[item.rank],
                    }}
                  >
                    {item.rank}
                  </div>

                  {/* Game info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm tracking-tight truncate" style={{ color: '#F3EFFB' }}>
                      {item.title}
                    </div>
                    <div className="text-xs font-mono-custom" style={{ color: '#9B90B8' }}>
                      {item.genre}
                    </div>
                  </div>

                  {/* Downloads */}
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-sm font-mono-custom" style={{ color: TIER_COLORS[item.rank] }}>
                      {item.downloads}
                    </div>
                    <div className="text-xs font-mono-custom" style={{ color: '#9B90B8' }}>
                      DL
                    </div>
                  </div>

                  {/* Rank number */}
                  <div
                    className="font-mono-custom font-black text-lg flex-shrink-0"
                    style={{ color: 'rgba(155,144,184,0.2)', width: '2rem', textAlign: 'right' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Infinite marquee */}
      <div
        className="mt-16 relative overflow-hidden py-4"
        style={{ borderTop: '1px solid rgba(212,255,42,0.1)', borderBottom: '1px solid rgba(212,255,42,0.1)' }}
      >
        <div className="flex whitespace-nowrap">
          <div className="marquee-left flex gap-12 items-center">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="text-xs tracking-[0.4em] uppercase font-mono-custom font-bold" style={{ color: '#9B90B8' }}>
                  {item}
                </span>
                <div className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: '#D4FF2A' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second marquee opposite direction */}
      <div className="relative overflow-hidden py-3">
        <div className="flex whitespace-nowrap">
          <div className="marquee-right flex gap-12 items-center">
            {[...MARQUEE_ITEMS.slice().reverse(), ...MARQUEE_ITEMS.slice().reverse()].map((item, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="text-xs tracking-[0.4em] uppercase font-mono-custom" style={{ color: 'rgba(155,144,184,0.35)' }}>
                  {item}
                </span>
                <div className="w-1 h-1 flex-shrink-0" style={{ backgroundColor: '#FF5A36', opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
