'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/motion/reveal';
import { skills } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Skills() {
  const [active, setActive] = useState(0);
  const current = skills[active];

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <div className="mb-14 text-center">
        <Reveal>
          <p className="mb-4 font-display text-sm font-medium uppercase tracking-[0.25em] text-gold">
            Capabilities
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            A full-stack <span className="gradient-text-gold">toolkit</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground">
            From low-level rendering to design systems and motion engineering — the tools I reach
            for to ship production-grade products.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Category list */}
        <div className="flex flex-col gap-3">
          {skills.map((s, i) => (
            <button
              key={s.category}
              onClick={() => setActive(i)}
              className={cn(
                'group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300',
                active === i
                  ? 'border-white/20 bg-white/[0.06] shadow-lg shadow-black/30'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
              )}
            >
              {active === i && (
                <motion.span
                  layoutId="skill-active"
                  className="absolute left-0 top-0 h-full w-1 bg-gold-gradient"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <div className="flex items-center justify-between">
                <h3
                  className={cn(
                    'font-display text-lg font-semibold transition-colors',
                    active === i ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                >
                  {s.category}
                </h3>
                <span
                  className={cn(
                    'text-xs tabular-nums transition-colors',
                    active === i ? 'text-gold' : 'text-muted-foreground'
                  )}
                >
                  {s.items.length} tools
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
            </button>
          ))}
        </div>

        {/* Skill detail */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/8 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <h3 className="font-display text-2xl font-bold text-foreground">{current.category}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{current.description}</p>

              <div className="mt-8 space-y-5">
                {current.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-xs tabular-nums text-muted-foreground">{item.level}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        transition={{ delay: 0.2 + i * 0.06, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-dark"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
