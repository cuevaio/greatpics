import { Button } from "./ui/button";
import Image from "next/image";
import { Dot } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PopoverClose } from "@radix-ui/react-popover";
export const TweetPreview = ({
  url,
  aspect_ratio,
  alt,
  tweet,
}: {
  url: string;
  aspect_ratio: number;
  alt: string;
  tweet: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-xl flex gap-4 border rounded-xl p-4 pr-8"
    >
      <Image
        alt={alt}
        src="https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col w-full">
        <div className="flex gap-1">
          <div className="font-bold">Elon Musk</div>
          <div className="text-muted-foreground">@elonmusk</div>
          <div className="flex items-center justify-center">
            <Dot className="w-2 h-2" />
          </div>
          <div className="text-foreground">1h</div>
        </div>
        <div className="mb-3">{tweet}</div>

        <div
          className={cn("rounded-xl border overflow-hidden", {
            "max-w-sm": aspect_ratio === 4 / 5 || aspect_ratio === 3 / 4,
          })}
        >
          <AspectRatio ratio={aspect_ratio} className="relative">
            <Image alt={alt} src={url} fill className="object-cover" />
            <Popover>
              <PopoverTrigger asChild>
                <Button className="absolute bottom-2 left-2 h-min w-min py-1 px-2 font-bold tracking-wide bg-black/70 hover:bg-black/80">
                  ALT
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-xl">
                <div>
                  <div className="font-bold text-2xl">Image description</div>
                  <div className="my-2 text-sm">{alt}</div>
                  <PopoverClose asChild>
                    <Button className="mt-2 w-full rounded-full font-bold text-lg">
                      Dismiss
                    </Button>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
          </AspectRatio>
        </div>
      </div>
    </motion.div>
  );
};
