'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string | HTMLElement, o?: object) => void } }).__lenis;
    const target = document.querySelector(href);
    if (lenis && target) {
      lenis.scrollTo(href as unknown as HTMLElement, { offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[9000] flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            'flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 md:px-6',
            scrolled
              ? 'glass shadow-[0_8px_32px_rgba(0,0,0,0.06)] py-1.5'
              : 'bg-transparent py-2'
          )}
        >
          <button
            onClick={() => handleNav('#home')}
            className="flex items-center gap-3"
            aria-label="Fionas Designs home"
          >
            <div
              className={cn(
                'relative overflow-hidden rounded-full ring-1 ring-[#EAEAEA] transition-all duration-500',
                scrolled ? 'h-9 w-9' : 'h-11 w-11'
              )}
            >
              <Image
                src="/images/Fionas_Designs_original_logo.jpg"
                alt="Fionas Designs logo"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
            <span
              className={cn(
                'font-display tracking-wide text-[#111111] transition-all duration-500',
                scrolled ? 'text-base' : 'text-lg'
              )}
            >
              Fionas Designs
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="group relative px-4 py-2 text-sm font-medium text-[#111111] transition-colors hover:text-[#D4AF37]"
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('#contact')}
              className="hidden rounded-full bg-[#111111] px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#111111] md:block"
            >
              Start Your Project
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#111111] transition-colors hover:text-[#D4AF37] md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9500] flex flex-col bg-white md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-[#EAEAEA]">
                  <Image
                    src="/images/Fionas_Designs_original_logo.jpg"
                    alt="Fionas Designs logo"
                    fill
                    sizes="44px"
                    className="object-contain"
                  />
                </div>
                <span className="font-display text-lg text-[#111111]">
                  Fionas Designs
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#111111] hover:text-[#D4AF37]"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="group flex w-full items-baseline justify-between border-b border-[#EAEAEA] py-5 text-left"
                  >
                    <span className="font-display text-4xl text-[#111111] transition-colors group-hover:text-[#D4AF37]">
                      {link.label}
                    </span>
                    <span className="font-sans text-sm text-[#666666]">
                      0{i + 1}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="px-6 pb-10">
              <button
                onClick={() => handleNav('#contact')}
                className="w-full rounded-full bg-[#111111] py-4 text-center text-sm font-medium text-white"
              >
                Start Your Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
