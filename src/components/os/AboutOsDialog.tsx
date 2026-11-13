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
import styles from './AboutOsDialog.module.css';
import wallpaperStyles from './DesktopBackground.module.css';

function SettingsDialogContent() {
  const {
    settingsTab,
    openSettings,
    setAboutOsOpen,
    wallpaperId,
    setWallpaperId,
  } = useDesktop();

  const [draftWallpaperId, setDraftWallpaperId] = useState<WallpaperId>(wallpaperId);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeHeaderBtnRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const hasPendingChange = draftWallpaperId !== wallpaperId;
  const isDefaultState =
    wallpaperId === DEFAULT_WALLPAPER_ID && draftWallpaperId === DEFAULT_WALLPAPER_ID;
  const previewConfig = getWallpaperConfig(draftWallpaperId);

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

  const handleGalleryKeyDown = (
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
        optionRefs.current[nextIndex]?.focus();
      }
    }
  };

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
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.dot} aria-hidden="true" />
            <span id="rishi-os-settings-title">
              {settingsTab === 'appearance'
                ? 'Settings → Appearance → Wallpaper'
                : 'System // About RISHI OS'}
            </span>
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
            Appearance · Wallpaper
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
              {/* Live Desktop Context Preview */}
              <section
                className={styles.previewSection}
                aria-label="Live wallpaper preview"
              >
                <div className={styles.previewMetaRow}>
                  <div>
                    <h2 className={styles.sectionHeading}>{previewConfig.name}</h2>
                    <p className={styles.sectionSub}>{previewConfig.description}</p>
                  </div>

                  <span
                    className={
                      hasPendingChange
                        ? `${styles.statusBadge} ${styles.statusBadgePending}`
                        : styles.statusBadge
                    }
                  >
                    {hasPendingChange ? 'Preview · Unapplied' : 'Active on Desktop'}
                  </span>
                </div>

                <div
                  className={styles.previewFrame}
                  data-testid="wallpaper-live-preview"
                  data-preview-wallpaper={draftWallpaperId}
                  aria-label={`Desktop wallpaper preview: ${previewConfig.name}`}
                >
                  <div
                    className={wallpaperStyles.surface}
                    data-wallpaper={draftWallpaperId}
                    aria-hidden="true"
                  />

                  {/* Simulated RISHI OS desktop chrome */}
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

              {/* Curated 8-Wallpaper Gallery */}
              <section className={styles.gallerySection} aria-label="Wallpaper gallery">
                <div className={styles.galleryHeader}>
                  <span className={styles.galleryLabel}>Curated Wallpapers</span>
                  <span className={styles.galleryCount}>
                    {`${OS_WALLPAPERS.length} built-in themes`}
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
                          optionRefs.current[idx] = el;
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
                        onKeyDown={(e) => handleGalleryKeyDown(idx, e)}
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
                  <dt>Theme</dt>
                  <dd>Midnight Blue Soft Glass UI (#111827 / #55C7E8)</dd>
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
                  onClick={() => openSettings('appearance')}
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

        {settingsTab === 'appearance' ? (
          <div className={styles.controlsBar}>
            <button
              type="button"
              className={styles.secondaryBtn}
              disabled={isDefaultState}
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
                disabled={!hasPendingChange}
                onClick={() => setDraftWallpaperId(wallpaperId)}
              >
                Cancel
              </button>

              <button
                type="button"
                className={styles.primaryBtn}
                disabled={!hasPendingChange}
                onClick={() => setWallpaperId(draftWallpaperId, true)}
              >
                Apply
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * RISHI OS Settings modal supporting Appearance -> Wallpaper customization (with live preview, Apply/Cancel/Reset) and System Info.
 */
export function AboutOsDialog() {
  const { aboutOsOpen } = useDesktop();
  if (!aboutOsOpen) return null;
  return <SettingsDialogContent />;
}
