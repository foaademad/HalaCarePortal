import type { Article } from "@/types";

const articles: Article[] = [
  {
    id: "a1",
    title: "Healthy Heart Tips",
    titleAr: "نصائح لقلب صحي",
    content: "Maintain regular exercise and a balanced diet...",
    contentAr: "حافظ على ممارسة الرياضة بانتظام ونظام غذائي متوازن...",
    excerpt: "Simple steps to improve your heart health",
    excerptAr: "خطوات بسيطة لتحسين صحة قلبك",
    category: "Cardiology",
    categoryAr: "أمراض القلب",
    imageUrl: "https://images.unsplash.com/photo-1517816428104-797678c7cf0d?q=80&w=1200&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "a2",
    title: "Skin Care Essentials",
    titleAr: "أساسيات العناية بالبشرة",
    content: "Daily routines to keep your skin glowing...",
    contentAr: "روتين يومي للحفاظ على نضارة بشرتك...",
    excerpt: "Best practices for healthy skin",
    excerptAr: "أفضل الممارسات لبشرة صحية",
    category: "Dermatology",
    categoryAr: "الأمراض الجلدية",
    imageUrl: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
  },
];

export default articles;


