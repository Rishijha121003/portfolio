import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { HOME_STRUCTURAL_DATA } from '@/data/portfolio';
import styles from './HomeClosing.module.css';

/**
 * Editorial closing section linking directly to the Contact page.
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
        <div className={styles.wrapper}>
          <div className={styles.topMeta}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              <span>{closing.eyebrow}</span>
            </span>

            <span className={styles.metaPath} aria-hidden="true">
              <span className={styles.linuxDot} />
              <span>{closing.metaPath}</span>
            </span>
          </div>

          <h2 id="home-closing-heading" className={styles.heading}>
            {closing.heading}
          </h2>

          <div className={styles.bottomBar}>
            <p className={styles.statement}>{closing.statementPlaceholder}</p>

            <Link href={closing.ctaHref} className={styles.ctaLink}>
              <span className={styles.ctaDot} aria-hidden="true" />
              <span>{closing.ctaLabel}</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
