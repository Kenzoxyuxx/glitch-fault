'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GAMES = [
  {
    id: 1,
    rank: '01',
    title: 'SHADOW BREACH',
    genre: 'ACTION / STEALTH',
    price: '$4.99',
    rating: '4.9',
    downloads: '48.2M',
    platform: 'iOS + ANDROID',
    specs: ['60 FPS OPTIMIZED', 'DEVICE REQ: MID-TIER+', 'ONLINE CO-OP', '5.2GB INSTALL'],
    status: 'TRENDING #1',
    statusColor: '#D4FF2A',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    tag: 'VIRAL',
  },
  {
    id: 2,
    rank: '02',
    title: 'NEON SURGE',
    genre: 'ROGUELITE / RPG',
    price: 'FREE',
    rating: '4.7',
    downloads: '91.5M',
    platform: 'iOS + ANDROID',
    specs: ['120 FPS SUPPORT', 'DEVICE REQ: ENTRY+', 'OFFLINE PLAY', '1.8GB INSTALL'],
    status: 'BREAKOUT HIT',
    statusColor: '#FF5A36',
    image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    tag: 'HOT',
  },
  {
    id: 3,
    rank: '03',
    title: 'FRACTURE WARS',
    genre: 'MULTIPLAYER BATTLE',
    price: '$2.99',
    rating: '4.8',
    downloads: '33.7M',
    platform: 'ANDROID ONLY',
    specs: ['60 FPS OPTIMIZED', 'DEVICE REQ: HIGH-END', 'PVP 100-PLAYER', '3.4GB INSTALL'],
    status: 'NEW DROP',
    statusColor: '#D4FF2A',
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    tag: 'NEW',
  },
  {
    id: 4,
    rank: '04',
    title: 'CIRCUIT ZERO',
    genre: 'STRATEGY / PUZZLE',
    price: '$1.99',
    rating: '4.6',
    downloads: '22.1M',
    platform: 'iOS EXCLUSIVE',
    specs: ['60 FPS OPTIMIZED', 'DEVICE REQ: ENTRY+', 'TURN-BASED', '890MB INSTALL'],
    status: 'STAFF PICK',
    statusColor: '#FF5A36',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2',
    tag: 'PICK',
  },
];

function GameCard({ game, index }: { game: typeof GAMES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMouseEnter = () => {
    setHovered(true);
    if (!cardRef.current || !specsRef.current || !overlayRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1.03,
      duration: 0.35,
      ease: 'power2.out',
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.fromTo(
      specsRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
    );
  };

  const onMouseLeave = () => {
    setHovered(false);
    if (!cardRef.current || !specsRef.current || !overlayRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    gsap.to(specsRef.current, {
      opacity: 0,
      duration: 0.2,
    });
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: index * 0.12 }
        );
      },
      once: true,
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="game-card relative overflow-hidden"
      style={{
        backgroundColor: '#281D3D',
        border: `1px solid ${hovered ? '#D4FF2A' : 'rgba(212,255,42,0.1)'}`,
        willChange: 'transform',
        transition: 'border-color 0.3s ease',
        opacity: 0,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-cursor="hover"
    >
      {/* Game image */}
      <div className="relative overflow-hidden" style={{ height: '280px' }}>
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />

        {/* Liquid reveal overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex flex-col justify-end p-4 opacity-0"
          style={{ background: 'linear-gradient(to top, rgba(28,18,44,0.98) 0%, rgba(28,18,44,0.7) 50%, transparent 100%)' }}
        >
          {/* Specs list */}
          <div ref={specsRef} className="space-y-1.5 opacity-0">
            {game.specs.map((spec) => (
              <div key={spec} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: '#D4FF2A' }} />
                <span className="text-xs tracking-[0.15em] font-mono-custom font-bold" style={{ color: '#D4FF2A' }}>
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rank */}
        <div
          className="absolute top-3 left-3 font-black font-mono-custom"
          style={{ fontSize: '2.5rem', color: 'rgba(243,239,251,0.08)', lineHeight: 1 }}
        >
          {game.rank}
        </div>

        {/* Tag */}
        <div
          className="absolute top-3 right-3 px-2 py-1 text-xs font-bold font-mono-custom tracking-[0.15em]"
          style={{
            backgroundColor: game.statusColor,
            color: '#1C122C',
          }}
        >
          {game.tag}
        </div>
      </div>

      {/* Card info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div
              className="text-xs tracking-[0.25em] uppercase font-mono-custom mb-1"
              style={{ color: '#9B90B8' }}
            >
              {game.genre}
            </div>
            <h3
              className="font-black text-lg tracking-tight leading-tight"
              style={{ color: '#F3EFFB' }}
            >
              {game.title}
            </h3>
          </div>
          <div className="text-right">
            <div
              className="font-black text-xl font-mono-custom"
              style={{ color: game.price === 'FREE' ? '#D4FF2A' : '#FF5A36' }}
            >
              {game.price}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center justify-between mt-4 pt-4"
          style={{ borderTop: '1px solid rgba(212,255,42,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs font-mono-custom" style={{ color: '#9B90B8' }}>RATING</div>
              <div className="font-bold text-sm" style={{ color: '#F3EFFB' }}>{game.rating}</div>
            </div>
            <div
              className="w-px h-6"
              style={{ backgroundColor: 'rgba(212,255,42,0.1)' }}
            />
            <div>
              <div className="text-xs font-mono-custom" style={{ color: '#9B90B8' }}>DOWNLOADS</div>
              <div className="font-bold text-sm" style={{ color: '#F3EFFB' }}>{game.downloads}</div>
            </div>
          </div>

          <div
            className="px-2 py-1 text-xs font-mono-custom font-bold tracking-[0.1em]"
            style={{
              color: game.statusColor,
              border: `1px solid ${game.statusColor}`,
              backgroundColor: `${game.statusColor}15`,
            }}
          >
            {game.status}
          </div>
        </div>

        {/* Platform */}
        <div className="mt-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5" style={{ backgroundColor: '#9B90B8' }} />
          <span className="text-xs tracking-[0.15em] font-mono-custom" style={{ color: '#9B90B8' }}>
            {game.platform}
          </span>
        </div>

        {/* Action button */}
        <button
          className="mt-4 w-full py-3 text-xs tracking-[0.2em] uppercase font-mono-custom font-bold transition-all duration-200"
          style={{
            backgroundColor: hovered ? '#D4FF2A' : 'transparent',
            color: hovered ? '#1C122C' : '#D4FF2A',
            border: '1px solid rgba(212,255,42,0.4)',
          }}
        >
          ADD TO VAULT
        </button>
      </div>
    </div>
  );
}

export default function ViralMatrix() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="viral-matrix"
      className="relative py-24 px-6 md:px-12"
      style={{ backgroundColor: '#1C122C' }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,255,42,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: '#D4FF2A' }} />
            <span className="text-xs tracking-[0.4em] uppercase font-mono-custom" style={{ color: '#D4FF2A' }}>
              PHASE 02
            </span>
          </div>
          <h2
            className="font-black uppercase text-5xl md:text-7xl leading-none tracking-tight"
            style={{ color: '#F3EFFB', letterSpacing: '-0.02em' }}
          >
            THE VIRAL
            <br />
            <span style={{ color: '#D4FF2A' }}>MATRIX</span>
          </h2>
          <p className="mt-4 text-sm tracking-[0.1em] max-w-md" style={{ color: '#9B90B8' }}>
            CURATED FROM 2.4 BILLION SESSIONS. ONLY THE TOP-TIER MAKES IT IN.
          </p>
        </div>

        {/* Game grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GAMES.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>

        {/* Bottom label */}
        <div
          className="mt-12 flex items-center justify-between pt-6"
          style={{ borderTop: '1px solid rgba(212,255,42,0.08)' }}
        >
          <span className="text-xs tracking-[0.3em] uppercase font-mono-custom" style={{ color: '#9B90B8' }}>
            SHOWING 4 OF 2,847 GAMES
          </span>
          <a
            href="#"
            className="text-xs tracking-[0.2em] uppercase font-mono-custom flex items-center gap-2"
            style={{ color: '#D4FF2A' }}
          >
            VIEW ALL VAULT TITLES
            <span style={{ fontSize: '1.1em' }}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
