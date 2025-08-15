"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Menu, Phone, Mail } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { key: "nav.home", href: "/" },
    { key: "nav.history", href: "/history" },
    { key: "nav.teachers", href: "/teachers" },
    { key: "nav.admission", href: "/admission" },
    { key: "nav.gallery", href: "/gallery" },
    { key: "nav.video", href: "/video" },
    { key: "nav.notice", href: "/notice" },
    { key: "nav.academic", href: "/academic" },
    { key: "nav.contact", href: "/contact" },
    { key: "nav.login", href: "/login" },
  ]

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b-4 border-green-600 dark:border-green-500 transition-colors duration-200">
      {/* Top Info Bar */}
      <div className="bg-green-700 dark:bg-green-800 text-white py-2 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center gap-4 mb-2 sm:mb-0">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+880 1711-288308</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@chandkathi-school.edu.bd</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* School Logo and Name */}
          <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity duration-200">
            <div className="w-16 h-16 flex-shrink-0">
              <img src="/images/school-logo.png" alt="School Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <h1
                className={`text-xl md:text-2xl font-bold text-green-800 dark:text-green-400 transition-colors duration-200 ${language === "bn" ? "font-bengali" : ""}`}
              >
                {t("school.name")}
              </h1>
              <p
                className={`text-sm text-green-600 dark:text-green-300 transition-colors duration-200 ${language === "bn" ? "font-bengali" : ""}`}
              >
                {t("school.tagline")}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 transform hover:scale-105 ${language === "bn" ? "font-bengali" : ""}`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700 transition-all duration-200 hover:scale-105 bg-transparent"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white dark:bg-gray-900 transition-colors duration-200">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img src="/images/school-logo.png" alt="School Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2
                      className={`font-semibold text-green-800 dark:text-green-400 transition-colors duration-200 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {t("school.name")}
                    </h2>
                  </div>
                </div>
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 transform hover:translate-x-1 ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
