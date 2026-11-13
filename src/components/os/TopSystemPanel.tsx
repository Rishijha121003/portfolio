'use client';

import React from 'react';
import { useDesktop } from '@/components/os/DesktopContext';
import { RishiOsBrandIcon } from '@/components/os/OsIcons';
import { useOsClock } from '@/components/os/useOsClock';
import { getProjectBySlug } from '@/data/portfolio';
import { OS_APPS, PHASE1_VISIBLE_APPS } from '@/data/rishiOs';
import styles from './TopSystemPanel.module.css';

/**
 * Slim Linux Soft UI system top panel with Global Search trigger, workspace indicator,
 * notification bell, clock, and Quick Settings control.
 */
export function TopSystemPanel() {
  const {
    windows,
    activeAppId,
    projectsSubView,
    launcherOpen,
    setLauncherOpen,
    notificationCenterOpen,
    setNotificationCenterOpen,
    unreadNotificationsCount,
    quickSettingsOpen,
    setQuickSettingsOpen,
    simulatedSoundMuted,
    showDesktop,
    resetWindows,
    isMobile,
  } = useDesktop();

  const clock = useOsClock();

  const openCount = PHASE1_VISIBLE_APPS.filter((id) => windows[id].isOpen).length;
  const activeConfig = activeAppId ? OS_APPS[activeAppId] : null;
  const activeProjectDetail =
    activeAppId === 'projects' && projectsSubView !== 'directory'
      ? getProjectBySlug(projectsSubView)
      : undefined;
  const centerTitle =
    activeProjectDetail?.title ?? activeConfig?.shortLabel ?? 'Desktop';

  return (
    <header
      className={styles.panel}
      data-os-chrome="true"
      aria-label="RISHI OS System Panel"
    >
      <div className={styles.leftGroup}>
        <button
          type="button"
          className={styles.brandButton}
          aria-expanded={launcherOpen}
          aria-label="RISHI OS Applications and Global Search (Ctrl+K)"
          title="Applications &amp; Global Search (Ctrl+K)"
          onClick={() => {
            setQuickSettingsOpen(false);
            setNotificationCenterOpen(false);
            setLauncherOpen(!launcherOpen);
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
              setQuickSettingsOpen(false);
              setNotificationCenterOpen(false);
              setLauncherOpen(!launcherOpen);
            }}
            aria-label="Quick open applications"
            title="Open Applications &amp; Global Search (Ctrl+K)"
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
            setQuickSettingsOpen(false);
            setNotificationCenterOpen(false);
            setLauncherOpen(true);
          }}
          aria-label={`Global search (Active: ${centerTitle})`}
          title="Search applications, projects, files &amp; commands (Ctrl+K)"
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

        {/* Notification Bell */}
        <button
          type="button"
          className={styles.notificationBtn}
          onClick={() => {
            setQuickSettingsOpen(false);
            setNotificationCenterOpen(!notificationCenterOpen);
          }}
          aria-expanded={notificationCenterOpen}
          aria-label={`Notification Center (${unreadNotificationsCount} unread)`}
          title="Notification Center"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadNotificationsCount > 0 ? (
            <span className={styles.notifBadge}>
              {unreadNotificationsCount}
            </span>
          ) : null}
        </button>

        <time
          className={styles.clock}
          dateTime={clock.compactDateTime}
          suppressHydrationWarning
        >
          {clock.compactDateTime}
        </time>

        {/* Quick Settings & Session Trigger */}
        <button
          type="button"
          className={styles.quickSettingsTrigger}
          aria-expanded={quickSettingsOpen}
          aria-controls="rishi-os-quick-settings"
          aria-label="Quick Settings &amp; System Control"
          title="Quick Settings &amp; System Control"
          onClick={() => {
            setNotificationCenterOpen(false);
            setQuickSettingsOpen(!quickSettingsOpen);
          }}
        >
          <span className={styles.quickSettingsSoundIcon} aria-hidden="true">
            {simulatedSoundMuted ? '🔇' : '🔊'}
          </span>
          <span className={styles.avatarRing}>
            <RishiOsBrandIcon size={16} variant="standalone" />
            <span className={styles.avatarOnlineDot} aria-hidden="true" />
          </span>
          <span className={styles.chevron} aria-hidden="true">
            ⌄
          </span>
        </button>
      </div>
    </header>
  );
}
