import { cn } from "@/lib/utils/ui"

import "./globals.css"

import { Montserrat } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

const unbounded = Montserrat({ subsets: ["latin"] })

export const metadata = {
  title: "GreatPics.app - Post great pics with AI",
  description: "AI-powered image captioning and social media posting",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="dark"
      style={{
        colorScheme: "dark",
      }}
    >
      <body className={cn(unbounded.className)}>
        <Toaster />
        <div className="fixed -z-50 h-[100dvh] w-full" />
        <div id="content" className="h-[100dvh] w-full overflow-auto">
          <Navbar />
          <main className="container mb-20 mt-12 min-h-[80dvh]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
