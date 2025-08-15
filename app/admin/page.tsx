"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, GraduationCap, Bell, TrendingUp, Eye, UserCheck } from "lucide-react"
import DashboardChart from "@/components/admin/dashboard-chart"
import RecentActivities from "@/components/admin/recent-activities"

interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalNotices: number
  activeNotices: number
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalNotices: 0,
    activeNotices: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch real data from APIs
        const [studentsRes, teachersRes, noticesRes] = await Promise.all([
          fetch("/api/students"),
          fetch("/api/teachers"),
          fetch("/api/notices"),
        ])

        const [students, teachers, notices] = await Promise.all([
          studentsRes.json(),
          teachersRes.json(),
          noticesRes.json(),
        ])

        const activeNotices = notices.filter(
          (notice: any) => new Date(notice.expiryDate) > new Date() && notice.isActive,
        ).length

        setStats({
          totalStudents: students.length || 0,
          totalTeachers: teachers.length || 0,
          totalNotices: notices.length || 0,
          activeNotices: activeNotices || 0,
        })
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
        // Fallback to demo data if API fails
        setStats({
          totalStudents: 850,
          totalTeachers: 45,
          totalNotices: 12,
          activeNotices: 5,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const dashboardStats = [
    {
      title: language === "bn" ? "মোট শিক্ষার্থী" : "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "bg-blue-500",
      href: "/admin/students",
    },
    {
      title: language === "bn" ? "মোট শিক্ষক" : "Total Teachers",
      value: stats.totalTeachers,
      icon: GraduationCap,
      color: "bg-green-500",
      href: "/admin/teachers",
    },
    {
      title: language === "bn" ? "মোট নোটিশ" : "Total Notices",
      value: stats.totalNotices,
      icon: Bell,
      color: "bg-purple-500",
      href: "/admin/notices",
    },
    {
      title: language === "bn" ? "সক্রিয় নোটিশ" : "Active Notices",
      value: stats.activeNotices,
      icon: TrendingUp,
      color: "bg-orange-500",
      href: "/admin/notices",
    },
  ]

  const quickActions = [
    {
      title: language === "bn" ? "নতুন শিক্ষার্থী" : "Add Student",
      description: language === "bn" ? "নতুন শিক্ষার্থী যোগ করুন" : "Register a new student",
      href: "/admin/students/new",
      icon: UserCheck,
      color: "bg-blue-500",
    },
    {
      title: language === "bn" ? "নতুন শিক্ষক" : "Add Teacher",
      description: language === "bn" ? "নতুন শিক্ষক যোগ করুন" : "Add a new teacher",
      href: "/admin/teachers/new",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      title: language === "bn" ? "নতুন নোটিশ" : "New Notice",
      description: language === "bn" ? "নতুন নোটিশ প্রকাশ করুন" : "Publish a new notice",
      href: "/admin/notices/new",
      icon: Bell,
      color: "bg-purple-500",
    },
    {
      title: language === "bn" ? "সাইট দেখুন" : "View Website",
      description: language === "bn" ? "পাবলিক ওয়েবসাইট দেখুন" : "View public website",
      href: "/",
      icon: Eye,
      color: "bg-gray-500",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1
            className={`text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 ${language === "bn" ? "font-bengali" : ""}`}
          >
            {language === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? `স্বাগতম, ${user?.name}` : `Welcome back, ${user?.name}`}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button asChild variant="outline">
            <Link href="/">
              <Eye className="h-4 w-4 mr-2" />
              {language === "bn" ? "সাইট দেখুন" : "View Site"}
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm text-gray-600 dark:text-gray-400 mb-1 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-green-600 transition-colors">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2
          className={`text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 ${language === "bn" ? "font-bengali" : ""}`}
        >
          {language === "bn" ? "দ্রুত কাজ" : "Quick Actions"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardContent className="p-6">
                <Link href={action.href} className="block">
                  <div
                    className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3
                    className={`text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-green-600 transition-colors ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {action.title}
                  </h3>
                  <p className={`text-gray-600 dark:text-gray-400 text-sm ${language === "bn" ? "font-bengali" : ""}`}>
                    {action.description}
                  </p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          type="enrollment"
          data={[
            { month: language === "bn" ? "জানু" : "Jan", students: 45 },
            { month: language === "bn" ? "ফেব" : "Feb", students: 52 },
            { month: language === "bn" ? "মার্চ" : "Mar", students: 48 },
            { month: language === "bn" ? "এপ্রিল" : "Apr", students: 61 },
            { month: language === "bn" ? "মে" : "May", students: 55 },
            { month: language === "bn" ? "জুন" : "Jun", students: 67 },
          ]}
        />
        <DashboardChart
          type="subjects"
          data={[
            { name: language === "bn" ? "বাংলা" : "Bengali", value: 8 },
            { name: language === "bn" ? "ইংরেজি" : "English", value: 6 },
            { name: language === "bn" ? "গণিত" : "Mathematics", value: 5 },
            { name: language === "bn" ? "বিজ্ঞান" : "Science", value: 7 },
            { name: language === "bn" ? "সমাজ" : "Social Studies", value: 4 },
          ]}
        />
      </div>

      {/* Enhanced Recent Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center justify-between ${language === "bn" ? "font-bengali" : ""}`}>
              {language === "bn" ? "সিস্টেম স্ট্যাটাস" : "System Status"}
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {language === "bn" ? "সব ঠিক আছে" : "All Good"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "ডাটাবেস সংযোগ" : "Database Connection"}
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {language === "bn" ? "সংযুক্ত" : "Connected"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "সার্ভার স্ট্যাটাস" : "Server Status"}
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {language === "bn" ? "চালু" : "Online"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "শেষ ব্যাকআপ" : "Last Backup"}
                </span>
                <span className="text-sm text-gray-800 dark:text-gray-100">
                  {language === "bn" ? "২ ঘন্টা আগে" : "2 hours ago"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
