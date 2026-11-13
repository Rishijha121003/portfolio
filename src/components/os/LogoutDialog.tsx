'use client';

import { useEffect, useRef } from 'react';
import { useDesktop } from '@/components/os/DesktopContext';
import { RishiOsBrandIcon } from '@/components/os/OsIcons';
import { SITE_IDENTITY } from '@/data/portfolio';
import styles from './LogoutDialog.module.css';

/**
 * Confirmation modal with accessible focus trap and trigger focus restoration before ending the RISHI OS session.
 */
export function LogoutDialog() {
  const { logoutDialogOpen, closeLogoutDialog, confirmLogout } = useDesktop();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!logoutDialogOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    cancelButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLogoutDialog();
        return;
      }

      if (event.key === 'Tab') {
        const focusables = [cancelButtonRef.current, confirmButtonRef.current].filter(
          (el): el is HTMLButtonElement => Boolean(el)
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (previousFocus && document.contains(previousFocus)) {
        previousFocus.focus();
      }
    };
  }, [closeLogoutDialog, logoutDialogOpen]);

  if (!logoutDialogOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLogoutDialog();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-desc"
      >
        <div className={styles.header}>
          <RishiOsBrandIcon size={16} variant="standalone" />
          <span>System Session // Log Out</span>
        </div>

        <div className={styles.body}>
          <h2 id="logout-dialog-title" className={styles.title}>
            End Session?
          </h2>
          <p id="logout-dialog-desc" className={styles.description}>
            {`Log out of ${SITE_IDENTITY.fullName}'s RISHI OS workspace and return to the login greeter. Open window layout will reset cleanly.`}
          </p>

          <div className={styles.actions}>
            <button
              ref={cancelButtonRef}
              type="button"
              className={styles.cancelBtn}
              onClick={closeLogoutDialog}
            >
              Cancel
            </button>
            <button
              ref={confirmButtonRef}
              type="button"
              className={styles.confirmBtn}
              onClick={confirmLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
