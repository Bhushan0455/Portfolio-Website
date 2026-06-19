import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiGraduationCapLine,
  RiBriefcaseLine,
  RiHeartPulseLine,
  RiCloseLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from 'react-icons/ri';
import mbaJourneyImg from '../assets/mba_journey.jpg';
import corporateLearningImg from '../assets/corporate_learning.png';
import healthcareEntrepreneurshipImg from '../assets/healthcare_entrepreneurship.jpg';

export default function MomentsMilestones() {
  const [activeIdx, setActiveIdx] = useState(null);

  const items = [
    {
      label: 'MBA Journey',
      icon: RiGraduationCapLine,
      gradient: 'from-sage/40 to-teal/10',
      image: mbaJourneyImg,
      tagline: 'K J Somaiya Institute of Management',
      story: 'My MBA at K J Somaiya was where my strategic thinking took structure. Immersed in healthcare management and consumer behavior, I worked on frameworks to dissect complex commercial challenges. It was here I realized that the future of wellness lies in prevention rather than cure, and this academic foundation gave me the tools to build health solutions from first principles.',
      keyLearnings: [
        'Structuring healthcare business models',
        'Analyzing consumer buying behavior',
        'Designing corporate strategies',
        'Managing cross-functional operations'
      ],
      highlights: [
        'Specialized in Healthcare Management at KJ Somaiya',
        'Co-created strategic blueprints for commercial planning cases',
        'Validated consumer health frameworks during management competitions'
      ]
    },
    {
      label: 'Corporate Learning',
      icon: RiBriefcaseLine,
      gradient: 'from-sage/20 to-accent/10',
      image: corporateLearningImg,
      tagline: 'Execution & Industry Insights',
      story: 'My corporate experience across Patanjali Ayurveda, Allied Market Research, and Britannia Industries was an intensive study of execution. At Patanjali, I directed sales operations and distributor networks, learning how product flows at scale. At Allied Research, I forecast pharmaceutical pipelines and analyzed healthcare databases, learning how to back business strategy with rigorous market intelligence.',
      keyLearnings: [
        'Executing B2B distributor channel sales',
        'Analyzing pharmaceutical market intelligence',
        'Managing regional product supply chains',
        'Auditing retail brand execution'
      ],
      highlights: [
        'Managed regional distributor channels for Patanjali Ayurveda',
        'Curated global pharmaceutical and healthcare market pipeline reports',
        'Audited retail sales operations for Britannia Industries'
      ]
    },
    {
      label: 'Healthcare Entrepreneurship',
      icon: RiHeartPulseLine,
      gradient: 'from-teal/5 to-sage/40',
      image: healthcareEntrepreneurshipImg,
      tagline: 'Beyond Bound® Wellness Venture',
      story: 'Building Beyond Bound® has been my hands-on lesson in founder execution. I navigated FSSAI licensing, secured trademark protection, and set up the supply chain from scratch. The centerpiece of this journey was presenting and pitching our metabolic wellness thesis at the startup exhibition, defending our metabolic health solutions to investors. This experience proved that credibility is earned through data and execution, not marketing.',
      keyLearnings: [
        'Securing FSSAI, MSME, and Trademark registrations',
        'Formulating metabolic wellness product lines',
        'Directing D2C and e-commerce channel operations',
        'Pitching and presenting wellness innovation to investors'
      ],
      highlights: [
        'Presented Beyond Bound® at the national startup exhibition',
        'Secured all regulatory and intellectual property certifications',
        'Transitioned product line to a data-backed metabolic health model'
      ],
      vision: "To build India's most trusted metabolic wellness company by combining traditional wisdom, scientific validation, and consumer-centric innovation."
    },
  ];

  const current = activeIdx !== null ? items[activeIdx] : null;

  // Lock page scrolling when modal is open
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeIdx]);

  // ESC and Arrow Key Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') {
        setActiveIdx(null);
      } else if (e.key === 'ArrowRight' && activeIdx < items.length - 1) {
        setActiveIdx(activeIdx + 1);
      } else if (e.key === 'ArrowLeft' && activeIdx > 0) {
        setActiveIdx(activeIdx - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  const handleNext = (e) => {
    e.stopPropagation();
    if (activeIdx < items.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    }
  };

  const revealVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="moments" className="py-24 bg-sage/15 dark:bg-[#081220] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal dark:text-teal-light">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy dark:text-white tracking-tight mt-2">
            Moments & Milestones
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4"></div>
          <p className="font-body text-xs text-navy/50 dark:text-white/50 italic mt-6 max-w-xl mx-auto leading-relaxed">
            "There's a version of this section where I tell you about exponential growth curves..."
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={revealVariants}
                onClick={() => setActiveIdx(idx)}
                className="group border border-accent/20 dark:border-white/10 rounded-3xl p-2.5 bg-white dark:bg-[#0e1f35]/30 shadow-sm dark:shadow-none hover:shadow-xl transition-all duration-300 aspect-square overflow-hidden cursor-pointer"
              >
                <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${item.gradient} flex flex-col justify-center items-center relative overflow-hidden`}>
                  
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]"
                    />
                  ) : (
                    <>
                      {/* Subtle Grid Lines */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.04] pointer-events-none">
                        {Array(16).fill(0).map((_, gridIdx) => (
                          <div key={gridIdx} className="border-t border-l border-navy"></div>
                        ))}
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-[#081220]/70 backdrop-blur-sm border border-accent/20 dark:border-white/10 flex items-center justify-center text-teal dark:text-teal-light group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10">
                        <Icon size={22} />
                      </div>
                    </>
                  )}

                  {/* Absolute Caption Overlay */}
                  <div className="absolute inset-0 bg-navy/60 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-[2px]">
                    <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-white/10 border border-white/10 flex items-center justify-center text-white mb-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <Icon size={18} />
                    </div>
                    <span className="font-heading font-bold text-white text-base sm:text-lg uppercase tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-[50ms]">
                      {item.label}
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Story Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0b1625] border border-accent/20 dark:border-white/10 rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col scrollbar-thin scrollbar-thumb-teal scrollbar-track-sage"
            >
              {/* Large Milestone Image / Header */}
              <div className="w-full h-48 sm:h-64 md:h-80 relative overflow-hidden bg-sage shrink-0">
                <motion.img
                  src={current.image}
                  alt={current.label}
                  initial={{ scale: 1.1, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                
                {/* Floating Title / Tagline */}
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-white z-10 pr-16">
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-1 block font-heading">
                    {current.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-bold font-heading text-white tracking-tight">
                    {current.label}
                  </h3>
                </div>

                {/* Floating Close Button */}
                <button
                  onClick={() => setActiveIdx(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95 cursor-pointer z-30"
                  aria-label="Close modal"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>

              {/* Modal Body Info */}
              <div className="p-6 sm:p-10 flex-1 space-y-8 bg-[#FAF9F6] dark:bg-[#0b1625] text-left">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  {/* Left Column: Story */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-teal dark:text-teal-light font-semibold font-heading mb-3 border-b border-teal/10 dark:border-teal-light/10 pb-1.5">
                        The Story
                      </h4>
                      <p className="text-navy/80 dark:text-white/80 text-sm sm:text-base leading-relaxed font-body">
                        {current.story}
                      </p>
                    </div>

                    {current.vision && (
                      <div className="p-5 bg-teal/5 dark:bg-teal-light/5 border-l-4 border-accent rounded-r-2xl space-y-2">
                        <span className="text-[10px] uppercase tracking-wider text-accent font-bold font-heading block">
                          Core Vision
                        </span>
                        <p className="text-navy dark:text-white font-heading font-medium italic text-sm sm:text-base leading-relaxed">
                          "{current.vision}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Learnings and Highlights */}
                  <div className="md:col-span-5 space-y-6">
                    {/* Key Learnings */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-teal dark:text-teal-light font-semibold font-heading mb-3 border-b border-teal/10 dark:border-teal-light/10 pb-1.5">
                        Key Learnings
                      </h4>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-navy/75 dark:text-white/75 font-body">
                        {current.keyLearnings.map((learning, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span>
                            <span>{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-teal dark:text-teal-light font-semibold font-heading mb-3 border-b border-teal/10 dark:border-teal-light/10 pb-1.5">
                        Highlights & Impact
                      </h4>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-navy/75 dark:text-white/75 font-body">
                        {current.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal dark:bg-teal-light mt-2 shrink-0"></span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Video for Healthcare Entrepreneurship */}
                {current.label === 'Healthcare Entrepreneurship' && (
                  <div className="border-t border-border/60 dark:border-white/10 pt-8 mt-2 text-left">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold font-heading block mb-3">
                      FEATURED FOUNDER MOMENT
                    </span>
                    <div className="w-full aspect-[16/9] rounded-2xl bg-[#0F2744] border border-white/10 relative overflow-hidden group shadow-lg">
                      <img 
                        src={current.image}
                        alt="Pitching video thumbnail"
                        className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xs transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 text-white select-none">
                        <div className="flex justify-between items-start">
                          <span className="bg-black/60 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
                            Startup Exhibition & Investor Pitch
                          </span>
                          <span className="bg-teal text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                            Live Recording
                          </span>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="w-14 h-14 rounded-full bg-white text-[#0F2744] flex items-center justify-center shadow-xl border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal group-hover:text-white cursor-pointer relative">
                            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:bg-teal/20" />
                            <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1/3 h-full bg-teal" />
                          </div>
                          <div className="flex justify-between items-center text-xs text-white/80">
                            <div className="flex items-center gap-4">
                              <span className="cursor-pointer hover:text-teal transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                </svg>
                              </span>
                              <span>01:42 / 05:00</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest opacity-60">
                              (Video frame placeholder - to be added)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-border/40 dark:border-white/10 bg-white dark:bg-[#0b1625] p-4 px-6 sm:px-10 flex items-center justify-between sticky bottom-0 z-20">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-wider text-navy/60 dark:text-white/60 hover:text-teal dark:hover:text-teal-light font-semibold transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed group cursor-pointer"
                  disabled={activeIdx === 0}
                >
                  <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform duration-200" size={14} />
                  <span>Previous</span>
                </button>

                <div className="text-xs font-heading font-bold text-navy/70 dark:text-white/70 uppercase tracking-widest">
                  0{activeIdx + 1} / 0{items.length}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-wider text-navy/60 dark:text-white/60 hover:text-teal dark:hover:text-teal-light font-semibold transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed group cursor-pointer"
                  disabled={activeIdx === items.length - 1}
                >
                  <span>Next</span>
                  <RiArrowRightLine className="group-hover:translate-x-1 transition-transform duration-200" size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
