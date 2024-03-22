"use client";

import { Drawer } from "vaul";
import Chat from "./chat";

export interface ChatDrawerProps {
  selectedImageWithLabel: [label: string, imageDataUrl: string] | null;
  children: React.ReactNode;
}

export function ChatDrawer({
  children,
  selectedImageWithLabel: imageDataUrlAndLabel,
}: ChatDrawerProps) {
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;

  return (
    <Drawer.Root direction={isDesktop ? "right" : "bottom"}>
      {children}

      {imageDataUrlAndLabel && (
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-white md:rounded-l-[10px] rounded-t-[10px] md:w-[600px] w-full md:h-full h-19/20 mt-24 fixed bottom-0 right-0 py-10">
            <div className="flex flex-col max-w-lg mx-auto">
              <Drawer.Title className="mb-4 text-3xl font-semibold tracking-tight">
                Learn more
              </Drawer.Title>
              <Drawer.Description>{`Ask ChatGPT questions about this ${imageDataUrlAndLabel[0].toLowerCase()}`}</Drawer.Description>

              <Chat imageDataUrlAndLabel={imageDataUrlAndLabel} />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      )}
    </Drawer.Root>
  );
}
