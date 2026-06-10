"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AlertCircle, ArrowRight } from "lucide-react";
import {
  AnimatedUploadIllustration,
  AnimatedGeneratingIllustration,
} from "@/components/AnimatedSVGs";

function OnboardingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    startScrapeManual,
    scrapeError,
    clearProfile,
    useMockProfile,
    websiteId,
    pendingZip,
    setPendingZip,
  } = useEditor();

  const [step, setStep] = useState<"input" | "loading" | "fallback">("input");
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUploadZipWithFile = async (file: File) => {
    if (file.size > 20 * 1024 * 1024) {
      toast.error(
        "LinkedIn exports are typically under 5MB. Files larger than 20MB are not allowed.",
      );
      return;
    }
    setStep("loading");
    setIsImporting(true);
    const toastId = toast.loading("Processing and parsing ZIP archive...");
    try {
      const success = await startScrapeManual(file);
      toast.dismiss(toastId);
      if (!success) {
        setIsImporting(false);
        setStep("input");
      }
    } catch (e: any) {
      toast.dismiss(toastId);
      toast.error(e.message || "Failed to process ZIP archive.");
      setIsImporting(false);
      setStep("input");
    }
  };

  // If there's an uploaded ZIP from the home page, start processing immediately
  useEffect(() => {
    if (pendingZip) {
      const fileToProcess = pendingZip;
      setPendingZip(null);
      setZipFile(fileToProcess);
      handleUploadZipWithFile(fileToProcess);
    }
  }, [pendingZip, setPendingZip]);

  // Redirect on website creation success
  useEffect(() => {
    if (websiteId && (step === "loading" || isImporting)) {
      setProgress(100);
      const t = setTimeout(() => {
        router.push(`/editor?id=${websiteId}&onboarding=true`);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [websiteId, step, isImporting, router]);

  const handleZipFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setZipFile(file);
      handleUploadZipWithFile(file);
    }
  };

  const handleManualImport = async () => {
    const toastId = toast.loading("Loading default workspace settings...");
    await useMockProfile();
    toast.dismiss(toastId);
    toast.success("Proceeding with default template data.");
    setStep("loading");
  };

  const handleBackToInput = () => {
    router.replace("/onboarding");
    clearProfile();
    setZipFile(null);
    setStep("input");
  };

  const isAuthwallError =
    scrapeError &&
    (scrapeError.toLowerCase().includes("authwall") ||
      scrapeError.toLowerCase().includes("privacy") ||
      scrapeError.toLowerCase().includes("login"));

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col items-center justify-center text-black antialiased relative overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* ── Content View Area ── */}
      <main className="w-full flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-[480px]">
          <AnimatePresence mode="wait">
            {/* Step 1 — Upload ZIP */}
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/70 backdrop-blur-xl border border-[#E6E6E6]/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 flex flex-col w-full max-w-[480px] select-none animate-in fade-in zoom-in duration-200"
              >
                <h1 className="text-2xl font-semibold tracking-tight text-[#2A2A2F] text-center mb-2 font-inter">
                  Import your LinkedIn Profile
                </h1>
                <p className="text-[14px] text-gray-500 text-center mb-6 leading-relaxed font-inter">
                  Upload your LinkedIn data export ZIP to build a fully
                  structured website instantly.
                </p>

                {/* ZIP Upload Section */}
                <div className="flex flex-col gap-3 w-full mb-5">
                  <label
                    htmlFor="zip-upload-primary"
                    className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#E6E6E6] hover:border-[#8DB8FF] rounded-2xl p-6 bg-[#FBFBFB]/50 hover:bg-[#8DB8FF]/5 cursor-pointer transition-[border-color,background-color,box-shadow,transform] duration-150 hover:shadow-[0_0_20px_rgba(141,184,255,0.12)] active:scale-[0.98] relative text-center group"
                  >
                    <input
                      id="zip-upload-primary"
                      type="file"
                      accept=".zip"
                      onChange={handleZipFileChange}
                      className="hidden"
                      disabled={isImporting}
                    />
                    <AnimatedUploadIllustration />
                    {zipFile ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[13px] font-semibold text-[#2A2A2F] truncate max-w-[280px]">
                          {zipFile.name}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {(zipFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[13.5px] font-semibold text-[#2A2A2F]">
                          Upload LinkedIn data ZIP
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          Click to select or drag and drop archive
                        </span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-2 mb-4 select-none">
                  <div className="h-px bg-[#E6E6E6] flex-1" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                    Or
                  </span>
                  <div className="h-px bg-[#E6E6E6] flex-1" />
                </div>

                <button
                  onClick={handleManualImport}
                  className="w-full h-11 border border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50 rounded-2xl text-xs font-semibold text-neutral-700 flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] duration-100 ease-out mb-6"
                >
                  Start from Scratch (Empty Canvas)
                </button>

                {/* Step-by-Step Instructions */}
                <div className="bg-[#FBFBFB]/40 border border-[#E6E6E6]/60 rounded-2xl p-5 mb-6 text-left">
                  <h3 className="text-[11px] font-bold text-[#2A2A2F] uppercase tracking-wider mb-3.5">
                    How to export your profile (takes 2m)
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        num: 1,
                        text: (
                          <>
                            Open LinkedIn's{" "}
                            <a
                              href="https://www.linkedin.com/psettings/member-data"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#3b82f6] font-semibold hover:underline"
                            >
                              Data Settings
                            </a>
                            .
                          </>
                        ),
                      },
                      {
                        num: 2,
                        text: (
                          <>
                            Select <strong>"Something in particular"</strong>{" "}
                            and check the <strong>"Profile"</strong> box.
                          </>
                        ),
                      },
                      {
                        num: 3,
                        text: (
                          <>
                            Click <strong>"Request archive"</strong> and enter
                            password.
                          </>
                        ),
                      },
                      {
                        num: 4,
                        text: (
                          <>Download the ZIP from email and upload it above.</>
                        ),
                      },
                    ].map((item) => (
                      <div
                        key={item.num}
                        className="flex gap-3 text-[12.5px] text-gray-500"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#8DB8FF]/15 text-[#3b82f6] text-[10px] font-bold flex items-center justify-center shrink-0 select-none">
                          {item.num}
                        </span>
                        <span className="leading-normal">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Timeline-style loading */}
            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] w-full max-w-lg overflow-hidden flex flex-col p-8 select-none text-center"
              >
                <AnimatedGeneratingIllustration />
                <div className="space-y-2 mt-4">
                  <div className="font-semibold text-lg text-black font-inter">
                    Reading Profile Data
                  </div>
                  <div className="text-sm text-gray-500 font-inter">
                    Creating website workspace draft...
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-6">
                  <div
                    className="bg-blue-500 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3 — Scraper failure fallback */}
            {step === "fallback" && (
              <motion.div
                key="fallback"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/70 backdrop-blur-xl border border-[#E6E6E6]/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 flex flex-col w-full max-w-[480px] select-none"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5 shadow-sm border border-[#E6E6E6]/40">
                  <AlertCircle className="w-5 h-5 text-[#E45A5A]" />
                </div>

                <h2 className="text-xl font-semibold text-[#2A2A2F] mb-2 font-inter">
                  Could not fetch public profile
                </h2>
                <div className="text-[13.5px] text-gray-500 leading-relaxed mb-6 font-inter">
                  LinkedIn couldn't be read publicly. Please download your
                  settings archive from{" "}
                  <a
                    href="https://www.linkedin.com/psettings/member-data"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3b82f6] font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    LinkedIn's Settings page
                  </a>{" "}
                  and import it below.
                </div>

                <div className="flex flex-col items-center gap-3 w-full mb-6">
                  <label
                    htmlFor="zip-upload"
                    className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#E6E6E6] hover:border-[#8DB8FF] rounded-2xl p-6 bg-[#FBFBFB]/50 hover:bg-[#8DB8FF]/5 cursor-pointer transition-[border-color,background-color,box-shadow,transform] duration-150 hover:shadow-[0_0_20px_rgba(141,184,255,0.12)] active:scale-[0.98] relative text-center group"
                  >
                    <input
                      id="zip-upload"
                      type="file"
                      accept=".zip"
                      onChange={handleZipFileChange}
                      className="hidden"
                      disabled={isImporting}
                    />
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2 transition-transform duration-200 group-hover:scale-105"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 16v-8m0 8l-4-4m4 4l4-4M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
                      />
                    </svg>
                    {zipFile ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[13px] font-semibold text-[#2A2A2F] truncate max-w-[280px]">
                          {zipFile.name}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {(zipFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[13.5px] font-semibold text-[#2A2A2F]">
                          Upload LinkedIn data export ZIP
                        </span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-2 mb-4 select-none">
                  <div className="h-px bg-[#E6E6E6] flex-1" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                    Or
                  </span>
                  <div className="h-px bg-[#E6E6E6] flex-1" />
                </div>

                <button
                  onClick={handleManualImport}
                  className="w-full h-11 border border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50 rounded-2xl text-xs font-semibold text-neutral-700 flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] duration-100 ease-out mb-6"
                >
                  Start from Scratch (Empty Canvas)
                </button>

                <button
                  onClick={handleBackToInput}
                  className="text-xs font-semibold text-neutral-500 hover:text-neutral-700 underline text-center"
                >
                  Go Back
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-neutral-300 border-t-neutral-800 animate-spin" />
        </div>
      }
    >
      <OnboardingInner />
    </Suspense>
  );
}
