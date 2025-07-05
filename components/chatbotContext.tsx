"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const ChatbotContext = createContext<{
  isOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
}>({
  isOpen: false,
  openChatbot: () => {},
  closeChatbot: () => {},
});

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);

  return (
    <ChatbotContext.Provider value={{ isOpen, openChatbot, closeChatbot }}>
      {children}
    </ChatbotContext.Provider>
  );
};
