'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDesktop } from '@/components/os/DesktopContext';
import { useOsClock } from '@/components/os/useOsClock';
import styles from './DesktopHud.module.css';

interface ContextMenuPos {
  x: number;
  y: number;
  visible: boolean;
}

export function DesktopHud() {
  const router = useRouter();
  const { openApp, openSettings, openLogoutDialog, setLauncherOpen } = useDesktop();
  const { time24, fullDate } = useOsClock();

  const [contextMenu, setContextMenu] = useState<ContextMenuPos>({
    x: 0,
    y: 0,
    visible: false,
  });

  // Global right-click handler for desktop surface
  const handleContextMenu = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Ignore right-clicks inside active application windows, dialogs, dock, or top bar
    if (
      target.closest('[data-os-window="true"]') ||
      target.closest('[data-os-chrome="true"]') ||
      target.closest('input, textarea, select, button, a')
    ) {
      return;
    }

    e.preventDefault();

    // Clamp inside viewport so menu is never cut off
    const menuWidth = 220;
    const menuHeight = 280;
    const posX = Math.min(e.clientX, window.innerWidth - menuWidth - 10);
    const posY = Math.min(e.clientY, window.innerHeight - menuHeight - 10);

    setContextMenu({
      x: Math.max(10, posX),
      y: Math.max(10, posY),
      visible: true,
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu((prev) => (prev.visible ? { ...prev, visible: false } : prev));
  }, []);

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', closeContextMenu);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeContextMenu();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', closeContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleContextMenu, closeContextMenu]);

  return (
    <>
      {/* Center-Right Desktop Telemetry & Clock HUD */}
      <aside className={styles.hudRoot} aria-label="Desktop system dashboard">
        {/* Large Elegant Clock & Date */}
        <div className={styles.timeBlock} aria-hidden="true">
          <span className={styles.timeDisplay}>{time24}</span>
          <span className={styles.dateDisplay}>{fullDate} · NEW DELHI, IN</span>
        </div>

        {/* Developer Telemetry Card */}
        <div className={styles.telemetryCard}>
          <div className={styles.cardHeader}>
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>Available for Hire</span>
            </div>
            <span className={styles.sessionTag}>GUEST SESSION</span>
          </div>

          <div className={styles.identityBlock}>
            <span className={styles.devName}>Rishi Jha</span>
            <span className={styles.devTitle}>Software Developer · Full-Stack &amp; Systems</span>
          </div>

          <div className={styles.specsGrid}>
            <span className={styles.specLabel}>Focus</span>
            <span className={styles.specValue}>Python · FastAPI · Next.js · PostgreSQL</span>

            <span className={styles.specLabel}>Status</span>
            <span className={`${styles.specValue} ${styles.specHighlight}`}>
              Open to Engineering Roles
            </span>

            <span className={styles.specLabel}>Location</span>
            <span className={styles.specValue}>New Delhi / NCR (Open to Relocate)</span>

            <span className={styles.specLabel}>Featured</span>
            <span className={styles.specValue}>DormiQ, LifeOS, AssignFlow</span>
          </div>

          {/* Quick Action Badges */}
          <div className={styles.actionsRow}>
            <button
              type="button"
              className={`${styles.actionPill} ${styles.actionPillPrimary}`}
              onClick={() =>
                openApp('files', { filesPath: '/home/rishi/resume.md' })
              }
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>Resume.md</span>
            </button>

            <button
              type="button"
              className={styles.actionPill}
              onClick={() =>
                openApp('projects', { projectSubView: 'dormiq' })
              }
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span>DormiQ</span>
            </button>

            <button
              type="button"
              className={styles.actionPill}
              onClick={() => openApp('terminal')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span>Terminal</span>
            </button>

            <button
              type="button"
              className={styles.actionPill}
              onClick={() => openApp('contact')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Contact</span>
            </button>
          </div>
        </div>

        {/* Minimal Terminal Hint Chip */}
        <button
          type="button"
          className={styles.terminalHintChip}
          onClick={() => openApp('terminal')}
          title="Open interactive terminal"
        >
          <span className={styles.hintPrompt}>$</span>
          <span>Tip: run <span className={styles.hintCmd}>sudo hire</span> or <span className={styles.hintCmd}>cmatrix</span> in terminal</span>
        </button>
      </aside>

      {/* Desktop Right-Click Native OS Glass Menu */}
      {contextMenu.visible && (
        <div
          className={styles.contextMenu}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          role="menu"
          aria-label="Desktop Context Menu"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            role="menuitem"
            className={styles.contextItem}
            onClick={() => {
              closeContextMenu();
              openSettings('appearance');
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Change Wallpaper...</span>
          </button>

          <button
            type="button"
            role="menuitem"
            className={styles.contextItem}
            onClick={() => {
              closeContextMenu();
              openApp('terminal');
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span>Open Terminal</span>
          </button>

          <button
            type="button"
            role="menuitem"
            className={styles.contextItem}
            onClick={() => {
              closeContextMenu();
              openApp('files');
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span>Open File Manager</span>
          </button>

          <button
            type="button"
            role="menuitem"
            className={styles.contextItem}
            onClick={() => {
              closeContextMenu();
              openApp('files', { filesPath: '/home/rishi/resume.md' });
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span>View Resume.md</span>
          </button>

          <button
            type="button"
            role="menuitem"
            className={styles.contextItem}
            onClick={() => {
              closeContextMenu();
              openApp('projects', { projectSubView: 'directory' });
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span>Browse Projects</span>
          </button>

          <div className={styles.contextDivider} />

          <button
            type="button"
            role="menuitem"
            className={styles.contextItem}
            onClick={() => {
              closeContextMenu();
              setLauncherOpen(true);
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>All Applications</span>
          </button>

          <button
            type="button"
            role="menuitem"
            className={styles.contextItem}
            onClick={() => {
              closeContextMenu();
              router.push('/');
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Switch to Portfolio</span>
          </button>

          <div className={styles.contextDivider} />

          <button
            type="button"
            role="menuitem"
            className={`${styles.contextItem} ${styles.contextItemDanger}`}
            onClick={() => {
              closeContextMenu();
              openLogoutDialog();
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log Out Session</span>
          </button>
        </div>
      )}
    </>
  );
}
