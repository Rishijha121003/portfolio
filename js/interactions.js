/**
 * Rishi Jha — Micro-Interactions & Parallax (Vanilla JS)
 * No dependencies · High performance requestAnimationFrame loop
 */

export function initInteractions() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // 1. Sticky Header scroll styling
  const header = document.getElementById('navbar');
  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      },
      { passive: true }
    );
  }

  // 2. Desktop Mouse Micro-Parallax for Portrait (Max 8px movement)
  const portraitStage = document.getElementById('hero-portrait-stage');
  const portraitFrame = document.getElementById('hero-portrait-frame');
  const ambientHalo = document.querySelector('.hero-ambient-halo');
  const orbitRing = document.querySelector('.hero-orbit-ring');

  if (!isTouchDevice && !prefersReducedMotion && portraitStage && portraitFrame) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId = null;

    const onPointerMove = (e) => {
      const rect = portraitStage.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center of portrait
      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.5);
      const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.5);

      // Max movement strictly capped at 8px
      targetX = Math.max(-1, Math.min(1, deltaX)) * 8;
      targetY = Math.max(-1, Math.min(1, deltaY)) * 8;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      portraitFrame.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (ambientHalo) {
        ambientHalo.style.transform = `translate3d(${(currentX * 1.4).toFixed(2)}px, ${(currentY * 1.4).toFixed(2)}px, 0)`;
      }

      if (orbitRing) {
        orbitRing.style.transform = `translate3d(${(currentX * -0.6).toFixed(2)}px, ${(currentY * -0.6).toFixed(2)}px, 0)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    updateParallax();
  }

  // 3. BorderGlow Proximity & Edge Lighting
  const borderGlowElements = document.querySelectorAll('.border-glow');
  borderGlowElements.forEach((el) => {
    el.addEventListener(
      'pointermove',
      (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--glow-x', `${x}px`);
        el.style.setProperty('--glow-y', `${y}px`);
      },
      { passive: true }
    );
  });

  // 4. Featured Projects Carousel Navigation
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const projectsGrid = document.querySelector('.projects-editorial-grid');

  if (prevBtn && nextBtn && projectsGrid) {
    prevBtn.addEventListener('click', () => {
      projectsGrid.scrollBy({ left: -380, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      projectsGrid.scrollBy({ left: 380, behavior: 'smooth' });
    });
  }
}
