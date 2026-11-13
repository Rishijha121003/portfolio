import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getProjectBySlug } from '@/data/portfolio';
import type { ProjectSlug } from '@/types/portfolio';
import caseStyles from '@/components/portfolio/DormiqCaseStudy.module.css';
import detailStyles from './ProjectDetailView.module.css';

interface ProjectDetailViewProps {
  slug: ProjectSlug;
  embedded?: boolean;
  onBackToProjects?: () => void;
}

/**
 * Shared data-driven project detail view for AssignFlow, LifeOS, Finora, Complaint Management System, and Blog Project.
 */
export function ProjectDetailView({
  slug,
  embedded = false,
  onBackToProjects,
}: ProjectDetailViewProps) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  const HeadingTag = embedded ? 'h2' : 'h1';
  const SectionHeadingTag = embedded ? 'h3' : 'h2';

  const content = (
    <>
      <div className={caseStyles.topBar}>
        {onBackToProjects ? (
          <button
            type="button"
            className={caseStyles.backLink}
            onClick={onBackToProjects}
          >
            <span aria-hidden="true">←</span>
            <span>Back to ~/projects</span>
          </button>
        ) : (
          <Link href="/projects" className={caseStyles.backLink}>
            <span aria-hidden="true">←</span>
            <span>Back to ~/projects</span>
          </Link>
        )}

        <span className={caseStyles.statusPill}>
          <span className={caseStyles.linuxDot} aria-hidden="true" />
          <span>{project.statusTag}</span>
        </span>
      </div>

      <div className={detailStyles.headerArea}>
        <div className={caseStyles.eyebrowRow}>
          <span>{`${project.index} // ${project.category.toUpperCase()}`}</span>
          <span>{`~/projects/${project.slug}`}</span>
        </div>

        <HeadingTag className={caseStyles.title}>{project.title}</HeadingTag>

        <p className={caseStyles.subtitle}>
          {[project.projectType, project.origin].filter(Boolean).join(' · ')}
        </p>

        <p className={caseStyles.summary}>{project.overview}</p>

        {project.technologies.length > 0 ? (
          <ul className={caseStyles.pillList} aria-label={`${project.title} technologies`}>
            {project.technologies.map((tech) => (
              <li key={tech} className={caseStyles.specPill}>
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        {project.technologiesNote ? (
          <p className={detailStyles.techNote}>{project.technologiesNote}</p>
        ) : null}
      </div>

      <div className={caseStyles.sectionsGrid}>
        <article className={caseStyles.sectionCard}>
          <span className={caseStyles.sectionCode}>01 // PURPOSE</span>
          <SectionHeadingTag className={caseStyles.sectionHeading}>
            Problem &amp; Purpose
          </SectionHeadingTag>
          <p className={caseStyles.sectionBody}>{project.problemOrPurpose}</p>
        </article>

        <article className={caseStyles.sectionCard}>
          <span className={caseStyles.sectionCode}>02 // MY ROLE &amp; DEVELOPMENT</span>
          <SectionHeadingTag className={caseStyles.sectionHeading}>
            My Role &amp; Development
          </SectionHeadingTag>
          <p className={caseStyles.sectionBody}>{project.contribution}</p>
          <ul className={detailStyles.bulletList}>
            {project.contributionBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <article className={caseStyles.sectionCard}>
        <span className={caseStyles.sectionCode}>03 // CAPABILITIES</span>
        <SectionHeadingTag className={caseStyles.sectionHeading}>
          {project.featuresHeading}
        </SectionHeadingTag>
        <ul className={detailStyles.twoColList}>
          {project.features.map((feat) => (
            <li key={feat}>{feat}</li>
          ))}
        </ul>
      </article>

      {project.plannedVersions && project.plannedVersions.length > 0 ? (
        <article className={caseStyles.sectionCard}>
          <span className={caseStyles.sectionCode}>04 // VERSION ROADMAP</span>
          <SectionHeadingTag className={caseStyles.sectionHeading}>
            Completed vs. Planned Versions
          </SectionHeadingTag>
          <div className={detailStyles.roadmapGrid}>
            {project.plannedVersions.map((track) => (
              <div key={track.version} className={detailStyles.roadmapCard}>
                <div className={detailStyles.roadmapTop}>
                  <span className={detailStyles.roadmapTitle}>{track.version}</span>
                  <span
                    className={
                      track.stage === 'Completed'
                        ? `${detailStyles.stageBadge} ${detailStyles.stageCompleted}`
                        : detailStyles.stageBadge
                    }
                  >
                    {track.stage}
                  </span>
                </div>
                <ul className={detailStyles.bulletList}>
                  {track.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      ) : null}

      {project.technicalHighlights && project.technicalHighlights.length > 0 ? (
        <article className={caseStyles.sectionCard}>
          <span className={caseStyles.sectionCode}>04 // TECHNICAL HIGHLIGHTS</span>
          <SectionHeadingTag className={caseStyles.sectionHeading}>
            Implementation &amp; Engineering Notes
          </SectionHeadingTag>
          <ul className={detailStyles.bulletList}>
            {project.technicalHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      ) : null}

      {project.architectureNotes && project.architectureNotes.length > 0 ? (
        <article className={caseStyles.sectionCard}>
          <span className={caseStyles.sectionCode}>04 // ARCHITECTURE</span>
          <SectionHeadingTag className={caseStyles.sectionHeading}>
            Repository &amp; System Structure
          </SectionHeadingTag>
          <ul className={detailStyles.bulletList}>
            {project.architectureNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
      ) : null}

      {project.githubUrl || project.liveUrl ? (
        <div className={detailStyles.linksBar}>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={caseStyles.backLink}
            >
              <span>GitHub Repository ↗</span>
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={caseStyles.backLink}
            >
              <span>Live Demo ↗</span>
            </a>
          ) : null}
        </div>
      ) : (
        <p className={detailStyles.linksEmptyNote}>
          {`Links: Public repository and live deployment URLs for ${project.title} are not published in this build.`}
        </p>
      )}
    </>
  );

  if (embedded) {
    return <div className={caseStyles.embeddedWrap}>{content}</div>;
  }

  return (
    <div className={caseStyles.page}>
      <section className={caseStyles.pageHeader} aria-label={`${project.title} Details`}>
        <Container>
          <div className={caseStyles.embeddedWrap} style={{ padding: 0 }}>
            {content}
          </div>
        </Container>
      </section>
    </div>
  );
}

