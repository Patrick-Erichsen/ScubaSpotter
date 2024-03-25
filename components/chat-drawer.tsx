"use client";

import { Drawer } from "vaul";
import Chat from "./chat";

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

  console.log(`prevImage: ${prevImage}, nextImage: ${nextImage}`);

  return (
    <Drawer.Root direction={isDesktop ? "right" : "bottom"}>
      {children}

      {selectedImageWithLabel && (
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-white md:rounded-l-[10px] rounded-t-[10px] md:w-[600px] w-full md:h-full h-[95vh] mt-24 fixed bottom-0 right-0 py-10">
            <div className="flex flex-col h-[100%] w-full">
              <div className="px-10">
                <Drawer.Title className="mb-4 text-3xl font-semibold">
                  Learn more
                </Drawer.Title>
                <Drawer.Description className="mb-8">{`Ask ChatGPT questions about this ${selectedImageWithLabel[
                  "label"
                ].toLowerCase()}`}</Drawer.Description>
              </div>

              <Chat
                selectedImageWithLabel={selectedImageWithLabel}
                prevImage={prevImage}
                nextImage={nextImage}
              />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      )}
    </Drawer.Root>
  );
}
