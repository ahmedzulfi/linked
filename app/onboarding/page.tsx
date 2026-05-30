"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Send, Check, Sparkles, Globe, Layout, ArrowRight, Laptop, Lock, RefreshCw, Shield, Star, Users } from "lucide-react";

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
  const [genText, setGenText] = useState("Initializing LinkedPage workspace...");

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
            ? `Hi! I see you imported your LinkedIn profile. I've populated your name as "${initialBrandName}". Would you like to keep this name or use a different one for your site?`
            : "Hi! I'm your LinkedPage setup assistant. Let's create your personal micro-site in just a few steps. What is your full name or project name?"
        }
      ]);
      if (linkedinUrl) {
        setInputVal(initialBrandName);
      }
    }, 800);
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
            content: `Great name! Let's choose a subdomain for your website. What would you like your address to be? e.g. "${subSuggest}.linkedpage.io"`
          }
        ]);
        setInputVal(subSuggest);
      }, 1000);

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
            content: `Awesome! "${cleanSub}.linkedpage.io" is available! Let's pre-configure the design layer paradigms inside your workspace. Choose the layout styles you want to enable below:`
          }
        ]);
      }, 1000);
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
    }, 600);
  };

  // Run generator progress simulation
  useEffect(() => {
    if (step === "generating") {
      const texts = [
        "Ingesting brand guidelines...",
        "Applying 'LinkedPage Cloud Editorial' colors...",
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
      }, 50);

      return () => clearInterval(interval);
    }
  }, [step, router, brandName, subdomain, selectedStyles]);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] relative overflow-hidden flex flex-col font-inter select-none">
      {/* Ambient glowing mesh background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full bg-[#8DB8FF]/12 blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[65%] h-[65%] rounded-full bg-[#8DFFB3]/12 blur-[160px]" />
        <div className="absolute top-[35%] right-[15%] w-[45%] h-[45%] rounded-full bg-[#DCEAFF]/18 blur-[110px]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 max-w-7xl w-full mx-auto shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2A2A2F] text-white flex items-center justify-center font-bold text-base font-inter-tight shadow-[0_4px_10px_rgba(0,0,0,0.1)] active:scale-95 transition-transform duration-150">
            L
          </div>
          <span className="font-semibold text-base text-black tracking-tight font-inter-tight">LinkedPage</span>
        </div>
        <div className="flex items-center gap-6">
          {/* Custom Step Indicator dots */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <span className={step === "name" ? "text-[#2A2A2F] font-bold" : "text-gray-300"}>Project Name</span>
            <span className="text-gray-300 font-normal">/</span>
            <span className={step === "subdomain" ? "text-[#2A2A2F] font-bold" : "text-gray-300"}>Custom URL</span>
            <span className="text-gray-300 font-normal">/</span>
            <span className={step === "styles" ? "text-[#2A2A2F] font-bold" : "text-gray-300"}>Style Presets</span>
            <span className="text-gray-300 font-normal">/</span>
            <span className={step === "generating" ? "text-[#2A2A2F] font-bold" : "text-gray-300"}>Generating</span>
          </div>
          <div className="text-[12px] text-gray-500 font-semibold font-inter-tight bg-white/80 border border-[#E6E6E6]/80 px-3.5 py-1.5 rounded-xl shadow-[0_6px_10px_-6px_#00000016]">
            Setup Assistant
          </div>
        </div>
      </header>

      {/* Main split-pane content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-8 pb-10 flex flex-col lg:flex-row gap-8 items-stretch overflow-hidden">
        
        {/* Left Column: AI Assistant Chat */}
        <section className="flex-1 lg:w-7/12 flex flex-col bg-white/70 backdrop-blur-xl border border-[#E6E6E6]/60 rounded-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.03)] overflow-hidden">
          
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
                    <div className="bg-[#2A2A2F] text-white py-3 px-4 rounded-[16px] rounded-tr-[4px] max-w-[80%] shadow-[0_4px_12px_rgba(0,0,0,0.05)] font-medium">
                      <p className="text-[14px] leading-relaxed">{msg.content}</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3.5 max-w-[85%]">
                      <div className="w-6.5 h-6.5 rounded-lg bg-[#8DFFB3] flex items-center justify-center shrink-0 mt-1 shadow-[0_2px_8px_rgba(141,255,179,0.35)]">
                        <div className="w-3 h-3 rounded-full bg-[#369762] border-[1.5px] border-white" />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-inter-tight">AI Assistant</span>
                        <div className="bg-[#F3F3F5] text-black py-3.5 px-4 rounded-[16px] rounded-tl-[4px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] border border-[#E6E6E6]/40">
                          <p className="text-[14px] leading-relaxed text-[#171717] font-medium">{msg.content}</p>

                          {/* Inline Wizard UI details inside Chat message */}
                          {msg.id === "gen-panel" && step === "generating" && (
                            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E6E6E6] flex flex-col items-center gap-4 shadow-sm">
                              <div className="w-12 h-12 rounded-xl bg-[#2A2A2F] text-white flex items-center justify-center shadow-md relative animate-spin">
                                <Sparkles className="w-5 h-5 text-[#8DFFB3]" />
                                <span className="absolute inset-0 rounded-xl border border-dashed border-[#8DB8FF]/40" />
                              </div>
                              <div className="text-center w-full">
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{genText}</p>
                                <div className="w-full h-2 bg-[#F3F3F3] rounded-full overflow-hidden border border-[#E6E6E6]/80 mt-2 relative">
                                  <div
                                    className="h-full bg-gradient-to-r from-[#8DB8FF] to-[#8DFFB3] transition-all duration-75"
                                    style={{ width: `${genProgress}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-extrabold text-gray-400 mt-1.5 block">{genProgress}% Compiled</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Styles Selector Widget inside Chat */}
              {step === "styles" && messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-start pl-10 w-full"
                >
                  <div className="bg-white border border-[#EBEBEB] p-4.5 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.05)] w-full max-w-[440px] flex flex-col gap-3.5">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Layout className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-bold text-black uppercase tracking-wider">Design Layer Configuration</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {ONBOARDING_STYLES.map((style) => {
                        const isChecked = selectedStyles.includes(style.label);
                        return (
                          <button
                            key={style.id}
                            onClick={() => handleToggleStyle(style.label)}
                            className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left active:scale-[0.98] ${
                              isChecked
                                ? "bg-[#DCEAFF]/20 border-[#8DB8FF] shadow-[0_4px_12px_rgba(141,184,255,0.08)]"
                                : "bg-[#F7F7F7] border-[#EBEBEB] hover:bg-[#F0F0F0]/80"
                            }`}
                          >
                            <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                              isChecked ? "bg-[#8DB8FF] border-[#8DB8FF] text-white" : "bg-white border-[#C5C5C5]"
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-[#2A2A2F] leading-tight">{style.label}</span>
                              <span className="text-[11px] text-gray-400 leading-snug mt-0.5">{style.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={handleConfirmStyles}
                      className="mt-1 w-full h-11 rounded-xl bg-[#2A2A2F] text-white text-[13px] font-bold hover:bg-[#3e3e45] active:scale-[0.97] transition-all duration-150 flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
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
                  className="flex justify-start items-center gap-3.5 w-full"
                >
                  <div className="w-6.5 h-6.5 rounded-lg bg-[#8DFFB3] flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#369762] border-[1.5px] border-white" />
                  </div>
                  <div className="bg-[#F3F3F5] px-4.5 py-3.5 rounded-[16px] rounded-tl-[4px] flex items-center gap-1 border border-[#E6E6E6]/40">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Footer input composer */}
          {step !== "styles" && step !== "generating" && (
            <div className="p-4 bg-white/95 border-t border-[#E6E6E6]/60 flex items-center gap-3 shrink-0">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={step === "name" ? "Type your full name..." : "Type subdomain name..."}
                className="flex-1 h-12 px-4.5 rounded-xl bg-[#F3F3F5] border border-transparent focus:bg-white focus:border-[#8DB8FF] focus:ring-[2px] focus:ring-[#8DB8FF]/10 outline-none text-[14px] font-semibold text-black transition-all duration-150"
                autoFocus
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 rounded-xl bg-[#2A2A2F] text-white flex items-center justify-center hover:bg-[#3E3E45] active:scale-[0.95] transition-transform duration-150 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* Right Column: Interactive Sandbox Preview (hidden on mobile, gorgeous on desktop) */}
        <section className="hidden lg:flex lg:w-5/12 flex-col bg-white/40 backdrop-blur-md border border-[#E6E6E6]/50 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.02)] p-6 relative justify-between overflow-hidden">
          {/* Top Panel Bar */}
          <div className="flex items-center justify-between shrink-0 mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-inter-tight flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-blue-400" />
              Sandbox Canvas
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8DFFB3] animate-pulse shadow-[0_0_8px_#8DFFB3]" />
              <span className="text-[11px] text-[#369762] font-extrabold uppercase tracking-wide">Sync Live</span>
            </div>
          </div>

          {/* Sandbox Live View Container */}
          <div className="flex-1 flex items-center justify-center p-2">
            <div className="w-full max-w-[340px] aspect-[9/16] bg-white border border-[#E6E6E6] rounded-[36px] shadow-[0_24px_50px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col p-3.5 gap-3.5 relative">
              
              {/* Phone Status Bar Mockup */}
              <div className="flex justify-between items-center px-4 pt-1 shrink-0 text-gray-400 text-[10px] font-bold">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-1.5 bg-gray-300 rounded-[2px]" />
                  <span className="w-3.5 h-2 bg-gray-300 rounded-[3px] p-[1px] flex justify-start"><span className="w-full h-full bg-gray-400 rounded-[1.5px]" /></span>
                </div>
              </div>

              {/* Browser Address Bar Mockup */}
              <div className="h-8 rounded-lg bg-[#F3F3F5] border border-[#E6E6E6]/50 px-3 flex items-center gap-2 justify-between shrink-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Lock className={`w-3 h-3 shrink-0 ${subdomain ? "text-[#369762]" : "text-gray-400"}`} />
                  <span className="text-[11px] font-semibold text-gray-500 truncate select-none">
                    {subdomain ? `${subdomain}.linkedpage.io` : "address.linkedpage.io"}
                  </span>
                </div>
                {step === "generating" ? (
                  <RefreshCw className="w-3 h-3 text-blue-500 animate-spin shrink-0" />
                ) : (
                  <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                )}
              </div>

              {/* Sandbox viewport */}
              <div className="flex-1 rounded-[24px] bg-[#FBFBFB] border border-[#EBEBEB] p-4 overflow-y-auto flex flex-col items-center gap-4 relative" style={{ scrollbarWidth: "none" }}>
                
                {/* Generation overlay loader inside Sandbox */}
                <AnimatePresence>
                  {step === "generating" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#2A2A2F]/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-5 text-center text-white"
                    >
                      <Sparkles className="w-8 h-8 text-[#8DFFB3] animate-pulse mb-3" />
                      <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase leading-snug">{genText}</span>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-3 max-w-[140px] border border-white/5">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-[#8DFFB3]" style={{ width: `${genProgress}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 mt-2">{genProgress}% Complete</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Live Sandbox Site Mockup View */}
                <div className="w-14 h-14 rounded-full bg-[#E6E6E6] flex items-center justify-center text-black font-bold text-lg border-2 border-white shadow-sm overflow-hidden shrink-0 mt-2">
                  {brandName ? brandName.charAt(0).toUpperCase() : "?"}
                </div>

                <div className="text-center w-full min-w-0">
                  <h3 className="text-sm font-extrabold text-black truncate leading-tight font-inter-tight">
                    {brandName || "Your Portfolio"}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-semibold truncate leading-none mt-1">
                    {subdomain ? `@${subdomain}` : "@username"}
                  </p>
                </div>

                {/* Mock Card Section */}
                <div className="w-full flex flex-col gap-2">
                  
                  {/* Mock Custom Page widgets based on user selected preset cards */}
                  {selectedStyles.includes("Modern Professional") && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-white border border-[#E6E6E6] rounded-xl flex items-start gap-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
                    >
                      <Shield className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-bold text-black leading-none">Experience Layer</span>
                        <span className="text-[9px] text-gray-400 mt-1 truncate">Professional biography & title list.</span>
                      </div>
                    </motion.div>
                  )}

                  {selectedStyles.includes("Clear CTAs") && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-2 bg-[#2A2A2F] text-white rounded-xl text-center text-[10px] font-bold shadow-md shadow-black/5 hover:scale-[1.02] active:scale-95 transition-all duration-150 cursor-pointer"
                    >
                      Contact Me Direct
                    </motion.div>
                  )}

                  {selectedStyles.includes("Trust-Building Layout") && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-white border border-[#EBEBEB] rounded-xl flex flex-col gap-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
                    >
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[9px] font-bold text-gray-500 ml-1">5.0 Star Feedback</span>
                      </div>
                      <span className="text-[9.5px] text-gray-400 leading-normal italic">"Highly professional, great delivery."</span>
                    </motion.div>
                  )}

                  {selectedStyles.includes("Vibrant Community Focus") && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-2.5 bg-[#8DFFB3]/10 border border-[#8DFFB3]/40 rounded-xl flex items-center justify-between shadow-[0_2px_6px_rgba(141,255,179,0.05)]"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#369762]" />
                        <span className="text-[10px] font-bold text-[#369762]">Active Community</span>
                      </div>
                      <span className="text-[9px] font-extrabold text-[#369762] bg-white border border-[#8DFFB3]/40 px-1.5 py-0.5 rounded-full shadow-sm">120+ online</span>
                    </motion.div>
                  )}

                  {/* Base Mock Profile Cards */}
                  <div className="p-2.5 bg-white border border-[#E6E6E6] rounded-xl text-center text-[10px] font-bold text-gray-700 shadow-[0_2px_6px_rgba(0,0,0,0.01)]">
                    LinkedIn Profile Link
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sandbox Info Overlay text */}
          <div className="shrink-0 text-center mt-4">
            <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
              Every detail typed is compiled into your site workspace configuration.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
        <div className="text-[14px] text-gray-500 font-bold font-inter-tight">Loading setup chat...</div>
      </div>
    }>
      <OnboardingChat />
    </Suspense>
  );
}
