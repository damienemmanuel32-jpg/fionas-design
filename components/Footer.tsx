'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Facebook, Mail, ArrowUp, Send } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'Logo Design',
  'Brand Identity',
  'Social Media Design',
  'Packaging Design',
  'Business Cards',
  'Creative Branding',
];

interface FooterProps {
  onNavigate: (href: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] pt-20 text-white">
      {/* Gold divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/20">
                <Image
                  src="/images/Fionas_Designs_original_logo.jpg"
                  alt="Fionas Designs logo"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <span className="font-display text-xl">Fionas Designs</span>
            </div>
            <p className="mt-6 font-serif text-sm leading-relaxed text-white/50">
              Turning ideas into timeless designs. A premium creative studio
              crafting unforgettable brands since 2005.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/fionasdesigns/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/fionasdesgins"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:fionasdesigns@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wider text-white">
              QUICK LINKS
            </h4>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => onNavigate(l.href)}
                    className="group flex items-center gap-2 font-serif text-sm text-white/50 transition-colors hover:text-[#D4AF37]"
                  >
                    <span className="h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wider text-white">
              SERVICES
            </h4>
            <ul className="mt-6 space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => onNavigate('#services')}
                    className="group flex items-center gap-2 font-serif text-sm text-white/50 transition-colors hover:text-[#D4AF37]"
                  >
                    <span className="h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-4" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wider text-white">
              NEWSLETTER
            </h4>
            <p className="mt-6 font-serif text-sm text-white/50">
              Subscribe for design insights and studio updates.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#111111] transition-transform hover:scale-110"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-6 space-y-2 font-serif text-sm text-white/50">
              <a href="mailto:fionasdesigns@gmail.com" className="block transition-colors hover:text-[#D4AF37]">
                fionasdesigns@gmail.com
              </a>
              <a href="https://www.instagram.com/fionasdesigns/" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-[#D4AF37]">
                Instagram
              </a>
              <a href="https://www.facebook.com/fionasdesgins" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-[#D4AF37]">
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <p className="text-center font-serif text-sm text-white/40">
            © 2005 Fionas Designs. All Rights Reserved.
          </p>
          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -4 }}
            className="group flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/70 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            Back To Top
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
