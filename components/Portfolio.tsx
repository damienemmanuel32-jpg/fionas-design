'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';

const projects = [
  {
    name: 'Aurora Botanicals',
    category: 'Brand Identity',
    desc: 'A luxury skincare brand identity inspired by morning mist and natural botanicals.',
    image: 'https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Maison Lumière',
    category: 'Logo Design',
    desc: 'An elegant monogram for a Parisian interior design atelier, crafted in gold leaf.',
    image: 'https://images.pexels.com/photos/3756893/pexels-photo-3756893.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Verde Coffee Co.',
    category: 'Packaging Design',
    desc: 'Sustainable coffee packaging that tells a story from farm to cup with warmth.',
    image: 'https://images.pexels.com/photos/3756878/pexels-photo-3756878.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Atelier Noir',
    category: 'Business Cards',
    desc: 'Minimalist letterpress business cards with blind deboss for a fashion house.',
    image: 'https://images.pexels.com/photos/3756894/pexels-photo-3756894.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Solstice Studio',
    category: 'Social Media Design',
    desc: 'A cohesive social media system for a wellness brand, built on soft gradients.',
    image: 'https://images.pexels.com/photos/3756880/pexels-photo-3756880.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Heritage Press',
    category: 'Brochure Design',
    desc: 'An editorial brochure for a fine art gallery, printed on uncoated stock.',
    image: 'https://images.pexels.com/photos/3756881/pexels-photo-3756881.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="portfolio" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <span className="text-xs font-medium tracking-[0.3em] text-[#D4AF37]">
              SELECTED WORK
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-[#111111] md:text-6xl">
              Portfolio
            </h2>
          </div>
          <p className="max-w-md font-serif text-lg text-[#666666]">
            A curated selection of projects where craft meets strategy — each
            one a story told through design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.button
              key={p.name}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl text-left"
            >
              <Image
                src={p.image}
                alt={`${p.name} — ${p.category}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 border-2 border-white/0 transition-all duration-500 group-hover:border-[#D4AF37]/60 group-hover:shadow-[inset_0_0_40px_rgba(212,175,55,0.2)]" />

              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wider text-white backdrop-blur-md">
                  {p.category}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">
                  {p.name}
                </h3>
                <div className="mt-2 flex items-center gap-2 overflow-hidden">
                  <p className="max-w-0 overflow-hidden whitespace-nowrap font-serif text-sm text-white/80 transition-all duration-500 group-hover:max-w-xs group-hover:pr-2">
                    {p.desc}
                  </p>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-45" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[8000] flex items-center justify-center bg-black/60 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#111111] backdrop-blur-md transition-colors hover:bg-[#D4AF37] hover:text-white"
                aria-label="Close project"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={projects[active].image}
                  alt={projects[active].name}
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <span className="text-xs font-medium tracking-[0.3em] text-[#D4AF37]">
                  {projects[active].category}
                </span>
                <h3 className="mt-3 font-display text-3xl font-bold text-[#111111] md:text-4xl">
                  {projects[active].name}
                </h3>
                <p className="mt-4 font-serif text-lg leading-relaxed text-[#666666]">
                  {projects[active].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
