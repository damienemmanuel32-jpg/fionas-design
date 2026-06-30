'use client';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
}

export default function Marquee({ items, className, reverse }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden whitespace-nowrap',
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'flex shrink-0 animate-marquee items-center gap-12 pr-12',
          reverse && '[animation-direction:reverse]'
        )}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-3xl text-[#111111] md:text-5xl"
          >
            <span className="opacity-80">{item}</span>
            <span className="text-[#D4AF37]">✦</span>
          </span>
        ))}
      </div>
      <div
        className={cn(
          'flex shrink-0 animate-marquee items-center gap-12 pr-12',
          reverse && '[animation-direction:reverse]'
        )}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-3xl text-[#111111] md:text-5xl"
          >
            <span className="opacity-80">{item}</span>
            <span className="text-[#D4AF37]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
