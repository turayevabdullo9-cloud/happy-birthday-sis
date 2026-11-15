import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MailOpen, RotateCcw } from 'lucide-react';
import type { TranslationContent } from '../translations';
import { fadeSlideUpProps, LUXURY_EASE, SECTION_VIEWPORT } from '../utils/motionPresets';

interface PersonalLetterProps {
  t: TranslationContent['letter'];
}

export function PersonalLetter({ t }: PersonalLetterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpened, setIsOpened] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);

  const fullBodyText = useMemo(() => t.paragraphs.join('\n\n'), [t.paragraphs]);
  const totalChars = fullBodyText.length;

  useEffect(() => {
    if (!isOpened) return;
    if (prefersReducedMotion) {
      setVisibleChars(totalChars);
      return;
    }
    if (visibleChars >= totalChars) return;

    const timer = window.setTimeout(() => {
      // Smooth readable typing cadence (3 chars per 18ms tick)
      setVisibleChars((prev) => Math.min(prev + 3, totalChars));
    }, 18);

    return () => window.clearTimeout(timer);
  }, [isOpened, visibleChars, totalChars, prefersReducedMotion]);

  const prevSalutationRef = useRef(t.salutation);

  // If language changes while letter is already open, fast-forward to full text in the new language
  useEffect(() => {
    if (prevSalutationRef.current !== t.salutation) {
      prevSalutationRef.current = t.salutation;
      if (isOpened) {
        setVisibleChars(totalChars);
      }
    }
  }, [t.salutation, totalChars, isOpened]);

  const isTypingComplete = visibleChars >= totalChars;

  const handleOpenLetter = () => {
    setIsOpened(true);
    setVisibleChars(prefersReducedMotion ? totalChars : 0);
  };

  const handleSkipTyping = () => {
    setVisibleChars(totalChars);
  };

  const handleReplayTyping = () => {
    setVisibleChars(0);
  };

  const revealedParagraphs = useMemo(() => {
    const slice = fullBodyText.slice(0, visibleChars);
    return slice.split('\n\n');
  }, [fullBodyText, visibleChars]);

  return (
    <section
      id="letter"
      className="scroll-mt-[68px] border-t border-[#E5DACB] bg-[#F5ECE0]/55 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          {...fadeSlideUpProps(prefersReducedMotion)}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9E6263]">
            {t.kicker}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#3A2D28] sm:text-4xl lg:text-[2.75rem]">
            {t.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
          className="mt-12"
        >
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.div
                key="closed-envelope"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="paper-texture relative mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-[#DDD2C2] px-6 py-14 text-center shadow-md sm:px-12 sm:py-16"
              >
                {/* Delicate double inner stationery frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 rounded-xl border border-[#C9A96E]/35"
                />

                {/* Wax Seal Motif */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#B87A7A]/50 bg-[#9E6263] text-[#FAF6F0] shadow-md">
                  <span className="font-serif text-2xl font-semibold tracking-wider">
                    22
                  </span>
                </div>

                <p className="mt-6 font-serif text-2xl font-medium text-[#3A2D28] sm:text-3xl">
                  {t.envelopeLabel}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#847068]">
                  {t.dateStamp}
                </p>

                <button
                  type="button"
                  onClick={handleOpenLetter}
                  className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#3A2D28] px-7 py-3.5 text-sm font-medium text-[#FAF6F0] shadow-sm transition-colors duration-200 hover:bg-[#5C4942] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E6263]"
                >
                  <MailOpen className="h-4 w-4" aria-hidden="true" />
                  <span>{t.openLetterCta}</span>
                </button>
              </motion.div>
            ) : (
              <motion.article
                key="opened-letter"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55 }}
                className="paper-texture relative rounded-2xl border border-[#DDD2C2] px-6 py-10 shadow-lg sm:px-12 sm:py-14"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3.5 rounded-xl border border-[#C9A96E]/30"
                />

                {/* Top stationery bar */}
                <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DACB] pb-5">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#847068]">
                    {t.dateStamp}
                  </span>

                  <div className="flex items-center gap-2">
                    {!isTypingComplete ? (
                      <button
                        type="button"
                        onClick={handleSkipTyping}
                        className="rounded-full border border-[#DDD2C2] bg-[#FAF6F0] px-3.5 py-1.5 text-xs font-medium text-[#3A2D28] transition-colors hover:border-[#B89352]"
                      >
                        {t.skipTypingCta}
                      </button>
                    ) : (
                      !prefersReducedMotion && (
                        <button
                          type="button"
                          onClick={handleReplayTyping}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD2C2] bg-[#FAF6F0] px-3.5 py-1.5 text-xs font-medium text-[#6D5A52] transition-colors hover:border-[#B89352] hover:text-[#3A2D28]"
                        >
                          <RotateCcw className="h-3 w-3" aria-hidden="true" />
                          <span>{t.replayTypingCta}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Letter Salutation & Body */}
                <div className="relative mt-8 space-y-5 font-serif text-lg leading-[1.85] text-[#3A2D28] sm:text-[1.22rem]">
                  <p className="text-2xl font-semibold text-[#9E6263]">
                    {t.salutation}
                  </p>

                  {revealedParagraphs.map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph}
                      {index === revealedParagraphs.length - 1 &&
                        !isTypingComplete && (
                          <span
                            aria-hidden="true"
                            className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-[#9E6263] align-middle"
                          />
                        )}
                    </p>
                  ))}
                </div>

                {/* Handwritten Signature */}
                {isTypingComplete && (
                  <motion.footer
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative mt-10 border-t border-[#E5DACB] pt-7 text-right"
                  >
                    <p className="text-sm text-[#6D5A52]">{t.closing}</p>
                    <p className="mt-2 font-script text-3xl text-[#9E6263] sm:text-4xl">
                      {t.signature}
                    </p>
                  </motion.footer>
                )}
              </motion.article>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
