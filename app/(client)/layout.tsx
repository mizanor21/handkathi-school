import type React from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { ContentProvider } from "@/contexts/content-context"
import { MainLayout } from "@/components/main-layout"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <ContentProvider>
        <MainLayout>{children}</MainLayout>
      </ContentProvider>
    </LanguageProvider>
  )
}
