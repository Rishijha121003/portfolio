import { useId } from 'react';
import type { OsAppId } from '@/data/rishiOs';

export interface IconProps {
  size?: number;
  className?: string;
}

export interface RishiOsBrandIconProps extends IconProps {
  variant?: 'standalone' | 'primary' | 'white' | 'black';
}

/**
 * Official RJ Monogram emblem for RISHI OS chrome and branding.
 * Supports standalone (default), primary with outer orbital rings, white, and black variants.
 */
export function RishiOsBrandIcon({
  size = 20,
  className,
  variant = 'standalone',
}: RishiOsBrandIconProps) {
  const gradId = useId();

  if (variant === 'primary') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="64"
            y1="64"
            x2="448"
            y2="448"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#00D9E8" />
            <stop offset="50%" stopColor="#2878ED" />
            <stop offset="100%" stopColor="#7952E8" />
          </linearGradient>
        </defs>
        <path
          d="M 242 56 A 200 200 0 0 0 242 456"
          stroke={`url(#${gradId})`}
          strokeWidth="44"
          strokeLinecap="butt"
        />
        <path
          d="M 270 56 A 200 200 0 0 1 270 456"
          stroke={`url(#${gradId})`}
          strokeWidth="44"
          strokeLinecap="butt"
        />
        <path
          d="M 82 172 H 236 A 54 54 0 0 1 236 280 H 158 V 364"
          stroke={`url(#${gradId})`}
          strokeWidth="46"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        <path
          d="M 218 280 L 254 334 A 64 64 0 0 0 368 294 V 164"
          stroke={`url(#${gradId})`}
          strokeWidth="46"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'white') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M 242 56 A 200 200 0 0 0 242 456"
          stroke="#FFFFFF"
          strokeWidth="44"
          strokeLinecap="butt"
        />
        <path
          d="M 270 56 A 200 200 0 0 1 270 456"
          stroke="#FFFFFF"
          strokeWidth="44"
          strokeLinecap="butt"
        />
        <path
          d="M 82 172 H 236 A 54 54 0 0 1 236 280 H 158 V 364"
          stroke="#FFFFFF"
          strokeWidth="46"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        <path
          d="M 218 280 L 254 334 A 64 64 0 0 0 368 294 V 164"
          stroke="#FFFFFF"
          strokeWidth="46"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'black') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M 242 56 A 200 200 0 0 0 242 456"
          stroke="#000000"
          strokeWidth="44"
          strokeLinecap="butt"
        />
        <path
          d="M 270 56 A 200 200 0 0 1 270 456"
          stroke="#000000"
          strokeWidth="44"
          strokeLinecap="butt"
        />
        <path
          d="M 82 172 H 236 A 54 54 0 0 1 236 280 H 158 V 364"
          stroke="#000000"
          strokeWidth="46"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        <path
          d="M 218 280 L 254 334 A 64 64 0 0 0 368 294 V 164"
          stroke="#000000"
          strokeWidth="46"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Default: standalone variant
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="110"
          y1="110"
          x2="402"
          y2="402"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00D9E8" />
          <stop offset="50%" stopColor="#2878ED" />
          <stop offset="100%" stopColor="#7952E8" />
        </linearGradient>
      </defs>
      <path
        d="M 116 134 H 246 A 68 68 0 0 1 246 270 H 146 V 378"
        stroke={`url(#${gradId})`}
        strokeWidth="56"
        strokeLinecap="butt"
        strokeLinejoin="round"
      />
      <path
        d="M 222 270 L 264 336 A 76 76 0 0 0 396 286 V 134"
        stroke={`url(#${gradId})`}
        strokeWidth="56"
        strokeLinecap="butt"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Consistent monochrome application and desktop chrome vector icons for RISHI OS.
 */
export function OsAppIcon({
  appId,
  size = 20,
  className,
}: { appId: OsAppId } & IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true as const,
  };

  switch (appId) {
    case 'home':
      return <RishiOsBrandIcon size={size} variant="standalone" className={className} />;
    case 'projects':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18" />
          <path d="m8.5 13-2 1.8 2 1.7" />
          <path d="m15.5 13 2 1.8-2 1.7" />
          <path d="m13 12.2-2 5" />
        </svg>
      );
    case 'about':
      return (
        <svg {...common}>
          <circle cx="12" cy="8.2" r="3.5" />
          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
          <rect x="3" y="3" width="18" height="18" rx="2.5" opacity="0.35" />
        </svg>
      );
    case 'journey':
      return (
        <svg {...common}>
          <circle cx="6.5" cy="6.5" r="2.2" />
          <circle cx="17.5" cy="12" r="2.2" />
          <circle cx="6.5" cy="17.5" r="2.2" />
          <path d="M8.7 6.5h4.8a2.5 2.5 0 0 1 2.5 2.5v.8" />
          <path d="M15.3 12H10.5a2.5 2.5 0 0 0-2.5 2.5v.8" />
        </svg>
      );
    case 'skills':
      return (
        <svg {...common}>
          <polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5" />
          <path d="m12 12 8-4.5" />
          <path d="m12 12-8-4.5" />
          <path d="M12 12v9" />
        </svg>
      );
    case 'contact':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4.5 7 7.5 6 7.5-6" />
        </svg>
      );
    case 'terminal':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="m7.5 10 3.2 2.5-3.2 2.5" />
          <path d="M12.5 15h4" />
        </svg>
      );
    case 'files':
      return (
        <svg {...common}>
          <path d="M3 6.5a2 2 0 0 1 2-2h4.2l2 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11Z" />
          <path d="M3 10.5h18" opacity="0.45" />
        </svg>
      );
  }
}

export function WindowControlIcon({
  kind,
  size = 12,
}: {
  kind: 'minimize' | 'maximize' | 'restore' | 'close';
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (kind) {
    case 'minimize':
      return (
        <svg {...common}>
          <path d="M3 8.5h10" />
        </svg>
      );
    case 'maximize':
      return (
        <svg {...common}>
          <rect x="3.2" y="3.2" width="9.6" height="9.6" rx="1" />
        </svg>
      );
    case 'restore':
      return (
        <svg {...common}>
          <rect x="2.8" y="5" width="8.2" height="8.2" rx="1" />
          <path d="M5.5 3h7.5v7.5" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <path d="m3.8 3.8 8.4 8.4M12.2 3.8l-8.4 8.4" />
        </svg>
      );
  }
}

export function FsEntryIcon({
  kind,
  fileType,
  size = 18,
  filled = false,
}: {
  kind: 'dir' | 'file';
  fileType?: 'text' | 'desktop' | 'image';
  size?: number;
  filled?: boolean;
}) {
  const folderGradId = useId();
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  if (kind === 'dir') {
    if (filled) {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={folderGradId} x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8ce6fb" />
              <stop offset="55%" stopColor="#55c7e8" />
              <stop offset="100%" stopColor="#2e8ec0" />
            </linearGradient>
          </defs>
          <path
            d="M3 6.8a2.2 2.2 0 0 1 2.2-2.2h4.1l1.9 2H18.8A2.2 2.2 0 0 1 21 8.8v8.4a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 17.2V6.8Z"
            fill={`url(#${folderGradId})`}
          />
          <path
            d="M3 9.2h18"
            stroke="rgba(234, 246, 255, 0.35)"
            strokeWidth="1.2"
          />
        </svg>
      );
    }
    return (
      <svg {...common}>
        <path d="M3 6.5a2 2 0 0 1 2-2h4.2l2 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11Z" />
      </svg>
    );
  }

  if (fileType === 'image') {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m21 16-4.5-4.5L7 20" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13h7M8.5 16.5h5" opacity="0.65" />
    </svg>
  );
}

export function LogOutIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

