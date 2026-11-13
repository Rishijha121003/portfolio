import type { ProjectSlug, VerifiedImageAsset } from '@/types/portfolio';
import { ABOUT_MARKDOWN_LINES } from '@/data/content/about';
import { CONTACT_MARKDOWN_LINES } from '@/data/content/contact';
import { JOURNEY_MARKDOWN_LINES } from '@/data/content/journey';
import { DORMIQ_MARKDOWN_FILES } from '@/data/content/projects';
import { SKILLS_MARKDOWN_LINES } from '@/data/content/skills';
import {
  ABOUT_PAGE_DATA,
  CONTACT_PAGE_DATA,
  DORMIQ_CASE_STUDY,
  getProjectMarkdownLines,
  PROJECT_RECORDS,
  SITE_IDENTITY,
  VERIFIED_IMAGES,
} from '@/data/portfolio';

export type OsAppId =
  | 'home'
  | 'projects'
  | 'about'
  | 'journey'
  | 'skills'
  | 'contact'
  | 'terminal'
  | 'files';

export type ProjectsSubView = 'directory' | ProjectSlug;

export interface OsAppConfig {
  id: OsAppId;
  title: string;
  shortLabel: string;
  pathLabel: string;
  description: string;
  routeHref?: string;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  showDesktopIcon: boolean;
}

export const OS_APP_ORDER: readonly OsAppId[] = [
  'home',
  'projects',
  'about',
  'journey',
  'skills',
  'contact',
  'terminal',
  'files',
];

/**
 * Visible Phase 1 RISHI OS applications across Dock and Applications Launcher.
 */
export const PHASE1_VISIBLE_APPS: readonly OsAppId[] = [
  'home',
  'files',
  'projects',
  'terminal',
  'contact',
  'about',
  'journey',
  'skills',
];

export const OS_APPS: Record<OsAppId, OsAppConfig> = {
  home: {
    id: 'home',
    title: 'Welcome — RISHI OS',
    shortLabel: 'Welcome',
    pathLabel: '~/',
    description: 'Interactive RISHI OS welcome workspace and launcher',
    routeHref: '/',
    defaultSize: { width: 720, height: 470 },
    minSize: { width: 420, height: 340 },
    showDesktopIcon: true,
  },
  projects: {
    id: 'projects',
    title: 'Projects — ~/projects',
    shortLabel: 'Projects',
    pathLabel: '~/projects/',
    description: 'DormiQ featured build and engineering dossiers',
    routeHref: '/projects',
    defaultSize: { width: 920, height: 580 },
    minSize: { width: 440, height: 360 },
    showDesktopIcon: true,
  },
  about: {
    id: 'about',
    title: 'About — ~/about',
    shortLabel: 'About',
    pathLabel: '~/about/',
    description: 'Background, timeline from Class 12 to B.Tech, interests, and philosophy',
    routeHref: '/about',
    defaultSize: { width: 820, height: 560 },
    minSize: { width: 420, height: 340 },
    showDesktopIcon: true,
  },
  journey: {
    id: 'journey',
    title: 'Journey — ~/journey',
    shortLabel: 'Journey',
    pathLabel: '~/journey/',
    description: 'Academic progression from Diploma to B.Tech, Cheque Mate, and goals',
    routeHref: '/journey',
    defaultSize: { width: 760, height: 540 },
    minSize: { width: 400, height: 320 },
    showDesktopIcon: true,
  },
  skills: {
    id: 'skills',
    title: 'Skills — ~/skills',
    shortLabel: 'Skills',
    pathLabel: '~/skills/',
    description: 'Languages, backend fundamentals, databases, and developer tools',
    routeHref: '/skills',
    defaultSize: { width: 760, height: 520 },
    minSize: { width: 400, height: 320 },
    showDesktopIcon: true,
  },
  contact: {
    id: 'contact',
    title: 'Contact — ~/contact',
    shortLabel: 'Contact',
    pathLabel: '~/contact/',
    description: 'Direct email, LinkedIn, GitHub, and contact message composer',
    routeHref: '/contact',
    defaultSize: { width: 780, height: 560 },
    minSize: { width: 400, height: 340 },
    showDesktopIcon: true,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — rishi@rishi-os:~',
    shortLabel: 'Terminal',
    pathLabel: 'rishi@rishi-os:~$',
    description: 'Simulated workspace shell and quick navigation',
    defaultSize: { width: 720, height: 430 },
    minSize: { width: 380, height: 280 },
    showDesktopIcon: true,
  },
  files: {
    id: 'files',
    title: 'File Manager — /home/rishi',
    shortLabel: 'File Manager',
    pathLabel: '/home/rishi/',
    description: 'Read-only virtual portfolio filesystem browser',
    defaultSize: { width: 840, height: 560 },
    minSize: { width: 440, height: 350 },
    showDesktopIcon: true,
  },
};

export interface DesktopShortcutItem {
  id: string;
  label: string;
  sublabel: string;
  appId: OsAppId;
  projectSubView?: ProjectsSubView;
  targetPath?: string;
}

export const DESKTOP_SHORTCUTS: readonly DesktopShortcutItem[] = [
  {
    id: 'shortcut-home',
    label: 'Welcome',
    sublabel: 'RISHI OS',
    appId: 'home',
  },
  {
    id: 'shortcut-files',
    label: 'File Manager',
    sublabel: '/home/rishi',
    appId: 'files',
    targetPath: '/home/rishi',
  },
  {
    id: 'shortcut-projects',
    label: 'Projects',
    sublabel: '~/projects',
    appId: 'projects',
    projectSubView: 'directory',
  },
  {
    id: 'shortcut-dormiq',
    label: 'DormiQ',
    sublabel: 'case study',
    appId: 'projects',
    projectSubView: 'dormiq',
  },
  {
    id: 'shortcut-about',
    label: 'About',
    sublabel: '~/about',
    appId: 'about',
  },
  {
    id: 'shortcut-resume',
    label: 'Resume.md',
    sublabel: 'curriculum vitae',
    appId: 'files',
    targetPath: '/home/rishi/resume.md',
  },
];

export const KNOWN_PORTFOLIO_ROUTES = new Set<string>([
  '/',
  '/about',
  '/projects',
  ...PROJECT_RECORDS.map((p) => p.route),
  '/journey',
  '/skills',
  '/contact',
]);

export function resolveRouteLaunch(pathname: string): {
  isKnown: boolean;
  appId: OsAppId;
  projectsSubView: ProjectsSubView;
} {
  if (pathname.startsWith('/projects/')) {
    const slug = pathname.slice('/projects/'.length);
    const matched = PROJECT_RECORDS.find((p) => p.slug === slug);
    if (matched) {
      return { isKnown: true, appId: 'projects', projectsSubView: matched.slug };
    }
    return { isKnown: false, appId: 'home', projectsSubView: 'directory' };
  }

  switch (pathname) {
    case '/':
      return { isKnown: true, appId: 'home', projectsSubView: 'directory' };
    case '/about':
      return { isKnown: true, appId: 'about', projectsSubView: 'directory' };
    case '/projects':
      return { isKnown: true, appId: 'projects', projectsSubView: 'directory' };
    case '/journey':
      return { isKnown: true, appId: 'journey', projectsSubView: 'directory' };
    case '/skills':
      return { isKnown: true, appId: 'skills', projectsSubView: 'directory' };
    case '/contact':
      return { isKnown: true, appId: 'contact', projectsSubView: 'directory' };
    default:
      return { isKnown: false, appId: 'home', projectsSubView: 'directory' };
  }
}

export function getRouteForApp(
  appId: OsAppId,
  projectsSubView: ProjectsSubView = 'directory'
): string | null {
  if (appId === 'projects') {
    return projectsSubView === 'directory' ? '/projects' : `/projects/${projectsSubView}`;
  }
  return OS_APPS[appId].routeHref ?? null;
}

/* ===================================================================== */
/* Virtual Filesystem Model (/home/rishi) — Shared by File Manager & TTY */
/* ===================================================================== */

export interface VirtualFileNode {
  kind: 'file';
  name: string;
  path: string;
  fileType: 'text' | 'desktop' | 'image';
  sizeLabel: string;
  summary: string;
  contentLines: readonly string[];
  launchAction?: {
    label: string;
    appId: OsAppId;
    projectSubView?: ProjectsSubView;
  };
  imageAsset?: VerifiedImageAsset;
}

export interface VirtualDirNode {
  kind: 'dir';
  name: string;
  path: string;
  description: string;
  openAppAction?: {
    label: string;
    appId: OsAppId;
    projectSubView?: ProjectsSubView;
  };
  children: readonly string[];
}

export type VirtualFsNode = VirtualDirNode | VirtualFileNode;

export const VIRTUAL_ROOT = '/home/rishi';

export const VIRTUAL_FS: Record<string, VirtualFsNode> = {
  '/home/rishi': {
    kind: 'dir',
    name: 'rishi',
    path: '/home/rishi',
    description: 'Home directory inside the RISHI OS read-only portfolio filesystem.',
    children: [
      '/home/rishi/Projects',
      '/home/rishi/About',
      '/home/rishi/Journey',
      '/home/rishi/Skills',
      '/home/rishi/Contact',
      '/home/rishi/resume.md',
    ],
  },
  '/home/rishi/Projects': {
    kind: 'dir',
    name: 'Projects',
    path: '/home/rishi/Projects',
    description: 'Portfolio projects featuring DormiQ alongside AssignFlow, LifeOS, Finora, Complaint Management System, and Blog Project.',
    openAppAction: {
      label: 'Open Projects',
      appId: 'projects',
      projectSubView: 'directory',
    },
    children: PROJECT_RECORDS.map((p) => `/home/rishi/Projects/${p.fsDirName}`),
  },
  ...Object.fromEntries(
    PROJECT_RECORDS.filter((p) => p.slug !== 'dormiq').flatMap((proj) => {
      const dirPath = `/home/rishi/Projects/${proj.fsDirName}`;
      const readmePath = `${dirPath}/README.md`;
      return [
        [
          dirPath,
          {
            kind: 'dir' as const,
            name: proj.fsDirName,
            path: dirPath,
            description: `${proj.title} — ${proj.category} (${proj.status}).`,
            openAppAction: {
              label: `Open ${proj.title}`,
              appId: 'projects' as const,
              projectSubView: proj.slug,
            },
            children: [readmePath],
          },
        ],
        [
          readmePath,
          {
            kind: 'file' as const,
            name: 'README.md',
            path: readmePath,
            fileType: 'text' as const,
            sizeLabel: '1.2 KB',
            summary: proj.shortDescription,
            contentLines: getProjectMarkdownLines(proj),
            launchAction: {
              label: `Open ${proj.title}`,
              appId: 'projects' as const,
              projectSubView: proj.slug,
            },
          },
        ],
      ];
    })
  ),
  '/home/rishi/Projects/DormiQ': {
    kind: 'dir',
    name: 'DormiQ',
    path: '/home/rishi/Projects/DormiQ',
    description: 'Featured team project (previously SmartHostel AI) — DormiQ case study files.',
    openAppAction: {
      label: 'Open DormiQ Case Study',
      appId: 'projects',
      projectSubView: 'dormiq',
    },
    children: [
      '/home/rishi/Projects/DormiQ/README.md',
      '/home/rishi/Projects/DormiQ/architecture.md',
      '/home/rishi/Projects/DormiQ/tech-stack.md',
      '/home/rishi/Projects/DormiQ/challenges.md',
      '/home/rishi/Projects/DormiQ/screenshots',
      '/home/rishi/Projects/DormiQ/links.md',
    ],
  },
  '/home/rishi/Projects/DormiQ/README.md': {
    kind: 'file',
    name: 'README.md',
    path: '/home/rishi/Projects/DormiQ/README.md',
    fileType: 'text',
    sizeLabel: '460 B',
    summary: DORMIQ_CASE_STUDY.subtitle,
    contentLines: DORMIQ_MARKDOWN_FILES.readme,
    launchAction: {
      label: 'Open DormiQ Case Study',
      appId: 'projects',
      projectSubView: 'dormiq',
    },
  },
  '/home/rishi/Projects/DormiQ/architecture.md': {
    kind: 'file',
    name: 'architecture.md',
    path: '/home/rishi/Projects/DormiQ/architecture.md',
    fileType: 'text',
    sizeLabel: '280 B',
    summary: DORMIQ_CASE_STUDY.diagramPlaceholderTitle,
    contentLines: DORMIQ_MARKDOWN_FILES.architecture,
    launchAction: {
      label: 'Open DormiQ Case Study',
      appId: 'projects',
      projectSubView: 'dormiq',
    },
  },
  '/home/rishi/Projects/DormiQ/tech-stack.md': {
    kind: 'file',
    name: 'tech-stack.md',
    path: '/home/rishi/Projects/DormiQ/tech-stack.md',
    fileType: 'text',
    sizeLabel: '210 B',
    summary: 'Technology stack status (pending confirmation).',
    contentLines: DORMIQ_MARKDOWN_FILES.techStack,
    launchAction: {
      label: 'Open DormiQ Case Study',
      appId: 'projects',
      projectSubView: 'dormiq',
    },
  },
  '/home/rishi/Projects/DormiQ/challenges.md': {
    kind: 'file',
    name: 'challenges.md',
    path: '/home/rishi/Projects/DormiQ/challenges.md',
    fileType: 'text',
    sizeLabel: '210 B',
    summary: DORMIQ_CASE_STUDY.sections[6]?.title ?? 'Challenges',
    contentLines: DORMIQ_MARKDOWN_FILES.challenges,
    launchAction: {
      label: 'Open DormiQ Case Study',
      appId: 'projects',
      projectSubView: 'dormiq',
    },
  },
  '/home/rishi/Projects/DormiQ/screenshots': {
    kind: 'dir',
    name: 'screenshots',
    path: '/home/rishi/Projects/DormiQ/screenshots',
    description: 'Verified visual assets for DormiQ.',
    openAppAction: {
      label: 'Open DormiQ Case Study',
      appId: 'projects',
      projectSubView: 'dormiq',
    },
    children: ['/home/rishi/Projects/DormiQ/screenshots/dormiq-preview.jpg'],
  },
  '/home/rishi/Projects/DormiQ/screenshots/dormiq-preview.jpg': {
    kind: 'file',
    name: 'dormiq-preview.jpg',
    path: '/home/rishi/Projects/DormiQ/screenshots/dormiq-preview.jpg',
    fileType: 'image',
    sizeLabel: '939 KB',
    summary: VERIFIED_IMAGES.dormiqPreview.alt,
    contentLines: [
      `# ${DORMIQ_CASE_STUDY.title} — Screenshot Asset`,
      `- File: ${VERIFIED_IMAGES.dormiqPreview.src}`,
      `- Dimensions: ${VERIFIED_IMAGES.dormiqPreview.width}x${VERIFIED_IMAGES.dormiqPreview.height}`,
      `- Alt: ${VERIFIED_IMAGES.dormiqPreview.alt}`,
    ],
    imageAsset: VERIFIED_IMAGES.dormiqPreview,
    launchAction: {
      label: 'Open DormiQ Case Study',
      appId: 'projects',
      projectSubView: 'dormiq',
    },
  },
  '/home/rishi/Projects/DormiQ/links.md': {
    kind: 'file',
    name: 'links.md',
    path: '/home/rishi/Projects/DormiQ/links.md',
    fileType: 'text',
    sizeLabel: '210 B',
    summary: 'Repository & external links (pending verification).',
    contentLines: DORMIQ_MARKDOWN_FILES.links,
    launchAction: {
      label: 'Open DormiQ Case Study',
      appId: 'projects',
      projectSubView: 'dormiq',
    },
  },
  '/home/rishi/About': {
    kind: 'dir',
    name: 'About',
    path: '/home/rishi/About',
    description: 'Personal story, Diploma to B.Tech timeline, interests, and philosophy.',
    openAppAction: { label: 'Open About', appId: 'about' },
    children: ['/home/rishi/About/about.md'],
  },
  '/home/rishi/About/about.md': {
    kind: 'file',
    name: 'about.md',
    path: '/home/rishi/About/about.md',
    fileType: 'text',
    sizeLabel: '1.8 KB',
    summary: ABOUT_PAGE_DATA.personBehindCode.heading,
    contentLines: ABOUT_MARKDOWN_LINES,
    launchAction: { label: 'Open About', appId: 'about' },
  },
  '/home/rishi/Journey': {
    kind: 'dir',
    name: 'Journey',
    path: '/home/rishi/Journey',
    description: 'Chronological timeline across Diploma, B.Tech, Cheque Mate, and current focus.',
    openAppAction: { label: 'Open Journey', appId: 'journey' },
    children: ['/home/rishi/Journey/journey.md'],
  },
  '/home/rishi/Journey/journey.md': {
    kind: 'file',
    name: 'journey.md',
    path: '/home/rishi/Journey/journey.md',
    fileType: 'text',
    sizeLabel: '1.6 KB',
    summary: 'Verified milestones from Class 12 curiosity and Diploma to B.Tech and Cheque Mate.',
    contentLines: JOURNEY_MARKDOWN_LINES,
    launchAction: { label: 'Open Journey', appId: 'journey' },
  },
  '/home/rishi/Skills': {
    kind: 'dir',
    name: 'Skills',
    path: '/home/rishi/Skills',
    description: 'Programming languages, FastAPI backend learning, databases, and environment tools.',
    openAppAction: { label: 'Open Skills', appId: 'skills' },
    children: ['/home/rishi/Skills/skills.md'],
  },
  '/home/rishi/Skills/skills.md': {
    kind: 'file',
    name: 'skills.md',
    path: '/home/rishi/Skills/skills.md',
    fileType: 'text',
    sizeLabel: '620 B',
    summary: 'Technologies explored, practiced, and currently being learned.',
    contentLines: SKILLS_MARKDOWN_LINES,
    launchAction: { label: 'Open Skills', appId: 'skills' },
  },
  '/home/rishi/Contact': {
    kind: 'dir',
    name: 'Contact',
    path: '/home/rishi/Contact',
    description: 'Verified email, LinkedIn, GitHub links, and direct message composer.',
    openAppAction: { label: 'Open Contact', appId: 'contact' },
    children: ['/home/rishi/Contact/contact.md'],
  },
  '/home/rishi/Contact/contact.md': {
    kind: 'file',
    name: 'contact.md',
    path: '/home/rishi/Contact/contact.md',
    fileType: 'text',
    sizeLabel: '540 B',
    summary: CONTACT_PAGE_DATA.availabilityNote,
    contentLines: CONTACT_MARKDOWN_LINES,
    launchAction: { label: 'Open Contact', appId: 'contact' },
  },
  '/home/rishi/resume.md': {
    kind: 'file',
    name: 'resume.md',
    path: '/home/rishi/resume.md',
    fileType: 'text',
    sizeLabel: '1.4 KB',
    summary: 'Rishi Jha — Software Developer Curriculum Vitae & Dossier.',
    contentLines: [
      '# Rishi Jha — Resume / Curriculum Vitae',
      '',
      `Software Developer · ${SITE_IDENTITY.fullName}`,
      'Location: New Delhi / NCR, India',
      '',
      '## Profile Summary',
      'Software developer with strong foundational skills in Python, backend development with FastAPI, and modern frontend interfaces with React/Next.js. Background in Mechanical Engineering prior to pursuing B.Tech in Computer Science, bringing rigorous problem-solving discipline and analytical systems thinking.',
      '',
      '## Education',
      '- **B.Tech in Computer Science & Engineering** (2022 – 2025)',
      '  Dronacharya College of Engineering (DCE), Gurugram',
      '- **Diploma in Mechanical Engineering** (2018 – 2021)',
      '  Govind Ballabh Pant Institute of Technology, New Delhi',
      '',
      '## Core Technical Skills',
      '- **Languages**: Python, JavaScript, TypeScript, SQL, HTML5, CSS3',
      '- **Frameworks & Backend**: FastAPI, REST APIs, Next.js, Node.js',
      '- **Databases**: PostgreSQL, SQLite',
      '- **Tools & Environment**: Git, GitHub, Docker, Linux/Bash, VS Code, Postman',
      '',
      '## Key Projects',
      '- **DormiQ (formerly SmartHostel AI)**: Modern hostel room allocation, resident dossiers, and administrative dashboard built with team collaboration.',
      '- **AssignFlow**: Streamlined assignment management and submission tracking platform.',
      '- **LifeOS**: Personal productivity system with deterministic daily planning (React 18, TypeScript, FastAPI, SQLAlchemy 2.0, PostgreSQL/SQLite).',
      '- **Finora**: Personal finance & budget monitor.',
      '',
      '## Honors & Achievements',
      '- **Cheque Mate Hackathon Finalist**: Secured Top 3 ranking in competitive team hackathon building fintech and automated ledger solutions.',
      '',
      '## Direct Contact',
      '- **Composer**: Available via RISHI OS Contact Window (~/contact)',
      '- **Workspace**: RISHI OS Desktop Workspace',
    ],
    launchAction: { label: 'Open Contact', appId: 'contact' },
  },
};

export function toDisplayTildePath(absPath: string): string {
  if (absPath === VIRTUAL_ROOT) return '~';
  if (absPath.startsWith(`${VIRTUAL_ROOT}/`)) {
    return `~/${absPath.slice(VIRTUAL_ROOT.length + 1)}`;
  }
  return absPath;
}

/**
 * Resolves a virtual path strictly within the simulated /home/rishi tree using case-insensitive directory segment matching.
 */
export function resolveVirtualPath(cwd: string, rawInput?: string): string | null {
  if (!rawInput || rawInput === '~') return VIRTUAL_ROOT;

  let working = rawInput.startsWith('~/')
    ? `${VIRTUAL_ROOT}/${rawInput.slice(2)}`
    : rawInput.startsWith('/')
      ? rawInput
      : `${cwd}/${rawInput}`;

  const rawParts = working.split('/').filter(Boolean);
  const stack: string[] = [];

  for (const part of rawParts) {
    if (part === '.') continue;
    if (part === '..') {
      if (stack.length > 0) stack.pop();
      continue;
    }
    stack.push(part);
  }

  working = `/${stack.join('/')}`;
  if (!working.startsWith(VIRTUAL_ROOT)) {
    return null;
  }

  if (VIRTUAL_FS[working]) return working;

  // Match segments case-insensitively inside /home/rishi
  let matchedPath = VIRTUAL_ROOT;
  const relSegments = working.slice(VIRTUAL_ROOT.length).split('/').filter(Boolean);

  for (const seg of relSegments) {
    const node = VIRTUAL_FS[matchedPath];
    if (!node || node.kind !== 'dir') return null;

    const childMatch = node.children.find((childPath) => {
      const childNode = VIRTUAL_FS[childPath];
      return childNode?.name.toLowerCase() === seg.toLowerCase();
    });

    if (!childMatch) return null;
    matchedPath = childMatch;
  }

  return matchedPath;
}

/* ===================================================================== */
/* Wallpaper Registry                                                    */
/* ===================================================================== */

export type WallpaperId =
  | 'default-charcoal'
  | 'midnight-gradient'
  | 'sage-aurora'
  | 'deep-space'
  | 'mountain-night'
  | 'abstract-geometry'
  | 'minimal-grid'
  | 'pure-black';

export interface OsWallpaperConfig {
  id: WallpaperId;
  name: string;
  shortName: string;
  category: string;
  description: string;
}

export const DEFAULT_WALLPAPER_ID: WallpaperId = 'default-charcoal';

const DEFAULT_WALLPAPER_CONFIG: OsWallpaperConfig = {
  id: 'default-charcoal',
  name: 'Default Charcoal',
  shortName: 'Midnight Peak',
  category: 'Landscape',
  description: 'Default RISHI OS midnight blue mountain horizon with soft cyan glow.',
};

export const OS_WALLPAPERS: readonly OsWallpaperConfig[] = [
  DEFAULT_WALLPAPER_CONFIG,
  {
    id: 'midnight-gradient',
    name: 'Midnight Gradient',
    shortName: 'Midnight',
    category: 'Gradient',
    description: 'Smooth dark charcoal-to-black slate ambient fade.',
  },
  {
    id: 'sage-aurora',
    name: 'Sage Aurora',
    shortName: 'Aurora',
    category: 'Atmosphere',
    description: 'Subtle muted sage-green aurora ribbons over deep charcoal.',
  },
  {
    id: 'deep-space',
    name: 'Deep Space',
    shortName: 'Space',
    category: 'Minimal',
    description: 'Dark minimalist cosmos with faint low-contrast starlight.',
  },
  {
    id: 'mountain-night',
    name: 'Mountain Night',
    shortName: 'Mountain',
    category: 'Landscape',
    description: 'Layered nocturnal mountain silhouettes under twilight haze.',
  },
  {
    id: 'abstract-geometry',
    name: 'Abstract Geometry',
    shortName: 'Geometry',
    category: 'Pattern',
    description: 'Subtle architectural geometric facets and concentric arcs.',
  },
  {
    id: 'minimal-grid',
    name: 'Minimal Grid',
    shortName: 'Grid',
    category: 'Pattern',
    description: 'Low-contrast 48px hairline grid with sage intersections.',
  },
  {
    id: 'pure-black',
    name: 'Pure Black',
    shortName: 'Black',
    category: 'OLED',
    description: 'Clean pitch-black background for quiet zero-distraction contrast.',
  },
];

export function isValidWallpaperId(
  value: string | null | undefined
): value is WallpaperId {
  return OS_WALLPAPERS.some((wp) => wp.id === value);
}

export function getWallpaperConfig(id: WallpaperId): OsWallpaperConfig {
  return (
    OS_WALLPAPERS.find((wp) => wp.id === id) ??
    DEFAULT_WALLPAPER_CONFIG
  );
}

