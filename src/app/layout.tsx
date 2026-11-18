import type { Metadata } from 'next';
import {
  Barlow_Condensed,
  Inter,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PortfolioRootShell } from '@/components/layout/PortfolioRootShell';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const PRODUCTION_SITE_URL = 'https://www.rishijhadev.me';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  title: {
    default: 'Rishi Jha — Software Developer Portfolio',
    template: '%s | Rishi Jha',
  },
  description:
    'Software Developer portfolio of Rishi Jha — building scalable backends, clean API architectures, and modern web applications with FastAPI, React 19, and PostgreSQL.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Rishi Jha Portfolio',
    title: 'Rishi Jha — Software Developer Portfolio',
    description:
      'Software Developer portfolio of Rishi Jha — building scalable backends, clean API architectures, and modern web applications with FastAPI, React 19, and PostgreSQL.',
    images: [
      {
        url: '/images/hero-workspace.jpg',
        width: 1200,
        height: 630,
        alt: 'Rishi Jha — Developer Workspace & Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishi Jha — Software Developer Portfolio',
    description:
      'Software Developer portfolio of Rishi Jha — building scalable backends, clean API architectures, and modern web applications with FastAPI, React 19, and PostgreSQL.',
    images: ['/images/hero-workspace.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main workspace
        </a>
        <PortfolioRootShell footer={<SiteFooter />}>{children}</PortfolioRootShell>
      </body>
    </html>
  );
}
