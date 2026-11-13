'use client';

import Image from 'next/image';

export interface RjMonogramProps {
  size?: number | string;
  className?: string;
  withOrbital?: boolean;
  glow?: boolean;
  variant?: 'primary' | 'standalone' | 'white' | 'black';
}

/**
 * Official RJ Monogram component for portfolio UI elements.
 * Renders the official RJ primary circular logo, standalone, white, or black variant.
 */
export function RjMonogram({
  size = 220,
  className,
  withOrbital = true,
  variant,
}: RjMonogramProps) {
  const dimension = typeof size === 'number' ? size : 512;
  const src =
    variant === 'white'
      ? '/images/rj-white.svg'
      : variant === 'black'
        ? '/images/rj-black.svg'
        : variant === 'standalone' || !withOrbital
          ? '/images/rj-standalone.svg'
          : '/images/rj-primary.svg';

  return (
    <Image
      src={src}
      alt="RJ Monogram"
      width={dimension}
      height={dimension}
      className={className}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        objectFit: 'contain',
      }}
      unoptimized
    />
  );
}
