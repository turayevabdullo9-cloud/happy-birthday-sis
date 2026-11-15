import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { TRANSLATIONS, type Language } from './translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PersonalLetter } from './components/PersonalLetter';
import { Wishes } from './components/Wishes';
import { BirthdayCake } from './components/BirthdayCake';
import { Footer } from './components/Footer';

const LANGUAGE_STORAGE_KEY = 'begim_apa_language_v1';

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === 'uz' || saved === 'ru' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage issues
  }
  return 'uz';
}

export default function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.pageTitle;
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage issues
    }
  }, [language, t.meta.pageTitle]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAF6F0] text-[#3A2D28]">
        <Navbar
          language={language}
          onLanguageChange={setLanguage}
          t={t}
        />

        <main>
          <Hero t={t.hero} />
          <PersonalLetter t={t.letter} />
          <Wishes language={language} t={t.wishes} />
          <BirthdayCake t={t.cake} />
        </main>

        <Footer t={t.footer} />
      </div>
    </MotionConfig>
  );
}
