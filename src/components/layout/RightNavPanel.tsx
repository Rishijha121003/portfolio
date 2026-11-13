'use client';

import type { RefObject } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ContactChannelIcon } from '@/components/ui/PortfolioIcons';
import {
  NAV_SOCIAL_PLACEHOLDERS,
  PRIMARY_ROUTES,
  SITE_IDENTITY,
} from '@/data/portfolio';
import styles from './RightNavPanel.module.css';

interface RightNavPanelProps {
  isDesktopCollapsed: boolean;
  isMobileOpen: boolean;
  onClosePanel: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}

function isRouteActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (href === '/projects') {
    return pathname === '/projects' || pathname.startsWith('/projects/');
  }
  return pathname === href;
}

/**
 * Fixed right-side rectangular control panel with indexed App Router navigation and non-interactive pending slots.
 */
export function RightNavPanel({
  isDesktopCollapsed,
  isMobileOpen,
  onClosePanel,
  closeButtonRef,
}: RightNavPanelProps) {
  const pathname = usePathname();
  const activeRoute =
    PRIMARY_ROUTES.find((route) => isRouteActive(pathname, route.href)) ??
    PRIMARY_ROUTES[0];

  const panelClasses = [styles.panel];
  if (isDesktopCollapsed) panelClasses.push(styles.panelClosedDesktop);
  if (isMobileOpen) panelClasses.push(styles.panelOpenMobile);

  return (
    <>
      <div
        className={
          isMobileOpen
            ? `${styles.backdrop} ${styles.backdropVisible}`
            : styles.backdrop
        }
        aria-hidden="true"
        onClick={onClosePanel}
      />

      <aside
        id="site-navigation-panel"
        className={panelClasses.join(' ')}
        aria-label="Primary Site Control Panel"
      >
        <div className={styles.panelTop}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleBlock}>
              <span className={styles.panelTitle}>Menu</span>
              <span className={styles.panelSubtitle}>Navigation // 01–06</span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              aria-label="Collapse navigation panel"
              onClick={onClosePanel}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Primary pages">
            <ul className={styles.navList}>
              {PRIMARY_ROUTES.map((item) => {
                const exactMatch = pathname === item.href;
                const activeMatch = isRouteActive(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={exactMatch ? 'page' : undefined}
                      className={
                        activeMatch
                          ? `${styles.navLink} ${styles.navLinkActive}`
                          : styles.navLink
                      }
                      onClick={() => {
                        if (isMobileOpen) {
                          onClosePanel();
                        }
                      }}
                    >
                      <span className={styles.linkLeft}>
                        <span className={styles.linkIndex}>[{item.index}]</span>
                        <span>{item.label}</span>
                      </span>
                      <span className={styles.indicatorShape} aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className={styles.panelBottom}>
          <div className={styles.statusBox}>
            <span className={styles.statusHeading}>Status // Placeholder</span>
            <span className={styles.statusText}>
              {SITE_IDENTITY.availabilityPlaceholder}
            </span>
          </div>

          <div
            className={styles.disabledRow}
            aria-disabled="true"
            title="Resume PDF pending verification"
          >
            <span className={styles.disabledRowLeft}>
              <ContactChannelIcon icon="resume" />
              <span>Resume</span>
            </span>
            <span className={styles.disabledBadge}>Pending</span>
          </div>

          <div className={styles.socialGrid} aria-label="Social links pending verification">
            {NAV_SOCIAL_PLACEHOLDERS.map((social) => (
              <div
                key={social.label}
                className={styles.socialTile}
                aria-disabled="true"
                title={`${social.label}: ${social.statusLabel}`}
              >
                <ContactChannelIcon icon={social.icon} />
                <span>{social.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.panelFooterMeta}>
            <span>
              [{activeRoute?.index ?? '01'}] {activeRoute?.breadcrumbLabel ?? 'HOME'}
            </span>
            <span>{SITE_IDENTITY.initials}</span>
          </div>
        </div>
      </aside>
    </>
  );
}

