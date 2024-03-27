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
          <Drawer.Content className="bg-white md:rounded-l-[10px] rounded-t-[10px] md:w-1/2 w-full md:h-full h-[95vh] mt-24 fixed bottom-0 right-0 pb-4">
            <div className="flex flex-col h-[100%] w-full">
              <div className="flex flex-row justify-between items-center py-8 px-24 border-b-2 relative">
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                  {prevImage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => prevImage()}
                    >
                      <ChevronLeftIcon className="h-8 w-8" />
                    </Button>
                  )}
                </div>
                <div className="flex flex-col">
                  <Drawer.Title className="mb-2 text-3xl font-semibold">
                    {selectedImageWithLabel["label"]}
                  </Drawer.Title>
                  <Drawer.Description>{`Learn more about the ${selectedImageWithLabel[
                    "label"
                  ].toLowerCase()} in this image using ChatGPT`}</Drawer.Description>
                </div>
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  {nextImage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => nextImage()}
                    >
                      <ChevronRightIcon className="h-8 w-8" />
                    </Button>
                  )}
                </div>
              </div>

              <Chat selectedImageWithLabel={selectedImageWithLabel} />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      )}
    </Drawer.Root>
  );
}
