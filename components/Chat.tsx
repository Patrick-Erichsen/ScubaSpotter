"use client";

import { useChat } from "ai/react";
import { ChatDrawerProps } from "./chat-drawer";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export interface ChatProps {
  imageDataUrlAndLabel: NonNullable<ChatDrawerProps["imageDataUrlAndLabel"]>;
}

export default function Chat({ imageDataUrlAndLabel }: ChatProps) {
  const { diveSiteName } = useAppContext();
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();

  /**
   * On first load, send an intial message with our label and image data URL
   * to start the conversation.
   */
  useEffect(() => {
    const getImageInfo = async () => {
      const [label, imageDataUrl] = imageDataUrlAndLabel;

      const res = await append(
        {
          role: "user",
          content: `\
          Hello! This is a photo of a ${label}. 
          ${
            diveSiteName
              ? `I took it at the following dive site locatin: ${diveSiteName}.`
              : ""
          }
          Can you tell me more about it?`,
        },
        {
          data: {
            imageDataUrl,
          },
        }
      );
    };

    getImageInfo();
  }, [append, diveSiteName, imageDataUrlAndLabel]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.slice(1).map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
