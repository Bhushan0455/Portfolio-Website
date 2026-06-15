import { motion } from 'framer-motion';
import { RiCalendarEventLine, RiGraduationCapLine, RiVerifiedBadgeLine, RiArrowRightSLine } from 'react-icons/ri';

export default function ProfessionalJourney() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const experience = [
    {
      role: 'Founder & CEO',
      company: 'Beyond Bound',
      period: '2023–Present',
      points: [
        'Founded and scaled a nutraceutical and Ayurvedic wellness venture.',
        'Secured MSME, GST, FSSAI registrations, and trademark protection.',
        'Launched health products through D2C channels and e-commerce marketplaces.',
        'Led product strategy, branding, marketing, and business development.',
        'Transitioning Beyond Bound into a metabolic wellness-focused consumer brand.',
        'Working on Glycomics, a prediabetes and metabolic health initiative.'
      ]
    },
    {
      role: 'Strategy Freelancer',
      company: 'Zappy.care',
      period: 'Freelance',
      points: [
        'Led B2B business development initiatives.',
        'Structured strategic growth initiatives and market expansion planning.'
      ]
    },
    {
      role: 'B2B Sales Strategist',
      company: 'Patanjali Ayurveda',
      period: 'Sales Engagement',
      points: [
        'Achieved sales worth approximately ₹14 million.',
        'Managed distributor and distributor channel relationships.',
        'Developed regional market penetration strategies.'
      ]
    },
    {
      role: 'Sales Intern',
      company: 'Britannia Industries',
      period: 'Internship',
      points: [
        'Worked on energy bar sales initiatives.',
        'Supported field sales and market execution.'
      ]
    },
    {
      role: 'Market Research Analyst',
      company: 'Allied Market Research',
      period: 'Healthcare Research',
      points: [
        'Conducted secondary research in healthcare and pharmaceutical markets.',
        'Analyzed industry trends and competitive landscapes.',
        'Developed market intelligence reports.'
      ]
    }
  ];

  const certifications = [
    'MSME Registered Entrepreneur',
    'GST Registered Business',
    'FSSAI Certified',
    'Indian Trademark Holder (Beyond Bound)'
  ];

  return (
    <section id="journey" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
            The Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight mt-2">
            Professional Journey
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 mb-4"></div>
          <p className="font-body text-sm sm:text-base text-navy/60">
            A comprehensive look at my professional experience, education, and credentials.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left / Middle: Timeline (8 cols) */}
          <div className="lg:col-span-8 relative">
            {/* Center line (absolute position relative to content) */}
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border/80"></div>

            <div className="space-y-12">
              {experience.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={fadeUp}
                  className="relative pl-10 text-left group"
                >
                  {/* Circle Node */}
                  <div className="absolute left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-teal bg-white group-hover:bg-teal transition-all duration-300"></div>

                  {/* Card Content */}
                  <div className="bg-white border border-border/60 hover:border-teal/30 p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-navy">
                          {item.role}
                        </h3>
                        <span className="font-heading text-sm font-medium text-teal">
                          {item.company}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage/50 text-teal text-xs font-semibold rounded-full">
                        <RiCalendarEventLine size={12} />
                        {item.period}
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-navy/70 font-body text-sm sm:text-base leading-relaxed">
                          <RiArrowRightSLine className="text-accent mt-1 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Education & Certifications Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            
            {/* Education Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-sage/20 border border-teal/10 p-6 sm:p-8 rounded-2xl text-left"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal">
                  <RiGraduationCapLine size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-teal">
                    Education
                  </span>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    MBA Graduate
                  </h3>
                </div>
              </div>

              <h4 className="font-heading font-bold text-base text-navy mb-1">
                KJ Somaiya Institute of Management
              </h4>
              <p className="font-body text-xs text-navy/50 mb-4 uppercase tracking-wider">
                MBA Degree
              </p>

              <div className="border-t border-border/40 pt-4">
                <span className="text-xs font-heading font-semibold text-teal uppercase tracking-wider block mb-2">
                  Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Healthcare Management', 'Strategy', 'Marketing', 'Business Development'].map((f, fIdx) => (
                    <span key={fIdx} className="bg-white px-3 py-1 rounded-full text-xs font-body border border-border/60 text-navy/70">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Certifications Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white border border-border/80 p-6 sm:p-8 rounded-2xl text-left shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                  <RiVerifiedBadgeLine size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-accent">
                    Credentials
                  </span>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    Certifications
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.map((c, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2.5 py-1.5 border-b border-border/30 last:border-0">
                    <span className="w-2 h-2 rounded-full bg-teal shrink-0"></span>
                    <span className="font-body text-sm text-navy/80 font-medium">
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
