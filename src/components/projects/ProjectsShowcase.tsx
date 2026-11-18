'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import {
  PROJECT_FILTER_CATEGORIES,
  PROJECT_RECORDS,
  PROJECTS_PAGE_DATA,
} from '@/data/portfolio';
import type {
  ProjectFilterCategory,
  ProjectRecord,
  ProjectSlug,
} from '@/types/portfolio';
import styles from './ProjectsShowcase.module.css';

interface ProjectsShowcaseProps {
  embedded?: boolean;
  onOpenProject?: (slug: ProjectSlug) => void;
}

const CATEGORY_SHORT_LABELS: Record<ProjectFilterCategory, string> = {
  All: 'All',
  'Full Stack': 'Full Stack',
  Backend: 'Backend',
  'Personal Projects': 'Personal',
  'Learning / Training': 'Learning',
};

function ProjectVisualMockup({ project }: { project: ProjectRecord }) {
  switch (project.id) {
    case 'dormiq':
      return (
        <div className={styles.mockupContainer}>
          <div className={styles.mockupBrowserBar}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.browserUrl}>dormiq · hostel / allotment</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.pipelineRow}>
              <span className={styles.pipelineStepActive}>Student Portal</span>
              <span className={styles.pipelineArrow}>→</span>
              <span className={styles.pipelineStep}>Bed Allocation</span>
              <span className={styles.pipelineArrow}>→</span>
              <span className={styles.pipelineStep}>Warden Queue</span>
            </div>
            <div className={styles.mockupMetaRow}>
              <span className={styles.mockupTag}>Python Flask</span>
              <span className={styles.mockupTag}>Team Impact Crew (5)</span>
              <span className={styles.mockupTag}>Cheque Mate 3rd</span>
            </div>
          </div>
        </div>
      );
    case 'assignflow':
      return (
        <div className={styles.mockupContainer}>
          <div className={styles.mockupBrowserBar}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.browserUrl}>assignflow · speedgrader</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.pipelineRow}>
              <span className={styles.pipelineStepActive}>Submission PDF</span>
              <span className={styles.pipelineArrow}>→</span>
              <span className={styles.pipelineStep}>SpeedGrader</span>
              <span className={styles.pipelineArrow}>→</span>
              <span className={styles.pipelineStep}>Grade Release</span>
            </div>
            <div className={styles.mockupMetaRow}>
              <span className={styles.mockupTag}>FastAPI 0.110</span>
              <span className={styles.mockupTag}>JWT Auth</span>
              <span className={styles.mockupTag}>Pytest Suite</span>
            </div>
          </div>
        </div>
      );
    case 'lifeos':
      return (
        <div className={styles.mockupContainer}>
          <div className={styles.mockupBrowserBar}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.browserUrl}>lifeos · plan / today</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.statMiniGrid}>
              <div className={styles.miniStat}>
                <span className={styles.miniLabel}>TASK VIEWS</span>
                <span className={styles.miniValue}>Today · Upcoming</span>
              </div>
              <div className={styles.miniStat}>
                <span className={styles.miniLabel}>PLANNING ENGINE</span>
                <span className={styles.miniValue}>Deterministic V2</span>
              </div>
              <div className={styles.miniStat}>
                <span className={styles.miniLabel}>BACKEND</span>
                <span className={styles.miniValueSuccess}>FastAPI · SQLAlchemy 2</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 'finora':
      return (
        <div className={styles.mockupContainer}>
          <div className={styles.mockupBrowserBar}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.browserUrl}>finora · cashflow</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.finBarChart}>
              <div className={styles.barCol} style={{ height: '45%' }} />
              <div className={styles.barCol} style={{ height: '70%' }} />
              <div className={styles.barCol} style={{ height: '55%' }} />
              <div className={styles.barColActive} style={{ height: '90%' }} />
              <div className={styles.barCol} style={{ height: '65%' }} />
              <div className={styles.barCol} style={{ height: '80%' }} />
            </div>
            <span className={styles.finLabel}>Monthly Cashflow &amp; Budget Analytics</span>
          </div>
        </div>
      );
    case 'complaint-management-system':
      return (
        <div className={styles.mockupContainer}>
          <div className={styles.mockupBrowserBar}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.browserUrl}>campus · complaints</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.ticketPillRow}>
              <span className={styles.ticketBadgeNew}>Ticket queue</span>
              <span className={styles.ticketRole}>Student</span>
              <span className={styles.ticketStatusResolved}>Status tracking</span>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className={styles.mockupContainer}>
          <div className={styles.mockupBrowserBar}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.browserUrl}>django · posts</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.codeSnippetRow}>
              <code>urls.py — structured URL routing</code>
            </div>
          </div>
        </div>
      );
  }
}

function ProjectActionButton({
  project,
  label,
  onOpenProject,
  className,
}: {
  project: ProjectRecord;
  label: string;
  onOpenProject?: (slug: ProjectSlug) => void;
  className?: string;
}) {
  if (onOpenProject) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => onOpenProject(project.slug)}
      >
        <span>{label}</span>
        <span className={styles.linkArrow} aria-hidden="true">
          →
        </span>
      </button>
    );
  }

  return (
    <Link href={project.detailRoute} className={className}>
      <span>{label}</span>
      <span className={styles.linkArrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}

/**
 * Modern Featured Projects Showcase & Architecture Gallery
 */
export function ProjectsShowcase({
  embedded = false,
  onOpenProject,
}: ProjectsShowcaseProps = {}) {
  const { intro, developmentNote } = PROJECTS_PAGE_DATA;
  const HeadingTag = embedded ? 'h2' : 'h1';
  const CardHeadingTag = embedded ? 'h3' : 'h2';

  const [activeCategory, setActiveCategory] =
    useState<ProjectFilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    return PROJECT_RECORDS.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' ||
        project.filterCategories.includes(activeCategory);
      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;

      const haystack = [
        project.title,
        project.previousName ?? '',
        project.category,
        project.shortDescription,
        project.origin ?? '',
        project.recognition ?? '',
        ...project.technologies,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [activeCategory, normalizedQuery]);

  const countForCategory = (cat: ProjectFilterCategory): number => {
    if (cat === 'All') return PROJECT_RECORDS.length;
    return PROJECT_RECORDS.filter((p) => p.filterCategories.includes(cat)).length;
  };

  const searchBar = (
    <div className={styles.searchPill}>
      <svg
        className={styles.searchIcon}
        viewBox="0 0 16 16"
        width="14"
        height="14"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="4.8" stroke="currentColor" strokeWidth="1.4" />
        <path d="m10.7 10.7 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={searchQuery}
        aria-label="Search projects"
        placeholder="Search by title or tech..."
        className={styles.searchInput}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery ? (
        <button
          type="button"
          className={styles.searchClearBtn}
          onClick={() => setSearchQuery('')}
          aria-label="Clear search query"
        >
          ✕
        </button>
      ) : null}
    </div>
  );

  const projectsStream = (
    <>
      {filteredProjects.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No matching projects found.</p>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : null}

      {/* Unified Bento Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className={styles.cardsGrid}>
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={styles.projectBentoCard}
              aria-labelledby={`project-heading-${project.slug}`}
            >
              {/* Visual Mockup Header */}
              <ProjectVisualMockup project={project} />

              <div className={styles.cardMain}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderLeft}>
                    <span className={styles.cardCategoryChip}>
                      {project.category}
                    </span>
                    {project.projectType ? (
                      <span
                        className={
                          project.projectType.includes('Personal')
                            ? styles.projectTypePersonal
                            : styles.projectTypeTeam
                        }
                      >
                        {project.projectType}
                      </span>
                    ) : null}
                  </div>

                  <span
                    className={
                      project.status === 'Completed'
                        ? `${styles.statusBadge} ${styles.statusCompleted}`
                        : styles.statusBadge
                    }
                  >
                    <span className={styles.statusDot} />
                    <span>{project.status}</span>
                  </span>
                </div>

                <div className={styles.cardTitleBlock}>
                  <div className={styles.cardTitleRow}>
                    <CardHeadingTag
                      id={`project-heading-${project.slug}`}
                      className={styles.cardTitle}
                    >
                      {project.title}
                    </CardHeadingTag>
                    {project.slug === 'dormiq' && project.recognition ? (
                      <span
                        className={styles.recognitionMiniBadge}
                        title={project.recognition}
                      >
                        🏆 3rd Place (Team)
                      </span>
                    ) : null}
                  </div>
                  {project.origin ? (
                    <p className={styles.cardOrigin}>{project.origin}</p>
                  ) : null}
                </div>

                <p className={styles.cardDescription}>{project.shortDescription}</p>

                {project.technologies.length > 0 ? (
                  <ul
                    className={styles.techList}
                    aria-label={`${project.title} technologies`}
                  >
                    {project.technologies.slice(0, 4).map((tech) => (
                      <li key={tech} className={styles.techPill}>
                        {tech}
                      </li>
                    ))}
                    {project.technologies.length > 4 ? (
                      <li className={styles.techPillMuted}>
                        {`+${project.technologies.length - 4}`}
                      </li>
                    ) : null}
                  </ul>
                ) : (
                  <p className={styles.techFallbackNote}>
                    {project.technologiesNote}
                  </p>
                )}

                <div className={styles.cardFooter}>
                  <ProjectActionButton
                    project={project}
                    label={project.slug === 'dormiq' ? 'View Case Study' : 'View Details'}
                    onOpenProject={onOpenProject}
                    className={styles.cardDetailsBtn}
                  />

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLinkIcon}
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <span>Code</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLinkIcon}
                      aria-label={`${project.title} Live Demo`}
                    >
                      <span>Demo</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {/* Engineering Philosophy Disclosure */}
      <aside
        className={styles.disclosureBox}
        aria-label={developmentNote.heading}
      >
        <div className={styles.disclosureLeft}>
          <span className={styles.disclosureIcon}>🛡️</span>
          <div>
            <span className={styles.disclosureTitle}>{developmentNote.heading}</span>
            <p className={styles.disclosureCopy}>{developmentNote.summary}</p>
          </div>
        </div>
      </aside>
    </>
  );

  if (embedded) {
    return (
      <div className={styles.embeddedAppRoot}>
        <div className={styles.osToolbar}>
          <div className={styles.osToolbarLeft}>
            <HeadingTag id="projects-page-heading" className={styles.osHeading}>
              {intro.heading}
            </HeadingTag>
            <span className={styles.osCountPill}>
              {`${filteredProjects.length} ${filteredProjects.length === 1 ? 'project' : 'projects'}`}
            </span>
          </div>
          {searchBar}
        </div>

        <div className={styles.portfolioProjectsStream}>
          {projectsStream}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Modern Page Header */}
      <section
        className={styles.headerSection}
        aria-labelledby="projects-page-heading"
      >
        <Container>
          <div className={styles.headerStack}>
            <div className={styles.headerTopRow}>
              <span className={styles.eyebrowTag}>
                <span className={styles.eyebrowSparkle} aria-hidden="true">
                  ✨
                </span>
                <span>Production Systems &amp; Engineering Builds</span>
              </span>
              <span className={styles.pathMeta}>
                <span className={styles.linuxDot} aria-hidden="true" />
                <span>{intro.pathLabel}</span>
              </span>
            </div>

            <HeadingTag id="projects-page-heading" className={styles.pageHeading}>
              Projects &amp; Case Studies
            </HeadingTag>
            <p className={styles.subtitleCopy}>
              Personal software projects, backend architectures, and collaborative applications built
              with FastAPI, React 19, and PostgreSQL.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Toolbar + Projects Grid */}
      <section className={styles.routeLedgerSection} aria-label="Projects directory">
        <Container>
          <div className={styles.portfolioFilterRow}>
            <div className={styles.horizontalFilterPills} role="group" aria-label="Filter projects by category">
              {PROJECT_FILTER_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? `${styles.filterPillBtn} ${styles.filterPillActive}`
                        : styles.filterPillBtn
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    <span>{CATEGORY_SHORT_LABELS[category]}</span>
                    <span className={styles.filterPillCount}>{countForCategory(category)}</span>
                  </button>
                );
              })}
            </div>
            {searchBar}
          </div>

          <div className={styles.portfolioProjectsStream}>
            {projectsStream}
          </div>
        </Container>
      </section>
    </div>
  );
}
