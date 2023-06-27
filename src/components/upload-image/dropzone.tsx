"use client";
import { UploadCloud } from "lucide-react";

interface Props {
  getRootProps: any;
  getInputProps: any;
}

export const Dropzone = ({ getRootProps, getInputProps }: Props) => {
  return (
    <div
      {...getRootProps()}
      className="ring-ring outline-ring bg-white rounded h-full hover:cursor-pointer group flex flex-col justify-center items-center"
    >
      <UploadCloud className="mb-4 w-6 h-6 transition group-hover:scale-110 group-hover:-translate-y-1" />
      <p className="text-center text-sm">Drag and drop</p>
      <p className="text-center text-sm">or</p>
      <p className="text-center text-sm">click and select</p>

      <input
        className="ring-transparent outline-transparent"
        {...getInputProps()}
      />
    </div>
  );
};
