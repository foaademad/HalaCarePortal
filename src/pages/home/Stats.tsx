import { Users, Stethoscope, Award, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Stats() {
  const { t, isRTL } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: "25,000+",
      labelKey: "stats.patients",
      color: "text-primary",
      bgColor: "bg-primary/10 dark:bg-primary/20",
    },
    {
      icon: Stethoscope,
      value: "50+",
      labelKey: "stats.doctors",
      color: "text-accent",
      bgColor: "bg-accent/10 dark:bg-accent/20",
    },
    {
      icon: Award,
      value: "15",
      labelKey: "stats.experience",
      color: "text-primary",
      bgColor: "bg-primary/10 dark:bg-primary/20",
    },
    {
      icon: Clock,
      value: "24/7",
      labelKey: "stats.availability",
      color: "text-accent",
      bgColor: "bg-accent/10 dark:bg-accent/20",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center fade-in" data-testid={`stat-${index}`}>
                <div className={`w-16 h-16 mx-auto mb-4 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon className={`text-2xl ${stat.color}`} size={32} />
                </div>
                <h3 className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t(stat.labelKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
