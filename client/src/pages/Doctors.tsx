import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DoctorCard from "@/components/DoctorCard";
import { Users, Stethoscope, Filter } from "lucide-react";
import type { Doctor } from "@/types";

export default function Doctors() {
  const { t, language, isRTL } = useLanguage();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");

  const { data: doctors, isLoading, error } = useQuery<Doctor[]>({
    queryKey: ["static-doctors"],
    queryFn: async () => (await import("@/static/doctors"))?.default,
  });

  const specialties = [
    { value: "all", label: language === "en" ? "All Specialties" : "جميع التخصصات" },
    { value: "cardiology", label: language === "en" ? "Cardiology" : "أمراض القلب" },
    { value: "pediatrics", label: language === "en" ? "Pediatrics" : "طب الأطفال" },
    { value: "orthopedics", label: language === "en" ? "Orthopedics" : "جراحة العظام" },
    { value: "dermatology", label: language === "en" ? "Dermatology" : "الأمراض الجلدية" },
    { value: "general", label: language === "en" ? "General Medicine" : "الطب العام" },
  ];

  const filteredDoctors = doctors?.filter(doctor => 
    selectedSpecialty === "all" || doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
  ) || [];

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
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mx-auto mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
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
                "Failed to load doctors. Please try again later." :
                "فشل في تحميل الأطباء. يرجى المحاولة مرة أخرى لاحقاً."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="text-primary" size={32} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            {language === "en" ? "Meet Our Expert Doctors" : "تعرف على أطبائنا الخبراء"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === "en" ? 
              "Our team of highly qualified medical professionals is dedicated to providing you with the best healthcare experience. Each doctor brings years of expertise and a commitment to excellence." :
              "فريقنا من المهنيين الطبيين المؤهلين تأهيلاً عالياً مكرس لتوفير أفضل تجربة رعاية صحية لك. كل طبيب يجلب سنوات من الخبرة والالتزام بالتميز."}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-primary mb-2">
              {doctors ? doctors.length : 0}+
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === "en" ? "Expert Doctors" : "طبيب خبير"}
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="text-accent" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-accent mb-2">6</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === "en" ? "Medical Specialties" : "تخصص طبي"}
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-primary mb-2">10,000+</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === "en" ? "Happy Patients" : "مريض راضي"}
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Filter className="text-gray-600 dark:text-gray-400" size={20} />
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              {language === "en" ? "Filter by Specialty:" : "تصفية حسب التخصص:"}
            </span>
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-64" data-testid="select-specialty-filter">
              <SelectValue placeholder={language === "en" ? "Select Specialty" : "اختر التخصص"} />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty.value} value={specialty.value}>
                  {specialty.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            {language === "en" 
              ? `Showing ${filteredDoctors.length} doctor${filteredDoctors.length !== 1 ? 's' : ''}`
              : `عرض ${filteredDoctors.length} طبيب`}
            {selectedSpecialty !== "all" && (
              <span>
                {" "}{language === "en" ? "in" : "في"}{" "}
                {specialties.find(s => s.value === selectedSpecialty)?.label}
              </span>
            )}
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors && filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                data-testid={`doctor-card-${doctor.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {language === "en" ? "No doctors found" : "لم يتم العثور على أطباء"}
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-4">
              {language === "en" 
                ? "No doctors available for the selected specialty."
                : "لا يوجد أطباء متاحون للتخصص المحدد."}
            </p>
            <Button 
              onClick={() => setSelectedSpecialty("all")}
              variant="outline"
              data-testid="button-clear-filter"
            >
              {language === "en" ? "Show All Doctors" : "عرض جميع الأطباء"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}