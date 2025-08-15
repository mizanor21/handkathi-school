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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react"
import Link from "next/link"
import type { Teacher, TeacherCreateInput } from "@/lib/models/teacher"

export default function EditTeacherPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState<TeacherCreateInput>({
    teacherId: "",
    name: "",
    nameInBengali: "",
    designation: "",
    subjects: [],
    qualifications: [],
    experience: 0,
    joiningDate: "",
    phoneNumber: "",
    email: "",
    address: "",
    dateOfBirth: "",
    bloodGroup: "",
    emergencyContact: "",
    salary: 0,
  })

  const [newQualification, setNewQualification] = useState("")

  const designations = [
    "Headmaster",
    "Assistant Headmaster",
    "Senior Assistant Teacher",
    "Assistant Teacher",
    "Physical Education Teacher",
    "Librarian",
  ]

  const subjects = [
    "Mathematics",
    "English",
    "Bengali",
    "Science",
    "Social Studies",
    "Physics",
    "Chemistry",
    "Biology",
    "ICT",
    "Religion",
    "Physical Education",
  ]

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

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
        const teacher: Teacher = data.teacher
        setFormData({
          teacherId: teacher.teacherId,
          name: teacher.name,
          nameInBengali: teacher.nameInBengali,
          designation: teacher.designation,
          subjects: teacher.subjects,
          qualifications: teacher.qualifications,
          experience: teacher.experience,
          joiningDate: new Date(teacher.joiningDate).toISOString().split("T")[0],
          phoneNumber: teacher.phoneNumber,
          email: teacher.email,
          address: teacher.address,
          dateOfBirth: new Date(teacher.dateOfBirth).toISOString().split("T")[0],
          bloodGroup: teacher.bloodGroup || "",
          emergencyContact: teacher.emergencyContact,
          salary: teacher.salary || 0,
        })
      } else {
        setError(data.error || "Teacher not found")
      }
    } catch (err) {
      setError("Failed to fetch teacher details")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof TeacherCreateInput, value: string | number | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, subject],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        subjects: prev.subjects.filter((s) => s !== subject),
      }))
    }
  }

  const addQualification = () => {
    if (newQualification.trim()) {
      setFormData((prev) => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification.trim()],
      }))
      setNewQualification("")
    }
  }

  const removeQualification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const response = await fetch(`/api/teachers/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        router.push(`/admin/teachers/${params.id}`)
      } else {
        setError(data.error || "Failed to update teacher")
      }
    } catch (err) {
      setError("Failed to update teacher")
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

  if (error && !formData.teacherId) {
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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/teachers/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === "bn" ? "ফিরে যান" : "Back"}
          </Link>
        </Button>
        <div>
          <h1
            className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
          >
            {language === "bn" ? "শিক্ষক সম্পাদনা" : "Edit Teacher"}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
            {formData.name} ({formData.teacherId})
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
              <Label htmlFor="teacherId" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "শিক্ষক আইডি" : "Teacher ID"} *
              </Label>
              <Input
                id="teacherId"
                value={formData.teacherId}
                onChange={(e) => handleInputChange("teacherId", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "পদবী" : "Designation"} *
              </Label>
              <Select
                value={formData.designation}
                onValueChange={(value) => handleInputChange("designation", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={language === "bn" ? "নির্বাচন করুন" : "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {designations.map((designation) => (
                    <SelectItem key={designation} value={designation}>
                      {designation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "পেশাগত তথ্য" : "Professional Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="experience" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "অভিজ্ঞতা (বছর)" : "Experience (Years)"} *
                </Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience || ""}
                  onChange={(e) => handleInputChange("experience", Number.parseInt(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="joiningDate" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "যোগদানের তারিখ" : "Joining Date"} *
                </Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "বেতন" : "Salary"}
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary || ""}
                  onChange={(e) => handleInputChange("salary", Number.parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Subjects */}
            <div className="space-y-3">
              <Label className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "বিষয়সমূহ" : "Subjects"} *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {subjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={subject}
                      checked={formData.subjects.includes(subject)}
                      onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                    />
                    <Label htmlFor={subject} className="text-sm">
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div className="space-y-3">
              <Label className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "শিক্ষাগত যোগ্যতা" : "Qualifications"}
              </Label>
              <div className="flex gap-2">
                <Input
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  placeholder={language === "bn" ? "যোগ্যতা যোগ করুন" : "Add qualification"}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addQualification())}
                />
                <Button type="button" onClick={addQualification} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.qualifications.length > 0 && (
                <div className="space-y-2">
                  {formData.qualifications.map((qualification, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded"
                    >
                      <span className="text-sm">{qualification}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQualification(index)}
                        className="h-6 w-6 p-0 text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
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
              <Label htmlFor="email" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "ইমেইল" : "Email"} *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "জরুরি যোগাযোগ" : "Emergency Contact"} *
              </Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                required
              />
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
            <Link href={`/admin/teachers/${params.id}`}>{language === "bn" ? "বাতিল" : "Cancel"}</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
