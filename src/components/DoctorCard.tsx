import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { Star, Users, Calendar, Languages, Clock } from "lucide-react";
import type { Doctor } from "@/types";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const { language, isRTL } = useLanguage();

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
      {/* Doctor Image */}
      <div className="relative mb-6">
        <img
          src={doctor.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"}
          alt={language === "en" ? doctor.name : doctor.nameAr}
          className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
        />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-accent text-white text-xs px-2 py-1">
            {language === "en" ? "Available" : "متاح"}
          </Badge>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
          {language === "en" ? doctor.name : doctor.nameAr}
        </h3>
        <p className="text-primary dark:text-primary-light font-semibold mb-2">
          {language === "en" ? doctor.specialty : doctor.specialtyAr}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {language === "en" ? doctor.experience : doctor.experienceAr}
        </p>
      </div>

      {/* Rating and Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-center">
        <div className={`flex items-center justify-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
          <Star className="text-yellow-500 fill-current" size={16} />
          <span className="text-sm font-semibold">{doctor.rating}</span>
        </div>
        <div className={`flex items-center justify-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
          <Users className="text-primary" size={16} />
          <span className="text-sm font-semibold">{doctor.patientsCount}</span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 mb-6 text-sm">
        <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
          <Languages className="text-accent" size={16} />
          <span className="text-gray-600 dark:text-gray-400">
            {language === "en" ? doctor.languages : doctor.languagesAr}
          </span>
        </div>
        <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
          <Clock className="text-primary" size={16} />
          <span className="text-gray-600 dark:text-gray-400">
            {language === "en" ? doctor.availableDays : doctor.availableDaysAr}
          </span>
        </div>
      </div>

      {/* Consultation Fee */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {language === "en" ? "Consultation Fee" : "رسوم الاستشارة"}
          </span>
          <span className="font-bold text-primary">{doctor.consultationFee}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Link href={`/doctors/${doctor.id}`}>
          <Button
            variant="outline"
            className="w-full text-sm"
            data-testid={`button-view-doctor-${doctor.id}`}
          >
            {language === "en" ? "View Profile" : "عرض الملف"}
          </Button>
        </Link>
        <Link href={`/booking?doctor=${doctor.id}`}>
          <Button
            className="w-full bg-primary hover:bg-primary-dark text-white text-sm"
            data-testid={`button-book-doctor-${doctor.id}`}
          >
            <Calendar size={16} className="mr-2" />
            {language === "en" ? "Book Now" : "احجز الآن"}
          </Button>
        </Link>
      </div>
    </div>
  );
}