import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "LinkedPage - Convert LinkedIn Profiles to Beautiful Personal Micro-Sites",
  description: "Create a beautiful, customizable personal micro-site from your LinkedIn profile in under 60 seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-inter bg-white text-black antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
