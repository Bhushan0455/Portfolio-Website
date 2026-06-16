import { motion } from 'framer-motion';
import { RiArrowRightLine, RiDoubleQuotesL } from 'react-icons/ri';
import homeImg from '../assets/home.png';

export default function Hero({ preloaderActive }) {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Staggered reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  // GSAP-like Power4 clip reveal
  const clipVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1] // GreenSock Power4 easeOut equivalent
      }
    }
  };

  // Fade up for smaller content
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-16 flex items-center bg-gradient-to-b from-sage/20 via-white to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Quote */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={preloaderActive ? "hidden" : "visible"}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Priyanshu Chauhan Clip Reveal */}
            <div className="overflow-hidden mb-2">
              <motion.span
                variants={clipVariants}
                className="text-xs font-heading font-semibold tracking-wider text-teal uppercase block"
              >
                Priyanshu Chauhan
              </motion.span>
            </div>

            {/* Title Clip Reveal */}
            <div className="overflow-hidden mb-6">
              <motion.span
                variants={clipVariants}
                className="text-sm font-heading font-medium tracking-wide text-navy/60 uppercase block"
              >
                Founder & CEO, Beyond Bound
              </motion.span>
            </div>

            {/* Headline Clip Reveal */}
            <div className="overflow-hidden mb-6 py-1">
              <motion.h1
                variants={clipVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-navy leading-[1.15] block"
              >
                Building modern metabolic health solutions through purpose, curiosity, and trust.
              </motion.h1>
            </div>

            {/* Subheadline Fade Up */}
            <motion.p
              variants={fadeUpVariants}
              className="text-sm sm:text-base font-body text-navy/70 leading-relaxed mb-8 max-w-xl border-l border-accent pl-4"
            >
              Founder of Beyond Bound | MBA, KJ Somaiya Institute of Management | Ex-Patanjali B2B Sales Strategist
            </motion.p>

            {/* Buttons Fade Up */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10"
            >
              <button
                onClick={() => scrollTo('journey')}
                className="bg-teal hover:bg-teal-dark text-white font-body text-sm font-semibold tracking-wide px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Explore My Journey</span>
                <RiArrowRightLine className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scrollTo('building')}
                className="border border-teal/40 hover:border-teal text-teal hover:bg-teal/5 font-body text-sm font-semibold tracking-wide px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer text-center active:scale-95"
              >
                What I'm Building
              </button>
            </motion.div>

            {/* Quote Block Fade Up */}
            <motion.div
              variants={fadeUpVariants}
              className="relative p-6 bg-sage/30 rounded-2xl border border-teal/5 max-w-lg"
            >
              <div className="absolute -top-3 -left-3 text-teal/15">
                <RiDoubleQuotesL size={48} />
              </div>
              <p className="font-heading font-medium text-navy text-base sm:text-lg italic leading-relaxed pl-6">
                "People deserve health solutions they can truly trust."
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Image Frame */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <motion.div
              layoutId="founder-portrait"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={preloaderActive ? { opacity: 0 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[385px] aspect-[4/5] p-3 border border-accent/20 rounded-3xl bg-white shadow-xl shadow-navy/5 relative"
            >
              {/* Premium Blurred Ambient Glow Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={preloaderActive ? { opacity: 0 } : { opacity: 0.35 }}
                transition={{ delay: 0.8, duration: 1.0 }}
                className="absolute -inset-4 bg-cover bg-center rounded-[36px] pointer-events-none scale-105 z-[-1] blur-2xl"
                style={{ backgroundImage: `url(${homeImg})` }}
              />

              {/* Float Wrapper */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut'
                }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-teal/20 transition-shadow duration-500 border border-transparent hover:border-teal/20 group relative cursor-pointer"
              >
                {/* Founder Image */}
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                  src={homeImg}
                  alt="Priyanshu Chauhan"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1]"
                />

                {/* Subtle Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              </motion.div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal rounded-tl-3xl -translate-x-[1px] -translate-y-[1px]"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal rounded-tr-3xl translate-x-[1px] -translate-y-[1px]"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal rounded-bl-3xl -translate-x-[1px] translate-y-[1px]"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal rounded-br-3xl translate-x-[1px] translate-y-[1px]"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
