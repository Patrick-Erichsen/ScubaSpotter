import { ClassificationApiRes } from "@/app/api/route";
import { DataUrlsWithFilename } from "@/app/page";
import Image from "next/image";
import { ChatDrawer } from "./chat-drawer";
import { Drawer } from "vaul";

export interface ClassificationResults {
  classifications: ClassificationApiRes["classifications"];
  imageDataUrls: DataUrlsWithFilename;
}

export default function ClassificationResults({
  classifications,
  imageDataUrls,
}: ClassificationResults) {
  return (
    <ChatDrawer>
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center space-y-16">
          {Object.entries(classifications).map(([labels, filenames], i) => (
            <div key={i}>
              <h2 className="text-2xl font-semibold text-blue-600">{labels}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filenames.map((filename, i) => (
                  <Drawer.Trigger asChild key={i}>
                    <div className="relative h-60">
                      <Image
                        className="transition duration-500 ease-in-out hover:opacity-50 cursor-pointer"
                        src={imageDataUrls[filename]}
                        alt={imageDataUrls[filename]}
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
