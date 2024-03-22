"use client";

import { useState } from "react";
import type { ClassificationApiRes } from "./api/route";
import UploadImagesForm, {
  UploadImagesFormOnSubmitParams,
} from "@/components/upload-images-form";
import ClassificationResults from "@/components/classification-results";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import SampleButton from "@/components/sample-button";
import { Separator } from "@radix-ui/react-separator";

export const DEFAULT_DIVE_SITE_NAME = "Nusa Penida, Indonesia";

export default function Home() {
  const { setDiveSiteName, setImages, setIsSubmitting } = useAppContext();

  const [classificationResults, setClassificationResults] =
    useState<ClassificationApiRes | null>(null);

  async function classifyImages(
    images: UploadImagesFormOnSubmitParams["images"]
  ) {
    setIsSubmitting(true);

    const formData = new FormData();

    images.forEach((file) => {
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

    params.images.forEach((image) => {
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

  return (
    <div className="flex flex-col px-4 md:px-8 md:px-16 lg:px-20 py-10 md:py-14">
      <div className="flex flex-col md:flex-row mb-16 md:mb-24">
        <div className="w-full basis-2/5 flex flex-col mr-16">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-6xl mb-8 md:mb-10">
            Learn more about your underwater photos
          </h1>

          <p className="mb-10 md:mb-14">
            Scuba Spotter categorizes your underwater photos and lets you have a
            conversation with ChatGPT to learn about the specific species at
            your dive site, and more!
          </p>

          <div className="md:hidden">
            <Image
              priority
              src="/images/hero-mobile.webp"
              alt="Image of a scuba diver taking a photo"
              className="rounded-lg shadow-xl w-full mb-10"
              width={400}
              height={400}
            />
          </div>

          <UploadImagesForm onSubmit={onSubmit} />
        </div>

        <div className="hidden md:block basis-3/5 flex items-center justify-center aspect-video">
          <Image
            priority
            src="/images/hero-mobile.webp"
            alt="Image of a scuba diver taking a photo"
            className="rounded-lg shadow-xl w-full"
            width={400}
            height={400}
          />
        </div>
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
