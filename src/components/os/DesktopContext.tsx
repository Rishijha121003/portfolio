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
import type { ThemeId } from '@/data/rishiThemes';
import {
  DEFAULT_THEME_ID,
  getThemeConfig,
  isValidThemeId,
} from '@/data/rishiThemes';

export interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type SnapLayout =
  | 'none'
  | 'left-half'
  | 'right-half'
  | 'top-half'
  | 'bottom-half'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'maximize';

export interface WindowInstanceState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  snapLayout?: SnapLayout;
  restoreRect?: WindowRect | null;
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
export type AppearanceSubTab = 'theme' | 'wallpaper';
type PersistedSessionMode = 'portfolio' | 'desktop' | 'none';

export interface OsNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'welcome' | 'system' | 'projects' | 'portfolio';
  read: boolean;
  actionLabel?: string;
  actionAppId?: OsAppId;
  actionOptions?: OpenAppOptions;
  actionSettingsTab?: SettingsTab;
  actionAppearanceSubTab?: AppearanceSubTab;
}

interface OsStoreState {
  sessionPhase: 'login' | 'authenticating' | 'desktop';
  logoutDialogOpen: boolean;
  aboutOsOpen: boolean;
  settingsTab: SettingsTab;
  appearanceSubTab: AppearanceSubTab;
  liveAnnouncement: string;
  windows: Record<OsAppId, WindowInstanceState>;
  activeAppId: OsAppId | null;
  projectsSubView: ProjectsSubView;
  filesTargetPath: string;
  launcherOpen: boolean;
  mobileAllAppsOpen: boolean;
  quickSettingsOpen: boolean;
  notificationCenterOpen: boolean;
  shortcutsHelpOpen: boolean;
  altTabOpen: boolean;
  altTabIndex: number;
  simulatedBrightness: number;
  simulatedSoundMuted: boolean;
  notifications: OsNotification[];
  snapPreview: SnapLayout | null;
  topZ: number;
  nextCascade: number;
  observedPathname: string;
}

interface DesktopContextValue {
  sessionPhase: OsSessionPhase;
  logoutDialogOpen: boolean;
  aboutOsOpen: boolean;
  settingsTab: SettingsTab;
  appearanceSubTab: AppearanceSubTab;
  wallpaperId: WallpaperId;
  themeId: ThemeId;
  previewThemeId: ThemeId | null;
  liveAnnouncement: string;
  windows: Record<OsAppId, WindowInstanceState>;
  activeAppId: OsAppId | null;
  projectsSubView: ProjectsSubView;
  filesTargetPath: string;
  launcherOpen: boolean;
  mobileAllAppsOpen: boolean;
  quickSettingsOpen: boolean;
  notificationCenterOpen: boolean;
  shortcutsHelpOpen: boolean;
  altTabOpen: boolean;
  altTabIndex: number;
  simulatedBrightness: number;
  simulatedSoundMuted: boolean;
  notifications: OsNotification[];
  unreadNotificationsCount: number;
  snapPreview: SnapLayout | null;
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
  openSettings: (tab?: SettingsTab, subTab?: AppearanceSubTab) => void;
  setAppearanceSubTab: (subTab: AppearanceSubTab) => void;
  setWallpaperId: (id: WallpaperId, announce?: boolean) => void;
  setThemeId: (id: ThemeId, announce?: boolean) => void;
  setPreviewThemeId: (id: ThemeId | null) => void;
  setStageBounds: (bounds: StageBounds) => void;
  setLauncherOpen: (open: boolean) => void;
  setMobileAllAppsOpen: (open: boolean) => void;
  setQuickSettingsOpen: (open: boolean) => void;
  setNotificationCenterOpen: (open: boolean) => void;
  setShortcutsHelpOpen: (open: boolean) => void;
  setAltTabOpen: (open: boolean) => void;
  setAltTabIndex: (index: number) => void;
  setSimulatedBrightness: (val: number) => void;
  setSimulatedSoundMuted: (muted: boolean) => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
  markAllNotificationsRead: () => void;
  setSnapPreview: (snap: SnapLayout | null) => void;
  snapWindow: (appId: OsAppId, layout: SnapLayout) => void;
  unsnapWindow: (appId: OsAppId) => void;
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
const THEME_STORAGE_KEY = 'rishi-os-theme';
const sessionModeListeners = new Set<() => void>();
const wallpaperListeners = new Set<() => void>();
const themeListeners = new Set<() => void>();

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

function subscribeTheme(listener: () => void): () => void {
  themeListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    themeListeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function getThemeSnapshot(): ThemeId {
  try {
    const val = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidThemeId(val) ? val : DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

function getThemeServerSnapshot(): ThemeId {
  return DEFAULT_THEME_ID;
}

function writePersistedTheme(id: ThemeId): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // Ignore storage unavailability
  }
  themeListeners.forEach((cb) => cb());
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

export function computeSnapRect(
  layout: SnapLayout,
  stage: StageBounds
): WindowRect | null {
  if (layout === 'none') return null;
  const pad = 8;
  const gap = 8;
  const usableW = Math.max(320, stage.width - pad * 2);
  const usableH = Math.max(240, stage.height - pad * 2);
  const halfW = Math.max(280, Math.floor((usableW - gap) / 2));
  const halfH = Math.max(180, Math.floor((usableH - gap) / 2));

  switch (layout) {
    case 'left-half':
      return { x: pad, y: pad, width: halfW, height: usableH };
    case 'right-half':
      return { x: pad + halfW + gap, y: pad, width: halfW, height: usableH };
    case 'top-half':
      return { x: pad, y: pad, width: usableW, height: halfH };
    case 'bottom-half':
      return { x: pad, y: pad + halfH + gap, width: usableW, height: halfH };
    case 'top-left':
      return { x: pad, y: pad, width: halfW, height: halfH };
    case 'top-right':
      return { x: pad + halfW + gap, y: pad, width: halfW, height: halfH };
    case 'bottom-left':
      return { x: pad, y: pad + halfH + gap, width: halfW, height: halfH };
    case 'bottom-right':
      return { x: pad + halfW + gap, y: pad + halfH + gap, width: halfW, height: halfH };
    case 'maximize':
      return { x: pad, y: pad, width: usableW, height: usableH };
  }
}

export const INITIAL_NOTIFICATIONS: readonly OsNotification[] = [
  {
    id: 'notif-welcome',
    title: 'Welcome to RISHI OS',
    message: 'Simulated developer workspace with soft glass neumorphic UI, virtual filesystem, and native shell.',
    timestamp: 'Just now',
    category: 'welcome',
    read: false,
    actionLabel: 'Explore Files',
    actionAppId: 'files',
  },
  {
    id: 'notif-appearance',
    title: 'Appearance Customization Ready',
    message: '8 preset color themes and 8 curated wallpapers are available in Appearance Settings.',
    timestamp: '3m ago',
    category: 'system',
    read: false,
    actionLabel: 'Customize Theme',
    actionSettingsTab: 'appearance',
    actionAppearanceSubTab: 'theme',
  },
  {
    id: 'notif-dormiq',
    title: 'DormiQ Case Study Featured',
    message: 'Hostel room allocation architecture, resident dossiers & Cheque Mate Hackathon Top 3.',
    timestamp: '8m ago',
    category: 'projects',
    read: false,
    actionLabel: 'View Project',
    actionAppId: 'projects',
    actionOptions: { projectSubView: 'dormiq' },
  },
];

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
      snapLayout: 'none',
      restoreRect: null,
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
    appearanceSubTab: 'theme',
    liveAnnouncement: '',
    windows: createInitialWindows(initialApp),
    activeAppId: initialApp,
    projectsSubView: launch.projectsSubView,
    filesTargetPath: VIRTUAL_ROOT,
    launcherOpen: false,
    mobileAllAppsOpen: false,
    quickSettingsOpen: false,
    notificationCenterOpen: false,
    shortcutsHelpOpen: false,
    altTabOpen: false,
    altTabIndex: 0,
    simulatedBrightness: 100,
    simulatedSoundMuted: false,
    notifications: [...INITIAL_NOTIFICATIONS],
    snapPreview: null,
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

  const themeId = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const [previewThemeId, setPreviewThemeId] = useState<ThemeId | null>(null);

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
    if (!open) {
      setPreviewThemeId(null);
    }
    setStore((prev) => ({ ...prev, aboutOsOpen: open, launcherOpen: false }));
  }, []);

  const openSettings = useCallback(
    (tab: SettingsTab = 'appearance', subTab?: AppearanceSubTab) => {
      setStore((prev) => ({
        ...prev,
        aboutOsOpen: true,
        settingsTab: tab,
        appearanceSubTab: subTab ?? prev.appearanceSubTab,
        launcherOpen: false,
      }));
    },
    []
  );

  const setAppearanceSubTab = useCallback((subTab: AppearanceSubTab) => {
    setStore((prev) => ({ ...prev, appearanceSubTab: subTab }));
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

  const setThemeId = useCallback((id: ThemeId, announce = true) => {
    if (!isValidThemeId(id)) return;
    writePersistedTheme(id);
    setPreviewThemeId(null);
    if (announce) {
      const name = getThemeConfig(id).name;
      setStore((prev) => ({
        ...prev,
        liveAnnouncement: `Color theme applied: ${name}`,
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

  const setQuickSettingsOpen = useCallback((open: boolean) => {
    setStore((prev) => ({
      ...prev,
      quickSettingsOpen: open,
      notificationCenterOpen: open ? false : prev.notificationCenterOpen,
      launcherOpen: open ? false : prev.launcherOpen,
    }));
  }, []);

  const setNotificationCenterOpen = useCallback((open: boolean) => {
    setStore((prev) => ({
      ...prev,
      notificationCenterOpen: open,
      quickSettingsOpen: open ? false : prev.quickSettingsOpen,
      launcherOpen: open ? false : prev.launcherOpen,
    }));
  }, []);

  const setShortcutsHelpOpen = useCallback((open: boolean) => {
    setStore((prev) => ({ ...prev, shortcutsHelpOpen: open }));
  }, []);

  const setAltTabOpen = useCallback((open: boolean) => {
    setStore((prev) => ({ ...prev, altTabOpen: open }));
  }, []);

  const setAltTabIndex = useCallback((index: number) => {
    setStore((prev) => ({ ...prev, altTabIndex: index }));
  }, []);

  const setSimulatedBrightness = useCallback((val: number) => {
    const clamped = Math.min(120, Math.max(50, Math.round(val)));
    setStore((prev) => ({ ...prev, simulatedBrightness: clamped }));
  }, []);

  const setSimulatedSoundMuted = useCallback((muted: boolean) => {
    setStore((prev) => ({
      ...prev,
      simulatedSoundMuted: muted,
      liveAnnouncement: muted
        ? 'System audio muted (simulated)'
        : 'System audio unmuted (simulated)',
    }));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setStore((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      notifications: [],
      liveAnnouncement: 'All notifications cleared',
    }));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  const setSnapPreview = useCallback((snap: SnapLayout | null) => {
    setStore((prev) => ({ ...prev, snapPreview: snap }));
  }, []);

  const snapWindow = useCallback(
    (appId: OsAppId, layout: SnapLayout) => {
      setStore((prev) => {
        const win = prev.windows[appId];
        if (!win) return prev;

        if (layout === 'none') {
          return {
            ...prev,
            snapPreview: null,
            windows: {
              ...prev.windows,
              [appId]: {
                ...win,
                snapLayout: 'none',
                rect: win.restoreRect ?? win.rect,
                restoreRect: null,
              },
            },
          };
        }

        if (layout === 'maximize') {
          return {
            ...prev,
            snapPreview: null,
            windows: {
              ...prev.windows,
              [appId]: {
                ...win,
                isMinimized: false,
                isMaximized: true,
                snapLayout: 'maximize',
                restoreRect:
                  win.snapLayout && win.snapLayout !== 'none'
                    ? win.restoreRect
                    : win.rect,
              },
            },
          };
        }

        const snappedRect = computeSnapRect(layout, stageBounds);
        if (!snappedRect) return prev;

        const restoreRect =
          win.snapLayout && win.snapLayout !== 'none'
            ? win.restoreRect
            : win.rect ??
              computeDefaultWindowRect(appId, stageBounds, win.cascadeIndex);

        return {
          ...prev,
          snapPreview: null,
          windows: {
            ...prev.windows,
            [appId]: {
              ...win,
              isOpen: true,
              isMinimized: false,
              isMaximized: false,
              hasCustomRect: true,
              snapLayout: layout,
              rect: snappedRect,
              restoreRect,
            },
          },
        };
      });
    },
    [stageBounds]
  );

  const unsnapWindow = useCallback(
    (appId: OsAppId) => {
      setStore((prev) => {
        const win = prev.windows[appId];
        if (!win || !win.snapLayout || win.snapLayout === 'none') return prev;

        return {
          ...prev,
          windows: {
            ...prev.windows,
            [appId]: {
              ...win,
              snapLayout: 'none',
              rect:
                win.restoreRect ??
                win.rect ??
                computeDefaultWindowRect(appId, stageBounds, win.cascadeIndex),
              restoreRect: null,
              isMaximized: false,
            },
          },
        };
      });
    },
    [stageBounds]
  );

  const unreadNotificationsCount = useMemo(
    () => store.notifications.filter((n) => !n.read).length,
    [store.notifications]
  );

  useEffect(() => {
    if (store.sessionPhase !== 'desktop') return;

    function handleKeyDown(e: KeyboardEvent) {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.isContentEditable);

      if (e.key === 'Escape') {
        if (store.snapPreview) {
          e.preventDefault();
          setSnapPreview(null);
          return;
        }
        if (store.altTabOpen) {
          e.preventDefault();
          setStore((prev) => ({ ...prev, altTabOpen: false }));
          return;
        }
        if (store.shortcutsHelpOpen) {
          e.preventDefault();
          setStore((prev) => ({ ...prev, shortcutsHelpOpen: false }));
          return;
        }
        if (store.quickSettingsOpen) {
          e.preventDefault();
          setStore((prev) => ({ ...prev, quickSettingsOpen: false }));
          return;
        }
        if (store.notificationCenterOpen) {
          e.preventDefault();
          setStore((prev) => ({ ...prev, notificationCenterOpen: false }));
          return;
        }
        if (store.launcherOpen) {
          e.preventDefault();
          setStore((prev) => ({ ...prev, launcherOpen: false }));
          return;
        }
        if (store.aboutOsOpen) {
          e.preventDefault();
          setAboutOsOpen(false);
          return;
        }
        if (store.logoutDialogOpen) {
          e.preventDefault();
          closeLogoutDialog();
          return;
        }
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setStore((prev) => ({
          ...prev,
          launcherOpen: !prev.launcherOpen,
          quickSettingsOpen: false,
          notificationCenterOpen: false,
        }));
        return;
      }

      if (e.altKey && (e.key === 'Tab' || e.code === 'Tab')) {
        e.preventDefault();
        const openAppIds = OS_APP_ORDER.filter((id) => store.windows[id].isOpen);
        if (openAppIds.length > 0) {
          setStore((prev) => {
            const nextIdx =
              (prev.altTabIndex + (e.shiftKey ? -1 : 1) + openAppIds.length) %
              openAppIds.length;
            return {
              ...prev,
              altTabOpen: true,
              altTabIndex: nextIdx,
            };
          });
        }
        return;
      }

      if (isInput) return;

      if (
        e.key === 'F1' ||
        (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey)
      ) {
        e.preventDefault();
        setStore((prev) => ({ ...prev, shortcutsHelpOpen: true }));
        return;
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === 'Alt' || e.code === 'AltLeft' || e.code === 'AltRight') {
        setStore((prev) => {
          if (!prev.altTabOpen) return prev;
          const openAppIds = OS_APP_ORDER.filter((id) => prev.windows[id].isOpen);
          const selectedApp = openAppIds[prev.altTabIndex] ?? null;
          if (selectedApp) {
            setTimeout(() => focusApp(selectedApp), 0);
          }
          return {
            ...prev,
            altTabOpen: false,
          };
        });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    closeLogoutDialog,
    focusApp,
    setAboutOsOpen,
    setSnapPreview,
    store.aboutOsOpen,
    store.altTabOpen,
    store.launcherOpen,
    store.logoutDialogOpen,
    store.notificationCenterOpen,
    store.quickSettingsOpen,
    store.sessionPhase,
    store.shortcutsHelpOpen,
    store.snapPreview,
    store.windows,
  ]);

  const value = useMemo<DesktopContextValue>(
    () => ({
      sessionPhase: effectiveSessionPhase,
      logoutDialogOpen: store.logoutDialogOpen,
      aboutOsOpen: store.aboutOsOpen,
      settingsTab: store.settingsTab,
      appearanceSubTab: store.appearanceSubTab,
      wallpaperId,
      themeId,
      previewThemeId,
      windows: store.windows,
      activeAppId: store.activeAppId,
      projectsSubView: store.projectsSubView,
      filesTargetPath: store.filesTargetPath,
      launcherOpen: store.launcherOpen,
      mobileAllAppsOpen: store.mobileAllAppsOpen,
      quickSettingsOpen: store.quickSettingsOpen,
      notificationCenterOpen: store.notificationCenterOpen,
      shortcutsHelpOpen: store.shortcutsHelpOpen,
      altTabOpen: store.altTabOpen,
      altTabIndex: store.altTabIndex,
      simulatedBrightness: store.simulatedBrightness,
      simulatedSoundMuted: store.simulatedSoundMuted,
      notifications: store.notifications,
      unreadNotificationsCount,
      snapPreview: store.snapPreview,
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
      setAppearanceSubTab,
      setWallpaperId,
      setThemeId,
      setPreviewThemeId,
      setStageBounds,
      setLauncherOpen,
      setMobileAllAppsOpen,
      setQuickSettingsOpen,
      setNotificationCenterOpen,
      setShortcutsHelpOpen,
      setAltTabOpen,
      setAltTabIndex,
      setSimulatedBrightness,
      setSimulatedSoundMuted,
      dismissNotification,
      clearAllNotifications,
      markAllNotificationsRead,
      setSnapPreview,
      snapWindow,
      unsnapWindow,
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
      clearAllNotifications,
      closeApp,
      closeLogoutDialog,
      confirmLogout,
      dismissNotification,
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
      markAllNotificationsRead,
      minimizeApp,
      openApp,
      openLogoutDialog,
      openSettings,
      previewThemeId,
      resetWindows,
      setAboutOsOpen,
      setAltTabIndex,
      setAltTabOpen,
      setAppearanceSubTab,
      setFilesTargetPath,
      setLauncherOpen,
      setMobileAllAppsOpen,
      setNotificationCenterOpen,
      setPreviewThemeId,
      setProjectsSubView,
      setQuickSettingsOpen,
      setShortcutsHelpOpen,
      setSimulatedBrightness,
      setSimulatedSoundMuted,
      setSnapPreview,
      setStageBounds,
      setThemeId,
      setWallpaperId,
      showDesktop,
      skipToPortfolio,
      snapWindow,
      stageBounds,
      startLogin,
      store,
      themeId,
      toggleMaximizeApp,
      unreadNotificationsCount,
      unsnapWindow,
      updateWindowRect,
      wallpaperId,
    ]
  );

  return (
    <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
  );
}
