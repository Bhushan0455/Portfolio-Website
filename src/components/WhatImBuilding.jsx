import { motion } from 'framer-motion';
import { RiLeafLine, RiPulseLine } from 'react-icons/ri';
import beyondboundImg from '../assets/beyondbound.jpg';
import glycomicsImg from '../assets/glycomics.png';

export default function WhatImBuilding() {
  const cards = [
    {
      title: 'Beyond Bound',
      tagline: 'Modern wellness rooted in trust.',
      desc: 'Building consumer health solutions inspired by Ayurveda and informed by scientific thinking.',
      icon: RiLeafLine,
      gradient: 'from-sage/40 via-sage to-teal/10',
      status: 'Current Focus',
      image: beyondboundImg
    },
    {
      title: 'Glycomics',
      tagline: 'Rethinking metabolic health through prevention.',
      desc: 'Exploring better approaches to support healthier lifestyles.',
      icon: RiPulseLine,
      gradient: 'from-sage/20 via-accent/5 to-accent/20',
      status: 'Initiative',
      image: glycomicsImg
    }
  ];

  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="building" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            My Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            What I'm Building
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4"></div>
        </div>

        {/* Feature Blocks Stack */}
        <div className="space-y-16 max-w-5xl mx-auto">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={revealVariants}
                whileHover={{ y: -5 }}
                className={`flex flex-col md:flex-row gap-10 lg:gap-16 items-center bg-white border border-border/80 hover:border-teal/30 p-6 sm:p-8 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-navy/5 relative group/card ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Visual Image Frame (65% width) */}
                <div className="w-full md:w-3/5 aspect-[16/10] border border-accent/10 rounded-2xl p-2 bg-white overflow-hidden relative">
                  <div className={`w-full h-full rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center p-6 relative overflow-hidden group`}>
                    
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1]"
                      />
                    ) : (
                      <>
                        {/* Grid Overlay for Editorial look */}
                        <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 opacity-[0.05] pointer-events-none">
                          {Array(32).fill(0).map((_, gridIdx) => (
                            <div key={gridIdx} className="border-t border-l border-navy"></div>
                          ))}
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-white/70 backdrop-blur-sm border border-accent/20 flex items-center justify-center text-teal shadow-sm group-hover:scale-110 transition-transform duration-500">
                          <Icon size={24} />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Editorial Reveal Shutter Mask */}
                  <motion.div
                    initial={{ y: 0 }}
                    whileInView={{ y: '-100%' }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0 bg-sage z-20 pointer-events-none"
                  />
                </div>

                {/* Text Content (35% width) */}
                <div className="w-full md:w-2/5 text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-wider bg-sage text-teal px-3 py-1 rounded-full border border-teal/10">
                      {card.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-navy tracking-tight group-hover/card:text-teal transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="font-heading font-medium text-teal text-sm uppercase tracking-wider">
                    {card.tagline}
                  </p>
                  <p className="font-body text-navy/70 text-sm sm:text-base leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
