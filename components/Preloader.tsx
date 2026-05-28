'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CODE_FRAGMENTS = [
  'INIT_VAULT_CORE.exe',
  'loading_game_matrix[0x4F2A]',
  'FETCH > viral_index.json',
  'DECODE: mobile_engine_v3',
  'CHECK: device_compat[all]',
  'STREAM > texture_cache',
  'PROC: rating_algorithm',
  'SYNC: leaderboard_data',
  'BUILD: vault_interface',
  'COMPILE: shader_pack_v2',
  'LINK: payment_gateway',
  'ENCRYPT: session_token',
  'VAULT_READY',
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const codeLineRef = useRef<HTMLDivElement>(null);
  const [currentFragment, setCurrentFragment] = useState(CODE_FRAGMENTS[0]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const totalFragments = CODE_FRAGMENTS.length;
    const intervalTime = 120;

    const interval = setInterval(() => {
      currentIndex++;
      const pct = Math.round((currentIndex / totalFragments) * 100);
      setPercent(pct);
      setCurrentFragment(CODE_FRAGMENTS[Math.min(currentIndex, totalFragments - 1)]);

      if (progressFillRef.current) {
        gsap.to(progressFillRef.current, {
          width: `${pct}%`,
          duration: 0.1,
          ease: 'none',
        });
      }

      if (currentIndex >= totalFragments) {
        clearInterval(interval);
        setTimeout(() => exitPreloader(), 400);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const exitPreloader = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(leftCurtainRef.current, {
      x: '-100%',
      duration: 0.7,
      ease: 'power4.inOut',
    })
      .to(
        rightCurtainRef.current,
        {
          x: '100%',
          duration: 0.7,
          ease: 'power4.inOut',
        },
        '<'
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        '-=0.1'
      );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1C122C' }}
    >
      {/* Grid lines background */}
      <div className="absolute inset-0 grid-lines opacity-30" />

      {/* Wave curtains */}
      <div
        ref={leftCurtainRef}
        className="absolute inset-y-0 left-0 w-1/2 z-10"
        style={{ backgroundColor: '#1C122C' }}
      />
      <div
        ref={rightCurtainRef}
        className="absolute inset-y-0 right-0 w-1/2 z-10"
        style={{ backgroundColor: '#1C122C' }}
      />

      {/* Content */}
      <div className="relative z-[11] w-full max-w-2xl px-8 flex flex-col gap-8">
        {/* Logo */}
        <div className="text-center">
          <div
            className="text-4xl font-black tracking-[0.3em] uppercase"
            style={{ color: '#F3EFFB', letterSpacing: '0.35em' }}
          >
            GLITCH
            <span style={{ color: '#D4FF2A' }}>VAULT</span>
          </div>
          <div
            className="mt-1 text-xs tracking-[0.6em] uppercase font-mono-custom"
            style={{ color: '#9B90B8' }}
          >
            MOBILE GAMING STORE
          </div>
        </div>

        {/* Code scanner */}
        <div
          className="border px-4 py-3 font-mono-custom"
          style={{ borderColor: 'rgba(212, 255, 42, 0.2)', backgroundColor: 'rgba(40, 29, 61, 0.8)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2" style={{ backgroundColor: '#D4FF2A' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: '#9B90B8' }}>
              SYSTEM BOOT
            </span>
          </div>
          <div
            ref={codeLineRef}
            className="text-sm font-mono-custom transition-all"
            style={{ color: '#D4FF2A', minHeight: '1.4em' }}
          >
            <span style={{ color: '#9B90B8' }}>&gt; </span>
            {currentFragment}
            <span className="inline-block w-2 h-4 ml-1 align-middle" style={{ backgroundColor: '#D4FF2A', animation: 'volt-pulse 0.8s ease-in-out infinite' }} />
          </div>
        </div>

        {/* Progress bar - retro pixel blocks */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs tracking-[0.3em] uppercase font-mono-custom" style={{ color: '#9B90B8' }}>
              LOADING VAULT
            </span>
            <span
              ref={percentRef}
              className="text-xs font-mono-custom font-bold"
              style={{ color: '#D4FF2A' }}
            >
              {percent}%
            </span>
          </div>

          {/* Pixel block progress bar */}
          <div
            ref={progressBarRef}
            className="w-full h-4 relative overflow-hidden"
            style={{ backgroundColor: 'rgba(40, 29, 61, 0.9)', border: '1px solid rgba(212, 255, 42, 0.25)' }}
          >
            <div
              ref={progressFillRef}
              className="absolute inset-y-0 left-0 flex gap-px"
              style={{ width: '0%', overflow: 'hidden' }}
            >
              {/* Pixel blocks */}
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 h-full"
                  style={{
                    width: 'calc(100% / 60)',
                    backgroundColor: i % 7 === 0 ? '#FF5A36' : '#D4FF2A',
                    opacity: i % 3 === 0 ? 0.85 : 1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Tick marks */}
          <div className="flex justify-between">
            {[0, 25, 50, 75, 100].map((tick) => (
              <span key={tick} className="text-xs font-mono-custom" style={{ color: 'rgba(155, 144, 184, 0.5)' }}>
                {tick}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
