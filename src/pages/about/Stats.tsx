import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeartPulse, Stethoscope, CalendarClock, Home } from "lucide-react";

export default function Stats() {
  const { t } = useLanguage();
  const stats = [
    { label: t("about.stats.patients"), value: "25K+", icon: <HeartPulse size={20} /> },
    { label: t("about.stats.doctors"), value: "60+", icon: <Stethoscope size={20} /> },
    { label: t("about.stats.years"), value: "12", icon: <CalendarClock size={20} /> },
    { label: t("about.stats.visits"), value: "8K+", icon: <Home size={20} /> },
  ];
  return (
    <Section className="mb-16" delay={0.1}>
      <h3 className="text-2xl font-semibold text-center mb-8">{t("about.stats_title")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="absolute -right-8 -bottom-10 h-28 w-28 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-2 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">{s.icon}</div>
              <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
              <div className="text-sm opacity-80">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}


