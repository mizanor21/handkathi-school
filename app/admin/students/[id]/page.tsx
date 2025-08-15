"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Phone, Mail, MapPin, Calendar, User, GraduationCap } from "lucide-react"
import Link from "next/link"
import type { Student } from "@/lib/models/student"

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchStudent(params.id as string)
    }
  }, [params.id])

  const fetchStudent = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/students/${id}`)
      const data = await response.json()

      if (response.ok) {
        setStudent(data.student)
      } else {
        setError(data.error || "Student not found")
      }
    } catch (err) {
      setError("Failed to fetch student details")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!student || !confirm(language === "bn" ? "আপনি কি নিশ্চিত?" : "Are you sure?")) return

    try {
      const response = await fetch(`/api/students/${student._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/admin/students")
      } else {
        alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete student")
      }
    } catch (err) {
      alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete student")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/students">
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
            <Link href="/admin/students">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === "bn" ? "ফিরে যান" : "Back"}
            </Link>
          </Button>
          <div>
            <h1
              className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
            >
              {student.name}
            </h1>
            <p className={`text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
              {student.nameInBengali}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={`/admin/students/${student._id}/edit`}>
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
                    {language === "bn" ? "শিক্ষার্থী আইডি" : "Student ID"}
                  </p>
                  <p className="font-medium">{student.studentId}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "রোল নম্বর" : "Roll Number"}
                  </p>
                  <p className="font-medium">{student.rollNumber}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "পিতার নাম" : "Father's Name"}
                  </p>
                  <p className="font-medium">{student.fatherName}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "মাতার নাম" : "Mother's Name"}
                  </p>
                  <p className="font-medium">{student.motherName}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "জন্ম তারিখ" : "Date of Birth"}
                  </p>
                  <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                  </p>
                  <p className="font-medium">{student.bloodGroup || "N/A"}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "ধর্ম" : "Religion"}
                  </p>
                  <p className="font-medium">{student.religion}</p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "জাতীয়তা" : "Nationality"}
                  </p>
                  <p className="font-medium">{student.nationality}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
                <GraduationCap className="h-5 w-5" />
                {language === "bn" ? "একাডেমিক তথ্য" : "Academic Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "শ্রেণী" : "Class"}
                  </p>
                  <Badge variant="secondary">
                    {language === "bn" ? `${student.class} শ্রেণী` : `Class ${student.class}`}
                  </Badge>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "শাখা" : "Section"}
                  </p>
                  <Badge variant="outline">{student.section}</Badge>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "ভর্তির তারিখ" : "Admission Date"}
                  </p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(student.admissionDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "শিক্ষাবর্ষ" : "Academic Year"}
                  </p>
                  <p className="font-medium">{student.academicYear}</p>
                </div>
                {student.previousSchool && (
                  <div className="md:col-span-2">
                    <p
                      className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {language === "bn" ? "পূর্ববর্তী স্কুল" : "Previous School"}
                    </p>
                    <p className="font-medium">{student.previousSchool}</p>
                  </div>
                )}
              </div>
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
                  student.status === "active" ? "default" : student.status === "inactive" ? "secondary" : "outline"
                }
                className="text-sm"
              >
                {student.status === "active"
                  ? language === "bn"
                    ? "সক্রিয়"
                    : "Active"
                  : student.status === "inactive"
                    ? language === "bn"
                      ? "নিষ্ক্রিয়"
                      : "Inactive"
                    : language === "bn"
                      ? "স্নাতক"
                      : "Graduated"}
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
                  <p className="font-medium">{student.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "অভিভাবকের ফোন" : "Guardian Phone"}
                  </p>
                  <p className="font-medium">{student.guardianPhone}</p>
                </div>
              </div>
              {student.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p
                      className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {language === "bn" ? "ইমেইল" : "Email"}
                    </p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                </div>
              )}
              <Separator />
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "ঠিকানা" : "Address"}
                  </p>
                  <p className="font-medium">{student.address}</p>
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
                <p className="text-sm font-medium">{new Date(student.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "সর্বশেষ আপডেট" : "Last Updated"}
                </p>
                <p className="text-sm font-medium">{new Date(student.updatedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
