import { ClassificationApiRes } from "@/app/api/route";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export interface ClassificationResultsProps {
  classifications: ClassificationApiRes["classifications"];
}

export default function ClassificationResults({
  classifications,
}: ClassificationResultsProps) {
  const { images } = useAppContext();

  const labels = Object.keys(classifications);

  return (
    <div className="mt-16 md:mt-24" id="classification-results">
      <h2 className="mb-4 text-3xl font-semibold">Classification results</h2>

      <div className="flex flex-col justify-center space-y-6 mt-6">
        {labels.map((label, labelIndex) => (
          <section key={labelIndex}>
            <h3 className="border-b-2 my-4 text-2xl font-semibold">{label}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 auto-rows-auto">
              {classifications[label].map((filename, filenameIndex) => (
                <div className="relative w-full h-[25vh]" key={filenameIndex}>
                  <Image
                    fill
                    src={images[filename]}
                    alt={images[filename]}
                    className="transition duration-500 ease-in-out object-fill"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
