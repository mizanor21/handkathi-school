"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Filter, GraduationCap } from "lucide-react"
import type { Teacher } from "@/lib/models/teacher"

export default function TeachersPage() {
  const { language } = useLanguage()
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalTeachers, setTotalTeachers] = useState(0)

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
  ]

  useEffect(() => {
    fetchTeachers()
  }, [currentPage, searchTerm, subjectFilter])

  const fetchTeachers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(subjectFilter && { subject: subjectFilter }),
      })

      const response = await fetch(`/api/teachers?${params}`)
      const data = await response.json()

      if (response.ok) {
        setTeachers(data.teachers)
        setTotalPages(data.pagination.pages)
        setTotalTeachers(data.pagination.total)
      } else {
        console.error("Error fetching teachers:", data.error)
      }
    } catch (error) {
      console.error("Error fetching teachers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleSubjectFilter = (value: string) => {
    setSubjectFilter(value === "all" ? "" : value)
    setCurrentPage(1)
  }

  const handleDeleteTeacher = async (teacherId: string) => {
    if (!confirm(language === "bn" ? "আপনি কি নিশ্চিত?" : "Are you sure?")) return

    try {
      const response = await fetch(`/api/teachers/${teacherId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchTeachers()
      } else {
        alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete teacher")
      }
    } catch (error) {
      console.error("Error deleting teacher:", error)
      alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete teacher")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1
            className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
          >
            {language === "bn" ? "শিক্ষক ব্যবস্থাপনা" : "Teacher Management"}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? `মোট ${totalTeachers} জন শিক্ষক` : `Total ${totalTeachers} teachers`}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/teachers/new">
            <Plus className="h-4 w-4 mr-2" />
            {language === "bn" ? "নতুন শিক্ষক" : "Add Teacher"}
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${language === "bn" ? "font-bengali" : ""}`}>
            <Filter className="h-5 w-5" />
            {language === "bn" ? "ফিল্টার ও অনুসন্ধান" : "Filter & Search"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={
                    language === "bn" ? "নাম, আইডি বা পদবী দিয়ে খুঁজুন..." : "Search by name, ID, or designation..."
                  }
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={subjectFilter || "all"} onValueChange={handleSubjectFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={language === "bn" ? "বিষয় নির্বাচন" : "Select Subject"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "bn" ? "সব বিষয়" : "All Subjects"}</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : teachers.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className={`text-gray-500 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "কোন শিক্ষক পাওয়া যায়নি" : "No teachers found"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "আইডি" : "ID"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "নাম" : "Name"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "পদবী" : "Designation"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "বিষয়সমূহ" : "Subjects"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "অভিজ্ঞতা" : "Experience"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "ফোন" : "Phone"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "স্ট্যাটাস" : "Status"}
                  </TableHead>
                  <TableHead className="text-right">{language === "bn" ? "কার্যক্রম" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher._id?.toString()}>
                    <TableCell className="font-medium">{teacher.teacherId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className={`text-sm text-gray-500 ${language === "bn" ? "font-bengali" : ""}`}>
                          {teacher.nameInBengali}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{teacher.designation}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.slice(0, 2).map((subject) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {teacher.subjects.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{teacher.subjects.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {teacher.experience} {language === "bn" ? "বছর" : "years"}
                    </TableCell>
                    <TableCell>{teacher.phoneNumber}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          teacher.status === "active"
                            ? "default"
                            : teacher.status === "inactive"
                              ? "secondary"
                              : "outline"
                        }
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
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/teachers/${teacher._id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              {language === "bn" ? "দেখুন" : "View"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/teachers/${teacher._id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              {language === "bn" ? "সম্পাদনা" : "Edit"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteTeacher(teacher._id?.toString() || "")}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {language === "bn" ? "ডিলিট" : "Delete"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className={`text-sm text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? `পৃষ্ঠা ${currentPage} এর ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              {language === "bn" ? "পূর্ববর্তী" : "Previous"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              {language === "bn" ? "পরবর্তী" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
