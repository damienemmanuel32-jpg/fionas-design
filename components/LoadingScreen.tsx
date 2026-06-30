'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-24 w-24 overflow-hidden rounded-full ring-1 ring-[#EAEAEA] shadow-lg"
          >
            <Image
              src="/images/Fionas_Designs_original_logo.jpg"
              alt="Fionas Designs logo"
              fill
              sizes="96px"
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 font-display text-xl tracking-[0.3em] text-[#111111]"
          >
            FIONAS DESIGNS
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-2 font-serif text-xs tracking-[0.2em] text-[#666666]"
          >
            TURNING IDEAS INTO TIMELESS DESIGNS
          </motion.p>

          <div className="mt-8 h-px w-48 overflow-hidden bg-[#EAEAEA]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8962B]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="mt-3 font-sans text-xs tabular-nums text-[#666666]">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
