import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { HOME_STRUCTURAL_DATA } from '@/data/portfolio';
import styles from './HomeExplore.module.css';

/**
 * Editorial directory section linking to the five independent portfolio routes.
 */
export function HomeExplore() {
  const { explore } = HOME_STRUCTURAL_DATA;

  return (
    <section
      id="home-explore"
      className={styles.section}
      aria-labelledby="home-explore-heading"
    >
      <Container>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              <span>{explore.eyebrow}</span>
            </span>
            <h2 id="home-explore-heading" className={styles.heading}>
              {explore.heading}
            </h2>
          </div>

          <span className={styles.dirHint} aria-hidden="true">
            <span className={styles.linuxDot} />
            <span>{explore.directoryHint}</span>
          </span>
        </div>

        <nav aria-label="Explore portfolio pages">
          <ul className={styles.list}>
            {explore.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.rowLink}>
                  <span className={styles.index}>{item.index}</span>
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.description}>{item.description}</span>
                  <span className={styles.pathLabel}>{item.pathLabel}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
