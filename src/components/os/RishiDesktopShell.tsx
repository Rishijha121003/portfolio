'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AboutAppView } from '@/components/os/apps/AboutAppView';
import { ContactAppView } from '@/components/os/apps/ContactAppView';
import { FileManagerApp } from '@/components/os/apps/FileManagerApp';
import { HomeAppView } from '@/components/os/apps/HomeAppView';
import { JourneyAppView } from '@/components/os/apps/JourneyAppView';
import { ProjectsAppView } from '@/components/os/apps/ProjectsAppView';
import { SkillsAppView } from '@/components/os/apps/SkillsAppView';
import { TerminalApp } from '@/components/os/apps/TerminalApp';
import { DesktopBackground } from '@/components/os/DesktopBackground';
import { AboutOsDialog } from '@/components/os/AboutOsDialog';
import { AltTabSwitcher } from '@/components/os/AltTabSwitcher';
import { DesktopProvider, useDesktop } from '@/components/os/DesktopContext';
import { DesktopDock } from '@/components/os/DesktopDock';
import { DesktopIcons } from '@/components/os/DesktopIcons';
import { DesktopHud } from '@/components/os/DesktopHud';
import { DesktopWindow } from '@/components/os/DesktopWindow';
import { GlobalSearchDialog } from '@/components/os/GlobalSearchDialog';
import { LoginScreen } from '@/components/os/LoginScreen';
import { LogoutDialog } from '@/components/os/LogoutDialog';
import { NotificationCenter } from '@/components/os/NotificationCenter';
import { OsBootTransition } from '@/components/os/OsBootTransition';
import { OsAppIcon, RishiOsBrandIcon } from '@/components/os/OsIcons';
import { QuickSettingsPanel } from '@/components/os/QuickSettingsPanel';
import { ShortcutsHelpDialog } from '@/components/os/ShortcutsHelpDialog';
import { SnapPreviewOverlay } from '@/components/os/SnapPreviewOverlay';
import { TopSystemPanel } from '@/components/os/TopSystemPanel';
import { SITE_IDENTITY } from '@/data/portfolio';
import type { OsAppId } from '@/data/rishiOs';
import { OS_APPS, PHASE1_VISIBLE_APPS } from '@/data/rishiOs';
import styles from './RishiDesktopShell.module.css';

function renderApplicationView(appId: OsAppId): ReactNode {
  switch (appId) {
    case 'home':
      return <HomeAppView />;
    case 'projects':
      return <ProjectsAppView />;
    case 'about':
      return <AboutAppView />;
    case 'journey':
      return <JourneyAppView />;
    case 'skills':
      return <SkillsAppView />;
    case 'contact':
      return <ContactAppView />;
    case 'terminal':
      return <TerminalApp />;
    case 'files':
      return <FileManagerApp />;
  }
}

function DesktopWorkspace({ routeFallback }: { routeFallback: ReactNode }) {
  const {
    windows,
    activeAppId,
    mobileAllAppsOpen,
    setMobileAllAppsOpen,
    isMobile,
    isKnownRoute,
    liveAnnouncement,
    setStageBounds,
    openApp,
    themeId,
    previewThemeId,
    simulatedBrightness,
  } = useDesktop();

  const effectiveThemeId = previewThemeId ?? themeId;
  const windowsLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mobileAllAppsOpen || !activeAppId || windows[activeAppId]?.isMinimized) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileAllAppsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeAppId, mobileAllAppsOpen, setMobileAllAppsOpen, windows]);

  useEffect(() => {
    const el = windowsLayerRef.current;
    if (!el) return;

    const updateBounds = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setStageBounds({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };

    updateBounds();

    const observer = new ResizeObserver(updateBounds);
    observer.observe(el);
    return () => observer.disconnect();
  }, [setStageBounds]);

  const showMobileLauncher =
    isMobile &&
    isKnownRoute &&
    (mobileAllAppsOpen || !activeAppId || windows[activeAppId]?.isMinimized);

  return (
    <div className={styles.shell} data-rishi-theme={effectiveThemeId}>
      <TopSystemPanel />

      <main
        id="main-content"
        className={styles.stage}
        style={{
          filter:
            simulatedBrightness !== 100
              ? `brightness(${simulatedBrightness}%)`
              : undefined,
        }}
      >
        <h1 className={styles.srOnly}>RISHI OS Workspace</h1>
        <div
          id="rishi-os-live-status"
          className={styles.srOnly}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {liveAnnouncement}
        </div>
        <DesktopBackground />
        <DesktopIcons />
        <DesktopHud />

        <div ref={windowsLayerRef} className={styles.windowsLayer}>
          <SnapPreviewOverlay />
          {!isKnownRoute ? (
            <div className={styles.notFoundWindow} data-os-window="true">
              {routeFallback}
            </div>
          ) : showMobileLauncher ? (
            <section
              className={styles.mobileWorkspace}
              data-os-window="true"
              aria-label="RISHI OS Mobile Applications"
            >
              <div className={styles.mobileWelcomeCard}>
                <span className={styles.mobileTag}>
                  <RishiOsBrandIcon size={14} variant="standalone" />
                  <span>{'RISHI OS // MOBILE WORKSPACE'}</span>
                </span>
                <h2 className={styles.mobileTitle}>{SITE_IDENTITY.fullName}</h2>
                <p className={styles.mobileSub}>
                  Select an application below to open its full-screen window.
                </p>
              </div>

              <div className={styles.mobileAppGrid}>
                {PHASE1_VISIBLE_APPS.map((id) => {
                  const app = OS_APPS[id];
                  return (
                    <button
                      key={id}
                      type="button"
                      className={styles.mobileAppTile}
                      onClick={() => openApp(id)}
                    >
                      <div className={styles.mobileAppTop}>
                        <OsAppIcon appId={id} size={20} />
                        <span className={styles.mobileAppPath}>{app.pathLabel}</span>
                      </div>
                      <span className={styles.mobileAppLabel}>{app.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : isMobile && activeAppId ? (
            <DesktopWindow appId={activeAppId} stageRef={windowsLayerRef}>
              {renderApplicationView(activeAppId)}
            </DesktopWindow>
          ) : (
            PHASE1_VISIBLE_APPS.map((appId) => (
              <DesktopWindow
                key={appId}
                appId={appId}
                stageRef={windowsLayerRef}
              >
                {renderApplicationView(appId)}
              </DesktopWindow>
            ))
          )}
        </div>
      </main>

      <DesktopDock />
      <AboutOsDialog />
      <LogoutDialog />
      <GlobalSearchDialog />
      <QuickSettingsPanel />
      <NotificationCenter />
      <ShortcutsHelpDialog />
      <AltTabSwitcher />
    </div>
  );
}

function SessionGate({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const {
    sessionPhase,
    enterDesktopFromPortfolio,
    isBootingToOs,
    isBootingToPortfolio,
    handleBootComplete,
    handleBootFinish,
    handlePortfolioBootComplete,
    handlePortfolioBootFinish,
  } = useDesktop();

  return (
    <>
      {sessionPhase === 'portfolio' ? (
        <AppShell
          footer={footer}
          onEnterOs={enterDesktopFromPortfolio}
          isExiting={isBootingToOs}
        >
          {children}
        </AppShell>
      ) : sessionPhase === 'desktop' ? (
        <DesktopWorkspace routeFallback={children} />
      ) : (
        <LoginScreen />
      )}

      {isBootingToOs ? (
        <OsBootTransition
          target="os"
          onComplete={handleBootComplete}
          onFinished={handleBootFinish}
        />
      ) : null}

      {isBootingToPortfolio ? (
        <OsBootTransition
          target="portfolio"
          onComplete={handlePortfolioBootComplete}
          onFinished={handlePortfolioBootFinish}
        />
      ) : null}
    </>
  );
}

/**
 * Controlled client shell coordinating Login Greeter, Classic Portfolio Mode, and RISHI OS Desktop Mode.
 */
export function RishiDesktopShell({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <DesktopProvider>
      <SessionGate footer={footer}>{children}</SessionGate>
    </DesktopProvider>
  );
}
