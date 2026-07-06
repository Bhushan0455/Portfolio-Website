/**
 * hooks/useScrollReveal.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Scroll-triggered reveal hook
 *
 * Usage:
 *   const { ref, isVisible } = useScrollReveal({ threshold: 0.15, once: true });
 *   <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }} />
 *
 * Or with Framer Motion:
 *   const { ref, isVisible } = useScrollReveal();
 *   <motion.div ref={ref} animate={isVisible ? 'visible' : 'hidden'} />
 *
 * Stagger children:
 *   const { ref, isVisible } = useScrollReveal();
 *   const staggerVariants = buildStaggerVariants(0.08);
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from 'react';

/**
 * @param {Object} options
 * @param {number}  options.threshold - 0–1, fraction of element visible to trigger (default 0.12)
 * @param {string}  options.rootMargin - CSS margin around root (default '-40px')
 * @param {boolean} options.once      - Only trigger once (default true)
 * @param {number}  options.delay     - ms delay before marking visible (default 0)
 */
export function useScrollReveal({
  threshold = 0.12,
  rootMargin = '-40px',
  once = true,
  delay = 0,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion at hook level
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            timerRef.current = setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
          clearTimeout(timerRef.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timerRef.current);
    };
  }, [threshold, rootMargin, once, delay]);

  return { ref, isVisible };
}

/**
 * Build Framer Motion stagger variant sets
 *
 * @param {number} staggerChildren - seconds between each child
 * @param {number} delayChildren   - initial delay before first child
 * @returns Framer Motion variants object { hidden, visible }
 */
export function buildStaggerVariants(staggerChildren = 0.08, delayChildren = 0) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

/**
 * Standard child variants for stagger animations.
 * Use alongside buildStaggerVariants on a parent.
 */
export const fadeUpChild = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInChild = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideRightChild = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleUpChild = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};
