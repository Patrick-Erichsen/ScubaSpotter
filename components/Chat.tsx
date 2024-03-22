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
  imageDataUrlAndLabel: NonNullable<ChatDrawerProps["selectedImageWithLabel"]>;
}

export default function Chat({ imageDataUrlAndLabel }: ChatProps) {
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
  // useEffect(() => {
  //   const getImageInfo = () => {
  //     const [label, imageDataUrl] = imageDataUrlAndLabel;

  //     append(
  //       {
  //         role: "system",
  //         content: `\
  //         Hello! This is a photo of a ${label}.
  //         ${
  //           diveSiteName
  //             ? `The user took it at the following dive site location: ${diveSiteName}.`
  //             : ""
  //         }
  //         Can you tell us more about it?`,
  //       },
  //       {
  //         data: {
  //           imageDataUrl,
  //         },
  //       }
  //     );
  //   };

  //   getImageInfo();
  // }, [append, diveSiteName, imageDataUrlAndLabel]);

  const messagesWithoutSystemPrompt = messages.slice(1);

  return (
    <div className="flex flex-col w-full py-12">
      <div className="relative aspect-square">
        <Image
          src={imageDataUrlAndLabel[1]}
          alt={imageDataUrlAndLabel[1]}
          width="0"
          height="0"
          className="w-full"
        />
      </div>

      <ChatList messages={messagesWithoutSystemPrompt} />

      <ChatScrollAnchor trackVisibility={true} />

      <form onSubmit={handleSubmit}>
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
