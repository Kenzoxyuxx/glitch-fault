'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Preloader from '@/components/Preloader';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const ViralMatrix = dynamic(() => import('@/components/ViralMatrix'), { ssr: false });
const SpecScanner = dynamic(() => import('@/components/SpecScanner'), { ssr: false });
const CheckoutGateway = dynamic(() => import('@/components/CheckoutGateway'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          backgroundColor: '#1C122C',
          minHeight: '100vh',
        }}
      >
        <Navigation />
        <main>
          <HeroSection />
          <ViralMatrix />
          <SpecScanner />
          <CheckoutGateway />
        </main>
        <Footer />
      </div>
    </>
  );
}
