'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

function useScrambleText(finalText: string, isActive: boolean) {
  const [displayText, setDisplayText] = useState(finalText);
  const iterRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(finalText);
      return;
    }

    iterRef.current = 0;
    const maxIter = finalText.length * 2;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        finalText
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iterRef.current / 2) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iterRef.current += 1;
      if (iterRef.current >= maxIter) {
        setDisplayText(finalText);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, finalText]);

  return displayText;
}

function NavLink({ label, href }: { label: string; href: string }) {
  const [active, setActive] = useState(false);
  const text = useScrambleText(label, active);

  return (
    <a
      href={href}
      className="text-sm tracking-[0.15em] uppercase font-mono-custom transition-colors duration-200"
      style={{ color: active ? '#D4FF2A' : '#9B90B8' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {text}
    </a>
  );
}

export default function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(0);
  const [logoActive, setLogoActive] = useState(false);
  const logoText = useScrambleText('GLITCH VAULT', logoActive);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-5 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(28, 18, 44, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212, 255, 42, 0.08)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="font-black text-lg md:text-xl tracking-[0.3em] uppercase"
          style={{
            color: '#F3EFFB',
            letterSpacing: '0.28em',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
          onMouseEnter={() => setLogoActive(true)}
          onMouseLeave={() => setLogoActive(false)}
        >
          {logoText.split('').map((char, i) => (
            <span
              key={i}
              style={{
                color:
                  'GLITCH VAULT'.slice(0, 6).includes(char) && i < 6
                    ? '#F3EFFB'
                    : i >= 7
                    ? '#D4FF2A'
                    : '#F3EFFB',
              }}
            >
              {char}
            </span>
          ))}
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink label="VIRAL NOW" href="#viral-matrix" />
          <NavLink label="THE ARCHIVE" href="#spec-scanner" />
          <NavLink label="PRE-ORDERS" href="#checkout" />
        </nav>

        {/* Cart */}
        <a
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase font-mono-custom border transition-all duration-200"
          style={{
            color: '#F3EFFB',
            borderColor: 'rgba(212, 255, 42, 0.3)',
            backgroundColor: 'rgba(212, 255, 42, 0.05)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = '#D4FF2A';
            el.style.color = '#D4FF2A';
            el.style.backgroundColor = 'rgba(212, 255, 42, 0.1)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(212, 255, 42, 0.3)';
            el.style.color = '#F3EFFB';
            el.style.backgroundColor = 'rgba(212, 255, 42, 0.05)';
          }}
        >
          <span>VAULT BAG</span>
          <span
            className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold"
            style={{ backgroundColor: '#D4FF2A', color: '#1C122C' }}
          >
            {cartCount}
          </span>
        </a>
      </div>
    </header>
  );
}
