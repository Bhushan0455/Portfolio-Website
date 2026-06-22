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
    <section id="story" className="pt-20 pb-0 md:pt-28 md:pb-0 bg-white dark:bg-[#081220] relative overflow-hidden select-none">
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
          className="space-y-6 md:space-y-8 max-w-3xl font-body text-navy/85 dark:text-white/85 text-base sm:text-lg leading-[1.75]"
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

        {/* ── UPGRADED FOUNDER PATH TIMELINE (TRANSITION BRIDGE) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mt-24 pt-16 border-t border-neutral-100 dark:border-white/10 relative w-full overflow-visible"
        >
          {/* Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal/[0.04] dark:bg-teal-light/[0.03] rounded-full blur-3xl pointer-events-none z-0" />

          {/* Subtle Grid Lines simulation */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none z-0 grid grid-cols-3 h-full">
            <div className="border-r border-navy dark:border-white h-full" />
            <div className="border-r border-navy dark:border-white h-full" />
            <div className="h-full" />
          </div>

          {/* Section subtitle */}
          <div className="text-center mb-12 relative z-10">
            <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.3em] text-teal/70 dark:text-teal-light/70 block">
              Founder Evolution
            </span>
          </div>

          {/* Connected timeline container */}
          <div className="relative z-10 max-w-3xl mx-auto px-4">

            {/* Desktop Horizontal Connected Journey */}
            <div className="hidden md:block relative py-12">
              {/* Huge Editorial Background Typography - Desktop Only */}
              <div className="absolute left-1/2 -translate-x-1/2 w-screen h-full flex items-center justify-center pointer-events-none select-none overflow-visible z-0">
                <span 
                  className="font-heading font-black text-navy/[0.06] dark:text-white/[0.08] tracking-[0.08em] uppercase leading-none select-none blur-[0.5px] translate-y-5" 
                  style={{ 
                    fontSize: 'clamp(6rem, 12vw, 10rem)'
                  }}
                >
                  JOURNEY
                </span>
              </div>

              {/* Timeline Track Background Line */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-neutral-100 dark:bg-white/5 -translate-y-1/2 z-0" />
              {/* Timeline Track Progress Fill Line (Draws in on scroll) */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-0 right-0 h-[2px] bg-teal dark:bg-teal-light -translate-y-1/2 z-0 origin-left"
              />

              {/* Three Nodes */}
              <div className="flex justify-between items-center relative z-10">
                {timelineStops.map((stop, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center group cursor-pointer w-48 relative"
                  >
                    {/* Node Circle */}
                    <div className="relative flex items-center justify-center mb-4">
                      {/* Node glow wrapper on hover */}
                      <div className="absolute inset-0 bg-teal/20 dark:bg-teal-light/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150" />

                      {/* Circle body */}
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-[#081220] border border-neutral-200 dark:border-white/10 group-hover:border-teal dark:group-hover:border-teal-light flex items-center justify-center transition-all duration-300 z-10 shadow-sm relative">
                        <span className="text-[10px] font-heading font-bold text-navy/40 dark:text-white/40 group-hover:text-teal dark:group-hover:text-teal-light transition-colors duration-300">
                          0{idx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Node texts */}
                    <span className="text-xs font-heading font-bold uppercase tracking-wider text-navy dark:text-white group-hover:text-teal dark:group-hover:text-teal-light transition-colors duration-300">
                      {stop.era}
                    </span>
                    <span className="text-[10px] font-heading font-medium text-navy/50 dark:text-white/50 uppercase tracking-widest mt-1 block max-w-[150px] mx-auto leading-relaxed">
                      {stop.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Vertical Connected Journey */}
            <div className="md:hidden relative space-y-12 py-2 w-full">
              {/* Central vertical line track */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-neutral-100 dark:bg-white/5 z-0" />

              {/* Mobile Timeline Track Progress Fill Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-teal dark:bg-teal-light origin-top z-0"
              />

              {/* Huge Editorial Background Typography - Mobile Only */}
              <div className="absolute left-1/2 -translate-x-1/2 w-screen h-full flex items-center justify-center pointer-events-none select-none overflow-visible z-0">
                <span 
                  className="font-heading font-black text-navy/[0.06] dark:text-white/[0.08] tracking-[0.08em] uppercase leading-none select-none blur-[0.5px] translate-y-7" 
                  style={{ 
                    fontSize: 'clamp(3.5rem, 16vw, 6.5rem)'
                  }}
                >
                  JOURNEY
                </span>
              </div>

              {timelineStops.map((stop, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full group"
                  >
                    {/* LEFT COLUMN: content if isLeft is true */}
                    {isLeft ? (
                      <div className="text-right flex flex-col items-end">
                        <span className="text-[9px] font-heading font-bold text-teal dark:text-teal-light uppercase tracking-widest leading-none mb-1">
                          0{idx + 1}
                        </span>
                        <span className="text-sm font-heading font-bold uppercase tracking-wider text-navy dark:text-white group-hover:text-teal dark:group-hover:text-teal-light transition-colors duration-300">
                          {stop.era}
                        </span>
                        <span className="text-[10px] font-body text-navy/60 dark:text-white/60 mt-1 leading-normal max-w-[120px]">
                          {stop.label}
                        </span>
                      </div>
                    ) : (
                      <div />
                    )}

                    {/* CENTER COLUMN: Node Circle */}
                    <div className="relative flex items-center justify-center z-10 w-6 h-6">
                      <div className="w-4 h-4 rounded-full bg-white dark:bg-[#081220] border border-neutral-300 dark:border-white/10 group-hover:border-teal dark:group-hover:border-teal-light flex items-center justify-center transition-colors duration-300 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-white/20 group-hover:bg-teal dark:group-hover:bg-teal-light transition-colors duration-300" />
                      </div>
                    </div>

                    {/* RIGHT COLUMN: content if isLeft is false */}
                    {!isLeft ? (
                      <div className="text-left flex flex-col items-start">
                        <span className="text-[9px] font-heading font-bold text-teal dark:text-teal-light uppercase tracking-widest leading-none mb-1">
                          0{idx + 1}
                        </span>
                        <span className="text-sm font-heading font-bold uppercase tracking-wider text-navy dark:text-white group-hover:text-teal dark:group-hover:text-teal-light transition-colors duration-300">
                          {stop.era}
                        </span>
                        <span className="text-[10px] font-body text-navy/60 dark:text-white/60 mt-1 leading-normal max-w-[120px]">
                          {stop.label}
                        </span>
                      </div>
                    ) : (
                      <div />
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Bottom fade line transition decoration */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-100 dark:via-white/5 to-transparent mt-8" />
        </motion.div>
      </div>
    </section>
  );
}
