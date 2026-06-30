'use client';

import { useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import FloatingContact from '@/components/FloatingContact';
import Footer from '@/components/Footer';

export default function Home() {
  const handleNavigate = useCallback((href: string) => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string | HTMLElement, o?: object) => void } }).__lenis;
    const target = document.querySelector(href);
    if (lenis && target) {
      lenis.scrollTo(href as unknown as HTMLElement, { offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <LoadingScreen />
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <main>
        <Hero onNavigate={handleNavigate} />

        <div className="border-y border-[#EAEAEA] bg-white py-6">
          <Marquee
            items={[
              'Logo Design',
              'Brand Identity',
              'Packaging',
              'Print Design',
              'Creative Branding',
              'Digital Graphics',
            ]}
          />
        </div>

        <Services onNavigate={handleNavigate} />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>

      <Footer onNavigate={handleNavigate} />
      <FloatingContact />
    </>
  );
}
