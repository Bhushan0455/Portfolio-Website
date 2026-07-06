/**
 * utils/accessibility.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Accessibility utilities
 *
 * Covers:
 *   - FocusTrap component       (modal / mobile menu)
 *   - VisuallyHidden component  (screen-reader-only text)
 *   - useAriaLive hook          (dynamic content announcements)
 *   - useFocusReturn hook       (restore focus after modal close)
 *   - headingHierarchyCheck()   (dev-mode heading audit)
 *   - checkColorContrast()      (WCAG AA/AAA ratio checker)
 *
 * All components are zero-dependency (no external a11y library needed).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useCallback, useState } from 'react';

// ─── VisuallyHidden ───────────────────────────────────────────────────────────
/**
 * Visually hides content but keeps it accessible to screen readers.
 * Use for icon-only buttons, decorative descriptions, etc.
 *
 * <button>
 *   <SearchIcon />
 *   <VisuallyHidden>Search the site</VisuallyHidden>
 * </button>
 */
export function VisuallyHidden({ children, as: Tag = 'span', ...props }) {
  return (
    <Tag
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ─── FocusTrap ────────────────────────────────────────────────────────────────
/**
 * Traps keyboard focus within a container (modal, mobile menu, drawer).
 * Automatically focuses the first focusable element on mount.
 * Esc key calls onClose.
 *
 * <FocusTrap active={isOpen} onClose={() => setIsOpen(false)}>
 *   <div role="dialog" aria-modal="true">...</div>
 * </FocusTrap>
 */
export function FocusTrap({ children, active = true, onClose, className = '' }) {
  const containerRef = useRef(null);

  const getFocusable = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
  }, []);

  useEffect(() => {
    if (!active) return;

    // Focus first element
    const focusable = getFocusable();
    if (focusable.length) {
      // Small delay to ensure element is painted
      const t = setTimeout(() => focusable[0].focus(), 50);
      return () => clearTimeout(t);
    }
  }, [active, getFocusable]);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e) => {
      const focusable = getFocusable();
      if (!focusable.length) return;

      if (e.key === 'Escape') {
        onClose?.();
        return;
      }

      if (e.key === 'Tab') {
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, onClose, getFocusable]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// ─── useFocusReturn ───────────────────────────────────────────────────────────
/**
 * Saves the currently focused element and restores focus to it when
 * a modal/overlay closes. Essential for keyboard navigation.
 *
 * const { saveFocus, restoreFocus } = useFocusReturn();
 *
 * // Before opening modal:
 * saveFocus();
 * openModal();
 *
 * // On close:
 * closeModal();
 * restoreFocus();
 */
export function useFocusReturn() {
  const savedRef = useRef(null);

  const saveFocus = useCallback(() => {
    savedRef.current = document.activeElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (savedRef.current && typeof savedRef.current.focus === 'function') {
      // Small timeout to ensure DOM is updated
      setTimeout(() => savedRef.current?.focus(), 50);
    }
  }, []);

  return { saveFocus, restoreFocus };
}

// ─── useAriaLive ──────────────────────────────────────────────────────────────
/**
 * Announces dynamic content changes to screen readers via an aria-live region.
 * Use for: form errors, success messages, loading states, slider position changes.
 *
 * const { announce, LiveRegion } = useAriaLive();
 * announce('Product rotated to: Composition view');
 * // Include <LiveRegion /> somewhere in your JSX
 *
 * @param {'polite'|'assertive'} politeness
 */
export function useAriaLive(politeness = 'polite') {
  const [message, setMessage] = useState('');

  const announce = useCallback((msg) => {
    // Clear first to ensure re-announcement of same message
    setMessage('');
    requestAnimationFrame(() => setMessage(msg));
  }, []);

  const LiveRegion = () => (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        border: 0,
      }}
    >
      {message}
    </div>
  );

  return { announce, LiveRegion };
}

// ─── Dev-mode heading hierarchy checker ───────────────────────────────────────
/**
 * Scans the document for heading hierarchy issues.
 * Call once on mount in development to catch problems early.
 *
 * Issues detected:
 *   - Multiple H1s
 *   - Skipped heading levels (H1 → H3 with no H2)
 *   - Missing H1
 *
 * Usage (in App.jsx, development only):
 *   import { headingHierarchyCheck } from './utils/accessibility';
 *   useEffect(() => { if (import.meta.env.DEV) headingHierarchyCheck(); }, []);
 */
export function headingHierarchyCheck() {
  if (typeof document === 'undefined') return;

  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const levels   = headings.map((h) => parseInt(h.tagName[1]));

  const issues = [];

  const h1Count = levels.filter((l) => l === 1).length;
  if (h1Count === 0) issues.push('⚠️  No H1 found — every page needs exactly one H1');
  if (h1Count > 1)  issues.push(`⚠️  ${h1Count} H1s found — only one H1 per page`);

  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      issues.push(`⚠️  Heading level skip: H${levels[i-1]} → H${levels[i]} (${headings[i].textContent?.slice(0,40)})`);
    }
  }

  if (issues.length) {
    console.group('%c[A11y] Heading hierarchy issues', 'color: #f59e0b; font-weight: bold');
    issues.forEach((i) => console.warn(i));
    console.groupEnd();
  } else {
    console.log('%c[A11y] ✅ Heading hierarchy OK', 'color: #2dd4bf');
  }
}

// ─── Contrast ratio checker ───────────────────────────────────────────────────
/**
 * Calculate WCAG contrast ratio between two hex colours.
 * Returns { ratio, passAA, passAAA, passLargeAA }
 *
 * Usage:
 *   checkColorContrast('#2dd4bf', '#04080f')
 *   // → { ratio: 8.2, passAA: true, passAAA: true, ... }
 */
export function checkColorContrast(hex1, hex2) {
  const luminance = (hex) => {
    const rgb = hex.replace('#', '').match(/.{2}/g).map((c) => {
      const val = parseInt(c, 16) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const L1 = luminance(hex1);
  const L2 = luminance(hex2);
  const lighter = Math.max(L1, L2);
  const darker  = Math.min(L1, L2);
  const ratio   = parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));

  return {
    ratio,
    passAA:      ratio >= 4.5,  // Normal text
    passAAA:     ratio >= 7.0,  // Enhanced
    passLargeAA: ratio >= 3.0,  // Large text / UI components
  };
}
