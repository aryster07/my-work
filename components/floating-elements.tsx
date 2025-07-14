"use client"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{ id: number; x: number; y: number; size: number; color: string; speed: number }>
  >([])

  useEffect(() => {
    // Create random floating elements
    const shapes = []
    const colors = ["#FF6B6B33", "#4ECDC433", "#FFE66D33", "#FC518533"]

    for (let i = 0; i < 15; i++) {
      shapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 80 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.1,
      })
    }

    setElements(shapes)

    // Animate the elements
    let animationFrameId: number
    let lastTime = 0

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time
      const deltaTime = time - lastTime
      lastTime = time

      setElements((prevElements) =>
        prevElements.map((element) => ({
          ...element,
          y: (element.y - element.speed * (deltaTime / 100)) % 100,
        })),
      )

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: element.color,
            opacity: 0.6,
            transform: `rotate(${element.id * 30}deg)`,
          }}
        />
      ))}
    </div>
  )
}
