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
      story: 'My MBA journey at KJ Somaiya Institute of Management helped me build a strong foundation in strategy, healthcare management, marketing, and business development. During this phase, I explored entrepreneurship, collaborated on industry projects, and developed the mindset required to solve real-world business challenges.',
      keyLearnings: [
        'Healthcare Management Strategy',
        'Corporate & Business Strategy',
        'Consumer Marketing & Branding',
        'Leadership & Cross-Functional Teamwork',
        'Secondary Market Research Methods'
      ],
      highlights: [
        'MBA Specialization in Healthcare Management',
        'Direct exposure to healthcare and consumer-facing sectors',
        'Collaboration on active industry consulting and strategic planning cases'
      ],
      skills: ['Strategy', 'Leadership', 'Problem Solving', 'Market Research', 'Teamwork']
    },
    {
      label: 'Corporate Learning',
      icon: RiBriefcaseLine,
      gradient: 'from-sage/20 to-accent/10',
      image: corporateLearningImg,
      tagline: 'Execution & Industry Insights',
      story: 'My professional tenure in corporate settings—ranging from Patanjali Ayurveda to Allied Market Research and Britannia Industries—has been a masterclass in market execution and commercial operations. I managed distributor relations, conducted in-depth healthcare market analysis, and drove significant sales growth.',
      keyLearnings: [
        'B2B Sales Operations & Channel Management',
        'Regional Market Penetration & Expansion Planning',
        'Secondary Healthcare & Pharma Market Analysis',
        'Consumer Goods Sales Execution & Auditing'
      ],
      highlights: [
        'Achieved sales worth approximately ₹14 million at Patanjali Ayurveda',
        'Led primary database curation and pharmaceutical market forecasting',
        'Supported energy bar product launches and retail field operations'
      ],
      skills: ['Sales Strategy', 'B2B Relationships', 'Market Intelligence', 'Distributor Channels', 'Healthcare Research']
    },
    {
      label: 'Healthcare Entrepreneurship',
      icon: RiHeartPulseLine,
      gradient: 'from-teal/5 to-sage/40',
      image: healthcareEntrepreneurshipImg,
      tagline: 'Beyond Bound Wellness Venture',
      story: 'Founding Beyond Bound has been the ultimate test of translating vision into execution. I established a nutraceutical and Ayurvedic wellness venture from the ground up, navigating regulatory requirements, product formulation, e-commerce operations, and brand strategy. Today, we are transitioning to a metabolic wellness-focused brand.',
      keyLearnings: [
        'Metabolic Health & Preventive Innovation',
        'Regulatory Pathways (FSSAI, MSME, Trademark)',
        'D2C Brand Building & E-commerce Operations',
        'Ayurvedic and Nutraceutical Product Formulation'
      ],
      highlights: [
        'Founded Beyond Bound and secured MSME & GST registrations',
        'Successfully completed FSSAI certifications and Trademark protections',
        'Designed metabolic wellness product lines addressing prediabetes'
      ],
      vision: "To build India's most trusted metabolic wellness company by combining traditional wisdom, scientific validation, and consumer-centric innovation.",
      skills: ['Entrepreneurship', 'Leadership', 'Product Strategy', 'Brand Building', 'Healthcare Innovation']
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
    <section id="moments" className="py-24 bg-sage/15 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            Moments & Milestones
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4"></div>
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
                className="group border border-accent/20 rounded-3xl p-2.5 bg-white shadow-sm hover:shadow-xl transition-all duration-300 aspect-square overflow-hidden cursor-pointer"
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
                      <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-sm border border-accent/20 flex items-center justify-center text-teal group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10">
                        <Icon size={22} />
                      </div>
                    </>
                  )}

                  {/* Absolute Caption Overlay */}
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-[2px]">
                    <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/10 flex items-center justify-center text-white mb-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
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
              className="bg-white border border-accent/20 rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col scrollbar-thin scrollbar-thumb-teal scrollbar-track-sage"
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
              <div className="p-6 sm:p-10 flex-1 space-y-8 bg-[#FAF9F6] text-left">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  {/* Left Column: Story */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-teal font-semibold font-heading mb-3 border-b border-teal/10 pb-1.5">
                        The Story
                      </h4>
                      <p className="text-navy/80 text-sm sm:text-base leading-relaxed font-body">
                        {current.story}
                      </p>
                    </div>

                    {current.vision && (
                      <div className="p-5 bg-teal/5 border-l-4 border-accent rounded-r-2xl space-y-2">
                        <span className="text-[10px] uppercase tracking-wider text-accent font-bold font-heading block">
                          Core Vision
                        </span>
                        <p className="text-navy font-heading font-medium italic text-sm sm:text-base leading-relaxed">
                          "{current.vision}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Learnings and Highlights */}
                  <div className="md:col-span-5 space-y-6">
                    {/* Key Learnings */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-teal font-semibold font-heading mb-3 border-b border-teal/10 pb-1.5">
                        Key Learnings
                      </h4>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-navy/75 font-body">
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
                      <h4 className="text-xs uppercase tracking-wider text-teal font-semibold font-heading mb-3 border-b border-teal/10 pb-1.5">
                        Highlights & Impact
                      </h4>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-navy/75 font-body">
                        {current.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal mt-2 shrink-0"></span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="border-t border-border/60 pt-6">
                  <h4 className="text-xs uppercase tracking-wider text-teal font-semibold font-heading mb-3.5">
                    Skills Gained
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {current.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 0 12px rgba(13, 115, 119, 0.25)',
                          borderColor: 'rgba(13, 115, 119, 0.5)'
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="bg-white border border-teal/20 text-teal-dark px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-sm transition-colors duration-200 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-border/40 bg-white p-4 px-6 sm:px-10 flex items-center justify-between sticky bottom-0 z-20">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-wider text-navy/60 hover:text-teal font-semibold transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed group cursor-pointer"
                  disabled={activeIdx === 0}
                >
                  <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform duration-200" size={14} />
                  <span>Previous</span>
                </button>

                <div className="text-xs font-heading font-bold text-navy/70 uppercase tracking-widest">
                  0{activeIdx + 1} / 0{items.length}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-wider text-navy/60 hover:text-teal font-semibold transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed group cursor-pointer"
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

