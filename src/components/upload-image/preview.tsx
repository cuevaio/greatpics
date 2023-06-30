"use client";

import * as React from "react";
import type { FileWithPath } from "react-dropzone";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  file: FileWithPath;
  setFile: React.Dispatch<React.SetStateAction<FileWithPath | null>>;
  setAspectRatio: React.Dispatch<React.SetStateAction<number>>;
}

export const ImagePreview = ({ file, setFile, setAspectRatio }: Props) => {
  const localUrl = URL.createObjectURL(file);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    imgRef.current?.addEventListener("load", () => {
      if (imgRef.current?.naturalWidth && imgRef.current?.naturalHeight) {
        const width = imgRef.current.naturalWidth;
        const height = imgRef.current.naturalHeight;

        const ratios = [3 / 4, 4 / 5, 1 / 1, 5 / 4, 16 / 9].map((ratio) => ({
          ratio,
          diff: Math.abs(width / ratio - height),
        }));

        const sortedRatios = ratios.sort((a, b) => a.diff - b.diff);
        setAspectRatio(sortedRatios[0].ratio);
      }
    });

    return () => {
      imgRef.current?.removeEventListener("load", () => {});
    };
  }, [imgRef]);

  return (
    <>
      <Image
        ref={imgRef}
        src={localUrl || ""}
        alt=""
        fill
        className="object-cover"
      />
      <form
        onSubmit={() => {
          setFile(null);
        }}
      >
        <Button
          variant="secondary"
          size="icon"
          type="submit"
          className="m-2 bg-white/50 hover:bg-white/75 w-6 h-6  absolute top-0 right-0"
        >
          <X className="w-3 h-3 text-slate-600" />
        </Button>
      </form>
    </>
  );
};
