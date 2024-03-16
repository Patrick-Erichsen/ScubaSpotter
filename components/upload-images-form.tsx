import Image from "next/image";
import { ChangeEventHandler, FormEventHandler } from "react";
import { DataUrlsWithFilename as ImageDataUrlsWithFilename } from "@/app/page";

export interface UploadImagesFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onImageUpload: ChangeEventHandler<HTMLInputElement>;
  imageDataUrls: ImageDataUrlsWithFilename;
}

export default function UploadImagesForm({
  onSubmit,
  onImageUpload,
  imageDataUrls,
}: UploadImagesFormProps) {
  const hasUploadedImages = Object.keys(imageDataUrls).length > 0;

  return (
    <form onSubmit={onSubmit}>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="images" className="mb-2">
            Upload one or more images
          </label>
          <input
            type="file"
            name="images"
            multiple
            onChange={onImageUpload}
            className="mb-2"
          />

          {hasUploadedImages &&
            Object.values(imageDataUrls).map((imageDataUrl, i) => (
              <div className="mb-2" key={i}>
                <Image
                  src={imageDataUrl}
                  alt="Preview"
                  width={200}
                  height={200}
                />
              </div>
            ))}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Upload
          </button>
        </div>
      </div>
    </form>
  );
}
