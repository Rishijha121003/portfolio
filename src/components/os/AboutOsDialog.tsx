'use client';

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDesktop } from '@/components/os/DesktopContext';
import { RishiOsBrandIcon } from '@/components/os/OsIcons';
import { SITE_IDENTITY } from '@/data/portfolio';
import type { WallpaperId } from '@/data/rishiOs';
import {
  DEFAULT_WALLPAPER_ID,
  getWallpaperConfig,
  OS_WALLPAPERS,
} from '@/data/rishiOs';
import type { ThemeId } from '@/data/rishiThemes';
import {
  DEFAULT_THEME_ID,
  getThemeConfig,
  OS_THEMES,
} from '@/data/rishiThemes';
import styles from './AboutOsDialog.module.css';
import wallpaperStyles from './DesktopBackground.module.css';

function SettingsDialogContent() {
  const {
    settingsTab,
    appearanceSubTab,
    setAppearanceSubTab,
    openSettings,
    setAboutOsOpen,
    wallpaperId,
    setWallpaperId,
    themeId,
    themeMode,
    setThemeMode,
    systemPreference,
    setThemeId,
    setPreviewThemeId,
  } = useDesktop();

  const [draftWallpaperId, setDraftWallpaperId] = useState<WallpaperId>(wallpaperId);
  const [draftThemeId, setDraftThemeId] = useState<ThemeId>(themeId);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeHeaderBtnRef = useRef<HTMLButtonElement | null>(null);
  const wallpaperOptionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const themeOptionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Wallpaper state helpers
  const hasWallpaperChange = draftWallpaperId !== wallpaperId;
  const isDefaultWallpaper =
    wallpaperId === DEFAULT_WALLPAPER_ID && draftWallpaperId === DEFAULT_WALLPAPER_ID;
  const previewWallpaperConfig = getWallpaperConfig(draftWallpaperId);

  // Theme state helpers
  const hasThemeChange = draftThemeId !== themeId;
  const isDefaultTheme =
    themeId === DEFAULT_THEME_ID && draftThemeId === DEFAULT_THEME_ID;
  const previewThemeConfig = getThemeConfig(draftThemeId);

  // Focus trap and escape listener
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeHeaderBtnRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setAboutOsOpen(false);
        return;
      }

      if (event.key === 'Tab') {
        const container = dialogRef.current;
        if (!container) return;
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"]):not(:disabled)'
          )
        ).filter((el) => el.offsetParent !== null);

        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (previousFocus && document.contains(previousFocus)) {
        previousFocus.focus();
      }
    };
  }, [setAboutOsOpen]);

  const handleWallpaperKeyDown = (
    index: number,
    event: ReactKeyboardEvent<HTMLButtonElement>
  ) => {
    const total = OS_WALLPAPERS.length;
    let nextIndex = -1;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % total;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + total) % total;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = total - 1;
    }

    if (nextIndex >= 0) {
      event.preventDefault();
      const nextItem = OS_WALLPAPERS[nextIndex];
      if (nextItem) {
        setDraftWallpaperId(nextItem.id);
        wallpaperOptionRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleThemeKeyDown = (
    index: number,
    event: ReactKeyboardEvent<HTMLButtonElement>
  ) => {
    const total = OS_THEMES.length;
    let nextIndex = -1;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % total;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + total) % total;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = total - 1;
    }

    if (nextIndex >= 0) {
      event.preventDefault();
      const nextTheme = OS_THEMES[nextIndex];
      if (nextTheme) {
        setDraftThemeId(nextTheme.id);
        setPreviewThemeId(nextTheme.id);
        themeOptionRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleSelectTheme = (selectedId: ThemeId) => {
    setDraftThemeId(selectedId);
    setPreviewThemeId(selectedId);
  };

  const headerTitle =
    settingsTab === 'appearance'
      ? appearanceSubTab === 'theme'
        ? 'Settings → Appearance → Color Theme'
        : 'Settings → Appearance → Wallpaper'
      : 'System // About RISHI OS';

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) setAboutOsOpen(false);
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rishi-os-settings-title"
      >
        {/* Modal Window Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.dot} aria-hidden="true" />
            <span id="rishi-os-settings-title">{headerTitle}</span>
          </div>

          <button
            ref={closeHeaderBtnRef}
            type="button"
            className={styles.headerCloseBtn}
            aria-label="Close Settings"
            onClick={() => setAboutOsOpen(false)}
          >
            ×
          </button>
        </div>

        {/* Primary Settings Tabs */}
        <div className={styles.tabBar} role="tablist" aria-label="Settings sections">
          <button
            type="button"
            role="tab"
            id="tab-appearance"
            aria-selected={settingsTab === 'appearance'}
            aria-controls="panel-appearance"
            className={
              settingsTab === 'appearance'
                ? `${styles.tabBtn} ${styles.tabBtnActive}`
                : styles.tabBtn
            }
            onClick={() => openSettings('appearance')}
          >
            Appearance Settings
          </button>

          <button
            type="button"
            role="tab"
            id="tab-system"
            aria-selected={settingsTab === 'system'}
            aria-controls="panel-system"
            className={
              settingsTab === 'system'
                ? `${styles.tabBtn} ${styles.tabBtnActive}`
                : styles.tabBtn
            }
            onClick={() => openSettings('system')}
          >
            About RISHI OS
          </button>
        </div>

        <div className={styles.body}>
          {settingsTab === 'appearance' ? (
            <div
              id="panel-appearance"
              role="tabpanel"
              aria-labelledby="tab-appearance"
              className={styles.appearancePanel}
            >
              {/* Appearance Sub-Tabs Switcher: Color Theme vs Wallpaper */}
              <nav
                className={styles.subTabBar}
                role="tablist"
                aria-label="Appearance sub-sections"
              >
                <button
                  type="button"
                  role="tab"
                  id="subtab-theme"
                  aria-selected={appearanceSubTab === 'theme'}
                  aria-controls="subpanel-theme"
                  className={
                    appearanceSubTab === 'theme'
                      ? `${styles.subTabBtn} ${styles.subTabBtnActive}`
                      : styles.subTabBtn
                  }
                  onClick={() => setAppearanceSubTab('theme')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a10 10 0 0 1 10 10 4 4 0 0 1-4 4h-2a2 2 0 0 0-2 2v2a2 2 0 0 1-2 2" />
                  </svg>
                  <span>Color Theme</span>
                  <span className={styles.subTabBadge}>8 Themes</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="subtab-wallpaper"
                  aria-selected={appearanceSubTab === 'wallpaper'}
                  aria-controls="subpanel-wallpaper"
                  className={
                    appearanceSubTab === 'wallpaper'
                      ? `${styles.subTabBtn} ${styles.subTabBtnActive}`
                      : styles.subTabBtn
                  }
                  onClick={() => setAppearanceSubTab('wallpaper')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Wallpaper</span>
                  <span className={styles.subTabBadge}>8 Curated</span>
                </button>
              </nav>

              {/* Sub-Panel 1: Color Theme Customization */}
              {appearanceSubTab === 'theme' ? (
                <div
                  id="subpanel-theme"
                  role="tabpanel"
                  aria-labelledby="subtab-theme"
                  className={styles.appearancePanel}
                >
                  {/* Live Desktop Theme Preview */}
                  <section
                    className={styles.previewSection}
                    aria-label="Live theme preview"
                  >
                    <div className={styles.previewMetaRow}>
                      <div>
                        <h2 className={styles.sectionHeading}>{previewThemeConfig.name}</h2>
                        <p className={styles.sectionSub}>{previewThemeConfig.description}</p>
                      </div>

                      <span
                        className={
                          hasThemeChange
                            ? `${styles.statusBadge} ${styles.statusBadgePending}`
                            : styles.statusBadge
                        }
                      >
                        {hasThemeChange ? 'Live Preview · Unapplied' : 'Active on Desktop'}
                      </span>
                    </div>

                    {/* Miniature Desktop Styled with Draft Theme Tokens */}
                    <div
                      className={styles.previewFrame}
                      data-rishi-theme={draftThemeId}
                      data-testid="theme-live-preview"
                      aria-label={`Color theme preview: ${previewThemeConfig.name}`}
                    >
                      <div
                        className={wallpaperStyles.surface}
                        data-wallpaper={wallpaperId}
                        aria-hidden="true"
                      />

                      <div className={styles.miniTopBar} aria-hidden="true">
                        <span className={styles.miniBrand}>
                          <span className={styles.miniDot} />
                          RISHI OS
                        </span>
                        <span className={styles.miniCenterPill}>{previewThemeConfig.name}</span>
                        <span className={styles.miniRightPill}>RJ</span>
                      </div>

                      <div className={styles.miniDesktopArea} aria-hidden="true">
                        <div className={styles.miniIconsCol}>
                          <span className={styles.miniIconTile} />
                          <span className={styles.miniIconTile} />
                          <span className={styles.miniIconTile} />
                        </div>

                        <div className={styles.miniWindow}>
                          <div className={styles.miniWindowTitlebar}>
                            <span className={styles.miniWindowDot} />
                            <span className={styles.miniWindowBar} />
                          </div>
                          <div className={styles.miniWindowBody}>
                            <span className={styles.miniWindowAccent} />
                            <span className={styles.miniWindowLine} />
                            <span className={styles.miniWindowLineShort} />
                          </div>
                        </div>
                      </div>

                      <div className={styles.miniDock} aria-hidden="true">
                        <span className={`${styles.miniDockItem} ${styles.miniDockItemActive}`} />
                        <span className={styles.miniDockItem} />
                        <span className={styles.miniDockItem} />
                        <span className={styles.miniDockItem} />
                      </div>
                    </div>

                    {/* 4 Swatch Tokens Bar */}
                    <div
                      className={styles.themeTokensBar}
                      aria-label="Theme color token values"
                    >
                      <div className={styles.tokenPill}>
                        <span
                          className={styles.tokenDot}
                          style={{ backgroundColor: previewThemeConfig.colors.background }}
                          aria-hidden="true"
                        />
                        <span className={styles.tokenKey}>Background:</span>
                        <span className={styles.tokenVal}>
                          {previewThemeConfig.colors.background}
                        </span>
                      </div>

                      <div className={styles.tokenPill}>
                        <span
                          className={styles.tokenDot}
                          style={{ backgroundColor: previewThemeConfig.colors.surface }}
                          aria-hidden="true"
                        />
                        <span className={styles.tokenKey}>Surface:</span>
                        <span className={styles.tokenVal}>
                          {previewThemeConfig.colors.surface}
                        </span>
                      </div>

                      <div className={styles.tokenPill}>
                        <span
                          className={styles.tokenDot}
                          style={{ backgroundColor: previewThemeConfig.colors.accent }}
                          aria-hidden="true"
                        />
                        <span className={styles.tokenKey}>Accent:</span>
                        <span className={styles.tokenVal}>
                          {previewThemeConfig.colors.accent}
                        </span>
                      </div>

                      <div className={styles.tokenPill}>
                        <span
                          className={styles.tokenDot}
                          style={{ backgroundColor: previewThemeConfig.colors.text }}
                          aria-hidden="true"
                        />
                        <span className={styles.tokenKey}>Text:</span>
                        <span className={styles.tokenVal}>
                          {previewThemeConfig.colors.text}
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* Adaptive Theme Mode Selector (System, Light, Dark) */}
                  <section className={styles.modeSection} aria-label="Appearance Mode">
                    <div className={styles.galleryHeader}>
                      <span className={styles.galleryLabel}>Appearance Mode</span>
                      <span className={styles.galleryCount}>
                        {themeMode === 'system' ? `Auto: ${systemPreference}` : themeMode.toUpperCase()}
                      </span>
                    </div>

                    <div className={styles.modePillGroup} role="radiogroup" aria-label="Theme mode">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={themeMode === 'system'}
                        className={`${styles.modePillBtn} ${themeMode === 'system' ? styles.modePillActive : ''}`}
                        onClick={() => {
                          setThemeMode('system');
                          setDraftThemeId(systemPreference === 'dark' ? 'minimal-dark' : 'minimal-light');
                        }}
                      >
                        <span aria-hidden="true">💻</span>
                        <span>System</span>
                        {themeMode === 'system' && (
                          <span className={styles.modeSubTag}>({systemPreference})</span>
                        )}
                      </button>

                      <button
                        type="button"
                        role="radio"
                        aria-checked={themeMode === 'light'}
                        className={`${styles.modePillBtn} ${themeMode === 'light' ? styles.modePillActive : ''}`}
                        onClick={() => {
                          setThemeMode('light');
                          setDraftThemeId('minimal-light');
                        }}
                      >
                        <span aria-hidden="true">☀️</span>
                        <span>Light</span>
                      </button>

                      <button
                        type="button"
                        role="radio"
                        aria-checked={themeMode === 'dark'}
                        className={`${styles.modePillBtn} ${themeMode === 'dark' ? styles.modePillActive : ''}`}
                        onClick={() => {
                          setThemeMode('dark');
                          setDraftThemeId('minimal-dark');
                        }}
                      >
                        <span aria-hidden="true">🌙</span>
                        <span>Dark</span>
                      </button>
                    </div>
                  </section>

                  {/* Curated Color Themes Grid */}
                  <section className={styles.gallerySection} aria-label="Color themes">
                    <div className={styles.galleryHeader}>
                      <span className={styles.galleryLabel}>Preset Themes</span>
                      <span className={styles.galleryCount}>
                        {`${OS_THEMES.length} system palettes`}
                      </span>
                    </div>

                    <div
                      className={styles.themeGrid}
                      role="radiogroup"
                      aria-label="Select color theme"
                    >
                      {OS_THEMES.map((theme, idx) => {
                        const isSelected = draftThemeId === theme.id;
                        const isApplied = themeId === theme.id;

                        return (
                          <button
                            key={theme.id}
                            ref={(el) => {
                              themeOptionRefs.current[idx] = el;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            data-theme-option={theme.id}
                            className={
                              isSelected
                                ? `${styles.themeCard} ${styles.themeCardSelected}`
                                : styles.themeCard
                            }
                            onClick={() => handleSelectTheme(theme.id)}
                            onKeyDown={(e) => handleThemeKeyDown(idx, e)}
                          >
                            <div className={styles.themePaletteStrip} aria-hidden="true">
                              <div
                                className={styles.themeSwatchCol}
                                style={{ backgroundColor: theme.colors.background }}
                              >
                                <span
                                  className={styles.swatchMiniTag}
                                  style={{ color: theme.colors.text }}
                                >
                                  BG
                                </span>
                              </div>
                              <div
                                className={styles.themeSwatchCol}
                                style={{ backgroundColor: theme.colors.surface }}
                              >
                                <span
                                  className={styles.swatchMiniTag}
                                  style={{ color: theme.colors.text }}
                                >
                                  SURF
                                </span>
                              </div>
                              <div
                                className={styles.themeSwatchCol}
                                style={{ backgroundColor: theme.colors.accent }}
                              >
                                <span
                                  className={styles.swatchMiniTag}
                                  style={{ color: theme.colors.accentInk }}
                                >
                                  ACC
                                </span>
                              </div>
                              <div
                                className={styles.themeSwatchCol}
                                style={{ backgroundColor: theme.colors.text }}
                              >
                                <span
                                  className={styles.swatchMiniTag}
                                  style={{ color: theme.colors.background }}
                                >
                                  TXT
                                </span>
                              </div>

                              {isApplied ? (
                                <span className={styles.thumbActiveTag}>Active</span>
                              ) : null}
                              {isSelected ? (
                                <span className={styles.thumbCheck} aria-hidden="true">
                                  ✓
                                </span>
                              ) : null}
                            </div>

                            <div className={styles.themeCardMeta}>
                              <div className={styles.themeCardTitleRow}>
                                <span className={styles.thumbName}>{theme.name}</span>
                                {theme.id === DEFAULT_THEME_ID ? (
                                  <span className={styles.defaultTag}>Default</span>
                                ) : null}
                              </div>
                              <span className={styles.themeCardTagline}>{theme.tagline}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              ) : (
                /* Sub-Panel 2: Wallpaper Customization (Preserved) */
                <div
                  id="subpanel-wallpaper"
                  role="tabpanel"
                  aria-labelledby="subtab-wallpaper"
                  className={styles.appearancePanel}
                >
                  <section
                    className={styles.previewSection}
                    aria-label="Live wallpaper preview"
                  >
                    <div className={styles.previewMetaRow}>
                      <div>
                        <h2 className={styles.sectionHeading}>{previewWallpaperConfig.name}</h2>
                        <p className={styles.sectionSub}>{previewWallpaperConfig.description}</p>
                      </div>

                      <span
                        className={
                          hasWallpaperChange
                            ? `${styles.statusBadge} ${styles.statusBadgePending}`
                            : styles.statusBadge
                        }
                      >
                        {hasWallpaperChange ? 'Preview · Unapplied' : 'Active on Desktop'}
                      </span>
                    </div>

                    <div
                      className={styles.previewFrame}
                      data-testid="wallpaper-live-preview"
                      data-preview-wallpaper={draftWallpaperId}
                      aria-label={`Desktop wallpaper preview: ${previewWallpaperConfig.name}`}
                    >
                      <div
                        className={wallpaperStyles.surface}
                        data-wallpaper={draftWallpaperId}
                        aria-hidden="true"
                      />

                      <div className={styles.miniTopBar} aria-hidden="true">
                        <span className={styles.miniBrand}>
                          <span className={styles.miniDot} />
                          RISHI OS
                        </span>
                        <span className={styles.miniCenterPill}>Welcome ~/</span>
                        <span className={styles.miniRightPill}>RJ</span>
                      </div>

                      <div className={styles.miniDesktopArea} aria-hidden="true">
                        <div className={styles.miniIconsCol}>
                          <span className={styles.miniIconTile} />
                          <span className={styles.miniIconTile} />
                          <span className={styles.miniIconTile} />
                        </div>

                        <div className={styles.miniWindow}>
                          <div className={styles.miniWindowTitlebar}>
                            <span className={styles.miniWindowDot} />
                            <span className={styles.miniWindowBar} />
                          </div>
                          <div className={styles.miniWindowBody}>
                            <span className={styles.miniWindowAccent} />
                            <span className={styles.miniWindowLine} />
                            <span className={styles.miniWindowLineShort} />
                          </div>
                        </div>
                      </div>

                      <div className={styles.miniDock} aria-hidden="true">
                        <span className={`${styles.miniDockItem} ${styles.miniDockItemActive}`} />
                        <span className={styles.miniDockItem} />
                        <span className={styles.miniDockItem} />
                        <span className={styles.miniDockItem} />
                      </div>
                    </div>
                  </section>

                  <section className={styles.gallerySection} aria-label="Wallpaper gallery">
                    <div className={styles.galleryHeader}>
                      <span className={styles.galleryLabel}>Curated Wallpapers</span>
                      <span className={styles.galleryCount}>
                        {`${OS_WALLPAPERS.length} built-in wallpapers`}
                      </span>
                    </div>

                    <div
                      className={styles.galleryGrid}
                      role="radiogroup"
                      aria-label="Select desktop wallpaper"
                    >
                      {OS_WALLPAPERS.map((wp, idx) => {
                        const isSelected = draftWallpaperId === wp.id;
                        const isApplied = wallpaperId === wp.id;

                        return (
                          <button
                            key={wp.id}
                            ref={(el) => {
                              wallpaperOptionRefs.current[idx] = el;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            data-wallpaper-option={wp.id}
                            className={
                              isSelected
                                ? `${styles.thumbCard} ${styles.thumbCardSelected}`
                                : styles.thumbCard
                            }
                            onClick={() => setDraftWallpaperId(wp.id)}
                            onKeyDown={(e) => handleWallpaperKeyDown(idx, e)}
                          >
                            <span className={styles.thumbMedia}>
                              <span
                                className={wallpaperStyles.surface}
                                data-wallpaper={wp.id}
                                aria-hidden="true"
                              />
                              {isApplied ? (
                                <span className={styles.thumbActiveTag}>Active</span>
                              ) : null}
                              {isSelected ? (
                                <span className={styles.thumbCheck} aria-hidden="true">
                                  ✓
                                </span>
                              ) : null}
                            </span>

                            <span className={styles.thumbMeta}>
                              <span className={styles.thumbName}>{wp.name}</span>
                              <span className={styles.thumbCategory}>{wp.category}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              )}
            </div>
          ) : (
            <div
              id="panel-system"
              role="tabpanel"
              aria-labelledby="tab-system"
              className={styles.systemPanel}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
                <RishiOsBrandIcon size={48} variant="primary" />
                <div>
                  <h2 className={styles.title}>RISHI OS</h2>
                  <p className={styles.subtitle}>
                    {`A Developer's Workspace · ${SITE_IDENTITY.fullName}`}
                  </p>
                </div>
              </div>

              <dl className={styles.specList}>
                <div className={styles.specRow}>
                  <dt>Architecture</dt>
                  <dd>Next.js App Router + Window Manager</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Active Color Theme</dt>
                  <dd>
                    {`${getThemeConfig(themeId).name} (${getThemeConfig(themeId).colors.accent} / ${getThemeConfig(themeId).colors.surface})`}
                  </dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Active Wallpaper</dt>
                  <dd>{getWallpaperConfig(wallpaperId).name}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Filesystem</dt>
                  <dd>Read-Only Virtual Tree (/home/rishi)</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Featured Work</dt>
                  <dd>DormiQ Case Study</dd>
                </div>
              </dl>

              <div className={styles.systemActions}>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={() => openSettings('appearance', 'theme')}
                >
                  Theme Settings
                </button>

                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={() => openSettings('appearance', 'wallpaper')}
                >
                  Wallpaper Settings
                </button>

                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => setAboutOsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Footer Bar for Appearance */}
        {settingsTab === 'appearance' ? (
          <div className={styles.controlsBar}>
            {appearanceSubTab === 'theme' ? (
              <>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  disabled={isDefaultTheme}
                  onClick={() => {
                    setDraftThemeId(DEFAULT_THEME_ID);
                    setThemeId(DEFAULT_THEME_ID, true);
                  }}
                >
                  Reset to Default
                </button>

                <div className={styles.controlsRight}>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    disabled={!hasThemeChange}
                    onClick={() => {
                      setDraftThemeId(themeId);
                      setPreviewThemeId(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className={styles.primaryBtn}
                    disabled={!hasThemeChange}
                    onClick={() => setThemeId(draftThemeId, true)}
                  >
                    Apply Theme
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  disabled={isDefaultWallpaper}
                  onClick={() => {
                    setDraftWallpaperId(DEFAULT_WALLPAPER_ID);
                    setWallpaperId(DEFAULT_WALLPAPER_ID, true);
                  }}
                >
                  Reset to Default
                </button>

                <div className={styles.controlsRight}>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    disabled={!hasWallpaperChange}
                    onClick={() => setDraftWallpaperId(wallpaperId)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className={styles.primaryBtn}
                    disabled={!hasWallpaperChange}
                    onClick={() => setWallpaperId(draftWallpaperId, true)}
                  >
                    Apply Wallpaper
                  </button>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * RISHI OS Settings modal supporting Appearance (Themes & Wallpapers with live preview, Apply/Cancel/Reset) and System Info.
 */
export function AboutOsDialog() {
  const { aboutOsOpen } = useDesktop();
  if (!aboutOsOpen) return null;
  return <SettingsDialogContent />;
}
