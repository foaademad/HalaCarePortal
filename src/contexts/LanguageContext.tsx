import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
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

  // Simple translation function - in a real app this would use i18next or similar
  const t = (key: string): string => {
    const translations: Record<string, Record<Language, string>> = {
      // Navigation
      "nav.home": { en: "Home", ar: "الرئيسية" },
      "nav.about": { en: "About", ar: "عن المركز" },
      "nav.services": { en: "Services", ar: "الخدمات" },
      "nav.doctors": { en: "Our Doctors", ar: "أطباؤنا" },
      "nav.articles": { en: "Articles", ar: "المقالات" },
      "nav.contact": { en: "Contact", ar: "تواصل معنا" },
      "nav.complaints": { en: "Complaints", ar: "الشكاوى" },
      
      // Site Info
      "site.name": { en: "Hala Care", ar: "مركز حلا للرعاية" },
      "site.subtitle": { en: "Medical Center", ar: "المركز الطبي" },
      
      // Hero Section
      "hero.title1": { en: "Excellence in", ar: "التميز في" },
      "hero.title2": { en: "Healthcare", ar: "الرعاية الصحية" },
      "hero.description": { 
        en: "Providing comprehensive medical care with cutting-edge technology and compassionate service for your health and wellness.",
        ar: "نوفر رعاية طبية شاملة بأحدث التقنيات وخدمة رحيمة من أجل صحتكم ورفاهيتكم."
      },
      "hero.book_appointment": { en: "Book Appointment", ar: "احجز موعد" },
      "hero.our_services": { en: "Our Services", ar: "خدماتنا" },
      
      // Stats
      "stats.patients": { en: "Happy Patients", ar: "مريض راضي" },
      "stats.doctors": { en: "Expert Doctors", ar: "طبيب خبير" },
      "stats.experience": { en: "Years Experience", ar: "سنة خبرة" },
      "stats.availability": { en: "Available", ar: "متاح" },
      
      // Services
      "services.title": { en: "Our Medical Services", ar: "خدماتنا الطبية" },
      "services.description": {
        en: "Comprehensive healthcare solutions tailored to meet your individual needs with the latest medical technology and expert care.",
        ar: "حلول رعاية صحية شاملة مصممة لتلبية احتياجاتكم الفردية بأحدث التقنيات الطبية والرعاية المتخصصة."
      },
      "services.general": { en: "General Consultation", ar: "الاستشارة العامة" },
      "services.cardiology": { en: "Cardiology", ar: "أمراض القلب" },
      "services.orthopedics": { en: "Orthopedics", ar: "جراحة العظام" },
      "services.pediatrics": { en: "Pediatrics", ar: "طب الأطفال" },
      "services.dermatology": { en: "Dermatology", ar: "الأمراض الجلدية" },
      "services.laboratory": { en: "Laboratory Services", ar: "خدمات المختبر" },
      "services.learn_more": { en: "Learn More", ar: "اعرف المزيد" },
      "services.view_all": { en: "View All Services", ar: "عرض جميع الخدمات" },
      
      // Common
      "common.read_more": { en: "Read More", ar: "اقرأ المزيد" },
      "common.contact_us": { en: "Contact Us", ar: "تواصل معنا" },
      "common.submit": { en: "Submit", ar: "إرسال" },
      "common.loading": { en: "Loading...", ar: "جاري التحميل..." },
      "common.error": { en: "An error occurred", ar: "حدث خطأ" },
      
      // Language toggle
      "lang.switch": { en: "العربية", ar: "English" },
    };

    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleLanguage, t }}>
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
