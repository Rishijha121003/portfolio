import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { HOME_STRUCTURAL_DATA } from '@/data/portfolio';
import styles from './HomeExplore.module.css';

/**
 * Editorial Bento Grid Showcase section linking directly to the five primary portfolio routes:
 * Projects, About, Journey, Skills, and Contact.
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
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>{explore.eyebrow}</span>
            </span>
            <h2 id="home-explore-heading" className={styles.heading}>
              Portfolio Directory
            </h2>
          </div>

          <span className={styles.dirHint} aria-hidden="true">
            <span className={styles.dirDot} />
            <span className={styles.dirText}>{explore.directoryHint}</span>
          </span>
        </div>

        {/* Bento Grid Layout */}
        <div className={styles.bentoGrid} role="navigation" aria-label="Explore portfolio pages">
          {explore.items.map((item, index) => {
            const isFeatured = index === 0; // Projects is featured wide card
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.bentoCard} ${
                  isFeatured ? styles.bentoFeatured : ''
                }`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.indexBadge}>{item.index}</div>
                  <div className={styles.pathLabel}>{item.pathLabel}</div>
                </div>

                <div className={styles.cardCenter}>
                  <h3 className={styles.cardTitle}>{item.label}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>

                <div className={styles.cardBottom}>
                  <span className={styles.exploreAction}>
                    Explore Section
                  </span>
                  <span className={styles.cardArrow} aria-hidden="true">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
