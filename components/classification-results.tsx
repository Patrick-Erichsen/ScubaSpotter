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
  const [selectedImageWithLabel, setSelectedImageWithLabel] =
    useState<ChatDrawerProps["selectedImageWithLabel"]>(null);

  return (
    <ChatDrawer selectedImageWithLabel={selectedImageWithLabel}>
      <div>
        <h2 className="pb-2 mb-4 text-3xl font-semibold tracking-tight first:mt-0">
          Classification results
        </h2>
        <p className="mt-4">
          Click on an image to learn more about the specific species.
        </p>

        <div className="flex flex-col justify-center space-y-16 mt-10">
          {Object.entries(classifications).map(([label, filenames], i) => (
            <section key={i}>
              <h3 className="border-b mt-8 mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
                {label}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filenames.map((filename, i) => (
                  <Drawer.Trigger asChild key={i}>
                    <div className="relative aspect-square">
                      <Image
                        fill
                        onClick={() =>
                          setSelectedImageWithLabel([label, images[filename]])
                        }
                        className="transition duration-500 ease-in-out hover:opacity-50 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        src={images[filename]}
                        alt={images[filename]}
                      />
                    </div>
                  </Drawer.Trigger>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </ChatDrawer>
  );
}
