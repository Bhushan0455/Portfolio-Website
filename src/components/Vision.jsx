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
    <section id="vision" className="w-full bg-teal text-white py-32 relative overflow-hidden flex items-center justify-center">
      {/* Subtle background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={reveal}
          className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl leading-normal sm:leading-relaxed md:leading-relaxed text-white tracking-tight italic"
        >
          "To build India's most trusted metabolic wellness company by combining traditional wisdom, scientific validation, and consumer-centric innovation."
        </motion.blockquote>
      </div>
    </section>
  );
}
