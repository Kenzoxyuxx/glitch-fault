import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GLITCH VAULT — Mobile Gaming Store',
  description: 'Curated drops. Trending viral mobile games. Exclusive access.',
  openGraph: {
    title: 'GLITCH VAULT',
    description: 'Curated drops. Trending viral mobile games. Exclusive access.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ backgroundColor: '#1C122C', color: '#F3EFFB' }}>
        {children}
      </body>
    </html>
  );
}
