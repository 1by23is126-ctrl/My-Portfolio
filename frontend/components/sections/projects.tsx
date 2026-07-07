'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, X, Check } from 'lucide-react';
import { projects, type Project } from '@/lib/data';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

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
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const isReversed = index % 2 === 1;
  const previewTech = project.techStack.slice(0, 4);
  const remainingTech = project.techStack.length - previewTech.length;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      whileHover={{ y: -6, scale: 1.005 }}
      className={cn(
        'group relative grid grid-cols-1 items-center gap-6 border-t border-white/10 py-8 md:grid-cols-12 md:gap-8',
        isReversed && 'md:[direction:rtl]'
      )}
    >
      {/* Ambient glass + golden glow layer, revealed on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-3 -z-10 rounded-3xl border border-transparent bg-transparent opacity-0 transition-all duration-500 ease-out group-hover:border-gold/20 group-hover:bg-white/[0.03] group-hover:opacity-100 group-hover:shadow-[0_0_60px_-15px_rgba(212,175,55,0.45)]"
      />

      {/* Image — mask reveal */}
      <div
        className={cn(
          'relative md:col-span-7 [direction:ltr]',
          isReversed && 'md:order-2'
        )}
      >
        <div
          onClick={onOpen}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-950 cursor-pointer"
        >
          <motion.div style={{ y: imageY }} className="absolute inset-0 h-[116%]">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-contain opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

          {/* Hover overlay with CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <button
              onClick={onOpen}
              className="flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-lg shadow-gold/30 transition-transform duration-300 hover:scale-105"
            >
              View project
              <ArrowUpRight className="h-4 w-4" />
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
          {project.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>

        {/* Tech stack preview badges */}
        <div className="mt-5 flex flex-wrap gap-2">
          {previewTech.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
          {remainingTech > 0 && (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted-foreground">
              +{remainingTech}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={onOpen}
            className="group/btn flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-gold"
          >
            View details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
          {project.liveUrl && (
            <>
              <span className="h-4 w-px bg-white/10" />
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live
              </a>
            </>
          )}
          {project.githubUrl && (
            <>
              <span className="h-4 w-px bg-white/10" />
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
                Code
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-gold/25 bg-white/[0.03] px-3 py-1 text-xs font-medium text-secondary/90 backdrop-blur-sm transition-colors duration-300 hover:border-gold/50 hover:text-foreground">
      {label}
    </span>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyHeight = document.body.style.height;
    
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.height = prevBodyHeight;
      document.documentElement.style.overflow = prevHtmlOverflow;
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
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-hidden bg-ink-950/85 px-4 py-10 backdrop-blur-md sm:items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl glass-strong shadow-2xl shadow-black/60 ring-1 ring-gold/10"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/60 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Featured screenshot area */}
            <div className="relative aspect-[16/8] overflow-hidden bg-ink-900">
              <img src={project.image} alt={project.title} className="h-full w-full object-contain opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="font-display text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  {project.category}
                </span>
                <h3 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-1 max-w-lg text-sm text-muted-foreground">{project.tagline}</p>
              </div>
            </div>

            <div
              className="max-h-[60vh] overflow-y-auto overscroll-contain p-6 sm:p-8"
              onWheel={(e) => {
                e.preventDefault();
                const element = e.currentTarget;
                const delta = (e as any).deltaY;
                element.scrollBy(0, delta);
              }}
            >
              <Block label="Overview" text={project.description} />

              <div className="mt-6">
                <p className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-gold">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ListBlock label="Key features" items={project.features} />
                <ListBlock label="Challenges solved" items={project.challenges} />
              </div>

              <div className="mt-6">
                <Block label="My role" text={project.role} />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-gold/30 hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
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

function ListBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-gold">
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
