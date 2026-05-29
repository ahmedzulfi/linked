"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Undo2,
  Redo2,
  Clock,
  Laptop,
  Smartphone,
  Plus,
  Send,
  Mic,
  Paperclip,
  ChevronDown,
  Settings,
  HelpCircle,
  MessageSquare,
  Play,
  LayoutGrid,
  Palette,
  Type,
  Image,
  Folder,
  LineChart,
  Home,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  X,
  Share2,
  Eye,
  Check,
  ChevronRight,
  ExternalLink,
  ChevronLeft
} from "lucide-react";

// Types for Chat Messages
interface ChatMessage {
  id: string;
  sender: "user" | "webild";
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export default function DashboardPage() {
  const router = useRouter();

  // Load state from onboarding criteria
  const [brandName, setBrandName] = useState("Reality Cheque");
  const [domainName, setDomainName] = useState("realitycheque.io");
  const [designStyles, setDesignStyles] = useState<string[]>([
    "Modern Professional",
    "Clear CTAs",
    "Trust-Building Layout",
    "Vibrant Community Focus"
  ]);

  // Read from Session Storage if available
  useEffect(() => {
    const savedBrand = sessionStorage.getItem("webild_brand_name");
    const savedDomain = sessionStorage.getItem("webild_subdomain");
    const savedStyles = sessionStorage.getItem("webild_styles");

    if (savedBrand) setBrandName(savedBrand);
    if (savedDomain) setDomainName(savedDomain);
    if (savedStyles) {
      try {
        setDesignStyles(JSON.parse(savedStyles));
      } catch (e) {
        console.error("Failed to parse styles", e);
      }
    }
  }, []);

  // Dashboard Core States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "layout" | "colors" | "typography" | "media">("chat");
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [creditCount, setCreditCount] = useState(4);
  const [isDomainRegistered, setIsDomainRegistered] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  
  // Undo/Redo Stacks
  const [headingText, setHeadingText] = useState("Your Skills. Your Time. Your Reality Cheque.");
  const [subheadingText, setSubheadingText] = useState(
    "Pakistan's #1 online coaching platform for job seekers, freelancers & agency owners. 10+ expert-led courses, Real mentorship. A growing community with 10,000+ digital learners building income, freedom, and real careers."
  );
  const [primaryCtaText, setPrimaryCtaText] = useState("Enroll in Program");
  const [secondaryCtaText, setSecondaryCtaText] = useState("Browse Programs");

  const [history, setHistory] = useState<Array<{ h: string; s: string; p: string; sc: string }>>([
    { h: "Your Skills. Your Time. Your Reality Cheque.", s: "Pakistan's #1 online coaching platform for job seekers, freelancers & agency owners. 10+ expert-led courses, Real mentorship. A growing community with 10,000+ digital learners building income, freedom, and real careers.", p: "Enroll in Program", sc: "Browse Programs" }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Direct element inline edit state
  const [editingField, setEditingField] = useState<"heading" | "subheading" | "primaryCta" | "secondaryCta" | null>(null);
  const [tempEditText, setTempEditText] = useState("");

  // Assistant Chat States
  const [chatInput, setChatInput] = useState("");
  const [isChatThinking, setIsChatThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "webild",
      text: "Added 2 new pages: Courses, About-us. Updated sections on the home page.",
      timestamp: new Date()
    },
    {
      id: "2",
      sender: "webild",
      text: "Sorry this feature isn't available, please try again at a later time.",
      timestamp: new Date(),
      isError: true
    }
  ]);

  // Suggestion buttons
  const chatSuggestions = [
    "Optimize Hero Description",
    "Add Pricing CTA",
    "Enhance Testimonials",
    "Change Theme to Dark",
    "Make buttons green"
  ];

  // Auto-scroll chat window
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatThinking]);

  // Track History Changes for Undo/Redo
  const saveToHistory = (h: string, s: string, p: string, sc: string) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push({ h, s, p, sc });
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHeadingText(prev.h);
      setSubheadingText(prev.s);
      setPrimaryCtaText(prev.p);
      setSecondaryCtaText(prev.sc);
      setHistoryIndex(historyIndex - 1);
      toast.info("Undo operation applied");
    } else {
      toast.error("Nothing to undo");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHeadingText(next.h);
      setSubheadingText(next.s);
      setPrimaryCtaText(next.p);
      setSecondaryCtaText(next.sc);
      setHistoryIndex(historyIndex + 1);
      toast.info("Redo operation applied");
    } else {
      toast.error("Nothing to redo");
    }
  };

  // Inline edit submit
  const submitInlineEdit = () => {
    if (!editingField) return;
    let nextH = headingText;
    let nextS = subheadingText;
    let nextP = primaryCtaText;
    let nextSc = secondaryCtaText;

    if (editingField === "heading") {
      setHeadingText(tempEditText);
      nextH = tempEditText;
    } else if (editingField === "subheading") {
      setSubheadingText(tempEditText);
      nextS = tempEditText;
    } else if (editingField === "primaryCta") {
      setPrimaryCtaText(tempEditText);
      nextP = tempEditText;
    } else if (editingField === "secondaryCta") {
      setSecondaryCtaText(tempEditText);
      nextSc = tempEditText;
    }

    saveToHistory(nextH, nextS, nextP, nextSc);
    setEditingField(null);
    toast.success("Text block updated");
  };

  const startInlineEdit = (field: "heading" | "subheading" | "primaryCta" | "secondaryCta", currentText: string) => {
    setEditingField(field);
    setTempEditText(currentText);
  };

  // Assistant Chat Processor
  const handleSendChat = (text: string) => {
    if (!text.trim()) return;
    if (creditCount <= 0) {
      toast.error("Insufficient builder credits! Please upgrade plan.");
      setIsUpgradeModalOpen(true);
      return;
    }

    // User message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsChatThinking(true);

    // Decrement credits
    setCreditCount(prev => Math.max(0, prev - 1));

    // Process logic based on query keywords
    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes("heading") || lower.includes("title")) {
        const match = text.match(/(?:change|set|make|update)\s+(?:heading|title)\s+(?:to|be)\s+["']?([^"']+)["']?/i);
        const newTitle = match ? match[1] : "Skills Built For The Real World.";
        setHeadingText(newTitle);
        saveToHistory(newTitle, subheadingText, primaryCtaText, secondaryCtaText);
        reply = `I have updated the main heading text to: "${newTitle}"`;
      } 
      else if (lower.includes("subheading") || lower.includes("description")) {
        const match = text.match(/(?:change|set|make|update)\s+(?:subheading|description)\s+(?:to|be)\s+["']?([^"']+)["']?/i);
        const newSub = match ? match[1] : "Connect with experts and master in-demand skills.";
        setSubheadingText(newSub);
        saveToHistory(headingText, newSub, primaryCtaText, secondaryCtaText);
        reply = `I have updated the page description to: "${newSub}"`;
      } 
      else if (lower.includes("button") || lower.includes("cta")) {
        const match = text.match(/(?:change|set|make|update)\s+(?:button|cta)\s+(?:to|be)\s+["']?([^"']+)["']?/i);
        const newBtn = match ? match[1] : "Start Learning";
        setPrimaryCtaText(newBtn);
        saveToHistory(headingText, subheadingText, newBtn, secondaryCtaText);
        reply = `I have updated the primary CTA button text to: "${newBtn}"`;
      }
      else if (lower.includes("dark") || lower.includes("black")) {
        reply = "I've toggled the theme properties to Editorial Dark mode contrast settings inside the css variables. You'll see enhanced card backgrounds.";
      }
      else if (lower.includes("page")) {
        reply = "Successfully created new layout router links for Courses, Reviews, and About Us routes in the navigation layout headers.";
      }
      else {
        reply = "I've analyzed your layout criteria and adjusted the structural alignments to balance the negative spacing guidelines of the editorial theme.";
      }

      setIsChatThinking(false);
      setChatMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "webild",
          text: reply,
          timestamp: new Date()
        }
      ]);
      toast.success("Preview workspace modified by Webild AI");
    }, 1500);
  };

  const handleRegisterDomain = () => {
    setIsDomainCheckingLocal(true);
    setTimeout(() => {
      setIsDomainCheckingLocal(false);
      setIsDomainRegistered(true);
      setIsDomainModalOpen(false);
      toast.success(`🎉 Custom domain "${domainName}" registered and linked to this builder project!`);
    }, 1200);
  };

  const [isDomainCheckingLocal, setIsDomainCheckingLocal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-inter text-black select-none">
      
      {/* ─── TOP TOOLBAR ─────────────────────────────────────────────────── */}
      <header className="h-16 border-b border-[#E6E6E6] bg-white flex items-center justify-between px-6 z-30 select-none">
        
        {/* Left Side: Brand & Sidebar toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-9 h-9 rounded-[13px] hover:bg-[#F3F3F3] active:scale-95 transition-all flex items-center justify-center text-[#2A2A2F]"
            title="Toggle Sidebar"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-[13px] bg-[#2A2A2F] text-white flex items-center justify-center font-bold text-md">W</span>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-black font-inter-tight leading-tight">Webild</span>
              <span className="text-[11px] text-gray-500 font-medium leading-none">{brandName}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsUpgradeModalOpen(true)}
            className="hidden md:block text-[11px] font-semibold text-[#8DFFB3] bg-[#2A2A2F] px-3.5 py-1.5 rounded-[13px] relative overflow-hidden group hover:shadow-md transition-shadow active:scale-97 border border-[#8DFFB3]/20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#8DB8FF]/10 to-[#8DFFB3]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-1.5">
              Upgrade Plan
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8DFFB3] animate-ping" />
            </span>
          </button>
        </div>

        {/* Center: Domain Registrar Bar */}
        <div className="hidden lg:flex items-center gap-3 bg-[#DCEAFF]/30 border border-[#8DB8FF]/45 px-3 py-1.5 rounded-full text-[13px] text-black font-inter-tight shadow-sm max-w-md">
          {isDomainRegistered ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              <span className="font-semibold text-emerald-800">Domain {domainName} is active & linked!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="font-medium text-blue-900 leading-none">
                ✨ <strong className="font-semibold">{domainName}</strong> is available!
              </span>
              <button
                onClick={() => setIsDomainModalOpen(true)}
                className="bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex items-center gap-1"
              >
                Get Your Domain
              </button>
            </>
          )}
        </div>

        {/* Right Side: Viewports, Undo/Redo, Actions */}
        <div className="flex items-center gap-4">
          
          {/* Undo/Redo & History */}
          <div className="flex items-center gap-1 border-r border-[#E6E6E6] pr-4">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3F3F3] text-black disabled:opacity-30 disabled:hover:bg-transparent active:scale-95 transition-all"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3F3F3] text-black disabled:opacity-30 disabled:hover:bg-transparent active:scale-95 transition-all"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toast.info(`History log contains ${history.length} design revisions.`)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3F3F3] text-black active:scale-95 transition-all"
              title="View History Revisions"
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>

          {/* Viewport mode toggle */}
          <div className="flex items-center bg-[#F3F3F3] p-1 rounded-[13px] border border-[#E6E6E6] shadow-inner">
            <button
              onClick={() => setViewportMode("desktop")}
              className={`px-3 py-1 rounded-[8px] flex items-center gap-1.5 text-[12px] font-semibold transition-all ${
                viewportMode === "desktop"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewportMode("mobile")}
              className={`px-3 py-1 rounded-[8px] flex items-center gap-1.5 text-[12px] font-semibold transition-all ${
                viewportMode === "mobile"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Share & Publish Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin);
                toast.success("Editor shareable workspace link copied to clipboard!");
              }}
              className="h-9 px-4 rounded-[13px] bg-[#F3F3F3] hover:bg-[#EAEAEA] text-black text-[12px] font-semibold flex items-center gap-1.5 active:scale-97 transition-all shadow-sm border border-[#E6E6E6]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Share</span>
            </button>
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="h-9 px-4 rounded-[13px] bg-[#2A2A2F] hover:bg-[#3E3E45] text-white text-[12px] font-semibold flex items-center gap-1.5 active:scale-97 transition-all shadow-sm border border-[#2A2A2F]"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Publish</span>
            </button>
          </div>

          {/* User Profile Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E6E6E6] shadow-sm select-none">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80" alt="Avatar" className="w-full h-full object-cover" />
          </div>

        </div>
      </header>

      {/* ─── WORKSPACE LAYOUT ────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* 1. Side Primary Icon Navigation Bar */}
        <aside className="w-16 border-r border-[#E6E6E6] bg-white flex flex-col items-center justify-between py-6 z-20 select-none">
          <div className="flex flex-col items-center gap-5 w-full">
            <button className="w-10 h-10 rounded-[13px] bg-[#F3F3F3] text-black flex items-center justify-center hover:bg-[#EAEAEA] active:scale-95 transition-all shadow-sm" title="Home">
              <Home className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 rounded-[13px] bg-[#DCEAFF] text-blue-700 flex items-center justify-center hover:bg-blue-100 active:scale-95 transition-all border border-[#8DB8FF]/40 shadow-sm" title="Global View">
              <Globe className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-[13px] hover:bg-[#F7F7F7] text-gray-500 hover:text-black flex items-center justify-center active:scale-95 transition-all" title="Deployments">
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-[13px] hover:bg-[#F7F7F7] text-gray-500 hover:text-black flex items-center justify-center active:scale-95 transition-all" title="Messages">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-[13px] hover:bg-[#F7F7F7] text-gray-500 hover:text-black flex items-center justify-center active:scale-95 transition-all" title="Page Assets">
              <Folder className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-[13px] hover:bg-[#F7F7F7] text-gray-500 hover:text-black flex items-center justify-center active:scale-95 transition-all" title="Traffic Metrics">
              <LineChart className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-4 w-full">
            <button className="w-10 h-10 rounded-[13px] hover:bg-[#F7F7F7] text-gray-500 hover:text-black flex items-center justify-center active:scale-95 transition-all" title="Settings">
              <Settings className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-[13px] hover:bg-[#F7F7F7] text-gray-500 hover:text-black flex items-center justify-center active:scale-95 transition-all" title="Help Guide">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="w-8 h-[1px] bg-[#E6E6E6]" />
            <button className="w-10 h-10 rounded-[13px] bg-[#2A2A2F] text-white flex items-center justify-center hover:bg-[#3E3E45] active:scale-95 transition-all shadow-sm" title="New Page">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </aside>

        {/* 2. Secondary Customizer Panel (Collapsible) */}
        <AnimatePresence initial={false}>
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.3 }}
              className="border-r border-[#E6E6E6] bg-white flex flex-col justify-between overflow-hidden z-10 w-[340px] select-none"
            >
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Tabs bar */}
                <div className="flex items-center gap-1 p-3 border-b border-[#F3F3F3] overflow-x-auto select-none scrollbar-none">
                  {[
                    { id: "chat", icon: MessageSquare, label: "Chat" },
                    { id: "layout", icon: Play, label: "Layout" },
                    { id: "colors", icon: Palette, label: "Colors" },
                    { id: "typography", icon: Type, label: "Typography" },
                    { id: "media", icon: Image, label: "Media" }
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`h-9 px-3 rounded-[10px] flex items-center gap-1.5 text-[12px] font-semibold whitespace-nowrap transition-all ${
                          isActive
                            ? "bg-[#F3F3F3] text-black shadow-sm"
                            : "text-gray-500 hover:text-black hover:bg-gray-50"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab content wrapper */}
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 scrollbar-thin">
                  
                  {activeTab === "chat" && (
                    <>
                      {/* Design Style Section */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Design Style</span>
                        <div className="flex flex-col gap-2.5">
                          {[
                            "Modern Professional",
                            "Clear CTAs",
                            "Trust-Building Layout",
                            "Vibrant Community Focus"
                          ].map((style) => {
                            const isChecked = designStyles.includes(style);
                            return (
                              <div
                                key={style}
                                onClick={() => {
                                  setDesignStyles(prev => 
                                    prev.includes(style) 
                                      ? prev.filter(s => s !== style)
                                      : [...prev, style]
                                  );
                                  toast.info(`Toggled design style: ${style}`);
                                }}
                                className="flex items-center gap-2.5 cursor-pointer group select-none"
                              >
                                <span className={`w-3.5 h-3.5 rounded-full border transition-all ${
                                  isChecked 
                                    ? "bg-blue-500 border-blue-500 shadow-sm" 
                                    : "bg-white border-gray-300 group-hover:border-gray-500"
                                }`} />
                                <span className="text-[13px] font-medium text-black group-hover:text-blue-600 transition-colors">
                                  {style}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Chat Messages Log */}
                      <div className="flex-1 border-t border-[#F3F3F3] pt-4 flex flex-col gap-4 overflow-y-auto max-h-[300px] pr-1">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex flex-col gap-1 max-w-[85%] ${
                              msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                            }`}
                          >
                            {msg.sender === "webild" && (
                              <div className="flex items-center gap-1 text-[11px] font-bold text-[#8DB8FF] leading-none mb-0.5">
                                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                                <span>Webild</span>
                              </div>
                            )}
                            <div
                              className={`p-3 rounded-[13px] text-[13px] leading-relaxed font-inter-tight border ${
                                msg.sender === "user"
                                  ? "bg-white border-[#E6E6E6] text-black shadow-sm rounded-tr-none"
                                  : msg.isError
                                  ? "bg-amber-50/70 border-amber-200 text-amber-900 rounded-tl-none"
                                  : "bg-[#F3F3F3] border-[#E6E6E6] text-black rounded-tl-none"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}

                        {isChatThinking && (
                          <div className="flex items-center gap-2 text-[12px] text-gray-400 font-semibold animate-pulse self-start pl-2">
                            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                            <span>Webild is writing...</span>
                          </div>
                        )}
                        <div ref={chatEndRef} />
                      </div>
                    </>
                  )}

                  {activeTab !== "chat" && (
                    <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400 gap-2">
                      <Sparkles className="w-8 h-8 text-[#8DB8FF]" />
                      <h4 className="text-[13px] font-semibold text-black">Workspace Control Layer</h4>
                      <p className="text-[12px] px-4">Use the Chat panel and prompt composer to update properties dynamically or edit elements inline on the page canvas.</p>
                    </div>
                  )}

                </div>
              </div>

              {/* Chat Composer Input */}
              {activeTab === "chat" && (
                <div className="p-4 border-t border-[#F3F3F3] bg-white flex flex-col gap-3">
                  {/* Quick suggestion tags */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none select-none">
                    {chatSuggestions.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleSendChat(tag)}
                        className="bg-[#F7F7F7] border border-[#E6E6E6] text-black text-[11px] font-medium px-2.5 py-1 rounded-full hover:bg-[#F3F3F3] hover:border-gray-400 active:scale-95 transition-all whitespace-nowrap shadow-sm font-inter-tight"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Text Input Row */}
                  <div className="relative flex items-center border border-[#E6E6E6] bg-white rounded-[13px] shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-[#8DB8FF]/45 transition-shadow">
                    <button 
                      onClick={() => toast.info("File upload selector opened")}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3F3F3] text-gray-500 active:scale-95 transition-all"
                      title="Attach Assets"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendChat(chatInput)}
                      placeholder="Ask Webild..."
                      className="flex-1 bg-transparent border-none outline-none text-[13px] text-black placeholder-gray-400 px-2.5 font-medium font-inter-tight"
                    />

                    <button 
                      onClick={() => toast.info("Listening for builder microphone input...")}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3F3F3] text-gray-500 active:scale-95 transition-all"
                      title="Voice Command"
                    >
                      <Mic className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleSendChat(chatInput)}
                      className="w-8 h-8 rounded-full bg-[#2A2A2F] text-white flex items-center justify-center hover:bg-[#3E3E45] active:scale-90 transition-all shadow-md ml-1"
                    >
                      <Send className="w-3.5 h-3.5 transform -rotate-45 -translate-y-px" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Main Preview Canvas Area */}
        <main className="flex-1 flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden bg-[#F7F7F7]">
          
          {/* Viewport Frame Container */}
          <div className="flex-1 flex items-center justify-center overflow-auto py-2">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className={`w-full bg-white rounded-[18px] border border-[#E6E6E6] shadow-xl overflow-hidden flex flex-col relative max-h-[85vh] transition-[border-width,box-shadow] ${
                viewportMode === "mobile" 
                  ? "max-w-[380px] aspect-[9/19] border-[12px] border-black rounded-[40px] shadow-2xl" 
                  : "max-w-[1100px] h-full"
              }`}
            >
              {/* Smartphone Status Bar (Only in Mobile Mode) */}
              {viewportMode === "mobile" && (
                <div className="h-7 bg-black text-white flex items-center justify-between px-6 text-[11px] font-bold font-mono">
                  <span>9:41</span>
                  <div className="w-20 h-4 bg-zinc-900 rounded-full absolute left-1/2 -translate-x-1/2 top-1" />
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-2 bg-white rounded-sm inline-block" />
                    <span>LTE</span>
                  </div>
                </div>
              )}

              {/* Preview Page Top Navigation Header */}
              <div className="h-14 border-b border-[#F3F3F3] flex items-center justify-between px-6 bg-white shrink-0 select-none">
                <span className="font-bold text-[14px] text-black font-inter-tight tracking-tight">
                  {brandName}
                </span>
                
                {/* Menu list */}
                <div className="flex items-center gap-4 text-[12px] font-semibold text-gray-500">
                  <span className="cursor-pointer hover:text-black">Home</span>
                  <span className="hidden sm:inline cursor-pointer hover:text-black">Courses</span>
                  <span className="hidden sm:inline cursor-pointer hover:text-black">About-us</span>
                  <span className="w-6 h-6 rounded-full bg-[#2A2A2F] text-white flex items-center justify-center cursor-pointer text-[10px] font-bold">RC</span>
                </div>
              </div>

              {/* Preview Body Canvas Content */}
              <div className="flex-1 overflow-y-auto p-8 sm:p-14 bg-white flex flex-col justify-start gap-12 select-none relative scrollbar-none">
                
                {/* Background soft circular accent inside canvas */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#8DB8FF]/5 to-[#8DFFB3]/5 rounded-full blur-3xl pointer-events-none z-0" />

                {/* Hero Title & Info Block */}
                <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto z-10">
                  
                  {/* Display Heading Text */}
                  <div 
                    className="relative group border border-transparent hover:border-[#8DB8FF] p-1.5 rounded-[8px] cursor-pointer transition-colors"
                    onClick={() => startInlineEdit("heading", headingText)}
                  >
                    {editingField === "heading" ? (
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <input
                          type="text"
                          value={tempEditText}
                          onChange={(e) => setTempEditText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && submitInlineEdit()}
                          className="text-[24px] sm:text-[34px] font-medium font-inter-tight text-center border-b-2 border-blue-500 outline-none max-w-full bg-white px-2 py-1 text-black"
                          autoFocus
                        />
                        <button onClick={submitInlineEdit} className="p-1 bg-blue-600 text-white rounded-[6px] hover:bg-blue-700">
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-[28px] sm:text-[44px] leading-[1.1] font-medium text-black font-inter-tight tracking-tight">
                          {headingText}
                        </h2>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to Edit
                        </span>
                      </>
                    )}
                  </div>

                  {/* Subheading Text */}
                  <div 
                    className="relative group border border-transparent hover:border-[#8DB8FF] p-1.5 rounded-[8px] cursor-pointer transition-colors mt-2"
                    onClick={() => startInlineEdit("subheading", subheadingText)}
                  >
                    {editingField === "subheading" ? (
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <textarea
                          value={tempEditText}
                          onChange={(e) => setTempEditText(e.target.value)}
                          className="text-[13px] sm:text-[14px] leading-relaxed font-inter-tight text-center border-b-2 border-blue-500 outline-none w-[320px] bg-white px-2 py-1 text-black"
                          rows={3}
                          autoFocus
                        />
                        <button onClick={submitInlineEdit} className="p-1 bg-blue-600 text-white rounded-[6px] hover:bg-blue-700">
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-[13px] sm:text-[15px] leading-relaxed text-[#171717]/70 font-inter-tight">
                          {subheadingText}
                        </p>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to Edit
                        </span>
                      </>
                    )}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center justify-center gap-3.5 mt-4">
                    
                    {/* Primary Button */}
                    <div 
                      className="relative group border border-transparent hover:border-[#8DB8FF] p-1 rounded-[8px] cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        startInlineEdit("primaryCta", primaryCtaText);
                      }}
                    >
                      {editingField === "primaryCta" ? (
                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                          <input
                            type="text"
                            value={tempEditText}
                            onChange={(e) => setTempEditText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && submitInlineEdit()}
                            className="text-[12px] font-semibold border-b border-blue-500 outline-none w-28 bg-white text-black"
                            autoFocus
                          />
                          <button onClick={submitInlineEdit} className="p-0.5 bg-blue-600 text-white rounded">
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => toast.success("CTA: Course enrollment trigger activated")}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[13px] bg-[#EA580C] text-white text-[13px] font-semibold hover:bg-[#D97706] transition-[transform,background-color] duration-150 active:scale-[0.97] ease-out shadow-sm leading-none"
                          >
                            <span>{primaryCtaText}</span>
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                            </span>
                          </button>
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Edit Button
                          </span>
                        </>
                      )}
                    </div>

                    {/* Secondary Button */}
                    <div 
                      className="relative group border border-transparent hover:border-[#8DB8FF] p-1 rounded-[8px] cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        startInlineEdit("secondaryCta", secondaryCtaText);
                      }}
                    >
                      {editingField === "secondaryCta" ? (
                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                          <input
                            type="text"
                            value={tempEditText}
                            onChange={(e) => setTempEditText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && submitInlineEdit()}
                            className="text-[12px] font-semibold border-b border-blue-500 outline-none w-28 bg-white text-black"
                            autoFocus
                          />
                          <button onClick={submitInlineEdit} className="p-0.5 bg-blue-600 text-white rounded">
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => toast.success("CTA: Catalog navigation triggered")}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[13px] bg-white border border-[#E6E6E6] text-black text-[13px] font-semibold hover:bg-[#F3F3F3] transition-[transform,background-color] duration-150 active:scale-[0.97] ease-out shadow-sm leading-none"
                          >
                            <span>{secondaryCtaText}</span>
                            <span className="w-5 h-5 rounded-full bg-[#EA580C]/10 flex items-center justify-center flex-shrink-0">
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#EA580C]" />
                            </span>
                          </button>
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Edit Button
                          </span>
                        </>
                      )}
                    </div>

                  </div>
                </div>

                {/* Tilted Overlapping Image Gallery */}
                <div className="mt-8 relative w-full h-[220px] sm:h-[320px] flex items-center justify-center z-10 overflow-visible select-none">
                  
                  {/* Photo 1 (Tilted Left) */}
                  <motion.div
                    className="absolute w-[120px] sm:w-[190px] aspect-[4/5] bg-white rounded-[13px] border border-[#E6E6E6] overflow-hidden shadow-md p-2 -translate-x-[160px] sm:-translate-x-[260px] translate-y-3 z-10 rotate-[-12deg] cursor-pointer origin-bottom"
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 30, y: -10 }}
                    transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.25 }}
                  >
                    <div className="w-full h-[85%] rounded-[8px] bg-gray-200 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=350&q=80" alt="Students" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 tracking-tight block mt-1.5 text-center uppercase font-mono">Real Mentorship</span>
                  </motion.div>

                  {/* Photo 2 (Tilted Left-Center) */}
                  <motion.div
                    className="absolute w-[120px] sm:w-[190px] aspect-[4/5] bg-white rounded-[13px] border border-[#E6E6E6] overflow-hidden shadow-md p-2 -translate-x-[80px] sm:-translate-x-[130px] -translate-y-2 z-15 rotate-[-5deg] cursor-pointer origin-bottom"
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 30, y: -10 }}
                    transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.25 }}
                  >
                    <div className="w-full h-[85%] rounded-[8px] bg-gray-200 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=350&q=80" alt="Online Class" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-[#EA580C] text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                        LIVE TRAINING
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 tracking-tight block mt-1.5 text-center uppercase font-mono">Expert courses</span>
                  </motion.div>

                  {/* Photo 3 (Center Anchor) */}
                  <motion.div
                    className="absolute w-[120px] sm:w-[190px] aspect-[4/5] bg-white rounded-[13px] border border-[#E6E6E6] overflow-hidden shadow-lg p-2 z-20 rotate-[1deg] translate-y-2 cursor-pointer origin-bottom"
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 30, y: -10 }}
                    transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.25 }}
                  >
                    <div className="w-full h-[85%] rounded-[8px] bg-gray-200 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=350&q=80" alt="Workspace" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 tracking-tight block mt-1.5 text-center uppercase font-mono">Digital Learners</span>
                  </motion.div>

                  {/* Photo 4 (Tilted Right-Center) */}
                  <motion.div
                    className="absolute w-[120px] sm:w-[190px] aspect-[4/5] bg-white rounded-[13px] border border-[#E6E6E6] overflow-hidden shadow-md p-2 translate-x-[80px] sm:translate-x-[130px] -translate-y-3 z-15 rotate-[6deg] cursor-pointer origin-bottom"
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 30, y: -10 }}
                    transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.25 }}
                  >
                    <div className="w-full h-[85%] rounded-[8px] bg-gray-200 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=350&q=80" alt="Idea" className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 bg-yellow-400 text-black text-[9px] font-bold px-2 py-0.5 rounded-full font-mono shadow-sm">
                        Career
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 tracking-tight block mt-1.5 text-center uppercase font-mono">Job Placement</span>
                  </motion.div>

                  {/* Photo 5 (Tilted Right) */}
                  <motion.div
                    className="absolute w-[120px] sm:w-[190px] aspect-[4/5] bg-white rounded-[13px] border border-[#E6E6E6] overflow-hidden shadow-md p-2 translate-x-[160px] sm:translate-x-[260px] translate-y-4 z-10 rotate-[13deg] cursor-pointer origin-bottom"
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 30, y: -10 }}
                    transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.25 }}
                  >
                    <div className="w-full h-[85%] rounded-[8px] bg-gray-200 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=350&q=80" alt="Career growth" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 tracking-tight block mt-1.5 text-center uppercase font-mono">High Income</span>
                  </motion.div>

                </div>

              </div>
            </motion.div>
          </div>

          {/* Bottom Alert Overlay (Low Credits widget) */}
          <div className="absolute bottom-6 right-6 z-20 select-none pointer-events-auto">
            <div className="flex items-start gap-3 bg-white border border-blue-200 rounded-[13px] p-4 shadow-lg max-w-[340px] text-[13px]">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-black font-inter-tight">Low on Credits</span>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-mono">
                    {creditCount} left
                  </span>
                </div>
                <p className="text-[12px] text-gray-500 font-inter-tight leading-relaxed">
                  Can't use: Project Generation, Image Generation
                </p>
              </div>
              <button 
                onClick={(e) => {
                  e.currentTarget.parentElement?.remove();
                  toast.info("Credits warning dismissed");
                }}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

        </main>
      </div>

      {/* ─── CUSTOM ACTION MODALS ────────────────────────────────────────── */}

      {/* 1. UPGRADE SUBSCRIPTION tiers modal */}
      <AnimatePresence>
        {isUpgradeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-3xl bg-white border border-[#E6E6E6] rounded-[18px] shadow-2xl p-6 sm:p-8 flex flex-col relative"
            >
              <button
                onClick={() => setIsUpgradeModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-[#F3F3F3] text-black hover:bg-[#EAEAEA] active:scale-90 transition-all font-bold"
              >
                &times;
              </button>

              <div className="text-center flex flex-col gap-2 mb-8">
                <h3 className="text-[29px] font-semibold text-black font-inter-tight">Upgrade your Webild Workspace</h3>
                <p className="text-[14px] text-gray-500">Uncap AI credits and gain custom domains for all project canvases.</p>
              </div>

              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Creator Plan */}
                <div className="border border-[#E6E6E6] bg-[#FBFBFB] rounded-[13px] p-5 flex flex-col justify-between hover:border-blue-300 transition-colors">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase font-mono">Creator</span>
                    <h4 className="text-[21px] font-semibold text-black font-inter-tight leading-none">$15<span className="text-[12px] text-gray-400">/mo</span></h4>
                    <p className="text-[12px] text-gray-500 mt-2">Perfect for single founders testing brand layouts.</p>
                    <ul className="text-[12px] text-gray-600 flex flex-col gap-1.5 mt-4">
                      <li className="flex items-center gap-1.5 font-medium">✓ 100 AI credits / month</li>
                      <li className="flex items-center gap-1.5 font-medium">✓ Custom subdomain</li>
                      <li className="flex items-center gap-1.5 font-medium">✓ Standard CDN hosting</li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => {
                      setCreditCount(100);
                      setIsUpgradeModalOpen(false);
                      toast.success("Subscribed to Creator plan! Credits recharged to 100.");
                    }}
                    className="w-full h-9 rounded-[13px] bg-[#F3F3F3] text-black hover:bg-[#EAEAEA] text-[12px] font-semibold active:scale-97 transition-all mt-6 shadow-sm border border-[#E6E6E6]"
                  >
                    Select Plan
                  </button>
                </div>

                {/* Professional Plan (Featured) */}
                <div className="border-2 border-blue-500 bg-white rounded-[13px] p-5 flex flex-col justify-between relative shadow-md">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] font-bold px-3 py-1 rounded-full font-mono uppercase">
                    Popular
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-blue-600 uppercase font-mono">Professional</span>
                    <h4 className="text-[21px] font-semibold text-black font-inter-tight leading-none">$29<span className="text-[12px] text-gray-400">/mo</span></h4>
                    <p className="text-[12px] text-gray-500 mt-2">Uncap AI updates and custom branding schemas.</p>
                    <ul className="text-[12px] text-gray-600 flex flex-col gap-1.5 mt-4">
                      <li className="flex items-center gap-1.5 font-semibold text-blue-800">✓ Unlimited AI credits</li>
                      <li className="flex items-center gap-1.5 font-medium">✓ 3 Custom domain mappings</li>
                      <li className="flex items-center gap-1.5 font-medium">✓ Premium animations pack</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setCreditCount(9999);
                      setIsUpgradeModalOpen(false);
                      toast.success("Subscribed to Professional plan! Unlimited credits unlocked.");
                    }}
                    className="w-full h-9 rounded-[13px] bg-[#2A2A2F] text-white hover:bg-[#3E3E45] text-[12px] font-semibold active:scale-97 transition-all mt-6 shadow-md"
                  >
                    Upgrade Now
                  </button>
                </div>

                {/* Agency Plan */}
                <div className="border border-[#E6E6E6] bg-[#FBFBFB] rounded-[13px] p-5 flex flex-col justify-between hover:border-blue-300 transition-colors">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase font-mono">Agency</span>
                    <h4 className="text-[21px] font-semibold text-black font-inter-tight leading-none">$79<span className="text-[12px] text-gray-400">/mo</span></h4>
                    <p className="text-[12px] text-gray-500 mt-2">For digital studios managing client pages.</p>
                    <ul className="text-[12px] text-gray-600 flex flex-col gap-1.5 mt-4">
                      <li className="flex items-center gap-1.5 font-medium">✓ Unlimited AI credits</li>
                      <li className="flex items-center gap-1.5 font-medium">✓ 20 Custom domain mappings</li>
                      <li className="flex items-center gap-1.5 font-medium">✓ Priority 1-on-1 support</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setCreditCount(99999);
                      setIsUpgradeModalOpen(false);
                      toast.success("Subscribed to Agency plan! Unlimited mappings active.");
                    }}
                    className="w-full h-9 rounded-[13px] bg-[#F3F3F3] text-black hover:bg-[#EAEAEA] text-[12px] font-semibold active:scale-97 transition-all mt-6 shadow-sm border border-[#E6E6E6]"
                  >
                    Select Plan
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CUSTOM DOMAIN PURCHASE MODAL */}
      <AnimatePresence>
        {isDomainModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-md bg-white border border-[#E6E6E6] rounded-[18px] shadow-2xl p-6 relative flex flex-col gap-5 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-[13px] bg-blue-100 flex items-center justify-center text-blue-600">
                  <Globe className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-black font-inter-tight leading-none">Register custom domain</h3>
                  <span className="text-[12px] text-gray-400 mt-1 block">Quick secure registrar integration</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-[#FBFBFB] p-4 rounded-[13px] border border-[#E6E6E6]">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="font-semibold text-black">{domainName}</span>
                  <span className="font-bold text-emerald-600 font-mono">$12.00/yr</span>
                </div>
                <p className="text-[12px] text-gray-500 leading-normal font-inter-tight">
                  Registration includes cloudflare DNS configuration mappings, privacy protection shields, and auto SSL certificates.
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-2 border-t border-[#F3F3F3]">
                <button
                  onClick={() => setIsDomainModalOpen(false)}
                  className="flex-1 h-10 rounded-[13px] bg-[#F3F3F3] text-black text-[12px] font-semibold hover:bg-[#EAEAEA] active:scale-97 transition-all font-inter-tight"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegisterDomain}
                  disabled={isDomainCheckingLocal}
                  className="flex-1 h-10 rounded-[13px] bg-blue-600 text-white text-[12px] font-semibold hover:bg-blue-700 active:scale-97 transition-all font-inter-tight flex items-center justify-center shadow-md disabled:opacity-50"
                >
                  {isDomainCheckingLocal ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Registering...
                    </span>
                  ) : (
                    <span>Buy & Link Domain</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. PUBLISH DIALOG MODAL */}
      <AnimatePresence>
        {isPublishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-md bg-white border border-[#E6E6E6] rounded-[18px] shadow-2xl p-6 relative flex flex-col gap-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-[21px] font-semibold text-black font-inter-tight">Publish Page Live</h3>
                <p className="text-[13px] text-gray-500">
                  Ready to deploy your edits to public production servers?
                </p>
              </div>

              <div className="bg-[#FBFBFB] p-4 rounded-[13px] border border-[#E6E6E6] text-left flex flex-col gap-2">
                <div className="flex items-center justify-between text-[13px] text-gray-500 font-medium">
                  <span>Target Web Address:</span>
                  <span className="font-semibold text-black font-mono">
                    {isDomainRegistered ? domainName : `${domainName.replace(".io", "")}.webild.co`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-gray-500 font-medium">
                  <span>Revisions Count:</span>
                  <span className="font-semibold text-black font-mono">{history.length} builds</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 border-t border-[#F3F3F3]">
                <button
                  onClick={() => setIsPublishModalOpen(false)}
                  className="flex-1 h-10 rounded-[13px] bg-[#F3F3F3] text-black text-[12px] font-semibold hover:bg-[#EAEAEA] active:scale-97 transition-all font-inter-tight"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsPublishModalOpen(false);
                    toast.success("🚀 Page deployed successfully to global servers!");
                  }}
                  className="flex-1 h-10 rounded-[13px] bg-[#2A2A2F] text-white text-[12px] font-semibold hover:bg-[#3E3E45] active:scale-97 transition-all font-inter-tight flex items-center justify-center shadow-md"
                >
                  Confirm Publish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
