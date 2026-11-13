import type { ContactPageData } from '@/types/portfolio';
import { VERIFIED_IMAGES } from '@/data/content/shared';

export const CONTACT_PAGE_DATA: ContactPageData = {
  eyebrow: '06 // CONTACT',
  pathLabel: '~/contact/',
  headingLead: "Let's",
  headingAccent: "Let's Connect",
  intro:
    "Have a question, an opportunity, or an idea you'd like to discuss? I'd be happy to connect. Feel free to reach out through email or connect with me on my social profiles.",
  availabilityNote: 'Open to Learning, Collaboration & Opportunities',
  verificationNotice:
    'Contact form composes a pre-filled draft in your email client (direct backend delivery not configured).',
  recipientEmail: 'rishijha130@gmail.com',
  backdropImage: VERIFIED_IMAGES.contactBg,
  channels: [
    {
      label: 'Email',
      statusLabel: 'rishijha130@gmail.com',
      href: 'mailto:rishijha130@gmail.com',
      external: false,
      icon: 'email',
    },
    {
      label: 'LinkedIn',
      statusLabel: 'https://www.linkedin.com/in/rishijha121003/',
      href: 'https://www.linkedin.com/in/rishijha121003/',
      external: true,
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      statusLabel: 'https://github.com/Rishijha121003',
      href: 'https://github.com/Rishijha121003',
      external: true,
      icon: 'github',
    },
  ],
};

export const CONTACT_MARKDOWN_LINES: readonly string[] = [
  `# ${CONTACT_PAGE_DATA.headingAccent} — ${CONTACT_PAGE_DATA.pathLabel}`,
  `> ${CONTACT_PAGE_DATA.availabilityNote}`,
  '',
  CONTACT_PAGE_DATA.intro,
  '',
  '## Direct Channels',
  ...CONTACT_PAGE_DATA.channels.map(
    (c) => `- **${c.label}**: ${c.statusLabel}`
  ),
  '',
  `_${CONTACT_PAGE_DATA.verificationNotice}_`,
];
