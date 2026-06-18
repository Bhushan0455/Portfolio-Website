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

  const milestones = [
    'Somaiya MBA — Healthcare Management',
    'B2B Sales & Pharma Research Experience',
    'Founder of Beyond Bound®'
  ];

  const journeySteps = [
    {
      num: '01',
      label: 'What I Observed',
      desc: 'I saw a sharp rise in metabolic disorders and prediabetes across India, coupled with deep consumer confusion trying to find trustworthy preventive wellness.'
    },
    {
      num: '02',
      label: 'What I Learned',
      desc: 'Consumers do not need more products. They need clinical validation, transparency, and products that prove their efficacy on the founder first.'
    },
    {
      num: '03',
      label: 'What I\'m Building',
      desc: 'Beyond Bound® is a proactive consumer health company focused on prediabetes prevention, combining Ayurvedic principles with rigorous scientific validation.'
    },
    {
      num: '04',
      label: 'Where We\'re Going',
      desc: 'Building India\'s most trusted preventive health ecosystem—making metabolic wellness verifiable, transparent, and accessible.'
    }
  ];

  const focusAreas = [
    'Prediabetes Prevention',
    'Metabolic Wellness',
    'Science-backed Ayurveda',
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
    <section id="building" className="py-24 md:py-32 bg-white relative overflow-hidden select-none">
      {/* Subtle background ambient decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal">
            My Focus
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-navy mt-3 tracking-tight">
            What I'm Building
          </h2>
          <p className="text-navy/60 font-body text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
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
              className="relative overflow-hidden rounded-[2rem] aspect-[4/3] sm:aspect-[16/11] lg:aspect-square shadow-xl group border border-accent/10"
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
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy tracking-tight">
              Why I Started
            </h3>
            <div className="space-y-4 font-body text-navy/80 text-sm sm:text-base leading-relaxed">
              <p>
                I started Beyond Bound® with a simple observation: while lifestyle diseases were rising rapidly, preventive healthcare remained fragmented, confusing, and difficult to trust.
              </p>
              <p>
                My experience across corporate sales and pharmaceutical market research showed me that consumers do not need more products. They need clinical validation, transparency, and genuine proof.
              </p>
              <p className="font-semibold text-navy">
                That is the insight that drove me to build Beyond Bound®.
              </p>
            </div>

            {/* Milestone Chips */}
            <div className="pt-4">
              <span className="text-[10px] font-heading font-bold text-navy/40 uppercase tracking-widest block mb-3">
                My Experience Scaffolding
              </span>
              <div className="flex flex-wrap gap-2.5">
                {milestones.map((milestone, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sage/40 border border-teal/10 rounded-full text-xs font-heading font-medium text-teal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    {milestone}
                  </span>
                ))}
              </div>
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
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal block">
              First-Hand Efficacy
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy tracking-tight leading-snug">
              Proving Efficacy on the Founder First
            </h3>

            <div className="space-y-4 font-body text-navy/80 text-sm sm:text-base leading-relaxed">
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
              className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] shadow-xl border border-accent/10"
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
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy tracking-tight">
              The Journey to Beyond Bound®
            </h3>
          </div>

          {/* Timeline Wrapper */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative pl-8 sm:pl-12 border-l border-teal/15 space-y-12 py-4 text-left"
          >
            {journeySteps.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -25 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="relative"
              >
                {/* Timeline Circle Node */}
                <div className="absolute -left-[37px] sm:-left-[53px] top-2.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-teal flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                </div>
                
                {/* Flex layout for serif number & step description */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  {/* Big elegant serif number */}
                  <span className="font-serif text-5xl font-light text-accent/80 leading-none select-none tracking-tighter sm:w-16">
                    {step.num}
                  </span>
                  
                  {/* Step Title & Details */}
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-lg text-navy tracking-tight">
                      {step.label}
                    </h4>
                    <p className="font-body text-navy/70 text-sm sm:text-base leading-relaxed max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── PART 4 — BEYOND BOUND TODAY ── */}
        <div className="mb-28 max-w-4xl mx-auto">
          <div className="bg-[#FAF9F5] border border-accent/20 rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
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
            <div className="font-heading font-extrabold text-2xl sm:text-3xl tracking-[0.2em] text-navy uppercase select-none">
              BEYOND <span className="text-teal">BOUND®</span>
            </div>

            {/* Tagline */}
            <h4 className="font-serif italic text-lg sm:text-xl text-navy/90 mt-4 leading-relaxed max-w-lg mx-auto">
              "Wellness that survives measurement."
            </h4>

            {/* Accent divider line */}
            <div className="h-[1px] w-20 bg-accent/35 mx-auto my-6" />

            {/* Focus area pills */}
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-2xl mx-auto">
              {focusAreas.map((area, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 bg-white border border-border/80 rounded-full text-xs font-heading font-semibold text-navy/85 hover:border-teal/20 transition-all duration-300 shadow-sm"
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
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy tracking-tight">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-accent/40 hover:border-accent hover:bg-accent/5 text-navy font-heading font-semibold rounded-full shadow-sm transition-all duration-300 text-xs tracking-widest uppercase cursor-pointer"
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
