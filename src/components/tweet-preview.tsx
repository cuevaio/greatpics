"use client";

import * as React from "react";
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

interface User {
  name: string;
  username: string;
}

const fetchUser = async () => {
  const res = await fetch("https://randomuser.me/api?nat=us,fr&inc=name,login");
  const data = await res.json();

  const username = data.results[0].login.username;
  const name = data.results[0].name.first + " " + data.results[0].name.last;
  return { username, name } as User;
};

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
  const profile_pic_seed = React.useRef<string>(
    (Math.random() + 1).toString(36).substring(7)
  );
  const [user, setUser] = React.useState<User | null>(null);
  const profile_pic = `https://api.dicebear.com/6.x/adventurer/svg?seed=${profile_pic_seed.current}`;

  React.useEffect(() => {
    fetchUser().then((user) => setUser(user));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto max-w-xl flex gap-4 border rounded-lg p-4 pr-8"
    >
      <span className="absolute -top-6 left-0 font-bold text-muted-foreground">
        Output
      </span>
      <Image
        alt={alt}
        src={profile_pic}
        width={40}
        height={40}
        className="w-12 h-12 rounded-full bg-border"
      />
      <div className="flex flex-col w-full">
        {user ? (
          <div className="flex gap-1">
            <div className="font-bold">{user?.name}</div>
            <div className="text-muted-foreground">@{user?.username}</div>
            <div className="flex items-center justify-center">
              <Dot className="w-2 h-2" />
            </div>
            <div className="text-muted-foreground">1h</div>
          </div>
        ) : (
          <div className="flex gap-1 w-[80%] mb-2">
            <div className="w-[50%] h-4 bg-border animate-pulse rounded-full" />
            <div className="w-[40%] h-4 bg-border animate-pulse rounded-full" />
            <div className="w-[10%] h-4 bg-border animate-pulse rounded-full" />
          </div>
        )}
        <div className="mb-3">{tweet}</div>

        <div
          className={cn("rounded-xl border overflow-hidden relative", {
            "max-w-sm": aspect_ratio === 4 / 5 || aspect_ratio === 3 / 4,
          })}
        >
          <AspectRatio ratio={aspect_ratio} className="">
            <Image alt={alt} src={url} fill className="object-cover" />
          </AspectRatio>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="absolute bottom-2 left-2 h-min w-min py-1 px-2 font-bold tracking-wide bg-black/70 hover:bg-black/80">
                ALT
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-lg">
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
        </div>
      </div>
    </motion.div>
  );
};
