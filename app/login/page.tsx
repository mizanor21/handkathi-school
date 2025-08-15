"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const { language } = useLanguage()
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    router.push("/admin")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/admin")
      } else {
        setError(language === "bn" ? "ভুল ইমেইল বা পাসওয়ার্ড" : "Invalid email or password")
      }
    } catch (err) {
      setError(language === "bn" ? "লগইন করতে সমস্যা হয়েছে" : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              <CardTitle className={`text-2xl ${language === "bn" ? "font-bengali" : ""}`}>
                {language === "bn" ? "অ্যাডমিন লগইন" : "Admin Login"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "ইমেইল" : "Email"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === "bn" ? "আপনার ইমেইল" : "Your email"}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className={language === "bn" ? "font-bengali" : ""}>
                    {language === "bn" ? "পাসওয়ার্ড" : "Password"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={language === "bn" ? "আপনার পাসওয়ার্ড" : "Your password"}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription className={language === "bn" ? "font-bengali" : ""}>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? language === "bn"
                      ? "লগইন হচ্ছে..."
                      : "Logging in..."
                    : language === "bn"
                      ? "লগইন"
                      : "Login"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className={`text-sm text-gray-600 mb-2 ${language === "bn" ? "font-bengali" : ""}`}>
                  {language === "bn" ? "ডেমো অ্যাকাউন্ট:" : "Demo Accounts:"}
                </p>
                <div className="space-y-2 text-xs">
                  <div>
                    <strong>Admin:</strong> admin@chandkathi-school.edu.bd / admin123
                  </div>
                  <div>
                    <strong>Teacher:</strong> teacher@chandkathi-school.edu.bd / teacher123
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
