"use client"

import { useContactContext } from "./contact-context"
import { useEffect, useState } from "react"

export default function BackgroundEffect() {
  const { hoveredColor, hoverPosition, isHovered } = useContactContext()
  const [scale, setScale] = useState(0)

  useEffect(() => {
    if (isHovered) {
      // Start small
      setScale(0)

      // Then quickly expand
      const timer = setTimeout(() => {
        setScale(200)
      }, 50)

      return () => clearTimeout(timer)
    } else {
      setScale(0)
    }
  }, [isHovered])

  if (!isHovered) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        background: `radial-gradient(circle at ${hoverPosition?.x}px ${hoverPosition?.y}px, ${hoveredColor} ${scale}%, transparent ${scale}%)`,
        transition: "background 2s ease-out",
      }}
    />
  )
}
