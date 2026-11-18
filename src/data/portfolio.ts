import type {
  DualMarqueeData,
  HomeStructuralContent,
  RouteNavItem,
} from '@/types/portfolio';
import { SITE_IDENTITY, VERIFIED_IMAGES } from '@/data/content/shared';
import {
  DORMIQ_CASE_STUDY,
  getProjectBySlug,
  getProjectMarkdownLines,
  PROJECT_FILTER_CATEGORIES,
  PROJECT_RECORDS,
  PROJECTS_PAGE_DATA,
} from '@/data/content/projects';
import { ABOUT_PAGE_DATA } from '@/data/content/about';
import { JOURNEY_ENTRIES, JOURNEY_PAGE_DATA } from '@/data/content/journey';
import { SKILLS_PAGE_DATA } from '@/data/content/skills';
import { CONTACT_PAGE_DATA } from '@/data/content/contact';

export {
  SITE_IDENTITY,
  VERIFIED_IMAGES,
  PROJECT_FILTER_CATEGORIES,
  PROJECT_RECORDS,
  getProjectBySlug,
  getProjectMarkdownLines,
  PROJECTS_PAGE_DATA,
  DORMIQ_CASE_STUDY,
  ABOUT_PAGE_DATA,
  JOURNEY_ENTRIES,
  JOURNEY_PAGE_DATA,
  SKILLS_PAGE_DATA,
  CONTACT_PAGE_DATA,
};

export const PRIMARY_ROUTES: readonly RouteNavItem[] = [
  { index: '01', label: 'Home', href: '/', breadcrumbLabel: 'HOME' },
  { index: '02', label: 'About', href: '/about', breadcrumbLabel: 'ABOUT' },
  { index: '03', label: 'Projects', href: '/projects', breadcrumbLabel: 'PROJECTS' },
  { index: '04', label: 'Journey', href: '/journey', breadcrumbLabel: 'JOURNEY' },
  { index: '05', label: 'Skills', href: '/skills', breadcrumbLabel: 'SKILLS' },
  { index: '06', label: 'Contact', href: '/contact', breadcrumbLabel: 'CONTACT' },
];

export const DUAL_MARQUEE_DATA: DualMarqueeData = {
  visualTrackLabel: 'Project visual showcase',
  visualTiles: [
    VERIFIED_IMAGES.dormiqPreview,
    VERIFIED_IMAGES.heroWorkspace,
    VERIFIED_IMAGES.aboutBuilder,
  ],
  typographyTrackLabel: 'Editorial creative discipline labels',
  typographyWords: [
    'ENGINEERING',
    'BUILDING',
    'EXPERIMENTING',
    'CREATING',
    'DIGITAL WORK',
  ],
};

export const HOME_STRUCTURAL_DATA: HomeStructuralContent = {
  hero: {
    index: '01',
    sectionLabel: 'PORTFOLIO',
    greeting: "Hey, I'm",
    displayName: 'Rishi Jha',
    rolePlaceholder: 'Backend-Focused Full Stack Developer',
    tagline: 'Learning. Building. Improving.',
    exploreLabel: 'EXPLORE',
    scrollLabel: 'SCROLL',
  },
  introduction: {
    eyebrow: '03 / INTRODUCTION',
    statusLabel: 'OPEN TO BACKEND & FULL-STACK ROLES',
    headingLead: 'LEARNING.',
    headingIndent: 'BUILDING. IMPROVING.',
    lines: [
      "I'm a Computer Science student at Sandip University with a growing interest in software development and modern web technologies.",
      "I enjoy learning how things work, exploring new technologies, and turning what I learn into practical applications. I'm currently focused on strengthening my development fundamentals and growing towards becoming a Full Stack Developer.",
    ],
    ctaLabel: 'MORE ABOUT ME',
    ctaHref: '/about',
  },
  explore: {
    eyebrow: '04 // EXPLORE',
    heading: 'Directory',
    directoryHint: '~/portfolio',
    items: [
      {
        index: '01',
        label: 'PROJECTS',
        href: '/projects',
        pathLabel: '~/projects/',
        description: 'DormiQ case study & upcoming builds',
      },
      {
        index: '02',
        label: 'ABOUT',
        href: '/about',
        pathLabel: '~/about/',
        description: 'Background, interests & approach',
      },
      {
        index: '03',
        label: 'JOURNEY',
        href: '/journey',
        pathLabel: '~/journey/',
        description: 'Learning and development timeline',
      },
      {
        index: '04',
        label: 'SKILLS',
        href: '/skills',
        pathLabel: '~/skills/',
        description: 'Technologies and tools',
      },
      {
        index: '05',
        label: 'CONTACT',
        href: '/contact',
        pathLabel: '~/contact/',
        description: 'Get in touch',
      },
    ],
  },
  closing: {
    eyebrow: '05 // CLOSING',
    metaPath: '~/contact',
    heading: 'HAVE SOMETHING IN MIND?',
    statementPlaceholder:
      'Building backend-focused applications with Python, FastAPI and PostgreSQL. Open to backend and full-stack opportunities.',
    ctaLabel: 'GET IN TOUCH',
    ctaHref: '/contact',
  },
};

export const FOOTER_STATUS_TEXT = 'Backend-Focused Full Stack Developer';
