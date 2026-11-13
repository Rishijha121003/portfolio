'use client';

import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { OsAppId, ProjectsSubView, WallpaperId } from '@/data/rishiOs';
import {
  DEFAULT_WALLPAPER_ID,
  getRouteForApp,
  getWallpaperConfig,
  isValidWallpaperId,
  OS_APP_ORDER,
  OS_APPS,
  resolveRouteLaunch,
  VIRTUAL_ROOT,
} from '@/data/rishiOs';

export interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowInstanceState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  hasCustomRect: boolean;
  rect: WindowRect | null;
  cascadeIndex: number;
}

export interface StageBounds {
  width: number;
  height: number;
}

export interface OpenAppOptions {
  projectSubView?: ProjectsSubView;
  filesPath?: string;
  syncUrl?: boolean;
}

export type OsSessionPhase = 'login' | 'authenticating' | 'desktop' | 'portfolio';
export type SettingsTab = 'appearance' | 'system';
type PersistedSessionMode = 'portfolio' | 'desktop' | 'none';

interface OsStoreState {
  sessionPhase: 'login' | 'authenticating' | 'desktop';
  logoutDialogOpen: boolean;
  aboutOsOpen: boolean;
  settingsTab: SettingsTab;
  liveAnnouncement: string;
  windows: Record<OsAppId, WindowInstanceState>;
  activeAppId: OsAppId | null;
  projectsSubView: ProjectsSubView;
  filesTargetPath: string;
  launcherOpen: boolean;
  mobileAllAppsOpen: boolean;
  topZ: number;
  nextCascade: number;
  observedPathname: string;
}

interface DesktopContextValue {
  sessionPhase: OsSessionPhase;
  logoutDialogOpen: boolean;
  aboutOsOpen: boolean;
  settingsTab: SettingsTab;
  wallpaperId: WallpaperId;
  liveAnnouncement: string;
  windows: Record<OsAppId, WindowInstanceState>;
  activeAppId: OsAppId | null;
  projectsSubView: ProjectsSubView;
  filesTargetPath: string;
  launcherOpen: boolean;
  mobileAllAppsOpen: boolean;
  isMobile: boolean;
  isKnownRoute: boolean;
  stageBounds: StageBounds;
  startLogin: () => void;
  skipToPortfolio: () => void;
  isBootingToPortfolio: boolean;
  handlePortfolioBootComplete: () => void;
  handlePortfolioBootFinish: () => void;
  enterDesktopFromPortfolio: () => void;
  isBootingToOs: boolean;
  handleBootComplete: () => void;
  handleBootFinish: () => void;
  openLogoutDialog: () => void;
  closeLogoutDialog: () => void;
  confirmLogout: () => void;
  setAboutOsOpen: (open: boolean) => void;
  openSettings: (tab?: SettingsTab) => void;
  setWallpaperId: (id: WallpaperId, announce?: boolean) => void;
  setStageBounds: (bounds: StageBounds) => void;
  setLauncherOpen: (open: boolean) => void;
  setMobileAllAppsOpen: (open: boolean) => void;
  setProjectsSubView: (view: ProjectsSubView, syncUrl?: boolean) => void;
  setFilesTargetPath: (path: string) => void;
  openApp: (appId: OsAppId, options?: OpenAppOptions) => void;
  focusApp: (appId: OsAppId) => void;
  closeApp: (appId: OsAppId) => void;
  minimizeApp: (appId: OsAppId) => void;
  toggleMaximizeApp: (appId: OsAppId) => void;
  updateWindowRect: (appId: OsAppId, rect: WindowRect) => void;
  showDesktop: () => void;
  resetWindows: () => void;
}

const MOBILE_MEDIA_QUERY = '(max-width: 767px), (max-height: 500px)';
const SESSION_MODE_KEY = 'rishi-os-mode';
const WALLPAPER_STORAGE_KEY = 'rishi-os-wallpaper';
const sessionModeListeners = new Set<() => void>();
const wallpaperListeners = new Set<() => void>();

function subscribeWallpaper(listener: () => void): () => void {
  wallpaperListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === WALLPAPER_STORAGE_KEY) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    wallpaperListeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function getWallpaperSnapshot(): WallpaperId {
  try {
    const val = window.localStorage.getItem(WALLPAPER_STORAGE_KEY);
    return isValidWallpaperId(val) ? val : DEFAULT_WALLPAPER_ID;
  } catch {
    return DEFAULT_WALLPAPER_ID;
  }
}

function getWallpaperServerSnapshot(): WallpaperId {
  return DEFAULT_WALLPAPER_ID;
}

function writePersistedWallpaper(id: WallpaperId): void {
  try {
    window.localStorage.setItem(WALLPAPER_STORAGE_KEY, id);
  } catch {
    // Ignore storage unavailability
  }
  wallpaperListeners.forEach((cb) => cb());
}

function subscribeSessionMode(listener: () => void): () => void {
  sessionModeListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === SESSION_MODE_KEY) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    sessionModeListeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function getSessionModeSnapshot(): PersistedSessionMode {
  try {
    const val = window.sessionStorage.getItem(SESSION_MODE_KEY);
    if (val === 'portfolio' || val === 'desktop') return val;
    return 'none';
  } catch {
    return 'none';
  }
}

function getSessionModeServerSnapshot(): PersistedSessionMode {
  return 'none';
}

function setPersistedSessionMode(mode: PersistedSessionMode): void {
  try {
    if (mode === 'none') {
      window.sessionStorage.removeItem(SESSION_MODE_KEY);
    } else {
      window.sessionStorage.setItem(SESSION_MODE_KEY, mode);
    }
  } catch {
    // Ignore storage unavailability
  }
  sessionModeListeners.forEach((cb) => cb());
}

function subscribeToMobile(cb: () => void): () => void {
  const mql = window.matchMedia(MOBILE_MEDIA_QUERY);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
}

function getMobileSnapshot(): boolean {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function getMobileServerSnapshot(): boolean {
  return false;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export function clampWindowRect(
  rect: WindowRect,
  stage: StageBounds,
  minSize: { width: number; height: number }
): WindowRect {
  const pad = 8;
  const maxWidth = Math.max(minSize.width, stage.width - pad * 2);
  const maxHeight = Math.max(minSize.height, stage.height - pad * 2);
  const width = clamp(rect.width, Math.min(minSize.width, maxWidth), maxWidth);
  const height = clamp(rect.height, Math.min(minSize.height, maxHeight), maxHeight);

  const maxX = Math.max(pad, stage.width - width - pad);
  const maxY = Math.max(pad, stage.height - height - pad);

  return {
    x: clamp(rect.x, pad, maxX),
    y: clamp(rect.y, pad, maxY),
    width,
    height,
  };
}

export function computeDefaultWindowRect(
  appId: OsAppId,
  stage: StageBounds,
  cascadeIndex: number
): WindowRect {
  const config = OS_APPS[appId];
  const pad = 12;
  const reserveLeftIcons = stage.width >= 768 && stage.width <= 1180 ? 116 : pad;
  const usableWidth = Math.max(320, stage.width - reserveLeftIcons - pad);
  const maxW = Math.max(320, Math.min(stage.width - pad * 2, usableWidth));
  const maxH = Math.max(260, stage.height - pad * 2);

  const width = Math.min(config.defaultSize.width, maxW);
  const height = Math.min(config.defaultSize.height, maxH);

  const step = cascadeIndex % 5;
  const offsetX = step === 0 ? 0 : (step - 2) * 20;
  const offsetY = step === 0 ? 0 : (step - 1) * 16;
  const centerX = Math.round(
    reserveLeftIcons + (usableWidth - width) / 2 + offsetX
  );
  const centerY = Math.round((stage.height - height) / 2 + offsetY);

  return clampWindowRect(
    { x: centerX, y: centerY, width, height },
    stage,
    config.minSize
  );
}

function createInitialWindows(
  initialAppId: OsAppId | null
): Record<OsAppId, WindowInstanceState> {
  const record = {} as Record<OsAppId, WindowInstanceState>;

  OS_APP_ORDER.forEach((id, idx) => {
    const isInitial = id === initialAppId;
    record[id] = {
      isOpen: isInitial,
      isMinimized: false,
      isMaximized: false,
      zIndex: isInitial ? 20 : 10 + idx,
      hasCustomRect: false,
      rect: null,
      cascadeIndex: isInitial ? 0 : idx,
    };
  });

  return record;
}

function createInitialStore(
  pathname: string,
  initialPhase: 'login' | 'desktop' = 'login'
): OsStoreState {
  const launch = resolveRouteLaunch(pathname);
  const initialApp = launch.isKnown ? launch.appId : null;

  return {
    sessionPhase: initialPhase,
    logoutDialogOpen: false,
    aboutOsOpen: false,
    settingsTab: 'appearance',
    liveAnnouncement: '',
    windows: createInitialWindows(initialApp),
    activeAppId: initialApp,
    projectsSubView: launch.projectsSubView,
    filesTargetPath: VIRTUAL_ROOT,
    launcherOpen: false,
    mobileAllAppsOpen: false,
    topZ: 24,
    nextCascade: 1,
    observedPathname: pathname,
  };
}

function findTopVisibleApp(
  windows: Record<OsAppId, WindowInstanceState>,
  excludeAppId?: OsAppId
): OsAppId | null {
  let topId: OsAppId | null = null;
  let topZ = -1;

  for (const id of OS_APP_ORDER) {
    if (id === excludeAppId) continue;
    const win = windows[id];
    if (win.isOpen && !win.isMinimized && win.zIndex > topZ) {
      topZ = win.zIndex;
      topId = id;
    }
  }

  return topId;
}

function findTopRouteBackedApp(
  windows: Record<OsAppId, WindowInstanceState>,
  excludeAppId?: OsAppId
): OsAppId | null {
  let topId: OsAppId | null = null;
  let topZ = -1;

  for (const id of OS_APP_ORDER) {
    if (id === excludeAppId || !OS_APPS[id].routeHref) continue;
    const win = windows[id];
    if (win.isOpen && !win.isMinimized && win.zIndex > topZ) {
      topZ = win.zIndex;
      topId = id;
    }
  }

  return topId;
}

const DesktopContext = createContext<DesktopContextValue | null>(null);

export function useDesktop(): DesktopContextValue {
  const ctx = useContext(DesktopContext);
  if (!ctx) {
    throw new Error('useDesktop must be used inside DesktopProvider');
  }
  return ctx;
}

export function DesktopProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
    getMobileServerSnapshot
  );

  const persistedMode = useSyncExternalStore(
    subscribeSessionMode,
    getSessionModeSnapshot,
    getSessionModeServerSnapshot
  );

  const wallpaperId = useSyncExternalStore(
    subscribeWallpaper,
    getWallpaperSnapshot,
    getWallpaperServerSnapshot
  );

  const [store, setStore] = useState<OsStoreState>(() =>
    createInitialStore(pathname, 'login')
  );
  const [stageBounds, setStageBoundsState] = useState<StageBounds>({
    width: 1280,
    height: 760,
  });

  // Reconcile App Router pathname changes (Link clicks, router.push, Back/Forward) cleanly during render.
  if (pathname !== store.observedPathname) {
    const launch = resolveRouteLaunch(pathname);
    if (!launch.isKnown || pathname === '/') {
      setStore((prev) => ({
        ...prev,
        activeAppId: null,
        launcherOpen: false,
        mobileAllAppsOpen: false,
        observedPathname: pathname,
      }));
    } else {
      setStore((prev) => {
        const current = prev.windows[launch.appId];
        const nextZ = prev.topZ + 1;
        const nextCascade = current.isOpen
          ? current.cascadeIndex
          : prev.nextCascade;
        const bumpCascade = current.isOpen
          ? prev.nextCascade
          : prev.nextCascade + 1;

        return {
          ...prev,
          topZ: nextZ,
          nextCascade: bumpCascade,
          activeAppId: launch.appId,
          projectsSubView: launch.projectsSubView,
          launcherOpen: false,
          mobileAllAppsOpen: false,
          observedPathname: pathname,
          windows: {
            ...prev.windows,
            [launch.appId]: {
              ...current,
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ,
              cascadeIndex: nextCascade,
            },
          },
        };
      });
    }
  }

  const defaultSubRoutePhase: OsSessionPhase =
    pathname === '/' ? 'login' : 'portfolio';

  const effectiveSessionPhase: OsSessionPhase =
    persistedMode === 'portfolio'
      ? 'portfolio'
      : persistedMode === 'desktop'
        ? store.sessionPhase === 'authenticating'
          ? 'authenticating'
          : 'desktop'
        : store.sessionPhase === 'authenticating' || store.sessionPhase === 'desktop'
          ? store.sessionPhase
          : defaultSubRoutePhase;
  const activeRouteKnown = resolveRouteLaunch(pathname).isKnown;

  // Async timer transition from authenticating state into RISHI OS desktop.
  useEffect(() => {
    if (store.sessionPhase !== 'authenticating') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const delayMs = prefersReducedMotion ? 120 : 680;

    const timer = window.setTimeout(() => {
      setPersistedSessionMode('desktop');
      setStore((prev) =>
        prev.sessionPhase === 'authenticating'
          ? {
              ...prev,
              sessionPhase: 'desktop',
              liveAnnouncement: 'RISHI OS desktop loaded',
            }
          : prev
      );
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [store.sessionPhase]);

  const startLogin = useCallback(() => {
    setPersistedSessionMode('none');
    setStore((prev) =>
      prev.sessionPhase === 'login'
        ? { ...prev, sessionPhase: 'authenticating' }
        : prev
    );
  }, []);

  const [isBootingToPortfolio, setIsBootingToPortfolio] = useState(false);

  const skipToPortfolio = useCallback(() => {
    setIsBootingToPortfolio(true);
  }, []);

  const handlePortfolioBootComplete = useCallback(() => {
    setPersistedSessionMode('portfolio');
    setStore((prev) => ({
      ...prev,
      launcherOpen: false,
      logoutDialogOpen: false,
    }));
  }, []);

  const handlePortfolioBootFinish = useCallback(() => {
    setIsBootingToPortfolio(false);
  }, []);

  const [isBootingToOs, setIsBootingToOs] = useState(false);

  const enterDesktopFromPortfolio = useCallback(() => {
    setIsBootingToOs(true);
  }, []);

  const handleBootComplete = useCallback(() => {
    setPersistedSessionMode('none');
    setStore(createInitialStore('/', 'login'));
    if (pathname !== '/') {
      router.replace('/', { scroll: false });
    }
  }, [pathname, router]);

  const handleBootFinish = useCallback(() => {
    setIsBootingToOs(false);
  }, []);

  const openLogoutDialog = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      launcherOpen: false,
      logoutDialogOpen: true,
    }));
  }, []);

  const closeLogoutDialog = useCallback(() => {
    setStore((prev) => ({ ...prev, logoutDialogOpen: false }));
  }, []);

  const confirmLogout = useCallback(() => {
    setPersistedSessionMode('none');
    setStore(createInitialStore('/', 'login'));
    if (pathname !== '/') {
      router.replace('/', { scroll: false });
    }
  }, [pathname, router]);

  const setStageBounds = useCallback((nextBounds: StageBounds) => {
    setStageBoundsState((prev) => {
      if (
        Math.abs(prev.width - nextBounds.width) < 1 &&
        Math.abs(prev.height - nextBounds.height) < 1
      ) {
        return prev;
      }
      return nextBounds;
    });

    setStore((prev) => {
      let changed = false;
      const updated = { ...prev.windows };

      for (const id of OS_APP_ORDER) {
        const win = prev.windows[id];
        if (!win.rect) continue;
        const clamped = clampWindowRect(win.rect, nextBounds, OS_APPS[id].minSize);
        if (
          clamped.x !== win.rect.x ||
          clamped.y !== win.rect.y ||
          clamped.width !== win.rect.width ||
          clamped.height !== win.rect.height
        ) {
          updated[id] = { ...win, rect: clamped };
          changed = true;
        }
      }

      return changed ? { ...prev, windows: updated } : prev;
    });
  }, []);

  const setLauncherOpen = useCallback((open: boolean) => {
    setStore((prev) => ({ ...prev, launcherOpen: open }));
  }, []);

  const setMobileAllAppsOpen = useCallback((open: boolean) => {
    setStore((prev) => ({ ...prev, mobileAllAppsOpen: open }));
  }, []);

  const setFilesTargetPath = useCallback((path: string) => {
    setStore((prev) => ({ ...prev, filesTargetPath: path }));
  }, []);

  const setAboutOsOpen = useCallback((open: boolean) => {
    setStore((prev) => ({ ...prev, aboutOsOpen: open, launcherOpen: false }));
  }, []);

  const openSettings = useCallback((tab: SettingsTab = 'appearance') => {
    setStore((prev) => ({
      ...prev,
      aboutOsOpen: true,
      settingsTab: tab,
      launcherOpen: false,
    }));
  }, []);

  const setWallpaperId = useCallback((id: WallpaperId, announce = true) => {
    if (!isValidWallpaperId(id)) return;
    writePersistedWallpaper(id);
    if (announce) {
      const name = getWallpaperConfig(id).name;
      setStore((prev) => ({
        ...prev,
        liveAnnouncement: `Wallpaper applied: ${name}`,
      }));
    }
  }, []);

  const openApp = useCallback(
    (appId: OsAppId, options?: OpenAppOptions) => {
      const targetSubView =
        appId === 'projects' && options?.projectSubView
          ? options.projectSubView
          : store.projectsSubView;

      const targetRoute =
        options?.syncUrl === false
          ? null
          : getRouteForApp(appId, targetSubView);

      setStore((prev) => {
        const current = prev.windows[appId];
        const nextZ = prev.topZ + 1;
        const cascadeIndex = current.isOpen
          ? current.cascadeIndex
          : prev.nextCascade;
        const bumpCascade = current.isOpen
          ? prev.nextCascade
          : prev.nextCascade + 1;

        return {
          ...prev,
          topZ: nextZ,
          nextCascade: bumpCascade,
          activeAppId: appId,
          liveAnnouncement: `${OS_APPS[appId].title} window opened`,
          projectsSubView:
            appId === 'projects' && options?.projectSubView
              ? options.projectSubView
              : prev.projectsSubView,
          filesTargetPath:
            appId === 'files' && options?.filesPath
              ? options.filesPath
              : prev.filesTargetPath,
          launcherOpen: false,
          mobileAllAppsOpen: false,
          windows: {
            ...prev.windows,
            [appId]: {
              ...current,
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ,
              cascadeIndex,
              rect:
                current.hasCustomRect && current.rect
                  ? clampWindowRect(
                      current.rect,
                      stageBounds,
                      OS_APPS[appId].minSize
                    )
                  : computeDefaultWindowRect(appId, stageBounds, cascadeIndex),
            },
          },
        };
      });

      if (targetRoute && pathname !== targetRoute) {
        router.push(targetRoute, { scroll: false });
      }
    },
    [pathname, router, stageBounds, store.projectsSubView]
  );

  const focusApp = useCallback(
    (appId: OsAppId) => {
      const currentWin = store.windows[appId];
      if (!currentWin.isOpen) {
        openApp(appId);
        return;
      }

      const targetRoute = getRouteForApp(appId, store.projectsSubView);

      setStore((prev) => ({
        ...prev,
        topZ: prev.topZ + 1,
        activeAppId: appId,
        liveAnnouncement: `${OS_APPS[appId].title} window focused`,
        launcherOpen: false,
        mobileAllAppsOpen: false,
        windows: {
          ...prev.windows,
          [appId]: {
            ...prev.windows[appId],
            isMinimized: false,
            zIndex: prev.topZ + 1,
          },
        },
      }));

      if (targetRoute && pathname !== targetRoute) {
        router.push(targetRoute, { scroll: false });
      }
    },
    [openApp, pathname, router, store.projectsSubView, store.windows]
  );

  const closeApp = useCallback(
    (appId: OsAppId) => {
      const nextTop = findTopVisibleApp(store.windows, appId);
      const nextRouteApp = findTopRouteBackedApp(store.windows, appId);
      const nextSubView =
        appId === 'projects' ? 'directory' : store.projectsSubView;
      const shouldSyncRoute =
        store.activeAppId === appId || Boolean(OS_APPS[appId].routeHref);
      const nextRoute = nextRouteApp
        ? getRouteForApp(nextRouteApp, nextSubView)
        : '/';

      setStore((prev) => ({
        ...prev,
        activeAppId: nextTop,
        liveAnnouncement: `${OS_APPS[appId].title} window closed`,
        projectsSubView: nextSubView,
        windows: {
          ...prev.windows,
          [appId]: {
            ...prev.windows[appId],
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
          },
        },
      }));

      if (shouldSyncRoute && nextRoute && pathname !== nextRoute) {
        router.replace(nextRoute, { scroll: false });
      }
    },
    [pathname, router, store.activeAppId, store.projectsSubView, store.windows]
  );

  const minimizeApp = useCallback(
    (appId: OsAppId) => {
      const nextTop = findTopVisibleApp(store.windows, appId);

      setStore((prev) => ({
        ...prev,
        activeAppId: nextTop,
        liveAnnouncement: `${OS_APPS[appId].title} window minimized`,
        windows: {
          ...prev.windows,
          [appId]: {
            ...prev.windows[appId],
            isMinimized: true,
          },
        },
      }));
    },
    [store.windows]
  );

  const toggleMaximizeApp = useCallback((appId: OsAppId) => {
    setStore((prev) => ({
      ...prev,
      topZ: prev.topZ + 1,
      activeAppId: appId,
      windows: {
        ...prev.windows,
        [appId]: {
          ...prev.windows[appId],
          isMinimized: false,
          isMaximized: !prev.windows[appId].isMaximized,
          zIndex: prev.topZ + 1,
        },
      },
    }));
  }, []);

  const updateWindowRect = useCallback(
    (appId: OsAppId, rect: WindowRect) => {
      const clamped = clampWindowRect(rect, stageBounds, OS_APPS[appId].minSize);
      setStore((prev) => ({
        ...prev,
        windows: {
          ...prev.windows,
          [appId]: {
            ...prev.windows[appId],
            hasCustomRect: true,
            rect: clamped,
          },
        },
      }));
    },
    [stageBounds]
  );

  const setProjectsSubView = useCallback(
    (view: ProjectsSubView, syncUrl = true) => {
      const nextRoute = syncUrl ? getRouteForApp('projects', view) : null;
      setStore((prev) => ({
        ...prev,
        projectsSubView: view,
      }));
      if (nextRoute && pathname !== nextRoute) {
        router.push(nextRoute, { scroll: false });
      }
    },
    [pathname, router]
  );

  const showDesktop = useCallback(() => {
    setStore((prev) => {
      const updated = { ...prev.windows };
      for (const id of OS_APP_ORDER) {
        if (updated[id].isOpen) {
          updated[id] = { ...updated[id], isMinimized: true };
        }
      }
      return {
        ...prev,
        windows: updated,
        activeAppId: null,
        launcherOpen: false,
        mobileAllAppsOpen: true,
      };
    });
  }, []);

  const resetWindows = useCallback(() => {
    setStore((prev) => {
      let idx = 0;
      const updated = { ...prev.windows };
      for (const id of OS_APP_ORDER) {
        const win = prev.windows[id];
        if (win.isOpen) {
          updated[id] = {
            ...win,
            isMinimized: false,
            isMaximized: false,
            hasCustomRect: true,
            cascadeIndex: idx,
            rect: computeDefaultWindowRect(id, stageBounds, idx),
          };
          idx++;
        }
      }
      return { ...prev, windows: updated, launcherOpen: false };
    });
  }, [stageBounds]);

  const value = useMemo<DesktopContextValue>(
    () => ({
      sessionPhase: effectiveSessionPhase,
      logoutDialogOpen: store.logoutDialogOpen,
      aboutOsOpen: store.aboutOsOpen,
      settingsTab: store.settingsTab,
      wallpaperId,
      windows: store.windows,
      activeAppId: store.activeAppId,
      projectsSubView: store.projectsSubView,
      filesTargetPath: store.filesTargetPath,
      launcherOpen: store.launcherOpen,
      mobileAllAppsOpen: store.mobileAllAppsOpen,
      liveAnnouncement: store.liveAnnouncement,
      isMobile,
      isKnownRoute: activeRouteKnown,
      stageBounds,
      startLogin,
      skipToPortfolio,
      isBootingToPortfolio,
      handlePortfolioBootComplete,
      handlePortfolioBootFinish,
      enterDesktopFromPortfolio,
      isBootingToOs,
      handleBootComplete,
      handleBootFinish,
      openLogoutDialog,
      closeLogoutDialog,
      confirmLogout,
      setAboutOsOpen,
      openSettings,
      setWallpaperId,
      setStageBounds,
      setLauncherOpen,
      setMobileAllAppsOpen,
      setProjectsSubView,
      setFilesTargetPath,
      openApp,
      focusApp,
      closeApp,
      minimizeApp,
      toggleMaximizeApp,
      updateWindowRect,
      showDesktop,
      resetWindows,
    }),
    [
      activeRouteKnown,
      closeApp,
      closeLogoutDialog,
      confirmLogout,
      effectiveSessionPhase,
      enterDesktopFromPortfolio,
      focusApp,
      handleBootComplete,
      handleBootFinish,
      handlePortfolioBootComplete,
      handlePortfolioBootFinish,
      isBootingToOs,
      isBootingToPortfolio,
      isMobile,
      minimizeApp,
      openApp,
      openLogoutDialog,
      openSettings,
      resetWindows,
      setAboutOsOpen,
      setWallpaperId,
      setFilesTargetPath,
      setLauncherOpen,
      setMobileAllAppsOpen,
      setProjectsSubView,
      setStageBounds,
      showDesktop,
      skipToPortfolio,
      stageBounds,
      startLogin,
      store,
      toggleMaximizeApp,
      updateWindowRect,
      wallpaperId,
    ]
  );

  return (
    <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
  );
}
