'use client';

import { useDesktop } from '@/components/os/DesktopContext';
import styles from './DesktopBackground.module.css';

/**
 * Logged-in RISHI OS desktop wallpaper stage driven by the persisted WallpaperId setting.
 */
export function DesktopBackground() {
  const { wallpaperId } = useDesktop();

  return (
    <div className={styles.stageRoot} aria-hidden="true">
      <div className={styles.surface} data-wallpaper={wallpaperId} />
    </div>
  );
}
