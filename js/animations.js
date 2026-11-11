/**
 * Rishi Jha — Scroll Reveals & Entrance Choreography (Vanilla JS)
 * Uses IntersectionObserver & CSS Transitions · No GSAP / No Libraries
 */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Trigger Hero Entrance Animation on Page Load
  const initEntrance = () => {
    const nav = document.getElementById('navbar');
    const tagline = document.querySelector('.hero-tagline-wrap');
    const title = document.querySelector('.hero-name-display');
    const role = document.querySelector('.hero-headline-group .hero-role-title');
    const subtitle = document.querySelector('.hero-headline-group .hero-role-subtitle');
    const desc = document.querySelector('.hero-statement-text');
    const actions = document.querySelector('.hero-cta-buttons');
    const focusCards = document.querySelector('.hero-focus-cards');
    const portraitFrame = document.getElementById('hero-portrait-frame');

    if (nav) nav.classList.add('animate-nav');
    if (tagline) tagline.classList.add('animate-tagline');
    if (title) title.classList.add('animate-title');
    if (role) role.classList.add('animate-role');
    if (subtitle) subtitle.classList.add('animate-role');
    if (desc) desc.classList.add('animate-desc');
    if (actions) actions.classList.add('animate-actions');
    if (focusCards) focusCards.classList.add('animate-focus');
    if (portraitFrame) portraitFrame.classList.add('animate-portrait');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEntrance);
  } else {
    initEntrance();
  }

  // 2. IntersectionObserver for Scroll Reveals (.reveal -> .reveal.visible)
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
      }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: make all immediately visible
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }
}
