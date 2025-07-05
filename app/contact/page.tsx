"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Phone, ExternalLink} from "lucide-react"
import ContactButton from "@/components/contact-button"
import { useContactContext } from "@/components/contact-context"
import Link from "next/link"
import { cn } from "@/lib/utils"

function ContactText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { hoveredColor } = useContactContext()

  return (
    <span
      className={`transition-colors duration-700 ${className}`}
      style={{
        color: hoveredColor ? "#e6e6e6" : "#191919",
      }}
    >
      {children}
    </span>
  )
}

export default function Contact() {
  const { hoveredColor, mousePosition } = useContactContext()

  const contactLinks = [
    {
      icon: <Mail className="h-6 w-6" />,
      text: "Email",
      href: "mailto:tarek.ashraf.7669@gmail.com",
      color: "#FF6B6B",
      id: "email",
      noBorderBottom: hoveredColor ? false : true,
      noBorderRight: hoveredColor ? false : true,
    },
    {
      icon: <Phone className="h-6 w-6" />,
      text: "Phone",
      href: "tel:+201019061752",
      color: "#4ECDC4",
      id: "phone",
      noBorderBottom: hoveredColor ? false : true,
      noBorderRight: hoveredColor ? false : true,
    },
    {
      icon: <Github className="h-6 w-6" />,
      text: "GitHub",
      href: "https://github.com/tarek7669",
      color: "#191919",
      id: "github",
      noBorderBottom: hoveredColor ? false : true,
      noBorderRight: hoveredColor ? false : true,
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/tarek-ashraf-393632193/",
      color: "#0077B5",
      id: "linkedin",
      noBorderBottom: hoveredColor ? false : true,
      noBorderRight: hoveredColor ? false : true,
    },
    {
      icon: <ExternalLink className="h-6 w-6" />,
      text: "Upwork",
      href: "https://www.upwork.com/freelancers/~01fb261c427b929c5c",
      color: "#6FDA44",
      id: "upwork",
      noBorderBottom: hoveredColor ? false : true,
      noBorderRight: hoveredColor ? false : true,
    },
  ]

   // Split the links for the L shape
   const horizontalLinks = contactLinks.slice(0, 4) // First 3 for horizontal
   const verticalLinks = contactLinks.slice(4) // Last 2 for vertical
 
   // Button dimensions - now bigger squares
   const buttonSize = 80
 
   return (
     <div className="absolute inset-0 flex flex-col">
       <h1 className="text-3xl mb-4 p-6 contact-text">Contact</h1>
      <p className="text-xl mb-1 pl-6">
        Feel free to reach out to me through any of the channels below.
      </p>
      <p className="text-xl mb-8 pl-6">
      I would love to hear from you!
      </p>
 
       {/* L-shaped contact buttons container */}
       <div className="absolute bottom-0 right-0 z-20">
         {/* Vertical buttons (right side) */}
         <div className="absolute right-0" style={{ borderBottom: "none !important", borderRight: "none" }}> 
           {verticalLinks.map((link, index) => (
             <div
               key={link.id}
               style={{
                 position: "absolute",
                 bottom: `${(index + 1) * 8}rem`, //same as the height of the button (contact-button.tsx)
                 right: 0,
                //  width: `${buttonSize}px`,
                //  height: `${buttonSize}px`,
               }}
             >
               <ContactButton {...link} />
             </div>
           ))}
         </div>
 
         {/* Horizontal buttons (bottom) */}
         <div className="absolute bottom-0 right-0">
           {horizontalLinks.map((link, index) => (
             <div
               key={link.id}
               style={{
                 position: "absolute",
                 bottom: 0,
                 right: `${index * 8}rem`, //same as the width of the button (contact-button.tsx)
                //  width: `${buttonSize}px`,
                //  height: `${buttonSize}px`,
               }}
             >
               <ContactButton {...link} />
             </div>
           ))}
         </div>
       </div>
     </div>
   )
}
