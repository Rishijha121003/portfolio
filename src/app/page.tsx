import type { Metadata } from 'next';
import { DualMarquee } from '@/components/home/DualMarquee';
import { HomeClosing } from '@/components/home/HomeClosing';
import { HomeExplore } from '@/components/home/HomeExplore';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeIntroduction } from '@/components/home/HomeIntroduction';

export const metadata: Metadata = {
  title: 'Backend-Focused Full Stack Developer',
  alternates: { canonical: '/' },
  description:
    'Backend-Focused Full Stack Developer building with Python, FastAPI, PostgreSQL and SQLAlchemy 2 — projects, case studies and journey of Rishi Jha.',
  openGraph: {
    title: 'Rishi Jha — Backend-Focused Full Stack Developer',
    description:
      'Backend-Focused Full Stack Developer building with Python, FastAPI, PostgreSQL and SQLAlchemy 2 — projects and case studies of Rishi Jha.',
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
