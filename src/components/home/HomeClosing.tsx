import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { HOME_STRUCTURAL_DATA } from '@/data/portfolio';
import styles from './HomeClosing.module.css';

/**
 * Editorial closing section with a prominent call to action card linking directly to Contact.
 */
export function HomeClosing() {
  const { closing } = HOME_STRUCTURAL_DATA;

  return (
    <section
      id="home-closing"
      className={styles.section}
      aria-labelledby="home-closing-heading"
    >
      <Container>
        <div className={styles.ctaCard}>
          <div className={styles.cardGlow} aria-hidden="true" />

          <div className={styles.topMeta}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>{closing.eyebrow}</span>
            </span>

            <span className={styles.metaPath} aria-hidden="true">
              <span className={styles.pathDot} />
              <span>{closing.metaPath}</span>
            </span>
          </div>

          <h2 id="home-closing-heading" className={styles.heading}>
            {closing.heading}
          </h2>

          <p className={styles.statement}>
            {closing.statementPlaceholder}
          </p>

          <div className={styles.actionRow}>
            <Link href={closing.ctaHref} className={styles.primaryCta}>
              <span>{closing.ctaLabel}</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                ↗
              </span>
            </Link>

            <Link href="/projects" className={styles.secondaryCta}>
              <span>Browse All Projects</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
