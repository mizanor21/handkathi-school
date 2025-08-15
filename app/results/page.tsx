"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Award } from "lucide-react"

interface Result {
  roll: string
  name: string
  class: string
  year: string
  exam: string
  gpa: string
  grade: string
  subjects: { name: string; marks: string; grade: string }[]
}

export default function ResultsPage() {
  const { language } = useLanguage()
  const [searchRoll, setSearchRoll] = useState("")
  const [searchYear, setSearchYear] = useState("")
  const [searchExam, setSearchExam] = useState("")
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Demo results data
  const demoResults: Result[] = [
    {
      roll: "101",
      name: language === "bn" ? "ফাতেমা খাতুন" : "Fatema Khatun",
      class: language === "bn" ? "দশম শ্রেণি" : "Class X",
      year: "2024",
      exam: language === "bn" ? "এসএসসি" : "SSC",
      gpa: "4.75",
      grade: "A+",
      subjects: [
        { name: language === "bn" ? "বাংলা" : "Bengali", marks: "85", grade: "A+" },
        { name: language === "bn" ? "ইংরেজি" : "English", marks: "82", grade: "A+" },
        { name: language === "bn" ? "গণিত" : "Mathematics", marks: "88", grade: "A+" },
        { name: language === "bn" ? "বিজ্ঞান" : "Science", marks: "90", grade: "A+" },
        { name: language === "bn" ? "সামাজিক বিজ্ঞান" : "Social Science", marks: "87", grade: "A+" },
      ],
    },
    {
      roll: "102",
      name: language === "bn" ? "রাশিদা আক্তার" : "Rashida Akter",
      class: language === "bn" ? "নবম শ্রেণি" : "Class IX",
      year: "2024",
      exam: language === "bn" ? "বার্ষিক পরীক্ষা" : "Annual Exam",
      gpa: "4.50",
      grade: "A+",
      subjects: [
        { name: language === "bn" ? "বাংলা" : "Bengali", marks: "80", grade: "A+" },
        { name: language === "bn" ? "ইংরেজি" : "English", marks: "78", grade: "A" },
        { name: language === "bn" ? "গণিত" : "Mathematics", marks: "85", grade: "A+" },
        { name: language === "bn" ? "বিজ্ঞান" : "Science", marks: "82", grade: "A+" },
        { name: language === "bn" ? "সামাজিক বিজ্ঞান" : "Social Science", marks: "84", grade: "A+" },
      ],
    },
  ]

  const handleSearch = () => {
    setLoading(true)
    setError("")
    setResult(null)

    // Simulate API call
    setTimeout(() => {
      const foundResult = demoResults.find(
        (r) => r.roll === searchRoll && r.year === searchYear && (searchExam === "" || r.exam.includes(searchExam)),
      )

      if (foundResult) {
        setResult(foundResult)
      } else {
        setError(language === "bn" ? "কোন ফলাফল পাওয়া যায়নি" : "No results found")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "পরীক্ষার ফলাফল" : "Exam Results"}
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn"
              ? "রোল নম্বর ও বছর দিয়ে আপনার পরীক্ষার ফলাফল খুঁজুন।"
              : "Search your exam results by roll number and year."}
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
              <Search className="h-5 w-5" />
              {language === "bn" ? "ফলাফল খুঁজুন" : "Search Results"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="roll" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "রোল নম্বর" : "Roll Number"}
                </Label>
                <Input
                  id="roll"
                  value={searchRoll}
                  onChange={(e) => setSearchRoll(e.target.value)}
                  placeholder={language === "bn" ? "রোল নম্বর" : "Roll Number"}
                />
              </div>
              <div>
                <Label htmlFor="year" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "বছর" : "Year"}
                </Label>
                <Select value={searchYear} onValueChange={setSearchYear}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "bn" ? "বছর নির্বাচন করুন" : "Select Year"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="exam" className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "পরীক্ষা" : "Exam"}
                </Label>
                <Select value={searchExam} onValueChange={setSearchExam}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "bn" ? "পরীক্ষা নির্বাচন করুন" : "Select Exam"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === "bn" ? "সব পরীক্ষা" : "All Exams"}</SelectItem>
                    <SelectItem value="ssc">{language === "bn" ? "এসএসসি" : "SSC"}</SelectItem>
                    <SelectItem value="annual">{language === "bn" ? "বার্ষিক পরীক্ষা" : "Annual Exam"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSearch} disabled={!searchRoll || !searchYear || loading} className="w-full">
              {loading
                ? language === "bn"
                  ? "খুঁজছি..."
                  : "Searching..."
                : language === "bn"
                  ? "ফলাফল খুঁজুন"
                  : "Search Results"}
            </Button>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto mb-8">
            <AlertDescription className={language === "bn" ? "font-bengali" : ""}>{error}</AlertDescription>
          </Alert>
        )}

        {/* Result Display */}
        {result && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
                  <Award className="h-5 w-5" />
                  {language === "bn" ? "পরীক্ষার ফলাফল" : "Exam Result"}
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {language === "bn" ? "ডাউনলোড" : "Download"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Student Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn" ? "নাম:" : "Name:"}
                    </span>
                    <span className={`font-medium ${language === "bn" ? "font-bengali" : ""}`}>{result.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn" ? "রোল:" : "Roll:"}
                    </span>
                    <span className="font-medium">{result.roll}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn" ? "শ্রেণি:" : "Class:"}
                    </span>
                    <span className={`font-medium ${language === "bn" ? "font-bengali" : ""}`}>{result.class}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn" ? "পরীক্ষা:" : "Exam:"}
                    </span>
                    <span className={`font-medium ${language === "bn" ? "font-bengali" : ""}`}>{result.exam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn" ? "বছর:" : "Year:"}
                    </span>
                    <span className="font-medium">{result.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn" ? "জিপিএ:" : "GPA:"}
                    </span>
                    <Badge variant="secondary" className="text-lg font-bold">
                      {result.gpa} ({result.grade})
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Subject-wise Results */}
              <div>
                <h3 className={`text-xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "বিষয়ভিত্তিক ফলাফল" : "Subject-wise Results"}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th
                          className={`border border-gray-300 px-4 py-2 text-left ${language === "bn" ? "font-bengali" : ""}`}
                        >
                          {language === "bn" ? "বিষয়" : "Subject"}
                        </th>
                        <th
                          className={`border border-gray-300 px-4 py-2 text-center ${language === "bn" ? "font-bengali" : ""}`}
                        >
                          {language === "bn" ? "নম্বর" : "Marks"}
                        </th>
                        <th
                          className={`border border-gray-300 px-4 py-2 text-center ${language === "bn" ? "font-bengali" : ""}`}
                        >
                          {language === "bn" ? "গ্রেড" : "Grade"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td className={`border border-gray-300 px-4 py-2 ${language === "bn" ? "font-bengali" : ""}`}>
                            {subject.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">{subject.marks}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <Badge variant={subject.grade === "A+" ? "default" : "secondary"}>{subject.grade}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Demo Info */}
        <div className="max-w-2xl mx-auto mt-8">
          <Card>
            <CardContent className="p-4">
              <p className={`text-sm text-gray-600 mb-2 ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "ডেমো ডেটা:" : "Demo Data:"}
              </p>
              <div className="space-y-1 text-xs">
                <div>Roll: 101, Year: 2024 - Fatema Khatun (SSC)</div>
                <div>Roll: 102, Year: 2024 - Rashida Akter (Annual)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
