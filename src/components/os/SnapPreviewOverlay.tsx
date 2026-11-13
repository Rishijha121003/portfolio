'use client';

import React from 'react';
import { useDesktop, computeSnapRect } from './DesktopContext';
import styles from './SnapPreviewOverlay.module.css';

export function SnapPreviewOverlay() {
  const { snapPreview, stageBounds } = useDesktop();

  if (!snapPreview || snapPreview === 'none') return null;

  const rect = computeSnapRect(snapPreview, stageBounds);
  if (!rect) return null;

  const labelMap: Record<string, string> = {
    'left-half': 'Snap Left',
    'right-half': 'Snap Right',
    'top-half': 'Snap Top',
    'bottom-half': 'Snap Bottom',
    'top-left': 'Snap Top-Left',
    'top-right': 'Snap Top-Right',
    'bottom-left': 'Snap Bottom-Left',
    'bottom-right': 'Snap Bottom-Right',
    maximize: 'Snap Maximize',
  };

  return (
    <div
      className={styles.snapOverlay}
      style={{
        left: `${rect.x}px`,
        top: `${rect.y}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      }}
      aria-hidden="true"
    >
      <div className={styles.snapBadge}>
        <span className={styles.snapBadgeDot} />
        <span>{labelMap[snapPreview] ?? 'Snap Window'}</span>
      </div>
    </div>
  );
}

