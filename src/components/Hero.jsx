import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Typewriter() {
  const phrases = [
    "Founder & CEO, Beyond Bound®",
    "Building India's Future in Metabolic Wellness"
  ];

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullText = phrases[phraseIdx];

    if (!isDeleting) {
      if (displayedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        }, 90); // 80–100ms per character
      } else {
        setShowGlow(true);
        const glowTimer = setTimeout(() => setShowGlow(false), 500);

        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2800); // 2.5–3 seconds pause

        return () => {
          clearTimeout(timer);
          clearTimeout(glowTimer);
        };
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        }, 45); // 40–50ms per character
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIdx]);

  return (
    <span className="inline-block relative">
      <span
        className={`transition-all duration-500 ease-out font-heading font-medium tracking-wide ${showGlow
          ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] font-semibold'
          : 'text-white/80'
          }`}
      >
        {displayedText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[2px] h-[1.15em] bg-accent ml-1 align-middle"
      />
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Staggered reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  // GSAP-like Power4 clip reveal
  const clipVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1] // GreenSock Power4 easeOut equivalent
      }
    }
  };

  // Fade up for smaller content
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-screen pt-24 pb-12 md:pt-28 md:pb-16 flex items-center bg-gradient-to-b from-sage/20 via-white to-white dark:from-navy-light/10 dark:via-[#081220] dark:to-[#081220] overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/hero-poster.webp"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
        <source src="/video/hero-720.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none z-10" />

      {/* Bottom Cinematic Blur & Fade Overlay to hide watermark and blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#081220] dark:via-[#081220]/80 dark:to-transparent pointer-events-none z-10 backdrop-blur-[3px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left Column: Text & Quote */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-12 flex flex-col justify-center text-left"
          >
            {/* Priyanshu Chauhan Clip Reveal */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                id="hero-title"
                variants={clipVariants}
                className="text-xs font-heading font-semibold tracking-wider text-white uppercase block"
              >
                Priyanshu Chauhan
              </motion.h1>
            </div>

            {/* Title Clip Reveal */}
            <div className="overflow-hidden mb-6">
              <motion.span
                variants={clipVariants}
                className="text-sm font-heading font-medium tracking-wide text-white/60 uppercase block"
              >
                Founder & CEO, Beyond Bound®
              </motion.span>
            </div>

            {/* Headline Clip Reveal */}
            <div className="overflow-hidden mb-6 py-1">
              <motion.h2
                variants={clipVariants}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-white leading-[1.15] block max-w-2xl"
              >
                Building a metabolic health brand that earns trust through proof.
              </motion.h2>
            </div>

            {/* Two lines of narrative body copy */}
            <motion.div
              variants={fadeUpVariants}
              className="space-y-4 text-white/70 font-body text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              <p>
                I came to this work through agriculture, product strategy, new product development (NPD), operational efficiency, an MBA, and years of glucose self-observation.
              </p>
              <p className="font-semibold text-white/90">
                This isn't a portfolio. It's a working record of a founder still in the middle of the build.
              </p>
            </motion.div>

            {/* Subheadline Typewriter */}
            <motion.div
              variants={fadeUpVariants}
              className="min-h-[3rem] sm:min-h-[2.5rem] flex items-center mb-8 border-l border-accent pl-4 max-w-xl text-sm sm:text-base leading-relaxed"
            >
              <Typewriter />
            </motion.div>

            {/* Understated Scroll Cue instead of buttons & quote block */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-white/70 flex items-center gap-2 select-none"
            >
              <span>Scroll to explore</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
