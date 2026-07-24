import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const phrases = [
    'measured by the founder first.',
    'built on real data, not claims.',
    'is science-led, not marketed.',
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer;

    if (!isDeleting) {
      // Typing
      if (displayedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        // Pause at end of phrase
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      // Deleting (slightly faster)
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

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

            {/* Headline Clip Reveal + Typewriter */}
            <div className="overflow-hidden mb-6 py-1">
              <motion.h2
                variants={clipVariants}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-white leading-[1.15] block max-w-2xl"
              >
                Evidence-led healthcare
                <br />
                <span className="text-teal-400">{displayedText}</span>
                <span className="inline-block w-[3px] h-[0.85em] bg-teal-400 ml-1 align-middle animate-pulse" />
              </motion.h2>
            </div>

            {/* Two lines of narrative body copy */}
            <motion.div
              variants={fadeUpVariants}
              className="space-y-4 text-white/70 font-body text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              <p>
                I came to this work through agriculture, an MBA, years of product strategy and NPD, and a glucose monitor strapped to my own arm.
              </p>

            </motion.div>



            {/* Understated Scroll Cue instead of buttons & quote block */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-black dark:text-white flex items-center gap-2 select-none"
            >
              <span>Scroll to explore</span>
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
