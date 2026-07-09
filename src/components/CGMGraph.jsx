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
      const duration = 1500;
      const startTime = performance.now();
      
      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
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
  const [hoveredLegend, setHoveredLegend] = useState(null);

  // ── 4. INTERACTIVE DATA POINTS & TOOLTIPS ──
  const [activeTooltip, setActiveTooltip] = useState(null);
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
  const [activeStep, setActiveStep] = useState(null);
  const steps = [
    { label: "Meal Marker", desc: "Starting point comparison" },
    { label: "Glucose Rise", desc: "Initial post-meal elevation" },
    { label: "Conventional Peak", desc: "Highest glucose spike" },
    { label: "Observed Response", desc: "Observed formulation response" },
    { label: "Baseline Recovery", desc: "Stabilization convergence" }
  ];

  // ── 6. DYNAMIC GRAPH FOCUS MAPPED TO INSIGHT HOVERS ──
  const [hoveredInsight, setHoveredInsight] = useState(null);

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

  // ── EXPANDED SVG COORDINATE SYSTEM ──
  // viewBox is "0 0 560 380" — chart fills most of this vertically
  // Y-axis: glucose values mapped so 180→30, 70→260 (~35% taller plot area)
  // X-axis stepper at y≈300, icons at y≈328, labels at y≈352
  
  const chartLeft = 50;
  const chartRight = 530;
  const chartTop = 20;
  const chartBottom = 260;

  // Y mapping: glucose => SVG y
  // 180 mg/dL → y=30,  140 → y=96,  100 → y=163,  70 → y=260
  const glucoseToY = (mg) => {
    // Linear interpolation: 70→260, 180→30
    return 260 - ((mg - 70) / (180 - 70)) * (260 - 30);
  };

  // X positions for 5 milestones (MEAL, RISE, PEAK, RECOVERY, BASELINE)
  const xMeal = 75;
  const xRise = 195;
  const xPeak = 310;
  const xRecovery = 415;
  const xBaseline = 510;

  // Conventional curve: starts ~68 → rises sharply to ~175 at peak → drops back to ~72
  const conventionalPath = `M ${xMeal},${glucoseToY(68)} C ${xMeal + 30},${glucoseToY(68)} ${xRise - 40},${glucoseToY(90)} ${xRise},${glucoseToY(95)} C ${xRise + 40},${glucoseToY(110)} ${xPeak - 50},${glucoseToY(170)} ${xPeak},${glucoseToY(175)} C ${xPeak + 50},${glucoseToY(170)} ${xRecovery - 30},${glucoseToY(110)} ${xRecovery},${glucoseToY(95)} C ${xRecovery + 40},${glucoseToY(82)} ${xBaseline - 40},${glucoseToY(73)} ${xBaseline},${glucoseToY(72)}`;

  // Founder observation curve: starts ~68 → gentle rise to ~95 → gradual descent to ~72
  const observerPath = `M ${xMeal},${glucoseToY(68)} C ${xMeal + 40},${glucoseToY(68)} ${xRise - 50},${glucoseToY(80)} ${xRise},${glucoseToY(92)} C ${xRise + 30},${glucoseToY(97)} ${xPeak - 50},${glucoseToY(95)} ${xPeak},${glucoseToY(93)} C ${xPeak + 40},${glucoseToY(92)} ${xRecovery - 40},${glucoseToY(82)} ${xRecovery},${glucoseToY(78)} C ${xRecovery + 30},${glucoseToY(75)} ${xBaseline - 30},${glucoseToY(73)} ${xBaseline},${glucoseToY(72)}`;

  // Determine opacities based on current interaction states
  const getCurveStyle = (type) => {
    let opacity = 1;
    let strokeWidth = type === 'founder' ? 3 : 2;

    if (hoveredLegend) {
      if (hoveredLegend !== type) {
        opacity = 0.2;
      } else {
        strokeWidth = type === 'founder' ? 4 : 3;
      }
    }

    if (activeStep !== null) {
      if (activeStep === 2 && type !== 'conventional') opacity = 0.25;
      if (activeStep === 3 && type !== 'founder') opacity = 0.25;
    }

    if (hoveredInsight) {
      if (hoveredInsight === 'peak' && type !== 'conventional') opacity = 0.3;
      if (hoveredInsight === 'curve' && type !== 'founder') opacity = 0.3;
      if (hoveredInsight === 'drop' && type !== 'founder') opacity = 0.4;
    }

    return { opacity, strokeWidth, transition: 'all 0.4s ease' };
  };

  // Y-axis tick values
  const yTicks = [
    { label: '180', y: glucoseToY(180) },
    { label: '140', y: glucoseToY(140) },
    { label: '100', y: glucoseToY(100) },
    { label: '70', y: glucoseToY(70) },
  ];

  // X-axis milestones with icon SVG paths
  const xMilestones = [
    { 
      x: xMeal, label: 'MEAL', 
      // fork & knife icon
      icon: (x, y) => (
        <g transform={`translate(${x - 8}, ${y - 8}) scale(0.65)`}>
          <path d="M5 2v8h2V2H5zm4 0v4h2V2H9zm4 0v4a3 3 0 01-2 2.83V18h-2V2h4zM3 2v4a3 3 0 002 2.83V18h2V8.83A3 3 0 005 6V2H3z" 
            className="fill-navy/40 dark:fill-white/40" />
        </g>
      )
    },
    { 
      x: xRise, label: 'RISE',
      // trending up icon
      icon: (x, y) => (
        <g transform={`translate(${x - 8}, ${y - 8}) scale(0.65)`}>
          <path d="M4 18l8-8 3 3 7-7-1.4-1.4L15 10.2l-3-3-9.6 9.6L4 18z" 
            className="fill-navy/40 dark:fill-white/40" />
        </g>
      )
    },
    { 
      x: xPeak, label: 'PEAK',
      // mountain icon
      icon: (x, y) => (
        <g transform={`translate(${x - 8}, ${y - 8}) scale(0.65)`}>
          <path d="M12 4l-8 14h16L12 4zm0 4l4.5 8h-9L12 8z" 
            className="fill-navy/40 dark:fill-white/40" />
        </g>
      )
    },
    { 
      x: xRecovery, label: 'RECOVERY',
      // refresh/recovery icon
      icon: (x, y) => (
        <g transform={`translate(${x - 8}, ${y - 8}) scale(0.65)`}>
          <path d="M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 108 8h-2a6 6 0 11-1.76-4.24L14 10h6V4l-2.35 2.35z" 
            className="fill-navy/40 dark:fill-white/40" />
        </g>
      )
    },
    { 
      x: xBaseline, label: 'BASELINE',
      // bar chart icon
      icon: (x, y) => (
        <g transform={`translate(${x - 8}, ${y - 8}) scale(0.65)`}>
          <path d="M4 18h4V8H4v10zm6 0h4V4h-4v14zm6 0h4v-6h-4v6z" 
            className="fill-navy/40 dark:fill-white/40" />
        </g>
      )
    }
  ];

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
        className="bg-white dark:bg-[#0e1f35]/30 border border-neutral-200/60 dark:border-white/[0.08] rounded-[2rem] p-5 sm:p-8 lg:p-10 relative overflow-hidden group/card transition-colors duration-300"
      >
        {/* Apple-style Cursor Spotlight Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 -z-10"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(20, 184, 166, 0.04), transparent 80%)`
          }}
        />

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-3">
          <div className="space-y-1">
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

          {/* Interactive Legend */}
          <div className="flex flex-wrap gap-4 items-center">
            <div 
              onMouseEnter={() => setHoveredLegend('conventional')}
              onMouseLeave={() => setHoveredLegend(null)}
              className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors duration-200"
            >
              <span className="w-5 h-[2px] bg-neutral-300 dark:bg-neutral-500 block rounded-full" />
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: SVG Chart Block (8 columns) */}
          <div className="lg:col-span-8 w-full flex flex-col justify-between relative">
            <div className="w-full relative">
              {/* Y-axis label */}
              <div className="absolute -left-1 top-0 bottom-12 flex items-center pointer-events-none z-10">
                <span className="text-[8px] sm:text-[9px] font-heading font-bold uppercase tracking-[0.15em] text-navy/35 dark:text-white/35 whitespace-nowrap origin-center -rotate-90">
                  Glucose Level (mg/dL)
                </span>
              </div>

              <svg viewBox="0 0 560 380" className="w-full h-auto overflow-visible select-none" preserveAspectRatio="xMidYMid meet">
                
                {/* ── Y-AXIS GRIDLINES & LABELS ── */}
                {yTicks.map((tick, i) => (
                  <g key={i}>
                    {/* Gridline */}
                    <line 
                      x1={chartLeft} y1={tick.y} 
                      x2={chartRight} y2={tick.y} 
                      className="stroke-neutral-100 dark:stroke-white/[0.06]" 
                      strokeWidth="1" 
                      strokeDasharray={i === yTicks.length - 1 ? "0" : "3,4"} 
                    />
                    {/* Label */}
                    <text 
                      x={chartLeft - 8} 
                      y={tick.y + 3.5} 
                      textAnchor="end" 
                      className="font-heading text-[10px] font-semibold fill-navy/40 dark:fill-white/40"
                    >
                      {tick.label}
                    </text>
                  </g>
                ))}

                {/* Baseline horizontal (at 70 mg/dL) */}
                <line 
                  x1={chartLeft} y1={glucoseToY(70)} 
                  x2={chartRight} y2={glucoseToY(70)} 
                  className="stroke-neutral-200 dark:stroke-white/[0.08]" 
                  strokeWidth="1" 
                />

                {/* ── DYNAMIC INSIGHT FOCUS HIGHLIGHTS ── */}
                <AnimatePresence>
                  {hoveredInsight === 'peak' && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <circle cx={xPeak} cy={glucoseToY(175)} r="25" className="fill-none stroke-neutral-300/40 dark:stroke-neutral-600/40" strokeWidth="1" strokeDasharray="3,3" />
                      <circle cx={xRise} cy={glucoseToY(92)} r="20" className="fill-none stroke-teal/35 dark:stroke-teal-light/35" strokeWidth="1" strokeDasharray="3,3" />
                    </motion.g>
                  )}
                  {hoveredInsight === 'curve' && (
                    <motion.path
                      d={`M ${xMeal},${glucoseToY(68)} C ${xMeal + 40},${glucoseToY(68)} ${xRise - 50},${glucoseToY(80)} ${xRise},${glucoseToY(92)}`}
                      fill="none"
                      className="stroke-teal dark:stroke-teal-light"
                      strokeWidth="10"
                      strokeLinecap="round"
                      style={{ filter: 'blur(4px)', opacity: 0.6 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  {hoveredInsight === 'drop' && (
                    <motion.path
                      d={`M ${xPeak},${glucoseToY(93)} C ${xPeak + 40},${glucoseToY(92)} ${xRecovery - 40},${glucoseToY(82)} ${xRecovery},${glucoseToY(78)} C ${xRecovery + 30},${glucoseToY(75)} ${xBaseline - 30},${glucoseToY(73)} ${xBaseline},${glucoseToY(72)}`}
                      fill="none"
                      className="stroke-teal dark:stroke-teal-light"
                      strokeWidth="12"
                      style={{ filter: 'blur(5px)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* ── PROGRESSIVE STORYTELLING FOCUS ── */}
                <AnimatePresence>
                  {activeStep !== null && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {activeStep === 0 && (
                        <circle cx={xMeal} cy={glucoseToY(68)} r="18" className="fill-teal/[0.03] dark:fill-teal-light/[0.02] stroke-teal/20 dark:stroke-teal-light/20" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                      {activeStep === 1 && (
                        <rect x={xMeal} y={glucoseToY(100)} width={xRise - xMeal + 20} height={glucoseToY(68) - glucoseToY(100) + 10} rx="8" className="fill-none stroke-teal/15 dark:stroke-teal-light/15" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                      {activeStep === 2 && (
                        <circle cx={xPeak} cy={glucoseToY(175)} r="22" className="fill-none stroke-neutral-300 dark:stroke-neutral-600" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                      {activeStep === 3 && (
                        <circle cx={xRise + 15} cy={glucoseToY(92)} r="20" className="fill-none stroke-teal dark:stroke-teal-light" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                      {activeStep === 4 && (
                        <rect x={xRecovery - 15} y={glucoseToY(80)} width={xBaseline - xRecovery + 40} height={glucoseToY(68) - glucoseToY(80) + 15} rx="8" className="fill-none stroke-teal/15 dark:stroke-teal-light/15" strokeWidth="1" strokeDasharray="2,2" />
                      )}
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* ── FILLS UNDER CURVES ── */}
                <path
                  d={`${conventionalPath} L ${xBaseline},${glucoseToY(70)} L ${xMeal},${glucoseToY(70)} Z`}
                  className="fill-neutral-200/20 dark:fill-neutral-700/[0.06] pointer-events-none"
                  style={{ opacity: hoveredLegend === 'founder' ? 0.05 : 1, transition: 'all 0.4s' }}
                />
                <path
                  d={`${observerPath} L ${xBaseline},${glucoseToY(70)} L ${xMeal},${glucoseToY(70)} Z`}
                  className="fill-teal/[0.04] dark:fill-teal-light/[0.02] pointer-events-none"
                  style={{ opacity: hoveredLegend === 'conventional' ? 0.05 : 1, transition: 'all 0.4s' }}
                />

                {/* Dark Mode Glow paths */}
                <path
                  d={conventionalPath}
                  fill="none"
                  className="hidden dark:block stroke-neutral-400/[0.08] pointer-events-none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  style={{ filter: 'blur(6px)', opacity: getCurveStyle('conventional').opacity }}
                />
                <path
                  d={observerPath}
                  fill="none"
                  className="hidden dark:block stroke-teal-light/20 pointer-events-none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  style={{ filter: 'blur(8px)', opacity: getCurveStyle('founder').opacity }}
                />

                {/* ── SVG CURVE PATHS ── */}
                <motion.path
                  d={conventionalPath}
                  fill="none"
                  className="stroke-neutral-300 dark:stroke-neutral-500"
                  strokeLinecap="round"
                  custom={0.2}
                  variants={curveVariants}
                  style={getCurveStyle('conventional')}
                />
                <motion.path
                  d={observerPath}
                  fill="none"
                  className="stroke-teal dark:stroke-teal-light"
                  strokeLinecap="round"
                  custom={1.2}
                  variants={curveVariants}
                  style={getCurveStyle('founder')}
                />

                {/* ── X-AXIS: STEPPER LINE + ICONS + LABELS ── */}
                <g>
                  {/* Connector line */}
                  <line x1={xMeal} y1={glucoseToY(70) + 40} x2={xBaseline} y2={glucoseToY(70) + 40} className="stroke-neutral-200 dark:stroke-white/[0.08]" strokeWidth="1" />

                  {/* Milestone nodes, icons & labels */}
                  {xMilestones.map((m, idx) => (
                    <g key={idx}>
                      {/* Stepper dot */}
                      <circle 
                        cx={m.x} 
                        cy={glucoseToY(70) + 40} 
                        r="3.5" 
                        onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                        className={`cursor-pointer transition-all duration-300 ${
                          activeStep === idx 
                            ? 'fill-teal dark:fill-teal-light' 
                            : 'fill-neutral-300 dark:fill-neutral-600 hover:fill-neutral-400 dark:hover:fill-neutral-500'
                        }`} 
                      />
                      {/* Icon background circle */}
                      <circle 
                        cx={m.x} 
                        cy={glucoseToY(70) + 68} 
                        r="12" 
                        className="fill-neutral-50 dark:fill-white/[0.04] stroke-neutral-200 dark:stroke-white/[0.08]" 
                        strokeWidth="0.8" 
                      />
                      {/* Icon */}
                      {m.icon(m.x, glucoseToY(70) + 68)}
                      {/* Label */}
                      <text 
                        x={m.x} 
                        y={glucoseToY(70) + 92} 
                        textAnchor="middle" 
                        className={`font-heading text-[8px] font-bold tracking-[0.12em] uppercase transition-colors duration-300 ${
                          activeStep === idx 
                            ? 'fill-teal dark:fill-teal-light' 
                            : 'fill-navy/35 dark:fill-white/35'
                        }`}
                      >
                        {m.label}
                      </text>
                    </g>
                  ))}
                </g>

                {/* ── INTERACTIVE DATA POINT MARKERS ── */}
                {/* 1. Meal Point (start) */}
                <motion.g variants={annotationVariants}>
                  <motion.circle
                    cx={xMeal} cy={glucoseToY(68)} r={4}
                    className="stroke-neutral-400/25 dark:stroke-neutral-500/25 fill-none pointer-events-none"
                    strokeWidth="1"
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    style={{ transformOrigin: `${xMeal}px ${glucoseToY(68)}px`, willChange: "transform", transform: "translateZ(0)" }}
                  />
                  <motion.circle
                    cx={xMeal} cy={glucoseToY(68)} r="4"
                    className="fill-neutral-400 dark:fill-neutral-500 stroke-white dark:stroke-[#0e1f35] pointer-events-none"
                    strokeWidth="1.5"
                    animate={{ scale: activeTooltip === 'meal' ? 1.2 : 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ transformOrigin: `${xMeal}px ${glucoseToY(68)}px`, willChange: "transform", transform: "translateZ(0)" }}
                  />
                  <circle
                    cx={xMeal} cy={glucoseToY(68)} r="14"
                    className="fill-transparent cursor-pointer"
                    onMouseEnter={() => !isMobile && setActiveTooltip('meal')}
                    onMouseLeave={() => !isMobile && setActiveTooltip(null)}
                    onClick={() => isMobile && setActiveTooltip('meal')}
                  />
                </motion.g>

                {/* 2. Conventional Peak */}
                <motion.g variants={annotationVariants}>
                  <motion.circle
                    cx={xPeak} cy={glucoseToY(175)} r={4}
                    className="stroke-neutral-400/25 dark:stroke-neutral-500/25 fill-none pointer-events-none"
                    strokeWidth="1"
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    style={{ transformOrigin: `${xPeak}px ${glucoseToY(175)}px`, willChange: "transform", transform: "translateZ(0)" }}
                  />
                  <motion.circle
                    cx={xPeak} cy={glucoseToY(175)} r="4"
                    className="fill-neutral-400 dark:fill-neutral-500 stroke-white dark:stroke-[#0e1f35] pointer-events-none"
                    strokeWidth="1.5"
                    animate={{ scale: activeTooltip === 'peak' ? 1.2 : 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ transformOrigin: `${xPeak}px ${glucoseToY(175)}px`, willChange: "transform", transform: "translateZ(0)" }}
                  />
                  <circle
                    cx={xPeak} cy={glucoseToY(175)} r="14"
                    className="fill-transparent cursor-pointer"
                    onMouseEnter={() => !isMobile && setActiveTooltip('peak')}
                    onMouseLeave={() => !isMobile && setActiveTooltip(null)}
                    onClick={() => isMobile && setActiveTooltip('peak')}
                  />
                </motion.g>

                {/* 3. Observed Response (founder curve peak area) */}
                <motion.g variants={annotationVariants}>
                  <motion.circle
                    cx={xRise + 15} cy={glucoseToY(95)} r={4}
                    className="stroke-teal/35 dark:stroke-teal-light/40 fill-none pointer-events-none"
                    strokeWidth="1"
                    animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
                    style={{ transformOrigin: `${xRise + 15}px ${glucoseToY(95)}px`, willChange: "transform", transform: "translateZ(0)" }}
                  />
                  <motion.circle
                    cx={xRise + 15} cy={glucoseToY(95)} r="4"
                    className="fill-teal dark:fill-teal-light stroke-white dark:stroke-[#0e1f35] pointer-events-none"
                    strokeWidth="1.5"
                    animate={{ scale: activeTooltip === 'observed' ? 1.2 : 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ transformOrigin: `${xRise + 15}px ${glucoseToY(95)}px`, willChange: "transform", transform: "translateZ(0)" }}
                  />
                  <circle
                    cx={xRise + 15} cy={glucoseToY(95)}  r="14"
                    className="fill-transparent cursor-pointer"
                    onMouseEnter={() => !isMobile && setActiveTooltip('observed')}
                    onMouseLeave={() => !isMobile && setActiveTooltip(null)}
                    onClick={() => isMobile && setActiveTooltip('observed')}
                  />
                </motion.g>

                {/* 4. Baseline Recovery */}
                <motion.g variants={annotationVariants}>
                  <motion.circle
                    cx={xBaseline} cy={glucoseToY(72)} r={4}
                    className="stroke-teal/35 dark:stroke-teal-light/40 fill-none pointer-events-none"
                    strokeWidth="1"
                    animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
                    style={{ transformOrigin: `${xBaseline}px ${glucoseToY(72)}px`, willChange: "transform", transform: "translateZ(0)" }}
                  />
                  <motion.circle
                    cx={xBaseline} cy={glucoseToY(72)} r="4"
                    className="fill-teal dark:fill-teal-light stroke-white dark:stroke-[#0e1f35] pointer-events-none"
                    strokeWidth="1.5"
                    animate={{ scale: activeTooltip === 'baseline' ? 1.2 : 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ transformOrigin: `${xBaseline}px ${glucoseToY(72)}px`, willChange: "transform", transform: "translateZ(0)" }}
                  />
                  <circle
                    cx={xBaseline} cy={glucoseToY(72)} r="14"
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
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="absolute z-20 bg-white/95 dark:bg-[#0a1a2e]/90 backdrop-blur-md border border-neutral-100 dark:border-white/10 p-4 rounded-2xl shadow-xl max-w-xs pointer-events-none select-none"
                  style={{
                    top: activeTooltip === 'peak' ? '15%' : activeTooltip === 'observed' ? '30%' : '50%',
                    left: activeTooltip === 'meal' ? '15%' : activeTooltip === 'baseline' ? '40%' : '45%',
                  }}
                >
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-teal dark:text-teal-light mb-1">
                    {tooltipsData[activeTooltip].title}
                  </h4>
                  <p className="text-[11px] text-navy/70 dark:text-white/70 leading-relaxed font-body">
                    {tooltipsData[activeTooltip].desc}
                  </p>
                  <div className="flex gap-4 mt-2 pt-2 border-t border-neutral-100 dark:border-white/5 text-[9px] font-mono text-navy/40 dark:text-white/40">
                    <span>TIME: {tooltipsData[activeTooltip].time}</span>
                    <span>GLUCOSE: {tooltipsData[activeTooltip].glucose}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Interactive Observation Panel (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            
            {/* Scrollable Swipe on mobile, stacked on desktop */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none snap-x snap-mandatory">
              
              {/* Card 1: Duration */}
              <div className="snap-center min-w-[200px] lg:min-w-0 flex-shrink-0 flex-1 bg-[#FAF9F5]/60 dark:bg-white/[0.02] border border-neutral-100 dark:border-white/[0.06] p-4 rounded-2xl text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/30 dark:hover:border-teal-light/20 hover:shadow-sm group/metrics">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy/[0.04] dark:bg-white/[0.05] flex items-center justify-center text-teal dark:text-teal-light group-hover/metrics:scale-105 transition-transform duration-300">
                    <RiCalendarLine size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] text-navy/40 dark:text-white/40 block font-heading uppercase font-semibold tracking-wider">Duration</span>
                    <span className="text-lg text-navy/90 dark:text-white/90 font-heading font-bold leading-tight">
                      {isCardInView ? countSeasons : 0} seasons
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Meal Pattern */}
              <div className="snap-center min-w-[200px] lg:min-w-0 flex-shrink-0 flex-1 bg-[#FAF9F5]/60 dark:bg-white/[0.02] border border-neutral-100 dark:border-white/[0.06] p-4 rounded-2xl text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/30 dark:hover:border-teal-light/20 hover:shadow-sm group/metrics">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy/[0.04] dark:bg-white/[0.05] flex items-center justify-center text-teal dark:text-teal-light group-hover/metrics:scale-105 transition-transform duration-300">
                    <RiRestaurantLine size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] text-navy/40 dark:text-white/40 block font-heading uppercase font-semibold tracking-wider">Meal Pattern</span>
                    <span className="text-lg text-navy/90 dark:text-white/90 font-heading font-bold leading-tight">Same meals</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Variable */}
              <div className="snap-center min-w-[200px] lg:min-w-0 flex-shrink-0 flex-1 bg-[#FAF9F5]/60 dark:bg-white/[0.02] border border-neutral-100 dark:border-white/[0.06] p-4 rounded-2xl text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/30 dark:hover:border-teal-light/20 hover:shadow-sm group/metrics">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy/[0.04] dark:bg-white/[0.05] flex items-center justify-center text-teal dark:text-teal-light group-hover/metrics:scale-105 transition-transform duration-300">
                    <RiFlaskLine size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] text-navy/40 dark:text-white/40 block font-heading uppercase font-semibold tracking-wider">Variable Tested</span>
                    <span className="text-lg text-navy/90 dark:text-white/90 font-heading font-bold leading-tight">
                      {isCardInView ? countVariable : 0} variable
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Card 4: What Was Observed */}
            <div className="bg-[#FAF9F5]/60 dark:bg-white/[0.02] border border-neutral-100 dark:border-white/[0.06] p-4 rounded-2xl text-left flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <RiLineChartLine className="text-accent" size={14} />
                <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-navy/70 dark:text-white/70">
                  What was observed
                </span>
              </div>
              
              <ul className="space-y-1.5">
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
                        ? 'bg-teal/[0.06] dark:bg-teal-light/[0.06] text-teal dark:text-teal-light translate-x-1' 
                        : 'text-navy/80 dark:text-white/80 hover:bg-neutral-50 dark:hover:bg-white/[0.03]'
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
        <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-white/[0.05]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
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
                  className={`px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wide transition-all duration-300 ${
                    activeStep === idx 
                      ? 'bg-teal dark:bg-teal-light text-white dark:text-[#0a1a2e] shadow-md' 
                      : 'bg-neutral-50 dark:bg-white/[0.04] hover:bg-neutral-100 dark:hover:bg-white/[0.08] text-navy/60 dark:text-white/60 border border-neutral-100 dark:border-white/[0.06]'
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
                className="bg-neutral-50/60 dark:bg-white/[0.02] p-4 rounded-xl border border-neutral-100/50 dark:border-white/[0.04] mt-3 text-left"
              >
                <h4 className="font-heading font-bold text-xs text-teal dark:text-teal-light uppercase tracking-wider">
                  {steps[activeStep].label}
                </h4>
                <p className="text-xs text-navy/70 dark:text-white/70 leading-relaxed font-body mt-1">
                  {activeStep === 0 && "Meal Consumed: Both patterns start at identical glucose baselines, keeping food inputs completely constant."}
                  {activeStep === 1 && "Glucose Rise: The conventional response rises rapidly immediately after the meal, while the observation curve shows a flatter, controlled rise."}
                  {activeStep === 2 && "Typical Spike: In conventional response, glucose surges up to a peak of ~170 mg/dL, causing potential energetic crashes."}
                  {activeStep === 3 && "Observed Response: The Founder's self-observation curve peaks at only ~95 mg/dL, avoiding a sharp spike and ensuring steadier energy levels."}
                  {activeStep === 4 && "Baseline Recovery: Both curves settle back to baseline around 3 hours, but the observed response pattern returns quicker and stays highly stable."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer disclaimers */}
        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-white/[0.05] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] text-navy/40 dark:text-white/40 font-heading tracking-wide">
          <div className="flex items-start gap-1.5 max-w-xl">
            <RiInformationLine size={13} className="text-accent flex-shrink-0 mt-0.5" />
            <span>Illustrative visualization based on founder self-observation using continuous glucose monitoring. Not a medical claim.</span>
          </div>
          <span className="font-mono whitespace-nowrap self-end sm:self-center">CGM DATA · N=1</span>
        </div>

      </div>

      {/* ── MOBILE BOTTOM SHEET TOOLTIP FALLBACK DRAWERS ── */}
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
              className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0a1a2e] rounded-t-3xl border-t border-neutral-200 dark:border-white/10 p-6 pb-8 shadow-2xl text-left"
            >
              {/* Handle */}
              <div className="w-10 h-1 bg-neutral-200 dark:bg-white/10 rounded-full mx-auto mb-4" />
              
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-heading font-bold uppercase tracking-[0.25em] text-accent">
                  Observation Point
                </span>
                <button 
                  onClick={() => setActiveTooltip(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-navy dark:text-white transition-colors"
                >
                  <RiCloseLine size={18} />
                </button>
              </div>

              {/* Body Content */}
              <h4 className="text-lg font-heading font-bold text-navy dark:text-white leading-tight">
                {tooltipsData[activeTooltip].title}
              </h4>
              <p className="text-sm text-navy/70 dark:text-white/70 leading-relaxed font-body mt-2">
                {tooltipsData[activeTooltip].desc}
              </p>

              {/* Data tags */}
              <div className="flex gap-4 mt-4 pt-3 border-t border-neutral-100 dark:border-white/[0.06] font-mono text-xs text-navy/50 dark:text-white/50">
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
