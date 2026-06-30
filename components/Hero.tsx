'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles } from 'lucide-react';

const Waterfall = dynamic(() => import('./waterfall/Waterfall'), { ssr: false });

interface HeroProps {
  onNavigate: (href: string) => void;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#f8f8f8] via-white to-[#f0f0f0]"
    >
      {/* 3D Waterfall background */}
      <div className="absolute inset-0 z-0">
        <Waterfall />
      </div>

      {/* Soft white gradient overlays for text legibility */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white/40 via-transparent to-white/70" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-white/30 via-transparent to-white/30" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white/70 px-5 py-2 text-xs font-medium tracking-[0.2em] text-[#666666] backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            PREMIUM CREATIVE STUDIO
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#111111] text-shadow-luxury sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Creative Designs That
            <br />
            Leave A <span className="gold-text">Lasting Impression</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl font-serif text-lg leading-relaxed text-[#444444] sm:text-xl md:text-2xl"
          >
            Helping businesses build unforgettable brands through timeless logo
            design, branding, creative identity, and premium visual experiences.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              onClick={() => onNavigate('#portfolio')}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#111111] px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:gold-glow"
            >
              <span className="relative z-10">Explore Portfolio</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#D4AF37] to-[#B8962B] transition-transform duration-500 group-hover:translate-x-0" />
            </button>
            <button
              onClick={() => onNavigate('#contact')}
              className="group flex items-center gap-2 rounded-full border border-[#111111] bg-white/80 px-8 py-4 text-sm font-medium text-[#111111] backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.3em] text-[#666666]">SCROLL</span>
          <div className="relative h-12 w-px overflow-hidden bg-[#EAEAEA]">
            <motion.div
              className="absolute inset-x-0 top-0 h-4 bg-[#D4AF37]"
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
