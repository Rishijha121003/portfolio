'use client';

import React from 'react';
import { useDesktop } from './DesktopContext';
import styles from './NotificationCenter.module.css';

export function NotificationCenter() {
  const {
    notificationCenterOpen,
    notifications,
    unreadNotificationsCount,
    setNotificationCenterOpen,
    dismissNotification,
    clearAllNotifications,
    markAllNotificationsRead,
    openApp,
    openSettings,
  } = useDesktop();

  if (!notificationCenterOpen) return null;

  return (
    <>
      <div
        className={styles.backdrop}
        aria-hidden="true"
        onClick={() => setNotificationCenterOpen(false)}
      />
      <section
        className={styles.popover}
        data-os-chrome="true"
        role="region"
        aria-label="Notification Center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.title}>Notifications</span>
            {unreadNotificationsCount > 0 ? (
              <span className={styles.badge}>{unreadNotificationsCount} new</span>
            ) : null}
          </div>

          <div className={styles.headerActions}>
            {unreadNotificationsCount > 0 ? (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={markAllNotificationsRead}
              >
                Mark read
              </button>
            ) : null}
            {notifications.length > 0 ? (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={clearAllNotifications}
              >
                Clear all
              </button>
            ) : null}
          </div>
        </div>

        <div className={styles.list}>
          {notifications.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🔔</span>
              <span className={styles.emptyText}>No notifications</span>
              <span style={{ fontSize: '11px', opacity: 0.7 }}>
                You&apos;re completely caught up!
              </span>
            </div>
          ) : (
            notifications.map((item) => (
              <article key={item.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemCategory}>{item.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className={styles.itemTime}>{item.timestamp}</span>
                    <button
                      type="button"
                      className={styles.dismissBtn}
                      onClick={() => dismissNotification(item.id)}
                      aria-label={`Dismiss notification: ${item.title}`}
                      title="Dismiss"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemMessage}>{item.message}</p>

                {item.actionLabel ? (
                  <div className={styles.itemFooter}>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => {
                        setNotificationCenterOpen(false);
                        dismissNotification(item.id);
                        if (item.actionSettingsTab) {
                          openSettings(
                            item.actionSettingsTab,
                            item.actionAppearanceSubTab
                          );
                        } else if (item.actionAppId) {
                          openApp(item.actionAppId, item.actionOptions);
                        }
                      }}
                    >
                      <span>{item.actionLabel}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                ) : null}
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}

