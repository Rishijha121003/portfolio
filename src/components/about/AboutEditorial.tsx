import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ABOUT_PAGE_DATA, SITE_IDENTITY } from '@/data/portfolio';
import styles from './AboutEditorial.module.css';

interface AboutEditorialProps {
  embedded?: boolean;
}

/**
 * Editorial personal profile rendered both on /about and inside the RISHI OS About application.
 */
export function AboutEditorial({ embedded = false }: AboutEditorialProps = {}) {
  const {
    eyebrow,
    pathLabel,
    heading,
    subtitleTag,
    workspaceImage,
    workspaceCaption,
    personBehindCode,
    howItStarted,
    beyondTechnology,
    whereHeading,
    beliefSection,
  } = ABOUT_PAGE_DATA;

  const PageHeadingTag = embedded ? 'h2' : 'h1';
  const SectionHeadingTag = embedded ? 'h3' : 'h2';

  return (
    <div className={embedded ? styles.embeddedRoot : undefined}>
      <section
        className={styles.headerSection}
        aria-labelledby="about-page-heading"
      >
        <Container>
          <div className={styles.headerRow}>
            <div>
              <div className={styles.eyebrowRow}>
                <span className={styles.eyebrow}>
                  <span className={styles.eyebrowRule} aria-hidden="true" />
                  <span>{eyebrow}</span>
                </span>

                <span className={styles.pathMeta} aria-hidden="true">
                  <span className={styles.linuxDot} />
                  <span>{pathLabel}</span>
                </span>
              </div>

              <p className={styles.identityTag}>
                {`${SITE_IDENTITY.initials} // ${SITE_IDENTITY.fullName} · ${subtitleTag}`}
              </p>
            </div>

            <PageHeadingTag id="about-page-heading" className={styles.pageHeading}>
              {heading}
            </PageHeadingTag>
          </div>
        </Container>
      </section>

      <section
        className={styles.mainSection}
        aria-label="Personal story and timeline"
      >
        <Container>
          <div className={styles.editorialFlow}>
            {/* Section 1 — The Person Behind the Code + Curated Workspace Visual */}
            <div className={styles.splitGrid}>
              <article
                className={styles.editorialBlock}
                aria-labelledby={personBehindCode.id}
              >
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIndex}>{personBehindCode.index}</span>
                  <SectionHeadingTag
                    id={personBehindCode.id}
                    className={styles.sectionHeading}
                  >
                    {personBehindCode.heading}
                  </SectionHeadingTag>
                </div>

                <div className={styles.proseGroup}>
                  {personBehindCode.paragraphs.map((text) => (
                    <p key={text} className={styles.proseParagraph}>
                      {text}
                    </p>
                  ))}
                </div>
              </article>

              <figure className={styles.mediaColumn}>
                <div className={styles.imageFrame}>
                  <Image
                    src={workspaceImage.src}
                    alt={workspaceImage.alt}
                    width={workspaceImage.width}
                    height={workspaceImage.height}
                    sizes="(max-width: 960px) 100vw, 42vw"
                    priority
                    className={styles.workspaceImage}
                  />
                  <div className={styles.imageVignette} aria-hidden="true" />
                </div>

                <figcaption className={styles.captionRow}>
                  <span className={styles.linuxDot} aria-hidden="true" />
                  <span>{workspaceCaption}</span>
                </figcaption>
              </figure>
            </div>

            {/* Section 2 — How It Started + Verified Timeline */}
            <article
              className={`${styles.editorialSection} ${styles.howStartedGrid}`}
              aria-labelledby={howItStarted.id}
            >
              <div className={styles.editorialBlock}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIndex}>{howItStarted.index}</span>
                  <SectionHeadingTag
                    id={howItStarted.id}
                    className={styles.sectionHeading}
                  >
                    {howItStarted.heading}
                  </SectionHeadingTag>
                </div>

                <div className={styles.proseGroup}>
                  {howItStarted.paragraphs.map((text) => (
                    <p key={text} className={styles.proseParagraph}>
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.timelinePanel} aria-label="Learning timeline">
                <div className={styles.timelineHeader}>
                  <span className={styles.timelineLabel}>Academic &amp; Coding Path</span>
                </div>

                <ol className={styles.timelineList}>
                  {howItStarted.timeline.map((item) => (
                    <li key={item.step} className={styles.timelineItem}>
                      <span className={styles.timelineNode} aria-hidden="true">
                        {item.step}
                      </span>
                      <div className={styles.timelineContent}>
                        <span className={styles.timelineStage}>{item.stage}</span>
                        <p className={styles.timelineSummary}>{item.summary}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </article>

            {/* Section 3 — Beyond Technology + Subtle Hobbies */}
            <article
              className={styles.editorialSection}
              aria-labelledby={beyondTechnology.id}
            >
              <div className={styles.editorialBlock}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIndex}>{beyondTechnology.index}</span>
                  <SectionHeadingTag
                    id={beyondTechnology.id}
                    className={styles.sectionHeading}
                  >
                    {beyondTechnology.heading}
                  </SectionHeadingTag>
                </div>

                <div className={styles.proseGroup}>
                  {beyondTechnology.paragraphs.map((text) => (
                    <p key={text} className={styles.proseParagraph}>
                      {text}
                    </p>
                  ))}
                </div>

                <div className={styles.hobbiesWrap}>
                  <span className={styles.hobbiesCaption}>Off the screen</span>
                  <ul className={styles.hobbiesList} aria-label="Personal interests">
                    {beyondTechnology.hobbies.map((hobby) => (
                      <li key={hobby} className={styles.hobbyItem}>
                        <span className={styles.hobbyDot} aria-hidden="true" />
                        <span>{hobby}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            {/* Section 4 — Where I'm Heading */}
            <article
              className={styles.editorialSection}
              aria-labelledby={whereHeading.id}
            >
              <div className={styles.editorialBlock}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIndex}>{whereHeading.index}</span>
                  <SectionHeadingTag
                    id={whereHeading.id}
                    className={styles.sectionHeading}
                  >
                    {whereHeading.heading}
                  </SectionHeadingTag>
                </div>

                <div className={styles.proseGroup}>
                  {whereHeading.paragraphs.map((text) => (
                    <p key={text} className={styles.proseParagraph}>
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </article>

            {/* Section 5 — A Thought I Believe In */}
            <article
              className={styles.editorialSection}
              aria-labelledby={beliefSection.id}
            >
              <div className={styles.editorialBlock}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIndex}>{beliefSection.index}</span>
                  <SectionHeadingTag
                    id={beliefSection.id}
                    className={styles.sectionHeading}
                  >
                    {beliefSection.heading}
                  </SectionHeadingTag>
                </div>

                <div className={styles.proseGroup}>
                  {beliefSection.leadParagraphs.map((text) => (
                    <p key={text} className={styles.proseParagraph}>
                      {text}
                    </p>
                  ))}
                </div>

                <figure className={styles.quoteCallout}>
                  <blockquote className={styles.quoteText}>
                    {`“${beliefSection.quote}”`}
                  </blockquote>
                  <figcaption className={styles.quoteSupport}>
                    {beliefSection.supportingText}
                  </figcaption>
                </figure>
              </div>
            </article>

            <div className={styles.routeLinks}>
              <Link href="/projects" className={styles.routeLink}>
                <span>Projects</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
              <Link href="/journey" className={styles.routeLink}>
                <span>Journey</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
