import { motion } from 'framer-motion';
import { RiLeafLine, RiPulseLine } from 'react-icons/ri';

export default function FounderStory() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="story" className="py-24 bg-sage/20 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-12 right-12 w-48 h-48 bg-teal/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal mb-4">
            <RiLeafLine size={20} />
          </div>
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            The Spark
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            Why I Started
          </h2>
          <div className="h-0.5 w-16 bg-accent mt-4"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="space-y-8 text-navy/80 text-base sm:text-lg font-body leading-relaxed max-w-3xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-lg sm:text-xl font-light italic text-navy/90">
            "While working across agriculture, healthcare, and consumer businesses, I noticed a recurring challenge: consumers wanted preventive health solutions that were effective, trustworthy, and easy to adopt."
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center items-center py-2">
            <RiPulseLine className="text-accent w-6 h-6" />
          </motion.div>

          <motion.p variants={fadeUp}>
            This simple but profound insight led me to establish <strong className="font-semibold text-teal text-lg">Beyond Bound</strong>.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="p-6 bg-white rounded-2xl shadow-sm border border-border/60 max-w-2xl mx-auto text-left relative"
          >
            <div className="absolute top-4 right-4 text-xs font-heading font-semibold text-accent/60 tracking-wider uppercase">
              The Mission
            </div>
            <h4 className="font-heading font-bold text-navy text-base uppercase tracking-wider mb-2">
              The Vision Was Simple
            </h4>
            <p className="text-navy/70 text-sm sm:text-base leading-relaxed">
              Build modern wellness products that bridge the gap between traditional Ayurvedic knowledge and contemporary consumer needs.
            </p>
          </motion.div>

          <motion.p variants={fadeUp} className="text-sm sm:text-base text-navy/70 max-w-2xl mx-auto">
            What began as a supplement venture has evolved into a metabolic health-focused brand developing solutions for blood sugar management, energy, digestion, sleep, and overall wellness.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
