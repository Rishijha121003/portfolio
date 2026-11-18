import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { FOOTER_STATUS_TEXT, SITE_IDENTITY } from '@/data/portfolio';
import styles from './SiteFooter.module.css';

/**
 * Reusable static monochrome footer kept as a React Server Component in normal document flow.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.left}>
            <span className={styles.footerLogoMark} aria-hidden="true">
              <Image
                src="/images/rj-black.svg"
                alt="RJ Monogram"
                width={15}
                height={15}
                className={styles.footerLogoImg}
              />
            </span>
            <span className={styles.brandInitials}>{SITE_IDENTITY.initials}</span>
            <span className={styles.slash} aria-hidden="true">/</span>
            <span>{SITE_IDENTITY.fullName}</span>
          </div>

          <div className={styles.right}>
            <span className={styles.marker} aria-hidden="true" />
            <span>{FOOTER_STATUS_TEXT}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
