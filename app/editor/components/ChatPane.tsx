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
      icon: <MessageSquare className="w-4 h-4" />,
      label: "Chat",
    },
    {
      id: "grid" as ChatTab,
      icon: <LayoutGrid className="w-4 h-4" />,
      label: "Templates",
    },
    {
      id: "theme" as ChatTab,
      icon: <Edit2 className="w-4 h-4" />,
      label: "Edit",
    },
  ];

  const activeTabIndex = chatTabs.findIndex((t) => t.id === activeTab);

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

      {/* Tabs Toolbar with Animated Pill */}
      <div className="px-6 py-3 border-b border-[#E6E6E6]/30 bg-[#FBFBFB] shrink-0">
        <div className="relative flex bg-[#F3F3F5] rounded-xl p-[3px] h-9">
          {/* Animated sliding pill */}
          {activeTabIndex !== -1 && (
            <motion.div
              className="absolute top-[3px] bottom-[3px] bg-white rounded-[9px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] border border-[#E6E6E6]/40"
              style={{
                width: `calc(100% / 3 - 4px)`,
                left: `calc(${activeTabIndex} * (100% / 3) + 2px)`,
              }}
              layoutId="activeTabPill"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}

          {chatTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={tab.id === "grid" ? "onboarding-templates-tab" : undefined}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors duration-150 ${
                  isActive ? "text-black" : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
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
