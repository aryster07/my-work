"use client"

import { useEffect, useState } from "react"

export function SpeedLines() {
  const [lines, setLines] = useState<Array<{ id: number; x: number; width: number; height: number; speed: number }>>([])

  useEffect(() => {
    // Create random speed lines
    const speedLines = []

    for (let i = 0; i < 20; i++) {
      speedLines.push({
        id: i,
        x: Math.random() * 100,
        width: Math.random() * 1 + 0.5,
        height: Math.random() * 150 + 50,
        speed: Math.random() * 2 + 1,
      })
    }

    setLines(speedLines)

    // Animate the lines
    let animationFrameId: number
    let lastTime = 0

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time
      const deltaTime = time - lastTime
      lastTime = time

      setLines((prevLines) =>
        prevLines.map((line) => ({
          ...line,
          x: (line.x + line.speed * (deltaTime / 100)) % 100,
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute bg-white/10"
          style={{
            left: `${line.x}%`,
            top: 0,
            width: `${line.width}px`,
            height: `${line.height}px`,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  )
}
