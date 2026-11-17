import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { JOURNEY_ENTRIES, JOURNEY_PAGE_DATA } from '@/data/portfolio';
import styles from './JourneyLedger.module.css';

interface JourneyLedgerProps {
  embedded?: boolean;
}

function MilestoneIcon({ type }: { type?: string }) {
  switch (type) {
    case 'spark':
      return (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case 'polytechnic':
      return (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 21h18M4 18h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2 3 7h18l-9-5Z" />
        </svg>
      );
    case 'btech':
      return (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'trophy':
      return (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      );
    case 'tech':
      return (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
          <line x1="6" x2="6.01" y1="6" y2="6" />
          <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
      );
    case 'rocket':
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
  }
}

/**
 * Modern Developer Journey Timeline
 * Featuring illuminated timeline spine, rich milestone metadata cards,
 * Cheque Mate Hackathon Top 3 feature spotlight, and category tags.
 */
export function JourneyLedger({ embedded = false }: JourneyLedgerProps) {
  const { eyebrow, pathLabel, heading, subtitle } = JOURNEY_PAGE_DATA;
  const PageHeadingTag = embedded ? 'h2' : 'h1';
  const ItemHeadingTag = embedded ? 'h3' : 'h2';

  const headerContent = (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrowTag}>
            <span className={styles.eyebrowSparkle} aria-hidden="true">
              ✨
            </span>
            <span>{eyebrow}</span>
          </span>
          <span className={styles.pathMeta} aria-hidden="true">
            <span className={styles.linuxDot} />
            <span>{pathLabel}</span>
          </span>
        </div>

        <PageHeadingTag
          id={embedded ? undefined : 'journey-page-heading'}
          className={styles.pageTitle}
        >
          {heading}
        </PageHeadingTag>
        <p className={styles.pageSubtitle}>{subtitle}</p>

        {/* Quick Highlights Summary Pill Bar */}
        {!embedded ? (
          <div className={styles.highlightsBar} aria-label="Key highlights">
            <span className={styles.highlightPill}>
              <span className={styles.pillDotGreen} aria-hidden="true" />
              <span>B.Tech CSE @ Sandip University</span>
            </span>
            <span className={styles.highlightPill}>
              <span className={styles.pillTrophy} aria-hidden="true">
                🏆
              </span>
              <span>Cheque Mate Hackathon Top 3</span>
            </span>
            <span className={styles.highlightPill}>
              <span className={styles.pillDotCyan} aria-hidden="true" />
              <span>FastAPI &amp; Backend Systems</span>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );

  const timelineBody = (
    <div className={styles.timelineWrapper}>
      <ol className={styles.timelineList} aria-label="Chronological journey milestones">
        {JOURNEY_ENTRIES.map((entry) => {
          const isTrophy = entry.isFeatured;
          return (
            <li
              key={entry.index}
              className={
                isTrophy
                  ? `${styles.timelineItem} ${styles.timelineItemFeatured}`
                  : styles.timelineItem
              }
            >
              {/* Timeline Spine Node with Icon & Number */}
              <div className={styles.nodeColumn}>
                <div
                  className={
                    isTrophy
                      ? `${styles.nodeBadge} ${styles.nodeBadgeFeatured}`
                      : styles.nodeBadge
                  }
                  title={`Milestone ${entry.index}`}
                >
                  <span className={styles.nodeIcon}>
                    <MilestoneIcon type={entry.iconType} />
                  </span>
                  <span className={styles.nodeIndexNumber}>{entry.index}</span>
                </div>
              </div>

              {/* Milestone Content Card */}
              <article className={styles.milestoneCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardMetaLeft}>
                    <span
                      className={
                        isTrophy
                          ? `${styles.stageChip} ${styles.stageChipGold}`
                          : styles.stageChip
                      }
                    >
                      {entry.stageLabel}
                    </span>
                    {entry.period ? (
                      <span className={styles.periodBadge}>{entry.period}</span>
                    ) : null}
                  </div>

                  {entry.status ? (
                    <span
                      className={
                        isTrophy
                          ? `${styles.statusChip} ${styles.statusChipWinner}`
                          : styles.statusChip
                      }
                    >
                      {entry.status}
                    </span>
                  ) : null}
                </div>

                <div className={styles.cardTitleBlock}>
                  <ItemHeadingTag className={styles.cardTitle}>
                    {entry.title}
                  </ItemHeadingTag>
                  <p className={styles.cardSubtitle}>{entry.subtitle}</p>
                </div>

                <p className={styles.cardDetail}>{entry.detail}</p>

                {/* Competition Details Grid for Cheque Mate */}
                {entry.highlightDetails && entry.highlightDetails.length > 0 ? (
                  <div className={styles.highlightGridBox}>
                    <dl
                      className={styles.highlightGrid}
                      aria-label="Cheque Mate competition results"
                    >
                      {entry.highlightDetails.map((detail) => (
                        <div key={detail.label} className={styles.highlightCell}>
                          <dt className={styles.highlightDt}>{detail.label}</dt>
                          <dd className={styles.highlightDd}>{detail.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className={styles.featuredActionRow}>
                      <Link
                        href="/projects/dormiq"
                        className={styles.featuredCaseStudyBtn}
                      >
                        <span>Explore DormiQ Case Study</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                ) : null}

                {/* Tags Row */}
                {entry.tags && entry.tags.length > 0 ? (
                  <div className={styles.tagsRow} aria-label="Milestone key learnings">
                    {entry.tags.map((tag) => (
                      <span key={tag} className={styles.tagChip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>

      <div className={styles.footerActions}>
        <Link href="/projects" className={styles.actionLinkPrimary}>
          <span>View Featured Projects</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link href="/about" className={styles.actionLinkSecondary}>
          <span>Read Full Background</span>
          <span aria-hidden="true">↗</span>
        </Link>
        <Link href="/skills" className={styles.actionLinkSecondary}>
          <span>Technical Skills</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
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
