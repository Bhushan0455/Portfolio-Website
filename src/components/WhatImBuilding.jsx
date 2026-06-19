import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RiArrowRightUpLine, RiAmazonLine } from 'react-icons/ri';
import healthcareEntrepreneurshipImg from '../assets/healthcare_entrepreneurship.jpg';
import beyondboundImg from '../assets/beyondbound.jpg';
import beyondboundLogo from '../assets/beyondbound_logo.png';

export default function WhatImBuilding() {
  const cgmContainerRef = useRef(null);
  
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
      desc: 'I saw a sharp rise in metabolic disorders across India, coupled with deep consumer confusion trying to find trustworthy preventive wellness.',
      cellClass: 'bg-[#F8F6F1] dark:bg-[#0e1f35]',
      titleClass: 'text-navy dark:text-white',
      descClass: 'text-navy/70 dark:text-white/70'
    },
    {
      num: '02',
      label: 'What I Learned',
      desc: 'Consumers do not need more products. They need clinical validation, transparency, and products that prove their efficacy on the founder first.',
      cellClass: 'bg-[#F5F0E8] dark:bg-[#152942]',
      titleClass: 'text-navy dark:text-white',
      descClass: 'text-navy/70 dark:text-white/70'
    },
    {
      num: '03',
      label: 'What I\'m Building',
      desc: 'Beyond Bound® is a proactive consumer health company focused on metabolic wellness, combining natural ingredients with rigorous scientific validation.',
      cellClass: 'bg-[#EDF5F4] dark:bg-[#0b2c2a]',
      titleClass: 'text-navy dark:text-white',
      descClass: 'text-navy/70 dark:text-white/70'
    },
    {
      num: '04',
      label: 'Where We\'re Going',
      desc: 'Building India\'s most trusted preventive health ecosystem—making metabolic wellness verifiable, transparent, and accessible.',
      cellClass: 'bg-[#0D4A47] dark:bg-[#0D4A47]',
      titleClass: 'text-white',
      descClass: 'text-white/85'
    }
  ];

  const focusAreas = [
    'Preventive Healthcare',
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
            My thesis for metabolic wellness and preventive healthcare.
          </p>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-6" />
        </div>

        {/* ── PART 1 — WHY I STARTED ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28"
        >
          {/* LEFT: Photo */}
          <div className="lg:col-span-5">
            <motion.div 
              className="relative overflow-hidden rounded-[2rem] aspect-[4/3] sm:aspect-[16/11] lg:aspect-square shadow-xl dark:shadow-none group border border-accent/10 dark:border-white/10"
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
                I started Beyond Bound® with one observation: India had no brand built exclusively for metabolism. Not one.
              </p>
              <p>
                The market had hundreds of wellness products making broad health promises. None of them were dedicated, specific, or honest enough to be verified. Consumers weren't confused because they had too few options. They were confused because nothing they found gave them a reason to trust it.
              </p>
              <p className="font-semibold text-navy dark:text-white">
                That absence — a dedicated metabolism brand with nothing to hide — is what I built Beyond Bound® to fill.
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
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28"
        >
          {/* LEFT: Story Narrative (5/12 width) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light block">
              First-Hand Efficacy
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy dark:text-white tracking-tight leading-snug">
              Proving Efficacy on the Founder First
            </h3>

            <div className="space-y-4 font-body text-navy/80 dark:text-white/80 text-sm sm:text-base leading-relaxed">
              <p>
                To build a health brand that people can trust with their lives, I had to start with myself. I strapped a continuous glucose monitor (CGM) to my own arm for months. I needed to witness the real-time metabolic impact of ingredients, diet, and lifestyle choices first-hand.
              </p>
              <p>
                It wasn't about relying on standard marketing literature; it was about generating direct, objective proof. This empirical baseline is what drove the formulation of Beyond Bound® Glycomics. If we cannot measure and prove the efficacy of our wellness solutions on ourselves, we have no right to offer them to anyone else.
              </p>
            </div>
          </div>

          {/* RIGHT: Continuous Glucose Monitor Photo (7/12 width) */}
          <div className="lg:col-span-7 relative w-full">
            <motion.div 
              className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] shadow-xl dark:shadow-none border border-accent/10 dark:border-white/10"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img 
                style={{ y: yParallax }}
                src={beyondboundImg} 
                alt="Priyanshu Chauhan showing Continuous Glucose Monitor (CGM) on his arm" 
                className="absolute -top-[10%] w-full h-[120%] object-cover object-center brightness-[0.95] contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
            
            {/* Small pull quote overlapping photo block */}
            <div className="absolute -bottom-6 -right-2 md:bottom-6 md:right-6 bg-accent text-white px-5 py-3 rounded-2xl shadow-lg border border-accent/20 z-20">
              <span className="font-heading text-xs font-bold uppercase tracking-widest block text-white/95">
                "The data is the product."
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── PART 3 — THE JOURNEY TO BEYOND BOUND ── */}
        <div className="mb-28 max-w-4xl mx-auto">
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
                className={`flex flex-col text-left items-start justify-start ${step.cellClass}`}
                style={{ padding: '48px' }}
              >
                {/* Step number in 48px muted tan top-left */}
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
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── PART 4 — BEYOND BOUND TODAY ── */}
        <div className="mb-28 max-w-4xl mx-auto">
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

            {/* Amazon CTA */}
            <a 
              href="https://www.amazon.in/Beyond-Bound-Glycomics-Metabolism-Capsules/dp/B0GFP3VFPT"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-[#0e1f35]/50 border border-accent/40 hover:border-accent hover:bg-accent/5 dark:hover:bg-white/5 text-navy dark:text-white font-heading font-semibold rounded-full shadow-sm transition-all duration-300 text-xs tracking-widest uppercase cursor-pointer"
            >
              <RiAmazonLine size={16} className="text-[#FF9900]" />
              <span>View on Amazon</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
