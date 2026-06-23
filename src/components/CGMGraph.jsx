import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiCalendarLine, 
  RiRestaurantLine, 
  RiFlaskLine, 
  RiLineChartLine, 
  RiCheckboxCircleFill, 
  RiInformationLine,
  RiCloseLine
} from 'react-icons/ri';

export default function CGMGraph() {
  // ── 1. SPOTLIGHT CURSOR INTERACTION ──
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }
  };

  // ── 2. VIEWPORT ENTRANCE & COUNT-UP ANIMATIONS ──
  const [isCardInView, setIsCardInView] = useState(false);
  const [countSeasons, setCountSeasons] = useState(0);
  const [countVariable, setCountVariable] = useState(0);

  useEffect(() => {
    if (isCardInView) {
      let start = 0;
      const duration = 1500; // ms
      const startTime = performance.now();
      
      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function outQuad
        const easeProgress = progress * (2 - progress);
        
        setCountSeasons(Math.round(easeProgress * 2));
        setCountVariable(Math.round(easeProgress * 1));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCountSeasons(2);
          setCountVariable(1);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isCardInView]);

  // ── 3. CURVE LEGEND HIGHLIGHTING ──
  const [hoveredLegend, setHoveredLegend] = useState(null); // 'conventional' | 'founder' | null

  // ── 4. INTERACTIVE DATA POINTS & TOOLTIPS ──
  const [activeTooltip, setActiveTooltip] = useState(null); // 'meal' | 'peak' | 'observed' | 'baseline' | null
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tooltipsData = {
    meal: {
      title: "Meal Consumed",
      desc: "Identical post-meal starting point. Standard food inputs and timing protocols were used across all self-observation seasons to keep inputs constant.",
      time: "0.2 hours",
      glucose: "80 mg/dL"
    },
    peak: {
      title: "Peak Response (Conventional)",
      desc: "Conventional pattern exhibits a rapid, steep glucose rise, peaking at ~170 mg/dL with a delayed recovery phase.",
      time: "1.3 hours",
      glucose: "170 mg/dL"
    },
    observed: {
      title: "Observed Response",
      desc: "With the observed formulation, the glucose curve remains significantly smoothed, exhibiting a much lower peak (~115 mg/dL) and rapid stabilization.",
      time: "1.0 hours",
      glucose: "115 mg/dL"
    },
    baseline: {
      title: "Return to Baseline",
      desc: "Both curves converge smoothly back to the stable pre-meal state. The observed response pattern recovers faster and stays highly stable without rebound drops.",
      time: "2.8 hours",
      glucose: "85 mg/dL"
    }
  };

  // ── 5. PROGRESSIVE STORYTELLING STEPS ──
  const [activeStep, setActiveStep] = useState(null); // null | 0 | 1 | 2 | 3 | 4
  const steps = [
    { label: "Meal Marker", desc: "Starting point comparison" },
    { label: "Glucose Rise", desc: "Initial post-meal elevation" },
    { label: "Conventional Peak", desc: "Highest glucose spike" },
    { label: "Observed Response", desc: "Observed formulation response" },
    { label: "Baseline Recovery", desc: "Stabilization convergence" }
  ];

  // ── 6. DYNAMIC GRAPH FOCUS MAPPED TO INSIGHT HOVERS ──
  const [hoveredInsight, setHoveredInsight] = useState(null); // 'peak' | 'curve' | 'drop' | 'energy' | null

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const curveVariants = {
    hidden: { pathLength: 0 },
    visible: (customDelay) => ({
      pathLength: 1,
      transition: { 
        duration: 1.6, 
        ease: [0.16, 1, 0.3, 1],
        delay: customDelay
      }
    })
  };

  const annotationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 2.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // SVG Bezier Curve Path Strings
  const conventionalPath = "M 70,270 C 100,270 120,265 140,250 C 180,210 230,100 275,85 C 320,70 360,140 400,175 C 440,210 500,265 550,270";
  const observerPath = "M 70,270 C 100,270 120,262 140,255 C 170,240 200,205 230,200 C 270,195 320,205 360,210 C 400,215 440,235 480,250 C 510,260 530,252 550,250";

  // Determine opacities based on current interaction states
  const getCurveStyle = (type) => {
    let opacity = 1;
    let strokeWidth = type === 'founder' ? 3.5 : 2.5;

    // 1. Legend Hover
    if (hoveredLegend) {
      if (hoveredLegend !== type) {
        opacity = 0.3;
      } else {
        strokeWidth = type === 'founder' ? 4.5 : 3.5;
      }
    }

    // 2. Storytelling steps focus
    if (activeStep !== null) {
      if (activeStep === 0 && type !== 'conventional' && type !== 'founder') opacity = 0.2;
      if (activeStep === 2 && type !== 'conventional') opacity = 0.25;
      if (activeStep === 3 && type !== 'founder') opacity = 0.25;
    }

    // 3. Dynamic Insights Hover
    if (hoveredInsight) {
      if (hoveredInsight === 'peak' && type !== 'conventional') opacity = 0.3;
      if (hoveredInsight === 'curve' && type !== 'founder') opacity = 0.3;
      if (hoveredInsight === 'drop' && type !== 'founder') opacity = 0.4;
    }

    return { opacity, strokeWidth, transition: 'all 0.4s ease' };
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={cardVariants}
      onViewportEnter={() => setIsCardInView(true)}
      className="w-full text-left"
    >
      {/* ── CARD WRAPPER WITH SPOTLIGHT MOUSE INTERACTION ── */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveringCard(true)}
        onMouseLeave={() => {
          setIsHoveringCard(false);
          setActiveTooltip(null);
        }}
        className="bg-white dark:bg-[#0e1f35]/30 border border-neutral-100 dark:border-white/10 rounded-[2rem] p-6 sm:p-10 shadow-sm relative overflow-hidden group/card"
      >
        {/* Apple-style Cursor Spotlight Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 -z-10"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(20, 184, 166, 0.04), transparent 80%)`
          }}
        />

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-accent block">
              Founder Self-Observation
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-navy dark:text-white tracking-tight leading-none">
              Same meal. Different response.
            </h3>
            <p className="text-navy/50 dark:text-white/50 font-body text-xs">
              Observed using continuous glucose monitoring (CGM).
            </p>
          </div>

          {/* Interactive Legend (Triggers curve highlighting on hover) */}
          <div className="flex flex-wrap gap-5 items-center">
            <div 
              onMouseEnter={() => setHoveredLegend('conventional')}
              onMouseLeave={() => setHoveredLegend(null)}
              className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors duration-200"
            >
              <span className="w-5 h-[2px] bg-neutral-300 dark:bg-neutral-600 block rounded-full" />
              <span className="text-[11px] font-heading font-semibold text-navy/60 dark:text-white/60">Conventional Pattern</span>
            </div>
            <div 
              onMouseEnter={() => setHoveredLegend('founder')}
              onMouseLeave={() => setHoveredLegend(null)}
              className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors duration-200"
            >
              <span className="w-5 h-[3px] bg-teal dark:bg-teal-light block rounded-full" />
              <span className="text-[11px] font-heading font-semibold text-navy/80 dark:text-white/80">Founder Observation</span>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT: SVG Chart Block (8 columns) */}
          <div className="lg:col-span-8 w-full flex flex-col justify-between relative">
            <div className="w-full h-auto p-1 bg-neutral-50/10 dark:bg-transparent rounded-2xl relative">
              <svg viewBox="0 0 600 350" className="w-full h-auto overflow-visible select-none">
                
                {/* Horizontal Guide Lines */}
                <line x1="60" y1="140" x2="560" y2="140" className="stroke-neutral-100 dark:stroke-neutral-800" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="60" y1="210" x2="560" y2="210" className="stroke-neutral-100 dark:stroke-neutral-800" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="60" y1="280" x2="560" y2="280" className="stroke-neutral-200 dark:stroke-neutral-700/60" strokeWidth="1" />

                {/* ── DYNAMIC INSIGHT FOCUS HIGHLIGHTS ── */}
                <AnimatePresence>
                  {hoveredInsight === 'peak' && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <circle cx="275" cy="85" r="30" className="fill-none stroke-neutral-300/40 dark:stroke-neutral-700/40" strokeWidth="1" strokeDasharray="3,3" />
                      <circle cx="230" cy="200" r="30" className="fill-none stroke-teal/35 dark:stroke-teal-light/35" strokeWidth="1" strokeDasharray="3,3" />
                    </motion.g>
                  )}
                  {hoveredInsight === 'curve' && (
                    <motion.path
                      d="M 140,255 C 170,240 200,205 230,200"
                      fill="none"
                      className="stroke-teal dark:stroke-teal-light blur-[4px] opacity-80"
                      strokeWidth="10"
                      strokeLinecap="round"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  {hoveredInsight === 'drop' && (
                    <motion.path
                      d="M 230,200 C 270,195 320,205 360,210 C 400,215 440,235 480,250"
                      fill="none"
                      className="stroke-teal dark:stroke-teal-light blur-[5px]"
                      strokeWidth="12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* ── PROGRESSIVE STORYTELLING FOCUS SHADOWS ── */}
                <AnimatePresence>
                  {activeStep !== null && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Step 0: Meal Highlight */}
                      {activeStep === 0 && (
                        <circle cx="70" cy="270" r="22" className="fill-teal/[0.03] dark:fill-teal-light/[0.02] stroke-teal/20 dark:stroke-teal-light/20" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                      {/* Step 1: Rise Highlight */}
                      {activeStep === 1 && (
                        <rect x="70" y="180" width="130" height="110" rx="12" className="fill-none stroke-teal/15 dark:stroke-teal-light/15" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                      {/* Step 2: Conventional Peak Highlight */}
                      {activeStep === 2 && (
                        <circle cx="275" cy="85" r="25" className="fill-none stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                      {/* Step 3: Observed Response Highlight */}
                      {activeStep === 3 && (
                        <circle cx="230" cy="200" r="25" className="fill-none stroke-teal dark:stroke-teal-light" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                      {/* Step 4: Baseline Recovery Highlight */}
                      {activeStep === 4 && (
                        <rect x="440" y="220" width="125" height="70" rx="12" className="fill-none stroke-teal/15 dark:stroke-teal-light/15" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Fills Under Curves */}
                <path
                  d={`${conventionalPath} L 550,280 L 70,280 Z`}
                  className="fill-neutral-100/30 dark:fill-neutral-800/5 pointer-events-none"
                  style={{ opacity: hoveredLegend === 'founder' ? 0.05 : 1, transition: 'all 0.4s' }}
                />
                <path
                  d={`${observerPath} L 550,280 L 70,280 Z`}
                  className="fill-teal/[0.02] dark:fill-teal-light/[0.01] pointer-events-none"
                  style={{ opacity: hoveredLegend === 'conventional' ? 0.05 : 1, transition: 'all 0.4s' }}
                />

                {/* Dark Mode Glow paths */}
                <path
                  d={conventionalPath}
                  fill="none"
                  className="hidden dark:block stroke-neutral-400/[0.12] blur-[8px] pointer-events-none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  style={{ opacity: getCurveStyle('conventional').opacity }}
                />
                <path
                  d={observerPath}
                  fill="none"
                  className="hidden dark:block stroke-teal-light/25 blur-[10px] pointer-events-none"
                  strokeWidth="12"
                  strokeLinecap="round"
                  style={{ opacity: getCurveStyle('founder').opacity }}
                />

                {/* SVG Curve Paths (Sequential entrance draw once) */}
                <motion.path
                  d={conventionalPath}
                  fill="none"
                  className="stroke-neutral-300 dark:stroke-neutral-600"
                  strokeLinecap="round"
                  custom={0.2} // delay
                  variants={curveVariants}
                  style={getCurveStyle('conventional')}
                />
                <motion.path
                  d={observerPath}
                  fill="none"
                  className="stroke-teal dark:stroke-teal-light"
                  strokeLinecap="round"
                  custom={1.2} // delay
                  variants={curveVariants}
                  style={getCurveStyle('founder')}
                />

                {/* ── Horizontal Stepper Connector Line (X-Axis fallback) ── */}
                <g transform="translate(0, 310)">
                  <line x1="70" y1="0" x2="550" y2="0" className="stroke-neutral-200 dark:stroke-neutral-800" strokeWidth="1" />
                  
                  {/* Stepper Steps (clickable on SVG too) */}
                  {[70, 190, 310, 430, 550].map((cx, idx) => (
                    <circle 
                      key={idx} 
                      cx={cx} 
                      cy="0" 
                      r="4" 
                      onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                      className={`cursor-pointer transition-all duration-300 ${
                        activeStep === idx 
                          ? 'fill-teal dark:fill-teal-light r-5 stroke-teal/20 stroke-[4px]' 
                          : 'fill-neutral-300 dark:fill-neutral-700 hover:fill-neutral-400 dark:hover:fill-neutral-500'
                      }`} 
                    />
                  ))}
                  <text x="70" y="18" textAnchor="middle" className={`font-heading text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${activeStep === 0 ? 'fill-teal dark:fill-teal-light' : 'fill-neutral-400 dark:fill-neutral-500'}`}>Meal</text>
                  <text x="190" y="18" textAnchor="middle" className={`font-heading text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${activeStep === 1 ? 'fill-teal dark:fill-teal-light' : 'fill-neutral-400 dark:fill-neutral-500'}`}>Rise</text>
                  <text x="310" y="18" textAnchor="middle" className={`font-heading text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${activeStep === 2 ? 'fill-teal dark:fill-teal-light' : 'fill-neutral-400 dark:fill-neutral-500'}`}>Peak</text>
                  <text x="430" y="18" textAnchor="middle" className={`font-heading text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${activeStep === 3 ? 'fill-teal dark:fill-teal-light' : 'fill-neutral-400 dark:fill-neutral-500'}`}>Recovery</text>
                  <text x="550" y="18" textAnchor="middle" className={`font-heading text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${activeStep === 4 ? 'fill-teal dark:fill-teal-light' : 'fill-neutral-400 dark:fill-neutral-500'}`}>Baseline</text>
                </g>

                {/* ── INTERACTIVE HOVER MARKERS ── */}
                {/* 1. Meal Consumed */}
                <motion.g variants={annotationVariants}>
                  {/* Independent pulse ring */}
                  <motion.circle
                    cx="70"
                    cy="270"
                    r={4.5}
                    className="stroke-neutral-400/30 dark:stroke-neutral-500/30 fill-none pointer-events-none"
                    strokeWidth="1"
                    animate={{
                      scale: [1, 2.8],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    style={{
                      transformOrigin: "70px 270px",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                  />
                  {/* Visible point */}
                  <motion.circle
                    cx="70"
                    cy="270"
                    r="4.5"
                    className="fill-neutral-400 dark:fill-neutral-500 stroke-white dark:stroke-[#07162c] pointer-events-none"
                    strokeWidth="1.5"
                    animate={{
                      scale: activeTooltip === 'meal' ? 1.15 : 1
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      transformOrigin: "70px 270px",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                  />
                  {/* Invisible hotspot */}
                  <circle
                    cx="70"
                    cy="270"
                    r="16"
                    className="fill-transparent cursor-pointer"
                    onMouseEnter={() => !isMobile && setActiveTooltip('meal')}
                    onMouseLeave={() => !isMobile && setActiveTooltip(null)}
                    onClick={() => isMobile && setActiveTooltip('meal')}
                  />
                </motion.g>

                {/* 2. Typical Spike */}
                <motion.g variants={annotationVariants}>
                  {/* Independent pulse ring */}
                  <motion.circle
                    cx="275"
                    cy="85"
                    r={4.5}
                    className="stroke-neutral-400/30 dark:stroke-neutral-500/30 fill-none pointer-events-none"
                    strokeWidth="1"
                    animate={{
                      scale: [1, 2.8],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.5
                    }}
                    style={{
                      transformOrigin: "275px 85px",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                  />
                  {/* Visible point */}
                  <motion.circle
                    cx="275"
                    cy="85"
                    r="4.5"
                    className="fill-neutral-400 dark:fill-neutral-500 stroke-white dark:stroke-[#07162c] pointer-events-none"
                    strokeWidth="1.5"
                    animate={{
                      scale: activeTooltip === 'peak' ? 1.15 : 1
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      transformOrigin: "275px 85px",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                  />
                  {/* Invisible hotspot */}
                  <circle
                    cx="275"
                    cy="85"
                    r="16"
                    className="fill-transparent cursor-pointer"
                    onMouseEnter={() => !isMobile && setActiveTooltip('peak')}
                    onMouseLeave={() => !isMobile && setActiveTooltip(null)}
                    onClick={() => isMobile && setActiveTooltip('peak')}
                  />
                </motion.g>

                {/* 3. Observed Response */}
                <motion.g variants={annotationVariants}>
                  {/* Independent pulse ring */}
                  <motion.circle
                    cx="230"
                    cy="200"
                    r={4.5}
                    className="stroke-teal/40 dark:stroke-teal-light/45 fill-none pointer-events-none"
                    strokeWidth="1"
                    animate={{
                      scale: [1, 2.8],
                      opacity: [0.8, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.2
                    }}
                    style={{
                      transformOrigin: "230px 200px",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                  />
                  {/* Visible point */}
                  <motion.circle
                    cx="230"
                    cy="200"
                    r="4.5"
                    className="fill-teal dark:fill-teal-light stroke-white dark:stroke-[#07162c] pointer-events-none"
                    strokeWidth="1.5"
                    animate={{
                      scale: activeTooltip === 'observed' ? 1.15 : 1
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      transformOrigin: "230px 200px",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                  />
                  {/* Invisible hotspot */}
                  <circle
                    cx="230"
                    cy="200"
                    r="16"
                    className="fill-transparent cursor-pointer"
                    onMouseEnter={() => !isMobile && setActiveTooltip('observed')}
                    onMouseLeave={() => !isMobile && setActiveTooltip(null)}
                    onClick={() => isMobile && setActiveTooltip('observed')}
                  />
                </motion.g>

                {/* 4. Return to Baseline */}
                <motion.g variants={annotationVariants}>
                  {/* Independent pulse ring */}
                  <motion.circle
                    cx="550"
                    cy="250"
                    r={4.5}
                    className="stroke-teal/40 dark:stroke-teal-light/45 fill-none pointer-events-none"
                    strokeWidth="1"
                    animate={{
                      scale: [1, 2.8],
                      opacity: [0.8, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.7
                    }}
                    style={{
                      transformOrigin: "550px 250px",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                  />
                  {/* Visible point */}
                  <motion.circle
                    cx="550"
                    cy="250"
                    r="4.5"
                    className="fill-teal dark:fill-teal-light stroke-white dark:stroke-[#07162c] pointer-events-none"
                    strokeWidth="1.5"
                    animate={{
                      scale: activeTooltip === 'baseline' ? 1.15 : 1
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      transformOrigin: "550px 250px",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                  />
                  {/* Invisible hotspot */}
                  <circle
                    cx="550"
                    cy="250"
                    r="16"
                    className="fill-transparent cursor-pointer"
                    onMouseEnter={() => !isMobile && setActiveTooltip('baseline')}
                    onMouseLeave={() => !isMobile && setActiveTooltip(null)}
                    onClick={() => isMobile && setActiveTooltip('baseline')}
                  />
                </motion.g>

              </svg>
            </div>

            {/* Desktop Tooltip overlays (glassmorphism) */}
            <AnimatePresence>
              {!isMobile && activeTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute z-20 bg-white/95 dark:bg-[#07162c]/90 backdrop-blur-md border border-neutral-100 dark:border-white/10 p-5 rounded-2xl shadow-xl max-w-sm pointer-events-none select-none"
                  style={{
                    top: activeTooltip === 'peak' ? '60px' : activeTooltip === 'observed' ? '120px' : '180px',
                    left: activeTooltip === 'meal' ? '90px' : activeTooltip === 'baseline' ? '160px' : '280px',
                  }}
                >
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-teal dark:text-teal-light mb-1.5">
                    {tooltipsData[activeTooltip].title}
                  </h4>
                  <p className="text-[11px] text-navy/70 dark:text-white/70 leading-relaxed font-body">
                    {tooltipsData[activeTooltip].desc}
                  </p>
                  <div className="flex gap-4 mt-2.5 pt-2 border-t border-neutral-100 dark:border-white/5 text-[9px] font-mono text-navy/40 dark:text-white/40">
                    <span>TIME: {tooltipsData[activeTooltip].time}</span>
                    <span>GLUCOSE: {tooltipsData[activeTooltip].glucose}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Interactive Observation Panel (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            
            {/* Scrollable Swipe list on mobile, grid layout on desktop */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-none snap-x snap-mandatory">
              
              {/* Card 1: Duration */}
              <div 
                className="snap-center min-w-[240px] lg:min-w-0 flex-shrink-0 flex-1 bg-[#FAF9F5]/40 dark:bg-[#0e1f35]/20 border border-neutral-100 dark:border-white/5 p-5 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 dark:hover:border-teal-light/30 hover:shadow-md group/metrics"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy/5 dark:bg-white/5 flex items-center justify-center text-teal dark:text-teal-light group-hover/metrics:scale-110 transition-transform duration-300">
                    <RiCalendarLine size={15} />
                  </div>
                  <div>
                    <span className="text-[9px] text-navy/40 dark:text-white/40 block font-heading uppercase font-semibold tracking-wider">Duration</span>
                    <span className="text-base sm:text-lg text-navy/90 dark:text-white/90 font-heading font-bold">
                      {isCardInView ? countSeasons : 0} seasons
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Meal Pattern */}
              <div 
                className="snap-center min-w-[240px] lg:min-w-0 flex-shrink-0 flex-1 bg-[#FAF9F5]/40 dark:bg-[#0e1f35]/20 border border-neutral-100 dark:border-white/5 p-5 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 dark:hover:border-teal-light/30 hover:shadow-md group/metrics"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy/5 dark:bg-white/5 flex items-center justify-center text-teal dark:text-teal-light group-hover/metrics:scale-110 transition-transform duration-300">
                    <RiRestaurantLine size={15} />
                  </div>
                  <div>
                    <span className="text-[9px] text-navy/40 dark:text-white/40 block font-heading uppercase font-semibold tracking-wider">Meal Pattern</span>
                    <span className="text-base sm:text-lg text-navy/90 dark:text-white/90 font-heading font-bold">Same meals</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Variable */}
              <div 
                className="snap-center min-w-[240px] lg:min-w-0 flex-shrink-0 flex-1 bg-[#FAF9F5]/40 dark:bg-[#0e1f35]/20 border border-neutral-100 dark:border-white/5 p-5 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 dark:hover:border-teal-light/30 hover:shadow-md group/metrics"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy/5 dark:bg-white/5 flex items-center justify-center text-teal dark:text-teal-light group-hover/metrics:scale-110 transition-transform duration-300">
                    <RiFlaskLine size={15} />
                  </div>
                  <div>
                    <span className="text-[9px] text-navy/40 dark:text-white/40 block font-heading uppercase font-semibold tracking-wider">Variable Tested</span>
                    <span className="text-base sm:text-lg text-navy/90 dark:text-white/90 font-heading font-bold">
                      {isCardInView ? countVariable : 0} variable
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Card 4: What Was Observed (Insights mapping trigger list) */}
            <div className="bg-[#FAF9F5]/40 dark:bg-[#0e1f35]/20 border border-neutral-100 dark:border-white/5 p-5 rounded-2xl text-left flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <RiLineChartLine className="text-accent" size={15} />
                <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-navy/70 dark:text-white/70">
                  What was observed
                </span>
              </div>
              
              <ul className="space-y-2">
                {[
                  { text: 'Lower Peak', id: 'peak' },
                  { text: 'Smoother Curve', id: 'curve' },
                  { text: 'No Sharp Drop', id: 'drop' },
                  { text: 'More Stable Energy', id: 'energy' }
                ].map((insight, idx) => (
                  <li 
                    key={idx} 
                    onMouseEnter={() => setHoveredInsight(insight.id)}
                    onMouseLeave={() => setHoveredInsight(null)}
                    className={`flex items-center gap-2.5 text-xs font-heading font-semibold py-1.5 px-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      hoveredInsight === insight.id 
                        ? 'bg-teal/5 text-teal dark:text-teal-light translate-x-1' 
                        : 'text-navy/80 dark:text-white/80 hover:bg-neutral-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <RiCheckboxCircleFill className="text-teal dark:text-teal-light flex-shrink-0" size={14} />
                    <span>{insight.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Progressive Storytelling Control Stepper (bottom) ── */}
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[9px] font-heading font-semibold uppercase tracking-wider text-navy/40 dark:text-white/40">Guided Narrative Mode</span>
              <p className="text-[11px] text-navy/60 dark:text-white/60 font-body max-w-md">
                Click steps to explore post-meal glucose milestones.
              </p>
            </div>
            
            {/* Steps Navigation */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase transition-all duration-300 ${
                    activeStep === idx 
                      ? 'bg-teal text-white shadow-md' 
                      : 'bg-neutral-50 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 text-navy/60 dark:text-white/60'
                  }`}
                >
                  {step.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active step description block */}
          <AnimatePresence mode="wait">
            {activeStep !== null && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-50/50 dark:bg-[#07162c]/50 p-4 rounded-xl border border-neutral-100/50 dark:border-white/5 mt-4 text-left"
              >
                <h4 className="font-heading font-bold text-xs text-teal dark:text-teal-light uppercase tracking-wider">
                  {steps[activeStep].label}
                </h4>
                <p className="text-xs text-navy/70 dark:text-white/70 leading-relaxed font-body mt-1">
                  {activeStep === 0 && "Meal Consumed: Both patterns start at identical glucose baselines, keeping food inputs completely constant."}
                  {activeStep === 1 && "Glucose Rise: The conventional response rises rapidly immediately after the meal, while the observation curve shows a flatter, controlled rise."}
                  {activeStep === 2 && "Typical Spike: In conventional response, glucose surges up to a peak of ~170 mg/dL, causing potential energetic crashes."}
                  {activeStep === 3 && "Observed Response: The Founder's self-observation curve peaks at only ~115 mg/dL, avoiding a sharp spike and ensuring steadier energy levels."}
                  {activeStep === 4 && "Baseline Recovery: Both curves settle back to baseline around 3 hours, but the observed response pattern returns quicker and stays highly stable."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer disclaimers */}
        <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] text-navy/40 dark:text-white/40 font-heading tracking-wide">
          <div className="flex items-start gap-1.5 max-w-xl">
            <RiInformationLine size={13} className="text-accent flex-shrink-0 mt-0.5" />
            <span>Illustrative visualization based on founder self-observation using continuous glucose monitoring. Not a medical claim.</span>
          </div>
          <span className="font-mono whitespace-nowrap self-end sm:self-center">CGM DATA · N=1</span>
        </div>

      </div>

      {/* ── 10. MOBILE BOTTOM SHEET TOOLTIP FALLBACK DRAWERS ── */}
      <AnimatePresence>
        {isMobile && activeTooltip && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTooltip(null)}
              className="fixed inset-0 bg-black z-40"
            />
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#07162c] rounded-t-3xl border-t border-neutral-200 dark:border-white/10 p-6 pb-8 shadow-2xl text-left"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-heading font-bold uppercase tracking-[0.25em] text-accent">
                  Observation Point
                </span>
                <button 
                  onClick={() => setActiveTooltip(null)}
                  className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-navy dark:text-white transition-colors"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>

              {/* Body Content */}
              <h4 className="text-xl font-heading font-bold text-navy dark:text-white leading-none">
                {tooltipsData[activeTooltip].title}
              </h4>
              <p className="text-sm text-navy/70 dark:text-white/70 leading-relaxed font-body mt-3">
                {tooltipsData[activeTooltip].desc}
              </p>

              {/* Data tags */}
              <div className="flex gap-4 mt-5 pt-3 border-t border-neutral-100 dark:border-white/5 font-mono text-xs text-navy/50 dark:text-white/50">
                <div>TIME: <span className="font-bold text-navy dark:text-white">{tooltipsData[activeTooltip].time}</span></div>
                <div>GLUCOSE: <span className="font-bold text-navy dark:text-white">{tooltipsData[activeTooltip].glucose}</span></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
