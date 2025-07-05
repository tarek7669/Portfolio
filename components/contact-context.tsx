"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

type ContactContextType = {
  hoveredColor: string | null
  setHoveredColor: (color: string | null) => void
  mousePosition: { x: number; y: number } | null
  setMousePosition: (position: { x: number; y: number } | null) => void
}

const ContactContext = createContext<ContactContextType>({
  hoveredColor: null,
  setHoveredColor: () => {},
  mousePosition: null,
  setMousePosition: () => {},
})

export const useContactContext = () => useContext(ContactContext)

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)

  return (
    <ContactContext.Provider value={{ hoveredColor, setHoveredColor, mousePosition, setMousePosition }}>
      {children}
    </ContactContext.Provider>
  )
}
