"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import type { Student, StudentCreateInput } from "@/lib/models/student"

export default function EditStudentPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState<StudentCreateInput>({
    studentId: "",
    name: "",
    nameInBengali: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    class: "",
    section: "",
    rollNumber: 0,
    admissionDate: "",
    address: "",
    phoneNumber: "",
    guardianPhone: "",
    email: "",
    bloodGroup: "",
    religion: "",
    nationality: "Bangladeshi",
    previousSchool: "",
    academicYear: "2025",
  })

  const classes = ["6", "7", "8", "9", "10"]
  const sections = ["A", "B", "C", "D"]
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const religions = ["Islam", "Hinduism", "Christianity", "Buddhism", "Others"]

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
        const student: Student = data.student
        setFormData({
          studentId: student.studentId,
          name: student.name,
          nameInBengali: student.nameInBengali,
          fatherName: student.fatherName,
          motherName: student.motherName,
          dateOfBirth: new Date(student.dateOfBirth).toISOString().split("T")[0],
          class: student.class,
          section: student.section,
          rollNumber: student.rollNumber,
          admissionDate: new Date(student.admissionDate).toISOString().split("T")[0],
          address: student.address,
          phoneNumber: student.phoneNumber,
          guardianPhone: student.guardianPhone,
          email: student.email || "",
          bloodGroup: student.bloodGroup || "",
          religion: student.religion,
          nationality: student.nationality,
          previousSchool: student.previousSchool || "",
          academicYear: student.academicYear,
        })
      } else {
        setError(data.error || "Student not found")
      }
    } catch (err) {
      setError("Failed to fetch student details")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof StudentCreateInput, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const response = await fetch(`/api/students/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        router.push(`/admin/students/${params.id}`)
      } else {
        setError(data.error || "Failed to update student")
      }
    } catch (err) {
      setError("Failed to update student")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error && !formData.studentId) {
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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/students/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === "bn" ? "ফিরে যান" : "Back"}
          </Link>
        </Button>
        <div>
          <h1
            className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
          >
            {language === "bn" ? "শিক্ষার্থী সম্পাদনা" : "Edit Student"}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
            {formData.name} ({formData.studentId})
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "মৌলিক তথ্য" : "Basic Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="studentId" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "শিক্ষার্থী আইডি" : "Student ID"} *
              </Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => handleInputChange("studentId", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNumber" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "রোল নম্বর" : "Roll Number"} *
              </Label>
              <Input
                id="rollNumber"
                type="number"
                value={formData.rollNumber || ""}
                onChange={(e) => handleInputChange("rollNumber", Number.parseInt(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "নাম (ইংরেজি)" : "Name (English)"} *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameInBengali" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "নাম (বাংলা)" : "Name (Bengali)"} *
              </Label>
              <Input
                id="nameInBengali"
                value={formData.nameInBengali}
                onChange={(e) => handleInputChange("nameInBengali", e.target.value)}
                className="font-bengali"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fatherName" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "পিতার নাম" : "Father's Name"} *
              </Label>
              <Input
                id="fatherName"
                value={formData.fatherName}
                onChange={(e) => handleInputChange("fatherName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motherName" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "মাতার নাম" : "Mother's Name"} *
              </Label>
              <Input
                id="motherName"
                value={formData.motherName}
                onChange={(e) => handleInputChange("motherName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "জন্ম তারিখ" : "Date of Birth"} *
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodGroup" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
              </Label>
              <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "bn" ? "নির্বাচন করুন" : "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "একাডেমিক তথ্য" : "Academic Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="class" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "শ্রেণী" : "Class"} *
              </Label>
              <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder={language === "bn" ? "নির্বাচন করুন" : "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {language === "bn" ? `${cls} শ্রেণী` : `Class ${cls}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "শাখা" : "Section"} *
              </Label>
              <Select value={formData.section} onValueChange={(value) => handleInputChange("section", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder={language === "bn" ? "নির্বাচন করুন" : "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="admissionDate" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "ভর্তির তারিখ" : "Admission Date"} *
              </Label>
              <Input
                id="admissionDate"
                type="date"
                value={formData.admissionDate}
                onChange={(e) => handleInputChange("admissionDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicYear" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "শিক্ষাবর্ষ" : "Academic Year"} *
              </Label>
              <Input
                id="academicYear"
                value={formData.academicYear}
                onChange={(e) => handleInputChange("academicYear", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="previousSchool" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "পূর্ববর্তী স্কুল" : "Previous School"}
              </Label>
              <Input
                id="previousSchool"
                value={formData.previousSchool}
                onChange={(e) => handleInputChange("previousSchool", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "যোগাযোগের তথ্য" : "Contact Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "ফোন নম্বর" : "Phone Number"} *
              </Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guardianPhone" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "অভিভাবকের ফোন" : "Guardian Phone"} *
              </Label>
              <Input
                id="guardianPhone"
                value={formData.guardianPhone}
                onChange={(e) => handleInputChange("guardianPhone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "ইমেইল" : "Email"}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="religion" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "ধর্ম" : "Religion"} *
              </Label>
              <Select
                value={formData.religion}
                onValueChange={(value) => handleInputChange("religion", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={language === "bn" ? "নির্বাচন করুন" : "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {religions.map((religion) => (
                    <SelectItem key={religion} value={religion}>
                      {religion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "ঠিকানা" : "Address"} *
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === "bn" ? "সংরক্ষণ করা হচ্ছে..." : "Saving..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {language === "bn" ? "পরিবর্তন সংরক্ষণ" : "Save Changes"}
              </>
            )}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href={`/admin/students/${params.id}`}>{language === "bn" ? "বাতিল" : "Cancel"}</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
