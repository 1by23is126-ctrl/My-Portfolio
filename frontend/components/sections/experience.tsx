'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience, education } from '@/lib/data';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// Merge experience and education into a single chronological journey
const journey = [
  ...experience.map((e) => ({ ...e, kind: 'work' as const })),
  ...education.map((e) => ({ ...e, kind: 'edu' as const })),
].sort((a, b) => {
  // Sort by start year descending (most recent first)
  const ya = parseInt(a.period.match(/\d{4}/)?.[0] ?? '0');
  const yb = parseInt(b.period.match(/\d{4}/)?.[0] ?? '0');
  return yb - ya;
});

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      {/* Editorial header — different composition from other sections */}
      <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-3 font-display text-xs font-medium uppercase tracking-[0.3em] text-gold"
          >
            03 — Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl"
          >
            Experience
            <br />
            <span className="text-outline text-stroke-hover hover:text-foreground">& education.</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xs text-sm leading-relaxed text-muted-foreground"
        >
          From classroom to production — the path that shaped how I build.
        </motion.p>
      </div>

      {/* Horizontal-scroll-free vertical timeline with scroll-driven progress line */}
      <div ref={containerRef} className="relative pl-10 sm:pl-16">
        {/* Track */}
        <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-8" />
        {/* Animated progress line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 top-0 w-px bg-gradient-to-b from-gold via-gold/60 to-transparent sm:left-8"
        />

        <div className="space-y-12">
          {journey.map((item, i) => (
            <TimelineEntry key={item.period + (item.kind === 'work' ? item.role : item.degree)} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  item,
  index,
}: {
  item: (typeof journey)[number];
  index: number;
}) {
  const isWork = item.kind === 'work';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
      className="group relative"
    >
      {/* Node */}
      <span className="absolute -left-[1.65rem] top-2 flex h-3 w-3 items-center justify-center sm:-left-[2.15rem]">
        <span className="absolute h-3 w-3 rounded-full bg-gold/20 transition-transform group-hover:scale-150" />
        <span className="relative h-2 w-2 rounded-full bg-gold" />
      </span>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-8">
        {/* Period — left column */}
        <div className="sm:col-span-3">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
            {item.period}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            {isWork ? 'Experience' : 'Education'}
          </p>
        </div>

        {/* Content — right column */}
        <div className="sm:col-span-9">
          {isWork ? (
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                {item.role}
              </h3>
              <p className="mt-0.5 text-sm text-gold">
                {item.company}
                {item.location && (
                  <span className="ml-2 text-xs text-muted-foreground">· {item.location}</span>
                )}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {item.highlights && (
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                {item.degree}
              </h3>
              <p className="mt-0.5 text-sm text-gold">{item.school}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
