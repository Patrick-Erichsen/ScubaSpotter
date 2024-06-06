import { Button } from "./ui/button";
import { UploadImagesFormOnSubmitParams } from "./upload-images-form";
import { useAppContext } from "@/context/AppContext";

interface SubmitButtonProps {
  onClick: (params: UploadImagesFormOnSubmitParams) => void;
}

const SAMPLE_IMAGE_PATHS = [
  "/sample-images/fish1.jpeg",
  "/sample-images/fish2.jpeg",
  "/sample-images/manta-ray1.jpeg",
];

export default function SampleButton({ onClick }: SubmitButtonProps) {
  const { setIsSubmitting } = useAppContext();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setIsSubmitting(true);

    const images = await Promise.all(
      SAMPLE_IMAGE_PATHS.map(async (path) => {
        const response = await fetch(path);
        const blob = await response.blob();
        const file = new File([blob], path.split("/").pop() || "", {
          type: "image/jpeg",
        });

        return file;
      })
    );

    onClick({
      images,
    });
  }

  return (
    <Button type="button" variant="outline" onClick={handleClick}>
      Try with sample images
    </Button>
  );
}
