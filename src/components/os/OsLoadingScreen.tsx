import { RishiOsBrandIcon } from '@/components/os/OsIcons';
import styles from './OsLoadingScreen.module.css';

/**
 * Accessible fallback screen rendered while RISHI OS desktop chunk is being lazy loaded.
 */
export function OsLoadingScreen() {
  return (
    <div
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-label="Loading RISHI OS workspace"
    >
      <div className={styles.backdropMesh} aria-hidden="true" />
      <div className={styles.centerBlock}>
        <div className={styles.emblemWrapper}>
          <div className={styles.pulseRing} aria-hidden="true" />
          <RishiOsBrandIcon size={48} variant="primary" />
        </div>

        <div className={styles.metaGroup}>
          <h2 className={styles.brandTitle}>RISHI OS</h2>
          <p className={styles.statusText}>Initializing simulated workspace...</p>
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
}
