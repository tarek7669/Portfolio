"use client"

import { useEffect, useRef } from "react"

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient circles
    const circles: Circle[] = []
    for (let i = 0; i < 7; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 100 + Math.random() * 200,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        hue: Math.floor(Math.random() * 360),
      })
    }

    // Animation function
    const animate = () => {
      // Create a semi-transparent background to create trail effect
      ctx.fillStyle = "rgba(230, 230, 230, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update each circle
      circles.forEach((circle) => {
        // Create gradient
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius)
        gradient.addColorStop(0, `hsla(${circle.hue}, 50%, 50%, 0.01)`)
        gradient.addColorStop(1, `hsla(${circle.hue}, 50%, 50%, 0)`)

        // Draw circle
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Update position
        circle.x += circle.dx
        circle.y += circle.dy
        circle.hue = (circle.hue + 0.1) % 360

        // Bounce off edges
        if (circle.x < -circle.radius) circle.x = canvas.width + circle.radius
        if (circle.x > canvas.width + circle.radius) circle.x = -circle.radius
        if (circle.y < -circle.radius) circle.y = canvas.height + circle.radius
        if (circle.y > canvas.height + circle.radius) circle.y = -circle.radius
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ pointerEvents: "none" }} />
}

// Circle type
interface Circle {
  x: number
  y: number
  radius: number
  dx: number
  dy: number
  hue: number
}
