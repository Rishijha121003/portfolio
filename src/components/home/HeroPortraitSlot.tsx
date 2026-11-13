import {
  ParticlePortraitCanvas,
  type ParticlePortraitVariant,
} from '@/components/home/ParticlePortraitCanvas';
import { VERIFIED_IMAGES } from '@/data/portfolio';
import styles from './HeroPortraitSlot.module.css';

interface HeroPortraitSlotProps {
  animated?: boolean;
  variant?: ParticlePortraitVariant;
  className?: string;
}

/**
 * Replaceable hero layer rendering the monochrome particle portrait derived from Rishi's verified reference.
 */
export function HeroPortraitSlot({
  animated = true,
  variant = 'editorial',
  className,
}: HeroPortraitSlotProps = {}) {
  const combinedClassName = [
    styles.slot,
    variant === 'desktopHero' ? styles.desktopHeroSlot : undefined,
    variant === 'terminal' ? styles.terminalSlot : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const vignetteClass =
    variant === 'desktopHero'
      ? styles.vignetteDesktopHero
      : variant === 'terminal'
        ? styles.vignetteTerminal
        : styles.vignette;

  return (
    <div className={combinedClassName} aria-hidden="true">
      <ParticlePortraitCanvas
        src={VERIFIED_IMAGES.rishiParticleSource.src}
        animated={animated}
        variant={variant}
      />
      <div className={vignetteClass} />
    </div>
  );
}
