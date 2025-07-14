"use client"

import { useEffect, useRef } from "react"

interface ScrollingTextProps {
  text: string
}

export function ScrollingText({ text }: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollText = () => {
      if (containerRef.current) {
        const scrollContainer = containerRef.current
        const scrollWidth = scrollContainer.scrollWidth
        const clientWidth = scrollContainer.clientWidth

        if (scrollWidth > clientWidth) {
          if (scrollContainer.scrollLeft >= scrollWidth - clientWidth) {
            scrollContainer.scrollLeft = 0
          } else {
            scrollContainer.scrollLeft += 1
          }
        }
      }
    }

    const interval = setInterval(scrollText, 20)
    return () => clearInterval(interval)
  }, [])

  // Repeat the text to ensure continuous scrolling
  const repeatedText = text.repeat(10)

  return (
    <div className="py-6 bg-[#F5F0E8] overflow-hidden">
      <div ref={containerRef} className="whitespace-nowrap overflow-hidden">
        <div className="text-4xl md:text-6xl font-bold text-[#2C3E50]/10">{repeatedText}</div>
      </div>
    </div>
  )
}
