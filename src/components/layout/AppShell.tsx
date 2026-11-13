'use client';

import type { ReactNode } from 'react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { usePathname } from 'next/navigation';
import { RightNavPanel } from '@/components/layout/RightNavPanel';
import { TopEdgeBar } from '@/components/layout/TopEdgeBar';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: ReactNode;
  footer: ReactNode;
  onEnterOs?: () => void;
  isExiting?: boolean;
}

const MOBILE_QUERY = '(max-width: 900px)';

function subscribeToMobileQuery(callback: () => void): () => void {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getMobileSnapshot(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getMobileServerSnapshot(): boolean {
  return false;
}

/**
 * Minimal client boundary coordinating 3-tier navigation state while keeping pages and footer Server Components.
 */
export function AppShell({
  children,
  footer,
  onEnterOs,
  isExiting = false,
}: AppShellProps) {
  const pathname = usePathname();
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    getMobileServerSnapshot
  );
  const [desktopCollapsed, setDesktopCollapsed] = useState(true);
  const [mobileOpenForPath, setMobileOpenForPath] = useState<string | null>(null);

  const mobileOpen = isMobile && mobileOpenForPath === pathname;
  const isPanelExpanded = isMobile ? mobileOpen : !desktopCollapsed;

  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const pendingFocusRef = useRef<'open' | 'close' | null>(null);

  const handleOpenPanel = useCallback(() => {
    pendingFocusRef.current = 'close';
    if (isMobile) {
      setMobileOpenForPath(pathname);
    } else {
      setDesktopCollapsed(false);
    }
  }, [isMobile, pathname]);

  const handleClosePanel = useCallback(() => {
    pendingFocusRef.current = 'open';
    if (isMobile) {
      setMobileOpenForPath(null);
    } else {
      setDesktopCollapsed(true);
    }
  }, [isMobile]);

  // Apply post-commit keyboard focus only when explicitly requested by user toggle/Escape.
  useEffect(() => {
    const target = pendingFocusRef.current;
    if (!target) return;
    pendingFocusRef.current = null;

    if (target === 'close') {
      closeButtonRef.current?.focus();
    } else {
      openButtonRef.current?.focus();
    }
  }, [desktopCollapsed, mobileOpen]);

  // Lock body scroll only while the mobile overlay drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  // Support Escape key dismissal for open mobile drawer or focused desktop panel.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (isMobile && mobileOpen) {
        handleClosePanel();
        return;
      }

      const panelEl = document.getElementById('site-navigation-panel');
      if (
        !isMobile &&
        !desktopCollapsed &&
        panelEl?.contains(document.activeElement)
      ) {
        handleClosePanel();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [desktopCollapsed, handleClosePanel, isMobile, mobileOpen]);

  return (
    <div
      className={`${styles.shell} ${isExiting ? styles.shellExiting : ''}`}
      data-nav-collapsed={desktopCollapsed ? 'true' : 'false'}
    >
      <div className={styles.contentColumn}>
        <TopEdgeBar
          isCollapsedDesktop={desktopCollapsed}
          isPanelExpanded={isPanelExpanded}
          onOpenPanel={handleOpenPanel}
          openButtonRef={openButtonRef}
          onEnterOs={onEnterOs}
        />

        <main id="main-content" className={styles.main}>
          {children}
        </main>

        {footer}
      </div>

      <RightNavPanel
        isDesktopCollapsed={desktopCollapsed}
        isMobileOpen={mobileOpen}
        onClosePanel={handleClosePanel}
        closeButtonRef={closeButtonRef}
      />
    </div>
  );
}
