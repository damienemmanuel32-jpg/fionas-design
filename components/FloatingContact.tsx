'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Facebook, MessageCircle, X } from 'lucide-react';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[7000] flex h-14 w-14 items-center justify-center rounded-full bg-[#111111] text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-110 hover:gold-glow"
            aria-label="Contact Fionas Designs"
          >
            <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#D4AF37]" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[8500] flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gradient-to-br from-[#111111] to-[#222] p-8 text-center">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/20">
                  <MessageCircle className="h-8 w-8 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">
                  Let&apos;s Talk
                </h3>
                <p className="mt-1 font-serif text-sm text-white/60">
                  Reach out through any channel below
                </p>
              </div>

              <div className="space-y-3 p-6">
                <a
                  href="mailto:fionasdesigns@gmail.com"
                  className="group flex items-center gap-4 rounded-2xl border border-[#EAEAEA] p-4 transition-all hover:border-[#D4AF37] hover:bg-[#F8F8F8]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F8F8] text-[#111111] transition-colors group-hover:bg-[#D4AF37] group-hover:text-white">
                    <Mail className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#111111]">Email Fionas Designs</p>
                    <p className="text-xs text-[#666666]">fionasdesigns@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/fionasdesigns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[#EAEAEA] p-4 transition-all hover:border-[#D4AF37] hover:bg-[#F8F8F8]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F8F8] text-[#111111] transition-colors group-hover:bg-[#D4AF37] group-hover:text-white">
                    <Instagram className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#111111]">Instagram</p>
                    <p className="text-xs text-[#666666]">@fionasdesigns</p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/fionasdesgins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[#EAEAEA] p-4 transition-all hover:border-[#D4AF37] hover:bg-[#F8F8F8]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F8F8] text-[#111111] transition-colors group-hover:bg-[#D4AF37] group-hover:text-white">
                    <Facebook className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#111111]">Facebook</p>
                    <p className="text-xs text-[#666666]">Fionas Designs</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
