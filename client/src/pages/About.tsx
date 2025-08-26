import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tag, Shield, Award } from "lucide-react";

export default function About() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="slide-up">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("nav.about") === "About" ? "About Hala Care" : "عن مركز حلا"}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t("nav.about") === "About" ? 
                "For over 15 years, Hala Care has been at the forefront of healthcare excellence, providing compassionate and comprehensive medical services to our community. Our state-of-the-art facility combines cutting-edge technology with personalized care." :
                "لأكثر من 15 عامًا، كان مركز حلا في المقدمة للتميز في الرعاية الصحية، حيث يقدم خدمات طبية رحيمة وشاملة لمجتمعنا. تجمع منشأتنا الحديثة بين التكنولوجيا المتطورة والرعاية الشخصية."}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-primary/5 dark:bg-primary/10 rounded-xl">
                <Tag className="text-3xl text-primary mb-2 mx-auto" size={48} />
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {t("nav.about") === "About" ? "Certified" : "معتمد"}
                </h4>
              </div>
              <div className="text-center p-4 bg-accent/5 dark:bg-accent/10 rounded-xl">
                <Shield className="text-3xl text-accent mb-2 mx-auto" size={48} />
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {t("nav.about") === "About" ? "Safe" : "آمن"}
                </h4>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              data-testid="button-learn-more-about"
            >
              {t("nav.about") === "About" ? "Learn More About Us" : "تعرف أكثر عنا"}
            </Button>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
              alt="Professional medical team consultation"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 rounded-2xl shadow-xl">
              <Award className="text-3xl mb-2" size={48} />
              <p className="font-bold text-lg">
                {t("nav.about") === "About" ? "Excellence Award" : "جائزة التميز"}
              </p>
              <p className="text-sm opacity-90">2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
