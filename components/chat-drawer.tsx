"use client";

import { FC, PropsWithChildren } from "react";
import { Drawer } from "vaul";
import Chat from "./chat";

export interface ChatDrawerProps {
  children: React.ReactNode;
}

export function ChatDrawer({ children }: ChatDrawerProps) {
  return (
    <Drawer.Root direction="right">
      {children}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[600px] mt-24 fixed bottom-0 right-0">
          <div className="p-4 bg-white flex-1 h-full">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">
                Learn more
              </Drawer.Title>

              <Chat />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
