import type { Metadata } from 'next';
import { SkillsManifest } from '@/components/portfolio/SkillsManifest';

export const metadata: Metadata = {
  title: 'Skills',
  alternates: { canonical: '/skills' },
  description:
    "My Technical Skills — Technologies I've explored, practiced and continue to learn.",
  openGraph: {
    title: 'Skills | RISHI OS',
    description:
      "My Technical Skills — Technologies I've explored, practiced and continue to learn.",
    type: 'website',
  },
};

export default function SkillsPage() {
  return <SkillsManifest />;
}
