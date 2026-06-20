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
    <section className="w-full min-h-[60vh] bg-[#FCFAF7] dark:bg-[#0b1625] flex items-center justify-center py-20 px-6 sm:px-12 md:px-20 lg:px-32 relative select-none">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={reveal}
          className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] leading-[1.3] text-navy/90 dark:text-white/90 tracking-tight"
        >
          "The future of wellness belongs to brands <br className="hidden sm:inline" /> that can earn trust."
        </motion.p>
      </div>
    </section>
  );
}
