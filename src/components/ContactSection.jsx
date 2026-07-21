import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMail, LuLinkedin, LuArrowRight, LuCheck, LuX } from 'react-icons/lu';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const reasonOptions = [
    'Partnership',
    'Retail / Distribution',
    'Media / Speaking',
    'Investment',
    'General Inquiry'
  ];

  // ── Validation ──
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.reason) newErrors.reason = 'Please select a reason';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', reason: '', message: '' });
      setErrors({});
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1200);
  };

  // ── Animation Variants ──
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
    }
  };

  // Shared input class
  const inputBase = `w-full bg-transparent border rounded-xl px-4 py-3 font-body text-sm text-navy dark:text-white placeholder:text-navy/30 dark:placeholder:text-white/25 outline-none transition-all duration-300 focus:ring-2 focus:ring-teal/20 dark:focus:ring-teal-light/20`;
  const inputNormal = `border-navy/10 dark:border-white/10 hover:border-navy/20 dark:hover:border-white/20 focus:border-teal dark:focus:border-teal-light`;
  const inputError = `border-red-400/60 dark:border-red-400/40 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400/20`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-white dark:bg-[#081220] transition-colors duration-300 select-none"
      style={{ paddingTop: 'clamp(72px, 8vw, 140px)', paddingBottom: 'clamp(72px, 6vw, 100px)' }}
    >
      {/* Decorative ambient elements */}
      <div className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-teal/5 dark:bg-teal/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-accent/5 dark:bg-accent/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ════════════════════════════════════════════
              LEFT COLUMN — ~45% (5 of 12 cols)
              ════════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            variants={containerVariants}
            className="lg:col-span-5 space-y-8"
          >
            {/* Section label — matches MomentsMilestones / HealthcareGap dash+label style */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-teal dark:bg-teal-light" />
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal-light">
                CONTACT
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              id="contact-title"
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-heading text-navy dark:text-white tracking-tight leading-[1.15]"
            >
              Let's build something worth trusting.
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-navy/65 dark:text-white/60 font-body text-base lg:text-[17px] leading-[1.75] max-w-md"
            >
              Open to partnerships, healthcare collaborations, speaking opportunities, retail &amp; distribution discussions, and meaningful conversations about evidence-led wellness.
            </motion.p>

            {/* Contact Cards */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3 pt-2">
              {/* Email Card */}
              <a
                href="mailto:founder@beyondbound.co"
                aria-label="Send email to founder@beyondbound.co"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-navy/10 dark:border-white/[0.07] bg-navy/[0.01] dark:bg-white/[0.02] hover:bg-navy/[0.03] dark:hover:bg-white/[0.04] hover:border-teal/30 dark:hover:border-teal-light/20 transition-all duration-300 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 text-teal dark:text-teal-light flex items-center justify-center group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0">
                  <LuMail size={19} />
                </div>
                <span className="text-sm font-body font-medium text-navy/70 dark:text-white/65 group-hover:text-navy dark:group-hover:text-white transition-colors duration-300">
                  founder@beyondbound.co
                </span>
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/priyanshu-chauhan-963981212/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile of Priyanshu Chauhan"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-navy/10 dark:border-white/[0.07] bg-navy/[0.01] dark:bg-white/[0.02] hover:bg-navy/[0.03] dark:hover:bg-white/[0.04] hover:border-teal/30 dark:hover:border-teal-light/20 transition-all duration-300 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 text-teal dark:text-teal-light flex items-center justify-center group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0">
                  <LuLinkedin size={19} />
                </div>
                <span className="text-sm font-body font-medium text-navy/70 dark:text-white/65 group-hover:text-navy dark:group-hover:text-white transition-colors duration-300">
                  LinkedIn — Priyanshu Chauhan
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════
              RIGHT COLUMN — ~55% (7 of 12 cols)
              ════════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-80px' }}
            variants={fadeInRight}
            className="lg:col-span-7"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="bg-white dark:bg-white/[0.02] border border-navy/10 dark:border-white/[0.07] rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 transition-colors duration-300"
            >
              {/* Name + Email row on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-navy/45 dark:text-white/40">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs font-body text-red-400 mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-navy/45 dark:text-white/40">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs font-body text-red-400 mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Reason dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="contact-reason" className="block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-navy/45 dark:text-white/40">
                  Reason
                </label>
                <div className="relative">
                  <select
                    id="contact-reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.reason}
                    className={`${inputBase} ${errors.reason ? inputError : inputNormal} appearance-none cursor-pointer pr-10 ${!formData.reason ? 'text-navy/30 dark:text-white/25' : ''}`}
                  >
                    <option value="" disabled>Select one</option>
                    {reasonOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-navy dark:text-white bg-white dark:bg-[#0F2744]">{opt}</option>
                    ))}
                  </select>
                  {/* Dropdown chevron */}
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 dark:text-white/30">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <AnimatePresence>
                  {errors.reason && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-xs font-body text-red-400 mt-1"
                    >
                      {errors.reason}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message textarea */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-navy/45 dark:text-white/40">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What would you like to talk about?"
                  rows={5}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  className={`${inputBase} ${errors.message ? inputError : inputNormal} resize-none`}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-xs font-body text-red-400 mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Send message"
                className="group w-full flex items-center justify-center gap-2.5 bg-teal hover:bg-teal-dark text-white font-heading font-semibold text-sm tracking-wide py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(13,115,119,0.2)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send message
                    <LuArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* ── Success Toast ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white dark:bg-navy border border-navy/10 dark:border-white/10 shadow-lg rounded-2xl px-6 py-4"
          >
            <div className="w-8 h-8 rounded-full bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center text-teal dark:text-teal-light flex-shrink-0">
              <LuCheck size={16} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-heading font-semibold text-navy dark:text-white">Message sent</p>
              <p className="text-xs font-body text-navy/50 dark:text-white/50">Thank you — I'll be in touch soon.</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-4 text-navy/30 dark:text-white/30 hover:text-navy dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <LuX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
