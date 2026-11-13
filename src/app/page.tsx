import type { Metadata } from 'next';
import { DualMarquee } from '@/components/home/DualMarquee';
import { HomeClosing } from '@/components/home/HomeClosing';
import { HomeExplore } from '@/components/home/HomeExplore';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeIntroduction } from '@/components/home/HomeIntroduction';

export const metadata: Metadata = {
  title: 'Rishi Jha — Home',
  alternates: { canonical: '/' },
  description:
    'RISHI OS — A Developer’s Workspace & Monochrome Portfolio of Rishi Jha.',
  openGraph: {
    title: 'Rishi Jha — Portfolio & RISHI OS',
    description:
      'Linux-inspired RISHI OS workspace and multi-page developer portfolio of Rishi Jha.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <DualMarquee />
      <HomeIntroduction />
      <HomeExplore />
      <HomeClosing />
    </>
  );
}
