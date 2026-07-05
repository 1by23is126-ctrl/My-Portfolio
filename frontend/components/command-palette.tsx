'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command as CommandMenu } from 'cmdk';
import {
  ArrowUpRight,
  Command,
  Home,
  User,
  Code2,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Twitter,
  FileText,
} from 'lucide-react';

type Item = {
  label: string;
  hint: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
};

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const items: Item[] = useMemo(
    () => [
      { label: 'Home', hint: 'Top of page', icon: <Home className="h-4 w-4" />, action: () => go('home'), group: 'Navigate' },
      { label: 'Work', hint: 'Selected projects', icon: <Briefcase className="h-4 w-4" />, action: () => go('work'), group: 'Navigate' },
      { label: 'About', hint: 'Bio & capabilities', icon: <User className="h-4 w-4" />, action: () => go('about'), group: 'Navigate' },
      { label: 'Journey', hint: 'Experience & education', icon: <Code2 className="h-4 w-4" />, action: () => go('experience'), group: 'Navigate' },
      { label: 'Contact', hint: 'Get in touch', icon: <Mail className="h-4 w-4" />, action: () => go('contact'), group: 'Navigate' },
      { label: 'GitHub', hint: 'github.com/mrinanktc', icon: <Github className="h-4 w-4" />, action: () => window.open('https://github.com/mrinanktc', '_blank'), group: 'Links' },
      { label: 'LinkedIn', hint: 'in/mrinanktc', icon: <Linkedin className="h-4 w-4" />, action: () => window.open('https://linkedin.com/in/mrinanktc', '_blank'), group: 'Links' },
      { label: 'Twitter', hint: '@mrinanktc', icon: <Twitter className="h-4 w-4" />, action: () => window.open('https://twitter.com/mrinanktc', '_blank'), group: 'Links' },
      { label: 'Resume', hint: 'Download PDF', icon: <FileText className="h-4 w-4" />, action: () => window.open('#', '_blank'), group: 'Links' },
    ],
    [setOpen]
  );

  const filtered = items.filter((i) =>
    (i.label + i.hint + i.group).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink-950/70 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl glass-strong shadow-2xl shadow-black/50"
          >
              <CommandMenu shouldFilter={false} loop>
              <div className="flex items-center gap-3 border-b border-white/10 px-4">
                <Command className="h-4 w-4 text-muted-foreground" />
                  <CommandMenu.Input
                  autoFocus
                  placeholder="Search sections, links…"
                  value={search}
                  onValueChange={setSearch}
                  className="flex h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
              </div>
                <CommandMenu.List className="max-h-[50vh] overflow-auto p-2">
                  <CommandMenu.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No results.
                  </CommandMenu.Empty>
                {['Navigate', 'Links'].map((group) => {
                  const groupItems = filtered.filter((i) => i.group === group);
                  if (!groupItems.length) return null;
                  return (
                      <CommandMenu.Group key={group} heading={group} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground">
                      {groupItems.map((item) => (
                          <CommandMenu.Item
                          key={item.label}
                          onSelect={() => item.action()}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-foreground aria-selected:bg-white/5"
                        >
                          <span className="text-muted-foreground">{item.icon}</span>
                            <span className="min-w-0 flex-1 truncate">{item.label}</span>
                            <span className="max-w-[40%] truncate text-xs text-muted-foreground">{item.hint}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                          </CommandMenu.Item>
                      ))}
                      </CommandMenu.Group>
                  );
                })}
                </CommandMenu.List>
              </CommandMenu>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
