"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Phone, Mail, MapPin, Calendar, User, GraduationCap, Award, Clock } from "lucide-react"
import Link from "next/link"
import type { Teacher } from "@/lib/models/teacher"

export default function TeacherDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchTeacher(params.id as string)
    }
  }, [params.id])

  const fetchTeacher = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/teachers/${id}`)
      const data = await response.json()

      if (response.ok) {
        setTeacher(data.teacher)
      } else {
        setError(data.error || "Teacher not found")
      }
    } catch (err) {
      setError("Failed to fetch teacher details")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!teacher || !confirm(language === "bn" ? "আপনি কি নিশ্চিত?" : "Are you sure?")) return

    try {
      const response = await fetch(`/api/teachers/${teacher._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/admin/teachers")
      } else {
        alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete teacher")
      }
    } catch (err) {
      alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete teacher")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error || !teacher) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/teachers">
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/teachers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === "bn" ? "ফিরে যান" : "Back"}
            </Link>
          </Button>
          <div>
            <h1
              className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
            >
              {teacher.name}
            </h1>
            <p className={`text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
              {teacher.nameInBengali}
            </p>
            <Badge variant="secondary" className="mt-2">
              {teacher.designation}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={`/admin/teachers/${teacher._id}/edit`}>
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
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
                <User className="h-5 w-5" />
                {language === "bn" ? "মৌলিক তথ্য" : "Basic Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "শিক্ষক আইডি" : "Teacher ID"}
                  </p>
                  <p className="font-medium">{teacher.teacherId}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "পদবী" : "Designation"}
                  </p>
                  <Badge variant="secondary">{teacher.designation}</Badge>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "জন্ম তারিখ" : "Date of Birth"}
                  </p>
                  <p className="font-medium">{new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                  </p>
                  <p className="font-medium">{teacher.bloodGroup || "N/A"}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "যোগদানের তারিখ" : "Joining Date"}
                  </p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(teacher.joiningDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "অভিজ্ঞতা" : "Experience"}
                  </p>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {teacher.experience} {language === "bn" ? "বছর" : "years"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
                <GraduationCap className="h-5 w-5" />
                {language === "bn" ? "পেশাগত তথ্য" : "Professional Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subjects */}
              <div>
                <p
                  className={`text-sm text-gray-600 dark:text-gray-400 mb-3 ${language === "bn" ? "font-bengali" : ""}`}
                >
                  {language === "bn" ? "বিষয়সমূহ" : "Subjects"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject) => (
                    <Badge key={subject} variant="outline">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              {teacher.qualifications.length > 0 && (
                <div>
                  <p
                    className={`text-sm text-gray-600 dark:text-gray-400 mb-3 ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {language === "bn" ? "শিক্ষাগত যোগ্যতা" : "Qualifications"}
                  </p>
                  <div className="space-y-2">
                    {teacher.qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{qualification}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Salary */}
              {teacher.salary && (
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "বেতন" : "Salary"}
                  </p>
                  <p className="font-medium">৳{teacher.salary.toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-lg ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "স্ট্যাটাস" : "Status"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  teacher.status === "active" ? "default" : teacher.status === "inactive" ? "secondary" : "outline"
                }
                className="text-sm"
              >
                {teacher.status === "active"
                  ? language === "bn"
                    ? "সক্রিয়"
                    : "Active"
                  : teacher.status === "inactive"
                    ? language === "bn"
                      ? "নিষ্ক্রিয়"
                      : "Inactive"
                    : language === "bn"
                      ? "অবসরপ্রাপ্ত"
                      : "Retired"}
              </Badge>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-lg ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "যোগাযোগের তথ্য" : "Contact Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "ফোন" : "Phone"}
                  </p>
                  <p className="font-medium">{teacher.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "ইমেইল" : "Email"}
                  </p>
                  <p className="font-medium">{teacher.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "জরুরি যোগাযোগ" : "Emergency Contact"}
                  </p>
                  <p className="font-medium">{teacher.emergencyContact}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "ঠিকানা" : "Address"}
                  </p>
                  <p className="font-medium">{teacher.address}</p>
                </div>
              </div>
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
                <p className="text-sm font-medium">{new Date(teacher.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "সর্বশেষ আপডেট" : "Last Updated"}
                </p>
                <p className="text-sm font-medium">{new Date(teacher.updatedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
