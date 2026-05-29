"use client";

import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

const STEPS = [
  "Connecting to LinkedIn…",
  "Reading your profile…",
  "Extracting experience data…",
  "Pulling skills & education…",
  "Generating your micro-site…",
  "Almost there…",
];

function ConvertInner() {
  const router = useRouter();
  const params = useSearchParams();
  const urlParam = params.get("url") ?? "";

  const { startScrape, isLoading, scrapeError, editedProfile } = useEditor();

  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!urlParam || hasStarted.current) return;
    hasStarted.current = true;
    startScrape(urlParam);
  }, [urlParam, startScrape]);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
      setProgress((p) => Math.min(p + 16, 90));
    }, 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && !scrapeError && editedProfile) {
      setProgress(100);
      const t = setTimeout(() => router.push("/editor"), 400);
      return () => clearTimeout(t);
    }
  }, [isLoading, scrapeError, editedProfile, router]);

  const handleRetry = () => {
    hasStarted.current = false;
    setStepIndex(0);
    setProgress(0);
    if (urlParam) startScrape(urlParam);
  };

  const isError = !isLoading && !!scrapeError;
  const isDone = !isLoading && !scrapeError && !!editedProfile;

  return (
    <main className="flex-1 flex items-center justify-center px-5 pt-24 pb-16">
      <AnimatePresence mode="wait">
        {isError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center gap-8 max-w-md text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#FEF2F2] flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-[#E45A5A]" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-medium text-black">Couldn't fetch that profile</h1>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{scrapeError}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button onClick={() => router.push("/")} className="button button-secondary flex-1 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Change URL
              </button>
              <button onClick={handleRetry} className="button button-primary flex-1 gap-2">
                <RefreshCw className="w-4 h-4" />
                Try again
              </button>
            </div>
            <p className="text-xs text-[#9CA3AF]">Make sure the LinkedIn URL is public and accessible</p>
          </motion.div>
        )}

        {!isError && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center gap-10 max-w-sm w-full text-center"
          >
            {/* Animated ring */}
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-[#E6E6E6] border-t-[#8DB8FF]"
                animate={{ rotate: isDone ? 0 : 360 }}
                transition={{ repeat: isDone ? 0 : Infinity, duration: 1.1, ease: "linear" }}
              />
              <div className="absolute inset-[10px] rounded-full bg-[#0A66C2] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <AnimatePresence>
                {isDone && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#8DFFB3] flex items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" className="w-9 h-9 stroke-[#1a5c3a] fill-none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-medium text-black">
                {isDone ? "Profile loaded!" : "Building your page…"}
              </h1>
              <AnimatePresence mode="wait">
                <motion.p
                  key={isDone ? "done" : stepIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="text-sm text-[#6B6B6B]"
                >
                  {isDone ? "Redirecting to your editor…" : STEPS[stepIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#F3F3F3] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#2A2A2F] rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>

            {urlParam && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#E6E6E6] bg-[#FBFBFB] max-w-full overflow-hidden">
                <div className="w-2 h-2 rounded-full bg-[#8DFFB3] flex-shrink-0 animate-pulse" />
                <p className="text-xs text-[#171717] truncate font-medium">{urlParam}</p>
              </div>
            )}

            {isLoading && (
              <button
                onClick={() => router.push("/")}
                className="text-xs text-[#9CA3AF] hover:text-[#171717] transition-colors duration-150"
              >
                Cancel
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ConvertPage() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />
      <Suspense fallback={
        <main className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
        </main>
      }>
        <ConvertInner />
      </Suspense>
    </div>
  );
}
