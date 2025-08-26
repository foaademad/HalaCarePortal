import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeartPulse, ShieldCheck, Award, Users, CheckCircle2 } from "lucide-react";

export default function WhoWeAre() {
  const { t, tList } = useLanguage();
  const values = tList("about.values_list");

  return (
    <Section className="mb-16" delay={0.05}>

       

        {/* Feature cards */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          <Feature icon={<HeartPulse size={22} />} title={t("about.vision_title")} text={t("about.vision_text")} />
          <Feature icon={<ShieldCheck size={22} />} title={t("about.mission_title")} text={t("about.mission_text")} />
          <Feature icon={<Award size={22} />} title={t("about.values_title")} text={values.join(" • ")} />
          <Feature icon={<Users size={22} />} title={t("about.challenges_title")} text={t("about.challenges_text")} />
        </div>
      
    </Section>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Accent gradient corner */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl" />

      {/* Content */}
      <div className="relative p-6">
        <div className="mb-3 inline-flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <span className="font-semibold text-black dark:text-white">{title}</span>
        </div>
        <p className="text-sm leading-relaxed opacity-80">{text}</p>

        {/* Hover underline */}
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-24" />
      </div>
    </div>
  );
}


