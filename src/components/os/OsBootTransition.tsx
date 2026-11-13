'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './OsBootTransition.module.css';

interface OsBootTransitionProps {
  target?: 'os' | 'portfolio';
  onComplete: () => void;
  onFinished: () => void;
}

/**
 * Fullscreen atmospheric transition between Portfolio and RISHI OS.
 * Displays Midnight Blue (#071426) atmosphere, official RJ monogram with cyber glow,
 * minimal terminal status lines, and an animated progress bar (~700-900ms).
 */
export function OsBootTransition({
  target = 'os',
  onComplete,
  onFinished,
}: OsBootTransitionProps) {
  const [phase, setPhase] = useState<'booting' | 'exiting'>('booting');
  const [progress, setProgress] = useState(14);
  const [stepLine, setStepLine] = useState(1);

  const isOsTarget = target === 'os';
  const primaryLine = isOsTarget
    ? 'INITIALIZING RISHI OS...'
    : 'INITIALIZING PORTFOLIO...';
  const secondaryLine = isOsTarget
    ? 'LOADING DESKTOP ENVIRONMENT...'
    : 'LOADING DEVELOPER PROFILE...';
  const metaLabel = isOsTarget ? 'BOOT_SEQUENCE' : 'PORTFOLIO_LOAD';
  const ariaLabel = isOsTarget
    ? 'RISHI OS Boot Transition'
    : 'Portfolio Transition';

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onComplete();
      const quickTimer = window.setTimeout(() => {
        onFinished();
      }, 80);
      return () => window.clearTimeout(quickTimer);
    }

    // Step 1: Progress accelerates
    const t1 = window.setTimeout(() => {
      setProgress(54);
    }, 140);

    // Step 2: Second terminal line reveals
    const t2 = window.setTimeout(() => {
      setStepLine(2);
      setProgress(86);
    }, 360);

    // Step 3: Hits 100%
    const t3 = window.setTimeout(() => {
      setProgress(100);
    }, 580);

    // Step 4: Switch underlying mode behind the opaque overlay
    const t4 = window.setTimeout(() => {
      onComplete();
      setPhase('exiting');
    }, 700);

    // Step 5: Overlay fade-out finishes, unmount
    const t5 = window.setTimeout(() => {
      onFinished();
    }, 920);

    // Safety fallback timer to prevent any stuck state
    const failSafe = window.setTimeout(() => {
      onComplete();
      onFinished();
    }, 1600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
      window.clearTimeout(failSafe);
    };
  }, [onComplete, onFinished]);

  return (
    <div
      className={`${styles.overlay} ${phase === 'exiting' ? styles.overlayExiting : ''}`}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className={styles.content}>
        {/* Center Official RJ Monogram with Cyan/Blue Cyber Glow */}
        <div className={styles.logoWrap}>
          <Image
            src="/images/rj-primary.svg"
            alt="RJ Monogram"
            width={84}
            height={84}
            priority
            className={styles.logoImg}
          />
        </div>

        {/* Minimal Terminal-Inspired Status Text */}
        <div className={styles.textBlock}>
          <div className={styles.terminalLine}>
            <span className={styles.promptSymbol} aria-hidden="true">
              {'>_'}
            </span>
            <span>{primaryLine}</span>
          </div>

          {stepLine >= 2 ? (
            <div className={styles.terminalSubLine}>
              <span className={styles.promptSymbol} aria-hidden="true">
                {'>'}
              </span>
              <span>{secondaryLine}</span>
            </div>
          ) : null}
        </div>

        {/* Elegant Animated Progress Indicator */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.progressMeta}>
            <span>{metaLabel}</span>
            <span className={styles.metaPercent}>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
