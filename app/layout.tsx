import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import ChatButton from "@/components/chat-button"
import { ContactProvider } from "@/components/contact-context"
import { Space_Mono } from "next/font/google"
import BackgroundAnimation from "@/components/background-animation"
import { ChatbotProvider } from "@/components/chatbotContext"
import ChatbotDrawer from "@/components/chatbotDrawer"

// Initialize the Space Mono font
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "Tarek Ashraf",
  description: "Personal portfolio website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className={`bg-[#e6e6e6] text-[#191919] font-mono overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ChatbotProvider>
            <ContactProvider>
              <BackgroundAnimation />
              <div className="fixed inset-0 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <div className="border border-[#191919] w-full h-full flex relative">
                  <Sidebar />
                  <main className="flex-1 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-auto p-6">{children}</div>
                  </main>
                </div>
              </div>
              <ChatButton />
              <ChatbotDrawer />
              </ContactProvider>
          </ChatbotProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
