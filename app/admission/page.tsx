"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, FileText, Calendar, CheckCircle, Upload } from "lucide-react"

export default function AdmissionPage() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    gender: "",
    religion: "",
    nationality: "",
    previousSchool: "",
    classApplying: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    address: "",
    emergencyContact: "",
  })
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 2000)
  }

  const admissionInfo = [
    {
      title: language === "bn" ? "ভর্তির যোগ্যতা" : "Eligibility Criteria",
      items: [
        language === "bn" ? "বয়স: ১০-১৬ বছর" : "Age: 10-16 years",
        language === "bn" ? "পূর্ববর্তী শ্রেণিতে উত্তীর্ণ" : "Passed previous class",
        language === "bn" ? "স্বাস্থ্য সার্টিফিকেট" : "Health certificate",
      ],
    },
    {
      title: language === "bn" ? "প্রয়োজনীয় কাগজপত্র" : "Required Documents",
      items: [
        language === "bn" ? "জন্ম সনদ" : "Birth certificate",
        language === "bn" ? "পূর্ববর্তী শ্রেণির সার্টিফিকেট" : "Previous class certificate",
        language === "bn" ? "৪ কপি পাসপোর্ট সাইজ ছবি" : "4 passport size photos",
        language === "bn" ? "অভিভাবকের জাতীয় পরিচয়পত্র" : "Guardian's NID copy",
      ],
    },
    {
      title: language === "bn" ? "ভর্তি ফি" : "Admission Fees",
      items: [
        language === "bn" ? "আবেদন ফি: ৫০০ টাকা" : "Application fee: 500 BDT",
        language === "bn" ? "ভর্তি ফি: ২,০০০ টাকা" : "Admission fee: 2,000 BDT",
        language === "bn" ? "মাসিক বেতন: ৮০০ টাকা" : "Monthly fee: 800 BDT",
      ],
    },
  ]

  if (submitted) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className={`text-3xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "আবেদন সফল!" : "Application Successful!"}
              </h1>
              <p className={`text-gray-600 mb-6 ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn"
                  ? "আপনার ভর্তির আবেদন সফলভাবে জমা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"
                  : "Your admission application has been submitted successfully. We will contact you soon."}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className={`text-sm text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "আবেদন নম্বর:" : "Application Number:"}
                </p>
                <p className="text-lg font-bold text-green-600">ADM-2025-{Math.floor(Math.random() * 10000)}</p>
              </div>
              <Button onClick={() => window.print()}>{language === "bn" ? "রসিদ প্রিন্ট করুন" : "Print Receipt"}</Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "অনলাইন ভর্তি" : "Online Admission"}
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn"
              ? "২০২৫ শিক্ষাবর্ষের জন্য অনলাইনে ভর্তির আবেদন করুন।"
              : "Apply for admission online for the 2025 academic year."}
          </p>
          <Badge variant="secondary" className="mt-4">
            {language === "bn" ? "আবেদনের শেষ তারিখ: ৩১ জানুয়ারি ২০২৫" : "Last Date: January 31, 2025"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admission Information */}
          <div className="lg:col-span-1 space-y-6">
            {admissionInfo.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
                    <FileText className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className={`text-sm text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className={`font-semibold text-gray-800 mb-2 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "গুরুত্বপূর্ণ তারিখ" : "Important Dates"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className={`flex justify-between ${language === "bn" ? "font-bengali" : ""}`}>
                      <span>{language === "bn" ? "আবেদন শুরু:" : "Application Start:"}</span>
                      <span>Jan 1, 2025</span>
                    </div>
                    <div className={`flex justify-between ${language === "bn" ? "font-bengali" : ""}`}>
                      <span>{language === "bn" ? "আবেদন শেষ:" : "Application End:"}</span>
                      <span>Jan 31, 2025</span>
                    </div>
                    <div className={`flex justify-between ${language === "bn" ? "font-bengali" : ""}`}>
                      <span>{language === "bn" ? "ভর্তি পরীক্ষা:" : "Admission Test:"}</span>
                      <span>Mar 5, 2025</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
                  <GraduationCap className="h-5 w-5" />
                  {language === "bn" ? "ভর্তির আবেদন ফরম" : "Admission Application Form"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student Information */}
                  <div>
                    <h3
                      className={`text-lg font-semibold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {language === "bn" ? "শিক্ষার্থীর তথ্য" : "Student Information"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="studentName" className={language === "bn" ? "font-bengali" : ""}>
                          {language === "bn" ? "শিক্ষার্থীর নাম" : "Student Name"} *
                        </Label>
                        <Input
                          id="studentName"
                          value={formData.studentName}
                          onChange={(e) => handleInputChange("studentName", e.target.value)}
                          placeholder={language === "bn" ? "পূর্ণ নাম লিখুন" : "Enter full name"}
                          required
                        />
                      </div>
                      <div>
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
                      <div>
                        <Label htmlFor="fatherName" className={language === "bn" ? "font-bengali" : ""}>
                          {language === "bn" ? "পিতার নাম" : "Father's Name"} *
                        </Label>
                        <Input
                          id="fatherName"
                          value={formData.fatherName}
                          onChange={(e) => handleInputChange("fatherName", e.target.value)}
                          placeholder={language === "bn" ? "পিতার নাম" : "Father's name"}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="motherName" className={language === "bn" ? "font-bengali" : ""}>
                          {language === "bn" ? "মাতার নাম" : "Mother's Name"} *
                        </Label>
                        <Input
                          id="motherName"
                          value={formData.motherName}
                          onChange={(e) => handleInputChange("motherName", e.target.value)}
                          placeholder={language === "bn" ? "মাতার নাম" : "Mother's name"}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender" className={language === "bn" ? "font-bengali" : ""}>
                          {language === "bn" ? "লিঙ্গ" : "Gender"} *
                        </Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={language === "bn" ? "লিঙ্গ নির্বাচন করুন" : "Select gender"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="female">{language === "bn" ? "মহিলা" : "Female"}</SelectItem>
                            <SelectItem value="male">{language === "bn" ? "পুরুষ" : "Male"}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="classApplying" className={language === "bn" ? "font-bengali" : ""}>
                          {language === "bn" ? "যে শ্রেণিতে ভর্তি হতে চান" : "Class Applying For"} *
                        </Label>
                        <Select
                          value={formData.classApplying}
                          onValueChange={(value) => handleInputChange("classApplying", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={language === "bn" ? "শ্রেণি নির্বাচন করুন" : "Select class"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">{language === "bn" ? "ষষ্ঠ শ্রেণি" : "Class VI"}</SelectItem>
                            <SelectItem value="7">{language === "bn" ? "সপ্তম শ্রেণি" : "Class VII"}</SelectItem>
                            <SelectItem value="8">{language === "bn" ? "অষ্টম শ্রেণি" : "Class VIII"}</SelectItem>
                            <SelectItem value="9">{language === "bn" ? "নবম শ্রেণি" : "Class IX"}</SelectItem>
                            <SelectItem value="10">{language === "bn" ? "দশম শ্রেণি" : "Class X"}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Guardian Information */}
                  <div>
                    <h3
                      className={`text-lg font-semibold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {language === "bn" ? "অভিভাবকের তথ্য" : "Guardian Information"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guardianName" className={language === "bn" ? "font-bengali" : ""}>
                          {language === "bn" ? "অভিভাবকের নাম" : "Guardian Name"} *
                        </Label>
                        <Input
                          id="guardianName"
                          value={formData.guardianName}
                          onChange={(e) => handleInputChange("guardianName", e.target.value)}
                          placeholder={language === "bn" ? "অভিভাবকের নাম" : "Guardian's name"}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guardianPhone" className={language === "bn" ? "font-bengali" : ""}>
                          {language === "bn" ? "ফোন নম্বর" : "Phone Number"} *
                        </Label>
                        <Input
                          id="guardianPhone"
                          value={formData.guardianPhone}
                          onChange={(e) => handleInputChange("guardianPhone", e.target.value)}
                          placeholder={language === "bn" ? "ফোন নম্বর" : "Phone number"}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="guardianEmail" className={language === "bn" ? "font-bengali" : ""}>
                          {language === "bn" ? "ইমেইল" : "Email"}
                        </Label>
                        <Input
                          id="guardianEmail"
                          type="email"
                          value={formData.guardianEmail}
                          onChange={(e) => handleInputChange("guardianEmail", e.target.value)}
                          placeholder={language === "bn" ? "ইমেইল ঠিকানা" : "Email address"}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className={language === "bn" ? "font-bengali" : ""}>
                      {language === "bn" ? "ঠিকানা" : "Address"} *
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder={language === "bn" ? "সম্পূর্ণ ঠিকানা লিখুন" : "Enter complete address"}
                      rows={3}
                      required
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label className={language === "bn" ? "font-bengali" : ""}>
                      {language === "bn" ? "ডকুমেন্ট আপলোড" : "Document Upload"}
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "প্রয়োজনীয় ডকুমেন্ট আপলোড করুন" : "Upload required documents"}
                      </p>
                      <Button variant="outline" className="mt-2 bg-transparent">
                        {language === "bn" ? "ফাইল নির্বাচন করুন" : "Choose Files"}
                      </Button>
                    </div>
                  </div>

                  {/* Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox id="agreement" checked={agreed} onCheckedChange={setAgreed} />
                    <Label htmlFor="agreement" className={`text-sm ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn"
                        ? "আমি স্কুলের নিয়মকানুন ও শর্তাবলী মেনে চলতে সম্মত।"
                        : "I agree to abide by the school rules and regulations."}
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" disabled={!agreed || loading} className="w-full">
                    {loading
                      ? language === "bn"
                        ? "জমা দিচ্ছি..."
                        : "Submitting..."
                      : language === "bn"
                        ? "আবেদন জমা দিন"
                        : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
