import AboutHero from "./about/Hero";
import WhoWeAre from "./about/WhoWeAre";
import Stats from "./about/Stats";
import Testimonials from "./about/Testimonials";
import Partners from "./about/Partners";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <AboutHero />
      <WhoWeAre />
      <Stats />
      <Testimonials />
      <Partners />
    </div>
  );
}
