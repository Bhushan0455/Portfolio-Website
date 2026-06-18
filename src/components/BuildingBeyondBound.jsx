import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import beyondboundImg from '../assets/beyondbound.jpg';

export default function BuildingBeyondBound() {
  const containerRef = useRef(null);
  
  // Parallax for the photo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      id="cgm" 
      className="py-24 md:py-32 bg-white relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Continuous Glucose Monitor Photo (60% width on large screens) */}
          <div className="lg:col-span-7 relative w-full">
            <motion.div 
              className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] shadow-xl border border-accent/10"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img 
                style={{ y: yParallax }}
                src={beyondboundImg} 
                alt="Priyanshu Chauhan showing Continuous Glucose Monitor (CGM) on his arm" 
                className="absolute -top-[10%] w-full h-[120%] object-cover object-center brightness-[0.95] contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
            
            {/* Small pull quote overlapping photo block */}
            <div className="absolute -bottom-6 -right-2 md:bottom-6 md:right-6 bg-accent text-white px-5 py-3 rounded-2xl shadow-lg border border-accent/20 z-20">
              <span className="font-heading text-xs font-bold uppercase tracking-widest block text-white/95">
                "The data is the product."
              </span>
            </div>
          </div>

          {/* RIGHT: Story Narrative (40% width on large screens) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="lg:col-span-5 text-left space-y-6"
          >
            <motion.span 
              variants={fadeUp}
              className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal block"
            >
              First-Hand Efficacy
            </motion.span>
            
            <motion.h3 
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-heading font-bold text-navy tracking-tight leading-snug"
            >
              Building Beyond Bound®
            </motion.h3>

            <motion.div 
              variants={fadeUp}
              className="space-y-4 font-body text-navy/80 text-sm sm:text-base leading-relaxed"
            >
              <p>
                To build a brand that people can trust, I had to start with myself. I strapped a continuous glucose monitor (CGM) to my own arm for months. I needed to witness the real-time metabolic impact of ingredients, diet, and lifestyle choices first-hand.
              </p>
              <p>
                It wasn't about relying on marketing literature; it was about generating direct, objective proof. This empirical baseline is what drove the formulation of Beyond Bound® Glycomics. If we cannot measure and prove the efficacy of our wellness solutions on ourselves, we have no right to offer them to anyone else.
              </p>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
