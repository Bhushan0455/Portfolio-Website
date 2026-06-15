import { motion } from 'framer-motion';
import {
  RiLineChartLine,
  RiHeartPulseLine,
  RiFlaskLine,
  RiLeafLine,
  RiPulseLine,
  RiHandCoinLine,
  RiArrowRightUpLine,
  RiDatabaseLine,
  RiPresentationLine,
  RiMapPinRangeLine,
  RiHammerLine
} from 'react-icons/ri';

export default function Expertise() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const skills = [
    { name: 'Healthcare Strategy', icon: RiLineChartLine },
    { name: 'Consumer Health Brands', icon: RiHeartPulseLine },
    { name: 'Nutraceuticals', icon: RiFlaskLine },
    { name: 'Ayur-Product Development', icon: RiLeafLine },
    { name: 'Metabolic Health', icon: RiPulseLine },
    { name: 'B2B Sales Strategy', icon: RiHandCoinLine },
    { name: 'D2C Growth', icon: RiArrowRightUpLine },
    { name: 'Market Research', icon: RiDatabaseLine },
    { name: 'Business Development', icon: RiPresentationLine },
    { name: 'Rural Agriculture Impact', icon: RiMapPinRangeLine },
    { name: 'Startup Building', icon: RiHammerLine }
  ];

  return (
    <section id="expertise" className="py-24 bg-sage/20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            Areas of Expertise
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 mb-4"></div>
          <p className="font-body text-sm sm:text-base text-navy/60">
            Professional skill sets acquired through corporate roles, academic training, and entrepreneurial execution.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-border/60 hover:border-teal/30 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 text-left cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal shrink-0">
                  <Icon size={20} />
                </div>
                <span className="font-heading font-semibold text-navy text-sm sm:text-base leading-snug">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
