'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    document.documentElement.classList.add('custom-cursor-active');

    const move = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        setHidden(false);
      });
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );
      setHovering(!!interactive);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: hovering ? 56 : 14,
            height: hovering ? 56 : 14,
            opacity: hidden ? 0 : 1,
            scale: clicking ? 0.7 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: hovering ? 'rgba(212,175,55,0.9)' : 'rgba(17,17,17,0.6)',
              backgroundColor: hovering ? 'rgba(212,175,55,0.12)' : 'transparent',
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]"
          animate={{
            width: clicking ? 8 : 6,
            height: clicking ? 8 : 6,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 500 }}
        />
      </motion.div>
    </>
  );
}
