'use client';

import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react';
import { useRef, useState } from 'react';
import {
  clampWindowRect,
  useDesktop,
  type WindowRect,
} from '@/components/os/DesktopContext';
import { OsAppIcon, WindowControlIcon } from '@/components/os/OsIcons';
import type { OsAppId } from '@/data/rishiOs';
import { OS_APPS } from '@/data/rishiOs';
import styles from './DesktopWindow.module.css';

interface DesktopWindowProps {
  appId: OsAppId;
  stageRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

type ResizeDirection = 'e' | 'w' | 's' | 'se' | 'sw';

function measureRectInStage(
  winEl: HTMLElement | null,
  stageEl: HTMLElement | null
): WindowRect | null {
  if (!winEl || !stageEl) return null;
  const winBox = winEl.getBoundingClientRect();
  const stageBox = stageEl.getBoundingClientRect();
  return {
    x: Math.round(winBox.left - stageBox.left),
    y: Math.round(winBox.top - stageBox.top),
    width: Math.round(winBox.width),
    height: Math.round(winBox.height),
  };
}

function applyRectToElement(winEl: HTMLElement | null, rect: WindowRect): void {
  if (!winEl) return;
  winEl.style.left = `${rect.x}px`;
  winEl.style.top = `${rect.y}px`;
  winEl.style.width = `${rect.width}px`;
  winEl.style.height = `${rect.height}px`;
  winEl.style.transform = 'none';
}

/**
 * Reusable OS application window supporting titlebar drag, multi-edge resize, stacking focus, and minimize/maximize.
 */
export function DesktopWindow({ appId, stageRef, children }: DesktopWindowProps) {
  const {
    windows,
    activeAppId,
    projectsSubView,
    isMobile,
    stageBounds,
    focusApp,
    closeApp,
    minimizeApp,
    toggleMaximizeApp,
    updateWindowRect,
    setMobileAllAppsOpen,
  } = useDesktop();

  const winState = windows[appId];
  const config = OS_APPS[appId];
  const windowRef = useRef<HTMLElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  if (!winState.isOpen) return null;

  const isActive = activeAppId === appId && !winState.isMinimized;
  const displayTitle =
    appId === 'projects' && projectsSubView === 'dormiq'
      ? 'DormiQ Case Study — ~/projects/dormiq'
      : config.title;

  const startDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isMobile || winState.isMaximized || e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;

    const winEl = windowRef.current;
    const stageEl = stageRef.current;
    focusApp(appId);
    const startRect = winState.rect ?? measureRectInStage(winEl, stageEl);
    if (!startRect) return;

    e.preventDefault();
    const prevUserSelect = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    applyRectToElement(winEl, startRect);
    setIsInteracting(true);

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    let latestRect = startRect;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startClientX;
      const dy = moveEvent.clientY - startClientY;
      latestRect = clampWindowRect(
        {
          ...startRect,
          x: startRect.x + dx,
          y: startRect.y + dy,
        },
        stageBounds,
        config.minSize
      );
      applyRectToElement(winEl, latestRect);
    };

    const onPointerUp = () => {
      document.body.style.userSelect = prevUserSelect;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      setIsInteracting(false);
      updateWindowRect(appId, latestRect);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };

  const startResize = (
    dir: ResizeDirection,
    e: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (isMobile || winState.isMaximized || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const winEl = windowRef.current;
    const stageEl = stageRef.current;
    focusApp(appId);
    const startRect = winState.rect ?? measureRectInStage(winEl, stageEl);
    if (!startRect) return;

    const prevUserSelect = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    applyRectToElement(winEl, startRect);
    setIsInteracting(true);

    const startX = e.clientX;
    const startY = e.clientY;
    let latestRect = startRect;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let nextX = startRect.x;
      const nextY = startRect.y;
      let nextW = startRect.width;
      let nextH = startRect.height;

      if (dir === 'e' || dir === 'se') {
        nextW = Math.max(config.minSize.width, startRect.width + dx);
      }
      if (dir === 's' || dir === 'se' || dir === 'sw') {
        nextH = Math.max(config.minSize.height, startRect.height + dy);
      }
      if (dir === 'w' || dir === 'sw') {
        const proposedW = startRect.width - dx;
        const clampedW = Math.max(config.minSize.width, proposedW);
        const actualDelta = startRect.width - clampedW;
        nextX = startRect.x + actualDelta;
        nextW = clampedW;
      }

      latestRect = clampWindowRect(
        { x: nextX, y: nextY, width: nextW, height: nextH },
        stageBounds,
        config.minSize
      );
      applyRectToElement(winEl, latestRect);
    };

    const onPointerUp = () => {
      document.body.style.userSelect = prevUserSelect;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      setIsInteracting(false);
      updateWindowRect(appId, latestRect);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };

  const handleKeyboardResize = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (isMobile || winState.isMaximized) return;
    const step = e.shiftKey ? 40 : 16;
    let dw = 0;
    let dh = 0;
    if (e.key === 'ArrowRight') dw = step;
    else if (e.key === 'ArrowLeft') dw = -step;
    else if (e.key === 'ArrowDown') dh = step;
    else if (e.key === 'ArrowUp') dh = -step;
    else return;

    e.preventDefault();
    e.stopPropagation();
    const current =
      winState.rect ?? measureRectInStage(windowRef.current, stageRef.current);
    if (!current) return;

    const nextRect = clampWindowRect(
      {
        ...current,
        width: current.width + dw,
        height: current.height + dh,
      },
      stageBounds,
      config.minSize
    );
    updateWindowRect(appId, nextRect);
  };

  const cascadeStep = winState.cascadeIndex % 5;
  const cascadeX = cascadeStep === 0 ? 0 : (cascadeStep - 2) * 20;
  const cascadeY = cascadeStep === 0 ? 0 : (cascadeStep - 1) * 16;
  const inlineStyle: CSSProperties = {
    zIndex: winState.zIndex,
    ...(!winState.hasCustomRect || !winState.rect
      ? ({
          '--default-w': `${config.defaultSize.width}px`,
          '--default-h': `${config.defaultSize.height}px`,
          '--cascade-x': `${cascadeX}px`,
          '--cascade-y': `${cascadeY}px`,
        } as CSSProperties)
      : !winState.isMaximized && !isMobile
        ? {
            left: `${winState.rect.x}px`,
            top: `${winState.rect.y}px`,
            width: `${winState.rect.width}px`,
            height: `${winState.rect.height}px`,
            transform: 'none',
          }
        : undefined),
  };

  const windowClasses = [styles.window];
  if (!winState.hasCustomRect || !winState.rect) {
    windowClasses.push(styles.windowUncustomized);
  }
  if (isActive) windowClasses.push(styles.windowActive);
  if (winState.isMaximized && !isMobile) windowClasses.push(styles.windowMaximized);
  if (winState.isMinimized) windowClasses.push(styles.windowMinimized);
  if (isInteracting) windowClasses.push(styles.windowDragging);

  const headingId = `window-title-${appId}`;

  return (
    <section
      ref={windowRef}
      role="region"
      aria-labelledby={headingId}
      data-os-window="true"
      className={windowClasses.join(' ')}
      style={inlineStyle}
      onPointerDownCapture={() => {
        if (!isActive) focusApp(appId);
      }}
    >
      <div
        className={styles.titleBar}
        onPointerDown={startDrag}
        onDoubleClick={() => {
          if (!isMobile) toggleMaximizeApp(appId);
        }}
      >
        <div className={styles.titleLeft}>
          <button
            type="button"
            className={styles.mobileBackBtn}
            onClick={() => setMobileAllAppsOpen(true)}
            aria-label="Back to All Apps"
          >
            <span aria-hidden="true">←</span>
            <span>Apps</span>
          </button>

          <span className={styles.focusDot} aria-hidden="true" />
          <span className={styles.titleIcon} aria-hidden="true">
            <OsAppIcon appId={appId} size={14} />
          </span>
          <span id={headingId} className={styles.titleText}>
            {displayTitle}
          </span>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.controlBtn} ${styles.desktopOnlyControl}`}
            aria-label={`Minimize ${config.shortLabel}`}
            title="Minimize"
            onClick={(e) => {
              minimizeApp(appId);
              if (e.detail === 0) {
                requestAnimationFrame(() =>
                  document.getElementById(`rishi-os-dock-${appId}`)?.focus()
                );
              }
            }}
          >
            <WindowControlIcon kind="minimize" />
          </button>

          <button
            type="button"
            className={`${styles.controlBtn} ${styles.desktopOnlyControl}`}
            aria-label={
              winState.isMaximized
                ? `Restore ${config.shortLabel}`
                : `Maximize ${config.shortLabel}`
            }
            title={winState.isMaximized ? 'Restore' : 'Maximize'}
            onClick={() => toggleMaximizeApp(appId)}
          >
            <WindowControlIcon
              kind={winState.isMaximized ? 'restore' : 'maximize'}
            />
          </button>

          <button
            type="button"
            className={`${styles.controlBtn} ${styles.closeBtn}`}
            aria-label={`Close ${config.shortLabel}`}
            title="Close"
            onClick={(e) => {
              closeApp(appId);
              if (e.detail === 0) {
                requestAnimationFrame(() =>
                  document.getElementById(`rishi-os-dock-${appId}`)?.focus()
                );
              }
            }}
          >
            <WindowControlIcon kind="close" />
          </button>
        </div>
      </div>

      <div className={styles.body}>{children}</div>

      {!isMobile && !winState.isMaximized ? (
        <>
          <div
            className={styles.resizeE}
            onPointerDown={(e) => startResize('e', e)}
            aria-hidden="true"
          />
          <div
            className={styles.resizeW}
            onPointerDown={(e) => startResize('w', e)}
            aria-hidden="true"
          />
          <div
            className={styles.resizeS}
            onPointerDown={(e) => startResize('s', e)}
            aria-hidden="true"
          />
          <div
            className={styles.resizeSE}
            role="separator"
            tabIndex={0}
            aria-label={`Resize ${config.shortLabel} window`}
            onPointerDown={(e) => startResize('se', e)}
            onKeyDown={handleKeyboardResize}
          />
          <div
            className={styles.resizeSW}
            onPointerDown={(e) => startResize('sw', e)}
            aria-hidden="true"
          />
        </>
      ) : null}
    </section>
  );
}
