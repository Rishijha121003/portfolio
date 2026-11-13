'use client';

import { useEffect, useRef } from 'react';
import styles from './ParticlePortraitCanvas.module.css';

export type ParticlePortraitVariant = 'editorial' | 'desktopHero' | 'terminal';

interface ParticlePortraitCanvasProps {
  src: string;
  animated?: boolean;
  variant?: ParticlePortraitVariant;
}

interface PortraitParticle {
  nx: number;
  ny: number;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
  bucket: 0 | 1 | 2 | 3;
  phase: number;
}

interface DustParticle {
  nx: number;
  ny: number;
  size: number;
  alpha: number;
  speedX: number;
  speedY: number;
  phase: number;
}

function deterministicHash(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * Samples edge-weighted monochrome particles from a transparent portrait source.
 */
function buildParticlesFromImage(
  img: HTMLImageElement,
  compact: boolean,
  variant: ParticlePortraitVariant
): PortraitParticle[] {
  const sampleSize = compact
    ? 124
    : variant === 'desktopHero'
      ? 184
      : variant === 'terminal'
        ? 172
        : 176;
  const offscreen = document.createElement('canvas');
  offscreen.width = sampleSize;
  offscreen.height = sampleSize;
  const ctx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  ctx.clearRect(0, 0, sampleSize, sampleSize);
  ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
  const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);

  const lumaAt = (px: number, py: number): number => {
    const cx = Math.max(0, Math.min(sampleSize - 1, px));
    const cy = Math.max(0, Math.min(sampleSize - 1, py));
    const idx = (cy * sampleSize + cx) * 4;
    const r = data[idx] ?? 0;
    const g = data[idx + 1] ?? 0;
    const b = data[idx + 2] ?? 0;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const alphaAt = (px: number, py: number): number => {
    const cx = Math.max(0, Math.min(sampleSize - 1, px));
    const cy = Math.max(0, Math.min(sampleSize - 1, py));
    return (data[(cy * sampleSize + cx) * 4 + 3] ?? 0) / 255;
  };

  const particles: PortraitParticle[] = [];
  const scaleBoost =
    (variant === 'desktopHero' || variant === 'terminal') && !compact ? 1.12 : 1;

  for (let y = 1; y < sampleSize - 1; y++) {
    for (let x = 1; x < sampleSize - 1; x++) {
      const alpha = alphaAt(x, y);
      if (alpha < 0.12) continue;

      const luma = lumaAt(x, y);

      // 3x3 Sobel edge detection emphasizes facial anatomy, eyes, jawline, hair strands, and collar
      const gx =
        -lumaAt(x - 1, y - 1) -
        2 * lumaAt(x - 1, y) -
        lumaAt(x - 1, y + 1) +
        lumaAt(x + 1, y - 1) +
        2 * lumaAt(x + 1, y) +
        lumaAt(x + 1, y + 1);

      const gy =
        -lumaAt(x - 1, y - 1) -
        2 * lumaAt(x, y - 1) -
        lumaAt(x + 1, y - 1) +
        lumaAt(x - 1, y + 1) +
        2 * lumaAt(x, y + 1) +
        lumaAt(x + 1, y + 1);

      const edgeStrength = Math.min(1, Math.sqrt(gx * gx + gy * gy) * 1.65);

      const agx = alphaAt(x + 1, y) - alphaAt(x - 1, y);
      const agy = alphaAt(x, y + 1) - alphaAt(x, y - 1);
      const rimStrength = Math.min(1, Math.sqrt(agx * agx + agy * agy) * 1.8);

      const signal =
        Math.min(
          1,
          edgeStrength * 0.85 + Math.pow(luma, 1.25) * 0.44 + rimStrength * 0.45
        ) * alpha;

      const noise = deterministicHash(x, y);
      const threshold = compact ? 0.34 : variant === 'desktopHero' ? 0.22 : 0.24;
      if (signal < threshold * (0.45 + noise * 0.9)) continue;

      const jitterX = (deterministicHash(x + 17, y + 3) - 0.5) * 0.6;
      const jitterY = (deterministicHash(x + 5, y + 29) - 0.5) * 0.6;

      const bucket: 0 | 1 | 2 | 3 =
        signal > 0.72 ? 3 : signal > 0.48 ? 2 : signal > 0.3 ? 1 : 0;

      const baseSize =
        bucket === 3 ? 1.6 : bucket === 2 ? 1.35 : bucket === 1 ? 1.1 : 0.88;

      particles.push({
        nx: (x + jitterX) / sampleSize,
        ny: (y + jitterY) / sampleSize,
        x: 0,
        y: 0,
        homeX: 0,
        homeY: 0,
        vx: 0,
        vy: 0,
        size: baseSize * scaleBoost,
        bucket,
        phase: deterministicHash(x * 2, y * 3) * Math.PI * 2,
      });
    }
  }

  return particles;
}

function createAmbientDust(count: number): DustParticle[] {
  const dust: DustParticle[] = [];
  for (let i = 0; i < count; i++) {
    dust.push({
      nx: deterministicHash(i, 11),
      ny: deterministicHash(i, 37),
      size: 0.7 + deterministicHash(i, 53) * 1.1,
      alpha: 0.09 + deterministicHash(i, 71) * 0.2,
      speedX: (deterministicHash(i, 91) - 0.5) * 0.007,
      speedY: (deterministicHash(i, 103) - 0.5) * 0.007,
      phase: deterministicHash(i, 127) * Math.PI * 2,
    });
  }
  return dust;
}

const EDITORIAL_BUCKET_STYLES: readonly string[] = [
  'rgba(182, 224, 245, 0.22)',
  'rgba(202, 234, 250, 0.44)',
  'rgba(222, 242, 252, 0.70)',
  'rgba(234, 246, 255, 0.94)',
];

const HERO_BUCKET_STYLES: readonly string[] = [
  'rgba(150, 218, 245, 0.28)',
  'rgba(182, 232, 250, 0.54)',
  'rgba(214, 242, 253, 0.80)',
  'rgba(238, 248, 255, 0.96)',
];

const TERMINAL_BUCKET_STYLES: readonly string[] = [
  'rgba(85, 199, 232, 0.30)',
  'rgba(121, 221, 243, 0.56)',
  'rgba(182, 238, 252, 0.82)',
  'rgba(234, 246, 255, 0.96)',
];

function isBlockedTarget(
  target: EventTarget | null,
  ownWindow: Element | null
): boolean {
  if (!(target instanceof Element)) return false;
  if (target.closest('button, a, [data-os-chrome="true"]')) return true;
  const hitWindow = target.closest('[data-os-window="true"]');
  return Boolean(hitWindow && hitWindow !== ownWindow);
}

/**
 * Interactive Canvas 2D monochrome particle portrait with smooth bounded pointer/touch repulsion and spring recovery.
 */
export function ParticlePortraitCanvas({
  src,
  animated = true,
  variant = 'editorial',
}: ParticlePortraitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bucketPalette =
      variant === 'terminal'
        ? TERMINAL_BUCKET_STYLES
        : variant === 'desktopHero'
          ? HERO_BUCKET_STYLES
          : EDITORIAL_BUCKET_STYLES;
    const ownWindow = canvas.closest('[data-os-window="true"]');

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;
    const isStaticMode = () => !animated || prefersReducedMotion;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let drawSize = 0;
    let particles: PortraitParticle[] = [];
    const dust = createAmbientDust(variant === 'desktopHero' ? 56 : 68);

    let pointerX = -9999;
    let pointerY = -9999;
    let pointerActive = false;

    let isInView = true;
    let isTabVisible = !document.hidden;
    let rafId = 0;
    let disposed = false;

    const projectParticles = (snapToHome: boolean) => {
      if (width === 0 || height === 0) return;

      if (variant === 'desktopHero' || variant === 'terminal') {
        const isNarrowPortrait = width < 640;
        drawSize =
          variant === 'terminal'
            ? Math.min(width * 0.96, height * 0.96)
            : isNarrowPortrait
              ? Math.min(width * 0.96, height * 0.76)
              : Math.min(width * 0.88, height * 0.95);
        const offsetX = (width - drawSize) * 0.5;
        const offsetY =
          variant === 'terminal'
            ? Math.max(0, (height - drawSize) * 0.35)
            : isNarrowPortrait
              ? Math.max(10, (height - drawSize) * 0.2)
              : Math.max(4, (height - drawSize) * 0.14);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!p) continue;
          p.homeX = offsetX + p.nx * drawSize;
          p.homeY = offsetY + p.ny * drawSize;
          if (snapToHome) {
            p.x = p.homeX;
            p.y = p.homeY;
            p.vx = 0;
            p.vy = 0;
          }
        }
        return;
      }

      drawSize = Math.min(width * 0.86, height * 0.96);
      const offsetX = (width - drawSize) * 0.5;
      const offsetY = Math.max(8, height * 0.04);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;
        p.homeX = offsetX + p.nx * drawSize;
        p.homeY = offsetY + p.ny * drawSize;
        if (snapToHome) {
          p.x = p.homeX;
          p.y = p.homeY;
          p.vx = 0;
          p.vy = 0;
        }
      }
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      projectParticles(particles.length > 0 && particles[0]?.x === 0);
    };

    const drawStaticFrame = () => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        if (!d) continue;
        ctx.fillStyle = `rgba(182, 234, 252, ${d.alpha.toFixed(2)})`;
        ctx.fillRect(d.nx * width, d.ny * height, d.size, d.size);
      }

      for (let b = 0; b < 4; b++) {
        ctx.fillStyle = bucketPalette[b] ?? 'rgba(255,255,255,0.5)';
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!p || p.bucket !== b) continue;
          ctx.fillRect(p.homeX, p.homeY, p.size, p.size);
        }
      }
    };

    const renderTick = (now: number) => {
      if (disposed || isStaticMode() || !isInView || !isTabVisible) {
        rafId = 0;
        return;
      }

      const time = now * 0.001;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        if (!d) continue;
        const dx = ((d.nx + time * d.speedX) % 1 + 1) % 1;
        const dy = ((d.ny + time * d.speedY) % 1 + 1) % 1;
        const flicker = d.alpha * (0.75 + 0.25 * Math.sin(time * 1.3 + d.phase));
        ctx.fillStyle = `rgba(182, 234, 252, ${flicker.toFixed(2)})`;
        ctx.fillRect(dx * width, dy * height, d.size, d.size);
      }

      // Calibrated radius, subtle force, and strict displacement cap preserve recognizable facial geometry
      const radius = Math.max(54, Math.min(104, drawSize * 0.16));
      const radiusSq = radius * radius;
      const forceScale = 3.2;
      const spring = 0.09;
      const damping = 0.83;
      const maxDisplace = Math.max(14, drawSize * 0.036);
      const maxDisplaceSq = maxDisplace * maxDisplace;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        const driftX = Math.cos(time * 0.65 + p.phase) * 0.75;
        const driftY = Math.sin(time * 0.55 + p.phase) * 0.75;
        const targetX = p.homeX + driftX;
        const targetY = p.homeY + driftY;

        if (pointerActive) {
          const dx = p.x - pointerX;
          const dy = p.y - pointerY;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / radius;
            const push = falloff * falloff * forceScale;
            p.vx += (dx / dist) * push;
            p.vy += (dy / dist) * push;
          }
        }

        p.vx += (targetX - p.x) * spring;
        p.vy += (targetY - p.y) * spring;
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        const homeDx = p.x - targetX;
        const homeDy = p.y - targetY;
        const homeDistSq = homeDx * homeDx + homeDy * homeDy;
        if (homeDistSq > maxDisplaceSq) {
          const inv = maxDisplace / Math.sqrt(homeDistSq);
          p.x = targetX + homeDx * inv;
          p.y = targetY + homeDy * inv;
          p.vx *= 0.5;
          p.vy *= 0.5;
        }
      }

      for (let b = 0; b < 4; b++) {
        ctx.fillStyle = bucketPalette[b] ?? 'rgba(255,255,255,0.5)';
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!p || p.bucket !== b) continue;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }

      rafId = requestAnimationFrame(renderTick);
    };

    const startOrRender = () => {
      if (disposed || particles.length === 0) return;
      if (isStaticMode()) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        drawStaticFrame();
        return;
      }
      if (!rafId && isInView && isTabVisible) {
        rafId = requestAnimationFrame(renderTick);
      }
    };

    const updatePointer = (
      clientX: number,
      clientY: number,
      target: EventTarget | null
    ) => {
      if (isBlockedTarget(target, ownWindow)) {
        pointerActive = false;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        pointerX = clientX - rect.left;
        pointerY = clientY - rect.top;
        pointerActive = true;
      } else {
        pointerActive = false;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY, e.target);
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const onTouchStartOrMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      updatePointer(touch.clientX, touch.clientY, e.target);
    };

    const onTouchEnd = () => {
      pointerActive = false;
    };

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startOrRender();
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      startOrRender();
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      projectParticles(isStaticMode());
      if (isStaticMode()) drawStaticFrame();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInView = Boolean(entry?.isIntersecting);
        if (isInView) {
          startOrRender();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(canvas);

    if (animated) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerout', onPointerLeave, { passive: true });
      window.addEventListener('touchstart', onTouchStartOrMove, { passive: true });
      window.addEventListener('touchmove', onTouchStartOrMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
    }
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotionQuery.addEventListener('change', onReducedMotionChange);

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      if (disposed) return;
      const compact = window.innerWidth < 640;
      particles = buildParticlesFromImage(img, compact, variant);
      projectParticles(true);
      startOrRender();
    };

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (animated) {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerout', onPointerLeave);
        window.removeEventListener('touchstart', onTouchStartOrMove);
        window.removeEventListener('touchmove', onTouchStartOrMove);
        window.removeEventListener('touchend', onTouchEnd);
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange);
    };
  }, [src, animated, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
