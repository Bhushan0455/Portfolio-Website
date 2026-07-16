import { motion } from 'framer-motion';

export default function Vision() {
  const reveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="vision" aria-labelledby="vision-title" className="w-full bg-white dark:bg-[#07162c] py-20 md:py-32 relative overflow-hidden flex items-center justify-center select-none border-b border-border/20 dark:border-white/5">
      {/* Subtle background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-navy/5 dark:border-white/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-navy/10 dark:border-white/10 rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
          variants={reveal}
          className="space-y-6"
        >
          <h2 id="vision-title" className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light block">
            The Vision
          </h2>
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl leading-relaxed text-navy dark:text-white tracking-tight">
            "Natural" will have to mean "proven." <br />
            Every natural ingredient will have to survive a glucose monitor.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
          variants={reveal}
          className="pt-12"
        >
          <span className="font-heading text-xs sm:text-sm text-navy/60 dark:text-accent font-semibold uppercase tracking-[0.3em]">
            The direction is fixed.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
