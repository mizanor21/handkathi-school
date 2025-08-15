"use client"

import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Eye } from "lucide-react"

export default function NoticePage() {
  const { language } = useLanguage()

  const notices = [
    {
      title: language === "bn" ? "২০২৫ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি" : "Admission Notice for 2025 Academic Year",
      date: "২০২৫-০১-১৫",
      category: language === "bn" ? "ভর্তি" : "Admission",
      priority: "high",
      description:
        language === "bn"
          ? "৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির জন্য আবেদন শুরু। শেষ তারিখ: ৩১ জানুয়ারি ২০২৫।"
          : "Application for admission to classes 6-9 has started. Last date: January 31, 2025.",
    },
    {
      title: language === "bn" ? "বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৫" : "Annual Sports Competition 2025",
      date: "২০২৫-০১-১০",
      category: language === "bn" ? "অনুষ্ঠান" : "Event",
      priority: "medium",
      description:
        language === "bn"
          ? "আগামী ১০ ফেব্রুয়ারি ২০২৫ বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে।"
          : "Annual sports competition will be held on February 10, 2025.",
    },
    {
      title: language === "bn" ? "এসএসসি পরীক্ষার রুটিন প্রকাশ" : "SSC Exam Routine Published",
      date: "২০২৫-০১-০৮",
      category: language === "bn" ? "পরীক্ষা" : "Exam",
      priority: "high",
      description:
        language === "bn"
          ? "২০২৫ সালের এসএসসি পরীক্ষার রুটিন প্রকাশিত হয়েছে। পরীক্ষা শুরু ১৫ ফেব্রুয়ারি।"
          : "SSC exam routine for 2025 has been published. Exam starts on February 15.",
    },
    {
      title: language === "bn" ? "শীতকালীন ছুটির তালিকা" : "Winter Holiday Schedule",
      date: "২০২৪-১২-২০",
      category: language === "bn" ? "ছুটি" : "Holiday",
      priority: "low",
      description:
        language === "bn"
          ? "শীতকালীন ছুটি ২৫ ডিসেম্বর থেকে ৫ জানুয়ারি পর্যন্ত।"
          : "Winter holidays from December 25 to January 5.",
    },
    {
      title: language === "bn" ? "অভিভাবক সভা আহ্বান" : "Parent Meeting Notice",
      date: "২০২৪-১২-১৫",
      category: language === "bn" ? "সভা" : "Meeting",
      priority: "medium",
      description:
        language === "bn"
          ? "আগামী ২০ ডিসেম্বর সকাল ১০টায় অভিভাবক সভা অনুষ্ঠিত হবে।"
          : "Parent meeting will be held on December 20 at 10 AM.",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return language === "bn" ? "জরুরি" : "Urgent"
      case "medium":
        return language === "bn" ? "গুরুত্বপূর্ণ" : "Important"
      case "low":
        return language === "bn" ? "সাধারণ" : "General"
      default:
        return language === "bn" ? "সাধারণ" : "General"
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "নোটিশ বোর্ড" : "Notice Board"}
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn"
              ? "সকল গুরুত্বপূর্ণ বিজ্ঞপ্তি ও তথ্য এখানে পাবেন।"
              : "Find all important notices and information here."}
          </p>
        </div>

        {/* Notices */}
        <div className="space-y-6">
          {notices.map((notice, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className={language === "bn" ? "font-bengali" : ""}>
                        {notice.category}
                      </Badge>
                      <Badge className={getPriorityColor(notice.priority)}>{getPriorityText(notice.priority)}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{notice.date}</span>
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold text-gray-800 mb-3 ${language === "bn" ? "font-bengali" : ""}`}>
                      {notice.title}
                    </h3>
                    <p className={`text-gray-600 leading-relaxed ${language === "bn" ? "font-bengali" : ""}`}>
                      {notice.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 md:flex-col">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Eye className="h-4 w-4" />
                      {language === "bn" ? "বিস্তারিত" : "View Details"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      {language === "bn" ? "ডাউনলোড" : "Download"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            {language === "bn" ? "আরও দেখুন" : "Load More"}
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
