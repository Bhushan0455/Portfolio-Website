import { motion } from 'framer-motion';
import { RiMailLine, RiPhoneLine, RiLinkedinBoxFill, RiGlobalLine } from 'react-icons/ri';

export default function Connect() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const links = [
    { href: 'mailto:the@priyanshuchauhan.com', label: 'the@priyanshuchauhan.com', icon: RiMailLine, tag: 'Professional Email' },
    { href: 'https://beyondbound.in', label: 'Beyond Bound Website', icon: RiGlobalLine, tag: 'Company' },
    { href: 'https://www.linkedin.com/in/priyanshu-chauhan-bb', label: 'LinkedIn Profile', icon: RiLinkedinBoxFill, tag: 'Professional Network' }
  ];

  return (
    <footer id="connect" className="bg-navy text-white pt-24 pb-12 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Profile Card Area */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex flex-col items-center mb-16"
        >
          {/* Small Rounded Image Thumbnail */}
          <div className="w-20 h-20 rounded-full overflow-hidden border border-white/20 mb-4 bg-white/5 shadow-inner">
            <img
              src="/founder_hero.png"
              alt="Priyanshu Chauhan"
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="font-heading font-bold text-2xl tracking-tight text-white mb-1">
            Priyanshu Chauhan
          </h3>
          <p className="font-heading text-sm text-accent tracking-wider uppercase font-semibold">
            Founder & CEO, Beyond Bound
          </p>
          <div className="h-0.5 w-12 bg-accent mt-4"></div>
        </motion.div>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={idx}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.08)' }}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                  <Icon size={18} />
                </div>
                <div>
                  <span className="block text-[9px] font-heading font-semibold uppercase tracking-wider text-white/40">
                    {link.tag}
                  </span>
                  <span className="font-body text-sm text-white/80 group-hover:text-accent transition-colors duration-200">
                    {link.label}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Footer Message */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="border-t border-white/10 pt-10 pb-4 space-y-4"
        >
          <p className="font-heading text-white/60 text-lg sm:text-xl italic font-medium leading-relaxed">
            "Thank you for taking the time to know my journey."
          </p>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-xs pt-4">
            <span>
              &copy; {new Date().getFullYear()} Priyanshu Chauhan. All Rights Reserved.
            </span>
            <span className="italic">
              Ayurveda. Science. Prevention.
            </span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
