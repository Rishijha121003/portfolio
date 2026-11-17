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
 * Modern Cyberpunk Greeter / Lockscreen for RISHI OS
 * Designed with Linear / Raycast / SDDM Hyprland glassmorphism aesthetic,
 * concentric avatar hologram, live optical clock, and smooth keyboard/interactive flows.
 */
export function LoginScreen() {
  const pathname = usePathname();
  const { sessionPhase, startLogin, skipToPortfolio, themeId } = useDesktop();
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
    <div className={styles.screen} data-rishi-theme={themeId} aria-label="RISHI OS Login Screen">
      {/* Dynamic Cyber Atmospheric Backdrop */}
      <div className={styles.wallpaper} aria-hidden="true">
        <div className={styles.wallpaperMesh} />
        <div className={styles.wallpaperGrid} />
      </div>

      {/* Top Cyber Display Manager Bar */}
      <header className={styles.topBar}>
        <div className={styles.barLeft}>
          <span className={styles.brandEmblem}>
            <RishiOsBrandIcon size={22} variant="standalone" />
          </span>
          <span className={styles.barTitle}>RISHI OS</span>
          <span className={styles.barVersionPill}>v2.4</span>
          <span className={styles.barTag}>{'// GREETER · GDM'}</span>
        </div>

        <div className={styles.barRight}>
          <div className={styles.sessionStatusPill}>
            <span className={styles.statusDotGreen} aria-hidden="true" />
            <span>SESSION READY</span>
          </div>

          <div className={styles.keyHintBadge}>
            <kbd className={styles.keyCap}>↵ Enter</kbd>
            <span className={styles.keyHintText}>to login</span>
          </div>

          <div className={styles.topBarDivider} aria-hidden="true" />

          <time className={styles.barClock} dateTime={clock.compactDateTime} suppressHydrationWarning>
            {clock.compactDateTime}
          </time>
        </div>
      </header>

      {/* Main Greeter Stage */}
      <main id="main-content" className={styles.centerStage}>
        {/* Large Cinematic Hero Clock */}
        <div className={styles.heroClockBlock}>
          <time className={styles.clockTime} dateTime={clock.time24} suppressHydrationWarning>
            {clock.time24}
          </time>
          <div className={styles.clockDateRow}>
            <span className={styles.clockDate} suppressHydrationWarning>
              {clock.fullDate}
            </span>
            <span className={styles.clockDateSep} aria-hidden="true">•</span>
            <span className={styles.clockEnv}>DEV WORKSPACE</span>
          </div>
        </div>

        {/* Glassmorphism Login Card */}
        <section className={styles.card} aria-labelledby="greeter-username">
          {/* Glowing Ambient Edge Reflection */}
          <div className={styles.cardReflectionGlow} aria-hidden="true" />

          {/* Futuristic Concentric Avatar Ring */}
          <div
            className={
              isAuthenticating
                ? `${styles.avatarWrap} ${styles.avatarAuthenticating}`
                : styles.avatarWrap
            }
            aria-hidden="true"
          >
            <div className={styles.avatarPulseRing} />
            <div className={styles.avatarInner}>
              <RishiOsBrandIcon size={56} variant="primary" />
            </div>
            <span className={styles.avatarStatusDot} title="User Online" />
          </div>

          {/* Identity Header */}
          <div className={styles.identityBlock}>
            <span className={styles.greetingEyebrow}>WELCOME TO RISHI OS</span>
            <h1 id="greeter-username" className={styles.username}>
              {SITE_IDENTITY.fullName}
            </h1>
            <p className={styles.subtitle}>
              B.Tech CSE (4th Year) · Sandip University
            </p>
          </div>

          {/* Simulated Lock Credentials Bar */}
          <div className={styles.sessionMetaPill}>
            <div className={styles.sessionPillLeft}>
              <span className={styles.lockIcon} aria-hidden="true">🔒</span>
              <span>Guest Session · Passwordless Access</span>
            </div>
            <span className={styles.autoAuthBadge}>AUTO-AUTH</span>
          </div>

          {pathname !== '/' ? (
            <span className={styles.targetRouteNote}>
              {`Target destination: ${targetLabel}`}
            </span>
          ) : null}

          {/* Action Buttons */}
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
                  <span>INITIALIZING WORKSPACE...</span>
                </>
              ) : (
                <>
                  <span>LOG IN</span>
                  <span className={styles.arrowIcon} aria-hidden="true">→</span>
                  <kbd className={styles.buttonKeyHint} aria-hidden="true">↵</kbd>
                </>
              )}
            </button>

            <div className={styles.actionDivider} aria-hidden="true">
              <span className={styles.dividerLine} />
              <span className={styles.dividerLabel}>OR</span>
              <span className={styles.dividerLine} />
            </div>

            <button
              type="button"
              className={styles.skipButton}
              disabled={isAuthenticating}
              onClick={skipToPortfolio}
            >
              <span>Skip to Web Portfolio</span>
              <span className={styles.skipArrow} aria-hidden="true">↗</span>
            </button>
          </div>

          {/* Authenticating Cinematic Transition Progress */}
          {isAuthenticating ? (
            <div className={styles.welcomeTransitionBox} role="status" aria-live="polite">
              <div className={styles.terminalBootLine}>
                <span className={styles.promptDot} />
                <span className={styles.welcomeMessage}>
                  {`Welcome, ${SITE_IDENTITY.fullName.split(' ')[0]}. Mounting desktop environment...`}
                </span>
              </div>
              <div className={styles.bootBarTrack} aria-hidden="true">
                <div className={styles.bootBarFill} />
              </div>
            </div>
          ) : null}
        </section>
      </main>

      {/* Futuristic Bottom Status Bar */}
      <footer className={styles.bottomBar}>
        <div className={styles.bottomLeft}>
          <span className={styles.shellPrompt}>~/$</span>
          <span>RISHI OS v2.4 // WORKSPACE KERNEL 6.8</span>
        </div>
        <div className={styles.bottomCenter}>
          <span>PUBLIC DEVELOPER SESSION · SANDBOXED</span>
        </div>
        <div className={styles.bottomRight}>
          <span>DARBHANGA, BIHAR // SECURE SHELL</span>
        </div>
      </footer>
    </div>
  );
}
