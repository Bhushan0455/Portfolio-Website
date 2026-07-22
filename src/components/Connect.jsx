import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  LuLinkedin, 
  LuMail, 
  LuArrowUpRight, 
  LuInstagram, 
  LuActivity
} from 'react-icons/lu';

// ── Desktop Navigation Links ──
const NAV_LINKS = [
  { label: 'Story', id: 'story' },
  { label: 'Journey', id: 'journey' },
  { label: 'Insight', id: 'insight' },
  { label: 'Beyond Bound', id: 'building' },
  { label: 'Milestones', id: 'milestones' },
  { label: 'Lessons', id: 'lessons' },
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Contact', id: 'contact' },
];

const FOCUS_TAGS = ['Healthcare', 'Entrepreneurship', 'Metabolic Wellness'];

export default function Connect() {
  const [activePhilosophy, setActivePhilosophy] = useState(0);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const philosophyLines = [
    '"Trust before scale."',
    '"Proof before claims."',
    '"Depth before breadth."',
    '"Long-term over shortcuts."',
  ];

  // Rotate philosophy quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhilosophy((prev) => (prev + 1) % philosophyLines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ── Privacy Modal: body-scroll lock & Escape key ──
  const privacyContentRef = useRef(null);

  useEffect(() => {
    if (isPrivacyOpen) {
      document.body.style.overflow = 'hidden';
      if (privacyContentRef.current) privacyContentRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isPrivacyOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPrivacyOpen) setIsPrivacyOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPrivacyOpen]);

  // Smooth scroll helper
  const scrollTo = (id) => {
    if (id === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // ── Entrance Animation Variants ──
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Mobile direct actions
  const mobileActions = [
    {
      href: 'https://www.linkedin.com/in/priyanshu-chauhan-963981212/',
      label: 'LinkedIn',
      external: true
    },
    {
      href: 'mailto:founder@beyondbound.co',
      label: 'Email',
      external: false
    },
    {
      href: 'https://beyondbound.co/',
      label: 'Beyond Bound®',
      external: true
    }
  ];

  return (
    <footer 
      id="connect" 
      aria-labelledby="connect-title" 
      className="relative overflow-hidden select-none bg-[#FAF9F6] dark:bg-[#07162c] border-t border-navy/10 dark:border-white/10 transition-colors duration-300"
    >

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP REFIND FOOTER — hidden below md
          ════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        
        {/* Premium Top Highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-navy/10 dark:via-white/5 to-transparent pointer-events-none z-10" />
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[350px] h-[200px] bg-teal/5 dark:bg-teal/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-accent/5 dark:bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px'
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-14 relative z-10">
          
          {/* Main Grid Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start pb-10 border-b border-navy/10 dark:border-white/10"
          >
            
            {/* Column 1: Founder Identity & Status (Cols 1-5) */}
            <motion.div variants={fadeUp} className="md:col-span-5 flex flex-col items-start space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#10B981]">
                  Founder & CEO
                </span>
                <h3 
                  id="connect-title"
                  className="font-heading font-bold text-3xl lg:text-[34px] tracking-tight text-navy dark:text-white flex items-center gap-1.5 group cursor-default"
                >
                  Priyanshu Chauhan
                </h3>
              </div>
              
              <p className="text-navy/70 dark:text-white/60 font-body text-sm leading-relaxed max-w-md">
                Building Beyond Bound — a metabolic wellness venture focused on preventive health and honest brand-building in India.
              </p>

              {/* Status indicator row */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
                </span>
                <span className="font-body text-xs text-navy/50 dark:text-white/50">
                  Open to conversations
                </span>
              </div>

              {/* Cycling Philosophy Block */}
              <div className="h-6 overflow-hidden flex items-center select-none text-accent/80 font-serif italic text-sm tracking-wide">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activePhilosophy}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {philosophyLines[activePhilosophy]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Focus Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {FOCUS_TAGS.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="font-body text-xs text-[#10B981] border border-[#10B981]/20 bg-[#10B981]/5 px-3.5 py-1 rounded-full cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Social icons circles (LinkedIn, Instagram, Email) - no Twitter */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/priyanshu-chauhan-963981212/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn Profile"
                  className="w-10 h-10 rounded-full bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 text-navy/50 dark:text-white/50 hover:text-navy dark:hover:text-white hover:border-navy/20 dark:hover:border-white/20 hover:bg-navy/10 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                >
                  <LuLinkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/priyanshu._.chauhan._/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Instagram Profile"
                  className="w-10 h-10 rounded-full bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 text-navy/50 dark:text-white/50 hover:text-navy dark:hover:text-white hover:border-navy/20 dark:hover:border-white/20 hover:bg-navy/10 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                >
                  <LuInstagram size={18} />
                </a>
                <a
                  href="mailto:founder@beyondbound.co"
                  aria-label="Send Email"
                  className="w-10 h-10 rounded-full bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 text-navy/50 dark:text-white/50 hover:text-navy dark:hover:text-white hover:border-navy/20 dark:hover:border-white/20 hover:bg-navy/10 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                >
                  <LuMail size={18} />
                </a>
              </div>

            </motion.div>

            {/* Column 2: Navigation Links (Cols 6-8 on desktop, aligned to layout grid) */}
            <motion.div variants={fadeUp} className="md:col-span-3 flex flex-col space-y-5 w-full">
              <span className="font-heading text-[11px] font-semibold text-navy/40 dark:text-white/40 uppercase tracking-[0.25em]">
                NAVIGATE
              </span>
              <nav 
                className="flex flex-col space-y-0" 
                aria-label="Footer navigation"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.id);
                    }}
                    className="group flex items-center gap-4 py-[6px] cursor-pointer border-b border-navy/[0.06] dark:border-white/[0.06] last:border-0 w-full"
                  >
                    {/* Dash line — expands on hover */}
                    <span className="block w-5 h-[1.5px] bg-navy/25 dark:bg-white/25 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-8 group-hover:bg-teal dark:group-hover:bg-teal-light flex-shrink-0" />
                    {/* Label — shifts right on hover */}
                    <span className="text-[15px] font-body font-medium text-navy/60 dark:text-white/55 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-navy dark:group-hover:text-white group-hover:translate-x-1.5 inline-block">
                      {link.label}
                    </span>
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Column 3: Contact & Direct Connect Cards (Cols 9-12) */}
            <motion.div variants={fadeUp} className="md:col-span-4 flex flex-col space-y-5 w-full">
              <span className="font-heading text-[11px] font-semibold text-navy/40 dark:text-white/40 uppercase tracking-[0.25em]">
                CONNECT
              </span>

              <div className="flex flex-col gap-3">
                {/* LinkedIn Connect Card */}
                <a
                  href="https://www.linkedin.com/in/priyanshu-chauhan-963981212/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-navy/10 dark:border-white/[0.07] bg-navy/[0.01] dark:bg-white/[0.02] hover:bg-navy/[0.03] dark:hover:bg-white/[0.04] hover:border-navy/20 dark:hover:border-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 text-[#10B981] flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                      <LuLinkedin size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-heading font-medium text-navy/40 dark:text-white/40 uppercase tracking-wider mb-0.5">
                        Connect professionally
                      </span>
                      <span className="text-sm font-semibold font-heading text-navy dark:text-white transition-colors">
                        LinkedIn
                      </span>
                    </div>
                  </div>
                  <LuArrowUpRight size={16} className="text-navy/20 dark:text-white/20 group-hover:text-navy dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>

                {/* Email Connect Card */}
                <a
                  href="mailto:founder@beyondbound.co"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-navy/10 dark:border-white/[0.07] bg-navy/[0.01] dark:bg-white/[0.02] hover:bg-navy/[0.03] dark:hover:bg-white/[0.04] hover:border-navy/20 dark:hover:border-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 text-[#10B981] flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                      <LuMail size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-heading font-medium text-navy/40 dark:text-white/40 uppercase tracking-wider mb-0.5">
                        Drop a message
                      </span>
                      <span className="text-sm font-semibold font-heading text-navy dark:text-white transition-colors">
                        founder@beyondbound.co
                      </span>
                    </div>
                  </div>
                  <LuArrowUpRight size={16} className="text-navy/20 dark:text-white/20 group-hover:text-navy dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>

                {/* Beyond Bound Connect Card */}
                <a
                  href="https://beyondbound.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-navy/10 dark:border-white/[0.07] bg-navy/[0.01] dark:bg-white/[0.02] hover:bg-navy/[0.03] dark:hover:bg-white/[0.04] hover:border-navy/20 dark:hover:border-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 text-[#10B981] flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                      <LuActivity size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-heading font-medium text-navy/40 dark:text-white/40 uppercase tracking-wider mb-0.5">
                        Metabolic wellness venture
                      </span>
                      <span className="text-sm font-semibold font-heading text-navy dark:text-white transition-colors">
                        Beyond Bound
                      </span>
                    </div>
                  </div>
                  <LuArrowUpRight size={16} className="text-navy/20 dark:text-white/20 group-hover:text-navy dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Bottom Bar Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-navy/40 dark:text-white/40 font-body">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
              <span>&copy; 2026 Priyanshu Chauhan. All rights reserved.</span>
              <span className="text-navy/10 dark:text-white/10 hidden sm:inline">|</span>
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-navy dark:hover:text-white cursor-pointer transition-colors duration-200">Privacy Policy</button>
              <span className="text-navy/10 dark:text-white/10 hidden sm:inline">|</span>
              <a href="#" className="hover:text-navy dark:hover:text-white cursor-pointer transition-colors duration-200">Terms of Use</a>
            </div>
            
            <div className="flex items-center gap-2 text-center sm:text-right">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              <span className="italic font-medium text-navy/50 dark:text-white/50 tracking-wider">
                Built with purpose, innovation, and long-term thinking.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MOBILE FOOTER — visible only below md (COMPATIBLE WITH LIGHT/DARK)
          ════════════════════════════════════════════════════════════════ */}
      <div className="block md:hidden">
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px'
          }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-teal/[0.03] dark:bg-teal/[0.04] rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" />

        <div className="relative z-10 px-6 pt-16 pb-10">

          {/* ── Section 1: Founder Card ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-40px' }}
            variants={containerVariants}
            className="text-center mb-14"
          >
            {/* Glow behind name */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-teal/5 dark:bg-teal/[0.08] rounded-full blur-2xl pointer-events-none scale-150" />
              <motion.h3
                variants={fadeUp}
                className="relative font-heading font-bold text-2xl text-navy dark:text-white tracking-tight mb-1.5"
              >
                Priyanshu Chauhan
              </motion.h3>
            </div>

            <motion.p
              variants={fadeUp}
              className="font-heading text-[10px] text-accent uppercase tracking-[0.25em] font-semibold mb-5"
            >
              Founder & CEO, Beyond Bound®
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-body text-sm text-navy/60 dark:text-white/50 leading-relaxed max-w-[280px] mx-auto"
            >
              Building India's most trusted metabolic health brand.
            </motion.p>
          </motion.div>


          {/* ── Section 3: Quick Actions ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-40px' }}
            variants={containerVariants}
            className="space-y-3 mb-14"
          >
            {mobileActions.map((action, idx) => (
              <motion.a
                key={idx}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                variants={fadeUp}
                className="flex items-center justify-between w-full min-h-[48px] px-5 py-3.5 rounded-2xl border border-navy/10 dark:border-white/[0.07] bg-navy/[0.01] dark:bg-white/[0.02] hover:bg-navy/5 dark:hover:bg-white/[0.05] hover:border-navy/20 dark:hover:border-white/[0.12] transition-all duration-300 cursor-pointer group"
              >
                <span className="font-heading text-sm font-medium text-navy/70 dark:text-white/60 group-hover:text-navy dark:group-hover:text-white transition-colors duration-300 tracking-wide">
                  {action.label}
                </span>
                <span className="text-navy/20 dark:text-white/20 group-hover:text-[#10B981] dark:group-hover:text-accent text-xs transition-colors duration-300">↗</span>
              </motion.a>
            ))}
          </motion.div>

          {/* ── Section 4: Founder Philosophy ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-40px' }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="w-8 h-[1px] bg-navy/10 dark:bg-accent/20 mx-auto mb-5" />

            <div className="h-8 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activePhilosophy}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-sm text-teal dark:text-accent/70 tracking-wide"
                >
                  {philosophyLines[activePhilosophy]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="w-8 h-[1px] bg-navy/10 dark:bg-accent/20 mx-auto mt-5" />
          </motion.div>

          {/* ── Section 5: Copyright ── */}
          <div className="text-center space-y-2">
            <p className="font-heading text-[10px] text-navy/40 dark:text-white/20 tracking-wide">
              &copy; 2026 Priyanshu Chauhan
            </p>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="font-body text-[10px] text-navy/40 dark:text-white/25 hover:text-navy dark:hover:text-white/50 transition-colors duration-200 cursor-pointer"
            >
              Privacy Policy
            </button>
            <p className="font-body text-[10px] text-navy/30 dark:text-white/15 italic leading-relaxed tracking-wide">
              Built with purpose, innovation,<br />and long-term thinking.
            </p>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          PRIVACY POLICY MODAL — inline
          ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[rgba(15,23,42,0.50)] backdrop-blur-[2px]"
              onClick={() => setIsPrivacyOpen(false)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-modal-title"
              className="relative z-10 bg-white flex flex-col overflow-hidden w-full h-full md:w-[90vw] md:max-w-[880px] md:h-auto md:max-h-[84vh] md:rounded-[22px] md:border md:border-[#E9E9E9] md:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.08)] rounded-t-[20px]"
            >
              {/* Fixed Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 lg:px-10 pt-6 sm:pt-7 pb-5 border-b border-[#F1F5F9] shrink-0 bg-white z-10">
                <div>
                  <h2 id="privacy-modal-title" className="font-heading font-bold text-[28px] sm:text-[34px] text-[#0F172A] tracking-tight leading-none">
                    Privacy Policy
                  </h2>
                  <p className="font-body text-[13px] text-[#94A3B8] mt-1.5 tracking-wide">
                    Last Updated: July 2026 · Effective Date: July 2026
                  </p>
                </div>
                <button
                  onClick={() => setIsPrivacyOpen(false)}
                  aria-label="Close privacy policy"
                  className="w-[42px] h-[42px] rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 text-[#94A3B8] hover:text-[#0F172A] hover:border-[#CBD5E1] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer ml-4"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div ref={privacyContentRef} className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 lg:px-10 py-8 sm:py-10 privacy-scroll">

                {/* Callout: Privacy Comes First */}
                <div className="bg-[#F0FDFA] border-l-[4px] border-[#0F766E] rounded-xl px-6 sm:px-7 py-6 mb-10">
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-3">Privacy Comes First</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">
                    This Privacy Policy explains how Priyanshu Chauhan ("I", "me", or "my") collects, uses, and protects information when you visit{' '}
                    <a href="https://priyanshuchauhan.com" target="_blank" rel="noopener noreferrer" className="text-[#0F766E] font-medium hover:underline underline-offset-[3px] decoration-[#0F766E]/30 transition-all duration-200">priyanshuchauhan.com</a> (the "Website").
                  </p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">
                    I believe privacy should be simple and transparent. This policy is written in plain language because it reflects how I actually handle visitor information—not just what legal documents typically say.
                  </p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">
                    This Website exists to share my work, entrepreneurial journey, and the vision behind <a href="https://beyondbound.co" target="_blank" rel="noopener noreferrer" className="text-[#0F766E] font-medium hover:underline underline-offset-[3px] decoration-[#0F766E]/30 transition-all duration-200">Beyond Bound</a>. It is not intended to provide medical, nutritional, or professional advice.
                  </p>
                </div>

                {/* Section 1 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">1. Who This Policy Applies To</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">
                    This Privacy Policy applies to anyone visiting <a href="https://priyanshuchauhan.com" target="_blank" rel="noopener noreferrer" className="text-[#0F766E] font-medium hover:underline underline-offset-[3px] decoration-[#0F766E]/30 transition-all duration-200">priyanshuchauhan.com</a>, regardless of how you arrived here—whether through search engines, LinkedIn, social media, or direct links.
                  </p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">By continuing to browse this Website, you acknowledge that you have read and understood this Privacy Policy.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 2 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">2. Information I Collect</h3>

                  <h4 className="font-heading font-medium text-[17px] sm:text-[18px] text-[#0F172A] tracking-tight mt-6 mb-3">2.1 Information You Provide</h4>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">
                    If you choose to contact me via email at <a href="mailto:founder@beyondbound.co" className="text-[#0F766E] font-medium hover:underline underline-offset-[3px] decoration-[#0F766E]/30 transition-all duration-200">founder@beyondbound.co</a>, I may receive:
                  </p>
                  <ul className="space-y-[14px] mt-4 mb-2 pl-1">
                    {['Your name', 'Your email address', 'The contents of your message'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-[7px] h-[7px] rounded-full bg-[#0F766E] mt-[9px] shrink-0" /><span className="text-[#334155] leading-[1.8] text-[15px] md:text-base font-body">{item}</span></li>
                    ))}
                  </ul>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">I do not operate a contact form that stores submissions in a database. Communication happens directly through email.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">Your information is never added to a marketing database or CRM unless you explicitly request ongoing communication.</p>

                  <h4 className="font-heading font-medium text-[17px] sm:text-[18px] text-[#0F172A] tracking-tight mt-8 mb-3">2.2 Information Collected Automatically</h4>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">Like most websites, certain technical information may be collected automatically by the hosting platform or analytics tools, including:</p>
                  <ul className="space-y-[14px] mt-4 mb-2 pl-1">
                    {['Browser type and version', 'Device type (desktop, mobile, tablet)', 'Pages visited', 'Time spent on the Website', 'Referring website', 'Country or region (approximate)', 'IP address (where required for security or anonymized analytics)'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-[7px] h-[7px] rounded-full bg-[#0F766E] mt-[9px] shrink-0" /><span className="text-[#334155] leading-[1.8] text-[15px] md:text-base font-body">{item}</span></li>
                    ))}
                  </ul>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">This information helps improve the Website's performance, usability, and reliability. It is not used to personally identify visitors.</p>

                  <h4 className="font-heading font-medium text-[17px] sm:text-[18px] text-[#0F172A] tracking-tight mt-8 mb-3">2.3 Information I Do Not Collect</h4>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">To be completely transparent, this Website does <strong className="font-semibold text-[#0F172A]">not</strong> collect:</p>
                  <ul className="space-y-[14px] mt-4 mb-2 pl-1">
                    {['Payment or financial information', 'Health or medical records', 'Login credentials (there are no user accounts)', 'Sensitive personal information', 'Information knowingly provided by children under 18'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-[7px] h-[7px] rounded-full bg-[#0F766E] mt-[9px] shrink-0" /><span className="text-[#334155] leading-[1.8] text-[15px] md:text-base font-body">{item}</span></li>
                    ))}
                  </ul>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">Product purchases, if any, occur through third-party platforms such as Amazon, which have their own privacy policies.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 3 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">3. How Your Information Is Used</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">Any information collected is used only to:</p>
                  <ul className="space-y-[14px] mt-4 mb-2 pl-1">
                    {['Respond to your enquiries or messages', 'Improve the Website and visitor experience', 'Monitor performance and fix technical issues', 'Maintain security', 'Comply with applicable legal obligations'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-[7px] h-[7px] rounded-full bg-[#0F766E] mt-[9px] shrink-0" /><span className="text-[#334155] leading-[1.8] text-[15px] md:text-base font-body">{item}</span></li>
                    ))}
                  </ul>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-5">I do <strong className="font-semibold text-[#0F172A]">not</strong>:</p>
                  <ul className="space-y-[14px] mt-4 mb-2 pl-1">
                    {['Sell personal information', 'Rent visitor data', 'Share information for advertising purposes', 'Build marketing profiles about visitors'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-[7px] h-[7px] rounded-full bg-[#0F766E] mt-[9px] shrink-0" /><span className="text-[#334155] leading-[1.8] text-[15px] md:text-base font-body">{item}</span></li>
                    ))}
                  </ul>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 4 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">4. Third-Party Services</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">This Website relies on trusted third-party services to operate. These may include:</p>
                  <ul className="space-y-[14px] mt-4 mb-2 pl-1">
                    {[
                      <><strong className="font-semibold text-[#0F172A]">Vercel</strong> — Website hosting and infrastructure</>,
                      <><strong className="font-semibold text-[#0F172A]">Analytics tools</strong> — Anonymous usage statistics to understand visitor behaviour</>,
                      <><strong className="font-semibold text-[#0F172A]">LinkedIn</strong> — External profile links</>,
                      <><strong className="font-semibold text-[#0F172A]">Amazon.in</strong> — Product purchase links</>
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-[7px] h-[7px] rounded-full bg-[#0F766E] mt-[9px] shrink-0" /><span className="text-[#334155] leading-[1.8] text-[15px] md:text-base font-body">{item}</span></li>
                    ))}
                  </ul>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">Each third-party service operates under its own Privacy Policy. If additional services are introduced in the future, this section will be updated accordingly.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 5 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">5. Cookies</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">This Website may use cookies for limited purposes, including:</p>
                  <ul className="space-y-[14px] mt-4 mb-2 pl-1">
                    {['Remembering interface preferences (such as theme settings)', 'Anonymous analytics to understand how visitors use the Website'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-[7px] h-[7px] rounded-full bg-[#0F766E] mt-[9px] shrink-0" /><span className="text-[#334155] leading-[1.8] text-[15px] md:text-base font-body">{item}</span></li>
                    ))}
                  </ul>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">No advertising cookies or behavioural tracking technologies are used.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">You may disable cookies through your browser settings at any time. Doing so may affect certain preference-related features but will not prevent access to the Website.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 6 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">6. Data Retention</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">Email correspondence is retained only for as long as reasonably necessary to respond to enquiries and maintain communication, typically up to <strong className="font-semibold text-[#0F172A]">two years</strong>, unless deletion is requested sooner.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">Analytics information is retained according to the settings of the analytics provider being used.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">If you would like your information removed, please contact me at <a href="mailto:founder@beyondbound.co" className="text-[#0F766E] font-medium hover:underline underline-offset-[3px] decoration-[#0F766E]/30 transition-all duration-200">founder@beyondbound.co</a>. I will make reasonable efforts to process your request within <strong className="font-semibold text-[#0F172A]">30 days</strong>.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 7 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">7. Your Privacy Rights</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">You may request to:</p>
                  <ul className="space-y-[14px] mt-4 mb-2 pl-1">
                    {['Know what personal information I hold about you', 'Correct inaccurate information', 'Request deletion of your information', 'Withdraw consent for future communication'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-[7px] h-[7px] rounded-full bg-[#0F766E] mt-[9px] shrink-0" /><span className="text-[#334155] leading-[1.8] text-[15px] md:text-base font-body">{item}</span></li>
                    ))}
                  </ul>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">To make any request, email <a href="mailto:founder@beyondbound.co" className="text-[#0F766E] font-medium hover:underline underline-offset-[3px] decoration-[#0F766E]/30 transition-all duration-200">founder@beyondbound.co</a> with the subject line: <span className="text-[#0F766E] font-medium">Privacy Request</span>.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">I will make reasonable efforts to respond within <strong className="font-semibold text-[#0F172A]">30 days</strong>.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 8 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">8. Data Security</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">Reasonable technical and organisational measures are used to protect the limited information this Website receives.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">The Website is served over secure HTTPS connections, and email communication relies on standard encrypted mail infrastructure where supported.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">While every reasonable effort is made to protect your information, no internet-based service can guarantee absolute security.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 9 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">9. Children's Privacy</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">This Website is intended for a general audience and is not directed toward children under the age of 18.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">I do not knowingly collect personal information from minors. If you believe information has been submitted by a child, please contact me so that it can be removed promptly.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 10 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">10. Applicable Law</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">This Privacy Policy is governed by applicable laws of India, including the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023, where relevant.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">Regardless of where visitors are located, I aim to follow widely accepted privacy principles including transparency, data minimisation, responsible data handling, and respect for user privacy.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 11 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">11. Changes to This Policy</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">This Privacy Policy may be updated occasionally to reflect improvements to the Website or changes in applicable practices.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">Any updates will be reflected by revising the <strong className="font-semibold text-[#0F172A]">Last Updated</strong> date shown at the top of this page.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">Continued use of the Website after updates indicates acceptance of the revised policy.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 12 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">12. Intellectual Property</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">Unless otherwise stated, all original content on this Website—including written material, graphics, branding, design, photographs, and other creative assets—is the intellectual property of Priyanshu Chauhan.</p>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8] mt-4">Please do not reproduce, redistribute, or republish content without prior written permission.</p>
                </section>
                <div className="w-full h-[1px] bg-[#F1F5F9] my-10 md:my-12" />

                {/* Section 13 */}
                <section>
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0F172A] tracking-tight mb-4">13. Contact</h3>
                  <p className="font-body text-[15px] md:text-base text-[#334155] leading-[1.8]">If you have any questions regarding this Privacy Policy or your personal information, you may contact me at:</p>
                  <div className="mt-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="font-heading font-medium text-[14px] text-[#94A3B8] w-[70px] shrink-0 pt-[2px]">Email</span>
                      <a href="mailto:founder@beyondbound.co" className="text-[#0F766E] font-medium hover:underline underline-offset-[3px] decoration-[#0F766E]/30 transition-all duration-200">founder@beyondbound.co</a>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-heading font-medium text-[14px] text-[#94A3B8] w-[70px] shrink-0 pt-[2px]">Website</span>
                      <a href="https://priyanshuchauhan.com" target="_blank" rel="noopener noreferrer" className="text-[#0F766E] font-medium hover:underline underline-offset-[3px] decoration-[#0F766E]/30 transition-all duration-200">priyanshuchauhan.com</a>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-heading font-medium text-[14px] text-[#94A3B8] w-[70px] shrink-0 pt-[2px]">Brand</span>
                      <span className="text-[#0F766E] font-medium font-body">Beyond Bound®</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-heading font-medium text-[14px] text-[#94A3B8] w-[70px] shrink-0 pt-[2px]">Location</span>
                      <span className="text-[#334155] font-body">Mumbai, Maharashtra, India</span>
                    </div>
                  </div>
                </section>

                {/* Modal Footer */}
                <div className="mt-16 pt-8 border-t border-[#F1F5F9] text-center space-y-3 pb-4">
                  <p className="font-heading font-medium text-[15px] text-[#475569]">Questions about your privacy?</p>
                  <p className="font-body text-[14px]">
                    <a href="mailto:founder@beyondbound.co" className="text-[#0F766E] font-medium hover:underline underline-offset-[3px] decoration-[#0F766E]/30 transition-all duration-200">founder@beyondbound.co</a>
                  </p>
                  <p className="font-body text-[13px] text-[#94A3B8] pt-1">
                    <span className="text-[#0F766E] font-medium">Beyond Bound®</span>
                    <span className="mx-2">·</span>
                    Mumbai, Maharashtra, India
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </footer>
  );
}
