"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full border-t">
      <div className="flex h-16 container items-center justify-between">
        <p className="text-slate-500">
          Powered by{" "}
          <Link
            href="/about"
            className="font-semibold text-slate-600 transition-colors hover:text-slate-900"
          >
            many
          </Link>
          .
        </p>
        <p className="text-slate-500">
          Created by{" "}
          <a
            href="https://twitter.com/cuevantn"
            className="font-semibold text-slate-600 transition-colors hover:text-slate-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthony
          </a>
          .
        </p>
      </div>
    </div>
  );
};
