'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Magnetic } from '@/components/motion/magnetic';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onCommand }: { onCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            'flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500',
            scrolled ? 'glass-strong shadow-2xl shadow-black/40' : 'bg-transparent'
          )}
        >
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gold-gradient text-sm font-bold text-ink-950 shadow-lg shadow-gold/20">
              MT
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-foreground sm:block">
              Mrinank T C
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  active === l.href ? 'text-gold' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/[0.04] ring-1 ring-gold/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Magnetic>
              <button
                onClick={onCommand}
                className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
              >
                <Command className="h-3.5 w-3.5" />
                <span>Search</span>
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
              </button>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="mobile-nav-menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="font-display text-3xl font-semibold text-foreground"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
