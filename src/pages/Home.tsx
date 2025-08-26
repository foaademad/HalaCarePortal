import Hero from "@/pages/home/Hero";
import Stats from "@/pages/home/Stats";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/pages/home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <ServicesSection />
      <WhyChooseUs />
    </div>
  );
}
