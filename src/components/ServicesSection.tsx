import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      id: "general",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      iconName: "user-md",
    },
    {
      id: "cardiology",
      imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      iconName: "heartbeat",
    },
    {
      id: "orthopedics",
      imageUrl: "https://images.unsplash.com/photo-1551601651-09d1db1aa22a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      iconName: "bone",
    },
    {
      id: "pediatrics",
      imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      iconName: "baby",
    },
    {
      id: "dermatology",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      iconName: "hand",
    },
    {
      id: "laboratory",
      imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      iconName: "flask",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            {t("services.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("services.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              data-testid={`service-card-${service.id}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              data-testid="button-view-all-services"
            >
              {t("services.view_all")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
