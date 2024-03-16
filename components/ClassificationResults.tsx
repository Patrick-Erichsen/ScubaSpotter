import { ClassificationApiRes } from "@/app/api/route";
import { DataUrlsWithFilename } from "@/app/page";
import Image from "next/image";

export interface ClassificationResults {
  classifications: ClassificationApiRes["classifications"];
  imageDataUrls: DataUrlsWithFilename;
}

export default function ClassificationResults({
  classifications,
  imageDataUrls,
}: ClassificationResults) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center">
        {Object.entries(classifications).map(([labels, filenames], i) => (
          <div className="mb-2" key={i}>
            <h2>{labels}</h2>

            {filenames.map((filename, i) => (
              <Image
                key={i}
                className="w-full md:w-1/4 h-full md:h-1/4"
                src={imageDataUrls[filename]}
                alt="Preview"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
