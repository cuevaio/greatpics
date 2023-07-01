import { cn } from "@/lib/utils/ui";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";

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
    <html
      lang="en"
      className="dark"
      style={{
        colorScheme: "dark",
      }}
    >
      <body className={cn(unbounded.className)}>
        <Toaster />
        <div className="-z-50 fixed h-[100dvh] w-full" />
        <div id="content" className="w-full h-[100dvh] overflow-auto">
          <Navbar />
          <main className="min-h-[80dvh] container mt-12 mb-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
