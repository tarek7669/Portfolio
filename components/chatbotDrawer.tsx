"use client";
import { useChatbot } from "@/components/chatbotContext";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ChatbotDrawer = () => {
    const { isOpen, closeChatbot } = useChatbot();
    const [messages, setMessages] = useState<
      { sender: "user" | "bot"; content: string }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState("");
  
    const drawerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    // Fetch visitor info and display alert if recruiter
    useEffect(() => {
      const fetchVisitorInfo = async () => {
        try {
          const res = await fetch("https://ipinfo.io/json?token=bf8c98e67acd97");
          const data = await res.json();
          setCompany(data.org || "");
        } catch {}
      };

      fetchVisitorInfo();
    }, []);

    // Smooth scroll
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
            top: chatBodyRef.current.scrollHeight,
            behavior: "smooth", // smooth scroll
            });
        }
    }, [messages]);

    // ✅ Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          drawerRef.current &&
          !drawerRef.current.contains(event.target as Node)
        ) {
          closeChatbot();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, closeChatbot]);

    // ✅ PUT THIS HERE — INSIDE THE COMPONENT FUNCTION
    const sendMessage = async () => {
        const message = inputRef.current?.value?.trim();
        if (!message) return;

        inputRef.current!.value = "";
        setMessages((prev) => [...prev, { sender: "user", content: message }]);
        setLoading(true);

        try {
        const response = await fetch("https://clone-k02u.onrender.com/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: message }),
        });

        const data = await response.json();
        setMessages((prev) => [...prev, { sender: "bot", content: data.response }]);
        } catch (err) {
        setMessages((prev) => [
            ...prev,
            { sender: "bot", content: "Error: " + String(err) },
        ]);
        } finally {
        setLoading(false);
        setTimeout(() => {
            chatBodyRef.current?.scrollTo({
            top: chatBodyRef.current.scrollHeight,
            behavior: "smooth",
            });
        }, 100);
        }
    };

  return (
    <div
        ref={drawerRef}
      className={cn(
        `fixed top-0 right-0 h-full bg-[#e6e6e6] border-l border-[#191919] p-2 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "translate-x-full"} duration-300`,
      )}
      style={{
        backgroundColor: "#e6e6e6",
        borderColor: "#191919",
        width: "25rem",
        fontSize: "0.9rem",
      }}
    >
      <div className="flex justify-between items-center mb-4 pt-1 pl-1">
            <h2
            className="text-xl transition-colors duration-1000"
            style={{
                color: "#191919",
            }}
            >
            Talk with Me (Literally)
            </h2>
            <Button
            variant="ghost"
            size="icon"
            onClick={() => closeChatbot()}
            className="hover:bg-[#d1d1d1] transition-colors duration-1000 pt-3"
            style={{
                color: "#191919",
                backgroundColor: "transparent",
            }}
            >
            <X className="h-4 w-4" />
            </Button>
        </div>
        <div
            ref={chatBodyRef}
            className="border border-gray-300 rounded h-[calc(100%-8rem)] mb-4 p-4 overflow-y-auto transition-colors duration-1000"
            style={{
                borderColor: "#191919",
                backgroundColor: "#fcfefe",
            }}
        >
            <p
            className="text-sm transition-colors duration-1000"
            style={{
                color: "#191919",
            }}
            >
            Hi{company != "" ? `, visitor from ${company}` : "! I am virtual Tarek. What do you want to know?"}
            </p>
            {messages.map((msg, i) => (
                <div
                key={i}
                className={`text-sm max-w-[80%] ${
                    msg.sender === "user"
                    ? "ml-auto text-blue-600 text-right"
                    : "text-gray-700"
                }`}
                >
                {msg.content}
                </div>
            ))}
            {loading && <div className="italic text-gray-400">typing...</div>}
        </div>

        <div className="border-t flex gap-2">
            <input
            ref={inputRef}
            type="text"
            placeholder="Ask something..."
            className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
            onClick={sendMessage}
            className="transition-colors duration-1000"
            style={{
              backgroundColor: "#191919",
              color: "#e6e6e6",
            }}
            >
            Send
            </Button>
        </div>
    </div>
  );
};

export default ChatbotDrawer;
