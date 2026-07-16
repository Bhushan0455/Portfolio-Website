import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';
import healthcareEntrepreneurshipImg from '../assets/healthcare_entrepreneurship.webp';
import frame3Img from '../assets/frame3.png';
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
    <section id="building" aria-labelledby="building-title" className="pt-24 md:pt-32 pb-10 md:pb-12 bg-white dark:bg-[#081220] relative overflow-hidden select-none">
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

            {/* ─ Steps Grid (Desktop/Tablet) ─ */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10 relative z-10">
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

            {/* ─ Steps Vertical Stack (Mobile) ─ */}
            <div className="block md:hidden">
              {journeySteps.map((step, index) => (
                <div key={step.num}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm px-5 py-8 mx-4 flex flex-col items-center gap-3">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-full bg-[#EDF5F4] dark:bg-[#141E1D] flex items-center justify-center">
                        {index === 0 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D6B63] text-xl">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                        {index === 1 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D6B63] text-xl">
                            <path d="M7 20h10" />
                            <path d="M12 20v-6" />
                            <path d="M12 14c-3.5 0-6-2.5-6-6 3.5 0 6 2.5 6 6z" />
                            <path d="M12 10c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6z" />
                          </svg>
                        )}
                        {index === 2 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D6B63] text-xl">
                            <path d="M9 3h6" />
                            <path d="M10 3v7.4a2 2 0 0 1-.5 1.3L4 18.6a1 1 0 0 0 .7 1.7h14.6a1 1 0 0 0 .7-1.7l-5.5-6.9a2 2 0 0 1-.5-1.3V3" />
                            <path d="M8.5 14h7" />
                          </svg>
                        )}
                        {index === 3 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D6B63] text-xl">
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="6" />
                            <circle cx="12" cy="12" r="2" />
                          </svg>
                        )}
                      </div>

                      {/* Step Number */}
                      <span className="text-xs font-medium tracking-widest text-[#C9A96E] dark:text-[#6B5A3E]">
                        {step.num}
                      </span>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-[#1A2B4A] dark:text-[#E8E8E8] text-center">
                        {step.label}
                      </h4>

                      {/* Divider */}
                      <div className="w-8 h-[2px] bg-[#C9A96E] rounded-full" />

                      {/* Body */}
                      <p className="text-sm text-[#6B6B6B] dark:text-[#9A9A9A] text-center leading-relaxed">
                        {step.desc}
                      </p>

                      {/* Pill */}
                      {step.pill && (
                        <div className="mt-1 px-4 py-2 rounded-full border border-[#0D6B63] dark:border-[#2A8F87] text-[#0D6B63] dark:text-[#2A8F87] text-xs flex items-center gap-2">
                          {step.pill}
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Vertical dotted connector */}
                  {index < journeySteps.length - 1 && (
                    <div className="flex justify-center">
                      <div className="w-[2px] h-8 border-l-2 border-dashed border-[#0D6B63] dark:border-[#2A8F87]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── PART 4 — BEYOND BOUND: THE COMPANY (Redesigned Editorial Layout) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="mb-0 max-w-6xl mx-auto w-full"
        >
          {/* ─── Section Header ─── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-teal dark:text-teal-light mb-3">
                <span className="inline-block w-5 h-[1.5px] bg-teal dark:bg-teal-light" />
                THE COMPANY
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-bold text-navy dark:text-white tracking-tight leading-tight mt-1">
                Beyond Bound®
              </h3>
              <p className="text-navy/65 dark:text-white/60 font-body text-sm sm:text-base mt-3 leading-relaxed max-w-xl">
                A science-led wellness brand for everyday India — starting where the quiet damage starts: metabolism.
              </p>
              {/* Registered Brand Badge */}
              <div className="mt-5 inline-flex items-center gap-3 bg-[#F0FAF9] dark:bg-[#0e1f35]/60 border border-teal/15 dark:border-teal-light/15 rounded-full px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="font-heading font-bold text-xs text-navy dark:text-white">Beyond Bound®</span>
                </div>
                <span className="h-3.5 w-[1px] bg-navy/15 dark:bg-white/15" />
                <span className="font-heading font-semibold text-[10px] uppercase tracking-[0.15em] text-navy/50 dark:text-white/45">Registered Brand · India</span>
              </div>
            </div>
            {/* Amazon Link - Top Right */}
            <a
              href="https://www.amazon.in/Glycomics-Metabolic-Wellness-Capsules-Berberine/dp/B0GSSGRZYF/ref=sr_1_2?crid=NCHP7X4UD7U0&dib=eyJ2IjoiMSJ9.cJUZ3IcwZKvnKXijjZh0Veiiee3pL5c61H55ewTKHKkRnGEUzUVUdGsm201GS-D-we7_vkxk_dL5fG9Sne7a_r7mgWObZIcJcT_0QZo70d9QMA-yptbnD9p6eAL_he36nbqnL4DJVODjIWMyZG338iGi9oFmARuLKwzqxqEuDe7TgpnlGUh4pjCztPFM-2eqf0ZNp2yQFdfQjG2FbjQx1HqpnVG5opzmFqxb095XcEr1V6iHxkxNTbndlMqPOjcmmV2OlXkzY33mdj2EBhf10WlNgiK6cUhc3H1DgprjvBU.zBPMQnNJPo0dE-tTrojhf5XEMs2AoZomIOYJAJ47aKo&dib_tag=se&keywords=glycomics&qid=1784202213&sprefix=glycomics%2Caps%2C580&sr=8-2&th=1"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-teal dark:text-teal-light font-heading font-semibold text-sm hover:underline underline-offset-4 decoration-teal/30 transition-all duration-300 whitespace-nowrap mt-2 shrink-0"
            >
              View on Amazon.in
              <RiArrowRightUpLine size={16} />
            </a>
          </div>

          {/* ─── Content Grid ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

            {/* ── LEFT COLUMN: Mission, Vision, Approach ── */}
            <div className="flex flex-col gap-6">
              {/* Mission Card */}
              <div className="relative bg-[#F5FAF9] dark:bg-[#0e1f35]/40 border border-teal/10 dark:border-teal-light/10 rounded-2xl p-6 sm:p-8 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-teal dark:bg-teal-light rounded-l-2xl" />
                <span className="inline-flex items-center gap-2 text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-teal dark:text-teal-light mb-3">
                  <span className="w-2 h-2 rounded-full bg-teal dark:bg-teal-light inline-block" />
                  MISSION
                </span>
                <p className="font-heading font-bold text-lg sm:text-xl text-navy dark:text-white leading-snug">
                  Make trustworthy, science-led wellness a default — not a luxury — for people who want to stay ahead of their health rather than react to it.
                </p>
              </div>

              {/* Vision Card */}
              <div className="relative bg-[#F5FAF9] dark:bg-[#0e1f35]/40 border border-teal/10 dark:border-teal-light/10 rounded-2xl p-6 sm:p-8 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-teal dark:bg-teal-light rounded-l-2xl" />
                <span className="inline-flex items-center gap-2 text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-teal dark:text-teal-light mb-3">
                  <span className="w-2 h-2 rounded-full bg-teal dark:bg-teal-light inline-block" />
                  VISION
                </span>
                <p className="font-heading font-bold text-lg sm:text-xl text-navy dark:text-white leading-snug">
                  An India where metabolic care is normal, measured, and affordable, and where 'natural' and 'evidence-based' are no longer opposites.
                </p>
              </div>

              {/* Approach Card */}
              <div className="bg-[#EEFAF8] dark:bg-[#0a2420]/50 border border-teal/10 dark:border-teal-light/10 rounded-2xl p-6 sm:p-8">
                <h4 className="font-heading font-bold text-base sm:text-lg text-navy dark:text-white mb-5">
                  The approach: measure first, market second
                </h4>
                <ul className="space-y-3.5">
                  {[
                    'Start with the body\'s own rhythm, not a crash protocol.',
                    'Test on the founder before anyone else, with real instruments.',
                    'Say only what can be defended — careful claims, honest labels.',
                    'Publish the observations, including the unremarkable ones.'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-teal dark:text-teal-light mt-0.5 shrink-0">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-body text-sm text-navy/80 dark:text-white/75 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Image + Glycomics Card ── */}
            <div className="flex flex-col gap-6">
              {/* Founder Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] shadow-lg dark:shadow-none group">
                <img
                  src={frame3Img}
                  alt="Founder working at desk with Beyond Bound® wellness supplements"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Glycomics™ Product Card */}
              <div className="bg-white dark:bg-[#0e1f35]/50 border border-border/80 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h4 className="font-heading font-bold text-xl sm:text-2xl text-navy dark:text-white tracking-tight">
                      Glycomics™
                    </h4>
                    <p className="font-body text-xs text-navy/50 dark:text-white/45 mt-1">
                      Natural Glucose Metabolism Support · 60 capsules
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-teal/10 dark:bg-teal-light/10 border border-teal/20 dark:border-teal-light/20 text-teal dark:text-teal-light text-[10px] font-heading font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
                    Live on Amazon.in
                  </span>
                </div>

                {/* Product Description */}
                <p className="font-body text-sm text-navy/70 dark:text-white/65 leading-relaxed mb-5">
                  A thoughtfully designed wellness supplement made with nature-inspired, science-led ingredients, formulated to support metabolic health and healthy glucose balance as part of a balanced lifestyle — without extreme or aggressive approaches.
                </p>

                {/* Founder Self-Observation Callout */}
                <div className="bg-[#0a2e2a] dark:bg-[#0a2420] rounded-xl p-5 mb-5 border border-teal/15 dark:border-teal-light/10">
                  <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-teal-light/80 mb-2.5 border-b border-teal-light/15 pb-1.5">
                    FOUNDER SELF-OBSERVATION
                  </span>
                  <p className="font-body text-[13px] text-white/80 leading-relaxed">
                    In the founder's own continuous-glucose self-observation: same food, with Glycomics — a steadier post-meal pattern, no sudden drop, no hypoglycemia.
                  </p>
                </div>

                {/* Amazon CTA Button */}
                <a
                  href="https://www.amazon.in/Glycomics-Metabolic-Wellness-Capsules-Berberine/dp/B0GSSGRZYF/ref=sr_1_2?crid=NCHP7X4UD7U0&dib=eyJ2IjoiMSJ9.cJUZ3IcwZKvnKXijjZh0Veiiee3pL5c61H55ewTKHKkRnGEUzUVUdGsm201GS-D-we7_vkxk_dL5fG9Sne7a_r7mgWObZIcJcT_0QZo70d9QMA-yptbnD9p6eAL_he36nbqnL4DJVODjIWMyZG338iGi9oFmARuLKwzqxqEuDe7TgpnlGUh4pjCztPFM-2eqf0ZNp2yQFdfQjG2FbjQx1HqpnVG5opzmFqxb095XcEr1V6iHxkxNTbndlMqPOjcmmV2OlXkzY33mdj2EBhf10WlNgiK6cUhc3H1DgprjvBU.zBPMQnNJPo0dE-tTrojhf5XEMs2AoZomIOYJAJ47aKo&dib_tag=se&keywords=glycomics&qid=1784202213&sprefix=glycomics%2Caps%2C580&sr=8-2&th=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#081220] border border-border/80 dark:border-white/15 text-navy dark:text-white font-heading font-semibold text-sm rounded-lg hover:border-teal/30 dark:hover:border-teal-light/30 hover:shadow-md transition-all duration-300"
                >
                  View on Amazon.in
                  <RiArrowRightUpLine size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* ─── Disclaimer ─── */}
          <p className="font-body text-[11px] text-navy/40 dark:text-white/30 leading-relaxed mt-8 max-w-5xl">
            Glycomics™ is a wellness supplement intended to support metabolic health as part of a balanced lifestyle. It is not intended to diagnose, treat, cure, or prevent any disease. Self-observation reflects one individual's experience and is not a clinical claim.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
