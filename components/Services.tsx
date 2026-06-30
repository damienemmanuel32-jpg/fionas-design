'use client';

import { motion } from 'framer-motion';
import {
  PenTool,
  Layers,
  Share2,
  Package,
  CreditCard,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Printer,
  Monitor,
  Sparkles,
} from 'lucide-react';

const services = [
  { icon: PenTool, title: 'Logo Design', desc: 'Distinctive marks that capture the essence of your brand in a single timeless symbol.' },
  { icon: Layers, title: 'Brand Identity', desc: 'Complete visual systems — color, type, voice — built to resonate across every touchpoint.' },
  { icon: Share2, title: 'Social Media Design', desc: 'Scroll-stopping content crafted to grow your audience and elevate your presence.' },
  { icon: Package, title: 'Packaging Design', desc: 'Tactile, memorable packaging that turns unboxing into an experience worth sharing.' },
  { icon: CreditCard, title: 'Business Cards', desc: 'Refined stationery that leaves a lasting impression long after the handshake.' },
  { icon: FileText, title: 'Flyers', desc: 'Bold, clear, and persuasive — flyers that command attention and drive action.' },
  { icon: BookOpen, title: 'Brochures', desc: 'Editorial-quality brochures that tell your story with elegance and clarity.' },
  { icon: ImageIcon, title: 'Banner Design', desc: 'High-impact banners for web and print, designed to convert and impress.' },
  { icon: Printer, title: 'Print Design', desc: 'From magazines to menus — print work crafted with obsessive attention to detail.' },
  { icon: Monitor, title: 'Digital Graphics', desc: 'Pixel-perfect digital assets engineered for every screen and platform.' },
  { icon: Sparkles, title: 'Creative Branding', desc: 'Strategic creative direction that makes your brand impossible to ignore.' },
];

export default function Services({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section id="services" className="relative bg-[#F8F8F8] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-[#D4AF37]">
            WHAT WE CRAFT
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[#111111] md:text-6xl">
            Our Services
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg text-[#666666]">
            A full spectrum of premium design services, each delivered with
            obsessive craft and timeless elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-[#D4AF37]/5 transition-transform duration-700 group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#F8F8F8] text-[#111111] transition-colors duration-500 group-hover:bg-[#D4AF37] group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#111111]">
                    {s.title}
                  </h3>
                  <p className="mt-3 font-serif text-base leading-relaxed text-[#666666]">
                    {s.desc}
                  </p>
                  <div className="mt-6 h-px w-0 bg-gradient-to-r from-[#D4AF37] to-transparent transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => onNavigate('#contact')}
            className="group inline-flex items-center gap-2 rounded-full border border-[#111111] px-8 py-4 text-sm font-medium text-[#111111] transition-all duration-300 hover:bg-[#111111] hover:text-white"
          >
            Start Your Project
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
