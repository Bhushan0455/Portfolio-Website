import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuoteInterstitial from './components/QuoteInterstitial';
import FounderStory from './components/FounderStory';
import JourneyFrames from './components/JourneyFrames';
import HealthcareGap from './components/HealthcareGap';
import WhatImBuilding from './components/WhatImBuilding';
import FounderPhilosophy from './components/FounderPhilosophy';
import LessonsLearned from './components/LessonsLearned';
import MomentsMilestones from './components/MomentsMilestones';
import Vision from './components/Vision';
import Connect from './components/Connect';
import Preloader from './components/Preloader';

function App() {
  const [preloaderActive, setPreloaderActive] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
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

  useEffect(() => {
    // Lock scrolling while preloader is active
    if (preloaderActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [preloaderActive]);

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
      setMousePosition({ x: e.clientX, y: e.clientY });
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

    // ── Defer Preloader Mount to Avoid Hydration Mismatch & Bypass for react-snap ──
    const isReactSnap = typeof navigator !== 'undefined' && /ReactSnap/i.test(navigator.userAgent);
    if (!isReactSnap) {
      setShowPreloader(true);
      setPreloaderActive(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-white text-navy font-body antialiased selection:bg-teal selection:text-white relative ${!isMobile ? 'lg:cursor-none' : ''}`}>
      {showPreloader && (
        <Preloader 
          onComplete={() => {
            setPreloaderActive(false);
            setShowPreloader(false);
          }} 
        />
      )}
      
      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-teal z-[9999] origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* ── Custom Cursor (Desktop Only) ── */}
      {!isMobile && (
        <>
          {/* Inner Dot */}
          <div
            className="fixed pointer-events-none z-[9999] rounded-full bg-teal w-2 h-2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
          />
          {/* Outer Ring */}
          <div
            className={`fixed pointer-events-none z-[9998] rounded-full border border-teal/40 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 ease-out ${
              isHoveringInteractive ? 'w-12 h-12 bg-teal/5 border-teal/60' : 'w-6 h-6'
            }`}
            style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
          />
        </>
      )}

      {/* Navbar rendered outside transition wrapper for absolute fixed position stability on mobile */}
      {!preloaderActive && (
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      )}

      {/* ── Sections Assembly with smooth staggered entrance ── */}
      <div className={`transition-opacity duration-1000 ease-[0.16,1,0.3,1] ${
        preloaderActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <Hero preloaderActive={preloaderActive} />
        <QuoteInterstitial />
        <FounderStory />
        <JourneyFrames />
        <HealthcareGap />
        <WhatImBuilding />
        <FounderPhilosophy />
        <LessonsLearned />
        <MomentsMilestones />
        <Vision />
        <Connect />
      </div>
    </div>
  );
}

export default App;
