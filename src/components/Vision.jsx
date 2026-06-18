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
    <section id="vision" className="w-full bg-[#07162c] text-white py-32 relative overflow-hidden flex items-center justify-center select-none">
      {/* Subtle background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={reveal}
          className="space-y-6"
        >
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal block">
            The Vision
          </span>
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl leading-relaxed text-white tracking-tight">
            "Natural" will have to mean "proven." <br />
            "Ayurvedic" will have to survive a glucose monitor.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={reveal}
          className="pt-12"
        >
          <span className="font-heading text-xs sm:text-sm text-accent font-semibold uppercase tracking-[0.3em]">
            The direction is fixed.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
