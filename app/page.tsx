"use client";

import { useState } from "react";
import type { ClassificationApiRes } from "./api/route";
import UploadImagesForm, {
  UploadImagesFormOnSubmitParams,
} from "@/components/upload-images-form";
import ClassificationResults from "@/components/classification-results";
import Spinner from "@/components/ui/spinner";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

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

  return (
    <div className="flex flex-col  px-4 sm:px-8 md:px-16 lg:px-20 py-10 bg-gray-100">
      <div className="flex flex-row ">
        <div className="basis-1/3">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Scuba Spotter 🤿
          </h1>

          <p>Identify and learn about your underwater photos</p>
        </div>

        <div className="basis-2/3 aspect-video">
          <Image
            src="/images/landing-page-graphic.webp"
            alt="Image of a scuba diver photographing a turtle"
            className="rounded-lg shadow-lg"
            width={400}
            height={400}
          />
        </div>
      </div>

      <div>
        <UploadImagesForm onSubmit={onSubmit} />
      </div>

      <div>
        {!classificationResults ? null : classificationResults.retryAfterSec ? (
          "Try again, API is loading"
        ) : (
          <ClassificationResults
            classifications={classificationResults.classifications}
          />
        )}
      </div>
    </div>
  );
}
