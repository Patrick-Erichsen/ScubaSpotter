"use client";

import { useState } from "react";
import type { ClassificationApiRes } from "./api/route";
import UploadImagesForm, {
  UploadImagesFormOnSubmitParams,
} from "@/components/upload-images-form";
import ClassificationResults from "@/components/classification-results";
import Spinner from "@/components/ui/spinner";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setDiveSiteName, setImages } = useAppContext();

  const [classificationResults, setClassificationResults] =
    useState<ClassificationApiRes | null>(null);

  async function classifyImages(images: FileList) {
    setIsSubmitting(true);

    const formData = new FormData();

    Array.from(images).forEach((file) => {
      formData.append("images", file);
    });

    const response = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setIsSubmitting(false);
    setClassificationResults(data);
  }

  function setAppContextVals(params: UploadImagesFormOnSubmitParams) {
    setDiveSiteName(params.diveSiteName);

    Array.from(params.images).forEach((image) => {
      const reader = new FileReader();

      reader.readAsDataURL(image);

      reader.onload = () => {
        setImages((prev) => ({
          [image.name]: reader.result as string,
          ...prev,
        }));
      };
    });
  }

  async function onSubmit(params: UploadImagesFormOnSubmitParams) {
    setAppContextVals(params);
    await classifyImages(params.images);
  }

  if (isSubmitting) return <Spinner />;

  if (!classificationResults) return <UploadImagesForm onSubmit={onSubmit} />;

  return classificationResults.retryAfterSec ? (
    "Try again, API is loading"
  ) : (
    <ClassificationResults
      classifications={classificationResults.classifications}
    />
  );
}
