import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeartPulse } from "lucide-react";

export default function AboutHero() {
  const { t } = useLanguage();
  return (
    <Section className="relative m-16">
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[48rem] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-primary to-accent" />
      </div>

      <div className="text-center max-w-4xl mx-auto px-2">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur px-4 py-1.5 text-sm text-black dark:text-white mb-4">
          <HeartPulse size={16} className="text-accent" />
          <span className="tracking-wide uppercase">{t("about.motto")}</span>
        </div>

        {/* Title with gradient */}
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-white via-black dark:via-white to-accent dark:to-accent drop-shadow-sm">
            {t("about.title")}
          </span>
        </h2>

        {/* Sub text */}
        <p className="text-base md:text-lg opacity-60 max-w-3xl mx-auto">
          {t("about.about_text")}
        </p>

        {/* Underline */}
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
      </div>
    </Section>
  );
}


