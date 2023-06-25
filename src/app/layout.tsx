import { cn } from "@/lib/utils/ui";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

const unbounded = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "GreatPics.app - Post great pics with AI",
  description: "AI-powered image captioning and social media posting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(unbounded.className, "bg-white")}>
        <Toaster />
        <div className="-z-50 fixed h-screen w-full bg-gradient-to-br from-indigo-50 from-10% via-sky-50 via-30% to-emerald-50 to-90% " />
        <div id="content" className="w-full h-screen overflow-auto">
          <Navbar />
          <main className="container my-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
