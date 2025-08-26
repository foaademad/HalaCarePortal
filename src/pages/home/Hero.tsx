import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { Stethoscope, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import imgTele from "@/Assets/medical-teleconsultation-sick-patient-home.jpg";
import imgSenior from "@/Assets/doctor-helping-senior-patient.jpg";
import imgOffice from "@/Assets/day-office-travel-agency.jpg";

export default function Hero() {
  const { t, tList, isRTL } = useLanguage();

  // Rotating background images (royalty-free medical images)
  const images = useMemo(() => [imgTele, imgSenior, imgOffice], []);

  const [imageIndex, setImageIndex] = useState(0);
  const taglines = tList("hero.taglines");
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // increase duration (e.g., 15s) between images
  const imageIntervalMs = 8000;
  useEffect(() => {
    const imgTimer = setInterval(() => {
      setImageIndex((i) => (i + 1) % images.length);
    }, imageIntervalMs);
    return () => clearInterval(imgTimer);
  }, [images.length]);

  // Preload images to avoid flashes between transitions
  useEffect(() => {
    images.forEach((src) => {
      const im = new Image();
      im.src = src as unknown as string;
    });
  }, [images]);

  // Reset typing when slide changes
  useEffect(() => {
    setTyped("");
    setIsDeleting(false);
  }, [imageIndex]);

  // Typewriter effect for H1 using taglines
  useEffect(() => {
    if (taglines.length === 0) return;
    const fullText = taglines[imageIndex % taglines.length] ?? "";
    // Fit typing+pause+deleting inside the slide duration
    const totalChars = Math.max(1, fullText.length);
    const pauses = 1500; // ms total pauses within the slide
    const baseSpeedCalc = Math.floor((imageIntervalMs - pauses) / (totalChars * 1.6));
    const baseSpeed = Math.max(30, baseSpeedCalc);
    const deleteSpeed = Math.max(20, Math.floor(baseSpeed * 0.6));
    const pauseEnd = 900; // pause when finished typing
    const pauseStart = 600; // pause after deleting

    if (!isDeleting && typed === fullText) {
      const t = setTimeout(() => setIsDeleting(true), pauseEnd);
      return () => clearTimeout(t);
    }

    if (isDeleting && typed === "") {
      const t = setTimeout(() => setIsDeleting(false), pauseStart);
      return () => clearTimeout(t);
    }

    const next = isDeleting
      ? fullText.substring(0, typed.length - 1)
      : fullText.substring(0, typed.length + 1);
    const delay = isDeleting ? deleteSpeed : baseSpeed;
    const timer = setTimeout(() => setTyped(next), delay);
    return () => clearTimeout(timer);
  }, [typed, isDeleting, imageIndex, taglines]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        {/* Stack all images and crossfade by opacity to avoid flashes */}
        <div className="absolute inset-0">
          {images.map((src, i) => (
            <img
              key={i}
              src={src as unknown as string}
              alt="Modern medical facility"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === imageIndex ? "opacity-100 kenburns-zoom" : "opacity-0"
              }`}
              style={{ ['--kb-duration' as any]: `${imageIntervalMs}ms` }}
            />)
          )}
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/80"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-7xl mx-auto fade-in">
          <div className="float mb-8">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Stethoscope className="text-4xl text-white" size={48} />
            </div>
          </div>

          <h1 className="whitespace-nowrap text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 leading-tight">
            {typed}
            <span className="opacity-80">|</span>
          </h1>

          
          <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                data-testid="button-book-appointment"
              >
                {t("hero.book_appointment")}
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                data-testid="button-our-services"
              >
                {t("hero.our_services")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
