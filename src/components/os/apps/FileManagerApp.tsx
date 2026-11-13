'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useDesktop } from '@/components/os/DesktopContext';
import { FsEntryIcon } from '@/components/os/OsIcons';
import {
  VIRTUAL_FS,
  VIRTUAL_ROOT,
  type VirtualDirNode,
  type VirtualFileNode,
} from '@/data/rishiOs';
import styles from './FileManagerApp.module.css';

const PLACES = [
  { label: 'home', path: '/home/rishi' },
  { label: 'Projects', path: '/home/rishi/Projects' },
  { label: 'DormiQ', path: '/home/rishi/Projects/DormiQ' },
  { label: 'screenshots', path: '/home/rishi/Projects/DormiQ/screenshots' },
  { label: 'About', path: '/home/rishi/About' },
  { label: 'Journey', path: '/home/rishi/Journey' },
  { label: 'Skills', path: '/home/rishi/Skills' },
  { label: 'Contact', path: '/home/rishi/Contact' },
] as const;

type FileViewMode = 'list' | 'grid';

/**
 * Renders a lightweight formatted JSX view for read-only markdown documents without extra dependencies.
 */
function renderFormattedMarkdownLine(line: string, index: number) {
  if (line.startsWith('# ')) {
    return (
      <h3 key={index} className={styles.mdH1}>
        {line.slice(2)}
      </h3>
    );
  }
  if (line.startsWith('## ')) {
    return (
      <h4 key={index} className={styles.mdH2}>
        {line.slice(3)}
      </h4>
    );
  }
  if (line.startsWith('> ')) {
    return (
      <blockquote key={index} className={styles.mdQuote}>
        {line.slice(2)}
      </blockquote>
    );
  }
  if (line.startsWith('- ')) {
    const body = line.slice(2);
    const boldMatch = body.match(/^\*\*(.+?)\*\*:\s*(.*)$/);
    if (boldMatch) {
      return (
        <div key={index} className={styles.mdBullet}>
          <span className={styles.mdBulletDot} aria-hidden="true">•</span>
          <span>
            <strong className={styles.mdStrong}>{boldMatch[1]}:</strong>{' '}
            {boldMatch[2]}
          </span>
        </div>
      );
    }
    return (
      <div key={index} className={styles.mdBullet}>
        <span className={styles.mdBulletDot} aria-hidden="true">•</span>
        <span>{body}</span>
      </div>
    );
  }
  return (
    <p key={index} className={styles.mdPara}>
      {line}
    </p>
  );
}

/**
 * Interactive read-only virtual file browser scoped to /home/rishi with back/forward history, search, list/grid views, formatted document viewer, and app launch actions.
 */
export function FileManagerApp() {
  const { filesTargetPath, setFilesTargetPath, openApp } = useDesktop();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<FileViewMode>('grid');
  const isFileTarget = VIRTUAL_FS[filesTargetPath]?.kind === 'file';
  const targetParent = isFileTarget
    ? filesTargetPath.slice(0, filesTargetPath.lastIndexOf('/')) || VIRTUAL_ROOT
    : filesTargetPath;

  const resolvedDir =
    VIRTUAL_FS[targetParent]?.kind === 'dir'
      ? (VIRTUAL_FS[targetParent] as VirtualDirNode)
      : (VIRTUAL_FS[VIRTUAL_ROOT] as VirtualDirNode);

  const [navHistory, setNavHistory] = useState<{ stack: string[]; index: number }>({
    stack: [resolvedDir.path],
    index: 0,
  });

  const selectedNode = selectedPath
    ? VIRTUAL_FS[selectedPath] ?? resolvedDir
    : isFileTarget
      ? VIRTUAL_FS[filesTargetPath] ?? resolvedDir
      : resolvedDir;

  const canGoBack = navHistory.index > 0;
  const canGoForward = navHistory.index < navHistory.stack.length - 1;
  const canGoUp = resolvedDir.path !== VIRTUAL_ROOT;
  const parentPath = canGoUp
    ? resolvedDir.path.slice(0, resolvedDir.path.lastIndexOf('/')) || VIRTUAL_ROOT
    : VIRTUAL_ROOT;

  const relativeSegments = resolvedDir.path
    .slice(VIRTUAL_ROOT.length)
    .split('/')
    .filter(Boolean);

  const navigateToDir = (dirPath: string) => {
    setFilesTargetPath(dirPath);
    setSelectedPath(null);
    setSearchQuery('');
    setNavHistory((prev) => {
      if (prev.stack[prev.index] === dirPath) return prev;
      const trimmed = prev.stack.slice(0, prev.index + 1);
      return { stack: [...trimmed, dirPath], index: trimmed.length };
    });
  };

  const goBack = () => {
    if (!canGoBack) return;
    const nextIdx = navHistory.index - 1;
    const target = navHistory.stack[nextIdx] ?? VIRTUAL_ROOT;
    setNavHistory((prev) => ({ ...prev, index: nextIdx }));
    setFilesTargetPath(target);
    setSelectedPath(null);
    setSearchQuery('');
  };

  const goForward = () => {
    if (!canGoForward) return;
    const nextIdx = navHistory.index + 1;
    const target = navHistory.stack[nextIdx] ?? VIRTUAL_ROOT;
    setNavHistory((prev) => ({ ...prev, index: nextIdx }));
    setFilesTargetPath(target);
    setSelectedPath(null);
    setSearchQuery('');
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleChildNodes = resolvedDir.children
    .map((childPath) => VIRTUAL_FS[childPath])
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .filter((node) => {
      if (!normalizedQuery) return true;
      const hint = node.kind === 'dir' ? node.description : node.summary;
      return (
        node.name.toLowerCase().includes(normalizedQuery) ||
        hint.toLowerCase().includes(normalizedQuery)
      );
    });

  const handleOpenSelected = () => {
    if (selectedNode.kind === 'dir') {
      if (selectedNode.path !== resolvedDir.path) {
        navigateToDir(selectedNode.path);
      }
      return;
    }

    if (selectedNode.launchAction) {
      openApp(selectedNode.launchAction.appId, {
        projectSubView: selectedNode.launchAction.projectSubView,
      });
    }
  };

  const launchTarget =
    selectedNode.kind === 'file'
      ? selectedNode.launchAction
      : selectedNode.openAppAction;

  return (
    <div className={styles.root}>
      {/* Navigation, Breadcrumbs, Search & View Controls */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.historyGroup} role="group" aria-label="Directory navigation">
            <button
              type="button"
              className={styles.navBtn}
              disabled={!canGoBack}
              onClick={goBack}
              aria-label="Back"
              title="Back"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.navBtn}
              disabled={!canGoForward}
              onClick={goForward}
              aria-label="Forward"
              title="Forward"
            >
              →
            </button>
            <button
              type="button"
              className={styles.navBtn}
              disabled={!canGoUp}
              onClick={() => navigateToDir(parentPath)}
              aria-label="Up one directory"
              title="Up one directory"
            >
              ↑
            </button>
            <button
              type="button"
              className={styles.navBtn}
              disabled={resolvedDir.path === VIRTUAL_ROOT}
              onClick={() => navigateToDir(VIRTUAL_ROOT)}
              aria-label="Home directory"
              title="Home (/home/rishi)"
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
                aria-hidden="true"
              >
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5.5 9.5v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-10" />
              </svg>
            </button>
          </div>

          <nav className={styles.breadcrumbs} aria-label="Virtual path breadcrumbs">
            <button
              type="button"
              className={
                resolvedDir.path === VIRTUAL_ROOT
                  ? `${styles.crumbBtn} ${styles.crumbCurrent}`
                  : styles.crumbBtn
              }
              onClick={() => navigateToDir(VIRTUAL_ROOT)}
            >
              /home/rishi
            </button>

            {relativeSegments.map((seg, idx) => {
              const target = `${VIRTUAL_ROOT}/${relativeSegments
                .slice(0, idx + 1)
                .join('/')}`;
              const isLast = idx === relativeSegments.length - 1;
              return (
                <span key={target} className={styles.crumbPair}>
                  <span className={styles.crumbSep} aria-hidden="true">/</span>
                  <button
                    type="button"
                    className={
                      isLast
                        ? `${styles.crumbBtn} ${styles.crumbCurrent}`
                        : styles.crumbBtn
                    }
                    onClick={() => navigateToDir(target)}
                  >
                    {seg}
                  </button>
                </span>
              );
            })}
          </nav>
        </div>

        <div className={styles.toolbarRight}>
          <label className={styles.searchWrap}>
            <span className={styles.srOnly}>Filter current directory</span>
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
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              aria-label="Search files and folders"
              className={styles.searchInput}
            />
          </label>

          <div className={styles.viewToggle} role="group" aria-label="View layout">
            <button
              type="button"
              className={
                viewMode === 'grid'
                  ? `${styles.viewBtn} ${styles.viewBtnActive}`
                  : styles.viewBtn
              }
              aria-pressed={viewMode === 'grid'}
              aria-label="Grid view"
              title="Grid view"
              onClick={() => setViewMode('grid')}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="2" width="5" height="5" rx="1" />
                <rect x="9" y="2" width="5" height="5" rx="1" />
                <rect x="2" y="9" width="5" height="5" rx="1" />
                <rect x="9" y="9" width="5" height="5" rx="1" />
              </svg>
            </button>
            <button
              type="button"
              className={
                viewMode === 'list'
                  ? `${styles.viewBtn} ${styles.viewBtnActive}`
                  : styles.viewBtn
              }
              aria-pressed={viewMode === 'list'}
              aria-label="List view"
              title="List view"
              onClick={() => setViewMode('list')}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M2.5 4h11M2.5 8h11M2.5 12h11" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Places Sidebar | Directory List/Grid | Read-Only Preview Inspector */}
      <div className={styles.workspace}>
        <aside className={styles.sidebar} aria-label="Places">
          {PLACES.map((place) => {
            const isActive = resolvedDir.path === place.path;
            return (
              <button
                key={place.path}
                type="button"
                className={
                  isActive
                    ? `${styles.placeBtn} ${styles.placeBtnActive}`
                    : styles.placeBtn
                }
                onClick={() => navigateToDir(place.path)}
              >
                <span className={isActive ? styles.placeIconActive : styles.placeIcon}>
                  <FsEntryIcon kind="dir" size={14} />
                </span>
                <span>{place.label === 'home' ? 'Home' : place.label}</span>
              </button>
            );
          })}
          <span className={styles.readOnlyNote}>Read-Only VFS</span>
        </aside>

        <section className={styles.contentPane} aria-label="Directory contents">
          {visibleChildNodes.length === 0 ? (
            <div className={styles.emptyFilter}>
              {`No entries matching "${searchQuery}".`}
            </div>
          ) : viewMode === 'list' ? (
            <div className={styles.entryList} role="list">
              {visibleChildNodes.map((node) => {
                const isSelected = selectedPath === node.path;
                return (
                  <button
                    key={node.path}
                    type="button"
                    role="listitem"
                    className={
                      isSelected
                        ? `${styles.listRow} ${styles.listRowSelected}`
                        : styles.listRow
                    }
                    onClick={() => setSelectedPath(node.path)}
                    onDoubleClick={() => {
                      if (node.kind === 'dir') {
                        navigateToDir(node.path);
                      } else if (node.launchAction) {
                        openApp(node.launchAction.appId, {
                          projectSubView: node.launchAction.projectSubView,
                        });
                      }
                    }}
                  >
                    <span className={styles.listIcon}>
                      <FsEntryIcon
                        kind={node.kind}
                        fileType={node.kind === 'file' ? node.fileType : undefined}
                        size={17}
                        filled={node.kind === 'dir'}
                      />
                    </span>
                    <span className={styles.listName}>{node.name}</span>
                    <span className={styles.listHint}>
                      {node.kind === 'dir' ? node.description : node.summary}
                    </span>
                    <span className={styles.listMeta}>
                      {node.kind === 'dir' ? 'FOLDER' : node.sizeLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className={styles.entryGrid}>
              {visibleChildNodes.map((node) => {
                const isSelected = selectedPath === node.path;
                return (
                  <button
                    key={node.path}
                    type="button"
                    className={
                      isSelected
                        ? `${styles.entryCard} ${styles.entryCardSelected}`
                        : styles.entryCard
                    }
                    onClick={() => {
                      if (node.kind === 'dir') {
                        navigateToDir(node.path);
                      } else {
                        setSelectedPath(node.path);
                      }
                    }}
                    onDoubleClick={() => {
                      if (node.kind === 'file' && node.launchAction) {
                        openApp(node.launchAction.appId, {
                          projectSubView: node.launchAction.projectSubView,
                        });
                      }
                    }}
                  >
                    {node.kind === 'file' && node.imageAsset ? (
                      <div className={styles.cardThumbWrap}>
                        <Image
                          src={node.imageAsset.src}
                          alt={node.imageAsset.alt}
                          fill
                          sizes="160px"
                          className={styles.cardThumbImg}
                        />
                      </div>
                    ) : (
                      <div className={styles.cardIconStage}>
                        <FsEntryIcon
                          kind={node.kind}
                          fileType={node.kind === 'file' ? node.fileType : undefined}
                          size={44}
                          filled={node.kind === 'dir'}
                        />
                      </div>
                    )}
                    <span className={styles.entryName}>{node.name}</span>
                    {node.kind === 'file' ? (
                      <span className={styles.entryTypeTag}>{node.sizeLabel}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}

          <div className={styles.statusFooter}>
            <span>{`${visibleChildNodes.length} ${visibleChildNodes.length === 1 ? 'item' : 'items'}`}</span>
            <span>·</span>
            <span>{resolvedDir.path}</span>
          </div>
        </section>

        <aside className={styles.inspector} aria-label="Item inspector">
          {selectedNode.kind === 'file' && selectedNode.imageAsset ? (
            <div className={styles.previewImageWrap}>
              <Image
                src={selectedNode.imageAsset.src}
                alt={selectedNode.imageAsset.alt}
                fill
                sizes="260px"
                className={styles.previewImage}
              />
            </div>
          ) : (
            <div className={styles.inspectorHeroIcon}>
              <FsEntryIcon
                kind={selectedNode.kind}
                fileType={selectedNode.kind === 'file' ? selectedNode.fileType : undefined}
                size={52}
                filled={selectedNode.kind === 'dir'}
              />
            </div>
          )}

          <div className={styles.inspectorMetaHeader}>
            <span className={styles.inspectorLabel}>
              {selectedNode.kind === 'dir' ? 'Folder' : selectedNode.fileType.toUpperCase()}
            </span>
            <h2 className={styles.inspectorTitle}>{selectedNode.name}</h2>
            <p className={styles.inspectorSummary}>
              {selectedNode.kind === 'dir'
                ? selectedNode.description
                : selectedNode.summary}
            </p>
          </div>

          {selectedNode.kind === 'file' ? (
            <div className={styles.markdownDocView}>
              {(selectedNode as VirtualFileNode).contentLines.map((line, idx) =>
                renderFormattedMarkdownLine(line, idx)
              )}
            </div>
          ) : null}

          <div className={styles.inspectorActions}>
            {selectedNode.kind === 'dir' && selectedNode.path !== resolvedDir.path ? (
              <button
                type="button"
                className={styles.openBtnSecondary}
                onClick={handleOpenSelected}
              >
                Open Folder
              </button>
            ) : null}

            {launchTarget ? (
              <button
                type="button"
                className={styles.launchBtn}
                onClick={() =>
                  openApp(launchTarget.appId, {
                    projectSubView: launchTarget.projectSubView,
                  })
                }
              >
                {`Open in New Window · ${launchTarget.label} ↗`}
              </button>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
