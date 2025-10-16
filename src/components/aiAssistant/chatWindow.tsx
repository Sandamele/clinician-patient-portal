import { ChatWindowProps } from "@/types";

export function ChatWindow({ messages, loading }: ChatWindowProps) {
  return (
    <div className="flex flex-col gap-2 p-4 h-full">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`px-4 py-2 rounded max-w-xs text-sm ${
            msg.type === "user"
              ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 self-end"
              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}

      {loading && (
        <div className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-4 py-2 rounded max-w-[90px] self-start text-sm italic animate-pulse">
          typing…
        </div>
      )}
    </div>
  );
}
