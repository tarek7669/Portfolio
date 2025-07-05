"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useContactContext } from "./contact-context"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Certifications", path: "/certifications" },
  { name: "Contact", path: "/contact" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { hoveredColor } = useContactContext()

  return (
    <div className="w-72 border-r border-[#191919] h-full flex flex-col">
      <div className="p-6 flex flex-col h-full">
        <div>
          <h1
            className="text-2xl font-normal tracking-tight transition-colors duration-1000"
            style={{
              color: hoveredColor ? "#e6e6e6" : "#191919",
            }}
          >
            Tarek Ashraf
          </h1>
          <h2
            className="text-lg mt-1 transition-colors duration-1000"
            style={{
              color: hoveredColor ? "#e6e6e6" : "#191919",
              // letterSpacing: "0.25em",
            }}
          >
            AI Engineer
          </h2>

          <div className="mt-4 text-sm" style={{ fontSize: "0.8rem" }}>
            <p
              className="transition-colors duration-1000"
              style={{
                color: hoveredColor ? "#e6e6e6" : "#191919",
              }}
            >
              Co-Founder & CTO <a href="https://para-job.com/" target="_blank">@Parajob</a>
            </p>
            <p
              className="mt-1 transition-colors duration-1000"
              style={{
                color: hoveredColor ? "#e6e6e6" : "#191919",
              }}
            >
              ML Flow & Scikit-learn contributor
            </p>
          </div>
        </div>

        <nav className="mt-auto mb-8">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "block text-base hover:underline transition-colors duration-1000",
                    pathname === item.path ? "font-bold" : "",
                  )}
                  style={{
                    color: hoveredColor ? "#e6e6e6" : "#191919",
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
