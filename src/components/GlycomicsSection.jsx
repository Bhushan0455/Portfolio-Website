/**
 * GlycomicsSection.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium Glycomics™ product showcase — Seed.com inspired sticky-scroll layout
 *
 * Features:
 *  - Sticky scroll with left-pinned product rotation video
 *  - Right-side content panels that swap on scroll
 *  - Scientific glassmorphism cards + ingredient progress bars
 *  - Animated floating badges with depth
 *  - ~500vh scroll height for smooth storytelling
 *  - Reduced-motion safe (prefers-reduced-motion respected)
 *  - Mobile optimised (stacked vertical cards)
 *  - GPU-accelerated transforms only (opacity + transform)
 *
 * Expects: /product/ProductRotation.mp4 in public/
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  AnimatePresence,
  useReducedMotion,
  useTransform,
} from 'framer-motion';

// ─── Panel Data ──────────────────────────────────────────────────────────────

const PANELS = [
  {
    id: 'problem',
    eyebrow: 'The Problem',
    heading: 'Metabolic Health\nNeeds a New Standard',
    body: "India has over 100 million people living with diabetes and nearly as many in pre-diabetic stages. The supplement market responds with loud claims and borrowed ingredients. What's missing isn't another product — it's a brand that proves what it sells.",
    stat: { value: '101M', label: 'Indians with Diabetes' },
    badge: 'WHO Data',
  },
  {
    id: 'science',
    eyebrow: 'Ayurvedic Science',
    heading: 'An Ancient Intelligence,\nRigorously Formulated',
    body: 'Glycomics is not guesswork. Each ingredient is selected from classical Ayurvedic texts, then validated against modern glycaemic research. Seven botanicals. One precise capsule.',
    stat: { value: '7', label: 'Active Botanicals' },
    badge: 'WHO-GMP Certified',
  },
  {
    id: 'composition',
    eyebrow: 'Ingredient Architecture',
    heading: 'Precision in\nEvery Milligram',
    body: '500 mg Berberine anchors the formula. Gurmar, Vijaysar, Jambu Seed, Karela, Haridra, and Amalaki work in concert — each at a clinically informed dose, each traceable to source.',
    stat: { value: '500mg', label: 'Berberine per Capsule' },
    badge: 'Non-GMO',
    ingredients: [
      { name: 'Berberine (Lycium barbarum)', dose: 500, maxDose: 500, unit: 'mg' },
      { name: 'Gurmar (Gymnema sylvestre)', dose: 80, maxDose: 500, unit: 'mg' },
      { name: 'Vijaysar Extract', dose: 60, maxDose: 500, unit: 'mg' },
      { name: 'Jambu Seed Extract', dose: 40, maxDose: 500, unit: 'mg' },
      { name: 'Karela (Bitter Gourd)', dose: 30, maxDose: 500, unit: 'mg' },
      { name: 'Haridra (Turmeric)', dose: 20, maxDose: 500, unit: 'mg' },
      { name: 'Amalaki (Indian Gooseberry)', dose: 20, maxDose: 500, unit: 'mg' },
    ],
  },
  {
    id: 'evidence',
    eyebrow: 'Evidence-Based',
    heading: 'From Laboratory\nto Living Room',
    body: 'Beyond Bound conducts in-house literature reviews and partners with certified labs to validate every claim. No borrowed marketing. Only observable, measurable outcomes.',
    stat: { value: 'ISO', label: 'Certified Manufacturing' },
    badge: 'HACCP Compliant',
  },
  {
    id: 'impact',
    eyebrow: 'The Glycomics Effect',
    heading: 'Measured in\nReal Lives',
    body: "Before: a glucose monitor, a notebook, and uncertainty. After: clarity, stability, and confidence. Glycomics is designed to make metabolic health a daily reality, not a clinical ambition.",
    stat: { value: '60', label: 'Capsules per Bottle' },
    badge: 'Made in India',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function IngredientBar({ name, dose, maxDose, unit, delay = 0, animate: doAnimate }) {
  const pct = Math.round((dose / maxDose) * 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[11px] font-medium tracking-wide text-navy/60 dark:text-white/70 font-body">{name}</span>
        <span className="text-[11px] font-semibold text-teal dark:text-teal-light tabular-nums font-heading">
          {dose} {unit}
        </span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-navy/10 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #0D7377, #0f8a8e)',
            boxShadow: '0 0 6px rgba(13,115,119,0.5)',
          }}
          initial={{ width: 0 }}
          animate={doAnimate ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function PanelContent({ panel, isActive, prefersReduced }) {
  const variants = prefersReduced
    ? {}
    : {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
    };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={panel.id}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full"
        >
          {/* Eyebrow */}
          <p className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-teal dark:text-teal-light mb-3">
            {panel.eyebrow}
          </p>

          {/* Heading */}
          <h3
            className="text-3xl lg:text-4xl font-bold font-heading leading-tight text-navy dark:text-white mb-5 tracking-tight"
            style={{ whiteSpace: 'pre-line' }}
          >
            {panel.heading}
          </h3>

          {/* Body */}
          <p className="text-base font-body text-navy/65 dark:text-white/65 leading-relaxed mb-6 max-w-md">
            {panel.body}
          </p>

          {/* Ingredient bars (composition panel only) */}
          {panel.ingredients && (
            <div className="mb-6 bg-sage/50 dark:bg-white/[0.04] border border-border/40 dark:border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.15em] text-navy/40 dark:text-white/40 mb-3 font-heading font-semibold">
                Each Capsule Contains
              </p>
              {panel.ingredients.map((ing, i) => (
                <IngredientBar
                  key={ing.name}
                  {...ing}
                  delay={i * 0.07}
                  animate={isActive}
                />
              ))}
            </div>
          )}

          {/* Stat + badge */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-heading font-bold text-navy dark:text-white tracking-tight">
                {panel.stat.value}
              </span>
              <span className="text-sm font-body text-navy/50 dark:text-white/50 leading-none">{panel.stat.label}</span>
            </div>
            <span className="text-[11px] font-heading font-semibold px-3 py-1.5 rounded-full border border-teal/30 text-teal dark:text-teal-light bg-teal/10 tracking-wide">
              {panel.badge}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavDots({ total, active, onChange }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          aria-label={`Go to panel ${i + 1}`}
          className="relative w-2.5 h-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal cursor-pointer"
        >
          <span
            className={`absolute inset-0 rounded-full transition-all duration-300 ${i === active
                ? 'bg-teal scale-125 shadow-[0_0_8px_rgba(13,115,119,0.5)]'
                : 'bg-navy/20 dark:bg-white/25 hover:bg-navy/40 dark:hover:bg-white/50'
              }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Product Video Viewer ────────────────────────────────────────────────────

function ProductVideoViewer({ activePanel, totalPanels, prefersReduced, scrollYProgress }) {
  const videoRef = useRef(null);

  // Subtle scale shift based on scroll for depth
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.97]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow behind video */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: prefersReduced ? 0.5 : glowOpacity,
          background:
            'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(13,115,119,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Video Container */}
      <motion.div
        className="relative z-10 w-full max-w-[360px] lg:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden bg-sage dark:bg-[#0a1628] border border-border/30 dark:border-white/[0.06]"
        style={{
          scale: prefersReduced ? 1 : videoScale,
          boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 40px rgba(13,115,119,0.08)',
        }}
      >
        <video
          ref={videoRef}
          src="/product/ProductRotation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
          aria-label="Beyond Bound Glycomics product rotation"
        />
      </motion.div>

      {/* Floating badge: top-left */}
      <motion.div
        className="absolute top-[10%] left-0 lg:-left-4 bg-white/80 dark:bg-white/[0.06] backdrop-blur-md border border-border/40 dark:border-white/10 rounded-xl px-3 py-2 z-20"
        animate={prefersReduced ? {} : { y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <p className="text-[10px] font-heading font-semibold text-navy/50 dark:text-white/50 uppercase tracking-widest mb-0.5">Formula</p>
        <p className="text-xs font-heading font-bold text-teal dark:text-teal-light">Ayurvedic</p>
      </motion.div>

      {/* Floating badge: bottom-right */}
      <motion.div
        className="absolute bottom-[12%] right-0 lg:-right-4 bg-white/80 dark:bg-white/[0.06] backdrop-blur-md border border-border/40 dark:border-white/10 rounded-xl px-3 py-2 z-20"
        animate={prefersReduced ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.5 }}
      >
        <p className="text-[10px] font-heading font-semibold text-navy/50 dark:text-white/50 uppercase tracking-widest mb-0.5">Glucose</p>
        <p className="text-xs font-heading font-bold text-teal dark:text-teal-light">Metabolism</p>
      </motion.div>

      {/* Panel indicator badge */}
      <motion.div
        className="absolute top-[10%] right-0 lg:-right-4 bg-teal/10 backdrop-blur-md border border-teal/20 rounded-full px-3 py-1.5 z-20"
        key={activePanel}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[10px] font-heading font-bold text-teal dark:text-teal-light tracking-wider">
          {activePanel + 1}/{totalPanels}
        </span>
      </motion.div>
    </div>
  );
}

// ─── Mobile Card Layout ──────────────────────────────────────────────────────

function MobileLayout({ panels, prefersReduced }) {
  return (
    <div className="lg:hidden px-5 py-16 space-y-12">
      {/* Video at top on mobile */}
      <div className="flex justify-center">
        <div className="relative w-60 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-sage dark:bg-[#0a1628] border border-border/30 dark:border-white/[0.06]">
          <video
            src="/product/ProductRotation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
            aria-label="Beyond Bound Glycomics product rotation"
          />
        </div>
      </div>

      {/* Stacked content cards */}
      {panels.map((panel, i) => (
        <motion.div
          key={panel.id}
          className="relative rounded-2xl overflow-hidden border border-border/40 dark:border-white/10 bg-white dark:bg-white/[0.04] backdrop-blur-md p-6 shadow-sm dark:shadow-none"
          initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
        >
          <p className="text-xs font-heading font-semibold tracking-[0.18em] uppercase text-teal dark:text-teal-light mb-2">
            {panel.eyebrow}
          </p>
          <h3 className="text-2xl font-heading font-bold text-navy dark:text-white mb-3 tracking-tight" style={{ whiteSpace: 'pre-line' }}>
            {panel.heading}
          </h3>
          <p className="text-sm font-body text-navy/60 dark:text-white/60 leading-relaxed mb-5">{panel.body}</p>

          {panel.ingredients && (
            <div className="bg-sage/50 dark:bg-white/[0.04] rounded-xl p-4 border border-border/40 dark:border-white/10 mb-5">
              {panel.ingredients.slice(0, 4).map((ing, j) => (
                <IngredientBar key={ing.name} {...ing} delay={j * 0.06} animate />
              ))}
            </div>
          )}

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl font-heading font-bold text-navy dark:text-white">{panel.stat.value}</span>
            <span className="text-xs font-body text-navy/50 dark:text-white/50">{panel.stat.label}</span>
            <span className="text-[10px] font-heading font-semibold px-2.5 py-1 rounded-full border border-teal/25 text-teal dark:text-teal-light bg-teal/10 tracking-wide ml-auto">
              {panel.badge}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function GlycomicsSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const [activePanel, setActivePanel] = useState(0);

  // Scroll-driven panel switching (desktop only)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (prefersReduced) return;
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * PANELS.length), PANELS.length - 1);
      setActivePanel(idx);
    });
    return unsubscribe;
  }, [scrollYProgress, prefersReduced]);

  // ~500vh for 5 panels
  const stickyHeight = `${PANELS.length * 100}vh`;

  return (
    <section
      id="glycomics"
      ref={sectionRef}
      aria-labelledby="glycomics-heading"
      className="bg-[#F4F7F6] dark:bg-transparent transition-colors duration-300"
      style={{
        '--glycomics-dark-bg': 'linear-gradient(180deg, #060f1a 0%, #081220 50%, #040c15 100%)',
      }}
    >
      {/* Dark mode background gradient overlay */}
      <div className="absolute inset-0 hidden dark:block pointer-events-none" style={{ background: 'linear-gradient(180deg, #060f1a 0%, #081220 50%, #040c15 100%)' }} />
      {/* ── Section intro ── */}
      <motion.div
        className="px-5 md:px-12 lg:px-20 pt-24 pb-8 text-center"
        initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-heading font-semibold tracking-[0.25em] uppercase text-teal dark:text-teal-light mb-3">
          Technology
        </p>
        <h2
          id="glycomics-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy dark:text-white leading-tight mb-4 tracking-tight"
        >
          Glycomics™
          <span className="block bb-gradient-text">
            by Beyond Bound®
          </span>
        </h2>
        <p className="text-base md:text-lg font-body text-navy/55 dark:text-white/55 max-w-xl mx-auto leading-relaxed">
          Natural formulation for healthy glucose metabolism. Seven botanicals. One rigorous standard.
        </p>
      </motion.div>

      {/* ── Mobile layout ── */}
      <MobileLayout panels={PANELS} prefersReduced={prefersReduced} />

      {/* ── Desktop sticky layout ── */}
      <div className="hidden lg:block" style={{ height: stickyHeight }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* Background scientific grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.02]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative w-full max-w-7xl mx-auto px-12 xl:px-20 grid grid-cols-[1fr_80px_1fr] gap-0 h-full items-center">
            {/* ── Left: Product video ── */}
            <div className="flex items-center justify-center h-full pr-8">
              <ProductVideoViewer
                activePanel={activePanel}
                totalPanels={PANELS.length}
                prefersReduced={prefersReduced}
                scrollYProgress={scrollYProgress}
              />
            </div>

            {/* ── Center: Nav dots ── */}
            <div className="flex items-center justify-center h-full">
              <NavDots
                total={PANELS.length}
                active={activePanel}
                onChange={setActivePanel}
              />
            </div>

            {/* ── Right: Text content ── */}
            <div className="flex items-center h-full pl-8 relative">
              {/* Vertical divider */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-px"
                style={{
                  height: '60%',
                  background:
                    'linear-gradient(180deg, transparent, rgba(13,115,119,0.3) 30%, rgba(13,115,119,0.3) 70%, transparent)',
                }}
              />
              <div className="pl-6 w-full">
                <PanelContent
                  panel={PANELS[activePanel]}
                  isActive
                  prefersReduced={prefersReduced}
                />
              </div>
            </div>
          </div>

          {/* ── Scroll hint (fades after first panel) ── */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={prefersReduced ? {} : { opacity: activePanel === 0 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-navy/30 dark:text-white/30 font-heading font-medium">
              Scroll to explore
            </span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-teal/60 to-transparent"
              animate={prefersReduced ? {} : { scaleY: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <motion.div
        className="px-5 md:px-12 py-20 text-center"
        initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <a
          href="https://beyondbound.co"
          target="_blank"
          rel="noopener noreferrer"
          className="bb-btn-primary text-sm tracking-wide"
        >
          <span>Explore Glycomics</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
