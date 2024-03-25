import { ClassificationApiRes } from "@/app/api/route";
import Image from "next/image";
import { ChatDrawer, ChatDrawerProps } from "./chat-drawer";
import { Drawer } from "vaul";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { on } from "events";

export interface ClassificationResultsProps {
  classifications: ClassificationApiRes["classifications"];
}

export default function ClassificationResults({
  classifications,
}: ClassificationResultsProps) {
  const { images } = useAppContext();
  const [selectedImageWithLabel, setSelectedImageWithLabel] =
    useState<ChatDrawerProps["selectedImageWithLabel"]>(undefined);
  const [prevImage, setPrevImage] =
    useState<ChatDrawerProps["prevImage"]>(undefined);
  const [nextImage, setNextImage] =
    useState<ChatDrawerProps["prevImage"]>(undefined);

  const labels = Object.keys(classifications);

  function onImageClick(labelIndex: number, filenameIndex: number): void {
    const curLabel = labels[labelIndex];
    const nextLabel = labels[labelIndex + 1];
    const prevLabel = labels[labelIndex - 1];

    const curFilename = classifications[curLabel][filenameIndex];

    setSelectedImageWithLabel({ label: curLabel, image: images[curFilename] });

    const curLabelNextFilename = classifications[curLabel][filenameIndex + 1];
    const curLabelPrevFilename = classifications[curLabel][filenameIndex - 1];

    const nextLabelFirstFilename = classifications[nextLabel]?.[0];
    const prevLabelLastFilename =
      classifications[prevLabel]?.[classifications[prevLabel].length - 1];

    setNextImage(() =>
      curLabelNextFilename
        ? () => onImageClick(labelIndex, filenameIndex + 1)
        : nextLabelFirstFilename
        ? () => onImageClick(labelIndex + 1, 0)
        : undefined
    );

    setPrevImage(() =>
      curLabelPrevFilename
        ? () => onImageClick(labelIndex, filenameIndex - 1)
        : prevLabelLastFilename
        ? () =>
            onImageClick(labelIndex - 1, classifications[prevLabel].length - 1)
        : undefined
    );
  }

  return (
    <ChatDrawer
      selectedImageWithLabel={selectedImageWithLabel}
      prevImage={prevImage}
      nextImage={nextImage}
    >
      <div className="mt-16 md:mt-24" id="classification-results">
        <h2 className="mb-4 text-3xl font-semibold">Classification results</h2>

        <p>Click on an image to learn more about the specific species</p>

        <div className="flex flex-col justify-center space-y-6 mt-6">
          {labels.map((label, labelIndex) => (
            <section key={labelIndex}>
              <h3 className="border-b-2 my-4 text-2xl font-semibold">
                {label}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-auto">
                {classifications[label].map((filename, filenameIndex) => (
                  <Drawer.Trigger asChild key={filename}>
                    <div className="relative w-full h-[25vh]">
                      <Image
                        fill
                        src={images[filename]}
                        alt={images[filename]}
                        onClick={() => onImageClick(labelIndex, filenameIndex)}
                        sizes="500px"
                        className="transition duration-500 ease-in-out hover:opacity-80 cursor-pointer object-contain object-left-top"
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
