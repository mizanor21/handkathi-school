"use client"

import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, GraduationCap } from "lucide-react"

export default function TeachersPage() {
  const { language } = useLanguage()

  const teachers = [
    {
      name: language === "bn" ? "সরোজিনী মন্ডল" : "Sarojini Mondal",
      position: language === "bn" ? "প্রধান শিক্ষক" : "Headmaster",
      subject: language === "bn" ? "ইংরেজী" : "English",
      qualification: language === "bn" ? "বি.এড" : "B.Ed",
      experience: language === "bn" ? "৩৩ বছর" : "33 Years",
      email: "sarojinimondal253@gmail.com",
      phone: "+8801740198534",
    },
    {
      name: language === "bn" ? "মিন্টু লাল সূতার" : "Mintu Lal Sutar",
      position: language === "bn" ? "সহকারী প্রধান শিক্ষক" : "Assistant Headmaster",
      subject: language === "bn" ? "গণিত" : "Mathematics",
      qualification: language === "bn" ? "বি.এড" : "B.Ed",
      experience: language === "bn" ? "৩৩ বছর" : "33 Years",
      email: "mintusuter5@gmil.com",
      phone: "+8801725562852",
    },
    {
      name: language === "bn" ? "সাধন চন্দ্র মন্ডল" : "Sadhon Chandra Mondal",
      position: language === "bn" ? "সিনিয়র সহকারী শিক্ষক" : "Senior Assistant Teacher",
      subject: language === "bn" ? "ব্যবসায় শিক্ষা" : "Business Studies",
      qualification: language === "bn" ? "বি.এড" : "B.Ed",
      experience: language === "bn" ? "৩৮ বছর" : "38 Years",
      email: "mondalsadhanchandra1967@gmail.com",
      phone: "+8801727457149",
    },
    {
      name: language === "bn" ? "ওয়াজিউল্লাহ্" : "Waziullah",
      position: language === "bn" ? "সিনিয়র সহকারী শিক্ষক" : "Senior Assistant Teacher",
      subject: language === "bn" ? "ইসলাম শিক্ষা" : "Islamic Studies",
      qualification: language === "bn" ? "কামিল" : "Kamil",
      experience: language === "bn" ? "৩৫ বছর" : "35 Years",
      email: "mwaziullah@gmail.com",
      phone: "+8801728290007",
    },
    {
      name: language === "bn" ? "সুস্মরণী মজুমদার" : "Susmaroni Majumdar",
      position: language === "bn" ? "সিনিয়র সহকারী শিক্ষক" : "Senior Assistant Teacher",
      subject: language === "bn" ? "হিন্দু ধর্ম" : "Hindu Religion",
      qualification: language === "bn" ? "বি.এড" : "B.Ed",
      experience: language === "bn" ? "২৪ বছর" : "24 Years",
      email: "susmaranimazumder@gmail.com",
      phone: "+8801970272212",
    },
    {
      name: language === "bn" ? "চিন্ময় রায়" : "Chinmoy Roy",
      position: language === "bn" ? "সিনিয়র সহকারী শিক্ষক" : "Senior Assistant Teacher",
      subject: language === "bn" ? "কৃষি শিক্ষা" : "Agricultural Education",
      qualification: language === "bn" ? "বি.এড, কৃষি ডিপ্লোমা" : "B.Ed, Agricultural Diploma",
      experience: language === "bn" ? "২৩ বছর" : "23 Years",
      email: "chinmoyroy492@gmail.com",
      phone: "+8801718607057",
    },
    {
      name: language === "bn" ? "সবিতা হালদার" : "Sabita Haldar",
      position: language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher",
      subject: language === "bn" ? "বাংলা" : "Bengali",
      qualification: language === "bn" ? "বি.এড" : "B.Ed",
      experience: language === "bn" ? "৩৭ বছর" : "37 Years",
      email: "sabitaha50@gmail.com",
      phone: "+8801729593913",
    },
    {
      name: language === "bn" ? "তাকলিমা খানাম" : "Taklima Khanam",
      position: language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher",
      subject: language === "bn" ? "কম্পিউটার" : "Computer",
      qualification: language === "bn" ? "বি.এড, কম্পিউটার ডিপ্লোমা" : "B.Ed, Computer Diploma",
      experience: language === "bn" ? "১৫ বছর" : "15 Years",
      email: "taklimakhanam@gmail.com",
      phone: "+8801711224653",
    },
    {
      name: language === "bn" ? "মোভাস্ শিরীন" : "Movas Shirin",
      position: language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher",
      subject: language === "bn" ? "শারীরিক শিক্ষা" : "Physical Education",
      qualification: language === "bn" ? "বিপিএড" : "BPEd",
      experience: language === "bn" ? "১৫ বছর" : "15 Years",
      email: "movasshirin47@gmail.com",
      phone: "+8801776180489",
    },
    {
      name: language === "bn" ? "বিদু ভূষন সরকার" : "Bidu Bhushan Sarkar",
      position: language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher",
      subject: language === "bn" ? "গণিত ও সাধারণ বিজ্ঞান" : "Mathematics & General Science",
      qualification: language === "bn" ? "বি.এড, পরিসংখ্যান" : "B.Ed, Statistics",
      experience: language === "bn" ? "৯ বছর" : "9 Years",
      email: "bidhubsn7@gmail.com",
      phone: "+8801733558853",
    },
    {
      name: language === "bn" ? "ফায়জুল ইসলাম" : "Fayzul Islam",
      position: language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher",
      subject: language === "bn" ? "ভৌত বিজ্ঞান" : "Physical Science",
      qualification: language === "bn" ? "বি.এড, রসায়ন" : "B.Ed, Chemistry",
      experience: language === "bn" ? "৬ বছর" : "6 Years",
      email: "fyzulislam1993@gmail.com",
      phone: "+8801924174668",
    },
    {
      name: language === "bn" ? "রেখা রানী বিশ্বাস" : "Rekha Rani Biswas",
      position: language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher",
      subject: language === "bn" ? "গ্রন্থাগার ও তথ্য বিজ্ঞান" : "Library & Information Science",
      qualification: language === "bn" ? "গ্রন্থাগার ও তথ্য বিজ্ঞান" : "Library & Information Science",
      experience: language === "bn" ? "১২ বছর" : "12 Years",
      email: "rekharanibiswas613@gmail.com",
      phone: "+8801967533167",
    },
  ]

  const supportStaff = [
    {
      name: language === "bn" ? "অমৃত মালী" : "Amrita Mali",
      position: language === "bn" ? "নৈশপ্রহরী" : "Night Guard",
      experience: language === "bn" ? "৬ বছর" : "6 Years",
      email: "amritamali61@gmail.com",
      phone: "+8801960729752",
    },
    {
      name: language === "bn" ? "তৃপ্তি মালী" : "Tripti Mali",
      position: language === "bn" ? "আয়া" : "Cleaner",
      experience: language === "bn" ? "৬ বছর" : "6 Years",
      email: "triptimalimali755@gmail.com",
      phone: "+8801948175238",
    },
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "আমাদের শিক্ষকমণ্ডলী" : "Our Teaching Staff"}
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn"
              ? "অভিজ্ঞ ও দক্ষ শিক্ষকমণ্ডলী যারা শিক্ষার্থীদের সর্বোচ্চ বিকাশে প্রতিশ্রুতিবদ্ধ।"
              : "Experienced and skilled teaching staff committed to the maximum development of students."}
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="mb-16">
          <h2
            className={`text-3xl font-bold text-gray-800 mb-8 text-center ${language === "bn" ? "font-bengali" : ""}`}
          >
            {language === "bn" ? "শিক্ষকমণ্ডলী" : "Teaching Staff"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className={`text-xl font-bold text-gray-800 mb-2 ${language === "bn" ? "font-bengali" : ""}`}>
                      {teacher.name}
                    </h3>
                    <Badge variant="secondary" className={`mb-2 ${language === "bn" ? "font-bengali" : ""}`}>
                      {teacher.position}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "বিষয়:" : "Subject:"}
                      </span>
                      <span className={`font-medium ${language === "bn" ? "font-bengali" : ""}`}>
                        {teacher.subject}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "যোগ্যতা:" : "Qualification:"}
                      </span>
                      <span className={`font-medium ${language === "bn" ? "font-bengali" : ""}`}>
                        {teacher.qualification}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "অভিজ্ঞতা:" : "Experience:"}
                      </span>
                      <span className={`font-medium ${language === "bn" ? "font-bengali" : ""}`}>
                        {teacher.experience}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="break-all">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Staff */}
        <div>
          <h2
            className={`text-3xl font-bold text-gray-800 mb-8 text-center ${language === "bn" ? "font-bengali" : ""}`}
          >
            {language === "bn" ? "সহায়ক কর্মচারী" : "Support Staff"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {supportStaff.map((staff, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-12 w-12 text-blue-600" />
                    </div>
                    <h3 className={`text-xl font-bold text-gray-800 mb-2 ${language === "bn" ? "font-bengali" : ""}`}>
                      {staff.name}
                    </h3>
                    <Badge variant="outline" className={`mb-2 ${language === "bn" ? "font-bengali" : ""}`}>
                      {staff.position}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "অভিজ্ঞতা:" : "Experience:"}
                      </span>
                      <span className={`font-medium ${language === "bn" ? "font-bengali" : ""}`}>
                        {staff.experience}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="break-all">{staff.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{staff.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
