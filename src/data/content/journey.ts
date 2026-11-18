import type { JourneyRecord } from '@/types/portfolio';

export const JOURNEY_PAGE_DATA = {
  eyebrow: '04 / JOURNEY LOG',
  pathLabel: '~/journey/',
  heading: 'JOURNEY',
  subtitle: 'Academic progression, learning milestones, and team achievement.',
} as const;

export const JOURNEY_ENTRIES: readonly JourneyRecord[] = [
  {
    index: '01',
    stageLabel: 'FOUNDATION',
    period: 'Class 12',
    status: 'Completed',
    title: 'Early Curiosity',
    subtitle: 'First Encounter with Web & Code',
    iconType: 'spark',
    detail:
      'My interest in technology started with curiosity about computers and how websites are built. I wanted to understand how things work behind the screen, which gradually encouraged me to explore Computer Science.',
    tags: ['Web Fundamentals', 'Computer Basics', 'Self Curiosity'],
  },
  {
    index: '02',
    stageLabel: 'DIPLOMA',
    period: 'Polytechnic',
    status: 'Completed',
    title: 'Diploma in Computer Science',
    subtitle: 'Government Polytechnic Darbhanga',
    iconType: 'polytechnic',
    detail:
      'After Class 12, I joined Government Polytechnic Darbhanga through lateral entry to pursue a Diploma in Computer Science Engineering. My academic journey came with a few challenges and took an additional year, teaching me patience and consistency.',
    tags: ['CS Core Fundamentals', 'C Programming', 'Patience & Consistency'],
  },
  {
    index: '03',
    stageLabel: 'UNDERGRADUATE',
    period: 'Sandip University',
    status: 'Final Year',
    title: 'B.Tech in Computer Science',
    subtitle: 'Sandip University',
    iconType: 'btech',
    detail:
      'After completing my diploma, I continued my education with a B.Tech in Computer Science Engineering at Sandip University. I am currently in my fourth year, continuing to develop my technical knowledge and explore software development.',
    tags: ['B.Tech CSE', 'Algorithms', 'Software Systems', 'Full Stack Basics'],
  },
  {
    index: '04',
    stageLabel: 'TEAM PROJECT',
    period: 'CRT Hackathon',
    status: 'Team Achievement',
    title: 'Cheque Mate: Third Place',
    subtitle: 'Team Impact Crew | Sandip University',
    isFeatured: true,
    highlightBadge: 'THIRD PLACE (TEAM COLLABORATION)',
    iconType: 'trophy',
    detail:
      'As part of the three-month Campus Recruitment Training (CRT) programme, students worked on developing projects that were later presented in a project pitching competition called Cheque Mate. I participated as a member of the five-person team Impact Crew. We presented DormiQ and secured Third Place (Top 3) among approximately 12–14 participating teams.',
    highlightDetails: [
      { label: 'Competition', value: 'Cheque Mate' },
      { label: 'Achievement', value: 'Third Place' },
      { label: 'Team', value: 'Impact Crew' },
      { label: 'Project', value: 'DormiQ' },
      { label: 'Team size', value: '5 members' },
    ],
    tags: ['Flask Backend', 'DormiQ', 'Team Impact Crew', 'Sandip University'],
  },
  {
    index: '05',
    stageLabel: 'CURRENT FOCUS',
    period: '2024 - Present',
    status: 'Active',
    title: 'Full Stack & Backend Development',
    subtitle: 'Learning and Building',
    iconType: 'tech',
    detail:
      'Currently focusing on strengthening programming fundamentals, learning backend development with Python and FastAPI, working with APIs and databases, and improving my problem-solving abilities.',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'REST APIs', 'React 19'],
  },
  {
    index: '06',
    stageLabel: 'HORIZON',
    period: 'Future Vision',
    status: 'In Progress',
    title: 'Future Goal',
    subtitle: 'Backend-Focused Full Stack Developer',
    iconType: 'rocket',
    detail:
      'My goal is to become a Full Stack Developer, build useful applications, and develop the skills to independently turn ideas into reliable software.',
    tags: ['Full Stack Developer', 'Production Engineering', 'System Architecture'],
  },
];

export const JOURNEY_MARKDOWN_LINES: readonly string[] = [
  `# ${JOURNEY_PAGE_DATA.heading} — ${JOURNEY_PAGE_DATA.pathLabel}`,
  `> ${JOURNEY_PAGE_DATA.subtitle}`,
  '',
  ...JOURNEY_ENTRIES.flatMap((entry) => {
    const lines = [
      `## [${entry.index}] ${entry.title} — ${entry.subtitle}`,
      entry.detail,
    ];
    if (entry.highlightDetails) {
      lines.push(
        ...entry.highlightDetails.map((d) => `- **${d.label}**: ${d.value}`)
      );
    }
    if (entry.tags && entry.tags.length > 0) {
      lines.push(`- **Tags**: ${entry.tags.join(', ')}`);
    }
    lines.push('');
    return lines;
  }),
];
