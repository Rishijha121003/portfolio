import type { Metadata } from 'next';
import {
  Barlow_Condensed,
  Inter,
  JetBrains_Mono,
  Newsreader,
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

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-newsreader',
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
    default: 'Rishi Jha — Backend-Focused Full Stack Developer',
    template: '%s | Rishi Jha',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF9' },
    { media: '(prefers-color-scheme: dark)', color: '#171816' },
  ],
  description:
    'Backend-Focused Full Stack Developer building with Python, FastAPI, PostgreSQL and SQLAlchemy 2 — projects and case studies of Rishi Jha.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Rishi Jha Portfolio',
    title: 'Rishi Jha — Backend-Focused Full Stack Developer',
    description:
      'Backend-Focused Full Stack Developer building with Python, FastAPI, PostgreSQL and SQLAlchemy 2 — projects and case studies of Rishi Jha.',
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
    title: 'Rishi Jha — Backend-Focused Full Stack Developer',
    description:
      'Backend-Focused Full Stack Developer building with Python, FastAPI, PostgreSQL and SQLAlchemy 2 — projects and case studies of Rishi Jha.',
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
      className={`${plusJakartaSans.variable} ${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('portfolio-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <PortfolioRootShell footer={<SiteFooter />}>{children}</PortfolioRootShell>
      </body>
    </html>
  );
}
