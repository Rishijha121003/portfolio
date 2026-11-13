'use client';

import type { RefObject } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { PRIMARY_ROUTES, PROJECT_RECORDS, SITE_IDENTITY } from '@/data/portfolio';
import styles from './TopEdgeBar.module.css';

interface TopEdgeBarProps {
  isCollapsedDesktop?: boolean;
  isPanelExpanded: boolean;
  onOpenPanel: () => void;
  openButtonRef: RefObject<HTMLButtonElement | null>;
  onEnterOs?: () => void;
}

function isRouteActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (href === '/projects') {
    return pathname === '/projects' || pathname.startsWith('/projects/');
  }
  return pathname === href;
}

function getBreadcrumbLabel(pathname: string): string {
  if (pathname === '/') return 'HOME';

  const primary = PRIMARY_ROUTES.find((route) => route.href === pathname);
  if (primary) return `HOME / ${primary.breadcrumbLabel}`;

  if (pathname.startsWith('/projects/')) {
    const slug = pathname.replace('/projects/', '');
    const project = PROJECT_RECORDS.find((p) => p.slug === slug);
    const label = project ? project.title.toUpperCase() : slug.toUpperCase();
    return `HOME / PROJECTS / ${label}`;
  }

  return 'HOME / 404';
}

/**
 * Modern top navigation bar displaying brand identifier, top-level route links, RISHI OS switch, and mobile menu trigger.
 */
export function TopEdgeBar({
  isPanelExpanded,
  onOpenPanel,
  openButtonRef,
  onEnterOs,
}: TopEdgeBarProps) {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumbLabel(pathname);

  return (
    <header className={styles.bar}>
      <Container>
        <div className={styles.inner}>
          <Link
            href="/"
            className={styles.brand}
            aria-label={`${SITE_IDENTITY.fullName} Home`}
            title={`${SITE_IDENTITY.fullName} Home`}
          >
            <span className={styles.brandMark}>
              <Image
                src="/images/rj-standalone.svg"
                alt="RJ Monogram Logo"
                width={24}
                height={24}
                priority
                className={styles.brandLogoImg}
              />
            </span>
          </Link>

          {/* Desktop Navigation Links directly in the Top Navbar */}
          <nav className={styles.navBar} aria-label="Main Navigation">
            <ul className={styles.navList}>
              {PRIMARY_ROUTES.map((route) => {
                const active = isRouteActive(pathname, route.href);
                return (
                  <li key={route.href}>
                    <Link
                      href={route.href}
                      className={
                        active
                          ? `${styles.navLink} ${styles.navLinkActive}`
                          : styles.navLink
                      }
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className={styles.navIndex}>[{route.index}]</span>
                      <span className={styles.navLabel}>{route.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.rightGroup}>
            <span className={styles.breadcrumb} aria-label="Current route">
              {breadcrumb}
            </span>

            {onEnterOs ? (
              <button
                type="button"
                className={styles.osSwitchButton}
                onClick={onEnterOs}
                title="Switch back to RISHI OS desktop environment"
              >
                <span className={styles.osDot} aria-hidden="true" />
                <span>RISHI OS</span>
              </button>
            ) : null}

            <button
              ref={openButtonRef}
              type="button"
              className={styles.menuButton}
              aria-expanded={isPanelExpanded}
              aria-controls="site-navigation-panel"
              aria-label="Open navigation panel"
              onClick={onOpenPanel}
            >
              <span className={styles.menuButtonLabel}>Menu</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="2" y="3" width="12" height="1.8" rx="0.9" />
                <rect x="2" y="7.1" width="12" height="1.8" rx="0.9" />
                <rect x="2" y="11.2" width="12" height="1.8" rx="0.9" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
