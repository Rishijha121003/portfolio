import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { DORMIQ_CASE_STUDY, PROJECT_RECORDS } from '@/data/portfolio';
import styles from './DormiqCaseStudy.module.css';

interface DormiqCaseStudyProps {
  embedded?: boolean;
  onBackToProjects?: () => void;
}

/**
 * Shared DormiQ case study dossier rendered both on /projects/dormiq and inside the RISHI OS Projects window.
 */
export function DormiqCaseStudy({
  embedded = false,
  onBackToProjects,
}: DormiqCaseStudyProps) {
  const dormiq = PROJECT_RECORDS[0]!;
  const HeadingTag = embedded ? 'h2' : 'h1';
  const SectionHeadingTag = embedded ? 'h3' : 'h2';

  const content = (
    <>
      <div className={styles.topBar}>
        {onBackToProjects ? (
          <button
            type="button"
            className={styles.backLink}
            onClick={onBackToProjects}
          >
            <span aria-hidden="true">←</span>
            <span>Back to ~/projects</span>
          </button>
        ) : (
          <Link href="/projects" className={styles.backLink}>
            <span aria-hidden="true">←</span>
            <span>Back to ~/projects</span>
          </Link>
        )}

        <span className={styles.statusPill}>
          <span className={styles.linuxDot} aria-hidden="true" />
          <span>{dormiq.recognition ?? `CASE STUDY // [${DORMIQ_CASE_STUDY.index}]`}</span>
        </span>
      </div>

      <div className={styles.heroGrid}>
        <div>
          <div className={styles.eyebrowRow}>
            <span>{`${DORMIQ_CASE_STUDY.index} // ${dormiq.category.toUpperCase()}`}</span>
            <span>~/projects/dormiq</span>
          </div>
          <HeadingTag className={styles.title}>{DORMIQ_CASE_STUDY.title}</HeadingTag>
          <p className={styles.subtitle}>{DORMIQ_CASE_STUDY.subtitle}</p>
          <p className={styles.summary}>{dormiq.overview}</p>

          <ul className={styles.pillList} aria-label="DormiQ technology stack">
            {dormiq.technologies.map((tech) => (
              <li key={tech} className={styles.specPill}>
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.thumbWrap}>
          <Image
            src={DORMIQ_CASE_STUDY.coverImage.src}
            alt={DORMIQ_CASE_STUDY.coverImage.alt}
            width={DORMIQ_CASE_STUDY.coverImage.width}
            height={DORMIQ_CASE_STUDY.coverImage.height}
            sizes="(max-width: 780px) 240px, 260px"
            priority
            className={styles.thumbImage}
          />
        </div>
      </div>

      <div className={styles.sectionsGrid}>
        {DORMIQ_CASE_STUDY.sections.map((section) => (
          <article key={section.code} className={styles.sectionCard}>
            <span className={styles.sectionCode}>{section.code}</span>
            <SectionHeadingTag className={styles.sectionHeading}>
              {section.title}
            </SectionHeadingTag>
            <p className={styles.sectionBody}>{section.body}</p>
          </article>
        ))}
      </div>

      <article className={styles.sectionCard}>
        <span className={styles.sectionCode}>08 // VERIFIED FEATURE CHECKLIST</span>
        <SectionHeadingTag className={styles.sectionHeading}>
          {dormiq.featuresHeading}
        </SectionHeadingTag>
        <ul
          style={{
            marginTop: '6px',
            paddingLeft: '18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '6px 18px',
            fontSize: '0.875rem',
            lineHeight: 1.55,
            color: 'var(--text-secondary)',
          }}
        >
          {dormiq.features.map((feat) => (
            <li key={feat}>{feat}</li>
          ))}
        </ul>
      </article>
    </>
  );

  if (embedded) {
    return <div className={styles.embeddedWrap}>{content}</div>;
  }

  return (
    <div className={styles.page}>
      <section
        className={styles.pageHeader}
        aria-label="DormiQ Case Study Header"
      >
        <Container>
          <div className={styles.embeddedWrap} style={{ padding: 0 }}>
            {content}
          </div>
        </Container>
      </section>
    </div>
  );
}
