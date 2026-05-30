"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, LayoutGrid, Edit2 } from "lucide-react";
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
    content: "Build me a LinkedIn micro-site",
    time: "",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Got it! I've loaded your LinkedIn profile data and applied the Minimal Card template. Use the canvas on the right to preview. Want me to switch to a different template or adjust anything?",
    time: "",
  },
];

const SUGGESTIONS = ["Change template", "Edit bio", "Add links", "Dark mode"];

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
      };
      const lower = msg.toLowerCase();
      let reply = "I'll apply that change to your micro-site now. Let me know if you'd like any tweaks!";
      for (const [k, v] of Object.entries(replies)) {
        if (lower.includes(k)) { reply = v; break; }
      }

      if (lower.includes("change template")) {
        setActiveTab("grid");
      } else if (lower.includes("edit bio") || lower.includes("add links")) {
        setActiveTab("theme");
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
    <section className="w-[360px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
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
                className={`relative h-8 rounded-xl flex items-center justify-center group cursor-pointer focus:outline-none select-none transition-all duration-300 ${
                  isActive 
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
                    <div className="w-2 h-2 bg-zinc-800 rotate-45 -mb-1 shadow-[0px_5px_6px_0px_rgba(0,0,0,0.12)]" />
                    <div className="px-3 py-1 bg-gradient-to-b from-zinc-800 to-zinc-700 text-white text-[10px] font-medium font-['Inter_Tight'] rounded-lg shadow-[0px_5px_6px_0px_rgba(0,0,0,0.12),inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-3px_4px_0px_rgba(0,0,0,0.20)] whitespace-nowrap">
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
            <div className="flex-1 overflow-y-auto px-6 pb-4 pt-4 flex flex-col gap-5" style={{ scrollbarWidth: "none" }}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {msg.role === "user" ? (
                      <div className="flex justify-end">
                        <div className="bg-[#F7F7F7] py-3 px-4 rounded-2xl rounded-tr-sm max-w-[85%] border border-[#E6E6E6]/30">
                          <p className="text-[13px] text-[#171717] font-medium leading-snug">{msg.content}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2A2A2F] to-[#4A4A55] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1 max-w-[80%]">
                          <span className="text-[11px] font-semibold text-gray-400">
                            LinkedPage AI
                          </span>
                          <div className="bg-[#8DFFB3]/10 border border-[#8DFFB3]/40 rounded-2xl rounded-tl-sm px-4 py-3 shadow-[0_2px_8px_rgba(141,255,179,0.04)]">
                            <p className="text-[13px] text-[#171717] font-medium leading-relaxed">{msg.content}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="p-4 shrink-0 bg-white border-t border-[#E6E6E6]/40">
              {/* Suggestion pills */}
              <div className="flex gap-2 mb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="flex-shrink-0 h-6 px-3 bg-[#F3F3F5] hover:bg-[#EAEAEA] rounded-lg text-[11px] font-semibold text-gray-600 hover:text-black transition-colors duration-150 whitespace-nowrap"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Text input */}
              <div className="bg-[#F7F7F7] rounded-xl p-2 flex flex-col gap-2 border border-[#E6E6E6]/50">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="w-full bg-transparent border-none resize-none focus:ring-0 text-sm p-2 text-[#171717] placeholder:text-[#171717]/40 h-20 outline-none"
                  placeholder="Ask LinkedPage AI…"
                />
                <div className="flex items-center justify-between px-1 pb-1">
                  <button
                    onClick={() => toast.info("Attachments coming soon!")}
                    className="w-8 h-8 rounded-lg bg-white border border-[#E6E6E6] flex items-center justify-center text-[#171717]/50 hover:text-[#171717] transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toast.info("Voice input coming soon!")}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#171717]/50 hover:bg-[#F3F3F3] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </button>
                    <button
                      onClick={() => sendMessage()}
                      className="w-8 h-8 rounded-lg bg-[#2A2A2F] text-white flex items-center justify-center hover:bg-[#3A3A42] transition-colors active:scale-[0.95]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "grid" && (
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4" style={{ scrollbarWidth: "none" }}>
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
