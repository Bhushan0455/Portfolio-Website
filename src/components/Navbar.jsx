import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuLine, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';

const NAV_LINKS = [
  { label: 'Story', id: 'story' },
  { label: 'Journey', id: 'journey' },
  { label: 'Insight', id: 'insight' },
  { label: 'Beyond Bound', id: 'building' },
  { label: 'Milestones', id: 'milestones' },
  { label: 'Lessons', id: 'lessons' },
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Vision', id: 'vision' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const scrollTo = (id) => {
    setIsOpen(false);

    // Update hash without page reload
    if (window.history.pushState) {
      window.history.pushState(null, null, `#${id}`);
    } else {
      window.location.hash = id;
    }

    if (id === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActiveSection('hero');
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 220; // Offset for detection

      // Check if scrolled to the very bottom
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('connect');
        if (window.location.hash !== '#connect') {
          window.history.replaceState(null, null, '#connect');
        }
        return;
      }

      if (window.scrollY < 120) {
        setActiveSection('hero');
        if (window.location.hash !== '#hero') {
          window.history.replaceState(null, null, '#hero');
        }
        return;
      }

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            if (window.location.hash !== `#${link.id}`) {
              window.history.replaceState(null, null, `#${link.id}`);
            }
            break;
          }
        }
      }
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        scrollTo(hashId);
      } else {
        scrollTo('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollSpy);
    window.addEventListener('hashchange', handleHashChange);

    // Run initially
    handleScroll();
    handleScrollSpy();

    // Check if there is a hash in the URL on mount/load
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(hashId);
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
      }, 400); // 400ms buffer to ensure layout stability after preloader completes

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scroll', handleScrollSpy);
        window.removeEventListener('hashchange', handleHashChange);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollSpy);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${isScrolled
          ? 'bg-white/90 dark:bg-navy/90 backdrop-blur-md border-b border-border dark:border-white/10 shadow-sm'
          : 'bg-transparent border-b border-transparent shadow-none'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className={`font-heading text-2xl tracking-tight cursor-pointer flex items-center gap-2 md:gap-2.5 group font-light transition-colors duration-300 ${isScrolled ? 'text-navy dark:text-white' : 'text-white'
              }`}
          >
            <img
              src="/favicon.png"
              alt="Priyanshu Chauhan Logo"
              className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex items-center">
              <span className="font-bold group-hover:font-medium transition-weight">Priyanshu</span>
              <span className="text-teal group-hover:translate-x-0.5 transition-transform duration-300">.</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.id);
                  }}
                  className={`text-sm font-body font-medium transition-colors duration-300 cursor-pointer relative py-1 ${isActive
                    ? 'text-teal font-semibold'
                    : isScrolled
                      ? 'text-navy/70 hover:text-teal dark:text-white/75 dark:hover:text-teal'
                      : 'text-white/80 hover:text-white'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center w-9 h-9 ${isScrolled
                ? 'border-border text-navy hover:text-teal hover:bg-sage/20 dark:border-white/10 dark:text-white dark:hover:text-teal-light dark:hover:bg-white/5'
                : 'border-white/20 text-white hover:bg-white/10'
                }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
            </button>

            <a
              href="#connect"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('connect');
              }}
              className={`font-body text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${isScrolled
                ? 'bg-teal text-white hover:bg-teal-dark'
                : 'bg-white text-black hover:bg-white/90'
                } ${activeSection === 'connect' ? 'ring-2 ring-teal ring-offset-2' : ''
                }`}
            >
              Connect
            </a>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center w-8 h-8 ${isScrolled
                ? 'border-border text-navy hover:text-teal dark:border-white/10 dark:text-white dark:hover:text-teal-light'
                : 'border-white/20 text-white hover:bg-white/10'
                }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 transition-colors cursor-pointer ${isScrolled
                ? 'text-navy dark:text-white hover:text-teal'
                : 'text-white hover:text-white/80'
                }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full z-40 md:hidden bg-white dark:bg-navy border-b border-border dark:border-white/10 shadow-lg"
            >
              <div className="px-6 py-8 flex flex-col gap-5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.id);
                    }}
                    className={`text-left font-body font-medium py-3 border-b border-border/40 dark:border-white/5 last:border-0 cursor-pointer block ${activeSection === link.id ? 'text-teal font-semibold' : 'text-navy/80 dark:text-white/80'
                      }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#connect"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('connect');
                  }}
                  className="bg-teal text-white hover:bg-teal-dark font-body text-sm font-semibold text-center py-3 rounded-full mt-2 cursor-pointer shadow-sm block"
                >
                  Connect
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

