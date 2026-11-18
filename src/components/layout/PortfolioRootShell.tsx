'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';

interface PortfolioRootShellProps {
  children: ReactNode;
  footer: ReactNode;
}

/**
 * Clean architectural boundary separating the default editorial portfolio
 * from the isolated RISHI OS interactive environment.
 * 
 * When visiting '/os', renders the isolated OS workspace without editorial chrome.
 * On all other routes, renders the standard editorial AppShell (TopEdgeBar + Content + SiteFooter).
 */
export function PortfolioRootShell({ children, footer }: PortfolioRootShellProps) {
  const pathname = usePathname();
  const isOsRoute = pathname === '/os' || pathname.startsWith('/os/');

  if (isOsRoute) {
    return <>{children}</>;
  }

  return <AppShell footer={footer}>{children}</AppShell>;
}
