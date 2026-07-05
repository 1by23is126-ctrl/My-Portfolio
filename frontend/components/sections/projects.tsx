'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, X, Check, Plus } from 'lucide-react';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      {/* Editorial header — asymmetric, not centered */}
      <div className="mb-16 flex items-end justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-3 font-display text-xs font-medium uppercase tracking-[0.3em] text-gold"
          >
            01 — Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl"
          >
            Things I've
            <br />
            <span className="text-outline text-stroke-hover hover:text-foreground">built.</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden max-w-xs text-right text-sm leading-relaxed text-muted-foreground sm:block"
        >
          A selection of products where engineering meets design — each one a study in craft.
        </motion.p>
      </div>

      {/* Editorial project list — alternating asymmetric layout */}
      <div className="space-y-4">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[number];
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className={cn(
        'group relative grid grid-cols-1 items-center gap-6 border-t border-white/10 py-8 md:grid-cols-12 md:gap-8',
        isReversed && 'md:[direction:rtl]'
      )}
    >
      {/* Image — mask reveal */}
      <div
        className={cn(
          'relative md:col-span-7 [direction:ltr]',
          isReversed && 'md:order-2'
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
          {/* Mask reveal wrapper */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ originY: 0 }}
            className="absolute inset-0 z-10 bg-ink-900"
          />
          <motion.div style={{ y: imageY }} className="absolute inset-0 h-[116%]">
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

          {/* Hover overlay with CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <button
              onClick={onOpen}
              className="flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-lg shadow-gold/30"
            >
              View case study
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Text — editorial */}
      <div className={cn('md:col-span-5 [direction:ltr]', isReversed && 'md:order-1')}>
        <div className="flex items-baseline gap-4">
          <span className="font-display text-6xl font-bold leading-none text-outline">
            0{index + 1}
          </span>
          <span className="font-display text-xs font-medium uppercase tracking-[0.2em] text-gold">
            {project.category}
          </span>
        </div>
        <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        {/* Tags as inline text, not pills */}
        <p className="mt-4 text-xs text-muted-foreground">
          {project.tags.map((t, ti) => (
            <span key={t}>
              <span className="text-secondary/80">{t}</span>
              {ti < project.tags.length - 1 && <span className="text-muted-foreground/40"> · </span>}
            </span>
          ))}
        </p>

        {/* Impact inline */}
        <div className="mt-5 flex flex-wrap gap-6">
          {project.impact.map((m) => (
            <div key={m.label}>
              <p className="font-display text-lg font-bold text-foreground">{m.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={onOpen}
            className="group/btn flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-gold"
          >
            Read case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
          <span className="h-4 w-px bg-white/10" />
          <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ExternalLink className="h-3.5 w-3.5" />
            Live
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink-950/85 px-4 py-10 backdrop-blur-md sm:items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl glass-strong shadow-2xl shadow-black/60"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/60 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/8] overflow-hidden">
              <img src={project.image} alt={project.name} className="h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="font-display text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  {project.category} · {project.year}
                </span>
                <h3 className="mt-1 font-display text-3xl font-bold text-foreground">{project.name}</h3>
              </div>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Block label="The problem" text={project.problem} />
                <Block label="The solution" text={project.solution} />
                <Block label="The challenge" text={project.challenges} />
                <div>
                  <p className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-gold">
                    Key features
                  </p>
                  <ul className="space-y-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-3">
                {project.impact.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="font-display text-lg font-bold text-foreground">{m.value}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-ink-950"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live demo
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="mb-2 font-display text-xs font-semibold uppercase tracking-widest text-gold">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
