import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ABOUT_PAGE_DATA, SITE_IDENTITY } from '@/data/portfolio';
import styles from './AboutEditorial.module.css';

interface AboutEditorialProps {
  embedded?: boolean;
}

/**
  Modern Developer Editorial Profile — Rishi Jha // About
  Linear / Raycast / Apple Developer tier redesign featuring
  Bento grids, workspace HUD, progression milestones, and core philosophy.
 */
export function AboutEditorial({ embedded = false }: AboutEditorialProps = {}) {
  const {
    pathLabel,
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
    <div className={embedded ? styles.embeddedRoot : styles.pageWrapper}>
      {/* Header Section */}
      <section
        className={styles.headerSection}
        aria-labelledby="about-page-heading"
      >
        <Container>
          <div className={styles.headerStack}>
            <div className={styles.headerTopRow}>
              <span className={styles.eyebrowTag}>
                <span className={styles.eyebrowSparkle} aria-hidden="true">
                  ✨
                </span>
                <span>BIOGRAPHY &amp; PROFILE</span>
              </span>

              <span className={styles.pathMeta} aria-hidden="true">
                <span className={styles.linuxDot} />
                <span>{pathLabel}</span>
              </span>
            </div>

            <div className={styles.headerTitleRow}>
              <PageHeadingTag id="about-page-heading" className={styles.pageHeading}>
                ABOUT RISHI
              </PageHeadingTag>
              <div className={styles.identityBadge}>
                <span className={styles.identityInitials}>{SITE_IDENTITY.initials}</span>
                <span className={styles.identityRole}>Full Stack Developer</span>
              </div>
            </div>

            <p className={styles.subtitleCopy}>
              Computer Science student at <strong>Sandip University</strong> specializing in{' '}
              <strong>FastAPI</strong>, <strong>React 19</strong>, and <strong>PostgreSQL</strong>.
              Focused on clean systems architecture, high-throughput APIs, and practical software engineering.
            </p>

            {/* Quick Facts Strip */}
            <div className={styles.quickFactsBar} aria-label="Key Facts">
              <div className={styles.factItem}>
                <span className={styles.factIcon} aria-hidden="true">🎓</span>
                <div className={styles.factTexts}>
                  <span className={styles.factLabel}>EDUCATION</span>
                  <span className={styles.factVal}>B.Tech CSE (4th Year)</span>
                </div>
              </div>
              <div className={styles.factDivider} aria-hidden="true" />

              <div className={styles.factItem}>
                <span className={styles.factIcon} aria-hidden="true">🏛️</span>
                <div className={styles.factTexts}>
                  <span className={styles.factLabel}>INSTITUTION</span>
                  <span className={styles.factVal}>Sandip University</span>
                </div>
              </div>
              <div className={styles.factDivider} aria-hidden="true" />

              <div className={styles.factItem}>
                <span className={styles.factIcon} aria-hidden="true">📍</span>
                <div className={styles.factTexts}>
                  <span className={styles.factLabel}>HOMETOWN</span>
                  <span className={styles.factVal}>Darbhanga, Bihar</span>
                </div>
              </div>
              <div className={styles.factDivider} aria-hidden="true" />

              <div className={styles.factItem}>
                <span className={styles.factIcon} aria-hidden="true">⚡</span>
                <div className={styles.factTexts}>
                  <span className={styles.factLabel}>CORE STACK</span>
                  <span className={styles.factValHighlight}>FastAPI &amp; PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Sections */}
      <section className={styles.mainSection} aria-label="Personal story and timeline">
        <Container>
          <div className={styles.editorialFlow}>
            {/* 1. Person Behind the Code + Workspace Split */}
            <div className={styles.splitGrid}>
              {/* Left Column: Narrative Card */}
              <article
                className={styles.bentoCard}
                aria-labelledby={personBehindCode.id}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.sectionTagRow}>
                    <span className={styles.sectionIndex}>{personBehindCode.index}</span>
                    <span className={styles.sectionCategory}>ORIGIN &amp; MOTIVATION</span>
                  </div>
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

                <div className={styles.pullQuoteBlock}>
                  <div className={styles.pullQuoteGlow} aria-hidden="true" />
                  <p className={styles.pullQuoteText}>
                    &ldquo;My interest started from wondering how things work behind the screen — today that curiosity drives how I architect APIs and data models.&rdquo;
                  </p>
                </div>

                <div className={styles.pillBadgesRow}>
                  <span className={styles.pillBadge}>Sandip University</span>
                  <span className={styles.pillBadge}>B.Tech CSE</span>
                  <span className={styles.pillBadge}>Darbhanga, Bihar</span>
                  <span className={styles.pillBadge}>Backend &amp; Systems</span>
                </div>
              </article>

              {/* Right Column: Workspace Visual Card */}
              <article className={`${styles.bentoCard} ${styles.workspaceCard}`}>
                <div className={styles.workspaceTerminalBar}>
                  <div className={styles.browserDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <span className={styles.terminalPath}>rishi@workstation: ~/dev</span>
                  <span className={styles.terminalStatus}>ONLINE</span>
                </div>

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
                  <div className={styles.imageOverlayScrim} aria-hidden="true" />

                  <div className={styles.floatingHudBadge}>
                    <div className={styles.hudHeader}>
                      <span className={styles.hudDot} />
                      <span className={styles.hudLabel}>DEVELOPMENT WORKSPACE</span>
                    </div>
                    <p className={styles.hudDescription}>{workspaceCaption}</p>
                  </div>
                </div>

                <div className={styles.workspaceSpecs}>
                  <div className={styles.specMini}>
                    <span className={styles.specMiniLabel}>OS</span>
                    <span className={styles.specMiniVal}>Linux / Fedora</span>
                  </div>
                  <div className={styles.specMini}>
                    <span className={styles.specMiniLabel}>EDITOR</span>
                    <span className={styles.specMiniVal}>VS Code / Neovim</span>
                  </div>
                  <div className={styles.specMini}>
                    <span className={styles.specMiniLabel}>STACK</span>
                    <span className={styles.specMiniVal}>Python · TS · SQL</span>
                  </div>
                </div>
              </article>
            </div>

            {/* 2. Academic & Hands-On Turning Point (Timeline Grid) */}
            <article
              className={`${styles.bentoCard} ${styles.fullWidthCard}`}
              aria-labelledby={howItStarted.id}
            >
              <div className={styles.cardHeader}>
                <div className={styles.sectionTagRow}>
                  <span className={styles.sectionIndex}>{howItStarted.index}</span>
                  <span className={styles.sectionCategory}>GROWTH &amp; HARDWARE MILESTONE</span>
                </div>
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

              {/* Modern Milestone Progression Grid */}
              <div className={styles.progressionGrid} aria-label="Academic &amp; Coding Path">
                {howItStarted.timeline.map((item) => (
                  <div key={item.step} className={styles.progressionStepCard}>
                    <div className={styles.stepTopRow}>
                      <span className={styles.stepNumberBadge}>{item.step}</span>
                      <span className={styles.stepStageLabel}>{item.stage}</span>
                    </div>
                    <p className={styles.stepSummary}>{item.summary}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* 3. Core Philosophy & Belief */}
            <article
              className={`${styles.bentoCard} ${styles.beliefCard}`}
              aria-labelledby={beliefSection.id}
            >
              <div className={styles.beliefGlowEffect} aria-hidden="true" />

              <div className={styles.cardHeader}>
                <div className={styles.sectionTagRow}>
                  <span className={styles.sectionIndex}>{beliefSection.index}</span>
                  <span className={styles.sectionCategory}>CORE PRINCIPLE</span>
                </div>
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

              <div className={styles.quoteCalloutBox}>
                <div className={styles.quoteIconBadge} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className={styles.quoteText}>
                  &ldquo;{beliefSection.quote}&rdquo;
                </blockquote>
                <p className={styles.quoteSupportText}>
                  {beliefSection.supportingText}
                </p>
              </div>
            </article>

            {/* 4. Beyond Technology (Hobbies) & 5. Where I'm Heading (2-Column Grid) */}
            <div className={styles.twoColumnGrid}>
              {/* Beyond Technology */}
              <article
                className={styles.bentoCard}
                aria-labelledby={beyondTechnology.id}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.sectionTagRow}>
                    <span className={styles.sectionIndex}>{beyondTechnology.index}</span>
                    <span className={styles.sectionCategory}>LIFE OFF THE SCREEN</span>
                  </div>
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

                <div className={styles.hobbiesGrid} aria-label="Personal interests">
                  {beyondTechnology.hobbies.map((hobby) => {
                    let icon = '🎯';
                    let desc = 'Focus & discipline';
                    if (hobby === 'Badminton') {
                      icon = '🏸';
                      desc = 'Agility & high energy';
                    } else if (hobby === 'Chess') {
                      icon = '♟️';
                      desc = 'Strategy & foresight';
                    } else if (hobby === 'Travelling') {
                      icon = '✈️';
                      desc = 'Exploration & perspective';
                    } else if (hobby === 'Reading') {
                      icon = '📚';
                      desc = 'Ideas & continuous growth';
                    }
                    return (
                      <div key={hobby} className={styles.hobbyBentoCard}>
                        <span className={styles.hobbyIcon} aria-hidden="true">{icon}</span>
                        <div className={styles.hobbyMeta}>
                          <span className={styles.hobbyName}>{hobby}</span>
                          <span className={styles.hobbyDesc}>{desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>

              {/* Where I'm Heading */}
              <article
                className={styles.bentoCard}
                aria-labelledby={whereHeading.id}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.sectionTagRow}>
                    <span className={styles.sectionIndex}>{whereHeading.index}</span>
                    <span className={styles.sectionCategory}>FUTURE HORIZON</span>
                  </div>
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

                <div className={styles.targetStackBox}>
                  <span className={styles.targetStackHeading}>ENGINEERING GOALS</span>
                  <div className={styles.targetStackList}>
                    <div className={styles.targetStackItem}>
                      <span className={styles.targetDot} aria-hidden="true" />
                      <span>Deep mastery of FastAPI, ASGI, and high-throughput REST APIs</span>
                    </div>
                    <div className={styles.targetStackItem}>
                      <span className={styles.targetDot} aria-hidden="true" />
                      <span>Relational modeling with PostgreSQL &amp; SQLAlchemy 2.0</span>
                    </div>
                    <div className={styles.targetStackItem}>
                      <span className={styles.targetDot} aria-hidden="true" />
                      <span>Modern frontend architecture with React 19 &amp; Next.js</span>
                    </div>
                    <div className={styles.targetStackItem}>
                      <span className={styles.targetDot} aria-hidden="true" />
                      <span>End-to-end independence in designing, building, and deploying software</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Bottom Navigation CTA Card */}
            <div className={styles.ctaNavCard}>
              <div className={styles.ctaNavText}>
                <h3 className={styles.ctaNavTitle}>Explore More of My Work</h3>
                <p className={styles.ctaNavSubtitle}>
                  Check out the production software I&apos;ve built, the journey timeline, or get in touch.
                </p>
              </div>

              <div className={styles.ctaNavButtons}>
                <Link href="/projects" className={styles.primaryNavBtn}>
                  <span>Explore Projects</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href="/journey" className={styles.secondaryNavBtn}>
                  <span>View Journey</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href="/contact" className={styles.secondaryNavBtn}>
                  <span>Contact Me</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
