'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { profile } from '@/lib/data';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-12 pt-16">
      {/* Top border with editorial marker */}
      <div className="relative">
        <div className="h-px w-full bg-white/10" />

        {/* Large name sign-off — the closing artwork */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col items-center py-16"
        >
          <p className="mb-4 font-display text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Designed & built by
          </p>
          <a href="#home" className="group">
            <h2 className="text-outline text-stroke-hover font-display text-6xl font-bold tracking-tight transition-colors hover:text-foreground sm:text-8xl">
              {profile.name}
            </h2>
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            Crafted with Next.js, TypeScript, Tailwind CSS, and Framer Motion.
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="group flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-gold"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-gold/30">
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
