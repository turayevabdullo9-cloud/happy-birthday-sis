import { useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import type { Language, TranslationContent } from '../translations';
import { MusicPlayer } from './MusicPlayer';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationContent;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export function Navbar({ language, onLanguageChange, t }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = [
    { href: '#hero', label: t.nav.home },
    { href: '#letter', label: t.nav.letter },
    { href: '#wishes', label: t.nav.wishes },
    { href: '#surprise', label: t.nav.surprise },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5DACB] bg-[#FAF6F0]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#hero"
          className="font-serif text-xs sm:text-base font-semibold tracking-[0.14em] sm:tracking-[0.18em] text-[#3A2D28] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E6263]"
        >
          {t.nav.brand}
        </a>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5C4942]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#3A2D28] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#B89352] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E6263]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Switcher + Music Player + Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label={t.meta.languageLabel}
            className="inline-flex items-center rounded-full border border-[#DDD2C2] bg-[#FBF8F3] p-0.5"
          >
            {LANGUAGES.map((lang) => {
              const active = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageChange(lang.code)}
                  aria-pressed={active}
                  className={`rounded-full px-2 py-1 text-[11px] sm:px-2.5 sm:text-xs font-semibold tracking-wider transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E6263] ${
                    active
                      ? 'bg-[#3A2D28] text-[#FAF6F0]'
                      : 'text-[#6D5A52] hover:text-[#3A2D28]'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          <MusicPlayer t={t.music} />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#DDD2C2] bg-[#FBF8F3] text-[#3A2D28] lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E6263]"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Scroll Progress Hairline */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="h-[2px] w-full origin-left bg-gradient-to-r from-[#C9A96E] via-[#B87A7A] to-[#9E6263]"
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-[#E5DACB] bg-[#FAF6F0] px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleLinkClick}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#3A2D28] transition-colors hover:bg-[#EFE6D8]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
