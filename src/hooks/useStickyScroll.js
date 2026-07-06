/**
 * hooks/useStickyScroll.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Sticky scroll section hook
 *
 * Drives multi-panel scroll-pinned sections. Tracks which panel should
 * be active based on the user's scroll position within a container.
 *
 * Usage:
 *   const sectionRef = useRef(null);
 *   const { activeIndex, rawProgress } = useStickyScroll(sectionRef, 4);
 *   // activeIndex: 0–3 based on scroll position
 *   // rawProgress: 0–1 continuous scroll progress
 *
 * Internally uses useScroll from Framer Motion so spring smoothing
 * can be added by the consumer if desired.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useState, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * @param {React.RefObject} sectionRef - ref attached to the outer scroll container
 * @param {number} panelCount          - how many panels exist
 * @param {Object} options
 * @param {string} options.offsetStart - Framer scroll offset start (default 'start start')
 * @param {string} options.offsetEnd   - Framer scroll offset end (default 'end end')
 */
export function useStickyScroll(sectionRef, panelCount, {
  offsetStart = 'start start',
  offsetEnd   = 'end end',
} = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rawProgress, setRawProgress] = useState(0);
  const lastIndex = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [offsetStart, offsetEnd],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setRawProgress(v);
    const idx = Math.min(
      Math.floor(v * panelCount),
      panelCount - 1
    );
    if (idx !== lastIndex.current) {
      lastIndex.current = idx;
      setActiveIndex(idx);
    }
  });

  // Respect prefers-reduced-motion — pin to first panel
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setActiveIndex(0);
      setRawProgress(0);
    }
  }, []);

  return { activeIndex, rawProgress, scrollYProgress };
}
