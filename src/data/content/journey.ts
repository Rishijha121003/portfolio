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
    stageLabel: 'MILESTONE 01',
    title: 'Early Curiosity',
    subtitle: 'Class 12',
    detail:
      'My interest in technology started with curiosity about computers and how websites are built. I wanted to understand how things work behind the screen, which gradually encouraged me to explore Computer Science.',
  },
  {
    index: '02',
    stageLabel: 'MILESTONE 02',
    title: 'Diploma in Computer Science',
    subtitle: 'Government Polytechnic Darbhanga',
    detail:
      'After Class 12, I joined Government Polytechnic Darbhanga through lateral entry to pursue a Diploma in Computer Science Engineering. My academic journey came with a few challenges and took an additional year, teaching me patience and consistency.',
  },
  {
    index: '03',
    stageLabel: 'MILESTONE 03',
    title: 'B.Tech in Computer Science',
    subtitle: 'Sandip University',
    detail:
      'After completing my diploma, I continued my education with a B.Tech in Computer Science Engineering at Sandip University. I am currently in my fourth year, continuing to develop my technical knowledge and explore software development.',
  },
  {
    index: '04',
    stageLabel: 'ACHIEVEMENT',
    title: 'Cheque Mate: Third Place',
    subtitle: 'Team Impact Crew | Sandip University',
    isFeatured: true,
    highlightBadge: 'THIRD PLACE · TOP 3',
    detail:
      'As part of the three-month Campus Recruitment Training (CRT) programme, students worked on developing projects that were later presented in a project pitching competition called Cheque Mate. I participated as a member of the five-person team Impact Crew. We presented DormiQ and secured Third Place (Top 3) among approximately 12–14 participating teams.',
    highlightDetails: [
      { label: 'Competition', value: 'Cheque Mate' },
      { label: 'Achievement', value: 'Third Place' },
      { label: 'Team', value: 'Impact Crew' },
      { label: 'Project', value: 'DormiQ' },
      { label: 'Team size', value: '5 members' },
    ],
  },
  {
    index: '05',
    stageLabel: 'MILESTONE 05',
    title: 'Current Focus',
    subtitle: 'Learning and Building',
    detail:
      'Currently focusing on strengthening programming fundamentals, learning backend development with Python and FastAPI, working with APIs and databases, and improving my problem-solving abilities.',
  },
  {
    index: '06',
    stageLabel: 'MILESTONE 06',
    title: 'Future Goal',
    subtitle: 'Aspiring Full Stack Developer',
    detail:
      'My goal is to become a Full Stack Developer, build useful applications, and develop the skills to independently turn ideas into reliable software.',
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
    lines.push('');
    return lines;
  }),
];
