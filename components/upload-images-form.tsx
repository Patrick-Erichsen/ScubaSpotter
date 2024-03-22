import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export type UploadImagesFormOnSubmitParams = {
  diveSiteName?: string;
  images: FileList;
};

export interface UploadImagesFormProps {
  onSubmit: (params: UploadImagesFormOnSubmitParams) => void;
}

export default function UploadImagesForm({ onSubmit }: UploadImagesFormProps) {
  const [images, setImages] = useState<FileList | null>(null);
  const [diveSiteName, setDiveSiteName] = useState<string | undefined>(
    "Nusa Penida, Indonesida"
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!images) return;

    onSubmit({ diveSiteName, images });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-0">
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <Label htmlFor="diveSite" className="mb-2">
              Dive site
            </Label>
            <p className="text-sm text-gray-500 mb-6">
              Provide the name of the dive site and the country, separated by a
              comma. For example, Nusa Penida, Indonesia.
            </p>
            <Input
              type="text"
              name="diveSite"
              value={diveSiteName}
              onChange={(e) => setDiveSiteName(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md mb-2"
            />
          </div>

          <div className="flex flex-col items-start">
            <Label htmlFor="images" className="mb-2">
              Upload one or more images
            </Label>
            <Input
              multiple
              required
              type="file"
              name="images"
              onChange={(e) => setImages(e.target.files)}
              className="mb-2"
            />
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
