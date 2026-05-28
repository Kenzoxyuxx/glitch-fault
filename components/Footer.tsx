'use client';

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 md:px-12 overflow-hidden"
      style={{
        backgroundColor: '#120C1E',
        borderTop: '1px solid rgba(212,255,42,0.08)',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div
              className="font-black text-2xl tracking-[0.3em] uppercase mb-4"
              style={{ color: '#F3EFFB' }}
            >
              GLITCH
              <span style={{ color: '#D4FF2A' }}>VAULT</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#9B90B8', lineHeight: 1.7 }}>
              The only mobile gaming store built for those who know what a good game actually feels like.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs tracking-[0.4em] uppercase font-mono-custom mb-4" style={{ color: '#D4FF2A' }}>
              NAVIGATE
            </div>
            <div className="space-y-2">
              {['VIRAL NOW', 'THE ARCHIVE', 'PRE-ORDERS', 'VAULT MEMBERSHIP', 'ABOUT'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm tracking-[0.15em] uppercase font-mono-custom transition-colors duration-200"
                  style={{ color: '#9B90B8' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F3EFFB'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#9B90B8'; }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div>
            <div className="text-xs tracking-[0.4em] uppercase font-mono-custom mb-4" style={{ color: '#FF5A36' }}>
              STORE STATS
            </div>
            <div className="space-y-3">
              {[
                { label: 'GAMES LISTED', value: '2,847' },
                { label: 'ACTIVE PLAYERS', value: '4.2M+' },
                { label: 'AVG RATING', value: '4.8 / 5' },
                { label: 'SINCE', value: '2024' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs font-mono-custom tracking-[0.15em]" style={{ color: '#9B90B8' }}>
                    {label}
                  </span>
                  <span className="text-xs font-bold font-mono-custom" style={{ color: '#F3EFFB' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(212,255,42,0.06)' }}
        >
          <div className="text-xs font-mono-custom tracking-[0.15em]" style={{ color: 'rgba(155,144,184,0.5)' }}>
            2024 GLITCH VAULT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            {['PRIVACY', 'TERMS', 'REFUNDS'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-mono-custom tracking-[0.15em] transition-colors duration-200"
                style={{ color: 'rgba(155,144,184,0.5)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#9B90B8'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(155,144,184,0.5)'; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
