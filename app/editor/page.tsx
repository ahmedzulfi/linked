"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { type TemplateId, TEMPLATES, ProfileData } from "@/shared/types";
import TemplatePicker from "./components/TemplatePicker";
import InlineEditor from "./components/InlineEditor";
import ProfilePreview from "./components/ProfilePreview";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// ─── Left Sidebar Icons ────────────────────────────────────────────────────────
type NavItem = { icon: React.ReactNode; label: string; active?: boolean };

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Templates",
    active: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Publish",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Content",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
];

// ─── Chat Message types ────────────────────────────────────────────────────────
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

// ─── Chat Pane ─────────────────────────────────────────────────────────────────
type ChatTab = "chat" | "preview" | "grid" | "theme" | "sort" | "copy";

function ChatPane({
  onCommand,
  profileName,
  profile,
  selectedTemplate,
  onSelectTemplate,
  onChangeField,
  activeTab,
  setActiveTab,
}: {
  onCommand: (cmd: string) => void;
  profileName: string;
  profile: ProfileData | null;
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  onChangeField: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  activeTab: ChatTab;
  setActiveTab: (tab: ChatTab) => void;
}) {
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
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
      label: "Chat",
    },
    {
      id: "preview" as ChatTab,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "grid" as ChatTab,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "theme" as ChatTab,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "sort" as ChatTab,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "copy" as ChatTab,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-[360px] h-full flex flex-col bg-white border-r border-[#E6E6E6] shrink-0 overflow-hidden">
      {/* Header */}
      <header className="h-[72px] flex items-center px-6 border-b border-[#E6E6E6]/50 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight text-[#2A2A2F]">LinkedPage</span>
          <div className="w-px h-4 bg-[#E6E6E6]" />
          <span className="text-sm font-medium text-[#171717]/60 truncate max-w-[120px]">{profileName}</span>
        </div>
      </header>

      {/* Tab toolbar */}
      <div className="p-4 shrink-0">
        <div className="flex items-center p-1 bg-[#F7F7F7] rounded-[13px] border border-[#E6E6E6]">
          {chatTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== "chat" && tab.id !== "grid" && tab.id !== "theme") {
                  toast(`Switched to ${tab.id} mode`);
                }
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[9px] transition-all duration-150 text-xs font-medium ${
                activeTab === tab.id
                  ? "bg-white shadow-sm text-[#2A2A2F]"
                  : "text-[#171717]/50 hover:text-[#171717]"
              }`}
            >
              {tab.id === "chat" ? (
                <span className={activeTab === tab.id ? "text-[#369762]" : ""}>{tab.icon}</span>
              ) : tab.icon}
              {tab.label && <span>{tab.label}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {activeTab === "chat" && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 pb-4 flex flex-col gap-5" style={{ scrollbarWidth: "none" }}>
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
                        <div className="bg-[#F7F7F7] py-3 px-4 rounded-2xl rounded-tr-sm max-w-[85%]">
                          <p className="text-[14px] text-[#171717] leading-snug">{msg.content}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#8DFFB3] flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-3 h-3 rounded-full bg-[#369762] border-2 border-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium text-[#2A2A2F]">LinkedPage AI</span>
                          <p className="text-[14px] text-[#171717]/70 leading-relaxed">{msg.content}</p>
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
                    className="flex-shrink-0 h-6 px-3 bg-[#F7F7F7] rounded-full text-[11px] font-medium text-[#171717]/70 hover:bg-[#EAEAEA] hover:text-[#171717] transition-colors duration-150 whitespace-nowrap"
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
                  className="w-full bg-transparent border-none resize-none focus:ring-0 text-sm p-2 text-[#171717] placeholder:text-[#171717]/40 h-20"
                  style={{ outline: "none" }}
                  placeholder="Ask LinkedPage AI…"
                />
                <div className="flex items-center justify-between px-1 pb-1">
                  <button
                    onClick={() => toast("Attach file")}
                    className="w-8 h-8 rounded-full bg-white border border-[#E6E6E6] flex items-center justify-center text-[#171717]/50 hover:text-[#171717] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toast("Voice input")}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#171717]/50 hover:bg-[#F3F3F3] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </button>
                    <button
                      onClick={() => sendMessage()}
                      className="w-8 h-8 rounded-full bg-[#8DFFB3] text-[#2A2A2F] flex items-center justify-center hover:bg-[#369762] hover:text-white transition-colors active:scale-[0.95]"
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
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2" style={{ scrollbarWidth: "none" }}>
            <TemplatePicker selected={selectedTemplate} onSelect={onSelectTemplate} />
          </div>
        )}

        {activeTab === "theme" && profile && (
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2" style={{ scrollbarWidth: "none" }}>
            <InlineEditor profile={profile} onChange={onChangeField} />
          </div>
        )}

        {activeTab !== "chat" && activeTab !== "grid" && activeTab !== "theme" && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#171717]/50 gap-2">
            <p className="text-sm font-medium uppercase tracking-wider text-xs">Tab Option: {activeTab}</p>
            <p className="text-xs max-w-[200px]">This editor view is currently in development.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function UserMenu() {
  return (
    <div
      className="absolute z-50 top-12 rounded-[13px] origin-top-right border border-[#E6E6E6] bg-white shadow-lg right-0 w-72 p-5"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
        opacity: 1,
      }}
    >
      <div
        className="space-y-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        >
          <div
            className="relative shrink-0 rounded-full h-9 w-9 p-0.5 cursor-pointer border border-[#E6E6E6]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <img
              className="h-full w-full object-cover rounded-full"
              height={31}
              width={31}
              alt="user"
              src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zRU93YkZwNzdMU0phZTVnRTFFZnZwaTBTTEYifQ?w=96&q=75"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                color: "transparent",
              }}
            />
          </div>
          <div
            className="truncate"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <p
              className="text-sm font-medium leading-tight text-[#2A2A2F] truncate"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              Ayesha Zulfiqar
            </p>
            <p
              className="text-xs text-[#171717]/60 leading-tight truncate"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              ayeshazulfiqar609@gmail.com
            </p>
          </div>
        </div>
        <div
          className="border-t border-[#E6E6E6]"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        />
        <div
          className="flex flex-col gap-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        >
          <div
            className="relative p-4 flex flex-col gap-2 bg-[#F7F7F7] border border-[#E6E6E6] rounded-[10px]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <div
              className="flex justify-between"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <span
                className="text-sm font-medium text-[#2A2A2F]"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                Credits
              </span>
              <span
                className="text-sm font-medium text-[#2A2A2F]"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                16 left
              </span>
            </div>
            <div
              className="w-full rounded-full bg-white border border-[#E6E6E6] overflow-hidden p-0.5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <div
                className="relative bg-[#8DFFB3] h-2 rounded-full transition-all duration-300"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                  width: "25%",
                }}
              />
            </div>
            <div
              className="text-xs text-[#171717]/70 mt-1 leading-relaxed"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <span
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                You're on the free plan. Unlock additional features and
                credits by upgrading your plan.
              </span>
            </div>
          </div>
          <button
            className="flex items-center justify-center font-medium transition-all duration-150 bg-[#2A2A2F] text-white hover:bg-[#3E3E45] rounded-[9px] w-full text-xs h-9 active:scale-95"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            Upgrade
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <button
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-md hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <svg
              className="w-4 h-4"
              height="24"
              width="24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <path
                d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </svg>
            Settings
          </button>
          <button
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-md hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <svg
              className="w-4 h-4"
              height="24"
              width="24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <path
                d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </svg>
            Report a bug
          </button>
          <button
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-md hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <svg
              className="w-4 h-4"
              height="24"
              width="24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <path
                d="M12 7v14"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
              <path
                d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </svg>
            Documentation
          </button>
        </div>
        <div
          className="border-t border-[#E6E6E6]"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        />
        <button
          className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-md hover:bg-[#F3F3F3] text-black w-full"
          type="button"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        >
          <svg
            className="w-4 h-4"
            height="24"
            width="24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <path
              d="m16 17 5-5-5-5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            />
            <path
              d="M21 12H9"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            />
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}

// ─── Main editor inner ─────────────────────────────────────────────────────────
function EditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    editedProfile,
    selectedTemplate,
    updateField,
    selectTemplate,
    useMockProfile,
    isDirty,
    resetEdits,
  } = useEditor();

  const [activeNav, setActiveNav] = useState(1); // Templates active by default
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [publishing, setPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState<ChatTab>("chat");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!editedProfile) useMockProfile();
  }, [editedProfile, useMockProfile]);

  useEffect(() => {
    const t = searchParams.get("template") as TemplateId | null;
    if (t) selectTemplate(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();
    for (const tpl of TEMPLATES) {
      if (lower.includes(tpl.name.toLowerCase()) || lower.includes(tpl.id)) {
        selectTemplate(tpl.id);
        toast.success(`Applied template: ${tpl.name}`);
        return;
      }
    }
    if (lower.includes("dark")) { selectTemplate("dark"); toast.success("Dark mode template applied!"); }
  };

  const handlePublish = async () => {
    setPublishing(true);
    toast.loading("Publishing your page…");
    await new Promise((r) => setTimeout(r, 1500));
    toast.dismiss();
    setPublishing(false);
    toast.success("Your page is live! 🎉");
    router.push("/preview");
  };

  const profileName = editedProfile?.name ?? "Your Profile";

  // Preview scale
  const desktopScale = 0.58;
  const mobileScale = 0.45;

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white font-inter select-none">

      {/* ── Left Sidebar ── */}
      <aside className="w-[60px] h-full flex flex-col items-center py-4 border-r border-[#E6E6E6] bg-white shrink-0 justify-between">
        <div className="flex flex-col items-center gap-2">
          {/* Logo mark */}
          <button
            onClick={() => router.push("/")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F3F3] text-[#2A2A2F] font-medium text-sm mb-3 hover:bg-[#EAEAEA] transition-colors active:scale-95"
          >
            L
          </button>

          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveNav(i);
                if (i === 2) router.push("/preview");
                else if (i === 1) setActiveTab("grid");
                else toast(`${item.label} coming soon`);
              }}
              title={item.label}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-150 ${
                activeNav === i
                  ? "bg-[#8DFFB3]/20 text-[#369762]"
                  : "text-[#171717]/50 hover:bg-[#F7F7F7] hover:text-[#171717]"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => toast("New site")}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#171717]/50 hover:bg-[#F7F7F7] hover:text-[#171717] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
          <button
            onClick={() => toast("Help & docs")}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#171717]/50 hover:bg-[#F7F7F7] hover:text-[#171717] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Chat Pane ── */}
      <ChatPane
        onCommand={handleCommand}
        profileName={profileName}
        profile={editedProfile}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={selectTemplate}
        onChangeField={updateField}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* ── Canvas ── */}
      <main className="flex-1 flex flex-col bg-[#F7F7F7] overflow-hidden relative">

        {/* Top action bar */}
        <header className="h-[72px] flex items-center justify-between px-6 shrink-0 bg-[#F7F7F7] border-b border-[#E6E6E6]/50">
          {/* Left: layout + upgrade */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(activeTab === "grid" ? "chat" : "grid")}
              className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-white border border-[#E6E6E6] text-[#171717]/60 shadow-sm hover:text-[#171717] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>

            <button
              onClick={() => toast.info("Upgrade to Pro for custom domains, priority support & more!")}
              className="bg-white px-4 py-2 rounded-full text-sm font-medium text-[#2A2A2F] border border-[#E6E6E6] shadow-sm hover:scale-[0.98] transition-transform"
              style={{ boxShadow: "0 0 0 2px rgba(141,184,255,0.15), 0 0 12px rgba(141,184,255,0.1)" }}
            >
              Upgrade Plan
            </button>

            {/* Preview mode toggle */}
            <div className="hidden sm:flex items-center gap-0.5 p-0.5 bg-white border border-[#E6E6E6] rounded-full">
              <button
                onClick={() => setPreviewMode("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-full transition-[background,color] duration-150 ${
                  previewMode === "desktop" ? "bg-[#F3F3F3] text-black" : "text-[#9CA3AF] hover:text-black"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 21h8m-4-4v4" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Desktop
              </button>
              <button
                onClick={() => setPreviewMode("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-full transition-[background,color] duration-150 ${
                  previewMode === "mobile" ? "bg-[#F3F3F3] text-black" : "text-[#9CA3AF] hover:text-black"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Mobile
              </button>
            </div>
          </div>

          {/* Right: share + publish + avatar */}
          <div className="flex items-center gap-3 relative">
            {isDirty && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => { resetEdits(); toast("Edits reset"); }}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[#9CA3AF] hover:text-[#171717] transition-colors"
              >
                Reset
              </motion.button>
            )}
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://linkedpage.io/${editedProfile?.name.toLowerCase().replace(/\s+/g, "-") ?? "profile"}`);
                toast.success("Share link copied!");
              }}
              className="px-4 py-2 rounded-full bg-[#E6E6E6]/70 text-[#171717] text-sm font-medium hover:bg-[#E6E6E6] transition-colors"
            >
              Share
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="px-5 py-2 rounded-full bg-[#2A2A2F] text-white text-sm font-medium hover:bg-[#3A3A42] transition-colors active:scale-[0.97] flex items-center gap-2"
            >
              {publishing && <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
              Publish
            </button>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8 rounded-full bg-[#E6E6E6] overflow-hidden border border-white shadow-sm ml-1 hover:scale-105 active:scale-95 transition-transform"
            >
              <img
                src={editedProfile?.avatarUrl ?? "https://i.pravatar.cc/80?img=47"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-12 z-50"
                >
                  <UserMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main canvas */}
          <div className="flex-1 p-6 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTemplate}-${previewMode}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                {editedProfile ? (
                  previewMode === "desktop" ? (
                    /* Desktop canvas */
                    <div
                      className="rounded-[16px] overflow-hidden border border-[#E6E6E6] bg-white"
                      style={{
                        width: 1024 * desktopScale,
                        height: 768 * desktopScale,
                        boxShadow: "0 8px 40px -8px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div
                        style={{
                          width: 1024,
                          height: 768,
                          transform: `scale(${desktopScale})`,
                          transformOrigin: "top left",
                          overflow: "auto",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      >
                        <ProfilePreview profile={editedProfile} template={selectedTemplate} />
                      </div>
                    </div>
                  ) : (
                    /* Mobile canvas */
                    <div
                      className="rounded-[32px] overflow-hidden border-[7px] border-[#2A2A2F] bg-white"
                      style={{
                        width: 375 * mobileScale,
                        height: 812 * mobileScale,
                        boxShadow: "0 16px 48px -12px rgba(0,0,0,0.22)",
                      }}
                    >
                      <div
                        style={{
                          width: 375,
                          height: 812,
                          transform: `scale(${mobileScale})`,
                          transformOrigin: "top left",
                          overflow: "auto",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      >
                        <ProfilePreview profile={editedProfile} template={selectedTemplate} />
                      </div>
                    </div>
                  )
                ) : (
                  /* Empty state */
                  <div
                    className="rounded-[16px] overflow-hidden border border-[#E6E6E6] bg-white flex flex-col items-center justify-center"
                    style={{
                      width: 1024 * desktopScale,
                      height: 768 * desktopScale,
                      boxShadow: "0 8px 40px -8px rgba(0,0,0,0.10)",
                    }}
                  >
                    <div className="flex flex-col items-center text-center max-w-sm gap-4">
                      <div className="w-14 h-14 bg-[#2A2A2F] rounded-[18px] flex items-center justify-center transform rotate-3 shadow-sm">
                        <svg className="w-6 h-6 text-white transform -rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-medium text-[#2A2A2F]">Paste your LinkedIn URL</h2>
                      <p className="text-sm text-[#9CA3AF]">Use the chat panel to paste a LinkedIn URL and generate your micro-site.</p>
                      <button
                         onClick={() => router.push("/")}
                        className="button button-primary mt-2"
                      >
                        Go to home
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-[#F7F7F7]">
          <div className="w-6 h-6 rounded-full border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
        </div>
      }
    >
      <EditorInner />
    </Suspense>
  );
}
