"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Calendar, User, Users, Bell, Clock, Eye } from "lucide-react"
import Link from "next/link"
import type { Notice } from "@/lib/models/notice"

export default function NoticeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchNotice(params.id as string)
    }
  }, [params.id])

  const fetchNotice = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/notices/${id}`)
      const data = await response.json()

      if (response.ok) {
        setNotice(data.notice)
      } else {
        setError(data.error || "Notice not found")
      }
    } catch (err) {
      setError("Failed to fetch notice details")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!notice || !confirm(language === "bn" ? "আপনি কি নিশ্চিত?" : "Are you sure?")) return

    try {
      const response = await fetch(`/api/notices/${notice._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/admin/notices")
      } else {
        alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete notice")
      }
    } catch (err) {
      alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete notice")
    }
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      general: language === "bn" ? "সাধারণ" : "General",
      academic: language === "bn" ? "একাডেমিক" : "Academic",
      exam: language === "bn" ? "পরীক্ষা" : "Exam",
      event: language === "bn" ? "অনুষ্ঠান" : "Event",
      admission: language === "bn" ? "ভর্তি" : "Admission",
      urgent: language === "bn" ? "জরুরি" : "Urgent",
    }
    return labels[category as keyof typeof labels] || category
  }

  const getPriorityLabel = (priority: string) => {
    const labels = {
      low: language === "bn" ? "কম" : "Low",
      medium: language === "bn" ? "মাঝারি" : "Medium",
      high: language === "bn" ? "উচ্চ" : "High",
    }
    return labels[priority as keyof typeof labels] || priority
  }

  const getTargetAudienceLabel = (audience: string) => {
    const labels = {
      all: language === "bn" ? "সবার জন্য" : "All",
      students: language === "bn" ? "শিক্ষার্থী" : "Students",
      teachers: language === "bn" ? "শিক্ষক" : "Teachers",
      parents: language === "bn" ? "অভিভাবক" : "Parents",
    }
    return labels[audience as keyof typeof labels] || audience
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error || !notice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/notices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === "bn" ? "ফিরে যান" : "Back"}
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isExpired = notice.expiryDate && new Date(notice.expiryDate) < new Date()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/notices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === "bn" ? "ফিরে যান" : "Back"}
            </Link>
          </Button>
          <div>
            <h1
              className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
            >
              {language === "bn" ? notice.titleInBengali : notice.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{getCategoryLabel(notice.category)}</Badge>
              <Badge
                variant={
                  notice.priority === "high" ? "destructive" : notice.priority === "medium" ? "default" : "outline"
                }
              >
                {getPriorityLabel(notice.priority)}
              </Badge>
              {isExpired && <Badge variant="outline">Expired</Badge>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={`/admin/notices/${notice._id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              {language === "bn" ? "সম্পাদনা" : "Edit"}
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            {language === "bn" ? "ডিলিট" : "Delete"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notice Content */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
                <Bell className="h-5 w-5" />
                {language === "bn" ? "নোটিশের বিষয়বস্তু" : "Notice Content"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* English Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  {language === "bn" ? "ইংরেজি" : "English"}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">{notice.title}</h4>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {notice.content}
                  </div>
                </div>
              </div>

              {/* Bengali Content */}
              <div>
                <h3
                  className={`text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 ${language === "bn" ? "font-bengali" : ""}`}
                >
                  {language === "bn" ? "বাংলা" : "Bengali"}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2 font-bengali">
                    {notice.titleInBengali}
                  </h4>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed font-bengali">
                    {notice.contentInBengali}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          {notice.attachments && notice.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "সংযুক্তি" : "Attachments"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {notice.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{attachment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notice Details */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-lg ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "নোটিশের বিবরণ" : "Notice Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "লক্ষ্য দর্শক" : "Target Audience"}
                  </p>
                  <p className="font-medium">{getTargetAudienceLabel(notice.targetAudience)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "প্রকাশের তারিখ" : "Publish Date"}
                  </p>
                  <p className="font-medium">{new Date(notice.publishDate).toLocaleDateString()}</p>
                </div>
              </div>

              {notice.expiryDate && (
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p
                      className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {language === "bn" ? "মেয়াদ উত্তীর্ণের তারিখ" : "Expiry Date"}
                    </p>
                    <p className={`font-medium ${isExpired ? "text-red-600" : ""}`}>
                      {new Date(notice.expiryDate).toLocaleDateString()}
                      {isExpired && (
                        <span className="ml-2 text-xs">({language === "bn" ? "মেয়াদ উত্তীর্ণ" : "Expired"})</span>
                      )}
                    </p>
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "লেখক" : "Author"}
                  </p>
                  <p className="font-medium">{notice.authorName}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publication Status */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-lg ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "প্রকাশনার অবস্থা" : "Publication Status"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={notice.isPublished ? "default" : "secondary"} className="text-sm">
                {notice.isPublished
                  ? language === "bn"
                    ? "প্রকাশিত"
                    : "Published"
                  : language === "bn"
                    ? "অপ্রকাশিত"
                    : "Draft"}
              </Badge>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-lg ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "রেকর্ড তথ্য" : "Record Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "তৈরি হয়েছে" : "Created"}
                </p>
                <p className="text-sm font-medium">{new Date(notice.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "সর্বশেষ আপডেট" : "Last Updated"}
                </p>
                <p className="text-sm font-medium">{new Date(notice.updatedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
