'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Fionas Designs transformed our brand from forgettable to unforgettable. The logo they crafted still gives me chills every time I see it.',
    name: 'Eleanor Vance',
    role: 'Founder, Aurora Botanicals',
  },
  {
    quote:
      'Working with Fiona felt like collaborating with an artist who truly understood our vision. Every detail was considered, every element intentional.',
    name: 'Marcus Chen',
    role: 'CEO, Verde Coffee Co.',
  },
  {
    quote:
      'The packaging design exceeded every expectation. Our products now fly off the shelves — customers buy them just to hold them.',
    name: 'Sofia Romano',
    role: 'Creative Director, Maison Lumière',
  },
  {
    quote:
      'Professional, elegant, and deeply talented. Fionas Designs delivered work that elevated our entire brand presence overnight.',
    name: 'James Whitfield',
    role: 'Owner, Heritage Press',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-[#D4AF37]">
            KIND WORDS
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[#111111] md:text-6xl">
            Testimonials
          </h2>
        </motion.div>

        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative mx-auto max-w-3xl rounded-3xl p-10 text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:p-16"
            >
              <Quote className="mx-auto h-10 w-10 text-[#D4AF37]" strokeWidth={1} />
              <div className="mt-6 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="mt-6 font-serif text-xl leading-relaxed text-[#111111] md:text-2xl">
                &ldquo;{testimonials[index].quote}&rdquo;
              </p>
              <div className="mt-8">
                <p className="font-display text-lg font-semibold text-[#111111]">
                  {testimonials[index].name}
                </p>
                <p className="mt-1 font-serif text-sm text-[#666666]">
                  {testimonials[index].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EAEAEA] text-[#111111] transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-[#EAEAEA]'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EAEAEA] text-[#111111] transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
