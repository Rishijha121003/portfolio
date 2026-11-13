import type { Metadata } from 'next';
import { AboutEditorial } from '@/components/about/AboutEditorial';
import { VERIFIED_IMAGES } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about' },
  description:
    'About Rishi Jha — CSE student at Sandip University, journey from Class 12 curiosity and Diploma to B.Tech, and aspirational Full Stack development.',
  openGraph: {
    title: 'About | RISHI OS',
    description:
      'About Rishi Jha — CSE student at Sandip University, journey from Class 12 curiosity and Diploma to B.Tech, and aspirational Full Stack development.',
    type: 'website',
    images: [
      {
        url: VERIFIED_IMAGES.aboutBuilder.src,
        width: VERIFIED_IMAGES.aboutBuilder.width,
        height: VERIFIED_IMAGES.aboutBuilder.height,
        alt: VERIFIED_IMAGES.aboutBuilder.alt,
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutEditorial />;
}
