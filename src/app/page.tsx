"use client"

import { motion } from "framer-motion"
import { Twitter } from "lucide-react"
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
        <motion.a
          variants={{
            hidden: { opacity: 0, y: -10 },
            show: { opacity: 1, y: 0, transition: { type: "spring" } },
          }}
          href="https://twitter.com/cuevantn/status/1675946040074072069"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-lg border border-primary/70 px-7 py-2 text-primary/70 transition-colors hover:border-primary/90 hover:text-primary/90"
        >
          <Twitter className="h-5 w-5" />
          <p className="text-sm font-semibold">Introducing Great Pics</p>
        </motion.a>
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
                Turn your pics into tweets
              </span>{" "}
              <span
                className="relative z-10 bg-gradient-to-br from-primary/50 via-primary to-primary/50  bg-clip-text"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                using AI
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-2/3 z-0 h-[0.58em] w-full fill-primary/40"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
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
              Upload a picture, write a draft and instantly get back an
              accessible tweet.{" "}
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger className="decoration-3 underline decoration-dotted">
                    100% free and privacy-friendly.
                  </TooltipTrigger>
                  <TooltipContent className="w-[240px]">
                    Any pictures you upload are automatically deleted after 24
                    hours.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
