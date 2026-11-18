import Link from 'next/link';
import Image from 'next/image';
import styles from './HomeHero.module.css';

/**
 * Homepage hero — Print Editorial Developer Portfolio.
 * Left: eyebrow (exact professional headline), serif H1, proof strip.
 * Right: editorial dossier index card with verified facts only.
 */
export function HomeHero() {
  return (
    <section className={styles.section} aria-labelledby="home-hero-heading">
      <div className={styles.stage}>
        {/* Editorial identity bar — a hairline, not a capsule */}
        <header className={styles.metaBar} aria-label="Availability">
          <span className={styles.metaDot} aria-hidden="true" />
          <span className={styles.metaText}>AVAILABLE FOR OPPORTUNITIES</span>
          <span className={styles.metaSep} aria-hidden="true">
            ·
          </span>
          <span className={styles.metaFaint}>
            B.Tech CSE @ Sandip University
          </span>
        </header>

        {/* Asymmetric hero split */}
        <div className={styles.heroBody}>
          <div className={styles.identityCol}>
            <p className={styles.eyebrow}>Backend-Focused Full Stack Developer</p>

            <h1 id="home-hero-heading" className={styles.headline}>
              Building scalable backends
              <br />&amp; modern web products.
            </h1>

            <p className={styles.statement}>
              I&apos;m <strong>Rishi Jha</strong> — a Computer Science student at{' '}
              <strong>Sandip University</strong> building backend systems with{' '}
              <strong>Python</strong>, <strong>FastAPI</strong> and{' '}
              <strong>PostgreSQL</strong>, with a bias for clean architecture and
              real data integrity.
            </p>

            <div className={styles.actionRow}>
              <Link href="/projects/assignflow" className={styles.primaryCta}>
                View AssignFlow
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://github.com/Rishijha121003"
                className={styles.secondaryCta}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p className={styles.proofStrip} aria-label="Core technologies">
              FastAPI · PostgreSQL · SQLAlchemy 2 · Alembic · JWT cookie auth
              <br />
              row-level locking · on-demand ZIP packaging · CSV formula-injection sanitization ·
              Pytest
            </p>
          </div>

          {/* Right column — editorial dossier index card */}
          <aside className={styles.dossier} aria-label="Current work and background">
            <div className={styles.dossierHead}>
              <Image
                src="/images/rj-primary.svg"
                alt="RJ monogram"
                width={40}
                height={40}
                priority
                className={styles.dossierMark}
              />
              <div className={styles.dossierHeadText}>
                <span className={styles.dossierName}>Rishi Jha</span>
                <span className={styles.dossierRole}>
                  Backend-Focused Full Stack Developer
                </span>
              </div>
            </div>

            <dl className={styles.dossierRows}>
              <div className={styles.dossierRow}>
                <dt>EDUCATION</dt>
                <dd>B.Tech CSE · Sandip University · 4th year</dd>
              </div>
              <div className={styles.dossierRow}>
                <dt>BUILDING</dt>
                <dd>
                  AssignFlow — assignment lifecycle workflow, FastAPI ·
                  SQLAlchemy 2 · PostgreSQL
                </dd>
              </div>
              <div className={styles.dossierRow}>
                <dt>SHIPPED</dt>
                <dd>
                  DormiQ — hostel allocation system · Team Impact Crew · 3rd,
                  Cheque Mate pitch
                </dd>
              </div>
              <div className={styles.dossierRow}>
                <dt>CERTIFIED</dt>
                <dd>HackerRank SQL certification</dd>
              </div>
              <div className={styles.dossierRow}>
                <dt>BASE</dt>
                <dd>Darbhanga, Bihar · India</dd>
              </div>
              <div className={styles.dossierRow}>
                <dt>STATUS</dt>
                <dd className={styles.statusValue}>Open to backend &amp; full-stack roles</dd>
              </div>
            </dl>

            <Link href="/projects" className={styles.dossierLink}>
              Browse all projects
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>

        {/* Bottom mono strip — verified facts only */}
        <footer className={styles.stripBar} aria-label="Highlights">
          <span className={styles.stripItem}>
            <strong>FastAPI · PostgreSQL · SQLAlchemy 2</strong>
            <em>backend systems</em>
          </span>
          <span className={styles.stripSep} aria-hidden="true" />
          <span className={styles.stripItem}>
            <strong>DormiQ — 3rd</strong>
            <em>Cheque Mate pitch</em>
          </span>
          <span className={styles.stripSep} aria-hidden="true" />
          <span className={styles.stripItem}>
            <strong>AssignFlow</strong>
            <em>in progress · local development</em>
          </span>
          <span className={styles.stripSep} aria-hidden="true" />
          <span className={styles.stripItem}>
            <strong>RISHI OS</strong>
            <em>simulated workspace</em>
          </span>
        </footer>
      </div>
    </section>
  );
}
