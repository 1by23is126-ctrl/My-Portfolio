'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/data';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

type Status = 'idle' | 'loading' | 'success';
type Errors = { name?: string; email?: string; message?: string };

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1400));
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      {/* Editorial header */}
      <div className="mb-12">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-3 font-display text-xs font-medium uppercase tracking-[0.3em] text-gold"
        >
          04 — Contact
        </motion.p>
      </div>

      {/* Large editorial CTA — the closing statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-16"
      >
        <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          Let's build
          <br />
          something <span className="gradient-text-gold">rare.</span>
        </h2>
      </motion.div>

      {/* Asymmetric: contact info on left, form on right */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: contact details — editorial, not cards */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="space-y-8"
          >
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Have a product in mind, a role to fill, or just want to talk shop? I read every message
              and reply within a day.
            </p>

            <div className="space-y-5">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-b border-white/10 pb-4 transition-colors hover:border-gold/30"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <Mail className="h-4 w-4 text-gold" />
                </span>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{profile.email}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
              </a>

              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <MapPin className="h-4 w-4 text-gold" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Socials as text links, not icon buttons */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: form — minimal, editorial */}
        <div className="lg:col-span-7">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            onSubmit={onSubmit}
            className="relative space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                id="contact-name"
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                error={errors.name}
                placeholder="Your name"
              />
              <FormField
                id="contact-email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                error={errors.email}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Tell me about your project, role, or idea…"
                aria-invalid={Boolean(errors.message)}
                className={cn(
                  'w-full resize-none border-0 border-b bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50',
                  errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-gold/50'
                )}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              aria-busy={status === 'loading'}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-gold/20 transition-transform disabled:opacity-80"
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2"
                  >
                    Send message <Send className="h-4 w-4" />
                  </motion.span>
                )}
                {status === 'loading' && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Message sent — thank you!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(
          'w-full border-0 border-b bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50',
          error ? 'border-red-500/50' : 'border-white/10 focus:border-gold/50'
        )}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
