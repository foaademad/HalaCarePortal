import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/lib/translations";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle } from "lucide-react";

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const { t, language, isRTL } = useLanguage();

  const serviceData = services[serviceId as keyof typeof services];

  if (!serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("nav.services") === "Services" ? "Service Not Found" : "الخدمة غير موجودة"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t("nav.services") === "Services" ? 
                "The requested service could not be found." :
                "لم يتم العثور على الخدمة المطلوبة."}
            </p>
            <Link href="/services">
              <Button data-testid="button-back-to-services">
                {t("nav.services") === "Services" ? "Back to Services" : "العودة للخدمات"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const content = serviceData[language];
  const features = [
    language === "en" ? "Expert medical team" : "فريق طبي خبير",
    language === "en" ? "Modern equipment" : "معدات حديثة",
    language === "en" ? "Personalized care" : "رعاية شخصية",
    language === "en" ? "Quick appointments" : "مواعيد سريعة",
  ];

  return (
    <div className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/services">
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}
              data-testid="button-back-navigation"
            >
              {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              <span>{t("nav.services")}</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Service Content */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              {content.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {content.description}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {content.details}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {language === "en" ? "Why Choose This Service?" : "لماذا تختار هذه الخدمة؟"}
              </h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <CheckCircle className="text-accent flex-shrink-0" size={20} />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <Link href="/booking">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                data-testid="button-book-service"
              >
                <Calendar size={20} />
                <span>{t("hero.book_appointment")}</span>
              </Button>
            </Link>
          </div>

          {/* Service Image */}
          <div className="relative">
            <img
              src={`https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600`}
              alt={content.title}
              className="rounded-2xl shadow-2xl w-full object-cover h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
