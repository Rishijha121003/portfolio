'use client';

import { useSyncExternalStore } from 'react';

export interface OsClockReading {
  time24: string;
  fullDate: string;
  compactDateTime: string;
}

const SERVER_READING: OsClockReading = {
  time24: '--:--',
  fullDate: 'RISHI OS',
  compactDateTime: '-- --- · --:--',
};

let cachedKey = '';
let cachedReading: OsClockReading = SERVER_READING;

function subscribeClock(callback: () => void): () => void {
  const intervalId = window.setInterval(callback, 15000);
  return () => window.clearInterval(intervalId);
}

function getClockSnapshot(): OsClockReading {
  const now = new Date();
  const time24 = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const fullDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const shortDate = now.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
  const key = `${shortDate}|${time24}`;
  if (key !== cachedKey) {
    cachedKey = key;
    cachedReading = {
      time24,
      fullDate,
      compactDateTime: `${shortDate} · ${time24}`,
    };
  }
  return cachedReading;
}

function getClockServerSnapshot(): OsClockReading {
  return SERVER_READING;
}

/**
 * Shared hydration-safe OS clock subscription via useSyncExternalStore.
 */
export function useOsClock(): OsClockReading {
  return useSyncExternalStore(
    subscribeClock,
    getClockSnapshot,
    getClockServerSnapshot
  );
}

