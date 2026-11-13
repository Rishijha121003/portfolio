import type { Metadata } from 'next';
import { DormiqCaseStudy } from '@/components/portfolio/DormiqCaseStudy';
import { VERIFIED_IMAGES } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'DormiQ Case Study',
  alternates: { canonical: '/projects/dormiq' },
  description:
    'DormiQ (previously SmartHostel AI) — Hostel Management System built by Team Impact Crew (5 members), Third Place at Cheque Mate.',
  openGraph: {
    title: 'DormiQ Case Study | RISHI OS',
    description:
      'DormiQ (previously SmartHostel AI) — Hostel Management System built by Team Impact Crew (5 members), Third Place at Cheque Mate.',
    type: 'article',
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

export default function DormiqCaseStudyPage() {
  return <DormiqCaseStudy />;
}
