import { Message } from "ai";
import { IconAI, IconUser } from "./ui/icons";

export function ChatList({ messages }: { messages: Message[] }) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl mt-12">
      {messages.map((message, index) => (
        <div
          className="group relative flex items-start md:-ml-12 pb-8"
          key={index}
        >
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-background">
            {message.role === "user" ? <IconUser /> : <IconAI />}
          </div>

          <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
