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
 * Modern layout shell for the developer portfolio, hosting the unified upper navigation bar,
 * atmospheric ambient background glows, and main content column.
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
      {/* Ambient background atmosphere for portfolio */}
      <div className={styles.ambientBackdrop} aria-hidden="true">
        <div className={styles.ambientBlobTop} />
        <div className={styles.ambientBlobBottom} />
        <div className={styles.ambientGrid} />
      </div>

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
