"use client"

import * as React from "react"
import { type StaticImageData } from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTypewriter } from "react-simple-typewriter"
import useMeasure from "react-use-measure"

import { DEMO_EXAMPLES } from "@/lib/utils/demo_examples"

import { TweetPreview } from "../completion/tweet-preview"
import { Button } from "../ui/button"

function usePrevious<T>(state: T) {
  let [tuple, setTuple] = React.useState([null, state])

  if (tuple[1] !== state) {
    setTuple([tuple[1], state])
  }

  return tuple[0]
}

interface VariantProps {
  direction: number
  width: number
}

let variants = {
  enter: ({ direction, width }: VariantProps) => ({
    x: direction * width,
    opacity: 0,
  }),
  center: { x: 0, opacity: 100 },
  exit: ({ direction, width }: VariantProps) => ({
    x: direction * -width,
    opacity: 0,
  }),
}

export const Demo = () => {
  const [index, setIndex] = React.useState<number>(0)
  const prevIndex = usePrevious<number>(index)
  let [ref, { width }] = useMeasure()
  let direction = index > (prevIndex ?? 0) ? 1 : -1

  const example =
    DEMO_EXAMPLES[(index + DEMO_EXAMPLES.length) % DEMO_EXAMPLES.length]

  return (
    <div
      className="w-[90%] sm:w-[32rem] min-h-[32rem] relative flex flex-col items-center mx-auto"
      ref={ref}
    >
      <AnimatePresence custom={{ direction, width }}>
        <motion.div
          className="absolute top-0 left-0 h-max w-full"
          key={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={{ direction, width }}
        >
          <Button
            className="absolute top-1/2 -left-10 transform -translate-y-1/2"
            onClick={() => setIndex(index - 1)}
            variant="ghost"
            size="icon"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <ShowCase example={example} />
          <Button
            className="absolute top-1/2 -right-10 transform -translate-y-1/2"
            onClick={() => setIndex(index + 1)}
            variant="ghost"
            size="icon"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export const ShowCase = ({
  example,
}: {
  example: {
    output: string
    pic: string | StaticImageData
    aspect_ratio: number
  }
}) => {
  const [completion] = useTypewriter({
    words: [example.output],
    typeSpeed: 10,
    loop: 1,
  })

  return (
    <TweetPreview
      url={example.pic}
      completion={completion}
      aspect_ratio={example.aspect_ratio}
    />
  )
}
