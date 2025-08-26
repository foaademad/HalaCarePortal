import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { Handshake } from "lucide-react";

export default function Partners() {
  const { t, tList } = useLanguage();
  let partners = tList("about.partners");
  // Ensure at least 12 partners by repeating
  if (partners.length < 12 && partners.length > 0) {
    const repeated = [] as string[];
    while (repeated.length < 12) {
      repeated.push(...partners);
    }
    partners = repeated.slice(0, 12);
  }
  return (
    <Section delay={0.2}>
      <h3 className="text-2xl font-semibold text-center mb-2">{t("about.partners_title")}</h3>
      <p className="text-center opacity-70 mb-8">
        {t("about.partners_subtitle") || t("about.subtitle")}
      </p>

      {/* Light section background like the preview */}
      <div className="rounded-2xl bg-muted/30 p-4 sm:p-6">
        {/* Continuous marquee row */}
        <div className="marquee-container">
          <div className="marquee-track flex gap-8 items-center" style={{ ['--marquee-duration' as any]: '35s' }}>
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="w-[140px] text-center shrink-0">
                <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-md border bg-white shadow-sm grid place-items-center overflow-hidden filter grayscale hover:grayscale-0 transition">
                  <Handshake className="text-primary" size={28} />
                </div>
                <div className="mt-3 text-xs sm:text-sm opacity-80 truncate w-full">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}


