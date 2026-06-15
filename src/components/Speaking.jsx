import { motion } from 'framer-motion';
import {
  RiLightbulbLine,
  RiFlagLine,
  RiLeafLine,
  RiHeartPulseLine,
  RiUserHeartLine,
  RiLineChartLine,
  RiPlantLine,
  RiRoadMapLine
} from 'react-icons/ri';

export default function Speaking() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const topics = [
    { title: 'Entrepreneurship', desc: 'Core principles of ideation, product development, strategy, and business scaling.', icon: RiLightbulbLine },
    { title: 'Startup Building in India', desc: 'Navigating GST, trademark registration, MSME systems, and local regulations.', icon: RiFlagLine },
    { title: 'Ayurveda & Modern Wellness', desc: 'Synthesizing age-old herbal wisdom with modern scientific and clinical validation.', icon: RiLeafLine },
    { title: 'Metabolic Health', desc: 'Addressing key public health concerns like prediabetes through preventive lifestyle interventions.', icon: RiHeartPulseLine },
    { title: 'Consumer Healthcare', desc: 'Understanding consumer health demands and building everyday, accessible wellness solutions.', icon: RiUserHeartLine },
    { title: 'D2C Brand Growth', desc: 'E-commerce channel optimization, marketplace strategy, brand building, and customer trust.', icon: RiLineChartLine },
    { title: 'Rural Dev & Agriculture', desc: 'Value creation in rural farming, production gaps, and agricultural support.', icon: RiPlantLine },
    { title: 'MBA to Startup Journey', desc: 'Translating academic frameworks into real-world business execution and entrepreneurship.', icon: RiRoadMapLine }
  ];

  return (
    <section id="speaking" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            Speaking & Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            Topics I Care About
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 mb-4"></div>
          <p className="font-body text-sm sm:text-base text-navy/60">
            Insights and discussions on startup building, metabolic health, consumer brands, and rural development.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {topics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="bg-white border border-border/70 hover:border-teal/30 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between text-left"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center text-teal mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-base tracking-tight mb-2">
                    {topic.title}
                  </h3>
                  <p className="font-body text-navy/60 text-xs sm:text-sm leading-relaxed">
                    {topic.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
