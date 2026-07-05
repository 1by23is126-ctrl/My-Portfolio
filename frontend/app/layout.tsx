import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mrinanktc.dev'),
  title: 'Mrinank T C — Full Stack Developer | AI Developer | UI/UX Enthusiast',
  description:
    'Full Stack Developer and AI Developer building premium digital experiences with modern web technologies and Artificial Intelligence.',
  keywords: [
    'full stack developer',
    'ai developer',
    'ui ux',
    'react',
    'next.js',
    'typescript',
    'portfolio',
    'mrinank',
  ],
  authors: [{ name: 'Mrinank T C' }],
  openGraph: {
    title: 'Mrinank T C — Full Stack Developer | AI Developer | UI/UX Enthusiast',
    description:
      'Building premium digital experiences with modern web technologies and Artificial Intelligence.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mrinank T C — Full Stack Developer',
    description:
      'Building premium digital experiences with modern web technologies and Artificial Intelligence.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-ink-950 text-foreground">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
