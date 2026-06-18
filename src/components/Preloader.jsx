import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import section-specific portrait assets
import homeImg from '../assets/home.png';
import aboutImg from '../assets/about.png';
import journeyImg from '../assets/journey.png';
import visionImg from '../assets/vision.png';
import connectImg from '../assets/connect.jpeg';

// Reusable character-by-character StaggeredText component
function StaggeredText({ text, delayOffset = 0, className = "", alignClass = "justify-center" }) {
  if (!text) return null;
  const words = text.split(" ");
  
  return (
    <span className={`flex flex-wrap ${alignClass} ${className}`}>
      {words.map((word, wordIdx) => {
        let prevCharsCount = 0;
        for (let i = 0; i < wordIdx; i++) {
          prevCharsCount += words[i].length;
        }

        return (
          <span key={wordIdx} className="whitespace-nowrap inline-block mr-[0.22em] last:mr-0">
            {word.split("").map((char, charIdx) => {
              // Letter delay: 0.04s, Word delay: 0.06s additional gap
              const delay = delayOffset + (prevCharsCount * 0.04) + (wordIdx * 0.06) + (charIdx * 0.04);
              return (
                <motion.span
                  key={charIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: delay, 
                    duration: 0.35, 
                    ease: "easeOut" 
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

// Background particles for editorial wellness look
function BackgroundParticles() {
  const particles = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-35">
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 2; // 2px to 5px
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = Math.random() * 15 + 15; // 15s to 30s
        const delay = Math.random() * -20;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal/40 blur-[0.5px]"
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.15, 0.7, 0.15]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay
            }}
          />
        );
      })}
    </div>
  );
}


// Configuration stages
const INTRO_STAGES = [
  {
    id: 'home',
    label: 'HOME',
    headline: 'PRIYANSHU CHAUHAN',
    subHeadline: 'Founder & CEO, Beyond Bound',
    description: 'Building modern metabolic health solutions through Ayurvedic wisdom, scientific thinking, and entrepreneurial execution.',
    image: homeImg
  },
  {
    id: 'about',
    label: 'ABOUT',
    headline: 'Entrepreneur. MBA from KJ Somaiya. Healthcare strategist.',
    subHeadline: '',
    description: 'A journey shaped by healthcare strategy, consumer insights, and the pursuit of meaningful impact.',
    image: aboutImg
  },
  {
    id: 'journey',
    label: 'JOURNEY',
    headline: 'From strategic insights to healthcare execution...',
    subHeadline: '',
    description: 'Backgrounds in healthcare, consumer businesses, and rural field projects helped shape my understanding of real-world challenges.',
    image: journeyImg
  },
  {
    id: 'vision',
    label: 'VISION',
    headline: "To build India's most trusted metabolic wellness company—",
    subHeadline: '',
    description: 'where tradition meets evidence, and wellness becomes accessible, transparent, and effective.',
    image: visionImg
  },
  {
    id: 'connect',
    label: 'CONNECT',
    headline: 'Open to collaborations, conversations, partnerships,',
    subHeadline: '',
    description: 'and opportunities to build healthier futures together.',
    image: connectImg
  }
];

const STEP_DURATIONS = [11000, 9500, 10000, 9500, 8000];
const TOTAL_STAGES = INTRO_STAGES.length; // 5

export default function Preloader({ onComplete }) {
  const [step, setStep] = useState(0); // 0 to 4 (5 stages)
  const [isVisible, setIsVisible] = useState(true);
  // Key to force re-mount of AnimatePresence children on manual nav
  const [animKey, setAnimKey] = useState(0);



  // Auto-advance timer ref
  const autoAdvanceTimer = useRef(null);
  // Track if component is mounted
  const isMounted = useRef(true);



  // Cleanup on unmount
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  // ── Navigate to a specific step ──
  const navigateToStep = useCallback((targetStep) => {
    // Clear existing auto-advance timer
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }

    if (targetStep >= TOTAL_STAGES) {
      // Final chapter passed → finish preloader
      setStep(TOTAL_STAGES);
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    if (targetStep < 0) return; // Can't go before first chapter

    // Increment animKey to force fresh animation mount
    setAnimKey(prev => prev + 1);
    setStep(targetStep);
  }, [onComplete]);

  // ── Auto-advance timer: starts/restarts whenever `step` changes ──
  useEffect(() => {
    if (step >= TOTAL_STAGES) {
      // Completion transition
      setIsVisible(false);
      if (onComplete) {
        const exitTimer = setTimeout(() => {
          if (isMounted.current) onComplete();
        }, 850);
        return () => clearTimeout(exitTimer);
      }
      return;
    }

    // Clear any existing timer
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }

    // Set a new auto-advance timer for the current step
    autoAdvanceTimer.current = setTimeout(() => {
      if (isMounted.current) {
        navigateToStep(step + 1);
      }
    }, STEP_DURATIONS[step]);

    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
        autoAdvanceTimer.current = null;
      }
    };
  }, [step, animKey, onComplete, navigateToStep]);

  // ── Progress calculation for the segment bar ──
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);

  useEffect(() => {
    if (step >= TOTAL_STAGES) return;

    setProgress(0);
    const intervalTime = 30;
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + (intervalTime / STEP_DURATIONS[step]) * 100;
        return next >= 100 ? 100 : next;
      });
    }, intervalTime);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [step, animKey]);

  // ── Click zone handler ──
  const handleZoneClick = useCallback((e) => {
    // Don't trigger on skip button or other interactive elements
    if (e.target.closest('.skip-btn') || e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]') || e.target.closest('input') || e.target.closest('video')) {
      return;
    }

    const viewportWidth = window.innerWidth;
    const clickX = e.clientX ?? (e.touches?.[0]?.clientX ?? 0);
    const isRightHalf = clickX > viewportWidth / 2;

    if (isRightHalf) {
      // Next chapter
      navigateToStep(step + 1);
    } else {
      // Previous chapter (no action if already on first)
      if (step > 0) {
        navigateToStep(step - 1);
      }
    }
  }, [step, navigateToStep]);



  // Skip the intro sequence instantly
  const handleSkip = (e) => {
    e.stopPropagation();
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    setStep(TOTAL_STAGES);
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onClick={handleZoneClick}
          className="fixed inset-0 text-white z-[99999] flex flex-col justify-center items-center select-none cursor-pointer overflow-hidden bg-[#0F2744]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >

          {/* Subtle Ambient Light Vignette & Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,39,68,0.8)_95%)] pointer-events-none z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] aspect-square rounded-full bg-teal/5 blur-[130px] pointer-events-none z-0" />
          <BackgroundParticles />

          {/* Documentary Progress Segments Indicator */}
          <motion.div 
            exit={{ opacity: 0 }}
            className="flex justify-center gap-2 mt-4 mb-8 relative z-20 w-[200px] md:w-[320px]"
          >
            {Array.from({ length: TOTAL_STAGES }).map((_, idx) => {
              const isActive = step === idx;
              const isPast = step > idx;
              const scaleValue = isPast ? 1 : isActive ? progress / 100 : 0;

              return (
                <div key={idx} className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    style={{ 
                      transform: `scaleX(${scaleValue})`,
                      transformOrigin: 'left',
                      transition: 'transform 30ms linear'
                    }}
                    className="absolute inset-0 bg-teal"
                  />
                </div>
              );
            })}
          </motion.div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center justify-items-center max-w-5xl w-full px-6 md:px-12 z-20 mt-2 md:mt-4">
            
            {/* Left: Text Content (md:col-span-7) */}
            <div className="order-2 md:order-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left w-full justify-center min-h-[220px] md:min-h-[350px]">
              <AnimatePresence mode="wait">
                {step < TOTAL_STAGES && (
                  <motion.div
                    key={`text-${step}-${animKey}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 md:space-y-6 w-full"
                  >
                    <div>
                      {/* Section Label */}
                      <StaggeredText
                        text={INTRO_STAGES[step]?.label}
                        delayOffset={0.0}
                        className="text-xs sm:text-sm font-heading font-semibold tracking-[0.25em] text-teal uppercase block"
                        alignClass="justify-center md:justify-start"
                      />

                      {/* Headline */}
                      <div className="mt-3 md:mt-4">
                        <StaggeredText
                          text={INTRO_STAGES[step]?.headline}
                          delayOffset={0.8}
                          className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading tracking-tight text-white leading-tight block"
                          alignClass="justify-center md:justify-start"
                        />
                      </div>

                      {/* Subheadline (if exists) */}
                      {INTRO_STAGES[step]?.subHeadline && (
                        <div className="mt-2 md:mt-3">
                          <StaggeredText
                            text={INTRO_STAGES[step]?.subHeadline}
                            delayOffset={1.5}
                            className="text-base sm:text-lg font-heading font-medium tracking-wide text-accent block"
                            alignClass="justify-center md:justify-start"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <div className="mt-4 md:mt-6">
                        <StaggeredText
                          text={INTRO_STAGES[step]?.description}
                          delayOffset={2.3}
                          className="text-sm sm:text-base md:text-lg font-body text-white/85 leading-relaxed max-w-xl block"
                          alignClass="justify-center md:justify-start"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Portrait Container (md:col-span-5) */}
            <div className="order-1 md:order-2 md:col-span-5 flex justify-center items-center w-full">
              <div className="w-[220px] h-[300px] md:w-[340px] md:h-[460px] shrink-0 rounded-[28px] overflow-hidden border border-white/10 shadow-2xl relative bg-white/5 z-10">
                <AnimatePresence mode="popLayout">
                  {step < TOTAL_STAGES && (
                    <motion.div
                      key={`portrait-${step}-${animKey}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={INTRO_STAGES[step]?.image}
                        alt={INTRO_STAGES[step]?.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-navy/15"></div>
                      
                      {/* Diagonal Light Sweep for premium luxury feel */}
                      <motion.div
                        initial={{ x: '-150%' }}
                        animate={{ x: '150%' }}
                        transition={{ delay: 0.3, duration: 1.0, ease: "easeOut" }}
                        className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.15)_50%,transparent_70%)] pointer-events-none z-20"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Dedicated Skip Intro Button */}
          <motion.button 
            exit={{ y: 15, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleSkip}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 px-6 py-2.5 border border-white/20 hover:border-teal/40 bg-white/5 hover:bg-teal/10 text-white/80 hover:text-white rounded-full text-xs md:text-sm tracking-wider uppercase font-semibold transition-all duration-300 flex items-center gap-2 z-30 skip-btn shadow-lg backdrop-blur-sm active:scale-95"
            style={{ cursor: 'pointer' }}
          >
            <span>Skip Intro</span>
            <span className="text-[10px] md:text-xs opacity-60">✕</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
