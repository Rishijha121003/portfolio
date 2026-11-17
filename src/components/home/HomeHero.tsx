'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDesktop } from '@/components/os/DesktopContext';
import { DigitalTerrain } from '@/components/home/DigitalTerrain';
import Image from 'next/image';
import styles from './HomeHero.module.css';

/**
 * Main Portfolio Homepage Hero — "RISHI.JHA / Personal Digital Identity"
 * Ultra-modern developer hero featuring monumental typography, live status beacon,
 * interactive developer dossier card, official RJ emblem, and vector digital terrain horizon.
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
      {/* Background depth & ambient glow */}
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.stage}>
        {/* Top Technical Metadata Bar */}
        <header className={styles.topMetaBar} aria-label="System Identity Header">
          <div className={styles.topMetaLeft}>
            <span className={styles.statusBeacon} aria-hidden="true" />
            <span className={styles.statusText}>AVAILABLE FOR OPPORTUNITIES</span>
            <span className={styles.metaDivider} aria-hidden="true">
              /
            </span>
            <span className={styles.systemTag}>SYSTEM v1.0</span>
          </div>

          <div className={styles.topMetaRight} aria-hidden="true">
            <span className={styles.mottoText}>DREAM</span>
            <span className={styles.mottoChevron}>›</span>
            <span className={styles.mottoText}>CODE</span>
            <span className={styles.mottoChevron}>›</span>
            <span className={styles.mottoText}>BUILD</span>
          </div>
        </header>

        {/* Hero Body Split: Left Identity + Right Interactive Dossier Card */}
        <div className={styles.heroBody}>
          <div className={styles.identityCol}>
            {/* Terminal Boot Sequence Pill */}
            <div
              className={styles.terminalBootBlock}
              aria-label="Developer initialization status"
            >
              <div className={styles.bootRow}>
                <span className={styles.bootPrompt}>{'>_'}</span>
                <span className={styles.bootText}>init rishi_jha --full-stack</span>
                <span className={styles.bootBadge}>Ready</span>
              </div>
            </div>

            {/* Monumental Name & Title */}
            <div className={styles.headingGroup}>
              <h1 id="home-hero-heading" className={styles.nameHeading}>
                <span className={styles.nameText}>RISHI JHA</span>
                <span className={styles.cursor} aria-hidden="true">
                  _
                </span>
              </h1>

              <p className={styles.roleTitle}>
                Full Stack & Systems Developer
              </p>

              <p className={styles.statementText}>
                Computer Science Student at <strong>Sandip University</strong> building
                scalable backend architectures, robust APIs, and high-performance web products.
              </p>

              <div className={styles.taglineRow}>
                <span className={styles.taglinePill}>FastAPI</span>
                <span className={styles.taglinePill}>React 19</span>
                <span className={styles.taglinePill}>PostgreSQL</span>
                <span className={styles.taglinePill}>TypeScript</span>
                <span className={styles.taglinePill}>Python</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionRow}>
              <a href="#home-explore" className={styles.primaryCta}>
                <span>Explore Work</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  ↓
                </span>
              </a>

              <button
                type="button"
                className={styles.secondaryCta}
                onClick={handleOpenOs}
                title="Launch RISHI OS simulated desktop environment"
              >
                <span className={styles.osWindowIcon} aria-hidden="true">
                  ❖
                </span>
                <span>Launch RISHI OS</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  ↗
                </span>
              </button>

              <a href="/contact" className={styles.tertiaryCta}>
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Right Supporting Visual: Holographic Tech Emblem Card */}
          <div className={styles.visualCol}>
            <div className={styles.dossierCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <span className={styles.cardDotGreen} />
                  <span className={styles.cardDotYellow} />
                  <span className={styles.cardDotRed} />
                </div>
                <span className={styles.cardHeaderTitle}>DEVELOPER DOSSIER</span>
              </div>

              {/* Central Illuminated Emblem */}
              <div className={styles.emblemContainer}>
                <div className={styles.emblemGlow} aria-hidden="true" />
                <Image
                  src="/images/rj-primary.svg"
                  alt="RJ Geometric Emblem"
                  width={240}
                  height={240}
                  priority
                  className={styles.emblemImage}
                />
              </div>

              {/* Technical Specifications Grid */}
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>EDUCATION</span>
                  <span className={styles.specValue}>B.Tech CSE · Sandip Univ</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>HACKATHON</span>
                  <span className={styles.specValueHighlight}>Top 3 · Cheque Mate</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>FEATURED</span>
                  <span className={styles.specValue}>DormiQ Case Study</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>STATUS</span>
                  <span className={styles.specValueOnline}>● Open to Roles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Wireframe Horizon Terrain */}
        <DigitalTerrain className={styles.terrainContainer} />

        {/* Bottom Technical Status Bar */}
        <footer className={styles.bottomStatusBar} aria-label="System status">
          <div className={styles.statusPill}>
            <span className={styles.onlineDot} aria-hidden="true" />
            <span className={styles.statusKey}>System:</span>
            <span className={styles.statusValOnline}>Online</span>
            <span className={styles.statusSep}>{'//'}</span>
            <span className={styles.statusKey}>Architecture:</span>
            <span className={styles.statusVal}>Next.js 16 + React 19</span>
            <span className={styles.statusSep}>{'//'}</span>
            <span className={styles.statusKey}>Simulated OS:</span>
            <span className={styles.statusVal}>RISHI OS v1.0</span>
          </div>

          <a href="#home-introduction" className={styles.scrollDownLink}>
            <span>Scroll Down</span>
            <span aria-hidden="true">↓</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
