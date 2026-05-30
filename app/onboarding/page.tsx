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

// ── User Menu Dropdown ──────────────────────────────────────────────────────
function UserMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "scale(0.95)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      exit={{ opacity: 0, transform: "scale(0.95)" }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute z-50 top-10 rounded-2xl origin-top-right border border-[#010101]/5 bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.4)_inset] right-0 w-72 p-5 text-left"
      style={{ transformOrigin: "top right" }}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 rounded-lg h-9 w-9 p-0.5 border border-[#E6E6E6]">
            <img
              className="h-full w-full object-cover rounded-lg"
              alt="user"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-[#2A2A2F] truncate">Ayesha Zulfiqar</p>
            <p className="text-xs text-[#171717]/60 truncate">ayeshazulfiqar609@gmail.com</p>
          </div>
        </div>
        <div className="border-t border-black/5" />
        <button
          onClick={() => toast("Profile settings coming soon!")}
          className="w-full text-left text-xs font-medium text-black hover:bg-[#F3F3F5] py-1.5 px-2 rounded-lg transition-colors"
        >
          My Account
        </button>
        <button
          onClick={() => toast("Signed out successfully")}
          className="w-full text-left text-xs font-semibold text-[#E45A5A] hover:bg-red-50 py-1.5 px-2 rounded-lg transition-colors border-t border-black/5 mt-1"
        >
          Sign out
        </button>
      </div>
    </motion.div>
  );
}

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
      className={`${dim} rounded-full bg-gradient-to-br from-[#2A2A2F] to-[#4A4A55] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.12)]`}
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
          <div className="bg-white border border-[#E6E6E6] rounded-[14px] rounded-bl-[4px] px-3 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <TypingDots />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white border border-[#E6E6E6] rounded-[14px] rounded-bl-[4px] px-3.5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
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
  const { startScrape, isLoading, scrapeError, editedProfile, clearProfile, useMockProfile } =
    useEditor();

  const [step, setStep] = useState<"input" | "loading" | "fallback">("input");
  const [url, setUrl] = useState("");
  const [pasteData, setPasteData] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Chat messages for the loading state — sequentially revealed
  const CHAT_STEPS: Array<{ text: string; tag: string; triggerAt: number; typingDuration: number }> = [
    {
      text: "Reading your LinkedIn profile and extracting all public data.",
      tag: "Fetching data",
      triggerAt: 0,
      typingDuration: 1200,
    },
    {
      text: "Parsing your experience, skills and accomplishments into structured sections.",
      tag: "Thinking",
      triggerAt: 28,
      typingDuration: 1400,
    },
    {
      text: "Choosing a color palette and typography that matches your professional identity.",
      tag: "Finalizing colours",
      triggerAt: 55,
      typingDuration: 1600,
    },
    {
      text: "Assembling your personalised page layout — almost done.",
      tag: "Building layout",
      triggerAt: 82,
      typingDuration: 900,
    },
  ];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    CHAT_STEPS.map((s, i) => ({ id: i, text: s.text, tag: s.tag, state: "pending" as ChatMessageState }))
  );

  // If there's an initial URL query param, auto-start scraping
  useEffect(() => {
    const initialUrl = searchParams.get("url") || "";
    if (initialUrl) {
      setUrl(initialUrl);
      handleStartScrape(initialUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleStartScrape = async (targetUrl: string) => {
    const trimmed = targetUrl.trim();
    if (!trimmed.includes("linkedin.com/in/")) {
      toast.error("Please paste a valid LinkedIn profile URL (e.g. linkedin.com/in/username)");
      return;
    }
    setStep("loading");
    setProgress(0);
    setChatMessages(CHAT_STEPS.map((s, i) => ({ id: i, text: s.text, tag: s.tag, state: "pending" })));
    startScrape(trimmed);
  };

  // Progress animation (0 → 98 over ~2.5 s)
  useEffect(() => {
    if (step !== "loading") return;

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
  }, [step]);

  // Drive chat message reveals based on progress
  useEffect(() => {
    if (step !== "loading") return;

    CHAT_STEPS.forEach((s, i) => {
      if (progress >= s.triggerAt) {
        setChatMessages((prev) => {
          const current = prev[i];
          if (current.state === "pending") {
            // Show typing indicator first
            const updated = [...prev];
            updated[i] = { ...current, state: "typing" };
            // After typing duration, show the real message
            setTimeout(() => {
              setChatMessages((p) => {
                const u = [...p];
                u[i] = { ...u[i], state: "done" };
                return u;
              });
            }, s.typingDuration);
            return updated;
          }
          return prev;
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, step]);

  // Scroll to bottom as new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle scrape success or failure
  useEffect(() => {
    if (step === "loading" && !isLoading) {
      if (scrapeError) {
        setStep("fallback");
      } else if (editedProfile) {
        setProgress(100);
        const t = setTimeout(() => {
          router.push("/editor?onboarding=true");
        }, 600);
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
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">

      {/* ── Background Graphic ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-50">
        <img src="/bg.png" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/40 via-white/80 to-[#FBFBFB]" />
      </div>

      {/* ── Top Navbar ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-[#2A2A2F]/15" />
          <span className="text-sm font-medium text-[#171717]/60 truncate max-w-[120px]">Onboarding</span>
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-8 h-8 rounded-lg bg-[#E6E6E6] overflow-hidden border-2 border-white hover:scale-105 active:scale-95 transition-transform ml-1"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>
          <AnimatePresence>
            {isUserMenuOpen && <UserMenu />}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Container (Sidebar + Content) ── */}
      <div className="flex-1 flex pt-14 min-h-screen relative z-10">

        {/* ── Sidebar ── */}
        <aside className="w-[260px] border-r border-[#F3F3F5] bg-white/50 backdrop-blur-sm px-6 py-6 flex flex-col justify-between hidden md:flex h-[calc(100vh-3.5rem)] sticky top-14 select-none">
          <div className="flex flex-col gap-6">

            {/* Create Website Button */}
            <button
              className="w-full h-11 bg-[#F3F3F5] active:scale-[0.98] transition-transform rounded-[12px] flex items-center justify-center gap-2 text-[14px] font-semibold text-black/40 cursor-not-allowed"
              disabled
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/40">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 12h6M12 9v6" />
              </svg>
              New Website
            </button>

            {/* Menu Links */}
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => router.push("/")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-colors"
              >
                <Home className="w-[18px] h-[18px] text-black" />
                Home
              </button>

              <button
                onClick={() => router.push("/editor")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-colors"
              >
                <Layout className="w-[18px] h-[18px] text-black" />
                Templates
              </button>

              <button className="w-full h-10 px-3 rounded-[8px] bg-[#E8F1FF] border border-[#8DB8FF]/40 flex items-center gap-3 text-[14px] font-semibold text-[#1A68FF] transition-colors">
                <Folder className="w-[18px] h-[18px] text-[#1A68FF]" />
                All Websites
              </button>
            </div>

            {/* Recent */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">Recent websites</span>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] bg-white/30 border border-[#E6E6E6]/40 cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#F3F3F5] flex items-center justify-center text-[11px] font-bold text-black border border-[#E6E6E6]">
                  n
                </div>
                <span className="text-[13px] font-semibold text-[#171717]/60 truncate">New Website</span>
              </div>
            </div>

          </div>

          {/* Bottom Settings */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => toast.info("Pricing panel is locked during onboarding.")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-colors"
              >
                <CreditCard className="w-[18px] h-[18px] text-black" />
                Pricing
              </button>

              <button
                onClick={() => toast.info("Documentation coming soon!")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-colors"
              >
                <BookOpen className="w-[18px] h-[18px] text-black" />
                Documentation
              </button>

              <button
                onClick={() => toast.info("Settings panel is locked during onboarding.")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-colors"
              >
                <Settings className="w-[18px] h-[18px] text-black" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Content View Area ── */}
        <main className="flex-1 flex items-center justify-center px-6 py-12 relative">
          <div className="w-full max-w-[480px]">
            <AnimatePresence mode="wait">

              {/* ── Step 1 — Input URL ── */}
              {step === "input" && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0_6px_10px_-6px_#00000016] p-8 flex flex-col"
                >
                  <h1 className="text-2xl font-bold tracking-tight text-black text-center mb-2 font-inter-tight">
                    Paste your LinkedIn profile link to get started.
                  </h1>
                  <p className="text-[14px] text-gray-500 text-center mb-6 leading-relaxed">
                    We'll extract your public profile contents and instantly set up your customizable web portfolio.
                  </p>

                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="linkedin.com/in/username"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleStartScrape(url)}
                      className="w-full h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors"
                      autoFocus
                    />
                    <button
                      onClick={() => handleStartScrape(url)}
                      className="h-11 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-bold rounded-xl transition-colors active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      Generate Page <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 2 — Chat-style loading ── */}
              {step === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0_6px_10px_-6px_#00000016] overflow-hidden flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F3F5]">
                    <AIAvatar size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-black">Webild AI</p>
                      <p className="text-[11px] text-[#888] font-medium">Building your page</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#3b82f6]">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {progress}%
                    </div>
                  </div>

                  {/* Chat messages area */}
                  <div className="px-4 py-4 flex flex-col gap-3 min-h-[200px] max-h-[260px] overflow-y-auto scrollbar-hide">
                    {chatMessages.map((msg, i) => (
                      <ChatBubble key={msg.id} message={msg} index={i} />
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Progress bar */}
                  <div className="px-5 pb-5 pt-2">
                    <div className="w-full h-[3px] bg-[#F3F3F3] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8DB8FF] rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "linear" }}
                      />
                    </div>
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
                  className="bg-white/95 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0_6px_10px_-6px_#00000016] p-8 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5 shadow-[0_2px_8px_rgba(228,90,90,0.08)]">
                    <AlertCircle className="w-5 h-5 text-[#E45A5A]" />
                  </div>

                  <h2 className="text-xl font-bold text-black mb-2 font-inter-tight">Could not fetch public profile.</h2>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
                    LinkedIn's privacy restriction is blocking direct access. Please download your settings archive from{" "}
                    <a
                      href="https://www.linkedin.com/psettings/member-data"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3b82f6] font-semibold hover:underline inline-flex items-center gap-0.5"
                    >
                      LinkedIn's Settings page
                    </a>{" "}
                    and import it below.
                  </p>

                  <textarea
                    placeholder="Paste downloaded profile data details here..."
                    value={pasteData}
                    onChange={(e) => setPasteData(e.target.value)}
                    className="w-full h-24 p-3 bg-[#FBFBFB] border border-[#E6E6E6] rounded-xl text-sm text-black focus:border-[#8DB8FF] outline-none resize-none placeholder:text-gray-300 mb-6"
                  />

                  <div className="flex gap-3 w-full">
                    <button
                      onClick={handleBackToInput}
                      className="flex-1 h-10 border border-[#E6E6E6] hover:bg-gray-50 text-black text-[12.5px] font-bold rounded-xl transition-colors active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={handleManualImport}
                      className="flex-1 h-10 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[12.5px] font-bold rounded-xl transition-colors active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      Load Default Data <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </main>

      </div>
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
