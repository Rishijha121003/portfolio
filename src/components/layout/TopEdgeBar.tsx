'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { PRIMARY_ROUTES, SITE_IDENTITY } from '@/data/portfolio';
import styles from './TopEdgeBar.module.css';

interface TopEdgeBarProps {
  onEnterOs?: () => void;
}

function isRouteActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (href === '/projects') {
    return pathname === '/projects' || pathname.startsWith('/projects/');
  }
  return pathname === href;
}

/**
 * Modern floating glass upper navigation bar with high-impact micro-interactions,
 * active indicator pills, RISHI OS system switch, and responsive mobile dropdown.
 */
export function TopEdgeBar({ onEnterOs }: TopEdgeBarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Sync state when pathname changes during navigation (React recommended pattern)
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
          {/* Brand Mark Left */}
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
                alt="RJ Monogram Logo"
                width={22}
                height={22}
                priority
                className={styles.brandLogoImg}
              />
            </span>
            <div className={styles.brandInfo}>
              <span className={styles.brandName}>RISHI JHA</span>
              <span className={styles.brandSub}>FULL STACK</span>
            </div>
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

          {/* Right Action Group */}
          <div className={styles.rightGroup}>
            {onEnterOs ? (
              <button
                type="button"
                className={styles.osSwitchButton}
                onClick={onEnterOs}
                title="Switch to RISHI OS simulated desktop environment"
              >
                <span className={styles.osPulseDot} aria-hidden="true" />
                <span className={styles.osBtnText}>RISHI OS</span>
                <span className={styles.osBadge} aria-hidden="true">
                  v1.0
                </span>
              </button>
            ) : null}

            {/* Mobile upper nav menu toggle */}
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
              <span className={styles.menuButtonLabel}>
                {mobileMenuOpen ? 'Close' : 'Menu'}
              </span>
              {mobileMenuOpen ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Upper Nav Dropdown Menu */}
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
                          <span className={styles.mobileNavLeft}>
                            <span className={styles.mobileNavIndex}>
                              [{route.index}]
                            </span>
                            <span className={styles.mobileNavLabel}>
                              {route.label}
                            </span>
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
                </ul>
              </nav>
            </Container>
          </div>
        </>
      ) : null}
    </header>
  );
}
