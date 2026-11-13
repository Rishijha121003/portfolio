'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useDesktop } from './DesktopContext';
import type { OsAppId } from '@/data/rishiOs';
import {
  OS_APPS,
  OS_APP_ORDER,
  VIRTUAL_FS,
} from '@/data/rishiOs';
import { PROJECT_RECORDS } from '@/data/portfolio';
import type { ProjectRecord } from '@/types/portfolio';
import { OsAppIcon } from './OsIcons';
import styles from './GlobalSearchDialog.module.css';

interface SearchResultItem {
  id: string;
  category: 'apps' | 'projects' | 'files' | 'commands';
  title: string;
  subtitle: string;
  badge: string;
  icon?: string;
  appId?: OsAppId;
  onSelect: () => void;
}

const SUPPORTED_COMMAND_LIST = [
  { cmd: 'neofetch', desc: 'Display system specs & ASCII logo' },
  { cmd: 'cmatrix', desc: 'Matrix digital green rain animation' },
  { cmd: 'projects', desc: 'List portfolio projects' },
  { cmd: 'cat resume.md', desc: "View Rishi's Curriculum Vitae" },
  { cmd: 'theme', desc: 'Configure or preview UI color themes' },
  { cmd: 'wallpaper', desc: 'Configure desktop wallpapers' },
  { cmd: 'help', desc: 'List all supported shell commands' },
  { cmd: 'clear', desc: 'Clear terminal screen (or Ctrl+L)' },
];

export function GlobalSearchDialog() {
  const {
    launcherOpen,
    setLauncherOpen,
    openApp,
    openSettings,
    windows,
    activeAppId,
  } = useDesktop();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cleanClose = useCallback(() => {
    setLauncherOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, [setLauncherOpen]);

  useEffect(() => {
    if (launcherOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [launcherOpen]);

  const normalizedQuery = query.trim().toLowerCase();

  const searchResults = useMemo<SearchResultItem[]>(() => {
    const list: SearchResultItem[] = [];

    // 1. Applications
    OS_APP_ORDER.forEach((id) => {
      const app = OS_APPS[id];
      const matches =
        !normalizedQuery ||
        app.shortLabel.toLowerCase().includes(normalizedQuery) ||
        app.title.toLowerCase().includes(normalizedQuery) ||
        app.pathLabel.toLowerCase().includes(normalizedQuery) ||
        app.description.toLowerCase().includes(normalizedQuery);

      if (matches) {
        const win = windows[id];
        const status =
          activeAppId === id && !win.isMinimized
            ? 'Active'
            : win.isOpen
            ? win.isMinimized
              ? 'Min'
              : 'Open'
            : 'Open App';

        list.push({
          id: `app-${id}`,
          category: 'apps',
          title: app.shortLabel,
          subtitle: `${app.pathLabel} — ${app.description}`,
          badge: status,
          appId: id,
          onSelect: () => {
            cleanClose();
            openApp(id);
          },
        });
      }
    });

    if (!normalizedQuery) {
      // Also add settings in empty state
      list.push({
        id: 'settings-theme',
        category: 'apps',
        title: 'Appearance & Themes',
        subtitle: 'Customize 8 color themes and 8 desktop wallpapers',
        badge: 'Settings',
        icon: '🎨',
        onSelect: () => {
          cleanClose();
          openSettings('appearance', 'theme');
        },
      });
      return list;
    }

    // 2. Projects
    PROJECT_RECORDS.forEach((p: ProjectRecord) => {
      const matches =
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.slug.toLowerCase().includes(normalizedQuery) ||
        p.shortDescription.toLowerCase().includes(normalizedQuery) ||
        p.technologies.some((t: string) => t.toLowerCase().includes(normalizedQuery));

      if (matches) {
        list.push({
          id: `proj-${p.slug}`,
          category: 'projects',
          title: p.title,
          subtitle: `${p.shortDescription.slice(0, 75)}...`,
          badge: 'View Project',
          icon: '🚀',
          onSelect: () => {
            cleanClose();
            openApp('projects', { projectSubView: p.slug });
          },
        });
      }
    });

    // 3. Virtual Filesystem
    Object.entries(VIRTUAL_FS).forEach(([path, node]) => {
      if (node.kind === 'dir' && path !== '/home/rishi') return;
      const fileName = path.split('/').pop() || path;
      const matches =
        path.toLowerCase().includes(normalizedQuery) ||
        fileName.toLowerCase().includes(normalizedQuery);

      if (matches) {
        list.push({
          id: `file-${path}`,
          category: 'files',
          title: fileName,
          subtitle: path,
          badge: 'Inspect File',
          icon: node.kind === 'dir' ? '📁' : '📄',
          onSelect: () => {
            cleanClose();
            openApp('files', { filesPath: path });
          },
        });
      }
    });

    // 4. Terminal Commands
    SUPPORTED_COMMAND_LIST.forEach((cmdItem) => {
      const matches =
        cmdItem.cmd.toLowerCase().includes(normalizedQuery) ||
        cmdItem.desc.toLowerCase().includes(normalizedQuery);

      if (matches) {
        list.push({
          id: `cmd-${cmdItem.cmd}`,
          category: 'commands',
          title: cmdItem.cmd,
          subtitle: cmdItem.desc,
          badge: 'Run Shell',
          icon: '💻',
          onSelect: () => {
            cleanClose();
            openApp('terminal');
          },
        });
      }
    });

    return list;
  }, [
    activeAppId,
    cleanClose,
    normalizedQuery,
    openApp,
    openSettings,
    windows,
  ]);

  const safeSelectedIndex =
    selectedIndex >= 0 && selectedIndex < searchResults.length
      ? selectedIndex
      : 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + searchResults.length) % searchResults.length
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      searchResults[safeSelectedIndex]?.onSelect();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cleanClose();
    }
  };

  if (!launcherOpen) return null;

  // Group search results by category
  const categories = [
    {
      key: 'apps' as const,
      label: normalizedQuery ? 'Applications' : 'All Applications',
      items: searchResults.filter((r) => r.category === 'apps'),
    },
    {
      key: 'projects' as const,
      label: 'Projects & Case Studies',
      items: searchResults.filter((r) => r.category === 'projects'),
    },
    {
      key: 'files' as const,
      label: 'Virtual Filesystem',
      items: searchResults.filter((r) => r.category === 'files'),
    },
    {
      key: 'commands' as const,
      label: 'Terminal Commands',
      items: searchResults.filter((r) => r.category === 'commands'),
    },
  ].filter((c) => c.items.length > 0);

  return (
    <>
      <div className={styles.backdrop} aria-hidden="true" onClick={cleanClose} />
      <section
        className={styles.modal}
        data-os-chrome="true"
        role="dialog"
        aria-modal="true"
        aria-label="Global Search and Applications Launcher"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.searchBar}>
          <svg
            width="18"
            height="18"
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

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search applications, projects, files &amp; terminal commands..."
            className={styles.input}
            aria-label="Global search query"
          />

          <kbd className={styles.kbdEsc}>ESC</kbd>
        </div>

        <div className={styles.resultsList}>
          {searchResults.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <span className={styles.emptyTitle}>
                No results for &ldquo;{query}&rdquo;
              </span>
              <div className={styles.emptyTips}>
                <button
                  type="button"
                  className={styles.tipChip}
                  onClick={() => setQuery('dormiq')}
                >
                  DormiQ
                </button>
                <button
                  type="button"
                  className={styles.tipChip}
                  onClick={() => setQuery('terminal')}
                >
                  Terminal
                </button>
                <button
                  type="button"
                  className={styles.tipChip}
                  onClick={() => setQuery('resume')}
                >
                  Resume.md
                </button>
                <button
                  type="button"
                  className={styles.tipChip}
                  onClick={() => setQuery('theme')}
                >
                  Color Themes
                </button>
              </div>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.key} className={styles.categoryGroup}>
                <div className={styles.categoryLabel}>
                  <span>{category.label}</span>
                  <span className={styles.categoryCount}>
                    {category.items.length}
                  </span>
                </div>

                {category.items.map((item) => {
                  const globalIdx = searchResults.findIndex(
                    (r) => r.id === item.id
                  );
                  const isSelected = globalIdx === safeSelectedIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.itemBtn} ${
                        isSelected ? styles.itemBtnActive : ''
                      }`}
                      onClick={item.onSelect}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.iconBox}>
                          {item.appId ? (
                            <OsAppIcon appId={item.appId} size={18} />
                          ) : (
                            <span>{item.icon ?? '✨'}</span>
                          )}
                        </div>
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          <span className={styles.itemSubtitle}>
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`${styles.itemBadge} ${
                          isSelected ? styles.itemBadgeActive : ''
                        }`}
                      >
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerHints}>
            <span className={styles.footerHint}>
              <kbd className={styles.kbdEsc}>↑↓</kbd> Navigate
            </span>
            <span className={styles.footerHint}>
              <kbd className={styles.kbdEsc}>↵</kbd> Select
            </span>
            <span className={styles.footerHint}>
              <kbd className={styles.kbdEsc}>ESC</kbd> Close
            </span>
          </div>

          <span>RISHI OS Global Search</span>
        </div>
      </section>
    </>
  );
}
