import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiArrowRightLine, RiDoubleQuotesL } from 'react-icons/ri';
import homeImg from '../assets/home.png';

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
            ? 'text-teal drop-shadow-[0_0_10px_rgba(13,115,119,0.5)] font-semibold'
            : 'text-navy/80 dark:text-white/80'
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

export default function Hero({ preloaderActive }) {
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
      id="home"
      className="min-h-screen pt-28 pb-16 flex items-center bg-gradient-to-b from-sage/20 via-white to-white dark:from-navy-light/10 dark:via-[#081220] dark:to-[#081220] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text & Quote */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={preloaderActive ? "hidden" : "visible"}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Priyanshu Chauhan Clip Reveal */}
            <div className="overflow-hidden mb-2">
              <motion.span
                variants={clipVariants}
                className="text-xs font-heading font-semibold tracking-wider text-teal dark:text-teal-light uppercase block"
              >
                Priyanshu Chauhan
              </motion.span>
            </div>

            {/* Title Clip Reveal */}
            <div className="overflow-hidden mb-6">
              <motion.span
                variants={clipVariants}
                className="text-sm font-heading font-medium tracking-wide text-navy/60 dark:text-white/60 uppercase block"
              >
                Founder & CEO, Beyond Bound®
              </motion.span>
            </div>

            {/* Headline Clip Reveal */}
            <div className="overflow-hidden mb-6 py-1">
              <motion.h1
                variants={clipVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-navy dark:text-white leading-[1.15] block"
              >
                Building India's most trusted metabolic health brand.
              </motion.h1>
            </div>

            {/* Two lines of narrative body copy */}
            <motion.div
              variants={fadeUpVariants}
              className="space-y-4 text-navy/70 dark:text-white/70 font-body text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              <p>
                I came to this work through agriculture, corporate sales, an MBA, and a glucose monitor strapped to my own arm.
              </p>
              <p className="font-semibold text-navy/90 dark:text-white/90">
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
              className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal/70 dark:text-teal-light/70 flex items-center gap-2 select-none"
            >
              <span>Scroll to explore</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal dark:bg-teal-light animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Image Frame */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <motion.div
              layoutId="founder-portrait"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={preloaderActive ? { opacity: 0 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[385px] aspect-[4/5] p-3 border border-accent/20 dark:border-white/10 rounded-3xl bg-white dark:bg-[#0e1f35]/50 shadow-xl shadow-navy/5 dark:shadow-none relative"
            >
              {/* Premium Blurred Ambient Glow Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={preloaderActive ? { opacity: 0 } : { opacity: 0.35 }}
                transition={{ delay: 0.8, duration: 1.0 }}
                className="absolute -inset-4 bg-cover bg-center rounded-[36px] pointer-events-none scale-105 z-[-1] blur-2xl"
                style={{ backgroundImage: `url(${homeImg})` }}
              />

              {/* Float Wrapper */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut'
                }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-teal/20 dark:hover:shadow-teal-light/20 transition-shadow duration-500 border border-transparent hover:border-teal/20 dark:hover:border-teal-light/20 group relative cursor-pointer"
              >
                {/* Founder Image */}
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                  src={homeImg}
                  alt="Priyanshu Chauhan"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1]"
                />

                {/* Subtle Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              </motion.div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal dark:border-teal-light rounded-tl-3xl -translate-x-[1px] -translate-y-[1px]"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal dark:border-teal-light rounded-tr-3xl translate-x-[1px] -translate-y-[1px]"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal dark:border-teal-light rounded-bl-3xl -translate-x-[1px] translate-y-[1px]"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal dark:border-teal-light rounded-br-3xl translate-x-[1px] translate-y-[1px]"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
