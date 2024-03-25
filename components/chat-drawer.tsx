"use client";

import { Drawer } from "vaul";
import Chat from "./chat";
import { Button } from "./ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

export interface ChatDrawerProps {
  selectedImageWithLabel?: { label: string; image: string };
  prevImage?: () => void;
  nextImage?: () => void;
  children: React.ReactNode;
}

export function ChatDrawer({
  children,
  selectedImageWithLabel,
  prevImage,
  nextImage,
}: ChatDrawerProps) {
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;

  return (
    <Drawer.Root direction={isDesktop ? "right" : "bottom"}>
      {children}

      {selectedImageWithLabel && (
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-white md:rounded-l-[10px] rounded-t-[10px] md:w-[600px] w-full md:h-full h-[95vh] mt-24 fixed bottom-0 right-0 py-10">
            {prevImage && (
              <Button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2 md:ml-4"
                variant="ghost"
                size="icon"
                onClick={() => prevImage()}
              >
                <ChevronLeftIcon className="h-8 w-8" />
              </Button>
            )}

            <div className="flex flex-col h-[100%] w-full">
              <div className="px-12 md:px-20">
                <Drawer.Title className="mb-4 text-3xl font-semibold">
                  {selectedImageWithLabel["label"]}
                </Drawer.Title>
                <Drawer.Description className="mb-8">{`Learn more about the ${selectedImageWithLabel[
                  "label"
                ].toLowerCase()} in this image using ChatGPT`}</Drawer.Description>
              </div>

              <Chat selectedImageWithLabel={selectedImageWithLabel} />
            </div>

            {nextImage && (
              <Button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 md:mr-4"
                variant="ghost"
                size="icon"
                onClick={() => nextImage()}
              >
                <ChevronRightIcon className="h-8 w-8" />
              </Button>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      )}
    </Drawer.Root>
  );
}
