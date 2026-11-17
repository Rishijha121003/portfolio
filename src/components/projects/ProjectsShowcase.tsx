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

function CategoryIcon({ category }: { category: ProjectFilterCategory }) {
  switch (category) {
    case 'All':
      return (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="9" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="2" y="9" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="9" y="9" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case 'Full Stack':
      return (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
          <path
            d="M2 4.5A1.5 1.5 0 0 1 3.5 3h2.8l1.2 1.3h5A1.5 1.5 0 0 1 14 5.8v6.2a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12V4.5Z"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <path d="M5.5 8.5h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
    case 'Backend':
      return (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
          <rect x="2.2" y="2.5" width="11.6" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
          <rect x="2.2" y="9" width="11.6" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="4.6" cy="4.75" r="0.7" fill="currentColor" />
          <circle cx="4.6" cy="11.25" r="0.7" fill="currentColor" />
        </svg>
      );
    case 'Personal Projects':
      return (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
          <path
            d="M3 6.5 8 2.5l5 4v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <path d="M6.5 13.5v-3.8h3v3.8" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
    case 'Learning / Training':
      return (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
          <path
            d="M3 3.2A1.2 1.2 0 0 1 4.2 2h7.6A1.2 1.2 0 0 1 13 3.2v9.6a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 12.8V3.2Z"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <path d="M5.5 5.5h5M5.5 8.5h3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
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
 * Shared 6-project directory highlighting DormiQ as featured work alongside split-pane category filtering and search.
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

  const sidebarNav = (
    <aside className={styles.sidebar} aria-label="Project categories">
      <div
        className={styles.categoryGroup}
        role="group"
        aria-label="Filter projects by category"
      >
        {PROJECT_FILTER_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              aria-label={category}
              title={category}
              className={
                isActive
                  ? `${styles.catBtn} ${styles.catBtnActive}`
                  : styles.catBtn
              }
              onClick={() => setActiveCategory(category)}
            >
              <span className={isActive ? styles.catIconActive : styles.catIcon}>
                <CategoryIcon category={category} />
              </span>
              <span className={styles.catLabel}>
                {CATEGORY_SHORT_LABELS[category]}
              </span>
              <span className={styles.catCount}>{countForCategory(category)}</span>
            </button>
          );
        })}
      </div>

      <p className={styles.sidebarFoot}>
        {`${PROJECT_RECORDS.length} verified builds`}
      </p>
    </aside>
  );

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
        placeholder="Search projects..."
        className={styles.searchInput}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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

      {/* Featured Project: DormiQ */}
      {featuredDormiq ? (
        <article
          className={styles.featuredCard}
          aria-labelledby="featured-dormiq-heading"
        >
          {featuredDormiq.image ? (
            <div className={styles.featuredMediaWrap}>
              <Image
                src={featuredDormiq.image.src}
                alt={featuredDormiq.image.alt}
                width={featuredDormiq.image.width}
                height={featuredDormiq.image.height}
                sizes="(max-width: 780px) 100vw, 230px"
                priority
                className={styles.featuredImage}
              />
            </div>
          ) : null}

          <div className={styles.featuredCenter}>
            <div className={styles.featuredTitleRow}>
              <CardHeadingTag
                id="featured-dormiq-heading"
                className={styles.featuredTitle}
              >
                {featuredDormiq.title}
              </CardHeadingTag>
              <span className={styles.featuredPill}>
                <svg
                  viewBox="0 0 14 14"
                  width="11"
                  height="11"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="m7 1.2 1.75 3.55 3.92.57-2.83 2.76.67 3.9L7 10.14 3.49 11.98l.67-3.9L1.33 5.32l3.92-.57L7 1.2Z" />
                </svg>
                <span>Featured</span>
              </span>
            </div>

            <div className={styles.featuredSubtitleRow}>
              <span className={styles.featuredSubtitle}>
                {featuredDormiq.category}
              </span>
              {featuredDormiq.previousName ? (
                <span className={styles.previousNameTag}>
                  {`Previously ${featuredDormiq.previousName}`}
                </span>
              ) : null}
            </div>

            <p className={styles.featuredDesc}>
              {featuredDormiq.shortDescription}
            </p>

            <ul className={styles.techList} aria-label="DormiQ technology stack">
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

            <div className={styles.cardFooter}>
              <ProjectActionButton
                project={featuredDormiq}
                label="View Case Study"
                onOpenProject={onOpenProject}
                className={styles.caseStudyPillBtn}
              />

              {featuredDormiq.githubUrl ? (
                <a
                  href={featuredDormiq.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
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
                  className={styles.externalLink}
                >
                  <span>Live Demo</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </div>

          {/* Right Highlight Panel: Recognition + Team */}
          <div className={styles.featuredMetaPanel}>
            <div className={styles.metaStatBlock}>
              <span className={styles.trophyBadge} aria-hidden="true">
                <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
                  <path
                    d="M6 3.5h8v4.2a4 4 0 0 1-8 0V3.5Z"
                    fill="#FBBF24"
                    fillOpacity="0.24"
                    stroke="#FBBF24"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 4.8H3.8a1.5 1.5 0 0 0 0 3H6M14 4.8h2.2a1.5 1.5 0 0 1 0 3H14"
                    stroke="#FBBF24"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 11.8v3.2M7 16.5h6"
                    stroke="#FBBF24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className={styles.metaStatCopy}>
                <span className={styles.metaTitleGold}>Third Place</span>
                <span className={styles.metaSub}>Cheque Mate Competition</span>
              </div>
            </div>

            {featuredDormiq.team ? (
              <div className={styles.metaStatBlock}>
                <span className={styles.teamBadge} aria-hidden="true">
                  <svg viewBox="0 0 20 20" width="19" height="19" fill="none">
                    <circle cx="7.5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                    <path
                      d="M3.2 15.5c.4-2.1 2.1-3.3 4.3-3.3s3.9 1.2 4.3 3.3"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <circle cx="13.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3" />
                    <path
                      d="M12.8 12.6c1.8.2 3.2 1.2 3.6 2.9"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <div className={styles.metaStatCopy}>
                  <span className={styles.metaTitle}>Team</span>
                  <span className={styles.metaSub}>
                    {`${featuredDormiq.team.name} (${featuredDormiq.team.size} members)`}
                  </span>
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
              className={styles.projectCard}
              aria-labelledby={`project-heading-${project.slug}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIndexRow}>
                  <span className={styles.inlineIndexBadge}>
                    {project.index}
                  </span>
                  <span className={styles.cardCategory}>{project.category}</span>
                </div>

                <span
                  className={
                    project.status === 'Completed'
                      ? `${styles.statusBadge} ${styles.statusCompleted}`
                      : styles.statusBadge
                  }
                >
                  {project.status}
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
                  {project.technologies.map((tech) => (
                    <li key={tech} className={styles.techPill}>
                      {tech}
                    </li>
                  ))}
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
                  className={styles.secondaryDetailsBtn}
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
            </article>
          ))}
        </div>
      ) : null}

      {/* Development Approach Note */}
      <aside
        className={styles.disclosureBox}
        aria-label={developmentNote.heading}
      >
        <span className={styles.disclosureTitle}>{developmentNote.heading}</span>
        <p className={styles.disclosureCopy}>{developmentNote.summary}</p>
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

        <div className={styles.osWorkspace}>
          {sidebarNav}
          <div className={styles.osMainPane}>{projectsStream}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Classic Editorial Header Band on /projects */}
      <section
        className={styles.headerSection}
        aria-labelledby="projects-page-heading"
      >
        <Container>
          <div className={styles.headerStack}>
            <div className={styles.headerTopRow}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowRule} aria-hidden="true" />
                <span>{intro.eyebrow}</span>
              </span>
              <span className={styles.pathMeta}>
                <span className={styles.linuxDot} aria-hidden="true" />
                <span>{intro.pathLabel}</span>
              </span>
            </div>

            <HeadingTag id="projects-page-heading" className={styles.pageHeading}>
              {intro.heading}
            </HeadingTag>
            <p className={styles.subtitleCopy}>{intro.subtitle}</p>
          </div>
        </Container>
      </section>

      {/* Modern Filter Pill Bar + Projects Showcase Stream */}
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
