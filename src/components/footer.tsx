"use client"

import Link from "next/link"

export const Footer = () => {
  return (
    <div className="sticky bottom-0 z-50 w-full border-t bg-background">
      <div className="container flex h-16 items-center justify-between text-muted-foreground">
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
