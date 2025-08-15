"use client"

import type React from "react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface StaggeredContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggeredContainer({ children, className, staggerDelay = 100 }: StaggeredContainerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      {Array.isArray(children) &&
        children.map((child, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-700 ease-out",
              !isIntersecting && "translate-y-8 opacity-0",
              isIntersecting && "translate-y-0 opacity-100",
            )}
            style={{
              transitionDelay: isIntersecting ? `${index * staggerDelay}ms` : "0ms",
            }}
          >
            {child}
          </div>
        ))}
      {!Array.isArray(children) && children}
    </div>
  )
}
