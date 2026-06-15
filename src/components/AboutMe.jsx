import { motion } from 'framer-motion';

export default function AboutMe() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Visual Tag */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="space-y-4"
            >
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal">
                Background
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy tracking-tight">
                About Me
              </h2>
              <div className="h-1 w-12 bg-accent rounded"></div>
              
              {/* Highlight Quote Box */}
              <div className="bg-sage/30 border-l-4 border-teal p-5 rounded-r-xl mt-8">
                <p className="font-heading font-medium text-navy text-sm italic leading-relaxed">
                  "Understanding health starts at the soil — bridging agriculture, strategy, and modern healthcare is the key to creating wellness solutions that actually work."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Story Narrative */}
          <div className="lg:col-span-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="space-y-6 text-left"
            >
              <motion.p
                variants={fadeUp}
                className="font-body text-navy/80 text-base sm:text-lg leading-relaxed font-light"
              >
                I am <strong className="font-medium text-navy">Priyanshu Chauhan</strong>, an entrepreneur, healthcare business strategist, and MBA graduate from KJ Somaiya Institute of Management.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-navy/70 text-base leading-relaxed"
              >
                My journey started in agriculture, where I worked closely with rural farming communities and assessed the impact of agricultural interventions across more than <strong className="font-medium text-navy">2,000 farmers</strong>. This experience helped generate significant value creation and exposed me to the gap between production, consumer demand, and healthcare outcomes.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-navy/70 text-base leading-relaxed"
              >
                Over time, I transitioned into healthcare and nutraceuticals, gaining experience in sales, market research, business development, and strategy. I have worked with organizations such as <strong className="font-medium text-navy">Patanjali Ayurveda</strong>, <strong className="font-medium text-navy">Britannia Industries</strong>, and <strong className="font-medium text-navy">Allied Market Research</strong>.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-navy/70 text-base leading-relaxed"
              >
                Today, I lead <strong className="font-medium text-teal">Beyond Bound</strong>, a consumer health company focused on creating modern metabolic wellness solutions inspired by Ayurvedic principles and scientific validation.
              </motion.p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
