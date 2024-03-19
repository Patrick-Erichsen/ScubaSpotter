"use client";

import { Drawer } from "vaul";
import Chat from "./chat";
import Image from "next/image";

export interface ChatDrawerProps {
  imageDataUrlAndLabel: [label: string, imageDataUrl: string] | null;
  children: React.ReactNode;
}

export function ChatDrawer({
  children,
  imageDataUrlAndLabel,
}: ChatDrawerProps) {
  return (
    <Drawer.Root direction="right">
      {children}

      {imageDataUrlAndLabel && (
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[600px] mt-24 fixed bottom-0 right-0">
            <div className="p-4 bg-white flex-1 h-full">
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-4">
                  Learn more about {imageDataUrlAndLabel[0]}
                </Drawer.Title>

                <Image
                  src={imageDataUrlAndLabel[1]}
                  alt={imageDataUrlAndLabel[1]}
                  width={200}
                  height={200}
                />

                <Chat imageDataUrlAndLabel={imageDataUrlAndLabel} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      )}
    </Drawer.Root>
  );
}
