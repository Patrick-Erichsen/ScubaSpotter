"use client";

import { useChat } from "ai/react";
import { ChatDrawerProps } from "./chat-drawer";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { Textarea } from "./ui/textarea";
import { ChatScrollAnchor } from "@/lib/hooks/chat-scroll-anchor";
import { ChatList } from "./chat-list";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import Image from "next/image";

export interface ChatProps {
  selectedImageWithLabel: NonNullable<
    ChatDrawerProps["selectedImageWithLabel"]
  >;
}

export default function Chat({ selectedImageWithLabel }: ChatProps) {
  const { diveSiteName } = useAppContext();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { formRef, onKeyDown } = useEnterSubmit();
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        if (
          e.target &&
          ["INPUT", "TEXTAREA"].includes((e.target as any).nodeName)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  /**
   * On first load, send an intial message with our label and image data URL
   * to start the conversation.
   */
  useEffect(() => {
    const getImageInfo = () => {
      const { label, image } = selectedImageWithLabel;

      append(
        {
          role: "system",
          content: `\
  Hello! This is a photo of a ${label}. \
  The user took it at the following dive site location: ${diveSiteName}. \
  Can you tell us more about it?`,
        },
        {
          data: {
            image,
          },
        }
      );
    };

    // getImageInfo();
  }, [append, diveSiteName, selectedImageWithLabel]);

  const messagesWithoutSystemPrompt = messages.slice(1);

  return (
    <div className="flex flex-col h-[100%]">
      <div className="flex-grow overflow-auto mb-4 px-12 md:px-20 h-[0px]">
        <div className="relative w-full md:w-1/2 h-[25vh] mb-8">
          <Image
            fill
            src={selectedImageWithLabel["image"]}
            alt={selectedImageWithLabel["image"]}
            sizes="500px"
            className=""
          />
        </div>

        <ChatList messages={messagesWithoutSystemPrompt} />

        <ChatScrollAnchor trackVisibility={true} />
      </div>

      <form className="px-12 md:px-20" onSubmit={handleSubmit}>
        <Textarea
          autoFocus
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          rows={1}
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question"
        />
      </form>
    </div>
  );
}
