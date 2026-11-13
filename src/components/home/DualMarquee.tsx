import Image from 'next/image';
import { DUAL_MARQUEE_DATA } from '@/data/portfolio';
import styles from './DualMarquee.module.css';

/**
 * Opposite-direction monochrome showcase combining verified project visuals and editorial typography.
 */
export function DualMarquee() {
  const { visualTrackLabel, visualTiles, typographyTrackLabel, typographyWords } =
    DUAL_MARQUEE_DATA;

  const visualCycles = [0, 1] as const;
  const wordCycles = [0, 1] as const;

  return (
    <section
      className={styles.section}
      aria-label="Visual and editorial showcase"
    >
      {/* Track 01: Continuous Left-to-Right Visual Showcase */}
      <div
        className={styles.viewport}
        tabIndex={0}
        role="region"
        aria-label={`${visualTrackLabel} (focus or hover to pause)`}
      >
        <div className={`${styles.track} ${styles.trackLtr}`}>
          <div className={styles.group}>
            {visualCycles.map((cycle) =>
              visualTiles.map((tile) => {
                const isRepeat = cycle > 0;
                return (
                  <div
                    key={`v1-${cycle}-${tile.src}`}
                    className={
                      isRepeat
                        ? `${styles.visualTile} ${styles.repeatFill}`
                        : styles.visualTile
                    }
                    aria-hidden={isRepeat ? 'true' : undefined}
                  >
                    <Image
                      src={tile.src}
                      alt={isRepeat ? '' : tile.alt}
                      width={tile.width}
                      height={tile.height}
                      sizes="(max-width: 640px) 185px, (max-width: 1024px) 250px, 350px"
                      className={styles.tileImage}
                    />
                  </div>
                );
              })
            )}
          </div>

          <div className={`${styles.group} ${styles.groupClone}`} aria-hidden="true">
            {visualCycles.map((cycle) =>
              visualTiles.map((tile) => (
                <div key={`v2-${cycle}-${tile.src}`} className={styles.visualTile}>
                  <Image
                    src={tile.src}
                    alt=""
                    width={tile.width}
                    height={tile.height}
                    sizes="(max-width: 640px) 185px, (max-width: 1024px) 250px, 350px"
                    className={styles.tileImage}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Track 02: Continuous Right-to-Left Typography Showcase */}
      <div
        className={styles.viewport}
        tabIndex={0}
        role="region"
        aria-label={`${typographyTrackLabel} (focus or hover to pause)`}
      >
        <div className={`${styles.track} ${styles.trackRtl}`}>
          <div className={styles.group}>
            {wordCycles.map((cycle) =>
              typographyWords.map((word, index) => {
                const isRepeat = cycle > 0;
                const isAccent = index % 2 === 0;
                return (
                  <div
                    key={`t1-${cycle}-${word}`}
                    className={
                      isRepeat
                        ? `${styles.wordItem} ${styles.repeatFill}`
                        : styles.wordItem
                    }
                    aria-hidden={isRepeat ? 'true' : undefined}
                  >
                    <span
                      className={
                        isAccent
                          ? `${styles.wordText} ${styles.wordTextAccent}`
                          : styles.wordText
                      }
                    >
                      {word}
                    </span>
                    <span className={styles.wordDivider} aria-hidden="true">
                      /
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div className={`${styles.group} ${styles.groupClone}`} aria-hidden="true">
            {wordCycles.map((cycle) =>
              typographyWords.map((word, index) => (
                <div key={`t2-${cycle}-${word}`} className={styles.wordItem}>
                  <span
                    className={
                      index % 2 === 0
                        ? `${styles.wordText} ${styles.wordTextAccent}`
                        : styles.wordText
                    }
                  >
                    {word}
                  </span>
                  <span className={styles.wordDivider}>/</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

