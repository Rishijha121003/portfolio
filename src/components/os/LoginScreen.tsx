'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useDesktop } from '@/components/os/DesktopContext';
import { RishiOsBrandIcon } from '@/components/os/OsIcons';
import { useOsClock } from '@/components/os/useOsClock';
import { SITE_IDENTITY } from '@/data/portfolio';
import { OS_APPS, resolveRouteLaunch } from '@/data/rishiOs';
import styles from './LoginScreen.module.css';

/**
 * Ubuntu GDM / KDE SDDM inspired simulated login greeter rendered prior to revealing the RISHI OS desktop.
 */
export function LoginScreen() {
  const pathname = usePathname();
  const { sessionPhase, startLogin, skipToPortfolio } = useDesktop();
  const clock = useOsClock();
  const loginButtonRef = useRef<HTMLButtonElement | null>(null);

  const isAuthenticating = sessionPhase === 'authenticating';
  const launchTarget = resolveRouteLaunch(pathname);
  const targetLabel = !launchTarget.isKnown
    ? '404 // Route Not Found'
    : launchTarget.appId === 'projects' && launchTarget.projectsSubView === 'dormiq'
      ? '~/projects/dormiq'
      : OS_APPS[launchTarget.appId].pathLabel;

  // Support pressing Enter from anywhere on the greeter to initiate simulated login.
  useEffect(() => {
    if (sessionPhase !== 'login') return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'BUTTON' || activeTag === 'A') return;
      event.preventDefault();
      startLogin();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sessionPhase, startLogin]);

  return (
    <div className={styles.screen} aria-label="RISHI OS Login Screen">
      <div className={styles.wallpaper} aria-hidden="true" />

      {/* Top Display Manager Bar */}
      <header className={styles.topBar}>
        <div className={styles.barLeft}>
          <span className={styles.brandEmblem}>
            <RishiOsBrandIcon size={20} variant="standalone" />
          </span>
          <span className={styles.barTitle}>RISHI OS</span>
          <span className={styles.barTag}>{'// GREETER'}</span>
        </div>

        <div className={styles.barRight}>
          <span className={styles.keyHint}>Press Enter to log in</span>
          <time className={styles.barClock} dateTime={clock.compactDateTime} suppressHydrationWarning>
            {clock.compactDateTime}
          </time>
        </div>
      </header>

      {/* Main Greeter Stage */}
      <main id="main-content" className={styles.centerStage}>
        <div className={styles.heroClockBlock}>
          <time className={styles.clockTime} dateTime={clock.time24} suppressHydrationWarning>
            {clock.time24}
          </time>
          <span className={styles.clockDate} suppressHydrationWarning>{clock.fullDate}</span>
        </div>

        <section className={styles.card} aria-labelledby="greeter-username">
          <div
            className={
              isAuthenticating
                ? `${styles.avatarWrap} ${styles.avatarAuthenticating}`
                : styles.avatarWrap
            }
            aria-hidden="true"
          >
            <span className={styles.avatarMonogram}>
              <RishiOsBrandIcon size={52} variant="primary" />
            </span>
            <span className={styles.avatarStatusDot} />
          </div>

          <div>
            <span className={styles.greetingEyebrow}>WELCOME TO RISHI OS</span>
            <h1 id="greeter-username" className={styles.username}>
              {SITE_IDENTITY.fullName}
            </h1>
            <p className={styles.subtitle}>A Developer&apos;s Workspace</p>
          </div>

          <div className={styles.sessionMetaPill}>
            Guest Session · No password required
          </div>

          {pathname !== '/' ? (
            <span className={styles.targetRouteNote}>
              {`Pending workspace target: ${targetLabel}`}
            </span>
          ) : null}

          <div className={styles.actionsGroup}>
            <button
              type="button"
              className={styles.loginButton}
              ref={loginButtonRef}
              disabled={isAuthenticating}
              aria-busy={isAuthenticating}
              onClick={startLogin}
            >
              {isAuthenticating ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <span>LOG IN</span>
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>

            <div className={styles.actionDivider} aria-hidden="true">
              <span className={styles.dividerLine} />
              <span className={styles.dividerLabel}>or</span>
              <span className={styles.dividerLine} />
            </div>

            <button
              type="button"
              className={styles.skipButton}
              disabled={isAuthenticating}
              onClick={skipToPortfolio}
            >
              <span>Skip to Portfolio</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {isAuthenticating ? (
            <div className={styles.welcomeTransitionBox} role="status" aria-live="polite">
              <span className={styles.welcomeMessage}>
                {`Welcome, ${SITE_IDENTITY.fullName.split(' ')[0]}. Loading RISHI OS workspace...`}
              </span>
              <div className={styles.bootBarTrack} aria-hidden="true">
                <div className={styles.bootBarFill} />
              </div>
            </div>
          ) : null}
        </section>
      </main>

      {/* Subtle System Session Footer */}
      <footer className={styles.bottomBar}>
        <span>RISHI OS v2.4 // WORKSPACE</span>
        <span>Public Developer Session</span>
      </footer>
    </div>
  );
}
