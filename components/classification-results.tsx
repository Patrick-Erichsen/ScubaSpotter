import { ClassificationApiRes } from "@/app/api/route";
import Image from "next/image";
import { ChatDrawer, ChatDrawerProps } from "./chat-drawer";
import { Drawer } from "vaul";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

export interface ClassificationResults {
  classifications: ClassificationApiRes["classifications"];
}

export default function ClassificationResults({
  classifications,
}: ClassificationResults) {
  const { images } = useAppContext();
  const [imageDataUrlAndLabel, setImageDataUrlAndLabel] =
    useState<ChatDrawerProps["imageDataUrlAndLabel"]>(null);

  return (
    <ChatDrawer imageDataUrlAndLabel={imageDataUrlAndLabel}>
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center space-y-16">
          {Object.entries(classifications).map(([label, filenames], i) => (
            <div key={i}>
              <h2 className="text-2xl font-semibold text-blue-600">{label}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filenames.map((filename, i) => (
                  <Drawer.Trigger asChild key={i}>
                    <div className="relative h-60">
                      <Image
                        onClick={() =>
                          setImageDataUrlAndLabel([label, images[filename]])
                        }
                        className="transition duration-500 ease-in-out hover:opacity-50 cursor-pointer"
                        src={images[filename]}
                        alt={images[filename]}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </Drawer.Trigger>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChatDrawer>
  );
}
