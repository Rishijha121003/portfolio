'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useDesktop } from '@/components/os/DesktopContext';
import styles from './HomeHero.module.css';

/**
 * Modern Developer Hero — Rishi Jha // Full Stack & Systems Developer
 * Designed for elite visual impact, clean typography, live availability,
 * and high-converting featured project spotlight.
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
              ·
            </span>
            <span className={styles.systemTag}>B.Tech CSE @ Sandip University</span>
          </div>

          <div className={styles.topMetaRight} aria-hidden="true">
            <span className={styles.mottoTag}>Dream</span>
            <span className={styles.mottoDot}>•</span>
            <span className={styles.mottoTag}>Code</span>
            <span className={styles.mottoDot}>•</span>
            <span className={styles.mottoTag}>Build</span>
          </div>
        </header>

        {/* Hero Body Split: Left Identity + Right Interactive Spotlight Card */}
        <div className={styles.heroBody}>
          <div className={styles.identityCol}>
            {/* Role Category Badge */}
            <div className={styles.badgeWrapper}>
              <div className={styles.roleBadge}>
                <span className={styles.roleSparkle} aria-hidden="true">
                  ✨
                </span>
                <span>Full Stack &amp; Backend Engineer</span>
              </div>
            </div>

            {/* Monumental Headline */}
            <div className={styles.headingGroup}>
              <h1 id="home-hero-heading" className={styles.nameHeading}>
                Building scalable backends &amp; modern web products.
              </h1>

              <p className={styles.statementText}>
                Hi, I&apos;m <strong>Rishi Jha</strong> — a Computer Science student at{' '}
                <strong>Sandip University</strong> specializing in <strong>FastAPI</strong>,{' '}
                <strong>React 19</strong>, and <strong>PostgreSQL</strong>. Passionate about
                high-throughput API design, clean systems architecture, and fluid digital interfaces.
              </p>

              <div className={styles.taglineRow} aria-label="Core technologies">
                <span className={styles.taglinePill}>FastAPI</span>
                <span className={styles.taglinePill}>React 19</span>
                <span className={styles.taglinePill}>PostgreSQL</span>
                <span className={styles.taglinePill}>TypeScript</span>
                <span className={styles.taglinePill}>Python</span>
                <span className={styles.taglinePill}>TailwindCSS</span>
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

              <Link href="/contact" className={styles.tertiaryCta}>
                <span>Contact Me</span>
              </Link>
            </div>
          </div>

          {/* Right Supporting Visual: Featured Work Spotlight Card */}
          <div className={styles.visualCol}>
            <div className={styles.spotlightCard}>
              {/* Card Top Pill & Header */}
              <div className={styles.cardHeader}>
                <div className={styles.hackathonBadge}>
                  <span className={styles.trophyIcon} aria-hidden="true">
                    🏆
                  </span>
                  <span>Cheque Mate Hackathon · Top 3 Finalist</span>
                </div>
              </div>

              {/* Central Featured Showcase: DormiQ */}
              <div className={styles.spotlightShowcase}>
                <div className={styles.projectIconBadge}>
                  <Image
                    src="/images/rj-standalone.svg"
                    alt="DormiQ Emblem"
                    width={28}
                    height={28}
                    className={styles.projectLogo}
                  />
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectEyebrow}>FEATURED CASE STUDY</div>
                  <h3 className={styles.projectTitle}>DormiQ</h3>
                  <p className={styles.projectSubtitle}>
                    Smart Hostel &amp; Housing Management Ecosystem
                  </p>
                </div>
              </div>

              <p className={styles.projectSummary}>
                Engineered robust student hostel allocation workflows, real-time queues, and role-based
                access control with FastAPI and PostgreSQL backend services.
              </p>

              {/* Technical Specifications Grid */}
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>EDUCATION</span>
                  <span className={styles.specValue}>B.Tech CSE · Sandip Univ</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>RECOGNITION</span>
                  <span className={styles.specValueHighlight}>Top 3 National Finalist</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>LOCATION</span>
                  <span className={styles.specValue}>Bihar, India</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>STATUS</span>
                  <span className={styles.specValueOnline}>● Open to Roles</span>
                </div>
              </div>

              <div className={styles.spotlightFooter}>
                <Link href="/projects/dormiq" className={styles.caseStudyLink}>
                  <span>Read DormiQ Case Study</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <footer className={styles.bottomStatsBar} aria-label="Key Highlights">
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>Top 3</span>
            <span className={styles.metricLabel}>Cheque Mate Hackathon</span>
          </div>
          <div className={styles.metricDivider} aria-hidden="true" />

          <div className={styles.metricItem}>
            <span className={styles.metricValue}>FastAPI</span>
            <span className={styles.metricLabel}>High-throughput Backends</span>
          </div>
          <div className={styles.metricDivider} aria-hidden="true" />

          <div className={styles.metricItem}>
            <span className={styles.metricValue}>B.Tech CSE</span>
            <span className={styles.metricLabel}>Sandip University</span>
          </div>
          <div className={styles.metricDivider} aria-hidden="true" />

          <div className={styles.metricItem}>
            <span className={styles.metricValue}>RISHI OS</span>
            <span className={styles.metricLabel}>Interactive Desktop Web OS</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
