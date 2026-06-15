import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';

const NAV_LINKS = [
  { label: 'Journey', id: 'journey' },
  { label: 'About', id: 'drives' },
  { label: "What I'm Building", id: 'building' },
  { label: 'Moments', id: 'moments' },
  { label: 'Vision', id: 'vision' },
  { label: 'Connect', id: 'connect' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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

      if (window.scrollY < 120) {
        setActiveSection('');
        return;
      }

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollSpy);
    
    // Run initially
    handleScroll();
    handleScrollSpy();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
        duration: 800
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-border py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('');
            }}
            className="font-heading text-2xl tracking-tight text-navy cursor-pointer flex items-center gap-1 group font-light"
          >
            <span className="font-bold group-hover:font-medium transition-weight">Priyanshu</span>
            <span className="text-teal group-hover:translate-x-0.5 transition-transform duration-300">.</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-body font-medium transition-colors duration-300 cursor-pointer relative py-1 ${
                    isActive ? 'text-teal font-semibold' : 'text-navy/70 hover:text-teal'
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
                </button>
              );
            })}
            <button
              onClick={() => scrollTo('connect')}
              className={`bg-teal text-white hover:bg-teal-dark font-body text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${
                activeSection === 'connect' ? 'ring-2 ring-teal ring-offset-2' : ''
              }`}
            >
              Connect
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-navy hover:text-teal p-1.5 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden bg-white border-b border-border shadow-lg"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left font-body font-medium py-2 border-b border-border/40 last:border-0 cursor-pointer ${
                    activeSection === link.id ? 'text-teal font-semibold' : 'text-navy/80'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('connect')}
                className="bg-teal text-white hover:bg-teal-dark font-body text-sm font-semibold text-center py-3 rounded-full mt-2 cursor-pointer shadow-sm"
              >
                Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

