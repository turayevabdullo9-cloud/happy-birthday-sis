import { Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { TranslationContent } from '../translations';

interface FooterProps {
  t: TranslationContent['footer'];
}

export function Footer({ t }: FooterProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="border-t border-[#E5DACB] bg-[#FAF6F0] px-4 py-10 sm:px-6">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-3 text-center"
      >
        <div className="flex items-center gap-2 text-[#9E6263]">
          <motion.span
            aria-hidden="true"
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 1.18, 1] }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-flex"
          >
            <Heart className="h-4 w-4 fill-[#B87A7A]/30 text-[#9E6263]" />
          </motion.span>
          <p className="font-serif text-lg font-medium text-[#3A2D28]">
            {t.mainText}
          </p>
        </div>

        <p className="text-xs font-medium tracking-[0.22em] text-[#847068] tabular-nums">
          {t.dateRange}
        </p>
        <p className="text-xs text-[#847068]">{t.dedication}</p>
      </motion.div>
    </footer>
  );
}
