import { LanguageProvider as Provider } from "@/contexts/LanguageContext";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
