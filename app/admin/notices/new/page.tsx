"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Loader2, Bell } from "lucide-react"
import Link from "next/link"
import type { NoticeCreateInput } from "@/lib/models/notice"

export default function NewNoticePage() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState<NoticeCreateInput>({
    title: "",
    titleInBengali: "",
    content: "",
    contentInBengali: "",
    category: "general",
    priority: "medium",
    publishDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    targetAudience: "all",
    attachments: [],
  })

  const [hasExpiryDate, setHasExpiryDate] = useState(false)

  const categories = [
    { value: "general", label: language === "bn" ? "সাধারণ" : "General" },
    { value: "academic", label: language === "bn" ? "একাডেমিক" : "Academic" },
    { value: "exam", label: language === "bn" ? "পরীক্ষা" : "Exam" },
    { value: "event", label: language === "bn" ? "অনুষ্ঠান" : "Event" },
    { value: "admission", label: language === "bn" ? "ভর্তি" : "Admission" },
    { value: "urgent", label: language === "bn" ? "জরুরি" : "Urgent" },
  ]

  const priorities = [
    { value: "low", label: language === "bn" ? "কম" : "Low" },
    { value: "medium", label: language === "bn" ? "মাঝারি" : "Medium" },
    { value: "high", label: language === "bn" ? "উচ্চ" : "High" },
  ]

  const targetAudiences = [
    { value: "all", label: language === "bn" ? "সবার জন্য" : "All" },
    { value: "students", label: language === "bn" ? "শিক্ষার্থী" : "Students" },
    { value: "teachers", label: language === "bn" ? "শিক্ষক" : "Teachers" },
    { value: "parents", label: language === "bn" ? "অভিভাবক" : "Parents" },
  ]

  const handleInputChange = (field: keyof NoticeCreateInput, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const submitData = {
        ...formData,
        expiryDate: hasExpiryDate ? formData.expiryDate : undefined,
        authorId: user?.id || "",
        authorName: user?.name || "",
      }

      const response = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/admin/notices")
      } else {
        setError(data.error || "Failed to create notice")
      }
    } catch (err) {
      setError("Failed to create notice")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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
            {language === "bn" ? "নতুন নোটিশ যোগ করুন" : "Add New Notice"}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "নতুন নোটিশের তথ্য পূরণ করুন" : "Fill in the notice information"}
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
            <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
              <Bell className="h-5 w-5" />
              {language === "bn" ? "মৌলিক তথ্য" : "Basic Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "শিরোনাম (ইংরেজি)" : "Title (English)"} *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Important Notice"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleInBengali" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "শিরোনাম (বাংলা)" : "Title (Bengali)"} *
                </Label>
                <Input
                  id="titleInBengali"
                  value={formData.titleInBengali}
                  onChange={(e) => handleInputChange("titleInBengali", e.target.value)}
                  placeholder="গুরুত্বপূর্ণ নোটিশ"
                  className="font-bengali"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "ক্যাটেগরি" : "Category"} *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === "bn" ? "নির্বাচন করুন" : "Select"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "অগ্রাধিকার" : "Priority"} *
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange("priority", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === "bn" ? "নির্বাচন করুন" : "Select"} />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "লক্ষ্য দর্শক" : "Target Audience"} *
                </Label>
                <Select
                  value={formData.targetAudience}
                  onValueChange={(value) => handleInputChange("targetAudience", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === "bn" ? "নির্বাচন করুন" : "Select"} />
                  </SelectTrigger>
                  <SelectContent>
                    {targetAudiences.map((audience) => (
                      <SelectItem key={audience.value} value={audience.value}>
                        {audience.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishDate" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "প্রকাশের তারিখ" : "Publish Date"} *
                </Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange("publishDate", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Expiry Date Toggle */}
            <div className="flex items-center space-x-2">
              <Switch id="hasExpiryDate" checked={hasExpiryDate} onCheckedChange={setHasExpiryDate} />
              <Label htmlFor="hasExpiryDate" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "মেয়াদ উত্তীর্ণের তারিখ সেট করুন" : "Set expiry date"}
              </Label>
            </div>

            {hasExpiryDate && (
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "মেয়াদ উত্তীর্ণের তারিখ" : "Expiry Date"}
                </Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  min={formData.publishDate}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "বিষয়বস্তু" : "Content"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="content" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "বিষয়বস্তু (ইংরেজি)" : "Content (English)"} *
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Enter the notice content in English..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentInBengali" className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "বিষয়বস্তু (বাংলা)" : "Content (Bengali)"} *
              </Label>
              <Textarea
                id="contentInBengali"
                value={formData.contentInBengali}
                onChange={(e) => handleInputChange("contentInBengali", e.target.value)}
                placeholder="বাংলায় নোটিশের বিষয়বস্তু লিখুন..."
                className="font-bengali"
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === "bn" ? "প্রকাশ করা হচ্ছে..." : "Publishing..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {language === "bn" ? "নোটিশ প্রকাশ করুন" : "Publish Notice"}
              </>
            )}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/notices">{language === "bn" ? "বাতিল" : "Cancel"}</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
