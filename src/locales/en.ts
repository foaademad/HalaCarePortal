export type TranslationValue = string | string[];
export type TranslationDictionary = Record<string, TranslationValue>;

const en: TranslationDictionary = {
  // Navigation
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Services",
  "nav.doctors": "Our Doctors",
  "nav.articles": "Articles",
  "nav.contact": "Contact",
  "nav.complaints": "Complaints",

  // Site Info
  "site.name": "Hala Care",
  "site.subtitle": "Medical Center",

  // Hero Section
  "hero.title1": "Excellence in",
  "hero.title2": "Healthcare",
  "hero.description":
    "Comprehensive care with advanced technology and compassionate service.",
  "hero.book_appointment": "Book Appointment",
  "hero.our_services": "Our Services",
  "hero.motto": "Hospital at your home",
  "hero.taglines": [
    "Primary care for the whole family",
    "Specialized care at your home",
    "Medical care with global standards",
    
  ],

  // Stats
  "stats.patients": "Happy Patients",
  "stats.doctors": "Expert Doctors",
  "stats.experience": "Years Experience",
  "stats.availability": "Available",

  // Services
  "services.title": "Our Medical Services",
  "services.description":
    "Comprehensive healthcare solutions tailored to meet your individual needs with the latest medical technology and expert care.",
  "services.general": "General Consultation",
  "services.cardiology": "Cardiology",
  "services.orthopedics": "Orthopedics",
  "services.pediatrics": "Pediatrics",
  "services.dermatology": "Dermatology",
  "services.laboratory": "Laboratory Services",
  "services.learn_more": "Learn More",
  "services.view_all": "View All Services",

  // Common
  "common.read_more": "Read More",
  "common.contact_us": "Contact Us",
  "common.submit": "Submit",
  "common.loading": "Loading...",
  "common.error": "An error occurred",

  // Language toggle
  "lang.switch": "العربية",
};

// About page
en["about.title"] = "About Our Medical Center";
en["about.motto"] = "Hospital at your home";
en["about.subtitle"] = "Who We Are";
en["about.about_text"] =
  "We deliver patient‑centered healthcare that blends clinical excellence with warm, human care—available in our center and at your home.";
en["about.vision_title"] = "Our Vision";
en["about.vision_text"] =
  "Accessible, high‑quality healthcare for every family—anytime, anywhere.";
en["about.mission_title"] = "Our Mission";
en["about.mission_text"] =
  "To provide comprehensive, safe, and convenient medical services using advanced technology and a compassionate team.";
en["about.values_title"] = "Our Values";
en["about.values_list"] = [
  "Compassion and respect",
  "Patient safety first",
  "Integrity and transparency",
  "Innovation and continuous learning",
  "Teamwork and accountability",
];
en["about.challenges_title"] = "Challenges We Tackle";
en["about.challenges_text"] =
  "We work to reduce wait times, expand home‑care, improve chronic disease follow‑up, and make diagnostics faster and clearer.";
en["about.stats_title"] = "Our Impact";
en["about.stats.patients"] = "Patients served";
en["about.stats.doctors"] = "Specialist doctors";
en["about.stats.years"] = "Years of care";
en["about.stats.visits"] = "Home visits";
en["about.testimonials_title"] = "What Our Clients Say";
en["about.testimonials"] = [
  "Excellent home‑care service—professional and on time.",
  "Doctors explained everything clearly and kindly.",
  "Fast diagnostics with modern equipment.",
];
en["about.partners_title"] = "Our Medical Partners";
en["about.partners"] = [
  "City Labs",
  "Prime Radiology",
  "HealthPlus Pharmacy",
  "Care Ambulance",
];

export default en;


