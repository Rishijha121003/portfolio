export type ContentStatus = 'confirmed' | 'placeholder';

export type RoutePath =
  | '/'
  | '/about'
  | '/projects'
  | '/journey'
  | '/skills'
  | '/contact';

export type ProjectSlug =
  | 'dormiq'
  | 'assignflow'
  | 'lifeos'
  | 'finora'
  | 'complaint-management-system'
  | 'blog-project';

export type ProjectRoutePath = `/projects/${ProjectSlug}`;

export type ProjectFilterCategory =
  | 'All'
  | 'Full Stack'
  | 'Backend'
  | 'Personal Projects'
  | 'Learning / Training';

export interface RouteNavItem {
  index: string;
  label: string;
  href: RoutePath;
  breadcrumbLabel: string;
}

export interface VerifiedImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface PlaceholderBlock {
  label: string;
  text: string;
  status: 'placeholder';
}

export interface SiteIdentity {
  initials: string;
  firstName: string;
  lastName: string;
  fullName: string;
  rolePlaceholder: string;
  availabilityPlaceholder: string;
  portraitNote: string;
}

export interface ProjectVersionTrack {
  version: string;
  stage: 'Completed' | 'Planning' | 'Future';
  items: readonly string[];
}

export interface ProjectRecord {
  id: string;
  index: string;
  slug: ProjectSlug;
  fsDirName: string;
  route: ProjectRoutePath;
  detailRoute: ProjectRoutePath;
  title: string;
  previousName?: string;
  shortDescription: string;
  overview: string;
  problemOrPurpose: string;
  category: string;
  filterCategories: readonly Exclude<ProjectFilterCategory, 'All'>[];
  projectType: string;
  origin?: string;
  status: 'Completed' | 'Core Implemented' | 'In Progress';
  statusTag: string;
  technologies: readonly string[];
  technologiesNote?: string;
  featuresHeading: string;
  features: readonly string[];
  plannedVersions?: readonly ProjectVersionTrack[];
  technicalHighlights?: readonly string[];
  architectureNotes?: readonly string[];
  contribution: string;
  contributionBullets: readonly string[];
  recognition?: string;
  team?: {
    name: string;
    size: number;
  };
  image?: VerifiedImageAsset;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface DormiqCaseStudySection {
  code: string;
  title: string;
  body: string;
  status: ContentStatus;
}

export interface DormiqCaseStudyData {
  title: string;
  index: string;
  subtitle: string;
  coverImage: VerifiedImageAsset;
  sections: readonly DormiqCaseStudySection[];
  diagramPlaceholderTitle: string;
  diagramPlaceholderDetail: string;
}

export interface AboutNarrativeSection {
  id: string;
  index: string;
  heading: string;
  paragraphs: readonly string[];
}

export interface AboutTimelineStep {
  step: string;
  stage: string;
  summary: string;
}

export interface AboutPageData {
  eyebrow: string;
  pathLabel: string;
  heading: string;
  subtitleTag: string;
  workspaceImage: VerifiedImageAsset;
  workspaceCaption: string;
  personBehindCode: AboutNarrativeSection;
  howItStarted: AboutNarrativeSection & {
    timeline: readonly AboutTimelineStep[];
  };
  beyondTechnology: AboutNarrativeSection & {
    hobbies: readonly string[];
  };
  whereHeading: AboutNarrativeSection;
  beliefSection: {
    id: string;
    index: string;
    heading: string;
    leadParagraphs: readonly string[];
    quote: string;
    supportingText: string;
  };
}

export interface JourneyHighlightDetail {
  label: string;
  value: string;
}

export interface JourneyRecord {
  index: string;
  stageLabel: string;
  subtitle: string;
  title: string;
  detail: string;
  isFeatured?: boolean;
  highlightBadge?: string;
  highlightDetails?: readonly JourneyHighlightDetail[];
  period?: string;
  status?: string;
  tags?: readonly string[];
  iconType?: 'spark' | 'polytechnic' | 'btech' | 'trophy' | 'tech' | 'rocket';
}

export interface SkillItem {
  name: string;
  context: string;
  tone?: 'default' | 'learning';
}

export interface SkillCategory {
  index: string;
  title: string;
  items: readonly SkillItem[];
}

export interface SkillsPageContent {
  eyebrow: string;
  pathLabel: string;
  heading: string;
  subtitle: string;
  categories: readonly SkillCategory[];
}

export type ContactChannelIconKey =
  | 'github'
  | 'linkedin'
  | 'x'
  | 'email'
  | 'resume';

export interface ContactChannelPlaceholder {
  label: string;
  statusLabel: string;
  href: string;
  external?: boolean;
  icon: ContactChannelIconKey;
}

export interface ContactPageData {
  eyebrow: string;
  pathLabel: string;
  headingLead: string;
  headingAccent: string;
  intro: string;
  availabilityNote: string;
  verificationNotice: string;
  recipientEmail: string;
  backdropImage: VerifiedImageAsset;
  channels: readonly ContactChannelPlaceholder[];
}

export interface DualMarqueeData {
  visualTrackLabel: string;
  visualTiles: readonly VerifiedImageAsset[];
  typographyTrackLabel: string;
  typographyWords: readonly string[];
}

export interface ProjectsPageData {
  intro: {
    eyebrow: string;
    pathLabel: string;
    heading: string;
    subtitle: string;
    introCopy: string;
    filterLabel: string;
  };
  developmentNote: {
    heading: string;
    summary: string;
  };
  featured: {
    eyebrow: string;
    index: string;
    statusLabel: string;
    title: string;
    previousName: string;
    description: string;
    category: string;
    recognition: string;
    teamSummary: string;
    pills: readonly string[];
    ctaLabel: string;
    ctaHref: '/projects/dormiq';
    image: VerifiedImageAsset;
  };
}

export interface HomeExploreItem {
  index: string;
  label: string;
  href: Exclude<RoutePath, '/'>;
  pathLabel: string;
  description: string;
}

export interface HomeStructuralContent {
  hero: {
    index: string;
    sectionLabel: string;
    greeting: string;
    displayName: string;
    rolePlaceholder: string;
    tagline: string;
    exploreLabel: string;
    scrollLabel: string;
  };
  introduction: {
    eyebrow: string;
    statusLabel: string;
    headingLead: string;
    headingIndent: string;
    lines: readonly string[];
    ctaLabel: string;
    ctaHref: '/about';
  };
  explore: {
    eyebrow: string;
    heading: string;
    directoryHint: string;
    items: readonly HomeExploreItem[];
  };
  closing: {
    eyebrow: string;
    metaPath: string;
    heading: string;
    statementPlaceholder: string;
    ctaLabel: string;
    ctaHref: '/contact';
  };
}

/* ================================================== */
/* Transitional Phase 2 Types (removed in Phase 4)    */
/* ================================================== */

export type SectionId = 'home' | 'work' | 'stack' | 'about' | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
  href: `#${SectionId}`;
}

export interface HeroFocusCard {
  category: string;
  title: string;
  href: `#${SectionId}`;
}

export interface HeroMetric {
  value: string;
  label: string;
}

export interface PortfolioProfile {
  initials: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  subtitle: string;
  tagline: string;
  statement: string;
  availabilityLabel: string;
  focusCards: readonly HeroFocusCard[];
  metrics: readonly HeroMetric[];
}

export interface ProjectItem {
  number: string;
  slug: string;
  title: string;
  tagline: string;
  tech: readonly string[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  linkStatusLabel: string;
}

export type TechIconKey =
  | 'python'
  | 'fastapi'
  | 'django'
  | 'flask'
  | 'postgresql'
  | 'react'
  | 'typescript'
  | 'nodejs'
  | 'docker'
  | 'linux';

export interface TechItem {
  name: string;
  icon: TechIconKey;
}

export type PillarIconKey = 'build' | 'learn' | 'ship';

export interface AboutPillar {
  title: string;
  description: string;
  icon: PillarIconKey;
}

export interface AboutContent {
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  paragraphs: readonly string[];
  pillars: readonly AboutPillar[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  annotation: string;
}

export interface PendingContactChannel {
  label: string;
  status: string;
  icon: ContactChannelIconKey;
}

export interface ContactContent {
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  subheading: string;
  bgImageSrc: string;
  bgImageAlt: string;
  bgImageWidth: number;
  bgImageHeight: number;
  verificationNotice: string;
  channels: readonly PendingContactChannel[];
}
