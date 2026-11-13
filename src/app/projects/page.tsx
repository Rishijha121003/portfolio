import type { Metadata } from 'next';
import { ProjectsShowcase } from '@/components/projects/ProjectsShowcase';
import { VERIFIED_IMAGES } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'My Projects',
  alternates: { canonical: '/projects' },
  description:
    'Selected projects by Rishi Jha featuring DormiQ, AssignFlow, LifeOS, Finora, Complaint Management System, and Blog Project.',
  openGraph: {
    title: 'My Projects | RISHI OS',
    description:
      'Selected projects by Rishi Jha featuring DormiQ, AssignFlow, LifeOS, Finora, Complaint Management System, and Blog Project.',
    type: 'website',
    images: [
      {
        url: VERIFIED_IMAGES.dormiqPreview.src,
        width: VERIFIED_IMAGES.dormiqPreview.width,
        height: VERIFIED_IMAGES.dormiqPreview.height,
        alt: VERIFIED_IMAGES.dormiqPreview.alt,
      },
    ],
  },
};

export default function ProjectsPage() {
  return <ProjectsShowcase />;
}
