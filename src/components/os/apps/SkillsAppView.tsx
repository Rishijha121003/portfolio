import { SkillsManifest } from '@/components/portfolio/SkillsManifest';

/**
 * Window adapter reusing the shared Skills specification manifest without duplication.
 */
export function SkillsAppView() {
  return <SkillsManifest embedded />;
}
