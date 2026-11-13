import styles from './MonochromeMediaPlaceholder.module.css';

export type PlaceholderAspect = 'portrait' | 'landscape' | 'wide' | 'square';
export type PlaceholderVariant = 'portrait' | 'schematic' | 'frame';

interface MonochromeMediaPlaceholderProps {
  label: string;
  caption?: string;
  statusTag?: string;
  aspect?: PlaceholderAspect;
  variant?: PlaceholderVariant;
  className?: string;
}

const ASPECT_CLASS_MAP: Record<PlaceholderAspect, string | undefined> = {
  portrait: styles.aspectPortrait,
  landscape: styles.aspectLandscape,
  wide: styles.aspectWide,
  square: styles.aspectSquare,
};

/**
 * Reusable monochrome placeholder frame for missing portrait or diagram assets.
 */
export function MonochromeMediaPlaceholder({
  label,
  caption,
  statusTag = 'PLACEHOLDER',
  aspect = 'landscape',
  variant = 'frame',
  className,
}: MonochromeMediaPlaceholderProps) {
  const combinedClassName = [styles.frame, ASPECT_CLASS_MAP[aspect], className]
    .filter(Boolean)
    .join(' ');

  const accessibleLabel = caption ? `${label}: ${caption}` : label;

  return (
    <div
      className={combinedClassName}
      role="img"
      aria-label={accessibleLabel}
    >
      <div className={styles.metaRow} aria-hidden="true">
        <span>{label}</span>
        <span className={styles.statusTag}>{statusTag}</span>
      </div>

      <div className={styles.visualStage} aria-hidden="true">
        {variant === 'portrait' ? (
          <svg className={styles.graphic} viewBox="0 0 220 220" fill="none">
            <circle
              cx="110"
              cy="110"
              r="90"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 6"
              opacity="0.5"
            />
            <line x1="110" y1="10" x2="110" y2="210" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
            <line x1="10" y1="110" x2="210" y2="110" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
            <circle cx="110" cy="84" r="24" stroke="currentColor" strokeWidth="1.25" />
            <path d="M68 164C74 136 90 124 110 124C130 124 146 136 152 164" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        ) : variant === 'schematic' ? (
          <svg className={styles.graphic} viewBox="0 0 240 160" fill="none">
            <rect x="20" y="20" width="60" height="40" stroke="currentColor" strokeWidth="1.1" />
            <rect x="160" y="20" width="60" height="40" stroke="currentColor" strokeWidth="1.1" />
            <rect x="90" y="100" width="60" height="40" stroke="currentColor" strokeWidth="1.1" />
            <path d="M80 40H160" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
            <path d="M50 60V120H90" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <path d="M190 60V120H150" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </svg>
        ) : (
          <svg className={styles.graphic} viewBox="0 0 200 140" fill="none">
            <path d="M12 36V12H36" stroke="currentColor" strokeWidth="1.2" />
            <path d="M164 12H188V36" stroke="currentColor" strokeWidth="1.2" />
            <path d="M12 104V128H36" stroke="currentColor" strokeWidth="1.2" />
            <path d="M164 128H188V104" stroke="currentColor" strokeWidth="1.2" />
            <line x1="88" y1="70" x2="112" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.55" />
            <line x1="100" y1="58" x2="100" y2="82" stroke="currentColor" strokeWidth="1" opacity="0.55" />
          </svg>
        )}
      </div>

      {caption ? (
        <div className={styles.metaRow} aria-hidden="true">
          <span className={styles.caption}>{caption}</span>
        </div>
      ) : null}
    </div>
  );
}
