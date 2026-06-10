import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { EditorProvider } from "@/context/EditorContext";

export const metadata: Metadata = {
  title: "LinkedPage – Turn Your LinkedIn Into a Beautiful Personal Site",
  description:
    "Paste your LinkedIn URL and get a stunning personal micro-site in under 60 seconds. Pick a template, edit inline, publish free.",
  openGraph: {
    title: "LinkedPage – LinkedIn → Personal Site in 60 Seconds",
    description:
      "Convert your LinkedIn profile into a beautiful micro-site. No code. Just paste, customise, publish.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-inter bg-white text-black antialiased">
        <EditorProvider>{children}</EditorProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
