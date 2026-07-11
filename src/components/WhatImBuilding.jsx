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
      desc: 'Metabolic disorders are rising rapidly in India. People are overwhelmed with conflicting advice and information overload, but lack clarity and trust.',
      pill: 'Clarity creates action.'
    },
    {
      num: '02',
      label: 'What I Learned',
      desc: 'From agriculture to healthcare, one truth stayed with me — trust is earned, not sold. True impact comes from solving real problems at the root.',
      pill: 'Trust is the foundation.'
    },
    {
      num: '03',
      label: 'What I\'m Building',
      desc: 'Beyond Bound is my effort to simplify metabolic health with evidence-backed solutions that are honest, transparent, and genuinely effective.',
      pill: 'Wellness, done right.'
    },
    {
      num: '04',
      label: 'Where We\'re Going',
      desc: 'Building a trusted name in metabolic wellness — where prevention comes first and every choice today leads to a healthier tomorrow.',
      pill: 'The future starts now.'
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

        {/* ── PART 3 — FROM OBSERVATION TO IMPACT ── */}
        <div className="mb-16 md:mb-28 max-w-6xl mx-auto w-full">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-bold text-navy dark:text-white tracking-tight leading-tight">
              From <span className="text-teal dark:text-teal-light">observation</span> to impact.
            </h3>
            <p className="text-navy/55 dark:text-white/55 font-body text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              My journey is built on four simple beliefs that shape everything I'm building.
            </p>
          </motion.div>

          {/* Timeline + Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative"
          >
            {/* ─ Segmented gold dashed lines BETWEEN nodes only (desktop) ─ */}
            {/* Line segment 1: between node 1 and node 2 */}
            <div
              className="hidden lg:block absolute top-[52px] h-0 z-0"
              style={{
                left: 'calc(12.5% + 75px)',
                width: 'calc(25% - 150px)',
                borderTop: '1.5px dashed rgba(212, 176, 122, 0.40)'
              }}
            />
            {/* Line segment 2: between node 2 and node 3 */}
            <div
              className="hidden lg:block absolute top-[52px] h-0 z-0"
              style={{
                left: 'calc(37.5% + 75px)',
                width: 'calc(25% - 150px)',
                borderTop: '1.5px dashed rgba(212, 176, 122, 0.40)'
              }}
            />
            {/* Line segment 3: between node 3 and node 4 */}
            <div
              className="hidden lg:block absolute top-[52px] h-0 z-0"
              style={{
                left: 'calc(62.5% + 75px)',
                width: 'calc(25% - 150px)',
                borderTop: '1.5px dashed rgba(212, 176, 122, 0.40)'
              }}
            />

            {/* ─ Gold connector dots at midpoints between nodes (desktop) ─ */}
            {[25, 50, 75].map((pos) => (
              <div
                key={pos}
                className="hidden lg:block absolute z-[1]"
                style={{
                  left: `${pos}%`,
                  top: '52px',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div
                  className="w-[9px] h-[9px] rounded-full"
                  style={{
                    backgroundColor: '#D4B07A',
                    boxShadow: '0 2px 6px rgba(212, 176, 122, 0.3)'
                  }}
                />
              </div>
            ))}

            {/* ─ Steps Grid ─ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10 relative z-10">
              {journeySteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 35 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        delay: idx * 0.12,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }
                  }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Concentric Circle Node */}
                  <div className="relative mb-10 w-[104px] h-[104px] flex items-center justify-center">
                    {/* Outermost ring */}
                    <div className="absolute w-[104px] h-[104px] rounded-full border border-teal/8 dark:border-teal-light/8 group-hover:border-teal/15 dark:group-hover:border-teal-light/15 transition-all duration-500" />
                    {/* Middle ring */}
                    <div className="absolute w-[92px] h-[92px] rounded-full border border-teal/12 dark:border-teal-light/12 bg-teal/[0.02] dark:bg-teal-light/[0.02] group-hover:border-teal/20 dark:group-hover:border-teal-light/18 transition-all duration-500" />
                    {/* Inner icon circle */}
                    <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-sage/80 to-teal/10 dark:from-[#0e1f35]/80 dark:to-teal-light/10 border border-teal/15 dark:border-teal-light/15 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:shadow-teal/10 transition-all duration-500">
                      {/* Eye icon — What I Observed */}
                      {idx === 0 && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                      {/* Plant/Sprout icon — What I Learned */}
                      {idx === 1 && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                          <path d="M7 20h10" />
                          <path d="M12 20v-6" />
                          <path d="M12 14c-3.5 0-6-2.5-6-6 3.5 0 6 2.5 6 6z" />
                          <path d="M12 10c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6z" />
                        </svg>
                      )}
                      {/* Laboratory Flask icon — What I'm Building */}
                      {idx === 2 && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                          <path d="M9 3h6" />
                          <path d="M10 3v7.4a2 2 0 0 1-.5 1.3L4 18.6a1 1 0 0 0 .7 1.7h14.6a1 1 0 0 0 .7-1.7l-5.5-6.9a2 2 0 0 1-.5-1.3V3" />
                          <path d="M8.5 14h7" />
                        </svg>
                      )}
                      {/* Target icon — Where We're Going */}
                      {idx === 3 && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Step Number */}
                  <span
                    className="font-heading font-bold leading-none select-none tracking-tight mb-2 text-accent/70 dark:text-accent-light/70"
                    style={{ fontSize: '14px' }}
                  >
                    {step.num}
                  </span>

                  {/* Title */}
                  <h4 className="font-heading font-bold text-navy dark:text-white tracking-tight text-base sm:text-lg mb-3">
                    {step.label}
                  </h4>

                  {/* Thin accent divider */}
                  <div className="w-8 h-[2px] bg-accent/30 dark:bg-accent-light/30 rounded-full mb-4 group-hover:w-12 transition-all duration-500" />

                  {/* Description */}
                  <p className="font-body text-navy/60 dark:text-white/55 text-[13px] leading-relaxed max-w-[280px] mx-auto mb-5">
                    {step.desc}
                  </p>

                  {/* ── Premium Bottom Pill (micro-badge) ── */}
                  {step.pill && (
                    <div className="mt-auto inline-flex items-center rounded-full transition-all duration-300 group-hover:shadow-md bg-[#F7F7F5] dark:bg-[#0e1f35]/50 border border-[rgba(15,139,141,0.08)] dark:border-teal-light/10 shadow-[0_4px_14px_rgba(0,0,0,0.04)] dark:shadow-none h-[44px] gap-[10px] pl-[10px] pr-[20px]">
                      {/* Circular icon badge */}
                      <div className="flex items-center justify-center flex-shrink-0 rounded-full w-6 h-6 border-[1.5px] border-teal dark:border-teal-light bg-white dark:bg-[#081220]">
                        {/* CircleCheck — Clarity */}
                        {idx === 0 && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        )}
                        {/* ShieldCheck — Trust */}
                        {idx === 1 && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 12 11 14 15 10" />
                          </svg>
                        )}
                        {/* Heart — Wellness */}
                        {idx === 2 && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        )}
                        {/* Sparkle — Future */}
                        {idx === 3 && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        )}
                      </div>
                      {/* Pill text */}
                      <span className="font-heading text-[14px] font-semibold text-teal dark:text-teal-light leading-none whitespace-nowrap">
                        {step.pill}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
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
