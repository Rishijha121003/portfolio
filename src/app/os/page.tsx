import type { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { OsLoadingScreen } from '@/components/os/OsLoadingScreen';

export const metadata: Metadata = {
  title: 'RISHI OS — Simulated Developer Workspace',
  description:
    'Interactive Unix-inspired developer workspace and simulated desktop environment by Rishi Jha.',
  alternates: { canonical: '/os' },
  openGraph: {
    title: 'RISHI OS — Simulated Developer Workspace',
    description:
      'Interactive Unix-inspired developer workspace and simulated desktop environment by Rishi Jha.',
    type: 'website',
  },
};

const RishiDesktopShell = dynamic(
  () =>
    import('@/components/os/RishiDesktopShell').then(
      (mod) => mod.RishiDesktopShell
    ),
  {
    loading: () => <OsLoadingScreen />,
  }
);

const THEME_INIT_SCRIPT = `(function(){try{var m=localStorage.getItem('rishi-os-theme-mode')||'system';var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var a=m==='system'?(d?'dark':'light'):m;var t=m==='system'?(d?'minimal-dark':'minimal-light'):(m==='dark'?'minimal-dark':'minimal-light');var c=localStorage.getItem('rishi-os-theme');if(c&&c!=='minimal-dark'&&c!=='minimal-light'){t=c;}document.documentElement.setAttribute('data-rishi-appearance',a);document.documentElement.setAttribute('data-rishi-theme',t);document.documentElement.setAttribute('data-rishi-theme-mode',m);}catch(e){}})();`;

export default function OsPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <Suspense fallback={<OsLoadingScreen />}>
        <RishiDesktopShell />
      </Suspense>
    </>
  );
}
