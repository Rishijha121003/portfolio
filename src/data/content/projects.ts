import type {
  DormiqCaseStudyData,
  ProjectFilterCategory,
  ProjectRecord,
  ProjectSlug,
  ProjectsPageData,
} from '@/types/portfolio';
import { VERIFIED_IMAGES } from '@/data/content/shared';

export const PROJECT_FILTER_CATEGORIES: readonly ProjectFilterCategory[] = [
  'All',
  'Full Stack',
  'Backend',
  'Personal Projects',
  'Learning / Training',
];

export const PROJECT_RECORDS: readonly ProjectRecord[] = [
  {
    id: 'dormiq',
    index: '01',
    slug: 'dormiq',
    fsDirName: 'DormiQ',
    route: '/projects/dormiq',
    detailRoute: '/projects/dormiq',
    title: 'DormiQ',
    previousName: 'SmartHostel AI',
    shortDescription:
      'A hostel management web application built by Team Impact Crew (5 members) supporting role-based dashboards, allotment workflows, room/bed tracking, and complaint management.',
    overview:
      'DormiQ (previously named SmartHostel AI before its final rename) digitizes student onboarding, bed allotment, vacancy visibility, and hostel complaint tracking for Student, Warden, and Admin roles.',
    problemOrPurpose:
      'Manual hostel allotment registers and unorganized paper complaint logs make tracking bed vacancies and resolving maintenance requests slow across student hostels.',
    category: 'Hostel Management System',
    filterCategories: ['Full Stack'],
    projectType: 'Team Project (5 Members)',
    status: 'Core Implemented',
    statusTag: 'Team Project · Core Implemented',
    technologies: [
      'Python',
      'Flask',
      'Jinja2',
      'SQLAlchemy',
      'PostgreSQL / SQLite',
      'Vanilla JavaScript',
      'CSS',
    ],
    featuresHeading: 'Verified Core Features',
    features: [
      'Student, Warden, and Admin roles.',
      'Role-based authentication and dashboards.',
      'Hostel, floor, room, and bed management.',
      'Student registration and profile management.',
      'Bed assignment and vacancy management.',
      'Online hostel allotment workflow.',
      'Complaint management.',
      'Complaint status tracking and feedback.',
    ],
    technicalHighlights: [
      'Structured relational model across hostels, floors, rooms, beds, and allotments.',
      'Role-scoped dashboards tailored for Student, Warden, and Admin responsibilities.',
      'Note: Later-phase concepts mentioned in project drafts (AI chatbot, email notifications, analytics dashboard, PDF/Excel reports) are not claimed as verified completed modules.',
    ],
    contribution:
      'Worked collaboratively within Team Impact Crew (5 members) on defining hostel management workflows, application requirements, feature planning, role-based access expectations, and presenting the system at Cheque Mate.',
    contributionBullets: [
      'Collaborated within the 5-member Team Impact Crew on shared planning and project execution.',
      'Contributed to defining hostel operations, bed allotment workflows, and Student, Warden, and Admin role-based access requirements.',
      'Participated in preparing and pitching DormiQ in the Cheque Mate competition (Third Place team result).',
    ],
    recognition: 'Third Place — Cheque Mate Project Pitching Competition',
    team: {
      name: 'Impact Crew',
      size: 5,
    },
    image: VERIFIED_IMAGES.dormiqPreview,
    featured: false,
  },
  {
    id: 'assignflow',
    index: '02',
    slug: 'assignflow',
    fsDirName: 'AssignFlow',
    route: '/projects/assignflow',
    detailRoute: '/projects/assignflow',
    title: 'AssignFlow',
    shortDescription:
      'An assignment lifecycle management platform designed to organize college class enrollment, student submissions, grading workflows, and deadlines between teachers and students.',
    overview:
      'AssignFlow streamlines teacher-student assignment distribution, multi-format document submissions, inline SpeedGrader previews, and controlled grade release workflows in an organized local environment.',
    problemOrPurpose:
      'Managing college coursework across scattered folders and messaging apps leads to lost submissions, inconsistent grading states, and unclear student deadlines.',
    category: 'Assignment Lifecycle Management',
    filterCategories: ['Full Stack', 'Backend', 'Personal Projects'],
    projectType: 'Personal Project',
    status: 'In Progress',
    statusTag: 'In Progress · Local Development',
    technologies: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy 2.0',
      'Alembic',
      'HTML',
      'CSS',
      'Vanilla JavaScript',
      'JWT Cookie Authentication',
      'Pytest',
    ],
    featuresHeading: 'README-Described Features (In Development)',
    features: [
      'Teacher and Student role-based authentication.',
      'Class join codes and student enrollment.',
      'Assignment creation and management.',
      'PDF attachments.',
      'Student submissions in PDF, DOCX, DOC, TXT, and ZIP formats.',
      'Submission ownership isolation.',
      'SpeedGrader with PDF and DOCX preview.',
      'Draft and Release grading workflow.',
      'Bulk grade release.',
      'Instructor analytics.',
      'Student deadlines and agenda.',
      'ZIP streaming and CSV formula-injection sanitization.',
      'Database migrations and automated tests (Pytest documented in README; test count not independently verified in this repository).',
    ],
    technicalHighlights: [
      'Draft vs. Release grading state separation before publishing student marks.',
      'Document preview and multi-format submission handling with ZIP streaming & CSV formula-injection sanitization.',
      'Strict submission ownership isolation per enrolled student.',
      'Concurrency control using PostgreSQL database row-level locking.',
    ],
    contribution:
      'Defined the product vision, requirements, and assignment lifecycle workflows for teachers and students, continuously planning features and refining backend architecture and database workflows while development continues.',
    contributionBullets: [
      'Shaped teacher and student use cases, submission constraints, and the Draft vs. Release grading workflow.',
      'Structured feature prioritization, iterative refinements, and understanding of backend architecture and database workflows.',
      'Continuously testing and refining local builds while the project remains in development.',
    ],
    featured: false,
  },
  {
    id: 'lifeos',
    index: '03',
    slug: 'lifeos',
    fsDirName: 'LifeOS',
    route: '/projects/lifeos',
    detailRoute: '/projects/lifeos',
    title: 'LifeOS',
    shortDescription:
      'A personal productivity management application built incrementally in versioned stages to combine daily task organization with structured deterministic daily planning.',
    overview:
      'LifeOS organizes daily tasks, time estimates, and planning suggestions into a single structured system running locally, with V0.1 and V0.2 completed and V0.3+ scoped as future phases.',
    problemOrPurpose:
      'Disconnected to-do lists rarely help decide what fits realistically into a given day alongside longer-term goals and routines.',
    category: 'Personal Productivity System',
    filterCategories: ['Personal Projects'],
    projectType: 'Personal Project',
    status: 'In Progress',
    statusTag: 'In Progress · V0.1–V0.2 Complete',
    technologies: [
      'React 18',
      'TypeScript',
      'Vite',
      'FastAPI',
      'SQLAlchemy 2.0',
      'Pydantic v2',
      'PostgreSQL',
      'SQLite',
      'Alembic',
      'Vanilla CSS',
    ],
    technologiesNote:
      'Frontend: React 18, TypeScript, Vite, Vanilla CSS Design System (#0B0E14 dark theme) · Backend: FastAPI, SQLAlchemy 2.0, Pydantic v2 · Database: PostgreSQL (Production Target) with automatic SQLite local dev fallback · Migrations: Alembic',
    featuresHeading: 'Completed Modules (V0.1 & V0.2)',
    features: [
      'V0.1 — Task CRUD, task priorities, due dates and times.',
      'V0.1 — Today, Upcoming, and Completed views.',
      'V0.2 — Deterministic planning engine.',
      'V0.2 — Smart planning suggestions and planning suggestion API.',
      'V0.2 — Apply suggested plan workflow with estimated task duration.',
    ],
    plannedVersions: [
      {
        version: 'V0.1 — Task Management',
        stage: 'Completed',
        items: [
          'Task CRUD.',
          'Task priorities.',
          'Due dates and times.',
          'Today, Upcoming, and Completed views.',
        ],
      },
      {
        version: 'V0.2 — Smart Daily Planning',
        stage: 'Completed',
        items: [
          'Deterministic planning engine.',
          'Smart planning suggestions.',
          'Planning suggestion API.',
          'Apply suggested plan workflow.',
          'Estimated task duration.',
        ],
      },
      {
        version: 'V0.3 — Personal Productivity Intelligence',
        stage: 'Planning',
        items: [
          'Habit tracking and habit streaks.',
          'Goals and milestones.',
          'Daily review.',
          'Productivity analytics.',
        ],
      },
      {
        version: 'V0.4 — Dynamic Replanning',
        stage: 'Future',
        items: ['Planned future milestone — not yet built.'],
      },
      {
        version: 'V0.5 — AI Assistant',
        stage: 'Future',
        items: ['Planned future milestone — not yet built.'],
      },
    ],
    technicalHighlights: [
      'Full-stack architecture pairing React 18, TypeScript, and Vite with a FastAPI and SQLAlchemy 2.0 backend.',
      'Custom Vanilla CSS Design System featuring a dedicated #0B0E14 dark theme.',
      'PostgreSQL production target with automatic SQLite local development fallback and Alembic schema migrations.',
      'Incremental versioned roadmap cleanly separating shipped V0.1–V0.2 functionality from V0.3–V0.5 planning.',
      'Deterministic daily planning suggestions paired with estimated task duration.',
    ],
    contribution:
      'Defined the personal productivity product vision, task management workflows, and deterministic smart daily planning approach across structured versioned milestones, with V0.1 and V0.2 working and V0.3–V0.5 planned.',
    contributionBullets: [
      'Established task priority, scheduling view (Today, Upcoming, Completed), and duration-aware deterministic planning logic.',
      'Prioritized features across versioned milestones, keeping shipped V0.1–V0.2 modules distinct from planned future phases.',
    ],
    featured: false,
  },
  {
    id: 'finora',
    index: '04',
    slug: 'finora',
    fsDirName: 'Finora',
    route: '/projects/finora',
    detailRoute: '/projects/finora',
    title: 'Finora',
    shortDescription:
      'A full-stack personal finance management application in active local development for tracking income, expenses, payment methods, and multi-period cash flow.',
    overview:
      'Finora aims to give individuals clearer visibility into everyday income and expense patterns across payment methods while maintaining user-level data isolation and accurate currency math.',
    problemOrPurpose:
      'Tracking daily cash, UPI, card, and bank transactions across separate apps makes reviewing monthly cash flow and category totals error-prone.',
    category: 'Personal Finance Management',
    filterCategories: ['Full Stack', 'Backend', 'Personal Projects'],
    projectType: 'Personal Project',
    status: 'In Progress',
    statusTag: 'In Progress · Local Development',
    technologies: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Vanilla JavaScript',
      'REST APIs',
    ],
    featuresHeading: 'README-Described Features (Ongoing)',
    features: [
      'Income and expense tracking.',
      'Custom income and expense categories.',
      'Payment methods: Cash, UPI, Card, Bank Transfer, and Other.',
      'Transaction history and multi-criteria filtering.',
      'Daily, Weekly, Monthly, Yearly, and All-Time analysis.',
      'Financial dashboard and user-level data segregation.',
    ],
    technicalHighlights: [
      'Exact monetary storage and arithmetic using PostgreSQL Numeric(12,2) paired with Python Decimal to prevent binary floating-point rounding drift.',
      'User-level transaction segregation via backend REST APIs.',
    ],
    contribution:
      'Defined personal finance application requirements, income and expense workflows, transaction categorization, multi-period financial summaries, and precision data handling while running and refining the application locally.',
    contributionBullets: [
      'Planned income, expense, payment method categorization, and financial summary workflows alongside user-level data separation.',
      'Specified exact decimal precision and monetary data handling (`Numeric(12,2)` / `Decimal`) during ongoing local development.',
    ],
    featured: false,
  },
  {
    id: 'complaint-management-system',
    index: '05',
    slug: 'complaint-management-system',
    fsDirName: 'ComplaintManagementSystem',
    route: '/projects/complaint-management-system',
    detailRoute: '/projects/complaint-management-system',
    title: 'Complaint Management System',
    shortDescription:
      'A completed college-assigned full-stack application structured with separate frontend and backend repositories and a microservices-based backend architecture.',
    overview:
      'Built as a college project assignment, the Complaint Management System connects a separate frontend repository with a Java Spring Boot and PostgreSQL backend structured around microservices principles.',
    problemOrPurpose:
      'Organizes complaint submission and status handling cleanly across decoupled frontend and backend services for an academic full-stack assignment.',
    category: 'Full-Stack Application',
    filterCategories: ['Full Stack', 'Learning / Training'],
    projectType: 'College Project Assignment',
    origin: 'College Project Assignment',
    status: 'Completed',
    statusTag: 'Completed · College Project',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Separate Frontend Repo'],
    technologiesNote:
      'Confirmed backend stack: Java, Spring Boot, and PostgreSQL. Exact frontend framework packages and internal service names are not confirmed in repository records.',
    featuresHeading: 'Scope & Architecture Summary',
    features: [
      'Full-stack complaint management workflow delivered for a college assignment.',
      'Backend powered by Java, Spring Boot, and PostgreSQL.',
      'Maintained across separate frontend and backend repositories.',
      'Designed using a microservices-based architecture (per project specification).',
    ],
    architectureNotes: [
      'Frontend and backend live in separate repositories and are represented together as one unified project.',
      'Backend service layer built with Java, Spring Boot, and PostgreSQL.',
      'Individual internal microservice names and frontend library details are omitted until verified directly from those repositories.',
    ],
    contribution:
      'Worked on the college project requirements and full-stack application structure featuring separate frontend and backend repositories with a microservices-based Java, Spring Boot, and PostgreSQL backend.',
    contributionBullets: [
      'Structured college assignment requirements covering full-stack complaint workflows and system organization.',
      'Maintained clear separation between the frontend repository and microservices-based Java, Spring Boot, and PostgreSQL backend.',
    ],
    featured: false,
  },
  {
    id: 'blog-project',
    index: '06',
    slug: 'blog-project',
    fsDirName: 'BlogProject',
    route: '/projects/blog-project',
    detailRoute: '/projects/blog-project',
    title: 'Blog Project',
    shortDescription:
      'A completed Django CRUD training project created during a training-based internship to practice URL routing, templates, and SQLite persistence.',
    overview:
      'Built as part of a training-based internship rather than commercial employment, Blog Project covers end-to-end CRUD workflows for creating, browsing, editing, and deleting individual blog posts.',
    problemOrPurpose:
      'Practiced foundational web framework routing, server-rendered HTML/CSS views, form handling, and SQLite database persistence in a structured training build.',
    category: 'Training Project',
    filterCategories: ['Full Stack', 'Learning / Training'],
    projectType: 'Training Project',
    origin: 'Training-Based Internship',
    status: 'Completed',
    statusTag: 'Completed · Training Project',
    technologies: ['Python', 'Django', 'HTML', 'CSS', 'SQLite', 'Git', 'GitHub'],
    featuresHeading: 'Verified Features',
    features: [
      'Create blog posts.',
      'View all blog posts.',
      'Edit existing posts.',
      'Delete blog posts.',
      'Individual blog post detail pages.',
      'Structured Django URL routing.',
    ],
    contribution:
      'Built this Django-based blog application during a training-based internship to practice full blog CRUD workflows, URL routing, individual post pages, and SQLite database integration.',
    contributionBullets: [
      'Implemented blog post creation, listing, editing, deletion, URL routing, and individual post detail views in Django.',
      'Integrated SQLite database storage and practiced Git/GitHub fundamentals as a structured training learning experience.',
    ],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return PROJECT_RECORDS.find((project) => project.slug === (slug as ProjectSlug));
}

const DORMIQ_RECORD = PROJECT_RECORDS[0]!;

export const PROJECTS_PAGE_DATA: ProjectsPageData = {
  intro: {
    eyebrow: '03 / PROJECT DIRECTORY',
    pathLabel: '~/projects/',
    heading: 'My Projects',
    subtitle:
      "Projects I've explored, planned, and built through experimentation, problem-solving, and continuous learning.",
    introCopy:
      'From full-stack applications to backend systems, each project represents a step in my journey of understanding software development and turning ideas into practical solutions.',
    filterLabel: '06 // PROJECTS',
  },
  developmentNote: {
    heading: 'Development Approach',
    summary:
      'Throughout my development journey, I explore ideas, make technical decisions, solve problems, and use modern development tools to turn concepts into working applications. Each project is an opportunity to strengthen my understanding of software development.',
  },
  featured: {
    eyebrow: 'FEATURED TEAM PROJECT // CHEQUE MATE TOP 3',
    index: DORMIQ_RECORD.index,
    statusLabel: DORMIQ_RECORD.status,
    title: DORMIQ_RECORD.title,
    previousName: DORMIQ_RECORD.previousName ?? 'SmartHostel AI',
    description: DORMIQ_RECORD.shortDescription,
    category: DORMIQ_RECORD.category,
    recognition:
      DORMIQ_RECORD.recognition ??
      'Third Place — Cheque Mate Project Pitching Competition',
    teamSummary: 'Team Impact Crew · 5 Members',
    pills: [
      DORMIQ_RECORD.category,
      'Team Impact Crew (5 members)',
      'Third Place — Cheque Mate',
    ],
    ctaLabel: 'View Case Study',
    ctaHref: '/projects/dormiq',
    image: VERIFIED_IMAGES.dormiqPreview,
  },
};

export const DORMIQ_CASE_STUDY: DormiqCaseStudyData = {
  title: 'DormiQ',
  index: '01',
  subtitle:
    'Hostel Management System (Previously named SmartHostel AI) · Team Impact Crew',
  coverImage: VERIFIED_IMAGES.dormiqPreview,
  diagramPlaceholderTitle: 'HOSTEL ROLE & WORKFLOW BOUNDARIES',
  diagramPlaceholderDetail:
    'Relational data flow across Student, Warden, and Admin dashboards managing hostels, floors, rooms, beds, allotment requests, and complaint resolution.',
  sections: [
    {
      code: '01 // OVERVIEW',
      title: 'Project Overview',
      body: 'DormiQ (originally titled SmartHostel AI before its final rename) is a team-built Hostel Management System designed for Student, Warden, and Admin users. Developed by Team Impact Crew (5 members), it centralizes room allotment, bed vacancy visibility, student registration, and hostel complaint tracking.',
      status: 'confirmed',
    },
    {
      code: '02 // PROBLEM',
      title: 'Problem Statement',
      body: 'Hostel administrators and wardens frequently rely on scattered registers for room allotment, manual vacancy checks across floors, and unstructured channels for student complaints—causing delays and limited transparency.',
      status: 'confirmed',
    },
    {
      code: '03 // VERIFIED FEATURES',
      title: 'Verified Core Features',
      body: DORMIQ_RECORD.features.join(' '),
      status: 'confirmed',
    },
    {
      code: '04 // TECH STACK',
      title: 'Technology Stack',
      body: `Built with ${DORMIQ_RECORD.technologies.join(', ')}.`,
      status: 'confirmed',
    },
    {
      code: '05 // RECOGNITION',
      title: 'Cheque Mate Competition',
      body: 'Team Impact Crew (5 members) presented DormiQ during the Cheque Mate project pitching competition at Sandip University and earned Third Place (Top 3) out of approximately 12–14 teams.',
      status: 'confirmed',
    },
    {
      code: '06 // MY ROLE & DEVELOPMENT',
      title: 'My Role & Development',
      body: DORMIQ_RECORD.contribution,
      status: 'confirmed',
    },
    {
      code: '07 // SCOPE ACCURACY',
      title: 'Implementation Boundary',
      body: 'Core hostel, allotment, role authentication, and complaint workflows are verified. Later-phase ideas from planning drafts (AI chatbot, email notifications, analytics dashboard, PDF/Excel reports) are intentionally withheld as unverified/not claimed as completed.',
      status: 'confirmed',
    },
  ],
};

export function getProjectMarkdownLines(project: ProjectRecord): readonly string[] {
  const lines: string[] = [
    `# [${project.index}] ${project.title}`,
    ...(project.previousName ? [`> Previously named: ${project.previousName}`] : []),
    `- **Category**: ${project.category}`,
    `- **Status**: ${project.status}`,
    `- **Type**: ${project.projectType}`,
    ...(project.origin ? [`- **Origin**: ${project.origin}`] : []),
    ...(project.team
      ? [`- **Team**: ${project.team.name} (${project.team.size} members)`]
      : []),
    ...(project.recognition ? [`- **Recognition**: ${project.recognition}`] : []),
    '',
    '## Overview',
    project.overview,
    '',
    '## Purpose',
    project.problemOrPurpose,
    '',
    '## Technology Stack',
    ...(project.technologies.length > 0
      ? [project.technologies.join(' · ')]
      : [project.technologiesNote ?? 'Pending confirmation.']),
    '',
    `## ${project.featuresHeading}`,
    ...project.features.map((f) => `- ${f}`),
  ];

  if (project.technicalHighlights && project.technicalHighlights.length > 0) {
    lines.push('', '## Technical Highlights', ...project.technicalHighlights.map((h) => `- ${h}`));
  }

  lines.push('', '## My Role & Development', project.contribution);
  return lines;
}

/**
 * Derived markdown documents consumed by File Manager & Terminal from single DormiQ case study source.
 */
export const DORMIQ_MARKDOWN_FILES = {
  readme: getProjectMarkdownLines(DORMIQ_RECORD),
  architecture: [
    `# ${DORMIQ_CASE_STUDY.title} — Architecture & Scope`,
    DORMIQ_CASE_STUDY.sections[1]?.body ?? '',
    `> ${DORMIQ_CASE_STUDY.diagramPlaceholderTitle}: ${DORMIQ_CASE_STUDY.diagramPlaceholderDetail}`,
    DORMIQ_CASE_STUDY.sections[6]?.body ?? '',
  ].filter(Boolean),
  techStack: [
    `# ${DORMIQ_CASE_STUDY.title} — Technology Stack`,
    ...DORMIQ_RECORD.technologies.map((tech) => `- ${tech}`),
  ],
  challenges: [
    `# ${DORMIQ_CASE_STUDY.title} — Competition & Development`,
    DORMIQ_CASE_STUDY.sections[4]?.body ?? '',
    DORMIQ_CASE_STUDY.sections[5]?.body ?? '',
  ].filter(Boolean),
  links: [
    `# ${DORMIQ_CASE_STUDY.title} — Project Links`,
    `- Case Study Route: ${DORMIQ_RECORD.detailRoute}`,
    '- Repository / Live Demo links: Not configured in this portfolio build.',
  ],
};
