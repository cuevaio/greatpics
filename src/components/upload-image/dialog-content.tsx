"use client";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import * as React from "react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
const { useUploadThing } = generateReactHelpers<OurFileRouter>();
import { generatePermittedFileTypes } from "@/lib/utils/uploadthing";
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ImagePreview } from "./preview";
import { Dropzone } from "./dropzone";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRouter } from "next/navigation";
import { DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const UploadImageDialogContent = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [file, setFile] = React.useState<FileWithPath | null>(null);
  const [aspectRatio, setAspectRatio] = React.useState<number>(1 / 1);
  const [captioning, setCaptioning] = React.useState(false);
  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        if (res && res.length > 0 && res[0].fileUrl) {
          setCaptioning(true);

          const captionAndRedirect = async () => {
            const response = await fetch("/api/pics", {
              method: "POST",
              body: JSON.stringify({
                url: res[0].fileUrl,
                aspect_ratio: aspectRatio,
              }),
            });

            if (response.ok) {
              const data = await response.json();
              router.push(`/pic/${data.id}`);
            } else if (response.status === 429) {
              toast({
                variant: "destructive",
                title: "Oops! Too many requests for now :(",
                description:
                  "You are being rate limited. You can caption up to 3 images per hour. Please try again later.",
              });
              setCaptioning(false);
            } else {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem captioning your image.",
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              });
              setCaptioning(false);
            }
          };

          captionAndRedirect();
        }
      },
      onUploadError: (e) => {
        if (e.message === "429") {
          toast({
            variant: "destructive",
            title: "Oops! Too many requests for now :(",
            description:
              "You are being rate limited. You can upload up to 3 images per hour. Please try again later.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem uploading your image.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      },
    }
  );
  const { fileTypes } = generatePermittedFileTypes(permittedFileInfo?.config);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    multiple: false,
  });
  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="relative overflow-hidden border rounded-lg">
        <AspectRatio ratio={aspectRatio}>
          {file ? (
            <ImagePreview
              file={file}
              setFile={setFile}
              setAspectRatio={setAspectRatio}
              aspectRatio={aspectRatio}
            />
          ) : (
            <Dropzone
              getRootProps={getRootProps}
              getInputProps={getInputProps}
            />
          )}
        </AspectRatio>
      </div>
      <DialogFooter className="w-full">
        <form
          className="w-full"
          onSubmit={(event) => {
            event.preventDefault();
            file && startUpload([file]);
          }}
        >
          <Button
            type="submit"
            disabled={!file || isUploading || captioning}
            className="w-full rounded-lg"
          >
            {(isUploading || captioning) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isUploading
              ? "Uploading..."
              : captioning
              ? "Captioning..."
              : "Upload"}
          </Button>
        </form>
      </DialogFooter>
    </div>
  );
};
