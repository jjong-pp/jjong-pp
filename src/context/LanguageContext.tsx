import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'KR' | 'EN';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const STORAGE_KEY = 'brandpage:language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'KR';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'EN' ? 'EN' : 'KR';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'KR' ? 'ko' : 'en';
  }, [language]);

  const toggleLanguage = () => setLanguage(prev => (prev === 'KR' ? 'EN' : 'KR'));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
