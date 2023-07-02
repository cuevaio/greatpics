"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { PopoverClose } from "@radix-ui/react-popover"
import { motion } from "framer-motion"
import { Dot } from "lucide-react"

import { extractAI } from "@/lib/utils/demo_examples"
import { cn } from "@/lib/utils/ui"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { AspectRatio } from "../ui/aspect-ratio"
import { Button, buttonVariants } from "../ui/button"

interface User {
  name: string
  username: string
}

const fetchUser = async () => {
  const res = await fetch("https://randomuser.me/api?nat=us,fr&inc=name,login")
  const data = await res.json()

  const username = data.results[0].login.username
  const name = data.results[0].name.first + " " + data.results[0].name.last
  return { username, name } as User
}

export const TweetPreview = ({
  url,
  aspect_ratio,
  completion,
}: {
  url: string | StaticImageData
  aspect_ratio: number
  completion: string
}) => {
  const [tweet, alt] = extractAI(completion)
  const [user, setUser] = React.useState<User | null>(null)
  const profile_pic = React.useMemo(() => {
    const options = [
      "lorelei",
      "micah",
      "notionists",
      "open-peeps",
      "avataaars",
      "big-ears",
      "croodles",
    ]
    const random = Math.floor(Math.random() * options.length)
    const seed = (Math.random() + 1).toString(36).substring(7)
    return `https://api.dicebear.com/6.x/${options[random]}/svg?seed=${seed}`
  }, [])

  React.useEffect(() => {
    fetchUser().then((user) => setUser(user))
  }, [])

  return (
    <div className="flex w-full gap-4 rounded-lg border p-4 pr-8">
      <Image
        alt={alt}
        src={profile_pic}
        width={40}
        height={40}
        className="h-12 w-12 rounded-full bg-border"
      />
      <div className="flex w-full flex-col">
        {user ? (
          <div className="flex flex-wrap gap-x-1">
            <div className="font-bold">{user?.name}</div>
            <div className="text-muted-foreground">@{user?.username}</div>
            <div className="flex items-center justify-center">
              <Dot className="h-2 w-2" />
            </div>
            <div className="text-muted-foreground">1h</div>
          </div>
        ) : (
          <div className="mb-2 flex w-[80%] gap-1">
            <div className="h-4 w-[50%] animate-pulse rounded-full bg-border" />
            <div className="h-4 w-[40%] animate-pulse rounded-full bg-border" />
            <div className="h-4 w-[10%] animate-pulse rounded-full bg-border" />
          </div>
        )}
        <p className="mb-3">{tweet}</p>

        <div
          className={cn("relative overflow-hidden rounded-xl border", {
            "max-w-sm": aspect_ratio === 4 / 5 || aspect_ratio === 3 / 4,
          })}
        >
          <AspectRatio ratio={aspect_ratio} className="">
            <Image
              placeholder={typeof url === "string" ? undefined : "blur"}
              alt={alt}
              src={url}
              fill
              className="object-cover"
            />
          </AspectRatio>

          {!!alt && (
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  initial={{ opacity: 0, scale: 2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "absolute bottom-2 left-2 h-min w-min rounded-lg bg-black/70 px-2 py-1 font-bold tracking-wide hover:bg-black/80"
                  )}
                >
                  ALT
                </motion.button>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-lg text-foreground">
                <div className="text-2xl font-bold">Image description</div>
                <div className="my-2 text-sm">{alt}</div>
                <PopoverClose asChild>
                  <Button className="mt-2 w-full rounded-full text-lg font-bold">
                    Dismiss
                  </Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}
