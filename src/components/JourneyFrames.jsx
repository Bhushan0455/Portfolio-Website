import { motion } from 'framer-motion';
import { RiLeafLine, RiUserLine, RiBuildingLine, RiCompassLine } from 'react-icons/ri';

export default function JourneyFrames() {
  const cards = [
    {
      title: 'Agriculture & Rural Impact',
      caption: 'Working alongside farming communities taught me that meaningful change starts with understanding people.',
      icon: RiLeafLine,
      gradient: 'from-sage/60 via-sage to-accent/10'
    },
    {
      title: 'Learning Through Industry',
      caption: 'Experiences across healthcare, research, and consumer businesses shaped how I think and build.',
      icon: RiUserLine,
      gradient: 'from-sage via-white to-accent/20'
    },
    {
      title: 'Entrepreneurship',
      caption: 'Beyond Bound emerged from a desire to make preventive wellness more trustworthy and accessible.',
      icon: RiBuildingLine,
      gradient: 'from-teal/5 via-sage/40 to-accent/10'
    },
    {
      title: 'Building The Future',
      caption: 'Continuing to learn, experiment, and create with purpose.',
      icon: RiCompassLine,
      gradient: 'from-sage/20 via-accent/5 to-teal/10'
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
                  {/* Soft Gradient Placeholder Grid */}
                  <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${card.gradient} flex flex-col justify-center items-center p-8 relative overflow-hidden group`}>
                    
                    {/* Subtle grid lines for editorial feel */}
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
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy tracking-tight">
                    {card.title}
                  </h3>
                  <div className="h-[1px] w-8 bg-accent"></div>
                  <p className="font-body text-navy/70 text-sm sm:text-base leading-relaxed pt-2">
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
