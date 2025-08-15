"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { GraduationCap, MapPin, Phone, Mail, Facebook, Youtube } from "lucide-react"

export function Footer() {
  const { t, language } = useLanguage()

  const quickLinks = [
    { key: "nav.admission", href: "/admission" },
    { key: "nav.notice", href: "/notice" },
    { key: "nav.academic", href: "/academic" },
    { key: "nav.gallery", href: "/gallery" },
  ]

  const importantLinks = [
    { name: language === "bn" ? "শিক্ষা মন্ত্রণালয়" : "Ministry of Education", href: "#" },
    { name: language === "bn" ? "মাধ্যমিক ও উচ্চ শিক্ষা বোর্ড" : "Board of Secondary Education", href: "#" },
    { name: language === "bn" ? "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড" : "NCTB", href: "#" },
    { name: language === "bn" ? "বাংলাদেশ সরকার" : "Government of Bangladesh", href: "#" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-full">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-lg font-semibold ${language === "bn" ? "font-bengali" : ""}`}>{t("school.name")}</h3>
            </div>
            <p className={`text-gray-300 text-sm leading-relaxed ${language === "bn" ? "font-bengali" : ""}`}>
              {language === "bn"
                ? "চাঁদকাঠি আদর্শ বালিকা মাধ্যমিক বিদ্যালয় একটি প্রতিষ্ঠিত শিক্ষা প্রতিষ্ঠান যা গুণগত শিক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ।"
                : "Chandkathi Adarsha Girls' Secondary School is a premier educational institution committed to providing quality education and character development."}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${language === "bn" ? "font-bengali" : ""}`}>
              {t("home.quick_links")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={`text-gray-300 hover:text-green-400 transition-colors text-sm ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${language === "bn" ? "font-bengali" : ""}`}>
              {language === "bn" ? "গুরুত্বপূর্ণ লিংক" : "Important Links"}
            </h3>
            <ul className="space-y-2">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`text-gray-300 hover:text-green-400 transition-colors text-sm ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${language === "bn" ? "font-bengali" : ""}`}>{t("nav.contact")}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className={`text-gray-300 text-sm ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "চাঁদকাঠি, বাংলাদেশ" : "Chandkathi, Bangladesh"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+880 1711-288308</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@chandkathi-school.edu.bd</p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Link href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-gray-400 text-sm ${language === "bn" ? "font-bengali" : ""}`}>
              {language === "bn"
                ? `© ${new Date().getFullYear()} চাঁদকাঠি আদর্শ বালিকা মাধ্যমিক বিদ্যালয়। সকল অধিকার সংরক্ষিত।`
                : `© ${new Date().getFullYear()} Chandkathi Adarsha Girls' Secondary School. All rights reserved.`}
            </p>
            <p className={`text-gray-400 text-sm mt-2 md:mt-0 ${language === "bn" ? "font-bengali" : ""}`}>
              Built with{" "}
              <Link
                href="http://goinnovior.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-green-400 transition-colors"
              >
                Goinnovior Limited
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
