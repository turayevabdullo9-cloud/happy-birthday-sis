import { uz } from './uz';
import { ru } from './ru';
import { en } from './en';
import type { Language, TranslationContent } from './types';

export const TRANSLATIONS: Record<Language, TranslationContent> = {
  uz,
  ru,
  en,
};

export type { Language, TranslationContent } from './types';
