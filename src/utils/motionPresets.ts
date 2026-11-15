export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export const SECTION_VIEWPORT = {
  once: true,
  amount: 0.08,
} as const;

export const CARD_VIEWPORT = {
  once: true,
  amount: 0.05,
} as const;

export function fadeSlideUpProps(prefersReducedMotion: boolean | null, delay = 0) {
  return {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: SECTION_VIEWPORT,
    transition: {
      duration: 0.7,
      delay,
      ease: LUXURY_EASE,
    },
  } as const;
}
