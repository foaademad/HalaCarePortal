import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { 
  UserRound, 
  Heart, 
  Bone, 
  Baby, 
  Hand,
  FlaskConical,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    imageUrl: string;
    iconName: string;
  };
}

const iconMap = {
  "user-md": UserRound,
  "heartbeat": Heart,
  "bone": Bone,
  "baby": Baby,
  "hand": Hand,
  "flask": FlaskConical,
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const { t, isRTL } = useLanguage();
  
  const Icon = iconMap[service.iconName as keyof typeof iconMap] || UserRound;
  const iconColor = service.id === "cardiology" || service.id === "pediatrics" ? "text-accent" : "text-primary";
  const bgColor = service.id === "cardiology" || service.id === "pediatrics" ? "bg-accent/10 dark:bg-accent/20" : "bg-primary/10 dark:bg-primary/20";

  return (
    <div className="service-card bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <img
        src={service.imageUrl}
        alt={t(`services.${service.id}`)}
        className="w-full h-48 object-cover rounded-xl mb-6"
      />
      <div className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className={`text-2xl ${iconColor}`} size={28} />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
        {t(`services.${service.id}`)}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        {/* Using placeholder text for service descriptions */}
        {service.id === "general" && (t("services.general") === "General Consultation" ? 
          "Comprehensive health assessment and personalized treatment plans by experienced physicians." :
          "تقييم صحي شامل وخطط علاج مخصصة من قبل أطباء ذوي خبرة.")}
        {service.id === "cardiology" && (t("services.cardiology") === "Cardiology" ? 
          "Advanced cardiac care with state-of-the-art diagnostic and treatment technologies." :
          "رعاية قلبية متطورة بأحدث تقنيات التشخيص والعلاج.")}
        {service.id === "orthopedics" && (t("services.orthopedics") === "Orthopedics" ? 
          "Specialized treatment for bone, joint, and musculoskeletal conditions." :
          "علاج متخصص لحالات العظام والمفاصل والجهاز العضلي الهيكلي.")}
        {service.id === "pediatrics" && (t("services.pediatrics") === "Pediatrics" ? 
          "Specialized care for infants, children, and adolescents in a child-friendly environment." :
          "رعاية متخصصة للرضع والأطفال والمراهقين في بيئة مناسبة للأطفال.")}
        {service.id === "dermatology" && (t("services.dermatology") === "Dermatology" ? 
          "Complete skin care solutions including medical and cosmetic dermatology services." :
          "حلول العناية الجلدية الشاملة تشمل خدمات الأمراض الجلدية الطبية والتجميلية.")}
        {service.id === "laboratory" && (t("services.laboratory") === "Laboratory Services" ? 
          "Comprehensive diagnostic testing with fast, accurate results using advanced technology." :
          "فحوصات تشخيصية شاملة بنتائج سريعة ودقيقة باستخدام تقنيات متطورة.")}
      </p>
      <Link href={`/services/${service.id}`}>
        <Button
          variant="ghost"
          className={`text-primary hover:text-primary-dark font-semibold p-0 h-auto flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}
          data-testid={`button-learn-more-${service.id}`}
        >
          <span>{t("services.learn_more")}</span>
          {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </Button>
      </Link>
    </div>
  );
}
