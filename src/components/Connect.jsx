import { motion } from 'framer-motion';
import { RiMailLine, RiLinkedinBoxFill, RiGlobalLine, RiArrowRightUpLine } from 'react-icons/ri';

export default function Connect() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const links = [
    {
      href: 'https://www.linkedin.com/in/priyanshu-chauhan-963981212/',
      label: 'LinkedIn',
      sub: 'Connect Professionally',
      icon: RiLinkedinBoxFill,
      accent: 'hover:border-teal/30 hover:shadow-[0_0_15px_rgba(13,115,119,0.12)]'
    },
    {
      href: 'mailto:founder@beyondbound.co',
      label: 'Email',
      sub: 'founder@beyondbound.co',
      icon: RiMailLine,
      accent: 'hover:border-accent/30 hover:shadow-[0_0_15px_rgba(201,168,124,0.12)]'
    },
    {
      href: 'https://beyondbound.co/',
      label: 'Beyond Bound',
      sub: 'Metabolic Wellness Venture',
      icon: RiGlobalLine,
      accent: 'hover:border-teal/30 hover:shadow-[0_0_15px_rgba(13,115,119,0.12)]'
    }
  ];

  const tags = ['Healthcare', 'Entrepreneurship', 'Metabolic Wellness'];

  return (
    <footer id="connect" className="bg-navy text-white py-16 relative overflow-hidden">
      {/* Background gradients/glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-5 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section 1 – Final Call to Action */}
        <div className="max-w-2xl mx-auto mb-12">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold font-heading !text-white tracking-tight mb-4"
          >
            Let's Build Healthier Futures Together
          </motion.h2>
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="text-white/70 font-body text-sm sm:text-base leading-relaxed mb-6 max-w-xl mx-auto"
          >
            Whether you're an investor, operator, healthcare professional, entrepreneur, or someone passionate about building meaningful solutions, I'd love to connect and exchange ideas.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <motion.a
              href="https://www.linkedin.com/in/priyanshu-chauhan-963981212/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(13, 115, 119, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal-light text-white text-sm font-heading font-semibold rounded-full shadow-md transition-colors duration-300"
            >
              <span>Connect With Me</span>
              <RiArrowRightUpLine size={16} />
            </motion.a>
          </motion.div>
        </div>

        {/* Section 2 – Contact & Socials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-16"
        >
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={idx}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={fadeUp}
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`bg-white/5 border border-white/10 rounded-xl p-5 text-left flex flex-col justify-between group transition-all duration-300 cursor-pointer ${link.accent}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/15 group-hover:text-accent-light transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <RiArrowRightUpLine size={16} className="text-white/20 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <div>
                  <span className="block text-[9px] font-heading font-semibold uppercase tracking-wider text-white/40 mb-1">
                    {link.sub}
                  </span>
                  <span className="font-heading font-bold text-base text-white group-hover:text-accent transition-colors duration-200">
                    {link.label}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Section 3 – Founder Identity */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={scaleIn}
          className="relative inline-block max-w-sm mx-auto mb-12 px-6 py-4 rounded-[20px]"
        >
          {/* Accent radial glow behind the founder name */}
          <div className="absolute inset-0 bg-teal/10 rounded-[20px] blur-lg pointer-events-none z-0" />

          <div className="relative z-10 space-y-3">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl !text-white tracking-tight">
              Priyanshu Chauhan
            </h3>
            
            <p className="font-heading text-xs text-accent uppercase tracking-widest font-semibold">
              Founder & CEO, Beyond Bound
            </p>
            
            <div className="flex flex-wrap justify-center gap-1.5 pt-1">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-body text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 4 – Footer Bottom Bar */}
        <div className="border-t border-white/10 pt-6 mt-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-white/40 text-[11px] text-center sm:text-left">
            <span>
              &copy; 2026 Priyanshu Chauhan. All Rights Reserved.
            </span>
            <span className="font-body tracking-wider italic text-white/50">
              Built with purpose, innovation, and long-term thinking.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
