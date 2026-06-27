import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';
import healthcareEntrepreneurshipImg from '../assets/healthcare_entrepreneurship.webp';
import beyondboundLogo from '../assets/beyondbound_logo.webp';
import CGMGraph from './CGMGraph';

// Import video clips
import clip1 from '../assets/Clip1.mp4';
import clip2 from '../assets/Clip2.mp4';
import clip3 from '../assets/Clip3 1.mp4';

export default function WhatImBuilding() {
  const cgmContainerRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer to play videos when in view and pause when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (cgmContainerRef.current) {
      observer.observe(cgmContainerRef.current);
    }

    return () => {
      if (cgmContainerRef.current) {
        observer.unobserve(cgmContainerRef.current);
      }
    };
  }, []);

  // Sync play/pause based on section view and mobile/desktop states
  useEffect(() => {
    const videos = [video1Ref.current, video2Ref.current, video3Ref.current];
    videos.forEach(video => {
      if (video) {
        if (isSectionInView) {
          video.play().catch(err => console.log("Autoplay check failed:", err));
        } else {
          video.pause();
        }
      }
    });
  }, [isMobile, isSectionInView]);



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
    <section id="building" aria-labelledby="building-title" className="py-24 md:py-32 bg-white dark:bg-[#081220] relative overflow-hidden select-none">
      {/* Subtle background ambient decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage/30 dark:bg-teal-dark/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light">
            My Focus
          </span>
          <h2 id="building-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-navy dark:text-white mt-3 tracking-tight">
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
          {isMobile ? (
            /* Mobile Flow: Heading -> Image Frame -> Paragraphs */
            <div className="space-y-6 text-left w-full">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy dark:text-white tracking-tight">
                Why I Started
              </h3>

              {/* Photo Frame */}
              <div className="w-full">
                <motion.div
                  className="relative overflow-hidden rounded-[2rem] aspect-[16/10] sm:aspect-[16/11] shadow-xl dark:shadow-none group border border-accent/10 dark:border-white/10"
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

              {/* All paragraphs */}
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
          ) : (
            /* Desktop Flow */
            <>
              {/* LEFT: Photo */}
              <div className="lg:col-span-5 order-2 lg:order-1">
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
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
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
            </>
          )}
        </motion.div>

        {/* ── PART 2 — PROVING IT ON MYSELF FIRST ── */}
        <motion.div
          ref={cgmContainerRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-16 md:mb-28 w-full"
        >
          {isMobile ? (
            /* Mobile Flow: Title -> Video Frame -> All Paras */
            <div className="w-full text-left space-y-6">
              <div>
                <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light block mb-2">
                  First-Hand Efficacy
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy dark:text-white tracking-tight leading-snug">
                  Proving It on Myself First
                </h3>
              </div>

              {/* Video Player Column */}
              <div className="w-full flex flex-col items-center">
                {/* Player Frame Card */}
                <div className="relative w-full aspect-[16/9] rounded-[2rem] border border-accent/20 dark:border-white/10 p-2 bg-white dark:bg-[#0e1f35]/30 shadow-xl dark:shadow-none overflow-hidden group">
                  {/* Video Viewport */}
                  <div className="w-full h-full rounded-[1.5rem] relative overflow-hidden bg-black grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 sm:p-2">
                    <video
                      ref={video1Ref}
                      src={clip1}
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl bg-neutral-900"
                    />
                    <video
                      ref={video2Ref}
                      src={clip2}
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl bg-neutral-900"
                    />
                    <video
                      ref={video3Ref}
                      src={clip3}
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl bg-neutral-900"
                    />
                  </div>
                </div>

                {/* Quote below the frame */}
                <div className="mt-6 w-full max-w-lg bg-accent text-white px-5 py-3 rounded-2xl shadow-md border border-accent/20 text-center">
                  <span className="font-heading text-xs font-bold uppercase tracking-widest block text-white/95 text-center leading-relaxed">
                    "What I won't test on myself, I will never ask anyone else to trust."
                  </span>
                </div>
              </div>

              {/* All paragraphs */}
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
          ) : (
            /* Desktop Flow */
            <>
              {/* LEFT: Story Narrative (5.5/12 -> 4/12 width on desktop) */}
              <div className={`w-full lg:w-0 order-1 lg:order-1 text-left space-y-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSectionInView ? 'lg:flex-[4]' : 'lg:flex-[5.5]'
                }`}>
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

              {/* RIGHT: Video Player Column (6.5/12 -> 8/12 width on desktop) */}
              <div className={`w-full lg:w-0 order-2 lg:order-2 flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSectionInView ? 'lg:flex-[8]' : 'lg:flex-[6.5]'
                }`}>
                {/* Player Frame Card */}
                <div className={`relative w-full aspect-[16/9] rounded-[2rem] border border-accent/20 dark:border-white/10 p-2 bg-white dark:bg-[#0e1f35]/30 shadow-xl dark:shadow-none overflow-hidden group transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSectionInView ? 'scale-[1.03] shadow-2xl shadow-accent/5' : 'scale-100 shadow-xl'
                  }`}>

                  {/* Subtle Top-Left Badge (Hidden on Mobile) */}
                  <div className="absolute top-4 left-4 z-20 bg-navy/85 dark:bg-[#081220]/80 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest font-heading select-none pointer-events-none hidden sm:block">
                    Founder Self-Observation
                  </div>

                  {/* Video Viewport */}
                  <div className="w-full h-full rounded-[1.5rem] relative overflow-hidden bg-black grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 sm:p-2">
                    <video
                      ref={video1Ref}
                      src={clip1}
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl bg-neutral-900"
                    />
                    <video
                      ref={video2Ref}
                      src={clip2}
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl bg-neutral-900"
                    />
                    <video
                      ref={video3Ref}
                      src={clip3}
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl bg-neutral-900"
                    />
                  </div>
                </div>

                {/* Quote below the frame */}
                <div className="mt-6 w-full max-w-lg bg-accent text-white px-5 py-3 rounded-2xl shadow-md border border-accent/20 text-center">
                  <span className="font-heading text-xs font-bold uppercase tracking-widest block text-white/95 text-center leading-relaxed">
                    "What I won't test on myself, I will never ask anyone else to trust."
                  </span>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* ── PART 2.5 — THE DATA BEHIND THE CONVICTION (CGM GRAPH & FRAMEWORK) ── */}
        <div className="mb-16 md:mb-28 max-w-6xl mx-auto w-full">
          {/* Transition Chapter Headline */}
          <div className="text-left mb-8 w-full">
            <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light block">
              THE DATA BEHIND THE CONVICTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy dark:text-white tracking-tight mt-3 max-w-3xl">
              Before building a metabolic health company, I wanted to understand my own metabolism first.
            </h3>
            <p className="text-navy/60 dark:text-white/60 font-body text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl">
              Continuous glucose-monitor self-observation across multiple seasons. Same meals. Same routines. The formulation was the variable being evaluated.
            </p>
          </div>

          {/* Premium Animated CGM Graph */}
          <CGMGraph />

          {/* Premium Stat Cards for Observation Framework */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 w-full">
            <div className="bg-[#FAF9F5]/40 dark:bg-[#0e1f35]/25 border border-neutral-100 dark:border-white/5 p-6 rounded-2xl text-left">
              <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-accent block">
                CGM Tracking
              </span>
              <span className="text-sm sm:text-base font-heading font-bold text-navy dark:text-white mt-1.5 block">
                Continuous monitoring
              </span>
            </div>
            <div className="bg-[#FAF9F5]/40 dark:bg-[#0e1f35]/25 border border-neutral-100 dark:border-white/5 p-6 rounded-2xl text-left">
              <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-accent block">
                Multiple Seasons
              </span>
              <span className="text-sm sm:text-base font-heading font-bold text-navy dark:text-white mt-1.5 block">
                Repeated observations
              </span>
            </div>
            <div className="bg-[#FAF9F5]/40 dark:bg-[#0e1f35]/25 border border-neutral-100 dark:border-white/5 p-6 rounded-2xl text-left">
              <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-accent block">
                Consistent Inputs
              </span>
              <span className="text-sm sm:text-base font-heading font-bold text-navy dark:text-white mt-1.5 block">
                Comparable meal patterns
              </span>
            </div>
            <div className="bg-[#FAF9F5]/40 dark:bg-[#0e1f35]/25 border border-neutral-100 dark:border-white/5 p-6 rounded-2xl text-left">
              <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-accent block">
                Founder-Led
              </span>
              <span className="text-sm sm:text-base font-heading font-bold text-navy dark:text-white mt-1.5 block">
                Personally conducted
              </span>
            </div>
          </div>
        </div>

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
