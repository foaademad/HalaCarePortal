import { createContext, useContext, useEffect, useState } from "react";
import en from "@/locales/en";
import ar from "@/locales/ar";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tList: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "en";
    }
    return "en";
  });

  const isRTL = language === "ar";

  useEffect(() => {
    const root = window.document.documentElement;
    root.lang = language;
    root.dir = isRTL ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "ar" : "en");
  };

  // Translation function using external locale files
  type Translations = Record<string, string | string[]>;
  const dictionaries: Record<Language, Translations> = { en, ar };
  const t = (key: string): string => {
    const value = dictionaries[language][key];
    if (Array.isArray(value)) return value[0] ?? key;
    return (value as string) ?? key;
  };

  const tList = (key: string): string[] => {
    const value = dictionaries[language][key];
    return Array.isArray(value) ? value : [];
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleLanguage, t, tList }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
