import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LanguageContext,
  type Language,
  type LanguageContextValue,
} from "./LanguageContext";
const LANGUAGE_KEY = "kinfeast_language";
function getInitialLanguage(): Language {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  if (
    savedLanguage === "en" ||
    savedLanguage === "ar"
  ) {
    return savedLanguage;
  }
  return "en";
}
export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] =
    useState<Language>(getInitialLanguage);
  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);
  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
