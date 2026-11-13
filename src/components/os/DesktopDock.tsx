'use client';

import { useDesktop } from '@/components/os/DesktopContext';
import { OsAppIcon } from '@/components/os/OsIcons';
import type { OsAppId } from '@/data/rishiOs';
import { OS_APPS, PHASE1_VISIBLE_APPS } from '@/data/rishiOs';
import styles from './DesktopDock.module.css';

const PRIMARY_DOCK_APPS: readonly OsAppId[] = [
  'home',
  'files',
  'projects',
  'terminal',
  'contact',
];

const MOBILE_BAR_APPS: readonly OsAppId[] = [
  'home',
  'files',
  'projects',
  'contact',
];

/**
 * Floating centered Soft UI bottom OS Dock featuring the five primary RISHI OS applications and responsive mobile navigation.
 */
export function DesktopDock() {
  const {
    windows,
    activeAppId,
    mobileAllAppsOpen,
    setMobileAllAppsOpen,
    openApp,
    focusApp,
  } = useDesktop();

  const handleDockClick = (appId: OsAppId) => {
    const win = windows[appId];
    if (win.isOpen) {
      focusApp(appId);
    } else {
      openApp(appId);
    }
  };

  const renderDockTile = (appId: OsAppId) => {
    const app = OS_APPS[appId];
    const win = windows[appId];
    const isActive = activeAppId === appId && !win.isMinimized;
    const isMinimized = win.isOpen && win.isMinimized;
    const isOpen = win.isOpen;

    const btnClasses = [styles.dockButton];
    if (isActive) btnClasses.push(styles.dockButtonActive);
    else if (isMinimized) btnClasses.push(styles.dockButtonMinimized);

    const statusText = isActive
      ? `${app.shortLabel} (Active)`
      : isMinimized
        ? `${app.shortLabel} (Minimized)`
        : app.shortLabel;

    return (
      <div key={appId} className={styles.dockItem}>
        <button
          id={`rishi-os-dock-${appId}`}
          type="button"
          className={btnClasses.join(' ')}
          aria-label={statusText}
          aria-pressed={isActive}
          onClick={() => handleDockClick(appId)}
        >
          <OsAppIcon appId={appId} size={20} />
        </button>
        <span className={styles.tooltip} role="tooltip">
          {statusText}
        </span>
        <div className={styles.indicatorTrack} aria-hidden="true">
          {isActive ? (
            <span className={styles.dotActive} />
          ) : isMinimized ? (
            <span className={styles.dotMinimized} />
          ) : isOpen ? (
            <span className={styles.dotOpen} />
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.dockWrapper} data-os-chrome="true">
      <nav className={styles.dock} aria-label="Application Dock">
        {PRIMARY_DOCK_APPS.map(renderDockTile)}
      </nav>

      <nav className={styles.mobileDockBar} aria-label="Mobile Workspace Navigation">
        {MOBILE_BAR_APPS.map((appId) => {
          const app = OS_APPS[appId];
          const isCurrent =
            !mobileAllAppsOpen &&
            activeAppId === appId &&
            !windows[appId].isMinimized;

          return (
            <button
              key={appId}
              type="button"
              className={
                isCurrent
                  ? `${styles.mobileTabBtn} ${styles.mobileTabBtnActive}`
                  : styles.mobileTabBtn
              }
              onClick={() => openApp(appId)}
            >
              <OsAppIcon appId={appId} size={18} />
              <span>{app.shortLabel}</span>
            </button>
          );
        })}

        <button
          type="button"
          className={
            mobileAllAppsOpen
              ? `${styles.mobileTabBtn} ${styles.mobileTabBtnActive}`
              : styles.mobileTabBtn
          }
          aria-expanded={mobileAllAppsOpen}
          aria-label={`All Apps (${PHASE1_VISIBLE_APPS.length})`}
          onClick={() => setMobileAllAppsOpen(!mobileAllAppsOpen)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
          </svg>
          <span>Apps</span>
        </button>
      </nav>
    </div>
  );
}
