'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const serviceOptions = [
  'Logo Design',
  'Brand Identity',
  'Social Media Design',
  'Packaging Design',
  'Business Cards',
  'Flyers',
  'Brochures',
  'Banner Design',
  'Print Design',
  'Digital Graphics',
  'Creative Branding',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    }, 4000);
  };

  const field = (
    label: string,
    name: keyof typeof form,
    type: string = 'text',
    icon: React.ReactNode,
    required: boolean = true
  ) => (
    <div className="group relative">
      <label htmlFor={name} className="mb-2 block text-xs font-medium tracking-wider text-[#666666]">
        {label.toUpperCase()}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#999999] transition-colors group-focus-within:text-[#D4AF37]">
          {icon}
        </span>
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full rounded-xl border border-[#EAEAEA] bg-white py-4 pl-12 pr-4 text-[#111111] outline-none transition-all duration-300 placeholder:text-[#999999] focus:border-[#D4AF37] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)]"
        />
      </div>
    </div>
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-[#F8F8F8] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-medium tracking-[0.3em] text-[#D4AF37]">
              GET IN TOUCH
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#111111] md:text-6xl">
              Let&apos;s Create Something
              <br />
              <span className="gold-text">Extraordinary Together</span>
            </h2>
            <p className="mt-8 max-w-md font-serif text-lg leading-relaxed text-[#666666]">
              Tell us about your vision. Whether you are launching a new brand
              or reimagining an existing one, we would love to help you craft
              something timeless.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:fionasdesigns@gmail.com"
                className="group flex items-center gap-4 text-[#111111] transition-colors hover:text-[#D4AF37]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EAEAEA] bg-white transition-colors group-hover:border-[#D4AF37]">
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                </span>
                fionasdesigns@gmail.com
              </a>
              <div className="flex items-center gap-4 text-[#666666]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EAEAEA] bg-white">
                  <Phone className="h-5 w-5" strokeWidth={1.5} />
                </span>
                Available worldwide — remote studio
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-[#EAEAEA] bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] md:p-10"
          >
            {submitted ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]/10"
                >
                  <CheckCircle2 className="h-10 w-10 text-[#D4AF37]" />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-[#111111]">
                  Thank You!
                </h3>
                <p className="mt-2 font-serif text-[#666666]">
                  Your message has been received. We will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {field('Name', 'name', 'text', <User className="h-5 w-5" strokeWidth={1.5} />)}
                {field('Email', 'email', 'email', <Mail className="h-5 w-5" strokeWidth={1.5} />)}
                {field('Phone', 'phone', 'tel', <Phone className="h-5 w-5" strokeWidth={1.5} />, false)}

                <div className="group relative">
                  <label htmlFor="service" className="mb-2 block text-xs font-medium tracking-wider text-[#666666]">
                    SERVICE NEEDED
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-xl border border-[#EAEAEA] bg-white py-4 px-4 text-[#111111] outline-none transition-all duration-300 focus:border-[#D4AF37] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)]"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="group relative">
                  <label htmlFor="message" className="mb-2 block text-xs font-medium tracking-wider text-[#666666]">
                    MESSAGE
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-4 text-[#999999] transition-colors group-focus-within:text-[#D4AF37]">
                      <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-xl border border-[#EAEAEA] bg-white py-4 pl-12 pr-4 text-[#111111] outline-none transition-all duration-300 placeholder:text-[#999999] focus:border-[#D4AF37] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)]"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#111111] py-4 text-sm font-medium text-white transition-all duration-300 hover:gold-glow"
                >
                  <span className="relative z-10">Start Your Project</span>
                  <Send className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
