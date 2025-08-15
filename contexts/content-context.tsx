"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Notice {
  id: string
  title: { en: string; bn: string }
  description: { en: string; bn: string }
  date: string
  category: { en: string; bn: string }
  priority: "high" | "medium" | "low"
  createdAt: string
}

interface News {
  id: string
  title: { en: string; bn: string }
  content: { en: string; bn: string }
  date: string
  category: { en: string; bn: string }
  featured: boolean
  createdAt: string
}

interface Teacher {
  id: string
  name: { en: string; bn: string }
  position: { en: string; bn: string }
  subject: { en: string; bn: string }
  qualification: { en: string; bn: string }
  experience: { en: string; bn: string }
  email: string
  phone: string
  image?: string
}

interface ContentData {
  notices: Notice[]
  news: News[]
  teachers: Teacher[]
  schoolInfo: {
    principalMessage: { en: string; bn: string }
    history: { en: string; bn: string }
    vision: { en: string; bn: string }
    mission: { en: string; bn: string }
  }
}

interface ContentContextType {
  content: ContentData
  addNotice: (notice: Omit<Notice, "id" | "createdAt">) => void
  updateNotice: (id: string, notice: Partial<Notice>) => void
  deleteNotice: (id: string) => void
  addNews: (news: Omit<News, "id" | "createdAt">) => void
  updateNews: (id: string, news: Partial<News>) => void
  deleteNews: (id: string) => void
  addTeacher: (teacher: Omit<Teacher, "id">) => void
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void
  deleteTeacher: (id: string) => void
  updateSchoolInfo: (info: Partial<ContentData["schoolInfo"]>) => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

const defaultContent: ContentData = {
  notices: [
    {
      id: "1",
      title: {
        en: "Admission Open for 2025 Academic Year",
        bn: "২০২৫ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি",
      },
      description: {
        en: "Application for admission to classes 6-9 has started. Last date: January 31, 2025.",
        bn: "৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তির জন্য আবেদন শুরু। শেষ তারিখ: ৩১ জানুয়ারি ২০২৫।",
      },
      date: "২০২৫-০১-১৫",
      category: { en: "Admission", bn: "ভর্তি" },
      priority: "high",
      createdAt: "2025-01-15T00:00:00Z",
    },
    {
      id: "2",
      title: {
        en: "Annual Sports Competition 2025",
        bn: "বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৫",
      },
      description: {
        en: "Annual sports competition will be held on February 10, 2025.",
        bn: "আগামী ১০ ফেব্রুয়ারি ২০২৫ বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে।",
      },
      date: "২০২৫-০১-১০",
      category: { en: "Event", bn: "অনুষ্ঠান" },
      priority: "medium",
      createdAt: "2025-01-10T00:00:00Z",
    },
  ],
  news: [
    {
      id: "1",
      title: {
        en: "School Achieves Excellence Award",
        bn: "বিদ্যালয় শ্রেষ্ঠত্বের পুরস্কার অর্জন",
      },
      content: {
        en: "Our school has been awarded the Excellence in Education award by the Ministry of Education.",
        bn: "আমাদের বিদ্যালয় শিক্ষা মন্ত্রণালয় কর্তৃক শিক্ষায় শ্রেষ্ঠত্বের পুরস্কার অর্জন করেছে।",
      },
      date: "২০২৫-০১-০৫",
      category: { en: "Achievement", bn: "অর্জন" },
      featured: true,
      createdAt: "2025-01-05T00:00:00Z",
    },
  ],
  teachers: [
    {
      id: "1",
      name: { en: "Mrs. Rashida Khatun", bn: "মোসাম্মৎ রাশিদা খাতুন" },
      position: { en: "Principal", bn: "প্রধান শিক্ষক" },
      subject: { en: "Bengali", bn: "বাংলা" },
      qualification: { en: "M.A (Bengali)", bn: "এম.এ (বাংলা)" },
      experience: { en: "25 Years", bn: "২৫ বছর" },
      email: "principal@chandkathi-school.edu.bd",
      phone: "+880-XXX-XXXXXX",
    },
  ],
  schoolInfo: {
    principalMessage: {
      en: "Dear students and parents, welcome to Chandkathi Adarsha Girls' Secondary School. Our institution is committed not only to education but also to character building.",
      bn: "প্রিয় শিক্ষার্থী ও অভিভাবকগণ, চাঁদকাঠি আদর্শ বালিকা মাধ্যমিক বিদ্যালয়ে আপনাদের স্বাগতম। আমাদের প্রতিষ্ঠান শুধু শিক্ষাদানেই নয়, চরিত্র গঠনেও প্রতিশ্রুতিবদ্ধ।",
    },
    history: {
      en: "Since 1998, Chandkathi Adarsha Girls' Secondary School has been playing a pioneering role in education.",
      bn: "১৯৯৮ সাল থেকে শিক্ষার ক্ষেত্রে অগ্রগামী ভূমিকা পালন করে আসছে চাঁদকাঠি আদর্শ বালিকা মাধ্যমিক বিদ্যালয়।",
    },
    vision: {
      en: "To be an ideal educational institution that helps every student achieve their maximum potential.",
      bn: "একটি আদর্শ শিক্ষা প্রতিষ্ঠান হিসেবে প্রতিটি শিক্ষার্থীর সর্বোচ্চ বিকাশ সাধন।",
    },
    mission: {
      en: "To provide quality education, build moral values, and prepare students for their future.",
      bn: "গুণগত শিক্ষা প্রদান, নৈতিক মূল্যবোধ গঠন এবং শিক্ষার্থীদের ভবিষ্যতের জন্য প্রস্তুত করা।",
    },
  },
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent)

  useEffect(() => {
    const savedContent = localStorage.getItem("school-content")
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent))
      } catch (error) {
        console.error("Error loading saved content:", error)
      }
    }
  }, [])

  const saveContent = (newContent: ContentData) => {
    setContent(newContent)
    localStorage.setItem("school-content", JSON.stringify(newContent))
  }

  const addNotice = (notice: Omit<Notice, "id" | "createdAt">) => {
    const newNotice: Notice = {
      ...notice,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const newContent = {
      ...content,
      notices: [newNotice, ...content.notices],
    }
    saveContent(newContent)
  }

  const updateNotice = (id: string, updatedNotice: Partial<Notice>) => {
    const newContent = {
      ...content,
      notices: content.notices.map((notice) => (notice.id === id ? { ...notice, ...updatedNotice } : notice)),
    }
    saveContent(newContent)
  }

  const deleteNotice = (id: string) => {
    const newContent = {
      ...content,
      notices: content.notices.filter((notice) => notice.id !== id),
    }
    saveContent(newContent)
  }

  const addNews = (news: Omit<News, "id" | "createdAt">) => {
    const newNews: News = {
      ...news,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const newContent = {
      ...content,
      news: [newNews, ...content.news],
    }
    saveContent(newContent)
  }

  const updateNews = (id: string, updatedNews: Partial<News>) => {
    const newContent = {
      ...content,
      news: content.news.map((news) => (news.id === id ? { ...news, ...updatedNews } : news)),
    }
    saveContent(newContent)
  }

  const deleteNews = (id: string) => {
    const newContent = {
      ...content,
      news: content.news.filter((news) => news.id !== id),
    }
    saveContent(newContent)
  }

  const addTeacher = (teacher: Omit<Teacher, "id">) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: Date.now().toString(),
    }
    const newContent = {
      ...content,
      teachers: [...content.teachers, newTeacher],
    }
    saveContent(newContent)
  }

  const updateTeacher = (id: string, updatedTeacher: Partial<Teacher>) => {
    const newContent = {
      ...content,
      teachers: content.teachers.map((teacher) => (teacher.id === id ? { ...teacher, ...updatedTeacher } : teacher)),
    }
    saveContent(newContent)
  }

  const deleteTeacher = (id: string) => {
    const newContent = {
      ...content,
      teachers: content.teachers.filter((teacher) => teacher.id !== id),
    }
    saveContent(newContent)
  }

  const updateSchoolInfo = (info: Partial<ContentData["schoolInfo"]>) => {
    const newContent = {
      ...content,
      schoolInfo: { ...content.schoolInfo, ...info },
    }
    saveContent(newContent)
  }

  return (
    <ContentContext.Provider
      value={{
        content,
        addNotice,
        updateNotice,
        deleteNotice,
        addNews,
        updateNews,
        deleteNews,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        updateSchoolInfo,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider")
  }
  return context
}
