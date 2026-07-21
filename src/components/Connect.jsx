import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
              <a href="#" className="hover:text-navy dark:hover:text-white cursor-pointer transition-colors duration-200">Privacy Policy</a>
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
            <p className="font-body text-[10px] text-navy/30 dark:text-white/15 italic leading-relaxed tracking-wide">
              Built with purpose, innovation,<br />and long-term thinking.
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}
