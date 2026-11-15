import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthday';
import type { TranslationContent } from '../translations';
import { launchLuxuryConfetti } from '../utils/confetti';
import { fadeSlideUpProps, LUXURY_EASE, SECTION_VIEWPORT } from '../utils/motionPresets';

interface BirthdayCakeProps {
  t: TranslationContent['cake'];
}

interface CandlePos {
  id: number;
  x: number;
  y: number;
  height: number;
  delay: number;
}

// Exactly 22 candles: 10 on top tier + 6 on middle-left ledge + 6 on middle-right ledge = 22
const CANDLE_POSITIONS: CandlePos[] = [
  // Top tier (10 candles: x from 183 to 317)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    x: 185 + i * 14.5,
    y: 124 - (i % 2 === 0 ? 3 : 0),
    height: i % 2 === 0 ? 34 : 30,
    delay: (i * 0.14) % 1.2,
  })),
  // Middle tier left wing (6 candles: x from 118 to 168)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: 11 + i,
    x: 118 + i * 10,
    y: 194 - (i % 2 === 0 ? 2 : 0),
    height: 30,
    delay: ((10 + i) * 0.17) % 1.2,
  })),
  // Middle tier right wing (6 candles: x from 332 to 382)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: 17 + i,
    x: 332 + i * 10,
    y: 194 - (i % 2 === 1 ? 2 : 0),
    height: 30,
    delay: ((16 + i) * 0.15) % 1.2,
  })),
];

export function BirthdayCake({ t }: BirthdayCakeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cleanupConfettiRef = useRef<(() => void) | null>(null);
  const surpriseCardRef = useRef<HTMLDivElement | null>(null);
  const scrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      cleanupConfettiRef.current?.();
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const triggerConfetti = () => {
    if (prefersReducedMotion || !canvasRef.current) return;
    cleanupConfettiRef.current?.();
    cleanupConfettiRef.current = launchLuxuryConfetti(canvasRef.current);
  };

  const scrollToSurpriseCard = () => {
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(() => {
      surpriseCardRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'center',
      });
    }, 80);
  };

  const handleOpenSurprise = () => {
    setIsRevealed(true);
    triggerConfetti();
    if (prefersReducedMotion) {
      scrollToSurpriseCard();
    }
  };

  return (
    <section
      id="surprise"
      className="relative scroll-mt-[68px] overflow-hidden border-t border-[#E5DACB] bg-[#F5ECE0]/70 px-4 py-20 sm:px-6 lg:py-28"
    >
      {/* Full-viewport Confetti Overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div {...fadeSlideUpProps(prefersReducedMotion)}>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9E6263]">
            {t.kicker}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#3A2D28] sm:text-4xl lg:text-[2.75rem]">
            {t.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#5C4942]">
            {t.subtitle}
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[#847068] tabular-nums">
            {t.candleCountLabel}
          </p>
        </motion.div>

        {/* Luxury 3D-Styled 22-Candle Birthday Cake */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.75, ease: LUXURY_EASE }}
          className="relative mx-auto mt-8 max-w-[500px]"
        >
          <motion.div
            animate={
              isRevealed && !prefersReducedMotion
                ? { scale: [1, 1.03, 1], y: [0, -6, 0] }
                : undefined
            }
            transition={{ duration: 0.7 }}
          >
          {/* Ambient Golden Glow Behind Cake */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-12 top-6 bottom-12 rounded-full blur-3xl transition-opacity duration-700 ${
              isRevealed ? 'bg-[#C9A96E]/35 opacity-100' : 'bg-[#EAD2CE]/40 opacity-75'
            }`}
          />

          <svg
            viewBox="0 0 500 390"
            role="img"
            aria-label={`${t.heading} — ${BIRTHDAY_CONFIG.candleCount}`}
            className="relative z-10 h-auto w-full drop-shadow-md"
          >
            <defs>
              <linearGradient id="creamTier" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EFE3D2" />
                <stop offset="35%" stopColor="#FDF9F3" />
                <stop offset="70%" stopColor="#F6EDE0" />
                <stop offset="100%" stopColor="#E3D2BC" />
              </linearGradient>

              <linearGradient id="champagneGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B08949" />
                <stop offset="50%" stopColor="#DFC38D" />
                <stop offset="100%" stopColor="#A67E3E" />
              </linearGradient>

              <linearGradient id="blushFrosting" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F3DCDA" />
                <stop offset="100%" stopColor="#DFB7B3" />
              </linearGradient>

              <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE599" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#F6B96E" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#F6B96E" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="candleBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E9DCC9" />
                <stop offset="50%" stopColor="#FFFDF9" />
                <stop offset="100%" stopColor="#D6C3A9" />
              </linearGradient>
            </defs>

            {/* Pedestal Stand */}
            <ellipse cx="250" cy="356" rx="115" ry="13" fill="url(#champagneGold)" opacity="0.85" />
            <path d="M232 325 L268 325 L278 352 L222 352 Z" fill="url(#champagneGold)" />
            <ellipse cx="250" cy="322" rx="185" ry="18" fill="url(#champagneGold)" />
            <ellipse cx="250" cy="318" rx="178" ry="14" fill="#FDF9F3" />

            {/* Bottom Tier */}
            <path
              d="M88 254 L88 312 C88 326 412 326 412 312 L412 254 Z"
              fill="url(#creamTier)"
              stroke="#DFD0BC"
              strokeWidth="1"
            />
            <ellipse cx="250" cy="254" rx="162" ry="17" fill="#FAF4EA" stroke="#DFD0BC" strokeWidth="1" />

            {/* Blush Piping & Champagne Ribbon on Bottom Tier */}
            <path
              d="M88 298 Q250 315 412 298 L412 308 Q250 325 88 308 Z"
              fill="url(#blushFrosting)"
            />
            <path
              d="M90 258 Q115 276 140 260 Q165 276 190 260 Q215 276 240 260 Q265 276 290 260 Q315 276 340 260 Q365 276 390 260 Q402 269 412 258"
              fill="none"
              stroke="#DFB7B3"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Middle Tier */}
            <path
              d="M112 194 L112 252 C112 264 388 264 388 252 L388 194 Z"
              fill="url(#creamTier)"
              stroke="#DFD0BC"
              strokeWidth="1"
            />
            <ellipse cx="250" cy="194" rx="138" ry="15" fill="#FBF6EE" stroke="#DFD0BC" strokeWidth="1" />

            {/* Champagne Gold Band on Middle Tier */}
            <path
              d="M112 238 Q250 253 388 238 L388 245 Q250 260 112 245 Z"
              fill="url(#champagneGold)"
              opacity="0.85"
            />

            {/* Top Tier */}
            <path
              d="M174 124 L174 190 C174 200 326 200 326 190 L326 124 Z"
              fill="url(#creamTier)"
              stroke="#DFD0BC"
              strokeWidth="1"
            />
            <ellipse cx="250" cy="124" rx="76" ry="12" fill="#FFFDF9" stroke="#DFD0BC" strokeWidth="1" />

            {/* Delicate Blush Drip on Top Tier */}
            <path
              d="M174 126 Q190 144 202 129 Q214 150 228 131 Q244 146 258 130 Q274 149 288 131 Q304 145 326 126 L326 124 Q250 135 174 124 Z"
              fill="url(#blushFrosting)"
            />

            {/* Front Plaque "22" */}
            <circle cx="250" cy="222" r="18" fill="#FAF6F0" stroke="#C9A96E" strokeWidth="1.5" />
            <text
              x="250"
              y="228"
              textAnchor="middle"
              fill="#9E6263"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize="18"
              fontWeight="600"
            >
              22
            </text>

            {/* Exactly 22 Glowing Animated Candles */}
            {CANDLE_POSITIONS.map((candle) => {
              const topY = candle.y - candle.height;
              return (
                <g
                  key={candle.id}
                  data-testid="cake-candle"
                  aria-label={`Candle ${candle.id}`}
                >
                  {/* Warm Ambient Halo */}
                  <circle
                    cx={candle.x}
                    cy={topY - 11}
                    r={isRevealed ? 16 : 12}
                    fill="url(#flameGlow)"
                  />

                  {/* Candle Stick */}
                  <rect
                    x={candle.x - 2.6}
                    y={topY}
                    width="5.2"
                    height={candle.height}
                    rx="1.5"
                    fill="url(#candleBody)"
                    stroke="#D6C3A9"
                    strokeWidth="0.6"
                  />

                  {/* Subtle Gold Accent Stripe */}
                  <line
                    x1={candle.x - 2.4}
                    y1={topY + candle.height * 0.35}
                    x2={candle.x + 2.4}
                    y2={topY + candle.height * 0.45}
                    stroke="#C9A96E"
                    strokeWidth="1"
                  />

                  {/* Wick */}
                  <line
                    x1={candle.x}
                    y1={topY}
                    x2={candle.x}
                    y2={topY - 4}
                    stroke="#4A3832"
                    strokeWidth="1"
                  />

                  {/* Animated Flame */}
                  <g
                    className="animate-candle-flame"
                    style={{
                      transformOrigin: `${candle.x}px ${topY - 4}px`,
                      animationDelay: `${candle.delay}s`,
                    }}
                  >
                    <path
                      d={`M ${candle.x} ${topY - 16} C ${candle.x + 4.2} ${topY - 10}, ${candle.x + 3.4} ${topY - 4}, ${candle.x} ${topY - 4} C ${candle.x - 3.4} ${topY - 4}, ${candle.x - 4.2} ${topY - 10}, ${candle.x} ${topY - 16} Z`}
                      fill="#F7A94B"
                    />
                    <path
                      d={`M ${candle.x} ${topY - 12.5} C ${candle.x + 2} ${topY - 8.5}, ${candle.x + 1.6} ${topY - 5}, ${candle.x} ${topY - 5} C ${candle.x - 1.6} ${topY - 5}, ${candle.x - 2} ${topY - 8.5}, ${candle.x} ${topY - 12.5} Z`}
                      fill="#FFF5C3"
                    />
                  </g>
                </g>
              );
            })}
          </svg>
          </motion.div>
        </motion.div>

        {/* Action Button or Revealed Celebration */}
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            if (isRevealed) {
              scrollToSurpriseCard();
            }
          }}
        >
          {!isRevealed ? (
            <motion.div
              key="surprise-trigger"
              {...fadeSlideUpProps(prefersReducedMotion, 0.15)}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, y: -8, transition: { duration: 0.15, delay: 0 } }
              }
              className="mt-8"
            >
              <button
                type="button"
                onClick={handleOpenSurprise}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#3A2D28] px-8 py-4 text-sm font-medium tracking-wide text-[#FAF6F0] shadow-md transition-all duration-200 hover:bg-[#5C4942] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E6263]"
              >
                <Sparkles className="h-4 w-4 text-[#DFC38D]" aria-hidden="true" />
                <span>{t.revealButton}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              ref={surpriseCardRef}
              key="surprise-message"
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65 }}
              className="paper-texture relative mx-auto mt-10 max-w-2xl rounded-2xl border border-[#C9A96E]/60 px-6 py-10 shadow-lg sm:px-12 sm:py-12"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 rounded-xl border border-[#C9A96E]/30"
              />

              <p className="relative text-xs font-semibold uppercase tracking-[0.26em] text-[#9E6263]">
                {t.revealedBadge}
              </p>

              {/* Grand Number 22 */}
              <div className="relative mt-4 flex items-center justify-center gap-4">
                <span aria-hidden="true" className="h-px w-12 bg-[#C9A96E]/70" />
                <span className="font-serif text-6xl font-semibold text-[#9E6263] tabular-nums sm:text-7xl">
                  {t.finalAgeLabel}
                </span>
                <span aria-hidden="true" className="h-px w-12 bg-[#C9A96E]/70" />
              </div>

              <div className="relative mt-6 space-y-4 font-serif text-lg leading-relaxed text-[#3A2D28] sm:text-xl">
                {t.finalMessageParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <h3 className="relative mt-8 border-t border-[#E5DACB] pt-7 font-serif text-2xl font-bold tracking-wide text-[#9E6263] sm:text-3xl">
                {t.finalBigHeading}
              </h3>

              <div className="relative mt-7">
                <button
                  type="button"
                  onClick={triggerConfetti}
                  className="inline-flex items-center gap-2 rounded-full border border-[#C9A96E] bg-[#FAF6F0] px-5 py-2.5 text-xs font-medium text-[#3A2D28] transition-colors hover:bg-[#EFE6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E6263]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#B89352]" aria-hidden="true" />
                  <span>{t.replayConfettiButton}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
