'use client';

import React from 'react';
import { useDesktop } from './DesktopContext';
import styles from './ShortcutsHelpDialog.module.css';

export function ShortcutsHelpDialog() {
  const { shortcutsHelpOpen, setShortcutsHelpOpen } = useDesktop();

  if (!shortcutsHelpOpen) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
      onClick={() => setShortcutsHelpOpen(false)}
    >
      <div
        className={styles.modal}
        data-os-chrome="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 id="shortcuts-title" className={styles.title}>
              Keyboard Shortcuts &amp; Gestures
            </h2>
            <span className={styles.subtitle}>
              RISHI OS · Simulated Developer Workspace
            </span>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setShortcutsHelpOpen(false)}
            aria-label="Close shortcuts help"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.sectionHeading}>
              <span>⚡ Global Navigation</span>
            </div>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>
                    <kbd className={styles.kbd}>Ctrl</kbd>
                    <span className={styles.kbdPlus}>+</span>
                    <kbd className={styles.kbd}>K</kbd>
                  </td>
                  <td className={styles.desc}>
                    Global Search across apps, projects, virtual files &amp; shell commands
                  </td>
                </tr>
                <tr>
                  <td>
                    <kbd className={styles.kbd}>Alt</kbd>
                    <span className={styles.kbdPlus}>+</span>
                    <kbd className={styles.kbd}>Tab</kbd>
                  </td>
                  <td className={styles.desc}>
                    Cycle through open windows &amp; switch active window HUD
                  </td>
                </tr>
                <tr>
                  <td>
                    <kbd className={styles.kbd}>Escape</kbd>
                  </td>
                  <td className={styles.desc}>
                    Close the top-most overlay, modal, search, or popover
                  </td>
                </tr>
                <tr>
                  <td>
                    <kbd className={styles.kbd}>F1</kbd> or <kbd className={styles.kbd}>?</kbd>
                  </td>
                  <td className={styles.desc}>
                    Open this Keyboard Shortcuts &amp; Gestures reference dialog
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeading}>
              <span>🪟 Window Management &amp; Snap Layouts</span>
            </div>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>
                    <span className={styles.kbd}>Drag to Edge</span>
                  </td>
                  <td className={styles.desc}>
                    Drag window to left/right edge to snap half, or top edge to maximize
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.kbd}>Drag to Corner</span>
                  </td>
                  <td className={styles.desc}>
                    Drag window to any of the 4 screen corners to snap into quarter grid
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.kbd}>Titlebar Snap Button</span>
                  </td>
                  <td className={styles.desc}>
                    Click snap grid icon in titlebar to choose a 1-click snap preset
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.kbd}>Double-click Titlebar</span>
                  </td>
                  <td className={styles.desc}>
                    Toggle Maximize / Restore window to original dimensions
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeading}>
              <span>💻 Built-in Terminal Commands</span>
            </div>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>
                    <kbd className={styles.kbd}>neofetch</kbd>
                  </td>
                  <td className={styles.desc}>
                    Display system specs, DE info, uptime and ASCII logo
                  </td>
                </tr>
                <tr>
                  <td>
                    <kbd className={styles.kbd}>cmatrix</kbd>
                  </td>
                  <td className={styles.desc}>
                    Interactive digital green rain simulation (press q to exit)
                  </td>
                </tr>
                <tr>
                  <td>
                    <kbd className={styles.kbd}>cat resume.md</kbd>
                  </td>
                  <td className={styles.desc}>
                    Quickly inspect Rishi&apos;s Curriculum Vitae in the terminal
                  </td>
                </tr>
                <tr>
                  <td>
                    <kbd className={styles.kbd}>theme [id]</kbd>
                  </td>
                  <td className={styles.desc}>
                    Apply one of the 8 color themes directly from command line
                  </td>
                </tr>
                <tr>
                  <td>
                    <kbd className={styles.kbd}>clear</kbd> or{' '}
                    <kbd className={styles.kbd}>Ctrl+L</kbd>
                  </td>
                  <td className={styles.desc}>
                    Clear terminal command history and screen buffer
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.footer}>
          <span>Press Escape or click outside to dismiss</span>
          <span>Simulated Desktop UI · Non-destructive</span>
        </div>
      </div>
    </div>
  );
}

