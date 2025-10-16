"use client";
import { useState } from "react";
import { ChatWindow } from "@/components/aiAssistant/chatWindow";
import { ChatInput } from "@/components/aiAssistant/chatInput";
import { AiMessageType } from "@/types";
import { toast, Toaster } from "sonner";

export default function Page() {
  const [messages, setMessages] = useState<AiMessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text: string) => {
    try {
      if (!text.trim()) return;
      setLoading(true);

      const userMessage: AiMessageType = { type: "user", text };
      setMessages((prev) => [...prev, userMessage]);

      const response = await fetch("/api/ai/", {
        method: "POST",
        body: JSON.stringify({ prompt: text }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      const aiMessage: AiMessageType = {
        type: "ai",
        text: `AI says: ${data.message}`,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      toast.error(error.message || "Ask something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full h-[600px] bg-white dark:bg-slate-800 rounded-lg shadow-md flex flex-col overflow-hidden transition-colors">
        <div className="flex-1 overflow-y-auto">
          <ChatWindow messages={messages} loading={loading} />
        </div>
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
      <Toaster richColors />
    </div>
  );
}
