'use client';

import React, { useMemo } from 'react';
import { useDesktop } from './DesktopContext';
import { OS_APPS, OS_APP_ORDER, OsAppId } from '@/data/rishiOs';
import { OsAppIcon } from './OsIcons';
import styles from './AltTabSwitcher.module.css';

export function AltTabSwitcher() {
  const { altTabOpen, altTabIndex, windows, focusApp, setAltTabOpen } =
    useDesktop();

  const openAppIds = useMemo(
    () => OS_APP_ORDER.filter((id) => windows[id].isOpen),
    [windows]
  );

  if (!altTabOpen || openAppIds.length === 0) return null;

  const safeIndex =
    altTabIndex >= 0 && altTabIndex < openAppIds.length ? altTabIndex : 0;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Application Switcher"
      onClick={() => setAltTabOpen(false)}
    >
      <div
        className={styles.hud}
        data-os-chrome="true"
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.hudTitle}>Open Applications · Alt + Tab</span>

        <div className={styles.appList} role="listbox">
          {openAppIds.map((id: OsAppId, idx: number) => {
            const app = OS_APPS[id];
            const win = windows[id];
            const isSelected = idx === safeIndex;

            return (
              <button
                key={id}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`${styles.appItem} ${
                  isSelected ? styles.appItemActive : ''
                }`}
                onClick={() => {
                  setAltTabOpen(false);
                  focusApp(id);
                }}
              >
                <div className={styles.appIconBox}>
                  <OsAppIcon appId={id} size={22} />
                </div>
                <span className={styles.appName}>{app.shortLabel}</span>
                <span className={styles.appStatus}>
                  {win.isMinimized ? 'Min' : 'Open'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

