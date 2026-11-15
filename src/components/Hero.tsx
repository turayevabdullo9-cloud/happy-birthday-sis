import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import type { TranslationContent } from '../translations';

interface HeroProps {
  t: TranslationContent['hero'];
}

const DECORATIVE_PARTICLES = [
  { top: '16%', left: '12%', size: 6, delay: 0, duration: 6 },
  { top: '24%', left: '84%', size: 8, delay: 0.8, duration: 7 },
  { top: '38%', left: '18%', size: 5, delay: 1.5, duration: 5.5 },
  { top: '46%', left: '88%', size: 6, delay: 0.4, duration: 6.5 },
  { top: '70%', left: '14%', size: 7, delay: 1.1, duration: 7.2 },
  { top: '76%', left: '80%', size: 5, delay: 1.9, duration: 5.8 },
  { top: '18%', left: '54%', size: 4, delay: 0.6, duration: 6.2 },
  { top: '82%', left: '46%', size: 6, delay: 1.4, duration: 6.8 },
];

export function Hero({ t }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const numberScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const handleScrollToLetter = () => {
    const target = document.getElementById('letter');
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[calc(100svh-4.25rem)] scroll-mt-[68px] items-center justify-center overflow-hidden bg-[#FAF6F0] px-4 py-16 sm:px-6 lg:py-20"
    >
      {/* Warm Editorial Glow & Framing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(234, 210, 206, 0.42) 0%, rgba(239, 230, 216, 0.35) 38%, rgba(250, 246, 240, 0) 74%)',
        }}
      />

      {/* Fine Archival Border Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-8 border border-[#E2D6C5]/70"
      />

      {/* Subtle Floating Champagne & Rose Particles */}
      {!prefersReducedMotion &&
        DECORATIVE_PARTICLES.map((p, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full bg-[#C9A96E]/40"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              boxShadow: '0 0 12px rgba(201, 169, 110, 0.35)',
            }}
            animate={{
              y: [0, -14, 0],
              opacity: [0.35, 0.8, 0.35],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-3 text-center"
      >
        {/* Date Range Header */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] sm:text-xs font-medium tracking-[0.16em] sm:tracking-[0.26em] text-[#847068]"
        >
          {t.dateRange}
        </motion.p>

        {/* Sculptural Animated 22 Centerpiece */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={prefersReducedMotion ? undefined : { scale: numberScale }}
          className="mt-6 flex items-center gap-6 sm:gap-10"
        >
          <span
            aria-hidden="true"
            className="hidden sm:block h-px w-16 md:w-24 bg-[#C9A96E]/70"
          />
          <span
            className="font-serif text-[5.5rem] sm:text-[7.5rem] md:text-[8.75rem] font-normal leading-none tracking-tight text-[#9E6263] tabular-nums"
            style={{ textShadow: '0 8px 32px rgba(158, 98, 99, 0.12)' }}
          >
            {t.ageNumber}
          </span>
          <span
            aria-hidden="true"
            className="hidden sm:block h-px w-16 md:w-24 bg-[#C9A96E]/70"
          />
        </motion.div>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-2 font-serif text-base sm:text-lg italic text-[#6D5A52]"
        >
          {t.ageSubtitle}
        </motion.p>

        {/* Main Birthday Heading */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="mt-7 max-w-3xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-[#3A2D28] sm:text-5xl md:text-6xl"
        >
          {t.heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-[#5C4942] sm:text-lg"
        >
          {t.subtitle}
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45 }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={handleScrollToLetter}
            className="group inline-flex items-center gap-3 rounded-full bg-[#3A2D28] px-7 py-3.5 text-sm font-medium tracking-wide text-[#FAF6F0] shadow-sm transition-all duration-200 hover:bg-[#5C4942] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E6263] whitespace-nowrap"
          >
            <span>{t.cta}</span>
            <ArrowDown
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
