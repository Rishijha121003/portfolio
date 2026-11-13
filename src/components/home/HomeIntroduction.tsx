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
 * Editorial statement area with oversized staggered headline, concise placeholder copy, and /about link.
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
          <div className={styles.topMeta}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              <span>{resolvedEyebrow}</span>
            </span>
            <span className={styles.statusLabel}>{resolvedStatus}</span>
          </div>

          <h2 id="home-intro-heading" className={styles.heading}>
            <span className={styles.headingLead}>{resolvedLead}</span>
            {resolvedIndent ? (
              <span className={styles.headingIndent}>{resolvedIndent}</span>
            ) : null}
          </h2>

          <div className={styles.offsetColumn}>
            <span className={styles.copyAccentRule} aria-hidden="true" />

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
                ↗
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
