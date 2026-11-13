'use client';

import { useDesktop } from '@/components/os/DesktopContext';
import { FsEntryIcon, OsAppIcon } from '@/components/os/OsIcons';
import { DESKTOP_SHORTCUTS } from '@/data/rishiOs';
import styles from './DesktopIcons.module.css';

/**
 * Uncrowded vertical column of quick desktop shortcuts anchored on the left workspace edge.
 */
export function DesktopIcons() {
  const { activeAppId, projectsSubView, windows, openApp } = useDesktop();

  return (
    <nav className={styles.grid} data-os-chrome="true" aria-label="Desktop Shortcuts">
      {DESKTOP_SHORTCUTS.map((shortcut) => {
        const isCurrent =
          activeAppId === shortcut.appId &&
          !windows[shortcut.appId].isMinimized &&
          (!shortcut.projectSubView || shortcut.projectSubView === projectsSubView);

        return (
          <button
            key={shortcut.id}
            type="button"
            className={
              isCurrent
                ? `${styles.iconTile} ${styles.iconTileActive}`
                : styles.iconTile
            }
            onClick={() =>
              openApp(shortcut.appId, {
                projectSubView: shortcut.projectSubView,
                filesPath: shortcut.targetPath,
              })
            }
          >
            <span className={styles.iconVisual} aria-hidden="true">
              {shortcut.id === 'shortcut-dormiq' ? (
                <FsEntryIcon kind="dir" size={20} />
              ) : shortcut.id === 'shortcut-resume' ? (
                <FsEntryIcon kind="file" fileType="text" size={20} />
              ) : (
                <OsAppIcon appId={shortcut.appId} size={20} />
              )}
            </span>
            <span className={styles.iconLabel}>{shortcut.label}</span>
            <span className={styles.iconSub}>{shortcut.sublabel}</span>
          </button>
        );
      })}
    </nav>
  );
}

