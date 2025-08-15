"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react"

interface Event {
  id: string
  title: { en: string; bn: string }
  description: { en: string; bn: string }
  date: string
  time: string
  location: { en: string; bn: string }
  category: { en: string; bn: string }
  attendees?: number
  status: "upcoming" | "ongoing" | "completed"
}

export default function EventsPage() {
  const { language } = useLanguage()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const events: Event[] = [
    {
      id: "1",
      title: {
        en: "Annual Sports Competition",
        bn: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
      },
      description: {
        en: "Inter-class sports competition featuring various athletic events",
        bn: "বিভিন্ন ক্রীড়া ইভেন্ট সহ আন্তঃশ্রেণি ক্রীড়া প্রতিযোগিতা",
      },
      date: "2025-02-10",
      time: "09:00 AM",
      location: { en: "School Playground", bn: "স্কুল খেলার মাঠ" },
      category: { en: "Sports", bn: "ক্রীড়া" },
      attendees: 500,
      status: "upcoming",
    },
    {
      id: "2",
      title: {
        en: "Science Fair 2025",
        bn: "বিজ্ঞান মেলা ২০২৫",
      },
      description: {
        en: "Students showcase their innovative science projects and experiments",
        bn: "শিক্ষার্থীরা তাদের উদ্ভাবনী বিজ্ঞান প্রকল্প ও পরীক্ষা প্রদর্শন করবে",
      },
      date: "2025-02-15",
      time: "10:00 AM",
      location: { en: "School Auditorium", bn: "স্কুল অডিটোরিয়াম" },
      category: { en: "Academic", bn: "একাডেমিক" },
      attendees: 300,
      status: "upcoming",
    },
    {
      id: "3",
      title: {
        en: "Cultural Program",
        bn: "সাংস্কৃতিক অনুষ্ঠান",
      },
      description: {
        en: "Traditional dance, music, and drama performances by students",
        bn: "শিক্ষার্থীদের ঐতিহ্যবাহী নৃত্য, সঙ্গীত ও নাটক পরিবেশনা",
      },
      date: "2025-02-21",
      time: "06:00 PM",
      location: { en: "School Auditorium", bn: "স্কুল অডিটোরিয়াম" },
      category: { en: "Cultural", bn: "সাংস্কৃতিক" },
      attendees: 400,
      status: "upcoming",
    },
    {
      id: "4",
      title: {
        en: "Parent-Teacher Meeting",
        bn: "অভিভাবক-শিক্ষক সভা",
      },
      description: {
        en: "Discussion about student progress and academic performance",
        bn: "শিক্ষার্থীদের অগ্রগতি ও একাডেমিক পারফরমেন্স নিয়ে আলোচনা",
      },
      date: "2025-02-25",
      time: "10:00 AM",
      location: { en: "Classrooms", bn: "শ্রেণিকক্ষ" },
      category: { en: "Meeting", bn: "সভা" },
      attendees: 200,
      status: "upcoming",
    },
    {
      id: "5",
      title: {
        en: "Admission Test",
        bn: "ভর্তি পরীক্ষা",
      },
      description: {
        en: "Entrance examination for new students seeking admission",
        bn: "ভর্তি প্রার্থী নতুন শিক্ষার্থীদের জন্য প্রবেশিকা পরীক্ষা",
      },
      date: "2025-03-05",
      time: "09:00 AM",
      location: { en: "Examination Hall", bn: "পরীক্ষা হল" },
      category: { en: "Admission", bn: "ভর্তি" },
      attendees: 150,
      status: "upcoming",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "sports":
      case "ক্রীড়া":
        return "bg-blue-100 text-blue-800"
      case "academic":
      case "একাডেমিক":
        return "bg-green-100 text-green-800"
      case "cultural":
      case "সাংস্কৃতিক":
        return "bg-purple-100 text-purple-800"
      case "meeting":
      case "সভা":
        return "bg-orange-100 text-orange-800"
      case "admission":
      case "ভর্তি":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const upcomingEvents = events.filter((event) => event.status === "upcoming").slice(0, 3)

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "একাডেমিক ক্যালেন্ডার" : "Academic Calendar"}
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn"
              ? "আসন্ন একাডেমিক ও সাংস্কৃতিক অনুষ্ঠানের তালিকা দেখুন।"
              : "View upcoming academic and cultural events."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Widget */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${language === "bn" ? "font-bengali" : ""}`}>
                    {currentMonth.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-center text-gray-600">
                  <Calendar className="h-16 w-16 mx-auto mb-4" />
                  <p className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "ইন্টারঅ্যাক্টিভ ক্যালেন্ডার" : "Interactive Calendar"}
                  </p>
                  <p className={`text-sm mt-2 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "শীঘ্রই আসছে" : "Coming Soon"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "এই মাসের পরিসংখ্যান" : "This Month's Stats"}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn" ? "মোট ইভেন্ট:" : "Total Events:"}
                    </span>
                    <span className="font-semibold">{events.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn" ? "আসন্ন:" : "Upcoming:"}
                    </span>
                    <span className="font-semibold">{events.filter((e) => e.status === "upcoming").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                      {language === "bn" ? "মোট অংশগ্রহণকারী:" : "Total Attendees:"}
                    </span>
                    <span className="font-semibold">
                      {events.reduce((sum, event) => sum + (event.attendees || 0), 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={getCategoryColor(event.category[language])}>
                            {event.category[language]}
                          </Badge>
                          <Badge variant="outline">{event.status}</Badge>
                        </div>
                        <h3
                          className={`text-xl font-bold text-gray-800 mb-2 ${language === "bn" ? "font-bengali" : ""}`}
                        >
                          {event.title[language]}
                        </h3>
                        <p className={`text-gray-600 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
                          {event.description[language]}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-600" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span className={language === "bn" ? "font-bengali" : ""}>{event.location[language]}</span>
                          </div>
                        </div>
                        {event.attendees && (
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span className={language === "bn" ? "font-bengali" : ""}>
                              {language === "bn" ? `${event.attendees} জন অংশগ্রহণকারী` : `${event.attendees} attendees`}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          {language === "bn" ? "বিস্তারিত" : "View Details"}
                        </Button>
                        {event.status === "upcoming" && (
                          <Button size="sm">{language === "bn" ? "রেজিস্টার করুন" : "Register"}</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
