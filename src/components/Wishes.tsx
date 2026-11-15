import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { WISHES_DATA } from '../data/wishes';
import type { Language, TranslationContent } from '../translations';
import { CARD_VIEWPORT, fadeSlideUpProps, LUXURY_EASE } from '../utils/motionPresets';

interface WishesProps {
  language: Language;
  t: TranslationContent['wishes'];
}

export function Wishes({ language, t }: WishesProps) {
  const prefersReducedMotion = useReducedMotion();
  const [openedNumbers, setOpenedNumbers] = useState<number[]>([1]);

  const toggleWish = (num: number) => {
    setOpenedNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const allOpened = openedNumbers.length === WISHES_DATA.length;

  const handleToggleAll = () => {
    if (allOpened) {
      setOpenedNumbers([]);
    } else {
      setOpenedNumbers(WISHES_DATA.map((w) => w.number));
    }
  };

  return (
    <section
      id="wishes"
      className="scroll-mt-[68px] border-t border-[#E5DACB] bg-[#FAF6F0] px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header & Progress */}
        <motion.div
          {...fadeSlideUpProps(prefersReducedMotion)}
          className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9E6263]">
              {t.kicker}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#3A2D28] sm:text-4xl lg:text-[2.75rem]">
              {t.heading}
            </h2>
            <p className="mt-3 text-base text-[#5C4942]">{t.description}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <span className="text-xs font-medium tracking-wide text-[#6D5A52] tabular-nums">
              {t.openedCountLabel}: {openedNumbers.length} / {WISHES_DATA.length}
            </span>
            <button
              type="button"
              onClick={handleToggleAll}
              className="rounded-full border border-[#DDD2C2] bg-[#FBF8F3] px-4 py-2 text-xs font-medium text-[#3A2D28] transition-colors hover:border-[#B89352] hover:bg-[#EFE6D8] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E6263]"
            >
              {allOpened ? t.resetAllButton : t.revealAllButton}
            </button>
          </div>
        </motion.div>

        {/* 22 Wishes Responsive Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WISHES_DATA.map((wish, idx) => {
            const isOpen = openedNumbers.includes(wish.number);
            const paddedNum = String(wish.number).padStart(2, '0');

            return (
              <motion.div
                key={wish.number}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 22, scale: 0.97 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={CARD_VIEWPORT}
                transition={{
                  duration: 0.4,
                  delay: (idx % 4) * 0.04,
                  ease: LUXURY_EASE,
                }}
                className="flex"
              >
                <button
                  type="button"
                  onClick={() => toggleWish(wish.number)}
                  aria-expanded={isOpen}
                  data-testid={`wish-card-${wish.number}`}
                  className={`group flex w-full flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E6263] ${
                    isOpen
                      ? 'border-[#C9A96E] bg-[#FBF8F3] shadow-sm'
                      : 'border-[#E5DACB] bg-[#FBF8F3]/70 hover:-translate-y-0.5 hover:border-[#C9A96E]/70 hover:bg-[#FBF8F3]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif text-2xl font-normal text-[#9E6263] tabular-nums">
                        {paddedNum}
                      </span>
                      <Sparkles
                        className={`h-4 w-4 transition-colors duration-200 ${
                          isOpen ? 'text-[#B89352]' : 'text-[#CBBBA6] group-hover:text-[#B89352]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-[#3A2D28]">
                      {wish.title[language]}
                    </h3>
                  </div>

                  <AnimatePresence initial={false} mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="wish-body"
                        initial={
                          prefersReducedMotion ? false : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={
                          prefersReducedMotion
                            ? undefined
                            : { opacity: 0, height: 0, transition: { duration: 0.12 } }
                        }
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 border-t border-[#EFE6D8] pt-3 text-sm leading-relaxed text-[#5C4942]">
                          {wish.message[language]}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="wish-hint"
                        initial={prefersReducedMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={
                          prefersReducedMotion
                            ? undefined
                            : { opacity: 0, transition: { duration: 0.08 } }
                        }
                        transition={{ duration: 0.15 }}
                        className="mt-4 text-xs font-medium text-[#847068]"
                      >
                        {t.tapHint}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
