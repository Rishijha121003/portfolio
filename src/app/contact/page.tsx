import type { Metadata } from 'next';
import { ContactChannels } from '@/components/portfolio/ContactChannels';
import { VERIFIED_IMAGES } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
  description:
    "Let's Connect — Reach Rishi Jha via email (rishijha130@gmail.com), LinkedIn, or GitHub.",
  openGraph: {
    title: 'Contact | RISHI OS',
    description:
      "Let's Connect — Reach Rishi Jha via email (rishijha130@gmail.com), LinkedIn, or GitHub.",
    type: 'website',
    images: [
      {
        url: VERIFIED_IMAGES.contactBg.src,
        width: VERIFIED_IMAGES.contactBg.width,
        height: VERIFIED_IMAGES.contactBg.height,
        alt: VERIFIED_IMAGES.contactBg.alt,
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactChannels />;
}
