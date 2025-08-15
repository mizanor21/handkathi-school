"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { Users, GraduationCap, Bell, Edit, Trash2, Plus } from "lucide-react"

interface Activity {
  id: string
  type: "student" | "teacher" | "notice"
  action: "created" | "updated" | "deleted"
  title: string
  timestamp: Date
  user: string
}

export default function RecentActivities() {
  const { language } = useLanguage()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Mock recent activities - in real app, fetch from API
    const mockActivities: Activity[] = [
      {
        id: "1",
        type: "student",
        action: "created",
        title: language === "bn" ? "নতুন শিক্ষার্থী রাহিমা খাতুন যোগ হয়েছে" : "New student Rahima Khatun added",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        user: "Admin",
      },
      {
        id: "2",
        type: "notice",
        action: "created",
        title: language === "bn" ? "পরীক্ষার সময়সূচী প্রকাশিত" : "Exam schedule published",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        user: "Admin",
      },
      {
        id: "3",
        type: "teacher",
        action: "updated",
        title: language === "bn" ? "শিক্ষক প্রোফাইল আপডেট করা হয়েছে" : "Teacher profile updated",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        user: "Admin",
      },
    ]
    setActivities(mockActivities)
  }, [language])

  const getIcon = (type: string, action: string) => {
    if (action === "created") return <Plus className="h-4 w-4 text-white" />
    if (action === "updated") return <Edit className="h-4 w-4 text-white" />
    if (action === "deleted") return <Trash2 className="h-4 w-4 text-white" />

    switch (type) {
      case "student":
        return <Users className="h-4 w-4 text-white" />
      case "teacher":
        return <GraduationCap className="h-4 w-4 text-white" />
      case "notice":
        return <Bell className="h-4 w-4 text-white" />
      default:
        return <Plus className="h-4 w-4 text-white" />
    }
  }

  const getColor = (type: string, action: string) => {
    if (action === "created") return "bg-green-500"
    if (action === "updated") return "bg-blue-500"
    if (action === "deleted") return "bg-red-500"

    switch (type) {
      case "student":
        return "bg-blue-500"
      case "teacher":
        return "bg-green-500"
      case "notice":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60))
      return language === "bn" ? `${minutes} মিনিট আগে` : `${minutes} minutes ago`
    }

    return language === "bn" ? `${hours} ঘন্টা আগে` : `${hours} hours ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center justify-between ${language === "bn" ? "font-bengali" : ""}`}>
          {language === "bn" ? "সাম্প্রতিক কার্যক্রম" : "Recent Activities"}
          <Badge variant="secondary">{language === "bn" ? "আজ" : "Today"}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div
                className={`w-8 h-8 ${getColor(activity.type, activity.action)} rounded-full flex items-center justify-center`}
              >
                {getIcon(activity.type, activity.action)}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium text-gray-800 dark:text-gray-100 ${language === "bn" ? "font-bengali" : ""}`}
                >
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
