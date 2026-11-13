import type { AboutPageData } from '@/types/portfolio';
import { SITE_IDENTITY, VERIFIED_IMAGES } from '@/data/content/shared';

export const ABOUT_PAGE_DATA: AboutPageData = {
  eyebrow: '02 / ABOUT',
  pathLabel: '~/about/',
  heading: 'ABOUT',
  subtitleTag: 'Darbhanga, Bihar · B.Tech CSE at Sandip University',
  workspaceImage: VERIFIED_IMAGES.aboutBuilder,
  workspaceCaption: 'Personal workspace & development setup',
  personBehindCode: {
    id: 'person-behind-the-code',
    index: '01',
    heading: 'The Person Behind the Code',
    paragraphs: [
      "I'm Rishi Jha, a Computer Science Engineering student from Darbhanga, Bihar, currently pursuing my B.Tech at Sandip University.",
      'My interest in computers started around Class 12. I often wondered how websites were built using code and what happened behind the screens. That curiosity gradually developed into an interest in understanding technology and software development.',
    ],
  },
  howItStarted: {
    id: 'how-it-started',
    index: '02',
    heading: 'How It Started',
    paragraphs: [
      "I chose a Diploma in Computer Science Engineering to explore this interest further. During the first two years of my diploma, I didn't have a personal laptop, which limited my opportunities for hands-on coding.",
      "Things changed in my third year when I finally got my laptop. I started exploring coding and trying things practically. That's when I realised that building something wasn't as easy as it looked. But the challenges made the process even more interesting. I began enjoying the experience of figuring things out, solving problems, and improving what I created.",
      'After completing my diploma, I continued my academic journey with B.Tech to deepen my understanding of computer science and software development.',
    ],
    timeline: [
      {
        step: '01',
        stage: 'Class 12',
        summary: 'Curiosity about computers and websites.',
      },
      {
        step: '02',
        stage: 'Diploma',
        summary: 'Started learning Computer Science fundamentals.',
      },
      {
        step: '03',
        stage: 'Diploma Third Year',
        summary: 'Got my first personal laptop and began practical coding exploration.',
      },
      {
        step: '04',
        stage: 'B.Tech',
        summary: 'Continuing my learning and development journey.',
      },
    ],
  },
  beyondTechnology: {
    id: 'beyond-technology',
    index: '03',
    heading: 'Beyond Technology',
    paragraphs: [
      "I'm someone who enjoys creating things and finding ways to make them better. I like experimenting with ideas, understanding how things work, and solving problems. There's something satisfying about taking an idea and gradually turning it into something useful.",
      'Apart from technology, I enjoy playing badminton and chess, travelling to new places, and reading books. I also like exploring new interests and learning from different experiences.',
    ],
    hobbies: ['Badminton', 'Chess', 'Travelling', 'Reading'],
  },
  whereHeading: {
    id: 'where-im-heading',
    index: '04',
    heading: "Where I'm Heading",
    paragraphs: [
      "I'm working towards becoming a Full Stack Developer. My goal is to build a strong foundation in software development, become a better problem-solver, and gain the ability to turn ideas into useful, reliable applications.",
      "I don't want to limit myself to just learning tools and technologies. I want to understand the logic behind them and become better at building things independently.",
    ],
  },
  beliefSection: {
    id: 'a-thought-i-believe-in',
    index: '05',
    heading: 'A Thought I Believe In',
    leadParagraphs: [
      'I believe personal growth is a continuous process. If you stop learning and improving, you risk staying where you are.',
      'And one principle I try to follow:',
    ],
    quote: "Don't compare yourself with others. It's always you vs. you.",
    supportingText:
      'Focus on your own journey, learn from your mistakes, and try to become a little better than you were yesterday.',
  },
};

export const ABOUT_MARKDOWN_LINES: readonly string[] = [
  `# ${SITE_IDENTITY.fullName} (${SITE_IDENTITY.initials}) — About`,
  `> ${ABOUT_PAGE_DATA.subtitleTag}`,
  '',
  `## ${ABOUT_PAGE_DATA.personBehindCode.heading}`,
  ...ABOUT_PAGE_DATA.personBehindCode.paragraphs,
  '',
  `## ${ABOUT_PAGE_DATA.howItStarted.heading}`,
  ...ABOUT_PAGE_DATA.howItStarted.paragraphs,
  '',
  '### Timeline',
  ...ABOUT_PAGE_DATA.howItStarted.timeline.map(
    (item) => `${item.step}. **${item.stage}** — ${item.summary}`
  ),
  '',
  `## ${ABOUT_PAGE_DATA.beyondTechnology.heading}`,
  ...ABOUT_PAGE_DATA.beyondTechnology.paragraphs,
  `- **Interests:** ${ABOUT_PAGE_DATA.beyondTechnology.hobbies.join(' · ')}`,
  '',
  `## ${ABOUT_PAGE_DATA.whereHeading.heading}`,
  ...ABOUT_PAGE_DATA.whereHeading.paragraphs,
  '',
  `## ${ABOUT_PAGE_DATA.beliefSection.heading}`,
  ...ABOUT_PAGE_DATA.beliefSection.leadParagraphs,
  `> "${ABOUT_PAGE_DATA.beliefSection.quote}"`,
  ABOUT_PAGE_DATA.beliefSection.supportingText,
];
