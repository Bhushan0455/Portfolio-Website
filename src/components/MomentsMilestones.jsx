import { motion } from 'framer-motion';
import {
  RiGraduationCapLine,
  RiBriefcaseLine,
  RiHeartPulseLine,
} from 'react-icons/ri';
import mbaJourneyImg from '../assets/mba_journey.jpg';
import corporateLearningImg from '../assets/corporate_learning.png';
import healthcareEntrepreneurshipImg from '../assets/healthcare_entrepreneurship.jpg';

export default function MomentsMilestones() {
  const items = [
    { label: 'MBA Journey', icon: RiGraduationCapLine, gradient: 'from-sage/40 to-teal/10', image: mbaJourneyImg },
    { label: 'Corporate Learning', icon: RiBriefcaseLine, gradient: 'from-sage/20 to-accent/10', image: corporateLearningImg },
    { label: 'Healthcare Entrepreneurship', icon: RiHeartPulseLine, gradient: 'from-teal/5 to-sage/40', image: healthcareEntrepreneurshipImg },
  ];

  const revealVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="moments" className="py-24 bg-sage/15 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            Moments & Milestones
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={revealVariants}
                className="group border border-accent/20 rounded-3xl p-2.5 bg-white shadow-sm hover:shadow-xl transition-all duration-300 aspect-square overflow-hidden cursor-pointer"
              >
                <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${item.gradient} flex flex-col justify-center items-center relative overflow-hidden`}>
                  
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]"
                    />
                  ) : (
                    <>
                      {/* Subtle Grid Lines */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.04] pointer-events-none">
                        {Array(16).fill(0).map((_, gridIdx) => (
                          <div key={gridIdx} className="border-t border-l border-navy"></div>
                        ))}
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-sm border border-accent/20 flex items-center justify-center text-teal group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10">
                        <Icon size={22} />
                      </div>
                    </>
                  )}

                  {/* Absolute Caption Overlay */}
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-[2px]">
                    <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/10 flex items-center justify-center text-white mb-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <Icon size={18} />
                    </div>
                    <span className="font-heading font-bold text-white text-base sm:text-lg uppercase tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-[50ms]">
                      {item.label}
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
