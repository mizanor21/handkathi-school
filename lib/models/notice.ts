import type { ObjectId } from "mongodb"

export interface Notice {
  _id?: ObjectId
  title: string
  titleInBengali: string
  content: string
  contentInBengali: string
  category: "general" | "academic" | "exam" | "event" | "admission" | "urgent"
  priority: "low" | "medium" | "high"
  publishDate: Date
  expiryDate?: Date
  targetAudience: "all" | "students" | "teachers" | "parents"
  attachments?: string[]
  isPublished: boolean
  authorId: string
  authorName: string
  createdAt: Date
  updatedAt: Date
}

export interface NoticeCreateInput {
  title: string
  titleInBengali: string
  content: string
  contentInBengali: string
  category: "general" | "academic" | "exam" | "event" | "admission" | "urgent"
  priority: "low" | "medium" | "high"
  publishDate: string
  expiryDate?: string
  targetAudience: "all" | "students" | "teachers" | "parents"
  attachments?: string[]
}
