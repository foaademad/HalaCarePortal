import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Calendar, Star, Users, Languages, Clock, Award, MapPin, Phone } from "lucide-react";
import type { Doctor } from "@/types";

export default function DoctorDetail() {
  const { doctorId } = useParams();
  const { t, language, isRTL } = useLanguage();

  const { data: doctor, isLoading, error } = useQuery<Doctor>({
    queryKey: ["static-doctor", doctorId],
    queryFn: async () => {
      const list = (await import("@/static/doctors")).default as Doctor[];
      return list.find(d => d.id === doctorId);
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-96 w-full rounded-2xl" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-32 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === "en" ? "Doctor Not Found" : "الطبيب غير موجود"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {language === "en" ? 
                "The requested doctor could not be found." :
                "لم يتم العثور على الطبيب المطلوب."}
            </p>
            <Link href="/doctors">
              <Button data-testid="button-back-to-doctors">
                {language === "en" ? "Back to Doctors" : "العودة للأطباء"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-screen bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/doctors">
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}
              data-testid="button-back-to-doctors"
            >
              {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              <span>{t("nav.doctors")}</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Doctor Header */}
              <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-8 mb-8">
                <div className={`flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 ${isRTL ? 'md:space-x-reverse' : ''}`}>
                  <img
                    src={doctor.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"}
                    alt={language === "en" ? doctor.name : doctor.nameAr}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-white/20"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                      {language === "en" ? doctor.name : doctor.nameAr}
                    </h1>
                    <p className="text-xl mb-4 text-white/90">
                      {language === "en" ? doctor.specialty : doctor.specialtyAr}
                    </p>
                    <p className="text-white/80 mb-4">
                      {language === "en" ? doctor.experience : doctor.experienceAr}
                    </p>
                    <div className={`flex flex-wrap items-center justify-center md:justify-start gap-4 ${isRTL ? 'md:justify-end' : ''}`}>
                      <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <Star className="text-yellow-400 fill-current" size={20} />
                        <span className="font-semibold">{doctor.rating}</span>
                      </div>
                      <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <Users className="text-white/80" size={20} />
                        <span>{doctor.patientsCount} {language === "en" ? "Patients" : "مريض"}</span>
                      </div>
                      <Badge className="bg-white/20 text-white">
                        {language === "en" ? "Available" : "متاح"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Doctor */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {language === "en" ? "About Dr. " + doctor.name.split(" ").pop() : "عن " + doctor.nameAr}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {language === "en" ? doctor.bio : doctor.bioAr}
                  </p>
                  
                  {/* Qualifications */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center space-x-2">
                      <Award className="text-primary" size={20} />
                      <span>{language === "en" ? "Qualifications" : "المؤهلات"}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === "en" ? doctor.qualifications : doctor.qualificationsAr}
                    </p>
                  </div>

                  {/* Languages */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center space-x-2">
                      <Languages className="text-accent" size={20} />
                      <span>{language === "en" ? "Languages Spoken" : "اللغات المتحدثة"}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === "en" ? doctor.languages : doctor.languagesAr}
                    </p>
                  </div>

                  {/* Available Days */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center space-x-2">
                      <Clock className="text-primary" size={20} />
                      <span>{language === "en" ? "Available Days" : "أيام العمل"}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === "en" ? doctor.availableDays : doctor.availableDaysAr}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-primary">
                    {language === "en" ? "Book Consultation" : "احجز استشارة"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {language === "en" ? "Consultation Fee" : "رسوم الاستشارة"}
                    </p>
                    <p className="text-2xl font-bold text-primary">{doctor.consultationFee}</p>
                  </div>
                  
                  <Link href={`/booking?doctor=${doctor.id}`}>
                    <Button 
                      className="w-full bg-primary hover:bg-primary-dark text-white"
                      size="lg"
                      data-testid="button-book-consultation"
                    >
                      <Calendar size={20} className="mr-2" />
                      {language === "en" ? "Book Appointment" : "احجز موعد"}
                    </Button>
                  </Link>

                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {language === "en" ? 
                      "Quick response within 2 hours" :
                      "استجابة سريعة خلال ساعتين"}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === "en" ? "Contact Information" : "معلومات التواصل"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <MapPin className="text-primary" size={20} />
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === "en" ? "Hala Care Medical Center" : "مركز حلا الطبي"}
                    </span>
                  </div>
                  <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Phone className="text-accent" size={20} />
                    <span className="text-gray-600 dark:text-gray-400">+966 11 123 4567</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === "en" ? "Quick Stats" : "إحصائيات سريعة"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{doctor.rating}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {language === "en" ? "Rating" : "التقييم"}
                      </div>
                    </div>
                    <div className="p-3 bg-accent/5 dark:bg-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">{doctor.patientsCount}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {language === "en" ? "Patients" : "مريض"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}