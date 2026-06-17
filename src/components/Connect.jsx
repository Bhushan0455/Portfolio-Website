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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const links = [
    {
      href: 'https://www.linkedin.com/in/priyanshu-chauhan-963981212/',
      label: 'LinkedIn',
      sub: 'Connect Professionally',
      icon: RiLinkedinBoxFill,
      accent: 'hover:border-teal/30 hover:shadow-[0_0_12px_rgba(13,115,119,0.1)]'
    },
    {
      href: 'mailto:founder@beyondbound.co',
      label: 'Email',
      sub: 'founder@beyondbound.co',
      icon: RiMailLine,
      accent: 'hover:border-accent/30 hover:shadow-[0_0_12px_rgba(201,168,124,0.1)]'
    },
    {
      href: 'https://beyondbound.co/',
      label: 'Beyond Bound',
      sub: 'Metabolic Wellness Venture',
      icon: RiGlobalLine,
      accent: 'hover:border-teal/30 hover:shadow-[0_0_12px_rgba(13,115,119,0.1)]'
    }
  ];

  const tags = ['Healthcare', 'Entrepreneurship', 'Metabolic Wellness'];

  return (
    <footer id="connect" className="bg-navy text-white py-12 relative overflow-hidden">
      {/* Background gradients/glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-5 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section 1 – Final Call to Action */}
        <div className="max-w-xl mx-auto mb-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-bold font-heading !text-white tracking-tight mb-2"
          >
            Let's Build Healthier Futures Together
          </motion.h2>
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="text-white/60 font-body text-xs sm:text-sm leading-relaxed mb-4 max-w-lg mx-auto"
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
              whileHover={{ scale: 1.02, boxShadow: '0 0 10px rgba(13, 115, 119, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-teal hover:bg-teal-light text-white text-xs font-heading font-semibold rounded-full shadow-md transition-colors duration-300"
            >
              <span>Connect With Me</span>
              <RiArrowRightUpLine size={14} />
            </motion.a>
          </motion.div>
        </div>

        {/* Section 2 – Contact & Socials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10"
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
                  y: -2,
                  scale: 1.01,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`bg-white/5 border border-white/10 rounded-lg p-4 text-left flex flex-col justify-between group transition-all duration-300 cursor-pointer ${link.accent}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/15 group-hover:text-accent-light transition-all duration-300">
                    <Icon size={16} />
                  </div>
                  <RiArrowRightUpLine size={14} className="text-white/20 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <div>
                  <span className="block text-[8px] font-heading font-semibold uppercase tracking-wider text-white/40 mb-0.5">
                    {link.sub}
                  </span>
                  <span className="font-heading font-bold text-sm text-white group-hover:text-accent transition-colors duration-200">
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
          className="relative inline-block max-w-xs mx-auto mb-8 px-5 py-3 rounded-[16px]"
        >
          {/* Accent radial glow behind the founder name */}
          <div className="absolute inset-0 bg-teal/10 rounded-[16px] blur-md pointer-events-none z-0" />

          <div className="relative z-10 space-y-2">
            <h3 className="font-heading font-bold text-xl sm:text-2xl !text-white tracking-tight">
              Priyanshu Chauhan
            </h3>
            
            <p className="font-heading text-[10px] text-accent uppercase tracking-widest font-semibold">
              Founder & CEO, Beyond Bound
            </p>
            
            <div className="flex flex-wrap justify-center gap-1 pt-0.5">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-body text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 4 – Footer Bottom Bar */}
        <div className="border-t border-white/10 pt-5 mt-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-white/40 text-[10px] text-center sm:text-left">
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
