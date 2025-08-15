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
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Filter } from "lucide-react"
import type { Student } from "@/lib/models/student"

export default function StudentsPage() {
  const { language } = useLanguage()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalStudents, setTotalStudents] = useState(0)

  const classes = ["6", "7", "8", "9", "10"]

  useEffect(() => {
    fetchStudents()
  }, [currentPage, searchTerm, classFilter])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(classFilter && { class: classFilter }),
      })

      const response = await fetch(`/api/students?${params}`)
      const data = await response.json()

      if (response.ok) {
        setStudents(data.students)
        setTotalPages(data.pagination.pages)
        setTotalStudents(data.pagination.total)
      } else {
        console.error("Error fetching students:", data.error)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleClassFilter = (value: string) => {
    setClassFilter(value === "all" ? "" : value)
    setCurrentPage(1)
  }

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm(language === "bn" ? "আপনি কি নিশ্চিত?" : "Are you sure?")) return

    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchStudents()
      } else {
        alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete student")
      }
    } catch (error) {
      console.error("Error deleting student:", error)
      alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete student")
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
            {language === "bn" ? "শিক্ষার্থী ব্যবস্থাপনা" : "Student Management"}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? `মোট ${totalStudents} জন শিক্ষার্থী` : `Total ${totalStudents} students`}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/students/new">
            <Plus className="h-4 w-4 mr-2" />
            {language === "bn" ? "নতুন শিক্ষার্থী" : "Add Student"}
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
                    language === "bn" ? "নাম, আইডি বা রোল নম্বর দিয়ে খুঁজুন..." : "Search by name, ID, or roll number..."
                  }
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={classFilter || "all"} onValueChange={handleClassFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={language === "bn" ? "শ্রেণী নির্বাচন" : "Select Class"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "bn" ? "সব শ্রেণী" : "All Classes"}</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {language === "bn" ? `${cls} শ্রেণী` : `Class ${cls}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-gray-500 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "কোন শিক্ষার্থী পাওয়া যায়নি" : "No students found"}
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
                    {language === "bn" ? "শ্রেণী" : "Class"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "রোল" : "Roll"}
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
                {students.map((student) => (
                  <TableRow key={student._id?.toString()}>
                    <TableCell className="font-medium">{student.studentId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className={`text-sm text-gray-500 ${language === "bn" ? "font-bengali" : ""}`}>
                          {student.nameInBengali}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {language === "bn" ? `${student.class} শ্রেণী` : `Class ${student.class}`}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.phoneNumber}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === "active"
                            ? "default"
                            : student.status === "inactive"
                              ? "secondary"
                              : "outline"
                        }
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
                            <Link href={`/admin/students/${student._id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              {language === "bn" ? "দেখুন" : "View"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/students/${student._id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              {language === "bn" ? "সম্পাদনা" : "Edit"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteStudent(student._id?.toString() || "")}
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
