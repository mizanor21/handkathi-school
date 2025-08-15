"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Filter, Bell, Calendar, Users } from "lucide-react"
import type { Notice } from "@/lib/models/notice"

export default function NoticesPage() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalNotices, setTotalNotices] = useState(0)

  const categories = ["general", "academic", "exam", "event", "admission", "urgent"]
  const priorities = ["low", "medium", "high"]

  useEffect(() => {
    fetchNotices()
  }, [currentPage, searchTerm, categoryFilter, priorityFilter])

  const fetchNotices = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
      })

      const response = await fetch(`/api/notices?${params}`)
      const data = await response.json()

      if (response.ok) {
        setNotices(data.notices)
        setTotalPages(data.pagination.pages)
        setTotalNotices(data.pagination.total)
      } else {
        console.error("Error fetching notices:", data.error)
      }
    } catch (error) {
      console.error("Error fetching notices:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value === "all" ? "" : value)
    setCurrentPage(1)
  }

  const handlePriorityFilter = (value: string) => {
    setPriorityFilter(value === "all" ? "" : value)
    setCurrentPage(1)
  }

  const handleDeleteNotice = async (noticeId: string) => {
    if (!confirm(language === "bn" ? "আপনি কি নিশ্চিত?" : "Are you sure?")) return

    try {
      const response = await fetch(`/api/notices/${noticeId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchNotices()
      } else {
        alert(language === "bn" ? "ডিলিট করতে ব্যর্থ" : "Failed to delete notice")
      }
    } catch (error) {
      console.error("Error deleting notice:", error)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1
            className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
          >
            {language === "bn" ? "নোটিশ ব্যবস্থাপনা" : "Notice Management"}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? `মোট ${totalNotices} টি নোটিশ` : `Total ${totalNotices} notices`}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/notices/new">
            <Plus className="h-4 w-4 mr-2" />
            {language === "bn" ? "নতুন নোটিশ" : "Add Notice"}
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
                  placeholder={language === "bn" ? "শিরোনাম বা বিষয়বস্তু দিয়ে খুঁজুন..." : "Search by title or content..."}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter || "all"} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={language === "bn" ? "ক্যাটেগরি নির্বাচন" : "Select Category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "bn" ? "সব ক্যাটেগরি" : "All Categories"}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {getCategoryLabel(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter || "all"} onValueChange={handlePriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={language === "bn" ? "অগ্রাধিকার নির্বাচন" : "Select Priority"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "bn" ? "সব অগ্রাধিকার" : "All Priorities"}</SelectItem>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {getPriorityLabel(priority)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notices Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className={`text-gray-500 dark:text-gray-400 ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "কোন নোটিশ পাওয়া যায়নি" : "No notices found"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "শিরোনাম" : "Title"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "ক্যাটেগরি" : "Category"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "অগ্রাধিকার" : "Priority"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "লক্ষ্য দর্শক" : "Target"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "প্রকাশের তারিখ" : "Publish Date"}
                  </TableHead>
                  <TableHead className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "লেখক" : "Author"}
                  </TableHead>
                  <TableHead className="text-right">{language === "bn" ? "কার্যক্রম" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notices.map((notice) => (
                  <TableRow key={notice._id?.toString()}>
                    <TableCell>
                      <div>
                        <p className="font-medium line-clamp-2">{notice.title}</p>
                        <p className={`text-sm text-gray-500 line-clamp-1 ${language === "bn" ? "font-bengali" : ""}`}>
                          {notice.titleInBengali}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{getCategoryLabel(notice.category)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          notice.priority === "high"
                            ? "destructive"
                            : notice.priority === "medium"
                              ? "default"
                              : "outline"
                        }
                      >
                        {getPriorityLabel(notice.priority)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span className="text-sm">{getTargetAudienceLabel(notice.targetAudience)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">{new Date(notice.publishDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{notice.authorName}</p>
                      </div>
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
                            <Link href={`/admin/notices/${notice._id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              {language === "bn" ? "দেখুন" : "View"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/notices/${notice._id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              {language === "bn" ? "সম্পাদনা" : "Edit"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteNotice(notice._id?.toString() || "")}
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
