'use client';

import { useState } from 'react';
import { Background } from '@/components/background';
import { CursorSpotlight } from '@/components/cursor-spotlight';
import { ScrollProgress } from '@/components/scroll-progress';
import { LoadingScreen } from '@/components/loading-screen';
import { Navbar } from '@/components/navbar';
import { CommandPalette } from '@/components/command-palette';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <>
      <LoadingScreen />
      <Background />
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar onCommand={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />

      <main className="relative">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
