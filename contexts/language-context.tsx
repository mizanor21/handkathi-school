"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "bn"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isHydrated: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.history": "School History",
    "nav.teachers": "Teachers",
    "nav.admission": "Online Admission",
    "nav.gallery": "Photo Gallery",
    "nav.video": "Video",
    "nav.notice": "Notice Board",
    "nav.academic": "Academic Info",
    "nav.contact": "Contact",
    "nav.login": "Login",

    // School Info
    "school.name": "Chandkathi Adarsha Girls' Secondary School",
    "school.tagline": "Excellence in Education, Character in Life",
    "school.established": "Established",
    "school.location": "Chandkathi, Bangladesh",

    // Common
    "common.read_more": "Read More",
    "common.view_all": "View All",
    "common.download": "Download",
    "common.search": "Search",
    "common.language": "Language",

    // Homepage sections
    "home.welcome": "Welcome to",
    "home.principal_message": "Principal's Message",
    "home.latest_news": "Latest News & Updates",
    "home.upcoming_events": "Upcoming Events",
    "home.quick_links": "Quick Links",
  },
  bn: {
    // Navigation
    "nav.home": "হোম",
    "nav.history": "প্রতিষ্ঠানের ইতিহাস",
    "nav.teachers": "শিক্ষক",
    "nav.admission": "অনলাইন এডমিশন",
    "nav.gallery": "ফটো গ্যালারী",
    "nav.video": "ভিডিও",
    "nav.notice": "নোটিশ",
    "nav.academic": "একাডেমিক তথ্য",
    "nav.contact": "যোগাযোগ",
    "nav.login": "লগইন",

    // School Info
    "school.name": "চাঁদকাঠি আদর্শ বালিকা মাধ্যমিক বিদ্যালয়",
    "school.tagline": "শিক্ষায় উৎকর্ষতা, জীবনে চরিত্র",
    "school.established": "প্রতিষ্ঠিত",
    "school.location": "চাঁদকাঠি, বাংলাদেশ",

    // Common
    "common.read_more": "আরও পড়ুন",
    "common.view_all": "সব দেখুন",
    "common.download": "ডাউনলোড",
    "common.search": "খুঁজুন",
    "common.language": "ভাষা",

    // Homepage sections
    "home.welcome": "স্বাগতম",
    "home.principal_message": "প্রধান শিক্ষকের বার্তা",
    "home.latest_news": "সর্বশেষ সংবাদ ও আপডেট",
    "home.upcoming_events": "আসন্ন অনুষ্ঠান",
    "home.quick_links": "দ্রুত লিংক",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("bn")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "bn")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang === "bn" ? "bn" : "en"
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
