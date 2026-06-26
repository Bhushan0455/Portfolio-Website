import { motion } from 'framer-motion';

export default function HealthcareGap() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="insight" aria-labelledby="insight-title" className="py-24 bg-[#FAF9F6] dark:bg-[#0b1625] relative overflow-hidden select-none">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-left">
        {/* Section Tagline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-center gap-4 mb-10"
        >
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light">
            The Insight
          </span>
          <div className="h-[1px] bg-gradient-to-r from-teal/30 to-transparent flex-1" />
        </motion.div>

        {/* Narrative columns / Text content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="space-y-8 max-w-3xl font-body text-navy/80 dark:text-white/80 text-base sm:text-lg leading-[1.8]"
        >
          <motion.h2 
            id="insight-title"
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold font-heading text-navy dark:text-white tracking-tight leading-tight"
          >
            Why hasn't someone already solved wellness in India?
          </motion.h2>

          <motion.p variants={fadeUp}>
            The Indian market is flooded with supplements making massive health promises. Yet, metabolic disorders continue to climb. When I spoke directly to consumers, I realized they weren't suffering from a shortage of health products. They were suffering from a complete lack of transparency, education, and validation. They didn't know what to believe.
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="pt-4"
          >
            <p className="text-xl sm:text-2xl font-heading font-bold text-teal dark:text-teal-light leading-normal">
              "The gap wasn't a product gap. It was a credibility gap."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
