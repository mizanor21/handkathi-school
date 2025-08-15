"use client"

import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Award, BookOpen } from "lucide-react"

export default function HistoryPage() {
  const { language } = useLanguage()

  const milestones = [
    {
      year: "1998",
      title: language === "bn" ? "প্রতিষ্ঠান স্থাপনা" : "School Establishment",
      description:
        language === "bn"
          ? "চাঁদকাঠি আদর্শ বালিকা মাধ্যমিক বিদ্যালয় প্রতিষ্ঠিত হয়।"
          : "Chandkathi Adarsha Girls' Secondary School was established.",
    },
    {
      year: "2005",
      title: language === "bn" ? "এমপিও ভুক্তি" : "MPO Inclusion",
      description: language === "bn" ? "বিদ্যালয়টি সরকারি এমপিও ভুক্ত হয়।" : "The school received government MPO status.",
    },
    {
      year: "2010",
      title: language === "bn" ? "নতুন ভবন নির্মাণ" : "New Building Construction",
      description:
        language === "bn"
          ? "আধুনিক সুবিধা সহ নতুন ভবন নির্মাণ সম্পন্ন।"
          : "Construction of new building with modern facilities completed.",
    },
    {
      year: "2020",
      title: language === "bn" ? "ডিজিটাল ক্লাসরুম" : "Digital Classroom",
      description:
        language === "bn"
          ? "সকল শ্রেণিকক্ষে ডিজিটাল শিক্ষা ব্যবস্থা চালু।"
          : "Digital education system introduced in all classrooms.",
    },
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "প্রতিষ্ঠানের ইতিহাস" : "School History"}
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn"
              ? "১৯৯৮ সাল থেকে শিক্ষার ক্ষেত্রে অগ্রগামী ভূমিকা পালন করে আসছে চাঁদকাঠি আদর্শ বালিকা মাধ্যমিক বিদ্যালয়।"
              : "Since 1998, Chandkathi Adarsha Girls' Secondary School has been playing a pioneering role in education."}
          </p>
        </div>

        {/* School Image */}
        <div className="mb-12">
          <img
            src="/placeholder.svg?height=400&width=800"
            alt="School Building"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2
            className={`text-3xl font-bold text-gray-800 mb-8 text-center ${language === "bn" ? "font-bengali" : ""}`}
          >
            {language === "bn" ? "গুরুত্বপূর্ণ মাইলফলক" : "Important Milestones"}
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg min-w-[80px] text-center">
                      {milestone.year}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-semibold text-gray-800 mb-2 ${language === "bn" ? "font-bengali" : ""}`}
                      >
                        {milestone.title}
                      </h3>
                      <p className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-8 w-8 text-green-600" />
                <h3 className={`text-2xl font-bold text-gray-800 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "আমাদের লক্ষ্য" : "Our Vision"}
                </h3>
              </div>
              <p className={`text-gray-600 leading-relaxed ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn"
                  ? "একটি আদর্শ শিক্ষা প্রতিষ্ঠান হিসেবে প্রতিটি শিক্ষার্থীর সর্বোচ্চ বিকাশ সাধন এবং তাদের চরিত্র গঠনে সহায়তা করা।"
                  : "To be an ideal educational institution that helps every student achieve their maximum potential and assists in character building."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
                <h3 className={`text-2xl font-bold text-gray-800 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "আমাদের উদ্দেশ্য" : "Our Mission"}
                </h3>
              </div>
              <p className={`text-gray-600 leading-relaxed ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn"
                  ? "গুণগত শিক্ষা প্রদান, নৈতিক মূল্যবোধ গঠন এবং শিক্ষার্থীদের ভবিষ্যতের জন্য প্রস্তুত করা।"
                  : "To provide quality education, build moral values, and prepare students for their future."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
