'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { PRIMARY_ROUTES, SITE_IDENTITY } from '@/data/portfolio';
import styles from './TopEdgeBar.module.css';

function isRouteActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (href === '/projects') {
    return pathname === '/projects' || pathname.startsWith('/projects/');
  }
  return pathname === href;
}

/**
 * Modern floating capsule navigation bar with refined typography,
 * smooth hover transitions, live status beacon, and RISHI OS launcher.
 */
export function TopEdgeBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Sync state when pathname changes during navigation
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Close on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className={styles.bar}>
      <Container>
        <div className={styles.inner}>
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className={styles.brand}
            aria-label={`${SITE_IDENTITY.fullName} Home`}
            title={`${SITE_IDENTITY.fullName} Home`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className={styles.brandMark}>
              <Image
                src="/images/rj-standalone.svg"
                alt="RJ Logo"
                width={20}
                height={20}
                priority
                className={styles.brandLogoImg}
              />
            </span>
            <div className={styles.brandTextGroup}>
              <span className={styles.brandName}>{SITE_IDENTITY.fullName}</span>
              <span className={styles.brandRole}>Full Stack Developer</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
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
                      <span>{route.label}</span>
                      {active ? (
                        <span className={styles.activePillDot} aria-hidden="true" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Group */}
          <div className={styles.rightGroup}>
            <div className={styles.availabilityPill} title="Available for opportunities">
              <span className={styles.liveBeacon} aria-hidden="true" />
              <span className={styles.availabilityText}>Available</span>
            </div>

            <Link
              href="/os"
              className={styles.osSwitchButton}
              title="Open RISHI OS simulated interactive workspace"
              aria-label="Open RISHI OS"
            >
              <span className={styles.osIcon} aria-hidden="true">
                ❖
              </span>
              <span>Open RISHI OS</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              ref={menuButtonRef}
              type="button"
              className={`${styles.menuButton} ${
                mobileMenuOpen ? styles.menuButtonActive : ''
              }`}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-dropdown"
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen ? (
        <>
          <div
            className={styles.mobileBackdrop}
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-nav-dropdown"
            className={styles.mobileDropdown}
            role="dialog"
            aria-label="Mobile Navigation Menu"
          >
            <Container>
              <nav aria-label="Mobile Navigation">
                <ul className={styles.mobileNavList}>
                  {PRIMARY_ROUTES.map((route) => {
                    const active = isRouteActive(pathname, route.href);
                    return (
                      <li key={route.href}>
                        <Link
                          href={route.href}
                          className={
                            active
                              ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}`
                              : styles.mobileNavLink
                          }
                          aria-current={active ? 'page' : undefined}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className={styles.mobileNavLabel}>
                            {route.label}
                          </span>
                          {active ? (
                            <span
                              className={styles.mobileActiveDot}
                              aria-hidden="true"
                            />
                          ) : (
                            <span className={styles.mobileNavArrow} aria-hidden="true">
                              →
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}

                  <li className={styles.mobileOsItem}>
                    <Link
                      href="/os"
                      className={styles.mobileOsBtn}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Open RISHI OS Workspace"
                    >
                      <span className={styles.mobileOsIcon} aria-hidden="true">
                        ❖
                      </span>
                      <span>Open RISHI OS Workspace</span>
                      <span className={styles.mobileNavArrow} aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </Container>
          </div>
        </>
      ) : null}
    </header>
  );
}
