'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowDownRight, Download, Mail, MapPin } from 'lucide-react';
import { profile } from '@/lib/data';

const EASE = [0.22, 1, 0.36, 1] as const;

// Timings — sequence: name → tagline (roles) → subtitle → buttons ~150ms apart
const NAME_START = 0.2;
const NAME_LETTERS_STAGGER = 0.05;
const AFTER_NAME = 1.65;
const TAGLINE_DELAY = AFTER_NAME + 0.15;    // name → tagline
const SUBTITLE_DELAY = TAGLINE_DELAY + 0.15; // tagline → subtitle
const BUTTONS_DELAY = SUBTITLE_DELAY + 0.15; // subtitle → buttons
const LOCATION_DELAY = BUTTONS_DELAY + 0.15;

const nameContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: NAME_LETTERS_STAGGER, delayChildren: NAME_START },
  },
};

const letterVariant: Variants = {
  hidden: { y: 20, opacity: 0, filter: 'blur(8px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE },
  },
};

const lastNameContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: NAME_LETTERS_STAGGER,
      delayChildren: NAME_START + 0.35,
    },
  },
};

function SplitLetters({
  text,
  className,
  variants = letterVariant,
}: {
  text: string;
  className?: string;
  variants?: Variants;
}) {
  return (
    <span className={`inline-flex overflow-hidden ${className ?? ''}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            variants={variants}
            className="inline-block will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Magnetic tilt for name — driven by pointer position within hero
  const tiltX = useMotionValue(0); // rotateX target (deg)
  const tiltY = useMotionValue(0); // rotateY target (deg)
  const tiltXSpring = useSpring(tiltX, { stiffness: 60, damping: 22, mass: 1.2 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 60, damping: 22, mass: 1.2 });

  // Scroll-driven scale/opacity kept for polish
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (shouldReduceMotion) {
      return;
    }
    const MAX_DEG = 5; // 4-6deg range
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2); // -1..1
      const dy = (e.clientY - cy) / (rect.height / 2);
      // rotateY follows horizontal, rotateX inverse of vertical
      tiltY.set(Math.max(-MAX_DEG, Math.min(MAX_DEG, dx * MAX_DEG)));
      tiltX.set(Math.max(-MAX_DEG, Math.min(MAX_DEG, -dy * MAX_DEG)));
    };
    const reset = () => {
      tiltX.set(0);
      tiltY.set(0);
    };
    el.addEventListener('mousemove', handle);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', handle);
      el.removeEventListener('mouseleave', reset);
    };
  }, [shouldReduceMotion, tiltX, tiltY]);

  return (
    <motion.section
      ref={heroRef}
      id="home"
      style={{ scale: shouldReduceMotion ? 1 : heroScale, opacity: shouldReduceMotion ? 1 : heroOpacity }}
      className="hero-root relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
      data-testid="hero-section"
    >
      {/* === Fixed grain/noise overlay for depth === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hero-noise"
      />

      {/* === Ambient gold glow behind name — pulses/drifts slowly === */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="hero-ambient-glow h-full w-full rounded-full" />
      </div>

      {/* === Ghost "MRINANK" watermark — huge outline behind name, drifts + fades slowly === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 z-[2] -translate-y-1/2 select-none flex justify-center"
      >
        <div
          className="hero-ghost-wrap relative whitespace-nowrap font-display font-bold leading-none tracking-tighter"
          style={{ fontSize: 'clamp(8rem, 28vw, 26rem)' }}
        >
          <span className="hero-ghost-main">{profile.firstName.toUpperCase()}</span>
          <span className="hero-ghost-blur absolute inset-0">{profile.firstName.toUpperCase()}</span>
        </div>
      </div>

      {/* === Availability badge (breathing dot glow) === */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        className="relative z-20 mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-muted-foreground backdrop-blur"
        data-testid="availability-badge"
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="hero-dot-glow absolute inline-flex h-4 w-4 rounded-full bg-gold" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
        </span>
        {profile.availability}
      </motion.div>

      {/* === NAME (letter-by-letter, magnetic tilt) === */}
      <div
        className="hero-name-hover relative z-10 flex flex-col items-center"
        style={{ perspective: '1200px' }}
        data-testid="hero-name-wrapper"
      >
        <motion.div
          style={{
            rotateX: shouldReduceMotion ? 0 : tiltXSpring,
            rotateY: shouldReduceMotion ? 0 : tiltYSpring,
            transformStyle: 'preserve-3d',
          }}
          className="hero-name-gradient relative will-change-transform"
        >
          <motion.h1
            variants={nameContainer}
            initial="hidden"
            animate="visible"
            className="hero-name relative font-display font-bold leading-[0.9] text-foreground"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 12rem)', letterSpacing: '-0.035em' }}
            data-testid="hero-name-first"
          >
            <span className="block overflow-hidden">
              <SplitLetters text={profile.firstName} />
            </span>

            <span
              aria-hidden
              className="hero-name-shimmer pointer-events-none absolute inset-0"
              style={{
                fontSize: 'clamp(3.5rem, 14vw, 12rem)',
                letterSpacing: '-0.035em',
              }}
            >
              <span className="block">
                {profile.firstName.split('').map((ch, i) => (
                  <span key={i} className="inline-block">
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            </span>
          </motion.h1>

          <motion.h2
            variants={lastNameContainer}
            initial="hidden"
            animate="visible"
            className="hero-name-sub mt-1 font-display font-bold leading-none text-gold text-center"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', letterSpacing: '0.18em' }}
            data-testid="hero-name-last"
          >
            <span className="inline-flex overflow-hidden">
              <SplitLetters text={profile.lastName} />
            </span>
          </motion.h2>
        </motion.div>

        {/* Editorial divider with index marker */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: AFTER_NAME, ease: EASE }}
          className="mt-8 flex items-center gap-4"
        >
          <span className="h-px w-12 editorial-line" />
          <span className="font-display text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
            Portfolio — 2025
          </span>
          <span className="h-px w-12 editorial-line" />
        </motion.div>
      </div>

      {/* === Roles (tagline) === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: TAGLINE_DELAY, ease: EASE }}
        className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-xs font-medium uppercase tracking-[0.3em] text-secondary sm:text-sm"
        data-testid="hero-tagline"
      >
        <span>Full Stack Developer</span>
        <span className="text-gold">/</span>
        <span>AI Developer</span>
        <span className="text-gold">/</span>
        <span>UI/UX Enthusiast</span>
      </motion.div>

      {/* === Intro (subtitle) === */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: SUBTITLE_DELAY, ease: EASE }}
        className="relative z-10 mt-6 max-w-xl text-balance text-center text-sm leading-relaxed text-muted-foreground sm:text-base"
        data-testid="hero-subtitle"
      >
        {profile.tagline}
      </motion.p>

      {/* === CTAs === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: BUTTONS_DELAY, ease: EASE }}
        className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3"
        data-testid="hero-cta-group"
      >
        <a
          href="#work"
          data-testid="hero-cta-projects"
          className="hero-cta hero-cta-primary group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-ink-950"
        >
          <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
          View Projects
          <ArrowDownRight className="h-4 w-4" />
        </a>
        <a
          href="#"
          data-testid="hero-cta-resume"
          className="hero-cta hero-cta-secondary inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-foreground backdrop-blur"
        >
          <Download className="h-4 w-4 text-gold" />
          Resume
        </a>
        <a
          href="#contact"
          data-testid="hero-cta-contact"
          className="hero-cta hero-cta-secondary inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-foreground backdrop-blur"
        >
          <Mail className="h-4 w-4 text-gold" />
          Contact
        </a>
      </motion.div>

      {/* === Location === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: LOCATION_DELAY }}
        className="relative z-10 mt-6 flex items-center gap-2 text-xs text-muted-foreground"
      >
        <MapPin className="h-3.5 w-3.5 text-gold" />
        {profile.location}
      </motion.div>

      {/* === Scroll indicator === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: LOCATION_DELAY + 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
          <motion.div
            animate={shouldReduceMotion ? { y: 0 } : { y: [0, 12, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
