import { motion } from 'framer-motion';
import {
  RiGraduationCapLine,
  RiBriefcaseLine,
  RiPulseLine,
  RiLeafLine,
  RiLineChartLine,
  RiCompassLine
} from 'react-icons/ri';

import mbaJourneyImg from '../assets/mba_journey.jpg';
import corporateLearningImg from '../assets/corporate_learning.png';
import aboutImg from '../assets/about.png';
import beyondboundImg from '../assets/beyondbound.jpg';
import glycomicsImg from '../assets/glycomics.png';
import visionImg from '../assets/vision.png';

export default function JourneyFrames() {
  const cards = [
    {
      title: 'MBA Foundation',
      metric: 'K J Somaiya Institute of Management',
      caption: 'Strategizing at the intersection of business principles and healthcare management, building structured leadership frameworks.',
      icon: RiGraduationCapLine,
      gradient: 'from-sage/60 via-sage to-accent/10',
      image: mbaJourneyImg
    },
    {
      title: 'Corporate Learning',
      metric: '₹14M+ Sales Contribution',
      caption: 'Executing scale sales strategy and distributor operations across Patanjali, Britannia, and Allied Market Research.',
      icon: RiBriefcaseLine,
      gradient: 'from-sage via-white to-accent/20',
      image: corporateLearningImg
    },
    {
      title: 'Discovering the Healthcare Gap',
      metric: 'Research Across Consumer & Healthcare Markets',
      caption: 'Observing the core disconnect between standard wellness products and the clinical validation required for real metabolic solutions.',
      icon: RiPulseLine,
      gradient: 'from-teal/5 via-sage/40 to-accent/10',
      image: aboutImg
    },
    {
      title: 'Building Beyond Bound',
      metric: 'MSME • GST • FSSAI • Trademark',
      caption: 'Formulating the foundational blocks of a trustworthy, scientific wellness brand centered on preventive metabolic care.',
      icon: RiLeafLine,
      gradient: 'from-sage/20 via-accent/5 to-teal/10',
      image: beyondboundImg
    },
    {
      title: 'Scaling the Vision',
      metric: 'Metabolic Wellness Focus',
      caption: 'Expanding distribution channels, designing product offerings for prediabetes, and scaling trust-first consumer engagement.',
      icon: RiLineChartLine,
      gradient: 'from-teal/10 via-sage to-accent/5',
      image: glycomicsImg
    },
    {
      title: 'Future Vision',
      metric: 'Building India\'s Most Trusted Wellness Ecosystem',
      caption: 'Pursuing the mission to make metabolic wellness accessible, science-backed, and integral to daily life.',
      icon: RiCompassLine,
      gradient: 'from-sage/40 via-accent/10 to-teal/20',
      image: visionImg
    }
  ];

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const imageScale = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="journey" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            Storytelling
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            The Journey
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4"></div>
        </div>

        {/* Story Cards List */}
        <div className="space-y-20 max-w-5xl mx-auto">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Visual Image Frame (70%) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={imageScale}
                  className="w-full md:w-3/5 aspect-[16/10] rounded-3xl border border-accent/20 p-2.5 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
                >
                  {card.image ? (
                    <div className="w-full h-full rounded-2xl relative overflow-hidden group">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent rounded-2xl" />
                    </div>
                  ) : (
                    <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${card.gradient} flex flex-col justify-center items-center p-8 relative overflow-hidden group`}>
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.08] pointer-events-none">
                        {Array(24).fill(0).map((_, gridIdx) => (
                          <div key={gridIdx} className="border-t border-l border-navy"></div>
                        ))}
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm border border-accent/30 flex items-center justify-center text-teal shadow-sm relative z-10"
                      >
                        <Icon size={28} />
                      </motion.div>
                    </div>
                  )}

                  {/* Editorial Reveal Shutter Mask */}
                  <motion.div
                    initial={{ x: 0 }}
                    whileInView={{ x: isEven ? '100%' : '-100%' }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0 bg-sage z-20 pointer-events-none"
                  />
                </motion.div>

                {/* Minimal Text / Caption (30%) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={isEven ? slideInRight : slideInLeft}
                  className="w-full md:w-2/5 text-left space-y-4"
                >
                  <span className="text-teal text-xs font-heading font-semibold uppercase tracking-widest block">
                    Frame 0{idx + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy tracking-tight leading-tight">
                    {card.title}
                  </h3>
                  
                  {/* Badge Proof Point */}
                  <div className="inline-block bg-teal/5 border border-teal/15 text-teal text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider font-heading">
                    {card.metric}
                  </div>

                  <div className="h-[1px] w-8 bg-accent mt-2"></div>
                  <p className="font-body text-navy/70 text-sm sm:text-base leading-relaxed pt-1">
                    {card.caption}
                  </p>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
