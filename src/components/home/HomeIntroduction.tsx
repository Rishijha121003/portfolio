import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { HOME_STRUCTURAL_DATA } from '@/data/portfolio';
import styles from './HomeIntroduction.module.css';

interface HomeIntroductionProps {
  eyebrow?: string;
  statusLabel?: string;
  headingLead?: string;
  headingIndent?: string;
  lines?: readonly string[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Editorial statement section featuring monumental typography, engineering philosophy pills,
 * and direct deep dive link into the About page.
 */
export function HomeIntroduction({
  eyebrow,
  statusLabel,
  headingLead,
  headingIndent,
  lines,
  ctaLabel,
  ctaHref,
}: HomeIntroductionProps = {}) {
  const defaults = HOME_STRUCTURAL_DATA.introduction;
  const resolvedEyebrow = eyebrow ?? defaults.eyebrow;
  const resolvedStatus = statusLabel ?? defaults.statusLabel;
  const resolvedLead = headingLead ?? defaults.headingLead;
  const resolvedIndent = headingIndent ?? defaults.headingIndent;
  const resolvedLines = lines ?? defaults.lines;
  const resolvedCtaLabel = ctaLabel ?? defaults.ctaLabel;
  const resolvedCtaHref = ctaHref ?? defaults.ctaHref;

  return (
    <section
      id="home-introduction"
      className={styles.section}
      aria-labelledby="home-intro-heading"
    >
      <Container>
        <div className={styles.wrapper}>
          {/* Header Metadata */}
          <div className={styles.topMeta}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>{resolvedEyebrow}</span>
            </span>
            <span className={styles.statusLabel}>{resolvedStatus}</span>
          </div>

          {/* Monumental Editorial Headline */}
          <h2 id="home-intro-heading" className={styles.heading}>
            <span className={styles.headingLead}>{resolvedLead}</span>
            {resolvedIndent ? (
              <span className={styles.headingIndent}>{resolvedIndent}</span>
            ) : null}
          </h2>

          {/* 2-Column Split: Pillars Left + Detailed Copy Right */}
          <div className={styles.contentGrid}>
            <div className={styles.pillarsCol}>
              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>01</span>
                <div className={styles.pillarInfo}>
                  <h3 className={styles.pillarTitle}>Backend Architecture</h3>
                  <p className={styles.pillarDesc}>
                    FastAPI, PostgreSQL & typed schemas designed for reliability.
                  </p>
                </div>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>02</span>
                <div className={styles.pillarInfo}>
                  <h3 className={styles.pillarTitle}>Modern Web UI</h3>
                  <p className={styles.pillarDesc}>
                    React 19 & Next.js delivering fast, accessible web interfaces.
                  </p>
                </div>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>03</span>
                <div className={styles.pillarInfo}>
                  <h3 className={styles.pillarTitle}>Pragmatic Execution</h3>
                  <p className={styles.pillarDesc}>
                    Third place at the Cheque Mate pitch competition.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.narrativeCol}>
              <div className={styles.copyBlock}>
                {resolvedLines.map((line) => (
                  <p key={line} className={styles.line}>
                    {line}
                  </p>
                ))}
              </div>

              <Link href={resolvedCtaHref} className={styles.moreLink}>
                <span>{resolvedCtaLabel}</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
