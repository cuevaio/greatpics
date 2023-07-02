"use client"

import Link from "next/link"

export const Footer = () => {
  return (
    <div className="sticky bottom-0 w-full border-t z-50 bg-background">
      <div className="flex h-16 container items-center justify-between text-muted-foreground">
        <p className="text-muted-foreground">
          Powered by{" "}
          <Link
            href="/about"
            className="font-semibold transition-colors hover:text-muted-foreground/80"
          >
            many
          </Link>
          .
        </p>
        <p className="text-muted-foreground">
          Created by{" "}
          <a
            href="https://twitter.com/cuevantn"
            className="font-semibold transition-colors hover:text-muted-foreground/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthony
          </a>
          .
        </p>
      </div>
    </div>
  )
}
