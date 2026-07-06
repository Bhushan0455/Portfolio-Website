/**
 * utils/performance.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Performance optimization utilities
 *
 * Covers:
 *   - reportWebVitals()        — CWV measurement + console logging
 *   - createDynamicImport()    — Wrapper for React.lazy with fallback
 *   - SectionSkeleton          — Loading placeholder component
 *   - preloadImages()          — Programmatic image preloading
 *   - isLowEndDevice()         — Device capability detection
 *   - deferNonCritical()       — Defer third-party scripts
 *
 * USAGE in main.jsx:
 *   import { reportWebVitals } from './utils/performance';
 *   reportWebVitals(console.log); // or send to analytics
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { lazy, Suspense } from 'react';

// ─── Web Vitals reporting ──────────────────────────────────────────────────────
/**
 * Reports Core Web Vitals to a callback.
 * Gracefully degrades if web-vitals is not installed.
 *
 * @param {Function} onReport - callback(metric) — send to GA, Datadog, etc.
 *
 * Usage:
 *   import { reportWebVitals } from './utils/performance';
 *   reportWebVitals(({ name, value }) => {
 *     console.log(`[CWV] ${name}: ${value}`);
 *   });
 */
export async function reportWebVitals(onReport) {
  try {
    // Use a variable to prevent Rolldown/Vite from statically analysing this import
    // This allows graceful degradation when web-vitals is not installed
    const moduleName = 'web-vitals';
    const mod = await import(/* @vite-ignore */ moduleName);
    mod.onCLS?.(onReport);
    mod.onFID?.(onReport);
    mod.onFCP?.(onReport);
    mod.onLCP?.(onReport);
    mod.onTTFB?.(onReport);
    mod.onINP?.(onReport);
  } catch {
    // web-vitals not installed — silent fail in production
    if (import.meta.env.DEV) {
      console.info('[Performance] web-vitals not installed. Run: npm install web-vitals');
    }
  }
}

// ─── Dynamic import wrapper ────────────────────────────────────────────────────
/**
 * Creates a lazily-loaded component with optional skeleton fallback.
 * Use for below-the-fold heavy sections.
 *
 * @param {Function} importFn   - () => import('./HeavyComponent')
 * @param {JSX.Element} fallback - Shown while loading (default: null)
 *
 * Usage:
 *   const LazyHeavy = createDynamicImport(() => import('./HeavySection'));
 *   <LazyHeavy />
 */
export function createDynamicImport(importFn, fallback = null) {
  const Component = lazy(importFn);
  return function DynamicComponent(props) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// ─── Section skeleton (default Suspense fallback) ─────────────────────────────
export function SectionSkeleton({ height = '100vh', className = '' }) {
  return (
    <div
      className={`w-full animate-pulse ${className}`}
      style={{
        height,
        background: 'linear-gradient(180deg, transparent 0%, transparent 100%)',
      }}
      aria-busy="true"
      aria-label="Loading section..."
    />
  );
}

// ─── Image preload ────────────────────────────────────────────────────────────
/**
 * Preload critical images (LCP candidates) programmatically.
 * Call early — before component renders if possible.
 *
 * @param {string[]} srcs - Array of image URLs to preload
 */
export function preloadImages(srcs) {
  srcs.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    // WebP preferred
    if (src.endsWith('.webp')) link.type = 'image/webp';
    document.head.appendChild(link);
  });
}

// ─── Defer third-party scripts ────────────────────────────────────────────────
/**
 * Inject a third-party script after user interaction (first scroll/click/keypress).
 * Prevents render-blocking and improves FID/INP.
 *
 * @param {string}   src      - Script URL
 * @param {Object}   attrs    - Additional script attributes
 * @param {Function} onLoad   - Callback after script loads
 */
export function deferNonCritical(src, attrs = {}, onLoad) {
  let loaded = false;

  const inject = () => {
    if (loaded) return;
    loaded = true;

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
    if (onLoad) script.onload = onLoad;
    document.body.appendChild(script);

    // Clean up listeners
    ['scroll', 'click', 'keypress', 'touchstart'].forEach((evt) =>
      window.removeEventListener(evt, inject)
    );
  };

  ['scroll', 'click', 'keypress', 'touchstart'].forEach((evt) =>
    window.addEventListener(evt, inject, { once: true, passive: true })
  );
}

// ─── Animation performance guard ─────────────────────────────────────────────
/**
 * Returns true if the device likely can't handle complex animations smoothly.
 * Use to conditionally simplify motion (alternative to prefers-reduced-motion).
 *
 * Checks: deviceMemory < 4GB, hardwareConcurrency < 4, saveData mode
 */
export function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false;
  const mem     = navigator.deviceMemory;
  const cores   = navigator.hardwareConcurrency;
  const saveData = navigator.connection?.saveData;
  return (mem && mem < 4) || (cores && cores < 4) || saveData === true;
}
