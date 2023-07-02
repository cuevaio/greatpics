import { motion } from "framer-motion"
import { UploadCloud } from "lucide-react"

import { cn } from "@/lib/utils/ui"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { UploadImageDialogContent } from "./dialog-content"

export const UploadImage = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className={cn(
            buttonVariants({ variant: "default" }),
            "mx-auto my-12 flex h-max rounded-lg p-4 font-bold"
          )}
          variants={{
            hidden: { opacity: 0, y: -10 },
            show: { opacity: 1, y: 0, transition: { type: "spring" } },
          }}
        >
          <UploadCloud className="mr-2 h-4 w-4" /> Upload your picture
        </motion.button>
      </DialogTrigger>
      <DialogContent className="gap-0 divide-y rounded-lg p-0 sm:max-w-[425px]">
        <DialogHeader className="p-8">
          <DialogTitle className="text-center text-xl font-bold">
            Upload your pic
          </DialogTitle>
          <DialogDescription className="text-center">
            It will take around 30 seconds to upload and caption your image. The
            max file size is 8MB.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-primary/5 p-10">
          <UploadImageDialogContent />
        </div>
      </DialogContent>
    </Dialog>
  )
}
