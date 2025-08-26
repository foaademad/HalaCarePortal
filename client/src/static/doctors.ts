import type { Doctor } from "@/types";

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Ahmed Ali",
    nameAr: "د. أحمد علي",
    specialty: "Cardiology",
    specialtyAr: "أمراض القلب",
    experience: "15 years of experience in cardiology",
    experienceAr: "15 سنة خبرة في أمراض القلب",
    qualifications: "MD, FACC",
    qualificationsAr: "دكتوراه، FACC",
    bio: "Expert in heart diseases and interventional cardiology.",
    bioAr: "خبير في أمراض القلب والقسطرة القلبية.",
    languages: "Arabic, English",
    languagesAr: "العربية، الإنجليزية",
    availableDays: "Sun - Thu",
    availableDaysAr: "الأحد - الخميس",
    consultationFee: "$50",
    rating: "4.9",
    patientsCount: "600+",
    imageUrl: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=400&auto=format&fit=crop",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Dr. Sara Mohamed",
    nameAr: "د. سارة محمد",
    specialty: "Dermatology",
    specialtyAr: "الأمراض الجلدية",
    experience: "10 years in dermatology and cosmetology",
    experienceAr: "10 سنوات في الجلدية والتجميل",
    qualifications: "MD, FAAD",
    qualificationsAr: "دكتوراه، FAAD",
    bio: "Specialist in skin care and laser treatments.",
    bioAr: "متخصصة في العناية بالبشرة وعلاجات الليزر.",
    languages: "Arabic, English",
    languagesAr: "العربية، الإنجليزية",
    availableDays: "Mon - Fri",
    availableDaysAr: "الإثنين - الجمعة",
    consultationFee: "$40",
    rating: "4.8",
    patientsCount: "450+",
    imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=400&auto=format&fit=crop",
    isAvailable: true,
  },
];

export default doctors;


