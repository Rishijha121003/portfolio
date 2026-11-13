import type { SkillsPageContent } from '@/types/portfolio';

export const SKILLS_PAGE_DATA: SkillsPageContent = {
  eyebrow: '05 / CAPABILITIES',
  pathLabel: '~/skills/',
  heading: 'My Technical Skills',
  subtitle: "Technologies I've explored, practiced and continue to learn.",
  categories: [
    {
      index: '01',
      title: 'Programming Languages',
      items: [
        { name: 'Java', context: 'Fundamentals' },
        { name: 'Python', context: 'Fundamentals' },
      ],
    },
    {
      index: '02',
      title: 'Backend Development',
      items: [
        { name: 'FastAPI', context: 'Currently Learning', tone: 'learning' },
        { name: 'REST API Development', context: 'Practiced CRUD operations' },
      ],
    },
    {
      index: '03',
      title: 'Databases',
      items: [
        { name: 'PostgreSQL', context: 'Used with Neon' },
        { name: 'SQLite', context: 'Local Database' },
        { name: 'MongoDB', context: 'Practical Exposure' },
      ],
    },
    {
      index: '04',
      title: 'Tools & Development Environment',
      items: [
        { name: 'Git & GitHub', context: 'Basic Workflow' },
        { name: 'Linux', context: 'Basic Familiarity' },
        { name: 'Visual Studio Code', context: 'Code Editor' },
      ],
    },
  ],
};

export const SKILLS_MARKDOWN_LINES: readonly string[] = [
  `# ${SKILLS_PAGE_DATA.heading} — ${SKILLS_PAGE_DATA.pathLabel}`,
  `> ${SKILLS_PAGE_DATA.subtitle}`,
  '',
  ...SKILLS_PAGE_DATA.categories.flatMap((category) => [
    `## [${category.index}] ${category.title}`,
    ...category.items.map((item) => `- **${item.name}** — ${item.context}`),
    '',
  ]),
];
