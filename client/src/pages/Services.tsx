import { useLanguage } from "@/contexts/LanguageContext";
import ServiceCard from "@/components/ServiceCard";

export default function Services() {
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
    <div className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            {t("services.title")}
          </h1>
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
      </div>
    </div>
  );
}
