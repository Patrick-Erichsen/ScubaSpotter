import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DEFAULT_DIVE_SITE_NAME } from "@/app/page";
import SampleButton from "./sample-button";

export type UploadImagesFormOnSubmitParams = {
  diveSiteName?: string;
  images: File[];
};

export interface UploadImagesFormProps {
  onSubmit: (params: UploadImagesFormOnSubmitParams) => void;
}

export default function UploadImagesForm({ onSubmit }: UploadImagesFormProps) {
  const [images, setImages] = useState<FileList | null>(null);
  const [diveSiteName, setDiveSiteName] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!images) return;

    onSubmit({ diveSiteName, images: Array.from(images) });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-0">
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <Label htmlFor="diveSite" className="mb-2">
              Dive site name
            </Label>
            <p className="text-sm text-gray-500 mb-2">
              Name of the dive site and the country, separated by a comma
            </p>
            <Input
              type="text"
              name="diveSite"
              value={diveSiteName}
              placeholder={DEFAULT_DIVE_SITE_NAME}
              onChange={(e) => setDiveSiteName(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md mb-2"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="images" className="mb-2">
              Images
            </Label>
            <Input
              multiple
              required
              type="file"
              name="images"
              onChange={(e) => setImages(e.target.files)}
              className="mb-4"
            />

            <div className="flex flex-row justify-end">
              <SampleButton onClick={onSubmit} />

              <Button type="submit" className="ml-4">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
