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

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.12 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 20, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="insight" aria-labelledby="insight-title" className="py-20 lg:py-28 bg-[#F4F7F6] dark:bg-[#0B1524] relative overflow-hidden transition-colors duration-300">
      {/* Decorative blurred background shapes */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-teal/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Text & Quote */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Tagline */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="w-6 h-[1.5px] bg-teal/40 dark:bg-teal-light/40" />
              <span className="text-xs font-body font-bold uppercase tracking-[0.25em] text-teal dark:text-teal-light">
                The Insight
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              id="insight-title"
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-heading text-navy dark:text-white tracking-tight leading-[1.15]"
            >
              Why hasn't someone already solved wellness in India?
            </motion.h2>

            {/* Paragraphs */}
            <div className="space-y-6 text-navy/70 dark:text-white/70 font-body text-base lg:text-[17px] leading-[1.75]">
              <motion.p variants={fadeUp}>
                The Indian market is flooded with supplements making massive health promises. Yet metabolic disorders continue to climb. When I spoke directly to consumers, I realised they weren't suffering from a shortage of health products.
              </motion.p>
              <motion.p variants={fadeUp}>
                They were suffering from a complete lack of transparency, education, and validation. They didn't know what to believe.
              </motion.p>
            </div>

            {/* Quote Block */}
            <motion.div
              variants={fadeUp}
              className="border-l-[3px] border-teal pl-6 py-1 space-y-3"
            >
              <p className="text-xl sm:text-2xl font-heading font-bold text-navy dark:text-white leading-[1.35] tracking-tight">
                “The gap wasn't a product gap.<br />
                It was a credibility gap.”
              </p>
              <footer className="text-xs font-body tracking-wider text-navy/40 dark:text-white/40 not-italic">
                — Priyanshu Chauhan
              </footer>
            </motion.div>
          </motion.div>

          {/* Right Column: Cards & Footnote */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            variants={staggerContainer}
            className="lg:col-span-5 space-y-8 flex flex-col justify-between self-stretch"
          >
            <div className="space-y-4">
              
              {/* Card 1 */}
              <motion.div
                variants={cardVariants}
                className="flex items-center gap-6 p-6 sm:p-7 bg-white dark:bg-navy/40 border border-border/40 dark:border-white/5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:hover:bg-navy/50 transition-all duration-300"
              >
                <div className="text-teal dark:text-teal-light text-3xl sm:text-4xl font-light w-10 flex justify-center items-center flex-shrink-0 select-none">
                  ↑
                </div>
                <div className="text-left">
                  <h3 className="font-heading font-semibold text-navy dark:text-white text-[16px] sm:text-[17px] mb-1">
                    Metabolic disorders
                  </h3>
                  <p className="font-body text-sm text-navy/60 dark:text-white/60 leading-relaxed">
                    Rising across India despite more products on the shelf
                  </p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                variants={cardVariants}
                className="flex items-center gap-6 p-6 sm:p-7 bg-white dark:bg-navy/40 border border-border/40 dark:border-white/5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:hover:bg-navy/50 transition-all duration-300"
              >
                <div className="text-teal dark:text-teal-light text-3xl sm:text-4xl font-light w-10 flex justify-center items-center flex-shrink-0 select-none">
                  ?
                </div>
                <div className="text-left">
                  <h3 className="font-heading font-semibold text-navy dark:text-white text-[16px] sm:text-[17px] mb-1">
                    Verified claims
                  </h3>
                  <p className="font-body text-sm text-navy/60 dark:text-white/60 leading-relaxed">
                    Most wellness labels make promises no one has measured
                  </p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                variants={cardVariants}
                className="flex items-center gap-6 p-6 sm:p-7 bg-white dark:bg-navy/40 border border-border/40 dark:border-white/5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:hover:bg-navy/50 transition-all duration-300"
              >
                <div className="text-teal dark:text-teal-light text-3xl sm:text-4xl font-light w-10 flex justify-center items-center flex-shrink-0 select-none">
                  0
                </div>
                <div className="text-left">
                  <h3 className="font-heading font-semibold text-navy dark:text-white text-[16px] sm:text-[17px] mb-1">
                    Trusted brands
                  </h3>
                  <p className="font-body text-sm text-navy/60 dark:text-white/60 leading-relaxed">
                    No focused metabolic-health brand people could turn to
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Footnote */}
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-mono tracking-normal text-navy/50 dark:text-white/40 text-left pt-2"
            >
              Based on market research and direct consumer conversations.
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
