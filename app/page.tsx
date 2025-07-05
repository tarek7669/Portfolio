"use client"

import { useEffect, useState, useRef } from "react"

export default function Home() {
  const phrases = [
    "TAKE OVER THE WORLD!",
    "BUILD STUFF THAT MAKES SENSE!!",
    "THE FUTURE!",
    "BUILD AWESOME THINGS!",
    "BUILD MIND-BLOWING AI!"
  ]

  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(100)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current)

    const currentPhrase = phrases[phraseIndex]

    // Handle typing and deleting
    if (!isDeleting) {
      // Typing forward
      if (currentText.length < currentPhrase.length) {
        // Continue typing
        timerRef.current = setTimeout(() => {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1))
          setTypingSpeed(80 + Math.random() * 40) // Slight variation in typing speed
        }, typingSpeed)
      } else {
        // Finished typing, pause before deleting
        timerRef.current = setTimeout(() => {
          setIsDeleting(true)
          setTypingSpeed(50) // Faster when deleting
        }, 2000)
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        // Continue deleting
        timerRef.current = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1))
        }, typingSpeed)
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false)
        setPhraseIndex((phraseIndex + 1) % phrases.length)
        setTypingSpeed(100)
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentText, isDeleting, phraseIndex, phrases, typingSpeed])

  return (
    <div className="h-full w-full flex items-end justify-end relative">
      <div className="mb-6 mr-8 text-left">
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight justify-start">
          <span>On a mission to </span>
          <span className="relative font-bold">
            {currentText}
            <span className="absolute -right-[2px] top-0 h-full w-[1px] bg-[#191919] animate-blink"></span>
          </span>
        </h1>
      </div>
    </div>
  )
}
