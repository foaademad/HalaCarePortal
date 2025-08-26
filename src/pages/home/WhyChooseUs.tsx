import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Clock, Users, Shield, Stethoscope, Heart } from "lucide-react";

export default function WhyChooseUs() {
  const { t, language, isRTL } = useLanguage();

  const features = [
    {
      icon: Award,
      titleKey: language === "en" ? "Excellence in Healthcare" : "التميز في الرعاية الصحية",
      descriptionKey: language === "en" 
        ? "Award-winning medical center recognized for outstanding patient care and medical excellence."
        : "مركز طبي حائز على جوائز ومعترف به للرعاية المتميزة للمرضى والتميز الطبي.",
      color: "text-primary",
      bgColor: "bg-primary/10 dark:bg-primary/20",
    },
    {
      icon: Clock,
      titleKey: language === "en" ? "24/7 Emergency Care" : "رعاية الطوارئ على مدار الساعة",
      descriptionKey: language === "en" 
        ? "Round-the-clock emergency services with highly trained medical professionals available anytime."
        : "خدمات الطوارئ على مدار الساعة مع أطباء مدربين تدريباً عالياً متاحين في أي وقت.",
      color: "text-accent",
      bgColor: "bg-accent/10 dark:bg-accent/20",
    },
    {
      icon: Users,
      titleKey: language === "en" ? "Expert Medical Team" : "فريق طبي خبير",
      descriptionKey: language === "en" 
        ? "Highly qualified specialists and consultants with years of experience in their respective fields."
        : "أخصائيون واستشاريون مؤهلون تأهيلاً عالياً مع سنوات من الخبرة في مجالاتهم.",
      color: "text-primary",
      bgColor: "bg-primary/10 dark:bg-primary/20",
    },
    {
      icon: Shield,
      titleKey: language === "en" ? "Advanced Technology" : "تقنية متطورة",
      descriptionKey: language === "en" 
        ? "State-of-the-art medical equipment and cutting-edge technology for accurate diagnosis and treatment."
        : "معدات طبية حديثة وتقنية متطورة للتشخيص الدقيق والعلاج الفعال.",
      color: "text-accent",
      bgColor: "bg-accent/10 dark:bg-accent/20",
    },
    {
      icon: Stethoscope,
      titleKey: language === "en" ? "Comprehensive Services" : "خدمات شاملة",
      descriptionKey: language === "en" 
        ? "Full range of medical services under one roof, from consultation to specialized treatments."
        : "مجموعة كاملة من الخدمات الطبية تحت سقف واحد، من الاستشارات إلى العلاجات المتخصصة.",
      color: "text-primary",
      bgColor: "bg-primary/10 dark:bg-primary/20",
    },
    {
      icon: Heart,
      titleKey: language === "en" ? "Patient-Centered Care" : "رعاية تركز على المريض",
      descriptionKey: language === "en" 
        ? "Compassionate care that puts patients first, ensuring comfort and peace of mind throughout treatment."
        : "رعاية رحيمة تضع المرضى أولاً، وتضمن الراحة والطمأنينة طوال فترة العلاج.",
      color: "text-accent",
      bgColor: "bg-accent/10 dark:bg-accent/20",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            {language === "en" ? "Why Choose Hala Care?" : "لماذا تختار مركز حلا؟"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === "en" 
              ? "Discover what makes us the preferred choice for thousands of patients seeking exceptional healthcare services in the region."
              : "اكتشف ما يجعلنا الخيار المفضل لآلاف المرضى الذين يبحثون عن خدمات رعاية صحية استثنائية في المنطقة."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 fade-in"
                data-testid={`feature-${index}`}
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`text-2xl ${feature.color}`} size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                  {feature.titleKey}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.descriptionKey}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl shadow-lg">
            <p className="text-lg font-semibold mb-2">
              {language === "en" ? "Ready to Experience Excellence?" : "مستعد لتجربة التميز؟"}
            </p>
            <p className="text-sm opacity-90">
              {language === "en" 
                ? "Join thousands of satisfied patients who trust us with their health."
                : "انضم إلى آلاف المرضى الراضين الذين يثقون بنا في صحتهم."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}