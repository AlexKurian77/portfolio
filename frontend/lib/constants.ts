import { ScrollBreakpoints } from '@/types';

export const SCROLL_BREAKPOINTS: ScrollBreakpoints = {
  hero:       { start: 0.00, end: 0.12 },
  about:      { start: 0.12, end: 0.30 },
  skills:     { start: 0.30, end: 0.48 },
  experience: { start: 0.48, end: 0.66 },
  projects:   { start: 0.66, end: 0.85 },
  contact:    { start: 0.85, end: 1.00 },
};

// ── Color Palette ─────────────────────────────────────────────────
export const COLORS = {
  bg:        '#080808',
  gold:      '#C8A97E',
  goldLight: '#E8D5B0',
  surface:   '#2A2A2A',
  text:      '#F0EDE6',
  screenGlow:'#1A3A5C',
  accent:    '#C8A97E',
} as const;

// ── Laptop Transform Keyframes ────────────────────────────────────
// Each keyframe maps to scroll progress [0–1]
export const LAPTOP_KEYFRAMES = {
  // Phase 1: Hero - centered, full scale
  hero: {
    position: { x: 0, y: 0, z: 0 },
    scale: 1,
    lidRotation: 0, // fully open (0 = open, -Math.PI/2 = closed)
  },
  // Phase 2: About - drift left, shrink
  about: {
    position: { x: -1.2, y: 0.5, z: 0 },
    scale: 0.55,
    lidRotation: 0,
  },
  // Phase 3: Skills - drift right
  skills: {
    position: { x: 1.5, y: 0.6, z: 0 },
    scale: 0.55,
    lidRotation: 0,
  },
  // Phase 4: Experience - drift left
  experience: {
    position: { x: -1.2, y: 0.5, z: 0 },
    scale: 0.55,
    lidRotation: 0,
  },
  // Phase 5: Projects - drift right
  projects: {
    position: { x: 1.5, y: 0.5, z: 0 },
    scale: 0.55,
    lidRotation: 0,
  },
  // Phase 6: Contact - center, shrink, close lid
  contact: {
    position: { x: 0, y: 0, z: 0 },
    scale: 0.4,
    lidRotation: -Math.PI / 2,
  },
} as const;

// ── Animation Timing ──────────────────────────────────────────────
export const TIMING = {
  preloaderDuration: 2.0,    // seconds
  lidOpenDelay: 0.5,         // seconds after preloader
  lidOpenDuration: 1.2,      // seconds
  sectionFadeIn: 0.6,        // seconds
  sectionStagger: 0.1,       // seconds between staggered items
  cursorSpring: { stiffness: 500, damping: 28 },
  skillTypingSpeed: 50,      // ms per character
} as const;

// ── Scroll Container ─────────────────────────────────────────────
export const SCROLL_HEIGHT_VH = 600; // total scrollable height in vh
export const SECTION_COUNT = 6;

// ── Breakpoint ────────────────────────────────────────────────────
export const MOBILE_BREAKPOINT = 768; // px
