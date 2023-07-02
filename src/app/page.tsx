"use client"

import { motion } from "framer-motion"
import Balancer from "react-wrap-balancer"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Demo } from "@/components/demo"
import { UploadImage } from "@/components/upload-image"

const Home = () => {
  return (
    <div className="relative">
      <div className="background-gradient absolute -top-10 left-1/2 -z-40 aspect-square w-[70%] -translate-x-1/2 sm:-top-32 md:-top-48" />
      <motion.div
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <div className="absolute inset-0 -z-40" />
        <div className="mx-auto max-w-[60rem]">
          <motion.h1
            className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0, transition: { type: "spring" } },
            }}
          >
            <Balancer>
              <span
                className="bg-gradient-to-br from-primary-foreground/50 via-primary-foreground to-primary-foreground/50 bg-clip-text"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Captivating and accessible
              </span>{" "}
              <span
                className="bg-gradient-to-br from-primary/50 via-primary to-primary/50  bg-clip-text"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                tweets
              </span>{" "}
              <span
                className="bg-gradient-to-br from-primary-foreground/50 via-primary-foreground to-primary-foreground/50 bg-clip-text"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                from your pics
              </span>
            </Balancer>
          </motion.h1>
          <motion.p
            className="mt-6 text-center md:text-xl"
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0, transition: { type: "spring" } },
            }}
          >
            <Balancer ratio={0.6}>
              Not sure about what to tweet with those pictures? Let AI come to
              the rescue! Create powerful tweets optimized for{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="underline decoration-dotted">
                    a11y
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>accessibility</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{" "}
              in seconds.
            </Balancer>
          </motion.p>
        </div>
        <UploadImage />
      </motion.div>

      <Demo />
    </div>
  )
}

export default Home
