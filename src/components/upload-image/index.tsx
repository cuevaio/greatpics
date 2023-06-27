import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadImageDialogContent } from "./dialog-content";
import { UploadCloud } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/ui";

export const UploadImage = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className={cn(
            buttonVariants({ variant: "default" }),
            "flex mx-auto my-4"
          )}
          variants={{
            hidden: { opacity: 0, y: -10 },
            show: { opacity: 1, y: 0, transition: { type: "spring" } },
          }}
        >
          <UploadCloud className="w-4 h-4 mr-2" /> Upload photo
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 divide-y">
        <DialogHeader className="p-8">
          <DialogTitle className="font-bold text-xl text-center">
            Upload your pic
          </DialogTitle>
          <DialogDescription className="text-center">
            It will take around 30 seconds to upload your image and create a
            caption for it. All your images will be automatically deleted after
            24 hours.
          </DialogDescription>
        </DialogHeader>
        <div className="p-10 bg-secondary">
          <UploadImageDialogContent />
        </div>
      </DialogContent>
    </Dialog>
  );
};