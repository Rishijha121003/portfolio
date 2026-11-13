import type { Metadata } from 'next';
import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { RishiDesktopShell } from '@/components/os/RishiDesktopShell';
import './globals.css';

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
    default: 'Rishi Jha — Portfolio & RISHI OS Workspace',
    template: '%s | RISHI OS',
  },
  description:
    'Interactive Unix-inspired developer workspace and portfolio of Rishi Jha — featuring DormiQ, LifeOS, AssignFlow, and full-stack systems engineering.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Rishi Jha Portfolio',
    title: 'Rishi Jha — Portfolio & RISHI OS Workspace',
    description:
      'Interactive Unix-inspired developer workspace and portfolio of Rishi Jha — featuring DormiQ, LifeOS, AssignFlow, and full-stack systems engineering.',
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
    title: 'Rishi Jha — Portfolio & RISHI OS Workspace',
    description:
      'Interactive Unix-inspired developer workspace and portfolio of Rishi Jha — featuring DormiQ, LifeOS, AssignFlow, and full-stack systems engineering.',
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
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main workspace
        </a>
        <RishiDesktopShell footer={<SiteFooter />}>{children}</RishiDesktopShell>
      </body>
    </html>
  );
}
