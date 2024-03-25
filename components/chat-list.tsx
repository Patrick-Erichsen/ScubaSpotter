import { Message } from "ai";

export function ChatList({ messages }: { messages: Message[] }) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl">
      {messages.map((message, index) => (
        <div key={index} className="pb-4 whitespace-pre-wrap">
          {message.content}
        </div>
      ))}
    </div>
  );
}
