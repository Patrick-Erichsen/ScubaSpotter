"use client";

import { Drawer } from "vaul";
import Chat from "./chat";
import Image from "next/image";

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
          <Drawer.Content
            className={`bg-white flex flex-col 
            ${
              isDesktop
                ? "rounded-l-[10px] w-[600px] h-full"
                : "rounded-t-[10px] w-full h-19/20"
            } mt-24 fixed bottom-0 right-0 py-10`}
          >
            <div className="p-4 bg-white flex-1 h-full">
              <div className="max-w-md mx-auto">
                <Drawer.Title className="pb-2 mb-4 text-3xl font-semibold tracking-tight first:mt-0">
                  Learn more
                </Drawer.Title>
                <Drawer.Description>Ask some questions!</Drawer.Description>

                <Chat imageDataUrlAndLabel={imageDataUrlAndLabel} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      )}
    </Drawer.Root>
  );
}
