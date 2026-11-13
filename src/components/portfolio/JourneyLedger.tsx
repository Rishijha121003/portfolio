import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { JOURNEY_ENTRIES, JOURNEY_PAGE_DATA } from '@/data/portfolio';
import styles from './JourneyLedger.module.css';

interface JourneyLedgerProps {
  embedded?: boolean;
}

/**
 * Shared chronological developer journey timeline rendered both on /journey and in RISHI OS.
 */
export function JourneyLedger({ embedded = false }: JourneyLedgerProps) {
  const { eyebrow, pathLabel, heading, subtitle } = JOURNEY_PAGE_DATA;
  const PageHeadingTag = embedded ? 'h2' : 'h1';
  const ItemHeadingTag = embedded ? 'h3' : 'h2';

  const headerContent = (
    <div className={styles.header}>
      <div>
        <div className={styles.eyebrowRow}>
          <span>{eyebrow}</span>
          <span className={styles.linuxDot} aria-hidden="true" />
          <span>{pathLabel}</span>
        </div>
        <PageHeadingTag
          id={embedded ? undefined : 'journey-page-heading'}
          className={styles.pageTitle}
        >
          {heading}
        </PageHeadingTag>
        <p className={styles.pageSubtitle}>{subtitle}</p>
      </div>
    </div>
  );

  const timelineBody = (
    <>
      <ol className={styles.trackList} aria-label="Chronological journey milestones">
        {JOURNEY_ENTRIES.map((entry) => (
          <li
            key={entry.index}
            className={
              entry.isFeatured
                ? `${styles.trackItem} ${styles.trackItemFeatured}`
                : styles.trackItem
            }
          >
            <div className={styles.itemIndexCol}>
              <span className={styles.indexBlock}>{entry.index}</span>
            </div>

            <div className={styles.itemMain}>
              <div className={styles.itemHeader}>
                <div className={styles.itemTitleGroup}>
                  <span className={styles.stageLabel}>{entry.stageLabel}</span>
                  <ItemHeadingTag className={styles.itemTitle}>
                    {entry.title}
                  </ItemHeadingTag>
                  <p className={styles.itemSubtitle}>{entry.subtitle}</p>
                </div>

                {entry.highlightBadge ? (
                  <span className={styles.highlightBadge}>{entry.highlightBadge}</span>
                ) : null}
              </div>

              <p className={styles.itemDetail}>{entry.detail}</p>

              {entry.highlightDetails && entry.highlightDetails.length > 0 ? (
                <dl
                  className={styles.highlightGrid}
                  aria-label="Cheque Mate competition details"
                >
                  {entry.highlightDetails.map((detail) => (
                    <div key={detail.label} className={styles.highlightCell}>
                      <dt className={styles.highlightDt}>{detail.label}</dt>
                      <dd className={styles.highlightDd}>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.footerActions}>
        <Link href="/about" className={styles.actionLink}>
          <span>About</span>
          <span aria-hidden="true">↗</span>
        </Link>
        <Link href="/skills" className={styles.actionLink}>
          <span>Skills</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div className={styles.embeddedWrap}>
        <header>{headerContent}</header>
        {timelineBody}
      </div>
    );
  }

  return (
    <>
      <section className={styles.pageHeader} aria-labelledby="journey-page-heading">
        <Container>{headerContent}</Container>
      </section>

      <section className={styles.pageMain} aria-label="Journey timeline entries">
        <Container>
          <div className={styles.pageMainStack}>{timelineBody}</div>
        </Container>
      </section>
    </>
  );
}
