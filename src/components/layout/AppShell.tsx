'use client';

import type { ReactNode } from 'react';
import { TopEdgeBar } from '@/components/layout/TopEdgeBar';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: ReactNode;
  footer: ReactNode;
  isExiting?: boolean;
}

/**
 * Editorial layout shell for the portfolio — hosts the unified upper navigation bar,
 * the content column, and the footer. RISHI OS renders outside this shell.
 */
export function AppShell({
  children,
  footer,
  isExiting = false,
}: AppShellProps) {
  return (
    <div
      className={`${styles.shell} ${styles.portfolioRoot} ${
        isExiting ? styles.shellExiting : ''
      }`}
    >
      <div className={styles.contentColumn}>
        <TopEdgeBar />

        <main id="main-content" className={styles.main}>
          {children}
        </main>

        {footer}
      </div>
    </div>
  );
}
