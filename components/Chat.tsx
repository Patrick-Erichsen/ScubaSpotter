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
import { Button } from "./ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";

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
            image: selectedImageWithLabel["image"],
          },
        }
      );
    };

    getImageInfo();
  }, [append, diveSiteName, selectedImageWithLabel]);

  const messagesWithoutSystemPrompt = messages.slice(1);

  return (
    <div className="flex flex-col h-[100%]">
      <div className="flex-grow overflow-auto mx-16 md:mx-24">
        <div className="relative w-full h-[33vh] max-h-[300px] ">
          <Image
            fill
            src={selectedImageWithLabel["image"]}
            alt={selectedImageWithLabel["image"]}
            className="object-contain object-right my-4"
          />
        </div>

        <ChatList messages={messagesWithoutSystemPrompt} />

        <ChatScrollAnchor trackVisibility={true} />
      </div>

      <form
        ref={formRef}
        className="flex flex-row space-x-4 p-1 relative mx-16 md:mx-24"
        onSubmit={handleSubmit}
      >
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
        <Button
          size="icon"
          variant="secondary"
          type="submit"
          className="absolute right-4 transform -translate-y-1/2 top-1/2"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </Button>
      </form>
    </div>
  );
}
