"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, Search, FileText, Calendar, BookOpen, ClipboardList } from "lucide-react"

interface DownloadItem {
  id: string
  title: { en: string; bn: string }
  description: { en: string; bn: string }
  category: { en: string; bn: string }
  fileType: string
  fileSize: string
  uploadDate: string
  downloadCount: number
}

export default function DownloadsPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const downloadItems: DownloadItem[] = [
    {
      id: "1",
      title: {
        en: "Admission Form 2025",
        bn: "ভর্তি ফরম ২০২৫",
      },
      description: {
        en: "Application form for new student admission",
        bn: "নতুন শিক্ষার্থী ভর্তির জন্য আবেদন ফরম",
      },
      category: { en: "Forms", bn: "ফরম" },
      fileType: "PDF",
      fileSize: "2.5 MB",
      uploadDate: "2025-01-15",
      downloadCount: 1250,
    },
    {
      id: "2",
      title: {
        en: "Class X Syllabus 2025",
        bn: "দশম শ্রেণির সিলেবাস ২০২৫",
      },
      description: {
        en: "Complete syllabus for Class X students",
        bn: "দশম শ্রেণির শিক্ষার্থীদের জন্য সম্পূর্ণ সিলেবাস",
      },
      category: { en: "Syllabus", bn: "সিলেবাস" },
      fileType: "PDF",
      fileSize: "1.8 MB",
      uploadDate: "2025-01-10",
      downloadCount: 890,
    },
    {
      id: "3",
      title: {
        en: "SSC Exam Routine 2025",
        bn: "এসএসসি পরীক্ষার রুটিন ২০২৫",
      },
      description: {
        en: "Examination schedule for SSC candidates",
        bn: "এসএসসি প্রার্থীদের জন্য পরীক্ষার সময়সূচি",
      },
      category: { en: "Exam Routine", bn: "পরীক্ষার রুটিন" },
      fileType: "PDF",
      fileSize: "0.8 MB",
      uploadDate: "2025-01-08",
      downloadCount: 2100,
    },
    {
      id: "4",
      title: {
        en: "Academic Calendar 2025",
        bn: "একাডেমিক ক্যালেন্ডার ২০২৫",
      },
      description: {
        en: "Annual academic calendar with important dates",
        bn: "গুরুত্বপূর্ণ তারিখ সহ বার্ষিক একাডেমিক ক্যালেন্ডার",
      },
      category: { en: "Calendar", bn: "ক্যালেন্ডার" },
      fileType: "PDF",
      fileSize: "1.2 MB",
      uploadDate: "2025-01-05",
      downloadCount: 750,
    },
    {
      id: "5",
      title: {
        en: "School Rules and Regulations",
        bn: "স্কুলের নিয়মকানুন",
      },
      description: {
        en: "Complete guide to school policies and regulations",
        bn: "স্কুলের নীতি ও নিয়মকানুনের সম্পূর্ণ গাইড",
      },
      category: { en: "Rules", bn: "নিয়মকানুন" },
      fileType: "PDF",
      fileSize: "3.1 MB",
      uploadDate: "2024-12-20",
      downloadCount: 450,
    },
    {
      id: "6",
      title: {
        en: "Transfer Certificate Application",
        bn: "ট্রান্সফার সার্টিফিকেট আবেদন",
      },
      description: {
        en: "Application form for transfer certificate",
        bn: "ট্রান্সফার সার্টিফিকেটের জন্য আবেদন ফরম",
      },
      category: { en: "Forms", bn: "ফরম" },
      fileType: "PDF",
      fileSize: "1.5 MB",
      uploadDate: "2024-12-15",
      downloadCount: 320,
    },
  ]

  const categories = [
    { value: "all", label: { en: "All Categories", bn: "সব ক্যাটেগরি" } },
    { value: "forms", label: { en: "Forms", bn: "ফরম" } },
    { value: "syllabus", label: { en: "Syllabus", bn: "সিলেবাস" } },
    { value: "exam", label: { en: "Exam Routine", bn: "পরীক্ষার রুটিন" } },
    { value: "calendar", label: { en: "Calendar", bn: "ক্যালেন্ডার" } },
    { value: "rules", label: { en: "Rules", bn: "নিয়মকানুন" } },
  ]

  const filteredItems = downloadItems.filter((item) => {
    const matchesSearch =
      item.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description[language].toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || item.category[language].toLowerCase().includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "xls":
      case "xlsx":
        return <FileText className="h-8 w-8 text-green-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "forms":
      case "ফরম":
        return <ClipboardList className="h-5 w-5" />
      case "syllabus":
      case "সিলেবাস":
        return <BookOpen className="h-5 w-5" />
      case "exam routine":
      case "পরীক্ষার রুটিন":
        return <Calendar className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const handleDownload = (item: DownloadItem) => {
    // Simulate download
    alert(language === "bn" ? `"${item.title[language]}" ডাউনলোড শুরু হয়েছে` : `Downloading "${item.title[language]}"`)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "ডাউনলোড সেকশন" : "Downloads Section"}
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn"
              ? "ফরম, সিলেবাস, পরীক্ষার রুটিন এবং অন্যান্য গুরুত্বপূর্ণ ডকুমেন্ট ডাউনলোড করুন।"
              : "Download forms, syllabus, exam routines, and other important documents."}
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={language === "bn" ? "ডকুমেন্ট খুঁজুন..." : "Search documents..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className={language === "bn" ? "font-bengali" : ""}
                  >
                    {category.label[language]}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(item.fileType)}
                    <div>
                      <CardTitle className={`text-lg ${language === "bn" ? "font-bengali" : ""}`}>
                        {item.title[language]}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {item.fileType} • {item.fileSize}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className={`text-gray-600 text-sm ${language === "bn" ? "font-bengali" : ""}`}>
                    {item.description[language]}
                  </p>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category[language])}
                    <Badge variant="outline" className={language === "bn" ? "font-bengali" : ""}>
                      {item.category[language]}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                    <span className={language === "bn" ? "font-bengali" : ""}>
                      {language === "bn" ? `${item.downloadCount} ডাউনলোড` : `${item.downloadCount} downloads`}
                    </span>
                  </div>
                  <Button onClick={() => handleDownload(item)} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    {language === "bn" ? "ডাউনলোড" : "Download"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold text-gray-600 mb-2 ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "কোন ডকুমেন্ট পাওয়া যায়নি" : "No documents found"}
              </h3>
              <p className={`text-gray-500 ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn"
                  ? "অন্য কিওয়ার্ড দিয়ে খুঁজে দেখুন বা ক্যাটেগরি পরিবর্তন করুন।"
                  : "Try searching with different keywords or change the category."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
