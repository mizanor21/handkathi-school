"use client"

import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const { language } = useLanguage()

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn" ? "যোগাযোগ করুন" : "Contact Us"}
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === "bn" ? "font-bengali" : ""}`}>
            {language === "bn"
              ? "আমাদের সাথে যোগাযোগ করুন। আমরা আপনার সেবায় নিয়োজিত।"
              : "Get in touch with us. We are here to serve you."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "যোগাযোগের তথ্য" : "Contact Information"}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className={`font-semibold text-gray-800 mb-1 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "ঠিকানা" : "Address"}
                      </h3>
                      <p className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn"
                          ? "চাঁদকাঠি আদর্শ বালিকা মাধ্যমিক বিদ্যালয়\nচাঁদকাঠি, বাংলাদেশ"
                          : "Chandkathi Adarsha Girls' Secondary School\nChandkathi, Bangladesh"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className={`font-semibold text-gray-800 mb-1 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "ফোন" : "Phone"}
                      </h3>
                      <p className="text-gray-600">+880-XXX-XXXXXX</p>
                      <p className="text-gray-600">+880-XXX-XXXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className={`font-semibold text-gray-800 mb-1 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "ইমেইল" : "Email"}
                      </h3>
                      <p className="text-gray-600">info@chandkathi-school.edu.bd</p>
                      <p className="text-gray-600">principal@chandkathi-school.edu.bd</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className={`font-semibold text-gray-800 mb-1 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "অফিস সময়" : "Office Hours"}
                      </h3>
                      <p className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn"
                          ? "রবিবার - বৃহস্পতিবার: সকাল ৮টা - বিকাল ৪টা"
                          : "Sunday - Thursday: 8:00 AM - 4:00 PM"}
                      </p>
                      <p className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                        {language === "bn" ? "শুক্রবার: বন্ধ" : "Friday: Closed"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-6">
                <h3 className={`text-xl font-bold text-gray-800 mb-4 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "আমাদের অবস্থান" : "Our Location"}
                </h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className={`text-gray-600 ${language === "bn" ? "font-bengali" : ""}`}>
                    {language === "bn" ? "মানচিত্র লোড হচ্ছে..." : "Map Loading..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "আমাদের লিখুন" : "Send us a Message"}
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium text-gray-700 mb-2 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {language === "bn" ? "নাম" : "Name"}
                    </label>
                    <Input placeholder={language === "bn" ? "আপনার নাম" : "Your Name"} />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium text-gray-700 mb-2 ${language === "bn" ? "font-bengali" : ""}`}
                    >
                      {language === "bn" ? "ইমেইল" : "Email"}
                    </label>
                    <Input type="email" placeholder={language === "bn" ? "আপনার ইমেইল" : "Your Email"} />
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium text-gray-700 mb-2 ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {language === "bn" ? "ফোন নম্বর" : "Phone Number"}
                  </label>
                  <Input placeholder={language === "bn" ? "আপনার ফোন নম্বর" : "Your Phone Number"} />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium text-gray-700 mb-2 ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {language === "bn" ? "বিষয়" : "Subject"}
                  </label>
                  <Input placeholder={language === "bn" ? "বার্তার বিষয়" : "Message Subject"} />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium text-gray-700 mb-2 ${language === "bn" ? "font-bengali" : ""}`}
                  >
                    {language === "bn" ? "বার্তা" : "Message"}
                  </label>
                  <Textarea rows={6} placeholder={language === "bn" ? "আপনার বার্তা লিখুন..." : "Write your message..."} />
                </div>
                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  {language === "bn" ? "বার্তা পাঠান" : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
