import { motion } from 'framer-motion';
import { RiLeafLine } from 'react-icons/ri';

export default function FounderStory() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const timelineStops = [
    { era: 'Soil', label: 'The Roots' },
    { era: 'Corporate', label: 'Commercial Scale' },
    { era: 'Founder', label: 'Beyond Bound®' }
  ];

  return (
    <section id="story" className="py-28 bg-white dark:bg-[#081220] relative overflow-hidden select-none">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-sage/20 dark:bg-teal-dark/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-12 right-12 w-64 h-64 bg-teal/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-left">
        {/* Editorial Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-10 h-10 rounded-full bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center text-teal dark:text-teal-light">
            <RiLeafLine size={18} />
          </div>
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light">
            My Story
          </span>
          <div className="h-[1px] bg-gradient-to-r from-teal/30 to-transparent flex-1" />
        </motion.div>

        {/* Narrative Columns / Typography */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="space-y-8 max-w-3xl font-body text-navy/85 dark:text-white/85 text-base sm:text-lg leading-[1.75]"
        >
          <motion.h3
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-heading font-bold text-navy dark:text-white leading-snug tracking-tight"
          >
            From Agriculture to Healthcare — Building Brands That Matter.
          </motion.h3>

          <motion.p variants={fadeUp}>
            My journey into healthcare didn't begin in a hospital. It began with a B.Sc. in Agriculture. Working with the soil taught me that health starts at the molecular level, in the food we grow and the nutrition we consume. It showed me that true wellbeing is systemic, and that in healthcare, just like in agriculture, you cannot shortcut the process if you want to build something that lasts.
          </motion.p>

          <motion.p variants={fadeUp}>
            To understand how these concepts scale, I pursued an MBA in Healthcare Management at K J Somaiya Institute of Management. I wanted to understand the systems behind patient care, how healthcare organizations operate, and how consumers make choices about their bodies. But the more I studied healthcare systems, the more I noticed a gap. The industry was designed to manage sickness, not to build health. We were waiting for people to become patients before giving them guidance.
          </motion.p>

          <motion.p variants={fadeUp}>
            After management studies, my work in sales and market research confirmed a deeper problem: the market was flooded with generic wellness products, but consumers had no way to verify their claims. There was a lack of focused metabolic brands built on real proof. That was the inevitable next step. Beyond Bound was built to bridge this gap—a brand where agricultural quality meets rigorous healthcare validation, designed for the one system that drives it all: our metabolism.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl font-heading font-bold text-navy dark:text-white border-l-2 border-accent pl-5 my-8 italic"
          >
            I didn't want a career in healthcare. I wanted to build something for it.
          </motion.p>
        </motion.div>

        {/* 3-Stop Journey Journey Footnote */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="mt-16 pt-8 border-t border-border/50 dark:border-white/10 max-w-3xl flex items-center justify-between"
        >
          <span className="text-[10px] font-heading font-bold text-navy/40 dark:text-white/40 uppercase tracking-widest">
            The Path:
          </span>
          <div className="flex gap-4 sm:gap-12">
            {timelineStops.map((stop, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[10px] font-heading font-bold text-teal dark:text-teal-light bg-teal/5 dark:bg-teal-light/10 border border-teal/10 dark:border-teal-light/20 px-2 py-0.5 rounded">
                  0{idx + 1}
                </span>
                <span className="text-xs font-heading font-medium text-navy/70 dark:text-white/70 uppercase tracking-wider">
                  {stop.era}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
