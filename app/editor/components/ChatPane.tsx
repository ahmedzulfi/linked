"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, LayoutGrid, Plus, Mic, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { useEditor } from "@/context/EditorContext";
import { ProfileData, TemplateId } from "@/shared/types";
import TemplatePicker from "./TemplatePicker";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedThinkingIllustration } from "@/components/AnimatedSVGs";

export type ChatTab = "chat" | "grid";

interface ChatPaneProps {
  onCommand: (cmd: string) => void;
  profileName: string;
  profile: ProfileData | null;
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  onChangeField: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => void;
  activeTab: ChatTab;
  setActiveTab: (tab: ChatTab) => void;
  prefill: string;
  onClearPrefill: () => void;
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
    role: "assistant",
    content:
      "Your page is ready. Tell me what you'd like to change — I can update your headline, summary, skills, links, or switch the template. What would you like to adjust?",
    time: "",
  },
];

const SUGGESTIONS = [
  "Make my headline more impactful",
  "Shorten my summary",
  "Switch to dark template",
  "Add a GitHub link",
];

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

export default function ChatPane({
  onCommand,
  profileName,
  profile,
  selectedTemplate,
  onSelectTemplate,
  onChangeField,
  activeTab,
  setActiveTab,
  prefill,
  onClearPrefill,
}: ChatPaneProps) {
  const { websiteId } = useEditor();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Prefill prompt when triggered
  useEffect(() => {
    if (prefill) {
      setInput(prefill);
      onClearPrefill();
    }
  }, [prefill, onClearPrefill]);

  // Load chat history from backend on mount or when websiteId changes
  useEffect(() => {
    if (!websiteId) {
      setMessages(initialMessages);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/chat?websiteId=${websiteId}`);
        if (!res.ok) throw new Error("Failed to load chat history");
        const data = await res.json();
        if (data.success && data.history && data.history.length > 0) {
          // Format messages for frontend
          const formatted = data.history.map((msg: any) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            time: "",
          }));
          setMessages(formatted);
        } else {
          setMessages(initialMessages);
        }
      } catch (err) {
        console.error("Error loading chat history:", err);
        setMessages(initialMessages);
      }
    };

    fetchHistory();
  }, [websiteId]);

  const sendMessage = async (text?: string) => {
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

    if (!websiteId) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "No active site loaded. Please select a website from the dashboard first.",
          time: "",
        },
      ]);
      return;
    }

    setIsThinking(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, websiteId, currentStep: 12 }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI reply");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.reply,
          time: "",
        },
      ]);

      if (data.template) {
        onSelectTemplate(data.template);
      }

      if (data.profileUpdates) {
        for (const [k, v] of Object.entries(data.profileUpdates)) {
          onChangeField(k as keyof ProfileData, v as any);
        }
      }

      const lower = msg.toLowerCase();
      if (
        lower.includes("change template") ||
        lower.includes("switch template") ||
        lower.includes("switch to")
      ) {
        setActiveTab("grid");
      }

      onCommand(msg);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `Error: ${e.message || "Failed to generate AI reply."}`,
          time: "",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (activeTab === "chat") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab, isThinking]);

  const chatTabs = [
    {
      id: "chat" as ChatTab,
      icon: (isActive: boolean) => (
        <MessageSquare
          className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`}
        />
      ),
      label: "Chat",
    },
    {
      id: "grid" as ChatTab,
      icon: (isActive: boolean) => (
        <LayoutGrid
          className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`}
        />
      ),
      label: "Templates",
    },
  ];

  return (
    <section className="w-[510px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="LinkedPage"
            className="h-6 w-auto object-contain"
          />
          <div className="w-px h-3 bg-black/10" />
          <span className="text-[12.5px] font-bold text-[#171717]/65 truncate max-w-[120px]">
            {profileName || "LinkedPage"}
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-[#d4ff66]/25 text-[#d4ff66] rounded-md">
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
            <div
              className="flex-1 overflow-y-auto w-full px-4"
              style={{ scrollbarWidth: "none" }}
            >
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
                        <div className="w-full flex justify-end items-start font-inter">
                          <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                            <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter">
                          <div className="flex items-center gap-2 select-none">
                            {/* Logo Icon */}
                            <img
                              src="/logoicon.png"
                              alt="Logo"
                              className="h-5 w-auto object-contain"
                            />
                            <span className="font-semibold text-[13.5px] text-black">
                            LinkedPage
                            </span>
                          </div>

                          <div className="w-full">
                            <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal whitespace-pre-wrap w-full">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isThinking && (
                    <motion.div
                      key="thinking"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="w-full flex flex-col justify-start items-start gap-2.5 font-inter"
                    >
                      <div className="flex items-center gap-2 select-none">
                        <img
                          src="/logoicon.png"
                          alt="Logo"
                          className="h-5 w-auto object-contain animate-pulse"
                        />
                        <span className="font-semibold text-[13.5px] text-black animate-pulse">
                          LinkedPage
                        </span>
                      </div>
                      <div className="bg-white px-4 py-3 rounded-[18px] border border-neutral-200/60 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] flex items-center justify-center">
                        <AnimatedThinkingIllustration />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input area */}
            <div className="p-4 shrink-0 bg-white flex flex-col gap-3">
              {/* Suggestion pills */}
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="flex-shrink-0 h-9 px-4 bg-white hover:bg-neutral-50 border border-neutral-200/60 rounded-full text-[13px] font-medium text-black transition-[background-color,transform] duration-150 whitespace-nowrap shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] cursor-pointer active:scale-[0.95]"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Text input composer */}
              <div className="bg-white rounded-[20px] p-2.5 flex flex-col gap-2 border border-neutral-200/80 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="w-full bg-transparent border-none resize-none focus:ring-0 text-[14px] px-2.5 py-1.5 text-neutral-800 placeholder:text-neutral-400 h-16 outline-none font-inter"
                  placeholder="Ask LinkedPage AI..."
                />
                {input.length > 200 && (
                  <div className="text-[10px] text-gray-400 self-end mr-2 -mt-1 select-none font-inter">
                    {input.length} characters
                  </div>
                )}
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
                      className="w-9 h-9 rounded-full bg-[#8DB8FF] hover:bg-[#7ca8f0] text-white flex items-center justify-center transition-[background-color,transform] duration-100 cursor-pointer border-none active:scale-[0.93]"
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
          <div
            className="flex-1 overflow-y-auto pb-6"
            style={{ scrollbarWidth: "none" }}
          >
            <TemplatePicker
              selected={selectedTemplate}
              onSelect={onSelectTemplate}
            />
          </div>
        )}
      </div>
    </section>
  );
}
