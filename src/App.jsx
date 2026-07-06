import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuoteInterstitial from './components/QuoteInterstitial';
import FounderStory from './components/FounderStory';
import JourneyFrames from './components/JourneyFrames';
import HealthcareGap from './components/HealthcareGap';
import WhatImBuilding from './components/WhatImBuilding';
import GlycomicsSection from './components/GlycomicsSection';
import FounderPhilosophy from './components/FounderPhilosophy';
import LessonsLearned from './components/LessonsLearned';
import MomentsMilestones from './components/MomentsMilestones';
import Vision from './components/Vision';
import Connect from './components/Connect';
import { headingHierarchyCheck } from './utils/accessibility';
import { reportWebVitals } from './utils/performance';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Custom Cursor Motion Values for smooth chasing effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // ── Dev-mode diagnostics ──
  useEffect(() => {
    if (import.meta.env.DEV) {
      // Run heading hierarchy audit after DOM is fully rendered
      const auditTimer = setTimeout(() => headingHierarchyCheck(), 1500);
      // Report Web Vitals to console
      reportWebVitals(({ name, value }) => {
        console.log(`[CWV] ${name}: ${Math.round(value)}`);
      });
      return () => clearTimeout(auditTimer);
    }
  }, []);



  useEffect(() => {
    // ── Scroll Progress Tracker ──
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // ── Mouse Tracker & Mobile Check ──
    const checkMobile = () => {
      const isMobileMatch = window.matchMedia('(max-width: 1024px)').matches || ('ontouchstart' in window);
      setIsMobile(isMobileMatch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Interactive Hover Listeners for Cursor Expansion ──
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .group, .cursor-pointer'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHoveringInteractive(true));
        el.addEventListener('mouseleave', () => setIsHoveringInteractive(false));
      });
    };

    // Stagger detection to ensure React has fully rendered the DOM
    const timer = setTimeout(addHoverListeners, 800);



    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-white text-navy font-body antialiased selection:bg-teal selection:text-white relative ${!isMobile ? 'lg:cursor-none' : ''}`}>

      
      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-teal z-[9999] origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* ── Custom Cursor (Desktop Only) ── */}
      {!isMobile && (
        <>
          {/* Inner Dot */}
          <motion.div
            className="fixed pointer-events-none z-[9999] rounded-full bg-teal w-1 h-1"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%'
            }}
          />
          {/* Outer Ring */}
          <motion.div
            className={`fixed pointer-events-none z-[9998] rounded-full border border-teal/40 transition-[width,height,background-color,border-color] duration-300 ease-out ${
              isHoveringInteractive ? 'w-14 h-14 bg-teal/5 border-teal/60' : 'w-8 h-8'
            }`}
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%'
            }}
          />
        </>
      )}

      {/* Navbar rendered outside transition wrapper for absolute fixed position stability on mobile */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* ── Sections Assembly with smooth staggered entrance ── */}
      <main className="transition-opacity duration-1000 ease-[0.16,1,0.3,1] opacity-100">
        <Hero />
        <QuoteInterstitial />
        <FounderStory />
        <JourneyFrames />
        <HealthcareGap />
        <WhatImBuilding />
        <GlycomicsSection />
        <FounderPhilosophy />
        <LessonsLearned />
        <MomentsMilestones />
        <Vision />
        <Connect />
      </main>
    </div>
  );
}

export default App;
