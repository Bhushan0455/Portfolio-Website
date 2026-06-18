import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import founderSpeakingImg from '../assets/founder_speaking.jpg';

export default function FounderPhilosophy() {
  const containerRef = useRef(null);

  // Setup scroll scrollYProgress for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax translation mapping
  const yParallax = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
    }
  };

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative min-h-screen bg-[#07162c] text-white flex items-center justify-start overflow-hidden py-28 md:py-36 px-6 sm:px-12 md:px-20 lg:px-32 select-none"
    >
      {/* ── Full-width background speaking portrait with subtle parallax ── */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
      >
        <motion.img
          src={founderSpeakingImg}
          alt="Priyanshu Chauhan speaking on stage"
          style={{ y: yParallax }}
          className="absolute -top-[15%] w-full h-[130%] object-cover object-right brightness-[0.75] contrast-[1.05]"
        />
        {/* Soft edge-blending gradients ensuring readability of left-aligned text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#07162c]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-transparent to-transparent" />
      </motion.div>

      {/* ── Background Vignette & Ambient Light (Rendered on top of image) ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(15,39,68,0.45)_0%,rgba(7,22,44,0.3)_100%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ── Content Container (Center-Left Placement) ── */}
      <div className="max-w-4xl w-full relative z-10 text-left lg:pl-8 xl:pl-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {/* Header Label: + FOUNDER PHILOSOPHY ─────────────────── ◆ */}
          <motion.div variants={textVariants} className="flex items-center gap-4 text-accent text-xs sm:text-sm font-heading font-semibold uppercase tracking-[0.25em]">
            <span>+ My Philosophy</span>
            <div className="h-[1px] bg-gradient-to-r from-accent/70 to-transparent w-36 sm:w-56 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-accent" />
            </div>
          </motion.div>

          {/* Hollow outline double quotes */}
          <motion.div variants={textVariants} className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.15)] font-serif text-8xl leading-none select-none tracking-tighter w-max">
            ““
          </motion.div>

          {/* Quote Text matching reference sizes */}
          <motion.div variants={textVariants}>
            <h2
              className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold font-serif leading-[1.08] tracking-tight max-w-2xl"
              style={{ color: '#ffffff' }}
            >
              Rejection is <br />
              <span style={{ color: '#D8A15C' }}>not a dead end.</span>
            </h2>
          </motion.div>

          {/* Horizontal line divider */}
          <motion.div
            variants={textVariants}
            className="w-16 h-[1px] bg-white/20 my-6"
          />

          {/* Supporting Description */}
          <motion.p
            variants={textVariants}
            className="font-body font-light text-white/75 text-base sm:text-lg max-w-lg leading-relaxed"
          >
            Sometimes the path changes <br />
            before the destination does.
          </motion.p>

          {/* Gold vertical bar with Signature */}
          <motion.div
            variants={textVariants}
            className="flex items-stretch gap-4 mt-10"
          >
            <div className="w-[2px] bg-accent rounded" />
            <div className="flex flex-col justify-center">
              <span className="font-heading text-xs sm:text-sm text-accent font-semibold uppercase tracking-[0.2em] leading-none">
                Priyanshu Chauhan
              </span>
              <span className="font-body text-xs sm:text-sm text-white/50 mt-2 tracking-wide font-medium">
                Founder & CEO, Beyond Bound®
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
