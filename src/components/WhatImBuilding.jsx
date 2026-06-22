import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { RiArrowRightUpLine, RiPlayLine, RiCloseLine, RiVolumeMuteLine, RiVolumeUpLine } from 'react-icons/ri';
import healthcareEntrepreneurshipImg from '../assets/healthcare_entrepreneurship.jpg';
import beyondboundImg from '../assets/beyondbound.jpg';
import beyondboundLogo from '../assets/beyondbound_logo.png';

// Import video clips
import clip1 from '../assets/Clip1.mp4';
import clip2 from '../assets/Clip2.mp4';
import clip3 from '../assets/Clip3 1.mp4';

export default function WhatImBuilding() {
  const cgmContainerRef = useRef(null);
  const slideshowRef = useRef(null);
  const videoRef = useRef(null);

  const [activeClipIdx, setActiveClipIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const clips = [
    { id: 1, title: 'Clip 1', src: clip1 },
    { id: 2, title: 'Clip 2', src: clip2 },
    { id: 3, title: 'Clip 3', src: clip3 },
  ];

  // Intersection Observer to play video when in view and pause when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(err => console.log("Autoplay on scroll prevented:", err));
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (slideshowRef.current) {
      observer.observe(slideshowRef.current);
    }

    return () => {
      if (slideshowRef.current) {
        observer.unobserve(slideshowRef.current);
      }
    };
  }, []);

  // Load and autoplay when activeClipIdx changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => console.log("Autoplay on clip change prevented:", err));
    }
  }, [activeClipIdx]);

  const handleClipChange = (idx) => {
    setActiveClipIdx(idx);
  };

  const handleVideoEnded = () => {
    setActiveClipIdx((prev) => (prev + 1) % clips.length);
  };

  // Parallax for the CGM photo
  const { scrollYProgress } = useScroll({
    target: cgmContainerRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const journeySteps = [
    {
      num: '01',
      label: 'What I Observed',
      desc: 'I observed that while metabolic disorders are rising rapidly across India, consumer understanding remains shallow. People are constantly overwhelmed by conflicting advice, shifting wellness trends, and information overload. They want to take control of their health, but they do not know who to trust.',
      quote: 'Information overload breeds inaction; what we need today is not more products, but evidence we can actually verify.',
      cellClass: 'bg-[#F8F6F1] dark:bg-[#0e1f35]',
      titleClass: 'text-navy dark:text-white',
      descClass: 'text-navy/70 dark:text-white/70'
    },
    {
      num: '02',
      label: 'What I Learned',
      desc: 'My journey from agriculture to healthcare management taught me that wellness must be built from the soil up. Agriculture showed me where health begins, sales showed me how trust is earned, and managing healthcare showed me how systems scale.',
      quote: 'Trust cannot be manufactured through marketing alone; it is the compound interest of transparency.',
      cellClass: 'bg-[#F5F0E8] dark:bg-[#152942]',
      titleClass: 'text-navy dark:text-white',
      descClass: 'text-navy/70 dark:text-white/70'
    },
    {
      num: '03',
      label: 'What I\'m Building',
      desc: 'Through Beyond Bound, I am building a brand focused on metabolic health. My goal isn\'t simply to create products, but to disclose exact formulations, substantiate every claim, and empower consumers with honest guidance so they can take control of their wellbeing.',
      quote: 'For me, the opportunity isn\'t just in wellness. It\'s in creating a healthcare brand that people can genuinely believe in.',
      cellClass: 'bg-[#EDF5F4] dark:bg-[#0b2c2a]',
      titleClass: 'text-navy dark:text-white',
      descClass: 'text-navy/70 dark:text-white/70'
    },
    {
      num: '04',
      label: 'Where We\'re Going',
      desc: 'I want to establish Beyond Bound as a trusted name in metabolic health. I believe the future of wellness belongs in the choices people make before disease ever arrives, and we are building the framework to guide those choices.',
      quote: 'The future of healthcare begins at the table, not in the hospital.',
      cellClass: 'bg-[#0D4A47] dark:bg-[#0D4A47]',
      titleClass: 'text-white',
      descClass: 'text-white/85'
    }
  ];

  const focusAreas = [
    'Metabolic Health',
    'Metabolic Wellness',
    'Science-backed Natural Ingredients',
    'Consumer Education'
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section id="building" className="py-24 md:py-32 bg-white dark:bg-[#081220] relative overflow-hidden select-none">
      {/* Subtle background ambient decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage/30 dark:bg-teal-dark/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light">
            My Focus
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-navy dark:text-white mt-3 tracking-tight">
            What I'm Building
          </h2>
          <p className="text-navy/60 dark:text-white/60 font-body text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Beyond Bound began with a simple observation: India doesn't need more health products. It needs health brands people can genuinely trust.
            <br /><br />
            My focus is metabolic health — one of the most important yet overlooked challenges facing millions of Indians today. Everything I'm building starts from that belief.
          </p>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-6" />
        </div>

        {/* ── PART 1 — WHY I STARTED ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-28"
        >
          {/* LEFT: Photo */}
          <div className="lg:col-span-5">
            <motion.div 
              className="relative overflow-hidden rounded-[2rem] aspect-[16/10] sm:aspect-[16/11] lg:aspect-square shadow-xl dark:shadow-none group border border-accent/10 dark:border-white/10"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <img 
                src={healthcareEntrepreneurshipImg} 
                alt="Priyanshu Chauhan presenting and pitching Beyond Bound® at startup exhibition" 
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-[0.16,1,0.3,1] brightness-[0.93] contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-navy/5 to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* RIGHT: Story content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy dark:text-white tracking-tight">
              Why I Started
            </h3>
            <div className="space-y-4 font-body text-navy/80 dark:text-white/80 text-sm sm:text-base leading-relaxed">
              <p>
                The idea behind Beyond Bound began with a question that stayed with me for years:
              </p>
              <p className="font-semibold text-navy dark:text-white italic">
                "Why do we wait for health problems to become serious before we start paying attention to them?"
              </p>
              <p>
                Through my studies, industry exposure, and conversations with consumers, I became increasingly interested in metabolic health — the systems that quietly influence energy, blood sugar, weight, and long-term wellbeing.
              </p>
              <p>
                The challenge wasn't a lack of products. It was a lack of clarity, trust, and meaningful education.
              </p>
              <p>
                That realization eventually became Beyond Bound.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── PART 2 — FIRST-HAND EFFICACY ── */}
        <motion.div 
          ref={cgmContainerRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-28"
        >
          {/* LEFT: Story Narrative (5/12 width on desktop, order-2 on mobile) */}
          <div className="lg:col-span-5 order-2 lg:order-1 text-left space-y-6">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light block">
              First-Hand Efficacy
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy dark:text-white tracking-tight leading-snug">
              Proving It on Myself First
            </h3>

            <div className="space-y-4 font-body text-navy/80 dark:text-white/80 text-sm sm:text-base leading-relaxed">
              <p>
                Before asking anyone to trust Beyond Bound, I felt a responsibility to understand the problem more deeply myself.
              </p>
              <p>
                I spent months wearing a continuous glucose monitor, tracking how everyday decisions — food, sleep, movement, and stress — influenced my own metabolic health. What began as curiosity quickly became conviction.
              </p>
              <p>
                The experience changed the way I thought about wellness. It reminded me that health isn't built through claims or advertising. It's built through understanding, consistency, and measurable change.
              </p>
              <p>
                That perspective continues to shape everything we build at Beyond Bound today.
              </p>
            </div>
          </div>

          {/* RIGHT: Video Player Frame (7/12 width on desktop, order-1 on mobile) */}
          <div ref={slideshowRef} className="lg:col-span-7 order-1 lg:order-2 relative w-full aspect-[16/9] rounded-[2rem] border border-accent/20 dark:border-white/10 p-2 bg-white dark:bg-[#0e1f35]/30 shadow-xl dark:shadow-none overflow-hidden group">
            
            {/* Subtle Top-Left Badge */}
            <div className="absolute top-4 left-4 z-20 bg-navy/85 dark:bg-[#081220]/80 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest font-heading select-none pointer-events-none">
              Founder Self-Observation
            </div>

            {/* Top Right Controls (Tabs + Mute Toggle) */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {/* Clip Selector Tabs */}
              <div className="flex gap-1.5">
                {clips.map((clip, idx) => (
                  <button
                    key={clip.id}
                    onClick={() => handleClipChange(idx)}
                    className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                      activeClipIdx === idx
                        ? 'bg-teal border-teal text-white shadow-md font-semibold'
                        : 'bg-black/60 border-white/10 text-white/80 hover:bg-black/80 hover:text-white'
                    }`}
                  >
                    {clip.title}
                  </button>
                ))}
              </div>

              {/* Mute/Unmute Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    videoRef.current.muted = !videoRef.current.muted;
                    setIsMuted(videoRef.current.muted);
                  }
                }}
                className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-teal hover:border-teal transition-all duration-300 cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <RiVolumeMuteLine size={13} /> : <RiVolumeUpLine size={13} />}
              </button>
            </div>

            {/* Video Viewport */}
            <div className="w-full h-full rounded-[1.5rem] relative overflow-hidden bg-black flex items-center justify-center">
              <video
                key={activeClipIdx}
                ref={videoRef}
                src={clips[activeClipIdx].src}
                autoPlay
                playsInline
                muted={isMuted}
                onEnded={handleVideoEnded}
                className="w-full h-full object-contain bg-black rounded-[1.5rem]"
              />
            </div>

            {/* Quote overlaying the bottom center inside the frame */}
            <div className="absolute bottom-4 left-4 right-4 bg-accent/90 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl border border-white/10 shadow-lg z-20 text-center pointer-events-none">
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest block text-white/95 text-center max-w-md mx-auto leading-relaxed">
                "What I won't test on myself, I will never ask anyone else to trust."
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── PART 3 — THE JOURNEY TO BEYOND BOUND ── */}
        <div className="mb-16 md:mb-28 max-w-4xl mx-auto">
          <div className="text-left mb-12">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy dark:text-white tracking-tight">
              The Journey to Beyond Bound®
            </h3>
          </div>

          {/* Grid Wrapper */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 w-full items-stretch gap-[2px] bg-white dark:bg-[#081220] rounded-3xl overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800"
          >
            {journeySteps.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className={`flex flex-col text-left items-start justify-start p-6 sm:p-8 md:p-12 ${step.cellClass}`}
              >
                {/* Step number in 48px top-left */}
                <span 
                  className="font-heading font-bold leading-none select-none tracking-tight mb-6"
                  style={{ fontSize: '48px', color: '#C9A87C' }}
                >
                  {step.num}
                </span>
                
                {/* Bold title in 18px below it */}
                <h4 
                  className={`font-heading font-bold tracking-tight mb-2 ${step.titleClass}`}
                  style={{ fontSize: '18px' }}
                >
                  {step.label}
                </h4>
                
                {/* Body text in 14px below that */}
                <p 
                  className={`font-body leading-relaxed ${step.descClass}`}
                  style={{ fontSize: '14px' }}
                >
                  {step.desc}
                </p>

                {/* Memorable line quote */}
                {step.quote && (
                  <p 
                    className={`font-body italic font-semibold mt-4 leading-relaxed ${step.descClass}`}
                    style={{ fontSize: '13px' }}
                  >
                    "{step.quote}"
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── PART 4 — BEYOND BOUND TODAY ── */}
        <div className="mb-16 md:mb-28 max-w-4xl mx-auto">
          <div className="bg-[#FAF9F5] dark:bg-[#0e1f35]/40 border border-accent/20 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
            {/* Soft inner glow decorator */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-teal/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Brand Logo Image */}
            <div className="flex justify-center mb-4">
              <img 
                src={beyondboundLogo} 
                alt="Beyond Bound® Logo" 
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </div>

            {/* Brand Logo Typo */}
            <div className="font-heading font-extrabold text-2xl sm:text-3xl tracking-[0.2em] text-navy dark:text-white uppercase select-none">
              BEYOND <span className="text-teal dark:text-teal-light">BOUND®</span>
            </div>

            {/* Tagline */}
            <h4 className="font-serif italic text-lg sm:text-xl text-navy/90 dark:text-white/95 mt-4 leading-relaxed max-w-lg mx-auto">
              "Wellness that survives measurement."
            </h4>

            {/* Accent divider line */}
            <div className="h-[1px] w-20 bg-accent/35 mx-auto my-6" />

            {/* Focus area pills */}
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-2xl mx-auto">
              {focusAreas.map((area, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 bg-white dark:bg-[#081220] border border-border/80 dark:border-white/10 rounded-full text-xs font-heading font-semibold text-navy/85 dark:text-white/85 hover:border-teal/20 dark:hover:border-teal-light/20 transition-all duration-300 shadow-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── PART 5 — EXPLORE BEYOND BOUND ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="text-center space-y-6 max-w-xl mx-auto"
        >
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy dark:text-white tracking-tight">
              Explore Beyond Bound®
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Website CTA */}
            <a 
              href="https://beyondbound.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal hover:bg-teal-dark text-white font-heading font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-xs tracking-widest uppercase cursor-pointer"
            >
              <span>Visit Beyond Bound®</span>
              <RiArrowRightUpLine size={16} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
