import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export const Picture = ({
  url,
  aspect_ratio,
}: {
  url: string;
  aspect_ratio: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="w-32 grow-0 shrink-0 overflow-hidden border border-input rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <AspectRatio ratio={aspect_ratio || 1 / 1}>
          <Image src={url} alt="" fill className="object-cover" />
        </AspectRatio>
      </DialogTrigger>
      <DialogContent className="p-0 w-full sm:w-max md:w-max sm:max-h-[800px] rounded-lg overflow-hidden border">
        <Image src={url} alt="" height={1000} width={1000} className="h-full w-auto" />
      </DialogContent>
    </Dialog>
  );
};
