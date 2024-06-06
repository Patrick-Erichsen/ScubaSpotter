import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import SampleButton from "./sample-button";

export type UploadImagesFormOnSubmitParams = {
  images: File[];
};

export interface UploadImagesFormProps {
  onSubmit: (params: UploadImagesFormOnSubmitParams) => void;
}

export default function UploadImagesForm({ onSubmit }: UploadImagesFormProps) {
  const [images, setImages] = useState<FileList | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!images) return;

    onSubmit({ images: Array.from(images) });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-0">
        <div className="flex flex-col justify-center space-y-8">
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
