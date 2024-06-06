"use server";

import { HfInference } from "@huggingface/inference";

/**
 * Represents the response from the classification API.
 */
export type ClassificationApiRes = {
  classifications: {
    [label: string]: Array<File["name"]>;
  };
} & {
  /**
   * The Hugging Face Inference API has a startup time of
   * up to 20 seconds. If the API is not ready, this
   * value will contain the estimated time in seconds.
   */
  retryAfterSec?: number;
};

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

const MODEL_NAME = "patrickerichsen/scuba_spotter_v0.1";

/**
 * Takes a request and classifies the images in the request.
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  const formData = await req.formData();

  const images = formData.getAll("images");

  const classifications: ClassificationApiRes["classifications"] = {};

  for (const image of images as File[]) {
    try {
      const res = await hf.imageClassification({
        data: image,
        model: MODEL_NAME,
      });

      // Take the most confident label inference, and replace underscores with spaces
      const topPredictionLabel = res[0].label.replace(/_/g, " ");

      const labelFilenames = classifications[topPredictionLabel];

      /**
       * Take the most confident label inference and add the image file name
       * to the list of file names for that label. If the array of file
       * names hasn't been created yet, create it.
       */
      classifications[topPredictionLabel] =
        labelFilenames === undefined
          ? [image.name]
          : [...labelFilenames, image.name];
    } catch (e: any) {
      if (e.hasOwnProperty("estimated_time")) {
        console.log("Retry after ", e.estimated_time);
        return Response.json({ retryAfterSec: e.estimated_time });
      } else {
        console.error(e);
      }
    }
  }

  return Response.json({ classifications });
}
