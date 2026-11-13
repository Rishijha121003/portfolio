'use client';

import { useDesktop } from '@/components/os/DesktopContext';
import { RishiOsBrandIcon } from '@/components/os/OsIcons';
import styles from './HomeAppView.module.css';

/**
 * RISHI OS Welcome window matching the minimalist RJ orbit artwork, focused greeting, pill CTAs, and 3 interactive summary stats.
 */
export function HomeAppView() {
  const { openApp } = useDesktop();

  return (
    <div className={styles.root}>
      <section className={styles.heroStage} aria-labelledby="os-home-hero-name">
        {/* Left Artwork Card: Midnight Mountain Silhouette + Official RJ Monogram */}
        <div className={styles.artworkCard} aria-hidden="true">
          <div className={styles.artworkAtmosphere} />
          <RishiOsBrandIcon size={128} variant="primary" />
        </div>

        {/* Right Welcome Copy & Pill CTAs */}
        <div className={styles.heroDetails}>
          <div className={styles.copyBlock}>
            <div className={styles.systemKicker}>
              <span className={styles.kickerDot} aria-hidden="true" />
              <span>SESSION ACTIVE // RISHI OS v2.4</span>
            </div>
            <h2 id="os-home-hero-name" className={styles.heading}>
              Rishi Jha
            </h2>
            <p className={styles.subheading}>Software Developer · Full-Stack &amp; Systems</p>
            <p className={styles.description}>
              Interactive developer workstation engineered to explore architectural case studies, confirmed technical skills, and production applications.
            </p>
          </div>

          <div className={styles.actionsRow}>
            <button
              type="button"
              className={styles.primaryPill}
              onClick={() => openApp('projects', { projectSubView: 'directory' })}
            >
              <span>View Projects</span>
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              className={styles.secondaryPill}
              onClick={() => openApp('about')}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 16v-4.5M12 8.2h.01" />
              </svg>
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider} aria-hidden="true" />

      {/* Bottom 3 Clean Interactive Metric Tiles */}
      <section className={styles.statsStrip} aria-label="Workspace overview">
        <button
          type="button"
          className={styles.statTile}
          onClick={() => openApp('projects', { projectSubView: 'directory' })}
        >
          <span className={`${styles.statIconWrap} ${styles.statIconProjects}`} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6.8a2.2 2.2 0 0 1 2.2-2.2h4.1l1.9 2H18.8A2.2 2.2 0 0 1 21 8.8v8.4a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 17.2V6.8Z"
                fill="#55c7e8"
              />
            </svg>
          </span>
          <span className={styles.statText}>
            <span className={styles.statValue}>6</span>
            <span className={styles.statLabel}>Projects</span>
          </span>
        </button>

        <button
          type="button"
          className={styles.statTile}
          onClick={() => openApp('skills')}
        >
          <span className={`${styles.statIconWrap} ${styles.statIconSkills}`} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 8-4 4 4 4" />
              <path d="m16 8 4 4-4 4" />
              <path d="m13.5 6-3 12" />
            </svg>
          </span>
          <span className={styles.statText}>
            <span className={styles.statValue}>5+</span>
            <span className={styles.statLabel}>Skills</span>
          </span>
        </button>

        <button
          type="button"
          className={styles.statTile}
          onClick={() => openApp('journey')}
        >
          <span className={`${styles.statIconWrap} ${styles.statIconAchievement}`} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" fill="rgba(234, 182, 118, 0.28)" />
              <path d="M7 6H4.5a1.5 1.5 0 0 0-1.5 1.5v1A3.5 3.5 0 0 0 6.5 12H7" />
              <path d="M17 6h2.5A1.5 1.5 0 0 1 21 7.5v1A3.5 3.5 0 0 1 17.5 12H17" />
              <path d="M12 14v5M8.5 19h7" />
            </svg>
          </span>
          <span className={styles.statText}>
            <span className={styles.statValue}>1</span>
            <span className={styles.statLabel}>Achievement</span>
          </span>
        </button>
      </section>
    </div>
  );
}
