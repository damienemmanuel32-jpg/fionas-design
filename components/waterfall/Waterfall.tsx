'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const WaterfallCanvas = dynamic(
  () => import('./WaterfallCanvas'),
  { ssr: false, loading: () => null }
);

export default function Waterfall() {
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when hero at top, 1 when hero scrolled past
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height - vh * 0.5)));
      scrollRef.current = progress;
    };
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {mounted && <WaterfallCanvas scrollRef={scrollRef} mouseRef={mouseRef} />}
    </div>
  );
}
