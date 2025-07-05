"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useContactContext } from "./contact-context"

interface ContactButtonProps {
  icon: React.ReactNode
  text: string
  href: string
  color: string
  noBorderBottom: boolean
  noBorderRight: boolean
}

export default function ContactButton({
  icon,
  text,
  href,
  color,
  noBorderBottom,
  noBorderRight,
}: ContactButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const { setHoveredColor } = useContactContext()
  const [circleSize, setCircleSize] = useState(0)

  useEffect(() => {
    const diagonal = Math.sqrt(
      window.innerWidth ** 2 + window.innerHeight ** 2
    )
    setCircleSize(diagonal * 2) // ×2 to be extra safe
  }, [])

  // Update global color and origin position on hover
  useEffect(() => {
    if (isHovered && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })

      const timer = setTimeout(() => {
        setHoveredColor(color)
      }, 200)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setHoveredColor(null)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isHovered, color, setHoveredColor])

  return (
    <div className="relative z-10">
      {/* ✅ Expanding background circle */}
      <div
        className="fixed rounded-full pointer-events-none z-0 transition-all duration-[1200ms] ease-in-out"
        style={{
          backgroundColor: color,
          top: `${origin.y}px`,
          left: `${origin.x}px`,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          transform: isHovered
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0)",
          opacity: isHovered ? 0.9 : 0,
        }}
      />

      {/* Contact button */}
      <Link
        ref={buttonRef}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="relative z-10 flex flex-col items-center p-10 border transition-all duration-500 group"
        style={{
          backgroundColor: isHovered ? color : "transparent",
          borderColor: isHovered ? color : "#191919",
          width: "8rem",
          height: "8rem",
          borderBottomWidth: noBorderBottom ? 0 : 1,
          borderRightWidth: noBorderRight ? 0 : 1,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="mb-1 transition-colors duration-500"
          style={{ color: isHovered ? "#e6e6e6" : color }}
        >
          {icon}
        </div>
        <div
          className="text-sm transition-colors duration-500"
          style={{ color: isHovered ? "#e6e6e6" : "#191919" }}
        >
          {text}
        </div>
      </Link>
    </div>
  )
}
