'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 1000, suffix: '+', label: 'Projects Delivered' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const duration = 2000;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#F8F8F8] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-medium tracking-[0.3em] text-[#D4AF37]">
              OUR STORY
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#111111] md:text-6xl">
              A Studio Dedicated to
              <br />
              <span className="gold-text">Timeless Design</span>
            </h2>
            <p className="mt-8 font-serif text-lg leading-relaxed text-[#666666]">
              Fionas Designs is a premium creative studio dedicated to helping
              brands stand out through thoughtful visual storytelling. Since
              2005, we have partnered with businesses around the world to craft
              identities that endure — blending artistry, strategy, and an
              obsessive attention to detail.
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-[#666666]">
              Every project begins with listening. We believe great design is
              not decoration — it is communication. From the first sketch to
              the final delivery, we pour our craft into work that feels
              considered, refined, and unmistakably yours.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#D4AF37]/30">
                <Image
                  src="/images/Fionas_Designs_original_logo.jpg"
                  alt="Fionas Designs logo"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-[#111111]">
                  Fiona
                </p>
                <p className="font-serif text-sm text-[#666666]">
                  Founder & Creative Director
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="relative overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
              >
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-[#D4AF37]/5" />
                <div className="relative">
                  <p className="font-display text-5xl font-bold text-[#111111] md:text-6xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 font-serif text-sm tracking-wide text-[#666666]">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
