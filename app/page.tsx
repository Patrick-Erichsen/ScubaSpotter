"use client";

import { useState, FormEventHandler, ChangeEventHandler } from "react";
import type { ClassificationApiRes } from "./api/route";
import UploadImagesForm from "@/components/upload-images-form";
import ClassificationResults from "@/components/classification-results";
import Spinner from "@/components/ui/spinner";

export interface DataUrlsWithFilename {
  [fileName: string]: Extract<FileReader["result"], string>;
}

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFileList, setImageFileList] = useState<FileList | null>(null);
  const [imageDataUrls, setImageDataUrls] = useState<DataUrlsWithFilename>({});
  const [classificationResults, setClassificationResults] =
    useState<ClassificationApiRes | null>(null);

  const onImageUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const { files } = e.target;

      setImageFileList(files);

      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
          setImageDataUrls((prev) => ({
            [file.name]: reader.result as string,
            ...prev,
          }));
        };
      });
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!imageFileList) return;

    setIsSubmitting(true);

    const formData = new FormData();

    Array.from(imageFileList).forEach((file) => {
      formData.append("images", file);
    });

    const response = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setIsSubmitting(false);
    setClassificationResults(data);
  };

  if (isSubmitting) return <Spinner />;

  return classificationResults ? (
    classificationResults.retryAfterSec ? (
      "Try again, API is loading"
    ) : (
      <ClassificationResults
        classifications={classificationResults.classifications}
        imageDataUrls={imageDataUrls}
      />
    )
  ) : (
    <UploadImagesForm
      onSubmit={onSubmit}
      onImageUpload={onImageUpload}
      imageDataUrls={imageDataUrls}
    />
  );
}
