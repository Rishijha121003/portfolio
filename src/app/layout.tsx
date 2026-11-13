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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  title: {
    default: 'RISHI OS — Rishi Jha',
    template: '%s | RISHI OS',
  },
  description:
    'RISHI OS — Linux-inspired developer workspace and portfolio of Rishi Jha.',
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
