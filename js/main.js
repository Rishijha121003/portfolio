/**
 * Rishi Jha — Main Entry Point (Vanilla JS)
 * Initializes animations and micro-interactions
 */

import { initAnimations } from './animations.js';
import { initInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initInteractions();
});
