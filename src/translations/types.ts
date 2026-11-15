export type Language = 'uz' | 'ru' | 'en';

export interface TranslationContent {
  meta: {
    pageTitle: string;
    languageLabel: string;
  };
  nav: {
    brand: string;
    home: string;
    letter: string;
    wishes: string;
    surprise: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    kicker: string;
    heading: string;
    subtitle: string;
    dateRange: string;
    ageNumber: string;
    ageSubtitle: string;
    cta: string;
  };
  letter: {
    kicker: string;
    heading: string;
    envelopeLabel: string;
    openLetterCta: string;
    skipTypingCta: string;
    replayTypingCta: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    dateStamp: string;
  };
  wishes: {
    kicker: string;
    heading: string;
    description: string;
    openedCountLabel: string;
    revealAllButton: string;
    resetAllButton: string;
    tapHint: string;
    wishOpenedLabel: string;
  };
  cake: {
    kicker: string;
    heading: string;
    subtitle: string;
    candleCountLabel: string;
    revealButton: string;
    revealedBadge: string;
    finalAgeLabel: string;
    finalMessageParagraphs: string[];
    finalBigHeading: string;
    replayConfettiButton: string;
  };
  music: {
    title: string;
    trackName: string;
    playing: string;
    paused: string;
    playLabel: string;
    pauseLabel: string;
    volumeLabel: string;
    loadFileButton: string;
    customTrackHint: string;
  };
  footer: {
    mainText: string;
    dateRange: string;
    dedication: string;
  };
}
