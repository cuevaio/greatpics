"use client"

import { UploadCloud } from "lucide-react"

interface Props {
  getRootProps: any
  getInputProps: any
}

export const Dropzone = ({ getRootProps, getInputProps }: Props) => {
  return (
    <div
      {...getRootProps()}
      className="group flex h-full flex-col items-center justify-center rounded bg-background outline-ring ring-ring hover:cursor-pointer"
    >
      <UploadCloud className="mb-4 h-6 w-6 transition group-hover:-translate-y-1 group-hover:scale-110" />
      <p className="text-center text-sm">Drag and drop</p>
      <p className="text-center text-sm">or</p>
      <p className="text-center text-sm">click and select</p>

      <input
        className="outline-transparent ring-transparent"
        {...getInputProps()}
      />
    </div>
  )
}
