'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';

export function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posRef = useRef({ x: -9999, y: -9999, alpha: 1 });

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const alpha = useMotionValue(1);
  const sx = useSpring(x, { stiffness: 200, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 30, mass: 0.4 });
  const sa = useSpring(alpha, { stiffness: 220, damping: 28, mass: 0.35 });

  // Subscribe to motion value changes to keep position ref updated
  useMotionValueEvent(sx, 'change', (latest) => {
    posRef.current.x = latest;
  });
  useMotionValueEvent(sy, 'change', (latest) => {
    posRef.current.y = latest;
  });
  useMotionValueEvent(sa, 'change', (latest) => {
    posRef.current.alpha = latest;
  });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const overHeroName = Boolean(target?.closest('[data-testid="hero-name-wrapper"]'));
      alpha.set(overHeroName ? 0 : 1);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [alpha, x, y]);

  // Canvas rendering loop using canvas API to avoid GPU rasterization artifacts
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const { x: curX, y: curY, alpha: curAlpha } = posRef.current;

      if (curAlpha > 0.01) {
        const grad = ctx.createRadialGradient(curX, curY, 0, curX, curY, 220);
        grad.addColorStop(0, `rgba(212, 175, 55, ${0.085 * curAlpha})`);
        grad.addColorStop(0.34, `rgba(212, 175, 55, ${0.035 * curAlpha})`);
        grad.addColorStop(0.54, `rgba(212, 175, 55, ${0.012 * curAlpha})`);
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[3]"
    />
  );
}
