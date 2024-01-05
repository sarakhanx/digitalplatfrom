import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css"
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar.";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("normal-class-here",)}>
        <main className="relative flex flex-col min-h-screen">
          <Providers>
          <Navbar/>
          <div className="flex-grow flex-1">{children}</div>
          <Footer/>
          </Providers>
        </main>
        <Toaster position="bottom-center" richColors/>
      </body>
    </html>
  );
}
