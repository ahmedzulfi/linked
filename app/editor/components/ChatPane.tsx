"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, LayoutGrid, Edit2, Plus, Mic, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { ProfileData, TemplateId } from "@/shared/types";
import TemplatePicker from "./TemplatePicker";
import InlineEditor from "./InlineEditor";
import { motion, AnimatePresence } from "framer-motion";

export type ChatTab = "chat" | "theme" | "grid";

interface ChatPaneProps {
  onCommand: (cmd: string) => void;
  profileName: string;
  profile: ProfileData | null;
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  onChangeField: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  activeTab: ChatTab;
  setActiveTab: (tab: ChatTab) => void;
  editorTab?: "profile" | "experience" | "links";
  setEditorTab?: (tab: "profile" | "experience" | "links") => void;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "hi hellow",
    time: "",
  },
  {
    id: "2",
    role: "assistant",
    content: "Hello there, please describe your idea. Just share your thoughts with me and I'll help with rest!",
    time: "",
  },
  {
    id: "3",
    role: "user",
    content: "make a portfolio website with random details",
    time: "",
  },
  {
    id: "4",
    role: "assistant",
    content: "Hey there, sounds like you're looking to create a website for your portfolio. I'll start building right away.\n\nA dynamic and modern portfolio website showcasing creative projects with a focus on engaging visuals and clear presentation. The design leverages a warm color palette and bold typography to highlight professional work and client testimonials, creating an inviting user experience.",
    time: "",
  },
];

const SUGGESTIONS = [
  "Refine Hero Headline",
  "Condense About Description",
  "Clarify Core Skills",
  "Add Social Links",
];

export default function ChatPane({
  onCommand,
  profileName,
  profile,
  selectedTemplate,
  onSelectTemplate,
  onChangeField,
  activeTab,
  setActiveTab,
  editorTab,
  setEditorTab,
}: ChatPaneProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setInput("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      time: "",
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate AI reply
    setTimeout(() => {
      const replies: Record<string, string> = {
        "change template": "Sure! Switched you to the templates tab. You can select one directly below or ask me.",
        "edit bio": "Of course. Switched you to the Edit profile tab so you can modify your bio.",
        "add links": "Open the Edit profile tab and navigate to the Links section.",
        "dark mode": "Applied Dark Mode template! Check the preview.",
        "refine hero headline": "Certainly! Switched you to the Edit profile tab so you can refine your headline.",
        "condense about description": "Of course! Let's edit your about description. Switched you to the Edit tab.",
        "clarify core skills": "Sure! I've updated the focus on your skills. You can refine them in the Edit tab.",
        "add social links": "Open the Edit profile tab and navigate to the Links section to add your socials.",
      };
      const lower = msg.toLowerCase();
      let reply = "I'll apply that change to your micro-site now. Let me know if you'd like any tweaks!";
      for (const [k, v] of Object.entries(replies)) {
        if (lower.includes(k)) { reply = v; break; }
      }

      if (lower.includes("change template")) {
        setActiveTab("grid");
      } else if (
        lower.includes("edit bio") ||
        lower.includes("add links") ||
        lower.includes("refine hero") ||
        lower.includes("about description") ||
        lower.includes("skills") ||
        lower.includes("social links")
      ) {
        setActiveTab("theme");
        if (setEditorTab) {
          if (lower.includes("social links") || lower.includes("add links")) {
            setEditorTab("links");
          } else {
            setEditorTab("profile");
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: reply, time: "" },
      ]);
      onCommand(msg);
    }, 700);
  };

  useEffect(() => {
    if (activeTab === "chat") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  const chatTabs = [
    {
      id: "chat" as ChatTab,
      icon: (isActive: boolean) => (
        <MessageSquare className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`} />
      ),
      label: "Chat",
    },
    {
      id: "grid" as ChatTab,
      icon: (isActive: boolean) => (
        <LayoutGrid className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`} />
      ),
      label: "Templates",
    },
    {
      id: "theme" as ChatTab,
      icon: (isActive: boolean) => (
        <Edit2 className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`} />
      ),
      label: "Edit",
    },
  ];

  return (
    <section className="w-[510px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="LinkedPage" className="h-6 w-auto object-contain" />
          <div className="w-px h-3 bg-black/10" />
          <span className="text-[12.5px] font-bold text-[#171717]/65 truncate max-w-[120px]">
            {profileName || "LinkedPage"}
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-[#8DFFB3]/25 text-[#369762] rounded-md">
          Editor Mode
        </span>
      </div>

      {/* Tabs Toolbar with Custom Premium Expandable Style */}
      <div className="px-6 py-3 border-b border-[#E6E6E6]/30 bg-[#FBFBFB] shrink-0">
        <div className="relative flex items-center justify-center bg-zinc-100 rounded-xl p-[4px] h-10 w-full gap-1.5">
          {chatTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                layout
                key={tab.id}
                id={tab.id === "grid" ? "onboarding-templates-tab" : undefined}
                onClick={() => setActiveTab(tab.id)}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={`relative h-8 rounded-xl flex items-center justify-center group cursor-pointer focus:outline-none select-none transition-all duration-300 ${isActive
                  ? "flex-[1.5] text-blue-500 px-3 font-['Inter_Tight']"
                  : "flex-1 text-[#171717]/60 hover:bg-zinc-200/40"
                  }`}
              >
                {/* Smoothly animated background pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-blue-50 outline outline-1 outline-blue-500/50 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Content wrapper to render above the absolute background pill */}
                <div className="relative z-10 flex items-center justify-center shrink-0">
                  {tab.icon(isActive)}
                </div>

                {/* Label (visible only when active) */}
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15, delay: 0.05 }}
                    className="relative z-10 ml-1.5 text-xs font-semibold whitespace-nowrap text-blue-500 font-['Inter_Tight']"
                  >
                    {tab.label}
                  </motion.span>
                )}

                {/* Tooltip for inactive tabs */}
                {!isActive && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center">
                    {/* Small arrow pointing up */}
                    <div className="w-2 h-2 bg-zinc-800 rotate-45 -mb-1 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]" />
                    <div className="px-3 py-1 bg-gradient-to-b from-zinc-800 to-zinc-700 text-white text-[10px] font-medium font-['Inter_Tight'] rounded-lg shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] whitespace-nowrap">
                      {tab.label}
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab content area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {activeTab === "chat" && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto w-full px-4" style={{ scrollbarWidth: "none" }}>
              <div className="max-w-[479px] mx-auto flex flex-col gap-6 pb-4 pt-4 w-full">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="w-full flex flex-col"
                    >
                      {msg.role === "user" ? (
                        <div className="w-full flex justify-end items-start">
                          <div className="max-w-[85%] flex flex-col  justify-start items-start">
                            <div className="BackgroundBorder min-h-9 px-4 py-3 relative bg-neutral-50 rounded-xl outline outline-1 outline-zinc-100 flex flex-col justify-start items-start">
                              <div className="OverlayShadow w-full h-full  left-0    top-0 absolute bg-white/0 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] pointer-events-none" />
                              <div className="Container self-stretch pb-[0.63px] flex flex-col justify-start items-start">
                                <div className="HiHellow justify-center text-black text-[15px] font-normal font-['Inter'] leading-7 break-words max-w-full">
                                  {msg.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col justify-start items-start gap-2">
                          <div className="self-stretch inline-flex justify-start items-center gap-2">
                            {/* Logo containing text */}
                            <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain select-none" />
                          </div>

                          <div className="self-stretch flex flex-col justify-start items-start w-full">
                            <div className="justify-center text-neutral-900 text-[15px] font-normal font-['Inter'] leading-7 whitespace-pre-wrap w-full">
                              {msg.content}
                            </div>
                          </div>

                          {/* Dynamic attachment previews for the mockup portfolio response */}
                          {msg.id === "4" && (
                            <div className="w-full flex flex-col justify-start items-start gap-4 mt-3">
                              {/* 1. Carousel preview section */}
                              <div className="self-stretch pt-3 flex flex-col justify-start items-start w-full">
                                <div className="BackgroundBorder self-stretch p-5 bg-neutral-50 rounded-xl outline outline-1 outline-zinc-100 flex flex-col justify-start items-start w-full">
                                  <div className="SectionStackCarousel self-stretch h-48 relative w-full overflow-hidden">
                                    <div className="Container w-full max-w-96 h-48 left-0 top-0 absolute">
                                      <div className="BackgroundBorderShadow w-60 h-28 left-[343.55px] top-[13.58px] absolute origin-top-left rotate-[20deg] opacity-0 bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-60 h-28 left-[343.55px] top-[13.58px] absolute origin-top-left rotate-[20deg] opacity-0 bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-60 h-28 left-[-126.70px] top-[93.65px] absolute origin-top-left rotate-[-20deg] opacity-0 bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-60 h-28 left-[-126.70px] top-[93.65px] absolute origin-top-left rotate-[-20deg] opacity-0 bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-72 h-36 left-[174.13px] top-[11.35px] absolute origin-top-left rotate-[10deg] bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-72 h-36 left-[-6.26px] top-[58.77px] absolute origin-top-left rotate-[-10deg] bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-80 h-40 left-[118.69px] top-[2.70px] absolute origin-top-left rotate-[5deg] bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />
                                      <div className="BackgroundBorderShadow w-80 h-40 left-[7.20px] top-[29.90px] absolute origin-top-left rotate-[-5deg] bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100" />

                                      <div className="BackgroundBorderShadow w-full max-w-96 h-48 left-[23.33px] top-0 absolute bg-neutral-50 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] outline outline-1 outline-zinc-100 overflow-hidden flex items-center justify-center p-4">
                                        <div className="flex flex-col items-center text-center gap-1">
                                          <span className="font-semibold text-[13px] text-neutral-800">Portfolio Preview</span>
                                          <span className="text-[11px] text-zinc-400">Template applied to active canvas</span>
                                        </div>
                                      </div>
                                    </div>

                                    <button className="Button h-9 px-2.5 left-0 top-[82.32px] absolute bg-zinc-100 rounded-xl inline-flex justify-center items-center border-none cursor-pointer hover:bg-zinc-200">
                                      <div className="Svg size-3.5 relative overflow-hidden flex items-center justify-center">
                                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M5 1L1 5L5 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                      </div>
                                    </button>
                                    <button className="Button h-9 px-2.5 left-[401.49px] top-[82.32px] absolute bg-zinc-100 rounded-xl inline-flex justify-center items-center border-none cursor-pointer hover:bg-zinc-200">
                                      <div className="Svg size-3.5 relative overflow-hidden flex items-center justify-center">
                                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M1 1L5 5L1 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* 2. Checklist section */}
                              <div className="self-stretch pt-3 flex flex-col justify-start items-start w-full">
                                <div className="BackgroundBorder self-stretch p-5 bg-neutral-50 rounded-xl outline outline-1 outline-zinc-100 flex flex-col justify-start items-start gap-3 w-full">
                                  {[
                                    "About Me description",
                                    "Project Showcase grid",
                                    "Responsive layout support",
                                    "Contact Form interface",
                                    "Resume download feature",
                                    "Skills & Tools inventory",
                                    "Testimonials section",
                                    "Custom footer metadata",
                                    "Navigation header links"
                                  ].map((item, idx) => (
                                    <div key={idx} className="self-stretch inline-flex justify-start items-center gap-2">
                                      <div className="w-5 h-5 rounded-full border border-[#E6E6E6] flex items-center justify-center bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-80" />
                                      </div>
                                      <span className="text-[14px] font-medium text-neutral-700 font-['Inter']">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 3. Color Palette section */}
                              <div className="self-stretch pt-3 flex flex-col justify-start items-start w-full">
                                <div className="BackgroundBorder self-stretch p-5 bg-neutral-50 rounded-xl outline outline-1 outline-zinc-100 flex flex-col justify-start items-start gap-3 w-full">
                                  {[
                                    { name: "Ocean Breeze", colors: "from-blue-600 to-cyan-400" },
                                    { name: "Sunset Glow", colors: "from-orange-500 to-rose-400" },
                                    { name: "Forest Moss", colors: "from-emerald-600 to-teal-400" },
                                    { name: "Lavender Fields", colors: "from-purple-600 to-pink-400" }
                                  ].map((palette, idx) => (
                                    <div key={idx} className="self-stretch inline-flex justify-start items-center gap-2">
                                      <div className={`Gradient w-5 h-5 bg-gradient-to-b ${palette.colors} rounded-full shadow-sm`} />
                                      <span className="text-[14px] font-medium text-neutral-700 font-['Inter']">{palette.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input area */}
            <div className="p-4 shrink-0 bg-white flex flex-col gap-3">
              {/* Suggestion pills */}
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="flex-shrink-0 h-9 px-4 bg-white hover:bg-neutral-50 border border-neutral-200/60 rounded-[10px] text-[13px] font-medium text-neutral-800 transition-colors duration-150 whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Text input composer */}
              <div className="bg-white rounded-[20px] p-2.5 flex flex-col gap-2 border border-neutral-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="w-full bg-transparent border-none resize-none focus:ring-0 text-[14px] px-2.5 py-1.5 text-neutral-850 placeholder:text-neutral-400 h-16 outline-none"
                  placeholder="Ask Webild..."
                />
                <div className="flex items-center justify-between px-1">
                  <button
                    onClick={() => toast.info("Attachments coming soon!")}
                    className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer border-none"
                  >
                    <Plus className="w-[18px] h-[18px]" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toast.info("Voice input coming soon!")}
                      className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer border-none"
                    >
                      <Mic className="w-[18px] h-[18px]" />
                    </button>
                    <button
                      onClick={() => sendMessage()}
                      className="w-9 h-9 rounded-full bg-[#8DB8FF] hover:bg-[#7ca8f0] text-white flex items-center justify-center transition-all cursor-pointer border-none active:scale-[0.93]"
                    >
                      <ArrowUp className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "grid" && (
          <div className="flex-1 overflow-y-auto pb-6" style={{ scrollbarWidth: "none" }}>
            <TemplatePicker selected={selectedTemplate} onSelect={onSelectTemplate} />
          </div>
        )}

        {activeTab === "theme" && profile && (
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4" style={{ scrollbarWidth: "none" }}>
            <InlineEditor
              profile={profile}
              onChange={onChangeField}
              activeTab={editorTab}
              setActiveTab={setEditorTab}
            />
          </div>
        )}
      </div>
    </section>
  );
}
