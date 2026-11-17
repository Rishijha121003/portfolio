'use client';

import type { ReactNode } from 'react';
import { TopEdgeBar } from '@/components/layout/TopEdgeBar';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: ReactNode;
  footer: ReactNode;
  onEnterOs?: () => void;
  isExiting?: boolean;
}

/**
 * Clean layout shell for the multi-page portfolio, hosting the unified upper navigation bar and main content.
 */
export function AppShell({
  children,
  footer,
  onEnterOs,
  isExiting = false,
}: AppShellProps) {
  return (
    <div className={`${styles.shell} ${isExiting ? styles.shellExiting : ''}`}>
      <div className={styles.contentColumn}>
        <TopEdgeBar onEnterOs={onEnterOs} />

        <main id="main-content" className={styles.main}>
          {children}
        </main>

        {footer}
      </div>
    </div>
  );
}
