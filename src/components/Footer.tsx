import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { Heart, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { href: "/", labelKey: "nav.home" },
    { href: "/about", labelKey: "nav.about" },
    { href: "/services", labelKey: "nav.services" },
    { href: "/booking", labelKey: "hero.book_appointment" },
    { href: "/articles", labelKey: "nav.articles" },
  ];

  const services = [
    "services.general",
    "services.cardiology",
    "services.orthopedics",
    "services.pediatrics",
    "services.laboratory",
  ];

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className={`flex items-center space-x-3 mb-6 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                <Heart className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{t("site.name")}</h3>
                <p className="text-sm text-gray-400">{t("site.subtitle")}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t("site.name") === "Hala Care" ? 
                "Providing exceptional healthcare services with compassion, expertise, and cutting-edge technology for over 15 years." :
                "نقدم خدمات رعاية صحية استثنائية بالرحمة والخبرة والتكنولوجيا المتطورة لأكثر من 15 عامًا."}
            </p>
            <div className={`flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200"
                  data-testid={`social-link-${index}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">
              {t("nav.home") === "Home" ? "Quick Links" : "روابط سريعة"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    data-testid={`footer-link-${link.href.slice(1) || 'home'}`}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">
              {t("services.title") === "Our Medical Services" ? "Our Services" : "خدماتنا"}
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400">{t(service)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">
              {t("nav.contact") === "Contact" ? "Contact Info" : "معلومات التواصل"}
            </h4>
            <div className="space-y-4">
              <div className={`flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <MapPin className="text-primary mt-1" size={18} />
                <span className="text-gray-400 text-sm">
                  {t("nav.contact") === "Contact" ? 
                    "123 Medical Center Street\nRiyadh, Saudi Arabia" :
                    "شارع المركز الطبي 123\nالرياض، المملكة العربية السعودية"}
                </span>
              </div>
              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <Phone className="text-primary" size={18} />
                <span className="text-gray-400 text-sm">+966 11 123 4567</span>
              </div>
              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <Mail className="text-primary" size={18} />
                <span className="text-gray-400 text-sm">info@halacare.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            {t("nav.contact") === "Contact" ? 
              "© 2024 Hala Care Medical Center. All rights reserved." :
              "© 2024 مركز حلا للرعاية الطبية. جميع الحقوق محفوظة."}
          </p>
        </div>
      </div>
    </footer>
  );
}
