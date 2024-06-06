"use client";

import { useEffect, useState } from "react";
import type { ClassificationApiRes } from "./api/route";
import UploadImagesForm, {
  UploadImagesFormOnSubmitParams,
} from "@/components/upload-images-form";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import ClassificationResults from "@/components/classification-results";
import Link from "next/link";

export default function Home() {
  const { setDiveSiteName, setImages, setIsSubmitting } = useAppContext();

  const [classificationResults, setClassificationResults] =
    useState<ClassificationApiRes | null>(null);

  /**
   * Scroll to the classifications results once we have them
   */
  useEffect(() => {
    if (classificationResults) {
      const target = document.getElementById("classification-results");

      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }
  }, [classificationResults]);

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
      <div className="flex flex-col md:flex-row">
        <div className="w-full basis-2/5 flex flex-col mr-16">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-6xl mb-8 md:mb-10">
            Classify the sea life in your underwater photos
          </h1>

          <p className="mb-10 md:mb-14">
            Scuba Spotter classifies your dive photos to show you everything you
            experienced on your dive!
          </p>

          <p className="mb-10 md:mb-14">
            This is a sample project to make use of an image classifier for
            marine life that I fine-tuned off of <i>resnet18</i>.{" "}
            <Link
              href="https://huggingface.co/patrickerichsen/scuba_spotter_v0.1"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              See it on HuggingFace here.
            </Link>
          </p>

          <div className="md:hidden">
            <Image
              priority
              src="/hero.webp"
              alt="Image of a scuba diver taking a photo of a turtle"
              className="rounded-lg shadow-xl w-full mb-10"
              width={400}
              height={400}
            />
          </div>

          <UploadImagesForm onSubmit={onSubmit} />
        </div>

        <div className="hidden md:flex basis-3/5 items-center justify-center aspect-video">
          <Image
            priority
            src="/hero.webp"
            alt="Image of a scuba diver taking a photo of a turtle"
            className="rounded-lg shadow-xl w-full"
            width={400}
            height={400}
          />
        </div>
      </div>

      {!classificationResults ? null : classificationResults.retryAfterSec ? (
        "Try again, API is loading"
      ) : (
        <ClassificationResults
          classifications={classificationResults.classifications}
        />
      )}
    </div>
  );
}
