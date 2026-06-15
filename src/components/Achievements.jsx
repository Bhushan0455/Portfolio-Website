import { motion } from 'framer-motion';
import { RiUserSharedLine, RiCoinsLine, RiBriefcaseFill, RiShieldStarLine } from 'react-icons/ri';

export default function Achievements() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const metrics = [
    {
      value: '2,000+',
      label: 'Farmers Supported',
      icon: RiUserSharedLine,
      desc: 'Assessed and supported rural farming communities, validating local agricultural interventions.',
      bg: 'bg-sage/40'
    },
    {
      value: '₹40 Cr',
      label: 'Farmer Economic Impact',
      icon: RiCoinsLine,
      desc: 'Contributed to regional initiatives that generated incremental earnings for farmers.',
      bg: 'bg-accent/15'
    },
    {
      value: '₹14 M',
      label: 'Sales contribution',
      icon: RiBriefcaseFill,
      desc: 'Successfully generated during engagement as a B2B Sales Strategist at Patanjali.',
      bg: 'bg-sage/40'
    },
    {
      value: 'Founder',
      label: 'Beyond Bound',
      icon: RiShieldStarLine,
      desc: 'Founded, licensed, and registered a nutraceutical startup built on scientific Ayurvedic principles.',
      bg: 'bg-accent/15'
    }
  ];

  return (
    <section id="achievements" className="py-24 bg-sage/10 relative overflow-hidden">
      {/* Decorative accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            Key Accomplishments
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            Impact & Milestones
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 mb-4"></div>
          <p className="font-body text-sm sm:text-base text-navy/60">
            Measurable contributions across rural agriculture, B2B sales development, and wellness entrepreneurship.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="bg-white border border-border/80 p-8 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between text-left"
              >
                <div>
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center text-teal mb-6`}>
                    <Icon size={18} />
                  </div>

                  {/* Value */}
                  <h3 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mb-2">
                    {item.value}
                  </h3>

                  {/* Label */}
                  <h4 className="text-sm font-heading font-semibold text-teal uppercase tracking-wider mb-4">
                    {item.label}
                  </h4>
                </div>

                {/* Description */}
                <p className="font-body text-xs sm:text-sm text-navy/70 leading-relaxed border-t border-border/40 pt-4">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
