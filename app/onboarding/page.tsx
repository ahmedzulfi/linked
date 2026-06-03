"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Home,
  Layout,
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  Check,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";



// ── Typing dots indicator ────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-[3px] px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-[#2A2A2F]/40"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── AI avatar for chat bubbles ───────────────────────────────────────────────
function AIAvatar({ size = "sm" }: { size?: "sm" | "md" }) {
  const dim = size === "md" ? "w-8 h-8" : "w-7 h-7";
  return (
    <div
      className={`${dim} rounded-full bg-gradient-to-br from-[#2A2A2F] to-[#4A4A55] flex items-center justify-center flex-shrink-0 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]`}
    >
      <Sparkles className="w-3.5 h-3.5 text-white/90" />
    </div>
  );
}

type ChatMessageState = "pending" | "typing" | "done";

interface ChatMessage {
  id: number;
  text: string;
  state: ChatMessageState;
  tag?: string; // small status tag shown inside bubble
}

// ── Single chat message bubble ───────────────────────────────────────────────
function ChatBubble({
  message,
  index,
}: {
  message: ChatMessage;
  index: number;
}) {
  if (message.state === "pending") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.28,
        ease: [0.23, 1, 0.32, 1],
        delay: 0,
      }}
      className="flex items-end gap-2.5 select-none"
    >
      <AIAvatar />
      <div className="flex flex-col gap-1 max-w-[calc(100%-36px)]">
        {message.state === "typing" ? (
          <div className="bg-white border border-[#E6E6E6] rounded-[14px] rounded-bl-[4px] px-3 py-2.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
            <TypingDots />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white border border-[#E6E6E6] rounded-[14px] rounded-bl-[4px] px-3.5 py-2.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
          >
            <div className="flex items-center gap-2">
              {message.tag && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#369762] bg-[#8DFFB3]/25 border border-[#8DFFB3]/40 px-1.5 py-0.5 rounded-full leading-none flex-shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3px]" />
                  {message.tag}
                </span>
              )}
              <p className="text-[13px] font-medium text-[#171717] leading-[1.45]">
                {message.text}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function OnboardingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    startScrape,
    startScrapeManual,
    isLoading,
    scrapeError,
    editedProfile,
    clearProfile,
    useMockProfile,
    websiteId,
    setScrapeError,
    pendingZip,
    setPendingZip,
  } = useEditor();

  const [step, setStep] = useState<"input" | "loading" | "fallback">("input");
  const [url, setUrl] = useState("");
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [showUrlOption, setShowUrlOption] = useState(false);
  const [progress, setProgress] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleUploadZipWithFile = async (file: File) => {
    if (file.size > 20 * 1024 * 1024) {
      toast.error("LinkedIn exports are typically under 5MB. Files larger than 20MB are not allowed.");
      return;
    }
    setStep("loading");
    setIsImporting(true);
    const toastId = toast.loading("Processing and parsing ZIP archive...");
    try {
      const success = await startScrapeManual(file);
      if (!success) {
        setIsImporting(false);
        setStep("input");
      }
      toast.dismiss(toastId);
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

  // Chat messages for the loading state — sequentially revealed based on time
  const CHAT_STEPS = [
    {
      text: "Reading your LinkedIn profile and extracting all public data.",
      tag: "Fetching data",
      delay: 0,
      typingDuration: 1200,
    },
    {
      text: "Parsing your experience, skills and accomplishments into structured sections.",
      tag: "Thinking",
      delay: 4000,
      typingDuration: 1400,
    },
    {
      text: "Choosing a color palette and typography that matches your professional identity.",
      tag: "Finalizing colours",
      delay: 8000,
      typingDuration: 1600,
    },
    {
      text: "Assembling your personalised page layout — almost done.",
      tag: "Building layout",
      delay: 12000,
      typingDuration: 900,
    },
    {
      text: "LinkedIn is taking longer than usual, still working...",
      tag: "Still working",
      delay: 16000,
      typingDuration: 1200,
    },
  ];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    CHAT_STEPS.map((s, i) => ({ id: i, text: s.text, tag: s.tag, state: "pending" }))
  );

  // If there's an initial URL query param, auto-start scraping (Strict Mode safe)
  useEffect(() => {
    const initialUrl = searchParams.get("url") || "";
    if (initialUrl && step === "input") {
      setUrl(initialUrl);
      handleStartScrape(initialUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, step]);

  const handleStartScrape = async (targetUrl: string) => {
    const trimmed = targetUrl.trim();
    if (!trimmed.includes("linkedin.com/in/")) {
      toast.error("Please paste a valid LinkedIn profile URL (e.g. linkedin.com/in/username)");
      return;
    }
    // Remove query parameters from history/URL so back/retry doesn't re-trigger
    router.replace("/onboarding");
    
    setStep("loading");
    setProgress(0);
    setChatMessages(CHAT_STEPS.map((s, i) => ({ id: i, text: s.text, tag: s.tag, state: "pending" })));
    startScrape(trimmed);
  };

  // Progress animation (0 → 98). Cancel interval immediately if websiteId is set.
  useEffect(() => {
    if (step !== "loading" || websiteId) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 98) {
          clearInterval(interval);
          return 98;
        }
        return next;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [step, websiteId]);

  // Drive chat message reveals based on time elapsed
  useEffect(() => {
    if (step !== "loading") return;

    setChatMessages(
      CHAT_STEPS.map((s, i) => ({ id: i, text: s.text, tag: s.tag, state: "pending" }))
    );

    const timers: NodeJS.Timeout[] = [];

    CHAT_STEPS.forEach((stepItem, index) => {
      const typeTimer = setTimeout(() => {
        setChatMessages((prev) => {
          const updated = [...prev];
          if (updated[index]) {
            updated[index] = { ...updated[index], state: "typing" };
          }
          return updated;
        });

        const doneTimer = setTimeout(() => {
          setChatMessages((prev) => {
            const updated = [...prev];
            if (updated[index]) {
              updated[index] = { ...updated[index], state: "done" };
            }
            return updated;
          });
        }, stepItem.typingDuration);

        timers.push(doneTimer);
      }, stepItem.delay);

      timers.push(typeTimer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Client-side timeout handling: if scraping hangs for 45s, redirect to fallback
  useEffect(() => {
    if (step !== "loading") return;
    const timeout = setTimeout(() => {
      if (isLoading) {
        setScrapeError("Request timed out after 45 seconds.");
        setStep("fallback");
      }
    }, 45000);
    return () => clearTimeout(timeout);
  }, [step, isLoading, setScrapeError]);

  // Scroll to bottom as new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle scrape success or failure transitions
  useEffect(() => {
    if (step === "loading" && !isLoading) {
      if (scrapeError) {
        setStep("fallback");
      }
    }
  }, [isLoading, scrapeError, step]);

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
      if (file.size > 20 * 1024 * 1024) {
        toast.error("LinkedIn exports are typically under 5MB. Files larger than 20MB are not allowed.");
        e.target.value = "";
        setZipFile(null);
        return;
      }
      setZipFile(file);
    }
  };

  const handleUploadZip = async () => {
    if (!zipFile) {
      toast.error("Please select a LinkedIn export ZIP file first.");
      return;
    }
    await handleUploadZipWithFile(zipFile);
  };

  const handleManualImport = async () => {
    const toastId = toast.loading("Loading default workspace settings...");
    await useMockProfile();
    toast.dismiss(toastId);
    toast.success("Proceeding with template data customization.");
  };

  const handleBackToInput = () => {
    const lastUrl = url;
    router.replace("/onboarding");
    clearProfile();
    setUrl(lastUrl);
    setStep("input");
  };

  // Check if scrapeError is an authwall or privacy error to display a friendly message
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
            {/* ── Step 1 — Upload ZIP or Scrape ── */}
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/70 backdrop-blur-xl border border-[#E6E6E6]/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 flex flex-col w-full max-w-[480px] select-none"
              >
                <h1 className="text-2xl font-semibold tracking-tight text-[#2A2A2F] text-center mb-2 font-inter">
                  Import your LinkedIn Profile
                </h1>
                <p className="text-[14px] text-gray-500 text-center mb-6 leading-relaxed font-inter">
                  Upload your LinkedIn data export ZIP to build a fully structured website instantly.
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
                    <svg className="w-8 h-8 text-gray-400 mb-2 transition-transform duration-200 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16v-8m0 8l-4-4m4 4l4-4M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
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
                          Upload LinkedIn data ZIP
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          Click to select or drag and drop archive
                        </span>
                      </div>
                    )}
                  </label>

                  {zipFile && (
                    <button
                      onClick={handleUploadZip}
                      disabled={isImporting}
                      className="h-10 w-full bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[12px] font-medium rounded-[13px] transition-[background-color,box-shadow,transform] duration-100 active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] disabled:opacity-50 cursor-pointer"
                    >
                      {isImporting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Importing Data...
                        </span>
                      ) : (
                        <>Import Profile ZIP <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Step-by-Step Instructions */}
                <div className="bg-[#FBFBFB]/40 border border-[#E6E6E6]/60 rounded-2xl p-5 mb-6 text-left">
                  <h3 className="text-[11px] font-bold text-[#2A2A2F] uppercase tracking-wider mb-3.5">
                    How to export your profile (takes 5m)
                  </h3>
                  <div className="space-y-3">
                    {[
                      { num: 1, text: <>Open LinkedIn's <a href="https://www.linkedin.com/psettings/member-data" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] font-semibold hover:underline">Data Settings</a>.</> },
                      { num: 2, text: <>Select <strong>"Something in particular"</strong> and check the <strong>"Profile"</strong> box.</> },
                      { num: 3, text: <>Click <strong>"Request archive"</strong> and enter password.</> },
                      { num: 4, text: <>Download the ZIP from email and upload it above.</> }
                    ].map((item) => (
                      <div key={item.num} className="flex gap-3 text-[12.5px] text-gray-500">
                        <span className="w-5 h-5 rounded-full bg-[#8DB8FF]/15 text-[#3b82f6] text-[10px] font-bold flex items-center justify-center shrink-0 select-none">
                          {item.num}
                        </span>
                        <span className="leading-normal">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] bg-[#E6E6E6]/60 w-full mb-5" />

                {/* Experimental URL Scraper Toggle */}
                <div className="flex flex-col w-full mb-3">
                  <button
                    onClick={() => setShowUrlOption(!showUrlOption)}
                    className="text-xs font-medium text-gray-400 hover:text-[#2A2A2F] flex items-center justify-center gap-1.5 transition-[color,transform] duration-150 active:scale-[0.95] self-center bg-transparent border-none cursor-pointer select-none"
                  >
                    <span>{showUrlOption ? "Hide experimental options" : "Use experimental URL scraper"}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${showUrlOption ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {showUrlOption && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-4 flex flex-col gap-3.5"
                      >
                        <div className="flex flex-col gap-2.5">
                          <input
                            type="text"
                            placeholder="linkedin.com/in/username"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleStartScrape(url)}
                            className="ds-input"
                          />
                          <button
                            onClick={() => handleStartScrape(url)}
                            className="h-10 bg-[#F3F3F3] hover:bg-[#EAEAEA] text-black text-[12px] font-medium rounded-[13px] border border-[#E6E6E6] transition-[background-color,border-color,transform] duration-100 active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Scrape Profile URL
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed text-center font-inter">
                          ⚠️ LinkedIn's security blocking is highly aggressive. URL scraping frequently encounters security checkpoints (authwalls). ZIP upload is recommended.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Instant Skip / Demo Data */}
                <button
                  onClick={handleManualImport}
                  className="mt-2 text-xs font-medium text-gray-400 hover:text-[#2A2A2F] self-center transition-[color,transform] duration-150 active:scale-[0.95] bg-transparent border-none cursor-pointer"
                >
                  Skip & try with default template data →
                </button>
              </motion.div>
            )}

            {/* ── Step 2 — Timeline-style loading ── */}
            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] w-full max-w-lg overflow-hidden flex flex-col p-8 select-none"
              >
                <div className="cn-card-header group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] mb-6">
                  <div className="cn-card-title cn-font-heading leading-none font-semibold text-lg text-black font-inter">
                    Generating your portfolio
                  </div>
                  <div className="cn-card-description text-sm text-gray-500 mt-1 font-inter">
                    Building your professional website from LinkedIn
                  </div>
                </div>

                <div className="cn-card-content space-y-4 text-sm">
                  <ul className="grid [&>li]:grid-cols-[0_min-content_1fr]">
                    {[
                      {
                        title: "Reading LinkedIn Profile",
                        description: "Connecting to LinkedIn and fetching public details",
                      },
                      {
                        title: "Parsing experience & skills",
                        description: "Analyzing job roles, descriptions, and projects",
                      },
                      {
                        title: "Finalizing theme & style",
                        description: "Selecting layout templates, color schemes, and typography",
                      },
                      {
                        title: "Building page layout",
                        description: "Assembling live components and completing setup",
                      },
                    ].map((s, idx, arr) => {
                      const getStepStatus = (index: number) => {
                        if (websiteId) return "done";
                        const msg = chatMessages[index];
                        if (!msg) return "upcoming";
                        if (msg.state === "done") return "done";
                        if (msg.state === "typing") return "loading";
                        return "upcoming";
                      };

                      const status = getStepStatus(idx);
                      const showSeparator = idx < arr.length - 1;

                      return (
                        <li key={idx} className="grid items-center text-[#2A2A2F] mt-1 gap-x-0">
                          <div
                            className="timeline-dot col-start-2 col-end-3 row-start-1 row-end-1 flex items-center justify-center rounded-full border-none mb-1.25"
                            role="status"
                          >
                            {status === "done" && (
                              <svg
                                className="lucide lucide-circle-check text-[#369762] size-5"
                                height="20"
                                width="20"
                                aria-hidden="true"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <path d="m9 12 2 2 4-4" />
                              </svg>
                            )}
                            {status === "loading" && (
                              <svg
                                className="lucide lucide-loader text-[#2A2A2F] size-5 animate-spin"
                                height="20"
                                width="20"
                                aria-hidden="true"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 2v4" />
                                <path d="m16.2 7.8 2.9-2.9" />
                                <path d="M18 12h4" />
                                <path d="m16.2 16.2 2.9 2.9" />
                                <path d="M12 18v4" />
                                <path d="m4.9 19.1 2.9-2.9" />
                                <path d="M2 12h4" />
                                <path d="m4.9 4.9 2.9 2.9" />
                              </svg>
                            )}
                            {status === "upcoming" && (
                              <svg
                                className="lucide lucide-circle text-gray-300 size-4 mt-0.5"
                                height="16"
                                width="16"
                                aria-hidden="true"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="12" cy="12" r="10" />
                              </svg>
                            )}
                          </div>

                          {showSeparator && (
                            <hr
                              className={`col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex h-full w-0.5 justify-center rounded-full min-h-10 border-none ${
                                status === "loading"
                                  ? "bg-[repeating-linear-gradient(0deg,#E6E6E6,#E6E6E6_5px,#FFFFFF_6px,#FFFFFF_10px)]"
                                  : status === "done"
                                  ? "bg-[#369762]"
                                  : "bg-[#E6E6E6]"
                              }`}
                              aria-orientation="vertical"
                              role="separator"
                            />
                          )}

                          <p
                            className="row-start-1 row-end-1 line-clamp-1 max-w-full truncate col-start-3 col-end-4 mr-auto text-left text-base ml-4 flex items-center gap-1.5"
                            aria-level={3}
                            role="heading"
                          >
                            <span className={`font-medium ${status === "upcoming" ? "text-gray-400" : "text-[#2A2A2F] font-semibold font-inter"}`}>
                              {s.title}
                            </span>
                            {status === "loading" && (
                              <>
                                <svg
                                  className="lucide lucide-dot text-[#8DB8FF] size-3 animate-ping"
                                  height="12"
                                  width="12"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="12" cy="12" r="6" />
                                </svg>
                                <span className="text-gray-400 text-xs font-normal font-inter">
                                  Running...
                                </span>
                              </>
                            )}
                          </p>

                          <div className="text-card-foreground row-start-2 row-end-2 pb-8 col-start-3 col-end-4 mr-auto text-left ml-4">
                            <span className="text-gray-400 text-sm font-inter">
                              {s.description}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* ── Step 3 — Scraper failure fallback ── */}
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

                <h2 className="text-xl font-semibold text-[#2A2A2F] mb-2 font-inter">Could not fetch public profile</h2>
                <div className="text-[13.5px] text-gray-500 leading-relaxed mb-6 font-inter">
                  {isAuthwallError ? (
                    <span>
                      LinkedIn couldn't be read publicly. This is normal — upload your data export instead. You can download it from{" "}
                      <a
                        href="https://www.linkedin.com/psettings/member-data"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3b82f6] font-semibold hover:underline inline-flex items-center gap-0.5"
                      >
                        LinkedIn's Settings page
                      </a>.
                    </span>
                  ) : (
                    <span>
                      {scrapeError || "LinkedIn's privacy restriction is blocking direct access."}{" "}
                      Please download your settings archive from{" "}
                      <a
                        href="https://www.linkedin.com/psettings/member-data"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3b82f6] font-semibold hover:underline inline-flex items-center gap-0.5"
                      >
                        LinkedIn's Settings page
                      </a>{" "}
                      and import it below.
                    </span>
                  )}
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
                    <svg className="w-8 h-8 text-gray-400 mb-2 transition-transform duration-200 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16v-8m0 8l-4-4m4 4l4-4M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
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
                        <span className="text-[11px] text-gray-400 font-medium">
                          Should contain Profile.csv and Positions.csv
                        </span>
                      </div>
                    )}
                  </label>

                  {zipFile && (
                    <button
                      onClick={handleUploadZip}
                      disabled={isImporting}
                      className="w-full h-10 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[12px] font-medium rounded-[13px] transition-[background-color,box-shadow,transform] duration-100 active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] disabled:opacity-50 cursor-pointer"
                    >
                      {isImporting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        "Import Profile ZIP"
                      )}
                    </button>
                  )}
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={handleBackToInput}
                    className="flex-1 h-10 bg-white border border-[#E6E6E6] hover:bg-[#FBFBFB] text-black text-[12px] font-medium rounded-[13px] transition-[background-color,border-color,transform] duration-100 active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Try again
                  </button>
                  <button
                    onClick={handleManualImport}
                    className="flex-1 h-10 bg-[#F3F3F3] hover:bg-[#EAEAEA] text-black text-[12px] font-medium rounded-[13px] border border-[#E6E6E6]/60 transition-[background-color,border-color,transform] duration-100 active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Load Default Data <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
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
        <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
          <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
        </div>
      }
    >
      <OnboardingInner />
    </Suspense>
  );
}
