import { motion } from 'framer-motion';

export default function LessonsLearned() {
  const lessons = [
    {
      category: 'MBA Foundation',
      lesson: 'My MBA taught me how businesses scale, but more importantly, how people make decisions.',
      borderClass: 'border-teal/20 dark:border-white/10',
      badgeBg: 'bg-teal/5 text-teal border-teal/10 dark:bg-teal-light/10 dark:text-teal-light dark:border-teal-light/20'
    },
    {
      category: 'Corporate Learning',
      lesson: 'Corporate roles taught me that execution matters far more than strategy without action.',
      borderClass: 'border-accent/30 dark:border-white/10',
      badgeBg: 'bg-accent/5 text-accent border-accent/15 dark:bg-accent/10 dark:text-accent-light dark:border-accent/20'
    },
    {
      category: 'Entrepreneurship',
      lesson: 'Trust is the foundation of every healthcare brand.',
      borderClass: 'border-teal/20 dark:border-white/10',
      badgeBg: 'bg-teal/5 text-teal border-teal/10 dark:bg-teal-light/10 dark:text-teal-light dark:border-teal-light/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="lessons" className="py-28 bg-[#FAF9F6] dark:bg-[#081220] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal dark:text-teal-light">
            Key Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy dark:text-white tracking-tight mt-2">
            Lessons Learned
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4"></div>
        </div>

        {/* Minimal Apple Keynote Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {lessons.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(15, 39, 68, 0.05)' }}
              className={`bg-white dark:bg-[#0e1f35]/30 border ${item.borderClass} p-10 rounded-3xl transition-all duration-500 flex flex-col justify-between items-start text-left min-h-[300px] group`}
            >
              {/* Category tag */}
              <div className={`text-[10px] font-heading font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${item.badgeBg}`}>
                {item.category}
              </div>

              {/* Minimal Keynote Typography Lesson */}
              <p className="font-heading font-normal text-navy dark:text-white text-2xl sm:text-3xl leading-snug tracking-tight text-navy/90 dark:text-white/95 group-hover:text-teal dark:group-hover:text-teal-light transition-colors duration-300 mt-8 mb-4">
                {item.lesson}
              </p>

              {/* Accent footer mark */}
              <div className="h-1 w-8 bg-accent/40 rounded-full group-hover:w-16 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
