"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!localStorage.getItem("theme")) {
      setTheme("light")
    }
  }, [setTheme])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9 bg-transparent">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const handleThemeChange = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  const getIcon = () => {
    return resolvedTheme === "dark" ? (
      <Sun className="h-4 w-4 text-yellow-500 hover:text-yellow-400 transition-colors" />
    ) : (
      <Moon className="h-4 w-4 text-gray-600 hover:text-green-600 transition-colors" />
    )
  }

  const getTooltip = () => {
    return resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeChange}
      className="w-9 h-9 hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/20 dark:hover:border-green-700 transition-all duration-200 hover:scale-105 bg-transparent"
      title={getTooltip()}
    >
      {getIcon()}
      <span className="sr-only">{getTooltip()}</span>
    </Button>
  )
}
