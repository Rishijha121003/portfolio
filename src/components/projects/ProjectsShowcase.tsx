'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
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
    case 'assignflow':
      return (
        <div className={styles.mockupContainer}>
          <div className={styles.mockupBrowserBar}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.browserUrl}>api.assignflow.dev/speedgrader</span>
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
            <span className={styles.browserUrl}>lifeos.workspace/dashboard</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.statMiniGrid}>
              <div className={styles.miniStat}>
                <span className={styles.miniLabel}>Weekly Focus</span>
                <span className={styles.miniValue}>94.2%</span>
              </div>
              <div className={styles.miniStat}>
                <span className={styles.miniLabel}>Active Tasks</span>
                <span className={styles.miniValue}>18 Done</span>
              </div>
              <div className={styles.miniStat}>
                <span className={styles.miniLabel}>FastAPI Sync</span>
                <span className={styles.miniValueSuccess}>Connected</span>
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
            <span className={styles.browserUrl}>finora.finance/cashflow</span>
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
            <span className={styles.browserUrl}>support.campus/tickets/queue</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.ticketPillRow}>
              <span className={styles.ticketBadgeNew}>Ticket #1042</span>
              <span className={styles.ticketRole}>Warden Review</span>
              <span className={styles.ticketStatusResolved}>Resolved</span>
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
            <span className={styles.browserUrl}>api.endpoints/v1</span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.codeSnippetRow}>
              <code>GET /api/v1/{project.slug} → 200 OK</code>
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

  const featuredDormiq = filteredProjects.find((p) => p.featured);
  const gridProjects = filteredProjects.filter((p) => !p.featured);

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

      {/* Flagship Hero Card: DormiQ */}
      {featuredDormiq ? (
        <article
          className={styles.flagshipHeroCard}
          aria-labelledby="featured-dormiq-heading"
        >
          {/* Top Award Ribbon */}
          <div className={styles.flagshipRibbon}>
            <div className={styles.ribbonLeft}>
              <span className={styles.ribbonTrophy} aria-hidden="true">
                🏆
              </span>
              <span className={styles.ribbonText}>
                Cheque Mate National Hackathon · Third Place Finalist
              </span>
            </div>
            <div className={styles.ribbonRight}>
              <span className={styles.teamBadgePill}>
                Team Impact Crew (5 Members)
              </span>
            </div>
          </div>

          <div className={styles.flagshipBody}>
            {/* Left Column: Information & Actions */}
            <div className={styles.flagshipLeft}>
              <div className={styles.flagshipHeaderGroup}>
                <div className={styles.flagshipTagsRow}>
                  <span className={styles.featuredTagPill}>★ Flagship Case Study</span>
                  <span className={styles.categoryTagPill}>{featuredDormiq.category}</span>
                  {featuredDormiq.previousName ? (
                    <span className={styles.prevNamePill}>
                      Prev: {featuredDormiq.previousName}
                    </span>
                  ) : null}
                </div>

                <CardHeadingTag
                  id="featured-dormiq-heading"
                  className={styles.flagshipTitle}
                >
                  {featuredDormiq.title}
                </CardHeadingTag>

                <p className={styles.flagshipTagline}>
                  Smart Hostel &amp; Housing Management Ecosystem
                </p>
              </div>

              <p className={styles.flagshipSynopsis}>
                {featuredDormiq.shortDescription}
              </p>

              {/* Core Feature Metric Chips */}
              <div className={styles.metricChipsRow}>
                <div className={styles.metricChip}>
                  <span className={styles.metricChipDot} />
                  <span>3 Role Dashboards (Student, Warden, Admin)</span>
                </div>
                <div className={styles.metricChip}>
                  <span className={styles.metricChipDot} />
                  <span>Automated Bed Allotment &amp; Vacancy</span>
                </div>
                <div className={styles.metricChip}>
                  <span className={styles.metricChipDot} />
                  <span>Real-Time Complaint Tracking Queue</span>
                </div>
              </div>

              {/* Curated Tech Stack */}
              <ul className={styles.flagshipTechList} aria-label="DormiQ technology stack">
                {featuredDormiq.technologies.slice(0, 5).map((tech) => (
                  <li key={tech} className={styles.techPill}>
                    {tech}
                  </li>
                ))}
                {featuredDormiq.technologies.length > 5 ? (
                  <li className={styles.techPillMuted}>
                    {`+${featuredDormiq.technologies.length - 5}`}
                  </li>
                ) : null}
              </ul>

              {/* CTA Actions */}
              <div className={styles.flagshipActions}>
                <ProjectActionButton
                  project={featuredDormiq}
                  label="Explore Full Case Study"
                  onOpenProject={onOpenProject}
                  className={styles.flagshipPrimaryBtn}
                />

                {featuredDormiq.githubUrl ? (
                  <a
                    href={featuredDormiq.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.flagshipSecondaryBtn}
                  >
                    <span>GitHub</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}

                {featuredDormiq.liveUrl ? (
                  <a
                    href={featuredDormiq.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.flagshipSecondaryBtn}
                  >
                    <span>Live Demo</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </div>

            {/* Right Column: High-Res Architecture Visual & Floating Badges */}
            {featuredDormiq.image ? (
              <div className={styles.flagshipRight}>
                <div className={styles.mediaFrame}>
                  <Image
                    src={featuredDormiq.image.src}
                    alt={featuredDormiq.image.alt}
                    width={featuredDormiq.image.width}
                    height={featuredDormiq.image.height}
                    sizes="(max-width: 900px) 100vw, 420px"
                    priority
                    className={styles.mediaImage}
                  />
                  <div className={styles.mediaOverlayScrim} aria-hidden="true" />

                  {/* Floating Stat Card inside visual */}
                  <div className={styles.floatingMediaCard}>
                    <div className={styles.floatCardRow}>
                      <span className={styles.floatTrophy}>🏆</span>
                      <div className={styles.floatText}>
                        <span className={styles.floatHeading}>Third Place</span>
                        <span className={styles.floatSub}>Among 12–14 Teams</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </article>
      ) : null}

      {/* Remaining Projects Grid */}
      {gridProjects.length > 0 ? (
        <div className={styles.cardsGrid}>
          {gridProjects.map((project) => (
            <article
              key={project.id}
              className={styles.projectBentoCard}
              aria-labelledby={`project-heading-${project.slug}`}
            >
              {/* Visual Mockup Header */}
              <ProjectVisualMockup project={project} />

              <div className={styles.cardMain}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardCategoryChip}>
                    {project.category}
                  </span>

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
                  <CardHeadingTag
                    id={`project-heading-${project.slug}`}
                    className={styles.cardTitle}
                  >
                    {project.title}
                  </CardHeadingTag>
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
                    label="View Details"
                    onOpenProject={onOpenProject}
                    className={styles.cardDetailsBtn}
                  />

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                    >
                      <span>GitHub</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                    >
                      <span>Live Demo</span>
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
              Featured Projects
            </HeadingTag>
            <p className={styles.subtitleCopy}>
              Production web applications, high-performance API backends, and hackathon-winning
              architectures built with FastAPI, React 19, and PostgreSQL.
            </p>

            {/* Quick Metrics Bar */}
            <div className={styles.headerStatsBar}>
              <div className={styles.headerStatItem}>
                <span className={styles.headerStatVal}>6</span>
                <span className={styles.headerStatLabel}>Verified Builds</span>
              </div>
              <div className={styles.headerStatSep} aria-hidden="true" />

              <div className={styles.headerStatItem}>
                <span className={styles.headerStatValGold}>Top 3</span>
                <span className={styles.headerStatLabel}>National Finalist</span>
              </div>
              <div className={styles.headerStatSep} aria-hidden="true" />

              <div className={styles.headerStatItem}>
                <span className={styles.headerStatVal}>FastAPI</span>
                <span className={styles.headerStatLabel}>Backend Core</span>
              </div>
              <div className={styles.headerStatSep} aria-hidden="true" />

              <div className={styles.headerStatItem}>
                <span className={styles.headerStatVal}>PostgreSQL</span>
                <span className={styles.headerStatLabel}>Relational Models</span>
              </div>
            </div>
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
