"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage, isHydrated } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "bn" : "en")}
      className="flex text-black items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {isHydrated ? (language === "en" ? "বাংলা" : "English") : "Language"}
    </Button>
  )
}
