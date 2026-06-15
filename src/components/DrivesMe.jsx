import { motion } from 'framer-motion';
import { RiCompass3Line, RiShieldCheckLine, RiBookOpenLine, RiHeartLine } from 'react-icons/ri';

export default function DrivesMe() {
  const beliefs = [
    {
      title: 'Purpose Before Growth',
      desc: 'Impact gives meaning to progress.',
      icon: RiCompass3Line,
      bg: 'bg-sage/40'
    },
    {
      title: 'Trust Through Action',
      desc: 'Credibility is built through consistency.',
      icon: RiShieldCheckLine,
      bg: 'bg-accent/15'
    },
    {
      title: 'Lifelong Learning',
      desc: 'Curiosity fuels innovation.',
      icon: RiBookOpenLine,
      bg: 'bg-sage/40'
    },
    {
      title: 'People First',
      desc: 'The lives we touch matter most.',
      icon: RiHeartLine,
      bg: 'bg-accent/15'
    }
  ];

  // Stagger variants
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="drives" className="py-24 bg-sage/15 relative overflow-hidden">
      {/* Decorative vector shape */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-teal/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            My Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            What Drives Me
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4"></div>
        </div>

        {/* Staggered Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {beliefs.map((belief, idx) => {
            const Icon = belief.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -15px rgba(15,39,68,0.08)' }}
                className="bg-white border border-border/80 p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between items-start text-left group cursor-pointer"
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-2xl ${belief.bg} flex items-center justify-center text-teal mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-heading font-bold text-navy text-lg tracking-tight mb-2">
                    {belief.title}
                  </h3>
                  <p className="font-body text-navy/70 text-sm leading-relaxed">
                    {belief.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
