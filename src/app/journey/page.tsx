import type { Metadata } from 'next';
import { JourneyLedger } from '@/components/portfolio/JourneyLedger';

export const metadata: Metadata = {
  title: 'Journey',
  alternates: { canonical: '/journey' },
  description:
    'Rishi Jha chronological timeline: Class 12 curiosity, Government Polytechnic Darbhanga Diploma, Sandip University B.Tech, and Cheque Mate Third Place.',
  openGraph: {
    title: 'Journey | RISHI OS',
    description:
      'Rishi Jha chronological timeline: Class 12 curiosity, Government Polytechnic Darbhanga Diploma, Sandip University B.Tech, and Cheque Mate Third Place.',
    type: 'website',
  },
};

export default function JourneyPage() {
  return <JourneyLedger />;
}
