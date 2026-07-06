/**
 * components/MicroInteractions.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable premium micro-interaction components
 *
 * Exports:
 *   <MagneticButton>     – subtle magnetic hover effect on buttons
 *   <RevealText>         – per-word stagger reveal animation
 *   <HoverCard>          – 3D tilt + glow card hover
 *   <AnimatedCounter>    – count-up number animation on scroll enter
 *   <ScrollIndicator>    – animated down-scroll hint
 *   <GlowLink>           – inline link with teal underline sweep
 *   <PulseOrb>           – ambient pulsing orb (used in hero sections)
 *
 * All components respect prefers-reduced-motion.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ─── MagneticButton ───────────────────────────────────────────────────────────
/**
 * Wraps any button/link with a subtle magnetic pull on hover.
 * Strength: 0.3 = very subtle (recommended), 0.6 = noticeable
 *
 * <MagneticButton strength={0.3}>
 *   <button className="bg-teal text-white px-6 py-3 rounded-full">Click me</button>
 * </MagneticButton>
 */
export function MagneticButton({ children, strength = 0.3, className = '' }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || prefersReduced) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength, prefersReduced]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealText ───────────────────────────────────────────────────────────────
/**
 * Splits text into words and reveals each with a staggered animation.
 *
 * <RevealText
 *   as="h1"
 *   className="text-5xl font-heading font-bold text-navy dark:text-white"
 *   delay={0.1}
 * >
 *   Your biology is not your destiny.
 * </RevealText>
 */
export function RevealText({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.06,
  once = true,
}) {
  const prefersReduced = useReducedMotion();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2, once });

  if (prefersReduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const words = String(children).split(' ');

  return (
    <Tag ref={ref} className={className} aria-label={String(children)}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.55,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}

// ─── HoverCard ────────────────────────────────────────────────────────────────
/**
 * 3D tilt + ambient glow on hover. Use to wrap project cards, stat cards, etc.
 *
 * <HoverCard glowColor="rgba(13,115,119,0.12)">
 *   <div className="p-6 bg-white dark:bg-navy rounded-2xl">Content</div>
 * </HoverCard>
 */
export function HoverCard({
  children,
  glowColor = 'rgba(13,115,119,0.12)',
  tiltStrength = 8,
  className = '',
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 180, damping: 18 };
  const rx = useSpring(rotateX, springConfig);
  const ry = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || prefersReduced) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = e.clientX - rect.left - cx;
    const dy = e.clientY - rect.top - cy;
    rotateX.set((-dy / cy) * tiltStrength);
    rotateY.set((dx / cx) * tiltStrength);
  }, [rotateX, rotateY, tiltStrength, prefersReduced]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  }, [rotateX, rotateY]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.015 }}
      transition={{ scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Glow layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: glowColor,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

// ─── AnimatedCounter ──────────────────────────────────────────────────────────
/**
 * Counts up to a value when scrolled into view.
 *
 * <AnimatedCounter value={77} suffix="M" label="Indians with diabetes" />
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  label = '',
  duration = 1.5,
  className = '',
  valueClassName = '',
  labelClassName = '',
}) {
  const prefersReduced = useReducedMotion();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const [displayed, setDisplayed] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (!isVisible || prefersReduced) return;
    let start = null;
    const startVal = 0;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(startVal + (value - startVal) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isVisible, value, duration, prefersReduced]);

  return (
    <div ref={ref} className={className}>
      <div className={`text-4xl xl:text-5xl font-heading font-bold text-navy dark:text-white leading-none tabular-nums ${valueClassName}`}>
        {prefix}{displayed.toLocaleString()}{suffix}
      </div>
      {label && (
        <p className={`text-xs text-navy/50 dark:text-white/45 mt-1 leading-snug ${labelClassName}`}>{label}</p>
      )}
    </div>
  );
}

// ─── ScrollIndicator ─────────────────────────────────────────────────────────
/**
 * Animated scroll-down hint. Place at bottom of hero sections.
 *
 * <ScrollIndicator label="Scroll to explore" />
 */
export function ScrollIndicator({ label = 'Scroll', className = '' }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`} aria-hidden="true">
      {label && (
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-navy/30 dark:text-white/30">
          {label}
        </span>
      )}
      <div className="relative w-[1px] h-10 bg-navy/10 dark:bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            background: 'linear-gradient(180deg, #0D7377, transparent)',
            height: '60%',
          }}
          animate={prefersReduced ? {} : { y: ['0%', '200%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

// ─── GlowLink ────────────────────────────────────────────────────────────────
/**
 * Inline anchor with an animated teal underline sweep on hover.
 *
 * <GlowLink href="https://beyondbound.co">Learn more</GlowLink>
 */
export function GlowLink({ href, children, className = '', ...props }) {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className={`relative inline-block text-teal hover:text-teal-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-sm ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
      {/* Underline bar */}
      <span
        style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          height: '1px',
          width: '100%',
          overflow: 'hidden',
          display: 'block',
        }}
      >
        <motion.span
          style={{
            display: 'block',
            height: '100%',
            background: 'linear-gradient(90deg, #0D7377, #0a5c5f)',
            boxShadow: '0 0 6px rgba(13,115,119,0.6)',
          }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={prefersReduced ? {} : { scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
    </a>
  );
}

// ─── PulseOrb ────────────────────────────────────────────────────────────────
/**
 * Ambient pulsing background orb. Used in hero sections for depth.
 *
 * <PulseOrb
 *   size={600}
 *   color="rgba(13,115,119,0.08)"
 *   className="absolute top-0 left-1/2 -translate-x-1/2"
 * />
 */
export function PulseOrb({
  size = 500,
  color = 'rgba(13,115,119,0.08)',
  className = '',
  delay = 0,
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={`rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${Math.round(size * 0.1)}px)`,
      }}
      animate={
        prefersReduced
          ? {}
          : {
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
            }
      }
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      aria-hidden="true"
    />
  );
}
