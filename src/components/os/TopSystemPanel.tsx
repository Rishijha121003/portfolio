'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDesktop } from '@/components/os/DesktopContext';
import { LogOutIcon, OsAppIcon, RishiOsBrandIcon } from '@/components/os/OsIcons';
import { useOsClock } from '@/components/os/useOsClock';
import { getProjectBySlug, SITE_IDENTITY } from '@/data/portfolio';
import type { OsAppId } from '@/data/rishiOs';
import { getWallpaperConfig, OS_APPS, PHASE1_VISIBLE_APPS } from '@/data/rishiOs';
import styles from './TopSystemPanel.module.css';

interface LauncherCategory {
  id: string;
  label: string;
  apps: readonly OsAppId[];
  includeSettings?: boolean;
}

const LAUNCHER_CATEGORIES: readonly LauncherCategory[] = [
  { id: 'workspace', label: 'Core Workspace', apps: ['home', 'files', 'terminal'] },
  {
    id: 'portfolio',
    label: 'Portfolio Applications',
    apps: ['projects', 'about', 'journey', 'skills', 'contact'],
  },
  { id: 'system', label: 'System', apps: [], includeSettings: true },
];

/**
 * Slim Linux Soft UI system top panel with searchable categorized Applications launcher, active app indicator, clock, and working System menu.
 */
export function TopSystemPanel() {
  const {
    windows,
    activeAppId,
    projectsSubView,
    launcherOpen,
    setLauncherOpen,
    openApp,
    openLogoutDialog,
    openSettings,
    wallpaperId,
    skipToPortfolio,
    showDesktop,
    resetWindows,
    isMobile,
  } = useDesktop();

  const [systemMenuOpen, setSystemMenuOpen] = useState(false);
  const [launcherSearch, setLauncherSearch] = useState('');
  const launcherBtnRef = useRef<HTMLButtonElement | null>(null);
  const systemBtnRef = useRef<HTMLButtonElement | null>(null);
  const launcherNavRef = useRef<HTMLElement | null>(null);
  const systemNavRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const clock = useOsClock();

  useEffect(() => {
    const onGlobalShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSystemMenuOpen(false);
        setLauncherOpen(!launcherOpen);
        if (launcherOpen) {
          setLauncherSearch('');
        }
      }
    };

    window.addEventListener('keydown', onGlobalShortcut);
    return () => window.removeEventListener('keydown', onGlobalShortcut);
  }, [launcherOpen, setLauncherOpen]);

  useEffect(() => {
    if (!launcherOpen) return;
    searchInputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setLauncherOpen(false);
        setLauncherSearch('');
        launcherBtnRef.current?.focus();
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const navEl = launcherNavRef.current;
        if (!navEl) return;
        const buttons = Array.from(navEl.querySelectorAll('button'));
        if (buttons.length === 0) return;
        event.preventDefault();
        const activeIdx = buttons.indexOf(
          document.activeElement as HTMLButtonElement
        );
        const nextIdx =
          event.key === 'ArrowDown'
            ? (activeIdx + 1) % buttons.length
            : (activeIdx - 1 + buttons.length) % buttons.length;
        buttons[nextIdx]?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [launcherOpen, setLauncherOpen]);

  useEffect(() => {
    if (!systemMenuOpen) return;

    const firstBtn = systemNavRef.current?.querySelector('button');
    firstBtn?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSystemMenuOpen(false);
        systemBtnRef.current?.focus();
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const navEl = systemNavRef.current;
        if (!navEl) return;
        const buttons = Array.from(navEl.querySelectorAll('button'));
        if (buttons.length === 0) return;
        event.preventDefault();
        const activeIdx = buttons.indexOf(
          document.activeElement as HTMLButtonElement
        );
        const nextIdx =
          event.key === 'ArrowDown'
            ? (activeIdx + 1) % buttons.length
            : (activeIdx - 1 + buttons.length) % buttons.length;
        buttons[nextIdx]?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [systemMenuOpen]);

  const normalizedQuery = launcherSearch.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return LAUNCHER_CATEGORIES.map((category) => {
      const matchedApps = category.apps.filter((id) => {
        if (!normalizedQuery) return true;
        const app = OS_APPS[id];
        return (
          app.shortLabel.toLowerCase().includes(normalizedQuery) ||
          app.pathLabel.toLowerCase().includes(normalizedQuery) ||
          app.description.toLowerCase().includes(normalizedQuery) ||
          category.label.toLowerCase().includes(normalizedQuery)
        );
      });

      const showSettings =
        Boolean(category.includeSettings) &&
        (!normalizedQuery ||
          'settings'.includes(normalizedQuery) ||
          'appearance'.includes(normalizedQuery) ||
          'system'.includes(normalizedQuery));

      return {
        ...category,
        matchedApps,
        showSettings,
      };
    }).filter((cat) => cat.matchedApps.length > 0 || cat.showSettings);
  }, [normalizedQuery]);

  const openCount = PHASE1_VISIBLE_APPS.filter((id) => windows[id].isOpen).length;
  const activeConfig = activeAppId ? OS_APPS[activeAppId] : null;
  const activeProjectDetail =
    activeAppId === 'projects' && projectsSubView !== 'directory'
      ? getProjectBySlug(projectsSubView)
      : undefined;
  const centerTitle =
    activeProjectDetail?.title ?? activeConfig?.shortLabel ?? 'Desktop';

  const closeLauncherClean = () => {
    setLauncherOpen(false);
    setLauncherSearch('');
  };

  return (
    <>
      <header
        className={styles.panel}
        data-os-chrome="true"
        aria-label="RISHI OS System Panel"
      >
        <div className={styles.leftGroup}>
          <button
            ref={launcherBtnRef}
            type="button"
            className={styles.brandButton}
            aria-expanded={launcherOpen}
            aria-controls="rishi-os-launcher"
            aria-label="RISHI OS Applications Launcher"
            onClick={() => {
              setSystemMenuOpen(false);
              if (launcherOpen) closeLauncherClean();
              else setLauncherOpen(true);
            }}
          >
            <RishiOsBrandIcon size={21} className={styles.brandEmblem} />
            <span className={styles.brandWordmark}>RISHI OS</span>
          </button>

          <span className={styles.navDivider} aria-hidden="true" />

          <div className={styles.workspaceCluster} aria-label="Workspace indicator">
            <span className={styles.wsPillActive} title="Workspace 01 Active">
              1
            </span>
            {!isMobile ? (
              <button
                type="button"
                className={styles.wsPillCount}
                onClick={resetWindows}
                title={`Cascade ${openCount} open window${openCount === 1 ? '' : 's'}`}
                aria-label={`Cascade open windows (${openCount} open)`}
              >
                {openCount}
              </button>
            ) : null}
            <button
              type="button"
              className={styles.wsAddBtn}
              onClick={() => {
                setSystemMenuOpen(false);
                if (launcherOpen) closeLauncherClean();
                else setLauncherOpen(true);
              }}
              aria-label="Quick open applications"
              title="Open Applications (Ctrl+K)"
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.centerGroup}>
          <button
            type="button"
            className={styles.searchPillBtn}
            onClick={() => {
              setSystemMenuOpen(false);
              setLauncherOpen(true);
            }}
            aria-label={`Search applications (Active: ${centerTitle})`}
            title="Search applications & commands (Ctrl+K)"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.searchIcon}
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className={styles.searchPlaceholder}>
              {activeAppId ? `${centerTitle} · Search apps...` : 'Search anything...'}
            </span>
            <kbd className={styles.kbdHint}>Ctrl + K</kbd>
          </button>
        </div>

        <div className={styles.rightGroup}>
          {!isMobile ? (
            <button
              type="button"
              className={styles.desktopUtilityBtn}
              onClick={showDesktop}
              title="Show Desktop (Minimize all windows)"
              aria-label="Show Desktop"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M8 20h8M12 18v2" />
              </svg>
            </button>
          ) : null}

          <time className={styles.clock} dateTime={clock.compactDateTime} suppressHydrationWarning>
            {clock.compactDateTime}
          </time>

          <button
            ref={systemBtnRef}
            type="button"
            className={styles.systemMenuTrigger}
            aria-expanded={systemMenuOpen}
            aria-controls="rishi-os-system-menu"
            aria-label="System menu"
            onClick={() => {
              closeLauncherClean();
              setSystemMenuOpen((prev) => !prev);
            }}
          >
            <span className={styles.avatarRing}>
              <RishiOsBrandIcon size={16} variant="standalone" />
              <span className={styles.avatarOnlineDot} aria-hidden="true" />
            </span>
            <span className={styles.chevron} aria-hidden="true">⌄</span>
          </button>
        </div>
      </header>

      {launcherOpen ? (
        <>
          <div
            className={styles.launcherBackdrop}
            aria-hidden="true"
            onClick={closeLauncherClean}
          />
          <nav
            id="rishi-os-launcher"
            ref={launcherNavRef}
            className={styles.launcherPopover}
            data-os-chrome="true"
            aria-label="RISHI OS Application Launcher"
          >
            <div className={styles.launcherHeader}>
              <span className={styles.launcherTitle}>Applications</span>
              <span className={styles.launcherSubtitle}>~/portfolio</span>
            </div>

            <div className={styles.launcherSearchBox}>
              <input
                ref={searchInputRef}
                type="search"
                value={launcherSearch}
                onChange={(e) => setLauncherSearch(e.target.value)}
                placeholder="Search applications..."
                aria-label="Search applications"
                className={styles.launcherSearchInput}
              />
            </div>

            <div className={styles.launcherScrollArea}>
              {filteredCategories.length === 0 ? (
                <div className={styles.launcherEmpty}>
                  {`No applications matching "${launcherSearch}".`}
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.id} className={styles.launcherGroup}>
                    <span className={styles.launcherGroupLabel}>
                      {category.label}
                    </span>

                    <ul className={styles.launcherList}>
                      {category.matchedApps.map((id) => {
                        const app = OS_APPS[id];
                        const win = windows[id];
                        const isActive = activeAppId === id && !win.isMinimized;

                        return (
                          <li key={id}>
                            <button
                              type="button"
                              className={styles.launcherItemBtn}
                              onClick={() => {
                                closeLauncherClean();
                                openApp(id);
                              }}
                            >
                              <span className={styles.launcherItemLeft}>
                                <span className={styles.launcherIconBox}>
                                  <OsAppIcon appId={id} size={16} />
                                </span>
                                <span className={styles.launcherItemText}>
                                  <span className={styles.launcherItemName}>
                                    {app.shortLabel}
                                  </span>
                                  <span className={styles.launcherItemDesc}>
                                    {app.pathLabel} — {app.description}
                                  </span>
                                </span>
                              </span>

                              {isActive ? (
                                <span className={styles.launcherItemStatus}>
                                  ACTIVE
                                </span>
                              ) : win.isOpen ? (
                                <span className={styles.launcherItemStatus}>
                                  {win.isMinimized ? 'MIN' : 'OPEN'}
                                </span>
                              ) : null}
                            </button>
                          </li>
                        );
                      })}

                      {category.showSettings ? (
                        <li>
                          <button
                            type="button"
                            className={styles.launcherItemBtn}
                            onClick={() => {
                              closeLauncherClean();
                              openSettings('appearance');
                            }}
                          >
                            <span className={styles.launcherItemLeft}>
                              <span className={styles.launcherIconBox}>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <circle cx="12" cy="12" r="3" />
                                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.77 1 1.42 1.09H21a2 2 0 0 1 0 4h-.09c-.65.09-1.16.49-1.51 1Z" />
                                </svg>
                              </span>
                              <span className={styles.launcherItemText}>
                                <span className={styles.launcherItemName}>Settings</span>
                                <span className={styles.launcherItemDesc}>
                                  ~/system — Appearance &amp; RISHI OS workspace info
                                </span>
                              </span>
                            </span>
                          </button>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                ))
              )}
            </div>

            <div className={styles.launcherFooter}>
              <button
                type="button"
                className={styles.launcherFooterBtn}
                onClick={() => {
                  closeLauncherClean();
                  showDesktop();
                  launcherBtnRef.current?.focus();
                }}
              >
                Desktop
              </button>
              <button
                type="button"
                className={styles.launcherFooterBtn}
                onClick={() => {
                  closeLauncherClean();
                  resetWindows();
                }}
              >
                Reset
              </button>
              <button
                type="button"
                className={`${styles.launcherFooterBtn} ${styles.logoutFooterBtn}`}
                onClick={() => {
                  closeLauncherClean();
                  openLogoutDialog();
                }}
              >
                Log Out
              </button>
            </div>
          </nav>
        </>
      ) : null}

      {systemMenuOpen ? (
        <>
          <div
            className={styles.launcherBackdrop}
            aria-hidden="true"
            onClick={() => setSystemMenuOpen(false)}
          />
          <nav
            id="rishi-os-system-menu"
            ref={systemNavRef}
            className={styles.systemPopover}
            data-os-chrome="true"
            aria-label="RISHI OS System Menu"
          >
            <div className={styles.launcherHeader}>
              <span className={styles.launcherTitle}>System Session</span>
              <span className={styles.launcherSubtitle}>{SITE_IDENTITY.fullName}</span>
            </div>

            <div className={styles.systemList}>
              <button
                type="button"
                className={styles.systemItemBtn}
                onClick={() => {
                  setSystemMenuOpen(false);
                  openSettings('appearance');
                }}
              >
                <span>Appearance · Wallpaper</span>
                <span className={styles.systemBadge}>
                  {getWallpaperConfig(wallpaperId).shortName}
                </span>
              </button>

              <button
                type="button"
                className={styles.systemItemBtn}
                onClick={() => {
                  setSystemMenuOpen(false);
                  openSettings('system');
                }}
              >
                <span>About RISHI OS</span>
                <span className={styles.systemMeta}>Info</span>
              </button>

              <button
                type="button"
                className={styles.systemItemBtn}
                onClick={() => {
                  setSystemMenuOpen(false);
                  skipToPortfolio();
                }}
              >
                <span>Switch to Portfolio</span>
                <span className={styles.systemMeta}>↗</span>
              </button>

              <div className={styles.systemDivider} aria-hidden="true" />

              <button
                type="button"
                className={`${styles.systemItemBtn} ${styles.systemLogoutBtn}`}
                onClick={() => {
                  setSystemMenuOpen(false);
                  openLogoutDialog();
                }}
              >
                <span>Log Out</span>
                <LogOutIcon size={14} />
              </button>
            </div>
          </nav>
        </>
      ) : null}
    </>
  );
}
