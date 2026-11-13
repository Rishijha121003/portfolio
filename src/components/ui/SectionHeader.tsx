import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow: string;
  headingLead: string;
  headingAccent?: string;
  headingId?: string;
  as?: 'h1' | 'h2';
  size?: 'section' | 'page';
  subtitle?: string;
}

/**
 * Reusable monochrome editorial header pairing technical index eyebrow with condensed display typography.
 */
export function SectionHeader({
  eyebrow,
  headingLead,
  headingAccent,
  headingId,
  as = 'h2',
  size = 'section',
  subtitle,
}: SectionHeaderProps) {
  const HeadingTag = as;
  const headingClassName =
    size === 'page'
      ? `${styles.heading} ${styles.sizePage}`
      : `${styles.heading} ${styles.sizeSection}`;

  return (
    <div className={styles.header}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <HeadingTag id={headingId} className={headingClassName}>
        {headingLead}
        {headingAccent ? (
          <>
            {' '}
            <span className={styles.accent}>{headingAccent}</span>
          </>
        ) : null}
      </HeadingTag>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  );
}
