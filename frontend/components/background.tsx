'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function Background() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 40 });
  const sy = useSpring(my, { stiffness: 40, damping: 40 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mx.set(x * 40);
      my.set(y * 40);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  // Floating particles
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const count = Math.min(60, Math.floor((w * h) / 28000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(181, 181, 181, ${p.a * 0.7})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Aurora orbs */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full opacity-50 blur-[120px]"
      >
        <div className="h-full w-full animate-aurora rounded-full bg-gold/10" />
      </motion.div>
      <motion.div
        style={{ x: useSpring(useTransform(sx, (v) => -v), { stiffness: 40, damping: 40 }), y: useSpring(useTransform(sy, (v) => -v), { stiffness: 40, damping: 40 }) }}
        className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full opacity-40 blur-[120px]"
      >
        <div className="h-full w-full animate-aurora rounded-full bg-white/[0.04] [animation-delay:-7s]" />
      </motion.div>
      <motion.div
        style={{ x: useSpring(useTransform(sx, (v) => v * 0.5), { stiffness: 40, damping: 40 }), y: useSpring(useTransform(sy, (v) => v * 0.5), { stiffness: 40, damping: 40 }) }}
        className="absolute bottom-0 left-1/2 h-[450px] w-[450px] rounded-full opacity-30 blur-[120px]"
      >
        <div className="h-full w-full animate-aurora rounded-full bg-gold/8 [animation-delay:-13s]" />
      </motion.div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette */}
      {/* Gold light streaks */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute left-0 top-2/3 h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.7)_100%)]" />
    </div>
  );
}
