import { motion } from 'framer-motion';

export default function MomentsMilestones() {
  const cards = [
    {
      label: 'SHOWCASE',
      title: 'BIRAC Stall at CHEMTECH',
      description: "Presented Beyond Bound at the Biotechnology Industry Research Assistance Council (BIRAC) stall during CHEMTECH, sharing the brand's approach to metabolic wellness and evidence-backed health solutions."
    },
    {
      label: 'ENGAGEMENT',
      title: 'All India Institute of Ayurveda',
      description: "Connected with researchers, practitioners, and healthcare professionals while exploring how traditional knowledge and modern validation can work together more effectively."
    },
    {
      label: 'CONVERSATIONS',
      title: 'Founder & Industry Dialogue',
      description: "Engaged with founders, healthcare professionals, researchers, and operators across the wellness landscape to challenge ideas, validate assumptions, and refine long-term direction."
    },
    {
      label: 'BUILDING',
      title: 'Taking Beyond Bound Into The Real World',
      description: "Every exhibition, conversation, and customer interaction has helped shape Beyond Bound into a brand built around credibility, transparency, and measurable outcomes."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="milestones" aria-labelledby="milestones-title" className="py-16 md:py-24 bg-white dark:bg-[#081220] relative overflow-hidden select-none border-t border-b border-border/20 dark:border-white/5">
      {/* Subtle ambient gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-3xl mb-10 md:mb-20"
        >
          {/* Label with teal horizontal line */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-teal" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light">
              WHERE THE JOURNEY HAS SHOWN UP
            </span>
          </div>

          <h2 id="milestones-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-navy dark:text-white tracking-tight leading-none">
            Places the work has taken me.
          </h2>

          <p className="text-navy/60 dark:text-white/60 font-body text-base sm:text-lg mt-6 leading-relaxed max-w-2xl">
            Building a healthcare brand means spending time where ideas are challenged, products are questioned, and assumptions are tested. These are a few places where that journey has unfolded.
          </p>
        </motion.div>

        {/* 2-Column Responsive Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -4,
                borderColor: 'rgba(13, 107, 99, 0.3)' // Subtle teal glow
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAF9F6] dark:bg-[#0e1f35]/25 border border-accent/15 dark:border-white/5 rounded-[1.75rem] p-6 sm:p-8 md:p-10 flex flex-col justify-between text-left relative overflow-hidden transition-colors duration-300"
            >
              {/* Subtle inner grid lines or ambient background card decorator */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal/5 rounded-bl-[1.75rem] pointer-events-none z-0" />
              
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-teal dark:text-teal-light">
                  {card.label}
                </span>
                
                <h3 className="text-xl md:text-2xl font-bold font-heading text-navy dark:text-white tracking-tight leading-snug">
                  {card.title}
                </h3>
                
                <p className="text-navy/70 dark:text-white/60 font-body text-sm leading-relaxed pt-1">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
