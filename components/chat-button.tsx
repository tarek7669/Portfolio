"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useContactContext } from "./contact-context"
import { useChatbot } from "./chatbotContext"

export default function ChatButton() {
  const { openChatbot } = useChatbot();

  return (
    <>
      <div className="fixed top-[calc(2rem)] right-[calc(2rem)] md:top-[calc(3rem)] md:right-[calc(3rem)] lg:top-[calc(4rem)] lg:right-[calc(4rem)]">
        <Button
          onClick={() => {
            openChatbot();
            console.log("clicked")
          }}
          className="transition-colors duration-1000"
          style={{
            backgroundColor: "#191919",
            color: "#e6e6e6",
            borderColor: "transparent",
          }}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Talk with me
        </Button>
      </div>
    </>
  )
}
