import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Article } from "@/types";

export default function Articles() {
  const { t, language, isRTL } = useLanguage();

  const { data: articles, isLoading, error } = useQuery<Article[]>({
    queryKey: ["static-articles"],
    queryFn: async () => (await import("@/static/articles")).default,
  });

  if (isLoading) {
    return (
      <div className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("common.error")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === "en" ? 
                "Failed to load articles. Please try again later." :
                "فشل في تحميل المقالات. يرجى المحاولة مرة أخرى لاحقاً."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            {language === "en" ? "Health Articles" : "المقالات الصحية"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === "en" ? 
              "Stay informed with the latest health tips, medical insights, and wellness guidance from our expert medical team." :
              "ابق على اطلاع بأحدث النصائح الصحية والرؤى الطبية وإرشادات العافية من فريقنا الطبي المتخصص."}
          </p>
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                data-testid={`article-card-${article.id}`}
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={language === "en" ? article.title : article.titleAr}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {language === "en" ? article.category : article.categoryAr}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-auto rtl:mr-auto rtl:ml-0">
                      {new Date(article.createdAt || "").toLocaleDateString(
                        language === "en" ? "en-US" : "ar-SA"
                      )}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                    {language === "en" ? article.title : article.titleAr}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {language === "en" ? article.excerpt : article.excerptAr}
                  </p>
                  <Link href={`/articles/${article.id}`}>
                    <Button
                      variant="ghost"
                      className={`text-primary hover:text-primary-dark font-semibold p-0 h-auto flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}
                      data-testid={`button-read-article-${article.id}`}
                    >
                      <span>{t("common.read_more")}</span>
                      {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {language === "en" ? 
                "No articles available at the moment." :
                "لا توجد مقالات متاحة في الوقت الحالي."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
