"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Send, Check, Sparkles, Globe, Layout, ArrowRight } from "lucide-react";

interface ChatMsg {
  id: string;
  role: "assistant" | "user";
  content: string;
  component?: React.ReactNode;
}

const ONBOARDING_STYLES = [
  { id: "modern", label: "Modern Professional", desc: "Sleek typography, deep charcoal colors, high clarity grids" },
  { id: "ctas", label: "Clear CTAs", desc: "High-contrast action triggers, bold buttons, and primary focus" },
  { id: "trust", label: "Trust-Building Layout", desc: "Mentorship proofs, rating counters, and student reviews" },
  { id: "community", label: "Vibrant Community Focus", desc: "Live user numbers, community highlight cards, and social links" }
];

function OnboardingChat() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Get initial values from query parameters if available
  const linkedinUrl = searchParams.get("url") || "";
  const initialBrandName = linkedinUrl
    ? linkedinUrl.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    : "";

  const [step, setStep] = useState<"name" | "subdomain" | "styles" | "generating">("name");
  const [brandName, setBrandName] = useState(initialBrandName);
  const [subdomain, setSubdomain] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    "Modern Professional",
    "Clear CTAs",
    "Trust-Building Layout",
    "Vibrant Community Focus"
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);

  // Generation states
  const [genProgress, setGenProgress] = useState(0);
  const [genText, setGenText] = useState("Initializing Webild workspace...");

  // Sync subdomain with brandName initial value
  useEffect(() => {
    if (brandName) {
      setSubdomain(brandName.toLowerCase().replace(/[^a-z0-9]/g, ""));
    }
  }, [brandName]);

  // Initial greeting
  useEffect(() => {
    setIsTyping(true);
    const t = setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: "g1",
          role: "assistant",
          content: linkedinUrl 
            ? `Hi! I see you imported your LinkedIn profile. I've populated the name as "${initialBrandName}". Would you like to keep this name or use a different one for your site?`
            : "Hi! I'm your Webild setup assistant. Let's create your micro-site in just a few steps. What is the name of your brand or project?"
        }
      ]);
      if (linkedinUrl) {
        setInputVal(initialBrandName);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [linkedinUrl, initialBrandName]);

  // Scroll to bottom when messages list updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle message sending
  const handleSend = () => {
    const text = inputVal.trim();
    if (!text) return;
    setInputVal("");

    // Add user message
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: "user", content: text }]);

    if (step === "name") {
      setBrandName(text);
      setIsTyping(true);
      const subSuggest = text.toLowerCase().replace(/[^a-z0-9]/g, "") || "mysite";
      setSubdomain(subSuggest);

      setTimeout(() => {
        setIsTyping(false);
        setStep("subdomain");
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: `Great name! Let's choose a subdomain for your website. What would you like your address to be? e.g. "${subSuggest}.webild.co"`
          }
        ]);
        setInputVal(subSuggest);
      }, 1200);

    } else if (step === "subdomain") {
      const cleanSub = text.toLowerCase().replace(/[^a-z0-9-]/g, "");
      setSubdomain(cleanSub);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setStep("styles");
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: `Awesome! "${cleanSub}.webild.co" is available! Let's pre-configure the design layer paradigms inside your workspace. Choose the layout styles you want to enable below:`
          }
        ]);
      }, 1200);
    }
  };

  const handleToggleStyle = (label: string) => {
    setSelectedStyles(prev =>
      prev.includes(label)
        ? prev.filter(s => s !== label)
        : [...prev, label]
    );
  };

  const handleConfirmStyles = () => {
    if (selectedStyles.length === 0) {
      toast.error("Please select at least one design style!");
      return;
    }

    // Add user confirm message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: `I've selected: ${selectedStyles.join(", ")}`
      }
    ]);

    setStep("generating");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: "gen-panel",
          role: "assistant",
          content: "Generating your interactive website workspace now..."
        }
      ]);
    }, 800);
  };

  // Run generator progress simulation
  useEffect(() => {
    if (step === "generating") {
      const texts = [
        "Ingesting brand guidelines...",
        "Applying 'Webild Cloud Editorial' colors...",
        "Formulating Inter Tight typography layers...",
        "Generating tilted project canvas grids...",
        "Finalizing interactive site layout...",
      ];

      const interval = setInterval(() => {
        setGenProgress((prev) => {
          const next = prev + 2;
          const textIndex = Math.min(Math.floor((next / 100) * texts.length), texts.length - 1);
          setGenText(texts[textIndex]);

          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              sessionStorage.setItem("webild_brand_name", brandName);
              sessionStorage.setItem("webild_subdomain", subdomain + ".io");
              sessionStorage.setItem("webild_styles", JSON.stringify(selectedStyles));
              toast.success("Site layout generated successfully! 🎉");
              router.push("/dashboard");
            }, 600);
            return 100;
          }
          return next;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [step, router, brandName, subdomain, selectedStyles]);

  const itemVariants = {
    hidden: { opacity: 0, transform: "scale(0.95) translateY(5px)" },
    visible: { 
      opacity: 1, 
      transform: "scale(1) translateY(0px)",
      transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] relative overflow-hidden flex flex-col items-center justify-center font-inter select-none">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-50">
        <img src="/bg.png" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/40 via-white/80 to-[#FBFBFB]" />
      </div>

      {/* Header Info */}
      <div className="absolute top-8 left-8 right-8 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[#2A2A2F] text-white flex items-center justify-center font-bold text-lg font-inter-tight">W</span>
          <span className="font-semibold text-[16px] text-black font-inter-tight">Webild Setup</span>
        </div>
        <div className="text-[13px] text-gray-500 font-medium font-inter-tight bg-white border border-[#E6E6E6] px-3.5 py-1.5 rounded-lg shadow-[0_6px_10px_-6px_#00000016]">
          AI Conversational Assistant
        </div>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-[620px] px-6 z-10 py-24 h-[80vh] flex flex-col">
        <div className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex-1 flex flex-col overflow-hidden">
          
          {/* Scrollable messages area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6" style={{ scrollbarWidth: "none" }}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}
                >
                  {msg.role === "user" ? (
                    <div className="bg-[#2A2A2F] text-white py-3 px-4 rounded-[16px] rounded-tr-[4px] max-w-[80%] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <p className="text-[14px] leading-relaxed">{msg.content}</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 max-w-[85%]">
                      <div className="w-6 h-6 rounded-lg bg-[#8DFFB3] flex items-center justify-center shrink-0 mt-1 shadow-[0_2px_6px_rgba(141,255,179,0.3)]">
                        <div className="w-3.5 h-3.5 rounded-lg bg-[#369762] border-2 border-white" />
                      </div>
                      <div className="flex flex-col gap-1.5 w-full">
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">AI Assistant</span>
                        <div className="bg-[#F3F3F5] text-black py-3.5 px-4 rounded-[16px] rounded-tl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                          <p className="text-[14px] leading-relaxed text-[#171717]">{msg.content}</p>

                          {/* Render custom in-chat widgets for the active step */}
                          {msg.id === "gen-panel" && step === "generating" && (
                            <div className="mt-4 p-4 rounded-xl bg-white border border-[#E6E6E6] flex flex-col items-center gap-4">
                              <div className="w-12 h-12 rounded-[14px] bg-[#2A2A2F] text-white flex items-center justify-center shadow-sm relative animate-spin">
                                <Sparkles className="w-6 h-6 text-[#8DFFB3]" />
                                <span className="absolute inset-0 rounded-[14px] border-2 border-dashed border-[#8DB8FF]" />
                              </div>
                              <div className="text-center w-full">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{genText}</p>
                                <div className="w-full h-2 bg-[#F3F3F3] rounded-lg overflow-hidden border border-[#E6E6E6] mt-2 relative">
                                  <div
                                    className="h-full bg-gradient-to-r from-[#8DB8FF] to-[#8DFFB3] transition-all duration-75"
                                    style={{ width: `${genProgress}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 mt-1.5 block">{genProgress}% Complete</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* In-chat style selection selector card */}
              {step === "styles" && messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-start pl-9 w-full"
                >
                  <div className="bg-white border border-[#EBEBEB] p-4 rounded-[18px] shadow-[0_6px_20px_rgba(0,0,0,0.04)] w-full max-w-[420px] flex flex-col gap-3">
                    <p className="text-xs font-bold text-black uppercase tracking-wider mb-1">Pre-configure Design Layers</p>
                    <div className="flex flex-col gap-2">
                      {ONBOARDING_STYLES.map((style) => {
                        const isChecked = selectedStyles.includes(style.label);
                        return (
                          <button
                            key={style.id}
                            onClick={() => handleToggleStyle(style.label)}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl border transition-all text-left active:scale-[0.98] ${
                              isChecked
                                ? "bg-[#DCEAFF]/20 border-[#8DB8FF]"
                                : "bg-[#F7F7F7] border-[#EBEBEB] hover:bg-[#F0F0F0]"
                            }`}
                          >
                            <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                              isChecked ? "bg-[#8DB8FF] border-[#8DB8FF] text-white" : "bg-white border-[#C5C5C5]"
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-black leading-tight">{style.label}</span>
                              <span className="text-[11px] text-gray-400 leading-snug">{style.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={handleConfirmStyles}
                      className="mt-2 w-full h-10 rounded-xl bg-[#2A2A2F] text-white text-[12px] font-bold hover:bg-[#3e3e45] active:scale-[0.97] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      Confirm Styles <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-start items-center gap-3 w-full"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#8DFFB3] flex items-center justify-center shrink-0">
                    <div className="w-3.5 h-3.5 rounded-lg bg-[#369762] border-2 border-white" />
                  </div>
                  <div className="bg-[#F3F3F5] px-4 py-3 rounded-[16px] rounded-tl-[4px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Footer input area */}
          {step !== "styles" && step !== "generating" && (
            <div className="p-4 bg-white border-t border-[#E6E6E6]/60 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={step === "name" ? "Type your website name..." : "Type subdomain name..."}
                className="flex-1 h-11 px-4 rounded-xl bg-[#F3F3F5] border border-transparent focus:bg-white focus:border-[#8DB8FF] outline-none text-[14px] font-medium text-black transition-all"
                autoFocus
              />
              <button
                onClick={handleSend}
                className="w-11 h-11 rounded-xl bg-[#2A2A2F] text-white flex items-center justify-center hover:bg-[#3E3E45] active:scale-90 transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
        <div className="text-[14px] text-gray-500 font-semibold font-inter-tight">Loading setup chat...</div>
      </div>
    }>
      <OnboardingChat />
    </Suspense>
  );
}
