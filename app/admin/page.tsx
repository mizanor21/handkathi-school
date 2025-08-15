"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useContent } from "@/contexts/content-context"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, Users, Newspaper, BarChart3, LogOut, Plus, Eye } from "lucide-react"

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth()
  const { language } = useLanguage()
  const { content } = useContent()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const stats = [
    {
      title: language === "bn" ? "মোট নোটিশ" : "Total Notices",
      value: content.notices.length,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: language === "bn" ? "মোট শিক্ষক" : "Total Teachers",
      value: content.teachers.length,
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: language === "bn" ? "মোট সংবাদ" : "Total News",
      value: content.news.length,
      icon: Newspaper,
      color: "bg-purple-500",
    },
    {
      title: language === "bn" ? "সক্রিয় নোটিশ" : "Active Notices",
      value: content.notices.filter((n) => n.priority === "high").length,
      icon: BarChart3,
      color: "bg-orange-500",
    },
  ]

  const quickActions = [
    {
      title: language === "bn" ? "নতুন নোটিশ" : "New Notice",
      description: language === "bn" ? "নতুন নোটিশ যোগ করুন" : "Add a new notice",
      href: "/admin/notices/new",
      icon: Plus,
      color: "bg-blue-500",
    },
    {
      title: language === "bn" ? "নতুন সংবাদ" : "New News",
      description: language === "bn" ? "নতুন সংবাদ যোগ করুন" : "Add a new news item",
      href: "/admin/news/new",
      icon: Plus,
      color: "bg-green-500",
    },
    {
      title: language === "bn" ? "শিক্ষক যোগ করুন" : "Add Teacher",
      description: language === "bn" ? "নতুন শিক্ষক যোগ করুন" : "Add a new teacher",
      href: "/admin/teachers/new",
      icon: Plus,
      color: "bg-purple-500",
    },
    {
      title: language === "bn" ? "সাইট দেখুন" : "View Site",
      description: language === "bn" ? "পাবলিক সাইট দেখুন" : "View public website",
      href: "/",
      icon: Eye,
      color: "bg-gray-500",
    },
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold text-gray-800 mb-2 ${language === "bn" ? "font-bengali" : ""}`}>
              {language === "bn" ? "অ্যাডমিন ড্যাশবোর্ড" : "Admin Dashboard"}
            </h1>
            <p className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
              {language === "bn" ? `স্বাগতম, ${user?.name}` : `Welcome, ${user?.name}`}
            </p>
          </div>
          <Button variant="outline" onClick={logout} className="flex items-center gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            {language === "bn" ? "লগআউট" : "Logout"}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm text-gray-600 mb-1 ${language === "bn" ? "font-bengali" : ""}`}>
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "দ্রুত কাজ" : "Quick Actions"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <Link href={action.href} className="block">
                    <div
                      className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3
                      className={`text-lg font-semibold text-gray-800 mb-2 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {action.title}
                    </h3>
                    <p className={`text-gray-600 text-sm ${language === "bn" ? "font-bengali" : ""}`}>
                      {action.description}
                    </p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Notices */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center justify-between ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "সাম্প্রতিক নোটিশ" : "Recent Notices"}
                <Link href="/admin/notices">
                  <Button variant="outline" size="sm">
                    {language === "bn" ? "সব দেখুন" : "View All"}
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.notices.slice(0, 3).map((notice) => (
                  <div key={notice.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className={`font-medium text-gray-800 mb-1 ${language === "bn" ? "font-bengali" : ""}`}>
                        {notice.title[language]}
                      </h4>
                      <p className={`text-sm text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {notice.date}
                      </p>
                    </div>
                    <Badge variant={notice.priority === "high" ? "destructive" : "secondary"}>
                      {notice.priority === "high"
                        ? language === "bn"
                          ? "জরুরি"
                          : "Urgent"
                        : notice.priority === "medium"
                          ? language === "bn"
                            ? "গুরুত্বপূর্ণ"
                            : "Important"
                          : language === "bn"
                            ? "সাধারণ"
                            : "General"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent News */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center justify-between ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "সাম্প্রতিক সংবাদ" : "Recent News"}
                <Link href="/admin/news">
                  <Button variant="outline" size="sm">
                    {language === "bn" ? "সব দেখুন" : "View All"}
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.news.slice(0, 3).map((news) => (
                  <div key={news.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className={`font-medium text-gray-800 mb-1 ${language === "bn" ? "font-bengali" : ""}`}>
                        {news.title[language]}
                      </h4>
                      <p className={`text-sm text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>{news.date}</p>
                    </div>
                    {news.featured && <Badge variant="secondary">{language === "bn" ? "ফিচার্ড" : "Featured"}</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
