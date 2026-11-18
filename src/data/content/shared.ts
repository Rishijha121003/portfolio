import type { VerifiedImageAsset, SiteIdentity } from '@/types/portfolio';

/**
 * Verified local assets physically present in /public/images.
 */
export const VERIFIED_IMAGES = {
  aboutBuilder: {
    src: '/images/about-builder.jpg',
    width: 1200,
    height: 896,
    alt: 'Developer workspace monitor setup',
  },
  dormiqPreview: {
    src: '/images/dormiq-preview.jpg',
    width: 896,
    height: 1200,
    alt: 'DormiQ project visual preview',
  },
  contactBg: {
    src: '/images/contact-bg.jpg',
    width: 1376,
    height: 768,
    alt: 'Atmospheric mountain ridge landscape',
  },
  heroWorkspace: {
    src: '/images/hero-workspace.jpg',
    width: 1200,
    height: 896,
    alt: 'Monochrome desk setup with RJ display',
  },
  rishiParticleSource: {
    src: '/images/rishi-particle-source.png',
    width: 400,
    height: 400,
    alt: 'Monochrome portrait source map for particle skeleton',
  },
} as const satisfies Record<string, VerifiedImageAsset>;

export const SITE_IDENTITY: SiteIdentity = {
  initials: 'RJ',
  firstName: 'RISHI',
  lastName: 'JHA',
  fullName: 'Rishi Jha',
  rolePlaceholder: 'Backend-Focused Full Stack Developer',
  availabilityPlaceholder: 'Open to backend & full-stack opportunities',
  portraitNote: 'Awaiting clean solo portrait',
};

