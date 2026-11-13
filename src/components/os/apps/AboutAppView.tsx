import { AboutEditorial } from '@/components/about/AboutEditorial';

/**
 * Window adapter reusing the shared About editorial composition without duplication.
 */
export function AboutAppView() {
  return <AboutEditorial embedded />;
}
