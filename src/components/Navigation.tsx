import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Sun, Moon, Languages, Heart } from "lucide-react";
import logo from "@/Assets/logo.png";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const [location] = useLocation();

  const navItems = [
    { href: "/", labelKey: "nav.home" },
    { href: "/about", labelKey: "nav.about" },
    { href: "/services", labelKey: "nav.services" },
    { href: "/doctors", labelKey: "nav.doctors" },
    { href: "/articles", labelKey: "nav.articles" },
    { href: "/contact", labelKey: "nav.contact" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={closeMobileMenu}>
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <img src={logo} alt="Hala Care" width={150} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link hover:text-primary dark:hover:text-primary-light transition-colors duration-200 ${
                  location === item.href ? 'text-primary dark:text-primary-light font-semibold' : ''
                }`}
                data-testid={`link-${item.href.slice(1) || 'home'}`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            {/* Language Switcher */}
            <Button
              variant="default"
              size="sm"
              onClick={toggleLanguage}
              className="language-switch bg-primary hover:bg-primary-dark text-white"
              data-testid="button-language-toggle"
            >
              <Languages className="w-4 h-4 mr-2" />
              {t("lang.switch")}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block py-2 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 ${
                    location === item.href ? 'text-primary dark:text-primary-light font-semibold' : ''
                  }`}
                  data-testid={`link-mobile-${item.href.slice(1) || 'home'}`}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
