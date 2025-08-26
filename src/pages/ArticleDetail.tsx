import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Calendar, User, Tag } from "lucide-react";
import type { Article } from "@/types";

export default function ArticleDetail() {
  const { articleId } = useParams();
  const { t, language, isRTL } = useLanguage();

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ["static-article", articleId],
    queryFn: async () => {
      const list = (await import("@/static/articles")).default as Article[];
      return list.find(a => a.id === articleId);
    }
  });

  if (isLoading) {
    return (
      <div className="py-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-96 w-full rounded-2xl mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === "en" ? "Article Not Found" : "المقال غير موجود"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {language === "en" ? 
                "The requested article could not be found." :
                "لم يتم العثور على المقال المطلوب."}
            </p>
            <Link href="/articles">
              <Button data-testid="button-back-to-articles">
                {language === "en" ? "Back to Articles" : "العودة للمقالات"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/articles">
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}
              data-testid="button-back-to-articles"
            >
              {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              <span>{t("nav.articles")}</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={language === "en" ? article.title : article.titleAr}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-8"
              />
            )}
            
            <div className={`flex items-center space-x-4 mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                <Tag size={16} />
                <span>{language === "en" ? article.category : article.categoryAr}</span>
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(article.createdAt || "").toLocaleDateString(
                  language === "en" ? "en-US" : "ar-SA",
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}</span>
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white leading-tight">
              {language === "en" ? article.title : article.titleAr}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {language === "en" ? article.excerpt : article.excerptAr}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {language === "en" ? article.content : article.contentAr}
            </div>
          </div>

          {/* Author Info */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <User className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {language === "en" ? "Hala Care Medical Team" : "الفريق الطبي لمركز حلا"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === "en" ? 
                    "Expert medical professionals dedicated to your health and wellness." :
                    "أطباء متخصصون مكرسون لصحتكم ورفاهيتكم."}
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">
                {language === "en" ? "Need Medical Consultation?" : "هل تحتاج استشارة طبية؟"}
              </h3>
              <p className="mb-6 opacity-90">
                {language === "en" ? 
                  "Our expert medical team is here to help. Book your appointment today." :
                  "فريقنا الطبي المتخصص هنا للمساعدة. احجز موعدك اليوم."}
              </p>
              <Link href="/booking">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="button-book-consultation"
                >
                  {t("hero.book_appointment")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
