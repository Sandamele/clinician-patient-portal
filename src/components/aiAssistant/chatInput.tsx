import { useState } from "react";
import { ChatInputProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export function ChatInput({ onSend, loading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 transition-colors">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        disabled={loading}
        className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 disabled:opacity-50 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button onClick={handleSend} disabled={loading}>
        {loading ? <Spinner /> : "Ask"}
      </Button>
    </div>
  );
}
