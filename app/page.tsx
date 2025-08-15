"use client"

import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import { StaggeredContainer } from "@/components/staggered-container"
import Link from "next/link"
import { GraduationCap, Users, BookOpen, Award, ArrowRight, MapPin, Phone, Mail } from "lucide-react"

export default function HomePage() {
  const { t, language } = useLanguage()

  const stats = [
    {
      icon: Users,
      number: "850+",
      label: language === "bn" ? "শিক্ষার্থী" : "Students",
    },
    {
      icon: GraduationCap,
      number: "45+",
      label: language === "bn" ? "শিক্ষক" : "Teachers",
    },
    {
      icon: BookOpen,
      number: "15+",
      label: language === "bn" ? "বিষয়" : "Subjects",
    },
    {
      icon: Award,
      number: "25+",
      label: language === "bn" ? "বছরের অভিজ্ঞতা" : "Years of Excellence",
    },
  ]

  const quickLinks = [
    {
      title: language === "bn" ? "অনলাইন ভর্তি" : "Online Admission",
      description: language === "bn" ? "নতুন শিক্ষাবর্ষের জন্য আবেদন করুন" : "Apply for the new academic year",
      href: "/admission",
      color: "bg-blue-500",
    },
    {
      title: language === "bn" ? "পরীক্ষার ফলাফল" : "Exam Results",
      description: language === "bn" ? "সর্বশেষ পরীক্ষার ফলাফল দেখুন" : "View latest exam results",
      href: "/results",
      color: "bg-green-500",
    },
    {
      title: language === "bn" ? "একাডেমিক ক্যালেন্ডার" : "Academic Calendar",
      description: language === "bn" ? "গুরুত্বপূর্ণ তারিখ ও অনুষ্ঠান" : "Important dates and events",
      href: "/academic",
      color: "bg-purple-500",
    },
    {
      title: language === "bn" ? "ডাউনলোড" : "Downloads",
      description: language === "bn" ? "ফর্ম ও সিলেবাস ডাউনলোড করুন" : "Download forms and syllabus",
      href: "/downloads",
      color: "bg-orange-500",
    },
  ]

  const latestNews = [
    {
      title: language === "bn" ? "২০২৫ শিক্ষাবর্ষের ভর্তি শুরু" : "Admission Open for 2025 Academic Year",
      date: "২০২৫-০১-১৫",
      category: language === "bn" ? "ভর্তি" : "Admission",
    },
    {
      title: language === "bn" ? "বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৫" : "Annual Sports Competition 2025",
      date: "২০২৫-০২-১০",
      category: language === "bn" ? "অনুষ্ঠান" : "Event",
    },
    {
      title: language === "bn" ? "এসএসসি পরীক্ষার রুটিন প্রকাশ" : "SSC Exam Routine Published",
      date: "২০২৫-০১-২০",
      category: language === "bn" ? "পরীক্ষা" : "Exam",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-right" className="space-y-6">
              <h1 className={`text-4xl md:text-5xl font-bold leading-tight ${language === "bn" ? "font-bengali" : ""}`}>
                {t("home.welcome")} <br />
                <span className="gradient-text text-green-200">{t("school.name")}</span>
              </h1>
              <p className={`text-xl text-green-100 leading-relaxed ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn"
                  ? "শিক্ষায় উৎকর্ষতা, চরিত্রে মাধুর্য - আমাদের লক্ষ্য প্রতিটি শিক্ষার্থীর সর্বোচ্চ বিকাশ।"
                  : "Excellence in Education, Character in Life - Our mission is to nurture every student to reach their full potential."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="btn-primary animate-pulse-glow">
                  <Link href="/admission">
                    {language === "bn" ? "ভর্তি হন" : "Apply Now"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="btn-secondary bg-transparent">
                  <Link href="/about">{language === "bn" ? "আরও জানুন" : "Learn More"}</Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-left" delay={200} className="relative">
              <img
                src="/images/school-banner.jpeg"
                alt="School Students and Building"
                className="rounded-lg shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <StaggeredContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={150}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2 counter-animation">{stat.number}</div>
                  <div className={`text-gray-600 dark:text-gray-300 ${language === "bn" ? "font-bengali" : ""}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* Principal's Message */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="scale-up" delay={200}>
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Headmaster Sarojini Mondal"
                  className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </AnimatedSection>
              <AnimatedSection animation="slide-left" delay={400} className="space-y-6">
                <h2
                  className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
                >
                  {language === "bn" ? "প্রধান শিক্ষকের বাণী" : "Headmaster's Message"}
                </h2>
                <p
                  className={`text-gray-600 dark:text-gray-300 leading-relaxed ${language === "bn" ? "font-bengali" : ""}`}
                >
                  {language === "bn"
                    ? "প্রিয় শিক্ষার্থী ও অভিভাবকগণ, চাঁদকাঠি আদর্শ বালিকা মাধ্যমিক বিদ্যালয়ে আপনাদের স্বাগতম। আমাদের বিদ্যালয় শুধু একাডেমিক শিক্ষায় নয়, বরং নৈতিক মূল্যবোধ ও চরিত্র গঠনে প্রতিশ্রুতিবদ্ধ। আমরা প্রতিটি ছাত্রীর সুপ্ত প্রতিভা বিকাশে এবং তাদের ভবিষ্যৎ গড়তে নিরলসভাবে কাজ করে যাচ্ছি।"
                    : "Dear students and parents, welcome to Chandkathi Adarsha Girls' Secondary School. Our institution is committed not only to academic excellence but also to moral values and character development. We work tirelessly to nurture the hidden talents of every student and shape their bright future."}
                </p>
                <div className="space-y-2">
                  <p
                    className={`font-semibold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {language === "bn" ? "সরোজিনী মন্ডল" : "Sarojini Mondal"}
                  </p>
                  <p className={`text-gray-600 dark:text-gray-300 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "প্রধান শিক্ষক" : "Headmaster"}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Quick Links */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2
              className={`text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12 ${language === "bn" ? "font-bengali" : ""}`}
            >
              {t("home.quick_links")}
            </h2>
            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={100}>
              {quickLinks.map((link, index) => (
                <Card key={index} className="card-hover cursor-pointer group overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="animate-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div
                      className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                    >
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                    <h3
                      className={`text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 relative z-10 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {link.title}
                    </h3>
                    <p
                      className={`text-gray-600 dark:text-gray-300 text-sm mb-4 relative z-10 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {link.description}
                    </p>
                    <Link
                      href={link.href}
                      className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 relative z-10 transition-colors duration-200"
                    >
                      {language === "bn" ? "বিস্তারিত" : "Learn More"} →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* Latest News & Events */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Latest News */}
              <AnimatedSection animation="slide-right" delay={200}>
                <div className="flex items-center justify-between mb-8">
                  <h2
                    className={`text-2xl font-bold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {t("home.latest_news")}
                  </h2>
                  <Link
                    href="/notice"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
                  >
                    {t("common.view_all")} →
                  </Link>
                </div>
                <StaggeredContainer className="space-y-4" staggerDelay={100}>
                  {latestNews.map((news, index) => (
                    <Card key={index} className="card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary" className={language === "bn" ? "font-bengali" : ""}>
                            {news.category}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{news.date}</span>
                        </div>
                        <h3
                          className={`font-semibold text-gray-800 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition-colors duration-200 ${language === "bn" ? "font-bengali" : ""}`}
                        >
                          {news.title}
                        </h3>
                      </CardContent>
                    </Card>
                  ))}
                </StaggeredContainer>
              </AnimatedSection>

              {/* Contact Info */}
              <AnimatedSection animation="slide-left" delay={400}>
                <h2
                  className={`text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 ${language === "bn" ? "font-bengali" : ""}`}
                >
                  {language === "bn" ? "যোগাযোগের তথ্য" : "Contact Information"}
                </h2>
                <Card className="card-hover">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-start gap-4 group">
                      <MapPin className="h-5 w-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <div>
                        <h4
                          className={`font-semibold text-gray-800 dark:text-gray-100 mb-1 ${language === "bn" ? "font-bengali" : ""}`}
                        >
                          {language === "bn" ? "ঠিকানা" : "Address"}
                        </h4>
                        <p className={`text-gray-600 dark:text-gray-300 ${language === "bn" ? "font-bengali" : ""}`}>
                          {language === "bn" ? "চাঁদকাঠি, বাংলাদেশ" : "Chandkathi, Bangladesh"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <Phone className="h-5 w-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <div>
                        <h4
                          className={`font-semibold text-gray-800 dark:text-gray-100 mb-1 ${language === "bn" ? "font-bengali" : ""}`}
                        >
                          {language === "bn" ? "ফোন" : "Phone"}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">+880 1711-288308</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <Mail className="h-5 w-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <div>
                        <h4
                          className={`font-semibold text-gray-800 dark:text-gray-100 mb-1 ${language === "bn" ? "font-bengali" : ""}`}
                        >
                          {language === "bn" ? "ইমেইল" : "Email"}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">info@chandkathi-school.edu.bd</p>
                      </div>
                    </div>
                    <Button asChild className="w-full btn-primary">
                      <Link href="/contact">{language === "bn" ? "যোগাযোগ করুন" : "Contact Us"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </MainLayout>
  )
}
