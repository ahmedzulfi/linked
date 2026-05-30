"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";

function OnboardingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startScrape, isLoading, scrapeError, editedProfile, clearProfile, useMockProfile } = useEditor();

  const [step, setStep] = useState<"input" | "loading" | "fallback">("input");
  const [url, setUrl] = useState("");
  const [pasteData, setPasteData] = useState("");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Reading your profile…");

  // If there's an initial URL query param, auto-start scraping
  useEffect(() => {
    const initialUrl = searchParams.get("url") || "";
    if (initialUrl) {
      setUrl(initialUrl);
      handleStartScrape(initialUrl);
    }
  }, [searchParams]);

  const handleStartScrape = async (targetUrl: string) => {
    const trimmed = targetUrl.trim();
    if (!trimmed.includes("linkedin.com/in/")) {
      toast.error("Please paste a valid LinkedIn profile URL (e.g. linkedin.com/in/username)");
      return;
    }
    setStep("loading");
    setProgress(0);
    setStatusText("Reading your profile…");
    
    // Start scraping in background
    startScrape(trimmed);
  };

  // Progress animation and status text sequencing
  useEffect(() => {
    if (step !== "loading") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next < 35) {
          setStatusText("Reading your profile…");
        } else if (next < 70) {
          setStatusText("Pulling your experience…");
        } else if (next < 98) {
          setStatusText("Building your page…");
        }
        
        if (next >= 98) {
          clearInterval(interval);
          return 98; // Hold at 98% until scrape finishes or fails
        }
        return next;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [step]);

  // Handle scrape success or failure
  useEffect(() => {
    if (step === "loading" && !isLoading) {
      if (scrapeError) {
        setStep("fallback");
      } else if (editedProfile) {
        setProgress(100);
        setStatusText("Complete!");
        const t = setTimeout(() => {
          router.push("/editor?onboarding=true");
        }, 300);
        return () => clearTimeout(t);
      }
    }
  }, [isLoading, scrapeError, editedProfile, step, router]);

  const handleManualImport = () => {
    useMockProfile();
    toast.success("Proceeding with template data customization.");
    router.push("/editor?onboarding=true");
  };

  const handleBackToInput = () => {
    clearProfile();
    setStep("input");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] relative overflow-hidden flex flex-col items-center justify-center font-inter select-none">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-50">
        <img src="/bg.png" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/40 via-white/80 to-[#FBFBFB]" />
      </div>

      {/* Header Logo */}
      <div className="absolute top-8 left-8 z-10 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-[#2A2A2F] text-white flex items-center justify-center font-bold text-lg">W</span>
        <span className="font-semibold text-[16px] text-black tracking-tight">LinkedPage</span>
      </div>

      <div className="w-full max-w-[560px] px-6 z-10">
        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="text-[32px] font-medium tracking-tight text-black leading-tight mb-3">
                Paste your LinkedIn profile link to get started.
              </h1>
              <p className="text-[15px] text-[#171717]/50 mb-8 max-w-sm">
                We'll turn your public profile into a premium, custom portfolio in seconds.
              </p>

              <div className="w-full flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="linkedin.com/in/username"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStartScrape(url)}
                  className="flex-1 h-12 px-4 rounded-xl bg-white border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[15px] font-medium text-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                />
                <button
                  onClick={() => handleStartScrape(url)}
                  className="h-12 px-6 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-sm font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  Generate Page <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center text-center max-w-sm mx-auto"
            >
              {/* Frosted Loading Card */}
              <div className="w-full p-8 bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col items-center">
                {/* Custom modern spinner */}
                <div className="relative w-16 h-16 mb-6">
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#F3F3F3] border-t-[#8DB8FF]"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                </div>

                <h2 className="text-xl font-semibold text-black mb-1">Building your site</h2>
                
                <div className="h-6 flex items-center justify-center overflow-hidden mb-6">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={statusText}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="text-[14px] font-medium text-[#171717]/60"
                    >
                      {statusText}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[#F3F3F3] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-[#2A2A2F] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-gray-400">{progress}% Complete</span>
              </div>
            </motion.div>
          )}

          {step === "fallback" && (
            <motion.div
              key="fallback"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-start text-left max-w-md mx-auto p-8 bg-white/95 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                <AlertCircle className="w-5 h-5 text-[#E45A5A]" />
              </div>

              <h2 className="text-xl font-semibold text-black mb-2">Couldn't import your profile directly.</h2>
              <p className="text-[14px] text-[#171717]/60 leading-relaxed mb-5">
                LinkedIn's privacy settings are restricting access. Please download your data archive from{" "}
                <a
                  href="https://www.linkedin.com/psettings/member-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-medium hover:underline inline-flex items-center gap-0.5"
                >
                  LinkedIn's settings page
                </a>{" "}
                and import it below to build your page.
              </p>

              <div className="w-full flex flex-col gap-4 mb-6">
                <textarea
                  placeholder="Paste profile data here, or leave empty to use template defaults..."
                  value={pasteData}
                  onChange={(e) => setPasteData(e.target.value)}
                  className="w-full h-24 p-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-xl text-sm font-medium text-black focus:border-[#8DB8FF] outline-none resize-none placeholder:text-[#171717]/30"
                />
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={handleBackToInput}
                  className="flex-1 h-10 border border-[#E6E6E6] hover:bg-gray-50 text-black text-[13px] font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Try different URL
                </button>
                <button
                  onClick={handleManualImport}
                  className="flex-1 h-10 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  Use Template Data <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
        <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
      </div>
    }>
      <OnboardingInner />
    </Suspense>
  );
}
