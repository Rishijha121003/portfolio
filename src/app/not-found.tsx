import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './not-found.module.css';

/**
 * Custom monochrome 404 window card inside the RISHI OS desktop environment.
 */
export default function NotFound() {
  return (
    <section className={styles.section} aria-labelledby="not-found-heading">
      <div className={styles.titleBar}>
        <span className={styles.dot} aria-hidden="true" />
        <span>404 — Route Not Found :: /dev/null</span>
      </div>

      <div className={styles.frame}>
        <SectionHeader
          eyebrow="404 // NOT FOUND"
          headingLead="Route"
          headingAccent="Not Found."
          headingId="not-found-heading"
          as="h1"
          size="page"
        />

        <p className={styles.description}>
          The requested path does not match an available route or virtual window in
          RISHI OS. Return to the Home welcome workspace or open Projects.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.primaryLink}>
            <span>Return Home</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/projects" className={styles.secondaryLink}>
            <span>Open Projects</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
