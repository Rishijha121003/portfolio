'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDesktop } from '@/components/os/DesktopContext';
import { DigitalTerrain } from '@/components/home/DigitalTerrain';
import Image from 'next/image';
import styles from './HomeHero.module.css';

/**
 * Main Portfolio Homepage Hero — "RISHI.JHA / Personal Digital Identity"
 * Hybrid terminal + personal branding featuring a lightweight boot sequence,
 * prominent RISHI JHA typography with blinking cursor, custom geometric RJ monogram,
 * and vector digital terrain horizon.
 */
export function HomeHero() {
  const router = useRouter();
  let enterDesktop: (() => void) | undefined;
  try {
    const desktop = useDesktop();
    enterDesktop = desktop.enterDesktopFromPortfolio;
  } catch {
    // Graceful fallback if rendered outside DesktopProvider
  }

  const handleOpenOs = useCallback(() => {
    if (enterDesktop) {
      enterDesktop();
    } else {
      try {
        window.sessionStorage.removeItem('rishi-os-mode');
      } catch {
        // ignore
      }
      router.push('/');
    }
  }, [enterDesktop, router]);

  return (
    <section className={styles.section} aria-labelledby="home-hero-heading">
      {/* Subtle Technical Coordinate Grid & Background Depth */}
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.stage}>
        {/* Top Technical Metadata Header Bar */}
        <header className={styles.topMetaBar} aria-label="System Identity Header">
          <div className={styles.topMetaLeft}>
            <span className={styles.cliPromptSymbol} aria-hidden="true">
              {'>_'}
            </span>
            <span className={styles.systemTag}>RISHI_OS v1.0.0</span>
            <span className={styles.metaDivider} aria-hidden="true">
              ·
            </span>
            <span className={styles.systemSubTag}>
              RISHI.JHA / PERSONAL SYSTEM
            </span>
          </div>

          <div className={styles.topMetaRight} aria-hidden="true">
            <span className={styles.mottoText}>DREAM</span>
            <span className={styles.mottoChevron}>{'>'}</span>
            <span className={styles.mottoText}>CODE</span>
            <span className={styles.mottoChevron}>{'>'}</span>
            <span className={styles.mottoText}>BUILD</span>
            <span className={styles.mottoSlash}>{'//'}</span>
          </div>
        </header>

        {/* Hero Split Layout: Left Content + Right Geometric RJ Monogram */}
        <div className={styles.heroBody}>
          <div className={styles.identityCol}>
            {/* Terminal Boot Sequence */}
            <div
              className={styles.terminalBootBlock}
              aria-label="System boot sequence"
            >
              <div className={`${styles.bootLine} ${styles.bootLine1}`}>
                <span className={styles.bootPrompt}>{'>'}</span>
                <span>initializing rishi_jha...</span>
              </div>
              <div className={`${styles.bootLine} ${styles.bootLine2}`}>
                <span className={styles.bootPrompt}>{'>'}</span>
                <span>loading developer profile...</span>
              </div>
              <div className={`${styles.bootLine} ${styles.bootLine3}`}>
                <span className={styles.bootPrompt}>{'>'}</span>
                <span>establishing connections...</span>
              </div>
              <div className={`${styles.bootLine} ${styles.bootLine4}`}>
                <span className={styles.bootPromptCyan}>{'>'}</span>
                <span className={styles.bootReadyText}>system ready.</span>
              </div>
            </div>

            {/* Main Identity Heading */}
            <div className={styles.headingGroup}>
              <div className={styles.systemEyebrow}>
                <span className={styles.eyebrowLine} aria-hidden="true" />
                <span>RISHI.JHA / PERSONAL SYSTEM</span>
              </div>

              <h1 id="home-hero-heading" className={styles.nameHeading}>
                <span>RISHI JHA</span>
                <span
                  className={styles.cursor}
                  aria-hidden="true"
                  title="Cursor"
                >
                  |
                </span>
              </h1>

              <p className={styles.subtitle}>
                <span>Computer Science Student</span>
                <span className={styles.subSep} aria-hidden="true">
                  |
                </span>
                <span>Aspiring Full Stack Developer</span>
              </p>

              <p className={styles.tagline}>
                <span className={styles.taglineSlash}>{'//'}</span>
                <span>Learning. Building. Improving.</span>
                <span className={styles.taglineSlash}>{'//'}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionRow}>
              <a href="#home-explore" className={styles.primaryCta}>
                <span className={styles.ctaPrompt} aria-hidden="true">
                  {'>_'}
                </span>
                <span>Explore Portfolio</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </a>

              <button
                type="button"
                className={styles.secondaryCta}
                onClick={handleOpenOs}
                title="Switch to RISHI OS desktop environment"
              >
                <svg
                  className={styles.osWindowIcon}
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="5" height="5" rx="1" />
                  <rect x="9" y="2" width="5" height="5" rx="1" />
                  <rect x="2" y="9" width="5" height="5" rx="1" />
                  <rect x="9" y="9" width="5" height="5" rx="1" />
                </svg>
                <span>Open RISHI OS</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Right Supporting Visual: Official RJ Primary Monogram Logo */}
          <div className={styles.monogramCol}>
            <div className={styles.monogramWrap}>
              <Image
                src="/images/rj-primary.svg"
                alt="RJ Monogram Logo"
                width={512}
                height={512}
                priority
                className={styles.rjMonogramSvg}
              />
            </div>
          </div>
        </div>

        {/* Digital Wireframe Horizon Terrain */}
        <DigitalTerrain className={styles.terrainContainer} />

        {/* Bottom Technical Status Bar */}
        <footer className={styles.bottomStatusBar} aria-label="System status">
          <div className={styles.statusPill}>
            <span className={styles.onlineDot} aria-hidden="true" />
            <span className={styles.statusKey}>Status:</span>
            <span className={styles.statusValOnline}>Online</span>
            <span className={styles.statusSep}>{'//'}</span>
            <span className={styles.statusKey}>Mode:</span>
            <span className={styles.statusVal}>Developer</span>
            <span className={styles.statusSep}>{'//'}</span>
            <span className={styles.statusKey}>Location:</span>
            <span className={styles.statusVal}>India</span>
          </div>

          <a href="#home-introduction" className={styles.scrollDownLink}>
            <span>Scroll</span>
            <span aria-hidden="true">↓</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
