'use client';

import React from 'react';
import { useDesktop } from './DesktopContext';
import { getThemeConfig } from '@/data/rishiThemes';
import { getWallpaperConfig } from '@/data/rishiOs';
import { useOsClock } from './useOsClock';
import styles from './QuickSettingsPanel.module.css';

export function QuickSettingsPanel() {
  const {
    quickSettingsOpen,
    setQuickSettingsOpen,
    themeId,
    themeMode,
    setThemeMode,
    resolvedAppearance,
    wallpaperId,
    simulatedBrightness,
    setSimulatedBrightness,
    simulatedSoundMuted,
    setSimulatedSoundMuted,
    unreadNotificationsCount,
    setNotificationCenterOpen,
    setShortcutsHelpOpen,
    openSettings,
    skipToPortfolio,
    openLogoutDialog,
  } = useDesktop();

  const clock = useOsClock();

  if (!quickSettingsOpen) return null;

  const currentTheme = getThemeConfig(themeId);
  const currentWallpaper = getWallpaperConfig(wallpaperId);

  return (
    <>
      <div
        className={styles.backdrop}
        aria-hidden="true"
        onClick={() => setQuickSettingsOpen(false)}
      />
      <section
        className={styles.panel}
        data-os-chrome="true"
        role="region"
        aria-label="Quick Settings Panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.userCluster}>
            <div className={styles.avatar}>RJ</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Rishi Jha</span>
              <span className={styles.userSub}>Simulated Session · Ready</span>
            </div>
          </div>

          <div className={styles.timeCluster}>
            <span className={styles.timeText}>{clock.time24}</span>
            <span className={styles.dateText}>{clock.fullDate}</span>
          </div>
        </div>

        <div className={styles.tilesGrid}>
          {/* Appearance Mode */}
          <button
            type="button"
            className={`${styles.tile} ${styles.tileActive}`}
            onClick={() => {
              const nextMode =
                themeMode === 'system'
                  ? 'light'
                  : themeMode === 'light'
                    ? 'dark'
                    : 'system';
              setThemeMode(nextMode);
            }}
            title={`Toggle Theme Mode (Current: ${themeMode})`}
          >
            <div className={styles.tileTop}>
              <span className={styles.tileIcon}>
                {themeMode === 'system' ? '💻' : resolvedAppearance === 'light' ? '☀️' : '🌙'}
              </span>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: currentTheme.colors.accent,
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              />
            </div>
            <span className={styles.tileLabel}>
              {themeMode === 'system' ? `Auto (${resolvedAppearance})` : currentTheme.shortName}
            </span>
            <span className={styles.tileSub}>
              {themeMode === 'system' ? 'System Theme' : `${themeMode.toUpperCase()} Mode`}
            </span>
          </button>

          {/* Wallpaper */}
          <button
            type="button"
            className={styles.tile}
            onClick={() => {
              setQuickSettingsOpen(false);
              openSettings('appearance', 'wallpaper');
            }}
            title="Configure Wallpaper"
          >
            <div className={styles.tileTop}>
              <span className={styles.tileIcon}>🖼️</span>
            </div>
            <span className={styles.tileLabel}>{currentWallpaper.name}</span>
            <span className={styles.tileSub}>Wallpaper</span>
          </button>

          {/* Simulated Audio */}
          <button
            type="button"
            className={`${styles.tile} ${
              simulatedSoundMuted ? '' : styles.tileActive
            }`}
            onClick={() => setSimulatedSoundMuted(!simulatedSoundMuted)}
            title="Toggle Simulated Sound UI"
          >
            <div className={styles.tileTop}>
              <span className={styles.tileIcon}>
                {simulatedSoundMuted ? '🔇' : '🔊'}
              </span>
            </div>
            <span className={styles.tileLabel}>
              {simulatedSoundMuted ? 'Muted' : 'Sound Active'}
            </span>
            <span className={styles.tileSub}>Simulated Audio</span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            className={styles.tile}
            onClick={() => {
              setQuickSettingsOpen(false);
              setNotificationCenterOpen(true);
            }}
            title="Open Notification Center"
          >
            <div className={styles.tileTop}>
              <span className={styles.tileIcon}>🔔</span>
              {unreadNotificationsCount > 0 ? (
                <span
                  style={{
                    fontSize: '9px',
                    padding: '1px 5px',
                    borderRadius: '99px',
                    background: 'var(--accent-linux, #22d3ee)',
                    color: '#071426',
                    fontWeight: 'bold',
                  }}
                >
                  {unreadNotificationsCount}
                </span>
              ) : null}
            </div>
            <span className={styles.tileLabel}>
              {unreadNotificationsCount > 0
                ? `${unreadNotificationsCount} Unread`
                : 'Notifications'}
            </span>
            <span className={styles.tileSub}>Alerts &amp; Updates</span>
          </button>
        </div>

        {/* Display Tone (Simulated Brightness) */}
        <div className={styles.sliderBox}>
          <div className={styles.sliderHeader}>
            <span className={styles.sliderTitle}>Interface Tone Filter</span>
            <span className={styles.sliderVal}>{simulatedBrightness}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="120"
            step="5"
            value={simulatedBrightness}
            onChange={(e) => setSimulatedBrightness(Number(e.target.value))}
            className={styles.slider}
            aria-label="Simulated UI tone brightness"
          />
          <span className={styles.sliderDisclaimer}>
            Soft interface tone filter (simulated preview; does not affect host
            screen brightness).
          </span>
        </div>

        {/* Bottom actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => {
              setQuickSettingsOpen(false);
              setShortcutsHelpOpen(true);
            }}
            title="View Keyboard Shortcuts &amp; Gestures"
          >
            ⌨️ Shortcuts
          </button>

          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => {
              setQuickSettingsOpen(false);
              skipToPortfolio();
            }}
            title="Switch to Portfolio Website View"
          >
            🌐 Portfolio
          </button>

          <button
            type="button"
            className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
            onClick={() => {
              setQuickSettingsOpen(false);
              openLogoutDialog();
            }}
            title="Log out of simulated guest session"
          >
            ⏻ Log Out
          </button>
        </div>
      </section>
    </>
  );
}
