'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile, stats, skills } from '@/lib/data';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

function Counter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Start at the target value as a hardcoded fallback so it NEVER shows 0
  const inView = useInView(ref, { once: true, margin: '-40px', amount: 0.2 });
  const [n, setN] = useState<number>(value);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!inView || animatedRef.current) return;
    animatedRef.current = true;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    setN(0); // start count-up from 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = eased * value;
      setN(decimals > 0 ? Number(current.toFixed(decimals)) : Math.round(current));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setN(value); // ensure exact final value
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, decimals]);

  const display = decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      {/* Editorial header */}
      <div className="mb-16">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-3 font-display text-xs font-medium uppercase tracking-[0.3em] text-gold"
        >
          02 — About & Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
        >
          Engineering meets <span className="gradient-text-gold">design</span>.
          <br />
          Every detail, <span className="text-outline text-stroke-hover hover:text-foreground">intentional.</span>
        </motion.h2>
      </div>

      {/* Asymmetric grid: bio on left (narrow), skills on right (wide) */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* === LEFT: Bio + stats === */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="space-y-4"
          >
            <p className="text-base leading-relaxed text-muted-foreground">{profile.bio}</p>
            <p className="text-base leading-relaxed text-muted-foreground">
              My philosophy: <span className="text-foreground">craft is care</span>. Every transition,
              every loading state, every empty state — chances to earn trust.
            </p>
          </motion.div>

          {/* Stats — editorial, not cards */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="border-l border-white/10 pl-4"
              >
                <p className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* === RIGHT: Skills — unique visualization === */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-8 editorial-line" />
            <p className="font-display text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Technology ecosystem
            </p>
          </motion.div>

          {/* Skill categories as an interactive panel — not bars, not cards */}
          <div className="space-y-1">
            {skills.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: ci * 0.08, ease: EASE }}
                className="group border-t border-white/10 py-5 last:border-b"
                onMouseEnter={() => setHovered(cat.category)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-gold sm:text-3xl">
                    {cat.category}
                  </h3>
                  <span className="font-display text-xs text-muted-foreground tabular-nums">
                    {String(ci + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Items as inline tags that reveal on hover — not progress bars */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {cat.items.map((item, ii) => (
                    <motion.span
                      key={item.name}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: hovered === cat.category ? 1 : 0.5 }}
                      transition={{ delay: ii * 0.03, duration: 0.3 }}
                      className={cn(
                        'text-sm transition-colors',
                        hovered === cat.category ? 'text-secondary' : 'text-muted-foreground'
                      )}
                    >
                      {item.name}
                      <span className="ml-1 text-[10px] text-gold/60 tabular-nums">{item.level}</span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
