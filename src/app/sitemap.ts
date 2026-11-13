import type { MetadataRoute } from 'next';
import { PROJECT_RECORDS } from '@/data/portfolio';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.rishijhadev.me';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/projects',
    ...PROJECT_RECORDS.map((p) => p.route),
    '/journey',
    '/skills',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route || '/'}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : route === '/projects/dormiq' ? 0.9 : 0.8,
  }));
}

