import { motion } from 'framer-motion';

export default function QuoteInterstitial() {
  const reveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="w-full min-h-[55vh] bg-[#FCFAF7] dark:bg-[#0b1625] flex items-center justify-center py-20 px-6 sm:px-12 md:px-20 lg:px-32 relative overflow-hidden select-none border-b border-border/10 dark:border-white/5">
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.015] z-0 text-navy dark:text-white"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient Radial Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-teal/[0.04] dark:bg-teal-light/[0.03] rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0" />

      {/* Oversized Decorative Quotation Marks (framed to the section) */}
      <div className="absolute top-4 left-6 sm:top-6 sm:left-12 lg:left-24 font-serif text-[12rem] sm:text-[18rem] md:text-[22rem] lg:text-[26rem] text-black dark:text-white opacity-[0.15] select-none pointer-events-none leading-none z-0">
        “
      </div>
      <div className="absolute right-6 sm:right-12 lg:right-24 bottom-[-8rem] sm:bottom-[-12rem] md:bottom-[-14rem] lg:bottom-[-18rem] font-serif text-[12rem] sm:text-[18rem] md:text-[22rem] lg:text-[26rem] text-black dark:text-white opacity-[0.15] select-none pointer-events-none leading-none z-0">
        ”
      </div>

      {/* Floating Motif Circles (very subtle background elements) */}
      <motion.div
        className="absolute left-[5%] top-[20%] w-20 h-20 border border-teal/[0.04] dark:border-teal-light/[0.03] rounded-full pointer-events-none z-0 hidden md:block"
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute right-[5%] bottom-[15%] w-28 h-28 border border-navy/[0.02] dark:border-white/[0.015] rounded-full pointer-events-none z-0 hidden md:block"
        animate={{
          y: [0, 18, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute right-[20%] top-[10%] w-14 h-14 border border-accent/[0.06] dark:border-accent-light/[0.04] rounded-full pointer-events-none z-0 hidden sm:block"
        animate={{
          y: [0, -10, 0],
          x: [0, -6, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center">
        {/* Top Gold Divider */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-24 bg-accent/60 dark:bg-accent/50 mb-10 origin-center"
        />

        {/* Quote */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
          variants={reveal}
          className="font-serif italic text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] leading-[1.3] text-navy/90 dark:text-white/90 tracking-tight max-w-2xl mx-auto"
        >
          "Health advice is easy to give. <br className="hidden sm:inline" /> Trust is harder to earn."
        </motion.p>

        {/* Founder Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-center flex flex-col items-center justify-center gap-1"
        >
          <span className="font-heading text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-navy/40 dark:text-white/35">
            — Priyanshu Chauhan
          </span>
          <span className="font-heading text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-navy/30 dark:text-white/25">
            Founder, Beyond Bound®
          </span>
        </motion.div>

        {/* Bottom Gold Divider */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-24 bg-accent/60 dark:bg-accent/50 mt-10 origin-center"
        />
      </div>
    </section>
  );
}
