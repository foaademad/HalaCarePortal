export interface Article {
  id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  excerpt: string;
  excerptAr: string;
  category: string;
  categoryAr: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface Doctor {
  id: string;
  name: string;
  nameAr: string;
  specialty: string;
  specialtyAr: string;
  experience: string;
  experienceAr: string;
  qualifications: string;
  qualificationsAr: string;
  bio: string;
  bioAr: string;
  imageUrl?: string;
  languages: string;
  languagesAr: string;
  availableDays: string;
  availableDaysAr: string;
  consultationFee?: string;
  rating?: string;
  patientsCount?: string | number;
  isAvailable?: boolean;
}


