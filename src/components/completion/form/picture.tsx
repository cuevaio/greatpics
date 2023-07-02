import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export const Picture = ({
  url,
  aspect_ratio,
}: {
  url: string
  aspect_ratio: number
}) => {
  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="w-32 shrink-0 grow-0 overflow-hidden rounded-lg border border-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <AspectRatio ratio={aspect_ratio || 1 / 1}>
          <Image src={url} alt="" fill className="object-cover" />
        </AspectRatio>
      </DialogTrigger>
      <DialogContent className="w-full overflow-hidden rounded-lg border p-0 sm:max-h-[800px] sm:w-max md:w-max">
        <Image
          src={url}
          alt=""
          height={1000}
          width={1000}
          className="h-full w-auto"
        />
      </DialogContent>
    </Dialog>
  )
}
