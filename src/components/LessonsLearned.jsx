import { motion } from 'framer-motion';

export default function LessonsLearned() {
  const lessons = [
    {
      num: '01',
      category: 'MBA Foundation',
      lesson: "My MBA taught me that the biggest market gaps aren't in products — they're in trust and dedication."
    },
    {
      num: '02',
      category: 'Corporate Learning',
      lesson: "In corporate, I learned that the market doesn't care about your strategy. It only responds to your execution.",
      isFeatured: true
    },
    {
      num: '03',
      category: 'Entrepreneurship',
      lesson: 'A brand that does one thing and proves it will always outlast a brand that does everything.'
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

  const rowVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="lessons" className="py-28 bg-[#FAF9F6] dark:bg-[#081220] relative overflow-hidden select-none">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 text-center">
        <span 
          className="font-heading font-semibold uppercase tracking-wider text-teal dark:text-teal-light block"
          style={{ fontSize: '11px' }}
        >
          KEY INSIGHTS
        </span>
        <h2 
          className="font-bold font-heading text-navy dark:text-white tracking-tight mt-2"
          style={{ fontSize: '36px' }}
        >
          Lessons Learned
        </h2>
        <div className="h-0.5 w-16 bg-accent mx-auto mt-4"></div>
      </div>

      {/* Rows Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full flex flex-col"
      >
        {lessons.map((item, idx) => {
          const isFeatured = item.isFeatured;
          
          // Row background tint for Corporate Learning
          const rowBgClass = isFeatured 
            ? 'bg-[#F5F0E8] dark:bg-[#1E1A14]' 
            : 'bg-transparent';
            
          // Quote text color
          const quoteColorClass = isFeatured
            ? 'text-[#0D6B63] dark:text-[#7ECFC9]'
            : 'text-[#1A2B4A] dark:text-[#E8E8E8]';

          return (
            <motion.div
              key={idx}
              variants={rowVariants}
              className={`w-full border-b border-[#E8E4DC] dark:border-[#2A2A2A] transition-colors duration-300 ${rowBgClass}`}
            >
              {/* Inner content wrapper, matching page alignment */}
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-10 items-center gap-8 md:gap-4">
                
                {/* Left Side: 40% (4 of 10 cols) - Watermark number and category */}
                <div className="md:col-span-4 relative flex items-center h-24 text-left">
                  
                  {/* Decorative background watermark number */}
                  <span 
                    className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-heading font-bold text-[#F0EBE0] dark:text-[#222222] z-0 leading-none whitespace-nowrap"
                    style={{ fontSize: '96px', fontWeight: 700 }}
                  >
                    {item.num}
                  </span>
                  
                  {/* Overlapping category label */}
                  <span 
                    className="relative z-10 font-heading font-bold uppercase text-[#C9A96E]"
                    style={{ fontSize: '11px', letterSpacing: '2px' }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Right Side: 60% (6 of 10 cols) - Quote text */}
                <div className="md:col-span-6 text-left">
                  <p 
                    className={`font-heading font-medium leading-snug tracking-tight ${quoteColorClass}`}
                    style={{ fontSize: '26px', fontWeight: 500 }}
                  >
                    {item.lesson}
                  </p>
                </div>

              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}
