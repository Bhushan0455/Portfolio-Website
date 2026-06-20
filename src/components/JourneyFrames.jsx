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
      metric: 'K J Somaiya — Healthcare Strategy',
      caption: 'I entered management studies to understand how systems scale. It taught me the frameworks of commercial strategy, but more importantly, it helped me understand how people make decisions about their health.',
      icon: RiGraduationCapLine,
      gradient: 'from-sage/60 via-sage to-accent/10',
      image: mbaJourneyImg
    },
    {
      title: 'Corporate Execution',
      metric: 'Patanjali • Britannia • Allied Research',
      caption: 'My time in sales and research operations was an intensive lesson in scale. I spearheaded distribution channels and analyzed pharma pipeline data, learning that strategy is meaningless without action.',
      icon: RiBriefcaseLine,
      gradient: 'from-sage via-white to-accent/20',
      image: corporateLearningImg
    },
    {
      title: 'The Market Gap',
      metric: "The problem wasn't a lack of products. It was a lack of clarity.",
      caption: 'Reviewing market data and speaking to consumers showed me that wellness brands were trying to solve everything. Few focused deeply on metabolism. People were left overwhelmed by conflicting advice, with no trusted destination for metabolic health.',
      icon: RiPulseLine,
      gradient: 'from-teal/5 via-sage/40 to-accent/10',
      image: aboutImg
    },
    {
      title: 'Building Beyond Bound®',
      metric: 'Testing Assumptions First',
      caption: "I launched my nutraceutical venture to bridge this gap. To test my assumptions, I spent months wearing a continuous glucose monitor, tracking my own metabolic responses and learning directly from the data. If I could not verify a formulation's impact on myself, I would never ask anyone else to trust it.",
      icon: RiLeafLine,
      gradient: 'from-sage/20 via-accent/5 to-teal/10',
      image: beyondboundImg
    },
    {
      title: 'Venture Growth',
      metric: 'FROM THESIS TO FORMULATION',
      caption: 'I chose depth over breadth. Rather than building another generic wellness brand, I focused Beyond Bound entirely on metabolic health. That focus led to Glycomics™, our first formulation. Before asking anyone else to trust it, I spent months studying my own metabolic responses through continuous glucose monitoring. The lesson was simple: trust should be built on evidence, not promises.',
      icon: RiLineChartLine,
      gradient: 'from-teal/10 via-sage to-accent/5',
      image: glycomicsImg
    },
    {
      title: 'Future Vision',
      metric: 'Trust Before Marketing',
      caption: "My goal isn't to build another supplement company. I want Beyond Bound to become a health brand where trust comes before marketing, evidence comes before claims, and people can turn to for absolute clarity about their metabolic health.",
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
    <section id="journey" className="pt-8 pb-16 md:pt-10 md:pb-24 bg-white dark:bg-[#081220] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal dark:text-teal-light">
            Storytelling
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy dark:text-white tracking-tight mt-2">
            The Journey
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4"></div>
        </div>

        {/* Story Cards List */}
        <div className="space-y-12 md:space-y-20 max-w-5xl mx-auto">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-16 ${isEven ? '' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Visual Image Frame (70%) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={imageScale}
                  className="w-full md:w-3/5 aspect-[16/10] rounded-3xl border border-accent/20 dark:border-white/10 p-2.5 bg-white dark:bg-[#0e1f35]/30 shadow-md dark:shadow-none hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
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
                    className="absolute inset-0 bg-sage dark:bg-navy-light/30 z-20 pointer-events-none"
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
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy dark:text-white tracking-tight leading-tight">
                    {card.title}
                  </h3>

                  {/* Badge Proof Point */}
                  <div className="inline-block bg-teal/5 dark:bg-teal-light/10 border border-teal/15 dark:border-teal-light/20 text-teal dark:text-teal-light text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider font-heading">
                    {card.metric}
                  </div>

                  <div className="h-[1px] w-8 bg-accent mt-2"></div>
                  <p className="font-body text-navy/70 dark:text-white/70 text-sm sm:text-base leading-relaxed pt-1">
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
