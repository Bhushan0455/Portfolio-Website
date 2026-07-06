/**
 * animations/variants.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised Framer Motion variant library
 *
 * PHILOSOPHY:
 *   - All motion in one place — no inline variant objects scattered across files
 *   - Every variant has a reduced-motion-safe fallback (via getVariant helper)
 *   - Consistent easing: [0.16, 1, 0.3, 1] = expo out (premium feel)
 *   - Durations: 0.45–0.65s for reveals, 0.25–0.35s for interactions
 *
 * USAGE:
 *   import { fadeUp, staggerContainer, scaleIn } from '../animations/variants';
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="visible" />
 *
 * REDUCED MOTION:
 *   import { getVariant } from '../animations/variants';
 *   const v = getVariant(fadeUp, prefersReducedMotion);
 *   <motion.div variants={v} />
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Shared easing ────────────────────────────────────────────────────────────
export const EASE_OUT_EXPO  = [0.16, 1, 0.3, 1];
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1];
export const EASE_IN_OUT    = [0.4, 0, 0.2, 1];
export const EASE_SPRING    = [0.34, 1.56, 0.64, 1]; // subtle spring overshoot

// ─── Static (no motion) equivalents ──────────────────────────────────────────
const noMotion = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  exit:    { opacity: 0, transition: { duration: 0.01 } },
};

// ─── Core reveal variants ─────────────────────────────────────────────────────

export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3,  ease: EASE_IN_OUT  } },
};

export const fadeDown = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
  exit:    { opacity: 0, y: 16,  transition: { duration: 0.3,  ease: EASE_IN_OUT  } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: EASE_OUT_QUART } },
  exit:    { opacity: 0, transition: { duration: 0.25, ease: EASE_IN_OUT    } },
};

export const fadeLeft = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
  exit:    { opacity: 0, x: 32, transition: { duration: 0.3,  ease: EASE_IN_OUT  } },
};

export const fadeRight = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
  exit:    { opacity: 0, x: -32, transition: { duration: 0.3,  ease: EASE_IN_OUT  } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
  exit:    { opacity: 0, scale: 0.94, transition: { duration: 0.3,  ease: EASE_IN_OUT  } },
};

export const scaleInSpring = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22, mass: 0.8 },
  },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
};

export const clipReveal = {
  hidden:  { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(0 100% 0 0)',
    transition: { duration: 0.35, ease: EASE_IN_OUT },
  },
};

// ─── Stagger containers ───────────────────────────────────────────────────────

/**
 * Parent container variant with configurable stagger.
 * Use with any of the child variants above (fadeUp, scaleIn, etc.)
 *
 * <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible">
 *   <motion.div variants={fadeUp}>Item 1</motion.div>
 *   <motion.div variants={fadeUp}>Item 2</motion.div>
 * </motion.div>
 */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: stagger * 0.5, staggerDirection: -1 },
  },
});

/** Fast stagger: 0.05s — for tight grids (4+ items) */
export const staggerFast   = staggerContainer(0.05);
/** Normal stagger: 0.08s — for most lists */
export const staggerNormal = staggerContainer(0.08);
/** Slow stagger: 0.12s — for hero sections with large text */
export const staggerSlow   = staggerContainer(0.12);

// ─── Section reveal (viewport trigger) ───────────────────────────────────────
/**
 * Standard section entrance — use on the outer div of each section.
 * Pair with whileInView="visible" viewport={{ once: true, margin: '-80px' }}
 */
export const sectionReveal = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_OUT_EXPO,
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// ─── Card / panel transitions ─────────────────────────────────────────────────

export const cardHover = {
  rest:  { scale: 1,     y: 0,  boxShadow: '0 0 0px rgba(45,212,191,0)'    },
  hover: { scale: 1.018, y: -4, boxShadow: '0 20px 50px rgba(45,212,191,0.15)' },
};

export const cardHoverSpring = {
  rest:  { scale: 1,     y: 0  },
  hover: {
    scale: 1.018,
    y: -4,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

// ─── Button interactions ──────────────────────────────────────────────────────

export const buttonTap = {
  whileTap:   { scale: 0.96 },
  whileHover: { scale: 1.04 },
  transition: { type: 'spring', stiffness: 400, damping: 17 },
};

export const buttonGlow = {
  rest:  { boxShadow: '0 0 0px rgba(45,212,191,0)' },
  hover: { boxShadow: '0 0 40px rgba(45,212,191,0.4)' },
};

// ─── Page transitions ─────────────────────────────────────────────────────────

export const pageEnter = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3,  ease: EASE_IN_OUT  } },
};

// ─── Sticky section text swap ─────────────────────────────────────────────────

export const stickyTextSwap = {
  hidden:  { opacity: 0, x: -20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    x: 20,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: EASE_IN_OUT },
  },
};

export const stickyImageSwap = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
  exit:    { opacity: 0, scale: 1.03, transition: { duration: 0.3, ease: EASE_IN_OUT  } },
};

// ─── Reduced-motion helper ────────────────────────────────────────────────────

/**
 * Returns the static (opacity-only) variant when reduced motion is preferred,
 * otherwise returns the full animation variant.
 *
 * @param {Object} variant    - One of the variants exported from this file
 * @param {boolean} reduced   - result of useReducedMotion()
 */
export function getVariant(variant, reduced) {
  return reduced ? noMotion : variant;
}

// ─── Named export map (for dynamic lookup) ────────────────────────────────────

export const VARIANTS = {
  fadeUp,
  fadeDown,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleIn,
  scaleInSpring,
  clipReveal,
  sectionReveal,
  cardHover,
  buttonTap,
  pageEnter,
  stickyTextSwap,
  stickyImageSwap,
};
